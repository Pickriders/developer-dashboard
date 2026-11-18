import { notFound } from "next/navigation";

import {
  SdkBrowser,
  SdkNextjs,
  SdkNode,
  SdkReact,
  SdkReference,
  SdkSvelte,
  SdkTesting,
  SdkVue,
} from "../../_content/sdks";
import { DocPage, docMetadata } from "@/components/docs/doc-page";

/** Each SDK guide, by slug. A new one joins DOC_PAGES and this map. */
const PAGES: Record<string, () => JSX.Element> = {
  node: SdkNode,
  nextjs: SdkNextjs,
  react: SdkReact,
  vue: SdkVue,
  svelte: SdkSvelte,
  browser: SdkBrowser,
  testing: SdkTesting,
  reference: SdkReference,
};

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(PAGES).map((page) => ({ page }));
export const generateMetadata = ({ params }: { params: { page: string } }) => docMetadata(`sdks/${params.page}`);

export default function SdkPage({ params }: { params: { page: string } }) {
  const Content = PAGES[params.page];
  if (!Content) notFound();
  return (
    <DocPage slug={`sdks/${params.page}`}>
      <Content />
    </DocPage>
  );
}
