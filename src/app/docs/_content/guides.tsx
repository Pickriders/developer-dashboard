import { GET_A_KEY } from "@/components/docs/docs-header";
import { Code } from "@/components/docs/code";
import { A, C, Callout, H2, List, P, Table } from "@/components/docs/prose";
import { guideRequest } from "@/lib/docs/guides";
import { requestTabs } from "@/lib/docs/requests";

/** A guide's request as curl, Node.js, Python and PHP, from the data CI checks (lib/docs/guides.ts). */
function Req({ guide, name }: { guide: string; name: string }) {
  return <Code tabs={requestTabs(guideRequest(guide, name))} />;
}

/** Facts here come from the API document's descriptions and backend-api; see each guide's requests in lib/docs/guides.ts. */

export function GoingLiveGuide() {
  return (
    <>
      <P>
        You can build everything in test mode on day one. Real deliveries need live mode, which Pickriders switches on
        for your team after a quick check. Here&apos;s the whole path.
      </P>
      <H2>1. Make your account</H2>
      <P>
        <A href={GET_A_KEY}>Sign up</A> with your work email and phone number. You get a team of your own, with test
        mode ready to use.
      </P>
      <H2>2. Verify your email and phone</H2>
      <P>
        We send each a code. The team owner&apos;s email and phone must both be verified before you can ask to go live.
      </P>
      <H2>3. Ask for live access</H2>
      <P>
        In the dashboard, press <strong>Request live access</strong> and tell us your business name, website, what
        you&apos;ll deliver and roughly how many deliveries a month. A Pickriders admin reads it, usually within a
        working day, and the team owner gets an email with the answer.
      </P>
      <P>You can check where it stands from your code too:</P>
      <Req guide="going-live" name="account" />
      <Table
        head={["live_status", "Means"]}
        rows={[
          [<C key="n">not_requested</C>, "You haven't asked yet."],
          [<C key="p">pending</C>, "We're reviewing it."],
          [<C key="a">approved</C>, "Live keys work. Create one in the dashboard."],
          [<C key="r">rejected</C>, "Not yet: the email says why. Update your details and ask again."],
          [<C key="s">suspended</C>, "Live mode is paused. Test mode still works."],
        ]}
      />
      <H2>4. Switch your keys</H2>
      <P>
        Create a live key (<C>sk_live_</C>), top up your live wallet, add a live webhook endpoint, then work through the{" "}
        <A href="/docs/guides/go-live-checklist">go-live checklist</A>.
      </P>
    </>
  );
}

export function FundingGuide() {
  return (
    <>
      <P>
        Orders are paid from a wallet you top up in advance. Each mode has its own: play money in test, real naira in
        live.
      </P>
      <H2>See your balance</H2>
      <Req guide="funding-the-wallet" name="wallet" />
      <P>
        <C>available</C> is what you can spend now; <C>held</C> is set aside for orders in progress. Amounts are{" "}
        <A href="/docs/money">in kobo</A>.
      </P>
      <H2>Test mode: add play money</H2>
      <P>Test wallets start with play money. Need more? Add it, as often as you like:</P>
      <Req guide="funding-the-wallet" name="test funds" />
      <H2>Live mode: three ways to top up</H2>
      <Table
        head={["Way", "Best for"]}
        rows={[
          [<strong key="c">Card checkout</strong>, "Topping up now, by card. Your code gets a Paystack checkout link."],
          [
            <strong key="b">Bank transfer</strong>,
            "Regular top-ups from your business account to a bank account of your own.",
          ],
          [
            <strong key="a">Auto top-up</strong>,
            "Never running out: a saved card is charged when the balance runs low.",
          ],
        ]}
      />
      <P>A card checkout: send the payer to the link you get back.</P>
      <Req guide="funding-the-wallet" name="checkout" />
      <P>
        Your permanent transfer account is set up once, in the dashboard&apos;s <strong>Wallet</strong> page (it needs
        your BVN). Then read it from your code:
      </P>
      <Req guide="funding-the-wallet" name="bank account" />
      <P>Auto top-up and a low-balance alert email are set in the dashboard too.</P>
      <H2>Every naira in and out</H2>
      <Req guide="funding-the-wallet" name="transactions" />
      <Callout tone="tip" title="Hear about it">
        <p>
          Listen for <A href="/docs/events/wallet-funded">wallet.funded</A> and{" "}
          <A href="/docs/events/wallet-balance_low">wallet.balance_low</A> instead of checking your balance.
        </p>
      </Callout>
    </>
  );
}

