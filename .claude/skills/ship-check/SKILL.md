---
name: ship-check
description: Run this app's gate (type-check, lint, format, tests, build) plus the secret, team-scoping, mode, design-system and generated-file sweeps before committing or opening a PR. Use when finishing a task or when the user says "ready to commit" or "check this".
---

# Pre-commit check — developer-dashboard

## 1. The gate

```bash
yarn typecheck
yarn lint
npx prettier --check .
yarn test
yarn build
```

All clean. `yarn test` runs jest (`src/**/*.test.ts(x)`); `src/lib/dashboard/api.test.ts` fails
when an `api.ts` function has no route case or its generated method drifted. CI runs the same
five; run them yourself before saying the work is done.

## 2. Customer-safety review (outside developers use this app)

Read your own diff for what the compiler can't catch:

- **Secrets:** a new key (`sk_…`) or webhook secret (`whsec_…`) lives only in the dialog that
  received it: not in React Query keys, state that outlives the dialog, `localStorage`, URLs,
  analytics or logs (CLAUDE.md §2).
- **Team scoping:** every request goes through `apiService`, which sends `X-Team-Id`; no team id
  from a URL or user input.
- **Mode:** query keys include the mode; live-only actions explain the lock instead of hiding.
- **Destructive actions** (revoke, roll, delete, remove, cancel) go through `ConfirmDialog`,
  saying what happens.
- **Money:** API amounts are kobo; display through `formatMoney` / `subUnitToBaseUnit`.

## 3. Design-system review

- Colours only from tokens (`bg-surface`, `text-fg-muted`, `border-line`, `text-danger-fg`); no
  raw palette classes (`bg-gray-100`, `text-red-600`) or hex in components.
- Teal (`brand`) never as a fill; status colour only as dots, badges and banners, with words.
- Flat cards with a hairline; shadows only on what floats.
- Ids, keys and codes in mono; numbers `tabular-nums`.
- Looked at in **both themes**; new shared patterns added to the kit and to `/design`.

## 4. Generated files sweep

```bash
git status --porcelain src/services/apiService
```

`yarn dev` regenerates the client on every start, so churn here is often accidental. Unless you
meant to regenerate for a contract change (`sync-api-types`), revert it:
`git checkout -- src/services/apiService`. `apiService/index.ts` is hand-written; confirm its
changes were intended.

## 5. Secret sweep

```bash
git diff --cached --name-only | grep -E '\.env|\.pem$|\.key$' && echo "!! credentials staged"
git diff --cached | grep -E 'sk_(live|test)_[A-Za-z0-9]{16,}|whsec_[A-Za-z0-9]{16,}' && echo "!! secret in diff"
```

`NEXT_PUBLIC_*` values ship to the browser and are not secret; nothing else belongs client-side.
Never commit `.next/`, `out/`, `playwright-report/` or `tsconfig.tsbuildinfo`.

## 6. Committing

Only when the user asks. Branch off `dev`, PR into `dev`. A paired `backend-api` change is a
**separate repo**: separate commit and PR; mention the sibling in the description.

## Report

Commands run and their actual results (including the test count), and anything from the
reviews in §2 and §3.
