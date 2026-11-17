"use client";

import * as React from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BookOpen,
  CircleAlert,
  CircleCheck,
  Gauge,
  Info,
  KeyRound,
  Package,
  PackagePlus,
  Plus,
  Truck,
  Wallet,
  Webhook,
} from "lucide-react";

import { OrdersChart } from "../../usage/_components/orders-chart";
import { OrderStatusBadge } from "../../orders/_components/order-status";
import { MetricCard } from "@/components/kit/metric-card";
import { Panel } from "@/components/kit/panel";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { DOCS_URL } from "@/constant";
import { formatDateTime, formatMoney, percent, timeAgo } from "@/lib/dashboard/format";
import { useOrders } from "@/lib/dashboard/hooks";
import { routeSummary } from "@/lib/dashboard/orders";
import {
  attentionItems,
  countDelta,
  inFlightTotal,
  latency,
  PIPELINE,
  rateDelta,
  runwayLabel,
  type AttentionItem,
} from "@/lib/dashboard/overview";
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";
import type { DeveloperAccountDto, OverviewDto } from "@/services/apiService";

const nf = (n: number) => n.toLocaleString("en-NG");

/** Home's live view of the team in the current mode: what needs attention, then the numbers. */
export function Overview({ overview, account }: { overview: OverviewDto; account: DeveloperAccountDto }) {
  const items = attentionItems(overview, account);
  return (
    <div className="space-y-6">
      {items.length > 0 && <Attention items={items} />}
      <Metrics overview={overview} />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <OrdersInMotion overview={overview} />
        <Spend overview={overview} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <OrdersTrend overview={overview} />
        <RecentOrders />
      </div>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <ApiTraffic overview={overview} />
        <Integration overview={overview} />
      </div>
    </div>
  );
}

// ── Attention ─────────────────────────────────────────────────────────────────

const TONE = {
  danger: { icon: CircleAlert, box: "border-danger-line bg-danger-subtle", text: "text-danger-fg" },
  warning: { icon: CircleAlert, box: "border-warning-line bg-warning-subtle", text: "text-warning-fg" },
  info: { icon: Info, box: "border-info-line bg-info-subtle", text: "text-info-fg" },
} as const;

function Attention({ items }: { items: AttentionItem[] }) {
  return (
    <section aria-label="Needs your attention" className="grid gap-3 md:grid-cols-2">
      {items.map((item) => {
        const tone = TONE[item.tone];
        return (
          <div
            key={item.id}
            data-attention={item.id}
            className={cn("flex items-start gap-3 rounded-xl border px-4 py-3.5", tone.box)}
          >
            <tone.icon className={cn("mt-0.5 size-5 shrink-0", tone.text)} aria-hidden />
            <div className="min-w-0 flex-1">
              <p className={cn("text-sm font-bold", tone.text)}>{item.title}</p>
              <p className="mt-0.5 text-sm text-fg-muted">{item.body}</p>
            </div>
            <Link
              href={item.href}
              className={cn(
                "focus-ring inline-flex shrink-0 items-center gap-1 self-center rounded-md text-sm font-bold hover:underline",
                tone.text,
              )}
            >
              {item.action} <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
        );
      })}
    </section>
  );
}

// ── Headline numbers ──────────────────────────────────────────────────────────

function Metrics({ overview }: { overview: OverviewDto }) {
  const { wallet, orders, api } = overview;
  const week = orders.last_7_days;
  return (
    <section aria-label="Headline numbers" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        label="Available balance"
        icon={<Wallet />}
        value={wallet ? formatMoney(wallet.available, wallet.currency) : "No wallet yet"}
        hint={
          wallet
            ? (runwayLabel(wallet.runway_days) ??
              (wallet.held ? `${formatMoney(wallet.held, wallet.currency)} held for orders` : "Nothing held"))
            : "Opened when live access is approved"
        }
        href="/wallet"
        action="Open the wallet"
      />
      <MetricCard
        label="Orders today"
        icon={<Package />}
        value={nf(orders.today)}
        delta={countDelta(orders.today, orders.yesterday)}
        comparedTo="vs yesterday"
        hint={`${nf(orders.delivered_today)} delivered today`}
        spark={orders.per_day.map((d) => d.created)}
        href="/orders"
        action="Open orders"
      />
      <MetricCard
        label="Delivery success, 7 days"
        icon={<CircleCheck />}
        value={percent(week.success_rate)}
        delta={rateDelta(week.success_rate, orders.previous_7_days.success_rate)}
        comparedTo="vs the week before"
        hint={
          week.delivered + week.failed
            ? `${nf(week.delivered)} delivered, ${nf(week.failed)} not`
            : "Nothing finished this week"
        }
        spark={orders.per_day.map((d) => d.delivered)}
        href="/usage"
        action="Open usage"
      />
      <MetricCard
        label="API error rate, 24 hours"
        icon={<Activity />}
        value={percent(api.error_rate)}
        delta={rateDelta(api.error_rate, api.previous_error_rate)}
        invert
        comparedTo="vs the day before"
        hint={api.requests ? `${nf(api.requests)} requests · p95 ${latency(api.p95_ms)}` : "No requests yet"}
        spark={api.per_hour.map((h) => h.requests)}
        href="/logs"
        action="Open request logs"
      />
    </section>
  );
}

