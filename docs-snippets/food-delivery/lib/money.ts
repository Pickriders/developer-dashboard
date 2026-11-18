/** Pickriders amounts are in kobo: 250000 is ₦2,500. */
export const naira = (kobo: number) =>
  `₦${(kobo / 100).toLocaleString("en-NG", { maximumFractionDigits: 2 })}`;
