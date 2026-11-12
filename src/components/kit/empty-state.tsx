import * as React from "react";

import { cn } from "@/lib/utils";

/** Nothing here yet: say what goes here and give the one action that creates the first one. */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center px-6 py-14 text-center", className)}>
      {icon && (
        <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-brand-subtle text-brand-fg [&_svg]:size-5">
          {icon}
        </div>
      )}
      <h3 className="text-base font-bold text-fg-heading">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-fg-muted">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
