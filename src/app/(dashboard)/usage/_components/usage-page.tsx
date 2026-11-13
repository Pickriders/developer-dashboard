"use client";

import * as React from "react";

import { OrdersChart } from "./orders-chart";
import { ApiErrorAlert } from "@/components/auth";
import { PageHeader } from "@/components/kit/page-header";
import { StatCard } from "@/components/kit/stat-card";
import { LinkButton, Button } from "@/components/ui/button";
import { Segmented } from "@/components/ui/segmented";
import { Skeleton } from "@/components/ui/skeleton";
import type { UsagePeriod } from "@/lib/dashboard/api";
import { toApiError } from "@/lib/dashboard/errors";
import { formatDate, formatMoney, percent, subUnitToBaseUnit } from "@/lib/dashboard/format";
import { useUsage } from "@/lib/dashboard/hooks";
import { useUrlState } from "@/lib/dashboard/url-state";
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";

const PERIODS = [
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "90d", label: "90 days" },
] as const satisfies readonly { value: UsagePeriod; label: string }[];

const KEYS = ["period"] as const;

const count = (n: number) => n.toLocaleString("en-NG");

/** How the team used Pickriders: orders per day and how they ended, spend, API errors, webhooks. */
export function UsagePage() {
  const { team, mode, can } = useWorkspace();
  const [state, setState] = useUrlState(KEYS);
  const period = (PERIODS.some((p) => p.value === state.period) ? state.period : "30d") as UsagePeriod;
  const usage = useUsage(team.id, mode, period);
  const data = usage.data;
  const label = PERIODS.find((p) => p.value === period)!.label;

  return (
    <>
      <PageHeader
        title="Usage"
        description={`How ${team.name} used Pickriders in ${mode} mode over the last ${label}.`}
        actions={
          <Segmented
            label="Period"
            size="sm"
            value={period}
            options={PERIODS}
            onChange={(next) => setState({ period: next === "30d" ? null : next })}
          />
        }
      />

      {usage.error && !data ? (
        <div className="space-y-3">
          <ApiErrorAlert error={toApiError(usage.error)} />
          <Button variant="secondary" onClick={() => usage.refetch()}>
            Try again
          </Button>
        </div>
      ) : !data ? (
        <UsageSkeleton />
      ) : (
        <div
          className={cn("space-y-5 transition-opacity", usage.isPlaceholderData && "opacity-60")}
          aria-busy={usage.isFetching}
        >
          <section aria-label="Orders" className="rounded-xl border border-line bg-surface p-5 shadow-card sm:p-6">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold text-fg-muted">Orders</h2>
                <p className="mt-1 flex items-baseline gap-2">
                  <span
                    className="text-4xl font-extrabold tracking-tight tabular-nums text-fg-heading"
                    data-testid="orders-created"
                  >
                    {count(data.orders.created)}
                  </span>
                  <span className="text-sm text-fg-muted">
                    created · <span className="font-semibold text-fg">{count(data.orders.delivered)}</span> delivered
                  </span>
                </p>
              </div>
              <ul aria-hidden className="flex gap-4 text-xs text-fg-muted">
                <li className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-sm bg-brand" /> Delivered
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-sm bg-brand/25" /> Not delivered yet or didn&apos;t
                </li>
              </ul>
            </div>
            <OrdersChart
              key={period}
              days={data.orders.per_day}
              empty={
                <>
                  <p className="font-semibold text-fg">
                    No {mode} orders in the last {label}
                  </p>
                  {mode === "test" && can("orders.write") ? (
                    <LinkButton href="/orders/new" size="sm" variant="secondary" className="mt-2">
                      Create a test order
                    </LinkButton>
                  ) : (
                    <p className="mt-0.5">They&apos;ll show here day by day.</p>
                  )}
                </>
              }
            />
          </section>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Delivery success"
              value={<span data-testid="success-rate">{percent(data.orders.success_rate)}</span>}
              hint={
                data.orders.success_rate === null
                  ? "No orders finished yet"
                  : `${count(data.orders.failed)} failed · ${count(data.orders.cancelled)} cancelled by you`
              }
            />
            <StatCard
              label="Spent on deliveries"
              value={formatMoney(subUnitToBaseUnit(data.spend.amount), data.spend.currency)}
              hint={mode === "test" ? "Play money, after refunds" : "After refunds"}
            />
            <StatCard
              label="API error rate"
              value={<span data-testid="error-rate">{percent(data.api.error_rate)}</span>}
              hint={
                data.api.requests
                  ? `${count(data.api.errors)} of ${count(data.api.requests)} requests${data.api.server_errors ? ` · ${count(data.api.server_errors)} ours (5xx)` : ""}`
                  : "No API requests yet"
              }
            />
            <StatCard
              label="Webhook success"
              value={percent(data.webhooks.success_rate)}
              hint={
                data.webhooks.deliveries
                  ? `${count(data.webhooks.succeeded)} of ${count(data.webhooks.deliveries)} delivered${data.webhooks.failed ? ` · ${count(data.webhooks.failed)} gave up` : ""}`
                  : "No webhook deliveries yet"
              }
            />
          </div>

          <p className="text-xs text-fg-subtle">
            {formatDate(data.from)} to today, counted in Lagos time. Success rates leave out orders you cancelled and
            ones still on their way.
          </p>
        </div>
      )}
    </>
  );
}

function UsageSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true" aria-label="Loading usage">
      <div className="rounded-xl border border-line bg-surface p-6 shadow-card">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="mt-2 h-10 w-40" />
        <Skeleton className="mt-6 h-56 w-full" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-28 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}
