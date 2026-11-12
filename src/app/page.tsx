import type { Metadata } from "next";

import { SignedInHome } from "./_components/signed-in-home";

export const metadata: Metadata = { title: "Home" };

/** Until the dashboard shell and checklist land (11.3), home confirms who is signed in. */
export default function Home() {
  return <SignedInHome />;
}
