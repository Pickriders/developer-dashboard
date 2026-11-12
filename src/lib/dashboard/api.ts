import { apiService } from "@/services/apiService";

/**
 * Typed namespaces over the generated client (CLAUDE.md §5): one function per dashboard route,
 * each pinned by a case in api.test.ts. Pages use the hooks over these, never apiService.
 */
export const auth = {
  me: () => apiService.developerMe(),
};

export const teams = {
  list: () => apiService.developerListTeams(),
  current: () => apiService.developerCurrentTeam(),
};

export const account = {
  get: () => apiService.developerGetAccount(),
};
