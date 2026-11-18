// @file src/ship.ts
import express from "express";
import { InsufficientFundsError, InvalidRequestError } from "pickriders";

import { pickriders } from "./pickriders";

export const router = express();

router.post("/orders/:id/ship", express.json(), async (req, res) => {
  const shopOrder = await db.orders.get(req.params.id);
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
        reference: shopOrder.id, // find it later with orders.list({ reference })
      },
      // Your own key makes a retry safe even after a restart: it never books twice.
      { idempotencyKey: `ship-${shopOrder.id}` },
    );
    await db.orders.update(shopOrder.id, {
      status: "out_for_delivery",
      delivery_id: delivery.id,
      tracking_url: delivery.tracking_url,
    });
    res.json({ tracking_url: delivery.tracking_url });
  } catch (error) {
    if (error instanceof InsufficientFundsError) {
      return res
        .status(402)
        .json({ message: "Top up the delivery wallet, then try again." });
    }
    if (error instanceof InvalidRequestError) {
      return res.status(400).json({ field: error.param, message: error.message });
    }
    throw error;
  }
});
