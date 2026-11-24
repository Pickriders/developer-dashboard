import { parseIdentifier } from "./identifier";

describe("parseIdentifier", () => {
  it("reads an email, lower-cased", () => {
    expect(parseIdentifier("  Ada@Acme.com ")).toEqual({ email: "ada@acme.com" });
  });

  it.each(["0803 123 4567", "8031234567", "+234 803 123 4567", "2348031234567"])("reads %s as a phone", (input) => {
    expect(parseIdentifier(input)).toEqual({ phone: "+2348031234567", countryCode: "NG" });
  });

  it.each(["", "ada@", "ada@acme", "12345", "0603 123 4567"])("refuses %p", (input) => {
    expect(parseIdentifier(input)).toBeNull();
  });
});
