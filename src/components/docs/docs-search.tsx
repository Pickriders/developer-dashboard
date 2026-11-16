"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CornerDownLeft, FileText, Search } from "lucide-react";

import { Kbd } from "@/components/kit/kbd";
import { Modal } from "@/components/ui/modal";
import { DOC_PAGES, docHref, searchDocs } from "@/lib/docs/pages";
import { cn } from "@/lib/utils";

/**
 * Search the docs: the button in the header, or press / or ⌘K anywhere. Results update as you
 * type; arrows move, Enter opens. With nothing typed it suggests where to begin.
 */
export function DocsSearch({
  className,
  shortcuts = false,
}: {
  className?: string;
  /** Listen for / and ⌘K. One search on the page does, or both would open. */
  shortcuts?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [session, setSession] = React.useState(0);

  React.useEffect(() => {
    if (!shortcuts) return;
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest?.("input, textarea, [contenteditable=true]");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setSession((s) => s + 1);
        setOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [shortcuts]);

  return (
    <>
      <button
        type="button"
        aria-label="Search the docs"
        aria-keyshortcuts={shortcuts ? "/ Meta+K Control+K" : undefined}
        onClick={() => {
          setSession((s) => s + 1);
          setOpen(true);
        }}
        className={cn(
          "focus-ring flex h-10 items-center gap-2 rounded-xl border border-line bg-surface px-3 text-sm text-fg-subtle shadow-button transition-colors hover:border-line-strong hover:text-fg",
          className,
        )}
      >
        <Search className="size-4 shrink-0" aria-hidden />
        <span className="flex-1 text-left">Search the docs</span>
        <Kbd className="hidden sm:inline-flex">/</Kbd>
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Search the docs">
        {open && <SearchBody key={session} onDone={() => setOpen(false)} />}
      </Modal>
    </>
  );
}

const SUGGESTED = ["quickstart", "test-and-live", "webhooks", "errors"];

function SearchBody({ onDone }: { onDone: () => void }) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  // The dialog focuses its first button as it opens; the field is where typing should go.
  React.useEffect(() => {
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, []);
  const results = query.trim() ? searchDocs(query) : SUGGESTED.map((slug) => DOC_PAGES.find((p) => p.slug === slug)!);
  const listId = React.useId();

  const go = (slug: string) => {
    onDone();
    router.push(docHref(slug));
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-fg-subtle"
          aria-hidden
        />
        <input
          ref={inputRef}
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((i) => Math.min(results.length - 1, i + 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((i) => Math.max(0, i - 1));
            } else if (e.key === "Enter" && results[active]) {
              e.preventDefault();
              go(results[active].slug);
            }
          }}
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
          aria-label="Search the docs"
          placeholder="Try “webhooks”, “test key” or “404”"
          className="h-12 w-full rounded-xl border border-line-strong bg-surface pl-10 pr-3 text-[16px] text-fg placeholder:text-fg-subtle focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15"
        />
      </div>
      <p className="px-1 text-xs font-semibold uppercase tracking-wide text-fg-subtle" aria-live="polite">
        {query.trim() ? (results.length ? `${results.length} found` : "Nothing found") : "Good places to start"}
      </p>
      <ul id={listId} role="listbox" aria-label="Results" className="max-h-[50vh] space-y-1 overflow-y-auto">
        {results.map((page, i) => (
          <li
            key={page.slug}
            id={`${listId}-${i}`}
            role="option"
            aria-selected={i === active}
            onMouseEnter={() => setActive(i)}
            onClick={() => go(page.slug)}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-xl px-3 py-2.5",
              i === active ? "bg-brand-subtle" : "hover:bg-surface-subtle",
            )}
          >
            <FileText
              className={cn("mt-0.5 size-4 shrink-0", i === active ? "text-brand-fg" : "text-fg-subtle")}
              aria-hidden
            />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-bold text-fg-heading">{page.title}</span>
              <span className="block text-sm leading-5 text-fg-muted">{page.description}</span>
            </span>
            {i === active && <CornerDownLeft className="mt-1 size-4 shrink-0 text-brand-fg" aria-hidden />}
          </li>
        ))}
      </ul>
      {query.trim() && !results.length && (
        <p className="px-1 text-sm text-fg-muted">
          Try a shorter word, like “order” or “key”. Error codes work too, like “quote_expired”.
        </p>
      )}
    </div>
  );
}
