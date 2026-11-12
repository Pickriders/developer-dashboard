"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowUpRight, Check, ChevronDown, Clock, Rocket, TriangleAlert } from "lucide-react";

import { LiveAccessDialog } from "./live-access-dialog";
import { useStepCopy, type StepCopy } from "./steps";
import { ApiErrorAlert } from "@/components/auth";
import { IdText } from "@/components/kit/id-text";
import { ProgressRing } from "@/components/kit/progress-ring";
import { Avatar } from "@/components/ui/avatar";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { Button, LinkButton } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DOCS_URL } from "@/constant";
import { ROLE_LABELS } from "@/lib/auth/roles";
import { checklist, type Checklist, type Step, type StepId } from "@/lib/dashboard/checklist";
import { toApiError } from "@/lib/dashboard/errors";
import { useAccount, useOnboarding } from "@/lib/dashboard/hooks";
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";
import type { DeveloperAccountDto } from "@/services/apiService";

/** Home: the next thing to do, front and centre, then the whole path from sign-up to live. */
export function Home() {
  const { me, team } = useWorkspace();
  const account = useAccount(team.id);
  const onboarding = useOnboarding(team.id);
  const [asking, setAsking] = React.useState(false);
  useOpenFromLink(React.useCallback(() => setAsking(true), []));

  const greeting = useGreeting(me.user.firstname);

  if (account.error || onboarding.error) {
    return (
      <div className="mx-auto max-w-xl space-y-4 py-10">
        <ApiErrorAlert error={toApiError(account.error ?? onboarding.error)} />
        <Button
          variant="secondary"
          onClick={() => {
            void account.refetch();
            void onboarding.refetch();
          }}
        >
          Try again
        </Button>
      </div>
    );
  }
  if (!account.data || !onboarding.data) return <HomeSkeleton />;

  const list = checklist(account.data, onboarding.data);
  const live = list.next === null;

  return (
    <>
      <header className="mb-7 space-y-1">
        <h1 className="text-[1.75rem] font-black tracking-tight text-fg-heading">{greeting}</h1>
        <p className="text-base text-fg-muted">
          {live
            ? "Everything's set up. Here's your team at a glance."
            : account.data.liveStatus === "APPROVED"
              ? "You're approved for live. Finish the rest of setup whenever you're ready."
              : list.next?.state === "waiting"
                ? "Your live access request is with us. Keep building in test mode."
                : "A few steps take you from here to live deliveries."}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <div className="min-w-0 space-y-6">
          {live && <LiveCard />}
          <SetupGuide list={list} account={account.data} onRequestLive={() => setAsking(true)} />
        </div>
        <aside className="space-y-4">
          <TeamCard account={account.data} />
          <HelpCard />
        </aside>
      </div>

      <LiveAccessDialog open={asking} onClose={() => setAsking(false)} account={account.data} />
    </>
  );
}

/** `/?request=live` (from the live lock in the header) opens the request dialog, once. */
function useOpenFromLink(open: () => void) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const asked = params.get("request") === "live";
  React.useEffect(() => {
    if (!asked) return;
    open();
    router.replace(pathname, { scroll: false });
  }, [asked, open, router, pathname]);
}

function useGreeting(firstname: string) {
  const [greeting, setGreeting] = React.useState(`Welcome, ${firstname}`);
  React.useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(`${hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"}, ${firstname}`);
  }, [firstname]);
  return greeting;
}

