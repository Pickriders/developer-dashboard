"use server";

import { dropoffFor, type Customer } from "@/lib/customers";
import { KITCHEN, SERVICE_AREA } from "@/lib/kitchen";
import { pickriders } from "@/lib/pickriders";

export type DeliveryQuote = {
  quote_id: string;
  /** Kobo. */
  fee: number;
  /** About how long the ride takes, once a rider has the food. */
  minutes: number;
  expires_at: string;
};

/** What delivery to this customer costs. Pickriders holds the price for 15 minutes. */
export async function quoteDelivery(customer: Customer): Promise<DeliveryQuote> {
  const quote = await pickriders.quotes.create({
    type: "single",
    service_area: SERVICE_AREA,
    stops: [KITCHEN, dropoffFor(customer)],
  });
  return {
    quote_id: quote.id,
    fee: quote.recommended_price,
    minutes: Math.ceil(quote.duration_s / 60),
    expires_at: quote.expires_at,
  };
}
