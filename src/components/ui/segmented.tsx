"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/** The storefront's pill switch for two to four exclusive choices. A radio group to assistive tech. */
export function Segmented<T extends string>({
  value,
  onChange,
  options,
  label,
  size = "md",
  className,
}: {
  value: T;
  onChange: (next: T) => void;
  options: readonly { value: T; label: string }[];
  /** What the choice is about, for screen readers ("Orders access"). */
  label: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const at = options.findIndex((o) => o.value === value);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const move = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!move) return;
    e.preventDefault();
    const next = (at + move + options.length) % options.length;
    onChange(options[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={cn("inline-flex items-center gap-0.5 rounded-xl border border-line bg-surface-subtle p-1", className)}
    >
      {options.map((option, i) => {
        const checked = option.value === value;
        return (
          <button
            key={option.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            onClick={() => onChange(option.value)}
            className={cn(
              "focus-ring rounded-lg font-bold transition-all duration-150",
              size === "sm" ? "h-7 px-2.5 text-xs" : "h-8 px-3 text-sm",
              checked ? "bg-surface text-fg shadow-button" : "text-fg-muted hover:text-fg",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
