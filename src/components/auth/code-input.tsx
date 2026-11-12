"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A one-time-code field that looks like separate boxes but is one real input, so it behaves:
 * paste the whole code, SMS autofill (`autocomplete="one-time-code"`), password managers, Backspace
 * and screen readers all work as they do on any text field. Calls onComplete once it is full.
 * Bump `errorKey` after a wrong code to shake it.
 */
export const CodeInput = React.forwardRef<
  HTMLInputElement,
  {
    id?: string;
    length?: number;
    value: string;
    onChange: (value: string) => void;
    onComplete?: (value: string) => void;
    invalid?: boolean;
    errorKey?: number;
    disabled?: boolean;
    autoFocus?: boolean;
    "aria-label"?: string;
    "aria-describedby"?: string;
  }
>(({ length = 4, value, onChange, onComplete, invalid, errorKey = 0, disabled, ...props }, ref) => {
  const [focused, setFocused] = React.useState(false);
  const [shaking, setShaking] = React.useState(false);

  React.useEffect(() => {
    if (errorKey) setShaking(true);
  }, [errorKey]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value.replace(/\D/g, "").slice(0, length);
    onChange(next);
    if (next.length === length && next !== value) onComplete?.(next);
  };

  // Keep the caret at the end, where the next digit goes.
  const pinCaret = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    if (input.selectionStart !== input.value.length) input.setSelectionRange(input.value.length, input.value.length);
  };

  return (
    <div
      className={cn("relative flex gap-2.5", shaking && "motion-safe:animate-shake")}
      onAnimationEnd={() => setShaking(false)}
    >
      {Array.from({ length }, (_, i) => {
        const char = value[i];
        const active = focused && (i === value.length || (value.length === length && i === length - 1));
        return (
          <div
            key={i}
            aria-hidden
            className={cn(
              "flex h-16 flex-1 items-center justify-center rounded-xl border-[1.5px] bg-surface text-[1.75rem] font-extrabold tabular-nums text-fg-heading shadow-button transition-[border-color,box-shadow] duration-150",
              invalid ? "border-danger" : "border-line-strong",
              active && !invalid && "border-brand ring-4 ring-brand/15",
              active && invalid && "ring-4 ring-danger/15",
              disabled && "bg-surface-subtle opacity-60",
            )}
          >
            {char ?? (active ? <span className="h-7 w-0.5 rounded-full bg-brand motion-safe:animate-blink" /> : null)}
          </div>
        );
      })}
      <input
        ref={ref}
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern={`\\d{${length}}`}
        maxLength={length}
        value={value}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        onChange={handleChange}
        onFocus={(e) => {
          setFocused(true);
          pinCaret(e);
        }}
        onBlur={() => setFocused(false)}
        onSelect={pinCaret}
        className="absolute inset-0 h-full w-full cursor-text bg-transparent text-base text-transparent caret-transparent outline-none selection:bg-transparent disabled:cursor-not-allowed"
        {...props}
      />
    </div>
  );
});
CodeInput.displayName = "CodeInput";
