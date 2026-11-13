"use client";

import * as React from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/** Naira typed as people type it ("50,000"), held as kobo. Null while empty or not a number. */
export const toKobo = (text: string): number | null => {
  const n = Number(text.replace(/[,\s₦]/g, ""));
  return text.trim() && Number.isFinite(n) && n > 0 ? Math.round(n * 100) : null;
};
export const fromKobo = (kobo: number | null | undefined) => (kobo ? (kobo / 100).toLocaleString("en-NG") : "");

export const MoneyInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative">
      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm font-semibold text-fg-muted">
        ₦
      </span>
      <Input
        ref={ref}
        inputMode="decimal"
        autoComplete="off"
        className={cn("pl-8 tabular-nums", className)}
        {...props}
      />
    </div>
  ),
);
MoneyInput.displayName = "MoneyInput";
