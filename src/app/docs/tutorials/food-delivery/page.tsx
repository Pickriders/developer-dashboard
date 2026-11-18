import { TutorialOverview } from "../../_content/tutorial";
import { DocPage, docMetadata } from "@/components/docs/doc-page";

export const metadata = docMetadata("tutorials/food-delivery");

export default function FoodDeliveryTutorial() {
  return (
    <DocPage slug="tutorials/food-delivery">
      <TutorialOverview />
    </DocPage>
  );
}
