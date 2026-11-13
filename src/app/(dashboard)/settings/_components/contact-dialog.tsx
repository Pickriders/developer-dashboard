"use client";

import * as React from "react";
import { toast } from "sonner";

import { ApiErrorAlert, CodeInput, Field, FormAlert, ResendButton } from "@/components/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { COUNTRY, formatPhone, formatPhoneInput, nationalNumber } from "@/lib/auth/phone";
import type { ApiError } from "@/lib/dashboard/errors";
import { type Contact, useContactChange } from "@/lib/dashboard/hooks";
import { useWorkspace } from "@/lib/workspace";

const CODE_LENGTH = 4;
const CODE_ERRORS = new Set(["code_incorrect", "code_expired", "code_invalid", "too_many_attempts"]);
/** "Wait 42 seconds" in a cooldown error, so the countdown starts where the API says. */
const secondsIn = (message: string) => Number(/(\d+) seconds?/.exec(message)?.[1] ?? 60);

const COPY = {
  email: { noun: "email", title: "Change email", field: "New email", sent: "sent", verb: "Email me a code" },
  phone: {
    noun: "phone number",
    title: "Change phone number",
    field: "New phone number",
    sent: "texted",
    verb: "Text me a code",
  },
} as const;

/**
 * Changes the sign-in email or phone. A verified one changes only once the code sent to the new
 * one is entered (the old keeps working meanwhile, so a typo never locks anyone out); an unverified
 * one is corrected and verified in the same two steps. Opens on the code step when a change is
 * already waiting (`pending`).
 */
