import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";

import { SITE_URL } from "@/constant";
import { docHref, findDoc, neighbours } from "@/lib/docs/pages";

/** Title, description, canonical link and social cards for a docs page, from the page list. */
export function docMetadata(slug: string): Metadata {
  const page = findDoc(slug);
  if (!page) return {};
  const url = `${SITE_URL}${docHref(slug)}`;
  const title = slug ? page.title : "Pickriders API docs: send your first delivery";
  return {
    title: slug ? page.title : { absolute: title },
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: slug ? "article" : "website",
      url,
      title,
      description: page.description,
      siteName: "Pickriders Developers",
      locale: "en_NG",
      // Listed here: a page's own openGraph replaces the inherited one, image and all.
      images: [{ url: "/docs/opengraph-image", width: 1200, height: 630, alt: "Pickriders API docs" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.description,
      images: ["/docs/opengraph-image"],
    },
  };
}

/**
 * A docs page: where you are, the title and one sentence on what it's for, the content, then
 * where to go next. Search engines also get it as structured data (an article in a trail).
 */
export function DocPage({ slug, children }: { slug: string; children: React.ReactNode }) {
  const page = findDoc(slug)!;
  const { previous, next } = neighbours(slug);
  const url = `${SITE_URL}${docHref(slug)}`;
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: page.title,
      description: page.description,
      url,
      inLanguage: "en",
      publisher: { "@type": "Organization", name: "Pickriders", url: "https://pickriders.com" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Docs", item: `${SITE_URL}/docs` },
        ...(slug ? [{ "@type": "ListItem", position: 2, name: page.title, item: url }] : []),
      ],
    },
  ];

  return (
    <article className="min-w-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }} />
      {slug && (
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-sm text-fg-subtle">
          <Link href="/docs" className="focus-ring rounded-sm hover:text-fg">
            Docs
          </Link>
          <ChevronRight className="size-3.5" aria-hidden />
          <span className="font-medium text-fg-muted">{page.section}</span>
        </nav>
      )}
      {slug && (
        <header className="mb-8 border-b border-line pb-8">
          <h1 className="text-[2.1rem] font-black leading-tight tracking-tight text-fg-heading md:text-[2.5rem]">
            {page.title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-8 text-fg-muted">{page.description}</p>
        </header>
      )}

      {children}

      <nav aria-label="More docs" className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
        {previous ? (
          <Link
            href={docHref(previous.slug)}
            className="focus-ring group rounded-2xl border border-line p-4 transition-colors hover:border-brand"
          >
            <span className="flex items-center gap-1 text-xs font-semibold text-fg-subtle">
              <ArrowLeft className="size-3.5" aria-hidden /> Back
            </span>
            <span className="mt-1 block font-bold text-fg-heading group-hover:text-brand-fg">{previous.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={docHref(next.slug)}
            className="focus-ring group rounded-2xl border border-line p-4 text-right transition-colors hover:border-brand"
          >
            <span className="flex items-center justify-end gap-1 text-xs font-semibold text-fg-subtle">
              Next <ArrowRight className="size-3.5" aria-hidden />
            </span>
            <span className="mt-1 block font-bold text-fg-heading group-hover:text-brand-fg">{next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
