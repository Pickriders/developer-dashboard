"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, ChevronLeft, ChevronRight, Menu as MenuIcon, Search, X } from "lucide-react";

import { CommandPalette } from "./command-palette";
import { ALL_ITEMS, isActive, pageFor } from "./nav";
import { ShellContext, useModKey } from "./shell-context";
import { Sidebar } from "./sidebar";
import { DOCS_URL } from "@/constant";
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";

const COLLAPSED_KEY = "pr_dev_nav_collapsed";

/**
 * The signed-in frame. From lg: the plum sidebar (foldable to a rail with `[`) beside the page,
 * under a header with where you are and the page's actions. Below lg: a slim header and a tab bar
 * along the bottom, with the full sidebar a tap away. ⌘K searches everything; G then a letter
 * jumps to a page. `banner` sits above everything (the test-mode bar).
 */
export function DashboardShell({
  banner,
  headerActions,
  children,
}: {
  banner?: React.ReactNode;
  headerActions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [drawer, setDrawer] = React.useState(false);
  const [palette, setPalette] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(() => {
    try {
      return window.localStorage.getItem(COLLAPSED_KEY) === "1";
    } catch {
      return false;
    }
  });

  const toggleCollapsed = React.useCallback(() => {
    setCollapsed((was) => {
      try {
        window.localStorage.setItem(COLLAPSED_KEY, was ? "0" : "1");
      } catch {
        // Private mode: it lasts until the tab closes.
      }
      return !was;
    });
  }, []);
  const openPalette = React.useCallback(() => {
    setDrawer(false);
    setPalette(true);
  }, []);

  useShortcuts({ openPalette, toggleCollapsed, paused: palette || drawer });

  React.useEffect(() => setDrawer(false), [pathname]);
  React.useEffect(() => {
    if (!drawer) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawer(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawer]);

  const shell = React.useMemo(
    () => ({ collapsed, toggleCollapsed, openPalette }),
    [collapsed, toggleCollapsed, openPalette],
  );

  return (
    <ShellContext.Provider value={shell}>
      <div className="min-h-dvh bg-canvas">
        {/* The first Tab stop: straight to the page, past the sidebar and header. */}
        <a
          href="#main"
          className="focus-ring fixed left-3 top-3 z-[100] -translate-y-24 rounded-lg bg-surface px-4 py-2.5 text-sm font-bold text-fg-heading shadow-pop transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        {banner && <div className="sticky top-0 z-40">{banner}</div>}
        <div className="flex">
          <aside
            aria-label="Sidebar"
            className={cn(
              "sticky z-[35] hidden shrink-0 transition-[width] duration-300 ease-out lg:block",
              collapsed ? "w-[4.75rem]" : "w-[17rem]",
              banner ? "top-8 h-[calc(100dvh-2rem)]" : "top-0 h-dvh",
            )}
          >
            <Sidebar rail={collapsed} />
            {/* Fold or unfold: a small round handle on the sidebar's edge, as on the storefront. */}
            <button
              type="button"
              onClick={toggleCollapsed}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-keyshortcuts="["
              title={`${collapsed ? "Expand" : "Collapse"} sidebar  [`}
              className="focus-ring absolute -right-3 top-[1.375rem] z-10 grid size-6 place-items-center rounded-full border border-line bg-surface text-fg-subtle shadow-card transition-colors hover:text-fg"
            >
              <ChevronLeft
                className={cn("size-3.5 transition-transform duration-300", collapsed && "rotate-180")}
                aria-hidden
              />
            </button>
          </aside>

          {drawer && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 animate-fade-in bg-plum/50 backdrop-blur-[2px]"
                onClick={() => setDrawer(false)}
              />
              <aside
                aria-label="Menu"
                className="absolute inset-y-0 left-0 w-[18rem] max-w-[85vw] animate-slide-in-left overflow-hidden shadow-pop"
              >
                <Sidebar inDrawer />
                <button
                  type="button"
                  onClick={() => setDrawer(false)}
                  aria-label="Close menu"
                  className="focus-ring absolute right-3 top-3.5 grid size-9 place-items-center rounded-xl text-nav-muted hover:bg-white/[0.06] hover:text-nav-fg"
                >
                  <X className="size-[18px]" aria-hidden />
                </button>
              </aside>
            </div>
          )}

          <div className="flex min-w-0 flex-1 flex-col">
            <Header
              banner={Boolean(banner)}
              actions={headerActions}
              onMenu={() => setDrawer(true)}
              onSearch={openPalette}
            />
            <main id="main" tabIndex={-1} className="flex-1 px-4 pb-28 pt-6 outline-none md:px-8 md:pt-8 lg:pb-12">
              <div key={pathname} className="mx-auto w-full max-w-[72rem] animate-slide-up">
                {children}
              </div>
            </main>
          </div>
        </div>

        <TabBar onMore={() => setDrawer(true)} />
        <CommandPalette open={palette} onClose={() => setPalette(false)} />
      </div>
    </ShellContext.Provider>
  );
}

/** Where you are (team, page, deeper page) on the left; the page's tools on the right. */
function Header({
  banner,
  actions,
  onMenu,
  onSearch,
}: {
  banner: boolean;
  actions?: React.ReactNode;
  onMenu: () => void;
  onSearch: () => void;
}) {
  const pathname = usePathname();
  const { team } = useWorkspace();
  const { item, child } = pageFor(pathname);
  const mod = useModKey();
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky z-30 flex h-16 items-center gap-2 px-3 transition-[background-color,border-color,box-shadow] duration-200 md:px-8",
        banner ? "top-8" : "top-0",
        scrolled ? "border-b border-line bg-canvas/80 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <button
        type="button"
        onClick={onMenu}
        aria-label="Open menu"
        className="focus-ring grid size-10 place-items-center rounded-xl text-fg-muted hover:bg-surface-subtle lg:hidden"
      >
        <MenuIcon className="size-5" aria-hidden />
      </button>

      <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
        <ol className="flex min-w-0 items-center gap-1.5 text-sm">
          <li className="hidden min-w-0 items-center gap-1.5 sm:flex">
            <span className="truncate text-fg-subtle">{team.name}</span>
            <ChevronRight className="size-3.5 shrink-0 text-fg-subtle/60" aria-hidden />
          </li>
          {item && (
            <li className="flex min-w-0 items-center gap-1.5">
              {child ? (
                <>
                  <Link href={item.href} className="focus-ring truncate rounded-md text-fg-muted hover:text-fg">
                    {item.label}
                  </Link>
                  <ChevronRight className="size-3.5 shrink-0 text-fg-subtle/60" aria-hidden />
                </>
              ) : (
                <span aria-current="page" className="truncate font-bold text-fg">
                  {item.label}
                </span>
              )}
            </li>
          )}
          {child && (
            <li aria-current="page" className="truncate font-bold text-fg">
              {child}
            </li>
          )}
        </ol>
      </nav>

      <div className="flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          onClick={onSearch}
          aria-label="Search or jump to"
          className="focus-ring hidden h-9 items-center gap-2 rounded-xl border border-line bg-surface px-3 text-sm text-fg-subtle shadow-button transition-colors hover:border-line-strong hover:text-fg md:flex lg:hidden"
        >
          <Search className="size-4" aria-hidden />
          <span className="pr-6">Search</span>
          <kbd className="rounded-md bg-surface-subtle px-1.5 text-[11px] font-semibold text-fg-muted">{mod} K</kbd>
        </button>
        <button
          type="button"
          onClick={onSearch}
          aria-label="Search or jump to"
          className="focus-ring grid size-10 place-items-center rounded-xl text-fg-muted hover:bg-surface-subtle md:hidden"
        >
          <Search className="size-5" aria-hidden />
        </button>
        {actions}
        <a
          href={DOCS_URL}
          target="_blank"
          rel="noreferrer"
          className="focus-ring hidden h-9 items-center gap-1 rounded-xl px-3 text-sm font-semibold text-fg-muted transition-colors hover:bg-surface-subtle hover:text-fg sm:inline-flex"
        >
          Docs <ArrowUpRight className="size-3.5" aria-hidden />
        </a>
      </div>
    </header>
  );
}

