import { expect, test } from "@playwright/test";

import { MOCK_API } from "./helpers";

/** Step 15.6: the public status page, open to anyone, live from GET /status. */
test.beforeEach(async ({ request }) => {
  await request.post(`${MOCK_API}/__test/reset`);
});

test("says all is well, with each system's 90 days, without signing in", async ({ page }) => {
  await page.goto("/status");
  await expect(page).toHaveURL("/status");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Pickriders developer platform");
  await expect(page.locator("[data-status]")).toHaveAttribute("data-status", "operational");
  await expect(page.getByText("All systems operational")).toBeVisible();
  for (const id of ["api", "webhooks", "dashboard"]) {
    await expect(page.locator(`[data-component="${id}"]`).getByText("Operational")).toBeVisible();
  }
  await expect(page.getByText("100% without incidents").first()).toBeVisible();
  await expect(page.getByText("No incidents in the last 14 days.")).toBeVisible();
});

test("shows an incident as it happens, and in the past once resolved", async ({ page, request }) => {
  const { id } = await (
    await request.post(
      `${MOCK_API}/__test/incident?title=${encodeURIComponent("Slow order creation")}&impact=major&components=api&message=${encodeURIComponent("Creating orders is slow. We are on it.")}`,
    )
  ).json();
  await page.goto("/status");

  await expect(page.locator("[data-status]")).toHaveAttribute("data-status", "partial_outage");
  await expect(page.getByText("Some systems are having problems")).toBeVisible();
  const now = page.getByRole("region", { name: "Happening now" });
  await expect(now.getByRole("heading", { name: "Slow order creation" })).toBeVisible();
  await expect(now.getByText("Creating orders is slow. We are on it.")).toBeVisible();
  await expect(page.locator('[data-component="api"]').getByText("Partial outage")).toBeVisible();
  await expect(page.locator('[data-component="dashboard"]').getByText("Operational")).toBeVisible();

  await request.post(`${MOCK_API}/__test/incident?resolve=${id}&message=${encodeURIComponent("Back to normal.")}`);
  await page.reload();
  await expect(page.getByText("All systems operational")).toBeVisible();
  await expect(page.getByRole("region", { name: "Happening now" })).toHaveCount(0);
  const past = page.getByRole("region", { name: "Past 14 days" });
  await expect(past.getByRole("heading", { name: "Slow order creation" })).toBeVisible();
  await expect(past.getByText("Back to normal.")).toBeVisible();
});

test("says plainly when the API can't be reached", async ({ page, request }) => {
  await request.post(`${MOCK_API}/__test/fail?route=${encodeURIComponent("GET /status")}`);
  await page.goto("/status");
  await expect(page.getByText("We can't reach the Pickriders API right now")).toBeVisible({ timeout: 15_000 });
  await expect(page.getByRole("button", { name: "Check again" })).toBeVisible();
});
