import { Suspense } from "react";
import type { Metadata } from "next";

import { ResetFlow } from "./_components/reset-flow";

export const metadata: Metadata = { title: "Reset your password" };

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <ResetFlow />
    </Suspense>
  );
}
