"use client";

import * as React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { ApiErrorAlert, Field, useFocusFirstError, visibleError } from "@/components/auth";
import { NewSecret } from "@/components/kit/new-secret";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Segmented } from "@/components/ui/segmented";
import type { ApiError } from "@/lib/dashboard/errors";
import { useCreateKey } from "@/lib/dashboard/hooks";
import { type Level, type Levels, NO_ACCESS, RESOURCES, scopesFor } from "@/lib/dashboard/scopes";
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";

const schema = yup.object({
  label: yup.string().trim().required("Name the key after where it runs.").max(60, "Keep it under 60 characters."),
});

const LEVELS: Record<Level, string> = { none: "None", read: "Read", write: "Write" };

/** Name it, choose full or restricted access, then see the secret once. */
export function CreateKeyDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { team, mode } = useWorkspace();
  const create = useCreateKey(team.id, mode);
  const [secret, setSecret] = React.useState<{ value: string; label: string } | null>(null);
  const [failure, setFailure] = React.useState<ApiError | null>(null);
  const [restricted, setRestricted] = React.useState(false);
  const [levels, setLevels] = React.useState<Levels>(NO_ACCESS);
  const [scopeError, setScopeError] = React.useState(false);

  const form = useFormik({
    initialValues: { label: "" },
    validationSchema: schema,
    onSubmit: async (values) => {
      setFailure(null);
      const scopes = restricted ? scopesFor(levels) : [];
      if (restricted && !scopes.length) return setScopeError(true);
      try {
        const key = await create.mutateAsync({ label: values.label.trim(), ...(restricted && { scopes }) });
        setSecret({ value: key.secret, label: key.label });
      } catch (e) {
        setFailure(e as ApiError);
      }
    },
  });
  useFocusFirstError(form, ["label"]);

  // Every close forgets everything, the secret first.
  const close = () => {
    if (form.isSubmitting) return;
    setSecret(null);
    create.reset();
    form.resetForm();
    setRestricted(false);
    setLevels(NO_ACCESS);
    setScopeError(false);
    setFailure(null);
    onClose();
  };

  return (
    <Modal open={open} onClose={close} title={secret ? `${secret.label} is ready` : `Create a ${mode} key`}>
      {secret ? (
        <NewSecret title={`Your new ${mode} key`} secret={secret.value} onDone={close}>
          Copy it into your server&apos;s configuration, such as an environment variable. Pickriders keeps only a hash,
          so this is the only time you&apos;ll see it.
        </NewSecret>
      ) : (
        <form noValidate onSubmit={form.handleSubmit} className="space-y-5">
          {failure && <ApiErrorAlert error={failure} />}

          <Field
            id="label"
            label="Name"
            hint="Where it runs, so you know which to roll or revoke later."
            error={visibleError(form, "label")}
          >
            {(a11y) => (
              <Input
                {...a11y}
                {...form.getFieldProps("label")}
                autoFocus
                autoComplete="off"
                placeholder={mode === "live" ? "Production server" : "Laptop"}
              />
            )}
          </Field>

          <fieldset className="space-y-2">
            <legend className="mb-2 text-sm font-semibold text-fg">Access</legend>
            <div className="grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label="Access">
              {[
                { value: false, title: "Full access", hint: "Everything your team can do through the API." },
                { value: true, title: "Restricted", hint: "Only what you choose below." },
              ].map((option) => (
                <button
                  key={option.title}
                  type="button"
                  role="radio"
                  aria-checked={restricted === option.value}
                  onClick={() => {
                    setRestricted(option.value);
                    setScopeError(false);
                  }}
                  className={cn(
                    "focus-ring rounded-xl border p-3.5 text-left transition-colors",
                    restricted === option.value
                      ? "border-brand bg-brand-subtle"
                      : "border-line-strong bg-surface hover:border-fg-subtle/50",
                  )}
                >
                  <span
                    className={cn("block text-sm font-bold", restricted === option.value ? "text-brand-fg" : "text-fg")}
                  >
                    {option.title}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-5 text-fg-muted">{option.hint}</span>
                </button>
              ))}
            </div>
          </fieldset>

          {restricted && (
            <div className="animate-fade-in space-y-2">
              <ul className="divide-y divide-line rounded-xl border border-line">
                {RESOURCES.map((resource) => (
                  <li key={resource.id} className="flex items-center justify-between gap-3 px-3.5 py-2.5">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-fg">{resource.label}</p>
                      <p className="truncate text-xs text-fg-subtle">{resource.hint}</p>
                    </div>
                    <Segmented
                      size="sm"
                      label={`${resource.label} access`}
                      value={levels[resource.id]}
                      onChange={(level) => {
                        setLevels((current) => ({ ...current, [resource.id]: level }));
                        setScopeError(false);
                      }}
                      options={resource.levels.map((l) => ({ value: l, label: LEVELS[l] }))}
                    />
                  </li>
                ))}
              </ul>
              {scopeError && (
                <p role="alert" className="text-[13px] font-medium text-danger-fg">
                  Give the key access to at least one thing.
                </p>
              )}
            </div>
          )}

          <p className="flex items-center gap-2 text-[13px] text-fg-muted">
            {mode === "live" ? (
              <>
                <Badge tone="success" dot>
                  Live
                </Badge>
                This key moves real money and sends real riders.
              </>
            ) : (
              <>
                <Badge tone="warning" dot>
                  Test
                </Badge>
                This key only touches test data.
              </>
            )}
          </p>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" onClick={close} disabled={form.isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" loading={form.isSubmitting}>
              Create key
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
