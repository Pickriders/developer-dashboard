import { Blank } from "./blank";
import { A, H2, List, P, Table } from "@/components/docs/prose";

export function Privacy() {
  return (
    <>
      <P>
        This notice explains how <Blank>Pickriders legal entity name</Blank> (&ldquo;Pickriders&rdquo;) handles personal
        data for the developer platform: the developer dashboard, the Developer API and its documentation. We do this in
        line with the Nigeria Data Protection Act 2023 (NDPA) and the Nigeria Data Protection Regulation 2019, overseen
        by the Nigeria Data Protection Commission (NDPC).
      </P>
      <P>
        There are two roles. For <strong>your account</strong> (you and your teammates), Pickriders is the data
        controller, and this notice applies. For <strong>your customers</strong> whose deliveries you book, you are the
        controller and we process their data for you under the <A href="/legal/dpa">Data Processing Agreement</A>.
      </P>

      <H2 id="what">1. What we collect, and why</H2>
      <Table
        head={["Data", "Why", "Lawful basis"]}
        rows={[
          [
            "Name, work email, phone number, password (stored only as a hash)",
            "To create and secure your account, sign you in, and verify your email and phone",
            "Contract",
          ],
          [
            "Your business's details: name, company, website, support contacts, what you deliver, expected volume",
            "To review live access and to contact your business",
            "Contract; legitimate interest in preventing fraud",
          ],
          [
            "Team membership, roles and an audit trail of changes",
            "So your team can work together and see who changed what",
            "Contract",
          ],
          [
            "API request logs: time, route, response, IP address, user agent and request bodies with sensitive fields removed",
            "To show you your own request log, debug problems and protect the platform",
            "Contract; legitimate interest in security",
          ],
          [
            "Wallet and payment records; a saved card's brand and last four digits (the card itself stays with our payment provider)",
            "To take payment and keep financial records",
            "Contract; legal obligation",
          ],
          [
            "Messages you send to support, and emails we send you",
            "To help you and keep a record",
            "Contract; legitimate interest",
          ],
        ]}
      />

      <H2 id="sharing">2. Who we share it with</H2>
      <P>
        We don&apos;t sell personal data. We share it only with service providers who help us run the platform, under
        contract and only for that purpose:
      </P>
      <List>
        <li>
          Payment processing: <Blank>e.g. Paystack</Blank>.
        </li>
        <li>
          Email and SMS delivery: <Blank>email provider, SMS provider (e.g. Termii)</Blank>.
        </li>
        <li>
          Hosting and databases: <Blank>cloud and database providers, and where they store data</Blank>.
        </li>
        <li>Anyone the law requires us to share with, such as a regulator or a court.</li>
      </List>

      <H2 id="transfers">3. Data outside Nigeria</H2>
      <P>
        <Blank>
          Where data is stored or processed outside Nigeria, the countries involved and the safeguard relied on under
          the NDPA (adequacy decision, or contractual clauses)
        </Blank>
        .
      </P>

      <H2 id="retention">4. How long we keep it</H2>
      <List>
        <li>API request logs, webhook deliveries and events: 30 days, then deleted automatically.</li>
        <li>
          Account and team details: while your account is open, then <Blank>period</Blank>.
        </li>
        <li>
          Financial records: <Blank>period required by tax and accounting law</Blank>.
        </li>
        <li>
          Audit trail of team changes: <Blank>period</Blank>.
        </li>
      </List>

      <H2 id="security">5. Security</H2>
      <P>
        API keys are stored only as keyed hashes and shown once; webhook signing secrets are encrypted at rest; sessions
        live in cookies page scripts can&apos;t read; every team&apos;s data is kept apart and access is tested on every
        change. If a breach puts your personal data at risk, we&apos;ll tell you and the NDPC as the law requires.
      </P>

      <H2 id="rights">6. Your rights</H2>
      <P>Under the NDPA you can ask us to:</P>
      <List>
        <li>tell you what personal data we hold about you and give you a copy;</li>
        <li>correct it, or delete it where we no longer need it;</li>
        <li>stop or restrict processing, or object to processing based on legitimate interest;</li>
        <li>give it to you, or another provider, in a machine-readable form;</li>
        <li>withdraw consent where we rely on it.</li>
      </List>
      <P>
        Most details you can change yourself in the dashboard&apos;s settings. For anything else, write to our Data
        Protection Officer at <Blank>DPO email</Blank>; we answer within <Blank>response time, e.g. 30 days</Blank>. You
        may also complain to the Nigeria Data Protection Commission.
      </P>

      <H2 id="changes">7. Changes</H2>
      <P>We&apos;ll post changes here and email you about important ones.</P>

      <H2 id="contact">8. Contact</H2>
      <P>
        <Blank>Pickriders legal entity name, registered address, DPO name and email</Blank>.
      </P>
    </>
  );
}
