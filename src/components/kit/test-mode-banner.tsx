import * as React from "react";
import { FlaskConical } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Always on screen in test mode (CLAUDE.md §2): an amber bar across the top of every page, so nobody
 * mistakes play money for real money, or the other way round.
 */
export function TestModeBanner({ action, className }: { action?: React.ReactNode; className?: string }) {
  return (
    <div
      role="status"
      aria-label="Test mode"
      className={cn(
        "flex h-8 items-center justify-center gap-2.5 border-b border-warning-line bg-warning-subtle px-4 text-xs font-medium text-warning-fg",
        className,
      )}
    >
      <span className="inline-flex items-center gap-1 rounded-full bg-warning-fg px-2 py-px text-[10px] font-extrabold uppercase tracking-[0.12em] text-fg-inverse">
        <FlaskConical className="size-3" aria-hidden />
        Test mode
      </span>
      <span className="truncate">
        <span className="hidden sm:inline">You&apos;re looking at test data. </span>Nothing here moves real money or
        riders.
      </span>
      {action}
    </div>
  );
}