export function QuotesGuide() {
  return (
    <>
      <P>
        A quote is the price of a delivery before you book it. It&apos;s held for <strong>15 minutes</strong>, and one
        order can use it.
      </P>
      <H2>Where we deliver</H2>
      <P>Every quote names a service area. List them, with the lowest price in each:</P>
      <Req guide="quotes-and-pricing" name="areas" />
      <H2>Ask for a price</H2>
      <Req guide="quotes-and-pricing" name="quote" />
      <Table
        head={["Field", "What it is"]}
        rows={[
          [
            <C key="r">recommended_price</C>,
            "What a fixed-price order costs you: the delivery fee plus the service charge.",
          ],
          [<C key="b">breakdown</C>, "The delivery fee (the rider's) and the service charge (ours)."],
          [<C key="mm">min_price, max_price</C>, "The range riders can offer within, for bidding orders."],
          [<C key="d">distance_m, duration_s</C>, "The route's length and roughly how long it takes."],
          [<C key="e">expires_at</C>, "When the price stops being held."],
        ]}
      />
      <H2>Book it</H2>
      <Req guide="quotes-and-pricing" name="order" />
      <P>
        Too late? You&apos;ll get <A href="/docs/errors#quote_expired">quote_expired</A>: ask for a new one. You can
        also skip the quote and send the stops straight to <C>POST /orders</C>; it&apos;s priced on the spot.
      </P>
      <P>Need to see a quote again?</P>
      <Req guide="quotes-and-pricing" name="same quote" />
    </>
  );
}

export function DeliveryTypesGuide() {
  return (
    <>
      <P>One order can visit several places. Pick the shape that fits:</P>
      <Table
        head={["Type", "Stops, in order", "Use it for"]}
        rows={[
          [<C key="s">single</C>, "1 pickup, 1 drop-off", "One parcel to one person."],
          [
            <C key="b">batch</C>,
            "1 pickup, then up to 20 drop-offs",
            "A morning's orders from your shop to many customers.",
          ],
          [
            <C key="u">bulk</C>,
            "Up to 20 pickups, then 1 drop-off",
            "Collecting from several places into one, like restocking.",
          ],
        ]}
      />
      <H2>Who the rider meets</H2>
      <P>
        Every drop-off needs a <C>contact</C>: the person who receives it. So does a batch&apos;s pickup. The pickup of
        a single or bulk delivery may leave it out, for an <strong>errand</strong> where the rider buys or collects from
        a shop with no one to call; say what to get in <C>instructions</C>.
      </P>
      <H2>Single</H2>
      <Req guide="delivery-types" name="single" />
      <H2>Batch</H2>
      <Req guide="delivery-types" name="batch" />
      <P>Each drop-off gets its own confirmation code and tracking link.</P>
      <H2>Bulk, with errand pickups</H2>
      <Req guide="delivery-types" name="bulk" />
    </>
  );
}

export function SchedulingGuide() {
  return (
    <>
      <P>
        Book now, deliver later. A scheduled order holds its price in your wallet and rings riders at the time you
        choose, between <strong>1 hour</strong> and <strong>30 days</strong> ahead.
      </P>
      <H2>Schedule it</H2>
      <P>
        Add <C>scheduled_for</C> when you ask for the price (or create the order straight from stops):
      </P>
      <Req guide="scheduling" name="quote" />
      <Req guide="scheduling" name="order" />
      <P>
        The order&apos;s status is <C>scheduled</C> until its time comes, then <C>searching</C>.
      </P>
      <H2>Move it</H2>
      <P>Plans change. Move it to another time; the price and what&apos;s held stay the same:</P>
      <Req guide="scheduling" name="moved" />
      <Callout tone="note">
        <p>
          You can also schedule an order that&apos;s still looking for a rider. Once a rider has it, it can&apos;t move:{" "}
          <A href="/docs/errors#order_not_reschedulable">order_not_reschedulable</A>.
        </p>
      </Callout>
    </>
  );
}

export function BiddingGuide() {
  return (
    <>
      <P>
        Usually the first rider to accept the quoted price takes the order. With <strong>bidding</strong>, riders offer
        their own price instead, and you choose.
      </P>
      <H2>Ask for offers</H2>
      <Req guide="bidding" name="order" />
      <Table
        head={["pricing field", "What it does"]}
        rows={[
          [<C key="m">mode</C>, <>fixed (the default) or bidding.</>],
          [
            <C key="x">max_amount</C>,
            "Required for bidding: the most you'll pay in all, in kobo. Your wallet holds it until you accept an offer.",
          ],
          [<C key="p">min_offer_percentage</C>, "Riders can't offer less than this share of the quoted delivery fee."],
          [
            <C key="a">auto_accept_after_s</C>,
            "After this many seconds the lowest offer is accepted for you; with none, the order goes out at the quoted price.",
          ],
        ]}
      />
      <H2>See the offers</H2>
      <P>
        Listen for <A href="/docs/events/order-offer-created">order.offer.created</A>, or list them:
      </P>
      <Req guide="bidding" name="offers" />
      <P>
        Each offer says what you&apos;d pay (<C>amount</C>), the rider, and roughly how far away they are.
      </P>
      <H2>Pick one</H2>
      <Req guide="bidding" name="accepted" />
      <P>
        The others are declined, the difference between your hold and the price goes back, and the rider is on the way.
      </P>
    </>
  );
}

