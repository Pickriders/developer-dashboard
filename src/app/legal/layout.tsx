import type { Metadata } from "next";
import Link from "next/link";

import { DocsHeader } from "@/components/docs/docs-header";
import { SITE_URL } from "@/constant";
import { LEGAL_PAGES, legalHref } from "@/lib/legal/pages";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Legal · Pickriders developers", template: "%s · Pickriders developers" },
  robots: { index: true, follow: true },
};

/** The developer platform's legal pages (/legal): public, one readable column, every page a click away. */
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-canvas">
      <a
        href="#content"
        className="focus-ring fixed left-3 top-3 z-[100] -translate-y-24 rounded-lg bg-surface px-4 py-2.5 text-sm font-bold text-fg-heading shadow-pop transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <DocsHeader />
      <div className="mx-auto flex max-w-6xl gap-10 px-4 md:px-6">
        <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-56 shrink-0 py-12 lg:block">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-fg-subtle">Legal</p>
          <nav aria-label="Legal pages" className="mt-3 flex flex-col gap-1">
            {LEGAL_PAGES.map((page) => (
              <Link
                key={page.slug}
                href={legalHref(page.slug)}
                className="focus-ring rounded-lg px-3 py-2 text-sm font-semibold text-fg-muted hover:bg-surface-subtle hover:text-fg"
              >
                {page.title}
              </Link>
            ))}
          </nav>
        </aside>
        <main id="content" tabIndex={-1} className="min-w-0 flex-1 py-8 outline-none md:py-12">
          <div className="mx-auto max-w-3xl">{children}</div>
        </main>
      </div>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-fg-muted md:px-6">
          <p>© {new Date().getFullYear()} Pickriders.</p>
          <nav aria-label="Footer" className="flex flex-wrap gap-5">
            {LEGAL_PAGES.map((page) => (
              <Link key={page.slug} href={legalHref(page.slug)} className="focus-ring rounded-sm hover:text-fg">
                {page.short}
              </Link>
            ))}
            <Link href="/docs" className="focus-ring rounded-sm hover:text-fg">
              Docs
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
