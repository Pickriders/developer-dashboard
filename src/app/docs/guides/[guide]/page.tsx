import { notFound } from "next/navigation";

import {
  BiddingGuide,
  CancellationsGuide,
  DeliveryTypesGuide,
  FundingGuide,
  GoingLiveGuide,
  GoLiveChecklist,
  QuotesGuide,
  SchedulingGuide,
  TrackingGuide,
} from "../../_content/guides";
import { DocPage, docMetadata } from "@/components/docs/doc-page";

/** Each guide's content, by slug (step 12.5). A new guide joins DOC_PAGES and this map. */
const GUIDES: Record<string, () => JSX.Element> = {
  "going-live": GoingLiveGuide,
  "funding-the-wallet": FundingGuide,
  "quotes-and-pricing": QuotesGuide,
  "delivery-types": DeliveryTypesGuide,
  scheduling: SchedulingGuide,
  bidding: BiddingGuide,
  "tracking-and-proof": TrackingGuide,
  cancellations: CancellationsGuide,
  "go-live-checklist": GoLiveChecklist,
};

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(GUIDES).map((guide) => ({ guide }));
export const generateMetadata = ({ params }: { params: { guide: string } }) => docMetadata(`guides/${params.guide}`);

export default function GuidePage({ params }: { params: { guide: string } }) {
  const Guide = GUIDES[params.guide];
  if (!Guide) notFound();
  return (
    <DocPage slug={`guides/${params.guide}`}>
      <Guide />
    </DocPage>
  );
}
