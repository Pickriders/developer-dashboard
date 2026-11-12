"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { crossSessionBoundary } from "@/lib/session/navigate";
import { signOut } from "@/services/apiService";
import { cn } from "@/lib/utils";

/** Clears the session and everything cached for it, then lands on sign-in. */
export function SignOutButton({
  className,
  children = "Sign out",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [pending, setPending] = React.useState(false);

  return (
    <button
      type="button"
      disabled={pending}
      onClick={async () => {
        setPending(true);
        try {
          await signOut();
        } finally {
          crossSessionBoundary("/auth/login?reason=signed_out");
        }
      }}
      className={cn("focus-ring rounded-sm font-bold text-fg hover:underline disabled:opacity-60", className)}
    >
      {pending ? "Signing out…" : children}
    </button>
  );
}