export function ContactDialog({
  channel,
  open,
  onClose,
  pending,
}: {
  channel: Contact;
  open: boolean;
  onClose: () => void;
  /** The new address a code already went to. */
  pending: string | null;
}) {
  const { me } = useWorkspace();
  const { start, confirm } = useContactChange(channel);
  const copy = COPY[channel];
  const verified = channel === "email" ? me.user.emailVerified : me.user.phoneVerified;

  const [step, setStep] = React.useState<"address" | "code">(pending ? "code" : "address");
  const [address, setAddress] = React.useState("");
  const [addressError, setAddressError] = React.useState<string | null>(null);
  const [sentTo, setSentTo] = React.useState(pending ?? "");
  const [availableAt, setAvailableAt] = React.useState(0);
  const [code, setCode] = React.useState("");
  const [codeError, setCodeError] = React.useState<string | null>(null);
  const [errorKey, setErrorKey] = React.useState(0);
  const [failure, setFailure] = React.useState<ApiError | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);
  const addressRef = React.useRef<HTMLInputElement>(null);
  const codeRef = React.useRef<HTMLInputElement>(null);

  // Fresh each time it opens: set while it's closed, so nothing the person types is wiped.
  React.useEffect(() => {
    if (open) return;
    setStep(pending ? "code" : "address");
    setAddress("");
    setAddressError(null);
    setSentTo(pending ?? "");
    setCode("");
    setCodeError(null);
    setFailure(null);
    setNotice(null);
  }, [open, pending]);

  const shown = (value: string) => (channel === "phone" ? formatPhone(value) : value);

  const send = async (value: string, again = false) => {
    setFailure(null);
    setNotice(null);
    try {
      const sent = await start.mutateAsync(value);
      setSentTo(sent.sentTo);
      setAvailableAt(Date.now() + sent.resendAfter * 1000);
      setStep("code");
      setCode("");
      setCodeError(null);
      if (again) setNotice("We sent a new code. Earlier codes no longer work.");
      requestAnimationFrame(() => codeRef.current?.focus());
    } catch (e) {
      const error = e as ApiError;
      if (error.code === "code_recently_sent") {
        setAvailableAt(Date.now() + secondsIn(error.message) * 1000);
        if (again || step === "code") return setNotice(error.message);
      }
      if (step === "address" && (error.param === channel || error.code === "code_recently_sent")) {
        setAddressError(error.message);
        addressRef.current?.focus();
        return;
      }
      setFailure(error);
    }
  };

  const submitAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (channel === "phone") {
      const national = nationalNumber(address);
      if (!national) {
        setAddressError("Enter a Nigerian mobile number, like 803 123 4567.");
        return addressRef.current?.focus();
      }
      return send(`${COUNTRY.dial}${national}`);
    }
    if (!/^\S+@\S+\.\S+$/.test(address.trim())) {
      setAddressError("Enter a valid email, like ada@acme.com.");
      return addressRef.current?.focus();
    }
    return send(address.trim());
  };

  const verify = async (value = code) => {
    if (value.length !== CODE_LENGTH || confirm.isPending) return;
    setFailure(null);
    setNotice(null);
    try {
      await confirm.mutateAsync({ code: value, pending: verified });
      toast.success(verified ? `Your ${copy.noun} is now ${shown(sentTo)}` : `${shown(sentTo)} is verified`);
      onClose();
    } catch (e) {
      const error = e as ApiError;
      if (!CODE_ERRORS.has(error.code)) return setFailure(error);
      setCodeError(error.message);
      setErrorKey((k) => k + 1);
      setCode("");
      requestAnimationFrame(() => codeRef.current?.focus());
    }
  };

  const busy = start.isPending || confirm.isPending;

  return (
    <Modal open={open} onClose={() => !busy && onClose()} title={copy.title}>
      {step === "address" ? (
        <form noValidate onSubmit={submitAddress} className="space-y-5">
          <p className="text-[15px] leading-6 text-fg-muted">
            {verified
              ? `We'll ${copy.sent === "texted" ? "text" : "send"} a code to the new ${copy.noun}. Nothing changes until you enter it, and you keep signing in with the current one meanwhile.`
              : `Fix your ${copy.noun}, then verify it with the code we ${copy.sent === "texted" ? "text" : "send"}.`}
          </p>
          {failure && <ApiErrorAlert error={failure} />}
          <Field id={`new-${channel}`} label={copy.field} error={addressError}>
            {(a11y) =>
              channel === "phone" ? (
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center gap-1.5 border-r border-line pl-3 pr-2.5 text-sm text-fg-muted">
                    <span aria-hidden>{COUNTRY.flag}</span>
                    {COUNTRY.dial}
                  </span>
                  <Input
                    {...a11y}
                    ref={addressRef}
                    value={address}
                    onChange={(e) => {
                      setAddress(formatPhoneInput(e.target.value));
                      if (addressError) setAddressError(null);
                    }}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder={COUNTRY.example}
                    autoFocus
                    className="pl-[5.5rem] tabular-nums"
                  />
                </div>
              ) : (
                <Input
                  {...a11y}
                  ref={addressRef}
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (addressError) setAddressError(null);
                  }}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder="ada@newco.com"
                  autoFocus
                />
              )
            }
          </Field>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button variant="secondary" onClick={onClose} disabled={busy}>
              Cancel
            </Button>
            <Button type="submit" loading={start.isPending}>
              {copy.verb}
            </Button>
          </div>
        </form>
      ) : (
        <form
          noValidate
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            void verify();
          }}
        >
          {failure && <ApiErrorAlert error={failure} />}
          {notice && !codeError && <FormAlert tone="success" title={notice} />}
          <p className="text-[15px] leading-6 text-fg-muted">
            Enter the {CODE_LENGTH}-digit code we {copy.sent} to{" "}
            <span className="font-semibold text-fg">{shown(sentTo)}</span>.
          </p>
          <Field id={`${channel}-change-code`} label="Verification code" error={codeError}>
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
                onComplete={verify}
                invalid={Boolean(codeError)}
                errorKey={errorKey}
                disabled={confirm.isPending}
                autoFocus
              />
            )}
          </Field>
          <Button type="submit" fullWidth loading={confirm.isPending} disabled={code.length !== CODE_LENGTH}>
            {confirm.isPending ? "Verifying…" : verified ? `Change ${copy.noun}` : `Verify ${copy.noun}`}
          </Button>
          <div className="flex items-center justify-between gap-3 text-sm">
            <ResendButton
              availableAt={availableAt}
              pending={start.isPending}
              onResend={() => send(channel === "phone" ? `+${sentTo.replace(/^\+/, "")}` : sentTo, true)}
            />
            <button
              type="button"
              onClick={() => {
                setStep("address");
                setFailure(null);
                setNotice(null);
              }}
              className="focus-ring rounded-sm text-fg-muted hover:text-fg hover:underline"
            >
              Use a different {copy.noun}
            </button>
          </div>
          <p className="text-xs text-fg-subtle">
            {channel === "email"
              ? "Can't find it? Check your spam folder. Codes expire after 5 minutes."
              : "Texts can take a minute to arrive. Codes expire after 5 minutes."}
          </p>
        </form>
      )}
    </Modal>
  );
}
