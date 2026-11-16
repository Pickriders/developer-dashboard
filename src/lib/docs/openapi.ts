import spec from "./openapi.json";

/**
 * The API reference (step 12.2) is generated from backend-api's public OpenAPI document, kept in
 * openapi.json (refresh it with `yarn docs:sync`). Every endpoint, field, type and example on the
 * reference pages comes from there, so the docs say what the API does.
 */
export type Schema = {
  $ref?: string;
  type?: string;
  format?: string;
  description?: string;
  enum?: unknown[];
  example?: unknown;
  nullable?: boolean;
  items?: Schema;
  properties?: Record<string, Schema>;
  required?: string[];
  allOf?: Schema[];
  oneOf?: Schema[];
  anyOf?: Schema[];
  additionalProperties?: boolean | Schema;
  default?: unknown;
  minimum?: number;
  maximum?: number;
  maxLength?: number;
  maxItems?: number;
};
export type Parameter = {
  name: string;
  in: string;
  required?: boolean;
  description?: string;
  schema?: Schema;
  example?: unknown;
};
export type Operation = {
  operationId?: string;
  summary?: string;
  description?: string;
  tags?: string[];
  parameters?: Parameter[];
  requestBody?: { required?: boolean; content?: Record<string, { schema?: Schema }> };
  responses?: Record<string, { description?: string; content?: Record<string, { schema?: Schema }> }>;
};
export type OpenApi = {
  openapi: string;
  info?: { title?: string; version?: string; description?: string };
  tags?: { name: string; description?: string }[];
  paths: Record<string, Record<string, Operation>>;
  components?: { schemas?: Record<string, Schema> };
};

export const SPEC = spec as unknown as OpenApi;
/** Paths in the document start with this; the docs show them without it. */
export const PATH_PREFIX = "/developer/api/v1";
const METHODS = ["get", "post", "put", "patch", "delete"] as const;

export type Endpoint = {
  method: string;
  path: string;
  tag: string;
  op: Operation;
  /** An anchor for the endpoint on its tag's page: "post-orders", "get-orders-id". */
  anchor: string;
};

export const tagSlug = (tag: string) =>
  tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
export const anchorFor = (method: string, path: string) =>
  `${method.toLowerCase()}-${path
    .replace(/[{}]/g, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/(^-|-$)/g, "")}`.toLowerCase();

/** Every operation, in the document's order, grouped later by its first tag. */
export function endpoints(doc: OpenApi = SPEC): Endpoint[] {
  const out: Endpoint[] = [];
  for (const [fullPath, ops] of Object.entries(doc.paths)) {
    const path = fullPath.startsWith(PATH_PREFIX) ? fullPath.slice(PATH_PREFIX.length) || "/" : fullPath;
    for (const method of METHODS) {
      const op = ops[method];
      if (!op) continue;
      out.push({
        method: method.toUpperCase(),
        path,
        tag: op.tags?.[0] ?? "Other",
        op,
        anchor: anchorFor(method, path),
      });
    }
  }
  return out;
}

/** The tags in the document's order, with their endpoints. */
export function referenceGroups(doc: OpenApi = SPEC) {
  const all = endpoints(doc);
  const names = [...(doc.tags ?? []).map((t) => t.name), ...all.map((e) => e.tag)].filter(
    (name, i, list) => list.indexOf(name) === i && all.some((e) => e.tag === name),
  );
  return names.map((name) => ({
    name,
    slug: tagSlug(name),
    description: doc.tags?.find((t) => t.name === name)?.description ?? "",
    endpoints: all.filter((e) => e.tag === name),
  }));
}

/** A schema with its $ref followed (and allOf merged), one level. */
export function resolve(schema: Schema | undefined, doc: OpenApi = SPEC): Schema {
  if (!schema) return {};
  if (schema.$ref) {
    const name = schema.$ref.split("/").pop()!;
    const target = doc.components?.schemas?.[name] ?? {};
    return resolve({ ...target, ...withoutRef(schema) }, doc);
  }
  if (schema.allOf?.length) {
    const parts = schema.allOf.map((s) => resolve(s, doc));
    return {
      ...parts.reduce((a, b) => ({ ...a, ...b }), {}),
      ...withoutRef({ ...schema, allOf: undefined }),
      properties: Object.assign({}, ...parts.map((p) => p.properties ?? {}), schema.properties ?? {}),
      required: Array.from(new Set(parts.flatMap((p) => p.required ?? []).concat(schema.required ?? []))),
    };
  }
  return schema;
}
const withoutRef = ({ $ref: _, ...rest }: Schema) => rest;