export function TrackingGuide() {
  return (
    <>
      <P>Know where every delivery is, show your customer, and keep proof it arrived.</P>
      <H2>Where&apos;s the rider?</H2>
      <Req guide="tracking-and-proof" name="tracking" />
      <P>
        You get the rider&apos;s position, when they&apos;ll reach each stop, and a <C>tracking_url</C>: a page anyone
        can open, no key needed. Each drop-off also has its own tracking link that shows only that stop, safe to text to
        the person receiving it.
      </P>
      <H2>The confirmation code</H2>
      <P>
        Every drop-off has a <C>confirmation_code</C>. Share it with the person receiving the parcel; they tell it to
        the rider on handover. It proves the right person got it.
      </P>
      <H2>Proof of delivery</H2>
      <P>Once a stop is done, it carries its proof:</P>
      <Req guide="tracking-and-proof" name="proof" />
      <Table
        head={["stops[].proof field", "What it is"]}
        rows={[
          [<C key="m">method</C>, <>confirmation_code (the recipient gave the code) or rider_confirmed (a pickup).</>],
          [<C key="r">recipient_name</C>, "Who handed over or received it."],
          [<C key="c">completed_at</C>, "When."],
          [<C key="l">location</C>, "Where the rider was."],
        ]}
      />
      <Callout tone="tip" title="Try it in test mode">
        <p>Move a test order along and watch it change:</p>
      </Callout>
      <Req guide="tracking-and-proof" name="delivered" />
    </>
  );
}

export function CancellationsGuide() {
  return (
    <>
      <P>Cancel any order that isn&apos;t delivered yet. What it costs depends on how far it got.</P>
      <Req guide="cancellations" name="cancelled" />
      <Table
        head={["When you cancel", "What happens to the money"]}
        rows={[
          ["Before a rider has it", "Everything held goes back to your wallet."],
          [
            "Once a rider is on the way",
            "The service charge and the rider's share for the trip so far are charged; the rest goes back.",
          ],
        ]}
      />
      <P>
        The order&apos;s <C>cancellation</C> says who cancelled it, why, and exactly what was <C>charged_amount</C> and{" "}
        <C>refunded_amount</C>. You also get <A href="/docs/events/order-cancelled">order.cancelled</A>.
      </P>
      <H2>When we can&apos;t deliver</H2>
      <P>
        If no rider takes the order, or a delivery can&apos;t be finished, Pickriders cancels it: its status is{" "}
        <C>failed</C>, everything held is refunded, and you get <A href="/docs/events/order-failed">order.failed</A>.
      </P>
      <Callout tone="tip" title="Rehearse it">
        <p>
          In test mode, create an order with <C>{'"test_options": { "scenario": "no_riders" }'}</C> and advance it to
          see a failed order from start to end.
        </p>
      </Callout>
    </>
  );
}

const CHECKLIST: [string, React.ReactNode][] = [
  [
    "Live access is approved",
    <>
      Your account&apos;s <C>live_status</C> is approved. <A href="/docs/guides/going-live">How</A>
    </>,
  ],
  [
    "Your live key is on your server only",
    <>
      Read from an environment variable, never in your website or app. <A href="/docs/authentication">Why</A>
    </>,
  ],
  [
    "Your live wallet has money",
    <>
      And a low-balance alert or auto top-up, so orders never fail with insufficient_funds.{" "}
      <A href="/docs/guides/funding-the-wallet">Funding</A>
    </>,
  ],
  [
    "A live webhook endpoint",
    <>
      Live and test endpoints are separate. Check every signature. <A href="/docs/webhooks">Webhooks</A>
    </>,
  ],
  [
    "You handle events twice, or out of order",
    <>Skip an event id you&apos;ve seen; check the order&apos;s status when order matters.</>,
  ],
  [
    "Retries use an Idempotency-Key",
    <>
      So a timeout never creates two orders. <A href="/docs/idempotency">Retrying safely</A>
    </>,
  ],
  [
    "You handle every error",
    <>
      Match on code, show the message, log request_id. <A href="/docs/errors">Errors</A>
    </>,
  ],
  [
    "You back off at the rate limit",
    <>
      Wait for Retry-After on a 429. <A href="/docs/rate-limits">Rate limits</A>
    </>,
  ],
  [
    "You read amounts in kobo",
    <>
      Divide by 100 to show them. <A href="/docs/money">Money</A>
    </>,
  ],
  ["Your team is set", <>Teammates have the right roles, and the owner&apos;s email gets our notices.</>],
];

export function GoLiveChecklist() {
  return (
    <>
      <P>Before your first real delivery, tick these off. Each one links to how.</P>
      <ol className="my-6 space-y-3">
        {CHECKLIST.map(([title, detail], i) => (
          <li key={title} className="flex gap-3 rounded-xl border border-line bg-surface p-4">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-subtle text-sm font-extrabold text-brand-fg">
              {i + 1}
            </span>
            <span className="min-w-0">
              <span className="block font-bold text-fg-heading">{title}</span>
              <span className="mt-0.5 block text-[0.98rem] leading-7 text-fg-muted">{detail}</span>
            </span>
          </li>
        ))}
      </ol>
      <List>
        <li>Then: create one small live order to yourself, and watch it all the way to delivered.</li>
      </List>
    </>
  );
}
