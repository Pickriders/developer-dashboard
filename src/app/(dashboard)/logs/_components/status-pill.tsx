import * as React from "react";

import { cn } from "@/lib/utils";

/** An HTTP status as a small pill: green 2xx, amber 4xx, red 5xx. The number is the label. */
export function StatusPill({ status, className }: { status: number; className?: string }) {
  const tone =
    status >= 500
      ? "bg-danger-subtle text-danger-fg ring-danger-line"
      : status >= 400
        ? "bg-warning-subtle text-warning-fg ring-warning-line"
        : "bg-success-subtle text-success-fg ring-success-line";
  return (
    <span
      className={cn(
        "inline-flex h-6 min-w-12 items-center justify-center rounded-md px-1.5 font-mono text-xs font-semibold tabular-nums ring-1 ring-inset",
        tone,
        className,
      )}
    >
      {status}
    </span>
  );
}

/** The path without the API's prefix: /orders/ord_… reads better than /developer/api/v1/orders/ord_…. */
export const shortPath = (path: string) => path.replace(/^\/developer\/api\/v\d+/, "") || "/";
