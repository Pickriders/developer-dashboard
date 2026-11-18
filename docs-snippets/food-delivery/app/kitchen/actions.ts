"use server";

import { revalidatePath } from "next/cache";

import { pickriders, testMode } from "@/lib/pickriders";
import { getOrder } from "@/lib/store";
import { syncDelivery } from "@/lib/sync-delivery";

// @show-start ready
/** The food is packed: start looking for a rider now. */
export async function foodIsReady(orderId: string) {
  const delivery = deliveryOf(orderId);
  syncDelivery(await pickriders.orders.dispatch(delivery.id));
  revalidatePath("/kitchen");
}
// @show-end

// @show-start play
/** Test mode only: do what the rider would do next, with the webhooks a real one would send. */
export async function playRider(orderId: string) {
  if (!testMode) throw new Error("There's no pretend rider in live mode.");
  const delivery = deliveryOf(orderId);
  syncDelivery(await pickriders.test.orders.advance(delivery.id));
  revalidatePath("/kitchen");
}
// @show-end

// @show-start cancel
/** The customer changed their mind. What it costs depends on how far the rider got. */
export async function cancelDelivery(orderId: string) {
  const delivery = deliveryOf(orderId);
  const cancelled = await pickriders.orders.cancel(delivery.id, {
    reason: "Customer cancelled",
  });
  syncDelivery(cancelled); // cancelled.cancellation.charged_amount: what we paid, in kobo
  revalidatePath("/kitchen");
}
// @show-end

function deliveryOf(orderId: string) {
  const delivery = getOrder(orderId)?.delivery;
  if (!delivery) throw new Error(`${orderId} has no delivery booked.`);
  return delivery;
}
