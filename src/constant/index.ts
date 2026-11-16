/** The backend's origin, e.g. https://pickriders-api-dev.onrender.com. Public: it ships to the browser. */
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

/** The docs, served by this app at /docs. API errors link to them too (`doc_url`). */
export const DOCS_URL = "/docs";

/**
 * Where this site lives, for canonical links, the sitemap and social cards. backend-api's error
 * `doc_url`s point at developers.pickriders.com/docs, so production serves this app there.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://developers.pickriders.com").replace(/\/$/, "");

/** The Developer API's base URL, as the docs show it. */
export const PUBLIC_API_BASE = "https://api.pickriders.com/developer/api/v1";

/** Google Maps for the order map and address search, as pickrider-admin uses. Optional: without it
 * the order page draws the route itself and addresses take coordinates. Public by design (browser key,
 * restricted by referrer in Google Cloud). */
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
export const GOOGLE_MAP_ID = process.env.NEXT_PUBLIC_MAP_ID ?? "";
