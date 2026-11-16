import { EndpointRow } from "@/components/docs/endpoint-row";
import { A, C, Callout, H2, P } from "@/components/docs/prose";
import { TestKeyField } from "@/components/docs/try-it";
import { PUBLIC_API_BASE } from "@/constant";
import { ENDPOINT_GROUPS, TRY_EXAMPLES } from "@/lib/docs/endpoints";

export function AllEndpoints() {
  return (
    <>
      <P>
        Every path below starts with <C>{PUBLIC_API_BASE}</C>. Send JSON, get JSON, with your key in the{" "}
        <C>Authorization</C> header. Lists come back as <C>{'{ object: "list", data, has_more }'}</C>; pass the last id
        as <C>starting_after</C> to get the next page.
      </P>

      <H2 id="try-it">Try it, for real</H2>
      <P className="-mt-2">
        Paste your test key once, then press <strong>Try it</strong> on any request below to send it and see what the
        API answers. Test mode only: nothing costs real money or sends a real rider, and each request shows up in your{" "}
        <A href="/logs">request log</A>.
      </P>
      <TestKeyField />
      <Callout tone="tip" title="Start with a quote">
        <p>
          Try <C>POST /quotes</C>: the example body works as it is. Then <C>POST /orders</C>, and move it along with{" "}
          <C>POST /test/orders/{"{id}"}/advance</C>.
        </p>
      </Callout>

      {ENDPOINT_GROUPS.map((group) => (
        <section key={group.name}>
          <H2>{group.name}</H2>
          <P className="-mt-2 text-fg-muted">{group.about}</P>
          <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
            {group.endpoints.map((e) => (
              <EndpointRow key={`${e.method} ${e.path}`} endpoint={e} example={TRY_EXAMPLES[`${e.method} ${e.path}`]} />
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
