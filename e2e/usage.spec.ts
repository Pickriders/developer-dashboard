import { expect, test } from "@playwright/test";

import { ADA, MOCK_API, signIn } from "./helpers";

test.beforeEach(async ({ request }) => {
  await request.post(`${MOCK_API}/__test/reset`);
});

test("an empty period invites a first test order", async ({ page }) => {
  await signIn(page);
  await page.goto("/usage");
  await expect(page.getByTestId("orders-created")).toHaveText("0");
  await expect(page.getByText("No test orders in the last 30 days")).toBeVisible();
  await expect(page.getByTestId("success-rate")).toHaveText("—");
  await page.getByRole("link", { name: "Create a test order" }).click();
  await expect(page).toHaveURL("/orders/new");
});

test("counts orders and API errors, and the period lives in the URL", async ({ page, request }) => {
  await request.post(`${MOCK_API}/__test/history?email=${ADA.email}&days=90`);
  await request.post(`${MOCK_API}/__test/requests?email=${ADA.email}&n=40`);
  await signIn(page);
  await page.getByRole("link", { name: "Usage", exact: true }).first().click();
  await expect(page).toHaveURL("/usage");

  const created30 = Number((await page.getByTestId("orders-created").textContent())!.replace(/,/g, ""));
  expect(created30).toBeGreaterThan(0);
  await expect(page.getByTestId("success-rate")).toHaveText(/^\d+(\.\d)?%$/);
  await expect(page.getByTestId("error-rate")).toHaveText(/^\d+(\.\d)?%$/);
  // Screen readers get every day of the period as a table.
  await expect(page.getByRole("table", { name: "Orders per day" }).getByRole("row")).toHaveCount(31);

  await page.getByRole("radio", { name: "7 days" }).click();
  await expect(page).toHaveURL("/usage?period=7d");
  await expect(page.getByRole("table", { name: "Orders per day" }).getByRole("row")).toHaveCount(8);
  const created7 = Number((await page.getByTestId("orders-created").textContent())!.replace(/,/g, ""));
  expect(created7).toBeLessThan(created30);

  await page.reload();
  await expect(page.getByRole("radio", { name: "7 days" })).toHaveAttribute("aria-checked", "true");
});

test("live mode counts live usage only", async ({ page, request }) => {
  await request.post(`${MOCK_API}/__test/history?email=${ADA.email}&days=7`);
  await request.post(`${MOCK_API}/__test/team?email=${ADA.email}&liveStatus=APPROVED`);
  await signIn(page);
  await page.goto("/usage");
  await expect(page.getByTestId("orders-created")).not.toHaveText("0");

  await page.getByRole("radiogroup", { name: "Mode" }).getByRole("radio", { name: /^Live/ }).click();
  await expect(page.getByText(/in live mode/)).toBeVisible();
  await expect(page.getByTestId("orders-created")).toHaveText("0");
  await expect(page.getByText("No live orders in the last 30 days")).toBeVisible();
});