/** "string", "integer", "ord_… string", "list of objects": the type in words a reader scans. */
export function typeLabel(schema: Schema, doc: OpenApi = SPEC): string {
  const s = resolve(schema, doc);
  if (s.type === "array") return `array of ${typeLabel(s.items ?? {}, doc)}`;
  if (s.enum) return "enum";
  if (s.type === "string" && s.format) return `string (${s.format})`;
  return s.type ?? (s.properties ? "object" : "any");
}

export type FieldRow = {
  /** Dot path from the body's top: "stops[].contact.phone". */
  name: string;
  depth: number;
  type: string;
  required: boolean;
  nullable: boolean;
  description: string;
  enum?: string[];
};

/** A body schema as rows, nested objects (and array items) indented under their field. */
export function fields(schema: Schema | undefined, doc: OpenApi = SPEC, prefix = "", depth = 0): FieldRow[] {
  const s = resolve(schema, doc);
  const rows: FieldRow[] = [];
  const required = new Set(s.required ?? []);
  for (const [key, raw] of Object.entries(s.properties ?? {})) {
    const prop = resolve(raw, doc);
    const name = prefix ? `${prefix}.${key}` : key;
    rows.push({
      name,
      depth,
      type: typeLabel(raw, doc),
      required: required.has(key),
      nullable: Boolean(prop.nullable),
      description: prop.description ?? "",
      enum: prop.enum?.map(String),
    });
    if (depth < 3) {
      const inner = prop.type === "array" ? resolve(prop.items, doc) : prop;
      if (inner.properties) rows.push(...fields(inner, doc, prop.type === "array" ? `${name}[]` : name, depth + 1));
    }
  }
  return rows;
}

/** An example value for a schema, from its own example or one built from its fields. */
export function exampleFor(schema: Schema | undefined, doc: OpenApi = SPEC, depth = 0): unknown {
  const s = resolve(schema, doc);
  if (s.example !== undefined) return s.example;
  if (s.default !== undefined) return s.default;
  if (s.enum?.length) return s.enum[0];
  if (depth > 5) return null;
  if (s.type === "array") return [exampleFor(s.items, doc, depth + 1)];
  if (s.properties) {
    return Object.fromEntries(Object.entries(s.properties).map(([k, v]) => [k, exampleFor(v, doc, depth + 1)]));
  }
  switch (s.type) {
    case "string":
      return s.format === "date-time" ? "2026-11-16T09:30:00.000Z" : "string";
    case "integer":
    case "number":
      return s.minimum ?? 0;
    case "boolean":
      return false;
    case "object":
      return {};
    default:
      return s.nullable ? null : {};
  }
}

/** The success response: its status, and its schema (wrapped in a list object where the API does). */
export function successResponse(op: Operation, doc: OpenApi = SPEC) {
  const [status, response] = Object.entries(op.responses ?? {}).find(([code]) => code.startsWith("2")) ?? [
    "200",
    { description: "" },
  ];
  const schema = response.content?.["application/json"]?.schema;
  const resolved = resolve(schema, doc);
  const isList = resolved.type === "array" && /list object/i.test(response.description ?? "");
  return { status, description: response.description ?? "", schema, isList };
}

/** The example the reference shows for a response. */
export function responseExample(op: Operation, path: string, doc: OpenApi = SPEC) {
  const { schema, isList } = successResponse(op, doc);
  if (!schema) return null;
  const value = exampleFor(schema, doc);
  return isList
    ? {
        object: "list",
        data: value,
        has_more: false,
        url: `${PATH_PREFIX}${path.replace(/\{.*$/, "").replace(/\/$/, "")}`,
      }
    : value;
}

export const requestSchema = (op: Operation) => op.requestBody?.content?.["application/json"]?.schema;
