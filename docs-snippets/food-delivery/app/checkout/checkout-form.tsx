"use client";

import { useState, useTransition } from "react";

import { DEMO_CUSTOMERS } from "@/lib/customers";
import { naira } from "@/lib/money";

import { DeliveryFee } from "./delivery-fee";
import { placeOrder } from "./place-order";
import type { DeliveryQuote } from "./quote";

export function CheckoutForm({ foodTotal }: { foodTotal: number }) {
  const [customer, setCustomer] = useState(DEMO_CUSTOMERS[0]);
  const [quote, setQuote] = useState<DeliveryQuote | null>(null);
  const [paying, startPaying] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (quote) startPaying(() => placeOrder(customer, quote.quote_id));
      }}
    >
      <fieldset>
        <legend>Deliver to</legend>
        {DEMO_CUSTOMERS.map((c) => (
          <label key={c.phone}>
            <input
              type="radio"
              checked={c === customer}
              onChange={() => setCustomer(c)}
            />
            {c.name}, {c.address}
          </label>
        ))}
      </fieldset>

      <p>Food: {naira(foodTotal)}</p>
      <DeliveryFee customer={customer} onQuote={setQuote} />

      <button type="submit" disabled={!quote || paying}>
        {paying ? "Paying…" : quote ? `Pay ${naira(foodTotal + quote.fee)}` : "Pay"}
      </button>
    </form>
  );
}
