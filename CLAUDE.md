# developer-dashboard — Rules for Claude

The Pickriders **developer dashboard** — the console developers use alongside the public
Developer API. They sign up, verify their email and phone, create API keys, manage webhook
endpoints, read request logs, create and track orders, fund their wallet, manage their team,
and request live access. Served at `dashboard.pickriders.com`.

**Stack:** Next.js 14 (**App Router**), React 18, TypeScript, Tailwind CSS, shadcn/ui
(`new-york` style, zinc base, Lucide icons), TanStack React Query + React Table, Recharts,
Formik/Yup, `@vis.gl/react-google-maps`, `next-themes`, Sonner (toasts) — the same stack as
`pickrider-admin`, so patterns and components copy across. Deployed on Vercel.

**Path alias:** `@/*` → `src/*`.

> The app itself is scaffolded in plan step 11.1. Until then this repo holds this file, the
> README and the release workflow. Sections below describe the structure that step creates;
> keep them true as it lands.

---

## 1. Sibling repos — you are one of seven

This app is checked out alongside **separate git repositories**: `backend-api` (NestJS — the
only thing that talks to the database), `customer-app` and `rider-app` (Expo/React Native),
`pickrider-admin` (the internal staff console, Next.js 14), `web-app` (marketing site, Next 13
Pages Router + Sass) and `developer-docs` (the public API docs, Fumadocs). No monorepo, no
workspace linking — each has its own `node_modules` and its own remote.

**`pickrider-admin` is your near-twin.** Same framework, same UI kit approach, same three-layer
data access. Copy its patterns; don't copy its assumptions — see §2.

---

## 2. This app is used by customers, not staff

Everyone signed in here is an **outside developer**, acting only on their own team's data.
That changes what "safe" means compared with the admin:

- **Every request is team-scoped.** The API client sends `X-Team-Id` for the team selected in
  the team switcher. Never build a screen that reads data without a team, and never let a
  team id come from anything but the signed-in user's own memberships.
- **Secrets are shown once.** A new API key's plaintext (`sk_test_…` / `sk_live_…`) and a
  webhook signing secret (`whsec_…`) are returned once by the API. Show them in a reveal-once
  dialog with a copy button, then drop them. Never put them in React Query cache keys,
  `localStorage`, URLs, analytics events, error reports or logs.
- **Test and live mode are always visible.** The mode switch is global; test mode shows a
  persistent banner. Live mode stays locked until the team's live access is **approved** by a
  Pickriders admin (after email and phone verification and a live-access request). The lock
  explains the next step instead of hiding the switch.
- **Destructive actions confirm first** — revoking or rolling a key, deleting a webhook
  endpoint, removing a teammate, cancelling an order. Use the kit `ConfirmDialog`; say what
  happens ("Revoke key — apps using it stop working immediately").
- **Permissions mirror the team role** (Owner, Admin, Developer, Finance, Viewer). Hide what
  a role cannot do, but remember the backend is the real guard.
- Write copy for developers: name things by what they do, show exact error codes and request
  ids from the API so they can search the docs and the request log.

---

## 3. Structure (from step 11.1)

```
src/
├── app/
│   ├── (dashboard)/      home (get-started checklist), orders, wallet, keys, webhooks,
│   │                     logs, team, settings, usage — each with `_components/`
│   ├── auth/             sign-up, login, verify email/phone, reset, accept invitation
│   ├── api/session/      route handlers that set / clear the httpOnly session cookie
│   ├── layout.tsx
│   └── globals.css
├── services/apiService/  GENERATED swagger client + hand-written index.ts
├── lib/dashboard/
│   ├── api.ts            typed namespaces (keys, webhooks, orders, wallet, team, logs, …),
│   │                     every function delegating to a generated apiService method
│   ├── api.test.ts       route contract: verb + path + query + body per namespace function
│   ├── hooks.ts          React Query hooks over api.ts (`useAction` = mutation + toast)
│   ├── url-state.ts      useTableState / useTabParam
│   └── format.ts         money / date / status helpers
├── lib/team-access.ts    role → permission matrix (mirrors backend's team permissions), can()
├── lib/mode.tsx          test / live mode context
├── components/kit/       Panel, Button, Badge, DataTable, Drawer, ConfirmDialog, SecretReveal,
│                         CodeBlock, StatCard, charts
├── components/ui/        shadcn primitives
└── middleware.ts         auth gate
```

**Auth is global, in `src/middleware.ts`** — it reads the session cookie and redirects to
`/auth/login?redirect=<original path>`. The session token lives in an **httpOnly** cookie set
by a route handler, never in `localStorage`. Do not re-implement auth gating per page.

---

## 4. Hard rules

1. **Never edit the generated API client, and never bypass it.**
   `src/services/apiService/{Api,ApiRoute,data-contracts,http-client}.ts` come from
   `yarn generate-types`. Only `apiService/index.ts` is hand-written (session token,
   `X-Team-Id`, 401 redirect). The dashboard calls the **dashboard routes**
   (`/developer/api/v1/dashboard/*`), which are in backend-api's internal Swagger document, so
   generate from `/docs/api-json` like the other apps. **No hand-written axios or fetch calls.**
2. **Every `api.ts` function gets a line in `src/lib/dashboard/api.test.ts`** pinning its
   verb, path, query and body, so a renamed backend route fails CI, not a customer.
