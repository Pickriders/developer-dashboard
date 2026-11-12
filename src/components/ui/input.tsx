import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-8 w-full rounded-md border border-input bg-surface px-2.5 text-sm shadow-xs transition-[border-color,box-shadow] duration-fast placeholder:text-fg-subtle hover:border-fg-subtle/60 focus-visible:border-brand focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand/20 aria-[invalid=true]:border-danger aria-[invalid=true]:ring-danger/20 disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:opacity-60 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-fg",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
