// @file components/delivery-status.tsx
"use client";

import type { OrderStatus } from "pickriders/client";

import { useDelivery } from "@/hooks/use-delivery";

const STEPS: { status: OrderStatus; label: string }[] = [
  { status: "searching", label: "Finding a rider" },
  { status: "rider_assigned", label: "Rider on the way to the shop" },
  { status: "in_transit", label: "On the way to you" },
  { status: "delivered", label: "Delivered" },
];

export function DeliveryStatus({ trackingUrl }: { trackingUrl: string }) {
  const { data, error } = useDelivery(trackingUrl);

  if (!data) return <p>Loading your delivery…</p>;
  if (data.status === "cancelled" || data.status === "failed") {
    return <p role="alert">This delivery was {data.status}. We&apos;ll be in touch.</p>;
  }

  const reached = STEPS.findIndex((step) => step.status === data.status);
  return (
    <section aria-live="polite">
      <ol>
        {STEPS.map((step, i) => (
          <li key={step.status} aria-current={i === reached ? "step" : undefined}>
            {i <= reached ? "●" : "○"} {step.label}
          </li>
        ))}
      </ol>
      {data.rider && <p>Your rider: {data.rider.name}</p>}
      {data.eta_s ? <p>About {Math.ceil(data.eta_s / 60)} minutes away</p> : null}
      {error && <p>Reconnecting…</p>}
    </section>
  );
}
