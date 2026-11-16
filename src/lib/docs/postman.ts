import { TRY_EXAMPLES } from "./endpoints";
import { exampleFor, type OpenApi, referenceGroups, requestSchema, SPEC } from "./openapi";
import { PUBLIC_API_BASE } from "@/constant";

/**
 * The Postman collection (step 12.9), generated from the API document: a folder per part of the
 * API, every request with its path variables, optional query values and a working body. `baseUrl`
 * and `apiKey` are collection variables; every request uses `apiKey` as its bearer token.
 */
export function postmanCollection(doc: OpenApi = SPEC, base = PUBLIC_API_BASE) {
  return {
    info: {
      name: "Pickriders API",
      description:
        "Every request the Pickriders Developer API accepts. Set the apiKey variable to your test key (sk_test_…), then send Create an order. Docs: https://developers.pickriders.com/docs",
      schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    },
    auth: { type: "bearer", bearer: [{ key: "token", value: "{{apiKey}}", type: "string" }] },
    variable: [
      { key: "baseUrl", value: base, type: "string" },
      { key: "apiKey", value: "sk_test_paste_your_key_here", type: "string" },
    ],
    item: referenceGroups(doc).map((group) => ({
      name: group.name,
      description: group.description,
      item: group.endpoints.map(({ method, path, op }) => {
        const segments = path
          .split("/")
          .filter(Boolean)
          .map((s) => s.replace(/^\{(\w+)\}$/, ":$1"));
        const pathVars = (op.parameters ?? []).filter((p) => p.in === "path");
        const query = (op.parameters ?? []).filter((p) => p.in === "query");
        const tried = TRY_EXAMPLES[`${method} ${path}`];
        const schema = requestSchema(op);
        const body = tried?.body ?? (schema ? exampleFor(schema, doc) : undefined);
        const idempotent = (op.parameters ?? []).some((p) => p.in === "header" && p.name === "Idempotency-Key");
        return {
          name: op.summary ?? `${method} ${path}`,
          request: {
            method,
            description: op.description ?? "",
            header: [
              ...(body !== undefined ? [{ key: "Content-Type", value: "application/json" }] : []),
              ...(idempotent
                ? [{ key: "Idempotency-Key", value: "{{$guid}}", description: "Optional: retry safely." }]
                : []),
            ],
            url: {
              raw: `{{baseUrl}}/${segments.join("/")}`,
              host: ["{{baseUrl}}"],
              path: segments,
              ...(pathVars.length && {
                variable: pathVars.map((p) => ({ key: p.name, value: "", description: p.description ?? "" })),
              }),
              ...(query.length && {
                query: query.map((p) => ({
                  key: p.name,
                  value: tried?.query?.[p.name] ?? "",
                  description: p.description ?? "",
                  disabled: !p.required && !tried?.query?.[p.name],
                })),
              }),
            },
            ...(body !== undefined && {
              body: { mode: "raw", raw: JSON.stringify(body, null, 2), options: { raw: { language: "json" } } },
            }),
          },
        };
      }),
    })),
  };
}
