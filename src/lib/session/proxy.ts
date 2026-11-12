import { clearedSessionCookie, sessionCookie } from "./cookie";

/**
 * The browser's only way to the backend: /api/backend/<path> forwards to API_URL/<path> with the
 * session cookie turned into `Authorization: Bearer`. Keeping the hop on our own origin is what
 * lets the token stay in an httpOnly cookie.
 *
 * - Only dashboard routes are forwarded, so this is not an open proxy.
 * - Writes must come from this origin (the cookie is SameSite=Lax; this is the second lock).
 * - Responses that start a session (sign-in, sign-up, password reset) have their token moved into
 *   the cookie and removed from the body, so page code never sees it.
 * - A 401 on a signed-in call clears the cookie: the session is over.
 */
export const DASHBOARD_PREFIX = "developer/api/v1/dashboard/";

export const SESSION_ROUTES = new Set(
  ["auth/login", "auth/signup", "auth/password/reset"].map((p) => DASHBOARD_PREFIX + p),
);

const FORWARDED_REQUEST_HEADERS = [
  "accept",
  "accept-language",
  "content-type",
  "idempotency-key",
  "user-agent",
  "x-team-id",
];
const FORWARDED_RESPONSE_HEADERS = ["content-type", "request-id", "retry-after", "idempotency-replayed"];

type ProxyOptions = { apiUrl: string; token?: string; fetchImpl?: typeof fetch };

const error = (status: number, type: string, code: string, message: string) =>
  Response.json({ error: { type, code, message, param: null, request_id: null } }, { status });

export async function proxy(req: Request, path: string[], { apiUrl, token, fetchImpl = fetch }: ProxyOptions) {
  const joined = path.map(encodeURIComponent).join("/");
  if (!joined.startsWith(DASHBOARD_PREFIX) || path.some((p) => p === ".." || p === ".")) {
    return error(404, "not_found_error", "route_not_found", "No such dashboard route.");
  }

  const method = req.method.toUpperCase();
  const incoming = new URL(req.url);
  if (method !== "GET" && method !== "HEAD") {
    const origin = req.headers.get("origin");
    if (origin && origin !== incoming.origin) {
      return error(403, "permission_error", "cross_site_request", "Requests must come from the dashboard itself.");
    }
  }

  const headers = new Headers();
  for (const name of FORWARDED_REQUEST_HEADERS) {
    const value = req.headers.get(name);
    if (value) headers.set(name, value);
  }
  if (token) headers.set("authorization", `Bearer ${token}`);
  const clientIp = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip");
  if (clientIp) headers.set("x-forwarded-for", clientIp);

  let upstream: Response;
  try {
    upstream = await fetchImpl(`${apiUrl.replace(/\/$/, "")}/${joined}${incoming.search}`, {
      method,
      headers,
      body: method === "GET" || method === "HEAD" ? undefined : await req.arrayBuffer(),
      redirect: "manual",
      cache: "no-store",
    });
  } catch {
    return error(
      502,
      "api_error",
      "api_unreachable",
      "We couldn't reach Pickriders. Check your connection and try again.",
    );
  }

  const out = new Headers();
  for (const name of FORWARDED_RESPONSE_HEADERS) {
    const value = upstream.headers.get(name);
    if (value) out.set(name, value);
  }
  out.set("cache-control", "no-store");

  if (SESSION_ROUTES.has(joined) && upstream.ok) {
    const { accessToken, ...rest } = (await upstream.json()) as { accessToken?: string; expiresIn?: number };
    if (accessToken) out.append("set-cookie", sessionCookie(accessToken, rest.expiresIn));
    out.set("content-type", "application/json");
    return new Response(JSON.stringify(rest), { status: upstream.status, headers: out });
  }

  if (upstream.status === 401 && token) out.append("set-cookie", clearedSessionCookie());
  return new Response(upstream.status === 204 ? null : upstream.body, { status: upstream.status, headers: out });
}
