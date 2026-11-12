"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { SecretReveal } from "./secret-reveal";
import { Button } from "@/components/ui/button";

/**
 * The moment a secret exists (a new or rolled key, a webhook signing secret): what it is, the secret
 * with a copy button, and Done. Lives only inside its dialog; nothing keeps the secret afterwards.
 */
export function NewSecret({
  title,
  children,
  secret,
  onDone,
}: {
  title: string;
  /** One or two sentences: where to put it, what happens next. */
  children: React.ReactNode;
  secret: string;
  onDone: () => void;
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className="grid size-10 shrink-0 place-items-center rounded-xl bg-success-subtle text-success-fg"
        >
          <Check className="size-5" strokeWidth={2.5} />
        </span>
        <div className="min-w-0">
          <h3 className="text-lg font-extrabold tracking-tight text-fg-heading">{title}</h3>
          <div className="mt-0.5 text-sm leading-6 text-fg-muted">{children}</div>
        </div>
      </div>
      <SecretReveal secret={secret} />
      <Button fullWidth onClick={onDone}>
        Done
      </Button>
    </div>
  );
}
