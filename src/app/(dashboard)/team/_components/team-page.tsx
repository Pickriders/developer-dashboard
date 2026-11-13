"use client";

import * as React from "react";
import { Crown, Mail, MoreHorizontal, RotateCw, Trash2, UserPlus, Users } from "lucide-react";
import { toast } from "sonner";

import { INVITABLE, InviteDialog } from "./invite-dialog";
import { ApiErrorAlert } from "@/components/auth";
import { ConfirmDialog } from "@/components/kit/confirm-dialog";
import { PageHeader } from "@/components/kit/page-header";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Menu, MenuItem, MenuLabel, MenuSeparator } from "@/components/ui/menu";
import { Skeleton } from "@/components/ui/skeleton";
import { ROLE_LABELS, ROLE_RANK } from "@/lib/auth/roles";
import type { ApiError } from "@/lib/dashboard/errors";
import { toApiError } from "@/lib/dashboard/errors";
import { formatDate, timeAgo } from "@/lib/dashboard/format";
import {
  useInvitations,
  useLeaveTeam,
  useMembers,
  useRemoveMember,
  useResendInvitation,
  useRevokeInvitation,
  useSetRole,
  useTransferOwnership,
} from "@/lib/dashboard/hooks";
import { crossSessionBoundary } from "@/lib/session/navigate";
import { useWorkspace } from "@/lib/workspace";
import type { TeamMemberDto } from "@/services/apiService";

type Confirm =
  { kind: "remove"; member: TeamMemberDto } | { kind: "transfer"; member: TeamMemberDto } | { kind: "leave" } | null;