// ── Orders in motion ──────────────────────────────────────────────────────────

// One colour per stage that stays distinct in both themes (brand and brand-solid match in dark).
const STAGE_BAR = ["bg-fg-subtle", "bg-warning", "bg-info", "bg-brand", "bg-success"];

function OrdersInMotion({ overview }: { overview: OverviewDto }) {
  const flight = overview.orders.in_flight;
  const total = inFlightTotal(flight);
  return (
    <Panel
      title="Orders in motion"
      description={
        total ? `${nf(total)} on their way right now` : "Nothing on the move. New orders show up here as they go."
      }
      actions={
        <Link href="/orders" className="focus-ring rounded-md text-sm font-bold text-brand-fg hover:underline">
          All orders
        </Link>
      }
    >
      <div
        className="flex h-3 overflow-hidden rounded-full bg-surface-muted"
        role="img"
        aria-label={PIPELINE.map((s) => `${flight[s.key]} ${s.label.toLowerCase()}`).join(", ")}
      >
        {total > 0 &&
          PIPELINE.map((stage, i) =>
            flight[stage.key] ? (
              <div
                key={stage.key}
                className={cn("h-full transition-[width] duration-500 motion-reduce:transition-none", STAGE_BAR[i])}
                style={{ width: `${(flight[stage.key] / total) * 100}%` }}
              />
            ) : null,
          )}
      </div>
      <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {PIPELINE.map((stage, i) => (
          <li key={stage.key}>
            <Link
              href={stage.status ? `/orders?status=${stage.status}` : "/orders"}
              className="focus-ring flex h-full flex-col rounded-lg border border-line px-3 py-2.5 transition-colors hover:bg-surface-subtle"
            >
              <span className="flex items-start gap-1.5 text-xs font-semibold text-fg-muted">
                <span aria-hidden className={cn("mt-1 size-2 shrink-0 rounded-full", STAGE_BAR[i])} />
                {stage.label}
              </span>
              <span className="mt-auto block pt-1 text-xl font-extrabold tabular-nums text-fg-heading">
                {nf(flight[stage.key])}
              </span>
              {stage.key === "searching" && flight.searching_long > 0 && (
                <span className="mt-0.5 block text-[11px] font-semibold text-warning-fg">
                  {nf(flight.searching_long)} over 10 min
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 flex items-center gap-2 text-sm text-fg-muted">
        <Truck className="size-4 text-success-fg" aria-hidden />
        <span>
          <strong className="font-bold text-fg">{nf(overview.orders.delivered_today)}</strong> delivered today
        </span>
      </p>
    </Panel>
  );
}

// ── Spend ─────────────────────────────────────────────────────────────────────

function Spend({ overview }: { overview: OverviewDto }) {
  const { spend, wallet } = overview;
  const delta = countDelta(spend.last_7_days, spend.previous_7_days);
  const max = Math.max(spend.last_7_days, spend.previous_7_days, 1);
  const bars = [
    { label: "Last 7 days", value: spend.last_7_days, className: "bg-brand" },
    { label: "The 7 before", value: spend.previous_7_days, className: "bg-line-strong" },
  ];
  return (
    <Panel
      title="Spend"
      description="Order payments less refunds"
      actions={
        <Link href="/wallet" className="focus-ring rounded-md text-sm font-bold text-brand-fg hover:underline">
          Wallet
        </Link>
      }
    >
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-fg-subtle">This month</p>
      <p className="mt-1 text-[1.75rem] font-extrabold leading-tight tracking-tight tabular-nums text-fg-heading">
        {formatMoney(spend.month_to_date, spend.currency)}
      </p>
      <ul className="mt-5 space-y-3">
        {bars.map((bar) => (
          <li key={bar.label}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="text-fg-muted">{bar.label}</span>
              <span className="font-semibold tabular-nums text-fg">{formatMoney(bar.value, spend.currency)}</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-muted">
              <div
                className={cn("h-full rounded-full transition-[width] duration-500", bar.className)}
                style={{ width: `${(bar.value / max) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      {delta && delta.direction !== "flat" && (
        <p className="mt-4 text-xs text-fg-subtle">
          {delta.value} on the week before
          {wallet?.runway_days !== null && wallet?.runway_days !== undefined
            ? ` · ${runwayLabel(wallet.runway_days)?.toLowerCase()}`
            : ""}
        </p>
      )}
    </Panel>
  );
}

// ── Orders over 14 days ───────────────────────────────────────────────────────

function OrdersTrend({ overview }: { overview: OverviewDto }) {
  const week = overview.orders.last_7_days;
  return (
    <Panel
      title="Orders, last 14 days"
      description={`${nf(week.created)} this week · ${nf(overview.orders.previous_7_days.created)} the week before`}
      actions={
        <Link href="/usage" className="focus-ring rounded-md text-sm font-bold text-brand-fg hover:underline">
          Usage
        </Link>
      }
    >
      <OrdersChart
        days={overview.orders.per_day}
        empty={
          <span>
            No orders in the last 14 days.{" "}
            <Link href="/orders/new" className="font-bold text-brand-fg hover:underline">
              Create one
            </Link>
          </span>
        }
      />
    </Panel>
  );
}

// ── Recent orders ─────────────────────────────────────────────────────────────

function RecentOrders() {
  const { team, mode, can } = useWorkspace();
  const allowed = can("orders.read");
  const list = useOrders(team.id, mode, {});
  const rows = allowed ? (list.data?.pages[0]?.data ?? []).slice(0, 5) : [];
  return (
    <Panel
      title="Latest orders"
      flush
      actions={
        allowed ? (
          <Link href="/orders" className="focus-ring rounded-md text-sm font-bold text-brand-fg hover:underline">
            View all
          </Link>
        ) : undefined
      }
    >
      {!allowed ? (
        <p className="p-5 text-sm text-fg-muted">Your role doesn&apos;t include orders.</p>
      ) : list.isLoading ? (
        <div className="space-y-3 p-5">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <div className="p-5 text-sm text-fg-muted">
          No {mode} orders yet.{" "}
          <Link href="/orders/new" className="font-bold text-brand-fg hover:underline">
            Create one
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-line">
          {rows.map((order) => {
            const route = routeSummary(order);
            return (
              <li key={order.id}>
                <Link
                  href={`/orders/${order.id}`}
                  className="focus-ring flex items-center gap-3 px-5 py-3 transition-colors hover:bg-surface-subtle/60"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-fg">
                      {order.reference ?? `#${order.number}`}
                    </span>
                    <span className="block truncate text-xs text-fg-subtle">
                      {route.to}
                      {route.more > 0 ? ` +${route.more}` : ""}
                    </span>
                  </span>
                  <span className="flex shrink-0 flex-col items-end gap-1">
                    <OrderStatusBadge status={order.status} />
                    <span className="text-[11px] text-fg-subtle" title={formatDateTime(order.created)}>
                      {timeAgo(order.created)}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </Panel>
  );
}

// ── API traffic ───────────────────────────────────────────────────────────────

const hourLabel = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Lagos" });

function ApiTraffic({ overview }: { overview: OverviewDto }) {
  const { api } = overview;
  const [hover, setHover] = React.useState<number | null>(null);
  const max = Math.max(1, ...api.per_hour.map((h) => h.requests));
  const shown = hover !== null ? api.per_hour[hover] : null;
  const stats = [
    { label: "Requests", value: nf(api.requests) },
    { label: "Errors", value: nf(api.errors), tone: api.errors ? "text-danger-fg" : undefined },
    { label: "Median", value: latency(api.p50_ms) },
    { label: "p95", value: latency(api.p95_ms) },
  ];
  return (
    <Panel
      title="API traffic, last 24 hours"
      description={
        api.last_request_at ? `Last request ${timeAgo(api.last_request_at)}` : "No requests with this mode's keys yet"
      }
      actions={
        <Link href="/logs" className="focus-ring rounded-md text-sm font-bold text-brand-fg hover:underline">
          Request logs
        </Link>
      }
    >
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg bg-surface-subtle px-3 py-2">
            <dt className="text-xs font-semibold text-fg-muted">{s.label}</dt>
            <dd className={cn("text-lg font-extrabold tabular-nums text-fg-heading", s.tone)}>{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className="relative mt-5">
        <div
          aria-hidden
          className="flex h-28 items-end gap-[3px]"
          onPointerLeave={(e) => e.pointerType === "mouse" && setHover(null)}
        >
          {api.per_hour.map((h, i) => {
            const ok = h.requests - h.errors;
            return (
              <div
                key={h.hour}
                onPointerEnter={() => setHover(i)}
                onPointerDown={() => setHover(i)}
                className={cn(
                  "flex h-full flex-1 flex-col justify-end rounded-sm transition-opacity",
                  hover !== null && hover !== i && "opacity-50",
                )}
              >
                {h.errors > 0 && (
                  <div className="w-full rounded-t-[2px] bg-danger" style={{ height: `${(h.errors / max) * 100}%` }} />
                )}
                <div
                  className={cn("w-full bg-brand/70", h.errors ? "" : "rounded-t-[2px]")}
                  style={{ height: ok ? `max(${(ok / max) * 100}%, 2px)` : "0%" }}
                />
                {!h.requests && <div className="h-[2px] w-full rounded-full bg-surface-muted" />}
              </div>
            );
          })}
        </div>
        <div aria-hidden className="mt-1.5 flex justify-between text-[11px] tabular-nums text-fg-subtle">
          <span>{hourLabel(api.per_hour[0].hour)}</span>
          <span>{hourLabel(api.per_hour[12].hour)}</span>
          <span>Now</span>
        </div>
        <p aria-live="polite" className="mt-2 min-h-5 text-xs text-fg-muted">
          {shown ? (
            <>
              <strong className="font-semibold text-fg">{hourLabel(shown.hour)}</strong> · {nf(shown.requests)} requests
              {shown.errors ? `, ${nf(shown.errors)} errors` : ""}
            </>
          ) : (
            <span className="inline-flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden className="size-2 rounded-sm bg-brand/70" /> Succeeded
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden className="size-2 rounded-sm bg-danger" /> Errors
              </span>
            </span>
          )}
        </p>
        <table className="sr-only">
          <caption>Requests per hour, last 24 hours</caption>
          <tbody>
            {api.per_hour.map((h) => (
              <tr key={h.hour}>
                <th scope="row">{hourLabel(h.hour)}</th>
                <td>{h.requests} requests</td>
                <td>{h.errors} errors</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {api.top_errors.length > 0 && (
        <div className="mt-5 border-t border-line pt-4">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-fg-subtle">Most frequent errors</p>
          <ul className="mt-2 space-y-1.5">
            {api.top_errors.map((e) => (
              <li key={`${e.code}-${e.status}`} className="flex items-center justify-between gap-3 text-sm">
                <Link
                  href={`/docs/errors#${e.code}`}
                  className="focus-ring flex min-w-0 items-center gap-2 rounded-sm hover:underline"
                >
                  <Badge tone={e.status >= 500 ? "danger" : "warning"}>{e.status}</Badge>
                  <code className="truncate font-mono text-[13px] text-fg">{e.code}</code>
                </Link>
                <span className="shrink-0 tabular-nums text-fg-muted">{nf(e.count)}×</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Panel>
  );
}

// ── Webhooks and keys ─────────────────────────────────────────────────────────

function Integration({ overview }: { overview: OverviewDto }) {
  const { webhooks, keys } = overview;
  const hookTone = webhooks.failing
    ? "danger"
    : webhooks.disabled
      ? "warning"
      : webhooks.endpoints
        ? "success"
        : "neutral";
  const hookLabel = webhooks.failing
    ? `${webhooks.failing} failing`
    : webhooks.disabled
      ? `${webhooks.disabled} turned off`
      : webhooks.endpoints
        ? "Healthy"
        : "None yet";
  return (
    <div className="space-y-6">
      <Panel
        title="Webhooks"
        actions={
          <Badge tone={hookTone} dot>
            {hookLabel}
          </Badge>
        }
      >
        {webhooks.endpoints ? (
          <>
            {webhooks.success_rate === null ? (
              <p className="text-sm text-fg-muted">No deliveries in the last 24 hours.</p>
            ) : (
              <>
                <p className="text-[1.75rem] font-extrabold leading-tight tracking-tight tabular-nums text-fg-heading">
                  {percent(webhooks.success_rate)}
                </p>
                <p className="text-xs text-fg-subtle">delivered in the last 24 hours</p>
              </>
            )}
            <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                { label: "Sent", value: webhooks.succeeded },
                { label: "Failed", value: webhooks.failed },
                { label: "Waiting", value: webhooks.pending },
              ].map((s) => (
                <div key={s.label} className="rounded-lg bg-surface-subtle px-2 py-2">
                  <dt className="text-[11px] font-semibold text-fg-muted">{s.label}</dt>
                  <dd className="text-base font-extrabold tabular-nums text-fg-heading">{nf(s.value)}</dd>
                </div>
              ))}
            </dl>
            <Link
              href="/webhooks"
              className="focus-ring mt-4 inline-flex items-center gap-1 rounded-md text-sm font-bold text-brand-fg hover:underline"
            >
              {nf(webhooks.endpoints)} {webhooks.endpoints === 1 ? "endpoint" : "endpoints"}{" "}
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </>
        ) : (
          <EmptyHint
            icon={<Webhook />}
            text="Get order updates pushed to your server instead of polling."
            href="/webhooks"
            action="Add an endpoint"
          />
        )}
      </Panel>
      <Panel
        title="API keys"
        actions={
          keys.expiring_soon ? (
            <Badge tone="warning" dot>
              {keys.expiring_soon} expiring
            </Badge>
          ) : undefined
        }
      >
        {keys.active ? (
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-subtle text-brand-fg"
            >
              <KeyRound className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-fg">
                {nf(keys.active)} active {keys.active === 1 ? "key" : "keys"}
              </p>
              <p className="text-xs text-fg-subtle">
                {keys.last_used_at ? `Last used ${timeAgo(keys.last_used_at)}` : "Not used yet"}
                {keys.next_expiry_at ? ` · next expires ${timeAgo(keys.next_expiry_at)}` : ""}
              </p>
            </div>
          </div>
        ) : (
          <EmptyHint
            icon={<KeyRound />}
            text={`No ${overview.livemode ? "live" : "test"} key yet. Your server needs one to call the API.`}
            href={overview.livemode ? "/keys?create=live" : "/keys?create=test"}
            action="Create a key"
          />
        )}
      </Panel>
    </div>
  );
}

function EmptyHint({
  icon,
  text,
  href,
  action,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
  action: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        aria-hidden
        className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface-muted text-fg-muted [&_svg]:size-4"
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm text-fg-muted">{text}</p>
        <Link
          href={href}
          className="focus-ring mt-1.5 inline-flex items-center gap-1 rounded-md text-sm font-bold text-brand-fg hover:underline"
        >
          {action} <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

// ── Quick actions and loading ─────────────────────────────────────────────────

export function QuickActions() {
  const { can, mode } = useWorkspace();
  const actions = [
    can("orders.write") && { href: "/orders/new", label: "New order", icon: PackagePlus },
    can("keys.write") && { href: `/keys?create=${mode}`, label: "Create key", icon: Plus },
    can("webhooks.write") && { href: "/webhooks", label: "Add webhook", icon: Webhook },
    can("logs.read") && { href: "/logs", label: "Request logs", icon: Gauge },
  ].filter(Boolean) as { href: string; label: string; icon: typeof Plus }[];
  return (
    <nav
      aria-label="Quick actions"
      className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
    >
      {actions.map((a) => (
        <Link
          key={a.href}
          href={a.href}
          className="focus-ring inline-flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border border-line bg-surface px-3.5 text-sm font-semibold text-fg shadow-button transition-colors hover:border-line-strong hover:bg-surface-subtle"
        >
          <a.icon className="size-4 text-brand-fg" aria-hidden />
          {a.label}
        </Link>
      ))}
      <a
        href={DOCS_URL}
        target="_blank"
        rel="noreferrer"
        className="focus-ring inline-flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border border-line bg-surface px-3.5 text-sm font-semibold text-fg shadow-button transition-colors hover:border-line-strong hover:bg-surface-subtle"
      >
        <BookOpen className="size-4 text-brand-fg" aria-hidden />
        Docs
      </a>
    </nav>
  );
}

export function OverviewSkeleton() {
  return (
    <div aria-busy aria-label="Loading your numbers" className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-[11.5rem] rounded-xl" />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <Skeleton className="h-64 rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <Skeleton className="h-80 rounded-xl" />
        <Skeleton className="h-80 rounded-xl" />
      </div>
    </div>
  );
}
