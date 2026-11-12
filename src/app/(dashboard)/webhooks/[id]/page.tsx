import type { Metadata } from "next";

import { EndpointPage } from "../_components/endpoint-page";

export const metadata: Metadata = { title: "Webhook endpoint" };

export default function Page({ params }: { params: { id: string } }) {
  return <EndpointPage id={params.id} />;
}
