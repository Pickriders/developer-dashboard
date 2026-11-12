# Design system

The developer dashboard looks and feels like the **Pickriders storefront dashboard**
(`pickriders_storefront`): Pickriders teal and plum, Urbanist, roomy 44px controls, rounded-xl
cards with a soft shadow, heavy headings, and the plum-to-teal brand panel on the auth pages. It
adds what a developer console needs on top: Geist Mono for ids and code, dark mode, test-mode
amber, and contrast checked against WCAG AA.

See it live at **`/design`** (every token and component, in the current theme). Tokens live in
`src/app/globals.css`, their Tailwind names in `tailwind.config.ts`, components in
`src/components/ui` (primitives, ported from the storefront) and `src/components/kit` (our
patterns). There is no shadcn/ui and no Radix: the components are our own, like the storefront's.

## Principles

1. **One family with the storefront.** A vendor who also integrates by API should feel at home:
   same palette, type, shapes and motion. When in doubt, look at how the storefront does it.
2. **Teal acts, plum speaks.** Primary actions are teal (`brand-solid`); headings are plum
   (`fg-heading`). The plum-to-teal gradient is for the auth brand panel only.
3. **Colour means something.** Green, amber, red and blue are for status, as soft pills and slim
   banners, always with a word ("Failed", not just red).
4. **Amber means test mode.** Test data is never mistaken for live: a persistent amber banner and
   amber "Test" pills.
5. **Roomy controls, calm surfaces.** 44px buttons and inputs (`min-h-11`), 16px text in inputs on
   phones (no iOS zoom), cards with a hairline and `shadow-card` on the `canvas` page colour.
6. **Mono for what you copy.** Ids (`ord_…`), keys, request ids, event types and code use Geist
   Mono, with a copy button where it helps.
7. **Light and dark are equals.** Every token has both values (dark from the storefront admin's
   dark theme); the theme follows the system by default. Text meets WCAG AA (4.5:1).

## Colour tokens

Written as RGB channels, so opacity modifiers work: `bg-brand/10`. Values from the storefront's
`.admin-root` tokens, adjusted where a text colour fell short of AA.

| Token              | Light            | Dark    | Use                                                       |
| ------------------ | ---------------- | ------- | --------------------------------------------------------- |
| `canvas`           | #f4f7f7          | #0d1211 | The page behind everything                                |
| `surface`          | #ffffff          | #141b1a | Cards, inputs, the auth form column                       |
| `surface-raised`   | #ffffff          | #1a2322 | Modals, toasts                                            |
| `surface-subtle`   | #f1f5f4          | #172120 | Hover, table header, read-only inputs                     |
| `surface-muted`    | #e9efee          | #212c2b | Selected, skeletons, empty meter bars                     |
| `line`             | #e3e9e8          | #212c2b | Card edges, dividers                                      |
| `line-strong`      | #cbd5d3          | #2f3d3b | Input borders                                             |
| `fg-heading`       | #1a1230          | #e9efee | Headings: Pickriders plum                                 |
| `fg`               | #111716          | #e9efee | Body text                                                 |
| `fg-muted`         | #5f6d6b          | #96a5a2 | Secondary text                                            |
| `fg-subtle`        | #66736f          | #808f8c | Meta, placeholders                                        |
| `brand`            | #3fa49f          | #55b9b3 | Accents: focus ring, icons, selected nav, charts          |
| `brand-solid`      | #2a817c          | #55b9b3 | Primary button fill (white text light, ink dark)          |
| `brand-fg`         | #286f6b          | #6fd2cb | Links and brand text                                      |
| `brand-subtle`     | #e6f4f3          | #143331 | The storefront's brand-soft: icon tiles, tints            |
| `plum`, `plum-mid` | #1a1230, #2e1030 | same    | The auth gradient (`from-plum via-plum-mid to-[#3fa49f]`) |

The storefront fills buttons with `#3fa49f`, which carries white text at only 3:1, so primary
buttons here use the deeper `brand-solid` (4.6:1) and keep `#3fa49f` for accents.

Status tones (`success`, `warning`, `danger`, `info`) each have the solid, `-fg` (text),
`-subtle` (tint) and `-line` (border). A pill is `bg-success-subtle text-success-fg`, which is
what `<Badge tone="success">` does.

## Type

