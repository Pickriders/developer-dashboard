import { Code } from "@/components/docs/code";
import { A, C, Callout, H2, H3, List, NextCard, P, Table } from "@/components/docs/prose";
import { Snippet } from "@/components/docs/snippet";

/** The SDK's own pages (/docs/sdks/*). Every example is a file in docs-snippets/, type-checked in CI. */

const INSTALL = [
  { label: "npm", lang: "bash" as const, code: "npm install pickriders" },
  { label: "yarn", lang: "bash" as const, code: "yarn add pickriders" },
  { label: "pnpm", lang: "bash" as const, code: "pnpm add pickriders" },
  { label: "bun", lang: "bash" as const, code: "bun add pickriders" },
];

const ENV = `# .env (never commit it)
PICKRIDERS_KEY=sk_test_...            # dashboard → API keys
PICKRIDERS_WEBHOOK_SECRET=whsec_...   # Webhooks → your endpoint, once you have one`;

export function SdkOverview() {
  return (
    <>
      <P>
        The Pickriders SDK books deliveries and follows them to the door. It&apos;s written in TypeScript, works from
        plain JavaScript, and runs on your server and in your customers&apos; browsers.
      </P>
      <List>
        <li>
          <strong>It follows every order for you.</strong> One tracker listens to your webhooks, asks the API when they
          go quiet, and stops by itself when the order ends.
        </li>
        <li>
          <strong>It&apos;s safe to retry.</strong> Every booking carries an idempotency key, and network errors and
          busy moments are retried for you. A retry never sends two riders.
        </li>
        <li>
          <strong>It&apos;s typed end to end.</strong> Your editor knows every field of every order and every event.
        </li>
        <li>
          <strong>It has no dependencies.</strong> Node.js 20 or later, Bun, Deno, Next.js, Cloudflare Workers, and
          every modern browser.
        </li>
      </List>

      <H2>Install it</H2>
      <Code tabs={INSTALL} />
      <P>
        Put your test key in an environment variable called <C>PICKRIDERS_KEY</C>. The SDK reads it from there, so it
        never sits in your code:
      </P>
      <Code title=".env" tabs={[{ label: ".env", lang: "bash", code: ENV }]} />

      <H2>Your first delivery, in code</H2>
      <P>
        This books a test delivery, prints each step as it happens, and plays the rider&apos;s part, since test mode has
        no real riders:
      </P>
      <Snippet path="sdks/overview/first-delivery.ts" />
      <Code
        title="Run it"
        tabs={[{ label: "Run it", lang: "bash", code: "npx tsx --env-file=.env book-a-delivery.ts" }]}
      />
      <P>
        The order goes <C>searching</C>, then <C>rider_assigned</C>, <C>picking_up</C>, <C>in_transit</C> and{" "}
        <C>delivered</C>. In live mode you skip the <C>advance</C> line: a real rider does that part.
      </P>

      <H2>Two halves: server and browser</H2>
      <Table
        head={["Import", "Where", "What it can do"]}
        rows={[
          [
            <C key="s">pickriders</C>,
            "Your server",
            "Everything: book, change and cancel orders, quotes, the wallet, webhooks. Needs your secret key.",
          ],
          [
            <C key="c">pickriders/client</C>,
            "Browsers and apps",
            "Follow a delivery from its tracking link. Needs no key, and never sees phone numbers.",
          ],
        ]}
      />
      <Callout tone="warning" title="Keep your secret key on the server">
        <p>
          Anyone using your site can read a key that reaches the browser. The SDK refuses to start with one there. Send
          the browser the order&apos;s <C>tracking_url</C> instead, and follow it with <C>pickriders/client</C>.
        </p>
      </Callout>

      <H2>How the pieces fit</H2>
      <Table
        head={["Piece", "What it's for"]}
        rows={[
          [
            <>
              <C>pickriders.orders</C>, <C>.quotes</C>, <C>.wallet</C> …
            </>,
            "One method per API request, with the same field names as the API reference.",
          ],
          [
            <C key="t">pickriders.orders.track(order)</C>,
            "A tracker: the order's latest state, and events when it changes.",
          ],
          [
            <C key="w">pickriders.webhooks</C>,
            "Checks each webhook really came from Pickriders, ignores repeats, and calls your listeners.",
          ],
          [
            <C key="st">pickriders.orders.store</C>,
            "Every order this server has seen, newest version only. Trackers and webhooks share it.",
          ],
        ]}
      />

      <H2>Pick your guide</H2>
      <div className="my-6 grid gap-3 sm:grid-cols-2">
        <NextCard href="/docs/tutorials/food-delivery" title="Tutorial: a food delivery app">
          Build it end to end with Next.js, from checkout to the customer&apos;s door.
        </NextCard>
        <NextCard href="/docs/sdks/node" title="Node.js servers">
          Express, Fastify, NestJS and plain Node.
        </NextCard>
        <NextCard href="/docs/sdks/nextjs" title="Next.js">
          Server Actions, route handlers and live tracking.
        </NextCard>
        <NextCard href="/docs/sdks/react" title="React">
          A hook that follows a delivery on screen.
        </NextCard>
        <NextCard href="/docs/sdks/vue" title="Vue and Nuxt">
          A composable and a Nuxt webhook route.
        </NextCard>
        <NextCard href="/docs/sdks/svelte" title="Svelte and SvelteKit">
          A store and a SvelteKit webhook route.
        </NextCard>
        <NextCard href="/docs/sdks/browser" title="Plain JavaScript in the browser">
          No framework, no build step.
        </NextCard>
        <NextCard href="/docs/sdks/testing" title="Testing your integration">
          Play the rider, rehearse failures, test your webhook route.
        </NextCard>
      </div>
      <P>
        Every method, option and event is in the <A href="/docs/sdks/reference">SDK reference</A>. Not using JavaScript?
        Everything the SDK does is a plain HTTP request in the <A href="/docs/api">API reference</A>.
      </P>
    </>
  );
}

