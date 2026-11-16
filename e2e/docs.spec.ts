import { expect, test } from "@playwright/test";

import { signIn } from "./helpers";

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
  await page.goto("/docs/quickstart");
  const firstBlock = page.getByRole("tablist", { name: "Language" }).first();
  await firstBlock.getByRole("tab", { name: "Python" }).click();

  const tabs = page.getByRole("tab", { name: "Python" });
  const count = await tabs.count();
  expect(count).toBeGreaterThan(2);
  for (let i = 0; i < count; i++) await expect(tabs.nth(i)).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel").first()).toContainText("requests.get");

  await page.goto("/docs/money");
  await expect(page.getByRole("tab", { name: "Python" })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("button", { name: "Copy Python example" })).toBeVisible();
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
