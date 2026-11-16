import { ERROR_CODES } from "./errors";
import { EVENT_DOCS, eventSlug } from "./events";
import { referenceGroups } from "./openapi";

/**
 * Every docs page, in reading order. The sidebar, search, the sitemap, "Next" links and each page's
 * metadata all come from here, so a page exists once. `slug` "" is /docs itself.
 */
export type DocPage = {
  slug: string;
  /** The sidebar and the page's h1. */
  title: string;
  /** One plain sentence: the search result, the meta description and the social card. */
  description: string;
  section: "Get started" | "The basics" | "Guides" | "Reference" | "Updates";
  /** Searchable and in the sitemap, but not listed in the sidebar (one page per event). */
  hidden?: boolean;
  /** Words people search with that aren't in the title or description. */
  keywords: string[];
};

export const DOC_PAGES: DocPage[] = [
  {
    slug: "",
    title: "Start here",
    description: "Send your first delivery with the Pickriders API in three small steps.",
    section: "Get started",
    keywords: ["introduction", "overview", "welcome", "home", "what is pickriders"],
  },
  {
    slug: "quickstart",
    title: "Your first delivery",
    description: "Get a test key, ask for a price, book the order and watch it get delivered. About 10 minutes.",
    section: "Get started",
    keywords: ["quickstart", "tutorial", "first order", "curl", "node", "python", "php", "example"],
  },
  {
    slug: "test-and-live",
    title: "Test mode and live mode",
    description: "Test mode is a safe playground with play money and a pretend rider. Live mode sends real riders.",
    section: "Get started",
    keywords: ["sandbox", "test keys", "go live", "live access", "approval", "play money"],
  },
  {
    slug: "authentication",
    title: "API keys",
    description: "Every request carries your secret key. Here is how to send it and keep it safe.",
    section: "Get started",
    keywords: [
      "authentication",
      "authorization",
      "bearer",
      "sk_test",
      "sk_live",
      "secret",
      "roll",
      "revoke",
      "ip allowlist",
    ],
  },
  {
    slug: "webhooks",
    title: "Webhooks",
    description:
      "Let Pickriders tell your server the moment an order moves, and check each message really came from us.",
    section: "The basics",
    keywords: ["events", "notifications", "callback", "signature", "Pickriders-Signature", "hmac", "retries", "whsec"],
  },
  {
    slug: "errors",
    title: "Errors",
    description: "What every error means and how to fix it, by its code.",
    section: "The basics",
    keywords: [
      // Every code, so searching "quote_expired" finds the page.
      ...ERROR_CODES.map((e) => e.code),
      "error codes",
      "status codes",
      "400",
      "401",
      "402",
      "403",
      "404",
      "409",
      "429",
      "500",
      "request id",
      "troubleshooting",
    ],
  },
  {
    slug: "money",
    title: "Money",
    description: "Amounts are whole numbers in kobo: 350000 means ₦3,500.00.",
    section: "The basics",
    keywords: ["kobo", "naira", "ngn", "currency", "amounts", "wallet", "price"],
  },
  {
    slug: "idempotency",
    title: "Retrying safely",
    description: "Send an Idempotency-Key and a retried request is never done twice, even if the network fails.",
    section: "The basics",
    keywords: ["idempotency", "idempotency-key", "retry", "duplicate", "timeout", "Idempotent-Replayed"],
  },
  {
    slug: "pagination",
    title: "Pages of results",
    description: "Lists come a page at a time, newest first. Here's how to get the next page, or all of them.",
    section: "The basics",
    keywords: ["pagination", "paging", "limit", "starting_after", "ending_before", "has_more", "list"],
  },
  {
    slug: "rate-limits",
    title: "Rate limits",
    description:
      "How many requests each key can send, the headers that say where you stand, and what to do at the limit.",
    section: "The basics",
    keywords: ["rate limit", "429", "throttle", "Retry-After", "RateLimit-Remaining", "too many requests"],
  },
  {
    slug: "ids",
    title: "IDs",
    description: "Every object has an id whose first letters say what it is, like ord_ for an order.",
    section: "The basics",
    keywords: ["id", "ids", "prefix", "ord_", "quo_", "evt_", "reference", "identifier"],
  },
  {
    slug: "guides/going-live",
    title: "Creating an account and going live",
    description: "From sign-up to real deliveries: verify, ask for live access, and switch your keys.",
    section: "Guides",
    keywords: ["live access", "approval", "verify", "sign up", "live_status"],
  },
  {
    slug: "guides/funding-the-wallet",
    title: "Funding the wallet",
    description: "Play money in test mode; card, bank transfer or auto top-up in live mode.",
    section: "Guides",
    keywords: ["wallet", "top up", "paystack", "bank transfer", "auto top-up", "balance", "funding"],
  },
  {
    slug: "guides/quotes-and-pricing",
    title: "Quotes and pricing",
    description: "What a quote holds, how long, and how its price becomes your order's.",
    section: "Guides",
    keywords: ["quote", "price", "recommended_price", "service area", "expires", "fee"],
  },
  {
    slug: "guides/delivery-types",
    title: "Single, batch and bulk deliveries",
    description: "One stop, many drop-offs, or many pickups, and when a contact is needed.",
    section: "Guides",
    keywords: ["single", "batch", "bulk", "multiple stops", "errand", "contact", "drop-off", "pickup"],
  },
  {
    slug: "guides/scheduling",
    title: "Scheduling",
    description: "Book now, deliver later: from 1 hour to 30 days ahead, and moving it.",
    section: "Guides",
    keywords: ["schedule", "scheduled_for", "reschedule", "later", "future"],
  },
  {
    slug: "guides/bidding",
    title: "Bidding",
    description: "Let riders offer their price, then accept the one you want.",
    section: "Guides",
    keywords: ["bidding", "offers", "accept", "max_amount", "auto accept"],
  },
  {
    slug: "guides/tracking-and-proof",
    title: "Tracking and proof of delivery",
    description: "Where the rider is, links for your customer, and proof each parcel arrived.",
    section: "Guides",
    keywords: ["tracking", "eta", "tracking link", "proof", "confirmation code", "delivered"],
  },
  {
    slug: "guides/cancellations",
    title: "Cancellations and refunds",
    description: "What cancelling costs at each stage, and what happens when we can't deliver.",
    section: "Guides",
    keywords: ["cancel", "refund", "failed", "charged", "cancellation"],
  },
  {
    slug: "guides/go-live-checklist",
    title: "Going-live checklist",
    description: "Ten things to check before your first real delivery.",
    section: "Guides",
    keywords: ["checklist", "launch", "production", "go live", "ready"],
  },
  {
    slug: "api",
    title: "API reference",
    description: "Every request the Pickriders API accepts, with Try it, the OpenAPI file and a Postman collection.",
    section: "Reference",
    keywords: ["api reference", "endpoints", "routes", "openapi", "postman", "swagger", "download"],
  },
  // One page per part of the API, generated from the API document (step 12.2).
  ...referenceGroups().map((group): DocPage => ({
    slug: `api/${group.slug}`,
    title: group.name,
    description: `${group.description || group.name}: ${group.endpoints.length} endpoint${group.endpoints.length === 1 ? "" : "s"}, with every field and Try it.`,
    section: "Reference",
    keywords: group.endpoints.flatMap((e) => [e.path, e.op.summary ?? "", e.op.operationId ?? ""]),
  })),
  {
    slug: "events",
    title: "Events",
    description: "Every event Pickriders sends your webhooks, each with when it's sent and a full example.",
    section: "Reference",
    keywords: ["events", "webhook events", "event types", ...EVENT_DOCS.map((e) => e.type)],
  },
  ...EVENT_DOCS.map((e): DocPage => ({
    slug: `events/${eventSlug(e.type)}`,
    title: e.type,
    description: `${e.when} The ${e.type} event, with what it holds and a full example.`,
    section: "Reference",
    keywords: [e.type, e.kind, "event", "webhook"],
    hidden: true,
  })),
  {
    slug: "changelog",
    title: "Changelog",
    description: "Every change to the Pickriders API and these docs, newest first.",
    section: "Updates",
    keywords: ["changelog", "release notes", "what's new", "updates", "changes"],
  },
  {
    slug: "versioning",
    title: "Versioning and deprecation",
    description:
      "What can change at any time, what needs a new version, and the 6 months' notice before anything breaks.",
    section: "Updates",
    keywords: ["versioning", "deprecation", "breaking changes", "v1", "v2", "policy", "sunset"],
  },
];

