import { describeScopes, NO_ACCESS, scopesFor } from "./scopes";

describe("scopes", () => {
  it("sends one scope per resource with access", () => {
    expect(scopesFor({ ...NO_ACCESS, orders: "write", wallet: "read" })).toEqual(["orders:write", "wallet:read"]);
    expect(scopesFor(NO_ACCESS)).toEqual([]);
  });

  it("describes a key in a few words", () => {
    expect(describeScopes([])).toBe("Full access");
    expect(describeScopes(["wallet:read", "orders:write"])).toBe("Orders: write · Wallet: read");
    expect(describeScopes(["events:read"])).toBe("Events: read");
  });
});
