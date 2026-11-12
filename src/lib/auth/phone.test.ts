import { formatPhone, formatPhoneInput, nationalNumber } from "./phone";

describe("phone", () => {
  it.each([
    ["08031234567", "8031234567"],
    ["0803 123 4567", "8031234567"],
    ["803-123-4567", "8031234567"],
    ["+234 803 123 4567", "8031234567"],
    ["2348031234567", "8031234567"],
  ])("reads %s", (input, national) => {
    expect(nationalNumber(input)).toBe(national);
  });

  it.each(["", "0803123456", "0603 123 4567", "+1 415 555 0100"])("rejects %s", (input) => {
    expect(nationalNumber(input)).toBeNull();
  });

  it("formats stored numbers for display", () => {
    expect(formatPhone("2348031234567")).toBe("+234 803 123 4567");
    expect(formatPhone("not a phone")).toBe("not a phone");
  });

  it("groups digits as they are typed", () => {
    expect(formatPhoneInput("803")).toBe("803");
    expect(formatPhoneInput("8031")).toBe("803 1");
    expect(formatPhoneInput("08031234567")).toBe("803 123 4567");
    expect(formatPhoneInput("+234 803 123 4567")).toBe("803 123 4567");
    expect(formatPhoneInput("8031234567999")).toBe("803 123 4567");
  });
});
