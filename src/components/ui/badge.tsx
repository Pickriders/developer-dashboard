import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Status in small doses (DESIGN.md › Status): a tinted chip with a hairline, optionally led by a
 * dot. Colour carries meaning, never decoration; the label always says it in words too.
 */
const badgeVariants = cva(
  "inline-flex h-5 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-sm border px-1.5 text-xs font-medium",
  {
    variants: {
      variant: {
        neutral: "border-line bg-surface-subtle text-fg-muted",
        brand: "border-brand-line bg-brand-subtle text-brand-fg",
        success: "border-success-line bg-success-subtle text-success-fg",
        warning: "border-warning-line bg-warning-subtle text-warning-fg",
        danger: "border-danger-line bg-danger-subtle text-danger-fg",
        info: "border-info-line bg-info-subtle text-info-fg",
        outline: "border-line-strong bg-transparent text-fg-muted",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

const dotColor: Record<NonNullable<BadgeProps["variant"]>, string> = {
  neutral: "bg-fg-subtle",
  brand: "bg-brand",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  outline: "bg-fg-subtle",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  /** Leads with a status dot. */
  dot?: boolean;
}

function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && <span aria-hidden className={cn("size-1.5 rounded-full", dotColor[variant ?? "neutral"])} />}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
