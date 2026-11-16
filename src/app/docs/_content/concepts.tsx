import { Code } from "@/components/docs/code";
import { A, C, Callout, H2, List, P, Table } from "@/components/docs/prose";
import { PUBLIC_API_BASE as BASE } from "@/constant";
import { CHANGELOG } from "@/lib/docs/changelog";

/** Facts on these pages come from backend-api: common/idempotency.interceptor.ts, common/pagination.ts, auth/rate-limiter.ts. */

export function Idempotency() {
  return (
    <>
      <P>
        Networks fail. If your request to create an order times out, did the order happen? Send an{" "}
        <C>Idempotency-Key</C> and you never have to guess: retrying with the same key gives you the first answer back
        instead of making a second order.
      </P>
      <Code
        tabs={[
          {
            label: "curl",
            lang: "bash",
            code: `curl ${BASE}/orders \\
  -H "Authorization: Bearer $PICKRIDERS_KEY" \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: 5f0c5a52-8f3e-4d4b-9a51-6a3d1c2e7b10" \\
  -d '{ "quote_id": "quo_6560f0c2a1b2c3d4e5f60718" }'`,
          },
          {
            label: "Node.js",
            lang: "javascript",
            code: `import crypto from "node:crypto";

// One key per order you mean to create, reused for every retry of it.
const key = crypto.randomUUID();

async function createOrder(body, tries = 3) {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch("${BASE}/orders", {
        method: "POST",
        headers: {
          Authorization: \`Bearer \${process.env.PICKRIDERS_KEY}\`,
          "Content-Type": "application/json",
          "Idempotency-Key": key,
        },
        body: JSON.stringify(body),
      });
      return await res.json(); // a retry gets the same order back
    } catch (networkError) {
      if (i === tries) throw networkError;
    }
  }
}`,
          },
          {
            label: "Python",
            lang: "python",
            code: `import os, uuid, requests

key = str(uuid.uuid4())  # one per order, reused for every retry

for attempt in range(3):
    try:
        order = requests.post(
            "${BASE}/orders",
            headers={
                "Authorization": f"Bearer {os.environ['PICKRIDERS_KEY']}",
                "Idempotency-Key": key,
            },
            json={"quote_id": "quo_6560f0c2a1b2c3d4e5f60718"},
            timeout=10,
        ).json()
        break
    except requests.ConnectionError:
        if attempt == 2:
            raise`,
          },
        ]}
      />

      <H2>How it works</H2>
      <List>
        <li>Every POST takes an Idempotency-Key. Use something unique, like a UUID, up to 255 characters.</li>
        <li>
          For 24 hours, the same key with the same request gets the first response again, with the header{" "}
          <C>Idempotent-Replayed: true</C>. Nothing is done twice.
        </li>
        <li>
          The same key with a <em>different</em> request is refused:{" "}
          <A href="/docs/errors#idempotency_key_reused">idempotency_key_reused</A> (422).
        </li>
        <li>
          A retry while the first request is still running gets{" "}
          <A href="/docs/errors#idempotency_in_progress">idempotency_in_progress</A> (409). Wait a second and try again.
        </li>
        <li>A request that failed is forgotten, so you can fix it and retry with the same key.</li>
        <li>Keys belong to your team and mode: a test key and a live key never share them.</li>
      </List>
    </>
  );
}

