import type { Metadata } from "next";

import { OrderPage } from "../_components/order-page";

export const metadata: Metadata = { title: "Order" };

export default function Page({ params }: { params: { id: string } }) {
  return <OrderPage id={params.id} />;
}
