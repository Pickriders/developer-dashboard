import { apiService } from "@/services/apiService";
import type {
  DeveloperForgotPasswordRequestDto,
  DeveloperLoginRequestDto,
  DeveloperResetPasswordRequestDto,
  DeveloperSessionResponseDto,
  DeveloperSignupRequestDto,
  AdvanceOrderRequestDto,
  CreateDeveloperApiKeyRequestDto,
  CreateOrderRequestDto,
  CreateQuoteRequestDto,
  DashboardListOrdersParams,
  PublicOrderDto,
  DeveloperListRequestLogsParams,
  DashboardCreateWebhookEndpointRequestDto,
  UpdateWebhookEndpointRequestDto,
  RollDeveloperApiKeyRequestDto,
  UpdateDeveloperAccountRequestDto,
} from "@/services/apiService";

/**
 * Typed namespaces over the generated client (CLAUDE.md §5): one function per dashboard route,
 * each pinned by a case in api.test.ts. Pages use the hooks over these, never apiService.
 */

/** What sign-in, sign-up and reset return in the browser: the proxy keeps the token in the cookie. */
export type Session = Omit<DeveloperSessionResponseDto, "accessToken">;
const session = (p: Promise<DeveloperSessionResponseDto>) => p as Promise<Session>;

export const auth = {
  me: () => apiService.developerMe(),
  signup: (body: DeveloperSignupRequestDto) => session(apiService.developerSignup(body)),
  login: (body: DeveloperLoginRequestDto) => session(apiService.developerLogin(body)),
  sendEmailCode: (email?: string) => apiService.developerSendEmailCode(email ? { email } : {}),
  verifyEmail: (code: string) => apiService.developerVerifyEmail({ code }),
  sendPhoneCode: (phone?: string) => apiService.developerSendPhoneCode(phone ? { phone } : {}),
  verifyPhone: (code: string) => apiService.developerVerifyPhone({ code }),
  forgotPassword: (body: DeveloperForgotPasswordRequestDto) => apiService.developerForgotPassword(body),
  resetPassword: (body: DeveloperResetPasswordRequestDto) => session(apiService.developerResetPassword(body)),
};

export const invitations = {
  preview: (token: string) => apiService.developerPreviewInvitation({ token }),
  accept: (token: string) => apiService.developerAcceptInvitation({ token }),
  decline: (token: string) => apiService.developerDeclineInvitation({ token }),
};

export const teams = {
  list: () => apiService.developerListTeams(),
  current: () => apiService.developerCurrentTeam(),
};

export const account = {
  get: () => apiService.developerGetAccount(),
  update: (body: UpdateDeveloperAccountRequestDto) => apiService.developerUpdateAccount(body),
  onboarding: () => apiService.developerGetOnboarding(),
  requestLiveAccess: () => apiService.developerRequestLiveAccess(),
};

/** "true" | "false": how the API takes a mode in a query string. */
const livemode = (mode: "test" | "live") => (mode === "live" ? "true" : "false");

export const keys = {
  list: (mode: "test" | "live") => apiService.developerListApiKeys({ livemode: livemode(mode) }),
  create: (body: CreateDeveloperApiKeyRequestDto) => apiService.developerCreateApiKey(body),
  roll: (id: string, expiresIn: RollDeveloperApiKeyRequestDto["expiresIn"]) =>
    apiService.developerRollApiKey(id, { expiresIn }),
  revoke: (id: string) => apiService.developerRevokeApiKey(id),
};

export const webhooks = {
  list: (mode: "test" | "live") => apiService.dashboardListWebhookEndpoints({ livemode: livemode(mode), limit: 100 }),
  get: (id: string) => apiService.dashboardRetrieveWebhookEndpoint(id),
  create: (body: DashboardCreateWebhookEndpointRequestDto) => apiService.dashboardCreateWebhookEndpoint(body),
  update: (id: string, body: UpdateWebhookEndpointRequestDto) => apiService.dashboardUpdateWebhookEndpoint(id, body),
  remove: (id: string) => apiService.dashboardDeleteWebhookEndpoint(id),
  rollSecret: (id: string) => apiService.dashboardRollWebhookSecret(id),
  /** Newest first, a page at a time: pass the last id seen as `startingAfter`. */
  deliveries: (id: string, startingAfter?: string) =>
    apiService.dashboardListWebhookDeliveries({
      endpointId: id,
      limit: 20,
      ...(startingAfter && { starting_after: startingAfter }),
    }),
  test: (id: string) => apiService.dashboardTestWebhookEndpoint(id),
  resend: (id: string, eventId: string) => apiService.dashboardResendWebhookEvent(id, { event_id: eventId }),
};

export type LogFilters = Omit<
  DeveloperListRequestLogsParams,
  "livemode" | "limit" | "starting_after" | "ending_before"
>;

export const logs = {
  /** Newest first, 25 a page; `startingAfter` is the last id seen. A request id ignores the mode. */
  list: (mode: "test" | "live", filters: LogFilters, startingAfter?: string) =>
    apiService.developerListRequestLogs({
      livemode: livemode(mode),
      limit: 25,
      ...filters,
      ...(startingAfter && { starting_after: startingAfter }),
    }),
  get: (id: string) => apiService.developerGetRequestLog(id),
};

/** What GET dashboard/orders really returns (the generated type says a bare array). */
export type OrderList = { object: "list"; data: PublicOrderDto[]; has_more: boolean; url: string };
export type OrderFilters = Pick<DashboardListOrdersParams, "status" | "reference" | "type">;

export const orders = {
  list: (mode: "test" | "live", filters: OrderFilters, startingAfter?: string) =>
    apiService.dashboardListOrders({
      livemode: livemode(mode),
      limit: 20,
      ...filters,
      ...(startingAfter && { starting_after: startingAfter }),
    }) as unknown as Promise<OrderList>,
  get: (mode: "test" | "live", id: string) => apiService.dashboardRetrieveOrder({ id, livemode: livemode(mode) }),
  tracking: (mode: "test" | "live", id: string) => apiService.dashboardTrackOrder({ id, livemode: livemode(mode) }),
  quote: (mode: "test" | "live", body: CreateQuoteRequestDto) =>
    apiService.dashboardCreateQuote({ livemode: livemode(mode) }, body),
  create: (mode: "test" | "live", body: CreateOrderRequestDto) =>
    apiService.dashboardCreateOrder({ livemode: livemode(mode) }, body),
  cancel: (mode: "test" | "live", id: string, reason?: string) =>
    apiService.dashboardCancelOrder({ id, livemode: livemode(mode) }, reason ? { reason } : {}),
  /** Test mode only: one step as the test rider would, or straight to `to`. */
  advance: (id: string, to?: AdvanceOrderRequestDto["to"]) =>
    apiService.dashboardAdvanceTestOrder(id, to ? { to } : {}),
  serviceAreas: () =>
    apiService.dashboardListServiceAreas() as unknown as Promise<{ object: "list"; data: ServiceArea[] }>,
};

export type ServiceArea = {
  object: "service_area";
  id: string;
  country_name: string;
  state_name: string;
  currency: string;
  minimum_price: number;
};
