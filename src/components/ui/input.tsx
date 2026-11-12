import * as React from "react";

import { cn } from "@/lib/utils";

/** The storefront field: 44px, rounded-lg, a teal border and soft glow on focus. Labels come from Field. */
export const inputClasses =
  "min-h-11 w-full rounded-lg border border-line-strong bg-surface px-3 py-2 text-[16px] text-fg shadow-button transition-[border-color,box-shadow] duration-150 placeholder:text-fg-subtle hover:border-fg-subtle/50 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15 aria-[invalid=true]:border-danger aria-[invalid=true]:focus:ring-danger/15 disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:text-fg-muted read-only:bg-surface-subtle read-only:text-fg-muted sm:text-sm";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => (
    <input ref={ref} type={type} className={cn(inputClasses, className)} {...props} />
  ),
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn(inputClasses, "min-h-24 resize-y", className)} {...props} />
  ),
);
Textarea.displayName = "Textarea";
