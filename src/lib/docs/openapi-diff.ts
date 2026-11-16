import { endpoints, type OpenApi, PATH_PREFIX, requestSchema, resolve, type Schema, successResponse } from "./openapi";

/**
 * Breaking changes between the published API document and a new one (step 12.2), in words: what an
 * integration built on `before` would trip over. Additions are fine; these aren't:
 *
 * - an endpoint, or a parameter, goes away, or a parameter becomes required
 * - a response field goes away, or changes type
 * - a request gains a required field, or stops accepting a field or an enum value it took
 */
export function breakingChanges(before: OpenApi, after: OpenApi): string[] {
  const out: string[] = [];
  const next = new Map(endpoints(after).map((e) => [`${e.method} ${e.path}`, e]));

  for (const old of endpoints(before)) {
    const name = `${old.method} ${old.path}`;
    const now = next.get(name);
    if (!now) {
      out.push(`${name} was removed.`);
      continue;
    }

    const params = new Map((now.op.parameters ?? []).map((p) => [`${p.in}:${p.name}`, p]));
    for (const p of old.op.parameters ?? []) {
      const still = params.get(`${p.in}:${p.name}`);
      if (!still) out.push(`${name}: the ${p.in} parameter "${p.name}" was removed.`);
      else if (still.required && !p.required) out.push(`${name}: the ${p.in} parameter "${p.name}" is now required.`);
    }
    for (const p of now.op.parameters ?? []) {
      if (p.required && !(old.op.parameters ?? []).some((o) => o.in === p.in && o.name === p.name)) {
        out.push(`${name}: a new required ${p.in} parameter "${p.name}".`);
      }
    }

    compareRequest(requestSchema(old.op), requestSchema(now.op), before, after, `${name} request`, out);

    const was = successResponse(old.op, before);
    const is = successResponse(now.op, after);
    if (was.schema && !is.schema) out.push(`${name}: the ${was.status} response no longer has a body.`);
    else compareResponse(was.schema, is.schema, before, after, `${name} response`, out);
  }
  return out;
}

const typeOf = (s: Schema) => s.type ?? (s.properties ? "object" : undefined);

/** A response is what clients read: a field may be added, never taken away or retyped. */
function compareResponse(
  a: Schema | undefined,
  b: Schema | undefined,
  docA: OpenApi,
  docB: OpenApi,
  at: string,
  out: string[],
  depth = 0,
) {
  if (!a || !b || depth > 6) return;
  const was = resolve(a, docA);
  const is = resolve(b, docB);
  if (typeOf(was) && typeOf(is) && typeOf(was) !== typeOf(is)) {
    out.push(`${at}: changed from ${typeOf(was)} to ${typeOf(is)}.`);
    return;
  }
  if (was.type === "array") return compareResponse(was.items, is.items, docA, docB, `${at}[]`, out, depth + 1);
  for (const [key, prop] of Object.entries(was.properties ?? {})) {
    const still = is.properties?.[key];
    if (!still) out.push(`${at}: the field "${key}" was removed.`);
    else compareResponse(prop, still, docA, docB, `${at}.${key}`, out, depth + 1);
  }
}

/** A request is what clients send: it may accept more, never demand more or accept less. */
function compareRequest(
  a: Schema | undefined,
  b: Schema | undefined,
  docA: OpenApi,
  docB: OpenApi,
  at: string,
  out: string[],
  depth = 0,
) {
  if (!b || depth > 6) return;
  const was = resolve(a, docA);
  const is = resolve(b, docB);
  if (a && typeOf(was) && typeOf(is) && typeOf(was) !== typeOf(is)) {
    out.push(`${at}: changed from ${typeOf(was)} to ${typeOf(is)}.`);
    return;
  }
  if (was.enum && is.enum) {
    for (const value of was.enum)
      if (!is.enum.includes(value)) out.push(`${at}: no longer accepts ${JSON.stringify(value)}.`);
  }
  if (is.type === "array") return compareRequest(was.items, is.items, docA, docB, `${at}[]`, out, depth + 1);
  const oldRequired = new Set(a ? (was.required ?? []) : []);
  for (const key of is.required ?? []) {
    if (!oldRequired.has(key)) out.push(`${at}: the field "${key}" is now required.`);
  }
  for (const [key, prop] of Object.entries(was.properties ?? {})) {
    const still = is.properties?.[key];
    if (!still) out.push(`${at}: the field "${key}" is no longer accepted.`);
    else compareRequest(prop, still, docA, docB, `${at}.${key}`, out, depth + 1);
  }
}

/** Breaking changes as a readable report, or null when there are none. */
export function report(before: OpenApi, after: OpenApi): string | null {
  const changes = breakingChanges(before, after);
  if (!changes.length) return null;
  return [
    `The Developer API document has ${changes.length} breaking change${changes.length === 1 ? "" : "s"} against the published one:`,
    "",
    ...changes.map((c) => `  - ${c.replace(PATH_PREFIX, "")}`),
    "",
    "Breaking changes need a new API version (see /docs/versioning). If this is on purpose, ship it as a",
    "new version; if not, put the field or endpoint back in backend-api.",
  ].join("\n");
}
