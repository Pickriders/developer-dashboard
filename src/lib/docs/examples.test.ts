import { EVENT_DOCS, exampleEvent, schemaFor } from "./events";
import { GUIDE_REQUESTS } from "./guides";
import { referenceGroups, resolve } from "./openapi";
import { checkRequest, requestTabs } from "./requests";
import { validate } from "./validate";

/** Steps 12.5 and 12.7: the docs' examples are what the API takes and sends, or CI fails. */
describe("the validator", () => {
  const order = { $ref: "#/components/schemas/CreateQuoteRequestDto" };

  it("passes a good body and says what's wrong with a bad one, by path", () => {
    expect(validate({ type: "single", service_area: "NG-LA", stops: [] }, order)).toEqual([]);
    expect(validate({ type: "train", stops: "no" }, order)).toEqual(
      expect.arrayContaining([
        "$.service_area: is required",
        expect.stringContaining('$.type: "train" isn\'t one of'),
        "$.stops: should be a list",
      ]),
    );
    expect(validate({ type: "single", service_area: "NG-LA", stops: [], colour: "red" }, order)).toEqual([
      "$.colour: isn't a field of this object",
    ]);
  });
});

describe("guides", () => {
  for (const [guide, requests] of Object.entries(GUIDE_REQUESTS)) {
    it(`${guide}: every request is a real endpoint, with a body the API takes`, () => {
      expect(requests.flatMap((r) => checkRequest(r))).toEqual([]);
    });
  }

  it("turns one request into curl, Node.js, Python and PHP", () => {
    const tabs = requestTabs({
      name: "order",
      method: "POST",
      path: "/orders/{{order.id}}/cancel",
      body: { reason: "x" },
    });
    expect(tabs.map((t) => t.label)).toEqual(["curl", "Node.js", "Python", "PHP"]);
    expect(tabs[0].code).toContain(
      "curl -X POST https://api.pickriders.com/developer/api/v1/orders/ord_6560f0c2a1b2c3d4e5f60718/cancel",
    );
    expect(tabs[1].code).toContain('body: JSON.stringify({\n    "reason": "x"\n  })');
    expect(tabs[2].code).toContain("requests.post(");
    expect(requestTabs({ name: "w", method: "GET", path: "/wallet" })[0].code).not.toContain("-d");
  });

  it("catches a request the API wouldn't take", () => {
    expect(checkRequest({ name: "x", method: "POST", path: "/nowhere" })).toEqual([
      "POST /nowhere: no such endpoint in the API document",
    ]);
    expect(checkRequest({ name: "x", method: "POST", path: "/quotes", body: { type: "single" } })).toEqual(
      expect.arrayContaining(["POST /quotes: $.service_area: is required"]),
    );
  });
});

describe("events", () => {
  it("documents every event type the API sends, and no others", () => {
    const create = referenceGroups()
      .flatMap((g) => g.endpoints)
      .find((e) => e.method === "POST" && e.path === "/webhook_endpoints")!;
    const body = resolve(create.op.requestBody?.content?.["application/json"]?.schema);
    const inApi = (resolve(body.properties?.enabled_events).items?.enum ?? []).filter((t) => t !== "*");
    expect(inApi.length).toBeGreaterThan(10);
    expect(EVENT_DOCS.map((e) => e.type).sort()).toEqual([...inApi].sort());
  });

  for (const event of EVENT_DOCS) {
    it(`${event.type}: the example matches the API's schemas`, () => {
      const example = exampleEvent(event);
      expect(validate(example, { $ref: "#/components/schemas/PublicEventDto" })).toEqual([]);
      expect(validate(example.data.object, schemaFor(event.kind), undefined, "$.data.object")).toEqual([]);
      expect(example.type).toBe(event.type);
    });
  }
});