export function SdkNode() {
  return (
    <>
      <P>
        On a Node.js server you book deliveries from your own routes and hear back through webhooks. The examples use
        Express; the same code works in any framework, and Fastify, NestJS and plain Node have their own sections below.
      </P>

      <H2>One client for the whole server</H2>
      <P>
        Create the client once and import it everywhere. It keeps the order store and your webhook listeners, so a
        second client would have neither.
      </P>
      <Snippet path="sdks/node/pickriders.ts" />

      <H2>Book a delivery from a route</H2>
      <Snippet path="sdks/node/express-ship.ts" />
      <List>
        <li>
          <C>reference</C> is your own id. It&apos;s unique per mode, so the same shop order can&apos;t be booked twice,
          and you can search for it later.
        </li>
        <li>
          <C>idempotencyKey</C> makes the call safe to repeat. The SDK sends one with every booking anyway; pass your
          own, built from your order id, and it stays safe even if your server restarts halfway.
        </li>
        <li>
          Errors are classes. <C>InvalidRequestError</C> tells you the field in <C>param</C>; see{" "}
          <A href="#handle-errors">Handle errors</A>.
        </li>
      </List>

      <H2>Receive webhooks</H2>
      <P>
        Say what should happen for each event in one file. Each listener gets the whole order as it is now, so you never
        need to fetch it:
      </P>
      <Snippet path="sdks/node/delivery-listeners.ts" />
      <P>
        Then give Pickriders a route to send events to. With Express, the route needs the <strong>raw</strong> body,
        because the signature is checked against the exact bytes that arrived:
      </P>
      <Snippet path="sdks/node/express-webhooks.ts" />
      <Callout tone="warning" title="A parsed body can't be checked">
        <p>
          If <C>express.json()</C> runs first, the signature can&apos;t be checked. The handler answers with an error
          that says so. Mount the webhook route before <C>express.json()</C>, or give it <C>express.raw()</C> as above.
        </p>
      </Callout>
      <P>What the handler does with each request:</P>
      <List>
        <li>A bad or missing signature gets a 400, and your listeners never run.</li>
        <li>An event it has already handled gets a 200 and runs nothing, so repeats are harmless.</li>
        <li>
          If a listener throws, it answers 500. Pickriders sends the event again later, and your listener runs again.
        </li>
      </List>

      <H3>Plain Node.js</H3>
      <Snippet path="sdks/node/http-webhooks.ts" />
      <H3>Fastify</H3>
      <P>
        Keep JSON bodies as raw bytes, then check and hand on the event yourself with <C>constructEvent</C> and{" "}
        <C>dispatch</C>:
      </P>
      <Snippet path="sdks/node/fastify-webhooks.ts" />
      <H3>NestJS</H3>
      <P>
        Start the app with <C>rawBody: true</C>, then use the raw body in a controller:
      </P>
      <Snippet path="sdks/node/webhooks/pickriders.controller.ts" />

      <H2>Follow an order from a long-running process</H2>
      <P>
        A tracker follows one order to the end. It hears your webhooks, and asks the API itself when they&apos;re quiet,
        so it works even in a worker that receives no webhooks at all.
      </P>
      <Snippet path="sdks/node/worker.ts" />
      <Table
        head={["Where it runs", "How a tracker hears news"]}
        rows={[
          [
            "The same process as your webhook route",
            "Straight away from each event, and asks the API every 30 s as a backup.",
          ],
          ["A process with no webhooks", "Asks the API every 5 s (every minute while an order is scheduled)."],
          ["Several servers", "Each one sees the order through: if the webhook lands elsewhere, it asks the API."],
        ]}
      />
      <Callout tone="note" title="Serverless functions">
        <p>
          A serverless function stops after each request, and its trackers stop with it. There, let webhooks update your
          database, and read the database in your pages. Trackers are for servers and workers that keep running.
        </p>
      </Callout>

      <H2>Handle errors</H2>
      <P>
        Every error the SDK throws is a <C>PickridersError</C>. Its class says what kind of problem it is. Its{" "}
        <C>code</C> says exactly what, and won&apos;t change, so you can switch on it:
      </P>
      <Snippet path="sdks/node/errors.ts" />
      <P>
        Network errors, rate limits and server errors are retried twice before they reach you. Every code is explained
        on the <A href="/docs/errors">errors page</A>.
      </P>
    </>
  );
}

