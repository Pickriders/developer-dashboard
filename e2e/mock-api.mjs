// A stand-in for backend-api's dashboard routes, for Playwright and for looking at the dashboard
// without a database. It mirrors the real contract (routes, error body, codes, cooldown, team
// scoping by X-Team-Id, permissions by role); backend-api's own integration specs are what prove
// the real thing. Not shipped.
//
//   node e2e/mock-api.mjs                          # http://127.0.0.1:4010
//   GET  /__test/code?to=<address>                 # the last code sent there
//   POST /__test/reset                             # forget everything
//   POST /__test/team?email=&liveStatus=&reason=   # set the live status of that person's own team
//   POST /__test/order?email=                      # a test order arrives for that person's own team
//   POST /__test/join?email=&name=&role=           # add them to a new team, owned by someone unverified
//   POST /__test/member?owner=&email=&name=&role=  # a new person in the owner's own team
//   POST /__test/event?email=&type=                # a test-mode event for their own team, delivered for real
//   POST /__test/requests?email=&n=                # n test-mode API requests in their own team's request log
//
// Webhook deliveries are real HTTP POSTs to the endpoint URL, signed like backend-api's
// (Pickriders-Signature: t=<unix>,v1=<hmac-sha256 of "t.body">), so Playwright can run a receiver.
import { createServer } from "node:http";
import { createHmac, randomBytes, randomInt, randomUUID } from "node:crypto";

const PORT = Number(process.env.MOCK_API_PORT ?? 4010);
const D = "/developer/api/v1/dashboard";
const RESEND_S = 60;
const TTL_S = 300;

let users, codes, invitations, teams;
function reset() {
  users = new Map(); // email -> user
  teams = new Map(); // id -> team
  codes = new Map(); // userId -> { target, code, sentAt, attempts }
  invitations = new Map([
    [
      "inv_open_0000000000000000001",
      {
        teamName: "Acme Logistics",
        email: "bo@acme.test",
        role: "TEAM_DEVELOPER",
        invitedByName: "Ada Obi",
        status: "open",
      },
    ],
    [
      "inv_used_0000000000000000001",
      {
        teamName: "Acme Logistics",
        email: "bo@acme.test",
        role: "TEAM_DEVELOPER",
        invitedByName: "Ada Obi",
        status: "used",
      },
    ],
  ]);
  const ada = makeUser({
    firstname: "Ada",
    lastname: "Obi",
    email: "ada@acme.test",
    phone: "2348031234567",
    password: "correct-horse-1",
  });
  ada.emailVerified = true;
  ada.phoneVerified = true;
}
const lastSent = new Map(); // address -> code

const newId = () => randomUUID().replace(/-/g, "").slice(0, 24);

function makeUser({ firstname, lastname, email, phone, password }) {
  const user = {
    id: newId(),
    firstname,
    lastname,
    email,
    phone,
    password,
    emailVerified: false,
    phoneVerified: false,
    memberships: [], // { teamId, role }
  };
  const own = makeTeam(`${firstname}'s team`, user);
  user.memberships.push({ teamId: own.id, role: "TEAM_OWNER" });
  users.set(email, user);
  return user;
}

/** A developer team: its account (profile and live access) and what it has built in test mode. */
function makeTeam(name, owner) {
  const t = {
    id: newId(),
    name,
    handle: name.toLowerCase().replace(/\W+/g, "-"),
    owner,
    profile: {
      companyName: null,
      website: null,
      supportEmail: null,
      supportPhone: null,
      useCase: null,
      expectedMonthlyVolume: null,
    },
    liveStatus: "NOT_REQUESTED",
    liveRequestedAt: null,
    liveReviewedAt: null,
    liveRejectionReason: null,
    liveSuspensionReason: null,
    testOrders: 0,
    keys: [],
    endpoints: [],
    logs: [],
    orders: [],
    quotes: [],
    wallets: {
      test: { available: 100_000_000, held: 0, transactions: [] },
      live: { available: 0, held: 0, transactions: [] },
    },
    fundingAccount: null,
    autoTopUp: {
      enabled: false,
      threshold: null,
      amount: null,
      card: null,
      last_charge_at: null,
      consecutive_failures: 0,
      last_failure_reason: null,
      disabled_reason: null,
    },
    lowBalance: null,
    invitations: [],
  };
  teams.set(t.id, t);
  record(t, false, "credit", "test_funding", 100_000_000, "Opening play money");
  return t;
}

/** What each role may do, as backend-api's team-access matrix says. */
const ALL = [
  "team.read",
  "team.manage",
  "team.transfer",
  "live.request",
  "keys.read",
  "keys.write",
  "webhooks.read",
  "webhooks.write",
  "orders.read",
  "orders.write",
  "wallet.read",
  "wallet.fund",
  "billing.read",
  "logs.read",
];
const READS = ALL.filter((p) => p.endsWith(".read"));
const DEVELOPER = [...READS, "keys.write", "webhooks.write", "orders.write"];
/** Every role reads everything; writes as backend-api's team-permissions.ts grants them. */
const PERMISSIONS = {
  TEAM_OWNER: ALL,
  TEAM_ADMIN: ALL.filter((p) => p !== "team.transfer"),
  TEAM_DEVELOPER: DEVELOPER,
  TEAM_MEMBER: DEVELOPER,
  TEAM_FINANCE: [...READS, "wallet.fund"],
  TEAM_VIEWER: READS,
};
const canRequestLive = (t) => t.owner.emailVerified && t.owner.phoneVerified;

const summary = ({ teamId, role }) => {
  const t = teams.get(teamId);
  return {
    id: t.id,
    name: t.name,
    handle: t.handle,
    role,
    isOwner: role === "TEAM_OWNER",
    canRequestLive: canRequestLive(t),
    liveStatus: t.liveStatus,
    permissions: PERMISSIONS[role] ?? [],
  };
};
const describe = (u) => ({
  user: {
    id: u.id,
    firstname: u.firstname,
    lastname: u.lastname,
    email: u.email,
    phone: u.phone,
    emailVerified: u.emailVerified,
    phoneVerified: u.phoneVerified,
  },
  teams: u.memberships.map(summary),
});
const session = (u) => ({ accessToken: `tok_${u.id}`, expiresIn: 3600, ...describe(u) });
const byToken = (req) => [...users.values()].find((u) => req.headers.authorization === `Bearer tok_${u.id}`);
const nationalPhone = (p) => {
  let d = String(p ?? "").replace(/\D/g, "");
  if (d.startsWith("234")) d = d.slice(3);
  if (d.startsWith("0")) d = d.slice(1);
  return /^[789]\d{9}$/.test(d) ? `234${d}` : null;
};

class ApiError extends Error {
  constructor(status, code, message, param = null) {
    super(message);
    Object.assign(this, { status, code, param });
  }
}
const typeFor = (s) =>
  ({ 401: "authentication_error", 403: "permission_error", 404: "not_found_error", 429: "rate_limit_error" })[s] ??
  (s >= 500 ? "api_error" : "invalid_request_error");

