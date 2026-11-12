"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as yup from "yup";

import {
  ApiErrorAlert,
  AUTH_INPUT,
  AuthHeading,
  AuthShell,
  AuthSwitch,
  Field,
  FormAlert,
  PasswordInput,
  useFocusFirstError,
  visibleError,
} from "@/components/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/dashboard/api";
import { type ApiError, fieldOf } from "@/lib/dashboard/errors";
import { useApiMutation, useInvitationPreview } from "@/lib/dashboard/hooks";
import { crossSessionBoundary } from "@/lib/session/navigate";
import { safeRedirect } from "@/lib/session/paths";

const FIELDS = ["email", "password"] as const;

const schema = yup.object({
  email: yup.string().trim().required("Enter your email.").email("Enter a valid email, like ada@acme.com."),
  password: yup.string().required("Enter your password."),
});

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const queryClient = useQueryClient();
  const invitationToken = params.get("invitation");
  const invitation = useInvitationPreview(invitationToken);
  const login = useApiMutation(auth.login);
  const [failure, setFailure] = React.useState<ApiError | null>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const form = useFormik({
    initialValues: { email: params.get("email") ?? "", password: "" },
    validationSchema: schema,
    onSubmit: async (values, helpers) => {
      setFailure(null);
      try {
        const session = await login.mutateAsync({
          email: values.email.trim(),
          password: values.password,
          ...(invitationToken && { invitationToken }),
        });
        void session;
        crossSessionBoundary(safeRedirect(params.get("redirect")));
      } catch (e) {
        const error = e as ApiError;
        const field = fieldOf(error, FIELDS);
        if (field) return helpers.setFieldError(field, error.message);
        setFailure(error);
        // Keep what they typed, selected: one keystroke replaces it, and a near-miss can be fixed.
        if (error.code === "invalid_credentials") passwordRef.current?.select();
      }
    },
  });
  useFocusFirstError(form, FIELDS);

  const error = (name: (typeof FIELDS)[number]) => visibleError(form, name);
  const carry = new URLSearchParams();
  for (const key of ["redirect", "invitation"]) if (params.get(key)) carry.set(key, params.get(key) as string);
  const forgotHref = `/auth/forgot-password${form.values.email ? `?email=${encodeURIComponent(form.values.email.trim())}` : ""}`;

  return (
    <AuthShell
      topRight={<AuthSwitch prompt="New to Pickriders?" href={`/auth/signup?${carry}`} label="Create account" />}
    >
      <AuthHeading
        title={invitation.data ? `Sign in to join ${invitation.data.teamName}` : "Sign in"}
        description={
          invitation.data
            ? `${invitation.data.invitedByName} invited ${invitation.data.email}. Sign in with that account to accept.`
            : "Welcome back. Sign in to your developer account."
        }
      />

      <form noValidate onSubmit={form.handleSubmit} className="space-y-5">
        {params.get("reason") === "expired" && !failure && (
          <FormAlert tone="info" title="Your session expired.">
            Sign in again to pick up where you left off.
          </FormAlert>
        )}
        {params.get("reason") === "signed_out" && !failure && <FormAlert tone="success" title="You've signed out." />}
        {failure && (
          <ApiErrorAlert error={failure}>
            {failure.code === "invalid_credentials" && (
              <p>
                Forgot it? <Link href={forgotHref}>Reset your password</Link>
              </p>
            )}
          </ApiErrorAlert>
        )}

        <Field id="email" label="Email" error={error("email")}>
          {(a11y) => (
            <Input
              {...a11y}
              {...form.getFieldProps("email")}
              type="email"
              autoComplete="username"
              inputMode="email"
              autoCapitalize="none"
              spellCheck={false}
              autoFocus={!form.values.email}
              placeholder="ada@acme.com"
              className={AUTH_INPUT}
            />
          )}
        </Field>

        <Field
          id="password"
          label="Password"
          error={error("password")}
          action={
            <Link
              href={forgotHref}
              className="focus-ring rounded-sm text-xs text-fg-muted hover:text-fg hover:underline"
            >
              Forgot password?
            </Link>
          }
        >
          {(a11y) => (
            <PasswordInput
              {...a11y}
              {...form.getFieldProps("password")}
              ref={passwordRef}
              autoComplete="current-password"
              autoFocus={Boolean(form.values.email)}
              className={AUTH_INPUT}
            />
          )}
        </Field>

        <Button type="submit" fullWidth loading={form.isSubmitting}>
          {form.isSubmitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </AuthShell>
  );
}
