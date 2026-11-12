import type { Metadata } from "next";
import { Suspense } from "react";

import { KeysPage } from "./_components/keys-page";

export const metadata: Metadata = { title: "API keys" };

export default function Page() {
  // Suspense: the page reads the query string (?create=test from the checklist).
  return (
    <Suspense>
      <KeysPage />
    </Suspense>
  );
}
