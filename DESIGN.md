# Design system

The developer dashboard should feel like the best developer tools: calm, dense and exact. Someone
pastes ids into it, compares amounts, reads logs at 2 a.m. and trusts it with money. The look gets
out of the way of that.

See it live at **`/design`** (every token and component, in the current theme). Tokens live in
`src/app/globals.css`, their Tailwind names in `tailwind.config.ts`, components in
`src/components/ui` (shadcn primitives, restyled) and `src/components/kit` (our patterns).

## Principles

1. **Neutral first, one accent.** Every surface is grey. Pickriders teal (`brand`) is the only
   accent: focus rings, the selected nav item, switches, links, charts. Never a page or card fill.
2. **Colour means something.** Green, amber, red and blue are for status, in small doses: a dot, a
   tinted badge, a slim banner. A colour always comes with a word ("Failed", not just red).
3. **Amber means test mode.** Test data is never mistaken for live: a persistent amber banner and
   amber "Test" badges. Nothing else uses amber as a background.
4. **Hairlines, not shadows.** Cards and tables are flat, with a 1px `line`. Only what floats
   (menus, popovers, dialogs, toasts) has a shadow.
5. **Dense, not cramped.** 13px controls and table text, 32px controls, 40px rows, on a 4px grid.
   Developers read dense tables well; don't pad them into "clean" emptiness.
6. **Mono for what you copy.** Ids (`ord_…`), keys, request ids, event types, status codes and
   code: Geist Mono, with a copy button where it helps. Numbers use tabular figures.
7. **Ink is the primary action.** One ink button per view (near-black, near-white in dark).
   Everything else is secondary, ghost or a link.
8. **Light and dark are equals.** Every token has both values; the theme follows the system by
   default. Text meets WCAG AA (4.5:1) on every surface it sits on, in both themes.

## Colour tokens

Written as RGB channels, so opacity modifiers work: `bg-brand/10`.

| Token            | Light   | Dark    | Use                                   |
| ---------------- | ------- | ------- | ------------------------------------- |
| `canvas`         | #fafafa | #0a0a0a | The page behind everything            |
| `surface`        | #ffffff | #111111 | Cards, tables, inputs, sidebar        |
| `surface-raised` | #ffffff | #171717 | Menus, popovers, dialogs              |
| `surface-subtle` | #f5f5f5 | #1a1a1a | Hover, table header, recessed areas   |
| `surface-muted`  | #ededed | #232323 | Selected, pressed, skeletons          |
| `line`           | #ebebeb | #242424 | Hairlines: card edges, dividers, rows |
| `line-strong`    | #d6d6d6 | #363636 | Input borders, emphasised edges       |
| `fg`             | #171717 | #ededed | Primary text, ink buttons             |
| `fg-muted`       | #5c5c5c | #a1a1a1 | Secondary text, labels                |
| `fg-subtle`      | #6b6b6b | #878787 | Meta, timestamps, placeholders        |
| `brand`          | #3fa49f | #45b3ad | The accent (see principle 1)          |
| `brand-fg`       | #1f6f6b | #6fd2cb | Links and brand text                  |

Status tones (`success`, `warning`, `danger`, `info`) each have four tokens: the solid (dots,
fills), `-fg` (text), `-subtle` (tinted background) and `-line` (its border). Use them together:
`border-success-line bg-success-subtle text-success-fg`, which is what `<Badge variant="success">`
does.

shadcn's own names (`background`, `primary`, `muted`, `accent`, `destructive`, `border`,
`input`, `ring`, `card`, `popover`) are mapped onto these, so primitives from the CLI follow the
system. Note that shadcn's `accent` is a hover fill, not our brand accent.

## Type

Geist Sans for the interface, Geist Mono for code and ids (`geist` package). Weights 400, 500 and
600 only. Headings tighten as they grow.

| Class       | Size / line       | Use                                   |
| ----------- | ----------------- | ------------------------------------- |
| `text-4xl`  | 36 / 40, −0.025em | Rare: empty-page hero                 |
| `text-3xl`  | 28 / 36, −0.02em  | Headline numbers (StatCard)           |
| `text-2xl`  | 22 / 30, −0.015em | Page titles (PageHeader)              |
| `text-lg`   | 16 / 24           | Section and dialog titles             |
| `text-base` | 14 / 22           | Reading text: descriptions, help      |
| `text-sm`   | 13 / 20           | The default: controls, tables, labels |
| `text-xs`   | 12 / 16           | Meta, badges, table headers, mono ids |
| `text-2xs`  | 11 / 16           | Kbd, dense annotations                |

