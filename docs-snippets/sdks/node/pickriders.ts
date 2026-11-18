// @file src/pickriders.ts
import Pickriders from "pickriders";

// One client for the whole process. It holds the order store and your webhook listeners, so
// import this everywhere instead of creating new clients.
export const pickriders = new Pickriders({
  // apiKey defaults to PICKRIDERS_KEY, webhookSecret to PICKRIDERS_WEBHOOK_SECRET.
  serviceArea: "NG-LA",
});
