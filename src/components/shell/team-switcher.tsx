"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Menu, MenuItem, MenuLabel } from "@/components/ui/menu";
import { ROLE_LABELS } from "@/lib/auth/roles";
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";

/** The team every page acts on, and the way to move to another of your teams. */
export function TeamSwitcher() {
  const { me, team, setTeam } = useWorkspace();
  const several = me.teams.length > 1;

  const face = (
    <>
      <Avatar name={team.name} shape="square" size={32} />
      <span className="min-w-0 flex-1 text-left leading-tight">
        <span className="block truncate text-sm font-bold text-fg-heading">{team.name}</span>
        <span className="block truncate text-xs text-fg-subtle">{ROLE_LABELS[team.role] ?? "Member"}</span>
      </span>
    </>
  );

  if (!several) return <div className="flex items-center gap-2.5 px-2 py-1.5">{face}</div>;

  return (
    <Menu
      label="Switch team"
      className="w-full"
      trigger={({ ref, open, ...props }) => (
        <button
          ref={ref}
          type="button"
          {...props}
          aria-label={`Team: ${team.name}. Switch team`}
          className={cn(
            "focus-ring flex w-full items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors hover:bg-surface-subtle",
            open && "bg-surface-subtle",
          )}
        >
          {face}
          <ChevronsUpDown className="size-4 shrink-0 text-fg-subtle" aria-hidden />
        </button>
      )}
    >
      <MenuLabel>Your teams</MenuLabel>
      {me.teams.map((t) => (
        <MenuItem
          key={t.id}
          selected={t.id === team.id}
          onSelect={() => setTeam(t.id)}
          icon={<Avatar name={t.name} shape="square" size={20} className="text-[9px]" />}
          hint={t.id === team.id ? <Check className="size-4 text-brand-fg" aria-label="Current team" /> : undefined}
        >
          {t.name}
        </MenuItem>
      ))}
    </Menu>
  );
}
