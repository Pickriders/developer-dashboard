"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { CircleAlert, CircleCheck, RefreshCw, TriangleAlert, WifiOff } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { API_URL } from "@/constant";
import { formatDateTime, timeAgo } from "@/lib/dashboard/format";
import { duration, IMPACT, INCIDENT_STATUS, STATE, uptime, type ComponentState, type Incident } from "@/lib/status";
import { cn } from "@/lib/utils";
import type { StatusDto } from "@/services/apiService";

/**
 * The public status page. It reads GET /status straight from the API (public, no key: the
 * dashboard's own proxy only forwards dashboard routes), like the docs' Try it. This page is hosted
 * apart from the API, so when the API can't be reached at all it says so: that is the outage.
 */
async function fetchStatus(): Promise<StatusDto> {
  const res = await fetch(`${API_URL}/developer/api/v1/status`, { cache: "no-store" });
  if (!res.ok) throw new Error(`The status check answered ${res.status}`);
  return res.json();
}

const TONE_BG = { success: "bg-success", warning: "bg-warning", danger: "bg-danger" } as const;
const TONE_SOFT = {
  success: "border-success-line bg-success-subtle text-success-fg",
  warning: "border-warning-line bg-warning-subtle text-warning-fg",
  danger: "border-danger-line bg-danger-subtle text-danger-fg",
} as const;

