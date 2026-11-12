import { apiService } from "@/services/apiService";
import type {
  DeveloperForgotPasswordRequestDto,
  DeveloperLoginRequestDto,
  DeveloperResetPasswordRequestDto,
  DeveloperSessionResponseDto,
  DeveloperSignupRequestDto,
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
