import type { MetadataRoute } from "next";

import { SITE_URL } from "@/constant";
import { DOC_PAGES, docHref } from "@/lib/docs/pages";

/** The public pages search engines should find: the docs and sign-up. Dashboard pages need a session. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...DOC_PAGES.map((page) => ({
      url: `${SITE_URL}${docHref(page.slug)}`,
      changeFrequency: "weekly" as const,
      priority: page.slug === "" ? 1 : page.slug === "quickstart" ? 0.9 : 0.7,
    })),
    { url: `${SITE_URL}/auth/signup`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
