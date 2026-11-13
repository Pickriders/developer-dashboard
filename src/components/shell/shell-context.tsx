"use client";

import * as React from "react";

type Shell = {
  /** The sidebar folded to a rail of icons (desktop only; remembered per browser). */
  collapsed: boolean;
  toggleCollapsed: () => void;
  openPalette: () => void;
};

export const ShellContext = React.createContext<Shell>({
  collapsed: false,
  toggleCollapsed: () => undefined,
  openPalette: () => undefined,
});

export const useShell = () => React.useContext(ShellContext);

/** ⌘K on Apple keyboards, Ctrl K elsewhere. */
export function useModKey() {
  const [mod, setMod] = React.useState("Ctrl");
  React.useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) setMod("⌘");
  }, []);
  return mod;
}
