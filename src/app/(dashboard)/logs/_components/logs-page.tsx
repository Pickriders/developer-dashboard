"use client";

import * as React from "react";
import Link from "next/link";
import { ScrollText, Search, X } from "lucide-react";

import { LogSheet } from "./log-sheet";
import { shortPath, StatusPill } from "./status-pill";
import { ApiErrorAlert } from "@/components/auth";
import { EmptyState } from "@/components/kit/empty-state";
import { FilterMenu } from "@/components/kit/filter-menu";
import { PageHeader } from "@/components/kit/page-header";
import { Button } from "@/components/ui/button";
import { Segmented } from "@/components/ui/segmented";
import { Skeleton } from "@/components/ui/skeleton";
import type { LogFilters } from "@/lib/dashboard/api";
import { toApiError } from "@/lib/dashboard/errors";
import { formatDateTime, timeAgo } from "@/lib/dashboard/format";
import { useApiKeys, useRequestLogs } from "@/lib/dashboard/hooks";
import { useUrlState } from "@/lib/dashboard/url-state";
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";

const FILTERS = ["q", "status", "method", "key", "since", "id"] as const;
const METHODS = ["GET", "POST", "PATCH", "PUT", "DELETE"].map((m) => ({ value: m, label: m }));
const SINCE = [
  { value: "1h", label: "Last hour", ms: 36e5 },
  { value: "24h", label: "Last 24 hours", ms: 864e5 },
  { value: "7d", label: "Last 7 days", ms: 7 * 864e5 },
] as const;
const COLUMNS =
  "grid-cols-[3.75rem_minmax(0,1fr)_auto] md:grid-cols-[4rem_4.5rem_minmax(0,1fr)_minmax(0,11rem)_4.5rem_7rem]";

/**
 * Every request the team's keys made in the last 30 days: find one by its request id (from an
 * error or a Request-Id header) or narrow by outcome, method, path, key and time, then open it.
 */
