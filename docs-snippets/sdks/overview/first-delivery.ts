// @file book-a-delivery.ts
import Pickriders from "pickriders";

const pickriders = new Pickriders(); // reads PICKRIDERS_KEY from the environment

const order = await pickriders.orders.create({
  service_area: "NG-LA",
  pickup: {
    address: "1 Admiralty Way, Lekki Phase 1, Lagos",
    lat: 6.4281,
    lng: 3.4216,
    contact: { name: "Mama's Kitchen", phone: "+2348012345678" },
  },
  dropoff: {
    address: "12 Awolowo Road, Ikoyi, Lagos",
    lat: 6.4474,
    lng: 3.4248,
    contact: { name: "Ada Obi", phone: "+2348098765432" },
  },
});
console.log(`Booked ${order.number}. Tracking link: ${order.tracking_url}`);

const tracker = pickriders.orders.track(order);
tracker.on("status", (status) => console.log("→", status));

// Test mode has no real riders: play the rider's part.
await pickriders.test.orders.advance(order, { to: "delivered" });

const final = await tracker.done();
console.log(`${final.number} ended ${final.status}`);
