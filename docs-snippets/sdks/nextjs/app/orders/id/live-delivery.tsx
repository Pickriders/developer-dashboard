// @file app/orders/[id]/live-delivery.tsx
"use client";

import { useDelivery } from "@/hooks/use-delivery";

export function LiveDelivery({ trackingUrl }: { trackingUrl: string }) {
  const { data, error } = useDelivery(trackingUrl);
  if (!data) return <p>Finding your delivery…</p>;
  return (
    <p aria-live="polite">
      {data.status.replaceAll("_", " ")}
      {data.rider && ` · ${data.rider.name}`}
      {data.eta_s ? ` · about ${Math.ceil(data.eta_s / 60)} min` : null}
      {error && " · reconnecting…"}
    </p>
  );
}
