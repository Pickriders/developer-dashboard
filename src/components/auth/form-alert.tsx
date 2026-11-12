"use client";

import * as React from "react";
import { CircleAlert, CircleCheck, Info } from "lucide-react";

import type { ApiError } from "@/lib/dashboard/errors";
import { cn } from "@/lib/utils";

const TONES = {
  danger: { box: "border-danger-line bg-danger-subtle text-danger-fg", icon: CircleAlert },
  info: { box: "border-info-line bg-info-subtle text-info-fg", icon: Info },
  success: { box: "border-success-line bg-success-subtle text-success-fg", icon: CircleCheck },
} as const;

/** A slim banner above a form: what went wrong (or happened), and what to do next. */
export function FormAlert({
  tone = "danger",
  title,
  children,
  className,
}: {
  tone?: keyof typeof TONES;
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  const { box, icon: Icon } = TONES[tone];
  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      className={cn("flex gap-2.5 rounded-xl border px-3.5 py-3 text-sm animate-slide-up", box, className)}
    >
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden />
      <div className="min-w-0 space-y-1">
        {title && <p className="font-bold">{title}</p>}
        {children && <div className="text-fg-muted [&_a]:font-bold [&_a]:text-fg [&_a]:underline">{children}</div>}
      </div>
    </div>
  );
}

/**
 * An API error that has no field to sit under. Server faults show the code and request id, so a
 * developer can quote them to support.
 */
export function ApiErrorAlert({ error, children }: { error: ApiError; children?: React.ReactNode }) {
  const showIds = error.status === 0 || error.status >= 500;
  return (
    <FormAlert title={error.message}>
      {children}
      {showIds && (
        <p className="font-mono text-2xs text-fg-subtle">
          {error.code}
          {error.requestId && <> · {error.requestId}</>}
        </p>
      )}
    </FormAlert>
  );
}
