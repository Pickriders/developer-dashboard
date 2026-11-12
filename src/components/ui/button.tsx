"use client";

import * as React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * The Pickriders storefront button: 44px, rounded-xl, a little press on tap, and a spinner that
 * sits over the label while loading so the button never changes size.
 */
type Variant = "primary" | "secondary" | "ghost" | "danger" | "link";
type Size = "sm" | "md" | "lg" | "icon";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-brand-solid text-brand-ink shadow-button hover:bg-brand-solid-hover disabled:bg-surface-muted disabled:text-fg-subtle disabled:shadow-none",
  secondary:
    "border border-line bg-surface text-fg shadow-button hover:border-line-strong hover:bg-brand-subtle disabled:text-fg-subtle disabled:shadow-none",
  ghost: "text-fg-muted hover:bg-surface-subtle hover:text-fg disabled:text-fg-subtle",
  danger: "bg-danger text-white shadow-button hover:bg-danger/90 disabled:opacity-50 disabled:shadow-none",
  link: "h-auto min-h-0 px-0 text-brand-fg underline-offset-4 hover:underline active:scale-100",
};

const SIZES: Record<Size, string> = {
  sm: "min-h-9 rounded-lg px-3 text-sm",
  md: "min-h-11 rounded-xl px-4 text-sm",
  lg: "min-h-12 rounded-xl px-5 text-base",
  icon: "size-10 rounded-xl",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
}: { variant?: Variant; size?: Size; fullWidth?: boolean; className?: string } = {}) {
  return cn(
    "focus-ring relative inline-flex select-none items-center justify-center gap-2 font-semibold transition-all duration-150 active:scale-[0.97] disabled:cursor-not-allowed disabled:active:scale-100 [&_svg]:size-4 [&_svg]:shrink-0",
    SIZES[size],
    VARIANTS[variant],
    fullWidth && "w-full",
    className,
  );
}

function Content({ loading, children }: { loading?: boolean; children: React.ReactNode }) {
  return (
    <>
      <span className={cn("inline-flex items-center gap-2 transition-opacity duration-200", loading && "opacity-0")}>
        {children}
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="animate-spin" aria-hidden />
        </span>
      )}
    </>
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, fullWidth, loading, disabled, className, children, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClasses({ variant, size, fullWidth, className })}
      {...props}
    >
      <Content loading={loading}>{children}</Content>
    </button>
  ),
);
Button.displayName = "Button";

type LinkButtonProps = React.ComponentProps<typeof Link> & { variant?: Variant; size?: Size; fullWidth?: boolean };

/** A link that looks like a Button. */
export function LinkButton({ variant, size, fullWidth, className, children, ...props }: LinkButtonProps) {
  return (
    <Link className={buttonClasses({ variant, size, fullWidth, className })} {...props}>
      <Content>{children}</Content>
    </Link>
  );
}
