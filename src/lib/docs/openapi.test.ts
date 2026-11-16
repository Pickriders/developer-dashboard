import { breakingChanges, report } from "./openapi-diff";
import {
  endpoints,
  exampleFor,
  fields,
  type OpenApi,
  referenceGroups,
  resolve,
  responseExample,
  SPEC,
  successResponse,
} from "./openapi";

const clone = (): OpenApi => JSON.parse(JSON.stringify(SPEC));
const find = (method: string, path: string) => endpoints().find((e) => e.method === method && e.path === path)!;

describe("the API document", () => {
  it("lists every operation once, with the prefix taken off", () => {
    const all = endpoints();
    expect(all.length).toBeGreaterThanOrEqual(30);
    expect(new Set(all.map((e) => `${e.method} ${e.path}`)).size).toBe(all.length);
    expect(find("POST", "/orders").op.summary).toBe("Create an order");
    expect(new Set(all.map((e) => e.anchor)).size).toBe(all.length);
  });

  it("groups endpoints by tag, in the document's order", () => {
    const groups = referenceGroups();
    expect(groups[0].name).toBe("Ping");
    expect(groups.find((g) => g.slug === "orders")?.endpoints.length).toBeGreaterThan(5);
    expect(groups.flatMap((g) => g.endpoints)).toHaveLength(endpoints().length);
  });

  it("flattens a request body into rows, nested fields under their parents", () => {
    const rows = fields(find("POST", "/quotes").op.requestBody?.content?.["application/json"]?.schema);
    expect(rows.find((r) => r.name === "type")).toEqual(
      expect.objectContaining({ required: true, enum: ["single", "batch", "bulk"] }),
    );
    expect(rows.find((r) => r.name === "stops[].contact.phone")).toEqual(expect.objectContaining({ depth: 2 }));
  });

  it("wraps list responses as the API sends them", () => {
    const list = find("GET", "/orders");
    expect(successResponse(list.op).isList).toBe(true);
    expect(responseExample(list.op, list.path)).toEqual(expect.objectContaining({ object: "list", has_more: false }));
    const order = responseExample(find("POST", "/orders").op, "/orders") as Record<string, unknown>;
    expect(order.object).toBe("order");
    expect(String(order.id)).toMatch(/^ord_/);
  });

  it("builds examples from the schema's own examples", () => {
    expect(exampleFor({ type: "string", example: "x" })).toBe("x");
    expect(exampleFor({ type: "array", items: { type: "integer" } })).toEqual([0]);
    expect(resolve({ $ref: "#/components/schemas/PublicOrderDto" }).properties?.status).toBeDefined();
  });
});

describe("breaking changes", () => {
  it("finds none when nothing changed", () => {
    expect(breakingChanges(SPEC, clone())).toEqual([]);
    expect(report(SPEC, clone())).toBeNull();
  });

  it("allows additions: a new endpoint, a new optional field, a new response field", () => {
    const next = clone();
    next.paths["/developer/api/v1/brand-new"] = { get: { summary: "New", responses: { "200": {} } } };
    next.components!.schemas!.PublicOrderDto.properties!.new_field = { type: "string" };
    next.components!.schemas!.CreateQuoteRequestDto.properties!.extra = { type: "string" };
    expect(breakingChanges(SPEC, next)).toEqual([]);
  });

  it("fails on a removed response field, with a readable report", () => {
    const next = clone();
    delete next.components!.schemas!.PublicOrderDto.properties!.status;
    const changes = breakingChanges(SPEC, next);
    expect(changes).toContain('POST /orders response: the field "status" was removed.');
    const text = report(SPEC, next)!;
    expect(text).toMatch(/breaking changes? against the published one/);
    expect(text).toContain('GET /orders/{id} response: the field "status" was removed.');
  });

  it("fails on a removed endpoint, a retyped field, a new required field and a dropped enum value", () => {
    const next = clone();
    delete next.paths["/developer/api/v1/ping"];
    next.components!.schemas!.PublicOrderDto.properties!.number = { type: "integer" };
    next.components!.schemas!.CreateQuoteRequestDto.required!.push("scheduled_for");
    next.components!.schemas!.CreateQuoteRequestDto.properties!.type.enum = ["single", "batch"];
    const changes = breakingChanges(SPEC, next);
    expect(changes).toEqual(
      expect.arrayContaining([
        "GET /ping was removed.",
        "POST /orders response.number: changed from string to integer.",
        'POST /quotes request: the field "scheduled_for" is now required.',
        'POST /quotes request.type: no longer accepts "bulk".',
      ]),
    );
  });
});
