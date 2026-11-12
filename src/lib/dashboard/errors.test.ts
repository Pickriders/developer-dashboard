import { AxiosError, AxiosHeaders } from "axios";

import { fieldOf, toApiError } from "./errors";

const axiosError = (status: number, data: unknown, headers: Record<string, string> = {}) =>
  new AxiosError("failed", "ERR_BAD_RESPONSE", undefined, undefined, {
    status,
    data,
    statusText: "",
    headers,
    config: { headers: new AxiosHeaders() },
  });

describe("toApiError", () => {
  it("reads the API's error body", () => {
    const error = toApiError(
      axiosError(409, {
        error: {
          type: "invalid_request_error",
          code: "email_taken",
          message: "Taken.",
          param: "email",
          request_id: "req_1",
        },
      }),
    );
    expect(error).toEqual({
      status: 409,
      type: "invalid_request_error",
      code: "email_taken",
      message: "Taken.",
      param: "email",
      requestId: "req_1",
    });
    expect(fieldOf(error, ["email", "password"])).toBe("email");
    expect(fieldOf(error, ["password"])).toBeNull();
  });

  it("rewords a few codes", () => {
    expect(
      toApiError(axiosError(401, { error: { code: "invalid_credentials", message: "Incorrect email or password." } }))
        .message,
    ).toBe("That email and password don't match.");
    expect(
      toApiError(axiosError(429, { error: { code: "rate_limited", message: "ThrottlerException" } })).message,
    ).toMatch(/Wait a minute/);
  });

  it("never shows a raw server fault, but keeps the request id", () => {
    const error = toApiError(axiosError(500, "<html>", { "request-id": "req_9" }));
    expect(error).toEqual(expect.objectContaining({ code: "internal_error", requestId: "req_9" }));
    expect(error.message).toBe("Something went wrong on our side. Try again in a moment.");
  });

  it("explains being offline and timing out", () => {
    expect(toApiError(new AxiosError("Network Error", "ERR_NETWORK")).code).toBe("network_error");
    expect(toApiError(new AxiosError("The request took too long.", "ECONNABORTED"))).toEqual(
      expect.objectContaining({ code: "timeout", message: "The request took too long." }),
    );
    expect(toApiError(new Error("boom")).code).toBe("unexpected");
  });
});
