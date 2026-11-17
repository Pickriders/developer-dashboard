import { duration, STATE, uptime } from "./status";

describe("status page helpers", () => {
  it("names every state", () => {
    expect(STATE.operational.headline).toBe("All systems operational");
    expect(STATE.major_outage.tone).toBe("danger");
  });

  it("works out uptime from the daily history", () => {
    const days = (bad: number) =>
      Array.from({ length: 90 }, (_, i) => ({
        status: i < bad ? ("partial_outage" as const) : ("operational" as const),
      }));
    expect(uptime(days(0))).toBe("100%");
    expect(uptime(days(1))).toBe("98.89%");
    expect(uptime([])).toBe("—");
  });

  it("says how long an incident lasted, or has so far", () => {
    const start = "2026-11-17T10:00:00.000Z";
    expect(duration(start, "2026-11-17T10:42:00.000Z")).toBe("42 min");
    expect(duration(start, "2026-11-17T13:05:00.000Z")).toBe("3 h 5 min");
    expect(duration(start, "2026-11-17T12:00:00.000Z")).toBe("2 h");
    expect(duration(start, null, Date.parse("2026-11-17T10:10:00.000Z"))).toBe("10 min");
  });
});
