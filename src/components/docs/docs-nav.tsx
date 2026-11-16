"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { DOC_PAGES, SECTIONS, docHref } from "@/lib/docs/pages";
import { cn } from "@/lib/utils";

/** The docs' table of contents, by section. The page you're on is marked. */
export function DocsNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Docs" className="space-y-7">
      {SECTIONS.map((section) => (
        <div key={section}>
          <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-[0.12em] text-fg-subtle">{section}</p>
          <ul className="space-y-0.5">
            {DOC_PAGES.filter((p) => p.section === section && !p.hidden).map((page) => {
              const href = docHref(page.slug);
              const current = pathname === href;
              return (
                <li key={page.slug}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "focus-ring relative block rounded-lg px-3 py-2 text-[0.95rem] transition-colors",
                      current
                        ? "bg-brand-subtle font-bold text-brand-fg"
                        : "font-medium text-fg-muted hover:bg-surface-subtle hover:text-fg",
                    )}
                  >
                    {current && (
                      <span aria-hidden className="absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-brand" />
                    )}
                    {page.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
