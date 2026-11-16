import type { GuideRequest } from "./requests";

/**
 * The requests each guide shows (step 12.5), in the order a reader sends them. One source for the
 * examples on the page, the check that each matches the API document, and the sandbox run.
 */
const LEKKI = { address: "1 Admiralty Way, Lekki Phase 1, Lagos", lat: 6.4474, lng: 3.474 };
const IKOYI = { address: "12 Bourdillon Road, Ikoyi, Lagos", lat: 6.456, lng: 3.431 };
const YABA = { address: "Herbert Macaulay Way, Yaba, Lagos", lat: 6.517, lng: 3.3746 };
const IKEJA = { address: "Allen Avenue, Ikeja, Lagos", lat: 6.6018, lng: 3.3515 };
const BOLA = { name: "Bola Ade", phone: "+2348031234567" };
const CHIDI = { name: "Chidi Eze", phone: "+2348055550101" };
const NGOZI = { name: "Ngozi Obi", phone: "+2348092223344" };
const SINGLE = {
  type: "single",
  service_area: "NG-LA",
  stops: [
    { ...LEKKI, contact: BOLA },
    { ...IKOYI, contact: CHIDI },
  ],
};

export const GUIDE_REQUESTS: Record<string, GuideRequest[]> = {
  "going-live": [{ name: "account", method: "GET", path: "/account" }],

  "funding-the-wallet": [
    { name: "wallet", method: "GET", path: "/wallet" },
    { name: "test funds", method: "POST", path: "/test/wallet/fund", body: { amount: 5000000 } },
    { name: "transactions", method: "GET", path: "/wallet/transactions?limit=5" },
    {
      name: "checkout",
      method: "POST",
      path: "/wallet/funding-sessions",
      liveOnly: true,
      body: { amount: 5000000, success_url: "https://shop.example.com/wallet/topped-up" },
    },
    { name: "bank account", method: "GET", path: "/wallet/funding-account", liveOnly: true },
  ],

  "quotes-and-pricing": [
    { name: "areas", method: "GET", path: "/service-areas" },
    { name: "quote", method: "POST", path: "/quotes", body: SINGLE, capture: "quote" },
    { name: "same quote", method: "GET", path: "/quotes/{{quote.id}}" },
    { name: "order", method: "POST", path: "/orders", body: { quote_id: "{{quote.id}}" } },
  ],

  "delivery-types": [
    { name: "single", method: "POST", path: "/quotes", body: SINGLE },
    {
      name: "batch",
      method: "POST",
      path: "/quotes",
      body: {
        type: "batch",
        service_area: "NG-LA",
        stops: [
          { ...LEKKI, contact: BOLA },
          { ...IKOYI, contact: CHIDI },
          { ...YABA, contact: NGOZI },
        ],
      },
    },
    {
      name: "bulk",
      method: "POST",
      path: "/quotes",
      capture: "quote",
      body: {
        type: "bulk",
        service_area: "NG-LA",
        stops: [
          { ...IKEJA, instructions: "Buy 2 bags of rice at the counter" },
          { ...YABA, instructions: "Collect order #4471 from the front desk" },
          { ...LEKKI, contact: BOLA },
        ],
      },
    },
  ],

  scheduling: [
    {
      name: "quote",
      method: "POST",
      path: "/quotes",
      capture: "quote",
      body: { ...SINGLE, scheduled_for: "{{later}}" },
    },
    { name: "order", method: "POST", path: "/orders", capture: "order", body: { quote_id: "{{quote.id}}" } },
    {
      name: "moved",
      method: "POST",
      path: "/orders/{{order.id}}/reschedule",
      body: { scheduled_for: "{{later.again}}" },
    },
  ],

  bidding: [
    {
      name: "order",
      method: "POST",
      path: "/orders",
      capture: "order",
      body: { ...SINGLE, pricing: { mode: "bidding", max_amount: 600000, auto_accept_after_s: 180 } },
    },
    { name: "offers", method: "GET", path: "/orders/{{order.id}}/offers" },
    {
      name: "accepted",
      method: "POST",
      path: "/orders/{{order.id}}/offers/{{offer.id}}/accept",
      skipInSandbox: true,
    },
  ],

  "tracking-and-proof": [
    { name: "order", method: "POST", path: "/orders", capture: "order", body: SINGLE },
    { name: "tracking", method: "GET", path: "/orders/{{order.id}}/tracking" },
    { name: "delivered", method: "POST", path: "/test/orders/{{order.id}}/advance", body: { to: "delivered" } },
    { name: "proof", method: "GET", path: "/orders/{{order.id}}" },
  ],

  cancellations: [
    { name: "order", method: "POST", path: "/orders", capture: "order", body: SINGLE },
    {
      name: "cancelled",
      method: "POST",
      path: "/orders/{{order.id}}/cancel",
      body: { reason: "The customer changed their mind" },
    },
  ],
};

/** One request of a guide, by its name, for the page to show. */
export const guideRequest = (guide: string, name: string) => {
  const found = GUIDE_REQUESTS[guide]?.find((r) => r.name === name);
  if (!found) throw new Error(`No request "${name}" in the ${guide} guide.`);
  return found;
};
