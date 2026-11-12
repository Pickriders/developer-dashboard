"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, MoreHorizontal, Pencil, RotateCw, Send, Trash2, TriangleAlert, Webhook } from "lucide-react";
import { toast } from "sonner";

import { DeliverySheet } from "./delivery-sheet";
import { DeliveryStatus } from "./delivery-status";
import { EndpointForm } from "./endpoint-form";
import { EndpointStatus } from "./endpoint-status";
import { ApiErrorAlert, FormAlert } from "@/components/auth";
import { ConfirmDialog } from "@/components/kit/confirm-dialog";
import { EmptyState } from "@/components/kit/empty-state";
import { IdText } from "@/components/kit/id-text";
import { NewSecret } from "@/components/kit/new-secret";
import { Badge } from "@/components/ui/badge";
import { Button, LinkButton } from "@/components/ui/button";
import { Menu, MenuItem, MenuSeparator } from "@/components/ui/menu";
import { Modal } from "@/components/ui/modal";
import { Skeleton } from "@/components/ui/skeleton";
import { ToggleSwitch } from "@/components/ui/toggle-switch";
import { formatDate, formatDateTime, timeAgo } from "@/lib/dashboard/format";
import {
  useDeleteEndpoint,
  useDeliveries,
  useRollWebhookSecret,
  useTestEndpoint,
  useUpdateEndpoint,
  useWebhookEndpoint,
} from "@/lib/dashboard/hooks";
import { useWorkspace } from "@/lib/workspace";
import type { PublicWebhookEndpointDto, WebhookDeliveryDto } from "@/services/apiService";

const FAILING_DAYS = 3;

/** One endpoint: what it listens to, its secret, its switch, and every delivery we've sent it. */
export function EndpointPage({ id }: { id: string }) {
  const { team } = useWorkspace();
  const endpoint = useWebhookEndpoint(team.id, id);
  useStayInMode(endpoint.data);

  if (endpoint.error) {
    return endpoint.error.status === 404 ? (
      <EmptyState
        icon={<Webhook />}
        title="This endpoint isn't here"
        description="It may have been deleted, or it belongs to another team."
        action={
          <LinkButton href="/webhooks" variant="secondary">
            Back to webhooks
          </LinkButton>
        }
      />
    ) : (
      <ApiErrorAlert error={endpoint.error} />
    );
  }
  if (!endpoint.data) return <EndpointSkeleton />;
  return <Endpoint endpoint={endpoint.data} />;
}

/**
 * An endpoint belongs to one mode. Opened from a link in the other mode, switch to its mode if the
 * team may; switching mode while here goes back to the list, which shows that mode's endpoints.
 */
function useStayInMode(endpoint?: PublicWebhookEndpointDto) {
  const { mode, setMode, liveUnlocked } = useWorkspace();
  const router = useRouter();
  // The mode the page was opened in. Changing away from it (even before the endpoint has loaded)
  // is the person switching mode, not a link from the other mode.
  const openedIn = React.useRef(mode);
  const endpointMode = endpoint ? (endpoint.livemode ? "live" : "test") : null;

  React.useEffect(() => {
    if (!endpointMode || endpointMode === mode) return;
    if (mode === openedIn.current && (endpointMode === "test" || liveUnlocked)) {
      openedIn.current = endpointMode;
      setMode(endpointMode);
    } else router.replace("/webhooks");
  }, [endpointMode, mode, liveUnlocked, setMode, router]);
}

