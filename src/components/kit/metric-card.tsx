import * as React from "react";
import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Minus } from "lucide-react";

import { Sparkline } from "./sparkline";
import { cn } from "@/lib/utils";

/**
 * A headline number on Home: what it is, the number, how it moved against the period before
 * (green when that's good, red when not; `invert` when down is good, like errors), a line of
 * context and an optional trend line. The whole card opens the page where it's explained.
 */
export function MetricCard({
  label,
  icon,
  value,
  delta,
  invert,
  comparedTo,
  hint,
  spark,
  href,
  action,
}: {
  label: string;
  icon: React.ReactNode;
  value: React.ReactNode;
  delta?: { value: string; direction: "up" | "down" | "flat" } | null;
  invert?: boolean;
  /** "vs yesterday": what the delta compares against. */
  comparedTo?: string;
  hint?: React.ReactNode;
  spark?: number[];
  href: string;
  /** Screen-reader and hover name of where the card goes, e.g. "Open the wallet". */
  action: string;
}) {
  const good = delta && delta.direction !== "flat" && (delta.direction === "up") !== !!invert;
  const Arrow = !delta || delta.direction === "flat" ? Minus : delta.direction === "up" ? ArrowUpRight : ArrowDownRight;
  return (
    <Link
      href={href}
      aria-label={`${label}: ${typeof value === "string" ? value : ""}. ${action}`}
      className="focus-ring group relative flex min-w-0 flex-col rounded-xl border border-line bg-surface p-5 shadow-card transition-colors hover:border-line-strong"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="flex min-w-0 items-center gap-2 text-sm font-semibold text-fg-muted">
          <span
            aria-hidden
            className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-subtle text-brand-fg [&_svg]:size-4"
          >
            {icon}
          </span>
          <span className="truncate">{label}</span>
        </p>
        <ArrowRight
          aria-hidden
          className="size-4 shrink-0 -translate-x-1 text-fg-subtle opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
        />
      </div>
      <p className="mt-3 truncate text-[1.75rem] font-extrabold leading-tight tracking-tight tabular-nums text-fg-heading">
        {value}
      </p>
      <p className="mt-1 flex min-h-5 flex-wrap items-center gap-x-1.5 text-xs text-fg-subtle">
        {delta && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-semibold tabular-nums",
              delta.direction === "flat" ? "text-fg-muted" : good ? "text-success-fg" : "text-danger-fg",
            )}
          >
            <Arrow className="size-3.5" aria-hidden />
            {delta.value}
          </span>
        )}
        {delta && comparedTo && <span>{comparedTo}</span>}
        {hint && (
          <span className="min-w-0 truncate">
            {delta ? "· " : ""}
            {hint}
          </span>
        )}
      </p>
      {spark && <Sparkline values={spark} className="mt-3" />}
    </Link>
  );
}
