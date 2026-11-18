"use client";

import { useEffect, useState } from "react";

import type { Customer } from "@/lib/customers";
import { naira } from "@/lib/money";

import { quoteDelivery, type DeliveryQuote } from "./quote";

/** The delivery line of the checkout: asks for a price whenever the address changes. */
export function DeliveryFee({
  customer,
  onQuote,
}: {
  customer: Customer;
  onQuote: (quote: DeliveryQuote | null) => void;
}) {
  const [quote, setQuote] = useState<DeliveryQuote | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let current = true;
    setQuote(null);
    setFailed(false);
    onQuote(null);
    quoteDelivery(customer)
      .then((q) => {
        if (!current) return;
        setQuote(q);
        onQuote(q);
      })
      .catch(() => current && setFailed(true));
    return () => {
      current = false; // the address changed again before the answer came
    };
  }, [customer, onQuote]);

  if (failed)
    return <p role="alert">We can&apos;t deliver to this address. Try another?</p>;
  if (!quote) return <p>Delivery: working it out…</p>;
  return (
    <p>
      Delivery: <strong>{naira(quote.fee)}</strong>, about {quote.minutes} minutes on
      the road
    </p>
  );
}
