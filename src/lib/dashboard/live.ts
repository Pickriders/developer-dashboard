import type { BadgeTone } from "@/components/ui/badge";
import type { DeveloperAccountDto } from "@/services/apiService";

/** How a team's live access is named, and the tone of its badge. */
export const LIVE_STATUS: Record<DeveloperAccountDto["liveStatus"], [string, BadgeTone]> = {
  NOT_REQUESTED: ["Test mode only", "neutral"],
  PENDING: ["In review", "warning"],
  APPROVED: ["Live", "success"],
  REJECTED: ["Not approved", "danger"],
  SUSPENDED: ["Suspended", "danger"],
};

/** A website as the API takes it: with a scheme. "acme.com" becomes "https://acme.com". */
export const withScheme = (website: string): string => {
  const trimmed = website.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};
