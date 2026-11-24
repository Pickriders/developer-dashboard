import { COUNTRY, nationalNumber } from "./phone";

/**
 * What someone typed in "Email or phone number": a Pickriders account signs in with either, the same
 * as in the apps. An "@" means an email; otherwise it must read as a Nigerian mobile number.
 */
export type Identifier = { email: string } | { phone: string; countryCode: string };

export const looksLikeEmail = (input: string) => input.includes("@");

export function parseIdentifier(input: string): Identifier | null {
  const value = input.trim();
  if (!value) return null;
  if (looksLikeEmail(value)) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? { email: value.toLowerCase() } : null;
  }
  const national = nationalNumber(value);
  return national ? { phone: `${COUNTRY.dial}${national}`, countryCode: COUNTRY.code } : null;
}
