"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Lock, UserRoundCheck } from "lucide-react";
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
  PasswordMeter,
  useFocusFirstError,
  useServerErrors,
  visibleError,
} from "@/components/auth";
import { Button, LinkButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PASSWORD_MAX, PASSWORD_MIN } from "@/lib/auth/password";
import { COUNTRY, formatPhone, formatPhoneInput, nationalNumber } from "@/lib/auth/phone";
import { ROLE_LABELS } from "@/lib/auth/roles";
import { auth } from "@/lib/dashboard/api";
import { type ApiError, fieldOf } from "@/lib/dashboard/errors";
import { useApiMutation, useInvitationPreview } from "@/lib/dashboard/hooks";
import { crossSessionBoundary } from "@/lib/session/navigate";
import { cn } from "@/lib/utils";

const FIELDS = ["firstname", "lastname", "email", "phone", "password"] as const;
type FieldName = (typeof FIELDS)[number];

const schema = yup.object({
  firstname: yup.string().trim().required("Enter your first name.").max(80, "Keep it under 80 characters."),
  lastname: yup.string().trim().required("Enter your last name.").max(80, "Keep it under 80 characters."),
  email: yup.string().trim().required("Enter your email.").email("Enter a valid email, like ada@acme.com."),
  phone: yup
    .string()
    .required("Enter your phone number.")
    .test("ng", "Enter a Nigerian mobile number, like 803 123 4567.", (v) => Boolean(v && nationalNumber(v))),
  password: yup
    .string()
    .required("Choose a password.")
    .min(PASSWORD_MIN, `Use at least ${PASSWORD_MIN} characters.`)
    .max(PASSWORD_MAX, `Use ${PASSWORD_MAX} characters or fewer.`),
});

