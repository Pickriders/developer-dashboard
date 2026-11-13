"use client";

import * as React from "react";
import { toast } from "sonner";

import { fromKobo, MoneyInput, toKobo } from "./money-input";
import { ApiErrorAlert } from "@/components/auth";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import type { ApiError } from "@/lib/dashboard/errors";
import { formatMoney } from "@/lib/dashboard/format";
import { useAddTestFunds, useCardCheckout } from "@/lib/dashboard/hooks";
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";

const PRESETS = {
  test: [50_000_00, 500_000_00, 1_000_000_00, 5_000_000_00],
  live: [10_000_00, 50_000_00, 100_000_00, 500_000_00],
};
/** The test top-up's limit, as backend-api has it. */
const MAX_TEST = 10_000_000_00;

/**
 * Money in. Test mode adds play money at once. Live mode opens Paystack's card checkout, and the
 * balance updates when Paystack confirms the payment.
 */
export function AddMoneyDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { team, mode } = useWorkspace();
  const test = useAddTestFunds(team.id);
  const card = useCardCheckout(team.id);
  const [text, setText] = React.useState("");
  const [failure, setFailure] = React.useState<ApiError | null>(null);
  const kobo = toKobo(text);
  const tooMuch = mode === "test" && kobo !== null && kobo > MAX_TEST;
  const busy = test.isPending || card.isPending;

  React.useEffect(() => {
    if (open) {
      setText("");
      setFailure(null);
    }
  }, [open]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kobo || tooMuch) return;
    setFailure(null);
    try {
      if (mode === "test") {
        await test.mutateAsync(kobo);
        toast.success(`${formatMoney(kobo)} of play money added`);
        onClose();
      } else {
        const back = `${window.location.origin}/wallet`;
        const session = await card.mutateAsync({ amount: kobo, success_url: `${back}?funded=1`, cancel_url: back });
        window.location.assign(session.url);
      }
    } catch (error) {
      setFailure(error as ApiError);
    }
  };

  return (
    <Modal open={open} onClose={() => !busy && onClose()} title={mode === "test" ? "Add play money" : "Top up by card"}>
      <form onSubmit={submit} className="space-y-5">
        <p className="text-[15px] leading-6 text-fg-muted">
          {mode === "test"
            ? "For test orders. It lands at once and never touches real money."
            : "You'll pay on Paystack's secure page, then come back here. The balance updates as soon as Paystack confirms."}
        </p>
        {failure && <ApiErrorAlert error={failure} />}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {PRESETS[mode].map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => setText(fromKobo(amount))}
              className={cn(
                "focus-ring min-h-11 rounded-xl border px-2 text-sm font-semibold tabular-nums transition-colors",
                kobo === amount
                  ? "border-brand bg-brand-subtle text-brand-fg"
                  : "border-line-strong bg-surface text-fg hover:border-fg-subtle/50",
              )}
            >
              {formatMoney(amount).replace(".00", "")}
            </button>
          ))}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="amount" className="text-sm font-semibold text-fg">
            Amount
          </label>
          <MoneyInput
            id="amount"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Or type an amount"
            autoFocus
          />
          {tooMuch && (
            <p role="alert" className="text-[13px] font-medium text-danger-fg">
              Up to {formatMoney(MAX_TEST)} at a time.
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button type="submit" loading={busy} disabled={!kobo || tooMuch}>
            {mode === "test" ? "Add" : "Continue to pay"} {kobo && !tooMuch ? formatMoney(kobo) : ""}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