/** Shown instead of the guide's header once the team is live. */
function LiveCard() {
  return (
    <section
      aria-labelledby="live-title"
      className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-7"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-success/10 blur-3xl"
      />
      <div className="relative flex items-start gap-4">
        <span
          aria-hidden
          className="grid size-11 shrink-0 place-items-center rounded-xl bg-success-subtle text-success-fg"
        >
          <Rocket className="size-5" />
        </span>
        <div className="min-w-0">
          <h2 id="live-title" className="text-[1.375rem] font-extrabold tracking-tight text-fg-heading">
            You&apos;re live
          </h2>
          <p className="mt-1 max-w-xl text-[15px] leading-6 text-fg-muted">
            Live keys and live orders are switched on. Create a live key for your production server; test mode keeps
            working for everything you build next.
          </p>
          <LinkButton href="/keys?create=live" className="mt-5">
            Create a live key
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

/**
 * The path from sign-up to live, as one guide: the current step open with its action, the rest
 * folded to a line (open any of them), finished ones ticked with what was done.
 */
function SetupGuide({
  list,
  account,
  onRequestLive,
}: {
  list: Checklist;
  account: DeveloperAccountDto;
  onRequestLive: () => void;
}) {
  const copyFor = useStepCopy();
  const live = list.next === null;
  const [open, setOpen] = React.useState<StepId | null>(list.next?.id ?? null);
  const [showAll, setShowAll] = React.useState(false);

  // When a step finishes (the data refetches), move on to the new next step.
  React.useEffect(() => setOpen(list.next?.id ?? null), [list.next?.id]);

  if (live && !showAll) {
    return (
      <button
        type="button"
        onClick={() => setShowAll(true)}
        className="focus-ring flex w-full items-center justify-between rounded-2xl border border-line bg-surface px-6 py-4 text-left shadow-card transition-colors hover:bg-surface-subtle"
      >
        <span className="flex items-center gap-3 text-sm font-semibold text-fg">
          <span className="grid size-6 place-items-center rounded-full bg-success text-white" aria-hidden>
            <Check className="size-3.5" strokeWidth={3} />
          </span>
          Setup complete: all {list.total} steps done
        </span>
        <span className="text-sm font-semibold text-brand-fg">Show steps</span>
      </button>
    );
  }

  let number = 0;
  const left = list.total - list.done;
  return (
    <section
      aria-labelledby="get-started"
      className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card"
    >
      <div className="flex items-center gap-4 border-b border-line px-5 py-5 sm:px-6">
        <ProgressRing value={list.done} total={list.total} size={52} />
        <div className="min-w-0">
          <h2 id="get-started" className="text-lg font-extrabold tracking-tight text-fg-heading">
            {live ? "Setup complete" : "Get set up"}
          </h2>
          <p className="text-sm text-fg-muted">
            {live
              ? "Every step is done."
              : list.next?.state === "waiting"
                ? "Nothing to do but wait for the review."
                : account.liveStatus === "APPROVED"
                  ? `${left} ${left === 1 ? "step" : "steps"} left`
                  : `${left} ${left === 1 ? "step" : "steps"} to live deliveries`}
          </p>
        </div>
      </div>

      <div className="pb-2">
        {list.groups.map((group) => (
          <div key={group.title}>
            <p className="px-5 pb-1 pt-5 text-[11px] font-bold uppercase tracking-[0.12em] text-fg-subtle sm:px-6">
              {group.title}
            </p>
            <ol>
              {group.steps.map((step) => {
                number += 1;
                return (
                  <StepRow
                    key={step.id}
                    step={step}
                    number={number}
                    isNext={list.next?.id === step.id}
                    expanded={open === step.id}
                    onToggle={() => setOpen((current) => (current === step.id ? null : step.id))}
                    copy={copyFor(step, { account, onRequestLive })}
                  />
                );
              })}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}

function StepRow({
  step,
  number,
  isNext,
  expanded,
  onToggle,
  copy,
}: {
  step: Step;
  number: number;
  isNext: boolean;
  expanded: boolean;
  onToggle: () => void;
  copy: StepCopy;
}) {
  const done = step.state === "done";
  const bodyId = `step-${step.id}`;
  const title = (
    <span className={cn("text-[15px] font-semibold", done ? "text-fg-muted" : "text-fg")}>
      {copy.title}
      <span className="sr-only">{done ? " (done)" : step.state === "waiting" ? " (in review)" : ""}</span>
    </span>
  );

  return (
    <li
      data-step={step.id}
      data-state={step.state}
      aria-current={isNext ? "step" : undefined}
      className={cn(
        "relative transition-colors",
        expanded &&
          "bg-brand-subtle/40 before:absolute before:inset-y-2 before:left-0 before:w-[3px] before:rounded-r-full before:bg-brand",
      )}
    >
      {done ? (
        <div className="flex items-center gap-4 px-5 py-3 sm:px-6">
          <StepIcon state={step.state} number={number} isNext={false} />
          <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-x-4 gap-y-0.5">
            {title}
            {copy.meta && <span className="truncate text-sm text-fg-subtle">{copy.meta}</span>}
          </div>
        </div>
      ) : (
        <>
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            aria-controls={bodyId}
            className="focus-ring flex w-full items-center gap-4 px-5 py-3 text-left sm:px-6"
          >
            <StepIcon state={step.state} number={number} isNext={isNext || expanded} />
            <span className="flex min-w-0 flex-1 items-center justify-between gap-4">
              {title}
              <span className="flex shrink-0 items-center gap-2">
                {copy.meta && !expanded && (
                  <Badge tone={step.state === "waiting" ? "warning" : "neutral"}>{copy.meta}</Badge>
                )}
                <ChevronDown
                  className={cn("size-4 text-fg-subtle transition-transform duration-200", expanded && "rotate-180")}
                  aria-hidden
                />
              </span>
            </span>
          </button>
          {expanded && (
            <div id={bodyId} className="animate-fade-in pb-5 pl-[3.75rem] pr-5 sm:pl-[4.25rem] sm:pr-6">
              <p className="max-w-xl text-sm leading-6 text-fg-muted">{copy.body}</p>
              {(copy.action || copy.blockedNote) && (
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {copy.action ?? <span className="text-sm font-medium text-fg-subtle">{copy.blockedNote}</span>}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </li>
  );
}

function StepIcon({ state, number, isNext }: { state: Step["state"]; number: number; isNext: boolean }) {
  const base = "grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold [&_svg]:size-3.5";
  if (state === "done")
    return (
      <span className={cn(base, "bg-success text-white")} aria-hidden>
        <Check strokeWidth={3} />
      </span>
    );
  if (state === "waiting")
    return (
      <span className={cn(base, "bg-warning-subtle text-warning-fg")} aria-hidden>
        <Clock />
      </span>
    );
  if (state === "blocked")
    return (
      <span className={cn(base, "bg-danger-subtle text-danger-fg")} aria-hidden>
        <TriangleAlert />
      </span>
    );
  return (
    <span
      aria-hidden
      className={cn(
        base,
        "border-[1.5px] tabular-nums",
        isNext ? "border-brand bg-surface text-brand-fg" : "border-line-strong text-fg-subtle",
      )}
    >
      {number}
    </span>
  );
}

const LIVE: Record<DeveloperAccountDto["liveStatus"], [string, BadgeTone]> = {
  NOT_REQUESTED: ["Test mode only", "neutral"],
  PENDING: ["In review", "warning"],
  APPROVED: ["Live", "success"],
  REJECTED: ["Not approved", "danger"],
  SUSPENDED: ["Suspended", "danger"],
};

function TeamCard({ account }: { account: DeveloperAccountDto }) {
  const { team } = useWorkspace();
  const [label, tone] = LIVE[account.liveStatus];
  return (
    <section aria-label="Your team" className="rounded-2xl border border-line bg-surface p-5 shadow-card">
      <div className="flex items-center gap-3">
        <Avatar name={team.name} shape="square" size={40} />
        <div className="min-w-0">
          <p className="truncate text-base font-bold text-fg-heading">{team.name}</p>
          <p className="truncate text-sm text-fg-subtle">
            You&apos;re {(ROLE_LABELS[team.role] ?? "a member").toLowerCase()}
          </p>
        </div>
      </div>
      <dl className="mt-4 space-y-3 border-t border-line pt-4 text-sm">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-fg-muted">Live access</dt>
          <dd>
            <Badge tone={tone} dot>
              {label}
            </Badge>
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-fg-muted">Team id</dt>
          <dd>
            <IdText value={team.id} />
          </dd>
        </div>
      </dl>
    </section>
  );
}

function HelpCard() {
  return (
    <section aria-label="Help" className="rounded-2xl border border-line bg-surface p-5 shadow-card">
      <p className="text-sm font-bold text-fg-heading">New to the Pickriders API?</p>
      <p className="mt-1 text-sm leading-5 text-fg-muted">
        The docs walk you from your first request to a delivered test order.
      </p>
      <a
        href={DOCS_URL}
        target="_blank"
        rel="noreferrer"
        className="focus-ring mt-3 inline-flex items-center gap-1 rounded-sm text-sm font-bold text-brand-fg hover:underline"
      >
        Read the docs <ArrowUpRight className="size-3.5" aria-hidden />
      </a>
    </section>
  );
}

function HomeSkeleton() {
  return (
    <div aria-busy aria-label="Loading">
      <Skeleton className="mb-2 h-9 w-72" />
      <Skeleton className="mb-7 h-5 w-96 max-w-full" />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <div className="space-y-6">
          <Skeleton className="h-[34rem] w-full rounded-2xl" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
