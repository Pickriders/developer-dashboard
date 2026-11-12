"use client";

import * as React from "react";

import { crossSessionBoundary } from "@/lib/session/navigate";
import { signOut } from "@/services/apiService";
import { cn } from "@/lib/utils";

/** Clears the session cookie, then a full load of sign-in drops everything cached for the session. */
export async function signOutAndLeave() {
  try {
    await signOut();
  } finally {
    crossSessionBoundary("/auth/login?reason=signed_out");
  }
}

/** Clears the session and everything cached for it, then lands on sign-in. */
export function SignOutButton({
  className,
  children = "Sign out",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const [pending, setPending] = React.useState(false);

  return (
    <button
      type="button"
      disabled={pending}
      onClick={async () => {
        setPending(true);
        await signOutAndLeave();
      }}
      className={cn("focus-ring rounded-sm font-bold text-fg hover:underline disabled:opacity-60", className)}
    >
      {pending ? "Signing out…" : children}
    </button>
  );
}
