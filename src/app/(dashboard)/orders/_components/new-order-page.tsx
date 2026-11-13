"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, MapPin, Plus, Route, Sparkles, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { AddressSearch } from "./address-search";
import { OrderMap, type MapStop } from "./order-map";
import { ApiErrorAlert, Field } from "@/components/auth";
import { EmptyState } from "@/components/kit/empty-state";
import { FilterMenu } from "@/components/kit/filter-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GOOGLE_MAPS_API_KEY } from "@/constant";
import { COUNTRY, formatPhoneInput, nationalNumber } from "@/lib/auth/phone";
import type { ApiError } from "@/lib/dashboard/errors";
import { formatDateTime, formatMoney } from "@/lib/dashboard/format";
import { useCreateOrder, useQuoteOrder, useServiceAreas } from "@/lib/dashboard/hooks";
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";
import type { PublicQuoteDto } from "@/services/apiService";

type StopDraft = {
  key: number;
  address: string;
  lat: string;
  lng: string;
  name: string;
  phone: string;
  instructions: string;
};
type Problems = Record<string, string>;

/** Real Lagos places, for building in test mode without looking up coordinates. */
const SAMPLES = [
  {
    address: "1 Admiralty Way, Lekki Phase 1, Lagos",
    lat: "6.4474",
    lng: "3.4740",
    name: "Bola Ade",
    phone: "803 123 4567",
  },
  {
    address: "12 Bourdillon Road, Ikoyi, Lagos",
    lat: "6.4560",
    lng: "3.4310",
    name: "Chidi Eze",
    phone: "805 555 0101",
  },
  { address: "Allen Avenue, Ikeja, Lagos", lat: "6.6018", lng: "3.3515", name: "Ngozi Obi", phone: "809 222 3344" },
  {
    address: "Herbert Macaulay Way, Yaba, Lagos",
    lat: "6.5170",
    lng: "3.3746",
    name: "Tunde Bello",
    phone: "802 444 7788",
  },
  {
    address: "Tafawa Balewa Square, Lagos Island",
    lat: "6.4475",
    lng: "3.3986",
    name: "Amaka Nwosu",
    phone: "806 777 1212",
  },
];
const MAX_DROPOFFS = 10;

let nextKey = 1;
const emptyStop = (): StopDraft => ({
  key: nextKey++,
  address: "",
  lat: "",
  lng: "",
  name: "",
  phone: "",
  instructions: "",
});

/**
 * A new order in two moves: where (a pickup and one or more drop-offs), then the price, held for
 * 15 minutes, before anything is created or charged.
 */
