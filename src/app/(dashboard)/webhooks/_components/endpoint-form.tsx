"use client";

import * as React from "react";
import { Check, Minus } from "lucide-react";
import { useFormik } from "formik";
import * as yup from "yup";

import { ApiErrorAlert, Field, useFocusFirstError, useServerErrors, visibleError } from "@/components/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ApiError } from "@/lib/dashboard/errors";
import { EVENT_GROUPS, type EventType } from "@/lib/dashboard/events";
import { cn } from "@/lib/utils";

export type EndpointValues = { url: string; description: string; enabled_events: ("*" | EventType)[] };

const FIELDS = ["url", "description"] as const;

const schema = yup.object({
  url: yup
    .string()
    .trim()
    .required("Enter the URL to send events to.")
    .test("url", "Enter a full URL, like https://api.acme.com/pickriders/webhooks.", (v) => {
      try {
        return ["https:", "http:"].includes(new URL(v ?? "").protocol);
      } catch {
        return false;
      }
    }),
  description: yup.string().trim().max(200, "Keep it under 200 characters."),
});

/**
 * Where events go and which ones: the URL, a note for your team, and the events (all of them, or
 * the ones you pick, by group). Create and Edit both use it.
 */
export function EndpointForm({
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial?: Partial<EndpointValues>;
  submitLabel: string;
  /** Resolves when saved; rejects with the API's error to show it. */
  onSubmit: (values: EndpointValues) => Promise<void>;
  onCancel: () => void;
}) {
  const [all, setAll] = React.useState(!initial?.enabled_events || initial.enabled_events.includes("*"));
  const [picked, setPicked] = React.useState<Set<EventType>>(
    () => new Set((initial?.enabled_events ?? []).filter((e): e is EventType => e !== "*")),
  );
  const [eventsError, setEventsError] = React.useState(false);
  const [failure, setFailure] = React.useState<ApiError | null>(null);
  const serverErrors = useServerErrors<(typeof FIELDS)[number]>();

  const form = useFormik({
    initialValues: { url: initial?.url ?? "", description: initial?.description ?? "" },
    validationSchema: schema,
    onSubmit: async (values, helpers) => {
      setFailure(null);
      if (!all && !picked.size) return setEventsError(true);
      try {
        await onSubmit({
          url: values.url.trim(),
          description: values.description.trim(),
          enabled_events: all ? ["*"] : Array.from(picked),
        });
      } catch (e) {
        const error = e as ApiError;
        if (error.param === "url") {
          serverErrors.set("url", values.url.trim(), error.message);
          helpers.setFieldError("url", error.message);
        } else setFailure(error);
      }
    },
  });
  useFocusFirstError(form, FIELDS);

  const toggle = (types: EventType[], on: boolean) => {
    setEventsError(false);
    setPicked((current) => {
      const next = new Set(current);
      for (const t of types) {
        if (on) next.add(t);
        else next.delete(t);
      }
      return next;
    });
  };

  const error = (name: (typeof FIELDS)[number]) =>
    serverErrors.get(name, form.values[name].trim()) ?? visibleError(form, name);

  return (
    <form noValidate onSubmit={form.handleSubmit} className="space-y-5">
      {failure && <ApiErrorAlert error={failure} />}

      <Field id="url" label="Endpoint URL" hint="An https URL on the public internet." error={error("url")}>
        {(a11y) => (
          <Input
            {...a11y}
            {...form.getFieldProps("url")}
            type="url"
            inputMode="url"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            autoFocus={!initial?.url}
            placeholder="https://api.acme.com/pickriders/webhooks"
            className="font-mono text-sm sm:text-[13px]"
          />
        )}
      </Field>

      <Field
        id="description"
        label={
          <>
            Description <span className="font-normal text-fg-subtle">(optional)</span>
          </>
        }
        error={error("description")}
      >
        {(a11y) => <Input {...a11y} {...form.getFieldProps("description")} placeholder="Order updates for the shop" />}
      </Field>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-fg">Events to send</legend>
        <div role="radiogroup" aria-label="Events to send" className="grid gap-2 sm:grid-cols-2">
          {[
            { value: true, title: "All events", hint: "Including ones Pickriders adds later." },
            { value: false, title: "Choose events", hint: "Only the ones you pick." },
          ].map((option) => (
            <button
              key={option.title}
              type="button"
              role="radio"
              aria-checked={all === option.value}
              onClick={() => {
                setAll(option.value);
                setEventsError(false);
              }}
              className={cn(
                "focus-ring rounded-xl border p-3.5 text-left transition-colors",
                all === option.value
                  ? "border-brand bg-brand-subtle"
                  : "border-line-strong bg-surface hover:border-fg-subtle/50",
              )}
            >
              <span className={cn("block text-sm font-bold", all === option.value ? "text-brand-fg" : "text-fg")}>
                {option.title}
              </span>
              <span className="mt-0.5 block text-[13px] leading-5 text-fg-muted">{option.hint}</span>
            </button>
          ))}
        </div>

        {!all && (
          <div className="mt-3 animate-fade-in space-y-3">
            {EVENT_GROUPS.map((group) => {
              const types = group.events.map((e) => e.type);
              const count = types.filter((t) => picked.has(t)).length;
              const state = count === 0 ? "none" : count === types.length ? "all" : "some";
              return (
                <div key={group.title} className="overflow-hidden rounded-xl border border-line">
                  <label className="flex cursor-pointer items-center gap-3 border-b border-line bg-surface-subtle/70 px-3.5 py-2.5">
                    <Checkbox
                      state={state}
                      onChange={() => toggle(types, state !== "all")}
                      label={`All ${group.title.toLowerCase()} events`}
                    />
                    <span className="flex-1 text-sm font-bold text-fg">{group.title}</span>
                    <span className="text-xs tabular-nums text-fg-subtle">
                      {count} of {types.length}
                    </span>
                  </label>
                  <ul className="divide-y divide-line">
                    {group.events.map((event) => (
                      <li key={event.type}>
                        <label className="flex cursor-pointer items-start gap-3 px-3.5 py-2.5 transition-colors hover:bg-surface-subtle/50">
                          <Checkbox
                            state={picked.has(event.type) ? "all" : "none"}
                            onChange={() => toggle([event.type], !picked.has(event.type))}
                            label={event.type}
                          />
                          <span className="min-w-0">
                            <code className="block text-[13px] font-medium text-fg">{event.type}</code>
                            <span className="block text-xs text-fg-subtle">{event.description}</span>
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
        {eventsError && (
          <p role="alert" className="mt-2 text-[13px] font-medium text-danger-fg">
            Choose at least one event.
          </p>
        )}
      </fieldset>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="secondary" onClick={onCancel} disabled={form.isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" loading={form.isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

/** A real checkbox under a drawn box, so it keeps the native keyboard and screen reader behaviour. */
function Checkbox({ state, onChange, label }: { state: "none" | "some" | "all"; onChange: () => void; label: string }) {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = state === "some";
  }, [state]);
  return (
    <span className="relative mt-px grid size-[18px] shrink-0 place-items-center">
      <input
        ref={ref}
        type="checkbox"
        aria-label={label}
        checked={state === "all"}
        onChange={onChange}
        className="peer absolute inset-0 cursor-pointer appearance-none rounded-[5px] border-[1.5px] border-line-strong bg-surface transition-colors checked:border-brand-solid checked:bg-brand-solid indeterminate:border-brand-solid indeterminate:bg-brand-solid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1"
      />
      {state !== "none" && (
        <span className="pointer-events-none relative text-brand-ink [&_svg]:size-3">
          {state === "all" ? <Check strokeWidth={3.5} /> : <Minus strokeWidth={3.5} />}
        </span>
      )}
    </span>
  );
}
