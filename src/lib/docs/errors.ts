/**
 * Every error code the Developer API answers with, as backend-api sends them (lower case). Each API
 * error links here by code (`doc_url`: /docs/errors#<code>), so a code is never removed from this
 * list, only added. Keep `meaning` and `fix` to a sentence each, in plain words.
 */
export type ErrorEntry = { code: string; status: number; meaning: string; fix: string };
export type ErrorGroup = { type: string; title: string; summary: string; codes: ErrorEntry[] };

export const ERROR_GROUPS: ErrorGroup[] = [
  {
    type: "invalid_request_error",
    title: "Something in the request is wrong",
    summary: "Status 400 or 409. Fix the request and send it again. `param` names the field.",
    codes: [
      {
        code: "parameter_invalid",
        status: 400,
        meaning: "A field has a value we can't use.",
        fix: "Read the message and fix the field `param` names.",
      },
      {
        code: "parameter_missing",
        status: 400,
        meaning: "A field we need is missing.",
        fix: "Add the field `param` names. A stop's contact, for example, is needed at every drop-off.",
      },
      {
        code: "invalid_id",
        status: 400,
        meaning: "An id isn't one of ours, or has the wrong prefix.",
        fix: "Check you sent the whole id, like ord_6560f0c2a1b2c3d4e5f60718.",
      },
      {
        code: "service_area_invalid",
        status: 400,
        meaning: "We don't deliver in that area yet.",
        fix: "Use an id from GET /service-areas, like NG-LA.",
      },
      {
        code: "invalid_phone",
        status: 400,
        meaning: "A phone number isn't valid in that country.",
        fix: "Send it with the country code, like +2348031234567.",
      },
      {
        code: "quote_expired",
        status: 400,
        meaning: "The quote is more than 15 minutes old.",
        fix: "Ask for a new quote with POST /quotes, then create the order with it.",
      },
      {
        code: "quote_used",
        status: 409,
        meaning: "That quote already made an order.",
        fix: "Each quote makes one order. Ask for a new one.",
      },
      {
        code: "reference_taken",
        status: 409,
        meaning: "Another order already has your reference.",
        fix: "Give each order its own reference, or leave it out.",
      },
      {
        code: "order_not_cancellable",
        status: 409,
        meaning: "The order is too far along to cancel.",
        fix: "An order can be cancelled until the rider picks it up.",
      },
      {
        code: "order_not_reschedulable",
        status: 409,
        meaning: "Only a scheduled order that hasn't started can move.",
        fix: "Check the order's status first.",
      },
      {
        code: "order_not_dispatchable",
        status: 409,
        meaning: "The order isn't waiting to be sent to riders.",
        fix: "Only orders with dispatch: manual wait for POST /orders/{id}/dispatch.",
      },
      {
        code: "order_not_bidding",
        status: 409,
        meaning: "The order takes a fixed price, not offers.",
        fix: "Offers only exist for orders created with pricing.mode bidding.",
      },
      {
        code: "order_not_advanceable",
        status: 409,
        meaning: "A test order that's finished can't move on.",
        fix: "Create another test order.",
      },
      {
        code: "offer_not_open",
        status: 409,
        meaning: "The offer was taken back, expired or already answered.",
        fix: "List the order's offers again and pick an open one.",
      },
      {
        code: "stop_not_changeable",
        status: 409,
        meaning: "The rider already reached or finished that stop.",
        fix: "Stops can change until the rider gets there.",
      },
      {
        code: "idempotency_key_invalid",
        status: 400,
        meaning: "The Idempotency-Key header is empty or longer than 255 characters.",
        fix: "Send a unique value, like a UUID, up to 255 characters.",
      },
      {
        code: "url_invalid",
        status: 400,
        meaning: "The webhook URL isn't a URL.",
        fix: "Send the full address, like https://example.com/pickriders.",
      },
      {
        code: "url_not_https",
        status: 400,
        meaning: "Webhook URLs must start with https://.",
        fix: "Serve your endpoint over https.",
      },
      {
        code: "url_has_credentials",
        status: 400,
        meaning: "The webhook URL has a username or password in it.",
        fix: "Take them out; check our signature instead.",
      },
      {
        code: "url_not_public",
        status: 400,
        meaning: "The webhook URL points at a private or local address.",
        fix: "Use an address on the public internet. To test locally, use a tunnel.",
      },
      {
        code: "url_unresolvable",
        status: 400,
        meaning: "The webhook URL's domain doesn't exist.",
        fix: "Check the spelling of the domain.",
      },
      {
        code: "webhook_endpoint_exists",
        status: 409,
        meaning: "You already have an endpoint for that URL in this mode.",
        fix: "Change the existing endpoint's events instead of adding another.",
      },
      {
        code: "webhook_endpoint_limit_reached",
        status: 409,
        meaning: "You have the most endpoints a mode allows.",
        fix: "Delete one you no longer use.",
      },
      {
        code: "webhook_endpoint_disabled",
        status: 409,
        meaning: "The endpoint is turned off.",
        fix: "Turn it back on, then try again.",
      },
      {
        code: "no_webhook_endpoints",
        status: 409,
        meaning: "There's no endpoint to send the event to.",
        fix: "Add a webhook endpoint first.",
      },
      {
        code: "conflict",
        status: 409,
        meaning: "The request clashes with the current state of something.",
        fix: "Fetch the latest version and try again.",
      },
    ],
  },
  {
    type: "authentication_error",
    title: "We don't know who you are",
    summary: "Status 401. The API key is missing or doesn't work.",
    codes: [
      {
        code: "api_key_required",
        status: 401,
        meaning: "No API key was sent.",
        fix: "Send Authorization: Bearer sk_test_… with every request.",
      },
      {
        code: "api_key_invalid",
        status: 401,
        meaning: "The key doesn't exist.",
        fix: "Copy the key again from the dashboard. It starts sk_test_ or sk_live_.",
      },
      {
        code: "api_key_revoked",
        status: 401,
        meaning: "Someone on your team revoked the key.",
        fix: "Create a new key in the dashboard.",
      },
      {
        code: "api_key_expired",
        status: 401,
        meaning: "The key was rolled and its old version ran out.",
        fix: "Use the new key from the roll.",
      },
      { code: "authentication_required", status: 401, meaning: "You need to be signed in.", fix: "Send your API key." },
    ],
  },
  {
    type: "permission_error",
    title: "You can't do that",
    summary: "Status 403. We know who you are, but this key or team can't do this yet.",
    codes: [
      {
        code: "insufficient_scope",
        status: 403,
        meaning: "The key's scopes don't include this.",
        fix: "Create a key with the scope the message names, or use a full-access key.",
      },
      {
        code: "live_access_required",
        status: 403,
        meaning: "Live mode isn't switched on for your team yet.",
        fix: "Use a test key, or request live access in the dashboard.",
      },
      {
        code: "ip_not_allowed",
        status: 403,
        meaning: "The request came from an IP your allowlist doesn't include.",
        fix: "Add the IP in the dashboard's settings, or empty the list.",
      },
      {
        code: "account_suspended",
        status: 403,
        meaning: "The account is suspended.",
        fix: "Contact Pickriders support.",
      },
      { code: "team_suspended", status: 403, meaning: "Your team is suspended.", fix: "Contact Pickriders support." },
      {
        code: "permission_denied",
        status: 403,
        meaning: "You can't do this.",
        fix: "Check the key, the mode and your team's live access.",
      },
    ],
  },
  {
    type: "not_found_error",
    title: "We can't find it",
    summary: "Status 404. The id doesn't exist, or it belongs to the other mode or another team.",
    codes: [
      {
        code: "resource_missing",
        status: 404,
        meaning: "There's nothing at that path or id.",
        fix: "Check the path and the id. Test and live ids never mix.",
      },
      {
        code: "order_not_found",
        status: 404,
        meaning: "No order with that id in this mode.",
        fix: "Test keys only see test orders, live keys live ones.",
      },
      {
        code: "quote_not_found",
        status: 404,
        meaning: "No quote with that id.",
        fix: "Use the id POST /quotes gave you.",
      },
      {
        code: "stop_not_found",
        status: 404,
        meaning: "The order has no stop with that id.",
        fix: "Read the order's stops for their ids.",
      },
      {
        code: "offer_not_found",
        status: 404,
        meaning: "The order has no offer with that id.",
        fix: "List the order's offers again.",
      },
      {
        code: "tracking_not_found",
        status: 404,
        meaning: "The tracking link is wrong or has expired.",
        fix: "Get a fresh link from the order.",
      },
      {
        code: "event_not_found",
        status: 404,
        meaning: "No event with that id in the last 30 days.",
        fix: "Events are kept for 30 days.",
      },
      {
        code: "webhook_endpoint_not_found",
        status: 404,
        meaning: "No webhook endpoint with that id in this mode.",
        fix: "List your endpoints to find its id.",
      },
    ],
  },
  {
    type: "insufficient_funds_error",
    title: "Not enough money",
    summary: "Status 402. Your wallet can't cover this.",
    codes: [
      {
        code: "insufficient_funds",
        status: 402,
        meaning: "Your wallet's available balance is less than the price.",
        fix: "Top up your wallet. In test mode, add play money from the dashboard or POST /test/wallet/fund.",
      },
    ],
  },
  {
    type: "idempotency_error",
    title: "The same key, a different request",
    summary: "Status 409 or 422. Something's off with the Idempotency-Key you sent.",
    codes: [
      {
        code: "idempotency_key_reused",
        status: 422,
        meaning: "That Idempotency-Key was used with a different request.",
        fix: "Use a new key for each new request; reuse it only to retry the same one.",
      },
      {
        code: "idempotency_in_progress",
        status: 409,
        meaning: "The first request with this key is still running.",
        fix: "Wait a second, then retry with the same key.",
      },
    ],
  },
  {
    type: "rate_limit_error",
    title: "Slow down",
    summary: "Status 429. Too many requests too quickly.",
    codes: [
      {
        code: "rate_limited",
        status: 429,
        meaning: "You sent too many requests in a short time.",
        fix: "Wait the seconds in the Retry-After header, then try again.",
      },
    ],
  },
  {
    type: "api_error",
    title: "Something broke on our side",
    summary: "Status 500 or above. Not your fault.",
    codes: [
      {
        code: "internal_error",
        status: 500,
        meaning: "Something went wrong at Pickriders.",
        fix: "Try again in a moment. If it keeps happening, send us the request_id.",
      },
    ],
  },
];

export const ERROR_CODES = ERROR_GROUPS.flatMap((g) => g.codes.map((c) => ({ ...c, type: g.type })));
