# developer-dashboard

The console for developers using the **Pickriders Developer API**, served at
[dashboard.pickriders.com](https://dashboard.pickriders.com).

Developers sign up here, verify their email and phone, create test and live API keys, manage
webhook endpoints and see every delivery attempt, read their API request logs, create and track
orders, fund their wallet, invite teammates with roles, and request live access (approved by a
Pickriders admin).

The API lives in [`backend-api`](https://github.com/Pickriders/backend-api); public API docs are
in [`developer-docs`](https://github.com/Pickriders/developer-docs).

## Stack

Next.js 14 (App Router), TypeScript, Tailwind CSS and shadcn/ui, TanStack Query, with an API
client generated from backend-api's Swagger document. Hosted on Vercel. The same stack as
`pickrider-admin`; see [CLAUDE.md](./CLAUDE.md) for the conventions.

The app is scaffolded in plan step 11.1; until then this repo holds the docs and the release
workflow.

## Branches and releases

`feature → dev → main`. Branch off `dev`, open PRs into `dev` and squash-merge them. Each merge
opens or refreshes the **`release: main ← dev`** PR; merging that deploys production. `main`
accepts changes only through a reviewed pull request.