export function SdkNextjs() {
  return (
    <>
      <P>
        In Next.js, your secret key stays in server code: Server Actions, route handlers and Server Components. The
        browser only ever gets a tracking link. These examples use the App Router (Next.js 14 and later).
      </P>
      <Code tabs={INSTALL} />

      <H2>A server-only client</H2>
      <P>
        <C>server-only</C> turns a mistake into a build error: if a Client Component ever imports this file, the build
        fails instead of shipping your key.
      </P>
      <Code tabs={[{ label: "npm", lang: "bash", code: "npm install server-only" }]} />
      <Snippet path="sdks/nextjs/lib/pickriders.ts" />

      <H2>Book a delivery in a Server Action</H2>
      <Snippet path="sdks/nextjs/app/orders/id/actions.ts" title="app/orders/[id]/actions.ts" />
      <P>The idempotency key matters most here: a customer who double-clicks still books one rider.</P>

      <H2>Receive webhooks in a route handler</H2>
      <P>
        Route handlers get the body untouched, so the handler drops straight in. It works on the Node.js and the Edge
        runtime. Call <C>revalidatePath</C> so the next page load shows the news:
      </P>
      <Snippet path="sdks/nextjs/app/api/webhooks/pickriders/route.ts" />
      <P>
        Point a webhook endpoint at <C>https://your-site/api/webhooks/pickriders</C> in the dashboard, and put its
        secret in <C>PICKRIDERS_WEBHOOK_SECRET</C>. To try it from your laptop, see{" "}
        <A href="/docs/tutorials/food-delivery/webhooks">receiving webhooks locally</A>.
      </P>

      <H2>Show the delivery live</H2>
      <P>
        A Server Component reads your database and passes the tracking link down. A Client Component follows it with the{" "}
        <A href="/docs/sdks/react">useDelivery hook</A>:
      </P>
      <Snippet path="sdks/nextjs/app/orders/id/page.tsx" title="app/orders/[id]/page.tsx" />
      <Snippet path="sdks/nextjs/app/orders/id/live-delivery.tsx" title="app/orders/[id]/live-delivery.tsx" />

      <H2>Things to know</H2>
      <List>
        <li>
          <strong>Trackers don&apos;t outlive a request on Vercel.</strong> Serverless functions stop after each
          response. Let webhooks update your database, and show the database. In the browser, the tracking link keeps
          the page live.
        </li>
        <li>
          <strong>
            Keep <C>PICKRIDERS_KEY</C> out of <C>NEXT_PUBLIC_</C> variables.
          </strong>{" "}
          Those are sent to the browser.
        </li>
        <li>
          <strong>The Pages Router</strong> parses request bodies by default. Turn that off for the webhook route:
        </li>
      </List>
      <Snippet path="sdks/nextjs/pages/api/webhooks/pickriders.ts" />
      <P>
        For a whole app built this way, follow the <A href="/docs/tutorials/food-delivery">food delivery tutorial</A>.
      </P>
    </>
  );
}

