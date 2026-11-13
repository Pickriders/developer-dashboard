"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Package, Plus, Search, X } from "lucide-react";

import { OrderStatusBadge } from "./order-status";
import { ApiErrorAlert } from "@/components/auth";
import { EmptyState } from "@/components/kit/empty-state";
import { FilterMenu } from "@/components/kit/filter-menu";
import { PageHeader } from "@/components/kit/page-header";
import { Button, LinkButton } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { OrderFilters } from "@/lib/dashboard/api";
import { toApiError } from "@/lib/dashboard/errors";
import { formatDateTime, formatMoney, timeAgo } from "@/lib/dashboard/format";
import { useOrders } from "@/lib/dashboard/hooks";
import { ORDER_STATUS, routeSummary } from "@/lib/dashboard/orders";
import { useUrlState } from "@/lib/dashboard/url-state";
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";

const COLUMNS = "md:grid-cols-[minmax(0,11rem)_10.5rem_minmax(0,1fr)_7rem_7.5rem]";

/** The team's orders in this mode, newest first, with what each costs and where it is. */
export function OrdersPage() {
  const { team, mode, can } = useWorkspace();
  const [state, setState] = useUrlState(["status", "ref"] as const);
  const [text, setText] = React.useState(state.ref);
  React.useEffect(() => setText(state.ref), [state.ref]);
  React.useEffect(() => {
    const timer = setTimeout(() => text.trim() !== state.ref && setState({ ref: text.trim() || null }), 300);
    return () => clearTimeout(timer);
  }, [text, state.ref, setState]);

  const filters: OrderFilters = {
    ...(state.status && { status: state.status as OrderFilters["status"] }),
    ...(state.ref && { reference: state.ref }),
  };
  const filtered = Object.keys(filters).length > 0;
  const list = useOrders(team.id, mode, filters);
  const rows = list.data?.pages.flatMap((p) => p.data) ?? [];

  const create = can("orders.write") ? (
    <LinkButton href="/orders/new">
      <Plus /> Create {mode} order
    </LinkButton>
  ) : null;

  return (
    <>
      <PageHeader
        title="Orders"
        description="Every delivery your team has asked for, from your code or from here, and where each one is now."
        actions={create}
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <label className="relative min-w-[14rem] flex-1 sm:max-w-xs">
          <span className="sr-only">Find by your reference</span>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-fg-subtle"
            aria-hidden
          />
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Your reference, like shop-42"
            spellCheck={false}
            autoComplete="off"
            className="h-9 w-full rounded-xl border border-line bg-surface pl-9 pr-8 text-sm text-fg shadow-button outline-none transition placeholder:text-fg-subtle focus:border-brand focus:ring-4 focus:ring-brand/15"
          />
          {text && (
            <button
              type="button"
              aria-label="Clear reference"
              onClick={() => setText("")}
              className="focus-ring absolute right-2 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-md text-fg-subtle hover:text-fg"
            >
              <X className="size-3.5" aria-hidden />
            </button>
          )}
        </label>
        <FilterMenu
          label="Status"
          value={state.status}
          options={Object.entries(ORDER_STATUS).map(([value, { label }]) => ({ value, label }))}
          onChange={(v) => setState({ status: v })}
        />
      </div>

      {list.error ? (
        <ApiErrorAlert error={toApiError(list.error)} />
      ) : (
        <section
          aria-label="Orders"
          className={cn(
            "overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-opacity",
            list.isFetching && list.isPlaceholderData && "opacity-60",
          )}
        >
          {list.isPending ? (
            <ul className="divide-y divide-line">
              {Array.from({ length: 5 }, (_, i) => (
                <li key={i} className="px-5 py-4">
                  <Skeleton className="h-10 w-full" />
                </li>
              ))}
            </ul>
          ) : !rows.length ? (
            filtered ? (
              <EmptyState
                icon={<Search />}
                title="No orders match"
                description="Try another status, or check the reference."
              />
            ) : (
              <EmptyState
                icon={<Package />}
                title={`No ${mode} orders yet`}
                description={
                  mode === "test"
                    ? "Create one here, or from your code with a test key. Test orders move like real ones, and you can step them along."
                    : "Live orders appear here as your code or your team creates them."
                }
                action={create}
              />
            )
          ) : (
            <>
              <div
                aria-hidden
                className={cn(
                  "hidden gap-4 border-b border-line bg-surface-subtle/60 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-fg-subtle md:grid",
                  COLUMNS,
                )}
              >
                <span>Order</span>
                <span>Status</span>
                <span>Route</span>
                <span className="text-right">Price</span>
                <span className="text-right">Created</span>
              </div>
              <ul className="divide-y divide-line">
                {rows.map((order) => {
                  const route = routeSummary(order);
                  return (
                    <li key={order.id}>
                      <Link
                        href={`/orders/${order.id}`}
                        data-order={order.reference ?? order.id}
                        className={cn(
                          "focus-ring grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1.5 px-5 py-3.5 text-sm transition-colors hover:bg-surface-subtle/60",
                          COLUMNS,
                        )}
                      >
                        <span className="min-w-0">
                          <span className="block truncate font-semibold text-fg">
                            {order.reference ?? `#${order.number}`}
                          </span>
                          <code className="block truncate text-xs text-fg-subtle">
                            {order.reference ? `#${order.number}` : order.id}
                          </code>
                        </span>
                        <span className="justify-self-end md:justify-self-start">
                          <OrderStatusBadge status={order.status} />
                        </span>
                        <span className="col-span-2 flex min-w-0 items-center gap-1.5 text-[13px] text-fg-muted md:col-span-1">
                          <span className="truncate">{route.from}</span>
                          <ArrowRight className="size-3.5 shrink-0 text-fg-subtle" aria-hidden />
                          <span className="truncate">{route.to}</span>
                          {route.more > 0 && <span className="shrink-0 text-fg-subtle">+{route.more}</span>}
                        </span>
                        <span className="font-semibold tabular-nums text-fg md:text-right">
                          {formatMoney(order.pricing.amount)}
                        </span>
                        <span className="text-right text-xs text-fg-subtle" title={formatDateTime(order.created)}>
                          {timeAgo(order.created)}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
          {list.hasNextPage && (
            <div className="border-t border-line p-3">
              <Button
                variant="ghost"
                fullWidth
                loading={list.isFetchingNextPage}
                onClick={() => void list.fetchNextPage()}
              >
                Show older orders
              </Button>
            </div>
          )}
        </section>
      )}
    </>
  );
}
