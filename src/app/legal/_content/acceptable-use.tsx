import { Blank } from "./blank";
import { A, C, H2, List, P } from "@/components/docs/prose";

export function AcceptableUse() {
  return (
    <>
      <P>
        This policy is part of the <A href="/legal/terms">API Terms of Use</A>. It applies to everything sent through
        the Pickriders platform: the deliveries you book, the data you send, and how your software uses the API. Riders
        are real people on Nigerian roads; most of these rules exist to keep them, and your customers, safe.
      </P>

      <H2 id="items">1. Items you may not send</H2>
      <List>
        <li>Anything illegal to possess, sell or carry in Nigeria, or stolen.</li>
        <li>Weapons, ammunition, explosives, fireworks and their parts.</li>
        <li>Illegal drugs, and controlled or prescription medicines without the licences the law requires.</li>
        <li>Flammable, corrosive, toxic, radioactive or otherwise hazardous materials.</li>
        <li>Cash, cheques, bearer instruments or precious metals as the main item of a delivery.</li>
        <li>Live animals, and human or animal remains.</li>
        <li>
          Anything heavier, larger or more fragile than a rider can carry safely: <Blank>size and weight limits</Blank>.
        </li>
        <li>Anything else listed in the documentation for the service area.</li>
      </List>

      <H2 id="conduct">2. How you may not use the platform</H2>
      <List>
        <li>To harass, threaten or endanger riders or recipients, or to give them false information.</li>
        <li>
          To book deliveries you don&apos;t intend to hand over, or to waste riders&apos; time (repeated fake orders).
        </li>
        <li>For fraud, money laundering, or to get around sanctions or consumer protection law.</li>
        <li>
          To send personal data you have no lawful basis to share, or more than a delivery needs (a name, phone number
          and address are usually enough).
        </li>
        <li>To resell or white-label the API to others without our written agreement.</li>
      </List>

      <H2 id="technical">3. Technical rules</H2>
      <List>
        <li>Keep API keys on your servers, never in an app, a web page or a public repository.</li>
        <li>
          Stay within the rate limits, and wait for <C>Retry-After</C> when you get a 429.
        </li>
        <li>
          Don&apos;t scan, probe, load-test or try to break the platform, other teams&apos; data or Pickriders&apos;
          systems without our written agreement. If you find a security problem, report it to{" "}
          <Blank>security contact email</Blank>; we won&apos;t act against good-faith reports.
        </li>
        <li>Don&apos;t point webhook endpoints at systems you don&apos;t control.</li>
        <li>Use test mode for testing: don&apos;t create live orders you mean to cancel.</li>
      </List>

      <H2 id="enforcement">4. If the policy is broken</H2>
      <P>
        We may refuse or cancel a delivery, revoke a key, suspend live access or your whole team, and report illegal
        activity to the authorities. Where we can, we&apos;ll tell you what happened and how to put it right. Serious or
        repeated breaches can end your agreement.
      </P>

      <H2 id="report">5. Reporting misuse</H2>
      <P>
        If you see the platform being misused, tell us at <Blank>abuse contact email</Blank>.
      </P>
    </>
  );
}
