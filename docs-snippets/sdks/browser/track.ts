// @file track.ts
import { trackDelivery } from "pickriders/client";

// The tracking link comes from your server (order.tracking_url). It needs no API key.
const delivery = trackDelivery("https://pickriders.com/track/b3JkXzY1NjA.c2lnbmF0dXJl");

delivery.on("status", (status) => {
  document.querySelector("#status")!.textContent = status.replaceAll("_", " ");
});
delivery.on("delivered", () => {
  document.querySelector("#thanks")?.removeAttribute("hidden");
});

// Or read everything at once, every time it changes:
delivery.subscribe(({ data, error }) => {
  if (!data) return;
  const eta = data.eta_s ? `about ${Math.ceil(data.eta_s / 60)} min` : "";
  document.querySelector("#eta")!.textContent = error ? "Reconnecting…" : eta;
});
