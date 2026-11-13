import { expect, test, type Page } from "@playwright/test";

import { ADA, MOCK_API, signIn } from "./helpers";

/**
 * Step 11.13's bar on every signed-in page, in both themes, on a phone and a laptop: nothing scrolls
 * sideways, there's one h1, every control has a name a screen reader can say, every field has a
 * label, and ids are unique (labels and aria references point at the right thing).
 */
const PAGES = ["/", "/usage", "/orders", "/orders/new", "/wallet", "/keys", "/webhooks", "/logs", "/team", "/settings"];

async function audit(page: Page) {
  return page.evaluate(() => {
    const problems: string[] = [];
    const visible = (el: Element) => {
      const box = (el as HTMLElement).getBoundingClientRect();
      const style = getComputedStyle(el);
      return box.width > 0 && box.height > 0 && style.visibility !== "hidden" && !el.closest("[aria-hidden=true]");
    };
    const describe = (el: Element) =>
      `<${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""} class="${(el.getAttribute("class") ?? "").slice(0, 60)}">`;
    const textOf = (el: Element): string =>
      Array.from(el.childNodes)
        .map((n) =>
          n.nodeType === Node.TEXT_NODE
            ? n.textContent
            : n instanceof Element && n.getAttribute("aria-hidden") !== "true" && !(n instanceof SVGElement)
              ? (n.getAttribute("aria-label") ?? n.getAttribute("alt") ?? textOf(n))
              : "",
        )
        .join("")
        .trim();
    const labelled = (el: Element) => {
      const by = el.getAttribute("aria-labelledby");
      if (by && by.split(" ").some((id) => document.getElementById(id)?.textContent?.trim())) return true;
      if (el.getAttribute("aria-label")?.trim() || el.getAttribute("title")?.trim()) return true;
      if (el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`)) return true;
      if (el.closest("label")) return true;
      return false;
    };

    for (const el of Array.from(
      document.querySelectorAll(
        "button, a[href], [role=button], [role=link], [role=menuitem], [role=radio], [role=tab], [role=switch]",
      ),
    )) {
      if (!visible(el)) continue;
      if (!textOf(el) && !labelled(el)) problems.push(`control without a name: ${describe(el)}`);
    }
    for (const el of Array.from(document.querySelectorAll("input:not([type=hidden]), select, textarea"))) {
      if (!visible(el) && !(el as HTMLElement).matches("input[autocomplete=one-time-code]")) continue;
      if (!labelled(el)) problems.push(`field without a label: ${describe(el)}`);
    }
    for (const img of Array.from(document.querySelectorAll("img"))) {
      if (!img.hasAttribute("alt")) problems.push(`image without alt: ${img.src.slice(-40)}`);
    }
    const h1 = Array.from(document.querySelectorAll("h1")).filter(visible);
    if (h1.length !== 1) problems.push(`${h1.length} visible h1s`);
    const ids = new Map<string, number>();
    for (const el of Array.from(document.querySelectorAll("[id]"))) ids.set(el.id, (ids.get(el.id) ?? 0) + 1);
    for (const [id, n] of Array.from(ids)) if (n > 1) problems.push(`id "${id}" used ${n} times`);
    const overflow = document.documentElement.scrollWidth - window.innerWidth;
    if (overflow > 0) problems.push(`scrolls sideways by ${overflow}px`);
    return problems;
  });
}

for (const [device, viewport] of [
  ["phone", { width: 375, height: 812 }],
  ["laptop", { width: 1280, height: 800 }],
] as const) {
  for (const scheme of ["light", "dark"] as const) {
    test(`every page passes on a ${device} in ${scheme} mode`, async ({ browser, request }) => {
      await request.post(`${MOCK_API}/__test/reset`);
      await request.post(`${MOCK_API}/__test/requests?email=${ADA.email}&n=5`);
      const context = await browser.newContext({ viewport, colorScheme: scheme });
      const page = await context.newPage();
      await signIn(page);
      const found: string[] = [];
      for (const path of PAGES) {
        await page.goto(path);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        await page.waitForLoadState("networkidle");
        for (const problem of await audit(page)) found.push(`${path}: ${problem}`);
      }
      await context.close();
      expect(found, found.join("\n")).toEqual([]);
    });
  }
}

test("a skip link jumps past the navigation", async ({ page }) => {
  await signIn(page);
  await page.goto("/settings");
  await expect(page.getByLabel("First name")).toBeEditable();
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  // The first stop inside the page, not the sidebar.
  await expect(page.getByLabel("First name")).toBeFocused();
});

/** When its data can't load, each page says so (with the request id) instead of going blank. */
for (const [path, route] of [
  ["/", "GET /account"],
  ["/usage", "GET /usage"],
  ["/orders", "GET /orders"],
  ["/wallet", "GET /wallet"],
  ["/keys", "GET /api-keys"],
  ["/webhooks", "GET /webhook-endpoints"],
  ["/logs", "GET /request-logs"],
  ["/team", "GET /team/members"],
  ["/settings", "GET /account"],
] as const) {
  test(`${path} shows an error when ${route} fails`, async ({ page, request }) => {
    await request.post(`${MOCK_API}/__test/reset`);
    await signIn(page);
    await request.post(`${MOCK_API}/__test/fail?route=${encodeURIComponent(route)}`);
    await page.goto(path);
    await expect(page.getByText("Something went wrong on our side").first()).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText(/req_\w+/).first()).toBeVisible();
  });
}
