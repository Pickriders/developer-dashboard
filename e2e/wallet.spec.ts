import { readFileSync } from "node:fs";

import { expect, test } from "@playwright/test";

import { ADA, MOCK_API, signIn } from "./helpers";

const balance = (page: import("@playwright/test").Page) => page.locator("[data-balance]");

test.beforeEach(async ({ request }) => {
  await request.post(`${MOCK_API}/__test/reset`);
});

test("adds play money in test mode and the balance updates", async ({ page }) => {
  await signIn(page);
  await page.goto("/wallet");
  await expect(balance(page)).toHaveText("₦1,000,000.00");
  await expect(
    page.getByText("Bank transfers, saved cards, auto top-up and low-balance alerts are for your live wallet."),
  ).toBeVisible();

  await page.getByRole("button", { name: "Add play money" }).click();
  const dialog = page.getByRole("dialog", { name: "Add play money" });
  await dialog.getByRole("button", { name: "₦500,000" }).click();
  await dialog.getByRole("button", { name: /^Add/ }).click();

  await expect(page.getByText("₦500,000.00 of play money added")).toBeVisible();
  await expect(balance(page)).toHaveText("₦1,500,000.00");
  await expect(page.locator('[data-transaction="test_funding"]').first()).toContainText("+₦500,000.00");

  // Over the test limit is caught before sending.
  await page.getByRole("button", { name: "Add play money" }).click();
  await dialog.getByLabel("Amount").fill("20,000,000");
  await expect(dialog.getByText("Up to ₦10,000,000.00 at a time.")).toBeVisible();
  await expect(dialog.getByRole("button", { name: /^Add/ })).toBeDisabled();
});

test("filters transactions and exports them as CSV", async ({ page }) => {
  await signIn(page);
  await page.goto("/wallet");
  await page.getByRole("button", { name: "Add play money" }).click();
  await page.getByRole("dialog").getByRole("button", { name: "₦50,000" }).click();
  await page.getByRole("dialog").getByRole("button", { name: /^Add/ }).click();
  await expect(page.locator("[data-transaction]")).toHaveCount(2);

  await page.getByRole("radiogroup", { name: "Show" }).getByRole("radio", { name: "Money out" }).click();
  await expect(page.getByText("No transactions here yet")).toBeVisible();
  await page.getByRole("radiogroup", { name: "Show" }).getByRole("radio", { name: "All" }).click();

  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "CSV" }).click();
  const file = await download;
  expect(file.suggestedFilename()).toMatch(/^pickriders-test-transactions-\d{4}-\d{2}-\d{2}\.csv$/);
  const csv = readFileSync(await file.path(), "utf8").split("\n");
  expect(csv[0]).toBe("Date,Type,Description,Amount (NGN),Balance after (NGN),Status,Order,Transaction id");
  expect(csv[1]).toContain(",Play money,Test top-up,50000,");
  expect(csv).toHaveLength(3);
});

test("sets up the live wallet: transfer account, alert, saved card, auto top-up and a card top-up", async ({
  page,
  request,
}) => {
  await request.post(`${MOCK_API}/__test/team?email=${ADA.email}&liveStatus=APPROVED`);
  await signIn(page);
  await page.goto("/wallet");
  await page.getByRole("radio", { name: "Live" }).click();
  await expect(balance(page)).toHaveText("₦0.00");

  const transfer = page.getByRole("region", { name: "Bank transfer" });
  await transfer.getByRole("button", { name: "Get a transfer account" }).click();
  const setUp = page.getByRole("dialog", { name: "Get a transfer account" });
  await setUp.getByLabel("First name").fill("Ada");
  await setUp.getByLabel("Last name").fill("Obi");
  await setUp.getByLabel("BVN").fill("22212345678");
  await setUp.getByLabel("Account number").fill("0123456789");
  await setUp.getByRole("button", { name: /^Bank/ }).click();
  await page.getByRole("menuitem", { name: "GTBank" }).click();
  await setUp.getByRole("button", { name: "Request account" }).click();
  await expect(transfer.getByText("9930012345")).toBeVisible();
  await expect(transfer.getByText("Ready")).toBeVisible();

  const alert = page.getByRole("region", { name: "Low-balance alert" });
  await alert.getByLabel("Alert below").fill("50,000");
  await alert.getByRole("button", { name: "Save" }).click();
  await expect(alert.getByText("drops below ₦50,000.00")).toBeVisible();

  const auto = page.getByRole("region", { name: "Auto top-up" });
  await auto.getByRole("button", { name: /Save a card/ }).click();
  await expect(page.getByText("Card saved for auto top-up")).toBeVisible();
  await expect(auto.getByText(/•••• 4081/)).toBeVisible();
  await auto.getByLabel("When it drops below").fill("20,000");
  await auto.getByLabel("Top up by").fill("100,000");
  await auto.getByRole("switch", { name: "Auto top-up" }).click(); // "Top up automatically"
  await expect(page.getByText("Auto top-up is on")).toBeVisible();

  await page.getByRole("button", { name: "Top up by card" }).click();
  await page.getByRole("dialog").getByRole("button", { name: "₦50,000" }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: /Continue to pay/ })
    .click();
  await expect(page.getByText("Payment received")).toBeVisible();
  await expect(balance(page)).toHaveText("₦60,000.00"); // ₦10,000 with the saved card, then ₦50,000
});

test("a Viewer sees the wallet but can't add money", async ({ page, request }) => {
  await request.post(`${MOCK_API}/__test/join?email=${ADA.email}&name=Globex&role=TEAM_VIEWER`);
  await signIn(page);
  await page.getByRole("button", { name: /Switch team/ }).click();
  await page.getByRole("menuitem", { name: "Globex" }).click();
  await page.goto("/wallet");

  await expect(balance(page)).toHaveText("₦1,000,000.00");
  await expect(page.getByRole("button", { name: "Add play money" })).toHaveCount(0);
});
