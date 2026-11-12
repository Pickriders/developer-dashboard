import { isAxiosError } from "axios";

/** An API error as pages show it: the message, plus the code and request id developers search by. */
export type ApiError = {
  status: number;
  type: string;
  code: string;
  message: string;
  /** The request field it is about, e.g. "email". */
  param: string | null;
  requestId: string | null;
};

const OFFLINE: ApiError = {
  status: 0,
  type: "api_error",
  code: "network_error",
  message: "We couldn't reach Pickriders. Check your connection and try again.",
  param: null,
  requestId: null,
};

/** Clearer words for a few codes; everything else keeps the API's own message. */
const MESSAGES: Record<string, string> = {
  invalid_credentials: "That email and password don't match.",
  rate_limited: "Too many attempts. Wait a minute, then try again.",
  api_unreachable: OFFLINE.message,
  internal_error: "Something went wrong on our side. Try again in a moment.",
};

export function toApiError(error: unknown): ApiError {
  if (!isAxiosError(error)) return { ...OFFLINE, code: "unexpected", message: "Something went wrong. Try again." };
  if (!error.response) {
    return error.code === "ECONNABORTED" ? { ...OFFLINE, code: "timeout", message: error.message } : OFFLINE;
  }

  const { status, data, headers } = error.response;
  const body = (data as { error?: Partial<ApiError> & { request_id?: string | null } })?.error;
  const code = body?.code ?? (status >= 500 ? "internal_error" : "request_failed");
  return {
    status,
    type: body?.type ?? (status >= 500 ? "api_error" : "invalid_request_error"),
    code,
    message: MESSAGES[code] ?? body?.message ?? MESSAGES.internal_error,
    param: body?.param ?? null,
    requestId: body?.request_id ?? (headers?.["request-id"] as string | undefined) ?? null,
  };
}

/** Field-level errors (`param` set) belong under their input; the rest go in the form's alert. */
export const fieldOf = (error: ApiError, fields: readonly string[]) =>
  error.param && fields.includes(error.param) ? error.param : null;
