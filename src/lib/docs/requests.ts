import type { CodeTab } from "@/components/docs/code";
import { PUBLIC_API_BASE } from "@/constant";

import { endpoints, requestSchema, type OpenApi, SPEC } from "./openapi";
import { validate } from "./validate";

/**
 * A request in the guides, written once as data: the same object becomes the curl, Node.js, Python
 * and PHP examples, is checked against the API document in CI, and runs against the mock API.
 * `{{name.field}}` in a path or body is a value from an earlier request in the guide.
 */
export type GuideRequest = {
  name: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  body?: unknown;
  /** Live mode only (a card checkout, a bank account): the guide run skips it. */
  liveOnly?: boolean;
  /** Needs something a test key can't make happen (a real rider's offer): the guide run skips it. */
  skipInSandbox?: boolean;
  /** Its answer's id fills `{{<capture>.id}}` in the requests after it. */
  capture?: "quote" | "order" | "offer";
};

const SAMPLE_IDS: Record<string, string> = {
  "quote.id": "quo_6560f0c2a1b2c3d4e5f60718",
  "order.id": "ord_6560f0c2a1b2c3d4e5f60718",
  "offer.id": "off_6560f0c2a1b2c3d4e5f60718",
  "stop.id": "stop_6560f0c2a1b2c3d4e5f60718",
  // Times at least an hour away, as scheduling needs; the sandbox run uses real ones.
  later: "2026-12-01T10:00:00+01:00",
  "later.again": "2026-12-01T14:00:00+01:00",
};

/** `{{order.id}}` as the sample id readers see in the docs. */
export const withSamples = (text: string) =>
  text.replace(/\{\{([\w.]+)\}\}/g, (_, name: string) => SAMPLE_IDS[name] ?? `<${name}>`);

/** curl, Node.js, Python and PHP for one request. */
export function requestTabs(req: GuideRequest, base = PUBLIC_API_BASE): CodeTab[] {
  const url = `${base}${withSamples(req.path)}`;
  const body = req.body === undefined ? undefined : JSON.parse(withSamples(JSON.stringify(req.body)));
  const json = body === undefined ? "" : JSON.stringify(body, null, 2);
  const indent = (text: string, by: string) => text.replace(/\n/g, `\n${by}`);
  const pyJson = json
    .replace(/\btrue\b/g, "True")
    .replace(/\bfalse\b/g, "False")
    .replace(/\bnull\b/g, "None");

  return [
    {
      label: "curl",
      lang: "bash",
      code: [
        `curl${req.method === "GET" ? "" : ` -X ${req.method}`} ${url} \\`,
        `  -H "Authorization: Bearer $PICKRIDERS_KEY"${body === undefined ? "" : " \\"}`,
        ...(body === undefined ? [] : [`  -H "Content-Type: application/json" \\`, `  -d '${indent(json, "  ")}'`]),
      ].join("\n"),
    },
    {
      label: "Node.js",
      lang: "javascript",
      code: `const res = await fetch("${url}", {
  method: "${req.method}",
  headers: {
    Authorization: \`Bearer \${process.env.PICKRIDERS_KEY}\`,${body === undefined ? "" : `\n    "Content-Type": "application/json",`}
  },${body === undefined ? "" : `\n  body: JSON.stringify(${indent(json, "  ")}),`}
});
const ${varName(req.name)} = await res.json();`,
    },
    {
      label: "Python",
      lang: "python",
      code: `${varName(req.name)} = requests.${req.method.toLowerCase()}(
    "${url}",
    headers={"Authorization": f"Bearer {os.environ['PICKRIDERS_KEY']}"},${body === undefined ? "" : `\n    json=${indent(pyJson, "    ")},`}
).json()`,
    },
    {
      label: "PHP",
      lang: "php",
      code: `$ch = curl_init("${url}");
curl_setopt_array($ch, [
    CURLOPT_CUSTOMREQUEST => "${req.method}",
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer " . getenv("PICKRIDERS_KEY"),${body === undefined ? "" : `\n        "Content-Type: application/json",`}
    ],${body === undefined ? "" : `\n    CURLOPT_POSTFIELDS => '${JSON.stringify(body)}',`}
    CURLOPT_RETURNTRANSFER => true,
]);
$${varName(req.name)} = json_decode(curl_exec($ch), true);`,
    },
  ];
}

const varName = (name: string) =>
  name.replace(/\W+(\w)/g, (_, c: string) => c.toUpperCase()).replace(/^\W+/, "") || "result";

/** What's wrong with a guide request against the API document: an unknown route, or a body it won't take. */
export function checkRequest(req: GuideRequest, doc: OpenApi = SPEC): string[] {
  const route = req.path.replace(/\{\{[\w.]+\}\}/g, "{x}").replace(/\?.*$/, "");
  const match = endpoints(doc).find((e) => e.method === req.method && e.path.replace(/\{\w+\}/g, "{x}") === route);
  if (!match) return [`${req.method} ${req.path}: no such endpoint in the API document`];
  if (req.body === undefined) return [];
  const body = JSON.parse(withSamples(JSON.stringify(req.body)));
  return validate(body, requestSchema(match.op), doc).map((problem) => `${req.method} ${req.path}: ${problem}`);
}