function Endpoint({ endpoint }: { endpoint: PublicWebhookEndpointDto }) {
  const { team, mode, can } = useWorkspace();
  const router = useRouter();
  const writes = can("webhooks.write");
  const test = useTestEndpoint(team.id, mode, endpoint.id);
  const update = useUpdateEndpoint(team.id, mode, endpoint.id);
  const remove = useDeleteEndpoint(team.id, mode, endpoint.id);

  const [editing, setEditing] = React.useState(false);
  const [rolling, setRolling] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [open, setOpen] = React.useState<WebhookDeliveryDto | null>(null);
  const enabled = endpoint.status === "enabled";

  const sendTest = async () => {
    try {
      const delivery = await test.mutateAsync(undefined);
      const attempt = delivery.attempts[delivery.attempts.length - 1];
      if (delivery.status === "succeeded")
        toast.success(`Your endpoint answered ${attempt?.status_code} in ${attempt?.duration_ms} ms`);
      else
        toast.error(
          attempt?.status_code ? `Your endpoint answered ${attempt.status_code}` : (attempt?.error ?? "No response"),
          { description: "Open the delivery to see what came back." },
        );
      setOpen(delivery);
    } catch (e) {
      toast.error((e as { message?: string }).message ?? "Couldn't send the test event.");
    }
  };

  return (
    <>
      <Link
        href="/webhooks"
        className="focus-ring mb-4 inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-fg-muted hover:text-fg"
      >
        <ArrowLeft className="size-4" aria-hidden /> Webhooks
      </Link>

      <header className="flex flex-wrap items-start justify-between gap-4 pb-6">
        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <EndpointStatus endpoint={endpoint} />
            <Badge tone={endpoint.livemode ? "success" : "warning"}>{endpoint.livemode ? "Live" : "Test"}</Badge>
          </div>
          <h1 className="break-all font-mono text-xl font-bold tracking-tight text-fg-heading sm:text-2xl">
            {endpoint.url}
          </h1>
          {endpoint.description && <p className="text-base text-fg-muted">{endpoint.description}</p>}
        </div>
        {writes && (
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="secondary" onClick={sendTest} loading={test.isPending} disabled={!enabled}>
              <Send /> Send test event
            </Button>
            <Menu
              label="Endpoint actions"
              align="end"
              trigger={({ ref, ...props }) => (
                <Button ref={ref} variant="secondary" size="icon" aria-label="More actions" {...props}>
                  <MoreHorizontal />
                </Button>
              )}
            >
              <MenuItem icon={<Pencil />} onSelect={() => setEditing(true)}>
                Edit endpoint
              </MenuItem>
              <MenuItem icon={<RotateCw />} onSelect={() => setRolling(true)}>
                Roll signing secret
              </MenuItem>
              <MenuSeparator />
              <MenuItem icon={<Trash2 />} tone="danger" onSelect={() => setDeleting(true)}>
                Delete endpoint
              </MenuItem>
            </Menu>
          </div>
        )}
      </header>

      <HealthAlert endpoint={endpoint} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <Deliveries endpoint={endpoint} onOpen={setOpen} onTest={writes && enabled ? sendTest : undefined} />

        <aside className="space-y-4">
          <section aria-label="Details" className="rounded-2xl border border-line bg-surface shadow-card">
            <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
              <div>
                <p className="text-sm font-bold text-fg-heading">Sending events</p>
                <p className="text-xs text-fg-subtle">{enabled ? "On" : "Off: nothing is sent here"}</p>
              </div>
              <ToggleSwitch
                checked={enabled}
                ariaLabel="Sending events"
                disabled={!writes || update.isPending}
                onChange={async (on) => {
                  try {
                    await update.mutateAsync({ disabled: !on });
                    toast.success(on ? "Turned on. Events go here again." : "Turned off. No events go here.");
                  } catch (e) {
                    toast.error((e as { message?: string }).message ?? "Couldn't change it.");
                  }
                }}
              />
            </div>
            <dl className="space-y-4 px-5 py-4 text-sm">
              <div>
                <dt className="mb-1.5 text-xs font-semibold text-fg-subtle">Listening to</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {endpoint.enabled_events.includes("*") ? (
                    <span className="font-semibold text-fg">All events</span>
                  ) : (
                    endpoint.enabled_events.map((type) => (
                      <code key={type} className="rounded-md bg-surface-subtle px-1.5 py-0.5 text-xs text-fg">
                        {type}
                      </code>
                    ))
                  )}
                </dd>
              </div>
              <div>
                <dt className="mb-1.5 text-xs font-semibold text-fg-subtle">Signing secret</dt>
                <dd className="space-y-1.5">
                  <code className="block rounded-lg bg-surface-subtle px-2.5 py-1.5 text-xs text-fg-muted">
                    whsec_••••••••••••••••
                  </code>
                  <p className="text-xs leading-5 text-fg-subtle">
                    Shown once, when made.{writes && " Roll it to get a new one."}
                    {endpoint.previous_secret_expires_at &&
                      ` The old one also signs events until ${formatDateTime(endpoint.previous_secret_expires_at)}.`}
                  </p>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-xs font-semibold text-fg-subtle">Endpoint id</dt>
                <dd>
                  <IdText value={endpoint.id} />
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-xs font-semibold text-fg-subtle">Added</dt>
                <dd className="text-fg">{formatDate(endpoint.created)}</dd>
              </div>
            </dl>
          </section>
        </aside>
      </div>

      <DeliverySheet endpointId={endpoint.id} delivery={open} onClose={() => setOpen(null)} />

      <Modal open={editing} onClose={() => setEditing(false)} title="Edit endpoint">
        {editing && (
          <EndpointForm
            submitLabel="Save changes"
            initial={{
              url: endpoint.url,
              description: endpoint.description ?? "",
              enabled_events: endpoint.enabled_events as never,
            }}
            onCancel={() => setEditing(false)}
            onSubmit={async (values) => {
              await update.mutateAsync({
                url: values.url,
                description: values.description,
                enabled_events: values.enabled_events,
              });
              toast.success("Endpoint saved");
              setEditing(false);
            }}
          />
        )}
      </Modal>

      <RollSecretDialog open={rolling} onClose={() => setRolling(false)} endpointId={endpoint.id} />

      <ConfirmDialog
        open={deleting}
        onOpenChange={setDeleting}
        title="Delete this endpoint?"
        description={
          <>
            Events stop going to <span className="break-all font-mono text-fg">{endpoint.url}</span> straight away, and
            its delivery history goes with it.
          </>
        }
        confirmLabel="Delete endpoint"
        typeToConfirm={endpoint.livemode ? "delete" : undefined}
        onConfirm={async () => {
          try {
            await remove.mutateAsync(undefined);
            toast.success("Endpoint deleted");
            router.replace("/webhooks");
          } catch (e) {
            toast.error((e as { message?: string }).message ?? "Couldn't delete it.");
          }
        }}
      />
    </>
  );
}

