"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { RailTip } from "./rail-tip";
import { Menu, MenuItem, MenuLabel } from "@/components/ui/menu";
import { ROLE_LABELS } from "@/lib/auth/roles";
import { type Team, useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";

const LIVE: Record<Team["liveStatus"], { label: string; dot: string }> = {
  NOT_REQUESTED: { label: "Test mode", dot: "bg-warning" },
  PENDING: { label: "Live in review", dot: "bg-warning" },
  REJECTED: { label: "Live not approved", dot: "bg-danger" },
  SUSPENDED: { label: "Live suspended", dot: "bg-danger" },
  APPROVED: { label: "Live", dot: "bg-success" },
};

/** A team's tile: its first letter on the brand gradient. */
export function TeamTile({ name, size = 36 }: { name: string; size?: number }) {
  return (
    <span
      aria-hidden
      style={{ width: size, height: size, fontSize: Math.round(size * 0.42) }}
      className="grid shrink-0 place-items-center rounded-[10px] bg-gradient-to-br from-brand to-plum-mid font-extrabold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.2)]"
    >
      {name.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
}

/** The team every page acts on, whether it's live, and the way to move to another of your teams. */
export function TeamSwitcher({ rail = false }: { rail?: boolean }) {
  const { me, team, setTeam } = useWorkspace();
  const several = me.teams.length > 1;
  const live = LIVE[team.liveStatus];

  const face = (
    <>
      <TeamTile name={team.name} />
      {!rail && (
        <span className="min-w-0 flex-1 text-left leading-tight">
          <span className="block truncate text-sm font-bold text-nav-fg">{team.name}</span>
          <span className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-nav-muted">
            <span className={cn("size-1.5 shrink-0 rounded-full", live.dot)} aria-hidden />
            {live.label} · {ROLE_LABELS[team.role] ?? "Member"}
          </span>
        </span>
      )}
    </>
  );
  const card = cn(
    "flex w-full items-center gap-3 rounded-xl bg-white/[0.06] ring-1 ring-inset ring-white/[0.08]",
    rail ? "justify-center p-1.5" : "p-2 pr-2.5",
  );

  if (!several)
    return (
      <div className={cn(card, "group relative")} aria-label={`Team: ${team.name}`}>
        {face}
        {rail && <RailTip>{team.name}</RailTip>}
      </div>
    );

  return (
    <Menu
      label="Switch team"
      className={rail ? "w-60" : "w-full"}
      trigger={({ ref, open, ...props }) => (
        <button
          ref={ref}
          type="button"
          {...props}
          aria-label={`Team: ${team.name}. Switch team`}
          className={cn(
            card,
            "focus-ring group relative transition-colors hover:bg-white/[0.09]",
            open && "bg-white/[0.09]",
          )}
        >
          {face}
          {!rail && <ChevronsUpDown className="size-4 shrink-0 text-nav-subtle" aria-hidden />}
          {rail && <RailTip>{team.name}</RailTip>}
        </button>
      )}
    >
      <MenuLabel>Your teams</MenuLabel>
      {me.teams.map((t) => (
        <MenuItem
          key={t.id}
          selected={t.id === team.id}
          onSelect={() => setTeam(t.id)}
          icon={<TeamTile name={t.name} size={22} />}
          hint={t.id === team.id ? <Check className="size-4 text-brand-fg" aria-label="Current team" /> : undefined}
        >
          {t.name}
        </MenuItem>
      ))}
    </Menu>
  );
}
