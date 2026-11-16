import Link from "next/link";

import { DocPage, docMetadata } from "@/components/docs/doc-page";
import { A, C, P } from "@/components/docs/prose";
import { EVENT_DOCS, eventSlug } from "@/lib/docs/events";

export const metadata = docMetadata("events");

/** /docs/events: every event, each linking to its own page with a full example (step 12.7). */
export default function EventsPage() {
  const groups = [
    ["Orders", EVENT_DOCS.filter((e) => e.kind === "order")],
    ["Wallet", EVENT_DOCS.filter((e) => e.kind === "wallet")],
    ["Account", EVENT_DOCS.filter((e) => e.kind === "account")],
  ] as const;
  return (
    <DocPage slug="events">
      <P>
        Every event Pickriders sends to your <A href="/docs/webhooks">webhook endpoints</A>, and lists at{" "}
        <C>GET /events</C>. Open one for when it&apos;s sent, what it holds and a full example.
      </P>
      {groups.map(([name, events]) => (
        <section key={name}>
          <h2
            id={name.toLowerCase()}
            className="mb-3 mt-10 scroll-mt-24 text-[1.4rem] font-extrabold tracking-tight text-fg-heading"
          >
            {name}
          </h2>
          <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
            {events.map((e) => (
              <li key={e.type}>
                <Link
                  href={`/docs/events/${eventSlug(e.type)}`}
                  className="focus-ring flex flex-col gap-1 px-4 py-3 transition-colors hover:bg-surface-subtle sm:flex-row sm:items-center sm:gap-4"
                >
                  <span className="font-mono text-[13px] font-bold text-fg-heading sm:w-56 sm:shrink-0">{e.type}</span>
                  <span className="text-[0.95rem] leading-6 text-fg-muted">{e.when}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </DocPage>
  );
}
