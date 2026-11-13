import type { Metadata } from "next";
import { Suspense } from "react";

import { LogsPage } from "./_components/logs-page";

export const metadata: Metadata = { title: "Request logs" };

export default function Page() {
  // Suspense: filters and the open request live in the query string.
  return (
    <Suspense>
      <LogsPage />
    </Suspense>
  );
}
