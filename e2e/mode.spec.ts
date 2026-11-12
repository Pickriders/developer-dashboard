import { expect, test, type Page } from "@playwright/test";

import { ADA, MOCK_API, signIn } from "./helpers";

const banner = (page: Page) => page.getByRole("status", { name: "Test mode" });
const live = (page: Page) => page.getByRole("radiogroup", { name: "Mode" }).getByRole("radio", { name: /^Live/ });
const lock = (page: Page) => page.getByRole("dialog", { name: "Live mode is locked" });
const setLive = (request: import("@playwright/test").APIRequestContext, status: string, reason = "") =>
  request.post(`${MOCK_API}/__test/team?email=${ADA.email}&liveStatus=${status}&reason=${encodeURIComponent(reason)}`);

test.beforeEach(async ({ request }) => {
  await request.post(`${MOCK_API}/__test/reset`);
});

test("starts in test mode, with the banner on every page", async ({ page }) => {
  await signIn(page);

  await expect(banner(page)).toBeVisible();
  await expect(page.getByRole("radio", { name: "Test" })).toHaveAttribute("aria-checked", "true");
  await expect(live(page)).toHaveAccessibleName("Live (locked)");
});

test("explains the lock and leads to the request", async ({ page }) => {
  await signIn(page);

  await live(page).click();
  await expect(lock(page)).toBeVisible();
  await expect(lock(page).getByText("Ask Pickriders to switch on live mode.")).toBeVisible();
  await expect(banner(page)).toBeVisible(); // still test

  await lock(page).getByRole("link", { name: "Request live access" }).click();
  await expect(page.getByRole("dialog", { name: "Request live access" })).toBeVisible();
  await expect(page).toHaveURL("/");
});

test("says live is in review, or why it was refused", async ({ page, request }) => {
  await setLive(request, "PENDING");
  await signIn(page);
  await live(page).click();
  await expect(lock(page).getByText(/Your request is in review since/)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(lock(page)).toBeHidden();
  await expect(live(page)).toBeFocused();

  await setLive(request, "REJECTED", "Your website doesn't load.");
  await page.reload();
  await live(page).click();
  await expect(lock(page).getByText("Not approved yet: Your website doesn't load.")).toBeVisible();
  await expect(lock(page).getByRole("link", { name: "Update and ask again" })).toBeVisible();
});

test("switches to live once approved, remembers it, and keeps each team's own mode", async ({ page, request }) => {
  await setLive(request, "APPROVED");
  await request.post(`${MOCK_API}/__test/join?email=${ADA.email}&name=Globex&role=TEAM_ADMIN`);
  await signIn(page);

  await live(page).click();
  await expect(live(page)).toHaveAttribute("aria-checked", "true");
  await expect(banner(page)).toBeHidden();
  await expect(page.getByText("Real money and real riders from here on.")).toBeVisible();

  await page.reload();
  await expect(live(page)).toHaveAttribute("aria-checked", "true");

  // Globex isn't approved: it opens in test mode, with the banner.
  await page.getByRole("button", { name: /Switch team/ }).click();
  await page.getByRole("menuitem", { name: "Globex" }).click();
  await expect(banner(page)).toBeVisible();
  await expect(live(page)).toHaveAccessibleName("Live (locked)");
});

test("drops back to test mode when live access is suspended", async ({ page, request }) => {
  await setLive(request, "APPROVED");
  await signIn(page);
  await live(page).click();
  await expect(banner(page)).toBeHidden();

  await setLive(request, "SUSPENDED", "Unpaid balance.");
  await page.reload();
  await expect(banner(page)).toBeVisible();
  await live(page).click();
  await expect(lock(page).getByText("Live access is suspended: Unpaid balance.")).toBeVisible();
});
