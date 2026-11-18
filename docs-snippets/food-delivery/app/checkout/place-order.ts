"use server";

import { redirect } from "next/navigation";
import {
  InsufficientFundsError,
  InvalidRequestError,
  type CreateOrderParams,
  type TestOptions,
} from "pickriders";

import type { Customer } from "@/lib/customers";
import { CART, cartTotal } from "@/lib/menu";
import { pickriders, testMode } from "@/lib/pickriders";
import { createOrder, updateOrder, type FoodOrder } from "@/lib/store";
import { syncDelivery } from "@/lib/sync-delivery";

import { quoteDelivery } from "./quote";

/** The customer pressed Pay. */
export async function placeOrder(customer: Customer, quoteId: string) {
  // Take the payment here (Paystack, Flutterwave…). This tutorial pretends it went through.
  const order = createOrder({
    items: CART,
    food_total: cartTotal(),
    customer,
    status: "paid",
  });

  try {
    syncDelivery(await bookDelivery(order, quoteId));
  } catch (error) {
    if (!(error instanceof InsufficientFundsError)) throw error;
    // Our delivery wallet is empty. The customer has paid, so keep the order and fix it fast.
    console.error(`Top up the Pickriders wallet: ${order.id} has no rider booked.`);
    updateOrder(order.id, { status: "delivery_problem" });
  }
  redirect(`/orders/${order.id}`);
}

/** Books the rider at the price the customer saw, but holds them until the food is ready. */
async function bookDelivery(order: FoodOrder, quoteId: string) {
  const params = (quote_id: string): CreateOrderParams => ({
    quote_id,
    dispatch: "manual", // no rider yet: the kitchen calls one when the food is packed
    reference: order.id, // our id, unique: find the delivery by it in the dashboard
    metadata: { food_order: order.id }, // comes back on every webhook
    test_options: rehearsal(), // part 6; nothing unless you're rehearsing
  });

  try {
    // The same key twice books once: a double click or a retry can't send two riders.
    return await pickriders.orders.create(params(quoteId), {
      idempotencyKey: `book-${order.id}`,
    });
  } catch (error) {
    // Checkout took longer than the quote's 15 minutes: price it again and book that.
    if (error instanceof InvalidRequestError && error.code === "quote_expired") {
      const fresh = await quoteDelivery(order.customer);
      return pickriders.orders.create(params(fresh.quote_id), {
        idempotencyKey: `book-${order.id}-requoted`,
      });
    }
    throw error;
  }
}

/** Part 6: `REHEARSE=no_riders yarn dev` makes test deliveries go wrong on purpose. */
const rehearsal = (): TestOptions | undefined =>
  testMode && process.env.REHEARSE
    ? { scenario: process.env.REHEARSE as TestOptions["scenario"] }
    : undefined;
