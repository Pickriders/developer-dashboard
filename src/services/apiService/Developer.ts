/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  AdvanceOrderRequestDto,
  ConfigureAutoTopUpRequestDto,
  CreateDeveloperApiKeyRequestDto,
  CreateDeveloperTeamRequestDto,
  CreateFundingSessionRequestDto,
  CreateOrderRequestDto,
  CreateQuoteRequestDto,
  CreateTeamInvitationRequestDto,
  DashboardAdvanceTestOrderData,
  DashboardCancelOrderData,
  DashboardCancelOrderParams,
  DashboardCreateOrderData,
  DashboardCreateOrderParams,
  DashboardCreateQuoteData,
  DashboardCreateQuoteParams,
  DashboardCreateWebhookEndpointData,
  DashboardCreateWebhookEndpointRequestDto,
  DashboardDeleteWebhookEndpointData,
  DashboardListOrdersData,
  DashboardListOrdersParams,
  DashboardListServiceAreasData,
  DashboardListWebhookDeliveriesData,
  DashboardListWebhookDeliveriesParams,
  DashboardListWebhookEndpointsData,
  DashboardListWebhookEndpointsParams,
  DashboardResendEventRequestDto,
  DashboardResendWebhookEventData,
  DashboardRetrieveOrderData,
  DashboardRetrieveOrderParams,
  DashboardRetrieveWebhookEndpointData,
  DashboardRollWebhookSecretData,
  DashboardTestWebhookEndpointData,
  DashboardTrackOrderData,
  DashboardTrackOrderParams,
  DashboardUpdateWebhookEndpointData,
  DeveloperAcceptInvitationData,
  DeveloperAddTestFundsData,
  DeveloperCancelEmailChangeData,
  DeveloperCancelOrderRequestDto,
  DeveloperCancelPhoneChangeData,
  DeveloperChangeEmailRequestDto,
  DeveloperChangePhoneRequestDto,
  DeveloperConfigureAutoTopUpData,
  DeveloperConfirmEmailChangeData,
  DeveloperConfirmPhoneChangeData,
  DeveloperCreateApiKeyData,
  DeveloperCreateInvitationData,
  DeveloperCreateTeamData,
  DeveloperCurrentTeamData,
  DeveloperDashboardCreateFundingSessionData,
  DeveloperDashboardListWalletTransactionsData,
  DeveloperDashboardListWalletTransactionsParams,
  DeveloperDeclineInvitationData,
  DeveloperForgotPasswordData,
  DeveloperForgotPasswordRequestDto,
  DeveloperGetAccountData,
  DeveloperGetAutoTopUpData,
  DeveloperGetFundingAccountData,
  DeveloperGetIpAllowlistData,
  DeveloperGetLowBalanceAlertData,
  DeveloperGetOnboardingData,
  DeveloperGetRequestLogData,
  DeveloperGetUsageData,
  DeveloperGetUsageParams,
  DeveloperGetWalletData,
  DeveloperGetWalletParams,
  DeveloperLeaveTeamData,
  DeveloperListApiKeysData,
  DeveloperListApiKeysParams,
  DeveloperListAuditLogsData,
  DeveloperListAuditLogsParams,
  DeveloperListInvitationsData,
  DeveloperListMembersData,
  DeveloperListRequestLogsData,
  DeveloperListRequestLogsParams,
  DeveloperListTeamsData,
  DeveloperLoginData,
  DeveloperLoginRequestDto,
  DeveloperMeData,
  DeveloperPreviewInvitationData,
  DeveloperRemoveAutoTopUpCardData,
  DeveloperRemoveMemberData,
  DeveloperRequestLiveAccessData,
  DeveloperResendInvitationData,
  DeveloperResetPasswordData,
  DeveloperResetPasswordRequestDto,
  DeveloperRevokeApiKeyData,
  DeveloperRevokeInvitationData,
  DeveloperRollApiKeyData,
  DeveloperSaveAutoTopUpCardData,
  DeveloperSendEmailCodeData,
  DeveloperSendEmailCodeRequestDto,
  DeveloperSendPhoneCodeData,
  DeveloperSendPhoneCodeRequestDto,
  DeveloperSetLowBalanceAlertData,
  DeveloperSetUpFundingAccountData,
  DeveloperSignupData,
  DeveloperSignupRequestDto,
  DeveloperStartEmailChangeData,
  DeveloperStartPhoneChangeData,
  DeveloperTransferOwnershipData,
  DeveloperUpdateAccountData,
  DeveloperUpdateIpAllowlistData,
  DeveloperUpdateMemberRoleData,
  DeveloperUpdateProfileData,
  DeveloperVerifyCodeRequestDto,
  DeveloperVerifyEmailData,
  DeveloperVerifyPhoneData,
  FundTestWalletRequestDto,
  LowBalanceAlertDto,
  RollDeveloperApiKeyRequestDto,
  SetUpFundingAccountRequestDto,
  TeamInvitationTokenRequestDto,
  TransferTeamOwnershipRequestDto,
  UpdateDeveloperAccountRequestDto,
  UpdateDeveloperProfileRequestDto,
  UpdateIpAllowlistRequestDto,
  UpdateTeamMemberRoleRequestDto,
  UpdateWebhookEndpointRequestDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Developer<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Creates a developer account, its first team (owned by the new user) and signs them in.
   *
   * @tags developer-dashboard/auth
   * @name DeveloperSignup
   * @request POST:/developer/api/v1/dashboard/auth/signup
   * @response `200` `DeveloperSignupData`
   * @response `201` `DeveloperSessionResponseDto`
   * @response `409` `any` EMAIL_TAKEN or PHONE_TAKEN, with `param` set.
   */
  developerSignup = (data: DeveloperSignupRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperSignupData, any>({
      path: `/developer/api/v1/dashboard/auth/signup`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Works before email and phone are verified: test mode is available straight away.
   *
   * @tags developer-dashboard/auth
   * @name DeveloperLogin
   * @request POST:/developer/api/v1/dashboard/auth/login
   * @response `200` `DeveloperLoginData`
   * @response `401` `any` INVALID_CREDENTIALS
   */
  developerLogin = (data: DeveloperLoginRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperLoginData, any>({
      path: `/developer/api/v1/dashboard/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description The signed-in developer and their teams, read fresh.
   *
   * @tags developer-dashboard/auth
   * @name DeveloperMe
   * @request GET:/developer/api/v1/dashboard/auth/me
   * @secure
   * @response `200` `DeveloperMeData`
   */
  developerMe = (params: RequestParams = {}) =>
    this.request<DeveloperMeData, any>({
      path: `/developer/api/v1/dashboard/auth/me`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Emails a verification code to the signed-in developer (sign-up already sent the first). Pass `email` to correct an unverified address first. A new code replaces the last; 429 `code_recently_sent` during the cooldown (`resendAfter` seconds).
   *
   * @tags developer-dashboard/auth
   * @name DeveloperSendEmailCode
   * @request POST:/developer/api/v1/dashboard/auth/verification/email/send
   * @secure
   * @response `200` `DeveloperSendEmailCodeData`
   * @response `409` `any` EMAIL_TAKEN
   * @response `429` `any` code_recently_sent
   */
  developerSendEmailCode = (data: DeveloperSendEmailCodeRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperSendEmailCodeData, any>({
      path: `/developer/api/v1/dashboard/auth/verification/email/send`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Verifies the email with the emailed code. Returns the refreshed `me`.
   *
   * @tags developer-dashboard/auth
   * @name DeveloperVerifyEmail
   * @request POST:/developer/api/v1/dashboard/auth/verification/email
   * @secure
   * @response `200` `DeveloperVerifyEmailData`
   * @response `400` `any` code_incorrect, code_expired or code_invalid, with param `code`
   * @response `429` `any` too_many_attempts: ask for a new code
   */
  developerVerifyEmail = (data: DeveloperVerifyCodeRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperVerifyEmailData, any>({
      path: `/developer/api/v1/dashboard/auth/verification/email`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Texts a verification code to the developer's phone. Pass `phone` to correct an unverified number first.
   *
   * @tags developer-dashboard/auth
   * @name DeveloperSendPhoneCode
   * @request POST:/developer/api/v1/dashboard/auth/verification/phone/send
   * @secure
   * @response `200` `DeveloperSendPhoneCodeData`
   * @response `409` `any` PHONE_TAKEN
   * @response `429` `any` code_recently_sent
   */
  developerSendPhoneCode = (data: DeveloperSendPhoneCodeRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperSendPhoneCodeData, any>({
      path: `/developer/api/v1/dashboard/auth/verification/phone/send`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Verifies the phone with the texted code. Returns the refreshed `me`.
   *
   * @tags developer-dashboard/auth
   * @name DeveloperVerifyPhone
   * @request POST:/developer/api/v1/dashboard/auth/verification/phone
   * @secure
   * @response `200` `DeveloperVerifyPhoneData`
   * @response `400` `any` code_incorrect, code_expired or code_invalid, with param `code`
   * @response `429` `any` too_many_attempts: ask for a new code
   */
  developerVerifyPhone = (data: DeveloperVerifyCodeRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperVerifyPhoneData, any>({
      path: `/developer/api/v1/dashboard/auth/verification/phone`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Settings: the name on the account. Returns the refreshed `me`.
   *
   * @tags developer-dashboard/auth
   * @name DeveloperUpdateProfile
   * @request PATCH:/developer/api/v1/dashboard/auth/profile
   * @secure
   * @response `200` `DeveloperUpdateProfileData`
   */
  developerUpdateProfile = (data: UpdateDeveloperProfileRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperUpdateProfileData, any>({
      path: `/developer/api/v1/dashboard/auth/profile`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Settings: change the email. A verified one only changes once the code sent to the new address is entered (`pendingEmail` meanwhile); an unverified one is corrected in place.
   *
   * @tags developer-dashboard/auth
   * @name DeveloperStartEmailChange
   * @request POST:/developer/api/v1/dashboard/auth/email/change
   * @secure
   * @response `200` `DeveloperStartEmailChangeData`
   * @response `409` `any` EMAIL_TAKEN
   */
  developerStartEmailChange = (data: DeveloperChangeEmailRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperStartEmailChangeData, any>({
      path: `/developer/api/v1/dashboard/auth/email/change`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags developer-dashboard/auth
   * @name DeveloperCancelEmailChange
   * @request DELETE:/developer/api/v1/dashboard/auth/email/change
   * @secure
   * @response `200` `DeveloperCancelEmailChangeData`
   */
  developerCancelEmailChange = (params: RequestParams = {}) =>
    this.request<DeveloperCancelEmailChangeData, any>({
      path: `/developer/api/v1/dashboard/auth/email/change`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags developer-dashboard/auth
   * @name DeveloperConfirmEmailChange
   * @request POST:/developer/api/v1/dashboard/auth/email/change/verify
   * @secure
   * @response `200` `DeveloperConfirmEmailChangeData`
   */
  developerConfirmEmailChange = (data: DeveloperVerifyCodeRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperConfirmEmailChangeData, any>({
      path: `/developer/api/v1/dashboard/auth/email/change/verify`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Settings: change the phone number. A verified one only changes once the code texted to the new number is entered (`pendingPhone` meanwhile), so live access never rests on an unproved number.
   *
   * @tags developer-dashboard/auth
   * @name DeveloperStartPhoneChange
   * @request POST:/developer/api/v1/dashboard/auth/phone/change
   * @secure
   * @response `200` `DeveloperStartPhoneChangeData`
   * @response `409` `any` PHONE_TAKEN
   */
  developerStartPhoneChange = (data: DeveloperChangePhoneRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperStartPhoneChangeData, any>({
      path: `/developer/api/v1/dashboard/auth/phone/change`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags developer-dashboard/auth
   * @name DeveloperCancelPhoneChange
   * @request DELETE:/developer/api/v1/dashboard/auth/phone/change
   * @secure
   * @response `200` `DeveloperCancelPhoneChangeData`
   */
  developerCancelPhoneChange = (params: RequestParams = {}) =>
    this.request<DeveloperCancelPhoneChangeData, any>({
      path: `/developer/api/v1/dashboard/auth/phone/change`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags developer-dashboard/auth
   * @name DeveloperConfirmPhoneChange
   * @request POST:/developer/api/v1/dashboard/auth/phone/change/verify
   * @secure
   * @response `200` `DeveloperConfirmPhoneChangeData`
   */
  developerConfirmPhoneChange = (data: DeveloperVerifyCodeRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperConfirmPhoneChangeData, any>({
      path: `/developer/api/v1/dashboard/auth/phone/change/verify`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Emails a reset code. Answers the same whether or not the account exists. Works before the email is verified.
   *
   * @tags developer-dashboard/auth
   * @name DeveloperForgotPassword
   * @request POST:/developer/api/v1/dashboard/auth/password/forgot
   * @response `200` `DeveloperForgotPasswordData`
   */
  developerForgotPassword = (data: DeveloperForgotPasswordRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperForgotPasswordData, any>({
      path: `/developer/api/v1/dashboard/auth/password/forgot`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Sets a new password with the reset code and signs in. Also marks the email verified.
   *
   * @tags developer-dashboard/auth
   * @name DeveloperResetPassword
   * @request POST:/developer/api/v1/dashboard/auth/password/reset
   * @response `200` `DeveloperResetPasswordData`
   * @response `400` `any` code_incorrect, code_expired or code_invalid, with param `code`
   * @response `429` `any` too_many_attempts: ask for a new code
   */
  developerResetPassword = (data: DeveloperResetPasswordRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperResetPasswordData, any>({
      path: `/developer/api/v1/dashboard/auth/password/reset`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Every active team, in the order joined, with your role and permissions in each.
   *
   * @tags developer-dashboard/teams
   * @name DeveloperListTeams
   * @request GET:/developer/api/v1/dashboard/teams
   * @secure
   * @response `200` `DeveloperListTeamsData`
   */
  developerListTeams = (params: RequestParams = {}) =>
    this.request<DeveloperListTeamsData, any>({
      path: `/developer/api/v1/dashboard/teams`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Another team you own, e.g. one per client or per environment. Up to 10.
   *
   * @tags developer-dashboard/teams
   * @name DeveloperCreateTeam
   * @request POST:/developer/api/v1/dashboard/teams
   * @secure
   * @response `200` `DeveloperCreateTeamData`
   * @response `201` `DeveloperTeamSummaryDto`
   */
  developerCreateTeam = (data: CreateDeveloperTeamRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperCreateTeamData, any>({
      path: `/developer/api/v1/dashboard/teams`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description The X-Team-Id team, as the switcher shows it.
   *
   * @tags developer-dashboard/teams
   * @name DeveloperCurrentTeam
   * @request GET:/developer/api/v1/dashboard/teams/current
   * @secure
   * @response `200` `DeveloperCurrentTeamData`
   */
  developerCurrentTeam = (params: RequestParams = {}) =>
    this.request<DeveloperCurrentTeamData, any>({
      path: `/developer/api/v1/dashboard/teams/current`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Open invitations, newest first, including expired ones (resend those).
   *
   * @tags developer-dashboard/team
   * @name DeveloperListInvitations
   * @request GET:/developer/api/v1/dashboard/team/invitations
   * @secure
   * @response `200` `DeveloperListInvitationsData`
   */
  developerListInvitations = (params: RequestParams = {}) =>
    this.request<DeveloperListInvitationsData, any>({
      path: `/developer/api/v1/dashboard/team/invitations`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Emails a link valid for 7 days. 409 if the address is already a member or already invited.
   *
   * @tags developer-dashboard/team
   * @name DeveloperCreateInvitation
   * @request POST:/developer/api/v1/dashboard/team/invitations
   * @secure
   * @response `200` `DeveloperCreateInvitationData`
   * @response `201` `TeamInvitationDto`
   */
  developerCreateInvitation = (data: CreateTeamInvitationRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperCreateInvitationData, any>({
      path: `/developer/api/v1/dashboard/team/invitations`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description A fresh link and another 7 days; the previous link stops working. At most once a minute.
   *
   * @tags developer-dashboard/team
   * @name DeveloperResendInvitation
   * @request POST:/developer/api/v1/dashboard/team/invitations/{invitationId}/resend
   * @secure
   * @response `200` `DeveloperResendInvitationData`
   */
  developerResendInvitation = (invitationId: string, params: RequestParams = {}) =>
    this.request<DeveloperResendInvitationData, any>({
      path: `/developer/api/v1/dashboard/team/invitations/${invitationId}/resend`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Withdraws an open invitation; its link stops working.
   *
   * @tags developer-dashboard/team
   * @name DeveloperRevokeInvitation
   * @request DELETE:/developer/api/v1/dashboard/team/invitations/{invitationId}
   * @secure
   * @response `200` `DeveloperRevokeInvitationData`
   */
  developerRevokeInvitation = (invitationId: string, params: RequestParams = {}) =>
    this.request<DeveloperRevokeInvitationData, any>({
      path: `/developer/api/v1/dashboard/team/invitations/${invitationId}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Team, role and whether to offer sign-in or sign-up. 404 for an unknown link; 410 once it can't be used.
   *
   * @tags developer-dashboard/invitations
   * @name DeveloperPreviewInvitation
   * @request POST:/developer/api/v1/dashboard/invitations/preview
   * @response `200` `DeveloperPreviewInvitationData`
   */
  developerPreviewInvitation = (data: TeamInvitationTokenRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperPreviewInvitationData, any>({
      path: `/developer/api/v1/dashboard/invitations/preview`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Joins the team as the signed-in developer. Their email must be the invited one.
   *
   * @tags developer-dashboard/invitations
   * @name DeveloperAcceptInvitation
   * @request POST:/developer/api/v1/dashboard/invitations/accept
   * @secure
   * @response `200` `DeveloperAcceptInvitationData`
   */
  developerAcceptInvitation = (data: TeamInvitationTokenRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperAcceptInvitationData, any>({
      path: `/developer/api/v1/dashboard/invitations/accept`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description No account needed: the link itself is the proof.
   *
   * @tags developer-dashboard/invitations
   * @name DeveloperDeclineInvitation
   * @request POST:/developer/api/v1/dashboard/invitations/decline
   * @response `204` `DeveloperDeclineInvitationData`
   */
  developerDeclineInvitation = (data: TeamInvitationTokenRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperDeclineInvitationData, any>({
      path: `/developer/api/v1/dashboard/invitations/decline`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Active members, owner first.
   *
   * @tags developer-dashboard/team
   * @name DeveloperListMembers
   * @request GET:/developer/api/v1/dashboard/team/members
   * @secure
   * @response `200` `DeveloperListMembersData`
   */
  developerListMembers = (params: RequestParams = {}) =>
    this.request<DeveloperListMembersData, any>({
      path: `/developer/api/v1/dashboard/team/members`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Not your own role, not the owner's, and never above your own.
   *
   * @tags developer-dashboard/team
   * @name DeveloperUpdateMemberRole
   * @request PATCH:/developer/api/v1/dashboard/team/members/{userId}
   * @secure
   * @response `200` `DeveloperUpdateMemberRoleData`
   */
  developerUpdateMemberRole = (userId: string, data: UpdateTeamMemberRoleRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperUpdateMemberRoleData, any>({
      path: `/developer/api/v1/dashboard/team/members/${userId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Their access ends on their next request. The owner can't be removed.
   *
   * @tags developer-dashboard/team
   * @name DeveloperRemoveMember
   * @request DELETE:/developer/api/v1/dashboard/team/members/{userId}
   * @secure
   * @response `204` `DeveloperRemoveMemberData`
   */
  developerRemoveMember = (userId: string, params: RequestParams = {}) =>
    this.request<DeveloperRemoveMemberData, any>({
      path: `/developer/api/v1/dashboard/team/members/${userId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Leave the team yourself. The owner transfers ownership first.
   *
   * @tags developer-dashboard/team
   * @name DeveloperLeaveTeam
   * @request POST:/developer/api/v1/dashboard/team/members/leave
   * @secure
   * @response `204` `DeveloperLeaveTeamData`
   */
  developerLeaveTeam = (params: RequestParams = {}) =>
    this.request<DeveloperLeaveTeamData, any>({
      path: `/developer/api/v1/dashboard/team/members/leave`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description The owner makes an active member the owner and becomes an admin. Returns the updated members.
   *
   * @tags developer-dashboard/team
   * @name DeveloperTransferOwnership
   * @request POST:/developer/api/v1/dashboard/team/members/transfer-ownership
   * @secure
   * @response `200` `DeveloperTransferOwnershipData`
   */
  developerTransferOwnership = (data: TransferTeamOwnershipRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperTransferOwnershipData, any>({
      path: `/developer/api/v1/dashboard/team/members/transfer-ownership`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description The X-Team-Id team's audit trail, newest first: who changed what, with before and after values.
   *
   * @tags developer-dashboard/audit-logs
   * @name DeveloperListAuditLogs
   * @request GET:/developer/api/v1/dashboard/audit-logs
   * @secure
   * @response `200` `DeveloperListAuditLogsData`
   */
  developerListAuditLogs = (query: DeveloperListAuditLogsParams, params: RequestParams = {}) =>
    this.request<DeveloperListAuditLogsData, any>({
      path: `/developer/api/v1/dashboard/audit-logs`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Any member can read it. `canRequestLive` and `liveStatus` drive the get-started checklist.
   *
   * @tags developer-dashboard/account
   * @name DeveloperGetAccount
   * @request GET:/developer/api/v1/dashboard/account
   * @secure
   * @response `200` `DeveloperGetAccountData`
   */
  developerGetAccount = (params: RequestParams = {}) =>
    this.request<DeveloperGetAccountData, any>({
      path: `/developer/api/v1/dashboard/account`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Owners and admins. Send only the fields that change; `null` clears one.
   *
   * @tags developer-dashboard/account
   * @name DeveloperUpdateAccount
   * @request PATCH:/developer/api/v1/dashboard/account
   * @secure
   * @response `200` `DeveloperUpdateAccountData`
   */
  developerUpdateAccount = (data: UpdateDeveloperAccountRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperUpdateAccountData, any>({
      path: `/developer/api/v1/dashboard/account`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description The get-started steps done outside the account: a test key, a test order, a webhook endpoint. With GET dashboard/account (verification, live status), everything the checklist shows.
   *
   * @tags developer-dashboard/account
   * @name DeveloperGetOnboarding
   * @request GET:/developer/api/v1/dashboard/account/onboarding
   * @secure
   * @response `200` `DeveloperGetOnboardingData`
   */
  developerGetOnboarding = (params: RequestParams = {}) =>
    this.request<DeveloperGetOnboardingData, any>({
      path: `/developer/api/v1/dashboard/account/onboarding`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Ask Pickriders for live access. Needs the team owner's email and phone verified (`canRequestLive`), and is refused while a request is pending, approved or suspended. A rejected team can fix its profile and ask again. Returns the account, now PENDING.
   *
   * @tags developer-dashboard/account
   * @name DeveloperRequestLiveAccess
   * @request POST:/developer/api/v1/dashboard/account/live-access
   * @secure
   * @response `200` `DeveloperRequestLiveAccessData`
   */
  developerRequestLiveAccess = (params: RequestParams = {}) =>
    this.request<DeveloperRequestLiveAccessData, any>({
      path: `/developer/api/v1/dashboard/account/live-access`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Keys that still work, newest first: active ones, and rolled ones still inside their grace period.
   *
   * @tags developer-dashboard/api-keys
   * @name DeveloperListApiKeys
   * @request GET:/developer/api/v1/dashboard/api-keys
   * @secure
   * @response `200` `DeveloperListApiKeysData`
   */
  developerListApiKeys = (query: DeveloperListApiKeysParams, params: RequestParams = {}) =>
    this.request<DeveloperListApiKeysData, any>({
      path: `/developer/api/v1/dashboard/api-keys`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description A new key. The response is the only time its secret is shown. Live keys need approved live access.
   *
   * @tags developer-dashboard/api-keys
   * @name DeveloperCreateApiKey
   * @request POST:/developer/api/v1/dashboard/api-keys
   * @secure
   * @response `200` `DeveloperCreateApiKeyData`
   * @response `201` `DeveloperApiKeySecretDto`
   */
  developerCreateApiKey = (data: CreateDeveloperApiKeyRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperCreateApiKeyData, any>({
      path: `/developer/api/v1/dashboard/api-keys`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Replace a key with a new one. The old key keeps working for `expiresIn`; the new secret is shown once.
   *
   * @tags developer-dashboard/api-keys
   * @name DeveloperRollApiKey
   * @request POST:/developer/api/v1/dashboard/api-keys/{keyId}/roll
   * @secure
   * @response `200` `DeveloperRollApiKeyData`
   */
  developerRollApiKey = (keyId: string, data: RollDeveloperApiKeyRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperRollApiKeyData, any>({
      path: `/developer/api/v1/dashboard/api-keys/${keyId}/roll`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Stop a key at once.
   *
   * @tags developer-dashboard/api-keys
   * @name DeveloperRevokeApiKey
   * @request POST:/developer/api/v1/dashboard/api-keys/{keyId}/revoke
   * @secure
   * @response `200` `DeveloperRevokeApiKeyData`
   */
  developerRevokeApiKey = (keyId: string, params: RequestParams = {}) =>
    this.request<DeveloperRevokeApiKeyData, any>({
      path: `/developer/api/v1/dashboard/api-keys/${keyId}/revoke`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags developer-dashboard/ip-allowlist
   * @name DeveloperGetIpAllowlist
   * @request GET:/developer/api/v1/dashboard/ip-allowlist
   * @secure
   * @response `200` `DeveloperGetIpAllowlistData`
   */
  developerGetIpAllowlist = (params: RequestParams = {}) =>
    this.request<DeveloperGetIpAllowlistData, any>({
      path: `/developer/api/v1/dashboard/ip-allowlist`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Replace the list. Requests from other IPs are refused at once. Send [] to allow any IP.
   *
   * @tags developer-dashboard/ip-allowlist
   * @name DeveloperUpdateIpAllowlist
   * @request PUT:/developer/api/v1/dashboard/ip-allowlist
   * @secure
   * @response `200` `DeveloperUpdateIpAllowlistData`
   */
  developerUpdateIpAllowlist = (data: UpdateIpAllowlistRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperUpdateIpAllowlistData, any>({
      path: `/developer/api/v1/dashboard/ip-allowlist`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description `livemode=false` (default) is the test wallet; `true` the live one, which exists once live access is approved.
   *
   * @tags developer-dashboard/wallet
   * @name DeveloperGetWallet
   * @request GET:/developer/api/v1/dashboard/wallet
   * @secure
   * @response `200` `DeveloperGetWalletData`
   */
  developerGetWallet = (query: DeveloperGetWalletParams, params: RequestParams = {}) =>
    this.request<DeveloperGetWalletData, any>({
      path: `/developer/api/v1/dashboard/wallet`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description A card checkout for the live wallet (owners, admins and finance). Needs approved live access.
   *
   * @tags developer-dashboard/wallet
   * @name DeveloperDashboardCreateFundingSession
   * @request POST:/developer/api/v1/dashboard/wallet/funding-sessions
   * @secure
   * @response `200` `DeveloperDashboardCreateFundingSessionData`
   * @response `201` `FundingSessionDto`
   */
  developerDashboardCreateFundingSession = (data: CreateFundingSessionRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperDashboardCreateFundingSessionData, any>({
      path: `/developer/api/v1/dashboard/wallet/funding-sessions`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Play money for the test wallet, as POST /test/wallet/fund does with a test key: up to ₦10,000,000 a top-up. Recorded as a "Test top-up" transaction. Never touches the live wallet.
   *
   * @tags developer-dashboard/wallet
   * @name DeveloperAddTestFunds
   * @request POST:/developer/api/v1/dashboard/wallet/test-funds
   * @secure
   * @response `200` `DeveloperAddTestFundsData`
   */
  developerAddTestFunds = (data: FundTestWalletRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperAddTestFundsData, any>({
      path: `/developer/api/v1/dashboard/wallet/test-funds`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description The wallet's transactions, newest first. `livemode=true` for the live wallet.
   *
   * @tags developer-dashboard/wallet
   * @name DeveloperDashboardListWalletTransactions
   * @request GET:/developer/api/v1/dashboard/wallet/transactions
   * @secure
   * @response `200` `DeveloperDashboardListWalletTransactionsData` A list object: { object, data, has_more, url }.
   */
  developerDashboardListWalletTransactions = (
    query: DeveloperDashboardListWalletTransactionsParams,
    params: RequestParams = {},
  ) =>
    this.request<DeveloperDashboardListWalletTransactionsData, any>({
      path: `/developer/api/v1/dashboard/wallet/transactions`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description The live wallet's low-balance alert threshold (kobo), or null when it's off.
   *
   * @tags developer-dashboard/wallet
   * @name DeveloperGetLowBalanceAlert
   * @request GET:/developer/api/v1/dashboard/wallet/low-balance-alert
   * @secure
   * @response `200` `DeveloperGetLowBalanceAlertData`
   */
  developerGetLowBalanceAlert = (params: RequestParams = {}) =>
    this.request<DeveloperGetLowBalanceAlertData, any>({
      path: `/developer/api/v1/dashboard/wallet/low-balance-alert`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Set or turn off (null) the alert. Owners, admins and finance.
   *
   * @tags developer-dashboard/wallet
   * @name DeveloperSetLowBalanceAlert
   * @request PUT:/developer/api/v1/dashboard/wallet/low-balance-alert
   * @secure
   * @response `200` `DeveloperSetLowBalanceAlertData`
   */
  developerSetLowBalanceAlert = (data: LowBalanceAlertDto, params: RequestParams = {}) =>
    this.request<DeveloperSetLowBalanceAlertData, any>({
      path: `/developer/api/v1/dashboard/wallet/low-balance-alert`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description The permanent transfer account: pending, active (with its number) or failed (with the reason).
   *
   * @tags developer-dashboard/wallet
   * @name DeveloperGetFundingAccount
   * @request GET:/developer/api/v1/dashboard/wallet/funding-account
   * @secure
   * @response `200` `DeveloperGetFundingAccountData`
   */
  developerGetFundingAccount = (params: RequestParams = {}) =>
    this.request<DeveloperGetFundingAccountData, any>({
      path: `/developer/api/v1/dashboard/wallet/funding-account`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Set up a permanent transfer account (owners, admins, finance). The BVN goes to Paystack to verify and is not stored here; Paystack confirms the account by webhook, usually in minutes.
   *
   * @tags developer-dashboard/wallet
   * @name DeveloperSetUpFundingAccount
   * @request POST:/developer/api/v1/dashboard/wallet/funding-account
   * @secure
   * @response `200` `DeveloperSetUpFundingAccountData`
   * @response `201` `PublicFundingAccountDto`
   */
  developerSetUpFundingAccount = (data: SetUpFundingAccountRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperSetUpFundingAccountData, any>({
      path: `/developer/api/v1/dashboard/wallet/funding-account`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description The auto top-up rule, the saved card (brand, last four, expiry) and the last charge.
   *
   * @tags developer-dashboard/wallet
   * @name DeveloperGetAutoTopUp
   * @request GET:/developer/api/v1/dashboard/wallet/auto-top-up
   * @secure
   * @response `200` `DeveloperGetAutoTopUpData`
   */
  developerGetAutoTopUp = (params: RequestParams = {}) =>
    this.request<DeveloperGetAutoTopUpData, any>({
      path: `/developer/api/v1/dashboard/wallet/auto-top-up`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Set the rule: top up `amount` when available money drops below `threshold`. Needs a saved card to turn on.
   *
   * @tags developer-dashboard/wallet
   * @name DeveloperConfigureAutoTopUp
   * @request PUT:/developer/api/v1/dashboard/wallet/auto-top-up
   * @secure
   * @response `200` `DeveloperConfigureAutoTopUpData`
   */
  developerConfigureAutoTopUp = (data: ConfigureAutoTopUpRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperConfigureAutoTopUpData, any>({
      path: `/developer/api/v1/dashboard/wallet/auto-top-up`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Save a card for auto top-up: a card-only Paystack checkout for a real top-up of `amount`. Once paid, Paystack keeps the card and Pickriders keeps the reusable authorization.
   *
   * @tags developer-dashboard/wallet
   * @name DeveloperSaveAutoTopUpCard
   * @request POST:/developer/api/v1/dashboard/wallet/auto-top-up/card
   * @secure
   * @response `200` `DeveloperSaveAutoTopUpCardData`
   * @response `201` `FundingSessionDto`
   */
  developerSaveAutoTopUpCard = (data: CreateFundingSessionRequestDto, params: RequestParams = {}) =>
    this.request<DeveloperSaveAutoTopUpCardData, any>({
      path: `/developer/api/v1/dashboard/wallet/auto-top-up/card`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Forget the saved card, here and at Paystack. Auto top-up turns off.
   *
   * @tags developer-dashboard/wallet
   * @name DeveloperRemoveAutoTopUpCard
   * @request DELETE:/developer/api/v1/dashboard/wallet/auto-top-up/card
   * @secure
   * @response `200` `DeveloperRemoveAutoTopUpCardData`
   */
  developerRemoveAutoTopUpCard = (params: RequestParams = {}) =>
    this.request<DeveloperRemoveAutoTopUpCardData, any>({
      path: `/developer/api/v1/dashboard/wallet/auto-top-up/card`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags developer-dashboard/webhook-endpoints
   * @name DashboardListWebhookEndpoints
   * @request GET:/developer/api/v1/dashboard/webhook-endpoints
   * @secure
   * @response `200` `DashboardListWebhookEndpointsData` A list object: { object, data, has_more, url }.
   */
  dashboardListWebhookEndpoints = (query: DashboardListWebhookEndpointsParams, params: RequestParams = {}) =>
    this.request<DashboardListWebhookEndpointsData, any>({
      path: `/developer/api/v1/dashboard/webhook-endpoints`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description The response is the only time the signing secret is shown. Live endpoints need approved live access.
   *
   * @tags developer-dashboard/webhook-endpoints
   * @name DashboardCreateWebhookEndpoint
   * @request POST:/developer/api/v1/dashboard/webhook-endpoints
   * @secure
   * @response `200` `DashboardCreateWebhookEndpointData`
   * @response `201` `PublicWebhookEndpointWithSecretDto`
   */
  dashboardCreateWebhookEndpoint = (data: DashboardCreateWebhookEndpointRequestDto, params: RequestParams = {}) =>
    this.request<DashboardCreateWebhookEndpointData, any>({
      path: `/developer/api/v1/dashboard/webhook-endpoints`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags developer-dashboard/webhook-endpoints
   * @name DashboardRetrieveWebhookEndpoint
   * @request GET:/developer/api/v1/dashboard/webhook-endpoints/{endpointId}
   * @secure
   * @response `200` `DashboardRetrieveWebhookEndpointData`
   */
  dashboardRetrieveWebhookEndpoint = (endpointId: string, params: RequestParams = {}) =>
    this.request<DashboardRetrieveWebhookEndpointData, any>({
      path: `/developer/api/v1/dashboard/webhook-endpoints/${endpointId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags developer-dashboard/webhook-endpoints
   * @name DashboardUpdateWebhookEndpoint
   * @request PATCH:/developer/api/v1/dashboard/webhook-endpoints/{endpointId}
   * @secure
   * @response `200` `DashboardUpdateWebhookEndpointData`
   */
  dashboardUpdateWebhookEndpoint = (
    endpointId: string,
    data: UpdateWebhookEndpointRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<DashboardUpdateWebhookEndpointData, any>({
      path: `/developer/api/v1/dashboard/webhook-endpoints/${endpointId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags developer-dashboard/webhook-endpoints
   * @name DashboardDeleteWebhookEndpoint
   * @request DELETE:/developer/api/v1/dashboard/webhook-endpoints/{endpointId}
   * @secure
   * @response `200` `DashboardDeleteWebhookEndpointData` { object: "webhook_endpoint", id, deleted: true }
   */
  dashboardDeleteWebhookEndpoint = (endpointId: string, params: RequestParams = {}) =>
    this.request<DashboardDeleteWebhookEndpointData, any>({
      path: `/developer/api/v1/dashboard/webhook-endpoints/${endpointId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description A new signing secret, shown once; the old one keeps signing for 24 hours.
   *
   * @tags developer-dashboard/webhook-endpoints
   * @name DashboardRollWebhookSecret
   * @request POST:/developer/api/v1/dashboard/webhook-endpoints/{endpointId}/roll-secret
   * @secure
   * @response `200` `DashboardRollWebhookSecretData`
   */
  dashboardRollWebhookSecret = (endpointId: string, params: RequestParams = {}) =>
    this.request<DashboardRollWebhookSecretData, any>({
      path: `/developer/api/v1/dashboard/webhook-endpoints/${endpointId}/roll-secret`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description The endpoint's delivery log, newest first: each event sent, its body, and every attempt.
   *
   * @tags developer-dashboard/webhook-endpoints
   * @name DashboardListWebhookDeliveries
   * @request GET:/developer/api/v1/dashboard/webhook-endpoints/{endpointId}/deliveries
   * @secure
   * @response `200` `DashboardListWebhookDeliveriesData` A list object: { object, data, has_more, url }.
   */
  dashboardListWebhookDeliveries = (
    { endpointId, ...query }: DashboardListWebhookDeliveriesParams,
    params: RequestParams = {},
  ) =>
    this.request<DashboardListWebhookDeliveriesData, any>({
      path: `/developer/api/v1/dashboard/webhook-endpoints/${endpointId}/deliveries`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Sends a `ping` event to the endpoint now and returns how it went.
   *
   * @tags developer-dashboard/webhook-endpoints
   * @name DashboardTestWebhookEndpoint
   * @request POST:/developer/api/v1/dashboard/webhook-endpoints/{endpointId}/test
   * @secure
   * @response `200` `DashboardTestWebhookEndpointData`
   */
  dashboardTestWebhookEndpoint = (endpointId: string, params: RequestParams = {}) =>
    this.request<DashboardTestWebhookEndpointData, any>({
      path: `/developer/api/v1/dashboard/webhook-endpoints/${endpointId}/test`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Sends one of the team's events to this endpoint again.
   *
   * @tags developer-dashboard/webhook-endpoints
   * @name DashboardResendWebhookEvent
   * @request POST:/developer/api/v1/dashboard/webhook-endpoints/{endpointId}/resend
   * @secure
   * @response `200` `DashboardResendWebhookEventData`
   */
  dashboardResendWebhookEvent = (
    endpointId: string,
    data: DashboardResendEventRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<DashboardResendWebhookEventData, any>({
      path: `/developer/api/v1/dashboard/webhook-endpoints/${endpointId}/resend`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Orders per day and how they ended, spend, API errors and webhook success, for a period and mode.
   *
   * @tags developer-dashboard/usage
   * @name DeveloperGetUsage
   * @request GET:/developer/api/v1/dashboard/usage
   * @secure
   * @response `200` `DeveloperGetUsageData`
   */
  developerGetUsage = (query: DeveloperGetUsageParams, params: RequestParams = {}) =>
    this.request<DeveloperGetUsageData, any>({
      path: `/developer/api/v1/dashboard/usage`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags developer-dashboard/service-areas
   * @name DashboardListServiceAreas
   * @request GET:/developer/api/v1/dashboard/service-areas
   * @secure
   * @response `200` `DashboardListServiceAreasData`
   */
  dashboardListServiceAreas = (params: RequestParams = {}) =>
    this.request<DashboardListServiceAreasData, any>({
      path: `/developer/api/v1/dashboard/service-areas`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description The team's orders in one mode, newest first. Filter by status, type, reference or date.
   *
   * @tags developer-dashboard/orders
   * @name DashboardListOrders
   * @request GET:/developer/api/v1/dashboard/orders
   * @secure
   * @response `200` `DashboardListOrdersData` A list object: { object, data, has_more, url }.
   */
  dashboardListOrders = (query: DashboardListOrdersParams, params: RequestParams = {}) =>
    this.request<DashboardListOrdersData, any>({
      path: `/developer/api/v1/dashboard/orders`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Creates the order: holds its price in the wallet and, unless scheduled, rings riders.
   *
   * @tags developer-dashboard/orders
   * @name DashboardCreateOrder
   * @request POST:/developer/api/v1/dashboard/orders
   * @secure
   * @response `201` `DashboardCreateOrderData`
   */
  dashboardCreateOrder = (query: DashboardCreateOrderParams, data: CreateOrderRequestDto, params: RequestParams = {}) =>
    this.request<DashboardCreateOrderData, any>({
      path: `/developer/api/v1/dashboard/orders`,
      method: "POST",
      query: query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags developer-dashboard/orders
   * @name DashboardRetrieveOrder
   * @request GET:/developer/api/v1/dashboard/orders/{id}
   * @secure
   * @response `200` `DashboardRetrieveOrderData`
   */
  dashboardRetrieveOrder = ({ id, ...query }: DashboardRetrieveOrderParams, params: RequestParams = {}) =>
    this.request<DashboardRetrieveOrderData, any>({
      path: `/developer/api/v1/dashboard/orders/${id}`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Where the rider is and the order's timeline, for the live map.
   *
   * @tags developer-dashboard/orders
   * @name DashboardTrackOrder
   * @request GET:/developer/api/v1/dashboard/orders/{id}/tracking
   * @secure
   * @response `200` `DashboardTrackOrderData`
   */
  dashboardTrackOrder = ({ id, ...query }: DashboardTrackOrderParams, params: RequestParams = {}) =>
    this.request<DashboardTrackOrderData, any>({
      path: `/developer/api/v1/dashboard/orders/${id}/tracking`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description The price before creating it, held for 15 minutes.
   *
   * @tags developer-dashboard/orders
   * @name DashboardCreateQuote
   * @request POST:/developer/api/v1/dashboard/quotes
   * @secure
   * @response `200` `DashboardCreateQuoteData`
   */
  dashboardCreateQuote = (query: DashboardCreateQuoteParams, data: CreateQuoteRequestDto, params: RequestParams = {}) =>
    this.request<DashboardCreateQuoteData, any>({
      path: `/developer/api/v1/dashboard/quotes`,
      method: "POST",
      query: query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags developer-dashboard/orders
   * @name DashboardCancelOrder
   * @request POST:/developer/api/v1/dashboard/orders/{id}/cancel
   * @secure
   * @response `200` `DashboardCancelOrderData`
   */
  dashboardCancelOrder = (
    { id, ...query }: DashboardCancelOrderParams,
    data: DeveloperCancelOrderRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<DashboardCancelOrderData, any>({
      path: `/developer/api/v1/dashboard/orders/${id}/cancel`,
      method: "POST",
      query: query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Test mode only: one step as the test rider would, or straight to `to`.
   *
   * @tags developer-dashboard/orders
   * @name DashboardAdvanceTestOrder
   * @request POST:/developer/api/v1/dashboard/orders/{id}/advance
   * @secure
   * @response `200` `DashboardAdvanceTestOrderData`
   */
  dashboardAdvanceTestOrder = (id: string, data: AdvanceOrderRequestDto, params: RequestParams = {}) =>
    this.request<DashboardAdvanceTestOrderData, any>({
      path: `/developer/api/v1/dashboard/orders/${id}/advance`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Newest first, 20 a page. Filter by mode, outcome, method, path, key, time or request id.
   *
   * @tags developer-dashboard/request-logs
   * @name DeveloperListRequestLogs
   * @request GET:/developer/api/v1/dashboard/request-logs
   * @secure
   * @response `200` `DeveloperListRequestLogsData`
   */
  developerListRequestLogs = (query: DeveloperListRequestLogsParams, params: RequestParams = {}) =>
    this.request<DeveloperListRequestLogsData, any>({
      path: `/developer/api/v1/dashboard/request-logs`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description One request with its query, redacted request and response bodies, IP and user agent.
   *
   * @tags developer-dashboard/request-logs
   * @name DeveloperGetRequestLog
   * @request GET:/developer/api/v1/dashboard/request-logs/{logId}
   * @secure
   * @response `200` `DeveloperGetRequestLogData`
   */
  developerGetRequestLog = (logId: string, params: RequestParams = {}) =>
    this.request<DeveloperGetRequestLogData, any>({
      path: `/developer/api/v1/dashboard/request-logs/${logId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
