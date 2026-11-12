"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A panel under its trigger for a short explanation with an action or two (not a list of choices:
 * that's Menu). Closes on Escape or a click outside, and gives focus back to the trigger.
 */
export function Popover({
  open,
  onOpenChange,
  anchor,
  label,
  align = "end",
  className,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The trigger. Rendered as is; give it aria-expanded and aria-controls if it opens this. */
  anchor: React.ReactNode;
  label: string;
  align?: "start" | "end";
  className?: string;
  children: React.ReactNode;
}) {
  const root = React.useRef<HTMLDivElement>(null);
  const panel = React.useRef<HTMLDivElement>(null);
  const opener = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement as HTMLElement | null;
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) onOpenChange(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      onOpenChange(false);
      opener.current?.focus();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    panel.current?.focus();
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onOpenChange]);

  return (
    <div ref={root} className="relative">
      {anchor}
      {open && (
        <div
          ref={panel}
          role="dialog"
          aria-label={label}
          tabIndex={-1}
          className={cn(
            "absolute top-full z-50 mt-2 w-[min(22rem,calc(100vw-1.5rem))] origin-top animate-pop-in rounded-2xl border border-line bg-surface-raised p-5 shadow-pop outline-none",
            align === "end" ? "right-0" : "left-0",
            className,
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
