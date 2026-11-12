"use client";

import * as React from "react";
import { CircleAlert } from "lucide-react";

import { cn } from "@/lib/utils";

/** Extra classes for auth inputs. The base Input is already 44px with 16px text on phones. */
export const AUTH_INPUT = "";

/**
 * When a field's error shows: after a submit attempt, or once the person has typed something and
 * moved on. Never for a field they merely passed through (or that a password manager's popup
 * blurred): an empty required field only complains when they try to submit.
 */
export function visibleError(
  form: {
    submitCount: number;
    values: Record<string, unknown>;
    touched: Record<string, unknown>;
    errors: Record<string, unknown>;
  },
  name: string,
): string | null {
  const error = form.errors[name];
  if (typeof error !== "string") return null;
  if (form.submitCount > 0) return error;
  return form.touched[name] && String(form.values[name] ?? "").length > 0 ? error : null;
}

/**
 * After a submit that failed validation, moves focus to the first field with an error, in form
 * order, so keyboard and screen reader users land on what needs fixing.
 */
export function useFocusFirstError(
  form: { submitCount: number; isSubmitting: boolean; errors: Record<string, unknown> },
  order: readonly string[],
) {
  const { submitCount, isSubmitting, errors } = form;
  React.useEffect(() => {
    if (!submitCount || isSubmitting) return;
    const first = order.find((name) => errors[name]);
    if (first) document.getElementById(first)?.focus();
    // Only after a submit attempt settles, not on every keystroke.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitCount, isSubmitting]);
}

type ControlProps = { id: string; "aria-invalid"?: boolean; "aria-describedby"?: string };

/**
 * Label, control, then either the error or the hint, wired for screen readers: the control is
 * described by whichever is showing, and an error is announced when it appears.
 */
export function Field({
  id,
  label,
  error,
  hint,
  action,
  className,
  children,
}: {
  id: string;
  label: React.ReactNode;
  error?: React.ReactNode;
  hint?: React.ReactNode;
  /** Something on the label's line, e.g. "Forgot password?". */
  action?: React.ReactNode;
  className?: string;
  children: (props: ControlProps) => React.ReactNode;
}) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    // A grid, so `action` sits on the label's line but comes after the control in tab order:
    // Tab from the field above lands in this input, not on "Forgot password?".
    <div className={cn("grid grid-cols-[1fr_auto] items-center gap-x-2 gap-y-1.5", className)}>
      <label htmlFor={id} className="col-start-1 row-start-1 text-sm font-semibold text-fg">
        {label}
      </label>
      <div className="col-span-2 row-start-2">
        {children({ id, "aria-invalid": error ? true : undefined, "aria-describedby": describedBy })}
      </div>
      {action && <div className="col-start-2 row-start-1">{action}</div>}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="col-span-2 flex items-start gap-1.5 text-[13px] font-medium text-danger-fg animate-fade-in"
        >
          <CircleAlert className="mt-px size-3.5 shrink-0" aria-hidden />
          <span>{error}</span>
        </p>
      ) : hint ? (
        <div id={`${id}-hint`} className="col-span-2 text-[13px] text-fg-subtle">
          {hint}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Errors the API returned about a field, kept apart from Formik's errors: Formik re-validates on
 * every blur and change and would wipe them the moment focus moves. Each shows until the value it
 * was about changes.
 */
export function useServerErrors<Name extends string>() {
  const [errors, setErrors] = React.useState<Partial<Record<Name, { value: string; message: React.ReactNode }>>>({});
  return React.useMemo(
    () => ({
      set: (name: Name, value: string, message: React.ReactNode) =>
        setErrors((current) => ({ ...current, [name]: { value, message } })),
      get: (name: Name, value: string): React.ReactNode => {
        const error = errors[name];
        return error && error.value === value ? error.message : null;
      },
    }),
    [errors],
  );
}
