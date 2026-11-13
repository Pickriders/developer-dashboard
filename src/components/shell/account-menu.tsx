"use client";

import { useRouter } from "next/navigation";
import { BookOpen, ChevronsUpDown, Keyboard, LogOut, Settings } from "lucide-react";

import { RailTip } from "./rail-tip";
import { useShell } from "./shell-context";
import { signOutAndLeave } from "@/components/auth/sign-out-button";
import { ThemeToggle } from "@/components/kit/theme-toggle";
import { Avatar } from "@/components/ui/avatar";
import { Menu, MenuItem, MenuLabel, MenuSeparator } from "@/components/ui/menu";
import { DOCS_URL } from "@/constant";
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";

/** The signed-in person at the foot of the sidebar: theme, docs, shortcuts and sign out. */
export function AccountMenu({ rail = false }: { rail?: boolean }) {
  const { me } = useWorkspace();
  const { openPalette } = useShell();
  const router = useRouter();
  const name = `${me.user.firstname} ${me.user.lastname}`.trim();

  return (
    <Menu
      label="Account"
      side="top"
      className={rail ? "w-64" : undefined}
      matchWidth={!rail}
      trigger={({ ref, open, ...props }) => (
        <button
          ref={ref}
          type="button"
          {...props}
          aria-label={`Account: ${name}`}
          className={cn(
            "focus-ring group relative flex w-full items-center gap-2.5 rounded-xl py-2 transition-colors hover:bg-white/[0.05]",
            rail ? "justify-center px-0" : "px-2",
            open && "bg-white/[0.05]",
          )}
        >
          <Avatar name={name} size={32} className="bg-white/10 text-nav-fg ring-1 ring-white/10" />
          {!rail && (
            <>
              <span className="min-w-0 flex-1 text-left leading-tight">
                <span className="block truncate text-sm font-bold text-nav-fg">{name}</span>
                <span className="block truncate text-xs text-nav-subtle">{me.user.email}</span>
              </span>
              <ChevronsUpDown className="size-4 shrink-0 text-nav-subtle" aria-hidden />
            </>
          )}
          {rail && <RailTip>{name}</RailTip>}
        </button>
      )}
    >
      <MenuLabel>{me.user.email}</MenuLabel>
      <div className="flex items-center justify-between gap-3 px-2.5 py-1.5">
        <span className="text-sm font-medium text-fg">Theme</span>
        <ThemeToggle />
      </div>
      <MenuSeparator />
      <MenuItem icon={<Settings />} hint="G S" onSelect={() => router.push("/settings")}>
        Settings
      </MenuItem>
      <MenuItem icon={<Keyboard />} hint="⌘K" onSelect={openPalette}>
        Search and shortcuts
      </MenuItem>
      <MenuItem icon={<BookOpen />} onSelect={() => window.open(DOCS_URL, "_blank", "noopener")}>
        Documentation
      </MenuItem>
      <MenuSeparator />
      <MenuItem icon={<LogOut />} onSelect={() => void signOutAndLeave()}>
        Sign out
      </MenuItem>
    </Menu>
  );
}
