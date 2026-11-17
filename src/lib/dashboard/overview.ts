import type { DeveloperAccountDto, OverviewDto } from "@/services/apiService";
import { formatMoney, timeAgo } from "./format";

export type Delta = { value: string; direction: "up" | "down" | "flat" };

/**
 * A change between two periods as StatCard shows it: "+12%", "−40%", or the absolute change when
 * there was nothing before ("+3 new"). Null with nothing in either period.
 */
export function countDelta(current: number, previous: number): Delta | null {
  if (!current && !previous) return null;
  if (!previous) return { value: `+${current.toLocaleString("en-NG")} new`, direction: "up" };
  const change = (current - previous) / previous;
  // Round the size, not the signed value, so a fall of 37.5% reads −38% like a rise reads +38%.
  const rounded = Math.sign(change) * Math.round(Math.abs(change) * 100);
  if (rounded === 0) return { value: "No change", direction: "flat" };
  return { value: `${rounded > 0 ? "+" : "−"}${Math.abs(rounded)}%`, direction: rounded > 0 ? "up" : "down" };
}

/** A change between two 0–1 rates, in percentage points: "+2.5 pts". Null when either is missing. */
export function rateDelta(current: number | null, previous: number | null): Delta | null {
  if (current === null || previous === null) return null;
  const points = Math.round((current - previous) * 1000) / 10;
  if (points === 0) return { value: "No change", direction: "flat" };
  return {
    value: `${points > 0 ? "+" : "−"}${Math.abs(points).toLocaleString("en-NG", { maximumFractionDigits: 1 })} pts`,
    direction: points > 0 ? "up" : "down",
  };
}

/** "About 12 days at your pace", "Under a day", or nothing to say without recent spend. */
export function runwayLabel(days: number | null): string | null {
  if (days === null) return null;
  if (days < 1) return "Less than a day at your recent pace";
  if (days > 365) return "Over a year at your recent pace";
  return `About ${days} ${days === 1 ? "day" : "days"} at your recent pace`;
}

/** "320 ms" or "1.4 s". */
export const latency = (ms: number | null) =>
  ms === null ? "—" : ms >= 1000 ? `${(ms / 1000).toFixed(1)} s` : `${ms} ms`;

export type AttentionItem = {
  id: string;
  tone: "danger" | "warning" | "info";
  title: string;
  body: string;
  href: string;
  action: string;
};

/**
 * What needs the team now, worst first, from the overview: failing webhooks, a wallet running out,
 * orders stuck looking for a rider, keys about to expire, a burst of server errors, and a live team
 * with no live key. Each links to where it is fixed. At most four.
 */
export function attentionItems(
  overview: OverviewDto,
  account: Pick<DeveloperAccountDto, "liveStatus">,
  now: Date = new Date(),
): AttentionItem[] {
  const items: AttentionItem[] = [];
  const { wallet, webhooks, orders, keys, api } = overview;
  const mode = overview.livemode ? "live" : "test";

  if (webhooks.failing > 0) {
    items.push({
      id: "webhooks-failing",
      tone: "danger",
      title: `${webhooks.failing} webhook ${webhooks.failing === 1 ? "endpoint is" : "endpoints are"} failing`,
      body: "Every delivery fails. After 3 days of failures an endpoint is turned off.",
      href: "/webhooks",
      action: "Fix webhooks",
    });
  }
  if (wallet) {
    const low =
      wallet.low_balance_threshold !== null
        ? wallet.available < wallet.low_balance_threshold
        : wallet.runway_days !== null && wallet.runway_days < 3;
    if (wallet.available <= 0 && (orders.last_7_days.created > 0 || overview.livemode)) {
      items.push({
        id: "wallet-empty",
        tone: "danger",
        title: "Your wallet is empty",
        body: "New orders are refused until you add money.",
        href: "/wallet",
        action: "Add money",
      });
    } else if (low) {
      items.push({
        id: "wallet-low",
        tone: "warning",
        title: `${formatMoney(wallet.available, wallet.currency)} left`,
        body: runwayLabel(wallet.runway_days) ?? "Below the low-balance alert you set.",
        href: "/wallet",
        action: "Add money",
      });
    }
  }
  if (orders.in_flight.searching_long > 0) {
    const n = orders.in_flight.searching_long;
    items.push({
      id: "searching-long",
      tone: "warning",
      title: `${n} ${n === 1 ? "order has" : "orders have"} looked for a rider for over 10 minutes`,
      body: overview.livemode
        ? "Riders may be busy nearby. Raising the price or waiting usually works."
        : "In test mode, move them along yourself from the order page.",
      href: "/orders?status=searching",
      action: "See orders",
    });
  }
  if (api.requests >= 20 && api.server_errors / api.requests >= 0.05) {
    items.push({
      id: "server-errors",
      tone: "danger",
      title: `${api.server_errors.toLocaleString("en-NG")} server errors in the last 24 hours`,
      body: "These are ours, not yours. Retrying with the same Idempotency-Key is safe.",
      href: "/logs?status=failed&since=24h",
      action: "See requests",
    });
  }
  if (keys.expiring_soon > 0 && keys.next_expiry_at) {
    items.push({
      id: "keys-expiring",
      tone: "warning",
      title: `${keys.expiring_soon} ${mode} ${keys.expiring_soon === 1 ? "key expires" : "keys expire"} ${timeAgo(keys.next_expiry_at, now)}`,
      body: "Roll it before then so your integration keeps working.",
      href: "/keys",
      action: "Manage keys",
    });
  }
  if (overview.livemode && account.liveStatus === "APPROVED" && keys.active === 0) {
    items.push({
      id: "no-live-key",
      tone: "info",
      title: "You're approved for live",
      body: "Create a live key for your production server to send real deliveries.",
      href: "/keys?create=live",
      action: "Create a live key",
    });
  }
  return items.slice(0, 4);
}

/** The in-flight stages, in the order an order moves through them, with where each links. */
export const PIPELINE = [
  { key: "scheduled", label: "Scheduled", status: "scheduled" as string | null },
  { key: "awaiting_dispatch", label: "Awaiting dispatch", status: "awaiting_dispatch" },
  { key: "searching", label: "Finding a rider", status: "searching" },
  { key: "rider_assigned", label: "Rider assigned", status: "rider_assigned" },
  // Picking up and in transit together: the orders page shows both under no filter.
  { key: "on_the_way", label: "On the way", status: null },
] as const;

export const inFlightTotal = (flight: OverviewDto["orders"]["in_flight"]) =>
  flight.scheduled + flight.awaiting_dispatch + flight.searching + flight.rider_assigned + flight.on_the_way;
