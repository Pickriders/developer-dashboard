import * as React from "react";

import { cn } from "@/lib/utils";

/** The storefront card: rounded-xl, a hairline and a soft shadow. */
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-xl border border-line bg-surface shadow-card", className)} {...props} />;
}
