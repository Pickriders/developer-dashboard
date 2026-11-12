import { expect, test, type Page } from "@playwright/test";

import { ADA, MOCK_API, signIn } from "./helpers";

test.use({ permissions: ["clipboard-read", "clipboard-write"] });

const row = (page: Page, label: string) => page.locator(`[data-key="${label}"]`);
const createDialog = (page: Page) => page.getByRole("dialog").filter({ hasText: /Create a (test|live) key|is ready/ });

async function createKey(page: Page, label: string) {
  await page
    .getByRole("button", { name: /Create (test|live) key/ })
    .first()
    .click();
  await createDialog(page).getByLabel("Name").fill(label);
  await createDialog(page).getByRole("button", { name: "Create key" }).click();
  const secret = await createDialog(page).locator("code").innerText();
  await createDialog(page).getByRole("button", { name: "Done" }).click();
  return secret;
}

test.beforeEach(async ({ request }) => {
  await request.post(`${MOCK_API}/__test/reset`);
});

test("creates a test key from the checklist, shows it once, and copies it", async ({ page }) => {
  await signIn(page);
  await page.locator("#step-test_key").getByRole("link", { name: "Create test key" }).click();

  await expect(page).toHaveURL("/keys");
  const dialog = page.getByRole("dialog", { name: "Create a test key" });
  await dialog.getByRole("button", { name: "Create key" }).click();
  await expect(dialog.getByText("Name the key after where it runs.")).toBeVisible();

  await dialog.getByLabel("Name").fill("Laptop");
  await dialog.getByRole("button", { name: "Create key" }).click();

  const ready = page.getByRole("dialog", { name: "Laptop is ready" });
  const secret = await ready.locator("code").innerText();
  expect(secret).toMatch(/^sk_test_\w{20,}$/);
  await ready.getByRole("button", { name: "Copy secret" }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(secret);
  await ready.getByRole("button", { name: "Done" }).click();

  // Listed by its prefix only; the secret is gone from the page.
  await expect(row(page, "Laptop")).toContainText(secret.slice(0, 12));
  await expect(page.getByText(secret)).toHaveCount(0);
  await expect(row(page, "Laptop")).toContainText("Full access");
  await expect(row(page, "Laptop")).toContainText("Never");

  await page.getByRole("link", { name: "Home", exact: true }).click();
  await expect(page.locator('[data-step="test_key"]')).toHaveAttribute("data-state", "done");
});

test("creates a restricted key", async ({ page }) => {
  await signIn(page);
  await page.goto("/keys");
  await page.getByRole("button", { name: "Create test key" }).click();
  const dialog = page.getByRole("dialog", { name: "Create a test key" });

  await dialog.getByLabel("Name").fill("Orders worker");
  await dialog.getByRole("radio", { name: /Restricted/ }).click();
  await dialog.getByRole("button", { name: "Create key" }).click();
  await expect(dialog.getByText("Give the key access to at least one thing.")).toBeVisible();

  await dialog.getByRole("radiogroup", { name: "Orders access" }).getByRole("radio", { name: "Write" }).click();
  await dialog.getByRole("radiogroup", { name: "Wallet access" }).getByRole("radio", { name: "Read" }).click();
  await dialog.getByRole("button", { name: "Create key" }).click();
  await page.getByRole("dialog", { name: "Orders worker is ready" }).getByRole("button", { name: "Done" }).click();

  await expect(row(page, "Orders worker")).toContainText("Orders: write · Wallet: read");
});

test("rolls a key with a grace period, then revokes the old one", async ({ page }) => {
  await signIn(page);
  await page.goto("/keys");
  const first = await createKey(page, "Server");

  await page.getByRole("button", { name: "Actions for Server" }).click();
  await page.getByRole("menuitem", { name: "Roll key" }).click();
  const roll = page.getByRole("dialog", { name: "Roll Server" });
  await roll.getByRole("radio", { name: "1 hour" }).click();
  await roll.getByRole("button", { name: "Roll key" }).click();
  const fresh = await roll.locator("code").innerText();
  expect(fresh).not.toBe(first);
  await expect(roll.getByText(/The old key keeps working until/)).toBeVisible();
  await roll.getByRole("button", { name: "Done" }).click();

  // The old key is still listed, counting down; it can be revoked but not rolled again.
  await expect(row(page, "Server")).toHaveCount(2);
  const old = row(page, "Server").filter({ hasText: "Stops in 1 hour" });
  await expect(old).toContainText(first.slice(0, 12));
  await old.getByRole("button", { name: "Actions for Server" }).click();
  await expect(page.getByRole("menuitem", { name: "Roll key" })).toHaveCount(0);
  await page.getByRole("menuitem", { name: "Revoke key" }).click();

  const confirm = page.getByRole("dialog", { name: "Revoke Server?" });
  await expect(confirm.getByText("Requests with this key fail straight away.")).toBeVisible();
  await confirm.getByRole("button", { name: "Revoke key" }).click();
  await expect(page.getByText("Server revoked")).toBeVisible();
  await expect(row(page, "Server")).toHaveCount(1);
  await expect(row(page, "Server")).toContainText(fresh.slice(0, 12));
});

test("keeps test and live keys apart, and asks for the name before revoking a live key", async ({ page, request }) => {
  await request.post(`${MOCK_API}/__test/team?email=${ADA.email}&liveStatus=APPROVED`);
  await signIn(page);
  await page.goto("/keys");
  await createKey(page, "Laptop");

  await page.getByRole("radio", { name: "Live" }).click();
  await expect(page.getByText("No live keys yet")).toBeVisible();
  await expect(row(page, "Laptop")).toHaveCount(0);

  const live = await createKey(page, "Production server");
  expect(live).toMatch(/^sk_live_/);

  await page.getByRole("radio", { name: "Test" }).click();
  await expect(row(page, "Laptop")).toBeVisible();
  await expect(row(page, "Production server")).toHaveCount(0);

  await page.getByRole("radio", { name: "Live" }).click();
  await page.getByRole("button", { name: "Actions for Production server" }).click();
  await page.getByRole("menuitem", { name: "Revoke key" }).click();
  const confirm = page.getByRole("dialog", { name: "Revoke Production server?" });
  await expect(confirm.getByRole("button", { name: "Revoke key" })).toBeDisabled();
  await confirm.getByRole("textbox").fill("Production server");
  await confirm.getByRole("button", { name: "Revoke key" }).click();
  await expect(page.getByText("No live keys yet")).toBeVisible();
});

test("a Viewer sees keys but no way to change them", async ({ page, request }) => {
  await request.post(`${MOCK_API}/__test/join?email=${ADA.email}&name=Globex&role=TEAM_VIEWER`);
  await signIn(page);
  await page.getByRole("button", { name: /Switch team/ }).click();
  await page.getByRole("menuitem", { name: "Globex" }).click();
  await page.getByRole("link", { name: "API keys" }).click();

  await expect(page.getByText("No test keys yet")).toBeVisible();
  await expect(page.getByText("Ask a developer or admin to create one.")).toBeVisible();
  await expect(page.getByRole("button", { name: /Create (test|live) key/ })).toHaveCount(0);
});