function issue(user, purpose, address, { quiet = false } = {}) {
  const current = codes.get(user.id);
  const now = Date.now();
  if (current && current.target.startsWith(`${purpose}:`) && now - current.sentAt < RESEND_S * 1000) {
    if (quiet) return null;
    const wait = Math.ceil((current.sentAt + RESEND_S * 1000 - now) / 1000);
    throw new ApiError(
      429,
      "code_recently_sent",
      `We just sent a code. Wait ${wait} seconds before asking for another.`,
    );
  }
  const code = String(randomInt(10000)).padStart(4, "0");
  codes.set(user.id, { target: `${purpose}:${address}`, code, sentAt: now, attempts: 0 });
  lastSent.set(address, code);
  return { expiresIn: TTL_S, resendAfter: RESEND_S };
}
function consume(user, target, code) {
  const current = codes.get(user.id);
  if (!current || current.target !== target)
    throw new ApiError(400, "code_invalid", "This code is no longer valid. Ask for a new one.", "code");
  if (current.attempts >= 5)
    throw new ApiError(429, "too_many_attempts", "Too many wrong codes. Ask for a new one.", "code");
  current.attempts++;
  if (current.code !== String(code).trim()) {
    const left = 5 - current.attempts;
    throw new ApiError(
      400,
      "code_incorrect",
      left > 0
        ? `That code isn't right. ${left} ${left === 1 ? "try" : "tries"} left.`
        : "That code isn't right. Ask for a new one.",
      "code",
    );
  }
  codes.delete(user.id);
}
const requireUser = (req) => {
  const user = byToken(req);
  if (!user) throw new ApiError(401, "authentication_required", "Sign in again.");
  return user;
};

/** The X-Team-Id team, if the signed-in user is in it and their role allows `permission`. */
const requireTeam = (req, permission) => {
  const user = requireUser(req);
  const membership = user.memberships.find((m) => m.teamId === req.headers["x-team-id"]);
  if (!membership) throw new ApiError(404, "team_not_found", "No team with that id.");
  if (permission && !PERMISSIONS[membership.role]?.includes(permission))
    throw new ApiError(403, "forbidden", "Your role in this team can't do that.");
  return { user, team: teams.get(membership.teamId), role: membership.role };
};

const accountOf = (t) => ({
  id: t.id,
  name: t.name,
  ...t.profile,
  emailVerified: t.owner.emailVerified,
  phoneVerified: t.owner.phoneVerified,
  canRequestLive: canRequestLive(t),
  liveStatus: t.liveStatus,
  liveRequestedAt: t.liveRequestedAt,
  liveReviewedAt: t.liveReviewedAt,
  liveRejectionReason: t.liveRejectionReason,
  liveSuspensionReason: t.liveSuspensionReason,
});

