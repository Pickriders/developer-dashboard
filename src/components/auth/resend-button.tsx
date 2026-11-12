"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/** Seconds left until `until` (a timestamp), ticking. */
export function useSecondsUntil(until: number) {
  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => {
    if (until <= Date.now()) return;
    const timer = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(timer);
  }, [until]);
  return Math.max(0, Math.ceil((until - now) / 1000));
}

const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/** "Resend code" once allowed, "Resend in 0:42" until then. */
export function ResendButton({
  availableAt,
  onResend,
  pending,
  label = "Resend code",
  className,
}: {
  availableAt: number;
  onResend: () => void;
  pending?: boolean;
  label?: string;
  className?: string;
}) {
  const left = useSecondsUntil(availableAt);
  return (
    <button
      type="button"
      onClick={onResend}
      disabled={left > 0 || pending}
      className={cn(
        "focus-ring rounded-sm text-sm font-bold text-brand-fg underline-offset-4 hover:underline disabled:cursor-default disabled:font-medium disabled:text-fg-subtle disabled:no-underline",
        className,
      )}
    >
      {pending ? "Sending…" : left > 0 ? `${label} in ${clock(left)}` : label}
    </button>
  );
}
