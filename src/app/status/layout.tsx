import type { Metadata } from "next";
import Link from "next/link";

import { DocsHeader } from "@/components/docs/docs-header";
import { SITE_URL } from "@/constant";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Status · Pickriders developers",
  description: "Live status of the Pickriders Developer API, webhooks and dashboard, with incidents.",
  robots: { index: true, follow: true },
};

/** The public status page (/status): no sign-in, one column, the docs' header. */
export default function StatusLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-canvas">
      <DocsHeader />
      <main id="content" className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-12">
        {children}
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-fg-muted md:px-6">
          <p>© {new Date().getFullYear()} Pickriders.</p>
          <nav aria-label="Footer" className="flex flex-wrap gap-5">
            <Link href="/docs" className="focus-ring rounded-sm hover:text-fg">
              Docs
            </Link>
            <Link href="/docs/errors" className="focus-ring rounded-sm hover:text-fg">
              Errors
            </Link>
            <Link href="/" className="focus-ring rounded-sm hover:text-fg">
              Dashboard
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
