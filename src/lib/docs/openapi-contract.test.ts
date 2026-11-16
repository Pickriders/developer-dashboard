import { readFileSync } from "node:fs";

import { report } from "./openapi-diff";
import { type OpenApi, SPEC } from "./openapi";

/**
 * CI's contract check (step 12.2): the API document backend-api serves now, against the one these
 * docs were built from (openapi.json). A breaking change fails with what broke. Runs only when CI
 * has downloaded the live document into OPENAPI_NEXT.
 */
const next = process.env.OPENAPI_NEXT;

(next ? describe : describe.skip)("the live Developer API document", () => {
  it("has no breaking changes against the published reference", () => {
    const live = JSON.parse(readFileSync(next!, "utf8")) as OpenApi;
    const problems = report(SPEC, live);
    if (problems) throw new Error(problems);
  });
});
