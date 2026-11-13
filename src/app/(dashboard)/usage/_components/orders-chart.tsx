"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import type { UsageDayDto } from "@/services/apiService";

const day = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { timeZone: "UTC", ...opts });

/** A round top for the axis: 4 → 4, 7 → 8, 13 → 15, 230 → 250. */
function niceMax(n: number) {
  if (n <= 4) return Math.max(n, 1);
  const step = 10 ** Math.floor(Math.log10(n));
  return [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].map((m) => m * step).find((m) => m >= n) ?? n;
}

/**
 * Orders per day: each bar is the day's orders, the solid part those delivered. Point at (or tap)
 * a day for its numbers. Screen readers get the same as a table.
 */
export function OrdersChart({ days, empty }: { days: UsageDayDto[]; empty?: React.ReactNode }) {
  const [hover, setHover] = React.useState<number | null>(null);
  const plot = React.useRef<HTMLDivElement>(null);
  const max = niceMax(Math.max(0, ...days.map((d) => d.created)));
  const dense = days.length > 31;
  const labelEvery = days.length <= 7 ? 1 : days.length <= 31 ? 7 : 15;

  const indexAt = (clientX: number) => {
    const box = plot.current?.getBoundingClientRect();
    if (!box) return null;
    const i = Math.floor(((clientX - box.left) / box.width) * days.length);
    return Math.min(days.length - 1, Math.max(0, i));
  };

  const shown = hover !== null ? days[hover] : null;

  return (
    <div className="relative">
      <div className="flex gap-3">
        {/* The scale */}
        <div
          aria-hidden
          className="flex h-56 w-7 shrink-0 flex-col justify-between text-right text-[11px] tabular-nums text-fg-subtle"
        >
          <span className="-translate-y-1/2">{max}</span>
          <span>{Number.isInteger(max / 2) ? max / 2 : ""}</span>
          <span className="translate-y-1/2">0</span>
        </div>

        <div className="relative min-w-0 flex-1">
          <div
            ref={plot}
            aria-hidden
            className="relative h-56 touch-pan-y"
            onPointerMove={(e) => setHover(indexAt(e.clientX))}
            onPointerDown={(e) => setHover(indexAt(e.clientX))}
            onPointerLeave={(e) => e.pointerType === "mouse" && setHover(null)}
          >
            {/* Gridlines */}
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
              {[0, 1, 2].map((i) => (
                <div key={i} className={cn("border-t", i === 2 ? "border-line-strong" : "border-dashed border-line")} />
              ))}
            </div>

            <div className={cn("absolute inset-0 flex items-end", dense ? "gap-px" : "gap-[3px] sm:gap-1.5")}>
              {days.map((d, i) => {
                const total = (d.created / max) * 100;
                const done = d.created ? (d.delivered / d.created) * 100 : 0;
                const dim = hover !== null && hover !== i;
                return (
                  <div key={d.date} className="relative flex h-full flex-1 items-end">
                    {hover === i && <div className="absolute inset-y-0 -inset-x-px rounded-md bg-fg/[0.04]" />}
                    <div
                      className={cn(
                        "relative flex w-full flex-col justify-end overflow-hidden rounded-t-[3px] bg-brand/25 transition-[height,opacity] duration-500 ease-out motion-reduce:transition-none",
                        dim && "opacity-60",
                      )}
                      style={{ height: d.created ? `max(${total}%, 3px)` : "0%" }}
                    >
                      <div className="w-full bg-brand" style={{ height: `${done}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {shown && (
              <div
                className="pointer-events-none absolute -top-2 z-10 w-40 -translate-y-full rounded-lg border border-line bg-surface px-3 py-2 text-xs shadow-pop animate-fade-in"
                style={{
                  left: `clamp(0px, calc(${((hover! + 0.5) / days.length) * 100}% - 5rem), calc(100% - 10rem))`,
                }}
              >
                <p className="font-bold text-fg-heading">
                  {day(shown.date, { weekday: "short", day: "numeric", month: "short" })}
                </p>
                <dl className="mt-1 space-y-0.5 tabular-nums">
                  <div className="flex justify-between gap-3">
                    <dt className="flex items-center gap-1.5 text-fg-muted">
                      <span className="size-2 rounded-sm bg-brand/25" /> Created
                    </dt>
                    <dd className="font-semibold text-fg">{shown.created}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="flex items-center gap-1.5 text-fg-muted">
                      <span className="size-2 rounded-sm bg-brand" /> Delivered
                    </dt>
                    <dd className="font-semibold text-fg">{shown.delivered}</dd>
                  </div>
                </dl>
              </div>
            )}
          </div>

          {empty && days.every((d) => d.created === 0) && (
            <div className="pointer-events-none absolute inset-x-0 top-0 grid h-56 place-items-center">
              <div className="pointer-events-auto rounded-xl border border-line bg-surface/90 px-4 py-3 text-center text-sm text-fg-muted shadow-card backdrop-blur-sm">
                {empty}
              </div>
            </div>
          )}
          {/* Dates */}
          <div aria-hidden className="relative mt-2 h-4 text-[11px] text-fg-subtle">
            {days.map((d, i) =>
              (days.length - 1 - i) % labelEvery === 0 ? (
                <span
                  key={d.date}
                  className="absolute -translate-x-1/2 whitespace-nowrap"
                  style={{ left: `${((i + 0.5) / days.length) * 100}%` }}
                >
                  {i === days.length - 1 ? "Today" : day(d.date, { day: "numeric", month: "short" })}
                </span>
              ) : null,
            )}
          </div>
        </div>
      </div>

      <table className="sr-only">
        <caption>Orders per day</caption>
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Created</th>
            <th scope="col">Delivered</th>
          </tr>
        </thead>
        <tbody>
          {days.map((d) => (
            <tr key={d.date}>
              <th scope="row">{day(d.date, { weekday: "long", day: "numeric", month: "long" })}</th>
              <td>{d.created}</td>
              <td>{d.delivered}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
