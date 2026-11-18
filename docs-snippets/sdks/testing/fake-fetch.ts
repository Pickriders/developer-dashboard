// @file test/pickriders.fake.ts
import Pickriders from "pickriders";

/** A client that never leaves your machine: your tests decide what "the API" answers. */
export const offline = new Pickriders("sk_test_unit_tests", {
  maxRetries: 0,
  fetch: async (input, init) => {
    const url = new URL(String(input));
    if (init?.method === "POST" && url.pathname.endsWith("/orders")) {
      return Response.json({ object: "order", id: "ord_test", status: "searching" });
    }
    return Response.json(
      {
        error: {
          type: "not_found_error",
          code: "resource_missing",
          message: url.pathname,
        },
      },
      { status: 404 },
    );
  },
});
