import { expect, type APIRequestContext, type Page } from "@playwright/test";

export const MOCK_API = "http://127.0.0.1:4010";

/** A fresh identity per test, so tests don't collide in the mock's memory. */
export function newPerson() {
  const id = Math.random().toString(36).slice(2, 8);
  const phone = `80${String(Math.floor(Math.random() * 1e8)).padStart(8, "0")}`;
  return { firstname: "Chidi", lastname: "Eze", email: `chidi.${id}@acme.test`, phone, stored: `234${phone}` };
}

/** The last code the mock API "sent" to an email or phone ("234…"). */
export async function lastCode(request: APIRequestContext, to: string) {
  const res = await request.get(`${MOCK_API}/__test/code?to=${encodeURIComponent(to)}`);
  const { code } = await res.json();
  expect(code, `a code sent to ${to}`).toMatch(/^\d{4}$/);
  return code as string;
}

export const wrongCode = (code: string) => (code === "0000" ? "1111" : "0000");

export async function signUp(page: Page, person: ReturnType<typeof newPerson>, password = "lagos ferry at dawn") {
  await page.goto("/auth/signup");
  await page.getByLabel("First name").fill(person.firstname);
  await page.getByLabel("Last name").fill(person.lastname);
  await page.getByLabel("Work email").fill(person.email);
  await page.getByLabel(/Phone number/).fill(person.phone);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Create account" }).click();
}
