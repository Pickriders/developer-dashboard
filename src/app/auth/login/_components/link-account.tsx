"use client";

import * as React from "react";
import { BadgeCheck, Check, Info, Link2, Sparkles } from "lucide-react";

import { ApiErrorAlert, AUTH_INPUT, Field, FormAlert } from "@/components/auth";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPhone } from "@/lib/auth/phone";
import { auth } from "@/lib/dashboard/api";
import type { ApiError } from "@/lib/dashboard/errors";
import { useApiMutation } from "@/lib/dashboard/hooks";
import { crossSessionBoundary } from "@/lib/session/navigate";
import { cn } from "@/lib/utils";
import type { DeveloperLinkAccountUse, DeveloperLinkPreviewResponseDto } from "@/services/apiService";

/** How the person already uses Pickriders: the badge on their account, and what stays as it is. */
const USES: Record<DeveloperLinkAccountUse, { label: string; keeps: string }> = {
  CUSTOMER: {
    label: "Pickriders app",
    keeps: "Your deliveries, saved places and wallet in the Pickriders app.",
  },
  RIDER: { label: "Rider", keeps: "Your trips, earnings and payouts as a rider." },
  BUSINESS: { label: "Business", keeps: "Your business account and its team." },
};

const memberSince = (date?: string) =>
  date ? new Date(date).toLocaleDateString("en-GB", { month: "long", year: "numeric" }) : null;

/**
 * Linking an existing Pickriders account to the developer dashboard, after sign-in said it isn't a
 * developer account yet. One account, like Google's or Meta's: we show whose account it is, what stays
 * the same, what's new and what's good to know, in plain words, then one button. Nothing changes
 * until it's pressed. Then the usual path carries on: confirm the email if it isn't yet, else in.
 */
export function LinkAccount({
  preview,
  next,
  onCancel,
}: {
  preview: DeveloperLinkPreviewResponseDto;
  /** Where to go once linked (the page they were heading to). */
  next: string;
  /** Back to sign-in, nothing changed. */
  onCancel: (expired?: boolean) => void;
}) {
  const { account } = preview;
  const name = `${account.firstname} ${account.lastname}`.trim() || account.email;
  const firstname = account.firstname
    ? account.firstname.charAt(0).toUpperCase() + account.firstname.slice(1)
    : "there";
  const link = useApiMutation(auth.link);
  const [teamName, setTeamName] = React.useState(preview.suggestedTeamName);
  const [failure, setFailure] = React.useState<ApiError | null>(null);
  const since = memberSince(account.memberSince as unknown as string | undefined);
  const uses = account.uses.length ? account.uses : (["CUSTOMER"] as DeveloperLinkAccountUse[]);
  const needsEmailCode = !account.emailVerified;
  const teamError = teamName.trim().length > 0 && teamName.trim().length < 2 ? "Use at least 2 characters." : undefined;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (teamError) return;
    setFailure(null);
    try {
      const session = await link.mutateAsync({
        linkToken: preview.linkToken,
        ...(teamName.trim() && { teamName: teamName.trim() }),
      });
      crossSessionBoundary(
        session.user.emailVerified ? next : "/auth/verify?sent=1",
        "Your Pickriders account is linked. Welcome to Pickriders Developers.",
      );
    } catch (error) {
      setFailure(error as ApiError);
    }
  };

  const expired = failure?.code === "link_expired";

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <LinkedMark name={name} />

      <div>
        <h1 className="text-balance text-[1.75rem] font-black leading-tight tracking-tight text-fg-heading">
          Welcome back, {firstname}
        </h1>
        <p className="mt-2 text-[15px] leading-6 text-fg-muted">
          You already have a Pickriders account. Link it to Pickriders Developers to start building with deliveries. No
          new account, no new password.
        </p>
      </div>

      <Steps current={1} last={needsEmailCode ? "Confirm email" : "Start building"} />

      {failure &&
        (expired ? (
          <FormAlert title="This took a little too long.">
            For your security, sign in again to link your account.{" "}
            <button type="button" onClick={() => onCancel(true)} className="focus-ring rounded-sm">
              Sign in again
            </button>
          </FormAlert>
        ) : (
          <ApiErrorAlert error={failure} />
        ))}

      <section
        aria-label="Your Pickriders account"
        className="rounded-xl border border-line bg-surface p-4 shadow-card"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-fg-subtle">Your Pickriders account</p>
        <p className="mt-1.5 truncate font-bold text-fg-heading">{name}</p>
        <p className="truncate text-sm text-fg-muted">
          {account.email}
          {account.phone && <span className="tabular-nums"> · {formatPhone(account.phone)}</span>}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {uses.map((use) => (
            <Badge key={use} tone="neutral">
              {USES[use].label}
            </Badge>
          ))}
          {since && <span className="text-xs text-fg-subtle">Member since {since}</span>}
        </div>
      </section>

      <div className="divide-y divide-line rounded-xl border border-line bg-surface">
        <Explainer icon={<Check />} tone="success" title="What stays the same">
          <li>
            <b>One account, one password:</b> the same email or phone and password as in the app.
          </li>
          {uses.map((use) => (
            <li key={use}>{USES[use].keeps}</li>
          ))}
        </Explainer>

        <Explainer icon={<Sparkles />} tone="brand" title="What's new">
          <li>
            <b>A developer team you own.</b> Name it below; invite people later.
          </li>
          <li>
            <b>Test mode right away.</b> Try everything with test data: nothing is delivered, no money moves.
          </li>
          <li>A team wallet for these deliveries, separate from your personal wallet.</li>
          <li>To go live: confirm your email and phone, then a quick review by Pickriders.</li>
        </Explainer>

        <Explainer icon={<Info />} tone="info" title="Good to know">
          <li>It&apos;s one account: changing your name, email, phone or password here changes it in the app too.</li>
          <li>Teammates you invite will see your name and email.</li>
          <li>We&apos;ll email you whenever someone signs in here.</li>
        </Explainer>
      </div>

      <Field
        id="teamName"
        label="Name your team"
        error={teamError}
        hint="Usually your company or project. You can change it later."
      >
        {(a11y) => (
          <Input
            {...a11y}
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            maxLength={80}
            autoComplete="organization"
            className={AUTH_INPUT}
          />
        )}
      </Field>

      <div className="space-y-3">
        <Button type="submit" fullWidth loading={link.isPending} disabled={expired}>
          <Link2 aria-hidden />
          {link.isPending ? "Linking your account…" : "Link account and continue"}
        </Button>
        <Button type="button" variant="ghost" fullWidth onClick={() => onCancel()} disabled={link.isPending}>
          Not now
        </Button>
      </div>

      <p className="text-center text-xs leading-5 text-fg-subtle">
        By linking, you agree, for your business, to the{" "}
        <a href="/legal/terms" target="_blank" rel="noreferrer" className="text-fg-muted underline">
          API Terms of Use
        </a>{" "}
        (with the{" "}
        <a href="/legal/dpa" target="_blank" rel="noreferrer" className="text-fg-muted underline">
          Data Processing Agreement
        </a>
        ) and the{" "}
        <a href="/legal/acceptable-use" target="_blank" rel="noreferrer" className="text-fg-muted underline">
          Acceptable Use Policy
        </a>
        , and confirm you&apos;ve read the{" "}
        <a href="/legal/privacy" target="_blank" rel="noreferrer" className="text-fg-muted underline">
          Privacy Notice
        </a>
        . Nothing changes until you press Link.
      </p>
    </form>
  );
}

