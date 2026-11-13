import type { Metadata } from "next";
import { Suspense } from "react";

import { OrdersPage } from "./_components/orders-page";

export const metadata: Metadata = { title: "Orders" };

export default function Page() {
  // Suspense: filters live in the query string.
  return (
    <Suspense>
      <OrdersPage />
    </Suspense>
  );
}
