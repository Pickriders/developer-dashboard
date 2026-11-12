"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type MenuContext = { close: () => void };
const Ctx = React.createContext<MenuContext>({ close: () => undefined });

/**
 * A small dropdown (team switcher, account menu, row actions): opens under its trigger, closes on
 * Escape, a click outside or a choice, and moves with the arrow keys. Focus goes back to the
 * trigger on close, as a native menu would.
 */
export function Menu({
  label,
  trigger,
  align = "start",
  side = "bottom",
  className,
  children,
}: {
  /** What the menu is, for screen readers ("Switch team"). */
  label: string;
  trigger: (props: {
    ref: React.Ref<HTMLButtonElement>;
    open: boolean;
    onClick: () => void;
    "aria-haspopup": "menu";
    "aria-expanded": boolean;
    "aria-label"?: string;
  }) => React.ReactNode;
  align?: "start" | "end";
  side?: "bottom" | "top";
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const root = React.useRef<HTMLDivElement>(null);
  const button = React.useRef<HTMLButtonElement>(null);
  const panel = React.useRef<HTMLDivElement>(null);

  const close = React.useCallback((refocus = true) => {
    setOpen(false);
    if (refocus) button.current?.focus();
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) close(false);
    };
    document.addEventListener("pointerdown", onPointer);
    panel.current?.querySelector<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])')?.focus();
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open, close]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      return close();
    }
    if (e.key === "Tab") return close(false);
    const items = Array.from(panel.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
    const at = items.indexOf(document.activeElement as HTMLElement);
    const move = { ArrowDown: 1, ArrowUp: -1 }[e.key];
    if (move) {
      e.preventDefault();
      items[(at + move + items.length) % items.length]?.focus();
    }
    if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      items[e.key === "Home" ? 0 : items.length - 1]?.focus();
    }
  };

  return (
    <Ctx.Provider value={{ close }}>
      <div ref={root} className="relative" onKeyDown={onKeyDown}>
        {trigger({
          ref: button,
          open,
          onClick: () => setOpen((v) => !v),
          "aria-haspopup": "menu",
          "aria-expanded": open,
        })}
        {open && (
          <div
            ref={panel}
            role="menu"
            aria-label={label}
            className={cn(
              "absolute z-50 min-w-[14rem] animate-pop-in rounded-xl border border-line bg-surface-raised p-1.5 shadow-pop",
              side === "bottom" ? "top-full mt-1.5 origin-top" : "bottom-full mb-1.5 origin-bottom",
              align === "start" ? "left-0" : "right-0",
              className,
            )}
          >
            {children}
          </div>
        )}
      </div>
    </Ctx.Provider>
  );
}

/** A choice in a Menu. Closes the menu after `onSelect`. */
export function MenuItem({
  onSelect,
  icon,
  hint,
  selected,
  tone = "default",
  disabled,
  children,
}: {
  onSelect: () => void;
  icon?: React.ReactNode;
  hint?: React.ReactNode;
  selected?: boolean;
  tone?: "default" | "danger";
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const { close } = React.useContext(Ctx);
  return (
    <button
      type="button"
      role="menuitem"
      aria-disabled={disabled || undefined}
      aria-current={selected || undefined}
      tabIndex={-1}
      onClick={() => {
        if (disabled) return;
        close();
        onSelect();
      }}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium outline-none transition-colors [&_svg]:size-4 [&_svg]:shrink-0",
        tone === "danger"
          ? "text-danger-fg hover:bg-danger-subtle focus-visible:bg-danger-subtle"
          : "text-fg hover:bg-surface-subtle focus-visible:bg-surface-subtle",
        disabled && "cursor-not-allowed opacity-50",
      )}
    >
      {icon && <span className={cn(tone === "danger" ? "text-danger-fg" : "text-fg-subtle")}>{icon}</span>}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {hint && <span className="shrink-0 text-xs text-fg-subtle">{hint}</span>}
    </button>
  );
}

export function MenuLabel({ children }: { children: React.ReactNode }) {
  return <p className="px-2.5 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.1em] text-fg-subtle">{children}</p>;
}

export function MenuSeparator() {
  return <div className="-mx-1.5 my-1.5 h-px bg-line" role="separator" />;
}
