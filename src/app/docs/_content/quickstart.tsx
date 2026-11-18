import { GET_A_KEY } from "@/components/docs/docs-header";
import { Code, type CodeTab } from "@/components/docs/code";
import { A, C, Callout, NextCard, P } from "@/components/docs/prose";
import { Walkthrough, WalkStep } from "@/components/docs/walkthrough";
import { SAMPLE_ORDER, SAMPLE_QUOTE } from "@/lib/docs/walkthrough";
import { SITE_URL } from "@/constant";
import { PUBLIC_API_BASE as BASE } from "@/constant";

/** The same request in each language, keyed by the tab labels readers pick once. */
const request = ({
  curl,
  node,
  python,
  php,
}: {
  curl: string;
  node: string;
  python: string;
  php: string;
}): CodeTab[] => [
  { label: "curl", lang: "bash", code: curl },
  { label: "Node.js", lang: "javascript", code: node },
  { label: "Python", lang: "python", code: python },
  { label: "PHP", lang: "php", code: php },
];

const KEY = [
  {
    label: "Terminal",
    lang: "bash" as const,
    code: `# Paste your own key, from the dashboard's API keys page
export PICKRIDERS_KEY="sk_test_..."`,
  },
];

const PING = request({
  curl: `curl ${BASE}/ping \\
  -H "Authorization: Bearer $PICKRIDERS_KEY"`,
  node: `const res = await fetch("${BASE}/ping", {
  headers: { Authorization: \`Bearer \${process.env.PICKRIDERS_KEY}\` },
});
console.log(await res.json());`,
  python: `import os, requests

res = requests.get(
    "${BASE}/ping",
    headers={"Authorization": f"Bearer {os.environ['PICKRIDERS_KEY']}"},
)
print(res.json())`,
  php: `$ch = curl_init("${BASE}/ping");
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer " . getenv("PICKRIDERS_KEY")]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
echo curl_exec($ch);`,
});

const QUOTE_BODY = `{
  "type": "single",
  "service_area": "NG-LA",
  "stops": [
    {
      "address": "1 Admiralty Way, Lekki Phase 1, Lagos",
      "lat": 6.4474,
      "lng": 3.474,
      "contact": { "name": "Bola Ade", "phone": "+2348031234567" }
    },
    {
      "address": "12 Bourdillon Road, Ikoyi, Lagos",
      "lat": 6.456,
      "lng": 3.431,
      "contact": { "name": "Chidi Eze", "phone": "+2348055550101" }
    }
  ]
}`;

const QUOTE = request({
  curl: `curl ${BASE}/quotes \\
  -H "Authorization: Bearer $PICKRIDERS_KEY" \\
  -H "Content-Type: application/json" \\
  -d '${QUOTE_BODY.replace(/\n/g, "\n  ")}'`,
  node: `const res = await fetch("${BASE}/quotes", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.PICKRIDERS_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    type: "single",
    service_area: "NG-LA",
    stops: [
      { address: "1 Admiralty Way, Lekki Phase 1, Lagos", lat: 6.4474, lng: 3.474,
        contact: { name: "Bola Ade", phone: "+2348031234567" } },
      { address: "12 Bourdillon Road, Ikoyi, Lagos", lat: 6.456, lng: 3.431,
        contact: { name: "Chidi Eze", phone: "+2348055550101" } },
    ],
  }),
});
const quote = await res.json();
console.log(quote.id, quote.recommended_price);`,
  python: `quote = requests.post(
    "${BASE}/quotes",
    headers={"Authorization": f"Bearer {os.environ['PICKRIDERS_KEY']}"},
    json={
        "type": "single",
        "service_area": "NG-LA",
        "stops": [
            {"address": "1 Admiralty Way, Lekki Phase 1, Lagos", "lat": 6.4474, "lng": 3.474,
             "contact": {"name": "Bola Ade", "phone": "+2348031234567"}},
            {"address": "12 Bourdillon Road, Ikoyi, Lagos", "lat": 6.456, "lng": 3.431,
             "contact": {"name": "Chidi Eze", "phone": "+2348055550101"}},
        ],
    },
).json()
print(quote["id"], quote["recommended_price"])`,
  php: `$body = json_encode([
    "type" => "single",
    "service_area" => "NG-LA",
    "stops" => [
        ["address" => "1 Admiralty Way, Lekki Phase 1, Lagos", "lat" => 6.4474, "lng" => 3.474,
         "contact" => ["name" => "Bola Ade", "phone" => "+2348031234567"]],
        ["address" => "12 Bourdillon Road, Ikoyi, Lagos", "lat" => 6.456, "lng" => 3.431,
         "contact" => ["name" => "Chidi Eze", "phone" => "+2348055550101"]],
    ],
]);
$ch = curl_init("${BASE}/quotes");
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $body,
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer " . getenv("PICKRIDERS_KEY"),
        "Content-Type: application/json",
    ],
    CURLOPT_RETURNTRANSFER => true,
]);
$quote = json_decode(curl_exec($ch), true);
echo $quote["id"];`,
});

