import "server-only";
import type { Order } from "pickriders";

import { getOrder, updateOrder, type FoodOrder } from "./store";

/** What the customer sees for each delivery status. */
function foodStatus(delivery: Order): FoodOrder["status"] {
  switch (delivery.status) {
    case "scheduled":
    case "awaiting_dispatch":
      return "paid"; // still cooking: no rider yet
    case "searching":
    case "rider_assigned":
    case "picking_up":
      return "ready";
    case "in_transit":
      return "on_the_way";
    case "delivered":
      return "delivered";
    case "cancelled":
      return "cancelled"; // we cancelled it
    case "failed":
      return "delivery_problem"; // Pickriders couldn't deliver it
  }
}

/**
 * Copies what Pickriders says about a delivery onto our order. Every answer and every webhook
 * goes through here, so it's safe to call twice, late, or out of order.
 */
export function syncDelivery(delivery: Order): FoodOrder | undefined {
  const order = getOrder(delivery.metadata.food_order ?? "");
  if (!order) return undefined; // not one of ours

  const known = order.delivery;
  // News about a delivery we've replaced (part 6), or older than what we have: ignore it.
  if (known && known.id !== delivery.id) return order;
  if (known && known.updated > delivery.updated) return order;

  return updateOrder(order.id, {
    status: foodStatus(delivery),
    delivery: {
      id: delivery.id,
      number: delivery.number,
      status: delivery.status,
      tracking_url: delivery.tracking_url,
      fee: delivery.pricing.amount,
      rider: delivery.rider?.name ?? null,
      charged: delivery.cancellation?.charged_amount ?? null,
      updated: delivery.updated,
    },
  });
}
