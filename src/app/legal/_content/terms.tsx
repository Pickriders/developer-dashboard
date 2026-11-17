import { Blank } from "./blank";
import { A, H2, List, P } from "@/components/docs/prose";

export function Terms() {
  return (
    <>
      <P>
        These terms are an agreement between the business you sign up for (&ldquo;you&rdquo;) and{" "}
        <Blank>Pickriders legal entity name, RC number</Blank>, of <Blank>registered address</Blank>{" "}
        (&ldquo;Pickriders&rdquo;, &ldquo;we&rdquo;). They cover the Pickriders Developer API, the developer dashboard
        and the documentation (together, &ldquo;the platform&rdquo;). By creating an account you accept them on behalf
        of that business, and confirm you&apos;re allowed to.
      </P>

      <H2 id="the-service">1. What we provide</H2>
      <P>
        The platform lets your software quote, book, track and cancel deliveries carried out by riders on the Pickriders
        network, and receive updates about them. Test mode is free and never sends a real rider or moves real money.
        Live mode is available once we approve your team, and sends real riders and charges your wallet.
      </P>

      <H2 id="your-account">2. Your account and keys</H2>
      <List>
        <li>Give us accurate details about your business, and keep them up to date.</li>
        <li>
          You&apos;re responsible for everything done with your team&apos;s accounts and API keys. Keep keys secret, on
          your servers only, and revoke a key at once if you think it has leaked.
        </li>
        <li>
          Invite only people who work for or with your business, with the least access their work needs. You&apos;re
          responsible for what your team members do.
        </li>
      </List>

      <H2 id="live-access">3. Live access</H2>
      <P>
        We review each team before live mode works and may ask for more information. We may refuse, suspend or end live
        access, or suspend your team, if we reasonably believe you&apos;ve broken these terms or the{" "}
        <A href="/legal/acceptable-use">Acceptable Use Policy</A>, or to protect riders, recipients, other customers or
        Pickriders. We&apos;ll tell you why, unless the law or an investigation prevents it.
      </P>

      <H2 id="money">4. Prices, your wallet and payment</H2>
      <List>
        <li>
          Each delivery&apos;s price is shown before you book it (a quote, or the price returned when you create the
          order). Live orders are paid from your team&apos;s prepaid wallet; the price is held when you book and charged
          when the order ends.
        </li>
        <li>
          Cancellation and failed deliveries are charged as described in the documentation at the time you book. Money
          in your wallet is not interest-bearing and is not a deposit account.
        </li>
        <li>
          Wallet top-ups by card or transfer are processed by our payment partners. We may change prices for future
          orders with at least <Blank>notice period, e.g. 30 days</Blank>&apos; notice.
        </li>
        <li>
          Refunds of unused wallet balance on closing your account: <Blank>refund terms</Blank>.
        </li>
      </List>

      <H2 id="your-customers">5. Your customers and their data</H2>
      <P>
        You decide what deliveries to book and what recipient details to send. You must have a lawful basis to share
        those details with us and tell your customers that Pickriders delivers for you. For live deliveries we process
        your customers&apos; personal data on your behalf under the <A href="/legal/dpa">Data Processing Agreement</A>,
        which forms part of these terms. Our own use of personal data is described in the{" "}
        <A href="/legal/privacy">Privacy Notice</A>.
      </P>

      <H2 id="items">6. What can be delivered</H2>
      <P>
        Only items allowed by law and by the <A href="/legal/acceptable-use">Acceptable Use Policy</A>. Our liability
        for loss of or damage to items in transit is limited to <Blank>item liability limit and claims process</Blank>.
      </P>

      <H2 id="api-use">7. Using the API</H2>
      <List>
        <li>Stay within the published rate limits, and back off when told to.</li>
        <li>
          Don&apos;t try to get around security, limits, test-mode restrictions or another team&apos;s data, and
          don&apos;t probe or load-test the platform without our written agreement.
        </li>
        <li>
          We may change the API. We follow the <A href="/docs/versioning">versioning policy</A>: breaking changes come
          with notice, and we&apos;ll tell you by email and in the changelog.
        </li>
      </List>

      <H2 id="availability">8. Availability and support</H2>
      <P>
        We work to keep the platform available and publish incidents on our status page, but don&apos;t promise it will
        be uninterrupted or error-free. Support is by email at <Blank>developer support email</Blank>.{" "}
        <Blank>Any service level, if offered</Blank>.
      </P>

      <H2 id="ip">9. Intellectual property and feedback</H2>
      <P>
        The platform and documentation are ours or our licensors&apos;. We give you a limited, non-exclusive,
        non-transferable right to use them for your business while these terms apply. Your data stays yours. If you send
        us feedback, we may use it without obligation to you.
      </P>

      <H2 id="liability">10. Liability</H2>
      <P>
        <Blank>
          Warranty disclaimer, exclusion of indirect and consequential loss, overall liability cap (e.g. fees paid in
          the previous 12 months), and what is not limited by law
        </Blank>
        .
      </P>
      <P>
        You&apos;ll compensate Pickriders for losses arising from your breach of these terms, the items you send, or
        your use of personal data you didn&apos;t have the right to share. <Blank>indemnity wording</Blank>.
      </P>

      <H2 id="ending">11. Ending the agreement</H2>
      <P>
        You can stop using the platform and close your team at any time. We may end these terms with{" "}
        <Blank>notice period</Blank>&apos; notice, or straight away for a serious breach. Orders already booked are
        completed or cancelled as the documentation describes, and any remaining wallet balance is handled as in section
        4.
      </P>

      <H2 id="changes">12. Changes to these terms</H2>
      <P>
        We may update these terms. For material changes we&apos;ll give at least <Blank>notice period</Blank>&apos;
        notice by email and on this page. Continuing to use the platform after that means you accept the new terms.
      </P>

      <H2 id="law">13. Law and disputes</H2>
      <P>
        These terms are governed by the laws of the Federal Republic of Nigeria.{" "}
        <Blank>Dispute resolution: courts or arbitration, and the seat</Blank>.
      </P>

      <H2 id="contact">14. Contact</H2>
      <P>
        <Blank>legal contact email and postal address</Blank>.
      </P>
    </>
  );
}
