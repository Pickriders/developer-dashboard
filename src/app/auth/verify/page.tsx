import { Suspense } from "react";
import type { Metadata } from "next";

import { VerifyFlow } from "./_components/verify-flow";

export const metadata: Metadata = { title: "Verify your account" };

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyFlow />
    </Suspense>
  );
}
