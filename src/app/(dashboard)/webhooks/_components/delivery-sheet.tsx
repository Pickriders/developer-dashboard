"use client";

import * as React from "react";
import { RotateCw } from "lucide-react";
import { toast } from "sonner";

import { DeliveryStatus } from "./delivery-status";
import { CodeBlock } from "@/components/kit/code-block";
import { IdText } from "@/components/kit/id-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { prettyJson } from "@/lib/dashboard/events";
import { formatDateTime, timeAgo } from "@/lib/dashboard/format";
import { useResendEvent } from "@/lib/dashboard/hooks";
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";
import type { WebhookDeliveryDto } from "@/services/apiService";

/**
 * One delivery up close: every attempt (what your server answered, how fast, the first 2 KB of the
 * body), the exact JSON we sent, and Resend.
 */
export function DeliverySheet({
  endpointId,
  delivery,
  onClose,
}: {
  endpointId: string;
  delivery: WebhookDeliveryDto | null;
  onClose: () => void;
}) {
  const { team, mode, can } = useWorkspace();
  const resend = useResendEvent(team.id, mode, endpointId);
  const canResend = can("webhooks.write") && delivery?.event_type !== "ping";

  const attempts = delivery ? [...delivery.attempts].reverse() : [];

  return (
    <Sheet
      open={delivery !== null}
      onClose={onClose}
      title={<code className="font-mono text-base">{delivery?.event_type}</code>}
      subtitle={
        delivery && (
          <span className="flex flex-wrap items-center gap-2">
            <DeliveryStatus delivery={delivery} />
            <span>{formatDateTime(delivery.created)}</span>
          </span>
        )
      }
      footer={
        canResend && delivery ? (
          <Button
            variant="secondary"
            fullWidth
            loading={resend.isPending}
            onClick={async () => {
              try {
                await resend.mutateAsync(delivery.event_id);
                toast.success("Sent again. The new delivery is at the top of the list.");
                onClose();
              } catch (e) {
                toast.error((e as { message?: string }).message ?? "Couldn't resend it.");
              }
            }}
          >
            <RotateCw /> Resend this event
          </Button>
        ) : null
      }
    >
      {delivery && (
        <div className="space-y-6">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl bg-surface-subtle p-4 text-sm">
            <div>
              <dt className="text-xs text-fg-subtle">Event</dt>
              <dd>
                <IdText value={delivery.event_id} />
              </dd>
            </div>
            <div>
              <dt className="text-xs text-fg-subtle">Delivery</dt>
              <dd>
                <IdText value={delivery.id} />
              </dd>
            </div>
            <div>
              <dt className="text-xs text-fg-subtle">Attempts</dt>
              <dd className="font-semibold text-fg">{delivery.attempt_count}</dd>
            </div>
            <div>
              <dt className="text-xs text-fg-subtle">
                {delivery.status === "pending" && delivery.next_attempt_at ? "Next try" : "Delivered"}
              </dt>
              <dd className="font-semibold text-fg">
                {delivery.status === "pending" && delivery.next_attempt_at
                  ? timeAgo(delivery.next_attempt_at)
                  : delivery.delivered_at
                    ? formatDateTime(delivery.delivered_at)
                    : "Not yet"}
              </dd>
            </div>
          </dl>

          <section aria-labelledby="attempts">
            <h3 id="attempts" className="mb-2 text-sm font-bold text-fg-heading">
              Attempts
            </h3>
            {attempts.length ? (
              <ol className="space-y-2">
                {attempts.map((attempt, i) => (
                  <li key={attempt.at} className="overflow-hidden rounded-xl border border-line">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3 text-sm">
                      <Badge tone={attempt.status_code && attempt.status_code < 300 ? "success" : "danger"}>
                        {attempt.status_code ?? "No response"}
                      </Badge>
                      <span className="text-fg-muted">{formatDateTime(attempt.at)}</span>
                      <span className="text-fg-subtle">{attempt.duration_ms} ms</span>
                      {i === 0 && attempts.length > 1 && <span className="text-xs text-fg-subtle">Latest</span>}
                    </div>
                    {attempt.error && (
                      <p className="border-t border-line bg-danger-subtle/50 px-4 py-2 text-[13px] text-danger-fg">
                        {attempt.error}
                      </p>
                    )}
                    {attempt.response_body && (
                      <details className="group border-t border-line">
                        <summary className="cursor-pointer list-none px-4 py-2 text-[13px] font-semibold text-fg-muted hover:text-fg">
                          <span className="group-open:hidden">Show response body</span>
                          <span className="hidden group-open:inline">Hide response body</span>
                        </summary>
                        <pre
                          className={cn(
                            "max-h-60 overflow-auto bg-surface-subtle px-4 py-3 font-mono text-xs leading-5 text-fg",
                          )}
                        >
                          {prettyJson(attempt.response_body)}
                        </pre>
                      </details>
                    )}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-fg-muted">Not tried yet.</p>
            )}
          </section>

          <section aria-labelledby="request-body">
            <h3 id="request-body" className="mb-2 text-sm font-bold text-fg-heading">
              Request body
            </h3>
            {delivery.request_body ? (
              <CodeBlock code={prettyJson(delivery.request_body)} label="POST · application/json" />
            ) : (
              <p className="text-sm text-fg-muted">The event is no longer kept, so its body is gone.</p>
            )}
          </section>
        </div>
      )}
    </Sheet>
  );
}