export function SdkBrowser() {
  return (
    <>
      <P>
        In a browser you follow a delivery from its <strong>tracking link</strong>: the <C>tracking_url</C> on every
        order. Your server sends it to the page. It&apos;s safe to share: it shows the status, the rider&apos;s name,
        where they are and when they&apos;ll arrive, never phone numbers or other customers&apos; addresses.
      </P>
      <Code tabs={INSTALL} />

      <H2>Follow a delivery</H2>
      <Snippet path="sdks/browser/track.ts" />
      <P>
        <C>on(&quot;status&quot;)</C> fires when the status changes. Every status also has its own event (
        <C>on(&quot;delivered&quot;)</C>). <C>subscribe</C> gives you the whole state each time anything changes, which
        is what UI frameworks want.
      </P>

      <H2>What a tracking link shows</H2>
      <Table
        head={["Field", "What it is"]}
        rows={[
          [<C key="n">number</C>, "The order number, like PR-1042: what your customer reads to support."],
          [
            <C key="s">status</C>,
            "Where the delivery is: searching, rider_assigned, picking_up, in_transit, delivered…",
          ],
          [
            <C key="r">rider</C>,
            <>
              Once one is assigned: <C>name</C>, <C>photo_url</C>, <C>vehicle</C> and <C>location</C> (<C>lat</C>,{" "}
              <C>lng</C>, <C>heading</C>).
            </>,
          ],
          [<C key="e">eta_s</C>, "Seconds until the rider reaches the stop."],
          [<C key="st">stop</C>, "For a drop-off's own link, that stop's address and status."],
        ]}
      />

      <H2>Wait for a moment</H2>
      <P>
        <C>until</C> waits for a status, and rejects if the delivery ends another way. <C>for await</C> reads each
        change as it comes:
      </P>
      <Snippet path="sdks/browser/wait.ts" />

      <H2>No build step</H2>
      <P>On a plain page, load it from a CDN:</P>
      <Snippet path="sdks/browser/page.html" />

      <H2>How it behaves</H2>
      <List>
        <li>It asks for news every 5 seconds, and every minute while a delivery is scheduled.</li>
        <li>In a background tab it asks less often, and catches up as soon as the tab is back.</li>
        <li>
          It stops by itself when the delivery ends. Call <C>stop()</C> when the page or component goes away.
        </li>
        <li>
          A link that doesn&apos;t exist stops it with a <C>NotFoundError</C>. A dropped connection doesn&apos;t: the
          error shows in the state, and the next good answer clears it.
        </li>
      </List>
    </>
  );
}

export function SdkReact() {
  return (
    <>
      <P>
        Trackers are stores, so React&apos;s <C>useSyncExternalStore</C> reads them directly. This hook is all you need.
        Copy it into your app:
      </P>
      <Snippet path="sdks/react/hooks/use-delivery.ts" />
      <P>
        It starts a tracker when the component appears, stops it when the component goes, and starts again if the link
        changes. It also works in Strict Mode, where React mounts components twice in development.
      </P>

      <H2>A delivery status component</H2>
      <Snippet path="sdks/react/components/delivery-status.tsx" />
      <P>The state the hook returns:</P>
      <Table
        head={["Field", "What it is"]}
        rows={[
          [<C key="d">data</C>, "What the tracking link shows, once it has loaded."],
          [<C key="s">status</C>, "The delivery's status (also on data)."],
          [<C key="dn">done</C>, "True once it's delivered, cancelled or failed."],
          [<C key="e">error</C>, "The last problem fetching it, cleared by the next good answer. Show “reconnecting”."],
          [<C key="u">updatedAt</C>, "When it last changed."],
        ]}
      />
      <P>
        Each change gives a new object, and nothing changes in between, so React only re-renders when there&apos;s news.
      </P>

      <H2>On the server</H2>
      <P>
        Booking and webhooks happen in server code. With Next.js, see the <A href="/docs/sdks/nextjs">Next.js guide</A>;
        with another React framework, the <A href="/docs/sdks/node">Node.js guide</A>.
      </P>
    </>
  );
}

