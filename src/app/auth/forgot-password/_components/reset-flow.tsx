"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, KeyRound, MailCheck } from "lucide-react";
import { toast } from "sonner";

import {
  ApiErrorAlert,
  AUTH_INPUT,
  AuthHeading,
  AuthShell,
  CodeInput,
  Field,
  FormAlert,
  PasswordInput,
  PasswordMeter,
  ResendButton,
} from "@/components/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PASSWORD_MAX, PASSWORD_MIN } from "@/lib/auth/password";
import { auth } from "@/lib/dashboard/api";
import { type ApiError } from "@/lib/dashboard/errors";
import { useApiMutation } from "@/lib/dashboard/hooks";
import { crossSessionBoundary } from "@/lib/session/navigate";

const CODE_LENGTH = 4;
const CODE_ERRORS = new Set(["code_incorrect", "code_expired", "code_invalid", "too_many_attempts"]);
const EMAIL = /^\S+@\S+\.\S+$/;

/**
 * Forgot password: ask for a code by email, then enter it with a new password on one screen, and
 * you're signed in. The first screen answers the same whether or not the account exists.
 */
export function ResetFlow() {
  const params = useSearchParams();
  const [email, setEmail] = React.useState<string | null>(null);
  const [availableAt, setAvailableAt] = React.useState(0);

  return (
    <AuthShell
      topRight={
        <Link href="/auth/login" className="focus-ring rounded-sm font-medium text-fg hover:underline">
          Sign in
        </Link>
      }
    >
      {email ? (
        <ResetStep
          key={email}
          email={email}
          availableAt={availableAt}
          onResent={(at) => setAvailableAt(at)}
          onChangeEmail={() => setEmail(null)}
        />
      ) : (
        <RequestStep
          initialEmail={params.get("email") ?? ""}
          onSent={(sentTo, at) => {
            setAvailableAt(at);
            setEmail(sentTo);
          }}
        />
      )}
    </AuthShell>
  );
}

function RequestStep({ initialEmail, onSent }: { initialEmail: string; onSent: (email: string, at: number) => void }) {
  const forgot = useApiMutation(auth.forgotPassword);
  const [value, setValue] = React.useState(initialEmail);
  const [error, setError] = React.useState<string | null>(null);
  const [failure, setFailure] = React.useState<ApiError | null>(null);

  return (
    <div className="animate-slide-up">
      <AuthHeading
        icon={<KeyRound />}
        title="Reset your password"
        description="Enter the email you sign in with. We'll send you a code to set a new password."
      />
      <form
        noValidate
        className="space-y-5"
        onSubmit={async (e) => {
          e.preventDefault();
          setFailure(null);
          if (!EMAIL.test(value.trim())) {
            setError(value.trim() ? "Enter a valid email, like ada@acme.com." : "Enter your email.");
            document.getElementById("email")?.focus();
            return;
          }
          try {
            const res = await forgot.mutateAsync({ email: value.trim() });
            onSent(res.sentTo, Date.now() + res.resendAfter * 1000);
          } catch (err) {
            const apiError = err as ApiError;
            if (apiError.param === "email") setError(apiError.message);
            else setFailure(apiError);
          }
        }}
      >
        {failure && <ApiErrorAlert error={failure} />}
        <Field id="email" label="Email" error={error}>
          {(a11y) => (
            <Input
              {...a11y}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (error) setError(null);
              }}
              type="email"
              autoComplete="username"
              inputMode="email"
              autoCapitalize="none"
              spellCheck={false}
              autoFocus
              placeholder="ada@acme.com"
              className={AUTH_INPUT}
            />
          )}
        </Field>
        <Button type="submit" fullWidth loading={forgot.isPending}>
          {forgot.isPending ? "Sending…" : "Send reset code"}
        </Button>
        <Link
          href="/auth/login"
          className="focus-ring mx-auto flex w-fit items-center gap-1.5 rounded-sm text-sm text-fg-muted hover:text-fg"
        >
          <ArrowLeft className="size-3.5" aria-hidden /> Back to sign in
        </Link>
      </form>
    </div>
  );
}

