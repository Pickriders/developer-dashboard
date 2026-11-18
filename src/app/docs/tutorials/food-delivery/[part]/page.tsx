import { notFound } from "next/navigation";

import {
  TutorialBookARider,
  TutorialDeliveryFee,
  TutorialGoLive,
  TutorialLiveTracking,
  TutorialSetup,
  TutorialWebhooks,
  TutorialWhenThingsGoWrong,
} from "../../../_content/tutorial";
import { DocPage, docMetadata } from "@/components/docs/doc-page";

/** Each part of the tutorial, by slug (TUTORIAL_PARTS in _content/tutorial.tsx, DOC_PAGES in lib/docs/pages.ts). */
const PARTS: Record<string, () => JSX.Element> = {
  setup: TutorialSetup,
  "delivery-fee": TutorialDeliveryFee,
  "book-a-rider": TutorialBookARider,
  "live-tracking": TutorialLiveTracking,
  webhooks: TutorialWebhooks,
  "when-things-go-wrong": TutorialWhenThingsGoWrong,
  "go-live": TutorialGoLive,
};

const slug = (part: string) => `tutorials/food-delivery/${part}`;

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(PARTS).map((part) => ({ part }));
export const generateMetadata = ({ params }: { params: { part: string } }) => docMetadata(slug(params.part));

export default function TutorialPart({ params }: { params: { part: string } }) {
  const Content = PARTS[params.part];
  if (!Content) notFound();
  return (
    <DocPage slug={slug(params.part)}>
      <Content />
    </DocPage>
  );
}
