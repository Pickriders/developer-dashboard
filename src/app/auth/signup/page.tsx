import { Suspense } from "react";
import type { Metadata } from "next";

import { SignupForm } from "./_components/signup-form";

export const metadata: Metadata = { title: "Create your account" };

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}
