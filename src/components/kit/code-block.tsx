import * as React from "react";

import { CopyButton } from "./copy-button";
import { cn } from "@/lib/utils";

/** Code to copy: a request, a webhook payload, a curl command. Dark in both themes, like a terminal. */
export function CodeBlock({ code, label, className }: { code: string; label?: string; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-plum/40 bg-plum text-[#ece9f5]", className)}>
      <div className="flex h-9 items-center justify-between border-b border-white/10 pl-4 pr-1.5">
        <span className="text-xs font-medium text-white/50">{label}</span>
        <CopyButton value={code} className="text-white/50 hover:bg-white/10 hover:text-white" />
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-5">
        <code>{code}</code>
      </pre>
    </div>
  );
}
