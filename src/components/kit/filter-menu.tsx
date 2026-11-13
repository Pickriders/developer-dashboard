"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { Menu, MenuItem } from "@/components/ui/menu";
import { cn } from "@/lib/utils";

/**
 * One filter: a pill that says what it's set to ("Method: POST"), opening the choices. "Any" (the
 * empty value) is first; a set filter is tinted so it stands out from the rest.
 */
export function FilterMenu<T extends string>({
  label,
  value,
  options,
  onChange,
  anyLabel = "Any",
}: {
  label: string;
  value: T | "";
  options: readonly { value: T; label: string }[];
  onChange: (value: T | "") => void;
  anyLabel?: string;
}) {
  const current = options.find((o) => o.value === value);
  const choices = [{ value: "" as const, label: anyLabel }, ...options];
  return (
    <Menu
      label={label}
      trigger={({ ref, open, ...props }) => (
        <button
          ref={ref}
          type="button"
          {...props}
          aria-label={`${label}: ${current?.label ?? anyLabel}`}
          className={cn(
            "focus-ring inline-flex h-9 items-center gap-1.5 rounded-xl border px-3 text-sm font-semibold transition-colors",
            current
              ? "border-brand-line bg-brand-subtle text-brand-fg"
              : "border-line bg-surface text-fg-muted shadow-button hover:border-line-strong hover:text-fg",
            open && "border-line-strong",
          )}
        >
          <span className={cn(current ? "text-brand-fg/80" : "text-fg-subtle")}>{label}</span>
          {current && <span>{current.label}</span>}
          <ChevronDown className="size-3.5 opacity-70" aria-hidden />
        </button>
      )}
    >
      {choices.map((o) => (
        <MenuItem
          key={o.value || "any"}
          selected={o.value === value}
          onSelect={() => onChange(o.value as T | "")}
          hint={o.value === value ? <Check className="size-4 text-brand-fg" aria-hidden /> : undefined}
        >
          {o.label}
        </MenuItem>
      ))}
    </Menu>
  );
}
