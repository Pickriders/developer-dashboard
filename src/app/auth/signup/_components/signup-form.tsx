"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Lock } from "lucide-react";
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
  visibleError,
} from "@/components/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PASSWORD_MAX, PASSWORD_MIN } from "@/lib/auth/password";
import { COUNTRY, formatPhoneInput, nationalNumber } from "@/lib/auth/phone";
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
  /** The email the API said is taken, so the error can offer to sign in instead. */
  const [takenEmail, setTakenEmail] = React.useState<string | null>(null);

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
        const field = fieldOf(error, FIELDS);
        if (!field) return setFailure(error);
        if (error.code === "email_taken") setTakenEmail(values.email.trim());
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

  const error = (name: FieldName): React.ReactNode => {
    if (name === "email" && takenEmail && takenEmail === form.values.email.trim())
      return <EmailTaken email={takenEmail} />;
    return visibleError(form, name);
  };
  const loginHref = `/auth/login${invitationToken ? `?invitation=${invitationToken}` : ""}`;

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
          By creating an account you agree to the{" "}
          <a href="https://pickriders.com/terms" target="_blank" rel="noreferrer" className="text-fg-muted underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="https://pickriders.com/privacy" target="_blank" rel="noreferrer" className="text-fg-muted underline">
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </AuthShell>
  );
}

function EmailTaken({ email }: { email: string }) {
  return (
    <>
      An account already uses this email.{" "}
      <Link href={`/auth/login?email=${encodeURIComponent(email.trim())}`} className="font-medium underline">
        Sign in instead
      </Link>
    </>
  );
}