const routes = {
  "POST /auth/signup": (req, body) => {
    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(email)) throw new ApiError(400, "parameter_invalid", "email must be an email", "email");
    if (users.has(email)) throw new ApiError(409, "email_taken", "An account already uses this email.", "email");
    const phone = nationalPhone(body.phone);
    if (!phone) throw new ApiError(400, "invalid_phone", `${body.phone} isn't a valid NG phone number.`, "phone");
    if ([...users.values()].some((u) => u.phone === phone))
      throw new ApiError(
        409,
        "phone_taken",
        "An account already uses this phone number. Sign in, or use another number.",
        "phone",
      );
    const user = makeUser({ ...body, email, phone });
    if (body.invitationToken && invitations.get(body.invitationToken)?.status === "open") {
      const inv = invitations.get(body.invitationToken);
      inv.status = "used";
      user.emailVerified = true;
      // Joining through an invitation replaces the team of one a plain sign-up gets.
      teams.delete(user.memberships[0].teamId);
      const ada = users.get("ada@acme.test");
      const joined = [...teams.values()].find((t) => t.name === inv.teamName) ?? makeTeam(inv.teamName, ada);
      user.memberships = [{ teamId: joined.id, role: inv.role }];
      return [201, session(user)];
    }
    issue(user, "verify_email", email);
    return [201, session(user)];
  },
  "POST /auth/login": (req, body) => {
    const user = users.get(
      String(body.email ?? "")
        .trim()
        .toLowerCase(),
    );
    if (!user || user.password !== body.password)
      throw new ApiError(401, "invalid_credentials", "Incorrect email or password.");
    return [200, session(user)];
  },
  "GET /auth/me": (req) => [200, describe(requireUser(req))],
  "POST /auth/verification/email/send": (req, body) => {
    const user = requireUser(req);
    if (user.emailVerified) throw new ApiError(400, "email_already_verified", "Your email is already verified.");
    const email = body.email?.trim().toLowerCase() || user.email;
    if (email !== user.email && users.has(email))
      throw new ApiError(409, "email_taken", "An account already uses this email.", "email");
    const sent = issue(user, "verify_email", email);
    if (email !== user.email) {
      users.delete(user.email);
      user.email = email;
      users.set(email, user);
    }
    return [200, { sentTo: email, ...sent }];
  },
  "POST /auth/verification/email": (req, body) => {
    const user = requireUser(req);
    consume(user, `verify_email:${user.email}`, body.code);
    user.emailVerified = true;
    return [200, describe(user)];
  },
  "POST /auth/verification/phone/send": (req, body) => {
    const user = requireUser(req);
    if (user.phoneVerified) throw new ApiError(400, "phone_already_verified", "Your phone number is already verified.");
    const phone = body.phone ? nationalPhone(body.phone) : user.phone;
    if (!phone) throw new ApiError(400, "invalid_phone", `${body.phone} isn't a valid NG phone number.`, "phone");
    const sent = issue(user, "verify_phone", phone);
    user.phone = phone;
    return [200, { sentTo: phone, ...sent }];
  },
  "POST /auth/verification/phone": (req, body) => {
    const user = requireUser(req);
    consume(user, `verify_phone:${user.phone}`, body.code);
    user.phoneVerified = true;
    return [200, describe(user)];
  },
  "POST /auth/password/forgot": (req, body) => {
    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();
    const user = users.get(email);
    if (user) issue(user, "reset_password", email, { quiet: true });
    return [200, { sentTo: email, expiresIn: TTL_S, resendAfter: RESEND_S }];
  },
  "POST /auth/password/reset": (req, body) => {
    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();
    const user = users.get(email);
    if (!user) throw new ApiError(400, "code_invalid", "This code is no longer valid. Ask for a new one.", "code");
    if (String(body.password ?? "").length < 8)
      throw new ApiError(400, "parameter_invalid", "password must be at least 8 characters", "password");
    consume(user, `reset_password:${email}`, body.code);
    user.password = body.password;
    user.emailVerified = true;
    return [200, session(user)];
  },
  "POST /invitations/preview": (req, body) => {
    const inv = invitations.get(body.token);
    if (!inv) throw new ApiError(404, "invitation_not_found", "This invitation link isn't valid.");
    if (inv.status !== "open")
      throw new ApiError(410, "invitation_used", "This invitation was already used. Ask the team for a new one.");
    return [
      200,
      { ...inv, expiresAt: new Date(Date.now() + 6 * 864e5).toISOString(), accountExists: users.has(inv.email) },
    ];
  },
  "POST /invitations/accept": (req, body) => {
    const user = requireUser(req);
    const inv = invitations.get(body.token);
    if (!inv || inv.status !== "open")
      throw new ApiError(410, "invitation_used", "This invitation can't be used anymore.");
    inv.status = "used";
    const ada = users.get("ada@acme.test");
    const joined = [...teams.values()].find((t) => t.name === inv.teamName) ?? makeTeam(inv.teamName, ada);
    user.memberships.push({ teamId: joined.id, role: inv.role });
    return [200, { team: summary({ teamId: joined.id, role: inv.role }) }];
  },
  "POST /invitations/decline": (req, body) => {
    const inv = invitations.get(body.token);
    if (inv) inv.status = "declined";
    return [204, null];
  },
  "GET /account": (req) => [200, accountOf(requireTeam(req, "team.read").team)],
  "PATCH /account": (req, body) => {
    const { team: t } = requireTeam(req, "team.manage");
    for (const field of Object.keys(t.profile)) {
      if (!(field in body)) continue;
      const value = typeof body[field] === "string" ? body[field].trim() : body[field];
      t.profile[field] = value || null;
    }
    if (typeof body.name === "string" && body.name.trim().length >= 2) t.name = body.name.trim();
    return [200, accountOf(t)];
  },
  "GET /account/onboarding": (req) => {
    const { team: t } = requireTeam(req, "team.read");
    return [
      200,
      {
        testKeyCreated: t.keys.some((k) => !k.livemode),
        testOrderCreated: t.testOrders > 0,
        webhookEndpointAdded: t.endpoints.length > 0,
      },
    ];
  },
  "POST /account/live-access": (req) => {
    const { team: t } = requireTeam(req, "live.request");
    if (["PENDING", "APPROVED", "SUSPENDED"].includes(t.liveStatus))
      throw new ApiError(409, "live_access_unavailable", "Live access was already requested for this team.");
    if (!canRequestLive(t))
      throw new ApiError(
        403,
        "verification_required",
        "Verify the team owner's email and phone number first, then ask for live access.",
      );
    Object.assign(t, { liveStatus: "PENDING", liveRequestedAt: new Date().toISOString(), liveRejectionReason: null });
    return [200, accountOf(t)];
  },

  "GET /api-keys": (req, body, params, url) => {
    const { team: t } = requireTeam(req, "keys.read");
    const live = url.searchParams.get("livemode");
    const keys = t.keys.filter((k) => usable(k) && (live === null || k.livemode === (live === "true")));
    return [200, keys.map(presentKey).reverse()];
  },
  "POST /api-keys": (req, body) => {
    const { user, team: t } = requireTeam(req, "keys.write");
    const label = String(body.label ?? "").trim();
    if (!label) throw new ApiError(400, "parameter_invalid", "label should not be empty", "label");
    if (body.livemode && t.liveStatus !== "APPROVED")
      throw new ApiError(403, "live_access_required", "Live keys need approved live access.");
    if (t.keys.filter((k) => usable(k) && k.livemode === !!body.livemode).length >= 20)
      throw new ApiError(403, "key_limit_reached", "A team can have 20 keys. Revoke one you no longer use.");
    return [201, issueKey(t, user, { label, livemode: !!body.livemode, scopes: body.scopes ?? [] })];
  },
  "POST /api-keys/:id/roll": (req, body, { id }) => {
    const { user, team: t } = requireTeam(req, "keys.write");
    const old = t.keys.find((k) => k.id === id && usable(k));
    if (!old) throw new ApiError(404, "key_not_found", "No API key with that id in this team.");
    if (old.status === "EXPIRING")
      throw new ApiError(409, "key_already_rolled", "This key was already rolled or revoked.");
    const grace = { now: 0, "1h": 3600, "24h": 86400, "7d": 604800 }[body.expiresIn];
    if (grace === undefined)
      throw new ApiError(400, "parameter_invalid", "expiresIn must be one of now, 1h, 24h, 7d", "expiresIn");
    Object.assign(
      old,
      grace
        ? { status: "EXPIRING", expiresAt: new Date(Date.now() + grace * 1000).toISOString() }
        : { status: "EXPIRED" },
    );
    return [200, issueKey(t, user, { label: old.label, livemode: old.livemode, scopes: old.scopes })];
  },
  "GET /request-logs": (req, body, params, url) => {
    const { team: t } = requireTeam(req, "logs.read");
    const q = Object.fromEntries(url.searchParams);
    const status = {
      succeeded: (s) => s < 400,
      failed: (s) => s >= 400,
      "2xx": (s) => s < 300,
      "4xx": (s) => s >= 400 && s < 500,
      "5xx": (s) => s >= 500,
    }[q.status];
    let rows = [...t.logs]
      .reverse()
      .filter(
        (l) =>
          (q.request_id
            ? l.requestId === q.request_id
            : q.livemode === undefined || l.livemode === (q.livemode === "true")) &&
          (!status || status(l.status)) &&
          (!q.method || l.method === q.method) &&
          (!q.path || l.path.toLowerCase().includes(q.path.toLowerCase())) &&
          (!q.key || l.key?.id === q.key) &&
          (!q.created_gte || l.createdAt >= q.created_gte),
      );
    const from = q.starting_after ? rows.findIndex((l) => l.id === q.starting_after) + 1 : 0;
    const limit = Number(q.limit ?? 20);
    const page = rows.slice(from, from + limit);
    return [
      200,
      {
        object: "list",
        data: page.map(({ query, ip, userAgent, requestBody, responseBody, ...row }) => row),
        has_more: rows.length > from + limit,
        url: `${D}/request-logs`,
      },
    ];
  },
  "GET /request-logs/:id": (req, body, { id }) => {
    const { team: t } = requireTeam(req, "logs.read");
    const log = t.logs.find((l) => l.id === id);
    if (!log) throw new ApiError(404, "log_not_found", "No request with that id in this team.");
    return [200, log];
  },
  "GET /webhook-endpoints": (req, body, params, url) => {
    const { team: t } = requireTeam(req, "webhooks.read");
    const live = url.searchParams.get("livemode");
    return [
      200,
      t.endpoints
        .filter((e) => live === null || e.livemode === (live === "true"))
        .map(presentEndpoint)
        .reverse(),
    ];
  },
  "POST /webhook-endpoints": (req, body) => {
    const { team: t } = requireTeam(req, "webhooks.write");
    checkUrl(body.url);
    if (!Array.isArray(body.enabled_events) || !body.enabled_events.length)
      throw new ApiError(400, "parameter_invalid", "enabled_events should not be empty", "enabled_events");
    if (body.livemode && t.liveStatus !== "APPROVED")
      throw new ApiError(403, "live_access_required", "Live endpoints need approved live access.");
    const endpoint = {
      id: `we_${newId()}`,
      url: body.url.trim(),
      description: body.description?.trim() || null,
      enabled_events: body.enabled_events,
      status: "enabled",
      disabled_reason: null,
      failing_since: null,
      livemode: !!body.livemode,
      previous_secret_expires_at: null,
      created: new Date().toISOString(),
      secret: newSecret(),
      previousSecret: null,
      deliveries: [],
    };
    t.endpoints.push(endpoint);
    return [201, { ...presentEndpoint(endpoint), secret: endpoint.secret }];
  },
  "GET /webhook-endpoints/:id": (req, body, { id }) => [200, presentEndpoint(findEndpoint(req, id, "webhooks.read"))],
  "PATCH /webhook-endpoints/:id": (req, body, { id }) => {
    const endpoint = findEndpoint(req, id, "webhooks.write");
    if (body.url !== undefined) endpoint.url = checkUrl(body.url);
    if (body.description !== undefined) endpoint.description = body.description.trim() || null;
    if (body.enabled_events !== undefined) endpoint.enabled_events = body.enabled_events;
    if (body.disabled === true) Object.assign(endpoint, { status: "disabled", disabled_reason: "manual" });
    if (body.disabled === false)
      Object.assign(endpoint, { status: "enabled", disabled_reason: null, failing_since: null });
    return [200, presentEndpoint(endpoint)];
  },
  "DELETE /webhook-endpoints/:id": (req, body, { id }) => {
    const { team: t } = requireTeam(req, "webhooks.write");
    findEndpoint(req, id, "webhooks.write");
    t.endpoints = t.endpoints.filter((e) => e.id !== id);
    return [200, { object: "webhook_endpoint", id, deleted: true }];
  },
  "POST /webhook-endpoints/:id/roll-secret": (req, body, { id }) => {
    const endpoint = findEndpoint(req, id, "webhooks.write");
    Object.assign(endpoint, {
      previousSecret: endpoint.secret,
      previous_secret_expires_at: new Date(Date.now() + 864e5).toISOString(),
      secret: newSecret(),
    });
    return [200, { ...presentEndpoint(endpoint), secret: endpoint.secret }];
  },
  "GET /webhook-endpoints/:id/deliveries": (req, body, { id }, url) => {
    const endpoint = findEndpoint(req, id, "webhooks.read");
    const newest = [...endpoint.deliveries].reverse();
    const after = url.searchParams.get("starting_after");
    const from = after ? newest.findIndex((d) => d.id === after) + 1 : 0;
    return [200, newest.slice(from, from + Number(url.searchParams.get("limit") ?? 20)).map(presentDelivery)];
  },
  "POST /webhook-endpoints/:id/test": async (req, body, { id }) => {
    const endpoint = findEndpoint(req, id, "webhooks.write");
    if (endpoint.status !== "enabled")
      throw new ApiError(400, "endpoint_disabled", "This endpoint is turned off. Turn it on to send it events.");
    const ping = makeEvent(endpoint.livemode, "ping", {
      object: "ping",
      message: "A test event from Pickriders. Your endpoint received and can check it.",
      webhook_endpoint: endpoint.id,
    });
    return [200, presentDelivery(await deliver(endpoint, ping))];
  },
  "POST /webhook-endpoints/:id/resend": async (req, body, { id }) => {
    const endpoint = findEndpoint(req, id, "webhooks.write");
    const original = endpoint.deliveries.find((d) => d.event.id === body.event_id && d.event.type !== "ping");
    if (!original) throw new ApiError(404, "event_not_found", "No event with that id for this endpoint.", "event_id");
    const sent = await deliver(endpoint, original.event);
    return [
      200,
      { object: "event_resend", event_id: body.event_id, deliveries: [{ id: sent.id, webhook_endpoint: endpoint.id }] },
    ];
  },
  "POST /api-keys/:id/revoke": (req, body, { id }) => {
    const { team: t } = requireTeam(req, "keys.write");
    const key = t.keys.find((k) => k.id === id);
    if (!key) throw new ApiError(404, "key_not_found", "No API key with that id in this team.");
    if (key.status === "REVOKED") throw new ApiError(409, "key_already_revoked", "This key is already revoked.");
    Object.assign(key, { status: "REVOKED", revokedAt: new Date().toISOString() });
    return [200, presentKey(key)];
  },

  "GET /team/members": (req) => {
    const { user: me, team: t } = requireTeam(req, "team.read");
    const members = [...users.values()].flatMap((u) =>
      u.memberships
        .filter((m) => m.teamId === t.id)
        .map((m) => ({
          userId: u.id,
          name: `${u.firstname} ${u.lastname}`,
          email: u.email,
          role: m.role,
          isOwner: m.role === "TEAM_OWNER",
          isYou: u.id === me.id,
          joinedAt: m.joinedAt ?? null,
          lastLoginAt: null,
        })),
    );
    return [200, members.sort((a, b) => Number(b.isOwner) - Number(a.isOwner))];
  },
  "PATCH /team/members/:userId": (req, body, { userId }) => {
    const { user: me, team: t, role: myRole } = requireTeam(req, "team.manage");
    if (userId === me.id) throw new ApiError(403, "cannot_change_own_role", "You can't change your own role.");
    const { user, membership } = memberOf(t, userId);
    if (membership.role === "TEAM_OWNER")
      throw new ApiError(403, "role_above_yours", "You can't change the owner's role.");
    if (body.role === "TEAM_ADMIN" && myRole !== "TEAM_OWNER" && myRole !== "TEAM_ADMIN")
      throw new ApiError(403, "role_above_yours", "You can't give a role above yours.");
    membership.role = body.role;
    return [
      200,
      {
        userId,
        name: `${user.firstname} ${user.lastname}`,
        email: user.email,
        role: body.role,
        isOwner: false,
        isYou: false,
      },
    ];
  },
  "DELETE /team/members/:userId": (req, body, { userId }) => {
    const { user: me, team: t } = requireTeam(req, "team.manage");
    if (userId === me.id) throw new ApiError(400, "use_leave", "To leave the team, use Leave team.");
    const { user, membership } = memberOf(t, userId);
    if (membership.role === "TEAM_OWNER") throw new ApiError(400, "member_is_owner", "The owner can't be removed.");
    user.memberships = user.memberships.filter((m) => m !== membership);
    return [204, null];
  },
  "POST /team/members/leave": (req) => {
    const { user: me, team: t, role } = requireTeam(req, "team.read");
    if (role === "TEAM_OWNER") throw new ApiError(400, "owner_cannot_leave", "Make someone else the owner first.");
    me.memberships = me.memberships.filter((m) => m.teamId !== t.id);
    return [204, null];
  },
  "POST /team/members/transfer-ownership": (req, body) => {
    const { user: me, team: t, role } = requireTeam(req, "team.read");
    if (role !== "TEAM_OWNER") throw new ApiError(403, "not_owner", "Only the owner can transfer ownership.");
    const { user, membership } = memberOf(t, body.userId);
    membership.role = "TEAM_OWNER";
    me.memberships.find((m) => m.teamId === t.id).role = "TEAM_ADMIN";
    t.owner = user;
    return [200, []];
  },
  "GET /team/invitations": (req) => [200, requireTeam(req, "team.manage").team.invitations],
  "POST /team/invitations": (req, body) => {
    const { user: me, team: t } = requireTeam(req, "team.manage");
    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(email)) throw new ApiError(400, "parameter_invalid", "email must be an email", "email");
    const already = [...users.values()].some((u) => u.email === email && u.memberships.some((m) => m.teamId === t.id));
    if (already) throw new ApiError(409, "already_member", "They're already in this team.", "email");
    if (t.invitations.some((i) => i.email === email && i.status === "PENDING"))
      throw new ApiError(409, "already_invited", "They already have an invitation. Resend it instead.", "email");
    const now = new Date();
    const invitation = {
      id: newId(),
      email,
      role: body.role,
      status: "PENDING",
      expired: false,
      expiresAt: new Date(now.getTime() + 7 * 864e5).toISOString(),
      invitedBy: { id: me.id, name: `${me.firstname} ${me.lastname}` },
      lastSentAt: now.toISOString(),
      sendCount: 1,
      createdAt: now.toISOString(),
    };
    t.invitations.push(invitation);
    return [201, invitation];
  },
  "POST /team/invitations/:id/resend": (req, body, { id }) => {
    const { team: t } = requireTeam(req, "team.manage");
    const inv = t.invitations.find((i) => i.id === id && i.status === "PENDING");
    if (!inv) throw new ApiError(404, "invitation_not_found", "No pending invitation with that id.");
    Object.assign(inv, { lastSentAt: new Date().toISOString(), sendCount: inv.sendCount + 1, expired: false });
    return [200, inv];
  },
  "DELETE /team/invitations/:id": (req, body, { id }) => {
    const { team: t } = requireTeam(req, "team.manage");
    const inv = t.invitations.find((i) => i.id === id && i.status === "PENDING");
    if (!inv) throw new ApiError(404, "invitation_not_found", "No pending invitation with that id.");
    inv.status = "REVOKED";
    return [200, inv];
  },
  "GET /wallet": (req, body, params, url) => {
    const { team: t } = requireTeam(req, "wallet.read");
    const live = url.searchParams.get("livemode") === "true";
    if (live && t.liveStatus !== "APPROVED")
      throw new ApiError(404, "live_wallet_not_open", "The live wallet opens when Pickriders approves live access.");
    return [200, walletOf(t, live)];
  },
  "GET /wallet/transactions": (req, body, params, url) => {
    const { team: t } = requireTeam(req, "wallet.read");
    const q = Object.fromEntries(url.searchParams);
    const rows = [...t.wallets[q.livemode === "true" ? "live" : "test"].transactions]
      .reverse()
      .filter((r) => !q.type || r.type === q.type);
    const from = q.starting_after ? rows.findIndex((r) => r.id === q.starting_after) + 1 : 0;
    const limit = Number(q.limit ?? 20);
    return [
      200,
      {
        object: "list",
        data: rows.slice(from, from + limit),
        has_more: rows.length > from + limit,
        url: `${D}/wallet/transactions`,
      },
    ];
  },
  "POST /wallet/test-funds": (req, body) => {
    const { team: t } = requireTeam(req, "wallet.fund");
    const amount = Number(body.amount);
    if (!Number.isInteger(amount) || amount < 1 || amount > 1_000_000_000)
      throw new ApiError(400, "parameter_invalid", "amount can be at most 1000000000 kobo per top-up", "amount");
    t.wallets.test.available += amount;
    record(t, false, "credit", "test_funding", amount, "Test top-up");
    return [200, walletOf(t, false)];
  },
  "POST /wallet/funding-sessions": (req, body) => {
    const { team: t } = requireTeam(req, "wallet.fund");
    if (t.liveStatus !== "APPROVED")
      throw new ApiError(403, "live_access_required", "Card top-ups fund the live wallet.");
    // Stands in for Paystack: the payment succeeds and the checkout sends the payer straight back.
    t.wallets.live.available += Number(body.amount);
    record(t, true, "credit", "wallet_funding", Number(body.amount), "Card top-up");
    return [
      200,
      {
        object: "funding_session",
        reference: `ref_${newId()}`,
        url: body.success_url,
        amount: body.amount,
        currency: "NGN",
        livemode: true,
        created: new Date().toISOString(),
      },
    ];
  },
  "GET /wallet/low-balance-alert": (req) => [200, { threshold: requireTeam(req, "wallet.read").team.lowBalance }],
  "PUT /wallet/low-balance-alert": (req, body) => {
    const { team: t } = requireTeam(req, "wallet.fund");
    t.lowBalance = body.threshold ?? null;
    return [200, { threshold: t.lowBalance }];
  },
  "GET /wallet/funding-account": (req) => {
    const { team: t } = requireTeam(req, "wallet.read");
    if (!t.fundingAccount) throw new ApiError(404, "funding_account_not_set_up", "No transfer account yet.");
    return [200, t.fundingAccount];
  },
  "POST /wallet/funding-account": (req, body) => {
    const { team: t } = requireTeam(req, "wallet.fund");
    if (!/^\d{11}$/.test(body.bvn ?? "")) throw new ApiError(400, "parameter_invalid", "bvn must be 11 digits", "bvn");
    // Paystack checks the BVN in the background; the mock has it done at once.
    t.fundingAccount = {
      object: "funding_account",
      status: "active",
      bank_name: "Wema Bank",
      account_number: "9930012345",
      account_name: `PICKRIDERS/${t.name.toUpperCase()}`,
      bvn_last4: body.bvn.slice(-4),
      failure_reason: null,
    };
    return [201, t.fundingAccount];
  },
  "GET /wallet/auto-top-up": (req) => [200, requireTeam(req, "wallet.read").team.autoTopUp],
  "PUT /wallet/auto-top-up": (req, body) => {
    const { team: t } = requireTeam(req, "wallet.fund");
    if (body.enabled && !t.autoTopUp.card) throw new ApiError(400, "card_required", "Save a card first.");
    Object.assign(t.autoTopUp, {
      enabled: !!body.enabled,
      threshold: body.threshold,
      amount: body.amount,
      disabled_reason: null,
    });
    return [200, t.autoTopUp];
  },
  "POST /wallet/auto-top-up/card": (req, body) => {
    const { team: t } = requireTeam(req, "wallet.fund");
    t.autoTopUp.card = { brand: "Visa", last4: "4081", exp_month: "12", exp_year: "2030", bank: "Test Bank" };
    t.wallets.live.available += Number(body.amount);
    record(t, true, "credit", "wallet_funding", Number(body.amount), "Card top-up");
    return [
      200,
      {
        object: "funding_session",
        reference: `ref_${newId()}`,
        url: body.success_url,
        amount: body.amount,
        currency: "NGN",
        livemode: true,
        created: new Date().toISOString(),
      },
    ];
  },
  "DELETE /wallet/auto-top-up/card": (req) => {
    const { team: t } = requireTeam(req, "wallet.fund");
    Object.assign(t.autoTopUp, { card: null, enabled: false });
    return [200, t.autoTopUp];
  },
  "GET /service-areas": (req) => {
    requireTeam(req, "orders.read");
    return [200, { object: "list", data: [AREA] }];
  },
  "POST /quotes": (req, body, params, url) => {
    const { team: t } = requireTeam(req, "orders.write");
    const live = liveFor(t, url);
    return [200, makeQuote(t, body, live)];
  },
  "POST /orders": (req, body, params, url) => {
    const { team: t } = requireTeam(req, "orders.write");
    const live = liveFor(t, url);
    const quote = body.quote_id ? t.quotes.find((q) => q.id === body.quote_id) : makeQuote(t, body, live);
    if (!quote) throw new ApiError(404, "resource_missing", "No quote with that id.", "quote_id");
    if (!quote.usable)
      throw new ApiError(400, "quote_used", "That quote was already used or has expired. Get a new one.", "quote_id");
    if (body.reference && t.orders.some((o) => o.reference === body.reference && o.livemode === live))
      throw new ApiError(409, "reference_taken", "Another order already has that reference.", "reference");
    quote.usable = false;
    const now = new Date().toISOString();
    let drop = 0;
    const order = {
      object: "order",
      id: `ord_${newId()}`,
      type: quote.type,
      status: "searching",
      number: String(100000 + t.orders.length + 1),
      reference: body.reference ?? null,
      metadata: {},
      quote_id: quote.id,
      service_area: quote.service_area,
      pricing: {
        mode: "fixed",
        currency: "NGN",
        amount: quote.recommended_price,
        delivery_fee: quote.breakdown.delivery_fee,
        service_charge: quote.breakdown.service_charge,
        max_amount: null,
        min_offer_percentage: null,
        auto_accept_after_s: null,
      },
      stops: quote.input.map((s, i) => ({
        id: `stop_${newId()}`,
        role: i === 0 ? "pickup" : "dropoff",
        status: "pending",
        address: s.address,
        lat: s.lat,
        lng: s.lng,
        contact: s.contact,
        instructions: s.instructions ?? null,
        package: null,
        confirmation_code: i === 0 ? null : String(4821 + ++drop),
        arrived_at: null,
        completed_at: null,
        cancelled_at: null,
        proof: null,
        pending_change: null,
        tracking_url: i === 0 ? null : `https://track.pickriders.test/s/${newId()}`,
      })),
      rider: null,
      tracking_url: `https://track.pickriders.test/o/${newId()}`,
      dispatch: "auto",
      scheduled_for: null,
      cancellation: null,
      delivered_at: null,
      livemode: live,
      created: now,
      updated: now,
    };
    const w = t.wallets[live ? "live" : "test"];
    if (w.available < order.pricing.amount)
      throw new ApiError(402, "insufficient_funds", "Your wallet can't cover this order. Add money and try again.");
    w.available -= order.pricing.amount;
    w.held += order.pricing.amount;
    record(t, live, "debit", "order_hold", order.pricing.amount, `Held for order #${order.number}`, order.id);
    t.orders.push(order);
    if (!live) t.testOrders++;
    return [201, order];
  },
  "GET /orders": (req, body, params, url) => {
    const { team: t } = requireTeam(req, "orders.read");
    const live = liveFor(t, url);
    const q = Object.fromEntries(url.searchParams);
    const rows = [...t.orders]
      .reverse()
      .filter(
        (o) =>
          o.livemode === live && (!q.status || o.status === q.status) && (!q.reference || o.reference === q.reference),
      );
    const from = q.starting_after ? rows.findIndex((o) => o.id === q.starting_after) + 1 : 0;
    const limit = Number(q.limit ?? 20);
    return [
      200,
      {
        object: "list",
        data: rows.slice(from, from + limit),
        has_more: rows.length > from + limit,
        url: `${D}/orders`,
      },
    ];
  },
  "GET /orders/:id": (req, body, { id }, url) => [200, findOrder(req, id, url, "orders.read")],
  "GET /orders/:id/tracking": (req, body, { id }, url) => {
    const order = findOrder(req, id, url, "orders.read");
    const active = order.rider && !["delivered", "cancelled", "failed"].includes(order.status);
    const next = order.stops.find((s) => s.status !== "completed");
    const prev = [...order.stops].reverse().find((s) => s.status === "completed") ?? order.stops[0];
    const at =
      active && next
        ? {
            lat: (prev.lat + next.lat) / 2,
            lng: (prev.lng + next.lng) / 2,
            heading: null,
            updated_at: new Date().toISOString(),
          }
        : null;
    return [
      200,
      {
        object: "order_tracking",
        order_id: order.id,
        status: order.status,
        rider: active ? { name: order.rider.name, photo_url: null, vehicle: order.rider.vehicle, location: at } : null,
        stops: order.stops.map((s) => ({
          id: s.id,
          role: s.role,
          status: s.status,
          address: s.address,
          eta_s: s.status === "completed" ? null : 600,
          completed_at: s.completed_at,
        })),
        tracking_url: order.tracking_url,
      },
    ];
  },
  "POST /orders/:id/cancel": (req, body, { id }, url) => {
    const order = findOrder(req, id, url, "orders.write");
    if (["delivered", "cancelled", "failed"].includes(order.status))
      throw new ApiError(409, "order_not_cancellable", "This order can't be cancelled any more.");
    const charged = order.rider ? order.pricing.service_charge : 0;
    const w = t_of(req).wallets[order.livemode ? "live" : "test"];
    w.held -= order.pricing.amount;
    w.available += order.pricing.amount - charged;
    record(
      t_of(req),
      order.livemode,
      "credit",
      "order_refund",
      order.pricing.amount - charged,
      `Refund for order #${order.number}`,
      order.id,
    );
    Object.assign(order, {
      status: "cancelled",
      updated: new Date().toISOString(),
      cancellation: {
        cancelled_by: "developer",
        reason: body.reason ?? null,
        cancelled_at: new Date().toISOString(),
        charged_amount: charged,
        refunded_amount: order.pricing.amount - charged,
      },
    });
    return [200, order];
  },
  "POST /orders/:id/advance": (req, body, { id }) => {
    const { team: t } = requireTeam(req, "orders.write");
    const order = t.orders.find((o) => o.id === id && !o.livemode);
    if (!order) throw new ApiError(404, "resource_missing", "No test order with that id.", "id");
    if (["delivered", "cancelled", "failed"].includes(order.status))
      throw new ApiError(409, "order_finished", "This order is already finished.");
    do step(order);
    while (body.to && order.status !== body.to && order.status !== "delivered");
    return [200, order];
  },
};

