"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Check, ChevronsRight, Copy, MoreHorizontal, Package, Phone, Star, XCircle } from "lucide-react";
import { toast } from "sonner";

import { OrderMap, type MapStop } from "./order-map";
import { OrderStatusBadge } from "./order-status";
import { ApiErrorAlert } from "@/components/auth";
import { ConfirmDialog } from "@/components/kit/confirm-dialog";
import { EmptyState } from "@/components/kit/empty-state";
import { IdText } from "@/components/kit/id-text";
import { Badge } from "@/components/ui/badge";
import { Button, LinkButton } from "@/components/ui/button";
import { Menu, MenuItem, MenuSeparator } from "@/components/ui/menu";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPhone } from "@/lib/auth/phone";
import { formatDateTime, formatMoney } from "@/lib/dashboard/format";
import { useAdvanceOrder, useCancelOrder, useOrder, useOrderTracking } from "@/lib/dashboard/hooks";
import { isDone, orderTimeline, type TimelineEntry } from "@/lib/dashboard/orders";
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";
import type { PublicOrderDto } from "@/services/apiService";

/** One order: where it is on the map, what has happened, its stops, rider and price. */
export function OrderPage({ id }: { id: string }) {
  const { team, mode } = useWorkspace();
  const order = useOrder(team.id, mode, id);

  if (order.error) {
    return order.error.status === 404 ? (
      <EmptyState
        icon={<Package />}
        title="This order isn't here"
        description={`It may belong to another team, or to ${mode === "test" ? "live" : "test"} mode.`}
        action={
          <LinkButton href="/orders" variant="secondary">
            Back to orders
          </LinkButton>
        }
      />
    ) : (
      <ApiErrorAlert error={order.error} />
    );
  }
  if (!order.data) return <OrderSkeleton />;
  return <Order order={order.data} />;
}

