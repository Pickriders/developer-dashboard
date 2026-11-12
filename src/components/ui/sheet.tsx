"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * The storefront drawer: a quick look at one row without leaving the page. A right-hand panel from
 * md, a bottom sheet on phones. Native <dialog>, like Modal: focus trapped, Escape closes it.
 */
export function Sheet({
  open,
  onClose,
  title,
  subtitle,
  footer,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDialogElement>(null);
  const titleId = React.useId();

  React.useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className={cn(
        "m-0 mt-auto h-[92dvh] max-h-none w-full max-w-none bg-transparent p-0 text-fg backdrop:bg-plum/40 backdrop:backdrop-blur-[2px]",
        "md:ml-auto md:mr-0 md:mt-0 md:h-dvh md:w-[min(40rem,100vw)]",
      )}
    >
      {open && (
        <div className="flex h-full animate-slide-up flex-col rounded-t-3xl border border-line bg-surface-raised shadow-pop md:animate-fade-in md:rounded-none md:border-y-0 md:border-r-0">
          <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
            <div className="min-w-0">
              <h2 id={titleId} className="truncate text-lg font-extrabold tracking-tight text-fg-heading">
                {title}
              </h2>
              {subtitle && <div className="mt-0.5 text-sm text-fg-muted">{subtitle}</div>}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="focus-ring -mr-2 grid size-9 shrink-0 place-items-center rounded-lg text-fg-subtle hover:bg-surface-subtle hover:text-fg"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">{children}</div>
          {footer && (
            <div className="border-t border-line px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6">
              {footer}
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
