"use client";

import * as React from "react";

import { useMe } from "@/lib/dashboard/hooks";
import { setTeamId, type DeveloperMeResponseDto, type DeveloperTeamSummaryDto } from "@/services/apiService";

export type Team = DeveloperTeamSummaryDto;
export type Permission = Team["permissions"][number];

type Workspace = {
  me: DeveloperMeResponseDto;
  /** The team every request acts on (X-Team-Id). Always one of the signed-in user's own teams. */
  team: Team;
  setTeam: (id: string) => void;
  /** Whether the user's role in this team allows it. Hide what it doesn't; the API is the real guard. */
  can: (permission: Permission) => boolean;
};

const WorkspaceContext = React.createContext<Workspace | null>(null);

/** Remembered per browser, so a refresh or a new tab opens the team you were in. Not a secret. */
const TEAM_KEY = "pr_dev_team";

const readTeam = () => {
  try {
    return window.localStorage.getItem(TEAM_KEY);
  } catch {
    return null;
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
  const [chosen, setChosen] = React.useState<string | null>(null);
  React.useEffect(() => setChosen(readTeam()), []);

  const teams = me.data?.teams ?? [];
  const team = teams.find((t) => t.id === chosen) ?? teams[0];
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
              try {
                window.localStorage.setItem(TEAM_KEY, id);
              } catch {
                // Private mode: the choice lasts until the tab closes.
              }
              setChosen(id);
            },
            can: (permission) => team.permissions.includes(permission),
          }
        : null,
    [me.data, team],
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
