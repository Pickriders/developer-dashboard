import { check, readJson } from "./walkthrough";

describe("readJson", () => {
  it("finds the JSON in curl -i output, with headers before it", () => {
    expect(readJson('HTTP/2 200\ncontent-type: application/json\n\n{"object":"ping","ok":true}')).toEqual({
      object: "ping",
      ok: true,
    });
  });

  it("gives up on anything that isn't one JSON object", () => {
    expect(readJson("hello")).toBeNull();
    expect(readJson("{ not json }")).toBeNull();
    expect(readJson("[1,2]")).toBeNull();
  });
});

describe("check", () => {
  const quote = {
    object: "quote",
    id: "quo_abc",
    recommended_price: 350000,
    expires_at: "2026-11-16T12:15:00.000Z",
    livemode: false,
  };

  it("waits for something to be pasted", () => {
    expect(check("ping", "   ")).toEqual({ state: "empty" });
  });

  it("knows a working key", () => {
    expect(check("ping", '{"object":"ping","ok":true}')).toEqual(expect.objectContaining({ state: "ok" }));
  });

  it("reads the price and carries the quote id forward", () => {
    const result = check("quote", JSON.stringify(quote));
    expect(result).toEqual(
      expect.objectContaining({ state: "ok", title: "You have a price: ₦3,500.00.", carry: { quoteId: "quo_abc" } }),
    );
  });

  it("carries the order id forward, then knows when it's delivered", () => {
    const order = { object: "order", id: "ord_1", status: "searching", livemode: false };
    expect(check("order", JSON.stringify(order))).toEqual(
      expect.objectContaining({ state: "ok", carry: { orderId: "ord_1" } }),
    );
    expect(check("delivered", JSON.stringify(order))).toEqual(
      expect.objectContaining({ state: "problem", title: "It's searching, not delivered yet." }),
    );
    expect(check("delivered", JSON.stringify({ ...order, status: "delivered" }))).toEqual(
      expect.objectContaining({ state: "ok", title: "Delivered!" }),
    );
  });

  it("explains an API error from the docs' list of codes", () => {
    const pasted = '{"error":{"type":"authentication_error","code":"api_key_invalid","message":"Invalid API key."}}';
    expect(check("ping", pasted)).toEqual({
      state: "problem",
      code: "api_key_invalid",
      title: "The API said no: The key doesn't exist.",
      detail: expect.stringContaining("Copy the key again"),
    });
  });

  it("still helps with a code it doesn't know", () => {
    expect(check("quote", '{"error":{"code":"brand_new","message":"Something new."}}')).toEqual(
      expect.objectContaining({ state: "problem", detail: "Something new." }),
    );
  });

  it("says when the answer belongs to another step, or to live mode, or isn't the API", () => {
    expect(check("quote", '{"object":"ping","ok":true}')).toEqual(
      expect.objectContaining({ state: "problem", title: "That doesn't look like the answer to this step." }),
    );
    expect(check("quote", JSON.stringify({ ...quote, livemode: true }))).toEqual(
      expect.objectContaining({ state: "problem", title: "That came from a live key." }),
    );
    expect(check("ping", "<!DOCTYPE html><html>")).toEqual(
      expect.objectContaining({ state: "problem", title: "That's a web page, not the API." }),
    );
  });
});
