import { Code } from "@/components/docs/code";
import { A, C, Callout, H2, List, P, Table } from "@/components/docs/prose";

/** Every event type, as backend-api's WEBHOOK_EVENT_TYPES lists them. */
const EVENTS: [string, string][] = [
  ["order.created", "You created an order."],
  ["order.searching", "We're looking for a rider."],
  ["order.offer.created", "A rider made an offer (bidding orders)."],
  ["order.offer.expired", "An offer ran out before you answered."],
  ["order.rider_assigned", "A rider took the order."],
  ["order.rider_changed", "A different rider took over."],
  ["order.picked_up", "The rider has the parcel."],
  ["order.stop.arrived", "The rider reached a stop."],
  ["order.stop.completed", "A stop is done."],
  ["order.delivered", "Every drop-off is done."],
  ["order.cancelled", "The order was cancelled."],
  ["order.failed", "We couldn't deliver it."],
  ["wallet.funded", "Money came into your wallet."],
  ["wallet.balance_low", "Your wallet dropped below your alert amount."],
  ["account.updated", "Something about your account changed, like live access."],
];

const EVENT = `{
  "object": "event",
  "id": "evt_6560f0c2a1b2c3d4e5f60718",
  "type": "order.delivered",
  "created": "2026-11-15T12:34:56.000Z",
  "livemode": false,
  "data": {
    "object": { "object": "order", "id": "ord_6560f0c2a1b2c3d4e5f60719", "status": "delivered" }
  }
}`;

const NODE = `import crypto from "node:crypto";
import express from "express";

const app = express();
const secret = process.env.PICKRIDERS_WEBHOOK_SECRET; // whsec_…

// Read the raw body: the signature is made from the exact bytes we sent.
app.post("/pickriders/webhooks", express.raw({ type: "application/json" }), (req, res) => {
  const header = req.get("Pickriders-Signature") ?? "";
  const parts = header.split(",").map((p) => p.split("="));
  const t = Number(parts.find(([k]) => k === "t")?.[1]);
  const signatures = parts.filter(([k]) => k === "v1").map(([, v]) => v);

  const expected = crypto.createHmac("sha256", secret).update(\`\${t}.\${req.body}\`).digest("hex");
  const fresh = Math.abs(Date.now() / 1000 - t) < 300;
  const ok = signatures.some(
    (s) => s.length === expected.length && crypto.timingSafeEqual(Buffer.from(s), Buffer.from(expected)),
  );
  if (!fresh || !ok) return res.status(400).send("bad signature");

  const event = JSON.parse(req.body);
  res.sendStatus(200); // answer first, then do the work
  console.log(event.type, event.data.object.id);
});`;

const PYTHON = `import hashlib, hmac, json, os, time
from flask import Flask, request

app = Flask(__name__)
secret = os.environ["PICKRIDERS_WEBHOOK_SECRET"].encode()  # whsec_…

@app.post("/pickriders/webhooks")
def pickriders_webhook():
    body = request.get_data()  # the raw bytes, not parsed JSON
    parts = [p.split("=", 1) for p in request.headers.get("Pickriders-Signature", "").split(",")]
    t = next((v for k, v in parts if k == "t"), "0")
    signatures = [v for k, v in parts if k == "v1"]

    expected = hmac.new(secret, f"{t}.".encode() + body, hashlib.sha256).hexdigest()
    fresh = abs(time.time() - int(t)) < 300
    if not fresh or not any(hmac.compare_digest(s, expected) for s in signatures):
        return "bad signature", 400

    event = json.loads(body)
    print(event["type"], event["data"]["object"]["id"])
    return "", 200`;

const PHP = `<?php
$secret = getenv("PICKRIDERS_WEBHOOK_SECRET"); // whsec_…
$body = file_get_contents("php://input"); // the raw body
$header = $_SERVER["HTTP_PICKRIDERS_SIGNATURE"] ?? "";

$t = 0;
$signatures = [];
foreach (explode(",", $header) as $part) {
    [$key, $value] = array_pad(explode("=", $part, 2), 2, "");
    if ($key === "t") $t = (int) $value;
    if ($key === "v1") $signatures[] = $value;
}

$expected = hash_hmac("sha256", $t . "." . $body, $secret);
$fresh = abs(time() - $t) < 300;
$ok = count(array_filter($signatures, fn ($s) => hash_equals($expected, $s))) > 0;
if (!$fresh || !$ok) {
    http_response_code(400);
    exit("bad signature");
}

$event = json_decode($body, true);
http_response_code(200);`;