/** Phones and tablets: the pages along the bottom, in thumb's reach, and the rest under More. */
function TabBar({ onMore }: { onMore: () => void }) {
  const pathname = usePathname();
  const { can } = useWorkspace();
  const items = ALL_ITEMS.filter((i) => !i.permission || can(i.permission)).slice(0, 4);

  return (
    <nav
      aria-label="Tabs"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-2">
        {items.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "focus-ring relative flex h-16 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-semibold transition-colors",
                  active ? "text-brand-fg" : "text-fg-subtle hover:text-fg",
                )}
              >
                {active && <span aria-hidden className="absolute top-0 h-[3px] w-8 rounded-b-full bg-brand" />}
                <Icon className="size-[22px]" aria-hidden strokeWidth={active ? 2.25 : 1.75} />
                {label}
              </Link>
            </li>
          );
        })}
        <li className="flex-1">
          <button
            type="button"
            onClick={onMore}
            className="focus-ring flex h-16 w-full flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-semibold text-fg-subtle hover:text-fg"
          >
            <MenuIcon className="size-[22px]" aria-hidden strokeWidth={1.75} />
            More
          </button>
        </li>
      </ul>
    </nav>
  );
}

/** ⌘K / Ctrl K searches, `[` folds the sidebar, G then H, K or W jumps to a page. Not while typing. */
function useShortcuts({
  openPalette,
  toggleCollapsed,
  paused,
}: {
  openPalette: () => void;
  toggleCollapsed: () => void;
  paused: boolean;
}) {
  const router = useRouter();
  const { can } = useWorkspace();
  const pendingG = React.useRef(0);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        return openPalette();
      }
      const target = e.target as HTMLElement | null;
      const typing =
        target?.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName ?? "") ||
        !!document.querySelector("dialog[open]");
      if (paused || typing || e.metaKey || e.ctrlKey || e.altKey) return;

      const key = e.key.toLowerCase();
      if (key === "[") return toggleCollapsed();
      if (key === "/") {
        e.preventDefault();
        return openPalette();
      }
      if (Date.now() - pendingG.current < 1200) {
        pendingG.current = 0;
        const item = ALL_ITEMS.find((i) => i.key === key && (!i.permission || can(i.permission)));
        if (item) router.push(item.href);
        return;
      }
      if (key === "g") pendingG.current = Date.now();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openPalette, toggleCollapsed, paused, router, can]);
}
