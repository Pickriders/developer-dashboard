"use client";

import * as React from "react";
import { ChevronDown, Play } from "lucide-react";

import { Endpoint } from "./prose";
import { TryIt } from "./try-it";
import type { EndpointEntry } from "@/lib/docs/endpoints";
import { cn } from "@/lib/utils";

/** One route: what it does, and a Try it panel that opens under it to send it for real. */
export function EndpointRow({
  endpoint,
  example,
}: {
  endpoint: EndpointEntry;
  example?: { query?: Record<string, string>; body?: unknown };
}) {
  const [open, setOpen] = React.useState(false);
  const panel = React.useId();
  return (
    <li data-endpoint={`${endpoint.method} ${endpoint.path}`}>
      <div className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
        <span className="min-w-0 sm:w-[22rem] sm:shrink-0">
          <Endpoint method={endpoint.method} path={endpoint.path} />
        </span>
        <span className="flex-1 text-[0.95rem] leading-6 text-fg-muted">{endpoint.does}</span>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panel}
          aria-label={`Try ${endpoint.method} ${endpoint.path}`}
          className={cn(
            "focus-ring inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg border px-2.5 py-1.5 text-xs font-bold transition-colors sm:self-center",
            open
              ? "border-brand bg-brand-subtle text-brand-fg"
              : "border-line-strong text-fg-muted hover:border-brand hover:text-brand-fg",
          )}
        >
          <Play className="size-3" aria-hidden /> Try it
          <ChevronDown className={cn("size-3 transition-transform", open && "rotate-180")} aria-hidden />
        </button>
      </div>
      <div id={panel} hidden={!open}>
        {open && <TryIt method={endpoint.method} path={endpoint.path} example={example} />}
      </div>
    </li>
  );
}
