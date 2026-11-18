// @file src/routes/api/webhooks/pickriders/+server.ts
import type { RequestHandler } from "@sveltejs/kit";

import { pickriders } from "$lib/server/pickriders";

pickriders.webhooks.on("order.delivered", async (event) => {
  await db.orders.update(event.data.object.reference!, { status: "delivered" });
});

const handle = pickriders.webhooks.handler();

export const POST: RequestHandler = ({ request }) => handle(request);
