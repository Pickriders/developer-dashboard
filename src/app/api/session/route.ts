import type { NextRequest } from "next/server";

import { clearedSessionCookie } from "@/lib/session/cookie";

/** Signs out: clears the session cookie. The token is stateless, so there is nothing to revoke upstream. */
export function DELETE(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (origin && origin !== req.nextUrl.origin) return new Response(null, { status: 403 });
  return new Response(null, { status: 204, headers: { "set-cookie": clearedSessionCookie() } });
}
