import type { Metadata } from "next";
import Link from "next/link";

import { Showcase } from "./_components/showcase";
import { Logo } from "@/components/brand/logo";
import { PageHeader, ThemeToggle } from "@/components/kit";

export const metadata: Metadata = { title: "Design system" };

const SECTIONS = [
  ["colour", "Colour"],
  ["type", "Typography"],
  ["buttons", "Buttons"],
  ["status", "Status"],
  ["forms", "Forms"],
  ["data", "Data"],
  ["feedback", "Overlays and feedback"],
  ["navigation", "Navigation"],
] as const;

/**
 * The design system, live: every token and component in the current theme. The reference for
 * building pages (with DESIGN.md), and what a reviewer opens on a Vercel preview.
 */
export default function DesignPage() {
  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-30 border-b border-line bg-canvas/80 backdrop-blur">
        <div className="mx-auto flex h-header max-w-6xl items-center justify-between px-6">
          <Link href="/" className="focus-ring rounded-md">
            <Logo />
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <div className="mx-auto flex max-w-6xl gap-12 px-6 py-10">
        <nav aria-label="Sections" className="sticky top-24 hidden h-fit w-44 shrink-0 lg:block">
          <ul className="space-y-0.5 text-sm">
            {SECTIONS.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="focus-ring block rounded-md px-2 py-1.5 text-fg-muted transition-colors duration-fast hover:bg-surface-subtle hover:text-fg"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <main className="min-w-0 flex-1">
          <PageHeader
            title="Design system"
            description="Calm, dense and exact: the parts every page of the developer dashboard is built from. Switch the theme to see both."
          />
          <Showcase />
        </main>
      </div>
    </div>
  );
}
