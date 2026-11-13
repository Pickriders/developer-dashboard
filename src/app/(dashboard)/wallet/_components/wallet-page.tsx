"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowDownLeft, ArrowUpRight, Download, Lock, Plus, Wallet as WalletIcon } from "lucide-react";
import { toast } from "sonner";

import { AddMoneyDialog } from "./add-money-dialog";
import { AutoTopUpCard, LowBalanceCard, TransferAccountCard } from "./live-settings";
import { ApiErrorAlert } from "@/components/auth";
import { EmptyState } from "@/components/kit/empty-state";
import { PageHeader } from "@/components/kit/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Segmented } from "@/components/ui/segmented";
import { Skeleton } from "@/components/ui/skeleton";
import { wallet as walletApi } from "@/lib/dashboard/api";
import { toApiError } from "@/lib/dashboard/errors";
import { formatDateTime, formatMoney, timeAgo } from "@/lib/dashboard/format";
import { useTransactions, useWallet } from "@/lib/dashboard/hooks";
import { purposeLabel, transactionsCsv } from "@/lib/dashboard/transactions";
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";

/** The prepaid wallet orders are paid from: the balance, money in, live settings and every transaction. */
export function WalletPage() {
  const { team, mode, can } = useWorkspace();
  const wallet = useWallet(team.id, mode);
  const [adding, setAdding] = React.useState(false);
  useReturnFromPaystack();

  return (
    <>
      <PageHeader
        title="Wallet"
        description={
          mode === "test"
            ? "Play money for test orders. Each order holds its price here until it's delivered."
            : "Your prepaid balance. Each order holds its price here until it's delivered, then pays the rider."
        }
      />

      {wallet.error ? (
        wallet.error.code === "live_wallet_not_open" ? (
          <EmptyState icon={<Lock />} title="Your live wallet isn't open yet" description={wallet.error.message} />
        ) : (
          <ApiErrorAlert error={wallet.error} />
        )
      ) : (
        <div className="space-y-6">
          <section
            aria-label="Balance"
            className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-7"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-brand/10 blur-3xl"
            />
            <div className="relative flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-fg-muted">
                  Available
                  <Badge tone={mode === "live" ? "success" : "warning"} dot>
                    {mode === "live" ? "Live" : "Play money"}
                  </Badge>
                </p>
                {wallet.data ? (
                  <p
                    className="mt-1 text-[2.5rem] font-black tabular-nums leading-tight tracking-tight text-fg-heading"
                    data-balance
                  >
                    {formatMoney(wallet.data.available)}
                  </p>
                ) : (
                  <Skeleton className="mt-2 h-11 w-56" />
                )}
                <p className="mt-1 text-sm text-fg-muted">
                  {wallet.data ? (
                    <>
                      <span className="font-semibold tabular-nums text-fg">{formatMoney(wallet.data.held)}</span> held
                      for orders in progress
                    </>
                  ) : (
                    " "
                  )}
                </p>
              </div>
              {can("wallet.fund") && (
                <Button onClick={() => setAdding(true)}>
                  <Plus /> {mode === "test" ? "Add play money" : "Top up by card"}
                </Button>
              )}
            </div>
          </section>

          {mode === "live" ? (
            <div className="grid gap-4 lg:grid-cols-3">
              <TransferAccountCard />
              <AutoTopUpCard />
              <LowBalanceCard />
            </div>
          ) : (
            <p className="flex items-center gap-2 rounded-xl border border-dashed border-line-strong px-4 py-3 text-sm text-fg-muted">
              <Lock className="size-4 shrink-0 text-fg-subtle" aria-hidden />
              Bank transfers, saved cards, auto top-up and low-balance alerts are for your live wallet.
            </p>
          )}

          <Transactions />
        </div>
      )}

      <AddMoneyDialog open={adding} onClose={() => setAdding(false)} />
    </>
  );
}

