"use client";

import * as React from "react";

import { useMe } from "@/lib/dashboard/hooks";
import { setTeamId, type DeveloperMeResponseDto, type DeveloperTeamSummaryDto } from "@/services/apiService";

export type Team = DeveloperTeamSummaryDto;
export type Permission = Team["permissions"][number];
export type Mode = "test" | "live";

type Workspace = {
  me: DeveloperMeResponseDto;
  /** The team every request acts on (X-Team-Id). Always one of the signed-in user's own teams. */
  team: Team;
  setTeam: (id: string) => void;
  /** Whether the user's role in this team allows it. Hide what it doesn't; the API is the real guard. */
  can: (permission: Permission) => boolean;
  /**
   * Test or live: every page shows this mode's data. Live only once Pickriders has approved the
   * team; until then (and if live access is later suspended) it is test, whatever was chosen.
   */
  mode: Mode;
  setMode: (mode: Mode) => void;
  liveUnlocked: boolean;
};

const WorkspaceContext = React.createContext<Workspace | null>(null);

/** Remembered per browser, so a refresh or a new tab opens the team (and its mode) you were in. */
const TEAM_KEY = "pr_dev_team";
const modeKey = (teamId: string) => `pr_dev_mode:${teamId}`;

const read = (key: string) => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};
const write = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Private mode: the choice lasts until the tab closes.
  }
};

/**
 * Picks the team for the signed-in session and points the API client at it before any page asks
 * for data. A remembered team the user has since left falls back to their first team.
 */
export function WorkspaceProvider({
  loading,
  noTeam,
  children,
}: {
  loading: React.ReactNode;
  noTeam: React.ReactNode;
  children: React.ReactNode;
}) {
  const me = useMe();
  // Read straight away, not in an effect: nothing renders from them until `me` has loaded in the
  // browser, so there is no server markup to disagree with, and no flash of the wrong team or mode.
  const [chosen, setChosen] = React.useState<string | null>(() =>
    typeof window === "undefined" ? null : read(TEAM_KEY),
  );
  const [modes, setModes] = React.useState<Record<string, Mode>>({});

  const teams = me.data?.teams ?? [];
  const team = teams.find((t) => t.id === chosen) ?? teams[0];
  const liveUnlocked = team?.liveStatus === "APPROVED";
  const chosenMode = team ? (modes[team.id] ?? (read(modeKey(team.id)) === "live" ? "live" : "test")) : "test";
  const mode: Mode = liveUnlocked && chosenMode === "live" ? "live" : "test";
  // Set during render, not in an effect: the pages below fetch on their first render and must
  // already carry the team. setTeamId only stores the id, so running it again is harmless.
  if (team) setTeamId(team.id);

  const value = React.useMemo<Workspace | null>(
    () =>
      me.data && team
        ? {
            me: me.data,
            team,
            setTeam: (id) => {
              write(TEAM_KEY, id);
              setChosen(id);
            },
            can: (permission) => team.permissions.includes(permission),
            mode,
            liveUnlocked,
            setMode: (next) => {
              if (next === "live" && !liveUnlocked) return;
              write(modeKey(team.id), next);
              setModes((current) => ({ ...current, [team.id]: next }));
            },
          }
        : null,
    [me.data, team, mode, liveUnlocked],
  );

  if (!me.data) return <>{loading}</>;
  if (!value) return <>{noTeam}</>;
  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const workspace = React.useContext(WorkspaceContext);
  if (!workspace) throw new Error("useWorkspace needs a <WorkspaceProvider> above it.");
  return workspace;
}