const QUOTE_RESPONSE = `{
  "object": "quote",
  "id": "quo_6560f0c2a1b2c3d4e5f60718",
  "type": "single",
  "currency": "NGN",
  "recommended_price": 350000,
  "distance_m": 8400,
  "duration_s": 1450,
  "expires_at": "2026-11-15T12:15:00.000Z",
  "livemode": false
}`;

const ORDER = request({
  curl: `curl ${BASE}/orders \\
  -H "Authorization: Bearer $PICKRIDERS_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "quote_id": "quo_6560f0c2a1b2c3d4e5f60718", "reference": "my-first-order" }'`,
  node: `const res = await fetch("${BASE}/orders", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.PICKRIDERS_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ quote_id: quote.id, reference: "my-first-order" }),
});
const order = await res.json();
console.log(order.id, order.status); // ord_… searching`,
  python: `order = requests.post(
    "${BASE}/orders",
    headers={"Authorization": f"Bearer {os.environ['PICKRIDERS_KEY']}"},
    json={"quote_id": quote["id"], "reference": "my-first-order"},
).json()
print(order["id"], order["status"])  # ord_… searching`,
  php: `$ch = curl_init("${BASE}/orders");
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode(["quote_id" => $quote["id"], "reference" => "my-first-order"]),
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer " . getenv("PICKRIDERS_KEY"),
        "Content-Type: application/json",
    ],
    CURLOPT_RETURNTRANSFER => true,
]);
$order = json_decode(curl_exec($ch), true);
echo $order["status"]; // searching`,
});

const ADVANCE = request({
  curl: `curl ${BASE}/test/orders/ord_6560f0c2a1b2c3d4e5f60718/advance \\
  -H "Authorization: Bearer $PICKRIDERS_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "to": "delivered" }'`,
  node: `const res = await fetch(\`${BASE}/test/orders/\${order.id}/advance\`, {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.PICKRIDERS_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ to: "delivered" }),
});
console.log((await res.json()).status); // delivered`,
  python: `done = requests.post(
    f"${BASE}/test/orders/{order['id']}/advance",
    headers={"Authorization": f"Bearer {os.environ['PICKRIDERS_KEY']}"},
    json={"to": "delivered"},
).json()
print(done["status"])  # delivered`,
  php: `$ch = curl_init("${BASE}/test/orders/" . $order["id"] . "/advance");
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode(["to" => "delivered"]),
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer " . getenv("PICKRIDERS_KEY"),
        "Content-Type: application/json",
    ],
    CURLOPT_RETURNTRANSFER => true,
]);
echo json_decode(curl_exec($ch), true)["status"]; // delivered`,
});

/** The steps, in order: the walkthrough's progress bar and search engines' HowTo both read them. */
export const QUICKSTART_STEPS = [
  { id: "get-your-test-key", title: "Get your test key" },
  { id: "check-it-works", title: "Check your key works" },
  { id: "ask-for-a-price", title: "Ask for a price" },
  { id: "book-the-delivery", title: "Book the delivery" },
  { id: "watch-it-arrive", title: "Watch it arrive" },
];

/** The tutorial as a HowTo, so search engines can show it step by step. */
const HOW_TO = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Send your first delivery with the Pickriders API",
  description: "Get a test key, ask for a price, book the order and watch it get delivered.",
  totalTime: "PT10M",
  tool: [{ "@type": "HowToTool", name: "A terminal, or Node.js, Python or PHP" }],
  step: QUICKSTART_STEPS.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    url: `${SITE_URL}/docs/quickstart#${s.id}`,
  })),
};

