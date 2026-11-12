"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { KeyRound, MoreHorizontal, Plus, RotateCw, ShieldCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { CreateKeyDialog } from "./create-key-dialog";
import { RollKeyDialog } from "./roll-key-dialog";
import { ApiErrorAlert } from "@/components/auth";
import { ConfirmDialog } from "@/components/kit/confirm-dialog";
import { EmptyState } from "@/components/kit/empty-state";
import { PageHeader } from "@/components/kit/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Menu, MenuItem, MenuSeparator } from "@/components/ui/menu";
import { Skeleton } from "@/components/ui/skeleton";
import { toApiError } from "@/lib/dashboard/errors";
import { formatDate, formatDateTime, timeAgo } from "@/lib/dashboard/format";
import { useApiKeys, useRevokeKey } from "@/lib/dashboard/hooks";
import { describeScopes } from "@/lib/dashboard/scopes";
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";
import type { DeveloperApiKeyDto } from "@/services/apiService";

const COLUMNS = "md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,0.8fr)_2.25rem]";

/** The team's secret keys in the current mode: create, roll, revoke. */
export function KeysPage() {
  const { team, mode, can } = useWorkspace();
  const keys = useApiKeys(team.id, mode);
  const revoke = useRevokeKey(team.id, mode);
  const writes = can("keys.write");

  const [creating, setCreating] = React.useState(false);
  const [rolling, setRolling] = React.useState<DeveloperApiKeyDto | null>(null);
  const [revoking, setRevoking] = React.useState<DeveloperApiKeyDto | null>(null);
  useCreateFromLink(writes, () => setCreating(true));

  if (!can("keys.read")) {
    return (
      <EmptyState
        icon={<KeyRound />}
        title="You can't see API keys"
        description="Your role in this team doesn't include them."
      />
    );
  }

  const create = writes ? (
    <Button onClick={() => setCreating(true)}>
      <Plus /> Create {mode} key
    </Button>
  ) : null;

  return (
    <>
      <PageHeader
        title="API keys"
        description="Your server sends a secret key with every request. Keep keys on your server, never in an app or a browser."
        actions={keys.data?.length ? create : null}
      />

      {keys.error ? (
        <div className="space-y-3">
          <ApiErrorAlert error={toApiError(keys.error)} />
          <Button variant="secondary" onClick={() => void keys.refetch()}>
            Try again
          </Button>
        </div>
      ) : (
        <section
          aria-label={`${mode === "live" ? "Live" : "Test"} keys`}
          className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card"
        >
          {keys.data && !keys.data.length ? (
            <EmptyState
              icon={<KeyRound />}
              title={`No ${mode} keys yet`}
              description={
                mode === "live"
                  ? "Create a live key for your production server. It moves real money and sends real riders."
                  : "Create one to call the API from your code. Test keys only touch test data."
              }
              action={create ?? <p className="text-sm text-fg-subtle">Ask a developer or admin to create one.</p>}
            />
          ) : (
            <>
              <div
                className={cn(
                  "hidden gap-4 border-b border-line bg-surface-subtle/60 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-fg-subtle md:grid",
                  COLUMNS,
                )}
                aria-hidden
              >
                <span>Name</span>
                <span>Key</span>
                <span>Access</span>
                <span>Last used</span>
                <span />
              </div>
              <ul className="divide-y divide-line">
                {keys.data
                  ? keys.data.map((key) => (
                      <KeyRow
                        key={key.id}
                        apiKey={key}
                        writes={writes}
                        onRoll={() => setRolling(key)}
                        onRevoke={() => setRevoking(key)}
                      />
                    ))
                  : Array.from({ length: 3 }, (_, i) => (
                      <li key={i} className="px-5 py-4">
                        <Skeleton className="h-10 w-full" />
                      </li>
                    ))}
              </ul>
              <p className="flex items-center gap-2 border-t border-line bg-surface-subtle/60 px-5 py-3 text-[13px] text-fg-muted">
                <ShieldCheck className="size-4 shrink-0 text-success-fg" aria-hidden />A key is shown in full once, when
                it&apos;s made. Pickriders keeps only a hash.
              </p>
            </>
          )}
        </section>
      )}

      <CreateKeyDialog open={creating} onClose={() => setCreating(false)} />
      <RollKeyDialog apiKey={rolling} onClose={() => setRolling(null)} />
      <ConfirmDialog
        open={revoking !== null}
        onOpenChange={(open) => !open && setRevoking(null)}
        title={`Revoke ${revoking?.label ?? "key"}?`}
        description={
          <>
            Requests with this key fail straight away. This can&apos;t be undone.
            {revoking?.livemode && " It's a live key: anything using it stops taking deliveries."}
          </>
        }
        confirmLabel="Revoke key"
        typeToConfirm={revoking?.livemode ? revoking.label : undefined}
        onConfirm={async () => {
          if (!revoking) return;
          try {
            await revoke.mutateAsync(revoking.id);
            toast.success(`${revoking.label} revoked`);
          } catch (e) {
            toast.error(toApiError(e).message);
          }
        }}
      />
    </>
  );
}

