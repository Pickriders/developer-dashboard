"use client";

import { BookOpen, ChevronsUpDown, LogOut } from "lucide-react";

import { signOutAndLeave } from "@/components/auth/sign-out-button";
import { ThemeToggle } from "@/components/kit/theme-toggle";
import { Avatar } from "@/components/ui/avatar";
import { Menu, MenuItem, MenuSeparator } from "@/components/ui/menu";
import { DOCS_URL } from "@/constant";
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";

/** The signed-in person at the foot of the sidebar: theme, docs and sign out. */
export function AccountMenu() {
  const { me } = useWorkspace();
  const name = `${me.user.firstname} ${me.user.lastname}`.trim();

  return (
    <Menu
      label="Account"
      side="top"
      className="w-full"
      trigger={({ ref, open, ...props }) => (
        <button
          ref={ref}
          type="button"
          {...props}
          aria-label={`Account: ${name}`}
          className={cn(
            "focus-ring flex w-full items-center gap-2.5 rounded-xl px-2 py-2 transition-colors hover:bg-surface-subtle",
            open && "bg-surface-subtle",
          )}
        >
          <Avatar name={name} size={32} />
          <span className="min-w-0 flex-1 text-left leading-tight">
            <span className="block truncate text-sm font-bold text-fg">{name}</span>
            <span className="block truncate text-xs text-fg-subtle">{me.user.email}</span>
          </span>
          <ChevronsUpDown className="size-4 shrink-0 text-fg-subtle" aria-hidden />
        </button>
      )}
    >
      <div className="flex items-center justify-between gap-3 px-2.5 py-1.5">
        <span className="text-sm font-medium text-fg">Theme</span>
        <ThemeToggle />
      </div>
      <MenuSeparator />
      <MenuItem icon={<BookOpen />} onSelect={() => window.open(DOCS_URL, "_blank", "noopener")}>
        Documentation
      </MenuItem>
      <MenuItem icon={<LogOut />} onSelect={() => void signOutAndLeave()}>
        Sign out
      </MenuItem>
    </Menu>
  );
}
