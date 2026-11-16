/** Every Developer API route, grouped as the API document tags them (12.2 generates the full reference). */
export type EndpointEntry = { method: "GET" | "POST" | "PATCH" | "DELETE"; path: string; does: string };

export const ENDPOINT_GROUPS: { name: string; about: string; endpoints: EndpointEntry[] }[] = [
  {
    name: "Orders",
    about: "Create, follow, change and cancel deliveries.",
    endpoints: [
      { method: "POST", path: "/orders", does: "Create an order, from a quote or straight from stops." },
      { method: "GET", path: "/orders", does: "List your orders, newest first." },
      { method: "GET", path: "/orders/{id}", does: "Get one order." },
      { method: "GET", path: "/orders/{id}/tracking", does: "Where the rider is right now." },
      {
        method: "POST",
        path: "/orders/{id}/cancel",
        does: "Cancel an order before pickup. The money goes back to your wallet.",
      },
      { method: "POST", path: "/orders/{id}/reschedule", does: "Move a scheduled order to another time." },
      { method: "POST", path: "/orders/{id}/dispatch", does: "Send a manual-dispatch order to riders." },
      { method: "PATCH", path: "/orders/{id}/stops/{stop_id}", does: "Change a stop's contact or instructions." },
      { method: "GET", path: "/orders/{id}/offers", does: "List riders' offers on a bidding order." },
      { method: "POST", path: "/orders/{id}/offers/{offer_id}/accept", does: "Accept a rider's offer." },
      { method: "POST", path: "/orders/{id}/offers/{offer_id}/decline", does: "Decline a rider's offer." },
      { method: "GET", path: "/orders/{id}/events", does: "Everything that happened to one order." },
      { method: "GET", path: "/tracking/{token}", does: "Follow a public tracking link." },
    ],
  },
  {
    name: "Quotes",
    about: "The price of a delivery, held for 15 minutes.",
    endpoints: [
      { method: "POST", path: "/quotes", does: "Get a price for a single, batch or bulk delivery." },
      { method: "GET", path: "/quotes/{id}", does: "Get a quote again." },
    ],
  },
  {
    name: "Wallet",
    about: "The money orders are paid from.",
    endpoints: [
      { method: "GET", path: "/wallet", does: "Your balance, and how much is held for orders." },
      { method: "GET", path: "/wallet/transactions", does: "Money in and out, newest first." },
      { method: "POST", path: "/wallet/funding-sessions", does: "A card checkout to top up your live wallet." },
      { method: "GET", path: "/wallet/funding-account", does: "Your bank account for topping up by transfer." },
    ],
  },
  {
    name: "Webhooks and events",
    about: "Messages Pickriders sends your server, and the record of what happened.",
    endpoints: [
      { method: "POST", path: "/webhook_endpoints", does: "Add a URL for Pickriders to send events to." },
      { method: "GET", path: "/webhook_endpoints", does: "List your endpoints." },
      { method: "GET", path: "/webhook_endpoints/{id}", does: "Get one endpoint." },
      { method: "PATCH", path: "/webhook_endpoints/{id}", does: "Change its URL or events, or turn it off." },
      { method: "DELETE", path: "/webhook_endpoints/{id}", does: "Delete an endpoint." },
      { method: "POST", path: "/webhook_endpoints/{id}/roll_secret", does: "Get a new signing secret." },
      { method: "POST", path: "/webhook_endpoints/{id}/test", does: "Send a test event." },
      { method: "GET", path: "/events", does: "Events from the last 30 days." },
      { method: "GET", path: "/events/{id}", does: "Get one event." },
      { method: "POST", path: "/events/{id}/resend", does: "Send an event to your endpoints again." },
    ],
  },
  {
    name: "Your account",
    about: "Who you are, and where Pickriders works.",
    endpoints: [
      { method: "GET", path: "/ping", does: "Check you can reach the API." },
      { method: "GET", path: "/account", does: "Your team, its verification and live status." },
      { method: "GET", path: "/service-areas", does: "Where Pickriders delivers, with the lowest price in each." },
      { method: "GET", path: "/riders/availability", does: "How many riders are near a point." },
    ],
  },
  {
    name: "Test helpers",
    about: "Test keys only: play money and a pretend rider.",
    endpoints: [
      { method: "POST", path: "/test/wallet/fund", does: "Add play money to your test wallet." },
      {
        method: "POST",
        path: "/test/orders/{id}/advance",
        does: "Move a test order to its next step, or straight to delivered.",
      },
    ],
  },
];
