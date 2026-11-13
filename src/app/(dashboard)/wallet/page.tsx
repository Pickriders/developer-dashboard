import type { Metadata } from "next";
import { Suspense } from "react";

import { WalletPage } from "./_components/wallet-page";

export const metadata: Metadata = { title: "Wallet" };

export default function Page() {
  // Suspense: the page reads ?funded=1 / ?card=saved coming back from Paystack.
  return (
    <Suspense>
      <WalletPage />
    </Suspense>
  );
}
