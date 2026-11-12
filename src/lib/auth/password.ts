/**
 * Password guidance, after NIST SP 800-63B: length is what matters, so there are no composition
 * rules ("one symbol, one capital"). The only hard rule is the API's: 8 to 128 characters. The
 * meter nudges towards 12+ and away from passwords on every breach list.
 */
export const PASSWORD_MIN = 8;
export const PASSWORD_MAX = 128;

export type Strength = { score: 0 | 1 | 2 | 3 | 4; label: string; hint: string };

/** The most guessed passwords and their usual shapes. Short on purpose: a nudge, not a breach check. */
const COMMON = [
  "password",
  "passw0rd",
  "123456",
  "12345678",
  "123456789",
  "1234567890",
  "qwerty",
  "qwertyuiop",
  "abc123",
  "111111",
  "iloveyou",
  "admin",
  "welcome",
  "letmein",
  "monkey",
  "dragon",
  "football",
  "baseball",
  "sunshine",
  "princess",
  "pickriders",
];

const variety = (value: string) =>
  [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].reduce((n, re) => n + (re.test(value) ? 1 : 0), 0);

/** True when the value is mostly one repeated character or a straight run like "abcdefgh". */
const isPattern = (value: string) => {
  if (new Set(value.toLowerCase()).size <= 2) return true;
  let run = 1;
  for (let i = 1; i < value.length; i++) {
    run = Math.abs(value.charCodeAt(i) - value.charCodeAt(i - 1)) === 1 ? run + 1 : 1;
    if (run >= value.length - 1) return true;
  }
  return false;
};

export function passwordStrength(value: string, avoid: string[] = []): Strength {
  if (!value) return { score: 0, label: "", hint: `Use at least ${PASSWORD_MIN} characters.` };
  if (value.length < PASSWORD_MIN) {
    const left = PASSWORD_MIN - value.length;
    return { score: 0, label: "Too short", hint: `${left} more character${left === 1 ? "" : "s"} to go.` };
  }

  const lower = value.toLowerCase();
  const personal = avoid.map((a) => a.trim().toLowerCase()).filter((a) => a.length >= 3);
  if (COMMON.some((c) => lower.includes(c)) || isPattern(value) || personal.some((p) => lower.includes(p))) {
    return { score: 1, label: "Easy to guess", hint: "Avoid common words, your name and simple patterns." };
  }

  const points = (value.length >= 12 ? 2 : 0) + (value.length >= 16 ? 1 : 0) + (variety(value) >= 3 ? 1 : 0);
  if (points >= 3) return { score: 4, label: "Strong", hint: "Great password." };
  if (points >= 2) return { score: 3, label: "Good", hint: "Longer is even better." };
  return { score: 2, label: "Fair", hint: "Use 12 or more characters. A short phrase works well." };
}
