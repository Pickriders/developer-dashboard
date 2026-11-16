import { API_URL, PUBLIC_API_BASE } from "@/constant";

/**
 * Try it (step 12.6): readers send real requests from the docs with their own test key. The browser
 * calls the API directly (it allows any origin), so the key never passes through this app; it lives
 * in the page's memory only. Test keys only: a live request would send a real rider.
 */
export const TRY_BASE = API_URL ? `${API_URL.replace(/\/$/, "")}/developer/api/v1` : PUBLIC_API_BASE;

/** Why this key can't be used here, or null if it can. */
export function keyProblem(key: string): string | null {
  const k = key.trim();
  if (!k) return "Paste your test key first.";
  if (k.startsWith("sk_live_"))
    return "That's a live key. Try it only takes test keys: live requests send real riders.";
  if (!/^sk_test_\S{8,}$/.test(k)) return "A test key starts with sk_test_. Copy it again from API keys.";
  return null;
}

/** The {names} in a path, in order: /orders/{id}/stops/{stop_id} → ["id", "stop_id"]. */
export const pathParams = (path: string) => Array.from(path.matchAll(/\{(\w+)\}/g), (m) => m[1]);

/** The full URL, with path values filled in (encoded) and empty query values left out. */
export function buildUrl(
  path: string,
  params: Record<string, string>,
  query: Record<string, string> = {},
  base = TRY_BASE,
) {
  const filled = path.replace(/\{(\w+)\}/g, (_, name: string) => encodeURIComponent((params[name] ?? "").trim()));
  const search = new URLSearchParams(Object.entries(query).filter(([, v]) => v.trim() !== ""));
  return `${base}${filled}${search.size ? `?${search}` : ""}`;
}

/** The path values still missing, so Send can say which. */
export const missingParams = (path: string, params: Record<string, string>) =>
  pathParams(path).filter((name) => !(params[name] ?? "").trim());

/** A body that's JSON, or the reason it isn't. */
export function parseBody(text: string): { ok: true; body: unknown } | { ok: false; message: string } {
  if (!text.trim()) return { ok: true, body: undefined };
  try {
    return { ok: true, body: JSON.parse(text) };
  } catch (e) {
    return { ok: false, message: `The body isn't valid JSON: ${(e as Error).message}` };
  }
}
