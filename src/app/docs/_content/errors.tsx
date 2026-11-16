import { Code } from "@/components/docs/code";
import { C, H2, P } from "@/components/docs/prose";
import { ERROR_GROUPS } from "@/lib/docs/errors";

const SHAPE = `{
  "error": {
    "type": "invalid_request_error",
    "code": "quote_expired",
    "message": "This quote expired. Ask for a new one.",
    "param": "quote_id",
    "request_id": "req_yDKC528I7aKJyb4GboUc7kCt",
    "doc_url": "https://developers.pickriders.com/docs/errors#quote_expired"
  }
}`;

export function Errors() {
  return (
    <>
      <P>
        When something goes wrong, the answer has an HTTP status that isn&apos;t 2xx and a body like this. Read the{" "}
        <C>message</C> first: it&apos;s written for you, and usually says exactly what to do.
      </P>
      <Code tabs={[{ label: "Error", lang: "json", code: SHAPE }]} />
      <ul className="my-5 space-y-2 text-[1.05rem] leading-7">
        <li>
          <C>type</C> is the kind of problem, and <C>code</C> the exact one. Use <C>code</C> in your code: messages can
          change.
        </li>
        <li>
          <C>param</C> names the field at fault, like <C>stops.1.contact.phone</C>.
        </li>
        <li>
          <C>request_id</C> finds the request in your dashboard&apos;s request log. Send it to us if you need help.
        </li>
      </ul>

      {ERROR_GROUPS.map((group) => (
        <section key={group.type} aria-labelledby={group.type}>
          <H2 id={group.type}>{group.title}</H2>
          <P className="text-fg-muted">
            <C>{group.type}</C> · {group.summary.replace(/`/g, "")}
          </P>
          <dl className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
            {group.codes.map((e) => (
              <div
                key={e.code}
                id={e.code}
                className="scroll-mt-24 px-4 py-3.5 transition-colors target:bg-brand-subtle target:ring-2 target:ring-inset target:ring-brand"
              >
                <dt className="flex flex-wrap items-center gap-2">
                  <a
                    href={`#${e.code}`}
                    className="focus-ring rounded font-mono text-[0.92rem] font-bold text-fg-heading hover:text-brand-fg"
                  >
                    {e.code}
                  </a>
                  <span className="rounded-full bg-surface-muted px-2 py-0.5 text-xs font-semibold tabular-nums text-fg-muted">
                    {e.status}
                  </span>
                </dt>
                <dd className="mt-1 text-[0.98rem] leading-7 text-fg">
                  {e.meaning.replace(/`/g, "")} <span className="text-fg-muted">{e.fix.replace(/`/g, "")}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </>
  );
}
