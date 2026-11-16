import { expect, test } from "@playwright/test";

import { MOCK_API, signIn } from "./helpers";
// A static import, which Playwright compiles on every Node version (a dynamic one fails on Node 20, as CI runs).
import { runGuides } from "../src/lib/docs/sandbox";

/** Step 12.1: the docs are public, simple to follow, findable and searchable. */
test("anyone can read the docs, signed out, and the next step is obvious", async ({ page }) => {
  await page.goto("/docs");
  await expect(page).toHaveURL("/docs");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Send a delivery\s*from your app\./);
  await expect(page.getByRole("list", { name: "How it works" }).getByRole("listitem")).toHaveCount(3);

  await page.getByRole("link", { name: "Start the tutorial" }).click();
  await expect(page).toHaveURL("/docs/quickstart");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Your first delivery");
  await expect(page.getByRole("link", { name: "Your first delivery" })).toHaveAttribute("aria-current", "page");
  await expect(
    page.getByRole("navigation", { name: "On this page" }).getByRole("link", { name: "Ask for a price" }),
  ).toBeVisible();

  // Every page ends by pointing to the next one.
  await page.getByRole("navigation", { name: "More docs" }).getByRole("link", { name: /Next/ }).click();
  await expect(page).toHaveURL("/docs/test-and-live");
});

test("a language picked once is used in every example, and remembered", async ({ page }) => {
  await page.goto("/docs/webhooks");
  await page.getByRole("tablist", { name: "Language" }).first().getByRole("tab", { name: "Python" }).click();
  await expect(page.getByRole("tabpanel").first()).toContainText("hmac.new");
  await expect(page.getByRole("button", { name: "Copy Python example" })).toBeVisible();

  await page.goto("/docs/money");
  await expect(page.getByRole("tab", { name: "Python" })).toHaveAttribute("aria-selected", "true");

  // Every example in the tutorial follows, folded steps included.
  await page.goto("/docs/quickstart");
  const tabs = page.locator('[role="tab"]', { hasText: "Python" });
  expect(await tabs.count()).toBe(4);
  for (const tab of await tabs.all()) await expect(tab).toHaveAttribute("aria-selected", "true");
});

test("search finds pages by word or error code, from the keyboard", async ({ page }) => {
  await page.goto("/docs");
  await page.keyboard.press("/");
  const dialog = page.getByRole("dialog", { name: "Search the docs" });
  await expect(dialog).toHaveCount(1);
  await expect(dialog.getByRole("combobox")).toBeFocused();
  await expect(dialog.getByText("Good places to start")).toBeVisible();

  await page.keyboard.type("kobo");
  await expect(dialog.getByRole("option").first()).toContainText("Money");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL("/docs/money");

  await page.keyboard.press("Control+k");
  await expect(page.getByRole("dialog", { name: "Search the docs" }).getByRole("combobox")).toBeFocused();
  await page.keyboard.type("quote_expired");
  await expect(page.getByRole("dialog", { name: "Search the docs" }).getByRole("option").first()).toContainText(
    "Errors",
  );
  await page.keyboard.press("Escape");

  await page.keyboard.press("/");
  await expect(page.getByRole("dialog", { name: "Search the docs" }).getByRole("combobox")).toBeFocused();
  await page.keyboard.type("teleport");
  await expect(page.getByText("Nothing found")).toBeVisible();
});

test("an API error's doc_url lands on its code", async ({ page }) => {
  await page.goto("/docs/errors#quote_expired");
  const row = page.locator("#quote_expired");
  await expect(row).toBeInViewport();
  await expect(row).toContainText("The quote is more than 15 minutes old.");
  await expect(row).toContainText("400");
});

test("search engines get a title, description, canonical link, card and structured data", async ({ page, request }) => {
  await page.goto("/docs/webhooks");
  await expect(page).toHaveTitle("Webhooks · Pickriders API docs");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /tell your server the moment/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/docs\/webhooks$/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /opengraph-image/);
  const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent()) ?? "[]");
  expect(ld.map((d: { "@type": string }) => d["@type"])).toEqual(["TechArticle", "BreadcrumbList"]);

  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/docs/quickstart</loc>");
  expect(sitemap).toContain("/docs</loc>");
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toMatch(/Allow: \/docs/);
  expect(robots).toMatch(/Disallow: \/\n/);
  expect((await request.get("/docs/opengraph-image")).headers()["content-type"]).toBe("image/png");
});

