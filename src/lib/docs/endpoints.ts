/**
 * Try it's starting points (step 12.6), by "METHOD path": the reference pages generate everything else
 * from the API document, but a body that works as it is (real Lagos stops) is written here.
 */
const STOPS = [
  {
    address: "1 Admiralty Way, Lekki Phase 1, Lagos",
    lat: 6.4474,
    lng: 3.474,
    contact: { name: "Bola Ade", phone: "+2348031234567" },
  },
  {
    address: "12 Bourdillon Road, Ikoyi, Lagos",
    lat: 6.456,
    lng: 3.431,
    contact: { name: "Chidi Eze", phone: "+2348055550101" },
  },
];
const SINGLE = { type: "single", service_area: "NG-LA", stops: STOPS };
const LIST = { limit: "5" };

/** What Try it starts with, by "METHOD path": query values to edit, and a body that works as it is. */
export const TRY_EXAMPLES: Record<string, { query?: Record<string, string>; body?: unknown }> = {
  "POST /orders": { body: { ...SINGLE, reference: "tried-in-the-docs" } },
  "GET /orders": { query: { ...LIST, status: "" } },
  "POST /orders/{id}/cancel": { body: { reason: "Customer changed their mind" } },
  "POST /orders/{id}/reschedule": { body: { scheduled_for: "2026-12-01T10:00:00+01:00" } },
  "POST /orders/{id}/dispatch": { body: {} },
  "PATCH /orders/{id}/stops/{stop_id}": { body: { instructions: "Ring the bell twice" } },
  "POST /quotes": { body: SINGLE },
  "GET /wallet/transactions": { query: LIST },
  "POST /wallet/funding-sessions": { body: { amount: 5000000, success_url: "https://example.com/funded" } },
  "POST /webhook_endpoints": { body: { url: "https://example.com/pickriders/webhooks", enabled_events: ["*"] } },
  "GET /webhook_endpoints": { query: LIST },
  "PATCH /webhook_endpoints/{id}": { body: { enabled_events: ["order.delivered", "order.failed"] } },
  "GET /events": { query: { ...LIST, type: "" } },
  "GET /riders/availability": { query: { lat: "6.4474", lng: "3.474", service_area: "NG-LA" } },
  "POST /test/wallet/fund": { body: { amount: 5000000 } },
  "POST /test/orders/{id}/advance": { body: { to: "delivered" } },
};
