// @file app/orders/[id]/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { InsufficientFundsError } from "pickriders";

import { pickriders } from "@/lib/pickriders";

export async function shipOrder(shopOrderId: string) {
  const shopOrder = await db.orders.get(shopOrderId);
  try {
    const delivery = await pickriders.orders.create(
      {
        pickup: SHOP,
        dropoff: {
          address: shopOrder.customer.address,
          lat: shopOrder.customer.lat,
          lng: shopOrder.customer.lng,
          contact: { name: shopOrder.customer.name, phone: shopOrder.customer.phone },
        },
        reference: shopOrder.id,
      },
      { idempotencyKey: `ship-${shopOrder.id}` }, // a double click books once
    );
    await db.orders.update(shopOrder.id, {
      status: "out_for_delivery",
      delivery_id: delivery.id,
      tracking_url: delivery.tracking_url,
    });
  } catch (error) {
    if (error instanceof InsufficientFundsError)
      return { error: "Top up the delivery wallet." };
    throw error;
  }
  revalidatePath(`/orders/${shopOrderId}`);
  return { ok: true };
}
