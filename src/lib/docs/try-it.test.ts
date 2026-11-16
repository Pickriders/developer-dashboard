import { buildUrl, keyProblem, missingParams, parseBody, pathParams } from "./try-it";

describe("try it", () => {
  it("only takes test keys", () => {
    expect(keyProblem("")).toMatch(/Paste your test key/);
    expect(keyProblem("sk_live_abcdefghij")).toMatch(/live key/);
    expect(keyProblem("pk_test_abc")).toMatch(/starts with sk_test_/);
    expect(keyProblem("  sk_test_abcdefghij  ")).toBeNull();
  });

  it("fills path values, encoded, and leaves out empty query values", () => {
    expect(pathParams("/orders/{id}/stops/{stop_id}")).toEqual(["id", "stop_id"]);
    expect(
      buildUrl(
        "/orders/{id}/stops/{stop_id}",
        { id: "ord_1", stop_id: "a b" },
        { limit: "5", status: " " },
        "https://x",
      ),
    ).toBe("https://x/orders/ord_1/stops/a%20b?limit=5");
    expect(missingParams("/orders/{id}", { id: "  " })).toEqual(["id"]);
  });

  it("reads a JSON body, or says why not", () => {
    expect(parseBody("")).toEqual({ ok: true, body: undefined });
    expect(parseBody('{"a":1}')).toEqual({ ok: true, body: { a: 1 } });
    expect(parseBody("{a:1}")).toEqual(expect.objectContaining({ ok: false }));
  });
});
