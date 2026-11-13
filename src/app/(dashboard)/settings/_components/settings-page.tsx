"use client";

import * as React from "react";
import { BadgeCheck, Clock, Mail, Phone, Rocket, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { ContactDialog } from "./contact-dialog";
import { LiveAccessDialog } from "../../_components/home/live-access-dialog";
import { ApiErrorAlert } from "@/components/auth";
import { ConfirmDialog } from "@/components/kit/confirm-dialog";
import { IdText } from "@/components/kit/id-text";
import { ListEditor } from "@/components/kit/list-editor";
import { PageHeader } from "@/components/kit/page-header";
import { Badge } from "@/components/ui/badge";
import { Button, LinkButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPhone } from "@/lib/auth/phone";
import { ROLE_LABELS } from "@/lib/auth/roles";
import type { ApiError } from "@/lib/dashboard/errors";
import { toApiError } from "@/lib/dashboard/errors";
import { formatDate } from "@/lib/dashboard/format";
import {
  type Contact,
  useAccount,
  useContactChange,
  useIpAllowlist,
  useSetIpAllowlist,
  useUpdateAccount,
  useUpdateProfile,
} from "@/lib/dashboard/hooks";
import { LIVE_STATUS } from "@/lib/dashboard/live";
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";
import type { DeveloperAccountDto } from "@/services/apiService";

/** Settings: yours (name, sign-in email and phone), then the selected team's. */
export function SettingsPage() {
  const { team } = useWorkspace();
  return (
    <>
      <PageHeader title="Settings" description={`Your sign-in details, and how ${team.name} works with Pickriders.`} />
      <div className="space-y-12">
        <Group title="Your account" description="Only you see and change these.">
          <ProfileSection />
          <ContactSection />
        </Group>
        <Group title={team.name} description={`Shared by everyone in the team. You're ${roleName(team.role)}.`}>
          <TeamSections />
        </Group>
      </div>
    </>
  );
}

const roleName = (role: keyof typeof ROLE_LABELS) => {
  const label = (ROLE_LABELS[role] ?? "a member").toLowerCase();
  return /^[aeiou]/.test(label) ? `an ${label}` : `a ${label}`;
};

function Group({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section aria-label={title}>
      <div className="mb-4 flex items-baseline gap-3 border-b border-line pb-3">
        <h2 className="truncate text-lg font-extrabold tracking-tight text-fg-heading">{title}</h2>
        <p className="hidden truncate text-sm text-fg-subtle sm:block">{description}</p>
      </div>
      <div className="divide-y divide-line">{children}</div>
    </section>
  );
}

/** One setting: what it is on the left (above on phones), the control on the right. */
function Row({
  title,
  description,
  children,
  id,
}: {
  title: string;
  description: React.ReactNode;
  children: React.ReactNode;
  id?: string;
}) {
  const headingId = React.useId();
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="grid scroll-mt-24 gap-4 py-6 first:pt-2 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-10"
    >
      <div className="space-y-1">
        <h3 id={headingId} className="text-[15px] font-bold text-fg-heading">
          {title}
        </h3>
        <div className="text-sm leading-6 text-fg-muted">{description}</div>
      </div>
      <div className="min-w-0 rounded-xl border border-line bg-surface p-5 shadow-card">{children}</div>
    </section>
  );
}

function ProfileSection() {
  const { me } = useWorkspace();
  const update = useUpdateProfile();
  const [first, setFirst] = React.useState(me.user.firstname);
  const [last, setLast] = React.useState(me.user.lastname);
  const [error, setError] = React.useState<ApiError | null>(null);
  React.useEffect(() => {
    setFirst(me.user.firstname);
    setLast(me.user.lastname);
  }, [me.user.firstname, me.user.lastname]);

  const dirty = first.trim() !== me.user.firstname || last.trim() !== me.user.lastname;
  const valid = first.trim().length > 0 && last.trim().length > 0;

  return (
    <Row title="Name" description="How teammates see you, and how our emails greet you.">
      <form
        noValidate
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!dirty || !valid) return;
          setError(null);
          try {
            await update.mutateAsync({ firstname: first.trim(), lastname: last.trim() });
            toast.success("Name saved");
          } catch (err) {
            setError(err as ApiError);
          }
        }}
      >
        {error && <ApiErrorAlert error={error} />}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1.5">
            <span className="block text-sm font-semibold text-fg">First name</span>
            <Input
              value={first}
              onChange={(e) => setFirst(e.target.value)}
              autoComplete="given-name"
              aria-invalid={!first.trim() || undefined}
            />
          </label>
          <label className="space-y-1.5">
            <span className="block text-sm font-semibold text-fg">Last name</span>
            <Input
              value={last}
              onChange={(e) => setLast(e.target.value)}
              autoComplete="family-name"
              aria-invalid={!last.trim() || undefined}
            />
          </label>
        </div>
        <div className="flex items-center justify-end gap-2">
          {dirty && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setFirst(me.user.firstname);
                setLast(me.user.lastname);
              }}
            >
              Discard
            </Button>
          )}
          <Button type="submit" size="sm" disabled={!dirty || !valid} loading={update.isPending}>
            Save name
          </Button>
        </div>
      </form>
    </Row>
  );
}

