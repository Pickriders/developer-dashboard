import type { Metadata } from "next";
import { Suspense } from "react";

import { WebhooksPage } from "./_components/webhooks-page";

export const metadata: Metadata = { title: "Webhooks" };

export default function Page() {
  // Suspense: the page reads the query string (?create=1 from the checklist).
  return (
    <Suspense>
      <WebhooksPage />
    </Suspense>
  );
}
