import { House, KeyRound, Package, ScrollText, Settings, Users, Wallet, Webhook, type LucideIcon } from "lucide-react";

import type { Permission } from "@/lib/workspace";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  permission?: Permission;
  /** "G" then this key goes here (shown in the sidebar and the command palette). */
  key: string;
  /** Other words people search for it by, in the command palette. */
  keywords?: string;
};
export type NavGroup = { title: string; items: NavItem[] };

/** The sidebar. A page joins it in the step that builds it; items the role can't open are hidden. */
export const NAV: NavGroup[] = [
  {
    title: "Overview",
    items: [{ href: "/", label: "Home", icon: House, key: "h", keywords: "get started checklist setup" }],
  },
  {
    title: "Operate",
    items: [
      {
        href: "/orders",
        label: "Orders",
        icon: Package,
        permission: "orders.read",
        key: "o",
        keywords: "deliveries riders tracking create order",
      },
      {
        href: "/wallet",
        label: "Wallet",
        icon: Wallet,
        permission: "wallet.read",
        key: "m",
        keywords: "money balance top up fund transactions csv",
      },
    ],
  },
  {
    title: "Build",
    items: [
      {
        href: "/keys",
        label: "API keys",
        icon: KeyRound,
        permission: "keys.read",
        key: "k",
        keywords: "secret sk_test sk_live",
      },
      {
        href: "/webhooks",
        label: "Webhooks",
        icon: Webhook,
        permission: "webhooks.read",
        key: "w",
        keywords: "endpoints events deliveries",
      },
      {
        href: "/logs",
        label: "Request logs",
        icon: ScrollText,
        permission: "logs.read",
        key: "l",
        keywords: "requests api calls errors request id req_",
      },
    ],
  },
  {
    title: "Team",
    items: [
      {
        href: "/team",
        label: "Team",
        icon: Users,
        permission: "team.read",
        key: "t",
        keywords: "members people invite roles owner",
      },
      {
        href: "/settings",
        label: "Settings",
        icon: Settings,
        key: "s",
        keywords: "profile name email phone change live access alerts notifications ip allowlist security",
      },
    ],
  },
];

export const ALL_ITEMS = NAV.flatMap((group) => group.items);

export const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

/** The page you're on, for the breadcrumb: the nav item, plus a deeper page's own name. */
export function pageFor(pathname: string): { item?: NavItem; child?: string } {
  const item = [...ALL_ITEMS].sort((a, b) => b.href.length - a.href.length).find((i) => isActive(pathname, i.href));
  const child =
    item && pathname !== item.href && item.href !== "/"
      ? pathname === `${item.href}/new`
        ? "New"
        : CHILDREN[item.href]
      : undefined;
  return { item, child };
}

const CHILDREN: Record<string, string> = { "/webhooks": "Endpoint", "/orders": "Order" };
