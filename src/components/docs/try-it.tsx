"use client";

import * as React from "react";
import { Eye, EyeOff, KeyRound, Play, X } from "lucide-react";

import { Code } from "./code";
import { GET_A_KEY } from "./docs-header";
import { Button } from "@/components/ui/button";
import { buildUrl, keyProblem, missingParams, parseBody, pathParams, TRY_BASE } from "@/lib/docs/try-it";
import { cn } from "@/lib/utils";

/**
 * The reader's test key, for Try it. Memory only: it survives moving between docs pages, never a
 * reload, and is never written to storage (CLAUDE.md §2) or sent anywhere but the API.
 */
let testKey = "";
const keyListeners = new Set<() => void>();
const setTestKey = (key: string) => {
  testKey = key;
  keyListeners.forEach((fn) => fn());
};
const subscribeKey = (fn: () => void) => {
  keyListeners.add(fn);
  return () => keyListeners.delete(fn);
};
export const useTestKey = () =>
  React.useSyncExternalStore(
    subscribeKey,
    () => testKey,
    () => "",
  );

/** Where the reader pastes their test key once, for every Try it on the page. */
export function TestKeyField({ compact = false }: { compact?: boolean }) {
  const key = useTestKey();
  const [shown, setShown] = React.useState(false);
  const id = React.useId();
  const problem = key ? keyProblem(key) : null;

  return (
    <div className={cn("rounded-xl border border-line bg-surface-subtle/60", compact ? "p-3" : "p-4")}>
      <label htmlFor={id} className="flex items-center gap-2 text-sm font-bold text-fg-heading">
        <KeyRound className="size-4 text-fg-subtle" aria-hidden /> Your test key
      </label>
      <div className="mt-2 flex gap-2">
        <div className="relative min-w-0 flex-1">
          <input
            id={id}
            type={shown ? "text" : "password"}
            value={key}
            onChange={(e) => setTestKey(e.target.value.trim())}
            placeholder="sk_test_…"
            autoComplete="off"
            spellCheck={false}
            aria-invalid={problem ? true : undefined}
            aria-describedby={`${id}-help`}
            className="h-10 w-full rounded-lg border border-line-strong bg-surface pl-3 pr-10 font-mono text-[13px] text-fg placeholder:text-fg-subtle focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15 aria-[invalid=true]:border-danger"
          />
          <button
            type="button"
            onClick={() => setShown((s) => !s)}
            aria-label={shown ? "Hide key" : "Show key"}
            className="focus-ring absolute inset-y-0 right-1 my-auto grid size-8 place-items-center rounded-md text-fg-subtle hover:text-fg"
          >
            {shown ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
          </button>
        </div>
        {key && (
          <Button variant="ghost" size="sm" className="h-10" onClick={() => setTestKey("")}>
            <X /> Forget
          </Button>
        )}
      </div>
      <p id={`${id}-help`} className={cn("mt-1.5 text-xs", problem ? "font-medium text-danger-fg" : "text-fg-subtle")}>
        {problem ?? (
          <>
            Test keys only. Kept in this page&apos;s memory, never saved, and sent only to the Pickriders API. No key?{" "}
            <a href={GET_A_KEY} className="font-semibold text-brand-fg underline underline-offset-2">
              Get one
            </a>
            .
          </>
        )}
      </p>
    </div>
  );
}

export type Sent = { status: number; ms: number; body: unknown; text: string };

/** Sends a request with the reader's test key. Throws a readable message for anything but an answer. */
export async function sendWithTestKey(key: string, method: string, url: string, body?: unknown): Promise<Sent> {
  const problem = keyProblem(key);
  if (problem) throw new Error(problem);
  const started = performance.now();
  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${key.trim()}`,
        ...(body !== undefined && { "Content-Type": "application/json" }),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("We couldn't reach the API. Check your connection and try again.");
  }
  const text = await res.text();
  let parsed: unknown = text;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    // Not JSON: show it as it came.
  }
  return { status: res.status, ms: Math.round(performance.now() - started), body: parsed, text };
}

/** "200 OK" in green, 4xx amber, 5xx red. */
export function StatusBadge({ status }: { status: number }) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 font-mono text-xs font-bold",
        status < 300
          ? "bg-success-subtle text-success-fg"
          : status < 500
            ? "bg-warning-subtle text-warning-fg"
            : "bg-danger-subtle text-danger-fg",
      )}
    >
      {status}
    </span>
  );
}

/**
 * Send one endpoint's request for real: fill in the path values, edit the example body, Send, and
 * read the live answer.
 */
export function TryIt({
  method,
  path,
  example,
}: {
  method: string;
  path: string;
  example?: { query?: Record<string, string>; body?: unknown };
}) {
  const key = useTestKey();
  const names = pathParams(path);
  const [params, setParams] = React.useState<Record<string, string>>({});
  const [query, setQuery] = React.useState<Record<string, string>>(example?.query ?? {});
  const [bodyText, setBodyText] = React.useState(
    example?.body !== undefined ? JSON.stringify(example.body, null, 2) : "",
  );
  const [sending, setSending] = React.useState(false);
  const [result, setResult] = React.useState<Sent | null>(null);
  const [problem, setProblem] = React.useState<string | null>(null);
  const id = React.useId();
  const hasBody = method !== "GET" && method !== "DELETE";
  const url = buildUrl(path, params, query);

  const send = async () => {
    setProblem(null);
    const missing = missingParams(path, params);
    if (missing.length) return setProblem(`Fill in ${missing.join(" and ")} first.`);
    const parsed = parseBody(hasBody ? bodyText : "");
    if (!parsed.ok) return setProblem(parsed.message);
    setSending(true);
    try {
      setResult(await sendWithTestKey(key, method, url, hasBody ? (parsed.body ?? {}) : undefined));
    } catch (e) {
      setResult(null);
      setProblem((e as Error).message);
    } finally {
      setSending(false);
    }
  };

  const field =
    "h-9 w-full rounded-lg border border-line-strong bg-surface px-2.5 font-mono text-[13px] text-fg focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15";

  return (
    <div className="space-y-3 border-t border-line bg-surface-subtle/40 px-4 py-4" data-testid="try-it">
      <TestKeyField compact />

      {(names.length > 0 || Object.keys(query).length > 0) && (
        <div className="grid gap-3 sm:grid-cols-2">
          {names.map((name) => (
            <label key={name} className="block space-y-1">
              <span className="font-mono text-xs font-bold text-fg-heading">{name}</span>
              <input
                className={field}
                value={params[name] ?? ""}
                onChange={(e) => setParams((p) => ({ ...p, [name]: e.target.value }))}
                placeholder={name === "id" ? (path.startsWith("/orders") ? "ord_…" : "…") : "…"}
                spellCheck={false}
              />
            </label>
          ))}
          {Object.keys(query).map((name) => (
            <label key={name} className="block space-y-1">
              <span className="font-mono text-xs font-bold text-fg-heading">
                {name} <span className="font-normal text-fg-subtle">(query, optional)</span>
              </span>
              <input
                className={field}
                value={query[name]}
                onChange={(e) => setQuery((q) => ({ ...q, [name]: e.target.value }))}
                spellCheck={false}
              />
            </label>
          ))}
        </div>
      )}

      {hasBody && (
        <label htmlFor={`${id}-body`} className="block space-y-1">
          <span className="text-xs font-bold text-fg-heading">Body (JSON)</span>
          <textarea
            id={`${id}-body`}
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            rows={Math.min(14, Math.max(3, bodyText.split("\n").length))}
            spellCheck={false}
            className="w-full rounded-lg border border-line-strong bg-surface px-3 py-2 font-mono text-[13px] leading-5 text-fg focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15"
          />
        </label>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={send} loading={sending} disabled={!key}>
          <Play /> Send request
        </Button>
        <code className="min-w-0 truncate text-xs text-fg-subtle" title={url}>
          {method} {url}
        </code>
      </div>
      {problem && (
        <p role="alert" className="text-sm font-medium text-danger-fg">
          {problem}
        </p>
      )}

      {result && (
        <div aria-live="polite">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <StatusBadge status={result.status} />
            <span className="text-fg-muted">in {result.ms} ms</span>
            <a href="/logs" className="ml-auto text-xs font-semibold text-brand-fg underline underline-offset-2">
              See it in your request log
            </a>
          </div>
          <Code
            className="mt-2"
            tabs={[
              {
                label: "Response",
                lang: typeof result.body === "string" ? "text" : "json",
                code: typeof result.body === "string" ? result.text : JSON.stringify(result.body, null, 2),
              },
            ]}
          />
        </div>
      )}
      <p className="sr-only">Requests go to {TRY_BASE}.</p>
    </div>
  );
}
