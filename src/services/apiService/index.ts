import { AxiosError } from "axios";

import { API_URL } from "@/constant";
import { Developer } from "./Developer";

/**
 * The one HTTP client for the dashboard. `Developer` is generated from backend-api's Swagger
 * document (`yarn generate-types`) and holds the /developer/api/v1/dashboard routes; this file is
 * the only hand-written piece in the folder and owns what every request shares:
 *
 * - the team: `X-Team-Id` for the team chosen in the team switcher (setTeamId);
 * - a dead session: 401 sends the person to sign in, with a way back.
 *
 * The session itself lives in an httpOnly cookie that browser code can't read (CLAUDE.md §3); how
 * requests carry it arrives with the auth screens in step 11.2.
 */
let teamId: string | null = null;

/** The team every request acts on. Only ever one of the signed-in user's own teams. */
export const setTeamId = (id: string | null) => {
  teamId = id;
};

const apiService = new Developer({
  baseURL: API_URL,
  timeout: 30_000,
  timeoutErrorMessage: "The request took too long. Check your connection and try again.",
  withCredentials: true,
});

apiService.instance.interceptors.request.use((config) => {
  if (teamId) config.headers.set("X-Team-Id", teamId);
  return config;
});

let redirecting = false;

apiService.instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (
      error.response?.status === 401 &&
      typeof window !== "undefined" &&
      !window.location.pathname.startsWith("/auth") &&
      !redirecting
    ) {
      redirecting = true;
      const back = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.href = `/auth/login?redirect=${back}&reason=expired`;
    }
    return Promise.reject(error);
  },
);

export { apiService };

export * from "./data-contracts";
