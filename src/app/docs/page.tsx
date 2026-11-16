import { KeyRound, Package, Wallet } from "lucide-react";

import { GET_A_KEY } from "@/components/docs/docs-header";
import { DocPage, docMetadata } from "@/components/docs/doc-page";
import { NextCard } from "@/components/docs/prose";
import { LinkButton } from "@/components/ui/button";
import { SITE_URL } from "@/constant";

export const metadata = docMetadata("");

const STEPS = [
  {
    icon: KeyRound,
    title: "Get a test key",
    body: "Sign up free. You get a key that only plays pretend: no real money, no real riders.",
  },
  {
    icon: Wallet,
    title: "Ask for a price",
    body: "Tell us where to pick up and where to drop off. We answer with the price.",
  },
  {
    icon: Package,
    title: "Book it",
    body: "Say yes to the price. A rider is on the way, and you can watch every step.",
  },
];

/** /docs: what Pickriders does in one line, the whole journey in three steps, and one button. */
export default function DocsHome() {
  const site = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Pickriders API docs",
    url: `${SITE_URL}/docs`,
    publisher: { "@type": "Organization", name: "Pickriders", url: "https://pickriders.com" },
  };
  return (
    <DocPage slug="">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }} />

      <section className="pb-4 pt-2">
        <p className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-brand-subtle px-3 py-1 text-sm font-semibold text-brand-fg">
          <span className="size-1.5 rounded-full bg-brand" aria-hidden /> Pickriders API docs
        </p>
        <h1 className="mt-5 text-[2.5rem] font-black leading-[1.08] tracking-tight text-fg-heading md:text-[3.4rem]">
          Send a delivery
          <br />
          from your app.
        </h1>
        <p className="mt-5 max-w-xl text-xl leading-8 text-fg-muted">
          Pickriders brings riders to your customers&apos; doors. Our API lets your app book them by itself. Here&apos;s
          the whole thing in three steps.
        </p>
      </section>

      <ol className="my-10 grid gap-4 md:grid-cols-3" aria-label="How it works">
        {STEPS.map(({ icon: Icon, title, body }, i) => (
          <li key={title} className="relative rounded-2xl border border-line bg-surface p-5 shadow-card">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-plum text-white" aria-hidden>
                <Icon className="size-5" />
              </span>
              <span className="text-sm font-bold text-fg-subtle">Step {i + 1}</span>
            </div>
            <h2 className="mt-4 text-lg font-extrabold text-fg-heading">{title}</h2>
            <p className="mt-1 text-[0.98rem] leading-7 text-fg-muted">{body}</p>
          </li>
        ))}
      </ol>

      <div className="flex flex-col gap-3 rounded-2xl border border-brand-line bg-brand-subtle/50 p-6 sm:flex-row sm:items-center">
        <div className="flex-1">
          <p className="text-lg font-extrabold text-fg-heading">Ready? It takes about 10 minutes.</p>
          <p className="mt-1 text-fg-muted">We&apos;ll walk you through it, one copy-and-paste at a time.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <LinkButton href="/docs/quickstart" size="lg">
            Start the tutorial
          </LinkButton>
          <LinkButton href={GET_A_KEY} variant="secondary" size="lg">
            Get a test key
          </LinkButton>
        </div>
      </div>

      <h2 className="mb-4 mt-14 text-[1.4rem] font-extrabold tracking-tight text-fg-heading">Already building?</h2>
      <div className="grid gap-3 md:grid-cols-2">
        <NextCard href="/docs/webhooks" title="Hear when things happen">
          Webhooks tell your server the moment an order moves.
        </NextCard>
        <NextCard href="/docs/errors" title="Fix an error">
          Every error code, what it means and what to do.
        </NextCard>
        <NextCard href="/docs/test-and-live" title="Go live">
          Switch from pretend riders to real ones.
        </NextCard>
        <NextCard href="/docs/api" title="See every endpoint">
          Everything the API can do, on one page.
        </NextCard>
      </div>
    </DocPage>
  );
}
