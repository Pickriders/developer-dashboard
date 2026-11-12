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
