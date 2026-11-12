import type { Metadata } from "next";
import { Suspense } from "react";

import { Home } from "./_components/home/home";

export const metadata: Metadata = { title: "Home" };

export default function HomePage() {
  // Suspense: Home reads the query string (?request=live).
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
}
