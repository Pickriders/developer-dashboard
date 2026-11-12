import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

/** Until the auth screens land (step 11.2), the front door says what this is. */
export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col">
      <header className="flex h-header items-center border-b border-line px-6">
        <Logo />
      </header>
      <section className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-6 px-6 py-24">
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold text-fg">Deliveries, as an API.</h1>
          <p className="text-lg text-fg-muted">
            Quote, dispatch and track Pickriders deliveries from your own product. Build in test mode with play money,
            then go live when you&apos;re ready.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="lg" disabled>
            Sign in (coming soon)
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/design">
              Design system <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
