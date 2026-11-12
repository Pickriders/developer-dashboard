"use client";

import * as React from "react";
import { KeyRound, Mail, Plus, RotateCw, Trash2, Webhook } from "lucide-react";
import { toast } from "sonner";

import { CodeInput, Field, FormAlert, PasswordInput, PasswordMeter } from "@/components/auth";
import {
  CodeBlock,
  ConfirmDialog,
  EmptyState,
  IdText,
  Kbd,
  Panel,
  SecretReveal,
  StatCard,
  TestModeBanner,
} from "@/components/kit";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Skeleton } from "@/components/ui/skeleton";
import { ToggleSwitch } from "@/components/ui/toggle-switch";
import { formatMoney } from "@/lib/dashboard/format";

const SWATCHES: { group: string; tokens: { name: string; className: string; note?: string }[] }[] = [
  {
    group: "Surfaces",
    tokens: [
      { name: "canvas", className: "bg-canvas", note: "page" },
      { name: "surface", className: "bg-surface", note: "cards, inputs" },
      { name: "surface-subtle", className: "bg-surface-subtle", note: "hover, headers" },
      { name: "surface-muted", className: "bg-surface-muted", note: "selected, skeletons" },
      { name: "line", className: "bg-line", note: "card edges" },
    ],
  },
  {
    group: "Text",
    tokens: [
      { name: "fg-heading", className: "bg-fg-heading", note: "plum headings" },
      { name: "fg", className: "bg-fg", note: "body" },
      { name: "fg-muted", className: "bg-fg-muted", note: "secondary" },
      { name: "fg-subtle", className: "bg-fg-subtle", note: "meta" },
      { name: "line-strong", className: "bg-line-strong", note: "input borders" },
    ],
  },
  {
    group: "Brand and status",
    tokens: [
      { name: "brand", className: "bg-brand", note: "Pickriders teal" },
      { name: "brand-solid", className: "bg-brand-solid", note: "primary buttons" },
      { name: "brand-subtle", className: "bg-brand-subtle", note: "brand soft" },
      { name: "success", className: "bg-success" },
      { name: "warning", className: "bg-warning", note: "test mode" },
      { name: "danger", className: "bg-danger" },
      { name: "info", className: "bg-info" },
    ],
  },
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 space-y-4 border-t border-line pt-10 first:border-0 first:pt-0">
      <h2 className="text-xl font-extrabold tracking-tight text-fg-heading">{title}</h2>
      {children}
    </section>
  );
}