const GO = `func pickridersWebhook(w http.ResponseWriter, r *http.Request) {
	secret := os.Getenv("PICKRIDERS_WEBHOOK_SECRET") // whsec_…
	body, _ := io.ReadAll(r.Body) // the raw body

	var t string
	var signatures []string
	for _, part := range strings.Split(r.Header.Get("Pickriders-Signature"), ",") {
		kv := strings.SplitN(part, "=", 2)
		if len(kv) != 2 { continue }
		if kv[0] == "t" { t = kv[1] }
		if kv[0] == "v1" { signatures = append(signatures, kv[1]) }
	}

	mac := hmac.New(sha256.New, []byte(secret))
	mac.Write([]byte(t + "."))
	mac.Write(body)
	expected := hex.EncodeToString(mac.Sum(nil))

	ts, _ := strconv.ParseInt(t, 10, 64)
	fresh := math.Abs(float64(time.Now().Unix()-ts)) < 300
	ok := false
	for _, s := range signatures {
		if hmac.Equal([]byte(s), []byte(expected)) { ok = true }
	}
	if !fresh || !ok {
		http.Error(w, "bad signature", http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusOK)
}`;

export function Webhooks() {
  return (
    <>
      <P>
        Instead of asking &ldquo;has it been delivered yet?&rdquo; over and over, give us a web address on your server.
        We&apos;ll send a short message, an <strong>event</strong>, to it every time something happens.
      </P>

      <H2>1. Add your endpoint</H2>
      <P>
        In the dashboard, open <strong>Webhooks</strong> and press <strong>Add endpoint</strong>. Paste your URL (it
        must start with <C>https://</C>) and choose which events you want, or all of them. We show you a{" "}
        <strong>signing secret</strong> starting <C>whsec_</C>: save it, you&apos;ll use it in step 3.
      </P>
      <Callout tone="tip" title="Building on your laptop?">
        <p>
          We can&apos;t reach <C>localhost</C>. Use a tunnel like ngrok or Cloudflare Tunnel to get a public https URL
          for your machine, then press <strong>Send test event</strong>.
        </p>
      </Callout>

      <H2>2. Read the event</H2>
      <P>
        Each event is a <C>POST</C> with a JSON body. <C>type</C> says what happened, <C>data.object</C> is the thing it
        happened to:
      </P>
      <Code tabs={[{ label: "Event", lang: "json", code: EVENT }]} />
      <P>
        Answer with any <C>2xx</C> status within 10 seconds, then do your work. If you don&apos;t, we try again after 1
        minute, 5 minutes, 30 minutes, 2 hours, 5 hours, 10 hours, then every 12 hours, for up to 3 days.
      </P>
      <List>
        <li>
          The same event can arrive twice. Use its <C>id</C> to skip ones you&apos;ve already handled.
        </li>
        <li>Events can arrive out of order. Check the order&apos;s current status if the order matters to you.</li>
        <li>An endpoint that fails for 3 days in a row is turned off, and the team owner gets an email.</li>
      </List>

      <H2>3. Check it came from us</H2>
      <P>
        Anyone could send a message to your URL, so check the <C>Pickriders-Signature</C> header before trusting one. It
        looks like <C>t=1763210096,v1=5257a8…</C>: a time, and a signature made with your secret.
      </P>
      <List ordered>
        <li>
          Join the time, a dot and the raw body: <C>{'1763210096.{"object":"event",…}'}</C>.
        </li>
        <li>Make an HMAC-SHA256 of that with your secret, in hex.</li>
        <li>
          It must equal one of the <C>v1</C> values, and the time must be within 5 minutes of now.
        </li>
      </List>
      <Code
        tabs={[
          { label: "Node.js", lang: "javascript", code: NODE },
          { label: "Python", lang: "python", code: PYTHON },
          { label: "PHP", lang: "php", code: PHP },
          { label: "Go", lang: "go", code: GO },
        ]}
      />
      <Callout tone="warning" title="Use the raw body">
        <p>
          Check the signature against the bytes exactly as they arrived. Parsing the JSON and turning it back into text
          changes the spacing, and the signature won&apos;t match.
        </p>
      </Callout>
      <P>
        Rolling your secret? For 24 hours each event carries two <C>v1</C> signatures, one per secret, so either works
        while you swap it.
      </P>

      <H2>Every event</H2>
      <Table
        head={["Type", "When"]}
        rows={EVENTS.map(([type, when]) => [
          <A key={type} href={`/docs/events/${type.replace(/\./g, "-")}`}>
            {type}
          </A>,
          when,
        ])}
      />
      <P>
        Events are kept for 30 days. You can list them with <C>GET /events</C> and send one again from the dashboard, or
        with <C>POST /events/{"{id}"}/resend</C>. More in <A href="/docs/api">all endpoints</A>.
      </P>
    </>
  );
}
