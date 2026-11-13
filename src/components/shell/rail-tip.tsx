import * as React from "react";

/** A label beside a rail icon on hover or focus. */
export function RailTip({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-lg bg-nav px-2.5 py-1.5 text-xs font-semibold text-nav-fg opacity-0 shadow-pop ring-1 ring-white/10 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
    >
      {children}
    </span>
  );
}
