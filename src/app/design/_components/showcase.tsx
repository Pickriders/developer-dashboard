"use client";

import * as React from "react";
import { KeyRound, MoreHorizontal, Plus, RotateCw, Search, Trash2, Webhook } from "lucide-react";
import { toast } from "sonner";

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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { formatMoney } from "@/lib/dashboard/format";

const SWATCHES: { group: string; tokens: { name: string; className: string; note?: string }[] }[] = [
  {
    group: "Surfaces",
    tokens: [
      { name: "canvas", className: "bg-canvas", note: "page" },
      { name: "surface", className: "bg-surface", note: "cards, tables" },
      { name: "surface-raised", className: "bg-surface-raised", note: "menus, dialogs" },
      { name: "surface-subtle", className: "bg-surface-subtle", note: "hover, headers" },
      { name: "surface-muted", className: "bg-surface-muted", note: "selected" },
    ],
  },
  {
    group: "Text and lines",
    tokens: [
      { name: "fg", className: "bg-fg", note: "primary" },
      { name: "fg-muted", className: "bg-fg-muted", note: "secondary" },
      { name: "fg-subtle", className: "bg-fg-subtle", note: "meta" },
      { name: "line", className: "bg-line", note: "hairlines" },
      { name: "line-strong", className: "bg-line-strong", note: "inputs" },
    ],
  },
  {
    group: "Brand and status",
    tokens: [
      { name: "brand", className: "bg-brand", note: "the one accent" },
      { name: "success", className: "bg-success" },
      { name: "warning", className: "bg-warning", note: "test mode" },
      { name: "danger", className: "bg-danger" },
      { name: "info", className: "bg-info" },
    ],
  },
];

const TYPE = [
  { name: "4xl · 36/40 · 600", className: "text-4xl font-semibold", sample: "Deliveries, as an API." },
  { name: "3xl · 28/36 · 600", className: "text-3xl font-semibold", sample: "₦1,250,000.00" },
  { name: "2xl · 22/30 · 600", className: "text-2xl font-semibold", sample: "API keys" },
  { name: "lg · 16/24 · 600", className: "text-lg font-semibold", sample: "Webhook endpoints" },
  { name: "base · 14/22", className: "text-base text-fg-muted", sample: "Reading text: descriptions and help." },
  { name: "sm · 13/20", className: "text-sm", sample: "Controls, tables and labels." },
  { name: "xs · 12/16", className: "text-xs text-fg-subtle", sample: "Meta: 2 minutes ago · req_7Hq2…" },
  { name: "mono · 12", className: "font-mono text-xs", sample: "ord_6560f0c2a1b2c3d4e5f60718" },
];

const KEYS = [
  {
    id: "key_6560f0c2a1b2c3d4e5f60718",
    label: "Production server",
    prefix: "sk_live_…h7Qa",
    mode: "live",
    status: "active",
    used: "2 minutes ago",
  },
  {
    id: "key_6560f0c2a1b2c3d4e5f60719",
    label: "CI",
    prefix: "sk_test_…p2Lx",
    mode: "test",
    status: "active",
    used: "Yesterday",
  },
  {
    id: "key_6560f0c2a1b2c3d4e5f60720",
    label: "Old checkout",
    prefix: "sk_live_…9dKe",
    mode: "live",
    status: "rolling",
    used: "3 days ago",
  },
  {
    id: "key_6560f0c2a1b2c3d4e5f60721",
    label: "Laptop",
    prefix: "sk_test_…Rr0m",
    mode: "test",
    status: "revoked",
    used: "Never",
  },
] as const;

const STATUS_BADGE = {
  active: { variant: "success", label: "Active" },
  rolling: { variant: "warning", label: "Expires in 23h" },
  revoked: { variant: "neutral", label: "Revoked" },
} as const;

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 space-y-4 border-t border-line py-10 first:border-t-0 first:pt-0">
      <h2 className="text-lg font-semibold text-fg">{title}</h2>
      {children}
    </section>
  );
}

