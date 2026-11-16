import { notFound } from "next/navigation";

import { Authentication, Money, TestAndLive } from "../_content/basics";
import { Changelog, Ids, Idempotency, Pagination, RateLimits, Versioning } from "../_content/concepts";
import { Errors } from "../_content/errors";
import { Quickstart } from "../_content/quickstart";
import { Webhooks } from "../_content/webhooks";
import { DocPage, docMetadata } from "@/components/docs/doc-page";

/** Each page's content, by slug. A new page joins DOC_PAGES and this map. */
const CONTENT: Record<string, () => JSX.Element> = {
  quickstart: Quickstart,
  "test-and-live": TestAndLive,
  authentication: Authentication,
  webhooks: Webhooks,
  errors: Errors,
  money: Money,
  idempotency: Idempotency,
  pagination: Pagination,
  "rate-limits": RateLimits,
  ids: Ids,
  changelog: Changelog,
  versioning: Versioning,
};

// Every page is built ahead of time: fast, and crawlable without JavaScript.
export const dynamicParams = false;
// Only the pages this route has content for: the rest (api, guides, events) have their own routes,
// and pre-rendering their slugs here would overwrite those pages with "not found".
export const generateStaticParams = () => Object.keys(CONTENT).map((slug) => ({ slug }));
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
