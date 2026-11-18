// @file lib/pickriders.ts
import "server-only"; // a build error if a Client Component ever imports this
import Pickriders from "pickriders";

export const pickriders = new Pickriders({ serviceArea: "NG-LA" });
