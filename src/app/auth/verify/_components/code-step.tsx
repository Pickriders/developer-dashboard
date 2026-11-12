"use client";

import * as React from "react";

import { ApiErrorAlert, AUTH_INPUT, CodeInput, Field, FormAlert, ResendButton } from "@/components/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { COUNTRY, formatPhone, formatPhoneInput, nationalNumber } from "@/lib/auth/phone";
import type { ApiError } from "@/lib/dashboard/errors";
import { cn } from "@/lib/utils";
import type { DeveloperCodeSentResponseDto, DeveloperMeResponseDto } from "@/services/apiService";

const CODE_LENGTH = 4;
const CODE_ERRORS = new Set([
  "code_incorrect",
  "code_expired",
  "code_invalid",
  "too_many_attempts",
  "parameter_invalid",
]);

/** "Wait 42 seconds" in a cooldown error, so the countdown starts where the API says. */
const secondsIn = (message: string) => Number(/(\d+) seconds?/.exec(message)?.[1] ?? 60);

export type Channel = "email" | "phone";

/**
 * One verification step: send a code, type it, done. Also resend (with the API's cooldown), and
 * correcting an address that was mistyped at sign-up. Shared by the email and phone steps.
 */
export function CodeStep({
  channel,
  destination,
  initiallySent,
  send,
  verify,
  onVerified,
  intro,
}: {
  channel: Channel;
  /** Where the code goes, formatted for display. */
  destination: string;
  /** A code is already on its way (sign-up sent the first email). */
  initiallySent: boolean;
  send: (address?: string) => Promise<DeveloperCodeSentResponseDto>;
  verify: (code: string) => Promise<DeveloperMeResponseDto>;
  onVerified: (me: DeveloperMeResponseDto) => void;
  /** Shown before the first code is sent, with the button that sends it. */
  intro?: React.ReactNode;
}) {
  const [sent, setSent] = React.useState(initiallySent);
  const [sentTo, setSentTo] = React.useState(destination);
  const [availableAt, setAvailableAt] = React.useState(() => (initiallySent ? Date.now() + 60_000 : 0));
  const [changing, setChanging] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [codeError, setCodeError] = React.useState<string | null>(null);
  const [errorKey, setErrorKey] = React.useState(0);
  const [failure, setFailure] = React.useState<ApiError | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);
  const [sending, setSending] = React.useState(false);
  const [verifying, setVerifying] = React.useState(false);
  const codeRef = React.useRef<HTMLInputElement>(null);

  const focusCode = () => requestAnimationFrame(() => codeRef.current?.focus());

  /** Returns the field error for a changed address, if any; everything else is handled here. */
  const sendCode = async (address?: string): Promise<string | null> => {
    setSending(true);
    setFailure(null);
    try {
      const res = await send(address);
      const resent = sent && !address;
      setSent(true);
      setSentTo(channel === "phone" ? formatPhone(res.sentTo) : res.sentTo);
      setAvailableAt(Date.now() + res.resendAfter * 1000);
      setCode("");
      setCodeError(null);
      setChanging(false);
      setNotice(
        address
          ? `Code sent to ${channel === "phone" ? formatPhone(res.sentTo) : res.sentTo}.`
          : resent
            ? "We sent a new code. Earlier codes no longer work."
            : null,
      );
      focusCode();
      return null;
    } catch (e) {
      const error = e as ApiError;
      if (error.code === "code_recently_sent") {
        setSent(true);
        setAvailableAt(Date.now() + secondsIn(error.message) * 1000);
        if (address) return error.message;
        focusCode();
        return null;
      }
      if (address && (error.param === "email" || error.param === "phone")) return error.message;
      setFailure(error);
      return null;
    } finally {
      setSending(false);
    }
  };

  const submit = async (value = code) => {
    if (value.length !== CODE_LENGTH || verifying) return;
    setVerifying(true);
    setFailure(null);
    setNotice(null);
    try {
      onVerified(await verify(value));
    } catch (e) {
      const error = e as ApiError;
      if (!CODE_ERRORS.has(error.code)) {
        setFailure(error);
      } else {
        setCodeError(error.message);
        setErrorKey((k) => k + 1);
        setCode("");
        focusCode();
      }
    } finally {
      setVerifying(false);
    }
  };

  if (changing) {
    return (
      <ChangeAddress
        channel={channel}
        current={channel === "phone" ? "" : sentTo}
        onCancel={() => {
          setChanging(false);
          focusCode();
        }}
        onSubmit={sendCode}
        availableAt={availableAt}
      />
    );
  }

  if (!sent) {
    return (
      <div className="space-y-5">
        {failure && <ApiErrorAlert error={failure} />}
        {intro}
        <Button fullWidth loading={sending} onClick={() => sendCode()}>
          {channel === "phone" ? "Text me a code" : "Email me a code"}
        </Button>
        <button
          type="button"
          onClick={() => setChanging(true)}
          className="focus-ring w-full rounded-sm text-center text-sm text-fg-muted hover:text-fg hover:underline"
        >
          {channel === "phone" ? "Use a different number" : "Use a different email"}
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      {failure && <ApiErrorAlert error={failure} />}
      {notice && !codeError && <FormAlert tone="success" title={notice} />}

      <p className="text-base text-fg-muted">
        Enter the {CODE_LENGTH}-digit code we {channel === "phone" ? "texted" : "sent"} to{" "}
        <span className="font-medium text-fg">{sentTo}</span>.
      </p>

      <Field id={`${channel}-code`} label="Verification code" error={codeError}>
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
            onComplete={submit}
            invalid={Boolean(codeError)}
            errorKey={errorKey}
            disabled={verifying}
            autoFocus
          />
        )}
      </Field>

      <Button type="submit" fullWidth loading={verifying} disabled={code.length !== CODE_LENGTH}>
        {verifying ? "Verifying…" : channel === "phone" ? "Verify phone" : "Verify email"}
      </Button>

      <div className="flex items-center justify-between gap-3 text-sm">
        <ResendButton availableAt={availableAt} pending={sending} onResend={() => sendCode()} />
        <button
          type="button"
          onClick={() => setChanging(true)}
          className="focus-ring rounded-sm text-fg-muted hover:text-fg hover:underline"
        >
          {channel === "phone" ? "Change number" : "Change email"}
        </button>
      </div>

      <p className="text-xs text-fg-subtle">
        {channel === "email"
          ? "Can't find it? Check your spam folder. Codes expire after 5 minutes."
          : "Texts can take a minute to arrive. Codes expire after 5 minutes."}
      </p>
    </form>
  );
}

