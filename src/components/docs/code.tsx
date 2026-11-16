"use client";

import * as React from "react";

import { CopyButton } from "@/components/kit/copy-button";
import { highlight, type Lang, type TokenType } from "@/lib/docs/highlight";
import { cn } from "@/lib/utils";

export type CodeTab = { label: string; lang: Lang; code: string };

const COLOURS: Record<TokenType, string> = {
  plain: "",
  comment: "text-white/45 italic",
  string: "text-[var(--code-string)]",
  number: "text-[var(--code-number)]",
  keyword: "text-[var(--code-keyword)]",
  key: "text-[var(--code-key)]",
  variable: "text-[var(--code-variable)]",
};

/** The language a reader picked last (curl, Node…), shared by every tabbed block on every page. */
const STORE_KEY = "pr-docs-lang";
const listeners = new Set<() => void>();
const readChoice = () => {
  try {
    return localStorage.getItem(STORE_KEY);
  } catch {
    return null;
  }
};
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  window.addEventListener("storage", fn);
  return () => {
    listeners.delete(fn);
    window.removeEventListener("storage", fn);
  };
};
const choose = (label: string) => {
  try {
    localStorage.setItem(STORE_KEY, label);
  } catch {
    // Private mode: the choice lasts for this page only.
  }
  listeners.forEach((fn) => fn());
};

/**
 * An example to copy. One tab, or several (curl, Node, Python, PHP): picking one switches every
 * block to it, and it's remembered. Dark in both themes, like a terminal.
 */
export function Code({
  tabs,
  title,
  className,
}: {
  tabs: CodeTab[];
  /** What it is, when there's one tab ("Response", "Your server"). */
  title?: string;
  className?: string;
}) {
  const choice = React.useSyncExternalStore(subscribe, readChoice, () => null);
  const index = Math.max(
    0,
    tabs.findIndex((t) => t.label === choice),
  );
  const active = tabs[index];
  const id = React.useId();

  return (
    <div
      className={cn(
        "my-5 overflow-hidden rounded-xl border border-plum/40 bg-plum text-[#ece9f5] shadow-card",
        className,
      )}
    >
      <div className="flex h-10 items-center justify-between gap-2 border-b border-white/10 pl-2 pr-1.5">
        {tabs.length > 1 ? (
          <div role="tablist" aria-label="Language" className="flex min-w-0 gap-0.5 overflow-x-auto">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                type="button"
                role="tab"
                id={`${id}-tab-${i}`}
                aria-selected={i === index}
                aria-controls={`${id}-panel`}
                onClick={() => choose(tab.label)}
                className={cn(
                  "focus-ring shrink-0 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors",
                  i === index ? "bg-white/10 text-white" : "text-white/55 hover:text-white",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        ) : (
          <span className="pl-2 text-xs font-medium text-white/55">{title ?? active.label}</span>
        )}
        <CopyButton
          value={active.code}
          label={`Copy ${active.label} example`}
          className="shrink-0 text-white/55 hover:bg-white/10 hover:text-white"
        />
      </div>
      <pre
        id={`${id}-panel`}
        role={tabs.length > 1 ? "tabpanel" : undefined}
        aria-labelledby={tabs.length > 1 ? `${id}-tab-${index}` : undefined}
        tabIndex={0}
        className="focus-ring overflow-x-auto p-4 font-mono text-[13px] leading-6"
      >
        <code>
          {highlight(active.code, active.lang).map((token, i) =>
            token.type === "plain" ? (
              <React.Fragment key={i}>{token.text}</React.Fragment>
            ) : (
              <span key={i} className={COLOURS[token.type]}>
                {token.text}
              </span>
            ),
          )}
        </code>
      </pre>
    </div>
  );
}
