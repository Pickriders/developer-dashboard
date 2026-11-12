import type { DeveloperAccountDto, DeveloperOnboardingDto } from "@/services/apiService";

export type StepId =
  "verify_email" | "verify_phone" | "test_key" | "test_order" | "webhook" | "request_live" | "approval";

/**
 * done: finished. waiting: nothing to do but wait (live access in review). blocked: something went
 * wrong and needs the team (rejected or suspended). todo: not started.
 */
export type StepState = "done" | "waiting" | "blocked" | "todo";

export type Step = { id: StepId; state: StepState };

export type StepGroup = { title: string; steps: Step[] };

export type Checklist = {
  groups: StepGroup[];
  /**
   * The step to show first: one that went wrong (live access refused or suspended) before anything
   * else, then the first one not done, in order. Null once live.
   */
  next: Step | null;
  done: number;
  total: number;
};

/**
 * The get-started checklist, from the account (the owner's verification, live status) and the
 * onboarding progress (test key, test order, webhook). Everything comes from the API: a step ticks
 * itself when the team does it, wherever they did it.
 */
export function checklist(account: DeveloperAccountDto, onboarding: DeveloperOnboardingDto): Checklist {
  const live = account.liveStatus;
  const state = (done: boolean): StepState => (done ? "done" : "todo");

  const groups: StepGroup[] = [
    {
      title: "Verify your account",
      steps: [
        { id: "verify_email", state: state(account.emailVerified) },
        { id: "verify_phone", state: state(account.phoneVerified) },
      ],
    },
    {
      title: "Build in test mode",
      steps: [
        { id: "test_key", state: state(onboarding.testKeyCreated) },
        { id: "test_order", state: state(onboarding.testOrderCreated) },
        { id: "webhook", state: state(onboarding.webhookEndpointAdded) },
      ],
    },
    {
      title: "Go live",
      steps: [
        // Asked counts as done even when the answer was no: the next move is on the approval step.
        { id: "request_live", state: state(live !== "NOT_REQUESTED") },
        {
          id: "approval",
          state:
            live === "APPROVED"
              ? "done"
              : live === "PENDING"
                ? "waiting"
                : live === "REJECTED" || live === "SUSPENDED"
                  ? "blocked"
                  : "todo",
        },
      ],
    },
  ];

  const steps = groups.flatMap((g) => g.steps);
  return {
    groups,
    next: steps.find((s) => s.state === "blocked") ?? steps.find((s) => s.state !== "done") ?? null,
    done: steps.filter((s) => s.state === "done").length,
    total: steps.length,
  };
}
