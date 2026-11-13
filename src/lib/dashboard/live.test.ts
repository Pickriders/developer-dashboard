import { withScheme } from "./live";

describe("withScheme", () => {
  it("adds https:// to a bare domain", () => {
    expect(withScheme("acme.com")).toBe("https://acme.com");
    expect(withScheme("  shop.acme.com/ng ")).toBe("https://shop.acme.com/ng");
  });

  it("keeps a scheme that's there", () => {
    expect(withScheme("http://acme.com")).toBe("http://acme.com");
    expect(withScheme("HTTPS://acme.com")).toBe("HTTPS://acme.com");
  });

  it("leaves an empty value empty", () => {
    expect(withScheme("   ")).toBe("");
  });
});