function ContactSection() {
  const { me } = useWorkspace();
  const [changing, setChanging] = React.useState<Contact | null>(null);
  const [resuming, setResuming] = React.useState(false);
  const u = me.user;

  return (
    <Row
      title="Sign-in email and phone"
      description="You sign in with your email. Codes and account alerts go to both. A change only takes effect once you enter the code we send to the new one."
    >
      <ul className="-my-2 divide-y divide-line">
        <ContactRow
          channel="email"
          icon={<Mail />}
          label="Email"
          value={u.email}
          verified={u.emailVerified}
          pending={u.pendingEmail}
          onChange={() => {
            setResuming(false);
            setChanging("email");
          }}
          onResume={() => {
            setResuming(true);
            setChanging("email");
          }}
        />
        <ContactRow
          channel="phone"
          icon={<Phone />}
          label="Phone"
          value={formatPhone(u.phone)}
          verified={u.phoneVerified}
          pending={u.pendingPhone ? formatPhone(u.pendingPhone) : null}
          onChange={() => {
            setResuming(false);
            setChanging("phone");
          }}
          onResume={() => {
            setResuming(true);
            setChanging("phone");
          }}
        />
      </ul>
      {(["email", "phone"] as const).map((channel) => {
        const pending = resuming ? (channel === "email" ? u.pendingEmail : u.pendingPhone) : null;
        // A new key when it resumes a change, so it opens on the code step.
        return (
          <ContactDialog
            key={`${channel}:${pending ?? ""}`}
            channel={channel}
            open={changing === channel}
            onClose={() => setChanging(null)}
            pending={pending}
          />
        );
      })}
    </Row>
  );
}