/** Who is in the team, what each can do, and who has been asked to join. */
export function TeamPage() {
  const { team, can } = useWorkspace();
  const manages = can("team.manage");
  const members = useMembers(team.id);
  const invitations = useInvitations(team.id, manages);
  const [inviting, setInviting] = React.useState(false);
  const [confirm, setConfirm] = React.useState<Confirm>(null);
  const setRole = useSetRole(team.id);
  const remove = useRemoveMember(team.id);
  const leave = useLeaveTeam(team.id);
  const transfer = useTransferOwnership(team.id);
  const pending = (invitations.data ?? []).filter((i) => i.status === "PENDING");
  const me = members.data?.find((m) => m.isYou);

  const fail = (e: unknown) => toast.error((e as ApiError).message ?? toApiError(e).message);

  return (
    <>
      <PageHeader
        title="Team"
        description={`Everyone who works on ${team.name}'s integration, and what each of them can do.`}
        actions={
          manages ? (
            <Button onClick={() => setInviting(true)}>
              <UserPlus /> Invite people
            </Button>
          ) : null
        }
      />

      {members.error ? (
        <ApiErrorAlert error={toApiError(members.error)} />
      ) : (
        <div className="space-y-6">
          <section
            aria-label="Members"
            className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card"
          >
            <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
              <h2 className="text-base font-bold text-fg-heading">
                Members {members.data && <span className="font-semibold text-fg-subtle">· {members.data.length}</span>}
              </h2>
              {me && !me.isOwner && (
                <Button variant="ghost" size="sm" onClick={() => setConfirm({ kind: "leave" })}>
                  Leave team
                </Button>
              )}
            </div>
            <ul className="divide-y divide-line">
              {!members.data
                ? Array.from({ length: 3 }, (_, i) => (
                    <li key={i} className="px-5 py-4">
                      <Skeleton className="h-10 w-full" />
                    </li>
                  ))
                : members.data.map((member) => {
                    const mine = ROLE_RANK[team.role] ?? 0;
                    const theirs = ROLE_RANK[member.role] ?? 0;
                    const editable = manages && !member.isYou && !member.isOwner && theirs <= mine;
                    const canTransfer = can("team.transfer") && !member.isYou;
                    return (
                      <li
                        key={member.userId}
                        data-member={member.email}
                        className="flex items-center gap-3 px-5 py-3.5"
                      >
                        <Avatar name={member.name || member.email} size={36} />
                        <div className="min-w-0 flex-1">
                          <p className="flex items-center gap-2 truncate text-sm font-semibold text-fg">
                            <span className="truncate">{member.name || member.email}</span>
                            {member.isYou && <Badge tone="brand">You</Badge>}
                          </p>
                          <p className="truncate text-xs text-fg-subtle">
                            {member.email}
                            {member.lastLoginAt
                              ? ` · active ${timeAgo(member.lastLoginAt)}`
                              : member.joinedAt
                                ? ` · joined ${formatDate(member.joinedAt)}`
                                : ""}
                          </p>
                        </div>
                        <span className="hidden sm:block">
                          {member.isOwner ? (
                            <Badge tone="brand">
                              <Crown className="size-3" aria-hidden /> Owner
                            </Badge>
                          ) : (
                            <Badge tone="neutral">{ROLE_LABELS[member.role] ?? "Member"}</Badge>
                          )}
                        </span>
                        {(editable || canTransfer) && !member.isOwner ? (
                          <Menu
                            label={`${member.name} actions`}
                            align="end"
                            trigger={({ ref, ...props }) => (
                              <button
                                ref={ref}
                                type="button"
                                {...props}
                                aria-label={`Actions for ${member.name || member.email}`}
                                className="focus-ring grid size-9 place-items-center rounded-lg text-fg-subtle transition-colors hover:bg-surface-subtle hover:text-fg"
                              >
                                <MoreHorizontal className="size-[18px]" aria-hidden />
                              </button>
                            )}
                          >
                            {editable && (
                              <>
                                <MenuLabel>Role</MenuLabel>
                                {INVITABLE.filter((r) => (ROLE_RANK[r] ?? 0) <= mine).map((role) => (
                                  <MenuItem
                                    key={role}
                                    selected={member.role === role}
                                    hint={member.role === role ? "Current" : undefined}
                                    onSelect={async () => {
                                      if (member.role === role) return;
                                      try {
                                        await setRole.mutateAsync({ userId: member.userId, role });
                                        toast.success(`${member.name} is now ${ROLE_LABELS[role].toLowerCase()}`);
                                      } catch (e) {
                                        fail(e);
                                      }
                                    }}
                                  >
                                    {ROLE_LABELS[role]}
                                  </MenuItem>
                                ))}
                              </>
                            )}
                            {canTransfer && (
                              <>
                                <MenuSeparator />
                                <MenuItem icon={<Crown />} onSelect={() => setConfirm({ kind: "transfer", member })}>
                                  Make owner
                                </MenuItem>
                              </>
                            )}
                            {editable && (
                              <MenuItem
                                icon={<Trash2 />}
                                tone="danger"
                                onSelect={() => setConfirm({ kind: "remove", member })}
                              >
                                Remove from team
                              </MenuItem>
                            )}
                          </Menu>
                        ) : (
                          <span className="size-9" aria-hidden />
                        )}
                      </li>
                    );
                  })}
            </ul>
          </section>

          {manages && (
            <section
              aria-label="Invitations"
              className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card"
            >
              <h2 className="border-b border-line px-5 py-3.5 text-base font-bold text-fg-heading">
                Invitations{" "}
                {pending.length > 0 && <span className="font-semibold text-fg-subtle">· {pending.length}</span>}
              </h2>
              {invitations.isPending ? (
                <div className="p-5">
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : !pending.length ? (
                <div className="flex items-center gap-3 px-5 py-5 text-sm text-fg-muted">
                  <span
                    aria-hidden
                    className="grid size-9 place-items-center rounded-xl bg-surface-subtle text-fg-subtle"
                  >
                    <Users className="size-4" />
                  </span>
                  Nobody is waiting to join. Invitations you send appear here until they&apos;re accepted.
                </div>
              ) : (
                <InvitationRows invitations={pending} />
              )}
            </section>
          )}
        </div>
      )}

      <InviteDialog open={inviting} onClose={() => setInviting(false)} />

      <ConfirmDialog
        open={confirm?.kind === "remove"}
        onOpenChange={(open) => !open && setConfirm(null)}
        title={`Remove ${confirm?.kind === "remove" ? confirm.member.name || confirm.member.email : ""}?`}
        description={`They lose access to ${team.name} straight away. Keys and webhooks they made keep working.`}
        confirmLabel="Remove"
        onConfirm={async () => {
          if (confirm?.kind !== "remove") return;
          try {
            await remove.mutateAsync(confirm.member.userId);
            toast.success(`${confirm.member.name || confirm.member.email} removed`);
          } catch (e) {
            fail(e);
          }
        }}
      />
      <ConfirmDialog
        open={confirm?.kind === "transfer"}
        onOpenChange={(open) => !open && setConfirm(null)}
        title={`Make ${confirm?.kind === "transfer" ? confirm.member.name : ""} the owner?`}
        description="They can then do everything, including hand the team on. You become an admin."
        confirmLabel="Make owner"
        destructive={false}
        typeToConfirm={team.name}
        onConfirm={async () => {
          if (confirm?.kind !== "transfer") return;
          try {
            await transfer.mutateAsync(confirm.member.userId);
            toast.success(`${confirm.member.name} now owns ${team.name}`);
          } catch (e) {
            fail(e);
          }
        }}
      />
      <ConfirmDialog
        open={confirm?.kind === "leave"}
        onOpenChange={(open) => !open && setConfirm(null)}
        title={`Leave ${team.name}?`}
        description="You lose access straight away. An owner or admin can invite you back."
        confirmLabel="Leave team"
        onConfirm={async () => {
          try {
            await leave.mutateAsync(undefined);
            crossSessionBoundary("/", `You left ${team.name}.`);
          } catch (e) {
            fail(e);
          }
        }}
      />
    </>
  );
}

function InvitationRows({ invitations }: { invitations: NonNullable<ReturnType<typeof useInvitations>["data"]> }) {
  const { team } = useWorkspace();
  const resend = useResendInvitation(team.id);
  const revoke = useRevokeInvitation(team.id);
  return (
    <ul className="divide-y divide-line">
      {invitations.map((inv) => (
        <li key={inv.id} data-invitation={inv.email} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
          <span aria-hidden className="grid size-9 place-items-center rounded-full bg-surface-subtle text-fg-subtle">
            <Mail className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 truncate text-sm font-semibold text-fg">
              <span className="truncate">{inv.email}</span>
              {inv.expired && <Badge tone="warning">Expired</Badge>}
            </p>
            <p className="truncate text-xs text-fg-subtle">
              {ROLE_LABELS[inv.role]} · invited by {inv.invitedBy.name} · sent {timeAgo(inv.lastSentAt)}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              loading={resend.isPending && resend.variables === inv.id}
              onClick={async () => {
                try {
                  await resend.mutateAsync(inv.id);
                  toast.success(`Sent again to ${inv.email}`);
                } catch (e) {
                  toast.error((e as ApiError).message);
                }
              }}
            >
              <RotateCw /> Resend
            </Button>
            <Button
              variant="ghost"
              size="sm"
              loading={revoke.isPending && revoke.variables === inv.id}
              onClick={async () => {
                try {
                  await revoke.mutateAsync(inv.id);
                  toast.success("Invitation revoked");
                } catch (e) {
                  toast.error((e as ApiError).message);
                }
              }}
            >
              Revoke
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
