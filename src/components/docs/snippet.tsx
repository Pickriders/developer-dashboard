import { Code } from "./code";
import { readSnippet } from "@/lib/docs/snippets";

/**
 * An SDK example from docs-snippets/, titled with the file it belongs in. Read when the page is
 * built, so it's always the type-checked version. Several paths make tabs (React, Vue, Svelte…).
 */
export function Snippet({
  path,
  part,
  tabs,
  title,
}: {
  /** Under docs-snippets/, e.g. "sdks/node/express-webhooks.ts". */
  path?: string;
  /** Only this `@show-start <part>` of the file. */
  part?: string;
  /** Several snippets as tabs, by label. */
  tabs?: Record<string, string>;
  title?: string;
}) {
  if (tabs) {
    return (
      <Code
        tabs={Object.entries(tabs).map(([label, p]) => {
          const s = readSnippet(p);
          return { label, lang: s.lang, code: s.code };
        })}
      />
    );
  }
  const s = readSnippet(path!, part);
  return <Code title={title ?? s.file} tabs={[{ label: s.file || "Example", lang: s.lang, code: s.code }]} />;
}
