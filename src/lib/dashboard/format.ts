/**
 * Money from the API is in sub-units (kobo); convert at the edges only (CLAUDE.md §4.4).
 * Amounts are integers in sub-units everywhere else.
 */
export const subUnitToBaseUnit = (amount: number): number => amount / 100;
export const baseUnitToSubUnit = (amount: number): number => Math.round(amount * 100);

/** ₦3,500.00: an API amount (kobo) for display. */
export const formatMoney = (amount: number, currency = "NGN", locale = "en-NG"): string =>
  new Intl.NumberFormat(locale, { style: "currency", currency, minimumFractionDigits: 2 }).format(
    subUnitToBaseUnit(amount),
  );