function Order({ order }: { order: PublicOrderDto }) {
  const { team, mode, can } = useWorkspace();
  const tracking = useOrderTracking(team.id, mode, order.id, order.status);
  const advance = useAdvanceOrder(team.id, order.id);
  const cancel = useCancelOrder(team.id, mode, order.id);
  const [cancelling, setCancelling] = React.useState(false);
  const done = isDone(order.status);
  const writes = can("orders.write");
  const testMode = !order.livemode;

  const step = async (to?: "delivered") => {
    try {
      const next = await advance.mutateAsync(to);
      toast.success(to ? "Delivered" : `Now: ${next.status.replace(/_/g, " ")}`);
    } catch (e) {
      toast.error((e as { message?: string }).message ?? "Couldn't move it along.");
    }
  };

  const stops: MapStop[] = order.stops.map((s) => ({
    id: s.id,
    role: s.role,
    lat: s.lat,
    lng: s.lng,
    done: s.status === "completed",
    label: s.address,
  }));
  const rider = tracking.data?.rider?.location ?? null;
  const timeline = orderTimeline(order);

  return (
    <>
      <Link
        href="/orders"
        className="focus-ring mb-4 inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-fg-muted hover:text-fg"
      >
        <ArrowLeft className="size-4" aria-hidden /> Orders
      </Link>

      <header className="flex flex-wrap items-start justify-between gap-4 pb-6">
        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <OrderStatusBadge status={order.status} />
            {testMode && <Badge tone="warning">Test</Badge>}
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-fg-heading">
            {order.reference ?? `Order #${order.number}`}
          </h1>
          <p className="text-sm text-fg-muted">
            #{order.number} · {formatMoney(order.pricing.amount)} · created {formatDateTime(order.created)}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {writes && testMode && !done && (
            <div className="flex">
              <Button onClick={() => step()} loading={advance.isPending} className="rounded-r-none">
                <ChevronsRight /> Advance
              </Button>
              <Menu
                label="More ways to advance"
                align="end"
                trigger={({ ref, ...props }) => (
                  <Button
                    ref={ref}
                    {...props}
                    aria-label="More ways to advance"
                    disabled={advance.isPending}
                    className="rounded-l-none border-l border-white/20 px-2.5"
                  >
                    <MoreHorizontal />
                  </Button>
                )}
              >
                <MenuItem icon={<Check />} onSelect={() => step("delivered")}>
                  Deliver it now
                </MenuItem>
              </Menu>
            </div>
          )}
          <Menu
            label="Order actions"
            align="end"
            trigger={({ ref, ...props }) => (
              <Button ref={ref} variant="secondary" size="icon" aria-label="Order actions" {...props}>
                <MoreHorizontal />
              </Button>
            )}
          >
            <MenuItem
              icon={<Copy />}
              onSelect={async () => {
                await navigator.clipboard.writeText(order.tracking_url);
                toast.success("Tracking link copied");
              }}
            >
              Copy tracking link
            </MenuItem>
            {writes && !done && (
              <>
                <MenuSeparator />
                <MenuItem icon={<XCircle />} tone="danger" onSelect={() => setCancelling(true)}>
                  Cancel order
                </MenuItem>
              </>
            )}
          </Menu>
        </div>
      </header>

      {testMode && !done && writes && (
        <p className="-mt-2 mb-6 text-sm text-fg-muted">
          A test rider plays this order. <span className="font-semibold text-fg">Advance</span> moves it one step, as a
          rider would; webhooks fire at each step.
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_21rem]">
        <div className="min-w-0 space-y-6">
          <OrderMap stops={stops} rider={rider} className="aspect-[16/9]" />
          <Timeline entries={timeline} />
        </div>
        <aside className="space-y-4">
          <StopsCard order={order} />
          {order.rider && <RiderCard rider={order.rider} />}
          <PriceCard order={order} />
          <section aria-label="Details" className="rounded-2xl border border-line bg-surface p-5 shadow-card">
            <dl className="space-y-3 text-sm">
              <Row label="Order id">
                <IdText value={order.id} />
              </Row>
              {order.quote_id && (
                <Row label="Quote">
                  <IdText value={order.quote_id} />
                </Row>
              )}
              <Row label="Service area">{order.service_area}</Row>
              <Row label="Type">{order.type === "single" ? "Single" : order.type === "batch" ? "Batch" : "Bulk"}</Row>
              <Row label="Dispatch">{order.dispatch === "auto" ? "Automatic" : "Manual"}</Row>
            </dl>
          </section>
        </aside>
      </div>

      <ConfirmDialog
        open={cancelling}
        onOpenChange={setCancelling}
        title="Cancel this order?"
        description={
          order.rider
            ? "A rider is on the way, so the service charge and the trip so far are charged. The rest goes back to your wallet."
            : "Nobody has it yet, so everything held for it goes back to your wallet."
        }
        confirmLabel="Cancel order"
        onConfirm={async () => {
          try {
            await cancel.mutateAsync("Cancelled from the dashboard");
            toast.success("Order cancelled");
          } catch (e) {
            toast.error((e as { message?: string }).message ?? "Couldn't cancel it.");
          }
        }}
      />
    </>
  );
}

function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <section aria-labelledby="timeline" className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6">
      <h2 id="timeline" className="mb-4 text-base font-bold text-fg-heading">
        Timeline
      </h2>
      <ol className="relative">
        {entries.map((entry, i) => (
          <li key={entry.key} data-state={entry.state} className="relative flex gap-4 pb-5 last:pb-0">
            {i < entries.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  "absolute left-[11px] top-7 h-[calc(100%-1.5rem)] w-0.5 rounded-full",
                  entry.state === "done" ? "bg-success/50" : "bg-line",
                )}
              />
            )}
            <span
              aria-hidden
              className={cn(
                "relative z-[1] mt-0.5 grid size-6 shrink-0 place-items-center rounded-full",
                entry.state === "done" && "bg-success text-white",
                entry.state === "current" && "bg-brand-subtle ring-2 ring-brand",
                entry.state === "upcoming" && "border-2 border-line-strong bg-surface",
                entry.state === "stopped" && "bg-surface-muted text-fg-muted",
              )}
            >
              {entry.state === "done" && <Check className="size-3.5" strokeWidth={3} />}
              {entry.state === "current" && <span className="size-2 animate-pulse rounded-full bg-brand" />}
              {entry.state === "stopped" && <XCircle className="size-3.5" />}
            </span>
            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  "text-sm font-semibold",
                  entry.state === "upcoming" ? "text-fg-subtle" : "text-fg",
                  entry.state === "current" && "text-brand-fg",
                )}
              >
                {entry.label}
              </p>
              {entry.detail && <p className="truncate text-sm text-fg-muted">{entry.detail}</p>}
            </div>
            {entry.at && <time className="shrink-0 text-xs text-fg-subtle">{formatDateTime(entry.at)}</time>}
          </li>
        ))}
      </ol>
    </section>
  );
}

