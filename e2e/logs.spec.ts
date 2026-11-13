import { expect, test, type Page } from "@playwright/test";

import { ADA, MOCK_API, signIn } from "./helpers";

const rows = (page: Page) => page.getByRole("region", { name: "Requests" }).locator("[data-log]");

async function seed(request: import("@playwright/test").APIRequestContext, n: number) {
  const res = await request.post(`${MOCK_API}/__test/requests?email=${ADA.email}&n=${n}`);
  return (await res.json()).requestIds as string[];
}

test.beforeEach(async ({ request }) => {
  await request.post(`${MOCK_API}/__test/reset`);
});

test("finds a request by its id and shows it in full", async ({ page, request }) => {
  const ids = await seed(request, 30);
  await signIn(page);
  await page.goto("/logs");

  await expect(rows(page)).toHaveCount(25); // a page; older ones load on demand
  await expect(page.getByRole("button", { name: "Show older requests" })).toBeVisible();

  // The oldest is on the second page; its id finds it straight away.
  const oldest = ids[3]; // the 4th made: a POST /orders that got 402
  await page.getByLabel("Search by request id or path").fill(oldest);
  await expect(rows(page)).toHaveCount(1);
  await expect(page).toHaveURL(new RegExp(`q=${oldest}`));
  await rows(page).first().click();

  const sheet = page.getByRole("dialog", { name: /402 POST \/orders/ });
  await expect(sheet.getByText(oldest)).toBeVisible();
  await expect(sheet.getByText("insufficient_funds").first()).toBeVisible();
  await expect(sheet.getByRole("link", { name: "What this error means" })).toBeVisible();
  await expect(sheet.getByText('"quote_id": "quo_2"')).toBeVisible();
  await expect(sheet.getByText("Your wallet can't cover this order.")).toBeVisible();

  // The open request is in the link, so it can be shared.
  const link = page.url();
  await page.goto(link);
  await expect(page.getByRole("dialog", { name: /402 POST \/orders/ })).toBeVisible();
});

test("narrows by outcome, method and path, and clears", async ({ page, request }) => {
  await seed(request, 10);
  await signIn(page);
  await page.goto("/logs");
  await expect(rows(page)).toHaveCount(10);

  await page.getByRole("radiogroup", { name: "Outcome" }).getByRole("radio", { name: "Failed" }).click();
  await expect(rows(page)).toHaveCount(4); // two 402s and two 500s
  await page.getByRole("button", { name: /^Method/ }).click();
  await page.getByRole("menuitem", { name: "POST" }).click();
  await expect(rows(page)).toHaveCount(2);
  await expect(page).toHaveURL(/status=failed.*method=POST|method=POST.*status=failed/);

  await page.getByRole("button", { name: "Clear filters" }).click();
  await page.getByLabel("Search by request id or path").fill("/wallet");
  await expect(rows(page)).toHaveCount(2);

  await page.getByLabel("Search by request id or path").fill("req_doesnotexist");
  await expect(page.getByText("No requests match")).toBeVisible();
});

test("says where requests will appear before there are any", async ({ page }) => {
  await signIn(page);
  await page.goto("/logs");

  await expect(page.getByText("No test requests yet")).toBeVisible();
  await expect(page.getByRole("link", { name: "Get a test key" })).toBeVisible();
});
