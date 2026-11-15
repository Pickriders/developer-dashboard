import { GET_A_KEY } from "@/components/docs/docs-header";
import { Code } from "@/components/docs/code";
import { A, C, Callout, H2, List, P, Table } from "@/components/docs/prose";
import { PUBLIC_API_BASE as BASE } from "@/constant";

export function TestAndLive() {
  return (
    <>
      <P>
        Pickriders has two worlds that never mix. You build in <strong>test mode</strong>, then switch to{" "}
        <strong>live mode</strong> when you&apos;re ready for real deliveries.
      </P>
      <Table
        head={["", "Test mode", "Live mode"]}
        rows={[
          ["Your key starts with", <C key="t">sk_test_</C>, <C key="l">sk_live_</C>],
          ["Money", "Play money. Top up as much as you like.", "Real money from your wallet."],
          ["Riders", "A pretend rider you move along yourself.", "Real riders on real roads."],
          ["Who can use it", "Everyone, straight after sign-up.", "Teams Pickriders has approved."],
        ]}
      />
      <P>
        Orders, keys, webhooks and wallets in one mode can&apos;t see the other. A test key never finds a live order, so
        you can&apos;t mix them up by accident.
      </P>

      <H2>Going live</H2>
      <P>Live mode opens after three small steps, all in the dashboard:</P>
      <List ordered>
        <li>Verify your email and phone number (we send each a code).</li>
        <li>
          Press <strong>Request live access</strong> and tell us, in a sentence or two, what you&apos;ll deliver.
        </li>
        <li>A Pickriders admin reviews it, usually within a working day. We email the team owner the answer.</li>
      </List>
      <P>
        Then create a live key and swap it in. Nothing else in your code changes: the same requests work in both modes.
      </P>
      <Callout tone="tip" title="Before you switch">
        <p>
          Top up your live wallet first, and point a live webhook endpoint at your server. Live and test endpoints are
          separate.
        </p>
      </Callout>
    </>
  );
}

export function Authentication() {
  return (
    <>
      <P>
        Every request needs your secret key, sent in the <C>Authorization</C> header after the word <C>Bearer</C>:
      </P>
      <Code
        tabs={[
          {
            label: "curl",
            lang: "bash",
            code: `curl ${BASE}/account \\\n  -H "Authorization: Bearer sk_test_..."`,
          },
        ]}
      />
      <P>
        The key also decides the mode: <C>sk_test_</C> keys work in test mode, <C>sk_live_</C> keys in live mode. Create
        and manage keys on the dashboard&apos;s <strong>API keys</strong> page. <A href={GET_A_KEY}>Get one</A>.
      </P>

      <H2>Keep it secret</H2>
      <List>
        <li>Only use it from your server. A key in a website or a phone app can be copied by anyone.</li>
        <li>Never commit it to a code repository. Read it from an environment variable.</li>
        <li>We show a new key once. If you lose it, create another.</li>
      </List>

      <H2>When a key leaks</H2>
      <P>Open it in the dashboard and choose one:</P>
      <Table
        head={["Action", "What happens"]}
        rows={[
          [
            <strong key="r">Roll</strong>,
            "You get a new key. The old one keeps working for the time you pick, so you can swap it without downtime.",
          ],
          [<strong key="v">Revoke</strong>, "The key stops working straight away. Use this if someone else has it."],
        ]}
      />

      <H2>Smaller keys</H2>
      <P>
        A key can be limited to some parts of the API (its <strong>scopes</strong>), like reading orders but not
        creating them. A request outside its scopes gets{" "}
        <A href="/docs/errors#insufficient_scope">insufficient_scope</A>. You can also allow keys only from your
        servers&apos; IP addresses, in <strong>Settings</strong>.
      </P>
    </>
  );
}

export function Money() {
  return (
    <>
      <P>
        Every amount in the API is a whole number of <strong>kobo</strong>, the smallest piece of a naira. There are 100
        kobo in ₦1.
      </P>
      <Table
        head={["The API says", "That means"]}
        rows={[
          [<C key="a">350000</C>, "₦3,500.00"],
          [<C key="b">100</C>, "₦1.00"],
          [<C key="c">2500050</C>, "₦25,000.50"],
        ]}
      />
      <P>
        Whole numbers never round wrongly, unlike decimals such as 0.1 + 0.2. To show an amount, divide by 100. To send
        one, multiply by 100.
      </P>
      <Code
        tabs={[
          {
            label: "Node.js",
            lang: "javascript",
            code: `const naira = (kobo) => kobo / 100;\nconst kobo = (naira) => Math.round(naira * 100);`,
          },
          {
            label: "Python",
            lang: "python",
            code: `def naira(kobo):\n    return kobo / 100\n\ndef kobo(naira):\n    return round(naira * 100)`,
          },
          {
            label: "PHP",
            lang: "php",
            code: `function naira($kobo) { return $kobo / 100; }\nfunction kobo($naira) { return (int) round($naira * 100); }`,
          },
        ]}
      />

      <H2>Your wallet</H2>
      <P>
        Orders are paid from a wallet you top up in advance. When you book an order, its price is <strong>held</strong>:
        set aside, not spent. It&apos;s taken when the order is delivered, and given back if it&apos;s cancelled. So
        your <C>available</C> balance is your balance minus what&apos;s held.
      </P>
      <Callout tone="note">
        <p>
          Not enough in the wallet? Creating the order fails with{" "}
          <A href="/docs/errors#insufficient_funds">insufficient_funds</A>, and the message says how much more you need.
        </p>
      </Callout>
    </>
  );
}
