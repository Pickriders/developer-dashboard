"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/**
 * A password field with a show/hide toggle (NIST recommends one) and a Caps Lock warning. Paste
 * stays on, so password managers work.
 */
export const PasswordInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, onKeyUp, onKeyDown, onBlur, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false);
    const [capsLock, setCapsLock] = React.useState(false);
    const readCaps = (e: React.KeyboardEvent<HTMLInputElement>) =>
      setCapsLock(e.getModifierState?.("CapsLock") ?? false);

    return (
      <div className="space-y-1.5">
        <div className="relative">
          <Input
            ref={ref}
            type={visible ? "text" : "password"}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            className={cn("pr-12", className)}
            onKeyDown={(e) => {
              readCaps(e);
              onKeyDown?.(e);
            }}
            onKeyUp={(e) => {
              readCaps(e);
              onKeyUp?.(e);
            }}
            onBlur={(e) => {
              setCapsLock(false);
              onBlur?.(e);
            }}
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            className="focus-ring absolute inset-y-0 right-1.5 my-auto inline-flex size-9 items-center justify-center rounded-lg text-fg-subtle transition-colors hover:bg-surface-subtle hover:text-fg"
          >
            {visible ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
          </button>
        </div>
        {capsLock && (
          <p className="text-[13px] font-medium text-warning-fg animate-fade-in" role="status">
            Caps Lock is on.
          </p>
        )}
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";
