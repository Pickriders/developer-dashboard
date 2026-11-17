import type { Metadata } from "next";
import Link from "next/link";

import { DocsHeader } from "@/components/docs/docs-header";
import { DocsNav } from "@/components/docs/docs-nav";
import { OnThisPage } from "@/components/docs/on-this-page";
import { SITE_URL } from "@/constant";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Pickriders API docs", template: "%s · Pickriders API docs" },
  robots: { index: true, follow: true },
};

/**
 * The public docs (/docs): no sign-in, no dashboard shell. The table of contents on the left, the
 * page in the middle, its sections on the right; on phones the contents open from the header.
 */
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-canvas">
      <a
        href="#content"
        className="focus-ring fixed left-3 top-3 z-[100] -translate-y-24 rounded-lg bg-surface px-4 py-2.5 text-sm font-bold text-fg-heading shadow-pop transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <DocsHeader />
      <div className="mx-auto flex max-w-[90rem] gap-10 px-4 md:px-6">
        <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-60 shrink-0 overflow-y-auto py-8 lg:block">
          <DocsNav />
        </aside>
        <main id="content" tabIndex={-1} className="min-w-0 flex-1 py-8 outline-none md:py-12">
          <div className="mx-auto max-w-3xl">{children}</div>
        </main>
        <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-52 shrink-0 overflow-y-auto py-12 xl:block">
          <OnThisPage />
        </aside>
      </div>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[90rem] flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-fg-muted md:px-6">
          <p>© {new Date().getFullYear()} Pickriders. Deliveries across Nigeria, built into your product.</p>
          <nav aria-label="Footer" className="flex flex-wrap gap-5">
            <Link href="/docs/quickstart" className="focus-ring rounded-sm hover:text-fg">
              Quickstart
            </Link>
            <Link href="/docs/errors" className="focus-ring rounded-sm hover:text-fg">
              Errors
            </Link>
            <Link href="/docs/changelog" className="focus-ring rounded-sm hover:text-fg">
              Changelog
            </Link>
            <Link href="/docs/versioning" className="focus-ring rounded-sm hover:text-fg">
              Versioning
            </Link>
            <Link href="/status" className="focus-ring rounded-sm hover:text-fg">
              Status
            </Link>
            <Link href="/" className="focus-ring rounded-sm hover:text-fg">
              Dashboard
            </Link>
            <a href="https://pickriders.com/terms" className="focus-ring rounded-sm hover:text-fg">
              Terms
            </a>
            <a href="https://pickriders.com/privacy" className="focus-ring rounded-sm hover:text-fg">
              Privacy
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