const AREA = {
  object: "service_area",
  id: "NG-LA",
  country_code: "NG",
  country_name: "Nigeria",
  state_code: "LA",
  state_name: "Lagos",
  currency: "NGN",
  minimum_price: 300000,
  rider_search_radius_km: 20,
};
function liveFor(t, url) {
  const live = url.searchParams.get("livemode") === "true";
  if (live && t.liveStatus !== "APPROVED")
    throw new ApiError(403, "live_access_required", "Live mode needs approved live access.");
  return live;
}
function findOrder(req, id, url, permission) {
  const { team: t } = requireTeam(req, permission);
  const live = liveFor(t, url);
  const order = t.orders.find((o) => o.id === id && o.livemode === live);
  if (!order) throw new ApiError(404, "resource_missing", "No order with that id.", "id");
  return order;
}
const km = (a, b) => {
  const r = (d) => (d * Math.PI) / 180;
  const h =
    Math.sin(r(b.lat - a.lat) / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(r(b.lng - a.lng) / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
};
function makeQuote(t, body, live) {
  const stops = body.stops ?? [];
  if (stops.length < 2)
    throw new ApiError(400, "parameter_invalid", "stops needs a pickup and at least one drop-off.", "stops");
  if (body.service_area !== AREA.id)
    throw new ApiError(400, "service_area_invalid", "Pickriders doesn't deliver there yet.", "service_area");
  let distance = 0;
  for (let i = 1; i < stops.length; i++) distance += km(stops[i - 1], stops[i]);
  const fee = Math.max(300000, Math.round((distance * 15000) / 1000) * 1000);
  const quote = {
    object: "quote",
    id: `quo_${newId()}`,
    type: body.type ?? (stops.length > 2 ? "batch" : "single"),
    service_area: AREA.id,
    currency: "NGN",
    recommended_price: fee + 50000,
    min_price: Math.round(fee * 0.8) + 50000,
    max_price: Math.round(fee * 1.4) + 50000,
    breakdown: { delivery_fee: fee, service_charge: 50000 },
    distance_m: Math.round(distance * 1000),
    duration_s: Math.round((distance / 25) * 3600),
    stops: [],
    scheduled_for: null,
    expires_at: new Date(Date.now() + 15 * 60_000).toISOString(),
    usable: true,
    livemode: live,
    created: new Date().toISOString(),
    input: stops,
  };
  t.quotes.push(quote);
  const { input, ...publicQuote } = quote;
  return publicQuote;
}
/** One move of the test rider: take it, head to the pickup, arrive, collect, then each drop-off. */
function step(order) {
  const now = new Date().toISOString();
  order.updated = now;
  if (order.status === "searching") {
    order.status = "rider_assigned";
    order.rider = {
      name: "Tunde A.",
      phone: "+2348030000000",
      photo_url: null,
      rating: 4.8,
      vehicle: { make: "Bajaj", model: "Boxer", color: "Red", plate_number: "LAG 123 XY" },
    };
    return;
  }
  if (order.status === "rider_assigned") {
    order.status = "picking_up";
    order.stops[0].status = "en_route";
    return;
  }
  const stop = order.stops.find((s) => s.status !== "completed");
  if (stop.status === "pending") stop.status = "en_route";
  else if (stop.status === "en_route") Object.assign(stop, { status: "arrived", arrived_at: now });
  else Object.assign(stop, { status: "completed", completed_at: now });
  if (order.stops[0].status === "completed" && order.status === "picking_up") order.status = "in_transit";
  if (order.stops.every((s) => s.status === "completed")) {
    Object.assign(order, { status: "delivered", delivered_at: now });
    const owner = [...teams.values()].find((t) => t.orders.includes(order));
    owner.wallets.test.held -= order.pricing.amount;
  }
}
const t_of = (req) => teams.get(req.headers["x-team-id"]);
function memberOf(t, userId) {
  const user = [...users.values()].find((u) => u.id === userId);
  const membership = user?.memberships.find((m) => m.teamId === t.id);
  if (!membership) throw new ApiError(404, "member_not_found", "That person is not a member of this team.");
  return { user, membership };
}
/** A wallet transaction, as the ledger shows it. */
function record(t, live, type, purpose, amount, description, order = null) {
  const w = t.wallets[live ? "live" : "test"];
  w.transactions.push({
    object: "transaction",
    id: `txn_${newId()}`,
    type,
    purpose,
    status: "success",
    amount,
    currency: "NGN",
    balance_after: w.available + w.held,
    description,
    order,
    livemode: live,
    created: new Date().toISOString(),
  });
}
const walletOf = (t, live) => ({
  object: "wallet",
  currency: "NGN",
  available: t.wallets[live ? "live" : "test"].available,
  held: t.wallets[live ? "live" : "test"].held,
  livemode: live,
});

const newSecret = () => `whsec_${randomBytes(24).toString("base64url")}`;
const presentEndpoint = ({ secret, previousSecret, deliveries, ...endpoint }) => ({
  object: "webhook_endpoint",
  ...endpoint,
});
function checkUrl(raw) {
  try {
    const url = new URL(String(raw ?? "").trim());
    if (!["http:", "https:"].includes(url.protocol)) throw new Error();
    return url.toString();
  } catch {
    throw new ApiError(400, "url_invalid", "Use a full https URL on the public internet.", "url");
  }
}
function findEndpoint(req, id, permission) {
  const { team: t } = requireTeam(req, permission);
  const endpoint = t.endpoints.find((e) => e.id === id);
  if (!endpoint) throw new ApiError(404, "resource_missing", "No webhook endpoint with that id.", "id");
  return endpoint;
}
const makeEvent = (livemode, type, object) => ({
  object: "event",
  id: `evt_${newId()}`,
  type,
  created: new Date().toISOString(),
  livemode,
  data: { object },
});
const presentDelivery = ({ event, ...d }) => ({ ...d, request_body: JSON.stringify(event) });

/** POSTs the event to the endpoint now, signed with its secret(s), and records the attempt. */
async function deliver(endpoint, event) {
  const delivery = {
    object: "webhook_delivery",
    id: `whd_${newId()}`,
    endpoint_id: endpoint.id,
    event_id: event.id,
    event_type: event.type,
    status: "delivering",
    attempt_count: 0,
    next_attempt_at: null,
    delivered_at: null,
    created: new Date().toISOString(),
    attempts: [],
    event,
  };
  endpoint.deliveries.push(delivery);

  const body = JSON.stringify(event);
  const t = Math.floor(Date.now() / 1000);
  const secrets = [endpoint.secret];
  if (endpoint.previousSecret && new Date(endpoint.previous_secret_expires_at) > new Date())
    secrets.push(endpoint.previousSecret);
  const signature = [
    `t=${t}`,
    ...secrets.map((s) => `v1=${createHmac("sha256", s).update(`${t}.${body}`).digest("hex")}`),
  ].join(",");

  const started = Date.now();
  const attempt = { at: new Date().toISOString(), status_code: null, duration_ms: 0, response_body: null, error: null };
  try {
    const res = await fetch(endpoint.url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "pickriders-signature": signature,
        "user-agent": "Pickriders-Webhooks/1.0",
      },
      body,
      signal: AbortSignal.timeout(5000),
    });
    attempt.status_code = res.status;
    attempt.response_body = (await res.text()).slice(0, 2048) || null;
    if (!res.ok) attempt.error = `The endpoint answered ${res.status}.`;
  } catch (error) {
    attempt.error = error.name === "TimeoutError" ? "No answer within 5 seconds." : "Couldn't connect to the endpoint.";
  }
  attempt.duration_ms = Date.now() - started;
  delivery.attempts.push(attempt);
  delivery.attempt_count = 1;

  const ok = attempt.status_code !== null && attempt.status_code < 300;
  if (ok) Object.assign(delivery, { status: "succeeded", delivered_at: new Date().toISOString() });
  // A ping isn't retried; anything else waits for its next try (the mock never makes it).
  else if (event.type === "ping") delivery.status = "failed";
  else Object.assign(delivery, { status: "pending", next_attempt_at: new Date(Date.now() + 60_000).toISOString() });

  if (event.type !== "ping") endpoint.failing_since = ok ? null : (endpoint.failing_since ?? attempt.at);
  return delivery;
}

