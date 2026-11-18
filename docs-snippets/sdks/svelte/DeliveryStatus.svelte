<!-- @file src/lib/DeliveryStatus.svelte -->
<script lang="ts">
  import { deliveryStore } from "$lib/delivery";

  let { trackingUrl }: { trackingUrl: string } = $props();
  const delivery = deliveryStore(trackingUrl);
</script>

{#if !$delivery?.data}
  <p>Loading your delivery…</p>
{:else}
  <p aria-live="polite">
    {$delivery.data.status.replaceAll("_", " ")}
    {#if $delivery.data.rider} · {$delivery.data.rider.name}{/if}
    {#if $delivery.data.eta_s} · about {Math.ceil($delivery.data.eta_s / 60)} min{/if}
    {#if $delivery.error} · reconnecting…{/if}
  </p>
{/if}
