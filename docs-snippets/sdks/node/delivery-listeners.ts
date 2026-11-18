// @file src/delivery-listeners.ts
import { pickriders } from "./pickriders";

// Every order event carries the whole order as it is now: no need to fetch it.
pickriders.webhooks.on("order.*", async (event) => {
  const delivery = event.data.object;
  if (!delivery.reference) return; // not one of ours (booked from the dashboard, say)

  if (delivery.status === "delivered") {
    await db.orders.update(delivery.reference, { status: "delivered" });
  } else if (delivery.status === "cancelled" || delivery.status === "failed") {
    await db.orders.update(delivery.reference, { status: "needs_attention" });
  }
});

pickriders.webhooks.on("order.rider_assigned", async (event) => {
  const { rider, reference } = event.data.object;
  const shopOrder = await db.orders.get(reference!);
  await notifyCustomer(
    shopOrder.customer.phone,
    `${rider?.name} is picking up your order.`,
  );
});

pickriders.webhooks.on("wallet.balance_low", async (event) => {
  await alertTheTeam(
    `Delivery wallet is below ₦${event.data.threshold / 100}. Top it up.`,
  );
});
