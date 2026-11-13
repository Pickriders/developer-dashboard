"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  CornerDownLeft,
  FlaskConical,
  KeyRound,
  LogOut,
  Monitor,
  Moon,
  Package,
  Radio,
  Rocket,
  Search,
  Sun,
  Webhook,
  type LucideIcon,
} from "lucide-react";
import { useTheme } from "next-themes";

import { ALL_ITEMS } from "./nav";
import { TeamTile } from "./team-switcher";
import { signOutAndLeave } from "@/components/auth/sign-out-button";
import { DOCS_URL } from "@/constant";
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";

type Command = {
  id: string;
  group: "Go to" | "Actions" | "Teams" | "Preferences" | "Help";
  label: string;
  hint?: string;
  icon: React.ReactNode;
  keywords?: string;
  run: () => void;
};

/**
 * Everything in one place, from the keyboard: pages, the common actions (create a key, add an
 * endpoint, ask for live, switch mode), teams, theme, docs, sign out. Type to filter, arrows to
 * move, Enter to go.
 */
export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = React.useRef<HTMLDialogElement>(null);
  // Each opening starts afresh (a new search, the first result selected), decided in the same
  // render that opens it, so the first key typed after ⌘K lands in the new search box.
  const [session, setSession] = React.useState(0);
  const [wasOpen, setWasOpen] = React.useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setSession((n) => n + 1);
  }

  React.useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      d.querySelector("input")?.focus();
    }
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={dialog}
      aria-label="Search or jump to"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-0 mx-auto mt-[12vh] w-[min(40rem,calc(100vw-1.5rem))] max-w-none overflow-visible bg-transparent p-0 text-fg backdrop:bg-plum/50 backdrop:backdrop-blur-sm"
    >
      {open && <PaletteBody key={session} onClose={onClose} />}
    </dialog>
  );
}

