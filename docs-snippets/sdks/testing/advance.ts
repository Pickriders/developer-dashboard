// @file scripts/try-a-delivery.ts
import Pickriders from "pickriders";

const pickriders = new Pickriders(process.env.PICKRIDERS_TEST_KEY, {
  serviceArea: "NG-LA",
});

const order = await pickriders.orders.create({ pickup: SHOP, dropoff: SHOP });

await pickriders.test.orders.advance(order); // one step: a rider accepts
await pickriders.test.orders.advance(order, { to: "in_transit" }); // picked up
await pickriders.test.orders.advance(order, { to: "delivered" }); // every step, every event

await pickriders.test.wallet.fund({ amount: 50_000_00 }); // ₦50,000 of play money
