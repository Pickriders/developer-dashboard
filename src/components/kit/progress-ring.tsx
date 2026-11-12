import * as React from "react";

import { cn } from "@/lib/utils";

/** How far through something you are: a teal arc with "3/7" inside. */
export function ProgressRing({
  value,
  total,
  size = 56,
  className,
}: {
  value: number;
  total: number;
  size?: number;
  className?: string;
}) {
  const stroke = 5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const ratio = total ? Math.min(value / total, 1) : 0;
  return (
    <div
      role="img"
      aria-label={`${value} of ${total} done`}
      className={cn("relative grid shrink-0 place-items-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-surface-muted" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - ratio)}
          className="stroke-brand transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <span className="absolute text-sm font-extrabold tabular-nums text-fg-heading" aria-hidden>
        {value}
        <span className="text-fg-subtle">/{total}</span>
      </span>
    </div>
  );
}
