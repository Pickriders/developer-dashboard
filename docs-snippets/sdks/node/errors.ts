// @file src/book.ts
import {
  AuthenticationError,
  ConnectionError,
  InsufficientFundsError,
  InvalidRequestError,
  PickridersError,
  RateLimitError,
  type CreateOrderParams,
} from "pickriders";

import { pickriders } from "./pickriders";

export async function book(params: CreateOrderParams) {
  try {
    return await pickriders.orders.create(params);
  } catch (error) {
    if (error instanceof InvalidRequestError) {
      // error.param names the field, e.g. "stops.1.lat"; error.code is stable, e.g. "quote_expired".
      throw new Error(`Fix ${error.param ?? "the request"}: ${error.message}`);
    }
    if (error instanceof InsufficientFundsError)
      throw new Error("Top up the delivery wallet.");
    if (error instanceof AuthenticationError) throw new Error("Check PICKRIDERS_KEY.");
    if (error instanceof RateLimitError)
      throw new Error(`Busy. Try in ${error.retryAfter} s.`);
    if (error instanceof ConnectionError)
      throw new Error("Couldn't reach Pickriders. Retry later.");
    if (error instanceof PickridersError) console.error(error.code, error.requestId); // for support
    throw error;
  }
}
