import { isGuestPath, isOpenPath, safeRedirect } from "./paths";

describe("session paths", () => {
  it("knows guest and open pages", () => {
    expect(isGuestPath("/auth/login")).toBe(true);
    expect(isGuestPath("/auth/signup")).toBe(true);
    expect(isGuestPath("/auth/verify")).toBe(false);
    expect(isGuestPath("/auth/login-help")).toBe(false);
    expect(isOpenPath("/auth/invite")).toBe(true);
    expect(isOpenPath("/design")).toBe(true);
    expect(isOpenPath("/")).toBe(false);
  });

  it.each([
    ["/orders?status=open#x", "/orders?status=open#x"],
    ["/auth/verify?next=%2F", "/auth/verify?next=%2F"],
  ])("follows %s", (value, expected) => {
    expect(safeRedirect(value)).toBe(expected);
  });

  it.each([
    null,
    "",
    "https://evil.test",
    "//evil.test",
    "/\\evil.test",
    "orders",
    "/auth/login",
    "javascript:alert(1)",
  ])("refuses %s", (value) => {
    expect(safeRedirect(value)).toBe("/");
  });
});
