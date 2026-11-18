// @file src/dispatch-worker.ts
import { OrderEndedError } from "pickriders";

import { pickriders } from "./pickriders";

/** A long-running process (a queue worker, say) that watches one delivery to the end. */
export async function watchDelivery(deliveryId: string, shopOrderId: string) {
  const tracker = pickriders.orders.track(deliveryId);

  tracker.on("rider_assigned", (order) =>
    console.log(`${order.number}: ${order.rider?.name}`),
  );
  tracker.on("error", (error) => console.warn(`Still trying: ${error.code}`)); // retried by itself

  try {
    // Rejects if the order is cancelled or fails first, instead of waiting forever.
    await tracker.until("delivered", { timeout: 3 * 60 * 60_000 });
    await db.orders.update(shopOrderId, { status: "delivered" });
  } catch (error) {
    if (!(error instanceof OrderEndedError)) throw error;
    await db.orders.update(shopOrderId, { status: "needs_attention" });
  } finally {
    tracker.stop(); // done anyway once the order ends; this covers the timeout
  }
}
