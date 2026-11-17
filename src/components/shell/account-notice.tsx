"use client";

import * as React from "react";
import Link from "next/link";
import { Ban, OctagonAlert, PauseCircle } from "lucide-react";

import { useAccount } from "@/lib/dashboard/hooks";
import { useWorkspace } from "@/lib/workspace";
import type { DeveloperAccountDto } from "@/services/apiService";

export type StandingNotice = {
  kind: "team_suspended" | "live_suspended" | "live_rejected";
  title: string;
  reason: string | null;
  body: string;
  /** "Update and ask again" for a rejection the member may act on. */
  canAskAgain: boolean;
};

type Account = Pick<
  DeveloperAccountDto,
  "status" | "suspensionReason" | "liveStatus" | "liveRejectionReason" | "liveSuspensionReason" | "canRequestLive"
>;

/**
 * What's holding the team back, worst first: the whole team suspended (every key refused), then
 * live access suspended, then a live request that wasn't approved. Null when nothing is.
 */
export function standingNotice(account: Account, canRequest: boolean): StandingNotice | null {
  if (account.status === "SUSPENDED") {
    return {
      kind: "team_suspended",
      title: "Your team is suspended",
      reason: account.suspensionReason,
      body: "Every API key, test and live, is refused with account_suspended, and the dashboard is read-only. Contact support@pickriders.com to sort it out.",
      canAskAgain: false,
    };
  }
  if (account.liveStatus === "SUSPENDED") {
    return {
      kind: "live_suspended",
      title: "Live access is suspended",
      reason: account.liveSuspensionReason,
      body: "Live keys are refused until it's restored. Test mode keeps working. Contact support@pickriders.com to sort it out.",
      canAskAgain: false,
    };
  }
  if (account.liveStatus === "REJECTED") {
    return {
      kind: "live_rejected",
      title: "Your live access request wasn't approved",
      reason: account.liveRejectionReason,
      body: "Fix what's asked below, then ask again. Test mode keeps working meanwhile.",
      canAskAgain: canRequest && account.canRequestLive,
    };
  }
  return null;
}

const ICON = { team_suspended: Ban, live_suspended: PauseCircle, live_rejected: OctagonAlert };

/** The red notice at the top of every page while the team is suspended or wasn't approved. */
export function AccountNotice() {
  const { team, can } = useWorkspace();
  const account = useAccount(team.id);
  const notice = account.data ? standingNotice(account.data, can("live.request")) : null;
  if (!notice) return null;
  const Icon = ICON[notice.kind];

  return (
    <div
      role="alert"
      className="mb-6 flex flex-col gap-4 rounded-2xl border border-danger-line bg-danger-subtle px-5 py-4 sm:flex-row sm:items-start"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-danger text-white" aria-hidden>
        <Icon className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-base font-extrabold text-danger-fg">{notice.title}</p>
        {notice.reason && (
          <p className="mt-1.5 rounded-xl border border-danger-line bg-surface px-3.5 py-2.5 text-sm text-fg">
            <span className="block text-xs font-bold uppercase tracking-wide text-fg-subtle">
              {notice.kind === "live_rejected" ? "What to fix" : "Reason"}
            </span>
            {notice.reason}
          </p>
        )}
        <p className="mt-2 text-sm text-fg-muted">{notice.body}</p>
      </div>
      {notice.canAskAgain && (
        <Link
          href="/?request=live"
          className="focus-ring inline-flex h-10 shrink-0 items-center justify-center self-start rounded-xl bg-danger px-4 text-sm font-bold text-white shadow-button transition-colors hover:bg-danger/90"
        >
          Update and ask again
        </Link>
      )}
    </div>
  );
}
