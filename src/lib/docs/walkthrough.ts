import { ERROR_CODES } from "./errors";

/**
 * The quickstart walkthrough's checks (12.1). The reader pastes what the API answered; we read it
 * here, in the browser, and say whether the step worked, or what the error means and what to do.
 * Nothing pasted is sent anywhere or stored, except the ids we carry into the next step.
 */
/** The ids in the examples that the reader's own replace as they go. */
export const SAMPLE_QUOTE = "quo_6560f0c2a1b2c3d4e5f60718";
export const SAMPLE_ORDER = "ord_6560f0c2a1b2c3d4e5f60718";

export type CheckKind = "ping" | "quote" | "order" | "delivered";
export type Carried = { quoteId?: string; orderId?: string };
export type CheckResult =
  | { state: "ok"; title: string; detail: string; carry?: Carried }
  | { state: "problem"; title: string; detail: string; code?: string }
  | { state: "empty" };

/** The first JSON object in the text: curl -i prints headers before it, and people copy extra lines. */
export function readJson(text: string): Record<string, unknown> | null {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end <= start) return null;
  try {
    const value = JSON.parse(text.slice(start, end + 1));
    return value && typeof value === "object" && !Array.isArray(value) ? value : null;
  } catch {
    return null;
  }
}

const naira = (kobo: number) =>
  `₦${(kobo / 100).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** An API error, explained from the docs' list of codes. */
function explainError(body: Record<string, unknown>): CheckResult | null {
  const error = body.error as { code?: string; message?: string } | undefined;
  if (!error || typeof error !== "object") return null;
  const known = ERROR_CODES.find((e) => e.code === error.code);
  return {
    state: "problem",
    code: error.code,
    title: known ? `The API said no: ${known.meaning}` : "The API answered with an error.",
    detail: known ? known.fix : (error.message ?? "Read the message in what you pasted."),
  };
}

const notIt = (expected: string): CheckResult => ({
  state: "problem",
  title: "That doesn't look like the answer to this step.",
  detail: `Run the example above, then paste everything it prints. We're looking for ${expected}.`,
});

const live = (body: Record<string, unknown>): CheckResult | null =>
  body.livemode === true
    ? {
        state: "problem",
        title: "That came from a live key.",
        detail: "Use your sk_test_ key for this tutorial: live orders send real riders and cost real money.",
      }
    : null;

export function check(kind: CheckKind, pasted: string): CheckResult {
  if (!pasted.trim()) return { state: "empty" };
  const body = readJson(pasted);
  if (!body) {
    return /<html|<!doctype/i.test(pasted)
      ? {
          state: "problem",
          title: "That's a web page, not the API.",
          detail: "Check the URL in your request: it should start with https://api.pickriders.com/developer/api/v1.",
        }
      : {
          state: "problem",
          title: "We can't read that.",
          detail: "Paste the whole answer, from the first { to the last }.",
        };
  }
  const error = explainError(body);
  if (error) return error;

  switch (kind) {
    case "ping":
      return body.object === "ping" && body.ok === true
        ? { state: "ok", title: "Your key works.", detail: "The API knows who you are. On to the fun part." }
        : notIt('{ "object": "ping", "ok": true }');

    case "quote": {
      if (body.object !== "quote" || typeof body.id !== "string" || !body.id.startsWith("quo_")) {
        return notIt("a quote, with an id starting quo_");
      }
      const wrongMode = live(body);
      if (wrongMode) return wrongMode;
      const price = typeof body.recommended_price === "number" ? naira(body.recommended_price) : "the price";
      const until =
        typeof body.expires_at === "string"
          ? new Date(body.expires_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
          : null;
      return {
        state: "ok",
        title: `You have a price: ${price}.`,
        detail: `It's held${until ? ` until ${until}` : " for 15 minutes"}. We've put your quote id into the next step.`,
        carry: { quoteId: body.id },
      };
    }

    case "order":
    case "delivered": {
      if (body.object !== "order" || typeof body.id !== "string" || !body.id.startsWith("ord_")) {
        return notIt("an order, with an id starting ord_");
      }
      const wrongMode = live(body);
      if (wrongMode) return wrongMode;
      if (kind === "delivered") {
        return body.status === "delivered"
          ? { state: "ok", title: "Delivered!", detail: "That's a whole delivery, from price to doorstep." }
          : {
              state: "problem",
              title: `It's ${String(body.status ?? "on its way").replace(/_/g, " ")}, not delivered yet.`,
              detail: 'Send the request again with "to": "delivered", or keep advancing it one step at a time.',
            };
      }
      return {
        state: "ok",
        title: "Your order is booked.",
        detail: "We're finding it a rider. We've put your order id into the next step.",
        carry: { orderId: body.id },
      };
    }
  }
}
