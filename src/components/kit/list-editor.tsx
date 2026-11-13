"use client";

import * as React from "react";
import { CircleAlert, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/**
 * A short list of values edited one at a time: type one and press Enter (or paste several,
 * separated by commas or spaces) to add it, or remove one with its ×. Each change is saved at
 * once through `onSave(next)`; a rejected save keeps what was typed and shows the API's message.
 * Read-only without `onSave`.
 */
export function ListEditor({
  id,
  label,
  inputLabel,
  items,
  onSave,
  validate,
  normalise = (v) => v.trim(),
  max,
  placeholder,
  addLabel = "Add",
  mono,
  empty,
  beforeAdd,
}: {
  id: string;
  /** Names the list; each value's remove button says "Remove 203.0.113.9". */
  label: string;
  /** Names the input, e.g. "New IP or range". */
  inputLabel: string;
  items: string[];
  onSave?: (next: string[]) => Promise<unknown>;
  /** A message when a value can't be added, checked before anything is sent. */
  validate?: (value: string) => string | null;
  normalise?: (value: string) => string;
  max?: number;
  placeholder?: string;
  addLabel?: string;
  mono?: boolean;
  /** Shown in place of the chips while the list is empty. */
  empty?: React.ReactNode;
  /** Asked before an add is saved, e.g. to confirm the first IP; resolve false to stop. */
  beforeAdd?: (added: string[], next: string[]) => Promise<boolean>;
}) {
  const [text, setText] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [saving, setSaving] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const full = max !== undefined && items.length >= max;

  const save = async (next: string[], busy: string) => {
    if (!onSave) return false;
    setSaving(busy);
    setError(null);
    try {
      await onSave(next);
      return true;
    } catch (e) {
      setError((e as { message?: string }).message ?? "That didn't save. Try again.");
      return false;
    } finally {
      setSaving(null);
    }
  };

  const add = async () => {
    const values = text
      .split(/[\s,;]+/)
      .map(normalise)
      .filter(Boolean)
      .filter((v, i, all) => all.indexOf(v) === i && !items.includes(v));
    if (!values.length) {
      setText("");
      return;
    }
    for (const v of values) {
      const problem = validate?.(v);
      if (problem) {
        setError(problem);
        inputRef.current?.focus();
        return;
      }
    }
    const next = [...items, ...values];
    if (max !== undefined && next.length > max) {
      setError(`Up to ${max}. Remove one to add another.`);
      return;
    }
    if (beforeAdd && !(await beforeAdd(values, next))) return;
    if (await save(next, "add")) setText("");
    inputRef.current?.focus();
  };

  return (
    <div className="space-y-3">
      {items.length ? (
        <ul aria-label={label} className="flex flex-wrap gap-2">
          {items.map((item) => (
            <li
              key={item}
              className={cn(
                "flex h-8 max-w-full items-center gap-1 rounded-full border border-line bg-surface-subtle pl-3 text-sm text-fg animate-fade-in",
                onSave ? "pr-1" : "pr-3",
                saving === item && "opacity-50",
              )}
            >
              <span className={cn("truncate", mono && "font-mono text-[13px]")}>{item}</span>
              {onSave && (
                <button
                  type="button"
                  aria-label={`Remove ${item}`}
                  disabled={saving !== null}
                  onClick={() =>
                    save(
                      items.filter((i) => i !== item),
                      item,
                    )
                  }
                  className="focus-ring grid size-6 shrink-0 place-items-center rounded-full text-fg-subtle transition-colors hover:bg-surface-muted hover:text-fg disabled:cursor-default"
                >
                  <X className="size-3.5" aria-hidden />
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        empty && <div className="text-sm text-fg-muted">{empty}</div>
      )}

      {onSave && (
        <form
          noValidate
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            void add();
          }}
        >
          <label htmlFor={id} className="sr-only">
            {inputLabel}
          </label>
          <Input
            ref={inputRef}
            id={id}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError(null);
            }}
            placeholder={full ? `Up to ${max}. Remove one to add another.` : placeholder}
            disabled={full}
            autoCapitalize="none"
            autoComplete="off"
            spellCheck={false}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            className={cn("flex-1", mono && "font-mono text-[13px]")}
          />
          <Button
            type="submit"
            variant="secondary"
            loading={saving === "add"}
            disabled={full || !text.trim() || (saving !== null && saving !== "add")}
          >
            <Plus /> {addLabel}
          </Button>
        </form>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="flex items-start gap-1.5 text-[13px] font-medium text-danger-fg">
          <CircleAlert className="mt-px size-3.5 shrink-0" aria-hidden />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
