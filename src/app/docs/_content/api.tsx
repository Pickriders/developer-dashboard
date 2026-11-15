import { C, Endpoint, H2, P } from "@/components/docs/prose";
import { PUBLIC_API_BASE } from "@/constant";
import { ENDPOINT_GROUPS } from "@/lib/docs/endpoints";

export function AllEndpoints() {
  return (
    <>
      <P>
        Every path below starts with <C>{PUBLIC_API_BASE}</C>. Send JSON, get JSON, with your key in the{" "}
        <C>Authorization</C> header. Lists come back as <C>{'{ object: "list", data, has_more }'}</C>; pass the last id
        as <C>starting_after</C> to get the next page.
      </P>
      {ENDPOINT_GROUPS.map((group) => (
        <section key={group.name}>
          <H2>{group.name}</H2>
          <P className="-mt-2 text-fg-muted">{group.about}</P>
          <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
            {group.endpoints.map((e) => (
              <li
                key={`${e.method} ${e.path}`}
                className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:gap-4"
              >
                <span className="min-w-0 sm:w-[22rem] sm:shrink-0">
                  <Endpoint method={e.method} path={e.path} />
                </span>
                <span className="text-[0.95rem] leading-6 text-fg-muted">{e.does}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
