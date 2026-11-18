// @file hooks/use-delivery.ts
"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  trackDelivery,
  type DeliveryTracker,
  type PublicTracking,
  type TrackerState,
} from "pickriders/client";

const IDLE: TrackerState<PublicTracking> = {
  data: undefined,
  status: undefined,
  done: false,
  error: undefined,
  source: undefined,
  updatedAt: undefined,
  stopped: false,
};
const noSubscription = () => () => {};

/**
 * Follows a delivery from its tracking link while the component is on screen, and stops when it
 * goes. Safe in Strict Mode: each mount starts its own tracker and stops it on unmount.
 */
export function useDelivery(
  trackingUrl: string | null | undefined,
): TrackerState<PublicTracking> {
  const [tracker, setTracker] = useState<DeliveryTracker | null>(null);

  useEffect(() => {
    if (!trackingUrl) return setTracker(null);
    const delivery = trackDelivery(trackingUrl);
    setTracker(delivery);
    return () => delivery.stop();
  }, [trackingUrl]);

  return useSyncExternalStore(
    tracker ? tracker.subscribe : noSubscription,
    tracker ? tracker.getSnapshot : () => IDLE,
    () => IDLE, // on the server
  );
}
