import { notFound } from "next/navigation";

import { AllEndpoints } from "../_content/api";
import { Authentication, Money, TestAndLive } from "../_content/basics";
import { Errors } from "../_content/errors";
import { Quickstart } from "../_content/quickstart";
import { Webhooks } from "../_content/webhooks";
import { DocPage, docMetadata } from "@/components/docs/doc-page";
import { DOC_PAGES } from "@/lib/docs/pages";

/** Each page's content, by slug. A new page joins DOC_PAGES and this map. */
const CONTENT: Record<string, () => JSX.Element> = {
  quickstart: Quickstart,
  "test-and-live": TestAndLive,
  authentication: Authentication,
  webhooks: Webhooks,
  errors: Errors,
  money: Money,
  api: AllEndpoints,
};

// Every page is built ahead of time: fast, and crawlable without JavaScript.
export const dynamicParams = false;
export const generateStaticParams = () => DOC_PAGES.filter((p) => p.slug).map((p) => ({ slug: p.slug }));
export const generateMetadata = ({ params }: { params: { slug: string } }) => docMetadata(params.slug);

export default function Page({ params }: { params: { slug: string } }) {
  const Content = CONTENT[params.slug];
  if (!Content) notFound();
  return (
    <DocPage slug={params.slug}>
      <Content />
    </DocPage>
  );
}
