import { House, KeyRound, Webhook, type LucideIcon } from "lucide-react";

import type { Permission } from "@/lib/workspace";

export type NavItem = { href: string; label: string; icon: LucideIcon; permission?: Permission };
export type NavGroup = { title?: string; items: NavItem[] };

/** The sidebar. A page joins it in the step that builds it; items the role can't open are hidden. */
export const NAV: NavGroup[] = [
  { items: [{ href: "/", label: "Home", icon: House }] },
  {
    title: "Developers",
    items: [
      { href: "/keys", label: "API keys", icon: KeyRound, permission: "keys.read" },
      { href: "/webhooks", label: "Webhooks", icon: Webhook, permission: "webhooks.read" },
    ],
  },
];

export const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
