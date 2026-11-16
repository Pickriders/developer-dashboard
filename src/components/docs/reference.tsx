import * as React from "react";

import { Code } from "./code";
import { C, Endpoint } from "./prose";
import { TryIt } from "./try-it";
import { TRY_EXAMPLES } from "@/lib/docs/endpoints";
import {
  type Endpoint as ApiEndpoint,
  exampleFor,
  type FieldRow,
  fields,
  PATH_PREFIX,
  requestSchema,
  responseExample,
  successResponse,
  typeLabel,
} from "@/lib/docs/openapi";
import { cn } from "@/lib/utils";

/** Text from the API document: paragraphs, with `code` set as code. */
export function DocText({ text, className }: { text?: string; className?: string }) {
  if (!text) return null;
  return (
    <div className={cn("space-y-3 text-[1rem] leading-7 text-fg", className)}>
      {text
        .trim()
        .split(/\n\s*\n/)
        .map((para, i) => (
          <p key={i}>
            {para
              .replace(/\s*\n\s*/g, " ")
              .split(/(`[^`]+`)/)
              .map((part, j) => (part.startsWith("`") ? <C key={j}>{part.slice(1, -1)}</C> : part))}
          </p>
        ))}
    </div>
  );
}

function FieldsTable({ rows, label }: { rows: FieldRow[]; label: string }) {
  return (
    <div className="my-4 overflow-hidden rounded-xl border border-line">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">{label}</caption>
        <thead className="bg-surface-subtle text-xs font-bold uppercase tracking-wide text-fg-muted">
          <tr>
            <th scope="col" className="px-4 py-2">
              Field
            </th>
            <th scope="col" className="px-4 py-2">
              What it is
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line bg-surface">
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="w-[40%] px-4 py-3 align-top" style={{ paddingLeft: `${1 + row.depth * 1.1}rem` }}>
                <span className="block break-all font-mono text-[13px] font-bold text-fg-heading">
                  {row.depth ? row.name.split(/\.|\[\]\./).pop() : row.name}
                </span>
                <span className="mt-0.5 flex flex-wrap gap-1.5 text-xs">
                  <span className="text-fg-subtle">{row.type}</span>
                  {row.required && <span className="font-semibold text-danger-fg">required</span>}
                  {row.nullable && <span className="text-fg-subtle">or null</span>}
                </span>
              </td>
              <td className="px-4 py-3 align-top leading-6 text-fg">
                {row.description && <DocText text={row.description} className="text-sm leading-6" />}
                {row.enum && (
                  <p className="mt-1 flex flex-wrap gap-1 text-xs">
                    {row.enum.map((v) => (
                      <C key={v}>{v}</C>
                    ))}
                  </p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** One endpoint, all of it: what it does, what to send, what comes back, and Try it. */
export function OperationBlock({ endpoint }: { endpoint: ApiEndpoint }) {
  const { method, path, op, anchor } = endpoint;
  // Idempotency-Key is only read on POST, though the document lists it on every route.
  const params = (op.parameters ?? []).filter(
    (p) => p.in !== "header" || (p.name === "Idempotency-Key" && method === "POST"),
  );
  const body = requestSchema(op);
  const bodyRows = fields(body);
  const success = successResponse(op);
  const example = responseExample(op, path);
  const tryExample = TRY_EXAMPLES[`${method} ${path}`] ?? (body ? { body: exampleFor(body) } : undefined);
  const testOnly = path.startsWith("/test/");

  return (
    <section
      aria-labelledby={anchor}
      className="scroll-mt-24 rounded-2xl border border-line bg-surface shadow-card"
      data-endpoint={`${method} ${path}`}
    >
      <div className="border-b border-line px-5 py-4">
        <h2 id={anchor} className="scroll-mt-24 text-xl font-extrabold tracking-tight text-fg-heading">
          <a href={`#${anchor}`} className="focus-ring rounded-sm hover:text-brand-fg">
            {op.summary ?? `${method} ${path}`}
          </a>
        </h2>
        <p className="mt-2 flex flex-wrap items-center gap-2">
          <Endpoint method={method} path={path} />
          {testOnly && (
            <span className="rounded-full bg-warning-subtle px-2 py-0.5 text-xs font-semibold text-warning-fg">
              test keys only
            </span>
          )}
        </p>
      </div>

      <div className="space-y-6 px-5 py-5">
        <DocText text={op.description} />

        {params.length > 0 && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-fg-muted">Parameters</h3>
            <FieldsTable
              label={`Parameters for ${method} ${path}`}
              rows={params.map((p) => ({
                name: p.name,
                depth: 0,
                type: `${p.in === "path" ? "in the path" : p.in === "query" ? "in the query" : "header"} · ${typeLabel(p.schema ?? {})}`,
                required: Boolean(p.required),
                nullable: false,
                description: p.description ?? "",
                enum: p.schema?.enum?.map(String),
              }))}
            />
          </div>
        )}

        {bodyRows.length > 0 && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-fg-muted">Body</h3>
            <FieldsTable label={`Body for ${method} ${path}`} rows={bodyRows} />
          </div>
        )}

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-fg-muted">
            Returns <span className="font-mono normal-case text-fg-subtle">{success.status}</span>
          </h3>
          {success.description && !/list object/i.test(success.description) && (
            <DocText text={success.description} className="mt-1 text-sm" />
          )}
          {example !== null && example !== undefined && (
            <Code tabs={[{ label: "Example response", lang: "json", code: JSON.stringify(example, null, 2) }]} />
          )}
        </div>

        <details className="group rounded-xl border border-line">
          <summary className="focus-ring flex cursor-pointer list-none items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-fg-heading">
            Try it with your test key
            <span className="text-xs font-semibold text-fg-subtle group-open:hidden">Open</span>
          </summary>
          <TryIt method={method} path={path} example={tryExample} />
        </details>

        <p className="sr-only">
          Full URL: {PATH_PREFIX}
          {path}
        </p>
      </div>
    </section>
  );
}
