import { expect, test } from "@playwright/test";

import { lastCode, MOCK_API, newPerson, signUp, wrongCode } from "./helpers";

test("signs up, verifies email and phone, and lands verified", async ({ page, request }) => {
  const person = newPerson();
  await signUp(page, person);

  // Email: the sign-up already sent the code.
  await expect(page).toHaveURL(/\/auth\/verify\?sent=1/);
  await expect(page.getByRole("heading", { name: "Check your email" })).toBeVisible();
  await expect(page.getByRole("main").getByText(person.email, { exact: true })).toBeVisible();
  const emailCode = await lastCode(request, person.email);

  const code = page.getByLabel("Verification code");
  await code.fill(wrongCode(emailCode));
  await expect(page.getByRole("alert").filter({ hasText: "That code isn't right. 4 tries left." })).toBeVisible();
  await expect(code).toHaveValue("");
  await expect(code).toBeFocused();

  await code.fill(emailCode); // a full code submits itself

  // Phone: nothing is texted until asked.
  await expect(page.getByRole("heading", { name: "Verify your phone" })).toBeVisible();
  await page.getByRole("button", { name: "Text me a code" }).click();
  await expect(page.getByText("Resend code in")).toBeVisible();
  await page.getByLabel("Verification code").fill(await lastCode(request, person.stored));

  await expect(page.getByRole("heading", { name: "You're verified" })).toBeVisible();
  await page.getByRole("button", { name: "Continue to dashboard" }).click();
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("heading", { name: "Welcome, Chidi" })).toBeVisible();
  await expect(page.getByText("Verified", { exact: true })).toBeVisible();
});

test("keeps the session token out of reach of page scripts", async ({ page }) => {
  // Read the sign-up response as the browser receives it, before the page navigates away.
  const responses: string[] = [];
  await page.route("**/dashboard/auth/signup", async (route) => {
    const response = await route.fetch();
    responses.push(await response.text());
    await route.fulfill({ response });
  });

  await signUp(page, newPerson());
  await expect(page).toHaveURL(/\/auth\/verify/);

  expect(responses.join("")).not.toContain("accessToken");
  expect(await page.evaluate(() => document.cookie)).not.toContain("pr_dev_session");
  const cookie = (await page.context().cookies()).find((c) => c.name === "pr_dev_session");
  expect(cookie).toEqual(expect.objectContaining({ httpOnly: true, sameSite: "Lax" }));
});

test("sends a signed-out visitor to sign in, then back where they were going", async ({ page }) => {
  await page.goto("/auth/verify?next=%2F");
  await expect(page).toHaveURL(/\/auth\/login\?redirect=%2Fauth%2Fverify/);

  await page.getByLabel("Email").fill("ada@acme.test");
  await page.getByLabel("Password", { exact: true }).fill("correct-horse-1");
  await page.getByRole("button", { name: "Sign in" }).click();

  // Ada is already verified, so the flow shows its last step.
  await expect(page.getByRole("heading", { name: "You're verified" })).toBeVisible();
});

test("explains a wrong password and keeps the email", async ({ page }) => {
  await page.goto("/auth/login");
  await page.getByLabel("Email").fill("ada@acme.test");
  await page.getByLabel("Password", { exact: true }).fill("not-it");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page.getByRole("alert").filter({ hasText: "That email and password don't match." })).toBeVisible();
  await expect(page.getByLabel("Email")).toHaveValue("ada@acme.test");
  await expect(page.getByLabel("Password", { exact: true })).toBeFocused();
  await expect(page.getByRole("link", { name: "Reset your password" })).toHaveAttribute(
    "href",
    "/auth/forgot-password?email=ada%40acme.test",
  );
});

test("says what is missing only once you try to submit", async ({ page }) => {
  await page.goto("/auth/signup");
  await page.getByLabel("First name").focus();
  await page.getByLabel("Last name").focus();
  await expect(page.getByText("Enter your first name.")).toHaveCount(0);

  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByText("Enter your first name.")).toBeVisible();
  await expect(page.getByLabel("First name")).toBeFocused();
});

test("offers to sign in when the email already has an account", async ({ page }) => {
  await signUp(page, { ...newPerson(), email: "ada@acme.test" });

  await expect(page.getByText("An account already uses this email.")).toBeVisible();
  await expect(page.getByRole("link", { name: "Sign in instead" })).toHaveAttribute(
    "href",
    "/auth/login?email=ada%40acme.test",
  );
});

test("resets a forgotten password and signs in", async ({ page, request }) => {
  const person = newPerson();
  await signUp(page, person);
  await expect(page).toHaveURL(/\/auth\/verify/);
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page.getByText("You've signed out.")).toBeVisible();

  await page.getByRole("link", { name: "Forgot password?" }).click();
  await expect(page.getByRole("heading", { name: "Reset your password" })).toBeVisible();
  await page.getByLabel("Email").fill(person.email);
  await page.getByRole("button", { name: "Send reset code" }).click();
  await expect(page.getByRole("heading", { name: "Check your email" })).toBeVisible();

  await page.getByLabel("Code").fill(await lastCode(request, person.email));
  await expect(page.getByLabel("New password")).toBeFocused(); // a full code moves on
  await page.getByLabel("New password").fill("harbour lights at night");
  await page.getByRole("button", { name: "Reset password and sign in" }).click();

  await expect(page).toHaveURL("/");
  await expect(page.getByText("Password updated. You're signed in.")).toBeVisible();
});

test("asks for a reset without revealing whether the account exists", async ({ page }) => {
  await page.goto("/auth/forgot-password");
  await page.getByLabel("Email").fill("nobody@acme.test");
  await page.getByRole("button", { name: "Send reset code" }).click();

  await expect(page.getByText(/If nobody@acme\.test has a Pickriders developer account/)).toBeVisible();
});

test("joins a team from an invitation", async ({ page, request }) => {
  await request.post(`${MOCK_API}/__test/reset`);
  await page.goto("/auth/invite?token=inv_open_0000000000000000001");
  await expect(page.getByRole("heading", { name: "Join Acme Logistics" })).toBeVisible();
  await page.getByRole("link", { name: "Create account to accept" }).click();

  await expect(page.getByLabel("Work email")).toHaveValue("bo@acme.test");
  await expect(page.getByLabel("Work email")).toHaveAttribute("readonly", "");
  await page.getByLabel("First name").fill("Bo");
  await page.getByLabel("Last name").fill("Ade");
  await page.getByLabel(/Phone number/).fill("8051234567");
  await page.getByLabel("Password", { exact: true }).fill("lagos ferry at dawn");
  await page.getByRole("button", { name: "Create account and join" }).click();

  // The invitation proved the email, so there is no verify step.
  await expect(page).toHaveURL("/");
  await expect(page.getByText("signed in to Acme Logistics")).toBeVisible();
});

test("explains a used invitation", async ({ page, request }) => {
  await request.post(`${MOCK_API}/__test/reset`);
  await page.goto("/auth/invite?token=inv_used_0000000000000000001");

  await expect(page.getByRole("heading", { name: "This invitation can't be used anymore" })).toBeVisible();
});

test.describe("on a phone", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  for (const path of [
    "/auth/login",
    "/auth/signup",
    "/auth/forgot-password",
    "/auth/invite?token=inv_open_0000000000000000001",
  ]) {
    test(`${path} fits without sideways scrolling`, async ({ page, request }) => {
      await request.post(`${MOCK_API}/__test/reset`);
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});
