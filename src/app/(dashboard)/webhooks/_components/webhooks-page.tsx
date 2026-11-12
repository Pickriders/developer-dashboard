"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronRight, Plus, Webhook } from "lucide-react";

import { CreateEndpointDialog } from "./create-endpoint-dialog";
import { EndpointStatus } from "./endpoint-status";
import { ApiErrorAlert } from "@/components/auth";
import { EmptyState } from "@/components/kit/empty-state";
import { PageHeader } from "@/components/kit/page-header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toApiError } from "@/lib/dashboard/errors";
import { describeEvents } from "@/lib/dashboard/events";
import { formatDate } from "@/lib/dashboard/format";
import { useWebhookEndpoints } from "@/lib/dashboard/hooks";
import { useWorkspace } from "@/lib/workspace";

/** Where the team's events go, in the current mode. */
export function WebhooksPage() {
  const { team, mode, can } = useWorkspace();
  const endpoints = useWebhookEndpoints(team.id, mode);
  const writes = can("webhooks.write");
  const [creating, setCreating] = React.useState(false);
  useCreateFromLink(writes, () => setCreating(true));

  if (!can("webhooks.read")) {
    return (
      <EmptyState
        icon={<Webhook />}
        title="You can't see webhooks"
        description="Your role in this team doesn't include them."
      />
    );
  }

  const add = writes ? (
    <Button onClick={() => setCreating(true)}>
      <Plus /> Add endpoint
    </Button>
  ) : null;

  return (
    <>
      <PageHeader
        title="Webhooks"
        description="Pickriders tells your server the moment an order moves or your wallet changes, by posting a signed event to each endpoint."
        actions={endpoints.data?.length ? add : null}
      />

      {endpoints.error ? (
        <div className="space-y-3">
          <ApiErrorAlert error={toApiError(endpoints.error)} />
          <Button variant="secondary" onClick={() => void endpoints.refetch()}>
            Try again
          </Button>
        </div>
      ) : (
        <section
          aria-label={`${mode === "live" ? "Live" : "Test"} endpoints`}
          className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card"
        >
          {endpoints.data && !endpoints.data.length ? (
            <EmptyState
              icon={<Webhook />}
              title={`No ${mode} endpoints yet`}
              description="Add the URL on your server that should hear about pickups, deliveries and payments as they happen."
              action={add ?? <p className="text-sm text-fg-subtle">Ask a developer or admin to add one.</p>}
            />
          ) : (
            <ul className="divide-y divide-line">
              {endpoints.data
                ? endpoints.data.map((endpoint) => (
                    <li key={endpoint.id}>
                      <Link
                        href={`/webhooks/${endpoint.id}`}
                        data-endpoint={endpoint.url}
                        className="focus-ring group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-subtle/60"
                      >
                        <span
                          aria-hidden
                          className="hidden size-10 shrink-0 place-items-center rounded-xl bg-brand-subtle text-brand-fg sm:grid"
                        >
                          <Webhook className="size-[18px]" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-2">
                            <code className="truncate text-sm font-semibold text-fg">{endpoint.url}</code>
                            <EndpointStatus endpoint={endpoint} />
                          </span>
                          <span className="mt-0.5 block truncate text-sm text-fg-muted">
                            {[
                              endpoint.description,
                              describeEvents(endpoint.enabled_events),
                              `Added ${formatDate(endpoint.created)}`,
                            ]
                              .filter(Boolean)
                              .join(" · ")}
                          </span>
                        </span>
                        <ChevronRight
                          className="size-4 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ))
                : Array.from({ length: 2 }, (_, i) => (
                    <li key={i} className="px-5 py-4">
                      <Skeleton className="h-11 w-full" />
                    </li>
                  ))}
            </ul>
          )}
        </section>
      )}

      <CreateEndpointDialog open={creating} onClose={() => setCreating(false)} />
    </>
  );
}

/** `?create=1` from the checklist opens the dialog, once. */
function useCreateFromLink(writes: boolean, open: () => void) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const wanted = params.get("create") === "1";
  React.useEffect(() => {
    if (!wanted) return;
    router.replace(pathname, { scroll: false });
    if (writes) open();
    // Once per arrival with the parameter.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wanted]);
}
