"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu as MenuIcon, X } from "lucide-react";

import { AccountMenu } from "./account-menu";
import { isActive, NAV } from "./nav";
import { TeamSwitcher } from "./team-switcher";
import { Logo } from "@/components/brand/logo";
import { DOCS_URL } from "@/constant";
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";

/**
 * The signed-in frame, after the storefront dashboard's shell: a sidebar from lg (logo, team,
 * pages, you), a slim sticky header, and the same sidebar as a drawer on smaller screens.
 * `banner` sits above everything (the test-mode bar); `headerActions` on the header's right.
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

  return (
    <div className="min-h-dvh bg-canvas">
      {banner && <div className="sticky top-0 z-40">{banner}</div>}
      <div className="flex">
        <aside
          className={cn(
            "sticky hidden w-sidebar shrink-0 flex-col border-r border-line bg-surface lg:flex",
            banner ? "top-8 h-[calc(100dvh-2rem)]" : "top-0 h-dvh",
          )}
        >
          <Sidebar />
        </aside>

        {drawer && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 animate-fade-in bg-plum/40 backdrop-blur-[2px]"
              onClick={() => setDrawer(false)}
            />
            <aside
              aria-label="Menu"
              className="absolute inset-y-0 left-0 flex w-[17.5rem] max-w-[85vw] animate-slide-in-left flex-col bg-surface shadow-pop"
            >
              <button
                type="button"
                onClick={() => setDrawer(false)}
                aria-label="Close menu"
                className="focus-ring absolute right-3 top-4 grid size-9 place-items-center rounded-xl text-fg-muted hover:bg-surface-subtle"
              >
                <X className="size-[18px]" aria-hidden />
              </button>
              <Sidebar />
            </aside>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header
            className={cn(
              "sticky z-30 flex h-14 items-center gap-2 border-b border-line bg-surface/85 px-3 backdrop-blur md:px-6",
              banner ? "top-8" : "top-0",
            )}
          >
            <button
              type="button"
              onClick={() => setDrawer(true)}
              aria-label="Open menu"
              className="focus-ring grid size-9 place-items-center rounded-xl text-fg-muted hover:bg-surface-subtle lg:hidden"
            >
              <MenuIcon className="size-5" aria-hidden />
            </button>
            <Link
              href="/"
              prefetch={false}
              className="focus-ring rounded-md lg:hidden"
              aria-label="Pickriders Developers home"
            >
              <Logo product={null} className="h-5" />
            </Link>
            <div className="ml-auto flex items-center gap-1.5">
              {headerActions}
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
          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
            <div key={pathname} className="mx-auto w-full max-w-[72rem] animate-slide-up">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  const pathname = usePathname();
  const { can } = useWorkspace();
  const groups = NAV.map((g) => ({ ...g, items: g.items.filter((i) => !i.permission || can(i.permission)) })).filter(
    (g) => g.items.length,
  );

  return (
    <>
      <div className="flex h-14 shrink-0 items-center border-b border-line px-5">
        <Link href="/" prefetch={false} className="focus-ring rounded-md" aria-label="Pickriders Developers home">
          <Logo className="h-[22px]" />
        </Link>
      </div>
      <div className="px-3 pt-3">
        <TeamSwitcher />
      </div>
      <nav aria-label="Pages" className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
        {groups.map((group, i) => (
          <div key={group.title ?? i}>
            {group.title && (
              <p className="mb-1.5 px-3 text-[11px] font-bold uppercase tracking-[0.12em] text-fg-subtle">
                {group.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map(({ href, label, icon: Icon }) => {
                const active = isActive(pathname, href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "focus-ring flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-colors",
                        active
                          ? "bg-brand-subtle text-brand-fg"
                          : "text-fg-muted hover:bg-surface-subtle hover:text-fg",
                      )}
                    >
                      <Icon className="size-[18px] shrink-0" aria-hidden />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="border-t border-line p-3">
        <AccountMenu />
      </div>
    </>
  );
}
