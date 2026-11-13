"use client";

import * as React from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

type MenuContext = { close: () => void };
const Ctx = React.createContext<MenuContext>({ close: () => undefined });

/**
 * A small dropdown (team switcher, account menu, row actions): opens under its trigger (or above,
 * near the bottom of the screen), closes on Escape, a click outside or a choice, and moves with the
 * arrow keys. Focus goes back to the trigger on close, as a native menu would.
 *
 * The panel is portalled (to the open <dialog> it was opened from, or the body) and placed against
 * the viewport, so a card's rounded, clipped edge never cuts it off.
 */
export function Menu({
  label,
  trigger,
  align = "start",
  side = "bottom",
  matchWidth = false,
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
  /** Where it prefers to open; it flips when there isn't room. */
  side?: "bottom" | "top";
  /** As wide as the trigger (the sidebar's team and account menus). */
  matchWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [place, setPlace] = React.useState<React.CSSProperties | null>(null);
  const root = React.useRef<HTMLDivElement>(null);
  const button = React.useRef<HTMLButtonElement>(null);
  const panel = React.useRef<HTMLDivElement>(null);

  const close = React.useCallback((refocus = true) => {
    setOpen(false);
    setPlace(null);
    if (refocus) button.current?.focus();
  }, []);

  // Measure the panel, then put it beside the trigger: below or above, whichever fits.
  React.useLayoutEffect(() => {
    if (!open) return;
    const position = () => {
      const anchor = button.current?.getBoundingClientRect();
      const menu = panel.current;
      if (!anchor || !menu) return;
      const gap = 6;
      const height = menu.offsetHeight;
      const width = matchWidth ? anchor.width : menu.offsetWidth;
      const below = window.innerHeight - anchor.bottom - gap;
      const above = anchor.top - gap;
      const up = side === "top" ? above >= height || above > below : below < height && above > below;
      const left = Math.min(
        Math.max(8, align === "start" ? anchor.left : anchor.right - width),
        window.innerWidth - width - 8,
      );
      setPlace({
        position: "fixed",
        left,
        top: up ? Math.max(8, anchor.top - gap - height) : anchor.bottom + gap,
        width: matchWidth ? anchor.width : undefined,
        transformOrigin: up ? "bottom" : "top",
      });
    };
    position();
    window.addEventListener("resize", position);
    window.addEventListener("scroll", position, true);
    return () => {
      window.removeEventListener("resize", position);
      window.removeEventListener("scroll", position, true);
    };
  }, [open, side, align, matchWidth]);

  React.useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!root.current?.contains(target) && !panel.current?.contains(target)) close(false);
    };
    document.addEventListener("pointerdown", onPointer);
    panel.current?.querySelector<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])')?.focus();
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open, close]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      // Inside a <dialog>, Escape would also close the dialog.
      e.preventDefault();
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

  // Into the dialog it was opened from (a <dialog> sits above everything else), or the body.
  const host = open ? (button.current?.closest("dialog") ?? document.body) : null;

  return (
    <Ctx.Provider value={{ close }}>
      <div ref={root} className="relative" onKeyDown={onKeyDown}>
        {trigger({
          ref: button,
          open,
          onClick: () => (open ? close(false) : setOpen(true)),
          "aria-haspopup": "menu",
          "aria-expanded": open,
        })}
        {open &&
          host &&
          createPortal(
            <div
              ref={panel}
              role="menu"
              aria-label={label}
              style={place ?? { position: "fixed", visibility: "hidden", top: 0, left: 0 }}
              className={cn(
                "z-[60] min-w-[14rem] max-w-[calc(100vw-1rem)] rounded-xl border border-line bg-surface-raised p-1.5 text-fg shadow-pop",
                place && "animate-pop-in",
                className,
              )}
            >
              {children}
            </div>,
            host,
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
