"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { RailTip } from "./rail-tip";
import { checklist, type StepId } from "@/lib/dashboard/checklist";
import { useAccount, useOnboarding } from "@/lib/dashboard/hooks";
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";

const NEXT: Record<StepId, string> = {
  verify_email: "Verify your email",
  verify_phone: "Verify your phone",
  test_key: "Create a test key",
  test_order: "Make a test order",
  webhook: "Add a webhook",
  request_live: "Request live access",
  approval: "Get approved",
};

/**
 * Setup progress at the foot of the sidebar, on every page, until the team is set up: how far, and
 * the next step. Hidden on home, which is the setup guide, and once everything is done.
 */
export function SetupCard({ rail }: { rail: boolean }) {
  const { team } = useWorkspace();
  const pathname = usePathname();
  const account = useAccount(team.id).data;
  const onboarding = useOnboarding(team.id).data;
  if (!account || !onboarding || pathname === "/") return null;

  const list = checklist(account, onboarding);
  if (!list.next) return null;
  const ratio = list.done / list.total;
  const label =
    list.next.state === "waiting"
      ? "In review"
      : list.next.state === "blocked"
        ? "Needs your attention"
        : NEXT[list.next.id];

  if (rail) {
    const r = 15;
    const c = 2 * Math.PI * r;
    return (
      <Link
        href="/"
        aria-label={`Get set up: ${list.done} of ${list.total} done. Next: ${label}`}
        className="focus-ring group relative mx-auto grid size-10 place-items-center rounded-xl hover:bg-white/[0.05]"
      >
        <svg viewBox="0 0 36 36" className="size-9 -rotate-90" aria-hidden>
          <circle cx="18" cy="18" r={r} fill="none" strokeWidth="3" className="stroke-white/10" />
          <circle
            cx="18"
            cy="18"
            r={r}
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - ratio)}
            className="stroke-nav-accent"
          />
        </svg>
        <span className="absolute text-[10px] font-extrabold text-nav-fg" aria-hidden>
          {list.done}/{list.total}
        </span>
        <RailTip>Next: {label}</RailTip>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className="focus-ring group block rounded-xl bg-gradient-to-br from-brand/25 via-brand/10 to-transparent p-3.5 ring-1 ring-inset ring-nav-accent/20 transition-colors hover:ring-nav-accent/40"
    >
      <span className="flex items-center justify-between gap-2">
        <span className="text-[13px] font-bold text-nav-fg">Get set up</span>
        <span className="text-xs font-semibold tabular-nums text-nav-muted">
          {list.done} of {list.total}
        </span>
      </span>
      <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden>
        <span
          className="block h-full rounded-full bg-nav-accent transition-[width] duration-700 ease-out"
          style={{ width: `${ratio * 100}%` }}
        />
      </span>
      <span
        className={cn(
          "mt-2.5 flex items-center gap-1 text-xs font-semibold",
          list.next.state === "blocked" ? "text-nav-fg" : "text-nav-accent",
        )}
      >
        <span className="truncate">Next: {label}</span>
        <ArrowRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}
