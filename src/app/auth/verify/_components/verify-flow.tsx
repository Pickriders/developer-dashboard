"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Check, Mail, Smartphone } from "lucide-react";

import { ApiErrorAlert, AuthHeading, AuthShell, SignOutButton } from "@/components/auth";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPhone } from "@/lib/auth/phone";
import { auth } from "@/lib/dashboard/api";
import { toApiError } from "@/lib/dashboard/errors";
import { useMe } from "@/lib/dashboard/hooks";
import { crossSessionBoundary } from "@/lib/session/navigate";
import { safeRedirect } from "@/lib/session/paths";
import { cn } from "@/lib/utils";
import type { DeveloperMeResponseDto } from "@/services/apiService";
import { CodeStep } from "./code-step";

type Step = "email" | "phone" | "done";

/** The API's errors arrive as AxiosErrors; the step wants them as ApiErrors. */
const asApi =
  <A extends unknown[], R>(fn: (...args: A) => Promise<R>) =>
  (...args: A) =>
    fn(...args).catch((e) => Promise.reject(toApiError(e)));

/**
 * After sign-up: confirm the email (the code is already in the inbox), then the phone, then done.
 * Both can wait: test mode works without them; going live needs them. Opened later (from the
 * get-started checklist), it picks up at the first unverified step.
 */
export function VerifyFlow() {
  const params = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const me = useMe();
  const next = safeRedirect(params.get("next"));

  const onVerified = (data: DeveloperMeResponseDto) => queryClient.setQueryData(["me"], data);

  if (me.isPending || me.error) {
    return (
      <AuthShell>
        {me.error ? (
          <div className="space-y-4">
            <ApiErrorAlert error={toApiError(me.error)} />
            <Button variant="secondary" onClick={() => me.refetch()}>
              Try again
            </Button>
          </div>
        ) : (
          <div className="space-y-4" aria-busy>
            <Skeleton className="size-10" />
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        )}
      </AuthShell>
    );
  }

  const { user } = me.data;
  const step: Step = !user.emailVerified ? "email" : !user.phoneVerified ? "phone" : "done";

  return (
    <AuthShell
      topRight={
        <span className="flex items-center gap-1.5">
          <span className="hidden max-w-[14rem] truncate text-fg-subtle sm:inline">{user.email}</span>
          <span className="hidden text-line-strong sm:inline" aria-hidden>
            ·
          </span>
          <SignOutButton />
        </span>
      }
    >
      <Progress step={step} />

      <div key={step} className="animate-slide-up">
        {step === "email" && (
          <>
            <AuthHeading
              icon={<Mail />}
              title="Check your email"
              description="Confirm it's you, so we can reach you about your account and payments."
            />
            <CodeStep
              channel="email"
              destination={user.email}
              initiallySent={params.get("sent") === "1"}
              send={asApi(auth.sendEmailCode)}
              verify={asApi(auth.verifyEmail)}
              onVerified={onVerified}
              intro={
                <p className="text-base text-fg-muted">
                  We&apos;ll email a 4-digit code to <span className="font-medium text-fg">{user.email}</span>.
                </p>
              }
            />
          </>
        )}

        {step === "phone" && (
          <>
            <AuthHeading
              icon={<Smartphone />}
              title="Verify your phone"
              description="Live access needs a verified phone, so riders and our team can reach you about live orders."
            />
            <CodeStep
              channel="phone"
              destination={formatPhone(user.phone)}
              initiallySent={false}
              send={asApi(auth.sendPhoneCode)}
              verify={asApi(auth.verifyPhone)}
              onVerified={onVerified}
              intro={
                <div className="flex items-center justify-between rounded-md border border-line bg-surface px-3.5 py-3">
                  <span className="text-sm text-fg-muted">We&apos;ll text a code to</span>
                  <span className="font-mono text-sm tabular-nums text-fg">{formatPhone(user.phone)}</span>
                </div>
              }
            />
          </>
        )}

        {step === "done" && <Done onContinue={() => crossSessionBoundary(next)} />}
      </div>

      {step !== "done" && (
        <div className="mt-10 border-t border-line pt-5 text-sm text-fg-muted">
          <Link href={next} className="focus-ring rounded-sm font-medium text-fg hover:underline">
            Do this later
          </Link>
          <span className="text-fg-subtle"> — test mode works without it.</span>
        </div>
      )}
    </AuthShell>
  );
}

const STEPS: { id: Exclude<Step, "done">; label: string }[] = [
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
];

function Progress({ step }: { step: Step }) {
  const current = step === "done" ? STEPS.length : STEPS.findIndex((s) => s.id === step);
  return (
    <ol className="mb-8 flex items-center gap-2 text-xs" aria-label="Verification steps">
      {STEPS.map((s, i) => {
        const complete = i < current;
        const active = i === current;
        return (
          <li key={s.id} className="flex items-center gap-2" aria-current={active ? "step" : undefined}>
            {i > 0 && <span className={cn("h-px w-6", complete || active ? "bg-fg-subtle" : "bg-line-strong")} />}
            <span
              className={cn(
                "inline-flex size-5 items-center justify-center rounded-full border font-medium tabular-nums transition-colors duration-base",
                complete && "border-success bg-success text-fg-inverse",
                active && "border-fg text-fg",
                !complete && !active && "border-line-strong text-fg-subtle",
              )}
            >
              {complete ? <Check className="size-3" strokeWidth={3} aria-label="Done" /> : i + 1}
            </span>
            <span className={cn(active ? "font-medium text-fg" : "text-fg-subtle")}>{s.label}</span>
          </li>
        );
      })}
    </ol>
  );
}

function Done({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="space-y-8">
      <div className="space-y-5">
        <svg viewBox="0 0 48 48" className="size-12" aria-hidden>
          <circle cx="24" cy="24" r="23" className="fill-success-subtle stroke-success-line" strokeWidth="1" />
          <path
            d="M15 24.5l6 6 12-13"
            fill="none"
            className="stroke-success-fg motion-safe:animate-draw"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ strokeDasharray: 40, ["--path-length" as string]: 40 }}
          />
        </svg>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-fg">You&apos;re verified</h1>
          <p className="text-base text-fg-muted">
            Your email and phone are confirmed. Keep building in test mode, and request live access whenever you&apos;re
            ready.
          </p>
        </div>
      </div>
      <Button fullWidth onClick={onContinue} autoFocus>
        Continue to dashboard
      </Button>
    </div>
  );
}
