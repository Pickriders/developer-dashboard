import * as React from "react";
import { TriangleAlert } from "lucide-react";

import { CopyButton } from "./copy-button";
import { cn } from "@/lib/utils";

/**
 * A secret shown once (sk_live_…, whsec_…). Render it only inside the dialog that received it and
 * let it go when the dialog closes: never store it, cache it, log it or put it in a URL.
 */
export function SecretReveal({ secret, className }: { secret: string; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2 rounded-xl border border-line-strong bg-surface-subtle py-1.5 pl-3.5 pr-1.5">
        <code className="min-w-0 flex-1 select-all break-all text-sm text-fg">{secret}</code>
        <CopyButton value={secret} label="Copy secret" />
      </div>
      <p className="flex items-center gap-1.5 text-xs text-warning-fg">
        <TriangleAlert className="size-3.5 shrink-0" aria-hidden />
        Copy it now. You won&apos;t be able to see it again.
      </p>
    </div>
  );
}
