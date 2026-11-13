"use client";

import * as React from "react";
import { Bell, CreditCard, Landmark, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { fromKobo, MoneyInput, toKobo } from "./money-input";
import { ApiErrorAlert, Field } from "@/components/auth";
import { CopyButton } from "@/components/kit/copy-button";
import { ConfirmDialog } from "@/components/kit/confirm-dialog";
import { FilterMenu } from "@/components/kit/filter-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Skeleton } from "@/components/ui/skeleton";
import { ToggleSwitch } from "@/components/ui/toggle-switch";
import type { ApiError } from "@/lib/dashboard/errors";
import { formatDateTime, formatMoney } from "@/lib/dashboard/format";
import {
  useAutoTopUp,
  useConfigureAutoTopUp,
  useFundingAccount,
  useLowBalanceAlert,
  useRemoveCard,
  useSaveCard,
  useSetLowBalanceAlert,
  useSetUpFundingAccount,
} from "@/lib/dashboard/hooks";
import { useWorkspace } from "@/lib/workspace";

/**
 * Banks a transfer account can be set up against, with Paystack's codes. The dashboard can't call
 * GET /payments/banks; this covers the banks most Nigerian businesses use.
 */
const BANKS = [
  ["044", "Access Bank"],
  ["023", "Citibank"],
  ["050", "Ecobank"],
  ["070", "Fidelity Bank"],
  ["011", "First Bank"],
  ["214", "FCMB"],
  ["058", "GTBank"],
  ["082", "Keystone Bank"],
  ["50211", "Kuda"],
  ["50515", "Moniepoint"],
  ["999992", "OPay"],
  ["999991", "PalmPay"],
  ["076", "Polaris Bank"],
  ["221", "Stanbic IBTC"],
  ["232", "Sterling Bank"],
  ["032", "Union Bank"],
  ["033", "UBA"],
  ["035", "Wema Bank"],
  ["057", "Zenith Bank"],
] as const;

function Card({
  icon,
  title,
  status,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  status?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section aria-label={title} className="flex flex-col rounded-2xl border border-line bg-surface p-5 shadow-card">
      <div className="mb-3 flex items-center gap-3">
        <span
          aria-hidden
          className="grid size-9 place-items-center rounded-xl bg-brand-subtle text-brand-fg [&_svg]:size-[18px]"
        >
          {icon}
        </span>
        <h2 className="flex-1 text-base font-bold text-fg-heading">{title}</h2>
        {status}
      </div>
      {children}
    </section>
  );
}

/** A dedicated account number: transfers to it land in the live wallet. Set up once, with a BVN. */
export function TransferAccountCard() {
  const { team, can } = useWorkspace();
  const account = useFundingAccount(team.id, true);
  const [settingUp, setSettingUp] = React.useState(false);
  const data = account.data;

  return (
    <Card
      icon={<Landmark />}
      title="Bank transfer"
      status={
        data?.status === "active" ? (
          <Badge tone="success" dot>
            Ready
          </Badge>
        ) : data?.status === "pending" ? (
          <Badge tone="warning" dot>
            Checking
          </Badge>
        ) : data?.status === "failed" ? (
          <Badge tone="danger" dot>
            Not issued
          </Badge>
        ) : null
      }
    >
      {account.isPending ? (
        <Skeleton className="h-20 w-full" />
      ) : data?.status === "active" ? (
        <dl className="space-y-2 rounded-xl bg-surface-subtle p-3.5 text-sm">
          <Detail label="Bank" value={data.bank_name ?? ""} />
          <Detail label="Account number" value={data.account_number ?? ""} mono />
          <Detail label="Account name" value={data.account_name ?? ""} />
        </dl>
      ) : data?.status === "pending" ? (
        <p className="flex items-center gap-2 text-sm text-fg-muted">
          <Loader2 className="size-4 animate-spin" aria-hidden /> Paystack is checking the BVN ending {data.bvn_last4}.
          This takes a minute or two.
        </p>
      ) : (
        <>
          <p className="text-sm leading-6 text-fg-muted">
            {data?.status === "failed"
              ? `Paystack couldn't issue it: ${data.failure_reason ?? "the details didn't match"}. Check them and try again.`
              : "Get an account number of your own. Anything transferred to it lands in your live wallet."}
          </p>
          {can("wallet.fund") && (
            <Button variant="secondary" size="sm" className="mt-auto self-start" onClick={() => setSettingUp(true)}>
              {data?.status === "failed" ? "Try again" : "Get a transfer account"}
            </Button>
          )}
        </>
      )}
      <TransferAccountDialog open={settingUp} onClose={() => setSettingUp(false)} />
    </Card>
  );
}

function Detail({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="whitespace-nowrap text-fg-muted">{label}</dt>
      <dd className="flex min-w-0 items-center gap-1 font-semibold text-fg">
        <span className={mono ? "font-mono tracking-wide" : "truncate"}>{value}</span>
        <CopyButton value={value} label={`Copy ${label.toLowerCase()}`} className="size-7" />
      </dd>
    </div>
  );
}

function TransferAccountDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { team } = useWorkspace();
  const setUp = useSetUpFundingAccount(team.id);
  const [form, setForm] = React.useState({ bvn: "", first_name: "", last_name: "", account_number: "", bank_code: "" });
  const [failure, setFailure] = React.useState<ApiError | null>(null);
  const valid =
    /^\d{11}$/.test(form.bvn) &&
    /^\d{10}$/.test(form.account_number) &&
    form.bank_code &&
    form.first_name.trim() &&
    form.last_name.trim();
  const set = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));

  return (
    <Modal open={open} onClose={() => !setUp.isPending && onClose()} title="Get a transfer account">
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!valid) return;
          setFailure(null);
          try {
            await setUp.mutateAsync({ ...form, first_name: form.first_name.trim(), last_name: form.last_name.trim() });
            toast.success("Requested. Paystack is checking the details.");
            onClose();
          } catch (error) {
            setFailure(error as ApiError);
          }
        }}
      >
        <p className="text-[15px] leading-6 text-fg-muted">
          Paystack issues the account in your business&apos;s name. It checks the BVN against a bank account in the same
          name. Pickriders keeps only the BVN&apos;s last four digits.
        </p>
        {failure && <ApiErrorAlert error={failure} />}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="first_name" label="First name">
            {(a11y) => (
              <Input {...a11y} value={form.first_name} onChange={(e) => set({ first_name: e.target.value })} />
            )}
          </Field>
          <Field id="last_name" label="Last name">
            {(a11y) => <Input {...a11y} value={form.last_name} onChange={(e) => set({ last_name: e.target.value })} />}
          </Field>
        </div>
        <Field id="bvn" label="BVN" hint="11 digits.">
          {(a11y) => (
            <Input
              {...a11y}
              inputMode="numeric"
              autoComplete="off"
              maxLength={11}
              value={form.bvn}
              onChange={(e) => set({ bvn: e.target.value.replace(/\D/g, "") })}
              className="font-mono tracking-wider"
            />
          )}
        </Field>
        <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <Field id="account_number" label="Account number" hint="A 10-digit account in the same name.">
            {(a11y) => (
              <Input
                {...a11y}
                inputMode="numeric"
                autoComplete="off"
                maxLength={10}
                value={form.account_number}
                onChange={(e) => set({ account_number: e.target.value.replace(/\D/g, "") })}
                className="font-mono tracking-wider"
              />
            )}
          </Field>
          <div className="space-y-1.5">
            <span className="block text-sm font-semibold text-fg">Bank</span>
            <FilterMenu
              label="Bank"
              anyLabel="Choose"
              value={form.bank_code}
              options={BANKS.map(([value, label]) => ({ value, label }))}
              onChange={(v) => set({ bank_code: v })}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Button variant="secondary" onClick={onClose} disabled={setUp.isPending}>
            Cancel
          </Button>
          <Button type="submit" loading={setUp.isPending} disabled={!valid}>
            Request account
          </Button>
        </div>
      </form>
    </Modal>
  );
}

