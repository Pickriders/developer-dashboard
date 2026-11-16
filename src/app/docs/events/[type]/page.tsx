import { notFound } from "next/navigation";

import { Code } from "@/components/docs/code";
import { DocPage, docMetadata } from "@/components/docs/doc-page";
import { A, C, Callout, H2, P, Table } from "@/components/docs/prose";
import { EVENT_DOCS, eventSlug, exampleEvent, findEvent } from "@/lib/docs/events";

export const dynamicParams = false;
export const generateStaticParams = () => EVENT_DOCS.map((e) => ({ type: eventSlug(e.type) }));
export const generateMetadata = ({ params }: { params: { type: string } }) => docMetadata(`events/${params.type}`);

const EXTRAS: Record<string, [string, string]> = {
  stop_id: ["data.stop_id", "The stop it's about, one of data.object.stops."],
  offer: ["data.offer", "The offer, with its amount, rider and expiry."],
  transaction: ["data.transaction", "The credit that funded the wallet."],
  threshold: ["data.threshold", "Your alert amount the balance dropped below, in kobo."],
};
const OBJECTS = { order: "the order", wallet: "the wallet", account: "your account" };

/** One event: when it's sent, what's in it, what to do, and a full example (step 12.7). */
export default function EventPage({ params }: { params: { type: string } }) {
  const event = findEvent(params.type);
  if (!event) notFound();
  return (
    <DocPage slug={`events/${params.type}`}>
      <Table
        head={["", ""]}
        rows={[
          [<strong key="w">Sent when</strong>, event.when],
          [<strong key="t">What to do</strong>, event.then],
          ["data.object", <>{OBJECTS[event.kind]}, as it was at that moment</>],
          ...(event.extras ?? []).map((x) => [<C key={x}>{EXTRAS[x][0]}</C>, EXTRAS[x][1]]),
        ]}
      />
      <H2>Example</H2>
      <P>
        Exactly what your endpoint receives, and what <C>GET /events/{"{id}"}</C> returns. Checked against the API on
        every change, so it can&apos;t go out of date.
      </P>
      <Code tabs={[{ label: event.type, lang: "json", code: JSON.stringify(exampleEvent(event), null, 2) }]} />
      <Callout tone="tip" title="Handling it">
        <p>
          Check the signature, answer 2xx quickly, then do the work. The same event can arrive twice: skip an <C>id</C>{" "}
          you&apos;ve seen. <A href="/docs/webhooks">How webhooks work</A>
        </p>
      </Callout>
    </DocPage>
  );
}
