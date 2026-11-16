"use client";

import * as React from "react";
import {
  Play,
  ArrowRight,
  Check,
  CircleAlert,
  CircleCheck,
  ClipboardPaste,
  Lock,
  PartyPopper,
  RotateCcw,
} from "lucide-react";

import { CodeFill } from "./code";
import { sendWithTestKey, StatusBadge, TestKeyField, useTestKey } from "./try-it";
import { Button } from "@/components/ui/button";
import { buildUrl } from "@/lib/docs/try-it";
import {
  check,
  SAMPLE_ORDER,
  SAMPLE_QUOTE,
  type Carried,
  type CheckKind,
  type CheckResult,
} from "@/lib/docs/walkthrough";
import { cn } from "@/lib/utils";

/**
 * The quickstart as a walkthrough (12.1): one step open at a time, each with exactly what to do as a
 * short to-do list, and the next step locked until this one is marked done. Where the API answers,
 * the reader can paste its answer to have it checked, and the ids it holds flow into later examples.
 *
 * Built for search engines too: every step's text and code is in the HTML. Before the page runs (and
 * for crawlers that don't), all steps are open; the walkthrough only folds them once it starts.
 */
type Progress = { done: string[]; ticks: Record<string, boolean>; carry: Carried; reopened: string[] };
const EMPTY: Progress = { done: [], ticks: {}, carry: {}, reopened: [] };
const STORE_KEY = "pr-docs-quickstart-v1";

type Ctx = {
  ready: boolean;
  steps: { id: string; title: string }[];
  progress: Progress;
  current: string | null;
  tick: (taskId: string, on: boolean) => void;
  markDone: (stepId: string) => void;
  carry: (values: Carried) => void;
  toggleReopen: (stepId: string) => void;
};
const WalkContext = React.createContext<Ctx | null>(null);
const useWalk = () => React.useContext(WalkContext)!;

const load = (): Progress => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) ?? "null");
    return saved && Array.isArray(saved.done) ? { ...EMPTY, ...saved, reopened: [] } : EMPTY;
  } catch {
    return EMPTY;
  }
};