/** Failing: when it will be turned off. Turned off by us: why, and how to bring it back. */
function HealthAlert({ endpoint }: { endpoint: PublicWebhookEndpointDto }) {
  if (endpoint.status === "disabled" && endpoint.disabled_reason === "failing") {
    return (
      <div className="mb-6">
        <FormAlert title="We turned this endpoint off">
          Every delivery failed for {FAILING_DAYS} days. Fix your server, send a test event, then turn sending back on.
        </FormAlert>
      </div>
    );
  }
  if (endpoint.status === "enabled" && endpoint.failing_since) {
    const off = new Date(new Date(endpoint.failing_since).getTime() + FAILING_DAYS * 864e5);
    return (
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-warning-line bg-warning-subtle px-4 py-3 text-sm">
        <TriangleAlert className="mt-0.5 size-4 shrink-0 text-warning-fg" aria-hidden />
        <p className="text-fg">
          <span className="font-bold">Every delivery has failed since {formatDateTime(endpoint.failing_since)}.</span>{" "}
          If it keeps failing, we&apos;ll turn this endpoint off {timeAgo(off)}.
        </p>
      </div>
    );
  }
  return null;
}

function Deliveries({
  endpoint,
  onOpen,
  onTest,
}: {
  endpoint: PublicWebhookEndpointDto;
  onOpen: (delivery: WebhookDeliveryDto) => void;
  onTest?: () => void;
}) {
  const { team } = useWorkspace();
  const deliveries = useDeliveries(team.id, endpoint.id);
  const rows = deliveries.data?.pages.flat() ?? [];

  return (
    <section
      aria-labelledby="deliveries"
      className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card"
    >
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
        <h2 id="deliveries" className="text-base font-bold text-fg-heading">
          Deliveries
        </h2>
        {deliveries.isFetching && !deliveries.isFetchingNextPage && rows.length > 0 && (
          <span className="text-xs text-fg-subtle">Updating…</span>
        )}
      </div>
      {deliveries.isPending ? (
        <div className="space-y-3 p-5">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : !rows.length ? (
        <EmptyState
          icon={<Send />}
          title="No deliveries yet"
          description="Events show up here as we send them, with what your server answered."
          action={
            onTest && (
              <Button variant="secondary" onClick={onTest}>
                Send test event
              </Button>
            )
          }
        />
      ) : (
        <>
          <ul className="divide-y divide-line">
            {rows.map((delivery) => {
              const last = delivery.attempts[delivery.attempts.length - 1];
              return (
                <li key={delivery.id}>
                  <button
                    type="button"
                    onClick={() => onOpen(delivery)}
                    data-delivery={delivery.event_type}
                    className="focus-ring grid w-full grid-cols-[6.5rem_minmax(0,1fr)_auto] items-center gap-3 px-5 py-3 text-left text-sm transition-colors hover:bg-surface-subtle/60"
                  >
                    <span>
                      <DeliveryStatus delivery={delivery} />
                    </span>
                    <span className="min-w-0">
                      <code className="block truncate font-medium text-fg">{delivery.event_type}</code>
                      <span className="block truncate text-xs text-fg-subtle">
                        {last ? `${last.status_code ?? "No response"} · ${last.duration_ms} ms` : "Not tried yet"}
                        {delivery.attempt_count > 1 && ` · ${delivery.attempt_count} attempts`}
                      </span>
                    </span>
                    <span className="whitespace-nowrap text-xs text-fg-subtle" title={formatDateTime(delivery.created)}>
                      {timeAgo(delivery.created)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          {deliveries.hasNextPage && (
            <div className="border-t border-line p-3">
              <Button
                variant="ghost"
                fullWidth
                loading={deliveries.isFetchingNextPage}
                onClick={() => void deliveries.fetchNextPage()}
              >
                Show older deliveries
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

/** A new signing secret. The old one keeps signing for 24 hours, so receivers can switch over. */
function RollSecretDialog({ open, onClose, endpointId }: { open: boolean; onClose: () => void; endpointId: string }) {
  const { team, mode } = useWorkspace();
  const roll = useRollWebhookSecret(team.id, mode, endpointId);
  const [secret, setSecret] = React.useState<string | null>(null);

  const close = () => {
    if (roll.isPending) return;
    setSecret(null);
    roll.reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={close} title={secret ? "Secret rolled" : "Roll signing secret"}>
      {secret ? (
        <NewSecret title="Your new signing secret" secret={secret} onDone={close}>
          Events are signed with both secrets for the next 24 hours. Switch your server to this one before then.
        </NewSecret>
      ) : (
        <div className="space-y-5">
          <p className="text-[15px] leading-6 text-fg-muted">
            A new secret signs events from now on. For 24 hours each event carries a signature from the old one too, so
            nothing breaks while you update your server.
          </p>
          {roll.error && <ApiErrorAlert error={roll.error} />}
          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" onClick={close} disabled={roll.isPending}>
              Cancel
            </Button>
            <Button
              loading={roll.isPending}
              onClick={async () => {
                const endpoint = await roll.mutateAsync(undefined).catch(() => null);
                if (endpoint) setSecret(endpoint.secret);
              }}
            >
              Roll secret
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}

function EndpointSkeleton() {
  return (
    <div aria-busy aria-label="Loading">
      <Skeleton className="mb-4 h-5 w-24" />
      <Skeleton className="mb-2 h-6 w-32" />
      <Skeleton className="mb-8 h-8 w-96 max-w-full" />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <Skeleton className="h-80 w-full rounded-2xl" />
        <Skeleton className="h-80 w-full rounded-2xl" />
      </div>
    </div>
  );
}
