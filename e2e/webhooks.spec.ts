import { createHmac } from "node:crypto";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";

import { expect, test, type Page } from "@playwright/test";

import { ADA, MOCK_API, signIn } from "./helpers";

/** A stand-in for the developer's server: records what arrives and answers with `status`. */
async function startReceiver() {
  const received: { signature: string; body: string }[] = [];
  const state = { status: 200, reply: '{"received":true}' };
  const server = createServer((req, res) => {
    const chunks: Buffer[] = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      received.push({ signature: String(req.headers["pickriders-signature"]), body: Buffer.concat(chunks).toString() });
      res.writeHead(state.status, { "content-type": "text/plain" }).end(state.reply);
    });
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;
  return { url: `http://127.0.0.1:${port}/pickriders/webhooks`, received, state, close: () => server.close() };
}

/** What a receiver does: the header's v1 signatures include the HMAC of "t.body" with the secret. */
function signedWith(secret: string, { signature, body }: { signature: string; body: string }) {
  const parts = Object.fromEntries(signature.split(",").map((p) => p.split("=") as [string, string]));
  const expected = createHmac("sha256", secret).update(`${parts.t}.${body}`).digest("hex");
  return signature.split(",").includes(`v1=${expected}`);
}

let receiver: Awaited<ReturnType<typeof startReceiver>>;
test.beforeEach(async ({ request }) => {
  await request.post(`${MOCK_API}/__test/reset`);
  receiver = await startReceiver();
});
test.afterEach(() => receiver.close());

async function addEndpoint(page: Page, { events }: { events?: string[] } = {}) {
  await page.goto("/webhooks");
  await page.getByRole("button", { name: "Add endpoint" }).click();
  const dialog = page.getByRole("dialog", { name: /Add a (test|live) endpoint/ });
  await dialog.getByLabel("Endpoint URL").fill(receiver.url);
  if (events) {
    await dialog.getByRole("radio", { name: /Choose events/ }).click();
    for (const type of events) await dialog.getByRole("checkbox", { name: type, exact: true }).check();
  }
  await dialog.getByRole("button", { name: "Add endpoint" }).click();
  const added = page.getByRole("dialog", { name: "Endpoint added" });
  const secret = await added.locator("code").last().innerText();
  await added.getByRole("button", { name: "Done" }).click();
  await expect(page).toHaveURL(/\/webhooks\/we_/);
  return secret;
}

test("adds an endpoint from the checklist, and a test event arrives signed with the secret shown", async ({ page }) => {
  await signIn(page);
  await page.locator('[data-step="webhook"]').getByRole("button", { expanded: false }).click();
  await page.locator("#step-webhook").getByRole("link", { name: "Add endpoint" }).click();

  const dialog = page.getByRole("dialog", { name: "Add a test endpoint" });
  await dialog.getByRole("button", { name: "Add endpoint" }).click();
  await expect(dialog.getByText("Enter the URL to send events to.")).toBeVisible();
  await dialog.getByLabel("Endpoint URL").fill(receiver.url);
  await dialog.getByRole("button", { name: "Add endpoint" }).click();

  const added = page.getByRole("dialog", { name: "Endpoint added" });
  const secret = await added.locator("code").last().innerText();
  expect(secret).toMatch(/^whsec_/);
  await added.getByRole("button", { name: "Done" }).click();

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(receiver.url);
  await expect(page.getByText("No deliveries yet")).toBeVisible();
  await page.getByRole("button", { name: "Send test event" }).first().click();

  await expect(page.getByText(/Your endpoint answered 200 in \d+ ms/)).toBeVisible();
  const sheet = page.getByRole("dialog", { name: "ping" });
  await expect(sheet.getByText("Succeeded")).toBeVisible();
  await expect(sheet.getByText('"object": "ping"')).toBeVisible();
  await sheet.getByRole("button", { name: "Close" }).click();

  expect(receiver.received).toHaveLength(1);
  expect(signedWith(secret, receiver.received[0])).toBe(true);
  await expect(page.locator('[data-delivery="ping"]')).toContainText("200");

  await page.getByRole("link", { name: "Home", exact: true }).click();
  await expect(page.locator('[data-step="webhook"]')).toHaveAttribute("data-state", "done");
});

test("shows a failed delivery with what the server answered, and resends it once fixed", async ({ page, request }) => {
  await signIn(page);
  await addEndpoint(page, { events: ["order.delivered"] });

  receiver.state.status = 500;
  receiver.state.reply = "Database is down";
  await request.post(`${MOCK_API}/__test/event?email=${ADA.email}&type=order.delivered`);
  await request.post(`${MOCK_API}/__test/event?email=${ADA.email}&type=order.cancelled`); // not subscribed
  expect(receiver.received).toHaveLength(1);

  await page.reload();
  await expect(page.getByText(/Every delivery has failed since/)).toBeVisible();
  const failed = page.locator('[data-delivery="order.delivered"]');
  await expect(failed).toContainText("Retrying");
  await expect(failed).toContainText("500");
  await failed.click();

  const sheet = page.getByRole("dialog", { name: "order.delivered" });
  await expect(sheet.getByText("The endpoint answered 500.")).toBeVisible();
  await sheet.getByText("Show response body").click();
  await expect(sheet.getByText("Database is down")).toBeVisible();

  receiver.state.status = 200;
  await sheet.getByRole("button", { name: "Resend this event" }).click();
  await expect(page.getByText("Sent again.")).toBeVisible();
  await expect(page.locator('[data-delivery="order.delivered"]').first()).toContainText("Succeeded");
  await expect(page.locator('[data-delivery="order.delivered"]')).toHaveCount(2);
  await page.reload();
  await expect(page.getByText(/Every delivery has failed since/)).toHaveCount(0);
});

