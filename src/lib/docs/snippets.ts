import { readFileSync } from "node:fs";
import path from "node:path";

import type { Lang } from "./highlight";

/**
 * SDK examples are real files under docs-snippets/, type-checked against the published `pickriders`
 * package (snippets.test.ts), and read here when the docs are built. In a file:
 *
 * - `@file <path>` on the first line names it for the reader ("app/api/webhooks/route.ts").
 *   Files of the tutorial app (docs-snippets/food-delivery/) are named by their path already.
 * - Lines between `@hide-start` and `@hide-end` are compiled but not shown (stand-ins for the
 *   reader's own code, like their database).
 * - `@show-start <name>` … `@show-end` marks a named part. Ask for it by name to show only that part,
 *   an excerpt of a bigger file (the tutorial grows a file across pages this way). Without a name,
 *   the whole file is shown.
 */
export const SNIPPETS_DIR = path.join(process.cwd(), "docs-snippets");

export type Snippet = { file: string; lang: Lang; code: string };

const LANGS: Record<string, Lang> = {
  ts: "javascript",
  tsx: "javascript",
  js: "javascript",
  mjs: "javascript",
  vue: "javascript",
  svelte: "javascript",
  html: "javascript",
  sh: "bash",
  env: "bash",
  json: "json",
};

export function parseSnippet(source: string, relativePath: string, part?: string): Snippet {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  let file = relativePath.startsWith("food-delivery/") ? relativePath.slice("food-delivery/".length) : "";
  const fileLine = lines[0]?.match(/@file\s+(.+?)\s*(?:-->|\*\/)?$/);
  if (fileLine) file = fileLine[1];

  const shown: string[] = [];
  let hiding = false;
  let inPart: string | null = null;
  let found = false;
  for (const line of lines) {
    const [, marker, name] = line.match(/@(file|hide-start|hide-end|show-start|show-end)\b\s*([\w-]*)/) ?? [];
    if (marker === "file") continue;
    if (marker === "hide-start") hiding = true;
    else if (marker === "hide-end") hiding = false;
    else if (marker === "show-start") inPart = name || "";
    else if (marker === "show-end") inPart = null;
    else if (!hiding && (part === undefined || inPart === part)) {
      if (part !== undefined) found = true;
      shown.push(line);
    }
  }
  if (part !== undefined && !found) throw new Error(`${relativePath} has no part "${part}"`);

  const ext = (file || relativePath).split(".").pop() ?? "";
  return { file: file || relativePath, lang: LANGS[ext] ?? "text", code: tidy(shown) };
}

/** Drops blank lines at either end and the indent every line shares. */
function tidy(lines: string[]): string {
  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
  const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)![0].length));
  return lines.map((l) => l.slice(Number.isFinite(indent) ? indent : 0)).join("\n");
}

/** A snippet by its path under docs-snippets/, e.g. "sdks/nextjs/webhook-route.ts". Build time only. */
export function readSnippet(relativePath: string, part?: string): Snippet {
  return parseSnippet(readFileSync(path.join(SNIPPETS_DIR, relativePath), "utf8"), relativePath, part);
}
