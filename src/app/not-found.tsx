import Link from "next/link";
import { Compass } from "lucide-react";

import { AuthHeading, AuthShell } from "@/components/auth";
import { Button, LinkButton } from "@/components/ui/button";

export default function NotFound() {
  return (
    <AuthShell>
      <AuthHeading
        icon={<Compass />}
        title="Page not found"
        description="The link may be old or mistyped. Head back to the dashboard and find it from there."
      />
      <LinkButton fullWidth href={"/"}>
        Go to dashboard
      </LinkButton>
    </AuthShell>
  );
}