export function Quickstart() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(HOW_TO) }} />
      <P>
        You&apos;ll book a pretend delivery across Lagos and watch it arrive. Nothing here costs real money or sends a
        real rider. Do one step at a time: each tells you exactly what to do, and the next opens when you tick it off.
      </P>

      <Walkthrough
        steps={QUICKSTART_STEPS}
        finish={
          <>
            <p>
              You priced, booked and delivered an order in three requests. Live orders work the same way, with a live
              key.
            </p>
            <div className="mt-5 grid gap-3 text-left">
              <NextCard href="/docs/webhooks" title="Hear about every step">
                Let us tell your server the moment an order moves.
              </NextCard>
              <NextCard href="/docs/test-and-live" title="Go live">
                When you&apos;re ready for real riders.
              </NextCard>
              <NextCard href="/docs/sdks" title="Do it in JavaScript">
                The Node.js SDK books and follows a delivery in a few lines.
              </NextCard>
            </div>
          </>
        }
      >
        <WalkStep
          id="get-your-test-key"
          n={1}
          title="Get your test key"
          summary="Your sk_test_ key is saved as PICKRIDERS_KEY."
          tasks={[
            {
              id: "key:account",
              label: (
                <>
                  <A href={GET_A_KEY}>Sign up</A> for free, or sign in if you have an account.
                </>
              ),
            },
            {
              id: "key:create",
              label: (
                <>
                  On the <strong>API keys</strong> page, press <strong>Create key</strong>.
                </>
              ),
            },
            {
              id: "key:copy",
              label: (
                <>
                  Copy the key that starts with <C>sk_test_</C>. You only see it once.
                </>
              ),
            },
            {
              id: "key:save",
              label: (
                <>
                  Save it as <C>PICKRIDERS_KEY</C> with the command above.
                </>
              ),
            },
          ]}
        >
          <P>
            Your key is how the API knows it&apos;s you. A test key only plays pretend, so you can&apos;t break
            anything. Save it where your code can read it:
          </P>
          <Code tabs={KEY} />
          <Callout tone="warning" title="Your key is a password">
            <p>Keep it on your server. Never put it in a website, an app or a public code repository.</p>
          </Callout>
        </WalkStep>

        <WalkStep
          id="check-it-works"
          n={2}
          title="Check your key works"
          summary="The API answered ping. Your key works."
          checkKind="ping"
          run={{ method: "GET", path: "/ping" }}
          tasks={[
            { id: "check-it-works:run", label: "Run the example above, in the language you like." },
            {
              id: "check-it-works:worked",
              label: (
                <>
                  It printed <C>{'{"object":"ping","ok":true}'}</C>. (Paste it in the box above and we tick this for
                  you.)
                </>
              ),
            },
          ]}
        >
          <P>Send one tiny request. If the API answers, your key works.</P>
          <Code tabs={PING} />
        </WalkStep>

        <WalkStep
          id="ask-for-a-price"
          n={3}
          title="Ask for a price"
          summary="You have a quote: a price held for 15 minutes."
          checkKind="quote"
          run={{ method: "POST", path: "/quotes", body: JSON.parse(QUOTE_BODY) }}
          tasks={[
            { id: "ask-for-a-price:run", label: "Run the example above. It asks for a ride from Lekki to Ikoyi." },
            {
              id: "ask-for-a-price:worked",
              label: (
                <>
                  You got a quote back, with an <C>id</C> starting <C>quo_</C>.
                </>
              ),
            },
          ]}
        >
          <P>
            Tell us the two stops: where the rider picks up and where they drop off. Each stop has an address, its map
            position (<C>lat</C> and <C>lng</C>) and who the rider meets there.
          </P>
          <Code tabs={QUOTE} />
          <P>You&apos;ll get a quote like this. The price is held for 15 minutes:</P>
          <Code tabs={[{ label: "What you get back", lang: "json", code: QUOTE_RESPONSE }]} />
          <Callout tone="tip" title="Prices are in kobo">
            <p>
              <C>350000</C> means ₦3,500.00. All money in the API works this way. <A href="/docs/money">Why?</A>
            </p>
          </Callout>
        </WalkStep>

        <WalkStep
          id="book-the-delivery"
          n={4}
          title="Book the delivery"
          summary="Your order is booked and looking for a rider."
          checkKind="order"
          run={{ method: "POST", path: "/orders", body: { quote_id: SAMPLE_QUOTE, reference: "my-first-order" } }}
          tasks={[
            {
              id: "book-the-delivery:run",
              label: "Run the example above. If you pasted the last answer, it already has your quote id.",
            },
            {
              id: "book-the-delivery:worked",
              label: (
                <>
                  You got an order back, with <C>{'"status": "searching"'}</C>.
                </>
              ),
            },
          ]}
        >
          <P>
            Happy with the price? Turn the quote into an order. The price comes out of your wallet; test wallets start
            with play money, so there&apos;s nothing to top up.
          </P>
          <Code tabs={ORDER} />
          <P>
            <C>searching</C> means we&apos;re finding a rider. Your <C>reference</C> is yours to choose, like your own
            order number. Took more than 15 minutes? Go back a step for a fresh price.
          </P>
        </WalkStep>

        <WalkStep
          id="watch-it-arrive"
          n={5}
          title="Watch it arrive"
          summary="Delivered. That's a whole delivery."
          checkKind="delivered"
          run={{ method: "POST", path: `/test/orders/${SAMPLE_ORDER}/advance`, body: { to: "delivered" } }}
          checkPrompt="Paste what you got back, and we'll check it was delivered"
          tasks={[
            { id: "watch-it-arrive:run", label: "Run the example above to send the pretend rider all the way." },
            {
              id: "watch-it-arrive:worked",
              label: (
                <>
                  The order&apos;s status says <C>delivered</C>.
                </>
              ),
            },
          ]}
        >
          <P>
            In test mode, a pretend rider does the trip whenever you say. This moves your order straight to delivered.
            Leave out <C>to</C> to go one step at a time instead.
          </P>
          <Code tabs={ADVANCE} />
          <P>
            You can see it in the dashboard too: open <strong>Orders</strong>.
          </P>
        </WalkStep>
      </Walkthrough>
    </>
  );
}
