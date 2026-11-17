import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TriangleAlert } from "lucide-react";

import { AcceptableUse } from "../_content/acceptable-use";
import { Dpa } from "../_content/dpa";
import { Privacy } from "../_content/privacy";
import { Terms } from "../_content/terms";
import { LEGAL, LEGAL_PAGES, legalPage, type LegalSlug } from "@/lib/legal/pages";

const CONTENT: Record<LegalSlug, () => JSX.Element> = {
  terms: Terms,
  "acceptable-use": AcceptableUse,
  privacy: Privacy,
  dpa: Dpa,
};

export const dynamicParams = false;
export const generateStaticParams = () => LEGAL_PAGES.map((page) => ({ slug: page.slug }));

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = legalPage(params.slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.summary,
    alternates: { canonical: `/legal/${page.slug}` },
    // A draft isn't the agreement yet: keep it out of search until legal approves it.
    robots: LEGAL.approved ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default function LegalPage({ params }: { params: { slug: string } }) {
  const page = legalPage(params.slug);
  if (!page) notFound();
  const Content = CONTENT[page.slug];
  return (
    <article>
      <header className="mb-8 space-y-2 border-b border-line pb-6">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-fg">Legal</p>
        <h1 className="text-[2rem] font-black tracking-tight text-fg-heading">{page.title}</h1>
        <p className="text-[15px] leading-6 text-fg-muted">{page.summary}</p>
        <p className="text-xs text-fg-subtle">
          Version {LEGAL.version} · {LEGAL.effective}
        </p>
      </header>
      {!LEGAL.approved && (
        <div
          role="note"
          data-legal-draft
          className="mb-8 flex gap-3 rounded-xl border border-warning-line bg-warning-subtle px-4 py-3.5 text-sm"
        >
          <TriangleAlert className="mt-0.5 size-5 shrink-0 text-warning-fg" aria-hidden />
          <p className="text-fg">
            <strong className="text-warning-fg">Draft for legal review.</strong> This text isn&apos;t in effect yet.
            Highlighted parts in brackets are still to be filled in.
          </p>
        </div>
      )}
      <div className="space-y-5">
        <Content />
      </div>
    </article>
  );
}