export function Pagination() {
  return (
    <>
      <P>Lists like your orders or events come a page at a time, newest first. Each page looks like this:</P>
      <Code
        tabs={[
          {
            label: "A page",
            lang: "json",
            code: `{
  "object": "list",
  "data": [ { "object": "order", "id": "ord_6560f0c2a1b2c3d4e5f60718" } ],
  "has_more": true,
  "url": "/developer/api/v1/orders"
}`,
          },
        ]}
      />
      <Table
        head={["Query value", "What it does"]}
        rows={[
          [<C key="l">limit</C>, "How many per page: 1 to 100. Leave it out for 20."],
          [<C key="s">starting_after</C>, "An id from the last page: get the ones after it (older)."],
          [<C key="e">ending_before</C>, "An id from the first page: get the ones before it (newer)."],
        ]}
      />
      <P>
        To read everything, keep asking with <C>starting_after</C> set to the last id you got, until <C>has_more</C> is{" "}
        <C>false</C>:
      </P>
      <Code
        tabs={[
          {
            label: "Node.js",
            lang: "javascript",
            code: `async function allOrders() {
  const orders = [];
  let after;
  do {
    const url = new URL("${BASE}/orders");
    url.searchParams.set("limit", "100");
    if (after) url.searchParams.set("starting_after", after);
    const page = await fetch(url, {
      headers: { Authorization: \`Bearer \${process.env.PICKRIDERS_KEY}\` },
    }).then((r) => r.json());
    orders.push(...page.data);
    after = page.has_more ? page.data.at(-1).id : undefined;
  } while (after);
  return orders;
}`,
          },
          {
            label: "Python",
            lang: "python",
            code: `def all_orders():
    orders, after = [], None
    while True:
        params = {"limit": 100, **({"starting_after": after} if after else {})}
        page = requests.get(
            "${BASE}/orders",
            headers={"Authorization": f"Bearer {os.environ['PICKRIDERS_KEY']}"},
            params=params,
        ).json()
        orders += page["data"]
        if not page["has_more"]:
            return orders
        after = page["data"][-1]["id"]`,
          },
        ]}
      />
      <Callout tone="tip">
        <p>
          Many lists also take filters, like <C>status</C> or <C>created</C>. Each one is listed in the{" "}
          <A href="/docs/api">API reference</A>.
        </p>
      </Callout>
    </>
  );
}

export function RateLimits() {
  return (
    <>
      <P>
        To keep things fast for everyone, each API key can send a certain number of requests. You&apos;ll rarely reach
        it, but here are the numbers so you can plan.
      </P>
      <Table
        head={["", "Test key", "Live key"]}
        rows={[
          ["Any request", "10 a second", "25 a second"],
          ["Creating orders, on top of that", "30 a minute", "60 a minute"],
        ]}
      />
      <P>Every answer says where you stand, in its headers:</P>
      <Table
        head={["Header", "What it says"]}
        rows={[
          [<C key="l">RateLimit-Limit</C>, "How many requests the window allows."],
          [<C key="r">RateLimit-Remaining</C>, "How many you have left in it."],
          [<C key="s">RateLimit-Reset</C>, "Seconds until it starts again."],
        ]}
      />
      <P>
        Over the limit, you get a 429 with <A href="/docs/errors#rate_limited">rate_limited</A> and a <C>Retry-After</C>{" "}
        header saying how many seconds to wait. Wait that long, then try again:
      </P>
      <Code
        tabs={[
          {
            label: "Node.js",
            lang: "javascript",
            code: `async function send(url, init) {
  for (;;) {
    const res = await fetch(url, init);
    if (res.status !== 429) return res;
    const wait = Number(res.headers.get("Retry-After") ?? 1);
    await new Promise((done) => setTimeout(done, wait * 1000));
  }
}`,
          },
          {
            label: "Python",
            lang: "python",
            code: `import time

def send(method, url, **kwargs):
    while True:
        res = requests.request(method, url, **kwargs)
        if res.status_code != 429:
            return res
        time.sleep(int(res.headers.get("Retry-After", "1")))`,
          },
        ]}
      />
      <Callout tone="note" title="Need more?">
        <p>If your live traffic needs higher limits, tell us about it and we&apos;ll raise them for your team.</p>
      </Callout>
    </>
  );
}

const IDS: [string, string][] = [
  ["ord_", "An order"],
  ["quo_", "A quote"],
  ["stop_", "A stop on an order"],
  ["off_", "A rider's offer on a bidding order"],
  ["evt_", "An event"],
  ["we_", "A webhook endpoint"],
  ["whd_", "A webhook delivery"],
  ["txn_", "A wallet transaction"],
  ["key_", "An API key (never the secret itself)"],
  ["team_", "Your team"],
  ["req_", "A request, in errors and your request log"],
];

