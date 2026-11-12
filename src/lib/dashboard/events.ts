import type { DashboardCreateWebhookEndpointRequestDto } from "@/services/apiService";

export type EventType = Exclude<DashboardCreateWebhookEndpointRequestDto["enabled_events"][number], "*">;

/** Every event an endpoint can listen to, grouped as the docs group them, each in one line. */
export const EVENT_GROUPS: { title: string; events: { type: EventType; description: string }[] }[] = [
  {
    title: "Orders",
    events: [
      { type: "order.created", description: "An order was created." },
      { type: "order.searching", description: "Pickriders started looking for a rider." },
      { type: "order.offer.created", description: "A rider offered a price on a bidding order." },
      { type: "order.offer.expired", description: "An offer ran out before it was accepted." },
      { type: "order.rider_assigned", description: "A rider took the order." },
      { type: "order.rider_changed", description: "The order moved to another rider." },
      { type: "order.picked_up", description: "The rider collected the package." },
      { type: "order.stop.arrived", description: "The rider reached a stop." },
      { type: "order.stop.completed", description: "A stop was completed." },
      { type: "order.delivered", description: "Every stop was delivered." },
      { type: "order.cancelled", description: "The order was cancelled." },
      { type: "order.failed", description: "The order couldn't be delivered." },
    ],
  },
  {
    title: "Wallet",
    events: [
      { type: "wallet.funded", description: "Money arrived in your wallet." },
      { type: "wallet.balance_low", description: "The balance fell below your alert." },
    ],
  },
  { title: "Account", events: [{ type: "account.updated", description: "Your account or live access changed." }] },
];

export const ALL_EVENTS: EventType[] = EVENT_GROUPS.flatMap((g) => g.events.map((e) => e.type));

/** An endpoint's events in a few words: "All events", "order.delivered", "3 events". */
export function describeEvents(enabled: string[]): string {
  if (enabled.includes("*")) return "All events";
  if (enabled.length === 1) return enabled[0];
  return `${enabled.length} events`;
}

/** The request body (or a response that is JSON) laid out to read; anything else as it came. */
export function prettyJson(raw: string | null): string {
  if (!raw) return "";
  try {
    return JSON.stringify(JSON.parse(raw), null, 2);
  } catch {
    return raw;
  }
}
