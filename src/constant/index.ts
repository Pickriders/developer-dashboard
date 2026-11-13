/** The backend's origin, e.g. https://pickriders-api-dev.onrender.com. Public: it ships to the browser. */
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

/** The public docs (developer-docs). Error bodies link here too (`doc_url`). */
export const DOCS_URL = "https://developers.pickriders.com/docs";

/** Google Maps for the order map and address search, as pickrider-admin uses. Optional: without it
 * the order page draws the route itself and addresses take coordinates. Public by design (browser key,
 * restricted by referrer in Google Cloud). */
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
export const GOOGLE_MAP_ID = process.env.NEXT_PUBLIC_MAP_ID ?? "";
