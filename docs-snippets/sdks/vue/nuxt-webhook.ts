// @file server/api/webhooks/pickriders.post.ts
import { defineEventHandler, toWebRequest } from "h3";

import { pickriders } from "~/server/utils/pickriders";

pickriders.webhooks.on("order.delivered", async (event) => {
  await db.orders.update(event.data.object.reference!, { status: "delivered" });
});

const handle = pickriders.webhooks.handler();

// Nuxt hasn't read the body, so the web Request still holds it exactly as it arrived.
export default defineEventHandler((event) => handle(toWebRequest(event)));
