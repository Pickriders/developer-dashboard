import type { Metadata } from "next";

import { NewOrderPage } from "../_components/new-order-page";

export const metadata: Metadata = { title: "Create an order" };

export default function Page() {
  return <NewOrderPage />;
}