export function Walkthrough({
  steps,
  finish,
  children,
}: {
  steps: { id: string; title: string }[];
  /** Shown once every step is done. */
  finish: React.ReactNode;
  children: React.ReactNode;
}) {
  const [ready, setReady] = React.useState(false);
  const [progress, setProgress] = React.useState<Progress>(EMPTY);
  const [announcement, setAnnouncement] = React.useState("");

  React.useEffect(() => {
    setProgress(load());
    setReady(true);
  }, []);
  React.useEffect(() => {
    if (!ready) return;
    try {
      const { reopened: _, ...kept } = progress;
      localStorage.setItem(STORE_KEY, JSON.stringify(kept));
    } catch {
      // Private mode: progress lasts for this visit.
    }
  }, [progress, ready]);

  const current = steps.find((s) => !progress.done.includes(s.id))?.id ?? null;
  const doneCount = steps.filter((s) => progress.done.includes(s.id)).length;

  const ctx: Ctx = {
    ready,
    steps,
    progress,
    current,
    tick: (taskId, on) => setProgress((p) => ({ ...p, ticks: { ...p.ticks, [taskId]: on } })),
    carry: (values) => setProgress((p) => ({ ...p, carry: { ...p.carry, ...values } })),
    toggleReopen: (stepId) =>
      setProgress((p) => ({
        ...p,
        reopened: p.reopened.includes(stepId) ? p.reopened.filter((s) => s !== stepId) : [...p.reopened, stepId],
      })),
    markDone: (stepId) => {
      const i = steps.findIndex((s) => s.id === stepId);
      const next = steps[i + 1];
      setProgress((p) => ({ ...p, done: [...p.done, stepId], reopened: p.reopened.filter((s) => s !== stepId) }));
      setAnnouncement(next ? `Step ${i + 1} done. Step ${i + 2}, ${next.title}, is open.` : "Every step is done.");
      // Bring the next step into view once it has opened.
      window.setTimeout(() => {
        const target = document.getElementById(next ? `walk-${next.id}` : "walk-finish");
        if (!target) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        target.querySelector<HTMLElement>("[data-walk-heading]")?.focus({ preventScroll: true });
      }, 320);
    },
  };

  const fillValues = {
    ...(progress.carry.quoteId && { [SAMPLE_QUOTE]: progress.carry.quoteId }),
    ...(progress.carry.orderId && { [SAMPLE_ORDER]: progress.carry.orderId }),
  };
  const allDone = ready && doneCount === steps.length;

  return (
    <WalkContext.Provider value={ctx}>
      <CodeFill.Provider value={fillValues}>
        <div
          className="sticky top-16 z-20 -mx-4 mb-6 border-b border-line bg-canvas/90 px-4 py-3 backdrop-blur-md md:-mx-2 md:rounded-b-2xl md:px-2"
          aria-label="Your progress"
          role="region"
        >
          <div className="flex items-center justify-between gap-3 text-sm">
            <p className="font-semibold text-fg-heading" data-testid="walk-status">
              {!ready
                ? `${steps.length} steps, about 10 minutes`
                : allDone
                  ? "All done. Nice work!"
                  : `Step ${doneCount + 1} of ${steps.length}`}
              {ready && current && (
                <span className="font-normal text-fg-muted"> · {steps.find((s) => s.id === current)?.title}</span>
              )}
            </p>
            {ready && doneCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  setProgress(EMPTY);
                  setAnnouncement("Started over at step 1.");
                  document.getElementById(`walk-${steps[0].id}`)?.scrollIntoView({ block: "start" });
                }}
                className="focus-ring inline-flex shrink-0 items-center gap-1.5 rounded-md text-xs font-semibold text-fg-muted hover:text-fg"
              >
                <RotateCcw className="size-3.5" aria-hidden /> Start over
              </button>
            )}
          </div>
          <div className="mt-2 flex gap-1.5" aria-hidden>
            {steps.map((s) => (
              <span
                key={s.id}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors duration-500",
                  progress.done.includes(s.id) ? "bg-brand" : s.id === current && ready ? "bg-brand/35" : "bg-line",
                )}
              />
            ))}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {announcement}
        </p>

        <ol className="space-y-4">{children}</ol>

        <div
          id="walk-finish"
          className={cn("scroll-mt-40 transition-all duration-500", allDone ? "mt-8 opacity-100" : "hidden")}
        >
          {allDone && (
            <div className="rounded-2xl border border-brand-line bg-brand-subtle/60 p-6 text-center animate-pop-in">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-brand text-white">
                <PartyPopper className="size-7" aria-hidden />
              </span>
              <h2 tabIndex={-1} data-walk-heading className="mt-4 text-2xl font-black text-fg-heading outline-none">
                You sent your first delivery.
              </h2>
              <div className="mx-auto mt-2 max-w-md text-fg-muted">{finish}</div>
            </div>
          )}
        </div>
      </CodeFill.Provider>
    </WalkContext.Provider>
  );
}

type Task = { id: string; label: React.ReactNode };

/**
 * One step: what it's for, the content (instructions and code), then the to-do list. Done unlocks
 * once every task is ticked; a paste check can tick the last one for you.
 */