export function SignupForm() {
  const router = useRouter();
  const params = useSearchParams();
  const queryClient = useQueryClient();
  const invitationToken = params.get("invitation");
  const invitation = useInvitationPreview(invitationToken);
  const invited = invitation.data ?? null;
  const signup = useApiMutation(auth.signup);
  const [failure, setFailure] = React.useState<ApiError | null>(null);
  // The email or phone already belongs to a Pickriders account: sign in with it instead (and link).
  const [existing, setExisting] = React.useState<{ field: "email" | "phone"; value: string } | null>(null);
  const serverErrors = useServerErrors<FieldName>();

  const form = useFormik({
    initialValues: { firstname: "", lastname: "", email: "", phone: "", password: "" },
    validationSchema: schema,
    onSubmit: async (values, helpers) => {
      setFailure(null);
      try {
        const session = await signup.mutateAsync({
          firstname: values.firstname.trim(),
          lastname: values.lastname.trim(),
          email: (invited?.email ?? values.email).trim(),
          phone: `${COUNTRY.dial}${nationalNumber(values.phone)}`,
          password: values.password,
          countryCode: COUNTRY.code,
          ...(invited && invitationToken && { invitationToken }),
        });
        void session;
        // Joining through an invitation already proved the email; a new account confirms it next.
        crossSessionBoundary(invited ? "/" : "/auth/verify?sent=1");
      } catch (e) {
        const error = e as ApiError;
        if (error.code === "email_taken" || error.code === "phone_taken") {
          const field = error.code === "email_taken" ? "email" : "phone";
          return setExisting({
            field,
            value:
              field === "email"
                ? (invited?.email ?? values.email).trim()
                : `${COUNTRY.dial}${nationalNumber(values.phone)}`,
          });
        }
        const field = fieldOf(error, FIELDS);
        if (!field) return setFailure(error);
        const value = values[field].trim();
        serverErrors.set(field, value, error.message);
        // Also in Formik's errors, so focus moves to the field.
        helpers.setFieldError(field, error.message);
      }
    },
  });
  useFocusFirstError(form, FIELDS);

  // The invited address is the only one that can accept, so it is filled in and fixed.
  React.useEffect(() => {
    if (invited) form.setFieldValue("email", invited.email, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invited]);

  const error = (name: FieldName): React.ReactNode =>
    serverErrors.get(name, form.values[name].trim()) ?? visibleError(form, name);
  const loginHref = `/auth/login${invitationToken ? `?invitation=${invitationToken}` : ""}`;

  if (existing) {
    return (
      <AuthShell topRight={<AuthSwitch prompt="Have an account?" href={loginHref} label="Sign in" />}>
        <AccountExists
          {...existing}
          invitationToken={invitationToken}
          onChange={() => {
            setExisting(null);
            // Back to the form as they left it, at the field to change.
            setTimeout(() => document.getElementById(existing.field)?.focus(), 0);
          }}
        />
      </AuthShell>
    );
  }

  return (
    <AuthShell topRight={<AuthSwitch prompt="Have an account?" href={loginHref} label="Sign in" />}>
      <AuthHeading
        title={invited ? `Join ${invited.teamName} on Pickriders` : "Create your developer account"}
        description={
          invited
            ? `${invited.invitedByName} invited you as ${ROLE_LABELS[invited.role] ?? "a member"}. Create your account to accept.`
            : "Start building in test mode straight away. Go live when you're ready."
        }
      />

      <form noValidate onSubmit={form.handleSubmit} className="space-y-5">
        {invitation.error && (
          <FormAlert title={invitation.error.message}>You can still create an account of your own below.</FormAlert>
        )}
        {failure && <ApiErrorAlert error={failure} />}

        <div className="grid grid-cols-2 gap-3">
          <Field id="firstname" label="First name" error={error("firstname")}>
            {(a11y) => (
              <Input
                {...a11y}
                {...form.getFieldProps("firstname")}
                autoComplete="given-name"
                autoFocus
                className={AUTH_INPUT}
              />
            )}
          </Field>
          <Field id="lastname" label="Last name" error={error("lastname")}>
            {(a11y) => (
              <Input {...a11y} {...form.getFieldProps("lastname")} autoComplete="family-name" className={AUTH_INPUT} />
            )}
          </Field>
        </div>

        <Field
          id="email"
          label="Work email"
          error={error("email")}
          hint={invited ? "The invitation is for this address." : undefined}
        >
          {(a11y) => (
            <div className="relative">
              <Input
                {...a11y}
                {...form.getFieldProps("email")}
                type="email"
                autoComplete="email"
                inputMode="email"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="ada@acme.com"
                readOnly={Boolean(invited)}
                className={cn(AUTH_INPUT, invited && "bg-surface-subtle pr-9 text-fg-muted")}
              />
              {invited && <Lock className="absolute inset-y-0 right-3 my-auto size-3.5 text-fg-subtle" aria-hidden />}
            </div>
          )}
        </Field>

        <Field
          id="phone"
          label="Phone number"
          error={error("phone")}
          hint="We'll text a code to verify it. Needed before you go live."
        >
          {(a11y) => (
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center gap-1.5 border-r border-line pl-3 pr-2.5 text-sm text-fg-muted">
                <span aria-hidden>{COUNTRY.flag}</span>
                {COUNTRY.dial}
              </span>
              <Input
                {...a11y}
                {...form.getFieldProps("phone")}
                onChange={(e) => form.setFieldValue("phone", formatPhoneInput(e.target.value))}
                type="tel"
                autoComplete="tel-national"
                inputMode="tel"
                placeholder={COUNTRY.example}
                aria-label={`Phone number, ${COUNTRY.dial}`}
                className={cn(AUTH_INPUT, "pl-[5.5rem] tabular-nums")}
              />
            </div>
          )}
        </Field>

        <Field id="password" label="Password" error={error("password")}>
          {(a11y) => (
            <div className="space-y-2.5">
              <PasswordInput
                {...a11y}
                {...form.getFieldProps("password")}
                aria-describedby={[a11y["aria-describedby"], "password-strength"].filter(Boolean).join(" ")}
                autoComplete="new-password"
                className={AUTH_INPUT}
              />
              {!visibleError(form, "password") && (
                <PasswordMeter
                  id="password-strength"
                  value={form.values.password}
                  avoid={[form.values.firstname, form.values.lastname, form.values.email.split("@")[0]]}
                />
              )}
            </div>
          )}
        </Field>

        <Button type="submit" fullWidth loading={form.isSubmitting}>
          {form.isSubmitting ? "Creating account…" : invited ? "Create account and join" : "Create account"}
        </Button>

        <p className="text-center text-xs leading-5 text-fg-subtle">
          By creating an account you agree, for your business, to the{" "}
          <a href="/legal/terms" target="_blank" rel="noreferrer" className="text-fg-muted underline">
            API Terms of Use
          </a>{" "}
          (with the{" "}
          <a href="/legal/dpa" target="_blank" rel="noreferrer" className="text-fg-muted underline">
            Data Processing Agreement
          </a>
          ) and the{" "}
          <a href="/legal/acceptable-use" target="_blank" rel="noreferrer" className="text-fg-muted underline">
            Acceptable Use Policy
          </a>
          , and confirm you&apos;ve read the{" "}
          <a href="/legal/privacy" target="_blank" rel="noreferrer" className="text-fg-muted underline">
            Privacy Notice
          </a>
          .
        </p>
      </form>
    </AuthShell>
  );
}

/**
 * One person, one Pickriders account. The email or phone they typed already has one (often from the
 * Pickriders app), so instead of an error we say so and take them to sign in with it: signing in
 * offers to link developer access to that same account.
 */
function AccountExists({
  field,
  value,
  invitationToken,
  onChange,
}: {
  field: "email" | "phone";
  value: string;
  invitationToken: string | null;
  onChange: () => void;
}) {
  const query = new URLSearchParams({ [field]: value, from: "signup" });
  if (invitationToken) query.set("invitation", invitationToken);
  const shown = field === "email" ? value : formatPhone(value);
  return (
    <div className="space-y-6">
      <AuthHeading
        icon={<UserRoundCheck />}
        title="You already have a Pickriders account"
        description={
          <>
            <b className="font-semibold text-fg">{shown}</b> is already on Pickriders, perhaps from the Pickriders app.
            Sign in with that account and we&apos;ll add developer access to it. You won&apos;t need a new account or
            password.
          </>
        }
        className="mb-0"
      />
      <ul className="space-y-2 rounded-xl border border-line bg-surface-subtle p-4 text-sm leading-6 text-fg-muted">
        <li className="flex gap-2">
          <span className="font-bold text-brand-fg">1</span> Sign in with your Pickriders{" "}
          {field === "email" ? "email" : "phone number"} and password.
        </li>
        <li className="flex gap-2">
          <span className="font-bold text-brand-fg">2</span> Review what changes (very little) and link your account.
        </li>
        <li className="flex gap-2">
          <span className="font-bold text-brand-fg">3</span> Start building in test mode.
        </li>
      </ul>
      <div className="space-y-3">
        <LinkButton href={`/auth/login?${query}`} fullWidth>
          Sign in instead
        </LinkButton>
        <Button type="button" variant="ghost" fullWidth onClick={onChange}>
          Use a different {field === "email" ? "email" : "phone number"}
        </Button>
      </div>
      {field === "email" && (
        <p className="text-center text-sm text-fg-muted">
          Forgot the password?{" "}
          <Link
            href={`/auth/forgot-password?email=${encodeURIComponent(value)}`}
            className="focus-ring rounded-sm font-bold text-brand-fg hover:underline"
          >
            Reset it
          </Link>
        </p>
      )}
    </div>
  );
}