export function NewOrderPage() {
  const { team, mode, can } = useWorkspace();
  const router = useRouter();
  const areas = useServiceAreas();
  const quote = useQuoteOrder(mode);
  const create = useCreateOrder(team.id, mode);

  const [area, setArea] = React.useState("");
  const [stops, setStops] = React.useState<StopDraft[]>(() => [emptyStop(), emptyStop()]);
  const [problems, setProblems] = React.useState<Problems>({});
  const [priced, setPriced] = React.useState<PublicQuoteDto | null>(null);
  const [reference, setReference] = React.useState("");
  const [failure, setFailure] = React.useState<ApiError | null>(null);
  const sample = React.useRef(0);

  React.useEffect(() => {
    if (!area && areas.data?.data.length) setArea(areas.data.data[0].id);
  }, [area, areas.data]);

  if (!can("orders.write")) {
    return (
      <EmptyState
        icon={<MapPin />}
        title="You can't create orders"
        description="Ask a developer or admin on your team."
      />
    );
  }

  const update = (key: number, patch: Partial<StopDraft>) => {
    setStops((current) => current.map((s) => (s.key === key ? { ...s, ...patch } : s)));
    setPriced(null); // the route changed, so the old price no longer applies
  };
  const fillSample = (key: number) => {
    const used = new Set(stops.map((s) => s.address));
    let pick = SAMPLES[sample.current % SAMPLES.length];
    for (let i = 0; i < SAMPLES.length && used.has(pick.address); i++)
      pick = SAMPLES[++sample.current % SAMPLES.length];
    sample.current += 1;
    update(key, pick);
  };

  const check = (): Problems => {
    const found: Problems = {};
    stops.forEach((s, i) => {
      if (s.address.trim().length < 3) found[`${i}.address`] = "Enter the address.";
      const lat = Number(s.lat);
      const lng = Number(s.lng);
      if (!s.lat || !s.lng || Number.isNaN(lat) || Number.isNaN(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180)
        found[`${i}.address`] ??= GOOGLE_MAPS_API_KEY
          ? "Pick the address from the list."
          : "Enter its latitude and longitude.";
      if (!s.name.trim()) found[`${i}.name`] = "Who should the rider ask for?";
      if (!nationalNumber(s.phone)) found[`${i}.phone`] = `Enter a Nigerian mobile number, like ${COUNTRY.example}.`;
    });
    return found;
  };

  const body = () => ({
    type: (stops.length > 2 ? "batch" : "single") as "single" | "batch",
    service_area: area,
    stops: stops.map((s) => ({
      address: s.address.trim(),
      lat: Number(s.lat),
      lng: Number(s.lng),
      contact: { name: s.name.trim(), phone: `${COUNTRY.dial}${nationalNumber(s.phone)}` },
      ...(s.instructions.trim() && { instructions: s.instructions.trim() }),
    })),
  });

  const getPrice = async () => {
    setFailure(null);
    const found = check();
    setProblems(found);
    if (Object.keys(found).length) {
      document.getElementById(`stop-${Object.keys(found)[0].replace(".", "-")}`)?.focus();
      return;
    }
    try {
      setPriced(await quote.mutateAsync(body()));
    } catch (e) {
      setFailure(e as ApiError);
    }
  };

  const place = async () => {
    if (!priced) return;
    setFailure(null);
    try {
      const order = await create.mutateAsync({
        quote_id: priced.id,
        ...(reference.trim() && { reference: reference.trim() }),
      });
      toast.success(mode === "test" ? "Test order created. Advance it to see it move." : "Order created");
      router.push(`/orders/${order.id}`);
    } catch (e) {
      setFailure(e as ApiError);
    }
  };

  const mapStops: MapStop[] = stops
    .map((s, i) => ({ s, i }))
    .filter(({ s }) => s.lat && s.lng && !Number.isNaN(Number(s.lat)) && !Number.isNaN(Number(s.lng)))
    .map(({ s, i }) => ({
      id: String(s.key),
      role: i === 0 ? ("pickup" as const) : ("dropoff" as const),
      lat: Number(s.lat),
      lng: Number(s.lng),
      done: false,
      label: s.address,
    }));

  return (
    <>
      <Link
        href="/orders"
        className="focus-ring mb-4 inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-fg-muted hover:text-fg"
      >
        <ArrowLeft className="size-4" aria-hidden /> Orders
      </Link>
      <header className="pb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold tracking-tight text-fg-heading">
            Create {mode === "test" ? "a test" : "an"} order
          </h1>
          <Badge tone={mode === "test" ? "warning" : "success"} dot>
            {mode === "test" ? "Test" : "Live"}
          </Badge>
        </div>
        <p className="mt-1 text-base text-fg-muted">
          {mode === "test"
            ? "Where it goes, then the price. Test orders use play money and a test rider."
            : "Where it goes, then the price. Nothing is charged until you create it."}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_23rem]">
        <div className="min-w-0 space-y-4">
          {failure && <ApiErrorAlert error={failure} />}

          <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface px-5 py-4 shadow-card">
            <div>
              <p className="text-sm font-bold text-fg-heading">Service area</p>
              <p className="text-xs text-fg-subtle">Where the delivery happens.</p>
            </div>
            <FilterMenu
              label="Area"
              anyLabel="Choose"
              value={area}
              options={(areas.data?.data ?? []).map((a) => ({
                value: a.id,
                label: `${a.state_name}, ${a.country_name}`,
              }))}
              onChange={(v) => {
                setArea(v);
                setPriced(null);
              }}
            />
          </section>

          {stops.map((stop, i) => (
            <StopCard
              key={stop.key}
              index={i}
              stop={stop}
              problems={problems}
              testMode={mode === "test"}
              onChange={(patch) => update(stop.key, patch)}
              onSample={() => fillSample(stop.key)}
              onRemove={
                i >= 2
                  ? () => {
                      setStops((current) => current.filter((s) => s.key !== stop.key));
                      setPriced(null);
                    }
                  : undefined
              }
            />
          ))}

          {stops.length - 1 < MAX_DROPOFFS && (
            <button
              type="button"
              onClick={() => {
                setStops((current) => [...current, emptyStop()]);
                setPriced(null);
              }}
              className="focus-ring flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line-strong py-3.5 text-sm font-semibold text-fg-muted transition-colors hover:border-brand hover:text-brand-fg"
            >
              <Plus className="size-4" aria-hidden /> Add another drop-off
            </button>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <OrderMap stops={mapStops} rider={null} className="aspect-[4/3]" />
          {priced ? (
            <PriceCard
              quote={priced}
              reference={reference}
              onReference={setReference}
              creating={create.isPending}
              onCreate={place}
              onRefresh={getPrice}
              refreshing={quote.isPending}
            />
          ) : (
            <section className="rounded-2xl border border-line bg-surface p-5 shadow-card">
              <p className="text-sm font-bold text-fg-heading">Price</p>
              <p className="mt-1 text-sm text-fg-muted">
                Get the price once the stops are in. It holds for 15 minutes, and nothing is charged until you create
                the order.
              </p>
              <Button fullWidth className="mt-4" onClick={getPrice} loading={quote.isPending} disabled={!area}>
                Get price
              </Button>
            </section>
          )}
        </aside>
      </div>
    </>
  );
}

function StopCard({
  index,
  stop,
  problems,
  testMode,
  onChange,
  onSample,
  onRemove,
}: {
  index: number;
  stop: StopDraft;
  problems: Problems;
  testMode: boolean;
  onChange: (patch: Partial<StopDraft>) => void;
  onSample: () => void;
  onRemove?: () => void;
}) {
  const pickup = index === 0;
  const id = (field: string) => `stop-${index}-${field}`;
  const problem = (field: string) => problems[`${index}.${field}`];

  return (
    <section
      aria-label={pickup ? "Pickup" : `Drop-off ${index}`}
      className="rounded-2xl border border-line bg-surface p-5 shadow-card"
    >
      <div className="mb-4 flex items-center gap-3">
        <span
          aria-hidden
          className={cn(
            "grid size-7 place-items-center rounded-full text-xs font-extrabold text-white",
            pickup ? "bg-plum" : "bg-brand-solid",
          )}
        >
          {pickup ? "P" : index}
        </span>
        <h2 className="flex-1 text-base font-bold text-fg-heading">{pickup ? "Pickup" : `Drop-off ${index}`}</h2>
        {testMode && (
          <Button variant="ghost" size="sm" onClick={onSample}>
            <Sparkles /> Use a sample
          </Button>
        )}
        {onRemove && (
          <Button variant="ghost" size="icon" aria-label={`Remove drop-off ${index}`} onClick={onRemove}>
            <Trash2 />
          </Button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id={id("address")}
          label="Address"
          className="sm:col-span-2"
          error={problem("address")}
          hint={!GOOGLE_MAPS_API_KEY ? "With its coordinates below, so the rider finds it." : undefined}
        >
          {(a11y) =>
            GOOGLE_MAPS_API_KEY ? (
              <AddressSearch
                id={a11y.id}
                value={stop.address}
                invalid={a11y["aria-invalid"]}
                describedBy={a11y["aria-describedby"]}
                onText={(address) => onChange({ address, lat: "", lng: "" })}
                onPlace={(p) => onChange({ address: p.address, lat: String(p.lat), lng: String(p.lng) })}
              />
            ) : (
              <Input
                {...a11y}
                value={stop.address}
                onChange={(e) => onChange({ address: e.target.value })}
                placeholder="1 Admiralty Way, Lekki"
              />
            )
          }
        </Field>
        {!GOOGLE_MAPS_API_KEY && (
          <>
            <Field id={id("lat")} label="Latitude">
              {(a11y) => (
                <Input
                  {...a11y}
                  inputMode="decimal"
                  value={stop.lat}
                  onChange={(e) => onChange({ lat: e.target.value })}
                  placeholder="6.4474"
                  className="font-mono"
                />
              )}
            </Field>
            <Field id={id("lng")} label="Longitude">
              {(a11y) => (
                <Input
                  {...a11y}
                  inputMode="decimal"
                  value={stop.lng}
                  onChange={(e) => onChange({ lng: e.target.value })}
                  placeholder="3.4740"
                  className="font-mono"
                />
              )}
            </Field>
          </>
        )}
        <Field id={id("name")} label="Contact name" error={problem("name")}>
          {(a11y) => (
            <Input
              {...a11y}
              value={stop.name}
              onChange={(e) => onChange({ name: e.target.value })}
              autoComplete="off"
            />
          )}
        </Field>
        <Field id={id("phone")} label="Contact phone" error={problem("phone")}>
          {(a11y) => (
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center gap-1.5 border-r border-line pl-3 pr-2.5 text-sm text-fg-muted">
                <span aria-hidden>{COUNTRY.flag}</span>
                {COUNTRY.dial}
              </span>
              <Input
                {...a11y}
                type="tel"
                inputMode="tel"
                value={stop.phone}
                onChange={(e) => onChange({ phone: formatPhoneInput(e.target.value) })}
                placeholder={COUNTRY.example}
                className="pl-[5.5rem] tabular-nums"
              />
            </div>
          )}
        </Field>
        <Field
          id={id("instructions")}
          className="sm:col-span-2"
          label={
            <>
              Instructions <span className="font-normal text-fg-subtle">(optional)</span>
            </>
          }
        >
          {(a11y) => (
            <Input
              {...a11y}
              value={stop.instructions}
              onChange={(e) => onChange({ instructions: e.target.value })}
              placeholder={
                pickup ? "Gate 3, ask for Bola at the front desk" : "Leave with the security post if nobody's home"
              }
            />
          )}
        </Field>
      </div>
    </section>
  );
}

function PriceCard({
  quote,
  reference,
  onReference,
  creating,
  onCreate,
  onRefresh,
  refreshing,
}: {
  quote: PublicQuoteDto;
  reference: string;
  onReference: (value: string) => void;
  creating: boolean;
  onCreate: () => void;
  onRefresh: () => void;
  refreshing: boolean;
}) {
  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  const left = Math.max(0, new Date(quote.expires_at).getTime() - now);
  const expired = left === 0;
  const mins = Math.floor(left / 60_000);
  const secs = Math.floor((left % 60_000) / 1000);

  return (
    <section
      aria-label="Price"
      className="animate-slide-up rounded-2xl border border-brand-line bg-surface p-5 shadow-card"
    >
      <p className="text-sm font-bold text-fg-heading">Price</p>
      <p className="mt-1 text-[2rem] font-black tabular-nums tracking-tight text-fg-heading">
        {formatMoney(quote.recommended_price)}
      </p>
      <dl className="mt-3 space-y-1.5 text-sm">
        <div className="flex justify-between">
          <dt className="text-fg-muted">Delivery</dt>
          <dd className="tabular-nums text-fg">{formatMoney(quote.breakdown.delivery_fee)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-fg-muted">Service charge</dt>
          <dd className="tabular-nums text-fg">{formatMoney(quote.breakdown.service_charge)}</dd>
        </div>
      </dl>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-3 text-xs text-fg-muted">
        <span className="inline-flex items-center gap-1">
          <Route className="size-3.5" aria-hidden /> {(quote.distance_m / 1000).toFixed(1)} km
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3.5" aria-hidden /> about {Math.max(1, Math.round(quote.duration_s / 60))} min
        </span>
        <span
          className={cn("ml-auto font-semibold tabular-nums", expired ? "text-danger-fg" : "text-fg-subtle")}
          title={formatDateTime(quote.expires_at)}
        >
          {expired ? "Price expired" : `Holds ${mins}:${String(secs).padStart(2, "0")}`}
        </span>
      </div>

      <div className="mt-4 space-y-1.5">
        <label htmlFor="reference" className="text-sm font-semibold text-fg">
          Your reference <span className="font-normal text-fg-subtle">(optional)</span>
        </label>
        <Input
          id="reference"
          value={reference}
          onChange={(e) => onReference(e.target.value)}
          placeholder="shop-42"
          maxLength={100}
        />
      </div>

      {expired ? (
        <Button fullWidth className="mt-4" onClick={onRefresh} loading={refreshing}>
          Get a new price
        </Button>
      ) : (
        <Button fullWidth className="mt-4" onClick={onCreate} loading={creating}>
          Create order · {formatMoney(quote.recommended_price)}
        </Button>
      )}
      <p className="mt-2 text-center text-xs text-fg-subtle">The price is held in your wallet until delivery.</p>
    </section>
  );
}
