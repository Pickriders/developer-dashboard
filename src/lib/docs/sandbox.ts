import { GUIDE_REQUESTS } from "./guides";
import type { GuideRequest } from "./requests";

/**
 * Runs the guides' requests (step 12.5) in order, with a test key, against `base`: in CI that's the
 * mock API (e2e/docs.spec.ts), never the deployed API, which would keep every order. Ids from earlier answers
 * fill later requests, and `{{later}}` becomes a real time a few hours away. Live-only requests and
 * those a test key can't trigger are skipped. Returns what went wrong, per guide; empty when all ran.
 */
export async function runGuides(base: string, key: string, guides = GUIDE_REQUESTS): Promise<string[]> {
  const problems: string[] = [];
  for (const [guide, requests] of Object.entries(guides)) {
    const values: Record<string, string> = {
      later: new Date(Date.now() + 3 * 3600_000).toISOString(),
      "later.again": new Date(Date.now() + 5 * 3600_000).toISOString(),
    };
    for (const req of requests) {
      if (req.liveOnly || req.skipInSandbox) continue;
      const fill = (text: string) => text.replace(/\{\{([\w.]+)\}\}/g, (whole, name: string) => values[name] ?? whole);
      const path = fill(req.path);
      if (/\{\{/.test(path)) {
        problems.push(`${guide} → ${req.name}: nothing earlier gave ${path.match(/\{\{[\w.]+\}\}/)![0]}`);
        break;
      }
      const res = await send(base, key, req, path, req.body === undefined ? undefined : fill(JSON.stringify(req.body)));
      if (res.status >= 300) {
        problems.push(`${guide} → ${req.name}: ${req.method} ${path} answered ${res.status} ${res.text.slice(0, 300)}`);
        break;
      }
      if (req.capture) values[`${req.capture}.id`] = (JSON.parse(res.text) as { id: string }).id;
    }
  }
  return problems;
}

async function send(base: string, key: string, req: GuideRequest, path: string, body?: string) {
  const res = await fetch(`${base}${path}`, {
    method: req.method,
    headers: { Authorization: `Bearer ${key}`, ...(body && { "Content-Type": "application/json" }) },
    body,
  });
  return { status: res.status, text: await res.text() };
}
