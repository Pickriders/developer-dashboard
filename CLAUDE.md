# developer-dashboard — Rules for Claude

The Pickriders **developer dashboard** — the console developers use alongside the public
Developer API. They sign up, verify their email and phone, create API keys, manage webhook
endpoints, read request logs, create and track orders, fund their wallet, manage their team,
and request live access. Served at `dashboard.pickriders.com`.

**Stack:** Next.js 14 (**App Router**), React 18, TypeScript, Tailwind CSS 3 and **our own
components in the Pickriders storefront's design** (**DESIGN.md**: tokens, Urbanist and Geist Mono,
light and dark; no shadcn/ui, no Radix), Lucide icons, TanStack React Query, Formik and Yup (forms),
`next-themes`, Sonner (toasts), Playwright (end-to-end). React
Table, Recharts, Formik/Yup and `@vis.gl/react-google-maps` join as pages need them. The same
framework as `pickrider-admin`, so patterns copy across; the look does not. Deployed on Vercel.

**Path alias:** `@/*` → `src/*`.

> Scaffolded in plan step 11.1 (`create-next-app@14.2.1`). In 11.2 the shadcn primitives were
> replaced by ports of `pickriders_storefront`'s components, at the product owner's request: the
> dashboard should look like the storefront dashboard. Folders marked _(later)_ in §3 arrive with
> the pages that need them.

---

## 1. Sibling repos — you are one of seven

This app is checked out alongside **separate git repositories**: `backend-api` (NestJS — the
only thing that talks to the database), `customer-app` and `rider-app` (Expo/React Native),
`pickrider-admin` (the internal staff console, Next.js 14), `web-app` (marketing site, Next 13
Pages Router + Sass) and `developer-docs` (the public API docs, Fumadocs). No monorepo, no
workspace linking — each has its own `node_modules` and its own remote.

**`pickrider-admin` is your near-twin.** Same framework, same three-layer data access. Copy its
patterns; don't copy its assumptions (§2) or its look (DESIGN.md).

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

## 3. Structure

```
src/
├── app/
│   ├── (dashboard)/      every signed-in page, in the shell: home (get-started checklist) and,
│   │                     as they land, keys, webhooks, orders, wallet, logs, team, settings,
│   │                     usage — each with `_components/`. Its layout wraps them in the workspace
│   ├── auth/             login, signup, verify (email then phone), forgot-password, invite
│   ├── api/backend/      the proxy to the API: session cookie → bearer token (lib/session/proxy.ts)
│   ├── api/session/      DELETE signs out (clears the cookie)
│   ├── design/           the design system, live: every token and component (DESIGN.md)
│   ├── layout.tsx        Urbanist + Geist Mono, <Providers>
│   └── globals.css       the design tokens (light and dark)
├── providers/            theme, React Query, toasts, tooltips
├── constant/             API_URL (NEXT_PUBLIC_API_URL)
├── services/apiService/  GENERATED swagger client + hand-written index.ts
├── lib/dashboard/
│   ├── api.ts            typed namespaces (auth, teams, account, … keys, webhooks, orders),
│   │                     every function delegating to a generated apiService method
│   ├── api.test.ts       route contract: verb + path + query + body per namespace function
│   ├── format.ts         money (kobo ↔ naira) and display helpers
│   ├── hooks.ts          (later) React Query hooks over api.ts (`useAction` = mutation + toast)
│   └── url-state.ts      (later) useTableState / useTabParam
├── components/kit/       PageHeader, Panel, StatCard, IdText, CopyButton, CodeBlock, SecretReveal,
│                         ConfirmDialog, EmptyState, TestModeBanner, Kbd, ThemeToggle
├── components/ui/        primitives ported from the storefront (Button, Input, Badge, Modal, …)
├── components/auth/      AuthShell (brand panel), Field, PasswordInput, CodeInput, alerts
├── lib/session/          cookie, proxy, guest/open paths, safeRedirect, crossSessionBoundary
├── components/brand/     the Logo
├── components/shell/     DashboardShell (sidebar, header, phone drawer), TeamSwitcher, AccountMenu,
│                         NAV (a page joins the sidebar in the step that builds it)
├── lib/workspace/        WorkspaceProvider / useWorkspace: the signed-in user, the selected team
│                         (sets X-Team-Id before any page fetches), can(permission), and the
│                         test/live `mode` (per team; live only once approved)
└── middleware.ts         the auth gate
```

**Auth is global, in `src/middleware.ts`.** Signed out, every page but the guest pages (login,
signup, forgot-password) and the open ones (`/auth/invite`, `/design`) redirects to
`/auth/login?redirect=<original path>`; signed in, the guest pages send you on. Do not
re-implement auth gating per page.

**The session token never reaches page code.** It lives in an **httpOnly**, `SameSite=Lax`
cookie. The browser calls our own `/api/backend/<path>`, which forwards to `API_URL/<path>` with
`Authorization: Bearer <cookie>` (`src/lib/session/proxy.ts`): dashboard routes only, writes only
from this origin, and sign-in / sign-up / password-reset responses have their `accessToken` moved
into the cookie and stripped from the body. A 401 clears the cookie.