test("signed in, the docs open too, with the dashboard a click away", async ({ page }) => {
  await signIn(page);
  await page.goto("/docs/errors");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Errors");
  await page.getByRole("link", { name: "Dashboard", exact: true }).first().click();
  await expect(page).toHaveURL("/");
});

test.describe("on a phone", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("the contents open from the menu, and nothing scrolls sideways", async ({ page }) => {
    await page.goto("/docs");
    await page.getByRole("button", { name: "Open the docs menu" }).click();
    const menu = page.getByRole("dialog", { name: "Docs menu" });
    await menu.getByRole("link", { name: "Webhooks" }).click();
    await expect(page).toHaveURL("/docs/webhooks");
    await expect(menu).toHaveCount(0);
    for (const path of ["/docs", "/docs/quickstart", "/docs/webhooks", "/docs/errors", "/docs/api"]) {
      await page.goto(path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(
        0,
      );
    }
  });
});

test.describe("the first-delivery walkthrough", () => {
  const step = (page: import("@playwright/test").Page, id: string) => page.locator(`[data-step="${id}"]`);
  const tickAll = async (page: import("@playwright/test").Page, id: string) => {
    for (const box of await step(page, id).getByRole("checkbox").all()) await box.check();
  };

  test("opens one step at a time, and the next only once this one is done", async ({ page }) => {
    await page.goto("/docs/quickstart");
    await expect(page.getByTestId("walk-status")).toContainText("Step 1 of 5");
    await expect(step(page, "get-your-test-key")).toHaveAttribute("data-state", "current");
    await expect(step(page, "check-it-works")).toHaveAttribute("data-state", "locked");
    await expect(step(page, "check-it-works")).toContainText("Finish “Get your test key” to open this.");

    const done = step(page, "get-your-test-key").getByRole("button", { name: "Done, next step" });
    await expect(done).toBeDisabled();
    await step(page, "get-your-test-key").getByRole("checkbox").first().check();
    await expect(done).toBeDisabled();
    await expect(step(page, "get-your-test-key")).toContainText("Your to-do 1/4");
    await tickAll(page, "get-your-test-key");
    await done.click();

    await expect(step(page, "get-your-test-key")).toHaveAttribute("data-state", "done");
    await expect(step(page, "get-your-test-key")).toContainText("Your sk_test_ key is saved as PICKRIDERS_KEY.");
    await expect(step(page, "check-it-works")).toHaveAttribute("data-state", "current");
    await expect(page.getByTestId("walk-status")).toContainText("Step 2 of 5");
    await expect(step(page, "check-it-works").getByRole("heading", { name: /Check your key works/ })).toBeFocused();

    // A finished step can be read again.
    await step(page, "get-your-test-key").getByRole("button", { name: "Open again" }).click();
    await expect(step(page, "get-your-test-key").getByText("Your key is a password")).toBeVisible();
  });

  test("checks what you paste: explains an error, ticks the box on success", async ({ page }) => {
    await page.goto("/docs/quickstart");
    await tickAll(page, "get-your-test-key");
    await step(page, "get-your-test-key").getByRole("button", { name: "Done, next step" }).click();

    const ping = step(page, "check-it-works");
    await ping
      .getByRole("textbox", { name: /Paste what you got/ })
      .fill('{"error":{"type":"authentication_error","code":"api_key_invalid","message":"Invalid API key."}}');
    await ping.getByRole("button", { name: "Check it" }).click();
    await expect(ping.getByText("The API said no: The key doesn't exist.")).toBeVisible();
    await expect(ping.getByRole("link", { name: "More about api_key_invalid" })).toHaveAttribute(
      "href",
      "/docs/errors#api_key_invalid",
    );

    await ping.getByRole("textbox", { name: /Paste what you got/ }).fill('HTTP/2 200\n\n{"object":"ping","ok":true}');
    await ping.getByRole("button", { name: "Check it" }).click();
    await expect(ping.getByText("Your key works.", { exact: true })).toBeVisible();
    await expect(ping.getByRole("checkbox", { name: /It printed/ })).toBeChecked();
  });

  test("carries your own quote and order ids into the next examples", async ({ page }) => {
    await page.goto("/docs/quickstart");
    for (const id of ["get-your-test-key", "check-it-works"]) {
      await tickAll(page, id);
      await step(page, id).getByRole("button", { name: "Done, next step" }).click();
    }
    const quote = step(page, "ask-for-a-price");
    await quote
      .getByRole("textbox", { name: /Paste what you got/ })
      .fill(
        '{"object":"quote","id":"quo_mine1","recommended_price":350000,"expires_at":"2026-11-16T12:15:00Z","livemode":false}',
      );
    await quote.getByRole("button", { name: "Check it" }).click();
    await expect(quote.getByText("You have a price: ₦3,500.00.")).toBeVisible();
    await tickAll(page, "ask-for-a-price");
    await quote.getByRole("button", { name: "Done, next step" }).click();

    const book = step(page, "book-the-delivery");
    await book.getByRole("tab", { name: "curl" }).click();
    await expect(book.getByRole("tabpanel")).toContainText('"quote_id": "quo_mine1"');
    await expect(book.getByText("Your ids filled in")).toBeVisible();

    // A live answer is turned away: the tutorial is for test mode.
    await book
      .getByRole("textbox", { name: /Paste what you got/ })
      .fill('{"object":"order","id":"ord_mine2","status":"searching","livemode":true}');
    await book.getByRole("button", { name: "Check it" }).click();
    await expect(book.getByText("That came from a live key.")).toBeVisible();
    await book
      .getByRole("textbox", { name: /Paste what you got/ })
      .fill('{"object":"order","id":"ord_mine2","status":"searching","livemode":false}');
    await book.getByRole("button", { name: "Check it" }).click();
    await tickAll(page, "book-the-delivery");
    await book.getByRole("button", { name: "Done, next step" }).click();

    const arrive = step(page, "watch-it-arrive");
    await expect(arrive.getByRole("tabpanel")).toContainText("/test/orders/ord_mine2/advance");
    await arrive
      .getByRole("textbox", { name: /Paste what you got/ })
      .fill('{"object":"order","id":"ord_mine2","status":"delivered","livemode":false}');
    await arrive.getByRole("button", { name: "Check it" }).click();
    await tickAll(page, "watch-it-arrive");
    await arrive.getByRole("button", { name: "Finish" }).click();
    await expect(page.getByRole("heading", { name: "You sent your first delivery." })).toBeVisible();
    await expect(page.getByTestId("walk-status")).toHaveText("All done. Nice work!");
  });

  test("remembers where you are, and starts over when asked", async ({ page }) => {
    await page.goto("/docs/quickstart");
    await tickAll(page, "get-your-test-key");
    await step(page, "get-your-test-key").getByRole("button", { name: "Done, next step" }).click();
    await step(page, "check-it-works").getByRole("checkbox").first().check();

    await page.reload();
    await expect(page.getByTestId("walk-status")).toContainText("Step 2 of 5");
    await expect(step(page, "check-it-works").getByRole("checkbox").first()).toBeChecked();

    await page.getByRole("button", { name: "Start over" }).click();
    await expect(page.getByTestId("walk-status")).toContainText("Step 1 of 5");
    await expect(step(page, "get-your-test-key").getByRole("checkbox").first()).not.toBeChecked();
  });
});