export function WalkStep({
  id,
  n,
  title,
  summary,
  tasks,
  checkKind,
  checkPrompt,
  run,
  children,
}: {
  id: string;
  n: number;
  title: string;
  /** One line shown once the step is done. */
  summary: string;
  tasks: Task[];
  /** Read a pasted answer; passing it ticks the task whose id is `${id}:worked`. */
  checkKind?: CheckKind;
  checkPrompt?: string;
  /** The step's request, to send from the page with the reader's test key. Sample ids become theirs. */
  run?: { method: string; path: string; body?: unknown };
  children: React.ReactNode;
}) {
  const walk = useWalk();
  const done = walk.progress.done.includes(id);
  const current = walk.current === id;
  const locked = walk.ready && !done && !current;
  const reopened = walk.progress.reopened.includes(id);
  const open = !walk.ready || current || (done && reopened);
  const ticked = tasks.filter((t) => walk.progress.ticks[t.id]).length;
  const allTicked = ticked === tasks.length;
  const previous = walk.steps[n - 2];
  const bodyRef = React.useRef<HTMLDivElement>(null);

  // Folded steps stay in the page (for search engines and Ctrl+F) but out of reach of Tab.
  React.useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    if (open) body.removeAttribute("inert");
    else body.setAttribute("inert", "");
  }, [open]);

  return (
    <li
      id={`walk-${id}`}
      data-step={id}
      data-state={done ? "done" : current ? "current" : walk.ready ? "locked" : "open"}
      className={cn(
        "scroll-mt-40 rounded-2xl border bg-surface transition-[border-color,box-shadow,opacity] duration-300",
        current && walk.ready ? "border-brand shadow-pop" : "border-line shadow-card",
        locked && "opacity-70",
      )}
    >
      <div className="flex items-center gap-3 px-5 py-4">
        <span
          aria-hidden
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-full text-sm font-extrabold transition-colors duration-300",
            done
              ? "bg-brand text-white"
              : current || !walk.ready
                ? "bg-fg-heading text-canvas"
                : "bg-surface-muted text-fg-subtle",
          )}
        >
          {done ? <Check className="size-5" /> : locked ? <Lock className="size-4" /> : n}
        </span>
        <div className="min-w-0 flex-1">
          <h2
            tabIndex={-1}
            data-walk-heading
            data-toc={title}
            id={id}
            className="scroll-mt-40 text-lg font-extrabold leading-snug tracking-tight text-fg-heading outline-none"
          >
            <span className="sr-only">Step {n}: </span>
            {title}
          </h2>
          {done && !reopened && <p className="truncate text-sm text-fg-muted">{summary}</p>}
          {locked && previous && <p className="text-sm text-fg-subtle">Finish “{previous.title}” to open this.</p>}
        </div>
        {done && (
          <button
            type="button"
            onClick={() => walk.toggleReopen(id)}
            aria-expanded={reopened}
            className="focus-ring shrink-0 rounded-md px-2 py-1 text-xs font-semibold text-fg-muted hover:text-fg"
          >
            {reopened ? "Fold" : "Open again"}
          </button>
        )}
        {current && walk.ready && (
          <span className="shrink-0 rounded-full bg-brand-subtle px-2.5 py-0.5 text-xs font-bold text-brand-fg">
            Now
          </span>
        )}
      </div>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div ref={bodyRef} className="overflow-hidden" aria-hidden={!open || undefined}>
          <div className="border-t border-line px-5 pb-5 pt-1">
            {children}

            {checkKind && (
              <PasteCheck
                kind={checkKind}
                prompt={checkPrompt}
                run={run}
                onRan={() => walk.tick(`${id}:run`, true)}
                onPass={() => walk.tick(`${id}:worked`, true)}
              />
            )}

            <fieldset className="mt-6 rounded-xl border border-line bg-surface-subtle/60 p-4">
              <legend className="px-1 text-sm font-bold text-fg-heading">
                Your to-do{" "}
                <span className="font-semibold text-fg-subtle">
                  {ticked}/{tasks.length}
                </span>
              </legend>
              <ul className="space-y-1">
                {tasks.map((task) => (
                  <li key={task.id}>
                    <label className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2 hover:bg-surface">
                      <input
                        type="checkbox"
                        checked={Boolean(walk.progress.ticks[task.id])}
                        onChange={(e) => walk.tick(task.id, e.target.checked)}
                        className="peer mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-brand"
                        disabled={!walk.ready}
                      />
                      <span className="text-[0.98rem] leading-6 text-fg peer-checked:text-fg-muted peer-checked:line-through peer-checked:decoration-fg-subtle">
                        {task.label}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>

            {!done && (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button size="lg" onClick={() => walk.markDone(id)} disabled={!walk.ready || !allTicked}>
                  {n === walk.steps.length ? "Finish" : "Done, next step"} <ArrowRight />
                </Button>
                {walk.ready && !allTicked && (
                  <p className="text-sm text-fg-muted">Tick everything in your to-do first.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

/** Paste what the API answered; we say whether it worked, or what to do about the error. */
function PasteCheck({
  kind,
  prompt,
  run: request,
  onRan,
  onPass,
}: {
  kind: CheckKind;
  prompt?: string;
  run?: { method: string; path: string; body?: unknown };
  /** Running the request here counts as running the example. */
  onRan?: () => void;
  onPass: () => void;
}) {
  const walk = useWalk();
  const key = useTestKey();
  const [text, setText] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState<{ status: number; ms: number } | null>(null);
  const [result, setResult] = React.useState<CheckResult>({ state: "empty" });
  const id = React.useId();

  const run = (value: string) => {
    const r = check(kind, value);
    setResult(r);
    if (r.state === "ok") {
      if (r.carry) walk.carry(r.carry);
      onPass();
    }
  };

  /** The reader's own ids in place of the samples, in the path and the body. */
  const mine = (value: string) =>
    value
      .split(SAMPLE_QUOTE)
      .join(walk.progress.carry.quoteId ?? SAMPLE_QUOTE)
      .split(SAMPLE_ORDER)
      .join(walk.progress.carry.orderId ?? SAMPLE_ORDER);

  const sendHere = async () => {
    if (!request) return;
    setSending(true);
    setSent(null);
    try {
      const body = request.body === undefined ? undefined : JSON.parse(mine(JSON.stringify(request.body)));
      const answer = await sendWithTestKey(key, request.method, buildUrl(mine(request.path), {}), body);
      const shown = typeof answer.body === "string" ? answer.text : JSON.stringify(answer.body, null, 2);
      setSent({ status: answer.status, ms: answer.ms });
      onRan?.();
      setText(shown);
      run(shown);
    } catch (e) {
      setResult({ state: "problem", title: "It didn't send.", detail: (e as Error).message });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mt-6 rounded-xl border border-dashed border-line-strong p-4">
      {request && (
        <div className="mb-4 space-y-3 border-b border-line pb-4">
          <p className="text-sm font-bold text-fg-heading">Run it here, no terminal needed</p>
          <TestKeyField compact />
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm" onClick={sendHere} loading={sending} disabled={!walk.ready || !key}>
              <Play /> Run it here
            </Button>
            {sent && (
              <span className="flex items-center gap-2 text-xs text-fg-muted">
                <StatusBadge status={sent.status} /> in {sent.ms} ms
              </span>
            )}
          </div>
        </div>
      )}
      <label htmlFor={id} className="flex items-center gap-2 text-sm font-bold text-fg-heading">
        <ClipboardPaste className="size-4 text-fg-subtle" aria-hidden />
        {prompt ?? "Paste what you got back, and we'll check it"}
      </label>
      <p className="mt-0.5 text-xs text-fg-subtle">It stays in your browser. Don&apos;t paste your key.</p>
      <textarea
        id={id}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (result.state !== "empty") setResult({ state: "empty" });
        }}
        onPaste={(e) => {
          const pasted = e.clipboardData.getData("text");
          // Check straight away on paste; typing waits for the button.
          window.setTimeout(() => run(pasted), 0);
        }}
        rows={3}
        spellCheck={false}
        placeholder='{ "object": … }'
        disabled={!walk.ready}
        className="mt-2 w-full rounded-lg border border-line-strong bg-surface px-3 py-2 font-mono text-[13px] text-fg placeholder:text-fg-subtle focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15"
      />
      <div className="mt-2 flex items-start gap-3">
        <Button size="sm" variant="secondary" onClick={() => run(text)} disabled={!text.trim()}>
          Check it
        </Button>
        <div aria-live="polite" className="min-w-0 flex-1">
          {result.state === "ok" && (
            <p className="flex items-start gap-2 text-sm text-success-fg animate-fade-in">
              <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>
                <strong>{result.title}</strong> {result.detail}
              </span>
            </p>
          )}
          {result.state === "problem" && (
            <p className="flex items-start gap-2 text-sm text-danger-fg animate-fade-in">
              <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>
                <strong>{result.title}</strong> {result.detail}
                {result.code && (
                  <>
                    {" "}
                    <a href={`/docs/errors#${result.code}`} className="font-semibold underline underline-offset-2">
                      More about {result.code}
                    </a>
                  </>
                )}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
