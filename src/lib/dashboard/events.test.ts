import { ALL_EVENTS, describeEvents, prettyJson } from "./events";

describe("webhook events", () => {
  it("lists every event the API sends, once", () => {
    expect(ALL_EVENTS).toHaveLength(15);
    expect(new Set(ALL_EVENTS).size).toBe(ALL_EVENTS.length);
  });

  it("describes an endpoint's events in a few words", () => {
    expect(describeEvents(["*"])).toBe("All events");
    expect(describeEvents(["order.delivered"])).toBe("order.delivered");
    expect(describeEvents(["order.delivered", "order.failed"])).toBe("2 events");
  });

  it("lays JSON out to read, and leaves anything else alone", () => {
    expect(prettyJson('{"a":1}')).toBe('{\n  "a": 1\n}');
    expect(prettyJson("Internal Server Error")).toBe("Internal Server Error");
    expect(prettyJson(null)).toBe("");
  });
});