function ChangeAddress({
  channel,
  current,
  onCancel,
  onSubmit,
  availableAt,
}: {
  channel: Channel;
  current: string;
  onCancel: () => void;
  onSubmit: (address: string) => Promise<string | null>;
  availableAt: number;
}) {
  const [value, setValue] = React.useState(current);
  const [error, setError] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState(false);
  const id = `new-${channel}`;

  const validate = () => {
    if (channel === "phone") {
      const national = nationalNumber(value);
      return national ? null : "Enter a Nigerian mobile number, like 803 123 4567.";
    }
    return /^\S+@\S+\.\S+$/.test(value.trim()) ? null : "Enter a valid email, like ada@acme.com.";
  };

  return (
    <form
      noValidate
      className="space-y-5"
      onSubmit={async (e) => {
        e.preventDefault();
        const invalid = validate();
        if (invalid) {
          setError(invalid);
          document.getElementById(id)?.focus();
          return;
        }
        setPending(true);
        const address = channel === "phone" ? `${COUNTRY.dial}${nationalNumber(value)}` : value.trim();
        setError(await onSubmit(address));
        setPending(false);
      }}
    >
      <p className="text-base text-fg-muted">
        {channel === "phone"
          ? "Mistyped your number? Enter the right one and we'll text a new code."
          : "Mistyped your email? Enter the right one and we'll send a new code. You'll sign in with it from now on."}
      </p>
      <Field id={id} label={channel === "phone" ? "Phone number" : "Email"} error={error}>
        {(a11y) =>
          channel === "phone" ? (
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center gap-1.5 border-r border-line pl-3 pr-2.5 text-sm text-fg-muted">
                <span aria-hidden>{COUNTRY.flag}</span>
                {COUNTRY.dial}
              </span>
              <Input
                {...a11y}
                value={value}
                onChange={(e) => setValue(formatPhoneInput(e.target.value))}
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder={COUNTRY.example}
                autoFocus
                className={cn(AUTH_INPUT, "pl-[5.5rem] tabular-nums")}
              />
            </div>
          ) : (
            <Input
              {...a11y}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              autoFocus
              className={AUTH_INPUT}
            />
          )
        }
      </Field>
      <div className="flex gap-2">
        <Button type="button" variant="secondary" className="flex-1" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="flex-1" loading={pending}>
          Send code
        </Button>
      </div>
      {availableAt > Date.now() && (
        <p className="text-xs text-fg-subtle">You can ask for a new code once the last one is a minute old.</p>
      )}
    </form>
  );
}
