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
  DashboardCreateOrderData,
  DashboardCreateQuoteData,
  DashboardCreateWebhookEndpointData,
  DashboardCreateWebhookEndpointRequestDto,
  DashboardDeleteWebhookEndpointData,
  DashboardListOrdersData,
  DashboardListServiceAreasData,
  DashboardListWebhookDeliveriesData,
  DashboardListWebhookEndpointsData,
  DashboardResendEventRequestDto,
  DashboardResendWebhookEventData,
  DashboardRetrieveOrderData,
  DashboardRetrieveWebhookEndpointData,
  DashboardRollWebhookSecretData,
  DashboardTestWebhookEndpointData,
  DashboardTrackOrderData,
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
  DeveloperGetWalletData,
  DeveloperLeaveTeamData,
  DeveloperListApiKeysData,
  DeveloperListAuditLogsData,
  DeveloperListInvitationsData,
  DeveloperListMembersData,
  DeveloperListRequestLogsData,
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

export namespace Developer {
  /**
   * @description Creates a developer account, its first team (owned by the new user) and signs them in.
   * @tags developer-dashboard/auth
   * @name DeveloperSignup
   * @request POST:/developer/api/v1/dashboard/auth/signup
   * @response `200` `DeveloperSignupData`
   * @response `201` `DeveloperSessionResponseDto`
   * @response `409` `any` EMAIL_TAKEN or PHONE_TAKEN, with `param` set.
   */
  export namespace DeveloperSignup {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DeveloperSignupRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = DeveloperSignupData;
  }

  /**
   * @description Works before email and phone are verified: test mode is available straight away.
   * @tags developer-dashboard/auth
   * @name DeveloperLogin
   * @request POST:/developer/api/v1/dashboard/auth/login
   * @response `200` `DeveloperLoginData`
   * @response `401` `any` INVALID_CREDENTIALS
   */
  export namespace DeveloperLogin {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DeveloperLoginRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = DeveloperLoginData;
  }

  /**
   * @description The signed-in developer and their teams, read fresh.
   * @tags developer-dashboard/auth
   * @name DeveloperMe
   * @request GET:/developer/api/v1/dashboard/auth/me
   * @secure
   * @response `200` `DeveloperMeData`
   */
  export namespace DeveloperMe {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeveloperMeData;
  }

  /**
   * @description Emails a verification code to the signed-in developer (sign-up already sent the first). Pass `email` to correct an unverified address first. A new code replaces the last; 429 `code_recently_sent` during the cooldown (`resendAfter` seconds).
   * @tags developer-dashboard/auth
   * @name DeveloperSendEmailCode
   * @request POST:/developer/api/v1/dashboard/auth/verification/email/send
   * @secure
   * @response `200` `DeveloperSendEmailCodeData`
   * @response `409` `any` EMAIL_TAKEN
   * @response `429` `any` code_recently_sent
   */
  export namespace DeveloperSendEmailCode {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DeveloperSendEmailCodeRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = DeveloperSendEmailCodeData;
  }