3. **Tables are URL-driven.** `useTableState` / `useTabParam` with the kit `DataTable`, so
   filters, pagination and the open drawer (`?id=`) survive a refresh and can be shared.
4. **Money from the API is in sub-units** (kobo/cents). Convert with `subUnitToBaseUnit()`
   before display and `baseUnitToSubUnit()` before sending. Wallet balances, top-ups, holds and
   order prices all go through this.
5. **Secrets never persist client-side** (§2). A code review that finds a key or `whsec_`
   value in state that outlives its dialog is a blocker.
6. **Tailwind + the kit.** Reuse `src/components/kit/` (then `components/ui/`) before writing
   anything bespoke. No Sass, no styled-components.
7. **Never commit secrets** — `.env*` and credential files. `NEXT_PUBLIC_*` values ship to the
   browser and are not secret; nothing else belongs client-side.
8. **Do not upgrade Next, React, or Tailwind** as a side effect of a task.
9. **Aggregates come from the backend.** Usage charts and headline numbers come from summary
   endpoints. If a page needs a number the API doesn't give, add an endpoint in backend-api
   and say so — don't derive it from list calls.

---

## 5. Conventions

**Data access** — three layers, never skipped (identical to pickrider-admin):

```ts
// 1. src/lib/dashboard/api.ts — a namespace function per route, on the generated client
export const keys = {
  list: (mode: Mode) => apiService.dashboardListApiKeys({ livemode: mode === "live" }),
  revoke: (id: string) => apiService.dashboardRevokeApiKey(id),
};
// 2. src/lib/dashboard/api.test.ts — its route case
{ name: "keys.revoke", call: () => api.keys.revoke(ID), method: "POST", path: `${P}/developer/api/v1/dashboard/api-keys/${ID}/revoke` },
// 3. src/lib/dashboard/hooks.ts — the hook the page uses
export const useApiKeys = (mode: Mode) => useQuery({ queryKey: ["keys", mode], queryFn: () => keys.list(mode) });
```

Mutations use `useAction(fn, { success, invalidate })` — it toasts and invalidates. Never call
`apiService` or an `api.ts` namespace directly from a component. Query keys always include the
mode (and the team id via the client), so switching never shows the other mode's data.

**Permissions** — add the permission to `src/lib/team-access.ts` and gate controls with
`const { can } = useCan(); can("keys.write")`.

**Server vs client components** — App Router. Anything using hooks, React Query or browser
APIs needs `"use client"`; keep that boundary as low in the tree as you can.

**Feedback** — Sonner toasts, `Skeleton` loading states, designed empty states that say how
to create the first item. Errors show the API's message, `code` and `request_id`.

**Formatting** — Prettier: `trailingComma: all`, print width 120. Run `yarn lint`.

---

## 6. Running (from step 11.1)

```bash
yarn dev      # http://localhost:3007 — runs generate-types first
yarn build
```

`yarn dev` regenerates the client from the **deployed dev API**. For a backend change that
isn't deployed yet: `cd ../backend-api && yarn swagger:dump`, then here
`yarn generate-types:local`. `yarn dev:offline` skips regeneration. Never start a dev server
blocking in the foreground. Point it only at the dev API unless the user says otherwise.

---

## 7. Definition of done

```bash
npx tsc --noEmit
yarn lint
yarn test
```

All three clean (Jest via `next/jest`, `src/**/*.test.ts(x)`), plus Playwright for the flows
named in the plan step. Review your own diff for what tooling can't catch: secret handling,
team scoping, test-vs-live mode, money conversions and unconfirmed destructive actions.

Branch off `dev`; PR into `dev`. Commit only when asked. Never commit `.next/`, `out/`,
`playwright-report/` or `tsconfig.tsbuildinfo`.

---

## 8. Branching and CI (automated)

**Promotion chain:** `feature → dev → main` (no staging: every branch and PR gets a Vercel
preview; `main` deploys production).

- **`release-pr.yml`** — when a PR merges into `dev` it opens or refreshes
  **`release: main ← dev`**, never a duplicate. Only merged PRs promote. Run it by hand from the
  Actions tab (`workflow_dispatch`) to refresh it.
- **`ci.yml`** (added with the scaffold in step 11.1) — `npx tsc --noEmit`, lint and
  `yarn test` on every push and every pull request, the same as pickrider-admin.

**`.github/scripts/release-notes.sh`** builds the release PR description from **squash-merged**
PRs (single-parent commits whose subject ends `(#123)`); merge commits and direct pushes are
counted and collapsed underneath. Preview it locally:

```bash
bash .github/scripts/release-notes.sh dev main https://github.com/Pickriders/developer-dashboard
```

1. A release PR opened with the default `GITHUB_TOKEN` does not trigger `pull_request` checks;
   `ci.yml` also runs on push, so the code is verified either way. Add a PAT as the
   `RELEASE_PR_TOKEN` secret to show checks on the release PR itself.
2. **Squash-merge feature PRs into `dev`** so each is itemised in the release notes.

---

## 9. Keeping this file current

When an engineer corrects your approach, or you find a convention that isn't written down,
update this file. The corrected approach becomes the standard. Project-local skills belong in
`.claude/skills/`; start by copying `sync-api-types`, `new-admin-page` (as `new-dashboard-page`)
and `ship-check` from pickrider-admin when the app is scaffolded.
