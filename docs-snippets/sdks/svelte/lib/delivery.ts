// @file src/lib/delivery.ts
import { readable, type Readable } from "svelte/store";
import {
  trackDelivery,
  type PublicTracking,
  type TrackerState,
} from "pickriders/client";

/**
 * A Svelte store following a delivery. The tracker starts with the first subscriber and stops
 * with the last, so a component using `$delivery` cleans up after itself.
 */
export function deliveryStore(
  trackingUrl: string,
): Readable<TrackerState<PublicTracking> | null> {
  return readable<TrackerState<PublicTracking> | null>(null, (set) => {
    const delivery = trackDelivery(trackingUrl);
    set(delivery.getSnapshot());
    const unsubscribe = delivery.subscribe((state) => set(state));
    return () => {
      unsubscribe();
      delivery.stop();
    };
  });
}
