import type { MetadataRoute } from "next";

import { SITE_URL } from "@/constant";
import { DOC_PAGES, docHref } from "@/lib/docs/pages";
import { LEGAL, LEGAL_PAGES, legalHref } from "@/lib/legal/pages";

/** The public pages search engines should find: the docs, sign-up and (once approved) the legal pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...DOC_PAGES.map((page) => ({
      url: `${SITE_URL}${docHref(page.slug)}`,
      changeFrequency: "weekly" as const,
      priority: page.slug === "" ? 1 : page.slug === "quickstart" ? 0.9 : 0.7,
    })),
    { url: `${SITE_URL}/auth/signup`, changeFrequency: "monthly", priority: 0.6 },
    ...(LEGAL.approved
      ? LEGAL_PAGES.map((page) => ({
          url: `${SITE_URL}${legalHref(page.slug)}`,
          changeFrequency: "yearly" as const,
          priority: 0.3,
        }))
      : []),
  ];
}
