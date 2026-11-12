"use client";

import * as React from "react";

import { passwordStrength } from "@/lib/auth/password";
import { cn } from "@/lib/utils";

const TONE = ["bg-surface-muted", "bg-danger", "bg-warning", "bg-success", "bg-success"] as const;
const TEXT = ["text-fg-subtle", "text-danger-fg", "text-warning-fg", "text-success-fg", "text-success-fg"] as const;

/** Four segments and one line of advice. Advice, not rules: only the 8-character minimum is enforced. */
export function PasswordMeter({ value, avoid, id }: { value: string; avoid?: string[]; id?: string }) {
  const { score, label, hint } = passwordStrength(value, avoid);
  return (
    <div id={id} className="space-y-1.5" aria-live="polite">
      <div className="flex gap-1" aria-hidden>
        {[1, 2, 3, 4].map((step) => (
          <span
            key={step}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors duration-200",
              value && score >= step ? TONE[score] : "bg-surface-muted",
            )}
          />
        ))}
      </div>
      <p className="flex justify-between gap-2 text-[13px]">
        <span className="text-fg-subtle">{hint}</span>
        {label && <span className={cn("shrink-0 font-bold", TEXT[score])}>{label}</span>}
      </p>
    </div>
  );
}
