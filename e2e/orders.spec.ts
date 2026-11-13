import { expect, test, type Page } from "@playwright/test";

import { ADA, MOCK_API, signIn } from "./helpers";

test.beforeEach(async ({ request }) => {
  await request.post(`${MOCK_API}/__test/reset`);
});

/** Fills the pickup and the first drop-off with sample Lagos places, then quotes. */
async function priceSample(page: Page) {
  await page.getByRole("region", { name: "Pickup" }).getByRole("button", { name: "Use a sample" }).click();
  await page.getByRole("region", { name: "Drop-off 1" }).getByRole("button", { name: "Use a sample" }).click();
  await page.getByRole("button", { name: "Get price" }).click();
  await expect(page.getByRole("region", { name: "Price" })).toBeVisible();
}

test("creates a test order, reviews the price, and advances it to delivered", async ({ page }) => {
  await signIn(page);
  await page.goto("/orders");
  await expect(page.getByText("No test orders yet")).toBeVisible();
  await page.getByRole("link", { name: "Create test order" }).first().click();

  await expect(page).toHaveURL("/orders/new");
  await priceSample(page);
  const price = page.getByRole("region", { name: "Price" });
  await expect(price.getByText(/^₦[\d,]+\.00$/).first()).toBeVisible();
  await expect(price.getByText(/Holds \d+:\d\d/)).toBeVisible();
  await price.getByLabel(/Your reference/).fill("shop-1");
  await price.getByRole("button", { name: /Create order/ }).click();

  await expect(page).toHaveURL(/\/orders\/ord_/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("shop-1");
  await expect(page.getByText("Finding a rider").first()).toBeVisible();

  await page.getByRole("button", { name: "Advance", exact: true }).click();
  await expect(page.getByText("Rider assigned").first()).toBeVisible();
  await expect(page.getByRole("region", { name: "Rider" })).toContainText("Tunde A.");

  await page.getByRole("button", { name: "More ways to advance" }).click();
  await page.getByRole("menuitem", { name: "Deliver it now" }).click();
  await expect(page.getByText("Delivered").first()).toBeVisible();
  await expect(page.getByRole("button", { name: "Advance", exact: true })).toHaveCount(0);
  const timeline = page.getByRole("region", { name: "Timeline" });
  await expect(timeline.locator('[data-state="current"]')).toHaveCount(0);
  await expect(timeline.locator('[data-state="done"]')).toHaveCount(4);

  await page.getByRole("link", { name: "Orders", exact: true }).first().click();
  await expect(page.locator('[data-order="shop-1"]')).toContainText("Delivered");
  await page.getByRole("link", { name: "Home", exact: true }).first().click();
  await expect(page.locator('[data-step="test_order"]')).toHaveAttribute("data-state", "done");
});

test("checks the stops before asking for a price", async ({ page }) => {
  await signIn(page);
  await page.goto("/orders/new");

  await page.getByRole("button", { name: "Get price" }).click();
  const pickup = page.getByRole("region", { name: "Pickup" });
  await expect(pickup.getByText("Enter the address.")).toBeVisible();
  await expect(pickup.getByText("Who should the rider ask for?")).toBeVisible();
  await expect(page.getByLabel("Address").first()).toBeFocused();

  // A third stop makes it a batch; any drop-off after the first can be removed.
  await page.getByRole("button", { name: "Add another drop-off" }).click();
  await expect(page.getByRole("region", { name: "Drop-off 2" })).toBeVisible();
  await page.getByRole("button", { name: "Remove drop-off 2" }).click();
  await expect(page.getByRole("region", { name: "Drop-off 2" })).toHaveCount(0);
});

test("cancels an order, and filters the list", async ({ page }) => {
  await signIn(page);
  await page.goto("/orders/new");
  await priceSample(page);
  await page
    .getByRole("region", { name: "Price" })
    .getByLabel(/Your reference/)
    .fill("to-cancel");
  await page.getByRole("button", { name: /Create order/ }).click();
  await expect(page).toHaveURL(/\/orders\/ord_/);

  await page.getByRole("button", { name: "Order actions" }).click();
  await page.getByRole("menuitem", { name: "Cancel order" }).click();
  const confirm = page.getByRole("dialog", { name: "Cancel this order?" });
  await expect(confirm.getByText("everything held for it goes back to your wallet")).toBeVisible();
  await confirm.getByRole("button", { name: "Cancel order" }).click();
  await expect(page.getByText("Order cancelled")).toBeVisible();
  await expect(page.getByRole("region", { name: "Price" })).toContainText("Refunded");

  await page.goto("/orders?status=delivered");
  await expect(page.getByText("No orders match")).toBeVisible();
  await page.goto("/orders?status=cancelled");
  await expect(page.locator('[data-order="to-cancel"]')).toBeVisible();
});

test("a Viewer sees orders but can't create one", async ({ page, request }) => {
  await request.post(`${MOCK_API}/__test/join?email=${ADA.email}&name=Globex&role=TEAM_VIEWER`);
  await signIn(page);
  await page.getByRole("button", { name: /Switch team/ }).click();
  await page.getByRole("menuitem", { name: "Globex" }).click();
  await page.goto("/orders");

  await expect(page.getByText("No test orders yet")).toBeVisible();
  await expect(page.getByRole("link", { name: /Create (test|live) order/ })).toHaveCount(0);
});
