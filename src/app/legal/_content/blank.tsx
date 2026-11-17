import * as React from "react";

/**
 * A detail legal has to fill in (the company's registered name, address, RC number, …), shown
 * highlighted so a draft can't pass for the final text.
 */
export function Blank({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded bg-warning-subtle px-1 font-semibold text-warning-fg" title="To be filled in by legal">
      [{children}]
    </mark>
  );
}