export function Showcase() {
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  return (
    <div className="space-y-0">
      <Section id="colour" title="Colour">
        <p className="max-w-2xl text-base text-fg-muted">
          Neutral surfaces and one accent, Pickriders teal. Status colours appear in small doses (dots, badges, banners)
          and always come with words.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {SWATCHES.map(({ group, tokens }) => (
            <div key={group} className="space-y-2">
              <p className="text-xs font-medium text-fg-subtle">{group}</p>
              <ul className="overflow-hidden rounded-lg border border-line bg-surface">
                {tokens.map((token) => (
                  <li
                    key={token.name}
                    className="flex items-center gap-3 border-b border-line px-3 py-2 last:border-b-0"
                  >
                    <span className={`size-6 shrink-0 rounded-md border border-line ${token.className}`} />
                    <code className="text-xs text-fg">{token.name}</code>
                    {token.note && <span className="ml-auto text-xs text-fg-subtle">{token.note}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="type" title="Typography">
        <p className="max-w-2xl text-base text-fg-muted">
          Geist for the interface, Geist Mono for anything a developer copies. Weights 400, 500 and 600; headings
          tighten as they grow.
        </p>
        <div className="divide-y divide-line rounded-lg border border-line bg-surface">
          {TYPE.map((row) => (
            <div key={row.name} className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-baseline sm:gap-6">
              <code className="w-40 shrink-0 text-2xs text-fg-subtle">{row.name}</code>
              <span className={`min-w-0 truncate ${row.className}`}>{row.sample}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="buttons" title="Buttons">
        <div className="flex flex-wrap items-center gap-2">
          <Button>
            <Plus /> Create key
          </Button>
          <Button variant="secondary">Export CSV</Button>
          <Button variant="outline">Cancel</Button>
          <Button variant="ghost">
            <RotateCw /> Refresh
          </Button>
          <Button variant="destructive">Revoke key</Button>
          <Button variant="link">View docs</Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="lg">Large</Button>
          <Button>Default</Button>
          <Button size="sm">Small</Button>
          <Button size="xs" variant="secondary">
            Extra small
          </Button>
          <Button size="icon" variant="secondary" aria-label="Search">
            <Search />
          </Button>
          <Button loading>Saving</Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
        </div>
      </Section>

      <Section id="status" title="Status">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="success" dot>
            Delivered
          </Badge>
          <Badge variant="info" dot>
            In transit
          </Badge>
          <Badge variant="brand" dot>
            Searching
          </Badge>
          <Badge variant="warning" dot>
            Test mode
          </Badge>
          <Badge variant="danger" dot>
            Failed
          </Badge>
          <Badge variant="neutral" dot>
            Cancelled
          </Badge>
          <Badge variant="outline">order.delivered</Badge>
          <Badge variant="neutral">
            <code>200</code>
          </Badge>
          <Badge variant="danger">
            <code>402</code>
          </Badge>
        </div>
        <TestModeBanner className="rounded-md border" />
      </Section>

      <Section id="forms" title="Forms">
        <div className="grid max-w-3xl gap-5 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="url">Endpoint URL</Label>
            <Input id="url" placeholder="https://api.acme.com/pickriders/webhooks" />
            <p className="text-xs text-fg-subtle">Must be https and publicly reachable.</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="amount">Top-up amount</Label>
            <Input id="amount" defaultValue="500" aria-invalid aria-describedby="amount-error" />
            <p id="amount-error" className="text-xs text-danger-fg">
              The smallest top-up is ₦1,000.
            </p>
          </div>
          <div className="space-y-1.5">
            <Label>Role</Label>
            <Select defaultValue="developer">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="disabled">Disabled</Label>
            <Input id="disabled" disabled value="sk_live_… (locked until live access)" readOnly />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="desc">Description</Label>
            <Textarea id="desc" placeholder="What this endpoint is for, so your team knows." />
          </div>
          <div className="flex items-center gap-2.5">
            <Switch id="auto" defaultChecked />
            <Label htmlFor="auto">Auto top-up</Label>
          </div>
          <div className="flex items-center gap-2.5">
            <Checkbox id="events" defaultChecked />
            <Label htmlFor="events">Send me failure emails</Label>
          </div>
        </div>
      </Section>

      <Section id="data" title="Data">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Orders today" value="1,284" trend={{ value: "+12%", direction: "up" }} hint="vs yesterday" />
          <StatCard
            label="Delivery success"
            value="98.6%"
            trend={{ value: "−0.4%", direction: "down" }}
            hint="last 7 days"
          />
          <StatCard label="Wallet balance" value={formatMoney(125_000_000)} hint="₦3,500 held for 2 orders" />
          <StatCard
            label="API error rate"
            value="0.12%"
            trend={{ value: "−0.05%", direction: "down", invert: true }}
            hint="last 24h"
          />
        </div>
        <Panel
          flush
          title="API keys"
          description="Keys authenticate your server. Keep them secret; roll one if it leaks."
          actions={
            <Button size="sm">
              <Plus /> Create key
            </Button>
          }
          footer={
            <>
              <span>4 keys</span>
              <span className="flex items-center gap-1.5">
                Press <Kbd>⌘</Kbd>
                <Kbd>K</Kbd> to search
              </span>
            </>
          }
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last used</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {KEYS.map((key) => (
                <TableRow key={key.id}>
                  <TableCell>
                    <div className="font-medium text-fg">{key.label}</div>
                    <IdText value={key.id} />
                  </TableCell>
                  <TableCell>
                    <code className="text-xs text-fg-muted">{key.prefix}</code>
                  </TableCell>
                  <TableCell>
                    <Badge variant={key.mode === "live" ? "outline" : "warning"}>
                      {key.mode === "live" ? "Live" : "Test"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={STATUS_BADGE[key.status].variant} dot>
                      {STATUS_BADGE[key.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-fg-subtle">{key.used}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${key.label}`}>
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem>
                          <RotateCw /> Roll key
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-danger-fg focus:text-danger-fg"
                          onSelect={() => setConfirmOpen(true)}
                        >
                          <Trash2 /> Revoke key
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Panel>
        <div className="grid gap-3 md:grid-cols-3">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
      </Section>

      <Section id="feedback" title="Overlays and feedback">
        <div className="flex flex-wrap items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">
                <KeyRound /> Show a new key
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Your new secret key</DialogTitle>
                <DialogDescription>
                  Store it in your server&apos;s secrets. Anyone with it can create orders on your account.
                </DialogDescription>
              </DialogHeader>
              <SecretReveal secret="sk_test_51PqRsTuVwXyZ0123456789abcdefGHIJ" />
              <DialogFooter>
                <Button>I&apos;ve saved it</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="secondary" onClick={() => setConfirmOpen(true)}>
            Confirm a destructive action
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast.success("Webhook endpoint created", { description: "we_6560f0c2a1b2" })}
          >
            Toast
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast.error("Insufficient funds", { description: "insufficient_funds_error · req_7Hq2kLmN9pQr" })
            }
          >
            Error toast
          </Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Webhook help">
                <Webhook />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Events are signed with your endpoint&apos;s secret</TooltipContent>
          </Tooltip>
        </div>
        <ConfirmDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          title="Revoke “Production server”?"
          description="Apps using this key stop working immediately. This can't be undone."
          confirmLabel="Revoke key"
          onConfirm={() => new Promise((resolve) => setTimeout(resolve, 700))}
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <CodeBlock
            label="Create an order"
            code={`curl https://api.pickriders.com/developer/api/v1/orders \\
  -H "Authorization: Bearer sk_test_…" \\
  -H "Idempotency-Key: 7c1e…" \\
  -d '{"quote_id": "quo_6560f0c2a1b2c3d4e5f60718"}'`}
          />
          <Panel flush>
            <EmptyState
              icon={<Webhook />}
              title="No webhook endpoints yet"
              description="Add an endpoint to get order and wallet events as they happen, signed and retried for 3 days."
              action={
                <Button size="sm">
                  <Plus /> Add endpoint
                </Button>
              }
            />
          </Panel>
        </div>
      </Section>

      <Section id="navigation" title="Navigation">
        <Tabs defaultValue="deliveries">
          <TabsList>
            <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="deliveries" className="text-sm text-fg-muted">
            Underlined tabs for sections of one page; the selected one is ink.
          </TabsContent>
          <TabsContent value="events" className="text-sm text-fg-muted">
            Events tab.
          </TabsContent>
          <TabsContent value="settings" className="text-sm text-fg-muted">
            Settings tab.
          </TabsContent>
        </Tabs>
      </Section>
    </div>
  );
}
