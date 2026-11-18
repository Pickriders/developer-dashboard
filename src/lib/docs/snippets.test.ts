import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";

import { SNIPPETS_DIR, parseSnippet, readSnippet } from "./snippets";

const CONTENT_DIR = path.join(process.cwd(), "src/app/docs/_content");

/** Every `<Snippet path="…">` (and its `tabs` values) in the docs pages, with its part if named. */
function referencedSnippets(): { path: string; part?: string }[] {
  const found: { path: string; part?: string }[] = [];
  for (const file of readdirSync(CONTENT_DIR, { recursive: true }) as string[]) {
    if (!/\.tsx$/.test(file)) continue;
    const source = readFileSync(path.join(CONTENT_DIR, file), "utf8");
    for (const m of Array.from(source.matchAll(/<Snippet\b([\s\S]*?)\/>/g))) {
      const attrs = m[1];
      const p = attrs.match(/\bpath="([^"]+)"/)?.[1];
      const part = attrs.match(/\bpart="([^"]+)"/)?.[1];
      if (p) found.push({ path: p, part });
      for (const t of Array.from(attrs.matchAll(/:\s*"([^"]+\.(?:tsx?|vue|svelte|html|sh|json))"/g))) {
        found.push({ path: t[1] });
      }
    }
  }
  return found;
}

describe("SDK examples in the docs", () => {
  it("all compile against the published pickriders package (and React, Next.js)", () => {
    const configPath = path.join(SNIPPETS_DIR, "tsconfig.json");
    const config = ts.readConfigFile(configPath, ts.sys.readFile);
    const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, SNIPPETS_DIR);
    const program = ts.createProgram(parsed.fileNames, parsed.options);
    const problems = ts.getPreEmitDiagnostics(program).map((d) => {
      const where = d.file
        ? `${path.relative(SNIPPETS_DIR, d.file.fileName)}:${d.file.getLineAndCharacterOfPosition(d.start ?? 0).line + 1}`
        : "";
      return `${where} ${ts.flattenDiagnosticMessageText(d.messageText, "\n")}`;
    });
    expect(parsed.fileNames.length).toBeGreaterThan(20);
    expect(problems).toEqual([]);
  }, 120_000);

  it("are all files that exist, with the parts the pages ask for", () => {
    const refs = referencedSnippets();
    expect(refs.length).toBeGreaterThan(20);
    for (const ref of refs) expect(() => readSnippet(ref.path, ref.part)).not.toThrow();
  });
});

describe("parseSnippet", () => {
  const source = [
    "// @file app/route.ts",
    'import { a } from "a";',
    "// @hide-start",
    "declare const secret: string;",
    "// @hide-end",
    "// @show-start setup",
    "export const one = 1;",
    "// @show-end",
    "// @show-start later",
    "  export const two = 2;",
    "// @show-end",
  ].join("\n");

  it("names the file, drops hidden lines and markers", () => {
    expect(parseSnippet(source, "x/y.ts")).toEqual({
      file: "app/route.ts",
      lang: "javascript",
      code: 'import { a } from "a";\nexport const one = 1;\n  export const two = 2;',
    });
  });

  it("shows one named part, dedented, and refuses a part that isn't there", () => {
    expect(parseSnippet(source, "x/y.ts", "later").code).toBe("export const two = 2;");
    expect(() => parseSnippet(source, "x/y.ts", "nope")).toThrow('no part "nope"');
  });

  it("names tutorial files by their path in the app, and HTML or Vue files by an @file comment", () => {
    expect(parseSnippet("const x = 1;", "food-delivery/lib/store.ts").file).toBe("lib/store.ts");
    expect(parseSnippet("<!-- @file components/A.vue -->\n<template/>", "v/A.vue")).toMatchObject({
      file: "components/A.vue",
      code: "<template/>",
    });
  });
});