export function StatusPage() {
  const status = useQuery({ queryKey: ["status"], queryFn: fetchStatus, refetchInterval: 30_000, retry: 1 });
  const [, tick] = React.useReducer((n: number) => n + 1, 0);
  React.useEffect(() => {
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-fg">Status</p>
        <h1 className="mt-1 text-[2rem] font-black tracking-tight text-fg-heading">Pickriders developer platform</h1>
        <p className="mt-1 text-[15px] text-fg-muted">The API, webhooks and dashboard, checked every minute.</p>
      </header>

      {status.isLoading ? (
        <div aria-busy aria-label="Checking" className="space-y-4">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-72 w-full rounded-xl" />
        </div>
      ) : status.isError || !status.data ? (
        <Unreachable refreshing={status.isFetching} onRetry={() => void status.refetch()} />
      ) : (
        <Loaded data={status.data} refreshing={status.isFetching} />
      )}
    </div>
  );
}

function Unreachable({ refreshing, onRetry }: { refreshing: boolean; onRetry: () => void }) {
  return (
    <section role="status" aria-live="polite" className={cn("rounded-xl border px-5 py-5", TONE_SOFT.danger)}>
      <div className="flex items-start gap-3">
        <WifiOff className="mt-0.5 size-6 shrink-0" aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="text-lg font-extrabold">We can&apos;t reach the Pickriders API right now</p>
          <p className="mt-1 text-sm text-fg">
            This page is hosted apart from the API, so if it can&apos;t get an answer, the API is probably down for you
            too. We&apos;re alerted automatically. This page checks again every 30 seconds.
          </p>
          <button
            type="button"
            onClick={onRetry}
            className="focus-ring mt-3 inline-flex items-center gap-1.5 rounded-lg text-sm font-bold underline"
          >
            <RefreshCw
              className={cn("size-3.5", refreshing && "animate-spin motion-reduce:animate-none")}
              aria-hidden
            />
            Check again
          </button>
        </div>
      </div>
    </section>
  );
}

function Loaded({ data, refreshing }: { data: StatusDto; refreshing: boolean }) {
  const state = STATE[data.status];
  const Icon =
    data.status === "operational" ? CircleCheck : data.status === "degraded_performance" ? TriangleAlert : CircleAlert;
  return (
    <>
      <section
        role="status"
        aria-live="polite"
        data-status={data.status}
        className={cn(
          "flex flex-wrap items-center justify-between gap-3 rounded-xl border px-5 py-5",
          TONE_SOFT[state.tone],
        )}
      >
        <p className="flex items-center gap-3 text-xl font-extrabold">
          <Icon className="size-7 shrink-0" aria-hidden />
          {state.headline}
        </p>
        <p className="flex items-center gap-1.5 text-xs text-fg-muted">
          <span
            aria-hidden
            className={cn("size-1.5 rounded-full bg-success", refreshing && "animate-pulse motion-reduce:animate-none")}
          />
          Updated {timeAgo(data.updated_at)}
        </p>
      </section>

      {data.incidents.length > 0 && (
        <section aria-labelledby="open-incidents" className="space-y-4">
          <h2 id="open-incidents" className="text-lg font-bold text-fg-heading">
            Happening now
          </h2>
          {data.incidents.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} open />
          ))}
        </section>
      )}

      <section
        aria-labelledby="components"
        className="overflow-hidden rounded-xl border border-line bg-surface shadow-card"
      >
        <h2 id="components" className="border-b border-line px-5 py-3.5 text-base font-bold text-fg-heading">
          Systems
        </h2>
        <ul className="divide-y divide-line">
          {data.components.map((component) => (
            <li key={component.id} data-component={component.id} className="px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[15px] font-bold text-fg">{component.name}</p>
                <Badge tone={STATE[component.status].tone} dot>
                  {STATE[component.status].label}
                </Badge>
              </div>
              <History days={component.history} />
              <div className="mt-1.5 flex justify-between text-[11px] text-fg-subtle">
                <span>90 days ago</span>
                <span>{uptime(component.history)} without incidents</span>
                <span>Today</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="past-incidents" className="space-y-4">
        <h2 id="past-incidents" className="text-lg font-bold text-fg-heading">
          Past 14 days
        </h2>
        {data.recent_incidents.length ? (
          data.recent_incidents.map((incident) => <IncidentCard key={incident.id} incident={incident} />)
        ) : (
          <p className="rounded-xl border border-line bg-surface px-5 py-4 text-sm text-fg-muted shadow-card">
            No incidents in the last 14 days.
          </p>
        )}
      </section>
    </>
  );
}

/** 90 thin bars, one a day: green, amber or red for the worst that day. Hover or focus one for its date. */
function History({ days }: { days: { date: string; status: ComponentState }[] }) {
  const [shown, setShown] = React.useState<number | null>(null);
  const day = shown !== null ? days[shown] : null;
  return (
    <div className="relative mt-3">
      <div className="flex h-8 items-stretch gap-[2px]" onPointerLeave={() => setShown(null)}>
        {days.map((d, i) => (
          <span
            key={d.date}
            onPointerEnter={() => setShown(i)}
            className={cn(
              "min-w-0 flex-1 rounded-[2px] transition-opacity",
              TONE_BG[STATE[d.status].tone],
              d.status === "operational" && "opacity-60",
              shown !== null && shown !== i && "opacity-30",
            )}
          />
        ))}
      </div>
      <p aria-hidden className="mt-1 h-4 text-[11px] text-fg-muted">
        {day
          ? `${new Date(`${day.date}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}: ${STATE[day.status].label}`
          : ""}
      </p>
      <p className="sr-only">
        {days.filter((d) => d.status !== "operational").length} days with an incident in the last 90 days.
      </p>
    </div>
  );
}

function IncidentCard({ incident, open }: { incident: Incident; open?: boolean }) {
  const tone = incident.impact === "minor" ? "warning" : "danger";
  return (
    <article
      data-incident={incident.id}
      className={cn(
        "rounded-xl border bg-surface p-5 shadow-card",
        open ? "border-l-4" : "border-line",
        open && TONE_SOFT[tone].split(" ")[0],
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-base font-bold text-fg-heading">{incident.title}</h3>
        <div className="flex flex-wrap gap-1.5">
          <Badge tone={incident.status === "resolved" ? "success" : tone} dot>
            {INCIDENT_STATUS[incident.status]}
          </Badge>
          <Badge tone="neutral">{IMPACT[incident.impact]}</Badge>
        </div>
      </div>
      <p className="mt-1 text-xs text-fg-subtle">
        Affects {incident.components.map((c) => (c === "api" ? "the API" : c)).join(", ")} · started{" "}
        {formatDateTime(incident.started_at)} · {incident.resolved_at ? "lasted" : "for"}{" "}
        {duration(incident.started_at, incident.resolved_at)}
      </p>
      <ol className="mt-4 space-y-3 border-l-2 border-line pl-4">
        {incident.updates.map((update, i) => (
          <li key={i}>
            <p className="text-sm text-fg">
              <strong className="font-bold">{INCIDENT_STATUS[update.status]}.</strong> {update.message}
            </p>
            <p className="text-xs text-fg-subtle">{formatDateTime(update.at)}</p>
          </li>
        ))}
      </ol>
    </article>
  );
}
