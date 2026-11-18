// @file app/api/webhooks/pickriders/route.test.ts
import { describe, expect, it } from "vitest";

import { pickriders } from "@/lib/pickriders";

import delivered from "./fixtures/order.delivered.json"; // a real event, saved from GET /events
import { POST } from "./route";

const post = async (body: string, signature: string) =>
  POST(
    new Request("http://localhost/api/webhooks/pickriders", {
      method: "POST",
      body,
      headers: { "Pickriders-Signature": signature },
    }),
  );

describe("the Pickriders webhook route", () => {
  it("accepts a signed event", async () => {
    const body = JSON.stringify(delivered);
    // Signs with PICKRIDERS_WEBHOOK_SECRET, as Pickriders would.
    const response = await post(
      body,
      await pickriders.webhooks.generateTestHeader(body),
    );
    expect(response.status).toBe(200);
  });

  it("refuses one that isn't", async () => {
    const response = await post(JSON.stringify(delivered), "t=1,v1=forged");
    expect(response.status).toBe(400);
  });
});
