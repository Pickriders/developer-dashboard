import * as React from "react";
import { FlaskConical } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Always on screen in test mode (CLAUDE.md §2): a slim amber bar across the top, so nobody
 * mistakes play money for real money, or the other way round.
 */
export function TestModeBanner({ action, className }: { action?: React.ReactNode; className?: string }) {
  return (
    <div
      role="status"
      className={cn(
        "flex h-8 items-center justify-center gap-2 border-b border-warning-line bg-warning-subtle px-4 text-xs font-medium text-warning-fg",
        className,
      )}
    >
      <FlaskConical className="size-3.5" aria-hidden />
      <span>Test mode: you&apos;re using test data. Nothing here moves real money or real riders.</span>
      {action}
    </div>
  );
}
