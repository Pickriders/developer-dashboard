/**
 * The changelog (step 12.8), newest first. Every change to the public API or the docs that a
 * developer would notice gets an entry dated the day it reaches production: what changed and what to do, if anything.
 * `id` is its anchor, so an entry can be linked to.
 */
export type ChangelogEntry = {
  id: string;
  /** YYYY-MM-DD, the day it shipped. */
  date: string;
  kind: "Added" | "Changed" | "Fixed";
  title: string;
  body: string;
};

const ENTRIES: ChangelogEntry[] = [
  {
    id: "docs-reference",
    date: "2026-11-16",
    kind: "Added",
    title: "A generated API reference, the OpenAPI file and a Postman collection",
    body: "Every endpoint, field and example in the API reference now comes straight from the API itself, so the two can't drift apart. Download the whole API as an OpenAPI 3 file or a ready-to-send Postman collection from the API reference.",
  },
  {
    id: "docs-try-it",
    date: "2026-11-16",
    kind: "Added",
    title: "Try it, and a walkthrough for your first delivery",
    body: "Send any request from the docs with your test key and see the live answer. The first-delivery tutorial is now a step-by-step walkthrough that checks each step and can run every request for you.",
  },
  {
    id: "unique-webhook-urls",
    date: "2026-11-16",
    kind: "Changed",
    title: "One webhook endpoint per URL in each mode",
    body: "Adding a second endpoint for a URL you already have in the same mode is now refused with webhook_endpoint_exists, naming the endpoint to edit instead. A duplicate would have received every event twice. Endpoints you already have are unchanged.",
  },
  {
    id: "errand-pickups",
    date: "2026-11-15",
    kind: "Changed",
    title: "Errand pickups don't need a contact",
    body: "The pickup of a single delivery and the pickups of a bulk delivery may leave out contact: an errand, where the rider buys or collects from a shop with no one to call. Every drop-off still needs a contact, and so does a batch pickup; a missing one is parameter_missing on stops.N.contact. An errand stop shows contact as name and phone null.",
  },
  {
    id: "docs-launch",
    date: "2026-11-16",
    kind: "Added",
    title: "New docs",
    body: "The Pickriders API docs moved into the developer dashboard at /docs, with search, examples in curl, Node.js, Python and PHP, and every error code explained.",
  },
];

/** Newest first, whatever order they were written in. */
export const CHANGELOG = [...ENTRIES].sort((a, b) => b.date.localeCompare(a.date));