function StopsCard({ order }: { order: PublicOrderDto }) {
  let n = 0;
  return (
    <section aria-label="Stops" className="rounded-2xl border border-line bg-surface shadow-card">
      <h2 className="border-b border-line px-5 py-3.5 text-sm font-bold text-fg-heading">Stops</h2>
      <ol className="divide-y divide-line">
        {order.stops.map((stop) => {
          const pickup = stop.role === "pickup";
          if (!pickup) n += 1;
          return (
            <li key={stop.id} className="flex gap-3 px-5 py-3.5">
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-extrabold text-white",
                  stop.status === "completed" ? "bg-success" : pickup ? "bg-plum" : "bg-brand-solid",
                )}
              >
                {pickup ? "P" : n}
              </span>
              <div className="min-w-0 flex-1 text-sm">
                <p className="font-semibold text-fg">{stop.address}</p>
                <p className="text-fg-muted">
                  {stop.contact.name} · {formatPhone(stop.contact.phone)}
                </p>
                {stop.instructions && <p className="mt-1 text-xs text-fg-subtle">{stop.instructions}</p>}
                {stop.confirmation_code && (
                  <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-md bg-surface-subtle px-2 py-0.5 text-xs text-fg-muted">
                    Code <code className="font-bold tracking-widest text-fg">{stop.confirmation_code}</code>
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function RiderCard({ rider }: { rider: NonNullable<PublicOrderDto["rider"]> }) {
  return (
    <section
      aria-label="Rider"
      className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-5 shadow-card"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-subtle text-base font-bold text-brand-fg">
        {rider.name.charAt(0)}
      </span>
      <div className="min-w-0 flex-1 text-sm">
        <p className="font-bold text-fg">{rider.name}</p>
        <p className="flex items-center gap-1 text-fg-muted">
          {rider.rating !== null && (
            <>
              <Star className="size-3.5 fill-warning text-warning" aria-hidden />
              {rider.rating.toFixed(1)} ·{" "}
            </>
          )}
          {rider.vehicle
            ? [rider.vehicle.color, rider.vehicle.make, rider.vehicle.model].filter(Boolean).join(" ") +
              (rider.vehicle.plate_number ? ` · ${rider.vehicle.plate_number}` : "")
            : "Rider"}
        </p>
      </div>
      {rider.phone && (
        <a
          href={`tel:${rider.phone}`}
          aria-label={`Call ${rider.name}`}
          className="focus-ring grid size-9 place-items-center rounded-xl border border-line text-fg-muted hover:text-fg"
        >
          <Phone className="size-4" aria-hidden />
        </a>
      )}
    </section>
  );
}

function PriceCard({ order }: { order: PublicOrderDto }) {
  const p = order.pricing;
  return (
    <section aria-label="Price" className="rounded-2xl border border-line bg-surface p-5 shadow-card">
      <dl className="space-y-2 text-sm">
        <Row label="Delivery">{formatMoney(p.delivery_fee)}</Row>
        <Row label="Service charge">{formatMoney(p.service_charge)}</Row>
        <div className="flex items-center justify-between border-t border-line pt-2.5 text-base">
          <dt className="font-bold text-fg">Total</dt>
          <dd className="font-extrabold tabular-nums text-fg-heading">{formatMoney(p.amount)}</dd>
        </div>
        {order.cancellation && (
          <>
            <Row label="Charged">{formatMoney(order.cancellation.charged_amount ?? 0)}</Row>
            <Row label="Refunded">{formatMoney(order.cancellation.refunded_amount ?? 0)}</Row>
          </>
        )}
      </dl>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-fg-muted">{label}</dt>
      <dd className="min-w-0 truncate text-right font-medium tabular-nums text-fg">{children}</dd>
    </div>
  );
}

function OrderSkeleton() {
  return (
    <div aria-busy aria-label="Loading">
      <Skeleton className="mb-4 h-5 w-20" />
      <Skeleton className="mb-2 h-6 w-32" />
      <Skeleton className="mb-8 h-8 w-72" />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_21rem]">
        <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
        <Skeleton className="h-72 w-full rounded-2xl" />
      </div>
    </div>
  );
}
