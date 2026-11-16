import { runGuides } from "./sandbox";

/**
 * Step 12.5's CI check: every guide's code, sent to the sandbox with a test key. Runs when CI has a
 * PICKRIDERS_TEST_KEY secret (a test key for a team kept for this); skipped otherwise.
 */
const key = process.env.PICKRIDERS_TEST_KEY;
const base = process.env.PICKRIDERS_API_BASE ?? "https://pickriders-api-dev.onrender.com/developer/api/v1";

(key ? describe : describe.skip)("the guides, against the sandbox", () => {
  it("every request runs", async () => {
    if (!key!.startsWith("sk_test_")) throw new Error("PICKRIDERS_TEST_KEY must be a test key (sk_test_…).");
    const problems = await runGuides(base, key!);
    if (problems.length) throw new Error(problems.join("\n"));
  }, 180_000);
});
