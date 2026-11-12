import * as React from "react";

import { cn } from "@/lib/utils";

/** The Pickriders mark (a route between two stops) and the product name. */
export function Logo({ className, product = "Developers" }: { className?: string; product?: string | null }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-fg", className)}>
      <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
        <rect width="24" height="24" rx="6" className="fill-fg" />
        <path
          d="M7.5 16.5c0-3 2-4 4.5-4s4.5-1 4.5-4"
          className="stroke-fg-inverse"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="7.5" cy="16.5" r="1.8" className="fill-fg-inverse" />
        <circle cx="16.5" cy="8.5" r="1.8" fill="rgb(var(--brand))" />
      </svg>
      <span className="text-[15px] font-semibold tracking-tight">
        Pickriders{product && <span className="font-normal text-fg-muted"> {product}</span>}
      </span>
    </span>
  );
}
