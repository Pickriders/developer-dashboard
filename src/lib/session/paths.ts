/**
 * Which pages need a session. Shared by the middleware (server) and the API client's 401
 * handling (browser), so both agree on where a signed-out person may be.
 */

/** Pages for someone signed out: a signed-in visitor is sent on to the dashboard. */
export const GUEST_PATHS = ["/auth/login", "/auth/signup", "/auth/forgot-password"];

/** Pages anyone can open, signed in or not. */
export const OPEN_PATHS = ["/auth/invite", "/design"];

const matches = (pathname: string, paths: string[]) =>
  paths.some((p) => pathname === p || pathname.startsWith(`${p}/`));

export const isGuestPath = (pathname: string) => matches(pathname, GUEST_PATHS);
export const isOpenPath = (pathname: string) => matches(pathname, OPEN_PATHS);

/**
 * A `?redirect=` value that is safe to follow after signing in: a path on this site, never
 * another origin ("//evil.com", "https://…") and never back to a guest page.
 */
export function safeRedirect(value: string | null | undefined, fallback = "/"): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return fallback;
  try {
    const url = new URL(value, "http://local");
    if (url.origin !== "http://local" || isGuestPath(url.pathname)) return fallback;
    return url.pathname + url.search + url.hash;
  } catch {
    return fallback;
  }
}
