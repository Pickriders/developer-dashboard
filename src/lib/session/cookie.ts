/**
 * The session cookie. It holds the dashboard's bearer token, httpOnly so no script on the page
 * (ours or an injected one) can read it. Only the route handlers in src/app/api set or clear it.
 */
export const SESSION_COOKIE = "pr_dev_session";

/** Used when the API doesn't say how long a token lasts. */
const FALLBACK_MAX_AGE_S = 60 * 60 * 24 * 7;

const attributes = () => [
  "Path=/",
  "HttpOnly",
  "SameSite=Lax",
  ...(process.env.NODE_ENV === "production" ? ["Secure"] : []),
];

export const sessionCookie = (token: string, maxAgeS?: number) =>
  [
    `${SESSION_COOKIE}=${encodeURIComponent(token)}`,
    `Max-Age=${Math.floor(maxAgeS || FALLBACK_MAX_AGE_S)}`,
    ...attributes(),
  ].join("; ");

export const clearedSessionCookie = () => [`${SESSION_COOKIE}=`, "Max-Age=0", ...attributes()].join("; ");