export function SdkVue() {
  return (
    <>
      <P>
        In Vue, wrap the tracker in a composable. It follows the link while the component is mounted, starts again when
        the link changes, and stops when the component unmounts.
      </P>
      <Code tabs={INSTALL} />
      <Snippet path="sdks/vue/use-delivery.ts" />

      <H2>A delivery status component</H2>
      <Snippet path="sdks/vue/DeliveryStatus.vue" />

      <H2>Nuxt: book on the server, receive webhooks</H2>
      <P>
        Server code lives in <C>server/</C>, which never reaches the browser. Make one client there:
      </P>
      <Snippet path="sdks/vue/nuxt/server/utils/pickriders.ts" />
      <P>
        A server route for webhooks. Nuxt hands you the request untouched, so the SDK&apos;s web handler works as it is:
      </P>
      <Snippet path="sdks/vue/nuxt-webhook.ts" />
      <P>
        Book deliveries from your own server routes, the same way as in the <A href="/docs/sdks/node">Node.js guide</A>.
      </P>
    </>
  );
}

export function SdkSvelte() {
  return (
    <>
      <P>
        Turn a tracker into a Svelte store: it starts with the first subscriber and stops with the last, so{" "}
        <C>$delivery</C> in a component cleans up after itself.
      </P>
      <Code tabs={INSTALL} />
      <Snippet path="sdks/svelte/lib/delivery.ts" />

      <H2>A delivery status component</H2>
      <P>In Svelte 5; stores work the same in Svelte 4.</P>
      <Snippet path="sdks/svelte/DeliveryStatus.svelte" />

      <H2>SvelteKit: book on the server, receive webhooks</H2>
      <P>
        Put the client in <C>$lib/server</C>. SvelteKit refuses to build if browser code imports anything from there, so
        your key can&apos;t leak:
      </P>
      <Snippet path="sdks/svelte/lib/server/pickriders.ts" />
      <P>Book in a form action:</P>
      <Snippet path="sdks/svelte/ship-action.ts" />
      <P>And receive webhooks in an endpoint:</P>
      <Snippet path="sdks/svelte/webhook-server.ts" />
    </>
  );
}

export function SdkTesting() {
  return (
    <>
      <P>
        Build everything in test mode. With a <C>sk_test_</C> key nothing reaches a real rider or moves real money, and
        you can make anything happen on purpose.
      </P>

      <H2>Play the rider</H2>
      <P>
        <C>test.orders.advance</C> does what a rider would do next, with the same webhooks a real one would cause. One
        call is one small step (accepting, arriving, collecting…), so a whole delivery is about nine. Or jump straight
        to a status:
      </P>
      <Snippet path="sdks/testing/advance.ts" />

      <H2>Rehearse what goes wrong</H2>
      <P>
        Test scenarios make a delivery go wrong in a known way, so you can check your code copes. With{" "}
        <C>auto_advance</C> they play out by themselves, a step every 15 seconds:
      </P>
      <Snippet path="sdks/testing/scenarios.ts" />
      <Table
        head={["Scenario", "What happens", "Charged"]}
        rows={[
          [<C key="n">no_riders</C>, "Nobody accepts. Pickriders cancels it: the order ends failed.", "Nothing"],
          [
            <C key="r">rider_cancels</C>,
            "The first rider drops out before pickup. The search starts again and it's delivered.",
            "The normal price",
          ],
          [
            <C key="d">delivery_fails</C>,
            "The rider can't hand it over at the drop-off: it ends failed.",
            "The trip so far",
          ],
        ]}
      />

      <H2>Test your webhook route</H2>
      <P>
        Save a real event (from the dashboard&apos;s Events page, or <C>pickriders.events.list()</C>) and post it to
        your route, signed the way Pickriders signs. <C>generateTestHeader</C> uses your{" "}
        <C>PICKRIDERS_WEBHOOK_SECRET</C>:
      </P>
      <Snippet path="sdks/nextjs/app/api/webhooks/pickriders/route.test.ts" />

      <H2>Tests that never touch the network</H2>
      <P>
        Give the client your own <C>fetch</C>, and your tests decide what &quot;the API&quot; answers:
      </P>
      <Snippet path="sdks/testing/fake-fetch.ts" />

      <H2>In CI</H2>
      <List>
        <li>Unit tests: a fake fetch, and signed events posted to your routes. Fast, and nothing leaves CI.</li>
        <li>
          One end-to-end test against the sandbox, with a test key in your CI secrets. Each run creates test orders, so
          run it on merges, not on every push.
        </li>
      </List>
    </>
  );
}