/** Keep the live wallet topped up from a saved card when it runs low. */
export function AutoTopUpCard() {
  const { team, can } = useWorkspace();
  const auto = useAutoTopUp(team.id, true);
  const configure = useConfigureAutoTopUp(team.id);
  const save = useSaveCard(team.id);
  const remove = useRemoveCard(team.id);
  const [threshold, setThreshold] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [removing, setRemoving] = React.useState(false);
  const data = auto.data;
  const writes = can("wallet.fund");

  React.useEffect(() => {
    if (!data) return;
    setThreshold(fromKobo(data.threshold));
    setAmount(fromKobo(data.amount));
  }, [data]);

  const saveSettings = async (enabled: boolean) => {
    const t = toKobo(threshold);
    const a = toKobo(amount);
    if (!t || !a) return toast.error("Enter when to top up and by how much.");
    try {
      await configure.mutateAsync({ enabled, threshold: t, amount: a });
      toast.success(enabled ? "Auto top-up is on" : "Auto top-up is off");
    } catch (e) {
      toast.error((e as ApiError).message);
    }
  };

  return (
    <Card
      icon={<CreditCard />}
      title="Auto top-up"
      status={
        data?.enabled ? (
          <Badge tone="success" dot>
            On
          </Badge>
        ) : data ? (
          <Badge tone="neutral">Off</Badge>
        ) : null
      }
    >
      {auto.isPending ? (
        <Skeleton className="h-28 w-full" />
      ) : !data?.card ? (
        <>
          <p className="text-sm leading-6 text-fg-muted">
            Save a card and Pickriders charges it when your live wallet runs low, so orders never stop for lack of
            money.
          </p>
          {writes && (
            <Button
              variant="secondary"
              size="sm"
              className="mt-auto self-start"
              loading={save.isPending}
              onClick={async () => {
                const back = `${window.location.origin}/wallet`;
                try {
                  const session = await save.mutateAsync({
                    amount: 10_000_00,
                    success_url: `${back}?card=saved`,
                    cancel_url: back,
                  });
                  window.location.assign(session.url);
                } catch (e) {
                  toast.error((e as ApiError).message);
                }
              }}
            >
              Save a card (₦10,000 top-up)
            </Button>
          )}
        </>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3 rounded-xl bg-surface-subtle p-3 text-sm">
            <span className="font-semibold text-fg">
              {data.card.brand ?? "Card"} •••• {data.card.last4}
              {data.card.exp_month && (
                <span className="font-normal text-fg-muted">
                  {" "}
                  · {data.card.exp_month}/{data.card.exp_year?.slice(-2)}
                </span>
              )}
            </span>
            {writes && (
              <button
                type="button"
                onClick={() => setRemoving(true)}
                className="focus-ring rounded text-xs font-semibold text-danger-fg hover:underline"
              >
                Remove
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label htmlFor="auto-threshold" className="text-xs font-semibold text-fg-muted">
                When it drops below
              </label>
              <MoneyInput
                id="auto-threshold"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                disabled={!writes}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="auto-amount" className="text-xs font-semibold text-fg-muted">
                Top up by
              </label>
              <MoneyInput
                id="auto-amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={!writes}
              />
            </div>
          </div>
          {writes && (
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-fg">Top up automatically</span>
              <ToggleSwitch
                checked={data.enabled}
                ariaLabel="Auto top-up"
                disabled={configure.isPending}
                onChange={saveSettings}
              />
            </div>
          )}
          {writes && data.enabled && (
            <Button variant="secondary" size="sm" onClick={() => saveSettings(true)} loading={configure.isPending}>
              Save amounts
            </Button>
          )}
          <p className="text-xs leading-5 text-fg-subtle">
            {data.last_charge_at ? `Last charged ${formatDateTime(data.last_charge_at)}.` : "Not charged yet."}
            {data.consecutive_failures > 0 &&
              ` ${data.consecutive_failures} failed ${data.consecutive_failures === 1 ? "try" : "tries"}: ${data.last_failure_reason ?? "the card was declined"}.`}
            {data.disabled_reason && ` Turned off: ${data.disabled_reason}`}
          </p>
        </div>
      )}
      <ConfirmDialog
        open={removing}
        onOpenChange={setRemoving}
        title="Remove the saved card?"
        description="Auto top-up stops until you save another card."
        confirmLabel="Remove card"
        onConfirm={async () => {
          try {
            await remove.mutateAsync(undefined);
            toast.success("Card removed");
          } catch (e) {
            toast.error((e as ApiError).message);
          }
        }}
      />
    </Card>
  );
}

/** An email to owners and finance when the live wallet runs low. */
export function LowBalanceCard() {
  const { team, can } = useWorkspace();
  const alert = useLowBalanceAlert(team.id, true);
  const set = useSetLowBalanceAlert(team.id);
  const [text, setText] = React.useState("");
  React.useEffect(() => setText(fromKobo(alert.data?.threshold)), [alert.data]);
  const current = alert.data?.threshold ?? null;
  const writes = can("wallet.fund");

  return (
    <Card
      icon={<Bell />}
      title="Low-balance alert"
      status={
        current ? (
          <Badge tone="success" dot>
            On
          </Badge>
        ) : alert.data ? (
          <Badge tone="neutral">Off</Badge>
        ) : null
      }
    >
      <p className="text-sm leading-6 text-fg-muted">
        {current
          ? `Owners and finance get an email when available money drops below ${formatMoney(current)}.`
          : "Email owners and finance when available money drops below an amount you choose."}
      </p>
      {writes && (
        <form
          className="mt-3 flex gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            const kobo = toKobo(text);
            if (!kobo) return;
            try {
              await set.mutateAsync(kobo);
              toast.success("Alert saved");
            } catch (error) {
              toast.error((error as ApiError).message);
            }
          }}
        >
          <div className="flex-1">
            <MoneyInput
              aria-label="Alert below"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="50,000"
            />
          </div>
          <Button type="submit" variant="secondary" loading={set.isPending} disabled={!toKobo(text)}>
            Save
          </Button>
        </form>
      )}
      {writes && current && (
        <button
          type="button"
          onClick={async () => {
            await set.mutateAsync(null);
            toast.success("Alert turned off");
          }}
          className="focus-ring mt-2 self-start rounded text-xs font-semibold text-fg-muted hover:text-fg"
        >
          Turn off
        </button>
      )}
    </Card>
  );
}
