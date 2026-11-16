import { ERROR_CODES } from "./errors";
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
  section: "Get started" | "The basics" | "Reference";
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
];

export const SECTIONS = ["Get started", "The basics", "Reference"] as const;

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
