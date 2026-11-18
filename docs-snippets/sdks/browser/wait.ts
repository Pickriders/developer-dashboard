// @file wait.ts
import { OrderEndedError, trackDelivery } from "pickriders/client";

const delivery = trackDelivery(new URLSearchParams(location.search).get("t")!);

try {
  const arriving = await delivery.until("in_transit", { timeout: 60 * 60_000 });
  console.log(`On the way: ${arriving.rider?.name}`);
} catch (error) {
  if (error instanceof OrderEndedError)
    console.log("Cancelled before it left the shop");
}

// Every change as it happens, ending after the last one:
for await (const update of delivery) console.log(update.status);
