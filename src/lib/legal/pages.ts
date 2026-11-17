/**
 * The developer platform's legal pages (plan step 15.5), served at /legal/<slug>. Drafted for legal
 * review: until `LEGAL.approved` is true every page says it's a draft, and the company details are
 * placeholders. Legal approves the text, fills the details, sets the version and the date, and
 * flips `approved`.
 */
export const LEGAL = {
  approved: false,
  /** Bump with every change legal approves; sign-up records nothing yet, so this is for the reader. */
  version: "draft-2026-11-17",
  effective: "Not yet in effect",
} as const;

export type LegalSlug = "terms" | "acceptable-use" | "privacy" | "dpa";

export const LEGAL_PAGES: { slug: LegalSlug; title: string; short: string; summary: string }[] = [
  {
    slug: "terms",
    title: "API Terms of Use",
    short: "Terms",
    summary: "The agreement between your business and Pickriders for using the Developer API and dashboard.",
  },
  {
    slug: "acceptable-use",
    title: "Acceptable Use Policy",
    short: "Acceptable use",
    summary: "What you may and may not send through Pickriders, and what happens if someone does.",
  },
  {
    slug: "privacy",
    title: "Privacy Notice",
    short: "Privacy",
    summary:
      "What personal data Pickriders handles for the developer platform, why, and your rights under Nigerian law.",
  },
  {
    slug: "dpa",
    title: "Data Processing Agreement",
    short: "Data processing",
    summary: "How Pickriders processes your customers' personal data on your behalf when it delivers your orders.",
  },
];

export const legalPage = (slug: string) => LEGAL_PAGES.find((page) => page.slug === slug);
export const legalHref = (slug: LegalSlug) => `/legal/${slug}`;
