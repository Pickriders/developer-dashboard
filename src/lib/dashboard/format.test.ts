import { baseUnitToSubUnit, formatDate, formatDateTime, formatMoney, subUnitToBaseUnit, timeAgo } from "./format";

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
    ["2026-10-01T12:00:00Z", "last month"],
  ])("says %s as %p", (iso, said) => {
    expect(timeAgo(iso, now)).toBe(said);
  });
});
