import axios, { AxiosError } from "axios";

import { isGuestPath, isOpenPath } from "@/lib/session/paths";
import { Developer } from "./Developer";

/**
 * The one HTTP client for the dashboard. `Developer` is generated from backend-api's Swagger
 * document (`yarn generate-types`) and holds the /developer/api/v1/dashboard routes; this file is
 * the only hand-written piece in the folder and owns what every request shares:
 *
 * - the route: every call goes to our own /api/backend, which forwards it to the API with the
 *   session cookie as the bearer token (src/lib/session/proxy.ts). The token lives in an httpOnly
 *   cookie, so nothing here can read it, and sign-in responses arrive without it;
 * - the team: `X-Team-Id` for the team chosen in the team switcher (setTeamId);
 * - a dead session: 401 sends the person to sign in, with a way back.
 */
let teamId: string | null = null;

/** The team every request acts on. Only ever one of the signed-in user's own teams. */
export const setTeamId = (id: string | null) => {
  teamId = id;
};

const apiService = new Developer({
  baseURL: "/api/backend",
  timeout: 30_000,
  timeoutErrorMessage: "The request took too long. Check your connection and try again.",
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
      !isGuestPath(window.location.pathname) &&
      !isOpenPath(window.location.pathname) &&
      !redirecting
    ) {
      redirecting = true;
      const back = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.href = `/auth/login?redirect=${back}&reason=expired`;
    }
    return Promise.reject(error);
  },
);

/** Clears the session cookie (our own route, not the API) and forgets the team. */
export async function signOut() {
  await axios.delete("/api/session");
  teamId = null;
}

export { apiService };

export * from "./data-contracts";
