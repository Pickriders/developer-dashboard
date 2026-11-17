import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A small trend line for a metric card: the shape, not the numbers (the card says those), so it
 * is hidden from screen readers. Flat at the bottom when everything is zero.
 */
export function Sparkline({ values, className }: { values: number[]; className?: string }) {
  const id = React.useId();
  if (values.length < 2) return null;
  const max = Math.max(...values, 1);
  const step = 100 / (values.length - 1);
  const points = values.map((v, i) => `${(i * step).toFixed(2)},${(30 - (v / max) * 26).toFixed(2)}`);
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 32"
      preserveAspectRatio="none"
      className={cn("h-10 w-full overflow-visible text-brand", className)}
    >
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,32 ${points.join(" ")} 100,32`} fill={`url(#${id})`} />
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
