"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";

import { shortPath, StatusPill } from "./status-pill";
import { CodeBlock } from "@/components/kit/code-block";
import { IdText } from "@/components/kit/id-text";
import { Badge } from "@/components/ui/badge";
import { Sheet } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { DOCS_URL } from "@/constant";
import { formatDateTime } from "@/lib/dashboard/format";
import { useRequestLog } from "@/lib/dashboard/hooks";
import { useWorkspace } from "@/lib/workspace";

const json = (value: unknown) => JSON.stringify(value, null, 2);

/** One request in full: who sent it, how it went, and the redacted bodies both ways. */
export function LogSheet({ id, onClose }: { id: string | null; onClose: () => void }) {
  const { team } = useWorkspace();
  const log = useRequestLog(team.id, id);
  const data = log.data;

  return (
    <Sheet
      open={id !== null}
      onClose={onClose}
      title={
        data ? (
          <span className="flex min-w-0 items-center gap-2.5">
            <StatusPill status={data.status} />
            <span className="truncate font-mono text-base">
              {data.method} {shortPath(data.path)}
            </span>
          </span>
        ) : (
          "Request"
        )
      }
      subtitle={data && formatDateTime(data.createdAt)}
    >
      {!data ? (
        <div className="space-y-3" aria-busy>
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      ) : (
        <div className="space-y-6">
          {data.errorCode && (
            <div className="rounded-xl border border-danger-line bg-danger-subtle/60 px-4 py-3 text-sm">
              <p className="font-semibold text-danger-fg">
                <code>{data.errorCode}</code>
                {data.errorType && <span className="font-normal text-fg-muted"> · {data.errorType}</span>}
              </p>
              <a
                href={`${DOCS_URL}/errors#${data.errorCode}`}
                target="_blank"
                rel="noreferrer"
                className="focus-ring mt-1 inline-flex items-center gap-1 rounded-sm text-[13px] font-semibold text-fg-muted hover:text-fg"
              >
                What this error means <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </div>
          )}

          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl bg-surface-subtle p-4 text-sm">
            <Item label="Request id">{data.requestId ? <IdText value={data.requestId} full /> : "None"}</Item>
            <Item label="Duration">{data.durationMs} ms</Item>
            <Item label="Key">
              {data.key ? (
                <span className="truncate">
                  {data.key.label ?? "Deleted key"}{" "}
                  {data.key.prefix && <code className="text-xs text-fg-subtle">{data.key.prefix}…</code>}
                </span>
              ) : (
                "None"
              )}
            </Item>
            <Item label="Mode">
              <Badge tone={data.livemode ? "success" : "warning"}>{data.livemode ? "Live" : "Test"}</Badge>
            </Item>
            <Item label="IP address">{data.ip ?? "Unknown"}</Item>
            <Item label="User agent">
              <span className="block truncate" title={data.userAgent ?? undefined}>
                {data.userAgent ?? "Unknown"}
              </span>
            </Item>
          </dl>

          {data.query && <Body title="Query">{json(data.query)}</Body>}
          <Body title="Request body" empty="No body was sent.">
            {data.requestBody ? json(data.requestBody) : null}
          </Body>
          <Body title="Response body" empty="No JSON came back.">
            {data.responseBody ? json(data.responseBody) : null}
          </Body>
          <p className="text-xs leading-5 text-fg-subtle">
            Secrets, phone numbers and codes are replaced with [redacted] before a request is stored. Requests are kept
            for 30 days.
          </p>
        </div>
      )}
    </Sheet>
  );
}

function Item({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-fg-subtle">{label}</dt>
      <dd className="mt-0.5 min-w-0 font-medium text-fg">{children}</dd>
    </div>
  );
}

function Body({ title, empty, children }: { title: string; empty?: string; children: string | null }) {
  return (
    <section>
      <h3 className="mb-2 text-sm font-bold text-fg-heading">{title}</h3>
      {children ? (
        <CodeBlock code={children} label="application/json" />
      ) : (
        <p className="text-sm text-fg-muted">{empty}</p>
      )}
    </section>
  );
}
