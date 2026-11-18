import Link from "next/link";

import { Code } from "@/components/docs/code";
import { A, C, Callout, H2, List, NextCard, P, Step, Steps, Table } from "@/components/docs/prose";
import { Snippet } from "@/components/docs/snippet";
import { cn } from "@/lib/utils";

/**
 * "Build a food delivery app" (/docs/tutorials/food-delivery/*). Every file is in
 * docs-snippets/food-delivery/, compiled together as a Next.js app in CI, so the tutorial can't drift
 * from the SDK. Each part adds files; a file shown in one part is never rewritten in a later one
 * (later parts show named excerpts of lib/listeners.ts and app/kitchen/actions.ts).
 */

export const TUTORIAL_PARTS = [
  { slug: "setup", title: "Set up the app" },
  { slug: "delivery-fee", title: "Show the delivery fee" },
  { slug: "book-a-rider", title: "Book a rider" },
  { slug: "live-tracking", title: "Show the delivery live" },
  { slug: "webhooks", title: "Keep up with webhooks" },
  { slug: "when-things-go-wrong", title: "When things go wrong" },
  { slug: "go-live", title: "Go live" },
] as const;

const base = "/docs/tutorials/food-delivery";

/** Where you are in the tutorial: every part, this one marked. */
function Parts({ current }: { current?: string }) {
  const index = TUTORIAL_PARTS.findIndex((p) => p.slug === current);
  return (
    <nav aria-label="Tutorial parts" className="my-6 rounded-xl border border-line bg-surface p-4 shadow-card">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-fg-subtle">
        {index >= 0 ? `Part ${index + 1} of ${TUTORIAL_PARTS.length}` : `${TUTORIAL_PARTS.length} parts`}
      </p>
      <ol className="grid gap-1 sm:grid-cols-2">
        {TUTORIAL_PARTS.map((part, i) => (
          <li key={part.slug}>
            <Link
              href={`${base}/${part.slug}`}
              aria-current={part.slug === current ? "page" : undefined}
              className={cn(
                "focus-ring flex gap-2 rounded-md px-2 py-1 text-sm",
                part.slug === current ? "bg-surface-subtle font-bold text-fg-heading" : "text-fg-muted hover:text-fg",
              )}
            >
              <span className="w-4 text-fg-subtle">{i + 1}.</span>
              {part.title}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function NextPart({ after }: { after: string }) {
  const i = TUTORIAL_PARTS.findIndex((p) => p.slug === after);
  const next = TUTORIAL_PARTS[i + 1];
  if (!next) return null;
  return (
    <div className="mt-12">
      <NextCard href={`${base}/${next.slug}`} title={`Part ${i + 2}: ${next.title}`}>
        Carry on building Mama&apos;s Kitchen.
      </NextCard>
    </div>
  );
}

const files = (rows: [string, string][]) => (
  <Table head={["File", "What it does"]} rows={rows.map(([file, what]) => [<C key={file}>{file}</C>, what])} />
);

export function TutorialOverview() {
  return (
    <>
      <P>
        You&apos;ll build <strong>Mama&apos;s Kitchen</strong>, a small food ordering app in Next.js that delivers with
        Pickriders. A customer picks where to deliver, sees the delivery fee, and pays. When the food is packed, the
        kitchen presses one button and a rider comes. The customer watches the rider on the way, and the kitchen board
        keeps up by itself.
      </P>
      <Table
        head={["You'll learn to", "With"]}
        rows={[
          ["Price a delivery before the customer pays", <C key="q">quotes.create</C>],
          [
            "Book it at that price, but hold the rider until the food is ready",
            <C key="o">orders.create, orders.dispatch</C>,
          ],
          ["Show the customer their delivery live, without a key in the browser", <C key="t">trackDelivery</C>],
          ["Keep your orders up to date as riders move", <C key="w">webhooks.handler, webhooks.on</C>],
          ["Recover when a delivery falls through", <C key="r">order.failed, test scenarios</C>],
          ["Switch to real riders and real money", "a live key"],
        ]}
      />
      <Parts />

      <H2>What you need</H2>
      <List>
        <li>Node.js 20 or later, and about an hour.</li>
        <li>
          A free Pickriders account and a <strong>test key</strong>. Test mode has play money and a pretend rider, so
          nothing you do costs anything.
        </li>
        <li>
          Some React. You don&apos;t need to know the Pickriders API: the tutorial explains each part as it comes.
        </li>
      </List>

      <H2>How it fits together</H2>
      <Table
        head={["", "Runs on", "Talks to Pickriders with"]}
        rows={[
          ["Checkout and booking", "Server Actions", "your secret key"],
          ["Kitchen board", "a Server Component", "your secret key"],
          ["Webhook route", "a route handler", "your webhook secret"],
          ["Customer's tracking page", "the browser", "the order's tracking link only"],
        ]}
      />
      <P>
        Your secret key never leaves the server. The browser gets a tracking link, which shows the delivery&apos;s
        progress and nothing private.
      </P>
      <Callout tone="tip" title="Copy, paste, run">
        <p>
          Every file in this tutorial is complete, and CI compiles all of them together against the SDK, so what you
          copy works. Once a file has been shown, later parts only add to it where they say so.
        </p>
      </Callout>
      <div className="mt-12">
        <NextCard href={`${base}/setup`} title="Part 1: Set up the app">
          Create the project and connect it to Pickriders.
        </NextCard>
      </div>
    </>
  );
}

export function TutorialSetup() {
  return (
    <>
      <Parts current="setup" />
      <Steps>
        <Step title="Create the project">
          <Code
            title="Terminal"
            tabs={[
              {
                label: "Terminal",
                lang: "bash",
                code: `npx create-next-app@latest mamas-kitchen --typescript --app --eslint --no-src-dir --import-alias "@/*"
cd mamas-kitchen
npm install pickriders server-only`,
              },
            ]}
          />
          <P>
            <C>pickriders</C> is the SDK. <C>server-only</C> makes sure the file holding your key can never end up in
            the browser.
          </P>
        </Step>
        <Step title="Add your test key">
          <P>
            In the dashboard, open <strong>API keys</strong> and copy your test key. It starts <C>sk_test_</C>. Put it
            in <C>.env.local</C>, which Next.js reads and git ignores:
          </P>
          <Snippet path="food-delivery/env.local.env" />
        </Step>
        <Step title="Say where the kitchen is">
          <P>
            Riders navigate to coordinates, and read the address as a label. Look up your kitchen once on a map and keep
            it in one place:
          </P>
          <Snippet path="food-delivery/lib/kitchen.ts" />
        </Step>
        <Step title="Make one Pickriders client">
          <Snippet path="food-delivery/lib/pickriders.ts" />
          <P>
            The client reads <C>PICKRIDERS_KEY</C> by itself. <C>serviceArea</C> is used whenever an order doesn&apos;t
            name one. Every server file imports this client, so they share what it knows about orders.
          </P>
        </Step>
        <Step title="Check it's connected">
          <Snippet path="food-delivery/scripts/check-connection.ts" />
          <Code
            title="Terminal"
            tabs={[
              { label: "Terminal", lang: "bash", code: "npx tsx --env-file=.env.local scripts/check-connection.ts" },
            ]}
          />
          <P>
            You should see your team&apos;s name, <strong>test mode</strong>, and ₦1,000,000 of play money. If you get{" "}
            <C>api_key_invalid</C>, copy the key again.
          </P>
        </Step>
      </Steps>
      <NextPart after="setup" />
    </>
  );
}

export function TutorialDeliveryFee() {
  return (
    <>
      <Parts current="delivery-fee" />
      <P>
        Customers want to know what delivery costs before they pay. A <strong>quote</strong> gives you the price for a
        trip and holds it for 15 minutes. You&apos;ll book at exactly that price in the next part.
      </P>
      <Steps>
        <Step title="Some customers to deliver to">
          <P>
            While you build, three addresses in Lagos stand in for your customers. Pickriders needs each one&apos;s
            coordinates: in your shop, a places search on the address field gives you them.
          </P>
          <Snippet path="food-delivery/lib/customers.ts" />
          <Snippet path="food-delivery/lib/money.ts" />
          <Snippet path="food-delivery/lib/menu.ts" />
        </Step>
        <Step title="Ask for a price">
          <P>
            A Server Action, so the key stays on the server. The kitchen is the pickup; the customer is the drop-off:
          </P>
          <Snippet path="food-delivery/app/checkout/quote.ts" />
          <Table
            head={["From the quote", "What it is"]}
            rows={[
              [<C key="id">id</C>, "Book with it, and you pay this price."],
              [<C key="p">recommended_price</C>, "The fee, in kobo: 340000 is ₦3,400."],
              [<C key="d">duration_s</C>, "About how long the ride takes, in seconds."],
              [<C key="e">expires_at</C>, "When the price stops being held: 15 minutes."],
            ]}
          />
        </Step>
        <Step title="Show it at checkout">
          <P>The delivery line asks for a new price whenever the address changes:</P>
          <Snippet path="food-delivery/app/checkout/delivery-fee.tsx" />
          <P>
            The <C>current</C> flag throws away an old answer if the customer switched address while it was on its way.
          </P>
        </Step>
      </Steps>
      <Callout tone="note" title="Prices are in kobo">
        <p>
          Every amount Pickriders sends is a whole number of kobo, so there&apos;s no rounding. Divide by 100 to show
          naira: that&apos;s all <C>naira()</C> does.
        </p>
      </Callout>
      <NextPart after="delivery-fee" />
    </>
  );
}

export function TutorialBookARider() {
  return (
    <>
      <Parts current="book-a-rider" />
      <P>
        When the customer pays, you book the delivery straight away, at the price they saw. But the food takes 20
        minutes to cook, and a rider who arrives early waits at the window. So you book it with{" "}
        <C>dispatch: &quot;manual&quot;</C>: the price is held, and no rider comes until the kitchen says the food is
        ready.
      </P>
      <Steps>
        <Step title="Somewhere to keep orders">
          <P>
            A JSON file stands in for your database, so this tutorial needs nothing else. Each food order remembers its
            delivery:
          </P>
          <Snippet path="food-delivery/lib/store.ts" />
        </Step>
        <Step title="One place that copies the delivery's state">
          <P>
            Everything Pickriders tells you about a delivery (an answer now, a webhook later) goes through one function.
            It skips news that&apos;s older than what you already have, so updates arriving out of order can&apos;t undo
            each other:
          </P>
          <Snippet path="food-delivery/lib/sync-delivery.ts" />
        </Step>
        <Step title="Book the delivery when the customer pays">
          <Snippet path="food-delivery/app/checkout/place-order.ts" />
          <List>
            <li>
              <C>quote_id</C> books at the quoted price. If the quote has expired, Pickriders refuses with{" "}
              <C>quote_expired</C>, so you price it again and book that.
            </li>
            <li>
              <C>idempotencyKey</C>: the same key always gets the same delivery back. A double click, or a retry after a
              dropped connection, never sends two riders.
            </li>
            <li>
              <C>metadata</C> comes back on the order and on every webhook, so you always know which food order a
              delivery is for.
            </li>
            <li>
              An empty wallet is <C>InsufficientFundsError</C>. The customer has paid, so keep the order and fix it.
            </li>
          </List>
        </Step>
        <Step title="The checkout page">
          <Snippet path="food-delivery/app/checkout/checkout-form.tsx" />
          <Snippet path="food-delivery/app/checkout/page.tsx" />
        </Step>
        <Step title="The kitchen board">
          <P>Three buttons: call a rider, play the rider (test mode only), and cancel.</P>
          <Snippet path="food-delivery/app/kitchen/actions.ts" />
          <Snippet path="food-delivery/app/kitchen/page.tsx" />
          <P>
            Every Pickriders answer goes through <C>syncDelivery</C>, so the board shows the delivery&apos;s new state
            straight away.
          </P>
        </Step>
        <Step title="Try it">
          <Code title="Terminal" tabs={[{ label: "Terminal", lang: "bash", code: "npm run dev" }]} />
          <List ordered>
            <li>
              Open <C>localhost:3000/checkout</C>, pick an address and pay.
            </li>
            <li>
              Open <C>localhost:3000/kitchen</C>. The order is <strong>paid</strong>, its delivery{" "}
              <strong>awaiting dispatch</strong>.
            </li>
            <li>
              Press <strong>Food is ready</strong>: the delivery is <strong>searching</strong> for a rider.
            </li>
            <li>
              Press <strong>Play the rider</strong> a few times. Each press is one small step (accept, arrive, collect,
              ride, hand over), so a whole delivery takes about nine.
            </li>
          </List>
          <P>
            The same order is in the dashboard under <strong>Orders</strong>, with your reference (<C>mk_1001</C>).
          </P>
        </Step>
      </Steps>
      <NextPart after="book-a-rider" />
    </>
  );
}

export function TutorialLiveTracking() {
  return (
    <>
      <Parts current="live-tracking" />
      <P>
        Every delivery has a <C>tracking_url</C>. It shows where the delivery is, who the rider is and when they&apos;ll
        arrive, and nothing private: no phone numbers, no key needed. So you can hand it to the browser, and the
        SDK&apos;s browser half follows it.
      </P>
      <Steps>
        <Step title="A hook that follows a delivery">
          <Snippet path="food-delivery/hooks/use-delivery.ts" />
          <P>
            It imports from <C>pickriders/client</C>, the browser half, which can&apos;t take a key. The tracker starts
            when the component appears, asks for news every few seconds, and stops when it goes.
          </P>
        </Step>
        <Step title="The customer's order page">
          <Snippet path="food-delivery/app/orders/[id]/page.tsx" />
          <Snippet path="food-delivery/app/orders/[id]/live-delivery.tsx" />
        </Step>
        <Step title="Watch it move">
          <P>
            Place an order and open its page: checkout sends you there. Put the kitchen board next to it, press{" "}
            <strong>Food is ready</strong>, then <strong>Play the rider</strong>. The customer&apos;s page follows
            within a few seconds, with no refresh.
          </P>
        </Step>
      </Steps>
      <Callout tone="note" title="Why the kitchen board still needs a refresh">
        <p>
          The customer&apos;s page follows Pickriders directly. Your own records only change when your code hears about
          it, and so far that&apos;s only when the kitchen presses a button. A real rider doesn&apos;t press your
          buttons, so next you&apos;ll listen for webhooks.
        </p>
      </Callout>
      <NextPart after="live-tracking" />
    </>
  );
}

export function TutorialWebhooks() {
  return (
    <>
      <Parts current="webhooks" />
      <P>
        A webhook is Pickriders calling your server when something happens: a rider accepted, collected the food,
        delivered it. Each one carries the whole delivery as it is now, signed so you know it&apos;s really from us.
      </P>
      <Steps>
        <Step title="Say what each event does">
          <Snippet path="food-delivery/lib/listeners.ts" part="orders" title="lib/listeners.ts" />
          <P>
            <C>order.*</C> is every order event. They all go through <C>syncDelivery</C>, which already copes with
            repeats and events arriving out of order.
          </P>
        </Step>
        <Step title="The webhook route">
          <Snippet path="food-delivery/app/api/webhooks/pickriders/route.ts" />
          <P>
            That&apos;s the whole route. The handler checks the signature, ignores events it has already handled, and
            answers 500 if a listener throws, so Pickriders tries again later.
          </P>
        </Step>
        <Step title="Give Pickriders a way in">
          <P>
            Pickriders can&apos;t reach <C>localhost</C>. A tunnel gives your laptop a public address while you build:
          </P>
          <Code
            title="A second terminal"
            tabs={[{ label: "Terminal", lang: "bash", code: "npx cloudflared tunnel --url http://localhost:3000" }]}
          />
          <P>
            It prints an address like <C>https://quiet-river-1234.trycloudflare.com</C>.
          </P>
        </Step>
        <Step title="Create the endpoint">
          <List ordered>
            <li>
              In the dashboard, in test mode, open <strong>Webhooks → Add endpoint</strong>.
            </li>
            <li>
              URL: your tunnel address followed by <C>/api/webhooks/pickriders</C>.
            </li>
            <li>
              Events: <strong>All order events</strong> and <C>wallet.balance_low</C>.
            </li>
            <li>
              Copy the signing secret (<C>whsec_…</C>) into <C>PICKRIDERS_WEBHOOK_SECRET</C> in <C>.env.local</C>, and
              restart <C>npm run dev</C>.
            </li>
          </List>
          <P>
            Press <strong>Send test event</strong> on the endpoint. Your terminal logs a <C>POST</C> answered <C>200</C>
            .
          </P>
        </Step>
        <Step title="Try it">
          <P>
            Place an order and press <strong>Food is ready</strong>. Then move the delivery on from the dashboard this
            time, not from your kitchen board: open it under <strong>Orders</strong> and press <strong>Advance</strong>.
            Refresh your board: it has kept up by itself, because the webhooks told it.
          </P>
        </Step>
      </Steps>
      <Callout tone="tip" title="Test it without a tunnel">
        <p>
          You can post your own signed events to the route in a test: see{" "}
          <A href="/docs/sdks/testing#test-your-webhook-route">testing your webhook route</A>. Every event Pickriders
          sends is listed, with an example, in the <A href="/docs/events">event reference</A>.
        </p>
      </Callout>
      <NextPart after="webhooks" />
    </>
  );
}

export function TutorialWhenThingsGoWrong() {
  return (
    <>
      <Parts current="when-things-go-wrong" />
      <P>
        Most deliveries go to plan. These are the ones that don&apos;t, and how Mama&apos;s Kitchen handles each. Test
        mode can make each of them happen on purpose.
      </P>

      <H2>Nobody takes the delivery</H2>
      <P>
        If no rider accepts, Pickriders cancels the delivery and charges nothing. It ends <C>failed</C>, and you get{" "}
        <C>order.failed</C>. The food is still at the kitchen, so book another rider, once:
      </P>
      <Snippet path="food-delivery/lib/rebook.ts" />
      <P>And listen for it, in the listeners file from part 5:</P>
      <Snippet path="food-delivery/lib/listeners.ts" part="recovery" title="lib/listeners.ts (add)" />
      <P>
        The new delivery gets its own <C>reference</C> (references are unique) and its own idempotency key, but the same{" "}
        <C>metadata</C>, so it&apos;s still the same food order. <C>syncDelivery</C> ignores news about the old delivery
        from then on.
      </P>
      <Callout tone="note" title="Only before pickup">
        <p>
          If the rider already collected the food, a new rider can&apos;t fix it. The order shows{" "}
          <strong>delivery problem</strong>, and that&apos;s a phone call.
        </p>
      </Callout>

      <H2>Rehearse it</H2>
      <P>
        <C>place-order.ts</C> already passes a test scenario when you start the app with <C>REHEARSE</C>:
      </P>
      <Code title="Terminal" tabs={[{ label: "Terminal", lang: "bash", code: "REHEARSE=no_riders npm run dev" }]} />
      <List ordered>
        <li>
          Place an order, press <strong>Food is ready</strong>, then <strong>Play the rider</strong> once.
        </li>
        <li>
          Nobody accepts: the delivery ends <C>failed</C>. Your listener books another, and the board shows a new
          delivery number, <strong>searching</strong>.
        </li>
        <li>Play the rider again: the second delivery goes ahead as normal.</li>
      </List>
      <Table
        head={["REHEARSE=", "What happens", "Charged"]}
        rows={[
          [<C key="n">no_riders</C>, "Nobody accepts; it ends failed. You rebook.", "Nothing"],
          [
            <C key="r">rider_cancels</C>,
            "The first rider drops out; Pickriders finds another by itself.",
            "The normal price",
          ],
          [
            <C key="d">delivery_fails</C>,
            "The rider can't hand it over; it ends failed after pickup.",
            "The trip so far",
          ],
        ]}
      />

      <H2>The customer cancels</H2>
      <P>The kitchen&apos;s Cancel button, from part 3:</P>
      <Snippet path="food-delivery/app/kitchen/actions.ts" part="cancel" title="app/kitchen/actions.ts" />
      <P>
        Before a rider has the delivery, cancelling costs nothing. Once one is on the way, you pay the service charge
        and the rider&apos;s share for the trip so far, and the rest goes back to your wallet. The answer says exactly
        what: <C>cancellation.charged_amount</C>, in kobo. The full rules are in{" "}
        <A href="/docs/guides/cancellations">Cancellations and refunds</A>.
      </P>

      <H2>The wallet runs out</H2>
      <P>
        Booking with an empty wallet throws <C>InsufficientFundsError</C>, and <C>place-order.ts</C> already keeps the
        order and flags it. Better is never to get there: part 7 warns you before it happens.
      </P>
      <NextPart after="when-things-go-wrong" />
    </>
  );
}

export function TutorialGoLive() {
  return (
    <>
      <Parts current="go-live" />
      <P>Everything works in test mode. Going live changes your keys and your wallet, not your code.</P>
      <Steps>
        <Step title="Get live access">
          <P>
            In the dashboard, verify your email and phone, then press <strong>Request live access</strong>. A Pickriders
            admin reviews it, usually within a working day. See{" "}
            <A href="/docs/guides/going-live">Creating an account and going live</A>.
          </P>
        </Step>
        <Step title="Fund the live wallet">
          <P>
            Live deliveries are paid from your wallet. Top it up by card or bank transfer, and turn on{" "}
            <strong>auto top-up</strong> so it never runs dry on a busy night. See{" "}
            <A href="/docs/guides/funding-the-wallet">Funding the wallet</A>.
          </P>
        </Step>
        <Step title="Hear about a low wallet">
          <P>Set a low-balance threshold in the dashboard, and add a listener, in the same listeners file:</P>
          <Snippet path="food-delivery/lib/listeners.ts" part="wallet" title="lib/listeners.ts (add)" />
        </Step>
        <Step title="Point a live endpoint at your site">
          <P>
            Live and test webhooks are separate. In live mode, add an endpoint at your real address (
            <C>https://your-site/api/webhooks/pickriders</C>) with the same events. It has its own secret.
          </P>
        </Step>
        <Step title="Swap the keys">
          <Snippet path="food-delivery/env.production.env" />
          <P>
            That&apos;s the whole switch. The <strong>Play the rider</strong> button disappears by itself, because{" "}
            <C>testMode</C> is false with a live key.
          </P>
        </Step>
        <Step title="Use a real database">
          <P>
            The JSON file in <C>lib/store.ts</C> was a stand-in: replace it with your database before you deploy. Hosts
            like Vercel run your app on many machines that don&apos;t share files. Nothing else changes.
          </P>
        </Step>
      </Steps>

      <H2>You built</H2>
      <Table
        head={["", ""]}
        rows={[
          ["Checkout", "A delivery fee from a quote, held while the customer pays."],
          ["Booking", "At the quoted price, safe to retry, with the rider held until the food is ready."],
          ["Tracking", "A live page for the customer, with no key in the browser."],
          ["Webhooks", "Your records keep up with every rider, in any order, however often they arrive."],
          ["Recovery", "A second rider when nobody takes the first, and clear costs when you cancel."],
        ]}
      />
      <P>
        Before your first real delivery, run through the{" "}
        <A href="/docs/guides/go-live-checklist">going-live checklist</A>. Everything the SDK can do is in the{" "}
        <A href="/docs/sdks/reference">SDK reference</A>.
      </P>
      {files([
        ["lib/pickriders.ts", "The one Pickriders client (server only)."],
        ["lib/store.ts", "Your orders (swap for a database)."],
        ["lib/sync-delivery.ts", "Copies a delivery's state onto its order, in order."],
        ["lib/listeners.ts", "What each webhook event does."],
        ["lib/rebook.ts", "A second rider when the first falls through."],
        ["app/checkout/*", "The fee, and booking when the customer pays."],
        ["app/kitchen/*", "The board: food ready, play the rider, cancel."],
        ["app/orders/[id]/*", "The customer's live delivery page."],
        ["app/api/webhooks/pickriders/route.ts", "Where Pickriders sends events."],
      ])}
    </>
  );
}