export function LogsPage() {
  const { team, mode } = useWorkspace();
  const [state, setState] = useUrlState(FILTERS);
  const keys = useApiKeys(team.id, mode);

  // The search box: a request id finds that request; anything else narrows by path.
  const [text, setText] = React.useState(state.q);
  React.useEffect(() => setText(state.q), [state.q]);
  React.useEffect(() => {
    const timer = setTimeout(() => text.trim() !== state.q && setState({ q: text.trim() || null, id: null }), 300);
    return () => clearTimeout(timer);
  }, [text, state.q, setState]);

  const since = React.useMemo(() => {
    const range = SINCE.find((s) => s.value === state.since);
    return range ? new Date(Math.floor((Date.now() - range.ms) / 60_000) * 60_000).toISOString() : undefined;
  }, [state.since]);

  const filters: LogFilters = {
    ...(state.q && (state.q.startsWith("req_") ? { request_id: state.q } : { path: state.q })),
    ...(state.status && { status: state.status as LogFilters["status"] }),
    ...(state.method && { method: state.method as LogFilters["method"] }),
    ...(state.key && { key: state.key }),
    ...(since && { created_gte: since }),
  };
  const filtered = Object.keys(filters).length > 0;
  const logs = useRequestLogs(team.id, mode, filters, { live: !state.id });
  const rows = logs.data?.pages.flatMap((p) => p.data) ?? [];

  return (
    <>
      <PageHeader
        title="Request logs"
        description="Every request your keys made in the last 30 days. Paste a request id from an error to find it."
        actions={
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold text-fg-subtle"
            title="Refreshes every 10 seconds"
          >
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-success/60" />
              <span className="relative size-2 rounded-full bg-success" />
            </span>
            Auto-refresh
          </span>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <label className="relative min-w-[16rem] flex-1 sm:max-w-sm">
          <span className="sr-only">Search by request id or path</span>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-fg-subtle"
            aria-hidden
          />
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="req_… or a path like /orders"
            spellCheck={false}
            autoComplete="off"
            className="h-9 w-full rounded-xl border border-line bg-surface pl-9 pr-8 font-mono text-[13px] text-fg shadow-button outline-none transition placeholder:font-sans placeholder:text-fg-subtle focus:border-brand focus:ring-4 focus:ring-brand/15"
          />
          {text && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setText("")}
              className="focus-ring absolute right-2 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-md text-fg-subtle hover:text-fg"
            >
              <X className="size-3.5" aria-hidden />
            </button>
          )}
        </label>
        <Segmented
          size="sm"
          label="Outcome"
          value={(state.status || "all") as "all" | "succeeded" | "failed"}
          onChange={(v) => setState({ status: v === "all" ? null : v })}
          options={[
            { value: "all", label: "All" },
            { value: "succeeded", label: "Succeeded" },
            { value: "failed", label: "Failed" },
          ]}
        />
        <FilterMenu label="Method" value={state.method} options={METHODS} onChange={(v) => setState({ method: v })} />
        <FilterMenu
          label="Key"
          value={state.key}
          options={(keys.data ?? []).map((k) => ({ value: k.id, label: k.label }))}
          onChange={(v) => setState({ key: v })}
        />
        <FilterMenu
          label="Time"
          anyLabel="Last 30 days"
          value={state.since}
          options={SINCE.map(({ value, label }) => ({ value, label }))}
          onChange={(v) => setState({ since: v })}
        />
        {filtered && (
          <button
            type="button"
            onClick={() => {
              setText("");
              setState({ q: null, status: null, method: null, key: null, since: null });
            }}
            className="focus-ring rounded-md px-1.5 text-sm font-semibold text-brand-fg hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {logs.error ? (
        <ApiErrorAlert error={toApiError(logs.error)} />
      ) : (
        <section
          aria-label="Requests"
          className={cn(
            "overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-opacity",
            logs.isFetching && logs.isPlaceholderData && "opacity-60",
          )}
        >
          <div
            aria-hidden
            className={cn(
              "hidden gap-3 border-b border-line bg-surface-subtle/60 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-fg-subtle md:grid",
              COLUMNS,
            )}
          >
            <span>Status</span>
            <span>Method</span>
            <span>Path</span>
            <span>Key</span>
            <span className="text-right">Time</span>
            <span className="text-right">When</span>
          </div>

          {logs.isPending ? (
            <ul className="divide-y divide-line">
              {Array.from({ length: 6 }, (_, i) => (
                <li key={i} className="px-5 py-3.5">
                  <Skeleton className="h-6 w-full" />
                </li>
              ))}
            </ul>
          ) : !rows.length ? (
            filtered ? (
              <EmptyState
                icon={<Search />}
                title="No requests match"
                description={
                  filters.request_id
                    ? "No request with that id in this team. Request ids look like req_… and are kept 30 days."
                    : "Try fewer filters or a longer time range."
                }
              />
            ) : (
              <EmptyState
                icon={<ScrollText />}
                title={`No ${mode} requests yet`}
                description="Requests appear here a few seconds after your code makes them, with what came back."
                action={
                  <Link href="/keys" className="text-sm font-semibold text-brand-fg hover:underline">
                    Get a {mode} key
                  </Link>
                }
              />
            )
          ) : (
            <ul className="divide-y divide-line">
              {rows.map((row) => (
                <li key={row.id}>
                  <button
                    type="button"
                    onClick={() => setState({ id: row.id })}
                    data-log={row.requestId ?? row.id}
                    className={cn(
                      "focus-ring grid w-full items-center gap-x-3 gap-y-1 px-5 py-3 text-left text-sm transition-colors hover:bg-surface-subtle/60",
                      COLUMNS,
                      state.id === row.id && "bg-brand-subtle/50",
                    )}
                  >
                    <StatusPill status={row.status} />
                    <code className="hidden text-xs font-bold text-fg md:block">{row.method}</code>
                    <span className="min-w-0">
                      <code className="block truncate text-[13px] text-fg">
                        <span className="font-bold md:hidden">{row.method} </span>
                        {shortPath(row.path)}
                      </code>
                      {row.errorCode && <span className="block truncate text-xs text-danger-fg">{row.errorCode}</span>}
                    </span>
                    <span className="hidden min-w-0 truncate text-[13px] text-fg-muted md:block">
                      {row.key?.label ?? (row.key ? "Deleted key" : "No key")}
                    </span>
                    <span className="hidden text-right text-xs tabular-nums text-fg-subtle md:block">
                      {row.durationMs} ms
                    </span>
                    <span className="text-right text-xs text-fg-subtle" title={formatDateTime(row.createdAt)}>
                      {timeAgo(row.createdAt)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {logs.hasNextPage && (
            <div className="border-t border-line p-3">
              <Button
                variant="ghost"
                fullWidth
                loading={logs.isFetchingNextPage}
                onClick={() => void logs.fetchNextPage()}
              >
                Show older requests
              </Button>
            </div>
          )}
        </section>
      )}

      <LogSheet id={state.id || null} onClose={() => setState({ id: null })} />
    </>
  );
}