const usable = (k) => k.status === "ACTIVE" || (k.status === "EXPIRING" && new Date(k.expiresAt) > new Date());
const presentKey = ({ secret, ...key }) => key;
function issueKey(t, user, { label, livemode, scopes }) {
  const secret = `sk_${livemode ? "live" : "test"}_${randomUUID().replace(/-/g, "")}`;
  const key = {
    id: newId(),
    label,
    prefix: secret.slice(0, 12),
    livemode,
    scopes,
    status: "ACTIVE",
    createdBy: { id: user.id, name: `${user.firstname} ${user.lastname}` },
    createdAt: new Date().toISOString(),
    lastUsedAt: null,
    lastUsedIp: null,
    expiresAt: null,
    revokedAt: null,
    secret,
  };
  t.keys.push(key);
  return key;
}

/** Routes are "METHOD /path/:param"; the first whose pattern fits wins. */
const compiled = Object.entries(routes).map(([key, handler]) => {
  const [method, path] = key.split(" ");
  return { method, pattern: new RegExp(`^${path.replace(/:(\w+)/g, "(?<$1>[^/]+)")}$`), handler };
});
function match(method, path) {
  for (const route of compiled) {
    const m = route.method === method && path.match(route.pattern);
    if (m) return [route.handler, m.groups ?? {}];
  }
  return [];
}

