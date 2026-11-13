"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

import { AccountMenu } from "./account-menu";
import { isActive, NAV } from "./nav";
import { SetupCard } from "./setup-card";
import { RailTip } from "./rail-tip";
import { useModKey, useShell } from "./shell-context";
import { TeamSwitcher } from "./team-switcher";
import { Logo } from "@/components/brand/logo";
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";

/**
 * The deep plum sidebar: the logo, your team (and whether it's live), search, the pages with a
 * teal marker that slides to the one you're on, setup progress until you're done, and you.
 * `rail` folds it to icons with labels on hover; the drawer on phones shows it in full.
 */
export function Sidebar({ rail = false, inDrawer = false }: { rail?: boolean; inDrawer?: boolean }) {
  const pathname = usePathname();
  const { can } = useWorkspace();
  const { openPalette } = useShell();
  const mod = useModKey();
  const groups = NAV.map((g) => ({ ...g, items: g.items.filter((i) => !i.permission || can(i.permission)) })).filter(
    (g) => g.items.length,
  );

  // The marker slides from the old page to the new one: measured, then moved with a transform.
  const navRef = React.useRef<HTMLElement>(null);
  const [marker, setMarker] = React.useState<{ top: number; height: number } | null>(null);
  React.useLayoutEffect(() => {
    const nav = navRef.current;
    const place = () => {
      const active = nav?.querySelector<HTMLElement>('a[aria-current="page"]');
      setMarker(active ? { top: active.offsetTop, height: active.offsetHeight } : null);
    };
    place();
    // Re-measure whenever the list's layout moves: fonts arriving, the rail folding, a resize.
    const observer = new ResizeObserver(place);
    if (nav) observer.observe(nav);
    void document.fonts?.ready.then(place);
    return () => observer.disconnect();
  }, [pathname, rail, groups.length]);

  return (
    <div className={cn("relative flex h-full flex-col bg-nav text-nav-muted", !rail && "overflow-hidden")}>
      {/* Light from the top corner, as on the sign-in panel, in its own clipped layer so the rail's
          labels can still reach past the edge. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-32 size-80 rounded-full bg-brand/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 size-80 rounded-full bg-plum-mid/80 blur-3xl" />
      </div>

      <div className={cn("relative flex h-16 shrink-0 items-center", rail ? "justify-center" : "pl-5 pr-3")}>
        <Link href="/" prefetch={false} className="focus-ring rounded-md" aria-label="Pickriders Developers home">
          {rail ? <LogoMark /> : <Logo inverted className="h-[22px]" />}
        </Link>
      </div>

      <div className={cn("relative space-y-2", rail ? "px-3" : "px-3.5")}>
        <TeamSwitcher rail={rail} />
        <button
          type="button"
          onClick={openPalette}
          aria-label="Search or jump to"
          aria-keyshortcuts="Meta+K Control+K"
          className={cn(
            "focus-ring group flex h-10 w-full items-center gap-2.5 rounded-xl text-sm text-nav-subtle ring-1 ring-inset ring-white/[0.08] transition-colors hover:bg-white/[0.05] hover:text-nav-muted",
            rail ? "justify-center" : "px-3",
          )}
        >
          <Search className="size-4 shrink-0" aria-hidden />
          {!rail && (
            <>
              <span className="flex-1 text-left">Search or jump to…</span>
              <kbd className="rounded-md bg-white/[0.08] px-1.5 py-0.5 font-sans text-[11px] font-semibold text-nav-muted">
                {mod} K
              </kbd>
            </>
          )}
        </button>
      </div>

      <nav
        ref={navRef}
        aria-label="Pages"
        className={cn("relative mt-5 flex-1 space-y-6", rail ? "overflow-visible px-3" : "overflow-y-auto px-3.5")}
      >
        {marker && (
          // The highlight itself slides to the page you open: a soft pill with a lit teal edge.
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute top-0 rounded-xl bg-white/[0.08] ring-1 ring-inset ring-white/[0.06] transition-[transform,height] duration-300 ease-out",
              rail ? "inset-x-3" : "inset-x-3.5",
            )}
            style={{ transform: `translateY(${marker.top}px)`, height: marker.height }}
          >
            <span className="absolute inset-y-2.5 left-0 w-[3px] rounded-r-full bg-nav-accent shadow-[0_0_10px_rgb(var(--nav-accent)/0.8)]" />
          </span>
        )}
        {groups.map((group) => (
          <div key={group.title}>
            {rail ? (
              <div className="mx-2 mb-2 h-px bg-white/[0.08]" aria-hidden />
            ) : (
              <p className="mb-1.5 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-nav-subtle">
                {group.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map(({ href, label, icon: Icon, key }) => {
                const active = isActive(pathname, href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      aria-keyshortcuts={`G ${key.toUpperCase()}`}
                      className={cn(
                        "focus-ring group relative flex h-10 items-center gap-3 rounded-xl text-sm font-semibold transition-colors duration-150",
                        rail ? "justify-center" : "px-3",
                        active ? "text-nav-fg" : "hover:bg-white/[0.04] hover:text-nav-fg",
                      )}
                    >
                      <Icon
                        className={cn("size-[18px] shrink-0 transition-colors", active ? "text-nav-accent" : "")}
                        aria-hidden
                      />
                      {rail ? (
                        <span className="sr-only">{label}</span>
                      ) : (
                        <>
                          <span className="flex-1 truncate">{label}</span>
                          <span
                            aria-hidden
                            className="flex gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                          >
                            <Key>G</Key>
                            <Key>{key.toUpperCase()}</Key>
                          </span>
                        </>
                      )}
                      {rail && <RailTip>{label}</RailTip>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className={cn("relative space-y-2 pb-3 pt-4", rail ? "px-3" : "px-3.5")}>
        <SetupCard rail={rail} />
        <div className="border-t border-white/[0.08] pt-2">
          <AccountMenu rail={rail} />
        </div>
      </div>
    </div>
  );
}

function Key({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="grid h-5 min-w-5 place-items-center rounded bg-white/[0.08] px-1 font-sans text-[10px] font-bold text-nav-subtle">
      {children}
    </kbd>
  );
}

/** The app icon's mark (src/app/icon.svg): the helmet "C" and the teal cursor. */
function LogoMark() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/icon.svg" alt="" width={34} height={34} className="rounded-[10px] ring-1 ring-white/10" />
  );
}
