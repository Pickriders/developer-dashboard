"use client";

import * as React from "react";
import { ShieldCheck, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";

/**
 * Confirms an action that is hard to take back (CLAUDE.md §2), as the storefront does: an icon
 * tile, the action as the title, what happens, then Cancel and the verb. `typeToConfirm` asks for
 * a word before the button wakes up, for the most destructive actions. `onConfirm` may return a
 * promise: the button spins until it settles, then the dialog closes.
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  onConfirm,
  destructive = true,
  typeToConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: React.ReactNode;
  confirmLabel: string;
  onConfirm: () => Promise<unknown> | void;
  destructive?: boolean;
  typeToConfirm?: string;
}) {
  const [busy, setBusy] = React.useState(false);
  const [typed, setTyped] = React.useState("");
  const unlocked = !typeToConfirm || typed.trim().toLowerCase() === typeToConfirm.trim().toLowerCase();

  React.useEffect(() => {
    if (open) setTyped("");
  }, [open]);

  const close = () => !busy && onOpenChange(false);

  return (
    <Modal open={open} onClose={close} title={title} compact>
      <div className="space-y-5">
        <div className="flex flex-col items-center text-center">
          <span className="relative grid size-14 place-items-center" aria-hidden>
            <span
              className={cn("absolute inset-0 rounded-full", destructive ? "bg-danger-subtle" : "bg-brand-subtle")}
            />
            <span
              className={cn(
                "relative grid size-10 place-items-center rounded-full bg-surface",
                destructive ? "text-danger" : "text-brand",
              )}
            >
              {destructive ? <TriangleAlert className="size-[19px]" /> : <ShieldCheck className="size-[19px]" />}
            </span>
          </span>
          <h2 className="mt-3 text-balance text-lg font-extrabold tracking-tight text-fg-heading">{title}</h2>
          <div className="mt-1.5 max-w-[34ch] text-sm leading-6 text-fg-muted">{description}</div>
        </div>

        {typeToConfirm && (
          <label className="block space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-fg-muted">
              Type <span className="font-mono normal-case tracking-normal text-fg">{typeToConfirm}</span> to confirm
            </span>
            <input
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              className="min-h-11 w-full rounded-xl border border-line-strong bg-surface px-3 text-[16px] text-fg outline-none transition focus:border-brand sm:text-sm"
            />
          </label>
        )}

        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" onClick={close} disabled={busy}>
            Cancel
          </Button>
          <Button
            variant={destructive ? "danger" : "primary"}
            disabled={!unlocked}
            loading={busy}
            onClick={async () => {
              setBusy(true);
              try {
                await onConfirm();
                onOpenChange(false);
              } finally {
                setBusy(false);
              }
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
