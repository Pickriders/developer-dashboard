"use client";

import * as React from "react";
import { Users } from "lucide-react";

import { SignOutButton } from "@/components/auth";
import { EmptyState } from "@/components/kit/empty-state";
import { TestModeBanner } from "@/components/kit/test-mode-banner";
import { DashboardShell, ModeSwitch } from "@/components/shell";
import { Skeleton } from "@/components/ui/skeleton";
import { useWorkspace, WorkspaceProvider } from "@/lib/workspace";

/** Every signed-in page: the workspace (who, which team) and the shell around the page. */
export function DashboardFrame({ children }: { children: React.ReactNode }) {
  return (
    <WorkspaceProvider loading={<FrameSkeleton />} noTeam={<NoTeam />}>
      <Shell>{children}</Shell>
    </WorkspaceProvider>
  );
}

/** The shell in the current mode: the amber bar across the top whenever it's test. */
function Shell({ children }: { children: React.ReactNode }) {
  const { mode } = useWorkspace();
  return (
    <DashboardShell banner={mode === "test" ? <TestModeBanner /> : null} headerActions={<ModeSwitch />}>
      {children}
    </DashboardShell>
  );
}

function FrameSkeleton() {
  return (
    <div className="flex min-h-dvh bg-canvas" aria-busy aria-label="Loading">
      <div className="hidden w-sidebar border-r border-line bg-surface lg:block">
        <div className="h-14 border-b border-line" />
        <div className="space-y-3 p-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-4/5" />
        </div>
      </div>
      <div className="flex-1">
        <div className="h-14 border-b border-line bg-surface" />
        <div className="mx-auto max-w-[72rem] space-y-4 px-4 py-8 md:px-8">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-72 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

/** Someone who left or was removed from every team they were in. */
function NoTeam() {
  return (
    <main className="grid min-h-dvh place-items-center bg-canvas px-4">
      <EmptyState
        icon={<Users />}
        title="You're not in a team"
        description="Ask a team owner to invite you again, or sign in with another account."
        action={<SignOutButton className="text-sm" />}
      />
    </main>
  );
}
