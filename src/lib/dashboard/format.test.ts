import { baseUnitToSubUnit, formatMoney, subUnitToBaseUnit } from "./format";

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
