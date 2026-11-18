import { SdkOverview } from "../_content/sdks";
import { DocPage, docMetadata } from "@/components/docs/doc-page";

export const metadata = docMetadata("sdks");

export default function SdksPage() {
  return (
    <DocPage slug="sdks">
      <SdkOverview />
    </DocPage>
  );
}
