import { expect, test } from "@playwright/test";

import { ADA, MOCK_API, lastCode, signIn, wrongCode } from "./helpers";

test.beforeEach(async ({ request }) => {
  await request.post(`${MOCK_API}/__test/reset`);
});

test("renames you and the team", async ({ page }) => {
  await signIn(page);
  await page.goto("/settings");

  await page.getByLabel("First name").fill("Adaeze");
  await page.getByRole("button", { name: "Save name" }).first().click();
  await expect(page.getByText("Name saved")).toBeVisible();
  await expect(page.getByRole("button", { name: /Account: Adaeze Obi/ })).toBeVisible();

  await page.getByLabel("Team name").fill("Acme Deliveries");
  await page.getByRole("button", { name: "Save name" }).last().click();
  await expect(page.getByText("Team name saved")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Acme Deliveries" })).toBeVisible();
});

test("changing the phone needs the code sent to the new number", async ({ page, request }) => {
  await signIn(page);
  await page.goto("/settings");
  const phone = page.locator('[data-contact="phone"]');
  await expect(phone).toContainText("+234 803 123 4567");

  await page.getByRole("button", { name: "Change phone" }).click();
  const dialog = page.getByRole("dialog", { name: "Change phone number" });
  await dialog.getByLabel("New phone number").fill("8059876543");
  await dialog.getByRole("button", { name: "Text me a code" }).click();
  await expect(dialog.getByText("Enter the 4-digit code")).toBeVisible();

  // Closed before the code: the old number still stands, and the change waits.
  await page.keyboard.press("Escape");
  await expect(phone).toContainText("+234 803 123 4567");
  await expect(phone).toContainText("Waiting for the code we sent to +234 805 987 6543");

  await phone.getByRole("button", { name: "Enter code" }).click();
  const code = await lastCode(request, "2348059876543");
  await dialog.getByLabel("Verification code").fill(wrongCode(code));
  await expect(dialog.getByText(/That code isn't right/)).toBeVisible();
  await dialog.getByLabel("Verification code").fill(code);

  await expect(page.getByText("Your phone number is now +234 805 987 6543")).toBeVisible();
  await expect(phone).toContainText("+234 805 987 6543");
  await expect(phone).not.toContainText("Waiting for");
  await expect(phone).toContainText("Verified");
});

test("a pending email change can be cancelled", async ({ page }) => {
  await signIn(page);
  await page.goto("/settings");
  await page.getByRole("button", { name: "Change email" }).click();
  const dialog = page.getByRole("dialog", { name: "Change email" });
  await dialog.getByLabel("New email").fill("ada@newco.test");
  await dialog.getByRole("button", { name: "Email me a code" }).click();
  await expect(dialog.getByText("ada@newco.test")).toBeVisible();
  await page.keyboard.press("Escape");

  const email = page.locator('[data-contact="email"]');
  await email.getByRole("button", { name: "Cancel change" }).click();
  await expect(page.getByText("Change cancelled. You still use ada@acme.test.")).toBeVisible();
  await expect(email).not.toContainText("Waiting for");
});

test("requesting live access shows it in review", async ({ page }) => {
  await signIn(page);
  await page.goto("/settings");
  const live = page.getByRole("region", { name: "Live access" });
  await expect(live).toContainText("Test mode only");

  await live.getByRole("button", { name: "Request live access" }).click();
  const dialog = page.getByRole("dialog", { name: "Request live access" });
  await dialog.getByLabel("Business name").fill("Acme Logistics");
  await dialog.getByLabel(/Website/).fill("acme.test");
  await dialog.getByLabel("What will you deliver?").fill("Phones from our Ikeja store to customers in Lagos.");
  await dialog.getByRole("radio", { name: "Up to 1,000" }).click();
  await dialog.getByRole("button", { name: "Send request" }).click();

  await expect(live).toContainText("In review");
  await expect(live.getByRole("button", { name: "Request live access" })).toHaveCount(0);
});

test("alert emails and the IP allowlist", async ({ page }) => {
  await signIn(page);
  await page.goto("/settings");

  await page.getByLabel("New alert email").fill("not-an-email");
  await page.getByRole("button", { name: "Add email" }).click();
  await expect(page.getByText(`"not-an-email" isn't an email address.`)).toBeVisible();
  await page.getByLabel("New alert email").fill("ops@acme.test");
  await page.getByLabel("New alert email").press("Enter");
  await expect(page.getByRole("list", { name: "Alert emails" })).toContainText("ops@acme.test");

  const ips = page.getByRole("region", { name: "API key IP allowlist" });
  await expect(ips).toContainText("Any IP");
  await page.getByLabel("New IP or range").fill("203.0.113.9");
  await page.getByRole("button", { name: "Add IP" }).click();
  // The first entry locks out every other address, so it asks first.
  const confirm = page.getByRole("dialog", { name: "Turn on the allowlist?" });
  await confirm.getByRole("button", { name: "Turn on" }).click();
  await expect(ips).toContainText("On · 1 entry");

  await page.reload();
  await expect(page.getByRole("list", { name: "Allowed IPs" })).toContainText("203.0.113.9");
  await page.getByRole("button", { name: "Remove 203.0.113.9" }).click();
  await expect(ips).toContainText("Any IP");
});

test("a Viewer reads team settings but can't change them", async ({ page, request }) => {
  await request.post(`${MOCK_API}/__test/join?email=${ADA.email}&name=Globex&role=TEAM_VIEWER`);
  await signIn(page);
  await page.getByRole("button", { name: /Switch team/ }).click();
  await page.getByRole("menuitem", { name: "Globex" }).click();
  await page.goto("/settings");

  await expect(page.getByRole("heading", { name: "Globex" })).toBeVisible();
  await expect(page.getByLabel("Team name")).toHaveAttribute("readonly", "");
  await expect(page.getByLabel("New alert email")).toHaveCount(0);
  await expect(page.getByLabel("New IP or range")).toHaveCount(0);
  // Your own name is still yours to change.
  await expect(page.getByLabel("First name")).toBeEditable();
});
