import * as React from "react";

import { cn } from "@/lib/utils";

/** The top of every page: one title, one sentence on what the page is for, the page's actions. */
export function PageHeader({
  title,
  description,
  actions,
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("flex flex-wrap items-end justify-between gap-4 pb-6", className)}>
      <div className="min-w-0 space-y-1">
        <h1 className="text-2xl font-semibold text-fg">{title}</h1>
        {description && <p className="max-w-2xl text-base text-fg-muted">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  );
}
