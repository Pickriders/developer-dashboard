import { Blank } from "./blank";
import { A, H2, List, P } from "@/components/docs/prose";

export function Dpa() {
  return (
    <>
      <P>
        This agreement forms part of the <A href="/legal/terms">API Terms of Use</A> between your business (&ldquo;the
        controller&rdquo;) and <Blank>Pickriders legal entity name</Blank> (&ldquo;Pickriders&rdquo;, &ldquo;the
        processor&rdquo;). It applies when Pickriders processes personal data about your customers to carry out
        deliveries you book, and meets the requirements of the Nigeria Data Protection Act 2023 for processing on
        someone else&apos;s behalf.
      </P>

      <H2 id="scope">1. What is processed</H2>
      <List>
        <li>
          <strong>Whose data:</strong> the people at your pickups and drop-offs (usually your customers and your staff).
        </li>
        <li>
          <strong>What data:</strong> names, phone numbers, addresses and map positions, delivery notes, and proof of
          delivery (how the handover was confirmed, the name of who received it, when, and where the rider was).
        </li>
        <li>
          <strong>Why:</strong> to price, dispatch, carry out, track and support your deliveries, and to show you and
          the recipient their progress.
        </li>
        <li>
          <strong>How long:</strong> for as long as the order is kept in your account, then <Blank>period</Blank>; event
          and webhook records are deleted after 30 days.
        </li>
      </List>

      <H2 id="instructions">2. Your instructions</H2>
      <P>
        Pickriders processes this data only to deliver your orders and as these terms describe, unless the law requires
        otherwise (we&apos;ll tell you first where we&apos;re allowed to). Booking a delivery through the API or the
        dashboard is your instruction to process the details you send for it.
      </P>

      <H2 id="your-duties">3. Your responsibilities</H2>
      <P>
        You have a lawful basis to share the data, have told the people concerned that a delivery partner will contact
        them, and send only what a delivery needs.
      </P>

      <H2 id="our-duties">4. Our responsibilities</H2>
      <List>
        <li>
          Riders and staff who see the data are bound to keep it confidential, and see only what their part of the
          delivery needs (a rider sees the stops of the order they carry).
        </li>
        <li>
          We protect the data with appropriate technical and organisational measures, including those in the{" "}
          <A href="/legal/privacy">Privacy Notice</A>.
        </li>
        <li>We help you answer requests from the people concerned, and with assessments the law asks you to make.</li>
        <li>
          We tell you without undue delay, and within <Blank>hours, e.g. 48</Blank> hours of becoming aware, of a breach
          affecting this data.
        </li>
        <li>
          When the agreement ends, we delete or return the data as you choose, unless the law requires us to keep it.
        </li>
      </List>

      <H2 id="subprocessors">5. Sub-processors</H2>
      <P>
        You authorise Pickriders to use the following sub-processors, and the independent riders who carry your
        deliveries: <Blank>list of sub-processors (hosting, maps, SMS, email) and their locations</Blank>. We&apos;ll
        give you <Blank>notice period</Blank> notice of a new sub-processor so you can object, and impose the same data
        protection duties on them.
      </P>

      <H2 id="transfers">6. Transfers outside Nigeria</H2>
      <P>
        <Blank>Countries involved and the safeguard relied on under the NDPA</Blank>.
      </P>

      <H2 id="audits">7. Audits</H2>
      <P>
        On reasonable notice, and no more than once a year unless there has been a breach, we&apos;ll give you the
        information you need to show this agreement is being followed. <Blank>audit terms</Blank>.
      </P>

      <H2 id="liability">8. Liability and order of precedence</H2>
      <P>
        Liability under this agreement is subject to the limits in the API Terms of Use. If this agreement and the terms
        conflict about personal data, this agreement wins.
      </P>
    </>
  );
}
