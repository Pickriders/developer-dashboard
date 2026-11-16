// Downloads the public Developer API document (backend-api serves it at /developer/docs/openapi.json
// in every environment) and writes it, formatted, to the path given.
//
//   node scripts/fetch-openapi.mjs src/lib/docs/openapi.json            # the dev API
//   DEVELOPER_OPENAPI_URL=https://… node scripts/fetch-openapi.mjs out.json
//   node scripts/fetch-openapi.mjs out.json ../backend-api/developer-openapi.json   # a local dump
import { readFile, writeFile } from "node:fs/promises";

const [out, local] = process.argv.slice(2);
if (!out) {
  console.error("Usage: node scripts/fetch-openapi.mjs <out.json> [local-file]");
  process.exit(2);
}
const url = process.env.DEVELOPER_OPENAPI_URL ?? "https://pickriders-api-dev.onrender.com/developer/docs/openapi.json";

let text;
if (local) {
  text = await readFile(local, "utf8");
} else {
  // The dev API sleeps when idle: give it a while to wake.
  const res = await fetch(url, { signal: AbortSignal.timeout(90_000) });
  if (!res.ok) throw new Error(`${url} answered ${res.status}`);
  text = await res.text();
}
const doc = JSON.parse(text);
if (!doc.openapi || !doc.paths) throw new Error("That isn't an OpenAPI document.");
await writeFile(out, `${JSON.stringify(doc, null, 2)}\n`);
console.log(
  `Wrote ${out}: ${Object.keys(doc.paths).length} paths, ${Object.keys(doc.components?.schemas ?? {}).length} schemas.`,
);
