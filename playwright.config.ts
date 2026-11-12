import { defineConfig, devices } from "@playwright/test";

/**
 * End-to-end tests for whole flows (CLAUDE.md §7). They run the real app — middleware, the
 * /api/backend proxy and the session cookie — against e2e/mock-api.mjs, a stand-in for
 * backend-api's dashboard routes, so they need no database and can read the codes it "sends".
 *
 *   yarn e2e        # starts both servers, runs headless
 *   yarn e2e --ui   # watch it
 */
const APP_PORT = 3107;
const MOCK_PORT = 4010;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  use: {
    baseURL: `http://localhost:${APP_PORT}`,
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    {
      command: "node e2e/mock-api.mjs",
      port: MOCK_PORT,
      env: { MOCK_API_PORT: String(MOCK_PORT), MOCK_API_LATENCY_MS: "50" },
      reuseExistingServer: !process.env.CI,
    },
    {
      // CI tests a production build; locally the dev server is quicker to start.
      command: process.env.CI ? `yarn build && npx next start --port ${APP_PORT}` : `npx next dev --port ${APP_PORT}`,
      port: APP_PORT,
      env: { NEXT_PUBLIC_API_URL: `http://127.0.0.1:${MOCK_PORT}` },
      timeout: 180_000,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