Urbanist (the storefront's face) for the interface, Geist Mono for code and ids. Tailwind's default
scale, with weight doing the work:

| Use                        | Classes                                                    |
| -------------------------- | ---------------------------------------------------------- |
| Brand panel headline       | `text-[2.5rem] font-black tracking-tight`                  |
| Auth and empty-state title | `text-[1.75rem] font-black tracking-tight text-fg-heading` |
| Page title (PageHeader)    | `text-2xl font-extrabold tracking-tight text-fg-heading`   |
| Section and dialog title   | `text-lg font-bold text-fg-heading`                        |
| Reading text               | `text-[15px] leading-6 text-fg-muted`                      |
| Controls, labels, tables   | `text-sm` (labels `font-semibold`)                         |
| Meta                       | `text-xs text-fg-subtle`                                   |

## Shape, space and motion

- **Radius:** buttons `rounded-xl` (12px), inputs `rounded-lg`, cards and panels `rounded-xl`,
  modals `rounded-2xl` (a bottom sheet with `rounded-t-2xl` on phones), pills `rounded-full`.
- **Heights:** buttons and inputs 44px (`min-h-11`), small buttons 36px, code boxes 64px.
- **Shadows:** `shadow-card` (cards, panels), `shadow-button` (buttons, inputs), `shadow-pop`
  (modals, toasts).
- **Focus:** inputs get a brand border and a 4px `brand/15` glow; everything else the
  `focus-ring` (2px brand ring with a gap).
- **Motion:** buttons press to 97% on tap and show a spinner over the label while loading (the
  button never changes size); content slides up 6px on arrival; a wrong code shakes. Everything
  decorative respects `prefers-reduced-motion`.

## Logo and app icon

- **Logo** (`components/brand/logo.tsx`): the Pickriders wordmark (from pickrider-admin), a
  hairline, then `developers_` in Geist Mono with a teal cursor. The cursor is what marks the
  developer console apart from the storefront and the apps. `inverted` for the brand gradient.
- **App icon:** the helmet "C" from the wordmark followed by the same teal cursor (`C_`, a
  prompt), white on the plum-to-teal gradient, with a faint inner ring so it holds on dark browser
  tabs. `src/app/icon.svg` (modern browsers), `src/app/favicon.ico` (16, 32 and 48px) and
  `src/app/apple-icon.png` (180px, full-bleed: iOS rounds the corners). Next.js links all three.
  Change the SVG first, then regenerate the PNG and ICO from it.

## Components

**Primitives** (`components/ui`, ported from the storefront): `Button` and `LinkButton` (primary,
secondary, ghost, danger, link; sm, md, lg, icon; `loading`, `fullWidth`), `Input` and
`Textarea`, `Badge` (tones, `dot`), `Card`, `Skeleton`, `ToggleSwitch`, `Modal` (native
`<dialog>`: focus trap and Escape for free), `Toaster` (Sonner, restyled).

**Also in `components/ui`:** `Menu` / `MenuItem` / `MenuLabel` / `MenuSeparator` (a dropdown: arrow
keys, Escape, focus back to the trigger), `Avatar` (people: round, two initials; teams: square, one),
`Segmented` (two to four exclusive choices, arrow keys move), `Popover` (a short explanation under its
trigger).

**Shell** (`components/shell`): the storefront dashboard's frame. A white sidebar from `lg` (logo,
team switcher, pages, the account menu at the foot), a slim sticky header (page actions, Docs), and
the same sidebar as a drawer below `lg`. The selected page is a `brand-subtle` pill with `brand-fg`
text. Pages sit in a 72rem column and slide up 6px on arrival.

**Test and live:** a Test | Live switch on the header's right, on every page. Test mode puts the amber
banner (a `TEST MODE` pill and one line) above everything. Live stays locked, with a lock icon, until
the team is approved; pressing it opens a panel with the three steps to live and the one action that
fits (verify, request, wait, or fix what the review asked). Switching to live says so in a toast:
real money and real riders from here on.

**Secrets** appear once, in the dialog that made them, through the kit's `NewSecret`: a success tile,
where to put it, the secret with a copy button, Done. Closing the dialog forgets it (mutations use
`gcTime: 0` and `reset()`).

**API keys** (`/keys`): one table per mode (name and who made it, the prefix in mono, access in words,
last used), a row menu (Roll, Revoke), and a footer that says only a hash is kept. Rolling asks how long
the old key keeps working (Stop now is red: for a leaked key). Revoking a live key asks for its name.
On phones each row stacks into a small card.

**Home** is a setup guide, not a dashboard of widgets: one card, the current step open with its one
action, the others folded to a line, finished steps ticked with what was done (the address, the date).
A refused or suspended live request opens first. Copy for every step lives in one place
(`(dashboard)/_components/home/steps.tsx`).

**Auth** (`components/auth`): `AuthShell` (brand panel + form column), `AuthHeading`, `Field`
(label, control, error or hint, wired for screen readers), `PasswordInput` (show/hide, Caps Lock),
`PasswordMeter`, `CodeInput` (one real input drawn as boxes: paste, SMS autofill, shake),
`ResendButton`, `FormAlert` / `ApiErrorAlert`, `SignOutButton`.

**Kit** (`components/kit`): PageHeader, Panel, StatCard, ProgressRing, IdText, CopyButton, CodeBlock,
SecretReveal, ConfirmDialog (the storefront's, with `typeToConfirm`), EmptyState, TestModeBanner,
Kbd, ThemeToggle. Build pages from these first; add to the kit when a pattern repeats, and show it
on `/design`.

## Forms

Errors show under their field, after a submit attempt or once the person has typed and moved on;
never for a field they only passed through. The first invalid field takes focus on submit. API
errors with a `param` go under that field; the rest go in an alert above the form, with the code
and request id for server faults.

## Writing

Name things by what they do ("Revoke key", not "Confirm"). Say what happens ("Apps using this key
stop working immediately"). Sentence case everywhere.
