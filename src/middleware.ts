import { NextResponse, type NextRequest } from "next/server";

import { SESSION_COOKIE } from "@/lib/session/cookie";
import { isGuestPath, isOpenPath, safeRedirect } from "@/lib/session/paths";

/**
 * The auth gate (CLAUDE.md §3). Signed out: every page except the guest and open ones sends you to
 * sign in, with a way back. Signed in: the guest pages send you on. The cookie's presence is all
 * this checks; the API is the real judge, and a 401 from it clears the cookie.
 */
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const signedIn = Boolean(req.cookies.get(SESSION_COOKIE)?.value);

  if (isOpenPath(pathname)) return NextResponse.next();

  if (isGuestPath(pathname)) {
    if (!signedIn) return NextResponse.next();
    return NextResponse.redirect(new URL(safeRedirect(req.nextUrl.searchParams.get("redirect")), req.url));
  }

  if (signedIn) return NextResponse.next();
  const login = new URL("/auth/login", req.url);
  if (pathname !== "/") login.searchParams.set("redirect", pathname + search);
  return NextResponse.redirect(login);
}

export const config = {
  // Pages only: not the API routes, Next's assets or files with an extension.
  matcher: ["/((?!api/|_next/|.*\\.[\\w]+$).*)"],
};
