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
import { createServer } from "node:http";
import { randomInt, randomUUID } from "node:crypto";

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
};

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
