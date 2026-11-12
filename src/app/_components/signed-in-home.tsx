"use client";

import Link from "next/link";
import { ArrowRight, CircleCheck, CircleDashed } from "lucide-react";

import { SignOutButton } from "@/components/auth";
import { Logo } from "@/components/brand/logo";
import { Panel } from "@/components/kit/panel";
import { Badge } from "@/components/ui/badge";
import { Button, LinkButton } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPhone } from "@/lib/auth/phone";
import { useMe } from "@/lib/dashboard/hooks";

export function SignedInHome() {
  const me = useMe();
  const user = me.data?.user;
  const verified = user ? user.emailVerified && user.phoneVerified : false;

  return (
    <main className="flex min-h-dvh flex-col bg-canvas">
      <header className="flex h-header items-center justify-between border-b border-line px-4 sm:px-6">
        <Logo />
        <SignOutButton className="text-sm" />
      </header>
      <section className="mx-auto w-full max-w-xl flex-1 space-y-8 px-4 py-16 sm:px-6">
        <div className="space-y-2">
          {user ? (
            <h1 className="text-2xl font-semibold text-fg">Welcome, {user.firstname}</h1>
          ) : (
            <Skeleton className="h-8 w-48" />
          )}
          <p className="text-base text-fg-muted">
            Your dashboard is on its way. You&apos;re signed in{me.data?.teams[0] && <> to {me.data.teams[0].name}</>}.
          </p>
        </div>

        {user && (
          <Panel
            title="Verification"
            description="Needed before you can request live access."
            actions={verified ? <Badge tone="success">Verified</Badge> : undefined}
          >
            <ul className="space-y-3 px-5 py-4 text-sm">
              {[
                ["Email", user.email, user.emailVerified],
                ["Phone", formatPhone(user.phone), user.phoneVerified],
              ].map(([label, value, done]) => (
                <li key={label as string} className="flex items-center gap-3">
                  {done ? (
                    <CircleCheck className="size-4 text-success-fg" aria-label="Verified" />
                  ) : (
                    <CircleDashed className="size-4 text-fg-subtle" aria-label="Not verified" />
                  )}
                  <span className="w-14 text-fg-muted">{label}</span>
                  <span className="truncate text-fg">{value}</span>
                </li>
              ))}
            </ul>
            {!verified && (
              <div className="border-t border-line px-5 py-3">
                <LinkButton size="sm" href={"/auth/verify"}>
                  Finish verifying <ArrowRight />
                </LinkButton>
              </div>
            )}
          </Panel>
        )}
      </section>
    </main>
  );
}
