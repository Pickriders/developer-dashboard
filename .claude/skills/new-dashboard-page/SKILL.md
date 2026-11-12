---
name: new-dashboard-page
description: Add a page to the developer dashboard with the right App Router placement, the three-layer data access (api.ts, its route test, a hook), the kit components and the design system. Use when adding a new section or screen to the dashboard.
---

# New dashboard page

## 1. Route placement

Signed-in pages live under `src/app/(dashboard)/<area>/`, with page-only components in
`_components/`:

```
src/app/(dashboard)/webhooks/
├── page.tsx
├── [id]/page.tsx        ← detail, if it needs its own URL
└── _components/
```

`src/middleware.ts` gates everything outside `/auth`: **don't add auth checks to pages**. Put
`"use client"` as low in the tree as it can go.

## 2. Data — three layers, always

Never call `apiService` from a component.

1. A function in `src/lib/dashboard/api.ts` on the generated client (method names are in
   `src/services/apiService/Developer.ts`; missing means the backend change isn't in the client
   yet, see `sync-api-types`). Types from `data-contracts.ts`.
2. Its route case in `src/lib/dashboard/api.test.ts` (verb, path, query, body). The suite fails
   until it exists.
3. A hook in `src/lib/dashboard/hooks.ts`: `useQuery` with the **mode in the query key** for
   reads, `useAction` (toast + invalidate) for writes.

## 3. Layout and components

Start from the kit (`src/components/kit/`), then the primitives (`components/ui/`):

- `PageHeader` (title, one sentence, the page's actions: one ink button at most).
- `Panel` for each section; `flush` for a table inside it.
- `Table` rows 40px, ids through `IdText`, statuses as `Badge` with `dot`, numbers
  `tabular-nums`, timestamps `text-fg-subtle`.
- `EmptyState` saying what goes here, with the action that creates the first one.
- `Skeleton` while loading; errors show the API's message, `code` and `request_id`.
- `ConfirmDialog` for anything destructive; `SecretReveal` inside the dialog for one-time secrets.
- `StatCard` for headline numbers, three or four at most, from a backend summary endpoint.

Follow DESIGN.md: tokens only (no raw palette classes or hex), teal never a fill, hairlines not
shadows, sentence-case copy that says what happens. Gate controls with `useCan()`.

A new shared pattern goes into the kit and onto `/design`.

## 4. Tables

URL-driven: `useTableState` / `useTabParam` from `src/lib/dashboard/url-state.ts`, so filters,
pagination and the open drawer (`?id=`) survive a refresh and can be shared.

## 5. Navigation

Add the page to the sidebar so it's reachable.

## 6. Finish

Run `ship-check`. Look at the page in light and dark, and at 375px wide. Report the route and any
data the API doesn't give yet (a backend endpoint beats deriving it in the client).
