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

const TOKEN = "inv_open_0000000000000000001";
const KEY = "6560f0c2a1b2c3d4e5f60718";
const WE = "we_6560f0c2a1b2c3d4e5f60718";
const EVT = "evt_6560f0c2a1b2c3d4e5f60718";
const STOP = {
  lat: 6.43,
  lng: 3.42,
  address: "1 Admiralty Way, Lekki",
  contact: { name: "Bola", phone: "+2348031234567" },
};
const ORDER = { type: "single" as const, service_area: "NG-LA", stops: [STOP, STOP] };
const HOOK = { url: "https://acme.test/hooks", enabled_events: ["order.delivered" as const], livemode: false };
const SIGNUP = { firstname: "Ada", lastname: "Obi", email: "ada@acme.com", phone: "+2348031234567", password: "p" };

const CASES: Case[] = [
  { name: "auth.me", call: () => api.auth.me(), method: "GET", path: `${D}/auth/me` },
  { name: "auth.signup", call: () => api.auth.signup(SIGNUP), method: "POST", path: `${D}/auth/signup`, data: SIGNUP },
  {
    name: "auth.login",
    call: () => api.auth.login({ email: "ada@acme.com", password: "p" }),
    method: "POST",
    path: `${D}/auth/login`,
    data: { email: "ada@acme.com", password: "p" },
  },
  {
    name: "auth.sendEmailCode",
    call: () => api.auth.sendEmailCode("new@acme.com"),
    method: "POST",
    path: `${D}/auth/verification/email/send`,
    data: { email: "new@acme.com" },
  },
  {
    name: "auth.verifyEmail",
    call: () => api.auth.verifyEmail("1234"),
    method: "POST",
    path: `${D}/auth/verification/email`,
    data: { code: "1234" },
  },
  {
    name: "auth.sendPhoneCode",
    call: () => api.auth.sendPhoneCode(),
    method: "POST",
    path: `${D}/auth/verification/phone/send`,
    data: {},
  },
  {
    name: "auth.verifyPhone",
    call: () => api.auth.verifyPhone("5678"),
    method: "POST",
    path: `${D}/auth/verification/phone`,
    data: { code: "5678" },
  },
  {
    name: "auth.forgotPassword",
    call: () => api.auth.forgotPassword({ email: "ada@acme.com" }),
    method: "POST",
    path: `${D}/auth/password/forgot`,
    data: { email: "ada@acme.com" },
  },
  {
    name: "auth.resetPassword",
    call: () => api.auth.resetPassword({ email: "ada@acme.com", code: "1234", password: "new-password" }),
    method: "POST",
    path: `${D}/auth/password/reset`,
    data: { email: "ada@acme.com", code: "1234", password: "new-password" },
  },
  {
    name: "invitations.preview",
    call: () => api.invitations.preview(TOKEN),
    method: "POST",
    path: `${D}/invitations/preview`,
    data: { token: TOKEN },
  },
  {
    name: "invitations.accept",
    call: () => api.invitations.accept(TOKEN),
    method: "POST",
    path: `${D}/invitations/accept`,
    data: { token: TOKEN },
  },
  {
    name: "invitations.decline",
    call: () => api.invitations.decline(TOKEN),
    method: "POST",
    path: `${D}/invitations/decline`,
    data: { token: TOKEN },
  },
  { name: "teams.list", call: () => api.teams.list(), method: "GET", path: `${D}/teams` },
  { name: "teams.current", call: () => api.teams.current(), method: "GET", path: `${D}/teams/current` },
  { name: "account.get", call: () => api.account.get(), method: "GET", path: `${D}/account` },
  {
    name: "account.update",
    call: () => api.account.update({ useCase: "Same-day deliveries" }),
    method: "PATCH",
    path: `${D}/account`,
    data: { useCase: "Same-day deliveries" },
  },
  { name: "account.onboarding", call: () => api.account.onboarding(), method: "GET", path: `${D}/account/onboarding` },
  {
    name: "account.requestLiveAccess",
    call: () => api.account.requestLiveAccess(),
    method: "POST",
    path: `${D}/account/live-access`,
  },
  {
    name: "keys.list",
    call: () => api.keys.list("live"),
    method: "GET",
    path: `${D}/api-keys`,
    params: { livemode: "true" },
  },
  {
    name: "keys.create",
    call: () => api.keys.create({ label: "Laptop", livemode: false, scopes: ["orders:write"] }),
    method: "POST",
    path: `${D}/api-keys`,
    data: { label: "Laptop", livemode: false, scopes: ["orders:write"] },
  },
  {
    name: "keys.roll",
    call: () => api.keys.roll(KEY, "24h"),
    method: "POST",
    path: `${D}/api-keys/${KEY}/roll`,
    data: { expiresIn: "24h" },
  },
  { name: "keys.revoke", call: () => api.keys.revoke(KEY), method: "POST", path: `${D}/api-keys/${KEY}/revoke` },
  {
    name: "webhooks.list",
    call: () => api.webhooks.list("test"),
    method: "GET",
    path: `${D}/webhook-endpoints`,
    params: { livemode: "false", limit: 100 },
  },
  { name: "webhooks.get", call: () => api.webhooks.get(WE), method: "GET", path: `${D}/webhook-endpoints/${WE}` },
  {
    name: "webhooks.create",
    call: () => api.webhooks.create(HOOK),
    method: "POST",
    path: `${D}/webhook-endpoints`,
    data: HOOK,
  },
  {
    name: "webhooks.update",
    call: () => api.webhooks.update(WE, { disabled: true }),
    method: "PATCH",
    path: `${D}/webhook-endpoints/${WE}`,
    data: { disabled: true },
  },
  {
    name: "webhooks.remove",
    call: () => api.webhooks.remove(WE),
    method: "DELETE",
    path: `${D}/webhook-endpoints/${WE}`,
  },
  {
    name: "webhooks.rollSecret",
    call: () => api.webhooks.rollSecret(WE),
    method: "POST",
    path: `${D}/webhook-endpoints/${WE}/roll-secret`,
  },
  {
    name: "webhooks.deliveries",
    call: () => api.webhooks.deliveries(WE, "whd_1"),
    method: "GET",
    path: `${D}/webhook-endpoints/${WE}/deliveries`,
    params: { limit: 20, starting_after: "whd_1" },
  },
  {
    name: "webhooks.test",
    call: () => api.webhooks.test(WE),
    method: "POST",
    path: `${D}/webhook-endpoints/${WE}/test`,
  },
  {
    name: "orders.list",
    call: () => api.orders.list("test", { status: "delivered" }, "ord_1"),
    method: "GET",
    path: `${D}/orders`,
    params: { livemode: "false", limit: 20, status: "delivered", starting_after: "ord_1" },
  },
  {
    name: "orders.get",
    call: () => api.orders.get("live", "ord_1"),
    method: "GET",
    path: `${D}/orders/ord_1`,
    params: { livemode: "true" },
  },
  {
    name: "orders.tracking",
    call: () => api.orders.tracking("test", "ord_1"),
    method: "GET",
    path: `${D}/orders/ord_1/tracking`,
    params: { livemode: "false" },
  },
  {
    name: "orders.quote",
    call: () => api.orders.quote("test", ORDER),
    method: "POST",
    path: `${D}/quotes`,
    params: { livemode: "false" },
    data: ORDER,
  },
  {
    name: "orders.create",
    call: () => api.orders.create("test", { quote_id: "quo_1" }),
    method: "POST",
    path: `${D}/orders`,
    params: { livemode: "false" },
    data: { quote_id: "quo_1" },
  },
  {
    name: "orders.cancel",
    call: () => api.orders.cancel("test", "ord_1", "Changed my mind"),
    method: "POST",
    path: `${D}/orders/ord_1/cancel`,
    params: { livemode: "false" },
    data: { reason: "Changed my mind" },
  },
  {
    name: "orders.advance",
    call: () => api.orders.advance("ord_1", "delivered"),
    method: "POST",
    path: `${D}/orders/ord_1/advance`,
    data: { to: "delivered" },
  },
  { name: "orders.serviceAreas", call: () => api.orders.serviceAreas(), method: "GET", path: `${D}/service-areas` },
  {
    name: "logs.list",
    call: () => api.logs.list("test", { status: "failed", path: "/orders" }, "log_1"),
    method: "GET",
    path: `${D}/request-logs`,
    params: { livemode: "false", limit: 25, status: "failed", path: "/orders", starting_after: "log_1" },
  },
  { name: "logs.get", call: () => api.logs.get(KEY), method: "GET", path: `${D}/request-logs/${KEY}` },
  {
    name: "webhooks.resend",
    call: () => api.webhooks.resend(WE, EVT),
    method: "POST",
    path: `${D}/webhook-endpoints/${WE}/resend`,
    data: { event_id: EVT },
  },
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
  it("calls our own /api/backend proxy, never the API directly", () => {
    expect(apiService.instance.defaults.baseURL).toBe("/api/backend");
  });

  it("sends the chosen team with every request, and nothing before one is chosen", async () => {
    await api.auth.me();
    expect(captured[0].headers["X-Team-Id"]).toBeUndefined();

    setTeamId("6560f0c2a1b2c3d4e5f60718");
    await api.account.get();
    expect(captured[1].headers["X-Team-Id"]).toBe("6560f0c2a1b2c3d4e5f60718");
  });
});
