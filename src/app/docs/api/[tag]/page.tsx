import { notFound } from "next/navigation";

import { DocPage, docMetadata } from "@/components/docs/doc-page";
import { OperationBlock } from "@/components/docs/reference";
import { TestKeyField } from "@/components/docs/try-it";
import { referenceGroups } from "@/lib/docs/openapi";

export const dynamicParams = false;
export const generateStaticParams = () => referenceGroups().map((g) => ({ tag: g.slug }));
export const generateMetadata = ({ params }: { params: { tag: string } }) => docMetadata(`api/${params.tag}`);

/** One part of the API, every endpoint in full, generated from the API document. */
export default function ReferencePage({ params }: { params: { tag: string } }) {
  const group = referenceGroups().find((g) => g.slug === params.tag);
  if (!group) notFound();
  return (
    <DocPage slug={`api/${group.slug}`}>
      <div className="my-6">
        <TestKeyField />
      </div>
      <div className="space-y-8">
        {group.endpoints.map((e) => (
          <OperationBlock key={e.anchor} endpoint={e} />
        ))}
      </div>
    </DocPage>
  );
}
