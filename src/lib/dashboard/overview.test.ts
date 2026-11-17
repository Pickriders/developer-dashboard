import { attentionItems, countDelta, inFlightTotal, latency, rateDelta, runwayLabel } from "./overview";
import type { OverviewDto } from "@/services/apiService";

const overview = (patch: Partial<Record<keyof OverviewDto, unknown>> = {}): OverviewDto =>
  ({
    livemode: false,
    generated_at: "2026-11-17T12:00:00.000Z",
    wallet: { available: 1_000_000, held: 0, currency: "NGN", low_balance_threshold: null, runway_days: null },
    orders: {
      in_flight: {
        scheduled: 0,
        awaiting_dispatch: 0,
        searching: 0,
        searching_long: 0,
        rider_assigned: 0,
        on_the_way: 0,
      },
      today: 0,
      yesterday: 0,
      delivered_today: 0,
      last_7_days: { created: 0, delivered: 0, failed: 0, cancelled: 0, success_rate: null },
      previous_7_days: { created: 0, delivered: 0, failed: 0, cancelled: 0, success_rate: null },
      per_day: [],
    },
    spend: { last_7_days: 0, previous_7_days: 0, month_to_date: 0, currency: "NGN" },
    api: {
      requests: 0,
      errors: 0,
      server_errors: 0,
      error_rate: null,
      previous_requests: 0,
      previous_error_rate: null,
      p50_ms: null,
      p95_ms: null,
      per_hour: [],
      top_errors: [],
      last_request_at: null,
    },
    webhooks: {
      endpoints: 0,
      healthy: 0,
      failing: 0,
      disabled: 0,
      deliveries: 0,
      succeeded: 0,
      failed: 0,
      pending: 0,
      success_rate: null,
    },
    keys: { active: 1, expiring_soon: 0, next_expiry_at: null, last_used_at: null },
    ...patch,
  }) as OverviewDto;
const ids = (o: OverviewDto, liveStatus: "APPROVED" | "PENDING" = "PENDING") =>
  attentionItems(o, { liveStatus }, new Date("2026-11-17T12:00:00.000Z")).map((i) => i.id);

describe("countDelta", () => {
  it("says how a count moved, and what's new when there was nothing before", () => {
    expect(countDelta(12, 10)).toEqual({ value: "+20%", direction: "up" });
    expect(countDelta(5, 8)).toEqual({ value: "−38%", direction: "down" });
    expect(countDelta(10, 10)).toEqual({ value: "No change", direction: "flat" });
    expect(countDelta(3, 0)).toEqual({ value: "+3 new", direction: "up" });
    expect(countDelta(0, 0)).toBeNull();
  });
});

describe("rateDelta", () => {
  it("compares two rates in percentage points, and says nothing without both", () => {
    expect(rateDelta(0.849, 0.84)).toEqual({ value: "+0.9 pts", direction: "up" });
    expect(rateDelta(0.1, 0.25)).toEqual({ value: "−15 pts", direction: "down" });
    expect(rateDelta(0.5, 0.5)).toEqual({ value: "No change", direction: "flat" });
    expect(rateDelta(null, 0.5)).toBeNull();
    expect(rateDelta(0.5, null)).toBeNull();
  });
});

describe("runwayLabel and latency", () => {
  it("puts the runway in words", () => {
    expect(runwayLabel(null)).toBeNull();
    expect(runwayLabel(0)).toBe("Less than a day at your recent pace");
    expect(runwayLabel(1)).toBe("About 1 day at your recent pace");
    expect(runwayLabel(12)).toBe("About 12 days at your recent pace");
    expect(runwayLabel(900)).toBe("Over a year at your recent pace");
  });

  it("shows milliseconds, seconds over a second, and a dash with nothing measured", () => {
    expect(latency(320)).toBe("320 ms");
    expect(latency(1400)).toBe("1.4 s");
    expect(latency(null)).toBe("—");
  });
});

describe("attentionItems", () => {
  it("is quiet when all is well", () => {
    expect(ids(overview())).toEqual([]);
  });

  it("raises failing webhooks first, then the wallet, stuck orders, server errors and expiring keys", () => {
    const busy = overview({
      webhooks: { ...overview().webhooks, endpoints: 2, failing: 1 },
      wallet: { available: 50_000, held: 0, currency: "NGN", low_balance_threshold: 100_000, runway_days: 1 },
      orders: { ...overview().orders, in_flight: { ...overview().orders.in_flight, searching: 3, searching_long: 2 } },
      api: { ...overview().api, requests: 100, server_errors: 10 },
      keys: { active: 2, expiring_soon: 1, next_expiry_at: "2026-11-20T12:00:00.000Z", last_used_at: null },
    });
    // Four at most, worst first.
    expect(ids(busy)).toEqual(["webhooks-failing", "wallet-low", "searching-long", "server-errors"]);
    const items = attentionItems(busy, { liveStatus: "PENDING" });
    expect(items[0]).toMatchObject({ tone: "danger", href: "/webhooks", title: "1 webhook endpoint is failing" });
    expect(items[2].title).toBe("2 orders have looked for a rider for over 10 minutes");
  });

  it("calls a wallet low by its threshold, or by a runway under three days without one", () => {
    const wallet = { available: 500_000, held: 0, currency: "NGN" };
    expect(ids(overview({ wallet: { ...wallet, low_balance_threshold: 100_000, runway_days: 1 } }))).toEqual([]);
    expect(ids(overview({ wallet: { ...wallet, low_balance_threshold: null, runway_days: 2 } }))).toEqual([
      "wallet-low",
    ]);
    expect(ids(overview({ wallet: { ...wallet, low_balance_threshold: null, runway_days: 30 } }))).toEqual([]);
  });

  it("says the wallet is empty once it matters, not on a team that hasn't ordered in test mode", () => {
    const empty = { available: 0, held: 0, currency: "NGN", low_balance_threshold: null, runway_days: null };
    expect(ids(overview({ wallet: empty }))).toEqual([]);
    expect(ids(overview({ wallet: empty, livemode: true }))).toEqual(["wallet-empty"]);
  });

  it("ignores a few server errors in little traffic", () => {
    expect(ids(overview({ api: { ...overview().api, requests: 10, server_errors: 5 } }))).toEqual([]);
  });

  it("nudges an approved team with no live key, in live mode only", () => {
    const noKeys = { active: 0, expiring_soon: 0, next_expiry_at: null, last_used_at: null };
    expect(ids(overview({ livemode: true, keys: noKeys, wallet: null }), "APPROVED")).toEqual(["no-live-key"]);
    expect(ids(overview({ livemode: false, keys: noKeys }), "APPROVED")).toEqual([]);
    expect(ids(overview({ livemode: true, keys: noKeys, wallet: null }), "PENDING")).toEqual([]);
  });
});

describe("inFlightTotal", () => {
  it("adds up every stage", () => {
    expect(
      inFlightTotal({
        scheduled: 1,
        awaiting_dispatch: 2,
        searching: 3,
        searching_long: 9,
        rider_assigned: 4,
        on_the_way: 5,
      }),
    ).toBe(15);
  });
});
