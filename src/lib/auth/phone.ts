/**
 * Nigerian phone numbers, the only country sign-up offers today. The API stores them as
 * "2348031234567"; people type "0803 123 4567", "803…" or "+234 803…".
 */
export const COUNTRY = { code: "NG", dial: "+234", flag: "🇳🇬", example: "803 123 4567" } as const;

/** The ten national digits ("8031234567"), or null when it isn't a Nigerian mobile number. */
export function nationalNumber(input: string): string | null {
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("234")) digits = digits.slice(3);
  if (digits.startsWith("0")) digits = digits.slice(1);
  return /^[789]\d{9}$/.test(digits) ? digits : null;
}

/** "+234 803 123 4567" from whatever was typed or stored; the input unchanged if it can't be read. */
export function formatPhone(value: string): string {
  const national = nationalNumber(value);
  if (!national) return value;
  return `${COUNTRY.dial} ${national.slice(0, 3)} ${national.slice(3, 6)} ${national.slice(6)}`;
}

/**
 * Formats as the person types, "803 123 4567". The field shows +234 in front, so a typed or pasted
 * leading 0 or 234 is dropped rather than doubled up.
 */
export function formatPhoneInput(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("234") && digits.length > 10) digits = digits.slice(3);
  if (digits.startsWith("0")) digits = digits.slice(1);
  digits = digits.slice(0, 10);
  return [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6)].filter(Boolean).join(" ");
}
