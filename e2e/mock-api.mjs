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
//   POST /__test/event?email=&type=                # a test-mode event for their own team, delivered for real
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
  };
  teams.set(t.id, t);
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
const PERMISSIONS = {
  TEAM_OWNER: ALL,
  TEAM_ADMIN: ALL.filter((p) => p !== "team.transfer"),
  TEAM_DEVELOPER: [
    "team.read",
    "keys.read",
    "keys.write",
    "webhooks.read",
    "webhooks.write",
    "orders.read",
    "orders.write",
    "wallet.read",
    "logs.read",
  ],
  TEAM_FINANCE: ["team.read", "orders.read", "wallet.read", "wallet.fund", "billing.read"],
  TEAM_VIEWER: ["team.read", "keys.read", "webhooks.read", "orders.read", "wallet.read", "logs.read"],
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
};

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
