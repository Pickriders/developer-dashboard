import {
  baseUnitToSubUnit,
  formatDate,
  formatDateTime,
  formatMoney,
  percent,
  subUnitToBaseUnit,
  timeAgo,
} from "./format";

describe("money", () => {
  it("converts between kobo and naira without drift", () => {
    expect(subUnitToBaseUnit(350_000)).toBe(3500);
    expect(baseUnitToSubUnit(3500)).toBe(350_000);
    expect(baseUnitToSubUnit(19.99)).toBe(1999);
    expect(baseUnitToSubUnit(subUnitToBaseUnit(123_457))).toBe(123_457);
  });

  it("formats an API amount for display", () => {
    expect(formatMoney(350_000)).toBe("₦3,500.00");
    expect(formatMoney(0)).toBe("₦0.00");
  });
});

describe("dates", () => {
  const now = new Date("2026-11-12T12:00:00Z");

  it("formats a day and a moment", () => {
    expect(formatDate("2026-11-12T09:30:00Z")).toBe("12 Nov 2026");
    expect(formatDateTime("2026-11-12T09:30:00Z")).toMatch(/^12 Nov 2026,? \d{2}:30$/);
  });

  it.each([
    ["2026-11-12T11:59:30Z", "just now"],
    ["2026-11-12T11:57:00Z", "3 minutes ago"],
    ["2026-11-12T10:00:00Z", "2 hours ago"],
    ["2026-11-11T12:00:00Z", "yesterday"],
    ["2026-11-12T13:00:00Z", "in 1 hour"],
    ["2026-11-12T12:59:59Z", "in 1 hour"],
    ["2026-11-12T12:40:00Z", "in 40 minutes"],
    ["2026-10-01T12:00:00Z", "last month"],
  ])("says %s as %p", (iso, said) => {
    expect(timeAgo(iso, now)).toBe(said);
  });
});

describe("percent", () => {
  it("shows a rate to one decimal place", () => {
    expect(percent(0.9876)).toBe("98.8%");
    expect(percent(1)).toBe("100%");
    expect(percent(0)).toBe("0%");
    expect(percent(0.6667)).toBe("66.7%");
  });

  it("shows a dash when there was nothing to count", () => {
    expect(percent(null)).toBe("—");
  });
});
