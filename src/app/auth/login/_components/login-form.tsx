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
  useServerErrors,
  visibleError,
} from "@/components/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { looksLikeEmail, parseIdentifier } from "@/lib/auth/identifier";
import { formatPhone } from "@/lib/auth/phone";
import { auth } from "@/lib/dashboard/api";
import { type ApiError, fieldOf } from "@/lib/dashboard/errors";
import { useApiMutation, useInvitationPreview } from "@/lib/dashboard/hooks";
import { crossSessionBoundary } from "@/lib/session/navigate";
import { safeRedirect } from "@/lib/session/paths";
import type { DeveloperLinkPreviewResponseDto } from "@/services/apiService";
import { LinkAccount } from "./link-account";

const FIELDS = ["email", "password"] as const;
type FieldName = (typeof FIELDS)[number];

// "email" is the field's name (the API's `param` for it), but it takes an email or a phone number:
// one Pickriders account signs in with either, as in the apps.
const schema = yup.object({
  email: yup
    .string()
    .trim()
    .required("Enter your email or phone number.")
    .test("identifier", (value, ctx) =>
      parseIdentifier(value ?? "")
        ? true
        : ctx.createError({
            message: looksLikeEmail(value ?? "")
              ? "Enter a valid email, like ada@acme.com."
              : "Enter a valid email, or a Nigerian phone number like 0803 123 4567.",
          }),
    ),
  password: yup.string().required("Enter your password."),
});

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const queryClient = useQueryClient();
  const invitationToken = params.get("invitation");
  const invitation = useInvitationPreview(invitationToken);
  const login = useApiMutation(auth.login);
  const linkPreview = useApiMutation(auth.linkPreview);
  const [failure, setFailure] = React.useState<ApiError | null>(null);
  // An existing Pickriders account without developer access: the link step, in place of the form.
  const [linking, setLinking] = React.useState<DeveloperLinkPreviewResponseDto | null>(null);
  const fromSignup = params.get("from") === "signup";
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const serverErrors = useServerErrors<FieldName>();

  const form = useFormik({
    initialValues: {
      email: params.get("email") ?? (params.get("phone") ? formatPhone(params.get("phone") as string) : ""),
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (values, helpers) => {
      setFailure(null);
      const credentials = { ...parseIdentifier(values.email)!, password: values.password };
      try {
        const session = await login.mutateAsync({ ...credentials, ...(invitationToken && { invitationToken }) });
        void session;
        crossSessionBoundary(safeRedirect(params.get("redirect")));
      } catch (e) {
        let error = e as ApiError;
        // The password was right, but the account isn't a developer account yet: offer to link it.
        if (error.code === "not_a_developer") {
          try {
            setLinking(await linkPreview.mutateAsync(credentials));
            return;
          } catch (previewError) {
            error = previewError as ApiError;
          }
        }
        const field = fieldOf(error, FIELDS);
        if (field) {
          serverErrors.set(field, values[field].trim(), error.message);
          // Also in Formik's errors, so focus moves to the field.
          return helpers.setFieldError(field, error.message);
        }
        setFailure(error);
        // Keep what they typed, selected: one keystroke replaces it, and a near-miss can be fixed.
        if (error.code === "invalid_credentials") passwordRef.current?.select();
      }
    },
  });
  useFocusFirstError(form, FIELDS);

  const error = (name: FieldName) => serverErrors.get(name, form.values[name].trim()) ?? visibleError(form, name);
  const carry = new URLSearchParams();
  for (const key of ["redirect", "invitation"]) if (params.get(key)) carry.set(key, params.get(key) as string);
  if (linking) {
    return (
      <AuthShell>
        <LinkAccount
          preview={linking}
          next={safeRedirect(params.get("redirect"))}
          onCancel={(expired) => {
            setLinking(null);
            form.setFieldValue("password", "", false);
            if (expired) {
              setFailure({
                status: 401,
                type: "authentication_error",
                code: "link_expired",
                message: "Sign in again to link your account.",
                param: null,
                requestId: null,
              });
            }
          }}
        />
      </AuthShell>
    );
  }

  // Resetting goes by email: carry the field over only when it holds one.
  const typedEmail = looksLikeEmail(form.values.email) ? form.values.email.trim() : "";
  const forgotHref = `/auth/forgot-password${typedEmail ? `?email=${encodeURIComponent(typedEmail)}` : ""}`;

  return (
    <AuthShell
      topRight={<AuthSwitch prompt="New to Pickriders?" href={`/auth/signup?${carry}`} label="Create account" />}
    >
      <AuthHeading
        title={invitation.data ? `Sign in to join ${invitation.data.teamName}` : "Sign in"}
        description={
          invitation.data
            ? `${invitation.data.invitedByName} invited ${invitation.data.email}. Sign in with that account to accept.`
            : "Welcome back. Use your Pickriders account: the same email or phone and password as in the app."
        }
      />

      <form noValidate onSubmit={form.handleSubmit} className="space-y-5">
        {params.get("reason") === "expired" && !failure && (
          <FormAlert tone="info" title="Your session expired.">
            Sign in again to pick up where you left off.
          </FormAlert>
        )}
        {params.get("reason") === "signed_out" && !failure && <FormAlert tone="success" title="You've signed out." />}
        {fromSignup && !failure && (
          <FormAlert tone="info" title="You already have a Pickriders account.">
            Sign in with it, and we&apos;ll set up developer access on the same account. No new account needed.
          </FormAlert>
        )}
        {failure && (
          <ApiErrorAlert error={failure}>
            {failure.code === "invalid_credentials" && (
              <p>
                Forgot it? <Link href={forgotHref}>Reset your password</Link>
              </p>
            )}
          </ApiErrorAlert>
        )}

        <Field id="email" label="Email or phone number" error={error("email")}>
          {(a11y) => (
            <Input
              {...a11y}
              {...form.getFieldProps("email")}
              type="text"
              autoComplete="username"
              inputMode="email"
              autoCapitalize="none"
              spellCheck={false}
              autoFocus={!form.values.email}
              placeholder="ada@acme.com or 0803 123 4567"
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