export function SdkReference() {
  return (
    <>
      <P>
        Everything the SDK exports. Field names in requests and responses are the API&apos;s, exactly as in the{" "}
        <A href="/docs/api">API reference</A>, so what you read in a webhook or a log is what you type.
      </P>

      <H2>The client</H2>
      <Code
        title="Create it"
        tabs={[
          {
            label: "TypeScript",
            lang: "javascript",
            code: `import Pickriders from "pickriders"; // CommonJS: const { Pickriders } = require("pickriders")

const pickriders = new Pickriders(); // or new Pickriders("sk_test_...", options)`,
          },
        ]}
      />
      <Table
        head={["Option", "Default", "What it does"]}
        rows={[
          [<C key="k">apiKey</C>, <C key="kd">PICKRIDERS_KEY</C>, "Your secret key, sk_test_ or sk_live_."],
          [
            <C key="w">webhookSecret</C>,
            <C key="wd">PICKRIDERS_WEBHOOK_SECRET</C>,
            "Your webhook endpoint's signing secret, whsec_…",
          ],
          [
            <C key="s">serviceArea</C>,
            <C key="sd">PICKRIDERS_SERVICE_AREA</C>,
            "Used when an order doesn't name one, e.g. NG-LA.",
          ],
          [<C key="t">timeout</C>, "30000", "Milliseconds before a request is abandoned."],
          [<C key="m">maxRetries</C>, "2", "Retries after network errors, 429s and 5xx, with backoff."],
          [<C key="b">baseUrl</C>, <C key="bd">PICKRIDERS_BASE_URL</C>, "The API's address. Production unless set."],
          [<C key="f">fetch</C>, "the global fetch", "Your own fetch: a proxy, or a fake in tests."],
          [
            <C key="d">dangerouslyAllowBrowser</C>,
            "false",
            "Let a secret key run in a browser. Only for tools nobody else uses.",
          ],
        ]}
      />
      <P>
        Two properties: <C>livemode</C> (true for a live key) and <C>Pickriders.VERSION</C>. Two methods: <C>ping()</C>{" "}
        (is the API reachable? needs no valid key) and <C>status()</C> (the platform status).
      </P>

      <H2>Per-call options</H2>
      <P>Every method takes these as its last argument:</P>
      <Table
        head={["Option", "What it does"]}
        rows={[
          [
            <C key="i">idempotencyKey</C>,
            "POSTs only. The same key never does the work twice. One is sent for you otherwise.",
          ],
          [<C key="t">timeout</C>, "This call's timeout, in milliseconds."],
          [<C key="m">maxRetries</C>, "This call's retries."],
          [<C key="s">signal</C>, "An AbortSignal to cancel it."],
          [<C key="h">headers</C>, "Extra headers."],
        ]}
      />

      <H2>Orders</H2>
      <Table
        head={["Method", "What it does"]}
        rows={[
          [
            <C key="c">orders.create(params)</C>,
            <>
              Books a delivery. Pass <C>pickup</C> and <C>dropoff</C> (an array of either makes a batch or bulk order),
              or <C>stops</C> and <C>type</C>, or a <C>quote_id</C>.
            </>,
          ],
          [<C key="r">orders.retrieve(order)</C>, "The order as it is now."],
          [<C key="l">orders.list(params)</C>, "Your orders, newest first: status, type, reference, created."],
          [
            <C key="x">orders.cancel(order, {"{ reason }"})</C>,
            "Cancels it. cancellation.charged_amount says what it cost.",
          ],
          [<C key="rs">orders.reschedule(order, {"{ scheduled_for }"})</C>, "Moves a scheduled order, same price."],
          [
            <C key="d">orders.dispatch(order)</C>,
            "Starts the rider search for an order created with dispatch: manual.",
          ],
          [
            <C key="u">orders.updateStop(order, stopId, params)</C>,
            "Changes a stop's contact, instructions or package.",
          ],
          [<C key="t">orders.tracking(order)</C>, "Where the rider is, and each stop's ETA."],
          [<C key="e">orders.events(order)</C>, "Every event about it."],
          [<C key="o">orders.offers.list / accept / decline</C>, "Rider offers on a bidding order."],
          [<C key="tr">orders.track(order, {"{ poll }"})</C>, "A tracker that follows it to the end (below)."],
        ]}
      />
      <P>Every method that takes an order takes the order itself or its id.</P>

      <H2>Everything else</H2>
      <Table
        head={["Method", "What it does"]}
        rows={[
          [<C key="q">quotes.create / retrieve</C>, "A price, held for 15 minutes. Book it with quote_id."],
          [<C key="w">wallet.retrieve()</C>, "available and held, in kobo."],
          [<C key="wt">wallet.transactions(params)</C>, "Top-ups, holds, charges and refunds."],
          [<C key="wf">wallet.createFundingSession(params)</C>, "A payment page to top up the live wallet."],
          [<C key="wa">wallet.fundingAccount()</C>, "Your own account number for bank transfers, once set up."],
          [
            <C key="r">riders.availability({"{ lat, lng, service_area }"})</C>,
            "How many riders are near, and how soon.",
          ],
          [<C key="s">serviceAreas.list()</C>, "Where Pickriders delivers."],
          [<C key="a">account.retrieve()</C>, "Your team, and whether live access is approved."],
          [
            <C key="we">webhookEndpoints.create / retrieve / list / update / del</C>,
            "Where events go. create returns the secret, once.",
          ],
          [
            <C key="wr">webhookEndpoints.rollSecret / test</C>,
            "A new secret (the old one works 24 hours more), or a test ping.",
          ],
          [<C key="ev">events.list / retrieve / resend</C>, "The last 30 days of events."],
          [
            <C key="ta">test.orders.advance(order, {"{ to }"})</C>,
            "Test mode: the rider's next step, or straight to a status.",
          ],
          [<C key="tf">test.wallet.fund({"{ amount }"})</C>, "Test mode: add play money, in kobo."],
        ]}
      />

      <H2>Lists</H2>
      <P>
        List methods return something you can await (one page) or loop over (every page). Nothing is fetched until you
        do one or the other.
      </P>
      <Code
        title="Lists"
        tabs={[
          {
            label: "TypeScript",
            lang: "javascript",
            code: `const page = await pickriders.orders.list({ status: "delivered", limit: 50 }); // { data, has_more }

for await (const order of pickriders.orders.list({ created: { gte: new Date("2026-11-01") } })) {
  // every page, newest first
}

const recent = await pickriders.events.list({ type: "order.*" }).toArray({ max: 200 });`,
          },
        ]}
      />

      <H2>Trackers</H2>
      <P>
        <C>orders.track(order)</C> on the server and <C>trackDelivery(link)</C> from <C>pickriders/client</C> return a
        tracker. Both work the same way.
      </P>
      <Table
        head={["Member", "What it does"]}
        rows={[
          [<C key="d">data, status, isDone</C>, "The latest state."],
          [
            <C key="g">getSnapshot()</C>,
            "Everything as one object: data, status, done, error, source, updatedAt, stopped.",
          ],
          [<C key="s">subscribe(listener)</C>, "Called with each new state. Returns a function that unsubscribes."],
          [
            <C key="o">on(event, listener) / once</C>,
            "Listen for an event (below). Returns a function that stops listening.",
          ],
          [
            <C key="u">until(status, {"{ timeout }"})</C>,
            "Resolves at a status (or several, or your own test). Rejects with OrderEndedError if it ends another way.",
          ],
          [<C key="dn">done({"{ timeout }"})</C>, "Resolves when it's delivered, cancelled or failed."],
          [<C key="f">for await (const x of tracker)</C>, "Each change, ending after the last."],
          [<C key="r">refresh()</C>, "Ask the API now."],
          [<C key="st">stop()</C>, "Stop polling and listening. using tracker = … stops it for you."],
        ]}
      />
      <Table
        head={["Event", "When"]}
        rows={[
          [<C key="u">update</C>, "Anything changed."],
          [<C key="s">status</C>, 'The status changed. Each status is also an event: on("delivered").'],
          [<C key="d">done</C>, "It ended."],
          [<C key="e">error</C>, "Fetching failed. It keeps trying unless the error can't go away (a revoked key)."],
          [
            <C key="ev">event</C>,
            "Server trackers only: each webhook event about the order, even ones that don't change it.",
          ],
        ]}
      />
      <P>
        The <C>poll</C> option: <C>&quot;auto&quot;</C> (default), a number of milliseconds, or <C>false</C> for
        webhooks only.
      </P>

      <H2>Webhooks</H2>
      <Table
        head={["Method", "What it does"]}
        rows={[
          [
            <C key="h">webhooks.handler(options)</C>,
            "A handler for web Requests: Next.js, Hono, Workers, Bun, Deno, SvelteKit, Nuxt.",
          ],
          [<C key="n">webhooks.nodeHandler(options)</C>, "A handler for Express and node:http. Needs the raw body."],
          [
            <C key="o">webhooks.on(type, listener) / once</C>,
            "Run code for an event type, a group (order.*), or every event (*).",
          ],
          [
            <C key="c">webhooks.constructEvent(body, signature)</C>,
            "Check a signature yourself. Returns the event, or throws SignatureVerificationError.",
          ],
          [<C key="d">webhooks.dispatch(event)</C>, "Hand a checked event to your listeners and trackers."],
          [<C key="g">webhooks.generateTestHeader(body)</C>, "A valid signature, for your tests."],
        ]}
      />
      <P>
        Handler options: <C>secret</C> (this endpoint&apos;s, if not the client&apos;s), <C>tolerance</C> (seconds a
        signature stays valid, default 300) and <C>onEvent</C>.
      </P>

      <H2>The order store</H2>
      <P>
        <C>pickriders.orders.store</C> holds the newest version of every order this server has seen: <C>get(id)</C>,{" "}
        <C>all()</C>, <C>subscribe(listener)</C> (every change, with where it came from: api, webhook or poll) and{" "}
        <C>subscribeTo(id, listener)</C>. An older version never replaces a newer one.
      </P>

      <H2>Errors</H2>
      <Table
        head={["Class", "When"]}
        rows={[
          [
            <C key="1">InvalidRequestError</C>,
            "A field is missing or wrong (param names it), or the order can't do that now.",
          ],
          [<C key="2">AuthenticationError</C>, "The key is missing, wrong or revoked, or the team is suspended."],
          [<C key="3">PermissionError</C>, "A restricted key, an IP allowlist, or live access not approved."],
          [<C key="4">NotFoundError</C>, "No such object in this mode."],
          [<C key="5">InsufficientFundsError</C>, "The wallet doesn't cover it."],
          [<C key="6">IdempotencyError</C>, "An idempotency key was reused for a different request."],
          [<C key="7">RateLimitError</C>, "Still too many requests after retrying. retryAfter says how long to wait."],
          [<C key="8">ApiError</C>, "A problem at Pickriders, after retrying."],
          [<C key="9">ConnectionError, TimeoutError</C>, "Pickriders couldn't be reached, or took too long."],
          [<C key="10">SignatureVerificationError</C>, "A webhook signature didn't check out."],
          [<C key="11">OrderEndedError</C>, "until() waited for a status, but the order ended. error.order says how."],
          [<C key="12">WaitTimeoutError</C>, "until() or done() ran out of time."],
        ]}
      />
      <P>
        Every one has <C>code</C>, <C>message</C>, <C>param</C>, <C>status</C> and <C>requestId</C>. Quote the request
        id to support.
      </P>

      <H2>Types</H2>
      <P>
        Import any type by name: <C>Order</C>, <C>OrderStatus</C>, <C>OrderStop</C>, <C>Quote</C>, <C>Wallet</C>,{" "}
        <C>PublicTracking</C>, <C>StopInput</C>, <C>CreateOrderParams</C>, <C>PickridersEvent</C>, <C>OrderEvent</C>,{" "}
        <C>EventType</C> and more. <C>isFinalStatus(status)</C> tells you whether an order can still change.
      </P>
      <Code
        title="Types"
        tabs={[
          {
            label: "TypeScript",
            lang: "javascript",
            code: `import { isFinalStatus, type Order, type PickridersEvent } from "pickriders";

function describe(event: PickridersEvent) {
  if (event.type === "order.delivered") return \`\${event.data.object.number} delivered\`; // an Order
  if (event.type === "wallet.balance_low") return \`below \${event.data.threshold}\`;
  return event.type;
}`,
          },
        ]}
      />
      <P>
        The SDK&apos;s version history is on <A href="https://www.npmjs.com/package/pickriders">npm</A>, and its code is
        on <A href="https://github.com/Pickriders/pickriders-node-sdk">GitHub</A>.
      </P>
    </>
  );
}