export function Showcase() {
  const [modal, setModal] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [toggle, setToggle] = React.useState(true);
  const [code, setCode] = React.useState("48");
  const [password, setPassword] = React.useState("tiger-lamp-rain");

  return (
    <div className="space-y-12">
      <Section id="colour" title="Colour">
        {SWATCHES.map(({ group, tokens }) => (
          <div key={group} className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-fg-subtle">{group}</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
              {tokens.map((t) => (
                <div key={t.name} className="space-y-1.5">
                  <div className={`h-14 rounded-xl border border-line ${t.className}`} />
                  <p className="font-mono text-xs text-fg">{t.name}</p>
                  {t.note && <p className="text-xs text-fg-subtle">{t.note}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="h-24 rounded-2xl bg-gradient-to-br from-plum via-plum-mid to-[#3fa49f] p-5 text-white">
          <p className="text-lg font-black">The brand gradient</p>
          <p className="text-sm text-white/75">Plum to teal: the auth panel and nowhere else.</p>
        </div>
      </Section>

      <Section id="type" title="Typography">
        <div className="space-y-3">
          <p className="text-[2.5rem] font-black leading-tight tracking-tight text-fg-heading">
            Deliveries, as an API.
          </p>
          <p className="text-[1.75rem] font-black tracking-tight text-fg-heading">Auth and empty-state titles</p>
          <p className="text-2xl font-extrabold tracking-tight text-fg-heading">Page title</p>
          <p className="text-lg font-bold text-fg-heading">Section and dialog title</p>
          <p className="max-w-prose text-[15px] leading-6 text-fg-muted">
            Reading text in Urbanist, the storefront&apos;s typeface. Ids and code use Geist Mono, like{" "}
            <code className="text-sm text-fg">ord_8Hf2kQ</code>.
          </p>
          <p className="text-sm text-fg">Controls, tables and labels: 14px.</p>
          <p className="text-xs text-fg-subtle">Meta and timestamps: 12px.</p>
        </div>
      </Section>

      <Section id="buttons" title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>
            <Plus /> Create key
          </Button>
          <Button variant="secondary">
            <RotateCw /> Roll key
          </Button>
          <Button variant="ghost">Cancel</Button>
          <Button variant="danger">
            <Trash2 /> Revoke
          </Button>
          <Button variant="link">View docs</Button>
          <Button loading>Saving</Button>
          <Button disabled>Disabled</Button>
          <Button size="sm" variant="secondary">
            Small
          </Button>
        </div>
      </Section>

      <Section id="status" title="Status">
        <div className="flex flex-wrap gap-2">
          <Badge tone="success" dot>
            Delivered
          </Badge>
          <Badge tone="warning" dot>
            Test
          </Badge>
          <Badge tone="danger" dot>
            Failed
          </Badge>
          <Badge tone="info" dot>
            In transit
          </Badge>
          <Badge tone="brand">Live</Badge>
          <Badge>Draft</Badge>
        </div>
        <TestModeBanner />
        <div className="grid gap-3 sm:grid-cols-3">
          <FormAlert title="That email and password don't match.">
            Forgot it? <a href="#status">Reset your password</a>
          </FormAlert>
          <FormAlert tone="info" title="Your session expired.">
            Sign in again to pick up where you left off.
          </FormAlert>
          <FormAlert tone="success" title="We sent a new code." />
        </div>
      </Section>

      <Section id="forms" title="Forms">
        <div className="grid max-w-2xl gap-5 sm:grid-cols-2">
          <Field id="d-email" label="Email" hint="We'll never share it.">
            {(a11y) => <Input {...a11y} type="email" placeholder="ada@acme.com" />}
          </Field>
          <Field id="d-name" label="Team name" error="Enter a team name.">
            {(a11y) => <Input {...a11y} />}
          </Field>
          <Field id="d-password" label="Password">
            {(a11y) => (
              <div className="space-y-2.5">
                <PasswordInput {...a11y} value={password} onChange={(e) => setPassword(e.target.value)} />
                <PasswordMeter value={password} />
              </div>
            )}
          </Field>
          <Field id="d-code" label="Verification code">
            {(a11y) => <CodeInput {...a11y} value={code} onChange={setCode} />}
          </Field>
          <Field id="d-notes" label="Use case" className="sm:col-span-2">
            {(a11y) => <Textarea {...a11y} placeholder="What will you deliver?" />}
          </Field>
          <label className="flex items-center gap-3 text-sm font-semibold text-fg">
            <ToggleSwitch checked={toggle} onChange={setToggle} ariaLabel="Email me when an endpoint fails" />
            Email me when an endpoint fails
          </label>
        </div>
      </Section>

      <Section id="data" title="Data">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Wallet balance" value={formatMoney(12_450_000)} hint="Test mode" />
          <StatCard label="Orders this week" value="128" />
          <StatCard label="Webhook success" value="99.2%" />
        </div>
        <Panel
          title="API keys"
          description="Secret keys for the Pickriders API."
          actions={<Button size="sm">New key</Button>}
        >
          <ul className="divide-y divide-line text-sm">
            {[
              ["Production server", "sk_test_example_not_a_real_key", "Created 12 Nov"],
              ["CI", "sk_test_example_ci_key", "Created 3 Oct"],
            ].map(([name, id, meta]) => (
              <li key={id} className="flex items-center gap-4 px-5 py-3.5">
                <span className="grid size-9 place-items-center rounded-xl bg-brand-subtle text-brand-fg">
                  <KeyRound className="size-4" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-fg">{name}</span>
                  <IdText value={id} />
                </span>
                <span className="text-xs text-fg-subtle">{meta}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <CodeBlock
          label="Create an order"
          code={`curl https://api.pickriders.com/developer/api/v1/orders \\\n  -H "Authorization: Bearer sk_test_…" \\\n  -d @order.json`}
        />
        <div className="space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-11 w-full" />
        </div>
        <Panel>
          <EmptyState
            icon={<Webhook />}
            title="No webhook endpoints yet"
            description="Add an endpoint to hear about every order status change."
            action={<Button size="sm">Add endpoint</Button>}
          />
        </Panel>
      </Section>

      <Section id="feedback" title="Overlays and feedback">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" onClick={() => setModal(true)}>
            Show a secret
          </Button>
          <Button variant="secondary" onClick={() => setConfirm(true)}>
            Confirm a revoke
          </Button>
          <Button variant="secondary" onClick={() => toast.success("Key created.")}>
            Toast
          </Button>
          <span className="text-sm text-fg-muted">
            Search <Kbd>⌘</Kbd> <Kbd>K</Kbd>
          </span>
        </div>
        <Modal open={modal} onClose={() => setModal(false)} title="Your new secret key">
          <div className="space-y-4">
            <p className="flex items-center gap-2 text-sm text-fg-muted">
              <Mail className="size-4 text-brand" aria-hidden /> Store it somewhere safe, like your secrets manager.
            </p>
            <SecretReveal secret="sk_test_example_not_a_real_key" />
            <Button fullWidth onClick={() => setModal(false)}>
              I&apos;ve saved it
            </Button>
          </div>
        </Modal>
        <ConfirmDialog
          open={confirm}
          onOpenChange={setConfirm}
          title="Revoke this key?"
          description="Apps using it stop working immediately. This can't be undone."
          confirmLabel="Revoke key"
          typeToConfirm="CI"
          onConfirm={() => new Promise((r) => setTimeout(r, 800))}
        />
      </Section>
    </div>
  );
}
