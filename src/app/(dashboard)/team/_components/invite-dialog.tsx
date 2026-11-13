"use client";

import * as React from "react";
import { toast } from "sonner";

import { ApiErrorAlert, Field } from "@/components/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { ROLE_HINTS, ROLE_LABELS } from "@/lib/auth/roles";
import type { InvitableRole } from "@/lib/dashboard/api";
import type { ApiError } from "@/lib/dashboard/errors";
import { useInvite } from "@/lib/dashboard/hooks";
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";

export const INVITABLE: InvitableRole[] = ["TEAM_ADMIN", "TEAM_DEVELOPER", "TEAM_FINANCE", "TEAM_VIEWER"];

/** One email, one role: the invitation link goes out by email and lasts seven days. */
export function InviteDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { team } = useWorkspace();
  const invite = useInvite(team.id);
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState<InvitableRole>("TEAM_DEVELOPER");
  const [failure, setFailure] = React.useState<ApiError | null>(null);
  const [emailError, setEmailError] = React.useState<string | null>(null);

  // Cleared on the way out, not on the way in: whatever is typed the moment it opens stays.
  const close = () => {
    if (invite.isPending) return;
    setEmail("");
    setRole("TEAM_DEVELOPER");
    setFailure(null);
    setEmailError(null);
    onClose();
  };

  return (
    <Modal open={open} onClose={close} title={`Invite someone to ${team.name}`}>
      <form
        noValidate
        className="space-y-5"
        onSubmit={async (e) => {
          e.preventDefault();
          setFailure(null);
          if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setEmailError("Enter their email, like bo@acme.com.");
          try {
            await invite.mutateAsync({ email: email.trim().toLowerCase(), role });
            toast.success(`Invitation sent to ${email.trim()}`);
            close();
          } catch (error) {
            const apiError = error as ApiError;
            if (apiError.param === "email") setEmailError(apiError.message);
            else setFailure(apiError);
          }
        }}
      >
        {failure && <ApiErrorAlert error={failure} />}
        <Field id="invite-email" label="Email" error={emailError}>
          {(a11y) => (
            <Input
              {...a11y}
              type="email"
              inputMode="email"
              autoCapitalize="none"
              autoFocus
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(null);
              }}
              placeholder="bo@acme.com"
            />
          )}
        </Field>
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-fg">Role</legend>
          <div role="radiogroup" aria-label="Role" className="space-y-2">
            {INVITABLE.map((r) => (
              <button
                key={r}
                type="button"
                role="radio"
                aria-checked={role === r}
                onClick={() => setRole(r)}
                className={cn(
                  "focus-ring flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-colors",
                  role === r
                    ? "border-brand bg-brand-subtle"
                    : "border-line-strong bg-surface hover:border-fg-subtle/50",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border-2",
                    role === r ? "border-brand-solid" : "border-line-strong",
                  )}
                >
                  {role === r && <span className="size-2 rounded-full bg-brand-solid" />}
                </span>
                <span>
                  <span className={cn("block text-sm font-bold", role === r ? "text-brand-fg" : "text-fg")}>
                    {ROLE_LABELS[r]}
                  </span>
                  <span className="block text-[13px] leading-5 text-fg-muted">{ROLE_HINTS[r]}</span>
                </span>
              </button>
            ))}
          </div>
        </fieldset>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" onClick={close} disabled={invite.isPending}>
            Cancel
          </Button>
          <Button type="submit" loading={invite.isPending}>
            Send invitation
          </Button>
        </div>
      </form>
    </Modal>
  );
}
