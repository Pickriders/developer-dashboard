import * as React from "react";

import { cn } from "@/lib/utils";

/** A keyboard key, for shortcuts shown in menus and tooltips. */
export function Kbd({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-sm border border-line bg-surface-subtle px-1 font-sans text-2xs font-medium text-fg-muted",
        className,
      )}
      {...props}
    />
  );
}
