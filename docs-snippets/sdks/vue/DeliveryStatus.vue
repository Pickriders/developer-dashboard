<!-- @file components/DeliveryStatus.vue -->
<script setup lang="ts">
import { useDelivery } from "~/composables/useDelivery";

const props = defineProps<{ trackingUrl: string }>();
const delivery = useDelivery(() => props.trackingUrl);
</script>

<template>
  <p v-if="!delivery?.data">Loading your delivery…</p>
  <p v-else aria-live="polite">
    {{ delivery.data.status.replaceAll("_", " ") }}
    <span v-if="delivery.data.rider"> · {{ delivery.data.rider.name }}</span>
    <span v-if="delivery.data.eta_s">
      · about {{ Math.ceil(delivery.data.eta_s / 60) }} min</span
    >
    <span v-if="delivery.error"> · reconnecting…</span>
  </p>
</template>
