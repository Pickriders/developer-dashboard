import { expect, test, type Page } from "@playwright/test";

import { ADA, MOCK_API, signIn } from "./helpers";

const step = (page: Page, id: string) => page.locator(`[data-step="${id}"]`);

test.beforeEach(async ({ request }) => {
  await request.post(`${MOCK_API}/__test/reset`);
});

test("shows the next step and ticks steps from the API's state", async ({ page, request }) => {
  await signIn(page);

  await expect(page.getByRole("heading", { level: 1, name: /, Ada$/ })).toBeVisible();
  await expect(page.getByRole("img", { name: "2 of 7 done" })).toBeVisible();
  // The next step is open, with its action; the others are folded.
  await expect(step(page, "test_key")).toHaveAttribute("aria-current", "step");
  await expect(page.locator("#step-test_key").getByRole("link", { name: "Create test key" })).toBeVisible();
  await expect(page.locator("#step-webhook")).toHaveCount(0);

  // A test order made from code (not this page) ticks its step on the next look.
  await request.post(`${MOCK_API}/__test/order?email=${ADA.email}`);
  await page.reload();
  await expect(step(page, "test_order")).toHaveAttribute("data-state", "done");
  await expect(page.getByRole("img", { name: "3 of 7 done" })).toBeVisible();
});

test("requests live access with the team's profile", async ({ page }) => {
  await signIn(page);

  await step(page, "request_live").getByRole("button", { expanded: false }).click();
  await page.locator("#step-request_live").getByRole("button", { name: "Request live access" }).click();
  const dialog = page.getByRole("dialog", { name: "Request live access" });
  await dialog.getByRole("button", { name: "Send request" }).click();
  await expect(dialog.getByText("Enter your business name.")).toBeVisible();
  await expect(dialog.getByLabel("Business name")).toBeFocused();

  await dialog.getByLabel("Business name").fill("Acme Logistics Ltd");
  await dialog.getByLabel("What will you deliver?").fill("Phones from our Ikeja store to customers in Lagos.");
  await dialog.getByRole("radio", { name: "Up to 1,000" }).click();
  await dialog.getByRole("button", { name: "Send request" }).click();

  await expect(page.getByText("Request sent.")).toBeVisible();
  await expect(dialog).toBeHidden();
  await expect(step(page, "request_live")).toHaveAttribute("data-state", "done");
  await expect(step(page, "approval")).toHaveAttribute("data-state", "waiting");
  await expect(page.getByLabel("Your team").getByText("In review")).toBeVisible();
});

test("shows why live access was refused, and asks again", async ({ page, request }) => {
  const reason = "We couldn't reach the website you gave.";
  await request.post(
    `${MOCK_API}/__test/team?email=${ADA.email}&liveStatus=REJECTED&reason=${encodeURIComponent(reason)}`,
  );
  await signIn(page);

  await expect(step(page, "approval")).toHaveAttribute("data-state", "blocked");
  await expect(page.locator("#step-approval").getByText(reason)).toBeVisible();

  await page.locator("#step-approval").getByRole("button", { name: "Update and ask again" }).click();
  const dialog = page.getByRole("dialog", { name: "Ask for live access again" });
  await expect(dialog.getByText(reason)).toBeVisible();
});

test("switches team, and shows each team's own state and what the role allows", async ({ page, request }) => {
  await request.post(`${MOCK_API}/__test/join?email=${ADA.email}&name=Globex&role=TEAM_VIEWER`);
  await signIn(page);
  await expect(page.getByLabel("Your team").getByText("Ada's team")).toBeVisible();

  await page.getByRole("button", { name: /Switch team/ }).click();
  await page.getByRole("menuitem", { name: "Globex" }).click();

  const team = page.getByLabel("Your team");
  await expect(team.getByText("Globex")).toBeVisible();
  await expect(team.getByText("You're viewer")).toBeVisible();
  // Globex's owner hasn't verified, and a Viewer can't create keys or ask for live access.
  await expect(page.locator("#step-verify_email").getByText("Waiting for the team owner")).toBeVisible();
  await step(page, "test_key").getByRole("button", { expanded: false }).click();
  await expect(page.locator("#step-test_key").getByText("Ask a developer or admin")).toBeVisible();
  await step(page, "request_live").getByRole("button", { expanded: false }).click();
  await expect(page.locator("#step-request_live").getByRole("button")).toHaveCount(0);

  // The choice survives a reload.
  await page.reload();
  await expect(page.getByLabel("Your team").getByText("Globex")).toBeVisible();
});

test.describe("on a phone", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("home fits, and the menu opens as a drawer", async ({ page }) => {
    await signIn(page);
    await expect(step(page, "test_key")).toHaveAttribute("aria-current", "step");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);

    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(
      page.getByRole("complementary", { name: "Menu" }).getByRole("link", { name: "Home", exact: true }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("complementary", { name: "Menu" })).toBeHidden();
  });
});
