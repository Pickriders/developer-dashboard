"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

/** The page's sections, read from its h2s, with the one you're reading marked as you scroll. */
export function OnThisPage() {
  const pathname = usePathname();
  const [headings, setHeadings] = React.useState<{ id: string; text: string }[]>([]);
  const [current, setCurrent] = React.useState<string | null>(null);

  React.useEffect(() => {
    const found = Array.from(document.querySelectorAll<HTMLHeadingElement>("article h2[id]")).map((h) => ({
      id: h.id,
      text: h.childNodes[0]?.textContent?.trim() ?? h.textContent ?? "",
    }));
    setHeadings(found);
    setCurrent(found[0]?.id ?? null);
    if (!found.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setCurrent(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -65% 0px" },
    );
    found.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  if (headings.length < 2) return null;
  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-fg-subtle">On this page</p>
      <ul className="space-y-1 border-l border-line">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              aria-current={current === h.id ? "location" : undefined}
              className={cn(
                "focus-ring -ml-px block border-l-2 py-1 pl-3 leading-5 transition-colors",
                current === h.id
                  ? "border-brand font-semibold text-brand-fg"
                  : "border-transparent text-fg-muted hover:text-fg",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