export const SECTIONS = ["Get started", "The basics", "Guides", "Reference", "Updates"] as const;

export const docHref = (slug: string) => (slug ? `/docs/${slug}` : "/docs");

export const findDoc = (slug: string) => DOC_PAGES.find((p) => p.slug === slug);

/** The page after this one, for the "Next" link at the bottom. */
export function neighbours(slug: string) {
  const i = DOC_PAGES.findIndex((p) => p.slug === slug);
  return { previous: DOC_PAGES[i - 1] ?? null, next: DOC_PAGES[i + 1] ?? null };
}

/**
 * Pages matching a search, best first: the title counts most, then keywords, then the description.
 * Every word typed must match somewhere.
 */
export function searchDocs(query: string, pages: DocPage[] = DOC_PAGES): DocPage[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const scored = pages.map((page) => {
    const title = page.title.toLowerCase();
    const keywords = page.keywords.join(" ").toLowerCase();
    const description = page.description.toLowerCase();
    let score = 0;
    for (const word of words) {
      const s = title.startsWith(word)
        ? 6
        : title.includes(word)
          ? 4
          : keywords.includes(word)
            ? 3
            : description.includes(word)
              ? 1
              : 0;
      if (!s) return { page, score: 0 };
      score += s;
    }
    return { page, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.page);
}
