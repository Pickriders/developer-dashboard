import { passwordStrength } from "./password";

describe("passwordStrength", () => {
  it("counts down to the minimum length", () => {
    expect(passwordStrength("")).toEqual(expect.objectContaining({ score: 0, label: "" }));
    expect(passwordStrength("abc")).toEqual({ score: 0, label: "Too short", hint: "5 more characters to go." });
    expect(passwordStrength("abcdeft").hint).toBe("1 more character to go.");
  });

  it.each(["password123", "Qwerty!!2024", "aaaaaaaaaa", "abcdefghij", "1234567890"])(
    "flags %s as easy to guess",
    (p) => {
      expect(passwordStrength(p).score).toBe(1);
    },
  );

  it("flags passwords built from the person's own name or email", () => {
    expect(passwordStrength("adaobi-2026", ["Ada", "adaobi@acme.com".split("@")[0]]).label).toBe("Easy to guess");
  });

  it("rewards length over symbols", () => {
    expect(passwordStrength("tiger-lamp").label).toBe("Fair");
    expect(passwordStrength("tiger-lamp-rain").label).toBe("Good");
    expect(passwordStrength("correct horse battery").label).toBe("Strong");
  });

  it("asks for no composition rules: a long lowercase phrase is strong", () => {
    expect(passwordStrength("purple river under the bridge").score).toBe(4);
  });
});
