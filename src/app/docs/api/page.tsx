import { DocPage, docMetadata } from "@/components/docs/doc-page";
import { A, C, Callout, Endpoint, H2, P } from "@/components/docs/prose";
import { TestKeyField } from "@/components/docs/try-it";
import { PUBLIC_API_BASE } from "@/constant";
import { referenceGroups } from "@/lib/docs/openapi";
import Link from "next/link";

export const metadata = docMetadata("api");

/** /docs/api: the whole API at a glance, the downloads, and where Try it lives. Generated from the API document. */
export default function ApiReference() {
  const groups = referenceGroups();
  return (
    <DocPage slug="api">
      <P>
        Every path below starts with <C>{PUBLIC_API_BASE}</C>. Send JSON, get JSON, with your key in the{" "}
        <C>Authorization</C> header. Lists come back as <C>{'{ object: "list", data, has_more }'}</C>; pass the last id
        as <C>starting_after</C> to get the next page. Open a part of the API for every field, example and{" "}
        <strong>Try it</strong>.
      </P>

      <H2 id="downloads">Downloads</H2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <a
          href="/docs/pickriders.postman_collection.json"
          download
          className="focus-ring rounded-2xl border border-line bg-surface p-5 shadow-card transition-colors hover:border-brand"
        >
          <span className="block font-bold text-fg-heading">Postman collection</span>
          <span className="mt-1 block text-sm leading-6 text-fg-muted">
            Every request, ready to send. Import it, set <C>apiKey</C> to your test key, and run{" "}
            <strong>Create an order</strong>.
          </span>
        </a>
        <a
          href="/docs/openapi.json"
          download
          className="focus-ring rounded-2xl border border-line bg-surface p-5 shadow-card transition-colors hover:border-brand"
        >
          <span className="block font-bold text-fg-heading">OpenAPI 3 file</span>
          <span className="mt-1 block text-sm leading-6 text-fg-muted">
            The whole API as a machine-readable spec, for code generators, Insomnia or your own tools.
          </span>
        </a>
      </div>

      <H2 id="try-it">Try it, for real</H2>
      <P>
        Paste your test key once and it&apos;s used by every <strong>Try it</strong> on these pages. Test mode only:
        nothing costs real money or sends a real rider, and each request shows up in your{" "}
        <A href="/logs">request log</A>.
      </P>
      <TestKeyField />
      <Callout tone="tip" title="Start with a quote">
        <p>
          Open <A href="/docs/api/quotes">Quotes</A> and try <C>POST /quotes</C>: the example body works as it is.
        </p>
      </Callout>

      {groups.map((group) => (
        <section key={group.slug}>
          <H2 id={group.slug}>{group.name}</H2>
          {group.description && <P className="-mt-2 text-fg-muted">{group.description}.</P>}
          <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
            {group.endpoints.map((e) => (
              <li key={e.anchor}>
                <Link
                  href={`/docs/api/${group.slug}#${e.anchor}`}
                  className="focus-ring flex flex-col gap-1 px-4 py-3 transition-colors hover:bg-surface-subtle sm:flex-row sm:items-center sm:gap-4"
                >
                  <span className="min-w-0 sm:w-[22rem] sm:shrink-0">
                    <Endpoint method={e.method} path={e.path} />
                  </span>
                  <span className="text-[0.95rem] leading-6 text-fg-muted">{e.op.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </DocPage>
  );
}
