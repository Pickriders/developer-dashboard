import { proxy } from "./proxy";

const API = "https://api.test";
const D = ["developer", "api", "v1", "dashboard"];

const upstream = (status: number, body: unknown, headers: Record<string, string> = {}) =>
  jest.fn().mockResolvedValue(
    new Response(body === null ? null : JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json", ...headers },
    }),
  );

const request = (path: string, init: RequestInit & { headers?: Record<string, string> } = {}) =>
  new Request(`https://dashboard.test/api/backend/${path}`, init);

describe("proxy", () => {
  it("forwards a dashboard call with the session as a bearer token and only the headers it needs", async () => {
    const fetchImpl = upstream(200, { user: {} }, { "request-id": "req_1", "set-cookie": "evil=1" });
    const req = request("developer/api/v1/dashboard/teams?page=2", {
      headers: { "x-team-id": "t1", cookie: "pr_dev_session=tok; other=1", "x-forwarded-for": "1.2.3.4", host: "x" },
    });

    const res = await proxy(req, [...D, "teams"], { apiUrl: `${API}/`, token: "tok", fetchImpl });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe(`${API}/developer/api/v1/dashboard/teams?page=2`);
    const sent = init.headers as Headers;
    expect(sent.get("authorization")).toBe("Bearer tok");
    expect(sent.get("x-team-id")).toBe("t1");
    expect(sent.get("x-forwarded-for")).toBe("1.2.3.4");
    expect(sent.get("cookie")).toBeNull();
    expect(res.status).toBe(200);
    expect(res.headers.get("request-id")).toBe("req_1");
    expect(res.headers.get("set-cookie")).toBeNull();
    expect(res.headers.get("cache-control")).toBe("no-store");
  });

  it("is not an open proxy: anything outside the dashboard routes is a 404", async () => {
    const fetchImpl = jest.fn();
    for (const path of [
      ["api", "v1", "users"],
      ["developer", "api", "v1", "orders"],
      [...D, "..", "..", "x"],
    ]) {
      const res = await proxy(request(path.join("/")), path, { apiUrl: API, fetchImpl });
      expect(res.status).toBe(404);
    }
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("refuses a write from another origin", async () => {
    const fetchImpl = jest.fn();
    const req = request("x", { method: "POST", headers: { origin: "https://evil.test" }, body: "{}" });

    const res = await proxy(req, [...D, "api-keys"], { apiUrl: API, token: "tok", fetchImpl });

    expect(res.status).toBe(403);
    expect((await res.json()).error.code).toBe("cross_site_request");
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("moves the token from a sign-in response into an httpOnly cookie, out of the body", async () => {
    const fetchImpl = upstream(200, { accessToken: "secret-token", expiresIn: 3600, user: { id: "u1" } });
    const req = request("x", { method: "POST", headers: { origin: "https://dashboard.test" }, body: "{}" });

    const res = await proxy(req, [...D, "auth", "login"], { apiUrl: API, fetchImpl });

    const body = await res.json();
    expect(body).toEqual({ expiresIn: 3600, user: { id: "u1" } });
    const cookie = res.headers.get("set-cookie") ?? "";
    expect(cookie).toMatch(/^pr_dev_session=secret-token; Max-Age=3600; Path=\/; HttpOnly; SameSite=Lax/);
  });

  it.each([
    ["auth", "signup"],
    ["auth", "password", "reset"],
  ])("starts a session from %s/%s too", async (...route) => {
    const fetchImpl = upstream(201, { accessToken: "t", expiresIn: 60 });
    const res = await proxy(request("x", { method: "POST", body: "{}" }), [...D, ...route], { apiUrl: API, fetchImpl });
    expect(res.headers.get("set-cookie")).toContain("pr_dev_session=t");
  });

  it("passes a failed sign-in through untouched, without a cookie", async () => {
    const error = { error: { code: "invalid_credentials" } };
    const res = await proxy(request("x", { method: "POST", body: "{}" }), [...D, "auth", "login"], {
      apiUrl: API,
      fetchImpl: upstream(401, error),
    });
    expect(res.status).toBe(401);
    expect(await res.json()).toEqual(error);
    expect(res.headers.get("set-cookie")).toBeNull();
  });

  it("clears the cookie when a signed-in call comes back 401", async () => {
    const res = await proxy(request("x"), [...D, "auth", "me"], {
      apiUrl: API,
      token: "old",
      fetchImpl: upstream(401, {}),
    });
    expect(res.headers.get("set-cookie")).toMatch(/^pr_dev_session=; Max-Age=0/);
  });

  it("answers 502 when the API can't be reached", async () => {
    const fetchImpl = jest.fn().mockRejectedValue(new TypeError("fetch failed"));
    const res = await proxy(request("x"), [...D, "auth", "me"], { apiUrl: API, fetchImpl });
    expect(res.status).toBe(502);
    expect((await res.json()).error.code).toBe("api_unreachable");
  });

  it("passes a 204 through with no body", async () => {
    const res = await proxy(request("x", { method: "POST", body: "{}" }), [...D, "invitations", "decline"], {
      apiUrl: API,
      fetchImpl: upstream(204, null),
    });
    expect(res.status).toBe(204);
    expect(await res.text()).toBe("");
  });
});