function ContactRow({
  channel,
  icon,
  label,
  value,
  verified,
  pending,
  onChange,
  onResume,
}: {
  channel: Contact;
  icon: React.ReactNode;
  label: string;
  value: string;
  verified: boolean;
  pending: string | null;
  onChange: () => void;
  onResume: () => void;
}) {
  const { cancel } = useContactChange(channel);
  return (
    <li className="py-3" data-contact={channel}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span
          aria-hidden
          className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface-subtle text-fg-muted [&_svg]:size-[18px]"
        >
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-fg-subtle">{label}</p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-fg">
            <span className="min-w-0 break-all">{value}</span>
            {verified ? (
              <Badge tone="success">
                <BadgeCheck className="size-3" aria-hidden /> Verified
              </Badge>
            ) : (
              <Badge tone="warning">Not verified</Badge>
            )}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          {!verified && (
            <LinkButton href="/auth/verify" size="sm">
              Verify
            </LinkButton>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={onChange}
            aria-label={`Change ${label.toLowerCase()}`}
            disabled={Boolean(pending)}
          >
            Change
          </Button>
        </div>
      </div>
      {pending && (
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border border-warning-line bg-warning-subtle px-3 py-2.5 text-sm text-warning-fg animate-fade-in">
          <Clock className="size-4 shrink-0" aria-hidden />
          <p className="min-w-[12rem] flex-1">
            Waiting for the code we sent to <span className="font-semibold">{pending}</span>.
          </p>
          <div className="flex gap-1">
            <Button size="sm" variant="secondary" onClick={onResume}>
              Enter code
            </Button>
            <Button
              size="sm"
              variant="ghost"
              loading={cancel.isPending}
              onClick={async () => {
                try {
                  await cancel.mutateAsync(undefined);
                  toast.success(`Change cancelled. You still use ${value}.`);
                } catch (e) {
                  toast.error((e as ApiError).message);
                }
              }}
            >
              Cancel change
            </Button>
          </div>
        </div>
      )}
    </li>
  );
}

function TeamSections() {
  const { team, can } = useWorkspace();
  const account = useAccount(team.id);

  if (account.error) {
    return (
      <div className="space-y-3 py-6">
        <ApiErrorAlert error={toApiError(account.error)} />
        <Button variant="secondary" onClick={() => account.refetch()}>
          Try again
        </Button>
      </div>
    );
  }
  if (!account.data) {
    return (
      <div className="space-y-6 py-6" aria-busy="true" aria-label="Loading team settings">
        {[0, 1, 2].map((i) => (
          <div key={i} className="grid gap-4 lg:grid-cols-[17rem_1fr] lg:gap-10">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-28 w-full rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <LiveAccessSection account={account.data} />
      <TeamNameSection account={account.data} />
      <NotificationsSection account={account.data} />
      {can("keys.read") && <IpAllowlistSection />}
    </>
  );
}

function LiveAccessSection({ account }: { account: DeveloperAccountDto }) {
  const { can, team } = useWorkspace();
  const [asking, setAsking] = React.useState(false);
  const [label, tone] = LIVE_STATUS[account.liveStatus];
  const askable = account.liveStatus === "NOT_REQUESTED" || account.liveStatus === "REJECTED";
  const canAsk = askable && can("live.request") && account.canRequestLive;

  let body: React.ReactNode;
  switch (account.liveStatus) {
    case "APPROVED":
      body = `Live keys and live orders are on${account.liveReviewedAt ? ` since ${formatDate(account.liveReviewedAt)}` : ""}. Test mode keeps working alongside.`;
      break;
    case "PENDING":
      body = `A Pickriders admin is reviewing your request${account.liveRequestedAt ? ` from ${formatDate(account.liveRequestedAt)}` : ""}. We'll email the owner when it's decided. Keep building in test mode meanwhile.`;
      break;
    case "REJECTED":
      body = account.liveRejectionReason
        ? `Not approved: ${account.liveRejectionReason}`
        : "Not approved yet. Update your details and ask again.";
      break;
    case "SUSPENDED":
      body = account.liveSuspensionReason
        ? `Live access is suspended: ${account.liveSuspensionReason}`
        : "Live access is suspended. Test mode still works. Contact support to restore it.";
      break;
    default:
      body = "Live keys charge your wallet and send real riders. Ask once you've tried the flow in test mode.";
  }

  return (
    <Row
      id="live-access"
      title="Live access"
      description="Pickriders reviews each team before live keys work, usually within a working day."
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex min-w-0 flex-1 items-start gap-4">
          <span
            aria-hidden
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded-xl [&_svg]:size-5",
              account.liveStatus === "APPROVED"
                ? "bg-success-subtle text-success-fg"
                : "bg-surface-subtle text-fg-muted",
            )}
          >
            <Rocket />
          </span>
          <div className="min-w-0 flex-1 space-y-1.5">
            <Badge tone={tone} dot>
              {label}
            </Badge>
            <p className="text-sm leading-6 text-fg-muted" data-testid="live-status-copy">
              {body}
            </p>
            {askable && !account.canRequestLive && (
              <p className="text-sm text-fg-muted">
                {team.isOwner ? (
                  <>
                    First verify your email and phone.{" "}
                    <a
                      href="/auth/verify"
                      className="focus-ring rounded-sm font-semibold text-brand-fg hover:underline"
                    >
                      Finish verifying
                    </a>
                  </>
                ) : (
                  "The team owner verifies their email and phone first."
                )}
              </p>
            )}
          </div>
        </div>
        {canAsk && (
          <Button size="sm" className="self-start" onClick={() => setAsking(true)}>
            {account.liveStatus === "REJECTED" ? "Update and ask again" : "Request live access"}
          </Button>
        )}
      </div>
      <LiveAccessDialog open={asking} onClose={() => setAsking(false)} account={account} />
    </Row>
  );
}

function TeamNameSection({ account }: { account: DeveloperAccountDto }) {
  const { team, can } = useWorkspace();
  const manages = can("team.manage");
  const update = useUpdateAccount(team.id);
  const [name, setName] = React.useState(account.name);
  React.useEffect(() => setName(account.name), [account.name]);
  const dirty = name.trim() !== account.name;
  const valid = name.trim().length >= 2;

  return (
    <Row
      title="Team"
      description="The name teammates see in the team switcher and in invitation emails. Quote the team id when you contact support."
    >
      <form
        noValidate
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!dirty || !valid) return;
          try {
            await update.mutateAsync({ name: name.trim() });
            toast.success("Team name saved");
          } catch (err) {
            toast.error((err as ApiError).message);
          }
        }}
      >
        <label className="block space-y-1.5">
          <span className="block text-sm font-semibold text-fg">Team name</span>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            readOnly={!manages}
            maxLength={80}
            autoComplete="organization"
            aria-invalid={!valid || undefined}
            className={cn(!manages && "bg-surface-subtle text-fg-muted")}
          />
        </label>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-1.5 text-sm text-fg-muted">
            Team id <IdText value={team.id} full />
          </p>
          {manages && (
            <Button type="submit" size="sm" disabled={!dirty || !valid} loading={update.isPending}>
              Save name
            </Button>
          )}
        </div>
      </form>
    </Row>
  );
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function NotificationsSection({ account }: { account: DeveloperAccountDto }) {
  const { team, can } = useWorkspace();
  const update = useUpdateAccount(team.id);
  const manages = can("team.manage");

  return (
    <Row
      title="Alert emails"
      description="Low balance, failed auto top-ups and failing webhook endpoints email the owner and admins. Add a shared inbox, like ops@ or an on-call alias, to copy it too."
    >
      <ListEditor
        id="notification-email"
        label="Alert emails"
        inputLabel="New alert email"
        items={account.notificationEmails}
        max={5}
        placeholder="ops@acme.com"
        addLabel="Add email"
        normalise={(v) => v.trim().toLowerCase()}
        validate={(v) => (EMAIL.test(v) ? null : `"${v}" isn't an email address.`)}
        empty={
          manages
            ? "Only the owner and admins get alerts. Add up to 5 more addresses."
            : "Only the owner and admins get alerts."
        }
        onSave={
          manages
            ? async (next) => {
                await update.mutateAsync({ notificationEmails: next });
                toast.success(next.length > account.notificationEmails.length ? "Email added" : "Email removed");
              }
            : undefined
        }
      />
    </Row>
  );
}

function IpAllowlistSection() {
  const { team, can } = useWorkspace();
  const list = useIpAllowlist(team.id, true);
  const set = useSetIpAllowlist(team.id);
  const writes = can("keys.write");
  const [confirming, setConfirming] = React.useState<{ ips: string[]; resolve: (ok: boolean) => void } | null>(null);
  const ips = list.data?.allowedIps ?? [];

  return (
    <Row
      id="ip-allowlist"
      title="API key IP allowlist"
      description="Only requests from these addresses or CIDR ranges may use your API keys, test and live. Leave it empty to allow any IP."
    >
      {list.error ? (
        <ApiErrorAlert error={toApiError(list.error)} />
      ) : !list.data ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <>
          <div className="mb-3 flex items-center gap-2">
            {ips.length ? (
              <Badge tone="success">
                <ShieldCheck className="size-3" aria-hidden /> On · {ips.length}{" "}
                {ips.length === 1 ? "entry" : "entries"}
              </Badge>
            ) : (
              <Badge tone="neutral">Any IP</Badge>
            )}
          </div>
          <ListEditor
            id="allowed-ip"
            label="Allowed IPs"
            inputLabel="New IP or range"
            items={ips}
            max={50}
            mono
            placeholder="203.0.113.9"
            addLabel="Add IP"
            validate={(v) =>
              /^[\d.]+(\/\d{1,2})?$|^[\da-f:]+(\/\d{1,3})?$/i.test(v) && /[.:]/.test(v)
                ? null
                : `"${v}" isn't an IP address or CIDR range (e.g. 203.0.113.9 or 203.0.113.0/24).`
            }
            empty="Any IP can use your API keys."
            beforeAdd={(added) =>
              ips.length ? Promise.resolve(true) : new Promise((resolve) => setConfirming({ ips: added, resolve }))
            }
            onSave={
              writes
                ? async (next) => {
                    await set.mutateAsync(next);
                    toast.success(next.length ? "Allowlist saved" : "Allowlist off: any IP can use your keys");
                  }
                : undefined
            }
          />
        </>
      )}
      <ConfirmDialog
        open={Boolean(confirming)}
        onOpenChange={(open) => {
          if (!open) {
            confirming?.resolve(false);
            setConfirming(null);
          }
        }}
        title="Turn on the allowlist?"
        description={
          <>
            Only {confirming?.ips.join(", ")} will be able to use your API keys. Requests from anywhere else are refused
            straight away, including your servers if their address isn&apos;t listed.
          </>
        }
        confirmLabel="Turn on"
        destructive={false}
        onConfirm={() => {
          confirming?.resolve(true);
          setConfirming(null);
        }}
      />
    </Row>
  );
}
