import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { LEGAL_PAGES, legalHref } from "@/lib/legal/pages";

export const metadata: Metadata = { title: "Legal" };

/** /legal: every legal page of the developer platform, with what each is for. */
export default function LegalIndex() {
  return (
    <>
      <h1 className="text-[2rem] font-black tracking-tight text-fg-heading">Legal</h1>
      <p className="mt-2 text-[15px] leading-6 text-fg-muted">
        The agreements and policies for the Pickriders Developer API and dashboard.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {LEGAL_PAGES.map((page) => (
          <li key={page.slug}>
            <Link
              href={legalHref(page.slug)}
              className="focus-ring group flex h-full flex-col rounded-xl border border-line bg-surface p-5 shadow-card transition-colors hover:border-line-strong"
            >
              <span className="flex items-center justify-between gap-2 text-base font-bold text-fg-heading">
                {page.title}
                <ArrowRight
                  className="size-4 text-fg-subtle transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
              <span className="mt-1 text-sm leading-6 text-fg-muted">{page.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
