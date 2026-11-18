// @show-start orders
import "server-only";
import { revalidatePath } from "next/cache";

import { pickriders } from "./pickriders";
import { syncDelivery } from "./sync-delivery";
// @show-end
// @show-start recovery
import { rebookDelivery } from "./rebook";
import { getOrder } from "./store";
// @show-end
// @show-start orders

/** Every order event carries the whole delivery as it is now. */
pickriders.webhooks.on("order.*", (event) => {
  const order = syncDelivery(event.data.object);
  if (!order) return;
  revalidatePath("/kitchen"); // the board shows the news on its next load
  revalidatePath(`/orders/${order.id}`);
});
// @show-end

// @show-start recovery
/** Pickriders couldn't deliver. If the rider never collected the food, book another, once. */
pickriders.webhooks.on("order.failed", async (event) => {
  const delivery = event.data.object;
  const order = getOrder(delivery.metadata.food_order ?? "");
  const collected = delivery.stops.some(
    (s) => s.role === "pickup" && s.status === "completed",
  );

  if (!order || order.delivery?.id !== delivery.id) return; // not ours, or replaced already
  if (collected || order.delivery_attempts >= 2) return; // a person needs to look at this one

  await rebookDelivery(order);
  revalidatePath("/kitchen");
  revalidatePath(`/orders/${order.id}`);
});
// @show-end

// @show-start wallet
/** Below the threshold you set in the dashboard. Deliveries stop when the wallet is empty. */
pickriders.webhooks.on("wallet.balance_low", (event) => {
  const left = event.data.object.available / 100;
  console.warn(
    `Delivery wallet is down to ₦${left.toLocaleString()}. Top it up today.`,
  );
  // Send this to your team chat or email, too.
});
// @show-end
