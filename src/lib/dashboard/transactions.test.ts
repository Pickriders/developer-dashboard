import { purposeLabel, transactionsCsv } from "./transactions";
import type { PublicWalletTransactionDto } from "@/services/apiService";

const txn = (over: Partial<PublicWalletTransactionDto> = {}): PublicWalletTransactionDto => ({
  object: "transaction",
  id: "txn_1",
  type: "debit",
  purpose: "order_payment",
  status: "success",
  amount: 350_000,
  currency: "NGN",
  balance_after: 99_650_000,
  description: "Order #100001",
  order: "ord_1",
  livemode: false,
  created: "2026-11-13T09:00:00.000Z",
  ...over,
});

describe("transactions", () => {
  it("names purposes in plain words, and falls back to the code", () => {
    expect(purposeLabel("order_payment")).toBe("Order");
    expect(purposeLabel("something_new")).toBe("Something new");
  });

  it("writes a CSV in naira, money out negative", () => {
    const csv = transactionsCsv([
      txn(),
      txn({
        id: "txn_2",
        type: "credit",
        purpose: "test_funding",
        amount: 100_000_000,
        order: null,
        description: null,
      }),
    ]);
    expect(csv.split("\n")).toEqual([
      "Date,Type,Description,Amount (NGN),Balance after (NGN),Status,Order,Transaction id",
      "2026-11-13T09:00:00.000Z,Order,Order #100001,-3500,996500,success,ord_1,txn_1",
      "2026-11-13T09:00:00.000Z,Play money,,1000000,996500,success,,txn_2",
    ]);
  });

  it("quotes commas and stops a cell being read as a formula", () => {
    const csv = transactionsCsv([txn({ description: '=HYPERLINK("x"), and more' })]);
    expect(csv.split("\n")[1]).toContain(`"'=HYPERLINK(""x""), and more"`);
  });
});