## Shape, space and depth

- **Radius:** 8px cards and dialogs (`rounded-lg`), 6px buttons and inputs (`rounded-md`), 4px
  badges (`rounded-sm`). Nothing rounder on functional UI; pills only for avatars and dots.
- **Spacing:** multiples of 4px. Panels pad 20px; page sections are 40px apart.
- **Heights:** controls 32px (`h-8`), small 28px, large 40px; table rows 40px; header 56px;
  sidebar 240px.
- **Shadows:** `shadow-xs` (buttons, inputs), `shadow-popover` (menus, toasts, tooltips),
  `shadow-dialog` (dialogs, sheets). Dark mode swaps the drop shadow for a faint white ring.
- **Focus:** a 2px brand ring with a 2px gap (`focus-ring`); inputs get a brand border and a
  soft 3px glow. Every interactive element shows focus.
- **Motion:** 120ms for hover and colour, 200ms for overlays, `ease-out` (`cubic-bezier(0.16, 1,
0.3, 1)`). No bounce, no motion that delays the next action.

## Components

**Primitives** (`components/ui`, from `npx shadcn@2.3.0 add …`, then restyled): Button (ink,
secondary, outline, ghost, destructive, link; xs/sm/default/lg/icon; `loading`), Badge (tones,
`dot`), Input, Textarea, Select, Checkbox, Switch, Label, Tabs (underlined), Table, Dialog,
AlertDialog, Sheet, DropdownMenu, Popover, Tooltip (ink), Skeleton (shimmer), Toaster.

**Kit** (`components/kit`): PageHeader, Panel, StatCard, IdText, CopyButton, CodeBlock,
SecretReveal, ConfirmDialog, EmptyState, TestModeBanner, Kbd, ThemeToggle. Build pages from these
first; add to the kit when a pattern repeats.

Adding a primitive: `npx shadcn@2.3.0 add <name>`, then bring it onto the tokens (surfaces,
`line`, `focus-ring`, `shadow-popover` for floating things) and show it on `/design`.

## Writing

Name things by what they do ("Revoke key", not "Confirm"). Say what happens ("Apps using this
key stop working immediately"). Show the API's error `code` and `request_id` so developers can
search the docs and the request log. Sentence case everywhere.

## Where this comes from

Researched against the consoles developers already trust, keeping what they share and leaving
their brands behind:

- **Vercel (Geist):** a near-monochrome scale, one interactive accent, Geist and Geist Mono,
  shadow-as-border hairlines, 6px controls, weights 400–600, status as small dots
  ([Geist on shadcn](https://www.shadcn.io/design/vercel),
  [extracted tokens](https://github.com/educlopez/design-bites/blob/main/design-mds/vercel.com/DESIGN.md)).
- **Linear:** achromatic surfaces in an elevation ladder, a single accent never used as a fill,
  tight negative tracking on headings, 8px buttons
  ([how Linear redesigned its UI](https://linear.app/now/how-we-redesigned-the-linear-ui),
  [tokens](https://github.com/voltagent/awesome-design-md/blob/main/design-md/linear.app/DESIGN.md)).
- **Stripe:** neutral surfaces, one primary accent and semantic colour only for status; test
  mode signalled so nobody charges a real card
  ([dashboard breakdown](https://www.925studios.co/blog/stripe-dashboard-design-breakdown)).
- **Radix Colors:** a scale where each step has a job (app backgrounds, component backgrounds,
  borders, solids, text), which is how the surface and line tokens are assigned
  ([understanding the scale](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale)).
- **Resend, Supabase, Raycast:** one headline number then a log-style table; three or four stat
  cards at most; dark mode as a first-class theme
  ([SaaS dashboard examples](https://www.925studios.co/blog/saas-dashboard-design-examples-2026)).
- **Data tables for developers:** dense rows, horizontal rules only, sticky headers, a quiet
  hover ([LogRocket](https://blog.logrocket.com/ux-design/data-table-design-best-practices/)).
