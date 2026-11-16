import type { MetadataRoute } from "next";

import { SITE_URL } from "@/constant";

/** Crawl the docs and sign-up; everything else is a signed-in dashboard page or the API proxy. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: ["/docs", "/auth/signup"], disallow: ["/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
