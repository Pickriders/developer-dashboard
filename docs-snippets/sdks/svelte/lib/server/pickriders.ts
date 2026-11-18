// @file src/lib/server/pickriders.ts
import Pickriders from "pickriders";

// $lib/server is never sent to the browser: SvelteKit refuses to build if a page imports it.
export const pickriders = new Pickriders({ serviceArea: "NG-LA" });