test("edits events, turns sending off and on, rolls the secret, and deletes the endpoint", async ({ page }) => {
  await signIn(page);
  const first = await addEndpoint(page);

  await page.getByRole("button", { name: "More actions" }).click();
  await page.getByRole("menuitem", { name: "Edit endpoint" }).click();
  const edit = page.getByRole("dialog", { name: "Edit endpoint" });
  await edit.getByRole("radio", { name: /Choose events/ }).click();
  await edit.getByRole("button", { name: "Save changes" }).click();
  await expect(edit.getByText("Choose at least one event.")).toBeVisible();
  await edit.getByRole("checkbox", { name: "All wallet events" }).check();
  await edit.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByText("Endpoint saved")).toBeVisible();
  const details = page.getByRole("region", { name: "Details" });
  await expect(details.getByText("wallet.funded")).toBeVisible();
  await expect(details.getByText("wallet.balance_low")).toBeVisible();

  await page.getByRole("switch", { name: "Sending events" }).click();
  await expect(page.getByText("Turned off. No events go here.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Send test event" }).first()).toBeDisabled();
  await page.getByRole("switch", { name: "Sending events" }).click();
  await expect(page.getByRole("button", { name: "Send test event" }).first()).toBeEnabled();

  await page.getByRole("button", { name: "More actions" }).click();
  await page.getByRole("menuitem", { name: "Roll signing secret" }).click();
  const roll = page.getByRole("dialog", { name: "Roll signing secret" });
  await roll.getByRole("button", { name: "Roll secret" }).click();
  const rolled = page.getByRole("dialog", { name: "Secret rolled" });
  const second = await rolled.locator("code").last().innerText();
  expect(second).not.toBe(first);
  await rolled.getByRole("button", { name: "Done" }).click();
  await expect(details.getByText(/The old one also signs events until/)).toBeVisible();

  // For a day, each event is signed with both secrets.
  await page.getByRole("button", { name: "Send test event" }).first().click();
  await expect(page.getByText(/Your endpoint answered 200/)).toBeVisible();
  const last = receiver.received[receiver.received.length - 1];
  expect(signedWith(first, last) && signedWith(second, last)).toBe(true);
  await page.keyboard.press("Escape");

  await page.getByRole("button", { name: "More actions" }).click();
  await page.getByRole("menuitem", { name: "Delete endpoint" }).click();
  await page
    .getByRole("dialog", { name: "Delete this endpoint?" })
    .getByRole("button", { name: "Delete endpoint" })
    .click();
  await expect(page).toHaveURL("/webhooks");
  await expect(page.getByText("No test endpoints yet")).toBeVisible();
});

test("keeps test and live endpoints apart, and a Viewer can only look", async ({ page, request }) => {
  await request.post(`${MOCK_API}/__test/team?email=${ADA.email}&liveStatus=APPROVED`);
  await signIn(page);
  await addEndpoint(page);

  // Switching mode on an endpoint goes back to the list, which has that mode's endpoints.
  await page.getByRole("radio", { name: "Live" }).click();
  await expect(page).toHaveURL("/webhooks");
  await expect(page.getByText("No live endpoints yet")).toBeVisible();
  await page.getByRole("radio", { name: "Test" }).click();
  await expect(page.locator(`[data-endpoint="${receiver.url}"]`)).toBeVisible();

  await request.post(`${MOCK_API}/__test/join?email=${ADA.email}&name=Globex&role=TEAM_VIEWER`);
  await page.reload();
  await page.getByRole("button", { name: /Switch team/ }).click();
  await page.getByRole("menuitem", { name: "Globex" }).click();
  await expect(page.getByText("Ask a developer or admin to add one.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Add endpoint" })).toHaveCount(0);
});

test("opening a live endpoint's link in test mode switches to live", async ({ page, request }) => {
  await request.post(`${MOCK_API}/__test/team?email=${ADA.email}&liveStatus=APPROVED`);
  await signIn(page);
  await page.goto("/webhooks");
  await page.getByRole("radio", { name: "Live" }).click();
  await addEndpoint(page);
  const link = page.url();

  await page.getByRole("radio", { name: "Test" }).click();
  await expect(page).toHaveURL("/webhooks");
  await page.goto(link);

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(receiver.url);
  await expect(page.getByRole("radio", { name: "Live" })).toHaveAttribute("aria-checked", "true");
  await expect(page.getByRole("status", { name: "Test mode" })).toBeHidden();
});
