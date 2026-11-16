import { SPEC } from "@/lib/docs/openapi";

// Built once: the API document the reference is generated from (step 12.9).
export const dynamic = "force-static";

export function GET() {
  return Response.json(SPEC, {
    headers: { "content-disposition": 'inline; filename="pickriders-openapi.json"' },
  });
}
