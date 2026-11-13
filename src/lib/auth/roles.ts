import type { DeveloperTeamSummaryDto } from "@/services/apiService";

/** Team roles as people say them. */
export const ROLE_LABELS: Record<DeveloperTeamSummaryDto["role"], string> = {
  TEAM_OWNER: "Owner",
  TEAM_ADMIN: "Admin",
  TEAM_DEVELOPER: "Developer",
  TEAM_FINANCE: "Finance",
  TEAM_VIEWER: "Viewer",
  TEAM_MEMBER: "Member",
};

/** What each role can do, in a line: shown when inviting and changing roles. */
export const ROLE_HINTS: Record<"TEAM_ADMIN" | "TEAM_DEVELOPER" | "TEAM_FINANCE" | "TEAM_VIEWER", string> = {
  TEAM_ADMIN: "Everything, including people and settings. Only the owner hands over the team.",
  TEAM_DEVELOPER: "API keys, webhooks and orders. Sees the wallet and logs.",
  TEAM_FINANCE: "Funds the wallet and sees billing. Sees everything else.",
  TEAM_VIEWER: "Sees everything, changes nothing.",
};

/** Roles from most to least, for "can this person manage that one". */
export const ROLE_RANK: Record<DeveloperTeamSummaryDto["role"], number> = {
  TEAM_OWNER: 5,
  TEAM_ADMIN: 4,
  TEAM_DEVELOPER: 2,
  TEAM_MEMBER: 2,
  TEAM_FINANCE: 2,
  TEAM_VIEWER: 1,
};
