import * as React from "react";
import Link from "next/link";
import { ArrowRight, Info, Lightbulb, TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";

/** "Ask for a price" → "ask-for-a-price": a heading's id, so it can be linked to. */
export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/** A section heading with a # link to itself, and an id the "On this page" list picks up. */
export function H2({ children, id }: { children: string; id?: string }) {
  const anchor = id ?? slugify(children);
  return (
    <h2
      id={anchor}
      className="group mt-12 scroll-mt-24 text-[1.4rem] font-extrabold tracking-tight text-fg-heading first:mt-0"
    >
      {children}
      <a
        href={`#${anchor}`}
        aria-label={`Link to “${children}”`}
        className="focus-ring ml-2 rounded text-fg-subtle opacity-0 transition-opacity hover:text-brand-fg focus-visible:opacity-100 group-hover:opacity-100"
      >
        #
      </a>
    </h2>
  );
}

export function H3({ children, id }: { children: string; id?: string }) {
  return (
    <h3 id={id ?? slugify(children)} className="mt-8 scroll-mt-24 text-lg font-bold text-fg-heading">
      {children}
    </h3>
  );
}

export function P({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("my-4 text-[1.05rem] leading-8 text-fg", className)}>{children}</p>;
}

/** A short list. Keep each item to one idea. */
export function List({ children, ordered }: { children: React.ReactNode; ordered?: boolean }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className={cn(
        "my-4 space-y-2 pl-6 text-[1.05rem] leading-7 text-fg marker:text-fg-subtle",
        ordered ? "list-decimal" : "list-disc",
      )}
    >
      {children}
    </Tag>
  );
}

/** A name from the API: a field, header, id or value. */
export function C({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md border border-line bg-surface-subtle px-1.5 py-0.5 font-mono text-[0.85em] text-fg-heading [overflow-wrap:anywhere]">
      {children}
    </code>
  );
}

export function A({ href, children }: { href: string; children: React.ReactNode }) {
  const external = /^https?:/.test(href);
  const className =
    "focus-ring rounded-sm font-semibold text-brand-fg underline decoration-brand/40 underline-offset-[3px] hover:decoration-brand";
  return external ? (
    <a href={href} className={className} target="_blank" rel="noopener">
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

const CALLOUTS = {
  tip: { icon: Lightbulb, label: "Tip", className: "border-brand-line bg-brand-subtle/60", iconClass: "text-brand-fg" },
  note: {
    icon: Info,
    label: "Good to know",
    className: "border-info-line bg-info-subtle/60",
    iconClass: "text-info-fg",
  },
  warning: {
    icon: TriangleAlert,
    label: "Careful",
    className: "border-warning-line bg-warning-subtle/70",
    iconClass: "text-warning-fg",
  },
} as const;

/** One thing worth stopping for. Use rarely, or nobody reads them. */
export function Callout({
  tone = "note",
  title,
  children,
}: {
  tone?: keyof typeof CALLOUTS;
  title?: string;
  children: React.ReactNode;
}) {
  const { icon: Icon, label, className, iconClass } = CALLOUTS[tone];
  return (
    <aside className={cn("my-6 flex gap-3 rounded-xl border px-4 py-3.5", className)}>
      <Icon className={cn("mt-0.5 size-5 shrink-0", iconClass)} aria-hidden />
      <div className="min-w-0 text-[0.98rem] leading-7 text-fg">
        <p className="font-bold text-fg-heading">{title ?? label}</p>
        <div className="[&>p]:my-1">{children}</div>
      </div>
    </aside>
  );
}

/** Numbered steps down a line, each a heading people can link to. */
export function Steps({ children }: { children: React.ReactNode }) {
  return <ol className="relative my-8 space-y-10 border-l-2 border-line pl-8 [counter-reset:step]">{children}</ol>;
}

export function Step({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <li className="relative [counter-increment:step]">
      <span
        aria-hidden
        className="absolute -left-[3.05rem] top-0 grid size-9 place-items-center rounded-full border-2 border-canvas bg-plum text-sm font-extrabold text-white before:content-[counter(step)]"
      />
      <h2 id={id ?? slugify(title)} className="scroll-mt-24 text-xl font-extrabold tracking-tight text-fg-heading">
        {title}
      </h2>
      <div className="mt-2">{children}</div>
    </li>
  );
}

const METHOD_TONES: Record<string, string> = {
  GET: "bg-info-subtle text-info-fg",
  POST: "bg-success-subtle text-success-fg",
  PATCH: "bg-warning-subtle text-warning-fg",
  DELETE: "bg-danger-subtle text-danger-fg",
};

/** GET /orders/{id}, as the API takes it. */
export function Endpoint({ method, path }: { method: string; path: string }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-2 font-mono text-[13px]">
      <span className={cn("shrink-0 rounded px-1.5 py-0.5 text-[11px] font-bold", METHOD_TONES[method])}>{method}</span>
      <span className="min-w-0 break-all text-fg-heading">{path}</span>
    </span>
  );
}

/** A big, friendly link to where to go next. */
export function NextCard({ href, title, children }: { href: string; title: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="focus-ring group flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 shadow-card transition-[border-color,transform] hover:-translate-y-0.5 hover:border-brand"
    >
      <span className="min-w-0 flex-1">
        <span className="block text-base font-bold text-fg-heading">{title}</span>
        <span className="mt-0.5 block text-sm leading-6 text-fg-muted">{children}</span>
      </span>
      <ArrowRight
        className="size-5 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-brand-fg"
        aria-hidden
      />
    </Link>
  );
}

/** A plain table: headers across the top. */
export function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-line">
      <table className="w-full text-left text-[0.95rem]">
        <thead className="bg-surface-subtle text-xs font-bold uppercase tracking-wide text-fg-muted">
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="px-4 py-2.5">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line bg-surface">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 align-top leading-6 text-fg">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
