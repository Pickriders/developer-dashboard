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

/** 12 Nov 2026. */
export const formatDate = (iso: string | Date, locale = "en-GB"): string =>
  new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));

/** 12 Nov 2026, 14:05: for logs and deliveries, where the minute matters. */
export const formatDateTime = (iso: string | Date, locale = "en-GB"): string =>
  new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 365 * 864e5],
  ["month", 30 * 864e5],
  ["week", 7 * 864e5],
  ["day", 864e5],
  ["hour", 36e5],
  ["minute", 6e4],
];

/** "3 minutes ago", "in 2 hours", "just now": for last used, next retry and the like. */
export const timeAgo = (iso: string | Date, now: Date = new Date()): string => {
  const ms = new Date(iso).getTime() - now.getTime();
  if (Math.abs(ms) < 45_000) return "just now";
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  // A unit counts from 95% of it, so a grace period just started ("59 minutes 59 seconds") says 1 hour.
  for (const [unit, size] of UNITS) {
    if (Math.abs(ms) >= size * 0.95 || unit === "minute") return rtf.format(Math.round(ms / size), unit);
  }
  return "just now";
};

/** A 0–1 rate as a percentage: 0.9876 → "98.8%", 1 → "100%"; nothing to divide (null) → "—". */
export const percent = (rate: number | null): string =>
  rate === null ? "—" : `${(Math.round(rate * 1000) / 10).toLocaleString("en-NG", { maximumFractionDigits: 1 })}%`;
