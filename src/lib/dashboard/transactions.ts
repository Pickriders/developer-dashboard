import type { PublicWalletTransactionDto } from "@/services/apiService";

/** What each kind of transaction is, in a merchant's words. */
const PURPOSE: Record<string, string> = {
  wallet_funding: "Top-up",
  test_funding: "Play money",
  order_payment: "Order",
  order_refund: "Order refund",
  order_hold: "Held for an order",
  hold_release: "Hold released",
  auto_top_up: "Auto top-up",
  transfer_funding: "Bank transfer",
  cancellation_charge: "Cancellation charge",
};

export const purposeLabel = (purpose: string) =>
  PURPOSE[purpose] ?? purpose.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase());

const cell = (value: string | number | null) => {
  const text = value === null ? "" : String(value);
  // Quote anything with a comma, quote or newline; neutralise a leading formula character.
  const safe = /^[=+\-@]/.test(text) && typeof value === "string" ? `'${text}` : text;
  return /[",\n]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
};

/**
 * Transactions as CSV for a spreadsheet: one row each, amounts in naira (not kobo), money out
 * negative, newest first as listed.
 */
export function transactionsCsv(rows: PublicWalletTransactionDto[]): string {
  const header = [
    "Date",
    "Type",
    "Description",
    "Amount (NGN)",
    "Balance after (NGN)",
    "Status",
    "Order",
    "Transaction id",
  ];
  const lines = rows.map((t) =>
    [
      t.created,
      purposeLabel(t.purpose),
      t.description,
      ((t.type === "debit" ? -1 : 1) * t.amount) / 100,
      t.balance_after === null ? null : t.balance_after / 100,
      t.status,
      t.order,
      t.id,
    ]
      .map(cell)
      .join(","),
  );
  return [header.join(","), ...lines].join("\n");
}
