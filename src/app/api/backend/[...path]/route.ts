import type { NextRequest } from "next/server";

import { API_URL } from "@/constant";
import { SESSION_COOKIE } from "@/lib/session/cookie";
import { proxy } from "@/lib/session/proxy";

/** Every dashboard API call, with the session cookie as its bearer token. See lib/session/proxy.ts. */
export const dynamic = "force-dynamic";

const handle = (req: NextRequest, { params }: { params: { path: string[] } }) =>
  proxy(req, params.path, { apiUrl: API_URL, token: req.cookies.get(SESSION_COOKIE)?.value });

export { handle as GET, handle as POST, handle as PUT, handle as PATCH, handle as DELETE };
