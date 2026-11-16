import { exampleFor, type OpenApi, type Schema, SPEC } from "./openapi";

/**
 * Every webhook event (step 12.7), with an example generated from the API document's schemas (which
 * backend-api builds from its presenters), so an example can't drift from what's really sent: CI
 * validates each against PublicEventDto and the schema of what it's about.
 */
type Kind = "order" | "wallet" | "account";
export type EventDoc = {
  type: string;
  kind: Kind;
  /** One sentence: when it's sent. */
  when: string;
  /** What you'd usually do about it. */
  then: string;
  /** For order events: the status the order has in the example. */
  status?: string;
  /** Extra fields beside data.object, as the API sends them for this type. */
  extras?: ("stop_id" | "offer" | "transaction" | "threshold")[];
};

export const EVENT_DOCS: EventDoc[] = [
  {
    type: "order.created",
    kind: "order",
    status: "searching",
    when: "You created an order.",
    then: "Save the order id with your own record of it.",
  },
  {
    type: "order.searching",
    kind: "order",
    status: "searching",
    when: "Riders are being asked to take the order.",
    then: "Tell your customer you're finding a rider.",
  },
  {
    type: "order.offer.created",
    kind: "order",
    status: "searching",
    extras: ["offer"],
    when: "A rider offered a price for a bidding order.",
    then: "Accept it with POST /orders/{id}/offers/{offer_id}/accept, or wait for more.",
  },
  {
    type: "order.offer.expired",
    kind: "order",
    status: "searching",
    extras: ["offer"],
    when: "An offer ran out before you answered it.",
    then: "Nothing; other offers may still come.",
  },
  {
    type: "order.rider_assigned",
    kind: "order",
    status: "rider_assigned",
    when: "A rider took the order and is heading to the pickup.",
    then: "Show your customer the rider's name and the tracking link.",
  },
  {
    type: "order.rider_changed",
    kind: "order",
    status: "rider_assigned",
    when: "A different rider took over the order.",
    then: "Update the rider you show your customer.",
  },
  {
    type: "order.picked_up",
    kind: "order",
    status: "in_transit",
    extras: ["stop_id"],
    when: "The rider has the parcel from a pickup.",
    then: "Tell your customer it's on its way.",
  },
  {
    type: "order.stop.arrived",
    kind: "order",
    status: "in_transit",
    extras: ["stop_id"],
    when: "The rider reached a stop.",
    then: "Let the person at that stop know the rider is outside.",
  },
  {
    type: "order.stop.completed",
    kind: "order",
    status: "in_transit",
    extras: ["stop_id"],
    when: "A stop is done: picked up or handed over.",
    then: "For a batch, mark that drop-off delivered.",
  },
  {
    type: "order.delivered",
    kind: "order",
    status: "delivered",
    when: "Every drop-off is done.",
    then: "Mark the order delivered. The held price is now charged.",
  },
  {
    type: "order.cancelled",
    kind: "order",
    status: "cancelled",
    when: "You or Pickriders cancelled the order.",
    then: "Read data.object.cancellation for what was charged and refunded.",
  },
  {
    type: "order.failed",
    kind: "order",
    status: "failed",
    when: "We couldn't deliver it, for example no rider took it.",
    then: "Everything held goes back to your wallet. Try again or tell your customer.",
  },
  {
    type: "wallet.funded",
    kind: "wallet",
    extras: ["transaction"],
    when: "Money came into your wallet.",
    then: "Nothing; data.transaction is the credit, data.object the wallet after it.",
  },
  {
    type: "wallet.balance_low",
    kind: "wallet",
    extras: ["threshold"],
    when: "Your available balance dropped below your alert amount.",
    then: "Top up before new orders start failing with insufficient_funds.",
  },
  {
    type: "account.updated",
    kind: "account",
    when: "Something about your account changed, like live access being approved.",
    then: "Check data.object.live_status if you're waiting for live access.",
  },
];

const SCHEMAS: Record<Kind, string> = {
  order: "PublicOrderDto",
  wallet: "PublicWalletDto",
  account: "PublicAccountDto",
};
export const schemaFor = (kind: Kind): Schema => ({ $ref: `#/components/schemas/${SCHEMAS[kind]}` });

export const eventSlug = (type: string) => type.replace(/\./g, "-");
export const findEvent = (slug: string) => EVENT_DOCS.find((e) => eventSlug(e.type) === slug);

/** The event as webhooks and GET /events send it, built from the API document's examples. */
export function exampleEvent(event: EventDoc, doc: OpenApi = SPEC) {
  const object = exampleFor(schemaFor(event.kind), doc) as Record<string, unknown>;
  if (event.status) object.status = event.status;
  if (event.status !== "cancelled" && "cancellation" in object) object.cancellation = null;
  const extras: Record<string, unknown> = {};
  for (const extra of event.extras ?? []) {
    if (extra === "stop_id") extras.stop_id = "stop_6560f0c2a1b2c3d4e5f60718";
    if (extra === "threshold") extras.threshold = 5000000;
    if (extra === "offer") {
      extras.offer = {
        ...(exampleFor({ $ref: "#/components/schemas/PublicOfferDto" }, doc) as object),
        status: event.type.endsWith("expired") ? "expired" : "pending",
      };
    }
    if (extra === "transaction")
      extras.transaction = exampleFor({ $ref: "#/components/schemas/PublicWalletTransactionDto" }, doc);
  }
  return {
    object: "event",
    id: "evt_6560f0c2a1b2c3d4e5f60718",
    type: event.type,
    created: "2026-11-16T09:30:00.000Z",
    livemode: false,
    data: { object, ...extras },
  };
}
