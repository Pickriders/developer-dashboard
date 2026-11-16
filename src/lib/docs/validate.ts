import { type OpenApi, resolve, type Schema, SPEC } from "./openapi";

/**
 * Checks a value against a schema from the API document, the parts the docs need: types, required
 * fields, enums, nullable, arrays and $refs. Used to prove the docs' examples (guides, events) are
 * what the API takes and sends, so they can't drift from it. Returns what's wrong, by path.
 */
export function validate(value: unknown, schema: Schema | undefined, doc: OpenApi = SPEC, at = "$"): string[] {
  if (!schema) return [];
  const s = resolve(schema, doc);
  if (value === null) return s.nullable || s.type === undefined ? [] : [`${at}: is null, but it isn't nullable`];
  if (value === undefined) return [];
  if (s.oneOf || s.anyOf) {
    const options = (s.oneOf ?? s.anyOf)!;
    return options.some((o) => validate(value, o, doc, at).length === 0) ? [] : [`${at}: matches none of its options`];
  }
  if (s.enum && !s.enum.includes(value)) return [`${at}: ${JSON.stringify(value)} isn't one of ${s.enum.join(", ")}`];

  const type = s.type ?? (s.properties ? "object" : undefined);
  switch (type) {
    case "string":
      return typeof value === "string" ? [] : [`${at}: should be a string`];
    case "number":
      return typeof value === "number" ? [] : [`${at}: should be a number`];
    case "integer":
      return Number.isInteger(value) ? [] : [`${at}: should be a whole number`];
    case "boolean":
      return typeof value === "boolean" ? [] : [`${at}: should be true or false`];
    case "array":
      return Array.isArray(value)
        ? value.flatMap((item, i) => validate(item, s.items, doc, `${at}[${i}]`))
        : [`${at}: should be a list`];
    case "object": {
      if (typeof value !== "object" || Array.isArray(value)) return [`${at}: should be an object`];
      const record = value as Record<string, unknown>;
      const missing = (s.required ?? []).filter((k) => !(k in record)).map((k) => `${at}.${k}: is required`);
      const known = s.properties ?? {};
      const unknown =
        s.properties && s.additionalProperties !== true && !isFreeForm(s)
          ? Object.keys(record)
              .filter((k) => !(k in known))
              .map((k) => `${at}.${k}: isn't a field of this object`)
          : [];
      const nested = Object.entries(record).flatMap(([k, v]) =>
        known[k] ? validate(v, known[k], doc, `${at}.${k}`) : [],
      );
      return [...missing, ...unknown, ...nested];
    }
    default:
      return [];
  }
}

/** `metadata`-style objects with no listed fields take anything. */
const isFreeForm = (s: Schema) => !s.properties || Object.keys(s.properties).length === 0;