test.describe("for search engines, without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("every step of the tutorial is in the page, open, with its code and a HowTo", async ({ page }) => {
    await page.goto("/docs/quickstart");
    for (const title of [
      "Get your test key",
      "Check your key works",
      "Ask for a price",
      "Book the delivery",
      "Watch it arrive",
    ]) {
      await expect(page.getByRole("heading", { level: 2, name: new RegExp(title) })).toBeVisible();
    }
    await expect(page.getByText("/test/orders/ord_6560f0c2a1b2c3d4e5f60718/advance")).toBeVisible();
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    const howTo = ld
      .map((t) => JSON.parse(t))
      .flat()
      .find((d) => d["@type"] === "HowTo");
    expect(howTo.step.map((s: { name: string }) => s.name)).toEqual([
      "Get your test key",
      "Check your key works",
      "Ask for a price",
      "Book the delivery",
      "Watch it arrive",
    ]);
  });
});

/** A real test key for Ada's team, from the mock's dashboard API (as creating one in the dashboard would). */
async function testKey(request: import("@playwright/test").APIRequestContext) {
  await request.post(`${MOCK_API}/__test/reset`);
  const D = `${MOCK_API}/developer/api/v1/dashboard`;
  const { accessToken } = await (
    await request.post(`${D}/auth/login`, { data: { email: "ada@acme.test", password: "correct-horse-1" } })
  ).json();
  const auth = { Authorization: `Bearer ${accessToken}` };
  const { teams } = await (await request.get(`${D}/auth/me`, { headers: auth })).json();
  const key = await (
    await request.post(`${D}/api-keys`, {
      headers: { ...auth, "x-team-id": teams[0].id },
      data: { label: "Docs", livemode: false },
    })
  ).json();
  return key.secret as string;
}

