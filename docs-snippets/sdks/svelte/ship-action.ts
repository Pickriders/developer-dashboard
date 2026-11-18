// @file src/routes/orders/[id]/+page.server.ts
import { pickriders } from "$lib/server/pickriders";

export const actions = {
  ship: async ({ params }: { params: { id: string } }) => {
    const shopOrder = await db.orders.get(params.id);
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
      { idempotencyKey: `ship-${shopOrder.id}` },
    );
    await db.orders.update(shopOrder.id, { tracking_url: delivery.tracking_url });
    return { tracking_url: delivery.tracking_url };
  },
};