/** `?create=test` (or live) from the checklist opens the dialog in that mode, once. */
function useCreateFromLink(writes: boolean, open: () => void) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { mode, setMode, liveUnlocked } = useWorkspace();
  const wanted = params.get("create");

  React.useEffect(() => {
    if (wanted !== "test" && wanted !== "live") return;
    router.replace(pathname, { scroll: false });
    if (!writes || (wanted === "live" && !liveUnlocked)) return;
    if (wanted !== mode) setMode(wanted);
    open();
    // Once per arrival with the parameter.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wanted]);
}

function KeyRow({
  apiKey,
  writes,
  onRoll,
  onRevoke,
}: {
  apiKey: DeveloperApiKeyDto;
  writes: boolean;
  onRoll: () => void;
  onRevoke: () => void;
}) {
  const expiring = apiKey.status === "EXPIRING" && apiKey.expiresAt;
  return (
    <li
      data-key={apiKey.label}
      className={cn("grid grid-cols-[minmax(0,1fr)_2.25rem] items-center gap-x-4 gap-y-2 px-5 py-4", COLUMNS)}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate font-semibold text-fg">{apiKey.label}</span>
          {expiring && (
            <Badge tone="warning" dot>
              Stops {timeAgo(apiKey.expiresAt as string)}
            </Badge>
          )}
        </div>
        <p className="mt-0.5 truncate text-xs text-fg-subtle">
          Created {formatDate(apiKey.createdAt)}
          {apiKey.createdBy && ` by ${apiKey.createdBy.name}`}
        </p>
      </div>

      <div className="col-span-2 row-start-2 min-w-0 md:col-span-1 md:row-start-auto">
        <code className="inline-flex max-w-full items-center rounded-lg bg-surface-subtle px-2 py-1 text-xs text-fg">
          <span className="truncate">{apiKey.prefix}</span>
          <span className="text-fg-subtle" aria-hidden>
            ••••••••
          </span>
        </code>
      </div>

      <p
        className={cn(
          "col-span-2 row-start-3 truncate text-sm md:col-span-1 md:row-start-auto",
          apiKey.scopes.length ? "text-fg" : "text-fg-muted",
        )}
        title={describeScopes(apiKey.scopes)}
      >
        <span className="text-fg-subtle md:hidden">Access: </span>
        {describeScopes(apiKey.scopes)}
      </p>

      <p
        className="col-span-2 row-start-4 text-sm text-fg-muted md:col-span-1 md:row-start-auto"
        title={
          apiKey.lastUsedAt
            ? `${formatDateTime(apiKey.lastUsedAt)}${apiKey.lastUsedIp ? ` from ${apiKey.lastUsedIp}` : ""}`
            : undefined
        }
      >
        <span className="text-fg-subtle md:hidden">Last used </span>
        {apiKey.lastUsedAt ? timeAgo(apiKey.lastUsedAt) : "Never"}
      </p>

      <div className="col-start-2 row-start-1 justify-self-end md:col-start-auto md:row-start-auto">
        {writes && (
          <Menu
            label={`${apiKey.label} actions`}
            align="end"
            trigger={({ ref, ...props }) => (
              <button
                ref={ref}
                type="button"
                {...props}
                aria-label={`Actions for ${apiKey.label}`}
                className="focus-ring grid size-9 place-items-center rounded-lg text-fg-subtle transition-colors hover:bg-surface-subtle hover:text-fg"
              >
                <MoreHorizontal className="size-[18px]" aria-hidden />
              </button>
            )}
          >
            {!expiring && (
              <>
                <MenuItem icon={<RotateCw />} onSelect={onRoll}>
                  Roll key
                </MenuItem>
                <MenuSeparator />
              </>
            )}
            <MenuItem icon={<Trash2 />} tone="danger" onSelect={onRevoke}>
              Revoke key
            </MenuItem>
          </Menu>
        )}
      </div>
    </li>
  );
}
