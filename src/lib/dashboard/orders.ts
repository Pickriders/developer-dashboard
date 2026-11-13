import type { BadgeTone } from "@/components/ui/badge";
import type { PublicOrderDto } from "@/services/apiService";

export type OrderStatus = PublicOrderDto["status"];

/** Each status in a word a merchant would use, and its colour. */
export const ORDER_STATUS: Record<OrderStatus, { label: string; tone: BadgeTone }> = {
  scheduled: { label: "Scheduled", tone: "info" },
  awaiting_dispatch: { label: "Waiting to dispatch", tone: "neutral" },
  searching: { label: "Finding a rider", tone: "info" },
  rider_assigned: { label: "Rider assigned", tone: "brand" },
  picking_up: { label: "Picking up", tone: "brand" },
  in_transit: { label: "On the way", tone: "brand" },
  delivered: { label: "Delivered", tone: "success" },
  cancelled: { label: "Cancelled", tone: "neutral" },
  failed: { label: "Failed", tone: "danger" },
};

export const isDone = (status: OrderStatus) => status === "delivered" || status === "cancelled" || status === "failed";

/** "1 Admiralty Way → 12 Bourdillon Rd", with "+2 more" for a batch. */
export function routeSummary(order: Pick<PublicOrderDto, "stops">): { from: string; to: string; more: number } {
  const pickups = order.stops.filter((s) => s.role === "pickup");
  const dropoffs = order.stops.filter((s) => s.role === "dropoff");
  return { from: pickups[0]?.address ?? "", to: dropoffs[0]?.address ?? "", more: Math.max(dropoffs.length - 1, 0) };
}

export type TimelineEntry = {
  key: string;
  label: string;
  detail?: string;
  at: string | null;
  state: "done" | "current" | "upcoming" | "stopped";
};

/**
 * The order's story so far and what comes next, from the order alone: created, a rider found, each
 * stop collected or delivered, and how it ended. The step in progress is `current`.
 */
export function orderTimeline(order: PublicOrderDto): TimelineEntry[] {
  const entries: TimelineEntry[] = [{ key: "created", label: "Order created", at: order.created, state: "done" }];
  const stopped = order.status === "cancelled" || order.status === "failed";
  const hasRider = !!order.rider || ["rider_assigned", "picking_up", "in_transit", "delivered"].includes(order.status);

  if (order.status === "scheduled" && order.scheduled_for) {
    entries.push({ key: "scheduled", label: "Scheduled", at: order.scheduled_for, state: "current" });
  }
  entries.push({
    key: "rider",
    label: hasRider ? "Rider assigned" : "Finding a rider",
    detail: order.rider?.name,
    at: null,
    state: hasRider ? "done" : order.status === "searching" && !stopped ? "current" : "upcoming",
  });

  let current = hasRider && !stopped && order.status !== "delivered";
  for (const stop of order.stops) {
    const pickup = stop.role === "pickup";
    const done = stop.status === "completed";
    const label = pickup ? (done ? "Picked up" : "Pick up") : done ? "Delivered" : "Deliver";
    let state: TimelineEntry["state"] = done ? "done" : stop.status === "cancelled" ? "stopped" : "upcoming";
    if (!done && state !== "stopped" && current) {
      state = "current";
      current = false;
    }
    entries.push({
      key: stop.id,
      label: stop.status === "arrived" && !done ? `Rider arrived to ${pickup ? "pick up" : "deliver"}` : label,
      detail: stop.address,
      at: stop.completed_at ?? stop.arrived_at,
      state,
    });
  }

  if (stopped) {
    entries.push({
      key: "ended",
      label: order.status === "cancelled" ? "Cancelled" : "Failed",
      detail: order.cancellation?.reason ?? undefined,
      at: order.cancellation?.cancelled_at ?? order.updated,
      state: "stopped",
    });
  }
  return entries;
}