function ResetStep({
  email,
  availableAt,
  onResent,
  onChangeEmail,
}: {
  email: string;
  availableAt: number;
  onResent: (at: number) => void;
  onChangeEmail: () => void;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const forgot = useApiMutation(auth.forgotPassword);
  const reset = useApiMutation(auth.resetPassword);
  const [code, setCode] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [codeError, setCodeError] = React.useState<string | null>(null);
  const [passwordError, setPasswordError] = React.useState<string | null>(null);
  const [errorKey, setErrorKey] = React.useState(0);
  const [failure, setFailure] = React.useState<ApiError | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);
  const codeRef = React.useRef<HTMLInputElement>(null);

  const checkPassword = (value: string) =>
    !value
      ? "Choose a new password."
      : value.length < PASSWORD_MIN
        ? `Use at least ${PASSWORD_MIN} characters.`
        : value.length > PASSWORD_MAX
          ? `Use ${PASSWORD_MAX} characters or fewer.`
          : null;

  return (
    <div className="animate-slide-up">
      <AuthHeading
        icon={<MailCheck />}
        title="Check your email"
        description={
          <>
            If <span className="font-medium text-fg">{email}</span> has a Pickriders developer account, we sent it a
            4-digit code.
          </>
        }
      />
      <form
        noValidate
        className="space-y-5"
        onSubmit={async (e) => {
          e.preventDefault();
          setFailure(null);
          setNotice(null);
          const codeProblem = code.length === CODE_LENGTH ? null : "Enter the 4-digit code from the email.";
          const passwordProblem = checkPassword(password);
          setCodeError(codeProblem);
          setPasswordError(passwordProblem);
          if (codeProblem || passwordProblem) {
            document.getElementById(codeProblem ? "reset-code" : "new-password")?.focus();
            return;
          }
          try {
            await reset.mutateAsync({ email, code, password });
            crossSessionBoundary("/", "Password updated. You're signed in.");
          } catch (err) {
            const apiError = err as ApiError;
            if (CODE_ERRORS.has(apiError.code) || apiError.param === "code") {
              setCodeError(apiError.message);
              setErrorKey((k) => k + 1);
              setCode("");
              codeRef.current?.focus();
            } else if (apiError.param === "password") {
              setPasswordError(apiError.message);
            } else {
              setFailure(apiError);
            }
          }
        }}
      >
        {failure && <ApiErrorAlert error={failure} />}
        {notice && !codeError && <FormAlert tone="success" title={notice} />}

        <Field id="reset-code" label="Code" error={codeError}>
          {(a11y) => (
            <CodeInput
              {...a11y}
              ref={codeRef}
              length={CODE_LENGTH}
              value={code}
              onChange={(v) => {
                setCode(v);
                if (codeError && v) setCodeError(null);
              }}
              onComplete={() => document.getElementById("new-password")?.focus()}
              invalid={Boolean(codeError)}
              errorKey={errorKey}
              autoFocus
            />
          )}
        </Field>

        <Field id="new-password" label="New password" error={passwordError}>
          {(a11y) => (
            <div className="space-y-2.5">
              <PasswordInput
                {...a11y}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError(null);
                }}
                onBlur={() => password && setPasswordError(checkPassword(password))}
                autoComplete="new-password"
                className={AUTH_INPUT}
              />
              {!passwordError && <PasswordMeter value={password} avoid={[email.split("@")[0]]} />}
            </div>
          )}
        </Field>

        <Button type="submit" fullWidth loading={reset.isPending}>
          {reset.isPending ? "Updating password…" : "Reset password and sign in"}
        </Button>

        <div className="flex items-center justify-between gap-3 text-sm">
          <ResendButton
            availableAt={availableAt}
            pending={forgot.isPending}
            onResend={async () => {
              try {
                const res = await forgot.mutateAsync({ email });
                onResent(Date.now() + res.resendAfter * 1000);
                setCode("");
                setCodeError(null);
                setNotice("We sent a new code. Earlier codes no longer work.");
                codeRef.current?.focus();
              } catch (err) {
                setFailure(err as ApiError);
              }
            }}
          />
          <button
            type="button"
            onClick={onChangeEmail}
            className="focus-ring rounded-sm text-fg-muted hover:text-fg hover:underline"
          >
            Use a different email
          </button>
        </div>
        <p className="text-xs text-fg-subtle">
          Can&apos;t find it? Check your spam folder. Codes expire after 5 minutes.
        </p>
      </form>
    </div>
  );
}
