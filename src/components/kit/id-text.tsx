import * as React from "react";

import { CopyButton } from "./copy-button";
import { cn } from "@/lib/utils";

/**
 * An id developers search and paste (ord_…, evt_…, req_…): mono, truncated in the middle so the
 * prefix and the end both stay readable, with a copy button.
 */
export function IdText({ value, full = false, className }: { value: string; full?: boolean; className?: string }) {
  const shown = full || value.length <= 18 ? value : `${value.slice(0, 10)}…${value.slice(-6)}`;
  return (
    <span className={cn("group inline-flex items-center gap-0.5", className)}>
      <code className="text-xs text-fg-muted" title={value}>
        {shown}
      </code>
      <CopyButton
        value={value}
        label="Copy id"
        className="size-6 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
      />
    </span>
  );
}