**Crossing the session boundary is a full page load** (`crossSessionBoundary` in
`lib/session/navigate.ts`): signing in or out and joining a team. The client router caches pages it
fetched on the other side of the boundary (e.g. `/` redirecting to sign-in) and would replay them.
Pass a flash message to show a toast after the load. Never `router.refresh()` right after signing
in: it re-requests the guest page, whose redirect races your navigation.

---

## 4. Hard rules

1. **Never edit the generated API client, and never bypass it.**
   Everything in `src/services/apiService/` except `index.ts` comes from `yarn generate-types`.
   The dashboard routes are in the generated `Developer` class (`Developer.ts`); `Api.ts` holds
   the rest of the internal API and is unused here. Only `apiService/index.ts` is hand-written
   (the `/api/backend` base URL, `X-Team-Id`, 401 redirect, `signOut`). The dashboard calls the **dashboard routes**
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
6. **The design system, not ad-hoc styling.** Follow DESIGN.md. Colours come from the tokens
   (`bg-surface`, `text-fg-muted`, `border-line`, `text-success-fg`), never raw Tailwind
   palette classes (`bg-gray-100`, `text-red-600`) or hex. Reuse `src/components/kit/` (then
   `components/ui/`) before writing anything bespoke; a new shared pattern goes into the kit and
   onto `/design`. Teal is the only accent and never a fill. No Sass, no styled-components.
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
  list: (mode: Mode) => apiService.developerListApiKeys({ livemode: mode === "live" ? "true" : "false" }),
  revoke: (id: string) => apiService.developerRevokeApiKey(id),
};
// 2. src/lib/dashboard/api.test.ts — its route case
{ name: "keys.revoke", call: () => api.keys.revoke(ID), method: "POST", path: `${P}/developer/api/v1/dashboard/api-keys/${ID}/revoke` },
// 3. src/lib/dashboard/hooks.ts — the hook the page uses
export const useApiKeys = (mode: Mode) => useQuery({ queryKey: ["keys", mode], queryFn: () => keys.list(mode) });
```

Team data hooks take the team id and key their queries under `["team", teamId, …]` (`teamKeys`), so
switching team never shows the other team's data. Data that differs by mode (keys, webhooks, orders,
logs, wallet) also takes `mode` and puts it in the key, and sends it as `livemode`. Pages read the team, the user and permissions from
`useWorkspace()`, never from `useMe()` directly.

Mutations use `useAction(fn, { success, invalidate })` — it toasts and invalidates. Never call
`apiService` or an `api.ts` namespace directly from a component. Query keys always include the
mode (and the team id via the client), so switching never shows the other mode's data.

**Permissions** — the API sends each team's `permissions` for the signed-in user's role (`me`), so
there is no client-side matrix: gate controls with `const { can } = useWorkspace(); can("keys.write")`.

**Server vs client components** — App Router. Anything using hooks, React Query or browser
APIs needs `"use client"`; keep that boundary as low in the tree as you can.

**Feedback** — Sonner toasts, `Skeleton` loading states, designed empty states that say how
to create the first item. Errors show the API's message, `code` and `request_id`.

**Formatting** — Prettier: `trailingComma: all`, print width 120 (`yarn format`). CI runs
`prettier --check`. The pre-commit hook (husky + lint-staged) lints, formats and runs related tests.

---

## 6. Running

```bash
cp .env.example .env.local   # NEXT_PUBLIC_API_URL: the dev API
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
yarn typecheck
yarn lint
yarn test
yarn build
```

All four clean (Jest via `next/jest`, `src/**/*.test.ts(x)`), plus `yarn e2e` (Playwright, `e2e/`,
against `e2e/mock-api.mjs`; CI runs it on a production build) for the flows
named in the plan step. Review your own diff for what tooling can't catch: secret handling,
team scoping, test-vs-live mode, money conversions, unconfirmed destructive actions, and anything
off the design system (raw colours, a second accent, shadows on cards). Look at UI changes in
both themes.

Branch off `dev`; PR into `dev`. Commit only when asked. Never commit `.next/`, `out/`,
`playwright-report/`, `test-results/` or `tsconfig.tsbuildinfo`.

**Never add Claude, or any AI tool, as a commit author.** No `Co-Authored-By: Claude …` trailer and no "Generated with Claude Code" line, in commit messages or PR descriptions, even if your tooling suggests one. If you can't commit without it, don't commit: leave the commit to the user.

---

## 8. Branching and CI (automated)

**Promotion chain:** `feature → dev → main` (no staging: every branch and PR gets a Vercel
preview; `main` deploys production).

- **`release-pr.yml`** — when a PR merges into `dev` it opens or refreshes
  **`release: main ← dev`**, never a duplicate. Only merged PRs promote. Run it by hand from the
  Actions tab (`workflow_dispatch`) to refresh it.
- **`ci.yml`** — type-check, lint, `prettier --check`, `yarn test` and `yarn build` on every push
  and every pull request. The build uses the public dev `NEXT_PUBLIC_API_URL`; no secrets.
- **Vercel** builds a preview for every branch and PR and deploys `main` to production. The
  project needs `NEXT_PUBLIC_API_URL` per environment.

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
update this file (and DESIGN.md for anything visual). The corrected approach becomes the standard.
Project-local skills belong in `.claude/skills/`: `sync-api-types`, `new-dashboard-page` and
`ship-check`.
