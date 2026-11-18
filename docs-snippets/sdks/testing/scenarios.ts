// @file scripts/rehearse-failures.ts
import Pickriders from "pickriders";

const pickriders = new Pickriders(process.env.PICKRIDERS_TEST_KEY, {
  serviceArea: "NG-LA",
});

for (const scenario of ["no_riders", "rider_cancels", "delivery_fails"] as const) {
  const order = await pickriders.orders.create({
    pickup: SHOP,
    dropoff: SHOP,
    test_options: { scenario, auto_advance: true }, // it plays out by itself, step by step
  });
  const final = await pickriders.orders.track(order).done();
  console.log(`${scenario}: ended ${final.status}`, final.cancellation);
}
