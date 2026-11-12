"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { CircleSlash, LinkIcon } from "lucide-react";
import { toast } from "sonner";

import { ApiErrorAlert, AuthHeading, AuthShell, FormAlert, SignOutButton } from "@/components/auth";
import { ConfirmDialog } from "@/components/kit/confirm-dialog";
import { Button, LinkButton } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ROLE_LABELS } from "@/lib/auth/roles";
import { invitations } from "@/lib/dashboard/api";
import { type ApiError, toApiError } from "@/lib/dashboard/errors";
import { useApiMutation, useInvitationPreview, useMe } from "@/lib/dashboard/hooks";
import { crossSessionBoundary } from "@/lib/session/navigate";
import { signOut } from "@/services/apiService";

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

/**
 * Where an invitation link lands. Shows who invited you to what, then the one next step that
 * fits: accept (signed in as the invited email), sign in or sign up to accept, or switch account.
 */
export function InviteFlow() {
  const params = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const token = params.get("token");
  const preview = useInvitationPreview(token);
  const me = useMe();
  const accept = useApiMutation(invitations.accept);
  const decline = useApiMutation(invitations.decline);
  const [declining, setDeclining] = React.useState(false);
  const [declined, setDeclined] = React.useState(false);
  const [switching, setSwitching] = React.useState(false);
  const [failure, setFailure] = React.useState<ApiError | null>(null);

  if (!token)
    return (
      <Unusable
        title="This invitation link is incomplete"
        body="Open the link from the email again, or ask for a new invitation."
      />
    );

  if (preview.isPending || (me.isPending && !me.isError)) {
    return (
      <AuthShell>
        <div className="space-y-4" aria-busy>
          <Skeleton className="size-10" />
          <Skeleton className="h-7 w-56" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </AuthShell>
    );
  }

  if (preview.error) {
    const { status, message } = preview.error;
    return status === 404 ? (
      <Unusable
        title="This invitation link isn't valid"
        body="Check you opened the whole link from the email, or ask for a new invitation."
      />
    ) : status === 410 ? (
      <Unusable title="This invitation can't be used anymore" body={message} />
    ) : (
      <AuthShell>
        <ApiErrorAlert error={preview.error} />
      </AuthShell>
    );
  }

  const invite = preview.data;
  const role = ROLE_LABELS[invite.role] ?? "a member";
  const signedInEmail = me.data?.user.email ?? null;
  const signedInAsInvitee = signedInEmail?.toLowerCase() === invite.email.toLowerCase();
  const query = new URLSearchParams({ invitation: token, email: invite.email });

  if (declined) {
    return (
      <Unusable
        icon={<CircleSlash />}
        title="Invitation declined"
        body={`You won't join ${invite.teamName}. If you change your mind, ask ${invite.invitedByName} to invite you again.`}
      />
    );
  }

  return (
    <AuthShell
      topRight={
        signedInEmail ? (
          <span className="flex items-center gap-1.5">
            <span className="hidden max-w-[14rem] truncate text-fg-subtle sm:inline">{signedInEmail}</span>
            <span className="hidden text-line-strong sm:inline" aria-hidden>
              ·
            </span>
            <SignOutButton />
          </span>
        ) : null
      }
    >
      <div className="mb-6 flex size-12 items-center justify-center rounded-lg border border-line bg-surface text-lg font-semibold text-fg shadow-xs">
        {invite.teamName.trim().charAt(0).toUpperCase()}
      </div>
      <AuthHeading
        title={`Join ${invite.teamName}`}
        description={
          <>
            {invite.invitedByName} invited <span className="font-medium text-fg">{invite.email}</span> to join as {role}
            .
          </>
        }
      />

      <dl className="mb-8 divide-y divide-line rounded-md border border-line bg-surface text-sm">
        {[
          ["Team", invite.teamName],
          ["Role", role],
          ["Expires", dateFormat.format(new Date(invite.expiresAt))],
        ].map(([term, value]) => (
          <div key={term} className="flex items-center justify-between gap-4 px-3.5 py-2.5">
            <dt className="text-fg-subtle">{term}</dt>
            <dd className="font-medium text-fg">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="space-y-3">
        {failure && <ApiErrorAlert error={failure} />}

        {signedInEmail && !signedInAsInvitee && (
          <FormAlert tone="info" title={`You're signed in as ${signedInEmail}.`}>
            This invitation is for {invite.email}. Sign out, then sign in or create an account with that address.
          </FormAlert>
        )}

        {signedInAsInvitee ? (
          <Button
            fullWidth
            loading={accept.isPending}
            onClick={async () => {
              setFailure(null);
              try {
                const { team } = await accept.mutateAsync(token);
                crossSessionBoundary("/", `You joined ${team.name}.`);
              } catch (e) {
                setFailure(e as ApiError);
              }
            }}
          >
            Accept invitation
          </Button>
        ) : signedInEmail ? (
          <Button
            fullWidth
            loading={switching}
            onClick={async () => {
              setSwitching(true);
              await signOut().catch(() => undefined);
              // Stay on this invitation, now signed out, so the next step is sign in or sign up.
              queryClient.clear();
              window.location.reload();
            }}
          >
            Sign out and continue
          </Button>
        ) : (
          <LinkButton
            fullWidth
            href={
              invite.accountExists ? `/auth/login?${query}` : `/auth/signup?invitation=${encodeURIComponent(token)}`
            }
          >
            {invite.accountExists ? "Sign in to accept" : "Create account to accept"}
          </LinkButton>
        )}

        {(!signedInEmail || signedInAsInvitee) && (
          <Button variant="ghost" fullWidth onClick={() => setDeclining(true)}>
            Decline
          </Button>
        )}
      </div>

      <ConfirmDialog
        open={declining}
        onOpenChange={setDeclining}
        title="Decline this invitation?"
        description={`The link stops working, and you won't join ${invite.teamName}. ${invite.invitedByName} can invite you again later.`}
        confirmLabel="Decline invitation"
        onConfirm={async () => {
          try {
            await decline.mutateAsync(token);
            setDeclined(true);
          } catch (e) {
            setFailure(toApiError(e));
          }
        }}
      />
    </AuthShell>
  );
}

function Unusable({ title, body, icon = <LinkIcon /> }: { title: string; body: string; icon?: React.ReactNode }) {
  return (
    <AuthShell>
      <AuthHeading icon={icon} title={title} description={body} />
      <LinkButton variant="secondary" fullWidth href={"/auth/login"}>
        Go to sign in
      </LinkButton>
    </AuthShell>
  );
}
