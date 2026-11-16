import { postmanCollection } from "@/lib/docs/postman";

// Built once from the API document (step 12.9).
export const dynamic = "force-static";

export function GET() {
  return Response.json(postmanCollection(), {
    headers: { "content-disposition": 'attachment; filename="pickriders.postman_collection.json"' },
  });
}
