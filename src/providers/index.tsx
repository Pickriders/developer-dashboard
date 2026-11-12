"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";

import { toast } from "sonner";

import { Toaster } from "@/components/ui/toaster";
import { takeFlash } from "@/lib/session/navigate";

/** Everything client-side the whole app shares: theme, server state, toasts and tooltips. */
export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          // Dashboard data changes underneath you (orders move, webhooks deliver): refetch on focus,
          // but don't hammer the API while someone reads a page.
          queries: { staleTime: 15_000, retry: 1, refetchOnWindowFocus: true },
        },
      }),
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
        <Flash />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

/** Shows the message a page left before a full reload (crossSessionBoundary), once. */
function Flash() {
  React.useEffect(() => {
    const message = takeFlash();
    if (message) toast.success(message);
  }, []);
  return null;
}
