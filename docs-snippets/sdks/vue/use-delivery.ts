// @file composables/useDelivery.ts
import { readonly, shallowRef, toValue, watchEffect, type MaybeRefOrGetter } from "vue";
import {
  trackDelivery,
  type PublicTracking,
  type TrackerState,
} from "pickriders/client";

/**
 * Follows a delivery from its tracking link. Starts again when the link changes, and stops when
 * the component unmounts.
 */
export function useDelivery(trackingUrl: MaybeRefOrGetter<string | null | undefined>) {
  const state = shallowRef<TrackerState<PublicTracking> | null>(null);

  watchEffect((onCleanup) => {
    const link = toValue(trackingUrl);
    if (!link) {
      state.value = null;
      return;
    }
    const delivery = trackDelivery(link);
    state.value = delivery.getSnapshot();
    const unsubscribe = delivery.subscribe((next) => (state.value = next));
    onCleanup(() => {
      unsubscribe();
      delivery.stop();
    });
  });

  return readonly(state);
}
