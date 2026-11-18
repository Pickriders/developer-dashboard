"use client";

import type { OrderStatus } from "pickriders/client";

import { useDelivery } from "@/hooks/use-delivery";

const STEPS: { status: OrderStatus; label: string }[] = [
  { status: "searching", label: "Finding a rider" },
  { status: "rider_assigned", label: "Rider heading to the kitchen" },
  { status: "picking_up", label: "Rider collecting your food" },
  { status: "in_transit", label: "On the way to you" },
  { status: "delivered", label: "Delivered" },
];

export function LiveDelivery({ trackingUrl }: { trackingUrl: string }) {
  const { data, error } = useDelivery(trackingUrl);
  if (!data) return <p>Connecting to your delivery…</p>;

  const reached = STEPS.findIndex((step) => step.status === data.status);
  const where = data.rider?.location;

  return (
    <section aria-live="polite">
      <ol>
        {STEPS.map((step, i) => (
          <li key={step.status} aria-current={i === reached ? "step" : undefined}>
            {i < reached ? "✓" : i === reached ? "●" : "○"} {step.label}
          </li>
        ))}
      </ol>

      {data.rider && (
        <p>
          {data.rider.name}
          {data.rider.vehicle &&
            ` · ${data.rider.vehicle.color} ${data.rider.vehicle.make}`}
          {where && (
            <>
              {" · "}
              <a href={`https://maps.google.com/?q=${where.lat},${where.lng}`}>
                see on a map
              </a>
            </>
          )}
        </p>
      )}
      {data.eta_s ? <p>About {Math.ceil(data.eta_s / 60)} minutes away</p> : null}
      {error && <p>Reconnecting…</p>}
    </section>
  );
}
