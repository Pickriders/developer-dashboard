import "server-only";
import { dropoffFor } from "./customers";
import { KITCHEN } from "./kitchen";
import { pickriders } from "./pickriders";
import { updateOrder, type FoodOrder } from "./store";
import { syncDelivery } from "./sync-delivery";

/** Books a new rider for food that's still at the kitchen. The food is ready, so no waiting. */
export async function rebookDelivery(order: FoodOrder) {
  const attempt = order.delivery_attempts + 1;
  const delivery = await pickriders.orders.create(
    {
      pickup: KITCHEN,
      dropoff: dropoffFor(order.customer),
      reference: `${order.id}-${attempt}`, // references are unique: each delivery gets its own
      metadata: { food_order: order.id },
    },
    { idempotencyKey: `book-${order.id}-attempt-${attempt}` },
  );
  // Forget the failed delivery, then take this one on.
  updateOrder(order.id, { delivery: undefined, delivery_attempts: attempt });
  return syncDelivery(delivery);
}