  /**
   * @description Verifies the email with the emailed code. Returns the refreshed `me`.
   * @tags developer-dashboard/auth
   * @name DeveloperVerifyEmail
   * @request POST:/developer/api/v1/dashboard/auth/verification/email
   * @secure
   * @response `200` `DeveloperVerifyEmailData`
   * @response `400` `any` code_incorrect, code_expired or code_invalid, with param `code`
   * @response `429` `any` too_many_attempts: ask for a new code
   */
  export namespace DeveloperVerifyEmail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DeveloperVerifyCodeRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = DeveloperVerifyEmailData;
  }

  /**
   * @description Texts a verification code to the developer's phone. Pass `phone` to correct an unverified number first.
   * @tags developer-dashboard/auth
   * @name DeveloperSendPhoneCode
   * @request POST:/developer/api/v1/dashboard/auth/verification/phone/send
   * @secure
   * @response `200` `DeveloperSendPhoneCodeData`
   * @response `409` `any` PHONE_TAKEN
   * @response `429` `any` code_recently_sent
   */
  export namespace DeveloperSendPhoneCode {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DeveloperSendPhoneCodeRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = DeveloperSendPhoneCodeData;
  }

  /**
   * @description Verifies the phone with the texted code. Returns the refreshed `me`.
   * @tags developer-dashboard/auth
   * @name DeveloperVerifyPhone
   * @request POST:/developer/api/v1/dashboard/auth/verification/phone
   * @secure
   * @response `200` `DeveloperVerifyPhoneData`
   * @response `400` `any` code_incorrect, code_expired or code_invalid, with param `code`
   * @response `429` `any` too_many_attempts: ask for a new code
   */
  export namespace DeveloperVerifyPhone {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DeveloperVerifyCodeRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = DeveloperVerifyPhoneData;
  }

  /**
   * @description Settings: the name on the account. Returns the refreshed `me`.
   * @tags developer-dashboard/auth
   * @name DeveloperUpdateProfile
   * @request PATCH:/developer/api/v1/dashboard/auth/profile
   * @secure
   * @response `200` `DeveloperUpdateProfileData`
   */
  export namespace DeveloperUpdateProfile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateDeveloperProfileRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = DeveloperUpdateProfileData;
  }

  /**
   * @description Settings: change the email. A verified one only changes once the code sent to the new address is entered (`pendingEmail` meanwhile); an unverified one is corrected in place.
   * @tags developer-dashboard/auth
   * @name DeveloperStartEmailChange
   * @request POST:/developer/api/v1/dashboard/auth/email/change
   * @secure
   * @response `200` `DeveloperStartEmailChangeData`
   * @response `409` `any` EMAIL_TAKEN
   */
  export namespace DeveloperStartEmailChange {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DeveloperChangeEmailRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = DeveloperStartEmailChangeData;
  }

  /**
   * No description
   * @tags developer-dashboard/auth
   * @name DeveloperCancelEmailChange
   * @request DELETE:/developer/api/v1/dashboard/auth/email/change
   * @secure
   * @response `200` `DeveloperCancelEmailChangeData`
   */
  export namespace DeveloperCancelEmailChange {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeveloperCancelEmailChangeData;
  }

  /**
   * No description
   * @tags developer-dashboard/auth
   * @name DeveloperConfirmEmailChange
   * @request POST:/developer/api/v1/dashboard/auth/email/change/verify
   * @secure
   * @response `200` `DeveloperConfirmEmailChangeData`
   */
  export namespace DeveloperConfirmEmailChange {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DeveloperVerifyCodeRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = DeveloperConfirmEmailChangeData;
  }

  /**
   * @description Settings: change the phone number. A verified one only changes once the code texted to the new number is entered (`pendingPhone` meanwhile), so live access never rests on an unproved number.
   * @tags developer-dashboard/auth
   * @name DeveloperStartPhoneChange
   * @request POST:/developer/api/v1/dashboard/auth/phone/change
   * @secure
   * @response `200` `DeveloperStartPhoneChangeData`
   * @response `409` `any` PHONE_TAKEN
   */
  export namespace DeveloperStartPhoneChange {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DeveloperChangePhoneRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = DeveloperStartPhoneChangeData;
  }

  /**
   * No description
   * @tags developer-dashboard/auth
   * @name DeveloperCancelPhoneChange
   * @request DELETE:/developer/api/v1/dashboard/auth/phone/change
   * @secure
   * @response `200` `DeveloperCancelPhoneChangeData`
   */
  export namespace DeveloperCancelPhoneChange {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeveloperCancelPhoneChangeData;
  }

  /**
   * No description
   * @tags developer-dashboard/auth
   * @name DeveloperConfirmPhoneChange
   * @request POST:/developer/api/v1/dashboard/auth/phone/change/verify
   * @secure
   * @response `200` `DeveloperConfirmPhoneChangeData`
   */
  export namespace DeveloperConfirmPhoneChange {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DeveloperVerifyCodeRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = DeveloperConfirmPhoneChangeData;
  }

  /**
   * @description Emails a reset code. Answers the same whether or not the account exists. Works before the email is verified.
   * @tags developer-dashboard/auth
   * @name DeveloperForgotPassword
   * @request POST:/developer/api/v1/dashboard/auth/password/forgot
   * @response `200` `DeveloperForgotPasswordData`
   */
  export namespace DeveloperForgotPassword {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DeveloperForgotPasswordRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = DeveloperForgotPasswordData;
  }

  /**
   * @description Sets a new password with the reset code and signs in. Also marks the email verified.
   * @tags developer-dashboard/auth
   * @name DeveloperResetPassword
   * @request POST:/developer/api/v1/dashboard/auth/password/reset
   * @response `200` `DeveloperResetPasswordData`
   * @response `400` `any` code_incorrect, code_expired or code_invalid, with param `code`
   * @response `429` `any` too_many_attempts: ask for a new code
   */
  export namespace DeveloperResetPassword {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DeveloperResetPasswordRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = DeveloperResetPasswordData;
  }

  /**
   * @description Every active team, in the order joined, with your role and permissions in each.
   * @tags developer-dashboard/teams
   * @name DeveloperListTeams
   * @request GET:/developer/api/v1/dashboard/teams
   * @secure
   * @response `200` `DeveloperListTeamsData`
   */
  export namespace DeveloperListTeams {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeveloperListTeamsData;
  }

  /**
   * @description Another team you own, e.g. one per client or per environment. Up to 10.
   * @tags developer-dashboard/teams
   * @name DeveloperCreateTeam
   * @request POST:/developer/api/v1/dashboard/teams
   * @secure
   * @response `200` `DeveloperCreateTeamData`
   * @response `201` `DeveloperTeamSummaryDto`
   */
  export namespace DeveloperCreateTeam {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateDeveloperTeamRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = DeveloperCreateTeamData;
  }

  /**
   * @description The X-Team-Id team, as the switcher shows it.
   * @tags developer-dashboard/teams
   * @name DeveloperCurrentTeam
   * @request GET:/developer/api/v1/dashboard/teams/current
   * @secure
   * @response `200` `DeveloperCurrentTeamData`
   */
  export namespace DeveloperCurrentTeam {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperCurrentTeamData;
  }

  /**
   * @description Open invitations, newest first, including expired ones (resend those).
   * @tags developer-dashboard/team
   * @name DeveloperListInvitations
   * @request GET:/developer/api/v1/dashboard/team/invitations
   * @secure
   * @response `200` `DeveloperListInvitationsData`
   */
  export namespace DeveloperListInvitations {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperListInvitationsData;
  }

  /**
   * @description Emails a link valid for 7 days. 409 if the address is already a member or already invited.
   * @tags developer-dashboard/team
   * @name DeveloperCreateInvitation
   * @request POST:/developer/api/v1/dashboard/team/invitations
   * @secure
   * @response `200` `DeveloperCreateInvitationData`
   * @response `201` `TeamInvitationDto`
   */
  export namespace DeveloperCreateInvitation {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateTeamInvitationRequestDto;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperCreateInvitationData;
  }

  /**
   * @description A fresh link and another 7 days; the previous link stops working. At most once a minute.
   * @tags developer-dashboard/team
   * @name DeveloperResendInvitation
   * @request POST:/developer/api/v1/dashboard/team/invitations/{invitationId}/resend
   * @secure
   * @response `200` `DeveloperResendInvitationData`
   */
  export namespace DeveloperResendInvitation {
    export type RequestParams = {
      invitationId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperResendInvitationData;
  }

  /**
   * @description Withdraws an open invitation; its link stops working.
   * @tags developer-dashboard/team
   * @name DeveloperRevokeInvitation
   * @request DELETE:/developer/api/v1/dashboard/team/invitations/{invitationId}
   * @secure
   * @response `200` `DeveloperRevokeInvitationData`
   */
  export namespace DeveloperRevokeInvitation {
    export type RequestParams = {
      invitationId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperRevokeInvitationData;
  }

  /**
   * @description Team, role and whether to offer sign-in or sign-up. 404 for an unknown link; 410 once it can't be used.
   * @tags developer-dashboard/invitations
   * @name DeveloperPreviewInvitation
   * @request POST:/developer/api/v1/dashboard/invitations/preview
   * @response `200` `DeveloperPreviewInvitationData`
   */
  export namespace DeveloperPreviewInvitation {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TeamInvitationTokenRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = DeveloperPreviewInvitationData;
  }

  /**
   * @description Joins the team as the signed-in developer. Their email must be the invited one.
   * @tags developer-dashboard/invitations
   * @name DeveloperAcceptInvitation
   * @request POST:/developer/api/v1/dashboard/invitations/accept
   * @secure
   * @response `200` `DeveloperAcceptInvitationData`
   */
  export namespace DeveloperAcceptInvitation {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TeamInvitationTokenRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = DeveloperAcceptInvitationData;
  }

  /**
   * @description No account needed: the link itself is the proof.
   * @tags developer-dashboard/invitations
   * @name DeveloperDeclineInvitation
   * @request POST:/developer/api/v1/dashboard/invitations/decline
   * @response `204` `DeveloperDeclineInvitationData`
   */
  export namespace DeveloperDeclineInvitation {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TeamInvitationTokenRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = DeveloperDeclineInvitationData;
  }

  /**
   * @description Active members, owner first.
   * @tags developer-dashboard/team
   * @name DeveloperListMembers
   * @request GET:/developer/api/v1/dashboard/team/members
   * @secure
   * @response `200` `DeveloperListMembersData`
   */
  export namespace DeveloperListMembers {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperListMembersData;
  }

  /**
   * @description Not your own role, not the owner's, and never above your own.
   * @tags developer-dashboard/team
   * @name DeveloperUpdateMemberRole
   * @request PATCH:/developer/api/v1/dashboard/team/members/{userId}
   * @secure
   * @response `200` `DeveloperUpdateMemberRoleData`
   */
  export namespace DeveloperUpdateMemberRole {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateTeamMemberRoleRequestDto;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperUpdateMemberRoleData;
  }

  /**
   * @description Their access ends on their next request. The owner can't be removed.
   * @tags developer-dashboard/team
   * @name DeveloperRemoveMember
   * @request DELETE:/developer/api/v1/dashboard/team/members/{userId}
   * @secure
   * @response `204` `DeveloperRemoveMemberData`
   */
  export namespace DeveloperRemoveMember {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperRemoveMemberData;
  }

  /**
   * @description Leave the team yourself. The owner transfers ownership first.
   * @tags developer-dashboard/team
   * @name DeveloperLeaveTeam
   * @request POST:/developer/api/v1/dashboard/team/members/leave
   * @secure
   * @response `204` `DeveloperLeaveTeamData`
   */
  export namespace DeveloperLeaveTeam {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperLeaveTeamData;
  }

  /**
   * @description The owner makes an active member the owner and becomes an admin. Returns the updated members.
   * @tags developer-dashboard/team
   * @name DeveloperTransferOwnership
   * @request POST:/developer/api/v1/dashboard/team/members/transfer-ownership
   * @secure
   * @response `200` `DeveloperTransferOwnershipData`
   */
  export namespace DeveloperTransferOwnership {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferTeamOwnershipRequestDto;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperTransferOwnershipData;
  }

  /**
   * @description The X-Team-Id team's audit trail, newest first: who changed what, with before and after values.
   * @tags developer-dashboard/audit-logs
   * @name DeveloperListAuditLogs
   * @request GET:/developer/api/v1/dashboard/audit-logs
   * @secure
   * @response `200` `DeveloperListAuditLogsData`
   */
  export namespace DeveloperListAuditLogs {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @max 100
       * @default 20
       */
      limit?: number;
      /** Id of the last object on the previous page; returns the objects after it. */
      starting_after?: string;
      /** Id of the first object on the next page; returns the objects before it. */
      ending_before?: string;
      /**
       * One event (`member.removed`) or an area ending in a dot (`member.`).
       * @pattern /^[a-z_]+\.([a-z_]+)?$/
       * @example "member."
       */
      event?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperListAuditLogsData;
  }

  /**
   * @description Any member can read it. `canRequestLive` and `liveStatus` drive the get-started checklist.
   * @tags developer-dashboard/account
   * @name DeveloperGetAccount
   * @request GET:/developer/api/v1/dashboard/account
   * @secure
   * @response `200` `DeveloperGetAccountData`
   */
  export namespace DeveloperGetAccount {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperGetAccountData;
  }

  /**
   * @description Owners and admins. Send only the fields that change; `null` clears one.
   * @tags developer-dashboard/account
   * @name DeveloperUpdateAccount
   * @request PATCH:/developer/api/v1/dashboard/account
   * @secure
   * @response `200` `DeveloperUpdateAccountData`
   */
  export namespace DeveloperUpdateAccount {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateDeveloperAccountRequestDto;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperUpdateAccountData;
  }

  /**
   * @description The get-started steps done outside the account: a test key, a test order, a webhook endpoint. With GET dashboard/account (verification, live status), everything the checklist shows.
   * @tags developer-dashboard/account
   * @name DeveloperGetOnboarding
   * @request GET:/developer/api/v1/dashboard/account/onboarding
   * @secure
   * @response `200` `DeveloperGetOnboardingData`
   */
  export namespace DeveloperGetOnboarding {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperGetOnboardingData;
  }

  /**
   * @description Ask Pickriders for live access. Needs the team owner's email and phone verified (`canRequestLive`), and is refused while a request is pending, approved or suspended. A rejected team can fix its profile and ask again. Returns the account, now PENDING.
   * @tags developer-dashboard/account
   * @name DeveloperRequestLiveAccess
   * @request POST:/developer/api/v1/dashboard/account/live-access
   * @secure
   * @response `200` `DeveloperRequestLiveAccessData`
   */
  export namespace DeveloperRequestLiveAccess {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperRequestLiveAccessData;
  }

  /**
   * @description Keys that still work, newest first: active ones, and rolled ones still inside their grace period.
   * @tags developer-dashboard/api-keys
   * @name DeveloperListApiKeys
   * @request GET:/developer/api/v1/dashboard/api-keys
   * @secure
   * @response `200` `DeveloperListApiKeysData`
   */
  export namespace DeveloperListApiKeys {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Only live or only test keys. */
      livemode?: "true" | "false";
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperListApiKeysData;
  }

  /**
   * @description A new key. The response is the only time its secret is shown. Live keys need approved live access.
   * @tags developer-dashboard/api-keys
   * @name DeveloperCreateApiKey
   * @request POST:/developer/api/v1/dashboard/api-keys
   * @secure
   * @response `200` `DeveloperCreateApiKeyData`
   * @response `201` `DeveloperApiKeySecretDto`
   */
  export namespace DeveloperCreateApiKey {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateDeveloperApiKeyRequestDto;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperCreateApiKeyData;
  }

  /**
   * @description Replace a key with a new one. The old key keeps working for `expiresIn`; the new secret is shown once.
   * @tags developer-dashboard/api-keys
   * @name DeveloperRollApiKey
   * @request POST:/developer/api/v1/dashboard/api-keys/{keyId}/roll
   * @secure
   * @response `200` `DeveloperRollApiKeyData`
   */
  export namespace DeveloperRollApiKey {
    export type RequestParams = {
      keyId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RollDeveloperApiKeyRequestDto;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperRollApiKeyData;
  }

  /**
   * @description Stop a key at once.
   * @tags developer-dashboard/api-keys
   * @name DeveloperRevokeApiKey
   * @request POST:/developer/api/v1/dashboard/api-keys/{keyId}/revoke
   * @secure
   * @response `200` `DeveloperRevokeApiKeyData`
   */
  export namespace DeveloperRevokeApiKey {
    export type RequestParams = {
      keyId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperRevokeApiKeyData;
  }

  /**
   * No description
   * @tags developer-dashboard/ip-allowlist
   * @name DeveloperGetIpAllowlist
   * @request GET:/developer/api/v1/dashboard/ip-allowlist
   * @secure
   * @response `200` `DeveloperGetIpAllowlistData`
   */
  export namespace DeveloperGetIpAllowlist {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperGetIpAllowlistData;
  }

  /**
   * @description Replace the list. Requests from other IPs are refused at once. Send [] to allow any IP.
   * @tags developer-dashboard/ip-allowlist
   * @name DeveloperUpdateIpAllowlist
   * @request PUT:/developer/api/v1/dashboard/ip-allowlist
   * @secure
   * @response `200` `DeveloperUpdateIpAllowlistData`
   */
  export namespace DeveloperUpdateIpAllowlist {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateIpAllowlistRequestDto;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperUpdateIpAllowlistData;
  }

  /**
   * @description `livemode=false` (default) is the test wallet; `true` the live one, which exists once live access is approved.
   * @tags developer-dashboard/wallet
   * @name DeveloperGetWallet
   * @request GET:/developer/api/v1/dashboard/wallet
   * @secure
   * @response `200` `DeveloperGetWalletData`
   */
  export namespace DeveloperGetWallet {
    export type RequestParams = {};
    export type RequestQuery = {
      livemode?: "true" | "false";
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperGetWalletData;
  }

  /**
   * @description A card checkout for the live wallet (owners, admins and finance). Needs approved live access.
   * @tags developer-dashboard/wallet
   * @name DeveloperDashboardCreateFundingSession
   * @request POST:/developer/api/v1/dashboard/wallet/funding-sessions
   * @secure
   * @response `200` `DeveloperDashboardCreateFundingSessionData`
   * @response `201` `FundingSessionDto`
   */
  export namespace DeveloperDashboardCreateFundingSession {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateFundingSessionRequestDto;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperDashboardCreateFundingSessionData;
  }

  /**
   * @description Play money for the test wallet, as POST /test/wallet/fund does with a test key: up to ₦10,000,000 a top-up. Recorded as a "Test top-up" transaction. Never touches the live wallet.
   * @tags developer-dashboard/wallet
   * @name DeveloperAddTestFunds
   * @request POST:/developer/api/v1/dashboard/wallet/test-funds
   * @secure
   * @response `200` `DeveloperAddTestFundsData`
   */
  export namespace DeveloperAddTestFunds {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FundTestWalletRequestDto;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperAddTestFundsData;
  }

  /**
   * @description The wallet's transactions, newest first. `livemode=true` for the live wallet.
   * @tags developer-dashboard/wallet
   * @name DeveloperDashboardListWalletTransactions
   * @request GET:/developer/api/v1/dashboard/wallet/transactions
   * @secure
   * @response `200` `DeveloperDashboardListWalletTransactionsData` A list object: { object, data, has_more, url }.
   */
  export namespace DeveloperDashboardListWalletTransactions {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @max 100
       * @default 20
       */
      limit?: number;
      /** Id of the last object on the previous page; returns the objects after it. */
      starting_after?: string;
      /** Id of the first object on the next page; returns the objects before it. */
      ending_before?: string;
      type?: "credit" | "debit";
      /**
       * created[gte] and/or created[lte]: ISO 8601 dates or Unix seconds.
       * @example {"gte":"2026-11-01T00:00:00Z"}
       */
      created?: object;
      livemode?: "true" | "false";
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperDashboardListWalletTransactionsData;
  }

  /**
   * @description The live wallet's low-balance alert threshold (kobo), or null when it's off.
   * @tags developer-dashboard/wallet
   * @name DeveloperGetLowBalanceAlert
   * @request GET:/developer/api/v1/dashboard/wallet/low-balance-alert
   * @secure
   * @response `200` `DeveloperGetLowBalanceAlertData`
   */
  export namespace DeveloperGetLowBalanceAlert {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperGetLowBalanceAlertData;
  }

  /**
   * @description Set or turn off (null) the alert. Owners, admins and finance.
   * @tags developer-dashboard/wallet
   * @name DeveloperSetLowBalanceAlert
   * @request PUT:/developer/api/v1/dashboard/wallet/low-balance-alert
   * @secure
   * @response `200` `DeveloperSetLowBalanceAlertData`
   */
  export namespace DeveloperSetLowBalanceAlert {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LowBalanceAlertDto;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperSetLowBalanceAlertData;
  }

  /**
   * @description The permanent transfer account: pending, active (with its number) or failed (with the reason).
   * @tags developer-dashboard/wallet
   * @name DeveloperGetFundingAccount
   * @request GET:/developer/api/v1/dashboard/wallet/funding-account
   * @secure
   * @response `200` `DeveloperGetFundingAccountData`
   */
  export namespace DeveloperGetFundingAccount {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperGetFundingAccountData;
  }

  /**
   * @description Set up a permanent transfer account (owners, admins, finance). The BVN goes to Paystack to verify and is not stored here; Paystack confirms the account by webhook, usually in minutes.
   * @tags developer-dashboard/wallet
   * @name DeveloperSetUpFundingAccount
   * @request POST:/developer/api/v1/dashboard/wallet/funding-account
   * @secure
   * @response `200` `DeveloperSetUpFundingAccountData`
   * @response `201` `PublicFundingAccountDto`
   */
  export namespace DeveloperSetUpFundingAccount {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SetUpFundingAccountRequestDto;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperSetUpFundingAccountData;
  }

  /**
   * @description The auto top-up rule, the saved card (brand, last four, expiry) and the last charge.
   * @tags developer-dashboard/wallet
   * @name DeveloperGetAutoTopUp
   * @request GET:/developer/api/v1/dashboard/wallet/auto-top-up
   * @secure
   * @response `200` `DeveloperGetAutoTopUpData`
   */
  export namespace DeveloperGetAutoTopUp {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperGetAutoTopUpData;
  }

  /**
   * @description Set the rule: top up `amount` when available money drops below `threshold`. Needs a saved card to turn on.
   * @tags developer-dashboard/wallet
   * @name DeveloperConfigureAutoTopUp
   * @request PUT:/developer/api/v1/dashboard/wallet/auto-top-up
   * @secure
   * @response `200` `DeveloperConfigureAutoTopUpData`
   */
  export namespace DeveloperConfigureAutoTopUp {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ConfigureAutoTopUpRequestDto;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperConfigureAutoTopUpData;
  }

  /**
   * @description Save a card for auto top-up: a card-only Paystack checkout for a real top-up of `amount`. Once paid, Paystack keeps the card and Pickriders keeps the reusable authorization.
   * @tags developer-dashboard/wallet
   * @name DeveloperSaveAutoTopUpCard
   * @request POST:/developer/api/v1/dashboard/wallet/auto-top-up/card
   * @secure
   * @response `200` `DeveloperSaveAutoTopUpCardData`
   * @response `201` `FundingSessionDto`
   */
  export namespace DeveloperSaveAutoTopUpCard {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateFundingSessionRequestDto;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperSaveAutoTopUpCardData;
  }

  /**
   * @description Forget the saved card, here and at Paystack. Auto top-up turns off.
   * @tags developer-dashboard/wallet
   * @name DeveloperRemoveAutoTopUpCard
   * @request DELETE:/developer/api/v1/dashboard/wallet/auto-top-up/card
   * @secure
   * @response `200` `DeveloperRemoveAutoTopUpCardData`
   */
  export namespace DeveloperRemoveAutoTopUpCard {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperRemoveAutoTopUpCardData;
  }

  /**
   * No description
   * @tags developer-dashboard/webhook-endpoints
   * @name DashboardListWebhookEndpoints
   * @request GET:/developer/api/v1/dashboard/webhook-endpoints
   * @secure
   * @response `200` `DashboardListWebhookEndpointsData` A list object: { object, data, has_more, url }.
   */
  export namespace DashboardListWebhookEndpoints {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @max 100
       * @default 20
       */
      limit?: number;
      /** Id of the last object on the previous page; returns the objects after it. */
      starting_after?: string;
      /** Id of the first object on the next page; returns the objects before it. */
      ending_before?: string;
      /** Only live or only test. */
      livemode?: "true" | "false";
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DashboardListWebhookEndpointsData;
  }

  /**
   * @description The response is the only time the signing secret is shown. Live endpoints need approved live access.
   * @tags developer-dashboard/webhook-endpoints
   * @name DashboardCreateWebhookEndpoint
   * @request POST:/developer/api/v1/dashboard/webhook-endpoints
   * @secure
   * @response `200` `DashboardCreateWebhookEndpointData`
   * @response `201` `PublicWebhookEndpointWithSecretDto`
   */
  export namespace DashboardCreateWebhookEndpoint {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DashboardCreateWebhookEndpointRequestDto;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DashboardCreateWebhookEndpointData;
  }

  /**
   * No description
   * @tags developer-dashboard/webhook-endpoints
   * @name DashboardRetrieveWebhookEndpoint
   * @request GET:/developer/api/v1/dashboard/webhook-endpoints/{endpointId}
   * @secure
   * @response `200` `DashboardRetrieveWebhookEndpointData`
   */
  export namespace DashboardRetrieveWebhookEndpoint {
    export type RequestParams = {
      /** @example "we_6560f0c2a1b2c3d4e5f60718" */
      endpointId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DashboardRetrieveWebhookEndpointData;
  }

  /**
   * No description
   * @tags developer-dashboard/webhook-endpoints
   * @name DashboardUpdateWebhookEndpoint
   * @request PATCH:/developer/api/v1/dashboard/webhook-endpoints/{endpointId}
   * @secure
   * @response `200` `DashboardUpdateWebhookEndpointData`
   */
  export namespace DashboardUpdateWebhookEndpoint {
    export type RequestParams = {
      /** @example "we_6560f0c2a1b2c3d4e5f60718" */
      endpointId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateWebhookEndpointRequestDto;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DashboardUpdateWebhookEndpointData;
  }

  /**
   * No description
   * @tags developer-dashboard/webhook-endpoints
   * @name DashboardDeleteWebhookEndpoint
   * @request DELETE:/developer/api/v1/dashboard/webhook-endpoints/{endpointId}
   * @secure
   * @response `200` `DashboardDeleteWebhookEndpointData` { object: "webhook_endpoint", id, deleted: true }
   */
  export namespace DashboardDeleteWebhookEndpoint {
    export type RequestParams = {
      /** @example "we_6560f0c2a1b2c3d4e5f60718" */
      endpointId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DashboardDeleteWebhookEndpointData;
  }

  /**
   * @description A new signing secret, shown once; the old one keeps signing for 24 hours.
   * @tags developer-dashboard/webhook-endpoints
   * @name DashboardRollWebhookSecret
   * @request POST:/developer/api/v1/dashboard/webhook-endpoints/{endpointId}/roll-secret
   * @secure
   * @response `200` `DashboardRollWebhookSecretData`
   */
  export namespace DashboardRollWebhookSecret {
    export type RequestParams = {
      /** @example "we_6560f0c2a1b2c3d4e5f60718" */
      endpointId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DashboardRollWebhookSecretData;
  }

  /**
   * @description The endpoint's delivery log, newest first: each event sent, its body, and every attempt.
   * @tags developer-dashboard/webhook-endpoints
   * @name DashboardListWebhookDeliveries
   * @request GET:/developer/api/v1/dashboard/webhook-endpoints/{endpointId}/deliveries
   * @secure
   * @response `200` `DashboardListWebhookDeliveriesData` A list object: { object, data, has_more, url }.
   */
  export namespace DashboardListWebhookDeliveries {
    export type RequestParams = {
      /** @example "we_6560f0c2a1b2c3d4e5f60718" */
      endpointId: string;
    };
    export type RequestQuery = {
      /**
       * @min 1
       * @max 100
       * @default 20
       */
      limit?: number;
      /** Id of the last object on the previous page; returns the objects after it. */
      starting_after?: string;
      /** Id of the first object on the next page; returns the objects before it. */
      ending_before?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DashboardListWebhookDeliveriesData;
  }

  /**
   * @description Sends a `ping` event to the endpoint now and returns how it went.
   * @tags developer-dashboard/webhook-endpoints
   * @name DashboardTestWebhookEndpoint
   * @request POST:/developer/api/v1/dashboard/webhook-endpoints/{endpointId}/test
   * @secure
   * @response `200` `DashboardTestWebhookEndpointData`
   */
  export namespace DashboardTestWebhookEndpoint {
    export type RequestParams = {
      /** @example "we_6560f0c2a1b2c3d4e5f60718" */
      endpointId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DashboardTestWebhookEndpointData;
  }

  /**
   * @description Sends one of the team's events to this endpoint again.
   * @tags developer-dashboard/webhook-endpoints
   * @name DashboardResendWebhookEvent
   * @request POST:/developer/api/v1/dashboard/webhook-endpoints/{endpointId}/resend
   * @secure
   * @response `200` `DashboardResendWebhookEventData`
   */
  export namespace DashboardResendWebhookEvent {
    export type RequestParams = {
      /** @example "we_6560f0c2a1b2c3d4e5f60718" */
      endpointId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = DashboardResendEventRequestDto;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DashboardResendWebhookEventData;
  }

  /**
   * @description Orders per day and how they ended, spend, API errors and webhook success, for a period and mode.
   * @tags developer-dashboard/usage
   * @name DeveloperGetUsage
   * @request GET:/developer/api/v1/dashboard/usage
   * @secure
   * @response `200` `DeveloperGetUsageData`
   */
  export namespace DeveloperGetUsage {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * true for live mode.
       * @default "false"
       */
      livemode?: "true" | "false";
      /**
       * The last 7, 30 or 90 days.
       * @default "30d"
       */
      period?: "7d" | "30d" | "90d";
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperGetUsageData;
  }

  /**
   * No description
   * @tags developer-dashboard/service-areas
   * @name DashboardListServiceAreas
   * @request GET:/developer/api/v1/dashboard/service-areas
   * @secure
   * @response `200` `DashboardListServiceAreasData`
   */
  export namespace DashboardListServiceAreas {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DashboardListServiceAreasData;
  }

  /**
   * @description The team's orders in one mode, newest first. Filter by status, type, reference or date.
   * @tags developer-dashboard/orders
   * @name DashboardListOrders
   * @request GET:/developer/api/v1/dashboard/orders
   * @secure
   * @response `200` `DashboardListOrdersData` A list object: { object, data, has_more, url }.
   */
  export namespace DashboardListOrders {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @max 100
       * @default 20
       */
      limit?: number;
      /** Id of the last object on the previous page; returns the objects after it. */
      starting_after?: string;
      /** Id of the first object on the next page; returns the objects before it. */
      ending_before?: string;
      status?:
        | "scheduled"
        | "awaiting_dispatch"
        | "searching"
        | "rider_assigned"
        | "picking_up"
        | "in_transit"
        | "delivered"
        | "cancelled"
        | "failed";
      type?: "single" | "batch" | "bulk";
      /**
       * Your reference for the order: returns the one order that has it.
       * @minLength 1
       * @maxLength 100
       */
      reference?: string;
      /**
       * created[gte] and/or created[lte]: ISO 8601 dates or Unix seconds.
       * @example {"gte":"2026-11-01T00:00:00Z"}
       */
      created?: object;
      /**
       * true for live mode.
       * @default "false"
       */
      livemode?: "true" | "false";
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DashboardListOrdersData;
  }

  /**
   * @description Creates the order: holds its price in the wallet and, unless scheduled, rings riders.
   * @tags developer-dashboard/orders
   * @name DashboardCreateOrder
   * @request POST:/developer/api/v1/dashboard/orders
   * @secure
   * @response `201` `DashboardCreateOrderData`
   */
  export namespace DashboardCreateOrder {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * true for live mode.
       * @default "false"
       */
      livemode?: "true" | "false";
    };
    export type RequestBody = CreateOrderRequestDto;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DashboardCreateOrderData;
  }

  /**
   * No description
   * @tags developer-dashboard/orders
   * @name DashboardRetrieveOrder
   * @request GET:/developer/api/v1/dashboard/orders/{id}
   * @secure
   * @response `200` `DashboardRetrieveOrderData`
   */
  export namespace DashboardRetrieveOrder {
    export type RequestParams = {
      /** @example "ord_6560f0c2a1b2c3d4e5f60718" */
      id: string;
    };
    export type RequestQuery = {
      /**
       * true for live mode.
       * @default "false"
       */
      livemode?: "true" | "false";
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DashboardRetrieveOrderData;
  }

  /**
   * @description Where the rider is and the order's timeline, for the live map.
   * @tags developer-dashboard/orders
   * @name DashboardTrackOrder
   * @request GET:/developer/api/v1/dashboard/orders/{id}/tracking
   * @secure
   * @response `200` `DashboardTrackOrderData`
   */
  export namespace DashboardTrackOrder {
    export type RequestParams = {
      /** @example "ord_6560f0c2a1b2c3d4e5f60718" */
      id: string;
    };
    export type RequestQuery = {
      /**
       * true for live mode.
       * @default "false"
       */
      livemode?: "true" | "false";
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DashboardTrackOrderData;
  }

  /**
   * @description The price before creating it, held for 15 minutes.
   * @tags developer-dashboard/orders
   * @name DashboardCreateQuote
   * @request POST:/developer/api/v1/dashboard/quotes
   * @secure
   * @response `200` `DashboardCreateQuoteData`
   */
  export namespace DashboardCreateQuote {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * true for live mode.
       * @default "false"
       */
      livemode?: "true" | "false";
    };
    export type RequestBody = CreateQuoteRequestDto;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DashboardCreateQuoteData;
  }

  /**
   * No description
   * @tags developer-dashboard/orders
   * @name DashboardCancelOrder
   * @request POST:/developer/api/v1/dashboard/orders/{id}/cancel
   * @secure
   * @response `200` `DashboardCancelOrderData`
   */
  export namespace DashboardCancelOrder {
    export type RequestParams = {
      /** @example "ord_6560f0c2a1b2c3d4e5f60718" */
      id: string;
    };
    export type RequestQuery = {
      /**
       * true for live mode.
       * @default "false"
       */
      livemode?: "true" | "false";
    };
    export type RequestBody = DeveloperCancelOrderRequestDto;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DashboardCancelOrderData;
  }

  /**
   * @description Test mode only: one step as the test rider would, or straight to `to`.
   * @tags developer-dashboard/orders
   * @name DashboardAdvanceTestOrder
   * @request POST:/developer/api/v1/dashboard/orders/{id}/advance
   * @secure
   * @response `200` `DashboardAdvanceTestOrderData`
   */
  export namespace DashboardAdvanceTestOrder {
    export type RequestParams = {
      /** @example "ord_6560f0c2a1b2c3d4e5f60718" */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AdvanceOrderRequestDto;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DashboardAdvanceTestOrderData;
  }

  /**
   * @description Newest first, 20 a page. Filter by mode, outcome, method, path, key, time or request id.
   * @tags developer-dashboard/request-logs
   * @name DeveloperListRequestLogs
   * @request GET:/developer/api/v1/dashboard/request-logs
   * @secure
   * @response `200` `DeveloperListRequestLogsData`
   */
  export namespace DeveloperListRequestLogs {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @max 100
       * @default 20
       */
      limit?: number;
      /** Id of the last object on the previous page; returns the objects after it. */
      starting_after?: string;
      /** Id of the first object on the next page; returns the objects before it. */
      ending_before?: string;
      /** Only live or only test requests. */
      livemode?: "true" | "false";
      /** succeeded (below 400), failed (400 and up), or a status class. */
      status?: "succeeded" | "failed" | "2xx" | "4xx" | "5xx";
      method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
      /**
       * Requests whose path contains this, e.g. /orders.
       * @maxLength 200
       * @example "/orders"
       */
      path?: string;
      /** Requests made with this API key (its id). */
      key?: string;
      /** From this time (ISO 8601). */
      created_gte?: string;
      /** Up to this time (ISO 8601). */
      created_lte?: string;
      /**
       * The request id from a response (Request-Id header or error.request_id). Finds it in either mode.
       * @maxLength 64
       * @example "req_kE72slxdyzWzqil0NpGahJCb"
       */
      request_id?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperListRequestLogsData;
  }

  /**
   * @description One request with its query, redacted request and response bodies, IP and user agent.
   * @tags developer-dashboard/request-logs
   * @name DeveloperGetRequestLog
   * @request GET:/developer/api/v1/dashboard/request-logs/{logId}
   * @secure
   * @response `200` `DeveloperGetRequestLogData`
   */
  export namespace DeveloperGetRequestLog {
    export type RequestParams = {
      logId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The team to act on (from the teams list). */
      "X-Team-Id": string;
    };
    export type ResponseBody = DeveloperGetRequestLogData;
  }
}
