import type { AxiosRequestConfig } from "axios";

import { apiService, setTeamId } from "@/services/apiService";
import * as api from "./api";

/**
 * Route contract for the typed namespaces (CLAUDE.md §4.2). Every function in ./api.ts goes
 * through a generated method; tsc fails when one disappears, and this pins the rest (verb, path,
 * query, body), so a regenerated client that re-points a method fails CI, not a customer.
 */
type Captured = { method: string; url: string; params?: unknown; data?: unknown; headers: Record<string, unknown> };

let captured: Captured[] = [];

beforeAll(() => {
  apiService.instance.defaults.adapter = async (config: AxiosRequestConfig) => {
    captured.push({
      method: (config.method ?? "get").toUpperCase(),
      url: config.url ?? "",
      params: config.params,
      data: typeof config.data === "string" ? JSON.parse(config.data) : config.data,
      headers: { ...(config.headers as Record<string, unknown>) },
    });
    return { data: {}, status: 200, statusText: "OK", headers: {}, config: config as never };
  };
});

beforeEach(() => {
  captured = [];
  setTeamId(null);
});

const D = "/developer/api/v1/dashboard";

type Case = {
  name: string;
  call: () => Promise<unknown>;
  method: string;
  path: string;
  params?: unknown;
  data?: unknown;
};

const CASES: Case[] = [
  { name: "auth.me", call: () => api.auth.me(), method: "GET", path: `${D}/auth/me` },
  { name: "teams.list", call: () => api.teams.list(), method: "GET", path: `${D}/teams` },
  { name: "teams.current", call: () => api.teams.current(), method: "GET", path: `${D}/teams/current` },
  { name: "account.get", call: () => api.account.get(), method: "GET", path: `${D}/account` },
];

describe("dashboard api routes", () => {
  it.each(CASES.map((c) => [c.name, c] as const))("%s", async (_name, c) => {
    await c.call();
    expect(captured).toHaveLength(1);
    expect(captured[0]).toEqual(
      expect.objectContaining({
        method: c.method,
        url: c.path,
        ...(c.params !== undefined && { params: c.params }),
        ...(c.data !== undefined && { data: c.data }),
      }),
    );
  });

  it("has a case for every function", () => {
    const exported = Object.entries(api).flatMap(([ns, fns]) => Object.keys(fns).map((fn) => `${ns}.${fn}`));
    expect(exported.sort()).toEqual(CASES.map((c) => c.name).sort());
  });
});

describe("apiService", () => {
  it("sends the chosen team with every request, and nothing before one is chosen", async () => {
    await api.auth.me();
    expect(captured[0].headers["X-Team-Id"]).toBeUndefined();

    setTeamId("6560f0c2a1b2c3d4e5f60718");
    await api.account.get();
    expect(captured[1].headers["X-Team-Id"]).toBe("6560f0c2a1b2c3d4e5f60718");
  });
});
