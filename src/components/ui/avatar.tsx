import * as React from "react";

import { cn } from "@/lib/utils";

/** Initials on a soft brand tile: people round with two letters, teams squared with one. */
export function Avatar({
  name,
  shape = "circle",
  size = 32,
  className,
}: {
  name: string;
  shape?: "circle" | "square";
  size?: number;
  className?: string;
}) {
  const initials =
    name
      .trim()
      .split(/\s+/)
      .slice(0, shape === "square" ? 1 : 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "?";
  return (
    <span
      aria-hidden
      style={{ width: size, height: size, fontSize: Math.round(size * 0.38) }}
      className={cn(
        "inline-grid shrink-0 select-none place-items-center bg-brand-subtle font-bold text-brand-fg",
        shape === "circle" ? "rounded-full" : "rounded-lg",
        className,
      )}
    >
      {initials}
    </span>
  );
}
