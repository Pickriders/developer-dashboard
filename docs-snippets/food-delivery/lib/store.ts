import "server-only";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import type { OrderStatus } from "pickriders";

import type { Customer } from "./customers";

/** A customer's order at Mama's Kitchen, with the delivery Pickriders is doing for it. */
export type FoodOrder = {
  id: string;
  items: { name: string; price: number; quantity: number }[];
  food_total: number;
  customer: Customer;
  /** Where the order is, in the words the customer sees. */
  status:
    "paid" | "ready" | "on_the_way" | "delivered" | "delivery_problem" | "cancelled";
  /** How many deliveries we've booked for it (part 6 books a second if the first falls through). */
  delivery_attempts: number;
  delivery?: {
    id: string;
    number: string;
    status: OrderStatus;
    tracking_url: string;
    fee: number;
    rider: string | null;
    /** What a cancellation cost us, in kobo. */
    charged: number | null;
    /** The delivery's own `updated`: an older update never overwrites a newer one. */
    updated: string;
  };
  created: string;
};

// A JSON file stands in for your database, so the tutorial needs nothing else. It survives
// restarts and is shared by every part of the app. Use a real database in production.
const FILE = path.join(process.cwd(), ".data", "orders.json");

const readAll = (): Record<string, FoodOrder> =>
  existsSync(FILE) ? JSON.parse(readFileSync(FILE, "utf8")) : {};

function writeAll(orders: Record<string, FoodOrder>) {
  mkdirSync(path.dirname(FILE), { recursive: true });
  writeFileSync(FILE, JSON.stringify(orders, null, 2));
}

export const listOrders = () =>
  Object.values(readAll()).sort((a, b) => b.created.localeCompare(a.created));

export const getOrder = (id: string): FoodOrder | undefined => readAll()[id];

export function createOrder(
  order: Omit<FoodOrder, "id" | "created" | "delivery_attempts">,
): FoodOrder {
  const orders = readAll();
  const id = `mk_${1001 + Object.keys(orders).length}`;
  orders[id] = {
    ...order,
    id,
    delivery_attempts: 0,
    created: new Date().toISOString(),
  };
  writeAll(orders);
  return orders[id];
}

export function updateOrder(id: string, change: Partial<FoodOrder>): FoodOrder {
  const orders = readAll();
  orders[id] = { ...orders[id], ...change };
  writeAll(orders);
  return orders[id];
}
