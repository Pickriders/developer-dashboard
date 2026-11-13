import { expect, test, type Page } from "@playwright/test";

import { ADA, MOCK_API, signIn } from "./helpers";

const palette = (page: Page) => page.getByRole("dialog", { name: "Search or jump to" });
const pages = (page: Page) => page.getByRole("navigation", { name: "Pages" });

test.beforeEach(async ({ request }) => {
  await request.post(`${MOCK_API}/__test/reset`);
});

test("⌘K jumps to pages and runs actions from the keyboard", async ({ page }) => {
  await signIn(page);

  await page.keyboard.press("ControlOrMeta+k");
  await expect(palette(page)).toBeVisible();
  await page.keyboard.type("web");
  await expect(palette(page).getByRole("option")).toHaveCount(2); // the page and "Add a webhook endpoint"
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL("/webhooks");
  await expect(palette(page)).toBeHidden();
  await expect(pages(page).getByRole("link", { name: "Webhooks" })).toHaveAttribute("aria-current", "page");

  await page.getByRole("button", { name: "Search or jump to" }).first().click();
  await page.keyboard.type("test key");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: "Create a test key" })).toBeVisible();

  await page.keyboard.press("Escape");
  await page.keyboard.press("ControlOrMeta+k");
  await page.keyboard.type("nothing like this");
  await expect(palette(page).getByText("Nothing matches")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(palette(page)).toBeHidden();
});

test("switches team from the palette", async ({ page, request }) => {
  await request.post(`${MOCK_API}/__test/join?email=${ADA.email}&name=Globex&role=TEAM_ADMIN`);
  await signIn(page);

  await page.keyboard.press("ControlOrMeta+k");
  await page.keyboard.type("globex");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: /Team: Globex/ })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toContainText("Globex");
});

test("G then a letter goes to a page; [ folds the sidebar and it stays folded", async ({ page }) => {
  await signIn(page);

  await page.keyboard.press("g");
  await page.keyboard.press("k");
  await expect(page).toHaveURL("/keys");
  await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toContainText("API keys");

  await page.keyboard.press("[");
  await expect(page.getByRole("button", { name: "Expand sidebar" })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("button", { name: "Expand sidebar" })).toBeVisible();
  // Folded, the pages keep their names for screen readers and still work.
  await pages(page).getByRole("link", { name: "Webhooks" }).click();
  await expect(page).toHaveURL("/webhooks");

  await page.getByRole("button", { name: "Expand sidebar" }).click();
  await expect(page.getByRole("button", { name: "Collapse sidebar" })).toBeVisible();

  // Typing in a field never triggers a shortcut.
  await page.getByRole("button", { name: "Add endpoint" }).click();
  await page.getByLabel("Endpoint URL").press("g");
  await page.getByLabel("Endpoint URL").press("h");
  await expect(page).toHaveURL("/webhooks");
});

test("shows setup progress on other pages, and leads back home", async ({ page }) => {
  await signIn(page);
  await expect(page.getByRole("link", { name: /Get set up/ })).toHaveCount(0); // home is the guide itself

  await page.goto("/keys");
  const card = page.getByRole("link", { name: /Get set up/ });
  await expect(card).toContainText("2 of 7");
  await expect(card).toContainText("Next: Create a test key");
  await card.click();
  await expect(page).toHaveURL("/");
});

test.describe("on a phone", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("moves between pages from the tab bar, with the rest under More", async ({ page }) => {
    await signIn(page);
    const tabs = page.getByRole("navigation", { name: "Tabs" });

    await tabs.getByRole("link", { name: "Usage" }).click();
    await expect(page).toHaveURL("/usage");
    await expect(tabs.getByRole("link", { name: "Usage" })).toHaveAttribute("aria-current", "page");
    await expect(tabs.getByRole("link", { name: "API keys" })).toHaveCount(0);

    await tabs.getByRole("button", { name: "More" }).click();
    const menu = page.getByRole("complementary", { name: "Menu" });
    await expect(menu.getByRole("button", { name: /Account: Ada Obi/ })).toBeVisible();
    await menu.getByRole("link", { name: "API keys" }).click();
    await expect(page).toHaveURL("/keys");
    await expect(menu).toBeHidden();

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
