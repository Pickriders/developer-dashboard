"use client";

import * as React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button, LinkButton } from "@/components/ui/button";
import { DOCS_URL } from "@/constant";
import { formatPhone } from "@/lib/auth/phone";
import type { Step, StepId } from "@/lib/dashboard/checklist";
import { formatDate } from "@/lib/dashboard/format";
import { useWorkspace } from "@/lib/workspace";
import type { DeveloperAccountDto } from "@/services/apiService";

/** What each step says and offers, given where the team is. Copy lives here, next to the actions. */
export type StepCopy = {
  title: string;
  /** One or two sentences: what it is, and why it matters. */
  body: React.ReactNode;
  /** Short state on the step's row once there is something to say (an address, a date). */
  meta?: React.ReactNode;
  /** The one thing to do now; absent when there is nothing (done, waiting, not allowed). */
  action?: React.ReactNode;
  /** Shown instead of an action when the user's role can't take it. */
  blockedNote?: string;
};

type Context = {
  account: DeveloperAccountDto;
  onRequestLive: () => void;
  size?: "sm" | "md";
};

export function useStepCopy() {
  const { me, team, can } = useWorkspace();
  const owner = team.isOwner;

  return (step: Step, { account, onRequestLive, size = "md" }: Context): StepCopy => {
    const done = step.state === "done";
    const variant = size === "sm" ? "secondary" : "primary";

    switch (step.id) {
      case "verify_email":
        return {
          title: "Verify your email",
          body: owner
            ? "Enter the code we emailed you. Live access needs a verified email."
            : "The team owner verifies their email before the team can go live.",
          meta: done && owner ? me.user.email : undefined,
          action:
            !done && owner ? (
              <LinkButton href="/auth/verify" size={size} variant={variant}>
                Verify email {size === "md" && <ArrowRight />}
              </LinkButton>
            ) : undefined,
          blockedNote: !done && !owner ? "Waiting for the team owner" : undefined,
        };

      case "verify_phone":
        return {
          title: "Verify your phone number",
          body: owner
            ? `We'll text a code to ${formatPhone(me.user.phone)}. Live access needs it verified too.`
            : "The team owner verifies their phone number before the team can go live.",
          meta: done && owner ? formatPhone(me.user.phone) : undefined,
          action:
            !done && owner ? (
              <LinkButton href="/auth/verify" size={size} variant={variant}>
                Verify phone {size === "md" && <ArrowRight />}
              </LinkButton>
            ) : undefined,
          blockedNote: !done && !owner ? "Waiting for the team owner" : undefined,
        };

      case "test_key":
        return {
          title: "Create a test API key",
          body: "Your code sends it with every request. Test keys only touch test data, so nothing costs money or sends a rider.",
          action:
            !done && can("keys.write") ? (
              <LinkButton href="/keys?create=test" size={size} variant={variant}>
                Create test key {size === "md" && <ArrowRight />}
              </LinkButton>
            ) : undefined,
          blockedNote: !done && !can("keys.write") ? "Ask a developer or admin" : undefined,
        };

      case "test_order":
        return {
          title: "Make a test order",
          body: "Create an order with your test key. It moves through every status like a real one, without a real rider. This step ticks itself when it arrives.",
          action: !done ? (
            <a
              href={DOCS_URL}
              target="_blank"
              rel="noreferrer"
              className={
                size === "sm"
                  ? "focus-ring inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line bg-surface px-3 text-sm font-semibold text-fg shadow-button transition-colors hover:border-line-strong hover:bg-brand-subtle"
                  : "focus-ring inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-solid px-4 text-sm font-semibold text-brand-ink shadow-button transition-colors hover:bg-brand-solid-hover"
              }
            >
              Show me how <ArrowUpRight className="size-4" aria-hidden />
            </a>
          ) : undefined,
        };

      case "webhook":
        return {
          title: "Add a webhook endpoint",
          body: "Tell us where to send order updates, so your system hears about pickups and deliveries the moment they happen.",
          action:
            !done && can("webhooks.write") ? (
              <LinkButton href="/webhooks?create=1" size={size} variant={variant}>
                Add endpoint {size === "md" && <ArrowRight />}
              </LinkButton>
            ) : undefined,
          blockedNote: !done && !can("webhooks.write") ? "Ask a developer or admin" : undefined,
        };

      case "request_live":
        return {
          title: "Request live access",
          body: account.canRequestLive
            ? "Tell us about your business. A Pickriders admin reviews every team before live keys work."
            : "Once the team owner's email and phone are verified, you can ask Pickriders to switch on live mode.",
          meta: done && account.liveRequestedAt ? `Requested ${formatDate(account.liveRequestedAt)}` : undefined,
          action:
            !done && can("live.request") ? (
              <Button size={size} variant={variant} disabled={!account.canRequestLive} onClick={onRequestLive}>
                Request live access
              </Button>
            ) : undefined,
          blockedNote: !done && !can("live.request") ? "The owner or an admin asks" : undefined,
        };

      case "approval":
        return approvalCopy(step, account, can("live.request"), onRequestLive, size);
    }
  };
}

function approvalCopy(
  step: Step,
  account: DeveloperAccountDto,
  canAsk: boolean,
  onRequestLive: () => void,
  size: "sm" | "md",
): StepCopy {
  const reviewed = account.liveReviewedAt ? formatDate(account.liveReviewedAt) : null;
  switch (account.liveStatus) {
    case "APPROVED":
      return {
        title: "Get approved",
        body: "Live keys and live orders are switched on. Test mode keeps working alongside.",
        meta: reviewed ? `Approved ${reviewed}` : "Approved",
      };
    case "PENDING":
      return {
        title: "Get approved",
        body: `In review since ${account.liveRequestedAt ? formatDate(account.liveRequestedAt) : "today"}. This page updates when Pickriders decides. Keep building in test mode meanwhile.`,
        meta: "In review",
      };
    case "REJECTED":
      return {
        title: "Get approved",
        body: account.liveRejectionReason
          ? `Not approved yet: ${account.liveRejectionReason}`
          : "Not approved yet. Update your details and ask again.",
        meta: reviewed ? `Reviewed ${reviewed}` : undefined,
        action: canAsk ? (
          <Button size={size} variant={size === "sm" ? "secondary" : "primary"} onClick={onRequestLive}>
            Update and ask again
          </Button>
        ) : undefined,
      };
    case "SUSPENDED":
      return {
        title: "Get approved",
        body: account.liveSuspensionReason
          ? `Live access is suspended: ${account.liveSuspensionReason}`
          : "Live access is suspended. Test mode still works.",
      };
    default:
      return {
        title: "Get approved",
        body: "Once approved, live keys and live orders work. Test mode keeps working either way.",
      };
  }
}

export const STEP_ORDER: StepId[] = [
  "verify_email",
  "verify_phone",
  "test_key",
  "test_order",
  "webhook",
  "request_live",
  "approval",
];
