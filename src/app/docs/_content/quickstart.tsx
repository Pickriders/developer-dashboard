import { GET_A_KEY } from "@/components/docs/docs-header";
import { Code, type CodeTab } from "@/components/docs/code";
import { A, C, Callout, NextCard, P, Step, Steps } from "@/components/docs/prose";
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

export function Quickstart() {
  return (
    <>
      <P>
        You&apos;ll book a pretend delivery across Lagos and watch it arrive. Nothing here costs real money or sends a
        real rider. Pick your language once, below, and every example follows.
      </P>

      <Steps>
        <Step title="Get your test key">
          <P>
            <A href={GET_A_KEY}>Sign up</A> (it&apos;s free), then open <strong>API keys</strong> and press{" "}
            <strong>Create key</strong>. Copy the key that starts with <C>sk_test_</C>. You only see it once.
          </P>
          <P>Keep it somewhere your code can read it, like an environment variable:</P>
          <Code tabs={KEY} />
          <Callout tone="warning" title="Your key is a password">
            <p>Keep it on your server. Never put it in a website, an app or a public code repository.</p>
          </Callout>
        </Step>

        <Step title="Check it works">
          <P>Send one tiny request. If you get an answer, your key works.</P>
          <Code tabs={PING} />
          <P>
            Got <C>api_key_invalid</C> instead? Copy the key again: it&apos;s easy to miss a character. Every error is
            explained on the <A href="/docs/errors">errors page</A>.
          </P>
        </Step>

        <Step title="Ask for a price">
          <P>
            Tell us the two stops: where the rider picks up and where they drop off. Each stop needs an address, its map
            position (<C>lat</C> and <C>lng</C>) and who the rider meets there.
          </P>
          <Code tabs={QUOTE} />
          <P>We answer with a quote. The price is held for 15 minutes:</P>
          <Code tabs={[{ label: "Response", lang: "json", code: QUOTE_RESPONSE }]} />
          <Callout tone="tip" title="Prices are in kobo">
            <p>
              <C>350000</C> means ₦3,500.00. All money in the API works this way. <A href="/docs/money">Why?</A>
            </p>
          </Callout>
        </Step>

        <Step title="Book the delivery">
          <P>
            Happy with the price? Turn the quote into an order. The price comes out of your wallet. Test wallets start
            with play money, so there&apos;s nothing to top up.
          </P>
          <Code tabs={ORDER} />
          <P>
            The order&apos;s <C>status</C> is <C>searching</C>: we&apos;re finding a rider. Your <C>reference</C> is
            yours to choose, like your own order number.
          </P>
        </Step>

        <Step title="Watch it arrive">
          <P>
            In test mode a pretend rider does the trip whenever you say. Move the order straight to delivered (or leave
            out <C>to</C> to go one step at a time):
          </P>
          <Code tabs={ADVANCE} />
          <P>
            That&apos;s a whole delivery. You can see it in the dashboard too, on the <strong>Orders</strong> page.
          </P>
        </Step>
      </Steps>

      <Callout tone="tip" title="You did it">
        <p>
          You priced, booked and delivered an order with three requests. Live orders work the same way, with a live key.
        </p>
      </Callout>

      <h2 id="whats-next" className="mb-4 mt-12 text-[1.4rem] font-extrabold tracking-tight text-fg-heading">
        What&apos;s next
      </h2>
      <div className="grid gap-3">
        <NextCard href="/docs/webhooks" title="Hear about every step">
          Instead of asking for the status, let us tell your server the moment it changes.
        </NextCard>
        <NextCard href="/docs/test-and-live" title="Go live">
          When you&apos;re ready for real riders: what Pickriders checks, and how long it takes.
        </NextCard>
      </div>
    </>
  );
}