reset();
createServer(async (req, res) => {
  const url = new URL(req.url, "http://mock");
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const body = chunks.length ? JSON.parse(Buffer.concat(chunks).toString() || "{}") : {};
  const requestId = `req_${randomUUID().replace(/-/g, "").slice(0, 14)}`;
  const send = (status, data) => {
    res.writeHead(status, { "content-type": "application/json", "request-id": requestId });
    res.end(data == null ? undefined : JSON.stringify(data));
  };

  if (url.pathname === "/__test/reset") return (reset(), lastSent.clear(), send(204, null));
  if (url.pathname === "/__test/code") return send(200, { code: lastSent.get(url.searchParams.get("to")) ?? null });
  if (url.pathname === "/__test/event") {
    const user = users.get(url.searchParams.get("email"));
    const own = user && teams.get(user.memberships.find((m) => m.role === "TEAM_OWNER")?.teamId);
    if (!own) return send(404, { error: { code: "no_such_team" } });
    const type = url.searchParams.get("type") ?? "order.delivered";
    const event = makeEvent(false, type, { object: "order", id: `ord_${newId()}`, status: type.split(".").pop() });
    const listening = own.endpoints.filter(
      (e) =>
        !e.livemode && e.status === "enabled" && (e.enabled_events.includes("*") || e.enabled_events.includes(type)),
    );
    for (const endpoint of listening) await deliver(endpoint, event);
    return send(200, { event_id: event.id, delivered_to: listening.length });
  }
  if (url.pathname === "/__test/member") {
    const owner = users.get(url.searchParams.get("owner"));
    const own = owner && owner.memberships.find((m) => m.role === "TEAM_OWNER");
    if (!own) return send(404, { error: { code: "no_such_team" } });
    const [firstname, lastname = "Ade"] = (url.searchParams.get("name") ?? "Bo Ade").split(" ");
    const person = makeUser({
      firstname,
      lastname,
      email: url.searchParams.get("email"),
      phone: "2348035550000",
      password: "correct-horse-1",
    });
    person.emailVerified = person.phoneVerified = true;
    person.memberships.push({
      teamId: own.teamId,
      role: url.searchParams.get("role") ?? "TEAM_DEVELOPER",
      joinedAt: new Date().toISOString(),
    });
    return send(204, null);
  }
  if (url.pathname === "/__test/requests") {
    const user = users.get(url.searchParams.get("email"));
    const own = user && teams.get(user.memberships.find((m) => m.role === "TEAM_OWNER")?.teamId);
    if (!own) return send(404, { error: { code: "no_such_team" } });
    const key = own.keys.find((k) => !k.livemode) ?? null;
    const n = Number(url.searchParams.get("n") ?? 5);
    const kinds = [
      {
        method: "POST",
        path: "/developer/api/v1/quotes",
        status: 200,
        body: { type: "single", service_area: "NG-LA" },
        res: { object: "quote", id: "quo_1", recommended_price: 350000 },
      },
      {
        method: "POST",
        path: "/developer/api/v1/orders",
        status: 201,
        body: { quote_id: "quo_1", reference: "shop-42", contact: { phone: "[redacted]" } },
        res: { object: "order", id: "ord_1", status: "searching" },
      },
      { method: "GET", path: "/developer/api/v1/orders/ord_1", status: 200, res: { object: "order", id: "ord_1" } },
      {
        method: "POST",
        path: "/developer/api/v1/orders",
        status: 402,
        body: { quote_id: "quo_2" },
        res: {
          error: {
            type: "insufficient_funds_error",
            code: "insufficient_funds",
            message: "Your wallet can't cover this order.",
          },
        },
        errorType: "insufficient_funds_error",
        errorCode: "insufficient_funds",
      },
      {
        method: "GET",
        path: "/developer/api/v1/wallet",
        status: 500,
        res: { error: { type: "api_error", code: "internal_error" } },
        errorType: "api_error",
        errorCode: "internal_error",
      },
    ];
    const made = [];
    for (let i = 0; i < n; i++) {
      const kind = kinds[i % kinds.length];
      const log = {
        id: newId(),
        requestId: `req_${randomUUID().replace(/-/g, "").slice(0, 24)}`,
        method: kind.method,
        path: kind.path,
        status: kind.status,
        durationMs: 40 + ((i * 37) % 300),
        livemode: false,
        key: key ? { id: key.id, label: key.label, prefix: key.prefix } : null,
        errorType: kind.errorType ?? null,
        errorCode: kind.errorCode ?? null,
        createdAt: new Date(Date.now() - (n - i) * 60_000).toISOString(),
        query: null,
        ip: "102.89.34.10",
        userAgent: "pickriders-node/1.0.0",
        requestBody: kind.body ?? null,
        responseBody: kind.res,
      };
      own.logs.push(log);
      made.push(log.requestId);
    }
    return send(200, { requestIds: made });
  }
  if (url.pathname === "/__test/join") {
    const user = users.get(url.searchParams.get("email"));
    const owner = makeUser({
      firstname: "Kemi",
      lastname: "Ade",
      email: `owner.${newId()}@globex.test`,
      phone: "2348039990000",
      password: "x",
    });
    const t = makeTeam(url.searchParams.get("name"), owner);
    owner.memberships.push({ teamId: t.id, role: "TEAM_OWNER" });
    user.memberships.push({ teamId: t.id, role: url.searchParams.get("role") ?? "TEAM_VIEWER" });
    return send(204, null);
  }
  if (url.pathname === "/__test/team" || url.pathname === "/__test/order") {
    const user = users.get(url.searchParams.get("email"));
    const own = user && teams.get(user.memberships.find((m) => m.role === "TEAM_OWNER")?.teamId);
    if (!own) return send(404, { error: { code: "no_such_team" } });
    if (url.pathname === "/__test/order") own.testOrders++;
    else {
      const status = url.searchParams.get("liveStatus");
      const reason = url.searchParams.get("reason");
      Object.assign(own, {
        liveStatus: status,
        liveReviewedAt: ["APPROVED", "REJECTED", "SUSPENDED"].includes(status) ? new Date().toISOString() : null,
        liveRequestedAt: status === "NOT_REQUESTED" ? null : (own.liveRequestedAt ?? new Date().toISOString()),
        liveRejectionReason: status === "REJECTED" ? reason : null,
        liveSuspensionReason: status === "SUSPENDED" ? reason : null,
      });
    }
    return send(204, null);
  }

  const [handler, params] = url.pathname.startsWith(D) ? match(req.method, url.pathname.slice(D.length)) : [];
  if (!handler)
    return send(404, {
      error: {
        type: "not_found_error",
        code: "route_not_found",
        message: "No such route.",
        param: null,
        request_id: requestId,
      },
    });
  try {
    await new Promise((r) => setTimeout(r, Number(process.env.MOCK_API_LATENCY_MS ?? 250)));
    const [status, data] = await handler(req, body, params, url);
    send(status, data);
  } catch (error) {
    if (!(error instanceof ApiError)) throw error;
    send(error.status, {
      error: {
        type: typeFor(error.status),
        code: error.code,
        message: error.message,
        param: error.param,
        request_id: requestId,
      },
    });
  }
}).listen(PORT, "127.0.0.1", () => console.log(`mock API on http://127.0.0.1:${PORT}`));
