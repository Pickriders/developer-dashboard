import { expect, test, type Page } from "@playwright/test";

import { ADA, MOCK_API, signIn } from "./helpers";

const BO = { email: "bo@acme.test", password: "correct-horse-1" };
const member = (page: Page, email: string) => page.locator(`[data-member="${email}"]`);

test.beforeEach(async ({ request }) => {
  await request.post(`${MOCK_API}/__test/reset`);
});

test("invites someone, resends and revokes it", async ({ page }) => {
  await signIn(page);
  await page.goto("/team");
  await expect(member(page, ADA.email)).toContainText("You");
  await expect(member(page, ADA.email)).toContainText("Owner");

  await page.getByRole("button", { name: "Invite people" }).click();
  const dialog = page.getByRole("dialog", { name: /Invite someone to/ });
  await dialog.getByRole("button", { name: "Send invitation" }).click();
  await expect(dialog.getByText("Enter their email, like bo@acme.com.")).toBeVisible();
  await dialog.getByLabel("Email").fill("cy@acme.test");
  await dialog.getByRole("radio", { name: /Finance/ }).click();
  await dialog.getByRole("button", { name: "Send invitation" }).click();

  await expect(page.getByText("Invitation sent to cy@acme.test")).toBeVisible();
  const row = page.locator('[data-invitation="cy@acme.test"]');
  await expect(row).toContainText("Finance · invited by Ada Obi");
  await row.getByRole("button", { name: "Resend" }).click();
  await expect(page.getByText("Sent again to cy@acme.test")).toBeVisible();

  // Inviting the same person twice says so under the field.
  await page.getByRole("button", { name: "Invite people" }).click();
  await dialog.getByLabel("Email").fill("cy@acme.test");
  await dialog.getByRole("button", { name: "Send invitation" }).click();
  await expect(dialog.getByText("They already have an invitation. Resend it instead.")).toBeVisible();
  await dialog.getByRole("button", { name: "Cancel" }).click();

  await row.getByRole("button", { name: "Revoke" }).click();
  await expect(row).toHaveCount(0);
  await expect(page.getByText("Nobody is waiting to join.")).toBeVisible();
});

test("changes a role, removes someone, and hands the team over", async ({ page, request }) => {
  await request.post(`${MOCK_API}/__test/member?owner=${ADA.email}&email=${BO.email}&name=Bo Ade&role=TEAM_DEVELOPER`);
  await request.post(`${MOCK_API}/__test/member?owner=${ADA.email}&email=cy@acme.test&name=Cy Eze&role=TEAM_VIEWER`);
  await signIn(page);
  await page.goto("/team");
  await expect(member(page, BO.email)).toContainText("Developer");

  await page.getByRole("button", { name: "Actions for Bo Ade" }).click();
  await page.getByRole("menuitem", { name: "Finance" }).click();
  await expect(page.getByText("Bo Ade is now finance")).toBeVisible();
  await expect(member(page, BO.email)).toContainText("Finance");

  await page.getByRole("button", { name: "Actions for Cy Eze" }).click();
  await page.getByRole("menuitem", { name: "Remove from team" }).click();
  await page.getByRole("dialog", { name: "Remove Cy Eze?" }).getByRole("button", { name: "Remove" }).click();
  await expect(member(page, "cy@acme.test")).toHaveCount(0);

  await page.getByRole("button", { name: "Actions for Bo Ade" }).click();
  await page.getByRole("menuitem", { name: "Make owner" }).click();
  const confirm = page.getByRole("dialog", { name: "Make Bo Ade the owner?" });
  await expect(confirm.getByRole("button", { name: "Make owner" })).toBeDisabled();
  await confirm.getByRole("textbox").fill("Ada's team");
  await confirm.getByRole("button", { name: "Make owner" }).click();
  await expect(member(page, BO.email)).toContainText("Owner");
  await expect(member(page, ADA.email)).toContainText("Admin");
  // No longer the owner: Ada can leave, and can't touch the new owner.
  await expect(page.getByRole("button", { name: "Leave team" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Actions for Bo Ade" })).toHaveCount(0);
});

test("a Viewer sees no edit controls, and can leave", async ({ page, request }) => {
  await request.post(`${MOCK_API}/__test/member?owner=${ADA.email}&email=${BO.email}&name=Bo Ade&role=TEAM_VIEWER`);
  await signIn(page, BO);
  await page.getByRole("button", { name: /Switch team/ }).click();
  await page.getByRole("menuitem", { name: "Ada's team" }).click();
  await page.goto("/team");

  await expect(member(page, ADA.email)).toContainText("Owner");
  await expect(member(page, BO.email)).toContainText("Viewer");
  await expect(page.getByRole("button", { name: "Invite people" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: /^Actions for/ })).toHaveCount(0);
  await expect(page.getByRole("region", { name: "Invitations" })).toHaveCount(0);

  await page.getByRole("button", { name: "Leave team" }).click();
  await page.getByRole("dialog", { name: "Leave Ada's team?" }).getByRole("button", { name: "Leave team" }).click();
  await expect(page).toHaveURL("/");
  await expect(page.getByText("You left Ada's team.")).toBeVisible();
});