/** Back from Paystack (?funded=1 or ?card=saved): say what happens next, once. */
function useReturnFromPaystack() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const funded = params.get("funded");
  const card = params.get("card");
  const said = React.useRef(false);
  React.useEffect(() => {
    if ((!funded && !card) || said.current) return;
    said.current = true;
    toast.success(card ? "Card saved for auto top-up" : "Payment received", {
      description: "Your balance updates as soon as Paystack confirms it, usually within a minute.",
    });
    router.replace(pathname, { scroll: false });
  }, [funded, card, router, pathname]);
}

function Transactions() {
  const { team, mode } = useWorkspace();
  const [type, setType] = React.useState<"all" | "credit" | "debit">("all");
  const list = useTransactions(team.id, mode, type === "all" ? undefined : type);
  const rows = list.data?.pages.flatMap((p) => p.data) ?? [];
  const [exporting, setExporting] = React.useState(false);

  /** Up to 1,000 of them, in the filter on screen, as a CSV download. */
  const exportCsv = async () => {
    setExporting(true);
    try {
      const all = [];
      let after: string | undefined;
      for (let page = 0; page < 10; page++) {
        const next = await walletApi.transactions(mode, type === "all" ? undefined : type, after, 100);
        all.push(...next.data);
        if (!next.has_more) break;
        after = next.data[next.data.length - 1]?.id;
      }
      const url = URL.createObjectURL(new Blob([transactionsCsv(all)], { type: "text/csv" }));
      const a = Object.assign(document.createElement("a"), {
        href: url,
        download: `pickriders-${mode}-transactions-${new Date().toISOString().slice(0, 10)}.csv`,
      });
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      toast.error(toApiError(e).message);
    } finally {
      setExporting(false);
    }
  };

  return (
    <section
      aria-label="Transactions"
      className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <h2 className="text-base font-bold text-fg-heading">Transactions</h2>
        <div className="flex items-center gap-2">
          <Segmented
            size="sm"
            label="Show"
            value={type}
            onChange={setType}
            options={[
              { value: "all", label: "All" },
              { value: "credit", label: "Money in" },
              { value: "debit", label: "Money out" },
            ]}
          />
          <Button variant="secondary" size="sm" onClick={exportCsv} loading={exporting} disabled={!rows.length}>
            <Download /> CSV
          </Button>
        </div>
      </div>
      {list.isPending ? (
        <div className="space-y-3 p-5">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : !rows.length ? (
        <EmptyState
          icon={<WalletIcon />}
          title="No transactions here yet"
          description="Top-ups, order payments and refunds show up here."
        />
      ) : (
        <ul className="divide-y divide-line">
          {rows.map((t) => {
            const credit = t.type === "credit";
            return (
              <li key={t.id} data-transaction={t.purpose} className="flex items-center gap-3 px-5 py-3 text-sm">
                <span
                  aria-hidden
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full",
                    credit ? "bg-success-subtle text-success-fg" : "bg-surface-muted text-fg-muted",
                  )}
                >
                  {credit ? <ArrowDownLeft className="size-4" /> : <ArrowUpRight className="size-4" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate font-semibold text-fg">{purposeLabel(t.purpose)}</span>
                    {t.status !== "success" && (
                      <Badge tone={t.status === "processing" ? "warning" : "danger"}>
                        {t.status === "processing" ? "Processing" : t.status === "failed" ? "Failed" : "Cancelled"}
                      </Badge>
                    )}
                  </span>
                  <span className="block truncate text-xs text-fg-subtle">
                    {t.order ? (
                      <Link href={`/orders/${t.order}`} className="font-mono hover:text-fg hover:underline">
                        {t.order}
                      </Link>
                    ) : (
                      t.description
                    )}
                  </span>
                </span>
                <span className="text-right">
                  <span className={cn("block font-semibold tabular-nums", credit ? "text-success-fg" : "text-fg")}>
                    {credit ? "+" : "−"}
                    {formatMoney(t.amount)}
                  </span>
                  <span className="block text-xs text-fg-subtle" title={formatDateTime(t.created)}>
                    {timeAgo(t.created)}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      )}
      {list.hasNextPage && (
        <div className="border-t border-line p-3">
          <Button variant="ghost" fullWidth loading={list.isFetchingNextPage} onClick={() => void list.fetchNextPage()}>
            Show older transactions
          </Button>
        </div>
      )}
    </section>
  );
}
