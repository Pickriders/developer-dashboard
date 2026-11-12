"use client";

import * as React from "react";

import { ApiErrorAlert } from "@/components/auth";
import { NewSecret } from "@/components/kit/new-secret";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import type { ApiError } from "@/lib/dashboard/errors";
import { formatDateTime } from "@/lib/dashboard/format";
import { useRollKey } from "@/lib/dashboard/hooks";
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";
import type { DeveloperApiKeyDto, RollDeveloperApiKeyRequestDto } from "@/services/apiService";

type Grace = RollDeveloperApiKeyRequestDto["expiresIn"];
const GRACE: { value: Grace; label: string; seconds: number }[] = [
  { value: "now", label: "Stop now", seconds: 0 },
  { value: "1h", label: "1 hour", seconds: 3_600 },
  { value: "24h", label: "24 hours", seconds: 86_400 },
  { value: "7d", label: "7 days", seconds: 604_800 },
];

/**
 * A new secret for a key, with time to deploy it: the old one keeps working for the grace period
 * chosen, then stops. "Stop now" is for a leaked key.
 */
export function RollKeyDialog({ apiKey, onClose }: { apiKey: DeveloperApiKeyDto | null; onClose: () => void }) {
  const { team, mode } = useWorkspace();
  const roll = useRollKey(team.id, mode);
  const [grace, setGrace] = React.useState<Grace>("24h");
  const [result, setResult] = React.useState<{ secret: string; oldStops: Date } | null>(null);
  const [failure, setFailure] = React.useState<ApiError | null>(null);

  const close = () => {
    if (roll.isPending) return;
    setResult(null);
    roll.reset();
    setGrace("24h");
    setFailure(null);
    onClose();
  };

  const submit = async () => {
    if (!apiKey) return;
    setFailure(null);
    try {
      const fresh = await roll.mutateAsync({ id: apiKey.id, expiresIn: grace });
      const seconds = GRACE.find((g) => g.value === grace)?.seconds ?? 0;
      setResult({ secret: fresh.secret, oldStops: new Date(Date.now() + seconds * 1000) });
    } catch (e) {
      setFailure(e as ApiError);
    }
  };

  return (
    <Modal open={apiKey !== null} onClose={close} title={apiKey ? `Roll ${apiKey.label}` : "Roll key"}>
      {result ? (
        <NewSecret title="Your new key" secret={result.secret} onDone={close}>
          {grace === "now"
            ? "The old key has stopped working. Put this one on your server now."
            : `Put it on your server. The old key keeps working until ${formatDateTime(result.oldStops)}, then stops.`}
        </NewSecret>
      ) : (
        <div className="space-y-5">
          <p className="text-[15px] leading-6 text-fg-muted">
            Rolling gives <span className="font-semibold text-fg">{apiKey?.label}</span> a new secret with the same name
            and access. Deploy the new one, then the old one stops.
          </p>
          {failure && <ApiErrorAlert error={failure} />}

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-fg">Keep the old key working for</legend>
            <div
              role="radiogroup"
              aria-label="Keep the old key working for"
              className="grid grid-cols-2 gap-2 sm:grid-cols-4"
            >
              {GRACE.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  role="radio"
                  aria-checked={grace === g.value}
                  onClick={() => setGrace(g.value)}
                  className={cn(
                    "focus-ring min-h-11 rounded-xl border px-3 text-sm font-semibold transition-colors",
                    grace === g.value
                      ? g.value === "now"
                        ? "border-danger bg-danger-subtle text-danger-fg"
                        : "border-brand bg-brand-subtle text-brand-fg"
                      : "border-line-strong bg-surface text-fg hover:border-fg-subtle/50",
                  )}
                >
                  {g.label}
                </button>
              ))}
            </div>
            <p className={cn("mt-2 text-[13px]", grace === "now" ? "font-medium text-danger-fg" : "text-fg-subtle")}>
              {grace === "now"
                ? "Requests with the old key fail straight away. Use this if the key leaked."
                : "Enough time to deploy the new key everywhere the old one runs."}
            </p>
          </fieldset>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" onClick={close} disabled={roll.isPending}>
              Cancel
            </Button>
            <Button variant={grace === "now" ? "danger" : "primary"} loading={roll.isPending} onClick={submit}>
              Roll key
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
