import * as React from "react";
import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/kit/theme-toggle";
import { cn } from "@/lib/utils";
import { AuthAside } from "./auth-aside";

/**
 * Every auth page, in the Pickriders storefront's split screen: the brand panel on the left from
 * 1024px, the form column on the right (with the logo on top on smaller screens). The form sits at
 * a fixed height from the top, so moving between steps never makes the page jump.
 */
export function AuthShell({ children, topRight }: { children: React.ReactNode; topRight?: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh bg-surface lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <AuthAside />

      <div className="flex min-h-dvh flex-col">
        <header className="flex h-header shrink-0 items-center justify-between gap-4 px-5 sm:px-10">
          <Link
            href="/"
            prefetch={false}
            className="focus-ring -m-1 rounded-lg p-1 lg:invisible"
            aria-label="Pickriders Developers home"
          >
            <Logo />
          </Link>
          {topRight && <div className="text-sm text-fg-muted">{topRight}</div>}
        </header>

        <main className="flex flex-1 items-start justify-center px-5 pb-16 pt-8 sm:px-10 sm:pt-[max(2.5rem,11vh)]">
          <div className="w-full max-w-[25rem] animate-slide-up">{children}</div>
        </main>

        <footer className="flex flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs text-fg-subtle sm:px-10">
          <nav className="flex items-center gap-4" aria-label="Legal">
            <span>© {new Date().getFullYear()} Pickriders</span>
            {[
              ["Terms", "https://pickriders.com/terms"],
              ["Privacy", "https://pickriders.com/privacy"],
              ["Support", "mailto:developers@pickriders.com"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="focus-ring rounded-sm font-medium hover:text-fg"
              >
                {label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </footer>
      </div>
    </div>
  );
}

/** Title and one line of context, the top of every auth form. */
export function AuthHeading({
  title,
  description,
  icon,
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-7", className)}>
      {icon && (
        <span className="relative mb-5 grid size-14 place-items-center" aria-hidden>
          <span className="absolute inset-0 rounded-2xl bg-brand-subtle" />
          <span className="relative grid size-10 place-items-center rounded-xl bg-surface text-brand shadow-button [&_svg]:size-[19px]">
            {icon}
          </span>
        </span>
      )}
      <h1 className="text-balance text-[1.75rem] font-black leading-tight tracking-tight text-fg-heading">{title}</h1>
      {description && <p className="mt-2 text-[15px] leading-6 text-fg-muted">{description}</p>}
    </div>
  );
}

/** "New to Pickriders? Create account": the header's way across. */
export function AuthSwitch({ prompt, href, label }: { prompt: string; href: string; label: string }) {
  return (
    <span>
      <span className="hidden sm:inline">{prompt} </span>
      <Link href={href} className="focus-ring rounded-sm font-bold text-brand-fg hover:underline">
        {label}
      </Link>
    </span>
  );
}
