import * as React from "react";
import { FlaskConical, Radio, ShieldCheck } from "lucide-react";

import { Logo } from "@/components/brand/logo";

/**
 * The brand panel on every auth page, after the Pickriders storefront's: plum to teal, soft
 * glows, white type. What you're signing up for is shown rather than told: one request and the
 * webhooks it produces arriving in order, on a glass card. Decorative, so hidden from assistive
 * tech; still for people who ask for reduced motion.
 */
const EVENTS = [
  { type: "order.created", detail: "₦2,450.00 held", time: "14:02" },
  { type: "order.rider_assigned", detail: "Tunde · 4.9★", time: "14:03" },
  { type: "order.picked_up", detail: "Yaba → Lekki", time: "14:11" },
  { type: "order.delivered", detail: "Signed by Ada", time: "14:36" },
];

const FEATURES = [
  { icon: FlaskConical, title: "Test mode from day one", body: "Play money, a sandbox rider, no card needed" },
  { icon: Radio, title: "Signed webhooks", body: "Every status change, retried until you answer" },
  { icon: ShieldCheck, title: "Live after a quick review", body: "Verify your email and phone, then ask" },
];

export function AuthAside() {
  return (
    <aside
      aria-hidden
      className="relative hidden flex-col justify-between gap-10 overflow-hidden bg-gradient-to-br from-plum via-plum-mid to-[#3fa49f] p-10 text-white lg:flex xl:p-14"
    >
      <Logo inverted />

      <div className="relative mx-auto w-full max-w-[30rem] space-y-9">
        <div className="space-y-3">
          <h2 className="text-balance text-[2.5rem] font-black leading-[1.05] tracking-tight">
            Deliveries, as an API.
          </h2>
          <p className="max-w-sm text-base leading-7 text-white/75">
            Quote, dispatch and track Pickriders riders from your own product.
          </p>
        </div>

        <div className="motion-safe:animate-float">
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] shadow-[0_24px_60px_-12px_rgb(0_0_0/0.45)] backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <span className="font-mono text-xs text-white/80">
                <span className="font-semibold text-[#8fe3dd]">POST</span> /developer/api/v1/orders
              </span>
              <span className="rounded-full bg-[#f5c451]/20 px-2 py-0.5 text-[11px] font-bold text-[#ffd77a]">
                Test mode
              </span>
            </div>
            <ol>
              {EVENTS.map((event, i) => (
                <li
                  key={event.type}
                  className="flex items-center gap-3 border-b border-white/10 px-4 py-3 last:border-b-0 motion-safe:animate-rise"
                  style={{ animationDelay: `${500 + i * 600}ms` }}
                >
                  <span
                    className={
                      i === EVENTS.length - 1
                        ? "grid size-5 shrink-0 place-items-center rounded-full bg-[#3fc27f] text-[11px] font-black text-plum"
                        : "size-2 shrink-0 rounded-full bg-[#8fe3dd] ring-4 ring-[#8fe3dd]/15"
                    }
                  >
                    {i === EVENTS.length - 1 && "✓"}
                  </span>
                  <span className="font-mono text-[13px] text-white">{event.type}</span>
                  <span className="ml-auto truncate text-xs text-white/60">{event.detail}</span>
                  <span className="font-mono text-[11px] tabular-nums text-white/45">{event.time}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <ul className="space-y-4 text-sm">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/15">
                <Icon className="size-[17px]" />
              </span>
              <span>
                <span className="block font-bold">{title}</span>
                <span className="text-white/70">{body}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-white/60">Powered by Pickriders logistics</p>

      <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 size-80 rounded-full bg-fuchsia-400/20 blur-3xl" />
    </aside>
  );
}
