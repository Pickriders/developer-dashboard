import { isDone, orderTimeline, routeSummary } from "./orders";
import type { PublicOrderDto } from "@/services/apiService";

const stop = (role: "pickup" | "dropoff", over = {}) => ({
  id: `stop_${role}_${Math.random()}`,
  role,
  status: "pending" as const,
  address: role === "pickup" ? "1 Admiralty Way" : "12 Bourdillon Rd",
  lat: 6.4,
  lng: 3.4,
  contact: { name: "Bola", phone: "+234" },
  instructions: null,
  package: null,
  confirmation_code: null,
  arrived_at: null,
  completed_at: null,
  cancelled_at: null,
  proof: null,
  pending_change: null,
  tracking_url: null,
  ...over,
});
const order = (over: Partial<PublicOrderDto> = {}): PublicOrderDto =>
  ({
    object: "order",
    id: "ord_1",
    status: "searching",
    stops: [stop("pickup"), stop("dropoff")],
    rider: null,
    cancellation: null,
    created: "2026-11-13T09:00:00Z",
    updated: "2026-11-13T09:05:00Z",
    ...over,
  }) as unknown as PublicOrderDto;

describe("orders", () => {
  it("summarises the route", () => {
    expect(
      routeSummary(order({ stops: [stop("pickup"), stop("dropoff"), stop("dropoff"), stop("dropoff")] as never })),
    ).toEqual({
      from: "1 Admiralty Way",
      to: "12 Bourdillon Rd",
      more: 2,
    });
  });

  it("knows which statuses are final", () => {
    expect(["delivered", "cancelled", "failed"].every((s) => isDone(s as never))).toBe(true);
    expect(isDone("in_transit")).toBe(false);
  });

  it("is finding a rider first", () => {
    const t = orderTimeline(order());
    expect(t.map((e) => [e.label, e.state])).toEqual([
      ["Order created", "done"],
      ["Finding a rider", "current"],
      ["Pick up", "upcoming"],
      ["Deliver", "upcoming"],
    ]);
  });

  it("moves through the stops once a rider has it", () => {
    const t = orderTimeline(
      order({
        status: "in_transit",
        rider: { name: "Tunde A." } as never,
        stops: [
          stop("pickup", { status: "completed", completed_at: "2026-11-13T09:20:00Z" }),
          stop("dropoff", { status: "arrived", arrived_at: "2026-11-13T09:40:00Z" }),
        ] as never,
      }),
    );
    expect(t.map((e) => [e.label, e.state])).toEqual([
      ["Order created", "done"],
      ["Rider assigned", "done"],
      ["Picked up", "done"],
      ["Rider arrived to deliver", "current"],
    ]);
    expect(t[1].detail).toBe("Tunde A.");
  });

  it("ends with why it was cancelled", () => {
    const t = orderTimeline(
      order({
        status: "cancelled",
        cancellation: {
          cancelled_by: "developer",
          reason: "Customer changed their mind",
          cancelled_at: "2026-11-13T09:10:00Z",
        } as never,
      }),
    );
    expect(t[t.length - 1]).toEqual(
      expect.objectContaining({ label: "Cancelled", detail: "Customer changed their mind", state: "stopped" }),
    );
    expect(t.find((e) => e.state === "current")).toBeUndefined();
  });
});
