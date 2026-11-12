import type { CreateDeveloperApiKeyRequestDto } from "@/services/apiService";

export type Scope = NonNullable<CreateDeveloperApiKeyRequestDto["scopes"]>[number];
export type Level = "none" | "read" | "write";

/** What a restricted key can reach, one row per resource. A :write scope includes :read (the API's rule). */
export const RESOURCES = [
  {
    id: "orders",
    label: "Orders",
    hint: "Quotes, orders, tracking and proof of delivery",
    levels: ["none", "read", "write"],
  },
  { id: "wallet", label: "Wallet", hint: "Balance, transactions and top-ups", levels: ["none", "read", "write"] },
  { id: "webhooks", label: "Webhooks", hint: "Webhook endpoints", levels: ["none", "read", "write"] },
  { id: "events", label: "Events", hint: "The event log", levels: ["none", "read"] },
  { id: "account", label: "Account", hint: "Your team's profile", levels: ["none", "read", "write"] },
] as const satisfies readonly { id: string; label: string; hint: string; levels: readonly Level[] }[];

export type ResourceId = (typeof RESOURCES)[number]["id"];
export type Levels = Record<ResourceId, Level>;

export const NO_ACCESS: Levels = { orders: "none", wallet: "none", webhooks: "none", events: "none", account: "none" };

/** The scopes to send for these levels. */
export const scopesFor = (levels: Levels): Scope[] =>
  RESOURCES.flatMap(({ id }) => (levels[id] === "none" ? [] : [`${id}:${levels[id]}` as Scope]));

/** A key's access in a few words: "Full access", or "Orders: write · Wallet: read". */
export function describeScopes(scopes: string[]): string {
  if (!scopes.length) return "Full access";
  const parts = RESOURCES.flatMap(({ id, label }) => {
    const level = scopes.includes(`${id}:write`) ? "write" : scopes.includes(`${id}:read`) ? "read" : null;
    return level ? [`${label}: ${level}`] : [];
  });
  return parts.join(" · ");
}
