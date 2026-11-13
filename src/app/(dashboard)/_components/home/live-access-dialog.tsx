"use client";

import * as React from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import * as yup from "yup";

import { ApiErrorAlert, Field, useFocusFirstError, visibleError } from "@/components/auth";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import type { ApiError } from "@/lib/dashboard/errors";
import { useRequestLiveAccess } from "@/lib/dashboard/hooks";
import { withScheme } from "@/lib/dashboard/live";
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";
import type { DeveloperAccountDto, UpdateDeveloperAccountRequestDto } from "@/services/apiService";

type Volume = NonNullable<DeveloperAccountDto["expectedMonthlyVolume"]>;
const VOLUMES: { value: Volume; label: string }[] = [
  { value: "UP_TO_100", label: "Up to 100" },
  { value: "UP_TO_1000", label: "Up to 1,000" },
  { value: "UP_TO_10000", label: "Up to 10,000" },
  { value: "OVER_10000", label: "Over 10,000" },
];

const FIELDS = ["companyName", "website", "useCase", "expectedMonthlyVolume"] as const;

const schema = yup.object({
  companyName: yup.string().trim().required("Enter your business name.").max(120, "Keep it under 120 characters."),
  website: yup
    .string()
    .trim()
    .matches(/^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?$/i, {
      message: "Enter a web address, like acme.com.",
      excludeEmptyString: true,
    }),
  useCase: yup
    .string()
    .trim()
    .required("Say what you'll deliver.")
    .min(10, "A sentence or two helps the review.")
    .max(500, "Keep it under 500 characters."),
  expectedMonthlyVolume: yup.string().required("Choose a rough number."),
});

/**
 * Asks Pickriders to switch on live mode. Owners and admins first fill in the profile an admin
 * reads during the review (saved to the account), then the request goes in. Anyone else who may
 * ask (live.request without team.manage) just confirms.
 */
export function LiveAccessDialog({
  open,
  onClose,
  account,
}: {
  open: boolean;
  onClose: () => void;
  account: DeveloperAccountDto;
}) {
  const { team, can } = useWorkspace();
  const request = useRequestLiveAccess(team.id);
  const editsProfile = can("team.manage");
  const [failure, setFailure] = React.useState<ApiError | null>(null);

  const form = useFormik({
    initialValues: {
      companyName: account.companyName ?? "",
      website: account.website ?? "",
      useCase: account.useCase ?? "",
      expectedMonthlyVolume: (account.expectedMonthlyVolume ?? "") as Volume | "",
    },
    enableReinitialize: true,
    validationSchema: editsProfile ? schema : undefined,
    onSubmit: async (values) => {
      setFailure(null);
      let changes: UpdateDeveloperAccountRequestDto | null = null;
      if (editsProfile) {
        changes = {};
        for (const field of FIELDS) {
          const raw = String(values[field] ?? "").trim();
          // The API takes a website with its scheme; people type "acme.com".
          const value = field === "website" ? withScheme(raw) : raw;
          if (value !== (account[field] ?? "")) Object.assign(changes, { [field]: value || null });
        }
      }
      try {
        await request.mutateAsync(changes);
        toast.success("Request sent. This page updates when it's reviewed.");
        onClose();
      } catch (e) {
        setFailure(e as ApiError);
      }
    },
  });
  useFocusFirstError(form, FIELDS);

  React.useEffect(() => {
    if (open) setFailure(null);
  }, [open]);

  const again = account.liveStatus === "REJECTED";

  return (
    <Modal
      open={open}
      onClose={() => !form.isSubmitting && onClose()}
      title={again ? "Ask for live access again" : "Request live access"}
    >
      <form noValidate onSubmit={form.handleSubmit} className="space-y-5">
        <p className="text-[15px] leading-6 text-fg-muted">
          {editsProfile
            ? "A Pickriders admin reads this before switching on live keys. A clear answer gets a quicker yes."
            : "A Pickriders admin reviews your team's profile before switching on live keys."}
        </p>

        {again && account.liveRejectionReason && (
          <div className="rounded-xl border border-danger-line bg-danger-subtle px-4 py-3 text-sm text-danger-fg">
            <p className="font-bold">Last time we said</p>
            <p className="mt-0.5">{account.liveRejectionReason}</p>
          </div>
        )}
        {failure && <ApiErrorAlert error={failure} />}

        {editsProfile && (
          <>
            <Field id="companyName" label="Business name" error={visibleError(form, "companyName")}>
              {(a11y) => <Input {...a11y} {...form.getFieldProps("companyName")} autoComplete="organization" />}
            </Field>
            <Field
              id="website"
              label={
                <>
                  Website <span className="font-normal text-fg-subtle">(optional)</span>
                </>
              }
              error={visibleError(form, "website")}
            >
              {(a11y) => (
                <Input
                  {...a11y}
                  {...form.getFieldProps("website")}
                  inputMode="url"
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder="acme.com"
                />
              )}
            </Field>
            <Field
              id="useCase"
              label="What will you deliver?"
              hint="What you send, from where to where. For example: phones and accessories from our Ikeja store to customers in Lagos."
              error={visibleError(form, "useCase")}
            >
              {(a11y) => <Textarea {...a11y} {...form.getFieldProps("useCase")} rows={3} />}
            </Field>
            <fieldset className="space-y-1.5">
              <legend className="mb-1.5 text-sm font-semibold text-fg">Deliveries a month</legend>
              <div
                role="radiogroup"
                aria-describedby={visibleError(form, "expectedMonthlyVolume") ? "volume-error" : undefined}
                className="grid grid-cols-2 gap-2 sm:grid-cols-4"
              >
                {VOLUMES.map((v) => {
                  const checked = form.values.expectedMonthlyVolume === v.value;
                  return (
                    <button
                      key={v.value}
                      id={v.value === VOLUMES[0].value ? "expectedMonthlyVolume" : undefined}
                      type="button"
                      role="radio"
                      aria-checked={checked}
                      onClick={() => form.setFieldValue("expectedMonthlyVolume", v.value)}
                      className={cn(
                        "focus-ring min-h-11 rounded-xl border px-3 text-sm font-semibold transition-colors",
                        checked
                          ? "border-brand bg-brand-subtle text-brand-fg"
                          : "border-line-strong bg-surface text-fg hover:border-fg-subtle/50",
                      )}
                    >
                      {v.label}
                    </button>
                  );
                })}
              </div>
              {visibleError(form, "expectedMonthlyVolume") && (
                <p id="volume-error" role="alert" className="text-[13px] font-medium text-danger-fg">
                  {visibleError(form, "expectedMonthlyVolume")}
                </p>
              )}
            </fieldset>
          </>
        )}

        <div className="grid grid-cols-2 gap-2 pt-1">
          <Button variant="secondary" onClick={onClose} disabled={form.isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" loading={form.isSubmitting}>
            Send request
          </Button>
        </div>
      </form>
    </Modal>
  );
}
