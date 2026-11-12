import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-20 w-full rounded-md border border-input bg-surface px-2.5 py-2 text-sm shadow-xs transition-[border-color,box-shadow] duration-fast placeholder:text-fg-subtle hover:border-fg-subtle/60 focus-visible:border-brand focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand/20 aria-[invalid=true]:border-danger aria-[invalid=true]:ring-danger/20 disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:opacity-60",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
