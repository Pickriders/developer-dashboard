"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { DocsNav } from "./docs-nav";
import { DocsSearch } from "./docs-search";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/kit/theme-toggle";
import { LinkButton } from "@/components/ui/button";

/** Where a newcomer gets a test key: sign up, then straight to the keys page. */
export const GET_A_KEY = "/auth/signup?redirect=/keys";

/**
 * The docs' top bar: the logo (home of the docs), search, theme, the dashboard and the one action
 * that matters most, getting a test key. On phones the table of contents opens from the menu button.
 */
export function DocsHeader() {
  const [menu, setMenu] = React.useState(false);
  const pathname = usePathname();
  React.useEffect(() => setMenu(false), [pathname]);
  React.useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menu]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[90rem] items-center gap-3 px-4 md:px-6">
        <button
          type="button"
          onClick={() => setMenu(true)}
          aria-label="Open the docs menu"
          aria-expanded={menu}
          className="focus-ring -ml-1 grid size-10 place-items-center rounded-xl text-fg-muted hover:bg-surface-subtle hover:text-fg lg:hidden"
        >
          <Menu className="size-5" aria-hidden />
        </button>
        <Link
          href="/docs"
          className="focus-ring flex shrink-0 items-center gap-2 rounded-md"
          aria-label="Pickriders docs home"
        >
          <Logo product="docs" />
        </Link>
        <DocsSearch shortcuts className="ml-auto hidden w-64 md:flex lg:ml-10 lg:w-80" />
        <div className="ml-auto flex items-center gap-1.5">
          <DocsSearch className="w-10 justify-center px-0 md:hidden [&>span]:hidden" />
          <ThemeToggle />
          <Link
            href="/"
            className="focus-ring hidden rounded-lg px-3 py-2 text-sm font-semibold text-fg-muted hover:text-fg sm:block"
          >
            Dashboard
          </Link>
          <LinkButton href={GET_A_KEY} size="sm" className="hidden sm:inline-flex">
            Get a test key
          </LinkButton>
        </div>
      </div>

      {menu && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Docs menu">
          <button
            type="button"
            aria-label="Close the docs menu"
            className="absolute inset-0 animate-fade-in bg-plum/50 backdrop-blur-[2px]"
            onClick={() => setMenu(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(20rem,86vw)] flex-col bg-canvas shadow-pop animate-slide-in-left">
            <div className="flex h-16 items-center justify-between border-b border-line px-4">
              <Logo product="docs" />
              <button
                type="button"
                onClick={() => setMenu(false)}
                aria-label="Close the docs menu"
                className="focus-ring grid size-10 place-items-center rounded-xl text-fg-muted hover:bg-surface-subtle hover:text-fg"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-5">
              <DocsNav onNavigate={() => setMenu(false)} />
            </div>
            <div className="space-y-2 border-t border-line p-4">
              <LinkButton href={GET_A_KEY} fullWidth>
                Get a test key
              </LinkButton>
              <LinkButton href="/" variant="secondary" fullWidth>
                Open the dashboard
              </LinkButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
