import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A section of a page: a flat surface with a hairline, an optional header row (title, one line of
 * help, actions) and footer. Flush content (a table) sets `flush`.
 */
export function Panel({
  title,
  description,
  actions,
  footer,
  flush,
  className,
  children,
}: {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  flush?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={cn("overflow-hidden rounded-lg border border-line bg-surface", className)}>
      {(title || actions) && (
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-3.5">
          <div className="min-w-0 space-y-0.5">
            {title && <h2 className="text-base font-semibold text-fg">{title}</h2>}
            {description && <p className="text-sm text-fg-muted">{description}</p>}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className={cn(!flush && "p-5")}>{children}</div>
      {footer && (
        <div className="flex items-center justify-between gap-3 border-t border-line bg-surface-subtle/60 px-5 py-3 text-sm text-fg-muted">
          {footer}
        </div>
      )}
    </section>
  );
}