test.describe("Try it", () => {
  test("sends a real request from the reference and shows the answer", async ({ page, request }) => {
    const key = await testKey(request);
    await page.goto("/docs/api/quotes");
    await page.getByLabel("Your test key").first().fill("sk_live_abcdefghijk");
    await expect(page.getByText(/That's a live key/).first()).toBeVisible();
    await page.getByLabel("Your test key").first().fill(key);

    const quotes = page.locator('[data-endpoint="POST /quotes"]');
    await quotes.getByText("Try it with your test key").click();
    await quotes.getByRole("button", { name: "Send request" }).click();
    await expect(quotes.getByTestId("try-it").getByText(/^20[01]$/)).toBeVisible({ timeout: 15_000 });
    await expect(quotes.getByTestId("try-it")).toContainText('"object": "quote"');

    // The key is shared across pages and panels, and path values are asked for.
    await page.getByRole("link", { name: "Orders", exact: true }).first().click();
    const order = page.locator('[data-endpoint="GET /orders/{id}"]');
    await order.getByText("Try it with your test key").click();
    await expect(order.getByLabel("Your test key")).toHaveValue(key);
    await order.getByRole("button", { name: "Send request" }).click();
    await expect(order.getByText("Fill in id first.")).toBeVisible();
    await order.getByRole("textbox", { name: "id" }).fill("ord_nothere");
    await order.getByRole("button", { name: "Send request" }).click();
    await expect(order.getByTestId("try-it").getByText("404")).toBeVisible({ timeout: 15_000 });
  });

  test("the Postman collection's Create an order works as downloaded", async ({ page, request }) => {
    const key = await testKey(request);
    await page.goto("/docs/api");
    await expect(page.getByRole("link", { name: /Postman collection/ })).toHaveAttribute(
      "href",
      "/docs/pickriders.postman_collection.json",
    );
    const collection = await (await request.get("/docs/pickriders.postman_collection.json")).json();
    const create = collection.item
      .flatMap((folder: { item: unknown[] }) => folder.item)
      .find((item: { name: string }) => item.name === "Create an order");
    // As Postman would: baseUrl pointed at the API, apiKey set, the body as it is.
    const url = create.request.url.raw.replace("{{baseUrl}}", `${MOCK_API}/developer/api/v1`);
    const res = await request.post(url, {
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      data: create.request.body.raw,
    });
    expect(res.status()).toBe(201);
    expect((await res.json()).object).toBe("order");

    const spec = await (await request.get("/docs/openapi.json")).json();
    expect(spec.openapi).toMatch(/^3\./);
    expect(Object.keys(spec.paths).length).toBeGreaterThan(25);
  });

  test("runs every step of the walkthrough from the page, no terminal needed", async ({ page, request }) => {
    const key = await testKey(request);
    await page.goto("/docs/quickstart");
    const step = (id: string) => page.locator(`[data-step="${id}"]`);
    for (const box of await step("get-your-test-key").getByRole("checkbox").all()) await box.check();
    await step("get-your-test-key").getByRole("button", { name: "Done, next step" }).click();

    await step("check-it-works").getByLabel("Your test key").fill(key);
    for (const [id, says] of [
      ["check-it-works", "Your key works."],
      ["ask-for-a-price", /You have a price: ₦/],
      ["book-the-delivery", "Your order is booked."],
      ["watch-it-arrive", "Delivered!"],
    ] as const) {
      await step(id).getByRole("button", { name: "Run it here" }).click();
      await expect(step(id).getByText(says, { exact: typeof says === "string" })).toBeVisible();
      await expect(step(id).getByRole("checkbox", { name: /printed|got|status says/ })).toBeChecked();
      // Running it here counts as running the example.
      await expect(step(id).getByRole("checkbox").first()).toBeChecked();
      await step(id)
        .getByRole("button", { name: /Done, next step|Finish/ })
        .click();
    }
    await expect(page.getByRole("heading", { name: "You sent your first delivery." })).toBeVisible();
  });

  test("keeps the key in memory only: never in storage, gone after a reload", async ({ page, request }) => {
    const key = await testKey(request);
    await page.goto("/docs/api");
    await page.getByLabel("Your test key").first().fill(key);
    await page.getByRole("link", { name: "Webhooks", exact: true }).first().click();
    await page.goto("/docs/api");
    const stored = await page.evaluate(
      () => JSON.stringify({ ...localStorage }) + JSON.stringify({ ...sessionStorage }),
    );
    expect(stored).not.toContain("sk_test_");
    await expect(page.getByLabel("Your test key").first()).toHaveValue("");
  });
});

test("every page links to the changelog and the versioning policy", async ({ page }) => {
  for (const path of ["/docs", "/docs/quickstart", "/docs/errors", "/docs/api/orders", "/docs/changelog"]) {
    await page.goto(path);
    const footer = page.getByRole("navigation", { name: "Footer" });
    await expect(footer.getByRole("link", { name: "Changelog" })).toHaveAttribute("href", "/docs/changelog");
    await expect(footer.getByRole("link", { name: "Versioning" })).toHaveAttribute("href", "/docs/versioning");
  }
  await page.goto("/docs/versioning");
  await expect(page.getByText(/6 months.{1,2}notice/).first()).toBeVisible();
  await page.goto("/docs/changelog");
  await expect(page.locator("time").first()).toHaveAttribute("datetime", /^\d{4}-\d{2}-\d{2}$/);
});

test("every guide's requests run, in order, against the API", async ({ request }) => {
  const key = await testKey(request);
  expect(await runGuides(`${MOCK_API}/developer/api/v1`, key)).toEqual([]);
});

test("events: every type has its page and example, reached from webhooks", async ({ page }) => {
  await page.goto("/docs/webhooks");
  await page.getByRole("link", { name: "order.delivered", exact: true }).click();
  await expect(page).toHaveURL("/docs/events/order-delivered");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("order.delivered");
  await expect(page.locator("pre").first()).toContainText('"type": "order.delivered"');

  await page.goto("/docs/events");
  const links = page.locator("main ul").getByRole("link", { name: /^(order|wallet|account)\./ });
  await expect(links).toHaveCount(15);
});

test("guides have their own section, each with examples in four languages", async ({ page }) => {
  await page.goto("/docs/guides/bidding");
  const nav = page.getByRole("navigation", { name: "Docs" }).first();
  await expect(nav.getByText("Guides", { exact: true })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Bidding" })).toHaveAttribute("aria-current", "page");
  await expect(page.getByRole("tablist", { name: "Language" }).first().getByRole("tab")).toHaveText([
    "curl",
    "Node.js",
    "Python",
    "PHP",
  ]);
  // Event pages are searchable, but kept out of the sidebar.
  await expect(nav.getByRole("link", { name: "order.delivered" })).toHaveCount(0);
});

test("every page in the sitemap opens", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  const paths = Array.from(sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g), (m) => m[1]);
  expect(paths.length).toBeGreaterThan(40);
  const broken: string[] = [];
  for (const path of paths) {
    const res = await request.get(path, { maxRedirects: 0 });
    if (res.status() !== 200) broken.push(`${path} → ${res.status()}`);
  }
  expect(broken).toEqual([]);
});
