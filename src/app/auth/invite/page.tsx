import { Suspense } from "react";
import type { Metadata } from "next";

import { InviteFlow } from "./_components/invite-flow";

export const metadata: Metadata = { title: "Team invitation" };

export default function InvitePage() {
  return (
    <Suspense>
      <InviteFlow />
    </Suspense>
  );
}
