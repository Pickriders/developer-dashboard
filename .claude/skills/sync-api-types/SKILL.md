---
name: sync-api-types
description: Regenerate this app's Swagger-derived API client after a backend contract change, then fix the resulting type errors and route-contract tests. Use when the backend API changed, when generated types look stale, or when the user says "sync types" or "regenerate types".
---

# Regenerating the API client

`src/services/apiService/` is generated from backend-api's internal Swagger document by
`swagger-typescript-api@13.0.23` (same version and flags as pickrider-admin and the apps). With
`--modular` it splits by the first path segment: **the dashboard routes
(`/developer/api/v1/dashboard/*`) are in `Developer.ts`**; `Api.ts` holds the rest of the
internal API and is unused here. Every file except **`index.ts`** (hand-written: team header, 401
redirect, session) is generated and must never be hand-edited.

Pages reach the client only through `src/lib/dashboard/api.ts`, and every function there has a
route case in `src/lib/dashboard/api.test.ts`. Drift therefore surfaces in `tsc` (a method
vanished or changed shape) and `yarn test` (a method now hits a different route or drops a query
or body).

## 1. Decide which document to generate from

- **Deployed dev API** (the default, what `yarn dev` does): `yarn generate-types` reads
  `https://pickriders-api-dev.onrender.com/docs/api-json`. Only right once the backend change is
  deployed there. Check: `curl -s https://pickriders-api-dev.onrender.com/docs/api-json | grep -o '<operationId>'`
- **Local backend branch** (not deployed yet): `cd ../backend-api && yarn swagger:dump`, then
  `yarn generate-types:local` here. The local document must be a superset of the deployed one,
  or you are regressing the client.

## 2. Regenerate, then review the diff

```bash
git diff --stat src/services/apiService
```

- If `index.ts` appears, restore it: `git checkout -- src/services/apiService/index.ts`.
- Hundreds of removed routes means a stale or wrong document: revert and go back to step 1.
- A method with a numeric suffix (`developerGetAccount2`) means two backend handlers share a
  name. Fix the backend (`src/swagger.operation-ids.spec.ts` there enforces uniqueness); never
  adopt the suffixed name.

## 3. Fix the fallout

```bash
yarn typecheck && yarn lint && yarn test
```

- `tsc` errors in `api.ts`: point the function at the renamed method or the new parameters.
- `api.test.ts` failures: decide whether the backend contract or the dashboard call is wrong. A
  body or query the generated method no longer accepts is being **silently dropped**: fix the
  backend's DTO / `@ApiQuery`, don't cast around it.
- A new endpoint: the `api.ts` function, its route case, then the hook.

**Never patch a generated file** to silence an error.

## 4. Sibling repos

`pickrider-admin`, `customer-app` and `rider-app` generate from the same document and are
separate repositories with their own regeneration and commits. Mention any affected; don't reach
into them unless asked.

## Report

Which document you generated from, what the diff touched, the type-check and test results, and
which sibling repos still need syncing.
