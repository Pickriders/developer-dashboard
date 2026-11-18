// @file app/api/webhooks/pickriders/route.ts
import { revalidatePath } from "next/cache";

import { pickriders } from "@/lib/pickriders";

pickriders.webhooks.on("order.*", async (event) => {
  const delivery = event.data.object;
  if (!delivery.reference) return;
  if (delivery.status === "delivered") {
    await db.orders.update(delivery.reference, { status: "delivered" });
  }
  revalidatePath(`/orders/${delivery.reference}`); // the order page shows the news
});

// Route handlers get the raw body, so this is all a webhook needs. Works on the Edge runtime too.
export const POST = pickriders.webhooks.handler();