export function Ids() {
  return (
    <>
      <P>
        Everything in the API has an id, and its first letters say what it is: <C>ord_6560f0c2a1b2c3d4e5f60718</C> is an
        order. When you see an id in a log, you know at a glance what to look up.
      </P>
      <Table head={["Starts with", "It's"]} rows={IDS.map(([prefix, what]) => [<C key={prefix}>{prefix}</C>, what])} />
      <H2>Storing ids</H2>
      <List>
        <li>Keep the whole id, prefix included, as a string. Don&apos;t take it apart or turn it into a number.</li>
        <li>Allow up to 255 characters, even though today&apos;s ids are shorter.</li>
        <li>Ids are case-sensitive.</li>
        <li>
          Test and live ids never mix: a test key can&apos;t find a live order, and answers{" "}
          <A href="/docs/errors#order_not_found">order_not_found</A>.
        </li>
      </List>
      <P>
        Want your own id on an order, like your shop&apos;s order number? Send it as <C>reference</C> when you create
        the order. It must be unique in each mode, and you can filter orders by it.
      </P>
      <Code
        tabs={[
          {
            label: "curl",
            lang: "bash",
            code: `curl "${BASE}/orders?reference=shop-1042" \\
  -H "Authorization: Bearer $PICKRIDERS_KEY"`,
          },
        ]}
      />
    </>
  );
}

export function Versioning() {
  return (
    <>
      <P>
        Your integration should keep working, untouched, for as long as you like. This is our promise about how the API
        changes.
      </P>

      <H2>The version you use</H2>
      <P>
        The version is in every URL: <C>/developer/api/v1</C>. It&apos;s the only version today, and it stays as it is.
      </P>

      <H2>What can change at any time</H2>
      <P>These never break a well-built integration, so they ship without notice and appear in the changelog:</P>
      <List>
        <li>New endpoints, and new optional fields or query values in requests.</li>
        <li>New fields in responses, and new event types.</li>
        <li>New values in an enum, like a new order status. Handle values you don&apos;t know.</li>
        <li>
          New error codes, and clearer error messages. Match on <C>code</C>, never on the message.
        </li>
        <li>Longer ids, and a different order of fields in JSON.</li>
      </List>

      <H2>What needs a new version</H2>
      <P>
        Anything that could break you comes in a new version, like <C>/v2</C>, with at least{" "}
        <strong>6 months&apos; notice</strong> before the old one changes:
      </P>
      <List>
        <li>Removing or renaming an endpoint or a field.</li>
        <li>Changing a field&apos;s type, or what a value means.</li>
        <li>Making an optional field required, or no longer accepting a value.</li>
      </List>
      <P>Our CI checks every change to the API for these before it ships, so one can&apos;t slip out by accident.</P>

      <H2>Deprecation</H2>
      <List ordered>
        <li>We announce it in the changelog, and email the owner of every team using it.</li>
        <li>For at least 6 months, both the old and the new way work, and the docs show both.</li>
        <li>We remind you before the end.</li>
        <li>Only then does the old way stop.</li>
      </List>
      <Callout tone="tip" title="Hear about changes">
        <p>
          Watch the <A href="/docs/changelog">changelog</A>, and keep your team owner&apos;s email up to date in your
          dashboard&apos;s settings.
        </p>
      </Callout>
    </>
  );
}

const TONES = {
  Added: "bg-success-subtle text-success-fg",
  Changed: "bg-info-subtle text-info-fg",
  Fixed: "bg-warning-subtle text-warning-fg",
} as const;

export function Changelog() {
  return (
    <>
      <P>
        Every change to the API and these docs, newest first. Nothing here broke an existing integration: see{" "}
        <A href="/docs/versioning">versioning</A> for why.
      </P>
      <ol className="relative mt-8 space-y-8 border-l-2 border-line pl-6">
        {CHANGELOG.map((entry) => (
          <li key={`${entry.date}-${entry.title}`} className="relative">
            <span
              aria-hidden
              className="absolute -left-[1.95rem] top-1.5 size-3 rounded-full border-2 border-canvas bg-brand"
            />
            <p className="flex flex-wrap items-center gap-2 text-sm">
              <time dateTime={entry.date} className="font-semibold text-fg-muted">
                {new Date(`${entry.date}T12:00:00Z`).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${TONES[entry.kind]}`}>{entry.kind}</span>
            </p>
            <h2 id={entry.id} className="mt-1 scroll-mt-24 text-lg font-extrabold text-fg-heading">
              {entry.title}
            </h2>
            <p className="mt-1 text-[1rem] leading-7 text-fg">{entry.body}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