function PaletteBody({ onClose }: { onClose: () => void }) {
  const commands = useCommands(onClose);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const list = React.useRef<HTMLUListElement>(null);
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  // Matches every word somewhere; ones whose name has every word come first ("test key" is the
  // action, not the API keys page found by its keywords).
  const results = commands
    .filter((c) => {
      const text = `${c.label} ${c.group} ${c.keywords ?? ""}`.toLowerCase();
      return words.every((w) => text.includes(w));
    })
    .map((c, i) => ({ c, i, named: words.every((w) => c.label.toLowerCase().includes(w)) }))
    .sort((a, b) => Number(b.named) - Number(a.named) || a.i - b.i)
    .map(({ c }) => c);
  const groups = Array.from(new Set(results.map((r) => r.group)));
  const ordered = groups.flatMap((g) => results.filter((r) => r.group === g));
  const current = ordered[Math.min(active, ordered.length - 1)];

  React.useEffect(() => setActive(0), [query]);
  React.useEffect(() => {
    list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const n = ordered.length;
      if (n) setActive((i) => (i + (e.key === "ArrowDown" ? 1 : -1) + n) % n);
    }
    if (e.key === "Enter" && current) {
      e.preventDefault();
      current.run();
    }
  };

  return (
    <div
      className="animate-pop-in overflow-hidden rounded-2xl border border-line bg-surface-raised shadow-pop"
      onKeyDown={onKeyDown}
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search className="size-[18px] shrink-0 text-fg-subtle" aria-hidden />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search pages and actions…"
          role="combobox"
          aria-expanded
          aria-controls="palette-results"
          aria-activedescendant={current ? `cmd-${current.id}` : undefined}
          aria-label="Search pages and actions"
          autoComplete="off"
          spellCheck={false}
          className="h-14 flex-1 bg-transparent text-[16px] text-fg outline-none placeholder:text-fg-subtle"
        />
        <kbd className="rounded-md border border-line bg-surface-subtle px-1.5 py-0.5 text-[11px] font-semibold text-fg-subtle">
          esc
        </kbd>
      </div>

      <ul
        ref={list}
        id="palette-results"
        role="listbox"
        aria-label="Results"
        className="max-h-[min(24rem,55vh)] overflow-y-auto p-2"
      >
        {!ordered.length && (
          <li className="px-3 py-10 text-center text-sm text-fg-muted">Nothing matches &ldquo;{query}&rdquo;.</li>
        )}
        {groups.map((group) => (
          <li key={group} role="presentation">
            <p className="px-3 pb-1.5 pt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-fg-subtle first:pt-1">
              {group}
            </p>
            <ul role="presentation">
              {results
                .filter((r) => r.group === group)
                .map((command) => {
                  const selected = command === current;
                  return (
                    <li
                      key={command.id}
                      id={`cmd-${command.id}`}
                      role="option"
                      aria-selected={selected}
                      onMouseMove={() => setActive(ordered.indexOf(command))}
                      onClick={command.run}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                        selected ? "bg-brand-subtle text-fg" : "text-fg",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-8 shrink-0 place-items-center rounded-lg [&_svg]:size-4",
                          selected ? "bg-surface text-brand-fg shadow-button" : "bg-surface-subtle text-fg-muted",
                        )}
                        aria-hidden
                      >
                        {command.icon}
                      </span>
                      <span className="min-w-0 flex-1 truncate font-semibold">{command.label}</span>
                      {command.hint && <span className="shrink-0 text-xs text-fg-subtle">{command.hint}</span>}
                      {selected && <CornerDownLeft className="size-4 shrink-0 text-brand-fg" aria-hidden />}
                    </li>
                  );
                })}
            </ul>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4 border-t border-line bg-surface-subtle/60 px-4 py-2.5 text-xs text-fg-subtle">
        <span>
          <Kbd>↑</Kbd> <Kbd>↓</Kbd> to move
        </span>
        <span>
          <Kbd>↵</Kbd> to open
        </span>
        <span className="ml-auto hidden sm:inline">
          <Kbd>G</Kbd> then a letter jumps to a page
        </span>
      </div>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-grid h-5 min-w-5 place-items-center rounded border border-line bg-surface px-1 font-sans text-[10px] font-bold text-fg-muted">
      {children}
    </kbd>
  );
}

function useCommands(close: () => void): Command[] {
  const router = useRouter();
  const { me, team, setTeam, can, mode, setMode, liveUnlocked } = useWorkspace();
  const { setTheme } = useTheme();

  const go = (href: string) => () => {
    close();
    router.push(href);
  };
  const act = (fn: () => void) => () => {
    close();
    fn();
  };
  const icon = (Icon: LucideIcon) => <Icon />;

  const commands: Command[] = ALL_ITEMS.filter((i) => !i.permission || can(i.permission)).map((item) => ({
    id: `go-${item.href}`,
    group: "Go to",
    label: item.label,
    hint: `G ${item.key.toUpperCase()}`,
    icon: icon(item.icon),
    keywords: item.keywords,
    run: go(item.href),
  }));

  if (can("keys.write")) {
    commands.push({
      id: "create-test-key",
      group: "Actions",
      label: "Create a test key",
      icon: icon(KeyRound),
      keywords: "new api key secret",
      run: go("/keys?create=test"),
    });
    if (liveUnlocked)
      commands.push({
        id: "create-live-key",
        group: "Actions",
        label: "Create a live key",
        icon: icon(KeyRound),
        keywords: "new api key secret production",
        run: go("/keys?create=live"),
      });
  }
  if (can("orders.write"))
    commands.push({
      id: "create-order",
      group: "Actions",
      label: `Create a ${mode} order`,
      icon: icon(Package),
      keywords: "new delivery order",
      run: go("/orders/new"),
    });
  if (can("webhooks.write"))
    commands.push({
      id: "add-endpoint",
      group: "Actions",
      label: "Add a webhook endpoint",
      icon: icon(Webhook),
      keywords: "new webhook url events",
      run: go("/webhooks?create=1"),
    });
  if (
    can("live.request") &&
    team.canRequestLive &&
    (team.liveStatus === "NOT_REQUESTED" || team.liveStatus === "REJECTED")
  )
    commands.push({
      id: "request-live",
      group: "Actions",
      label: team.liveStatus === "REJECTED" ? "Ask for live access again" : "Request live access",
      icon: icon(Rocket),
      keywords: "go live production approval",
      run: go("/?request=live"),
    });
  if (liveUnlocked)
    commands.push({
      id: "switch-mode",
      group: "Actions",
      label: mode === "test" ? "Switch to live mode" : "Switch to test mode",
      icon: icon(mode === "test" ? Radio : FlaskConical),
      keywords: "mode test live toggle",
      run: act(() => setMode(mode === "test" ? "live" : "test")),
    });

  for (const t of me.teams)
    if (t.id !== team.id)
      commands.push({
        id: `team-${t.id}`,
        group: "Teams",
        label: `Switch to ${t.name}`,
        icon: <TeamTile name={t.name} size={20} />,
        keywords: "team switch",
        run: act(() => setTeam(t.id)),
      });

  commands.push(
    {
      id: "theme-light",
      group: "Preferences",
      label: "Light theme",
      icon: icon(Sun),
      keywords: "appearance",
      run: act(() => setTheme("light")),
    },
    {
      id: "theme-dark",
      group: "Preferences",
      label: "Dark theme",
      icon: icon(Moon),
      keywords: "appearance",
      run: act(() => setTheme("dark")),
    },
    {
      id: "theme-system",
      group: "Preferences",
      label: "Match my system",
      icon: icon(Monitor),
      keywords: "appearance theme",
      run: act(() => setTheme("system")),
    },
    {
      id: "docs",
      group: "Help",
      label: "Open the documentation",
      icon: icon(BookOpen),
      keywords: "docs guide reference api",
      run: act(() => window.open(DOCS_URL, "_blank", "noopener")),
    },
    {
      id: "sign-out",
      group: "Help",
      label: "Sign out",
      icon: icon(LogOut),
      keywords: "log out",
      run: act(() => void signOutAndLeave()),
    },
  );
  return commands;
}
