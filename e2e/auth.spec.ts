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
  await expect(page.getByRole("heading", { level: 1, name: /, Chidi$/ })).toBeVisible();
  // Both verification steps tick themselves; the next step is the test key.
  await expect(page.locator('[data-step="verify_email"]')).toHaveAttribute("data-state", "done");
  await expect(page.locator('[data-step="verify_phone"]')).toHaveAttribute("data-state", "done");
  await expect(page.locator('[data-step="test_key"]')).toHaveAttribute("aria-current", "step");
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

  await expect(
    page
      .getByRole("alert")
      .filter({ hasText: "Those details don't match. Check your email or phone number and password." }),
  ).toBeVisible();
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

test("an email that already has a Pickriders account is sent to sign in, not refused", async ({ page }) => {
  await signUp(page, { ...newPerson(), email: "ada@acme.test" });

  await expect(page.getByRole("heading", { name: "You already have a Pickriders account" })).toBeVisible();
  await expect(page.getByText("ada@acme.test", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Sign in instead" })).toHaveAttribute(
    "href",
    "/auth/login?email=ada%40acme.test&from=signup",
  );

  await page.getByRole("link", { name: "Sign in instead" }).click();
  await expect(page.getByText("You already have a Pickriders account.")).toBeVisible();
  await expect(page.getByLabel("Email or phone number")).toHaveValue("ada@acme.test");
  await expect(page.getByLabel("Password", { exact: true })).toBeFocused();
});

test("a taken phone number offers to sign in with it, or go back and change it", async ({ page }) => {
  const person = newPerson();
  // Ada's number, from the mock's seed.
  await signUp(page, { ...person, phone: "8031234567" });

  await expect(page.getByRole("heading", { name: "You already have a Pickriders account" })).toBeVisible();
  await expect(page.getByText("+234 803 123 4567")).toBeVisible();

  // Back to the form as it was, at the phone number.
  await page.getByRole("button", { name: "Use a different phone number" }).click();
  await expect(page.getByLabel(/Phone number/)).toBeFocused();
  await expect(page.getByLabel("First name")).toHaveValue(person.firstname);
  await page.getByLabel(/Phone number/).fill("8039876543");
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page).toHaveURL(/\/auth\/verify/);
});

test("links an existing Pickriders account in one step, then confirms the email", async ({ page, request }) => {
  // Chioma, the seeded app customer, starts unlinked.
  await request.post(`${MOCK_API}/__test/reset`);
  await page.goto("/auth/login");
  await page.getByLabel("Email or phone number").fill("chioma@acme.test");
  await page.getByLabel("Password", { exact: true }).fill("customer-pass-1");
  await page.getByRole("button", { name: "Sign in" }).click();

  // What it is, whose it is, and what changes, before anything does.
  await expect(page.getByRole("heading", { name: "Welcome back, Chioma" })).toBeVisible();
  const account = page.getByRole("region", { name: "Your Pickriders account" });
  await expect(account).toContainText("Chioma Eze");
  await expect(account).toContainText("chioma@acme.test");
  await expect(account).toContainText("+234 803 555 1212");
  await expect(account).toContainText("Member since March 2024");
  for (const title of ["What stays the same", "What's new", "Good to know"]) {
    await expect(page.getByRole("heading", { name: title })).toBeVisible();
  }
  await expect(page.getByText("One account, one password:")).toBeVisible();

  await expect(page.getByLabel("Name your team")).toHaveValue("Chioma's team");
  await page.getByLabel("Name your team").fill("Eze Logistics");
  await page.getByRole("button", { name: "Link account and continue" }).click();

  // The email isn't confirmed yet, so the usual next step: its code.
  await expect(page).toHaveURL(/\/auth\/verify/);
});

test("signs in with a phone number, and Not now leaves the account as it was", async ({ page, request }) => {
  // Chioma, the seeded app customer, starts unlinked.
  await request.post(`${MOCK_API}/__test/reset`);
  await page.goto("/auth/login");
  await page.getByLabel("Email or phone number").fill("0803 555 1212");
  await page.getByLabel("Password", { exact: true }).fill("customer-pass-1");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page.getByRole("heading", { name: "Welcome back, Chioma" })).toBeVisible();
  await page.getByRole("button", { name: "Not now" }).click();

  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
  await expect(page.getByLabel("Email or phone number")).toHaveValue("0803 555 1212");
  await expect(page.getByLabel("Password", { exact: true })).toHaveValue("");
});

test("says what's wrong with something that is neither an email nor a phone number", async ({ page }) => {
  await page.goto("/auth/login");
  await page.getByLabel("Email or phone number").fill("12345");
  await page.getByLabel("Password", { exact: true }).fill("whatever-1");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.locator("#email-error")).toHaveText(/valid email, or a Nigerian phone number/);
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
  await expect(page.getByLabel("Your team").getByText("Acme Logistics")).toBeVisible();
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

test("sign-up links to the developer platform's legal pages, open to anyone, marked as drafts until approved", async ({
  page,
}) => {
  await page.goto("/auth/signup");
  const terms = page.getByRole("link", { name: "API Terms of Use" });
  await expect(terms).toHaveAttribute("href", "/legal/terms");
  for (const name of ["Data Processing Agreement", "Acceptable Use Policy", "Privacy Notice"]) {
    await expect(page.getByRole("link", { name })).toBeVisible();
  }
  // Signed out, the pages open (no sign-in redirect), each with its title and the draft notice.
  for (const [path, title] of [
    ["/legal/terms", "API Terms of Use"],
    ["/legal/acceptable-use", "Acceptable Use Policy"],
    ["/legal/privacy", "Privacy Notice"],
    ["/legal/dpa", "Data Processing Agreement"],
  ]) {
    await page.goto(path);
    await expect(page).toHaveURL(path);
    await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
    await expect(page.locator("[data-legal-draft]")).toBeVisible();
  }
  await page.goto("/legal/nope");
  await expect(page.getByRole("heading", { level: 1 })).not.toHaveText("API Terms of Use");
});
