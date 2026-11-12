"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Check, Clock, Lock, TriangleAlert } from "lucide-react";
import { toast } from "sonner";

import { LinkButton } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { formatDate } from "@/lib/dashboard/format";
import { useAccount } from "@/lib/dashboard/hooks";
import { type Mode, useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";

/**
 * Test or live, for every page. Live stays locked until Pickriders approves the team; pressing it
 * then explains the one next step (verify, request, wait, or fix what the review asked for).
 */
export function ModeSwitch() {
  const { mode, setMode, liveUnlocked } = useWorkspace();
  const [lockOpen, setLockOpen] = React.useState(false);
  const pathname = usePathname();
  React.useEffect(() => setLockOpen(false), [pathname]);

  const choose = (next: Mode) => {
    if (next === mode) return;
    if (next === "live" && !liveUnlocked) return setLockOpen((open) => !open);
    setMode(next);
    if (next === "live") toast("Live mode", { description: "Real money and real riders from here on." });
  };

  return (
    <Popover
      open={lockOpen}
      onOpenChange={setLockOpen}
      label="Live mode is locked"
      anchor={
        <div
          role="radiogroup"
          aria-label="Mode"
          className="inline-flex items-center gap-0.5 rounded-xl border border-line bg-surface-subtle p-1"
        >
          <ModeOption checked={mode === "test"} onSelect={() => choose("test")} dot="bg-warning">
            Test
          </ModeOption>
          <ModeOption checked={mode === "live"} onSelect={() => choose("live")} dot="bg-success" locked={!liveUnlocked}>
            Live
          </ModeOption>
        </div>
      }
    >
      <LiveLock />
    </Popover>
  );
}

function ModeOption({
  checked,
  onSelect,
  dot,
  locked,
  children,
}: {
  checked: boolean;
  onSelect: () => void;
  dot: string;
  locked?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      aria-label={locked ? `${children} (locked)` : undefined}
      onClick={onSelect}
      className={cn(
        "focus-ring inline-flex h-7 items-center gap-1.5 rounded-lg px-2.5 text-xs font-bold transition-all duration-150",
        checked ? "bg-surface text-fg shadow-button" : "text-fg-muted hover:text-fg",
      )}
    >
      {locked ? (
        <Lock className="size-3 text-fg-subtle" aria-hidden />
      ) : (
        <span className={cn("size-1.5 rounded-full", dot, !checked && "opacity-50")} aria-hidden />
      )}
      {children}
    </button>
  );
}

type Stage = "done" | "now" | "waiting" | "blocked" | "later";

/** Why live is locked, as three steps, and the one thing to do about it. */
function LiveLock() {
  const { team, can } = useWorkspace();
  const account = useAccount(team.id).data;
  const status = team.liveStatus;
  const verified = team.canRequestLive;
  const requested = status !== "NOT_REQUESTED";

  const stages: { label: string; stage: Stage }[] = [
    { label: "Verify the owner's email and phone", stage: verified ? "done" : "now" },
    { label: "Request live access", stage: requested ? "done" : verified ? "now" : "later" },
    {
      label: "Pickriders approves your team",
      stage: status === "PENDING" ? "waiting" : status === "REJECTED" || status === "SUSPENDED" ? "blocked" : "later",
    },
  ];

  let body: React.ReactNode;
  let action: React.ReactNode = null;
  if (status === "SUSPENDED") {
    body = account?.liveSuspensionReason
      ? `Live access is suspended: ${account.liveSuspensionReason}`
      : "Live access is suspended. Test mode still works.";
  } else if (status === "REJECTED") {
    body = account?.liveRejectionReason
      ? `Not approved yet: ${account.liveRejectionReason}`
      : "Not approved yet. Update your details and ask again.";
    if (can("live.request")) action = <LinkButton href="/?request=live">Update and ask again</LinkButton>;
  } else if (status === "PENDING") {
    body = `Your request is in review${account?.liveRequestedAt ? ` since ${formatDate(account.liveRequestedAt)}` : ""}. Live mode unlocks when it's approved; keep building in test mode meanwhile.`;
  } else if (!verified) {
    body = team.isOwner
      ? "Verify your email and phone number, then ask Pickriders to switch on live mode."
      : "The team owner verifies their email and phone number first.";
    if (team.isOwner) action = <LinkButton href="/auth/verify">Finish verifying</LinkButton>;
  } else {
    body = "Ask Pickriders to switch on live mode. An admin reviews every team first.";
    action = can("live.request") ? (
      <LinkButton href="/?request=live">Request live access</LinkButton>
    ) : (
      <p className="text-sm font-medium text-fg-subtle">The team owner or an admin asks.</p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface-muted text-fg-muted">
          <Lock className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="text-base font-bold text-fg-heading">Live mode is locked</p>
          <p className="mt-0.5 text-sm leading-5 text-fg-muted">{body}</p>
        </div>
      </div>
      <ol className="space-y-2 rounded-xl bg-surface-subtle p-3">
        {stages.map(({ label, stage }) => (
          <li key={label} className="flex items-center gap-2.5 text-sm">
            <StageIcon stage={stage} />
            <span
              className={cn(
                stage === "done" ? "text-fg-muted" : stage === "later" ? "text-fg-subtle" : "font-semibold text-fg",
              )}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>
      {action}
    </div>
  );
}

function StageIcon({ stage }: { stage: Stage }) {
  const base = "grid size-5 shrink-0 place-items-center rounded-full [&_svg]:size-3";
  if (stage === "done")
    return (
      <span className={cn(base, "bg-success text-white")} aria-label="Done">
        <Check strokeWidth={3} />
      </span>
    );
  if (stage === "waiting")
    return (
      <span className={cn(base, "bg-warning-subtle text-warning-fg")} aria-label="In review">
        <Clock />
      </span>
    );
  if (stage === "blocked")
    return (
      <span className={cn(base, "bg-danger-subtle text-danger-fg")} aria-label="Needs attention">
        <TriangleAlert />
      </span>
    );
  return (
    <span
      aria-label={stage === "now" ? "Next" : "Later"}
      className={cn(base, "border-[1.5px]", stage === "now" ? "border-brand" : "border-line-strong")}
    />
  );
}