/** The person's account and Pickriders Developers, joined: the picture of what's about to happen. */
function LinkedMark({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2" aria-hidden>
      <span className="rounded-2xl bg-brand-subtle p-1.5">
        <Avatar name={name} size={40} />
      </span>
      <span className="flex items-center gap-1 text-brand">
        <span className="h-px w-4 border-t-2 border-dotted border-brand/50" />
        <span className="grid size-7 place-items-center rounded-full bg-surface shadow-button [&_svg]:size-3.5">
          <Link2 />
        </span>
        <span className="h-px w-4 border-t-2 border-dotted border-brand/50" />
      </span>
      <span className="flex size-[52px] items-center justify-center whitespace-nowrap rounded-2xl bg-gradient-to-br from-plum via-plum-mid to-[#3fa49f] font-mono text-lg font-bold leading-none text-white shadow-button">
        C<span className="text-[#6fd2cb]">_</span>
      </span>
    </div>
  );
}

/** Where they are: signed in, linking now, then the email code (or straight in). */
function Steps({ current, last }: { current: number; last: string }) {
  const steps = ["Sign in", "Link account", last];
  return (
    <ol className="flex items-center gap-2 text-xs font-semibold" aria-label="Steps">
      {steps.map((label, i) => {
        const done = i < current;
        const now = i === current;
        return (
          <li key={label} className="flex items-center gap-2" aria-current={now ? "step" : undefined}>
            {i > 0 && (
              <span className={cn("h-px w-4 sm:w-6", done || now ? "bg-brand" : "bg-line-strong")} aria-hidden />
            )}
            <span
              className={cn(
                "grid size-5 place-items-center rounded-full text-[11px] [&_svg]:size-3",
                done && "bg-brand-solid text-white dark:text-canvas",
                now && "bg-brand-subtle text-brand-fg ring-2 ring-brand",
                !done && !now && "bg-surface-muted text-fg-subtle",
              )}
            >
              {done ? <BadgeCheck /> : i + 1}
            </span>
            <span className={cn(now ? "text-fg" : "text-fg-subtle", "whitespace-nowrap")}>
              {label}
              {done && <span className="sr-only"> (done)</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

const ICON_TONES = {
  success: "bg-success-subtle text-success-fg",
  brand: "bg-brand-subtle text-brand-fg",
  info: "bg-info-subtle text-info-fg",
} as const;

function Explainer({
  icon,
  tone,
  title,
  children,
}: {
  icon: React.ReactNode;
  tone: keyof typeof ICON_TONES;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex gap-3 px-4 py-3.5">
      <span
        className={cn("grid size-8 shrink-0 place-items-center rounded-lg [&_svg]:size-4", ICON_TONES[tone])}
        aria-hidden
      >
        {icon}
      </span>
      <div className="min-w-0">
        <h2 className="text-sm font-bold text-fg-heading">{title}</h2>
        <ul className="mt-1.5 list-disc space-y-1 pl-4 text-sm leading-5 text-fg-muted marker:text-fg-subtle [&_b]:font-semibold [&_b]:text-fg">
          {children}
        </ul>
      </div>
    </section>
  );
}
