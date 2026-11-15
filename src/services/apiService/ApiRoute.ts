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
  AcceptOfferData,
  AcceptOrRejectOrderOfferData,
  AcceptRejectLocationUpdateRequestDto,
  AcceptRejectOfferRequestDto,
  AchievementsSummaryData,
  AcknowledgeAchievementData,
  AcknowledgeAnnouncementData,
  AcknowledgeAnnouncementRequestDto,
  AcknowledgeCustomerAchievementData,
  AcknowledgeWalletTermsData,
  AddCountryData,
  AddCountryDto,
  AddCountryStatesData,
  AddCountryStatesPayload,
  AddGroupUsersData,
  AddIssueNoteRequestDto,
  AddKycDetailsData,
  AddNoteData,
  AddVehiclesData,
  AddVehiclesDto,
  AdjustUserWalletData,
  AdjustWalletRequestDto,
  AdminAlertsSummaryData,
  AdminAnnouncementsSummaryData,
  AdminApproveDeveloperLiveData,
  AdminAssignHandoffRiderData,
  AdminAssignHandoffRiderRequestDto,
  AdminBulkReviewHandoffsData,
  AdminBulkReviewHandoffsRequestDto,
  AdminCancelHandoffData,
  AdminCancelHandoffRequestDto,
  AdminCancelOrderData,
  AdminCancelOrderRequestDto,
  AdminChangeMyPasswordData,
  AdminClaimAlertData,
  AdminConfigData,
  AdminCreateAnnouncementData,
  AdminCreateTeamData,
  AdminCreateUserData,
  AdminDeleteAnnouncementData,
  AdminDropHandoffRiderData,
  AdminDropHandoffRiderRequestDto,
  AdminGetAnnouncementData,
  AdminGetDeveloperData,
  AdminGetHandoffData,
  AdminGetMyProfileData,
  AdminGetRiderAchievementsData,
  AdminGetRiderDeliveryMapData,
  AdminGetRiderEarningsSeriesData,
  AdminGetRiderInsightsOverviewData,
  AdminGetRiderInsightsProfileData,
  AdminGetRiderRankData,
  AdminGetTransactionsData,
  AdminGetUserWalletsData,
  AdminGetVehicleData,
  AdminHandoffsSummaryData,
  AdminListAlertsData,
  AdminListAnnouncementReceiptsData,
  AdminListAnnouncementScreensData,
  AdminListAnnouncementsData,
  AdminListDevelopersData,
  AdminListHandoffsData,
  AdminListOrderHandoffsData,
  AdminListOrderMessagesData,
  AdminListRiderReleasesData,
  AdminListTeamsData,
  AdminOrderRiderHistoryData,
  AdminRaiseHandoffBonusData,
  AdminRaiseHandoffBonusRequestDto,
  AdminRejectDeveloperLiveData,
  AdminRemoveUserPhotoData,
  AdminResolveAlertData,
  AdminResolveAlertRequestDto,
  AdminReviewHandoffData,
  AdminReviewHandoffRequestDto,
  AdminSetWithdrawalRestrictionData,
  AdminStartHandoffData,
  AdminStartHandoffRequestDto,
  AdminStartHandoffSearchData,
  AdminStartHandoffSearchRequestDto,
  AdminSuspendDeveloperLiveData,
  AdminUnsuspendDeveloperLiveData,
  AdminUpdateAnnouncementData,
  AdminUpdateAnnouncementStatusData,
  AdminUpdateMyAddressesData,
  AdminUpdateMyPhotoData,
  AdminUpdateOrderStatusRequestDto,
  AdminUpdateSettlementAccountData,
  AdminUpdateUserVehicleData,
  AdminVerifyDriversLicenseData,
  AnalyticsData,
  AnnouncementAudience,
  AnnouncementOutcome,
  AnnouncementStatus,
  ApplyOrderCouponData,
  ApproveDriversLicenseSubmissionData,
  AssignData,
  AssignIssueRequestDto,
  AssignUserVehicleData,
  AssignVehicleDto,
  AttentionData,
  BroadcastEstimateRequestDto,
  BroadcastRequestDto,
  BulkMarkNotificationsAsReadData,
  BusinessesData,
  CancelData,
  CancelFundWalletData,
  CancelFundWalletRequestDto,
  CancelLocationRequestDto,
  CancelLocationUpdateData,
  CancelOrderData,
  CancelOrderLocationData,
  CancelOrderRequestDto,
  CatalogueData,
  ChangePasswordRequestDto,
  ChangeUserPasswordData,
  ChargesByRiderData,
  ChargesData,
  CheckTokenValidityData,
  CompleteLocationRequestDto,
  CompleteOrderData,
  CompleteOrderLocationData,
  ConfirmExternalPaymentByReferenceData,
  CouponLifecycle,
  CouponType,
  CouponsSummaryData,
  CreateAnnouncementRequestDto,
  CreateBatchOrderData,
  CreateBatchOrderDto,
  CreateBroadcastData,
  CreateBulkOrderData,
  CreateBulkOrderDto,
  CreateBusinessData,
  CreateBusinessRequestDto,
  CreateBusinessUserData,
  CreateBusinessUserRequestDto,
  CreateCouponData,
  CreateCouponRequestDto,
  CreateData,
  CreateDedicatedVirtualAccountData,
  CreateGroupData,
  CreateGroupRequestDto,
  CreateIssueData,
  CreateIssueRequestDto,
  CreateOrderPaymentLinkData,
  CreateSingleOrderData,
  CreateSingleOrderDto,
  CreateTeamData,
  CreateTeamRequestDto,
  CreateTemplateData,
  CreateTemplateRequestDto,
  CreateUserData,
  CreateUserRequestDto,
  CreateVirtualAccountRequestDto,
  CreateWalletData,
  CreateWebOrderDto,
  CreditPlatformWalletData,
  CustomersData,
  CustomersOverviewData,
  DeactivateCouponData,
  DeleteUserAccountData,
  DeleteUserVehicleData,
  DeleteVehicleData,
  DeliveryPriceEventDto,
  DeveloperLiveDecisionRequestDto,
  EstimateBroadcastData,
  EventData,
  FeedbackData,
  FeedbackDto,
  FindAllData,
  ForUserData,
  ForceAssignRiderData,
  ForceAssignRiderDto,
  FundWalletRequestDto,
  GetAchievementsData,
  GetActiveCouponsData,
  GetActiveOffersData,
  GetAdminPreferencesData,
  GetAllReferralsData,
  GetArrivalCheckData,
  GetBanksData,
  GetBroadcastData,
  GetBusinessData,
  GetBusinessOrderData,
  GetBusinessOrderStatisticsData,
  GetBusinessOrderStatusChartData,
  GetBusinessOrderTypeChartData,
  GetBusinessOrdersData,
  GetBusinessTransactionData,
  GetBusinessTransactionsData,
  GetBusinessUserData,
  GetBusinessUsersData,
  GetBusinessVehiclesData,
  GetBusinessWalletData,
  GetBusinessWalletsData,
  GetCountriesData,
  GetCountryByIdData,
  GetCountryStateByIdData,
  GetCountryStatesData,
  GetCouponData,
  GetCustomerAchievementsData,
  GetCustomerInsightsOverviewData,
  GetCustomerInsightsPlacesData,
  GetCustomerInsightsRecapData,
  GetCustomerInsightsSeriesData,
  GetDeliveryPricingData,
  GetDemandData,
  GetEarningsSeriesData,
  GetExternalPaymentMetricsData,
  GetFinanceStatusData,
  GetGroupData,
  GetHeartbeatData,
  GetInsightsLeaderboardData,
  GetInsightsOverviewData,
  GetIssueData,
  GetLatestLocationUpdateForCustomerData,
  GetLogsData,
  GetMyIssueData,
  GetMyMapData,
  GetNearbyRidersCountData,
  GetNotificationsData,
  GetOrderChatData,
  GetOrderData,
  GetOrderEtaData,
  GetOrderOffersData,
  GetOrderPaymentInfoData,
  GetOrderStatusChartData,
  GetOrderTypeChartData,
  GetOrdersData,
  GetPendingLocationUpdateData,
  GetPlatformBanksData,
  GetPlatformWalletData,
  GetQueuedOrdersData,
  GetQuoteData,
  GetReviewsData,
  GetRiderLocationsData,
  GetRiderOrderData,
  GetRiderOrderStatisticsData,
  GetRiderOrdersData,
  GetRiderReviewsData,
  GetRidersLeaderboardData,
  GetTransactionData,
  GetTransactionSummaryData,
  GetTransactionsData,
  GetUnreadCountData,
  GetUserData,
  GetUserNotificationData,
  GetUserOrderData,
  GetUserOrdersData,
  GetUserProfileData,
  GetUserReviewsData,
  GetUserTeamData,
  GetUserTransactionData,
  GetUserTransactionsData,
  GetUserTransactionsSummaryData,
  GetUserVehicleData,
  GetUserWalletData,
  GetUserWalletsData,
  GetUsersData,
  GetVehicleData,
  GetVehiclesData,
  GoogleSignInData,
  GoogleSignInRequestDto,
  GrantAchievementRequestDto,
  GrantData,
  HandleWebhookEventsData,
  InitializeExternalOrderPaymentData,
  InitializeFundWalletData,
  InitializeOrderPaymentRequestDto,
  InitiateOrderPaymentData,
  InitiatePayoutData,
  InitiatePayoutDto,
  InitiateWithdrawalData,
  InitiateWithdrawalRequestDto,
  InsightsRangePreset,
  IssueCategory,
  IssuePriority,
  IssueStatus,
  IssueSubjectType,
  IssuesSummaryData,
  KYCDetailsDto,
  ListAllRidersData,
  ListBroadcastsData,
  ListCouponsData,
  ListGroupsData,
  ListIssuesData,
  ListMyIssuesData,
  ListOrderMessagesData,
  ListPendingAnnouncementsData,
  ListUserIssuesData,
  LogData,
  LoginAdminsData,
  LoginBusinessData,
  LoginData,
  LoginRequestDto,
  LookupRiderForStoreData,
  MakeOfferRequestDto,
  MakeOrderOfferData,
  MarkAsReadData,
  MarkOrderMessagesReadData,
  MarkOrderMessagesReadRequestDto,
  Object,
  OffersData,
  OverviewData,
  PasswordResetData,
  PasswordResetRequestData,
  PayData,
  PayOrderRequestDto,
  PayRiderTripData,
  PayRiderTripRequestDto,
  PeakHoursData,
  ProviderFeeFlow,
  ProviderFeeRowsData,
  ProviderFeesData,
  PublicConfigData,
  QueueOrderData,
  QuoteBatchOrderData,
  QuoteBatchOrderRequestDto,
  QuoteBulkOrderData,
  QuoteBulkOrderRequestDto,
  QuoteData,
  QuoteDto,
  QuoteOrderData,
  QuoteOrderLocationData,
  QuoteOrderRequestDto,
  RateRiderData,
  RateRiderRequestDto,
  ReDispatchData,
  ReDispatchRequestDto,
  ReassignRiderData,
  ReassignRiderRequestDto,
  RefundCustomerOrderData,
  RefundOrderRequestDto,
  RefundableOrdersData,
  RejectVehicleData,
  ReleaseOrderRiderData,
  ReleaseRiderRequestDto,
  RemoveGroupUsersData,
  RemoveOrderCouponData,
  RemoveUserFromBusinessData,
  RequestOrderRidersData,
  RescheduleOrderData,
  RescheduleOrderRequestDto,
  ResendTokenData,
  ResetPasswordRequestDto,
  ResolveBankAccountData,
  RespondToLocationUpdateData,
  RevokeData,
  RiderAcceptHandoffData,
  RiderAcceptHandoffRequestDto,
  RiderCancelHandoffData,
  RiderCancelHandoffRequestDto,
  RiderConfirmHandoffData,
  RiderConfirmHandoffRequestDto,
  RiderDeclineHandoffData,
  RiderDeclineHandoffRequestDto,
  RiderGetHandoffData,
  RiderLinkCodeRequestDto,
  RiderLocationsRequestDto,
  RiderMyHandoffsData,
  RiderNearbyHandoffsData,
  RiderOrderCapacityData,
  RiderPassOrderData,
  RiderPassOrderRequestDto,
  RiderReleaseOrderData,
  RiderReleaseRequestDto,
  RiderRequestHandoffData,
  RiderRequestHandoffRequestDto,
  RiderStartHandoffSearchData,
  RiderStartHandoffSearchRequestDto,
  RidersRequestDto,
  RingRidersData,
  RunData,
  SearchData,
  SendOrderMessageData,
  SendOrderMessageRequestDto,
  SendRiderLinkCodeData,
  SeriesData,
  SetDispatchPausedData,
  SetPinData,
  SetWithdrawalPinDto,
  StartOrderData,
  StartOrderLocationData,
  SubmitDriversLicenseData,
  SubmitDriversLicenseRequestDto,
  SuspendBusinessUserData,
  SuspendVehicleData,
  ToggleOnlinePresenceData,
  TokenRequestDto,
  TopRidersData,
  TrackAnnouncementLaterData,
  TrackAnnouncementSeenData,
  TrackData,
  TransferToUserData,
  TransferToWalletDto,
  TriggerNotificationData,
  TriggerNotificationRequestDto,
  UnlocksData,
  UnsuspendBusinessUserData,
  UpdateAddressesRequestDto,
  UpdateAdminPreferencesData,
  UpdateAdminPreferencesRequestDto,
  UpdateAnnouncementRequestDto,
  UpdateAnnouncementStatusRequestDto,
  UpdateBusinessPreferencesData,
  UpdateBusinessUserData,
  UpdateBusinessVehicleData,
  UpdateConfigData,
  UpdateCountryData,
  UpdateCountryDto,
  UpdateCountryStateData,
  UpdateCouponData,
  UpdateCouponRequestDto,
  UpdateDeliveryCalculatorConfigDto,
  UpdateDispatchPauseRequestDto,
  UpdateDriverLicenseRequestDto,
  UpdateDriversLicenseData,
  UpdateEmailData,
  UpdateEmailRequestDto,
  UpdateGroupData,
  UpdateGroupRequestDto,
  UpdateGroupUsersRequestDto,
  UpdateIssuePriorityRequestDto,
  UpdateIssueStatusRequestDto,
  UpdateLocationRequestDto,
  UpdateLocationStatusRequestDto,
  UpdateNotificationsRequestDto,
  UpdateOrderLocationData,
  UpdateOrderLocationDto,
  UpdateOrderLocationStatusData,
  UpdateOrderStatusData,
  UpdatePhoneNumberData,
  UpdatePhoneRequestDto,
  UpdatePhotoRequestDto,
  UpdatePlatformSettlementDto,
  UpdatePreferencesRequestDto,
  UpdatePriorityData,
  UpdateProfilePhotoData,
  UpdateProfileRequestDto,
  UpdateSettlementAccountData,
  UpdateSettlementAccountRequestDto,
  UpdateSettlementData,
  UpdateStateDto,
  UpdateStatusData,
  UpdateUserAddressesData,
  UpdateUserLocationData,
  UpdateUserPhoneData,
  UpdateUserPhoneRequestDto,
  UpdateUserPreferencesData,
  UpdateUserProfileData,
  UpdateUserStatusData,
  UpdateUserStatusRequestDto,
  UpdateUserVehicleData,
  UpdateVehicleRequestDto,
  UpdateVehicleStatusRequestDto,
  UpdateWithdrawalRestrictionRequestDto,
  UsagesData,
  UserKYCDetailDto,
  UserKycVerificationData,
  UserOverviewData,
  VerifyDriversLicenseData,
  VerifyEmailData,
  VerifyEmailRequestDto,
  VerifyOrderPaymentData,
  VerifyPhoneData,
  VerifyPhoneRequestDto,
  VerifyVehicleData,
  WalletCreateRequestDto,
} from "./data-contracts";

export namespace Api {
  /**
   * No description
   * @name GetHeartbeat
   * @request GET:/api/v1/ping
   * @response `200` `GetHeartbeatData`
   */
  export namespace GetHeartbeat {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      "x-api-key"?: string;
    };
    export type ResponseBody = GetHeartbeatData;
  }

  /**
   * No description
   * @tags admin-configs
   * @name GetDeliveryPricing
   * @request GET:/api/v1/admin-configs/delivery-pricing
   * @response `200` `GetDeliveryPricingData`
   */
  export namespace GetDeliveryPricing {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      "x-country-code": string;
      "x-state-code": string;
    };
    export type ResponseBody = GetDeliveryPricingData;
  }

  /**
   * No description
   * @tags admin-configs
   * @name GetCountries
   * @request GET:/api/v1/admin-configs/countries
   * @secure
   * @response `200` `GetCountriesData`
   */
  export namespace GetCountries {
    export type RequestParams = {};
    export type RequestQuery = {
      order?: "ASC" | "DESC";
      page?: number;
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCountriesData;
  }

  /**
   * No description
   * @tags admin-configs
   * @name AddCountry
   * @request POST:/api/v1/admin-configs/countries
   * @secure
   * @response `201` `AddCountryData`
   */
  export namespace AddCountry {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AddCountryDto;
    export type RequestHeaders = {};
    export type ResponseBody = AddCountryData;
  }

  /**
   * No description
   * @tags admin-configs
   * @name UpdateCountry
   * @request PATCH:/api/v1/admin-configs/countries/{countryId}
   * @secure
   * @response `200` `UpdateCountryData`
   */
  export namespace UpdateCountry {
    export type RequestParams = {
      countryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateCountryDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateCountryData;
  }

  /**
   * No description
   * @tags admin-configs
   * @name GetCountryById
   * @request GET:/api/v1/admin-configs/countries/{countryId}
   * @secure
   * @response `200` `GetCountryByIdData`
   */
  export namespace GetCountryById {
    export type RequestParams = {
      countryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCountryByIdData;
  }

  /**
   * No description
   * @tags admin-configs
   * @name AddCountryStates
   * @request POST:/api/v1/admin-configs/countries/{countryId}/states
   * @secure
   * @response `201` `AddCountryStatesData`
   */
  export namespace AddCountryStates {
    export type RequestParams = {
      countryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AddCountryStatesPayload;
    export type RequestHeaders = {};
    export type ResponseBody = AddCountryStatesData;
  }

  /**
   * No description
   * @tags admin-configs
   * @name GetCountryStates
   * @request GET:/api/v1/admin-configs/countries/{countryId}/states
   * @secure
   * @response `200` `GetCountryStatesData`
   */
  export namespace GetCountryStates {
    export type RequestParams = {
      countryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCountryStatesData;
  }

  /**
   * No description
   * @tags admin-configs
   * @name GetCountryStateById
   * @request GET:/api/v1/admin-configs/countries/{countryId}/states/{stateId}
   * @secure
   * @response `200` `GetCountryStateByIdData`
   */
  export namespace GetCountryStateById {
    export type RequestParams = {
      countryId: string;
      stateId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCountryStateByIdData;
  }

  /**
   * No description
   * @tags admin-configs
   * @name UpdateCountryState
   * @request PATCH:/api/v1/admin-configs/countries/{countryId}/states/{stateId}
   * @secure
   * @response `200` `UpdateCountryStateData`
   */
  export namespace UpdateCountryState {
    export type RequestParams = {
      countryId: string;
      stateId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateStateDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateCountryStateData;
  }

  /**
   * No description
   * @tags admins/stats
   * @name Overview
   * @request GET:/api/v1/admins/stats/overview
   * @secure
   * @response `200` `OverviewData`
   */
  export namespace Overview {
    export type RequestParams = {};
    export type RequestQuery = {
      /** ISO date or YYYY-MM-DD (Lagos day) */
      from?: string;
      /** ISO date or YYYY-MM-DD (Lagos day, inclusive) */
      to?: string;
      /** 1 = everything since the first order */
      all?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = OverviewData;
  }

  /**
   * No description
   * @tags admins/stats
   * @name Series
   * @request GET:/api/v1/admins/stats/series
   * @secure
   * @response `200` `SeriesData`
   */
  export namespace Series {
    export type RequestParams = {};
    export type RequestQuery = {
      /** ISO date or YYYY-MM-DD (Lagos day) */
      from?: string;
      /** ISO date or YYYY-MM-DD (Lagos day, inclusive) */
      to?: string;
      /** 1 = everything since the first order */
      all?: string;
      bucket?: "day" | "week" | "month";
      riderId?: string;
      userId?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SeriesData;
  }

  /**
   * No description
   * @tags admins/stats
   * @name TopRiders
   * @request GET:/api/v1/admins/stats/top-riders
   * @secure
   * @response `200` `TopRidersData`
   */
  export namespace TopRiders {
    export type RequestParams = {};
    export type RequestQuery = {
      /** ISO date or YYYY-MM-DD (Lagos day) */
      from?: string;
      /** ISO date or YYYY-MM-DD (Lagos day, inclusive) */
      to?: string;
      /** 1 = everything since the first order */
      all?: string;
      limit?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TopRidersData;
  }

  /**
   * No description
   * @tags admins/stats
   * @name PeakHours
   * @request GET:/api/v1/admins/stats/peak-hours
   * @secure
   * @response `200` `PeakHoursData`
   */
  export namespace PeakHours {
    export type RequestParams = {};
    export type RequestQuery = {
      /** ISO date or YYYY-MM-DD (Lagos day) */
      from?: string;
      /** ISO date or YYYY-MM-DD (Lagos day, inclusive) */
      to?: string;
      /** 1 = everything since the first order */
      all?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PeakHoursData;
  }

  /**
   * No description
   * @tags admins/stats
   * @name Charges
   * @request GET:/api/v1/admins/stats/charges
   * @secure
   * @response `200` `ChargesData`
   */
  export namespace Charges {
    export type RequestParams = {};
    export type RequestQuery = {
      /** ISO date or YYYY-MM-DD (Lagos day) */
      from?: string;
      /** ISO date or YYYY-MM-DD (Lagos day, inclusive) */
      to?: string;
      /** 1 = everything since the first order */
      all?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ChargesData;
  }

  /**
   * No description
   * @tags admins/stats
   * @name ChargesByRider
   * @request GET:/api/v1/admins/stats/charges/riders
   * @secure
   * @response `200` `ChargesByRiderData`
   */
  export namespace ChargesByRider {
    export type RequestParams = {};
    export type RequestQuery = {
      /** ISO date or YYYY-MM-DD (Lagos day) */
      from?: string;
      /** ISO date or YYYY-MM-DD (Lagos day, inclusive) */
      to?: string;
      /** 1 = everything since the first order */
      all?: string;
      /** Only riders online right now */
      online?: "true";
      /** Riders on their own account, or riders paid through a business */
      entityType?: "USER" | "BUSINESS";
      /** Rider name or phone, or business name */
      search?: any;
      sortBy?: "charges" | "trips" | "earned" | "last";
      order?: "ASC" | "DESC";
      limit?: any;
      page?: any;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ChargesByRiderData;
  }

  /**
   * @description What Paystack took in the window, per money flow, against the window before, with a trend.
   * @tags admins/stats
   * @name ProviderFees
   * @request GET:/api/v1/admins/stats/provider-fees
   * @secure
   * @response `200` `ProviderFeesData`
   */
  export namespace ProviderFees {
    export type RequestParams = {};
    export type RequestQuery = {
      /** ISO date or YYYY-MM-DD (Lagos day) */
      from?: string;
      /** ISO date or YYYY-MM-DD (Lagos day, inclusive) */
      to?: string;
      /** 1 = everything since the first order */
      all?: string;
      bucket?: "day" | "week" | "month";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ProviderFeesData;
  }

  /**
   * @description Every Paystack fee in the window, newest first, with what it was charged on and whose money it was.
   * @tags admins/stats
   * @name ProviderFeeRows
   * @request GET:/api/v1/admins/stats/provider-fees/rows
   * @secure
   * @response `200` `ProviderFeeRowsData`
   */
  export namespace ProviderFeeRows {
    export type RequestParams = {};
    export type RequestQuery = {
      /** ISO date or YYYY-MM-DD (Lagos day) */
      from?: string;
      /** ISO date or YYYY-MM-DD (Lagos day, inclusive) */
      to?: string;
      /** 1 = everything since the first order */
      all?: string;
      page?: number;
      /** At most 100, default 20 */
      limit?: number;
      flow?: ProviderFeeFlow;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ProviderFeeRowsData;
  }

  /**
   * No description
   * @tags admins/stats
   * @name Attention
   * @request GET:/api/v1/admins/stats/attention
   * @secure
   * @response `200` `AttentionData`
   */
  export namespace Attention {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AttentionData;
  }

  /**
   * No description
   * @tags admins/stats
   * @name CustomersOverview
   * @request GET:/api/v1/admins/stats/customers/overview
   * @secure
   * @response `200` `CustomersOverviewData`
   */
  export namespace CustomersOverview {
    export type RequestParams = {};
    export type RequestQuery = {
      /** ISO date or YYYY-MM-DD (Lagos day) */
      from?: string;
      /** ISO date or YYYY-MM-DD (Lagos day, inclusive) */
      to?: string;
      /** 1 = everything since the first order */
      all?: string;
      bucket?: "day" | "week" | "month";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CustomersOverviewData;
  }

  /**
   * No description
   * @tags admins/stats
   * @name Customers
   * @request GET:/api/v1/admins/stats/customers
   * @secure
   * @response `200` `CustomersData`
   */
  export namespace Customers {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Joined between, on createdAt: comma-separated start and end date (e.g. 2026-09-01,2026-09-30) */
      dateRange?: string;
      /** Only customers who placed an order in the last N days (whole number, 1 or more) */
      orderedWithinDays?: number;
      /** true = customers with at least one order, false = customers who never ordered */
      hasOrdered?: "true" | "false";
      search?: any;
      phoneVerified?: any;
      /** Comma separated UserStatus */
      status?: any;
      /** cancelled = cancelledOrders, wallet = walletBalance */
      sortBy?: "joined" | "lastLogin" | "name" | "orders" | "spent" | "cancelled" | "wallet";
      order?: "ASC" | "DESC";
      limit?: any;
      page?: any;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CustomersData;
  }

  /**
   * No description
   * @tags admins/stats
   * @name Businesses
   * @request GET:/api/v1/admins/stats/businesses
   * @secure
   * @response `200` `BusinessesData`
   */
  export namespace Businesses {
    export type RequestParams = {};
    export type RequestQuery = {
      search?: any;
      isActive?: any;
      sortBy?: "joined" | "name";
      order?: "ASC" | "DESC";
      limit?: any;
      page?: any;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BusinessesData;
  }

  /**
   * No description
   * @tags admins/stats
   * @name UserOverview
   * @request GET:/api/v1/admins/stats/users/{userId}/overview
   * @secure
   * @response `200` `UserOverviewData`
   */
  export namespace UserOverview {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {
      /** ISO date or YYYY-MM-DD (Lagos day) */
      from?: string;
      /** ISO date or YYYY-MM-DD (Lagos day, inclusive) */
      to?: string;
      /** 1 = everything since the first order */
      all?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UserOverviewData;
  }

  /**
   * No description
   * @tags transactions
   * @name GetTransactions
   * @request GET:/api/v1/transactions
   * @secure
   * @response `200` `GetTransactionsData`
   */
  export namespace GetTransactions {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Comma-separated start and end date filter (e.g., 2023-09-01,2023-09-30) */
      dateRange?: string;
      /** transaction type filter. commap separated list of TransactionType */
      type?: string;
      /** transaction category filter. commap separated list of TransactionCategory */
      category?: string;
      /** transaction status filter. comma separated list of TransactionStatus */
      status?: string;
      order?: "ASC" | "DESC";
      page?: number;
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetTransactionsData;
  }

  /**
   * No description
   * @tags admins/transactions
   * @name AdminGetTransactions
   * @request GET:/api/v1/admins/transactions
   * @secure
   * @response `200` `AdminGetTransactionsData`
   */
  export namespace AdminGetTransactions {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Reference, description, or wallet owner name / phone / email */
      search?: any;
      /** provide a user (entity) id to get transactions for a user */
      entityId?: string;
      /** Comma-separated start and end date filter (e.g., 2023-09-01,2023-09-30) */
      dateRange?: string;
      /** transaction type filter. commap separated list of TransactionType */
      type?: string;
      /** transaction purpose filter. commap separated list of TransactionPurpose */
      purpose?: string;
      /** transaction category filter. commap separated list of TransactionCategory */
      category?: string;
      /** transaction status filter. comma separated list of TransactionStatus */
      status?: string;
      order?: "ASC" | "DESC";
      page?: number;
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminGetTransactionsData;
  }

  /**
   * No description
   * @tags admins/transactions
   * @name GetExternalPaymentMetrics
   * @request GET:/api/v1/admins/transactions/metrics/external-payments
   * @secure
   * @response `200` `GetExternalPaymentMetricsData`
   */
  export namespace GetExternalPaymentMetrics {
    export type RequestParams = {};
    export type RequestQuery = {
      /** provide a user (entity) id to scope metrics to a single customer */
      entityId?: string;
      /** Comma-separated start and end date filter (e.g., 2023-09-01,2023-09-30) */
      dateRange?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetExternalPaymentMetricsData;
  }

  /**
   * No description
   * @tags admins/transactions
   * @name GetTransactionSummary
   * @request GET:/api/v1/admins/transactions/metrics/summary
   * @secure
   * @response `200` `GetTransactionSummaryData`
   */
  export namespace GetTransactionSummary {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Comma-separated start and end date filter (e.g., 2023-09-01,2023-09-30) */
      dateRange?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetTransactionSummaryData;
  }

  /**
   * No description
   * @tags admins/transactions
   * @name GetTransaction
   * @request GET:/api/v1/admins/transactions/{transactionId}
   * @secure
   * @response `200` `GetTransactionData`
   */
  export namespace GetTransaction {
    export type RequestParams = {
      transactionId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetTransactionData;
  }

  /**
   * No description
   * @tags riders/insights
   * @name GetInsightsOverview
   * @summary Earnings, performance, activity and goal for the window (default: last 7 days)
   * @request GET:/api/v1/riders/insights/overview
   * @secure
   * @response `200` `GetInsightsOverviewData`
   */
  export namespace GetInsightsOverview {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Comma-separated start and end date (e.g., 2023-09-01,2023-09-30)
       * @pattern DATE_RANGE_PATTERN
       */
      dateRange?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetInsightsOverviewData;
  }

  /**
   * No description
   * @tags riders/insights
   * @name GetEarningsSeries
   * @summary Net/gross earnings per day, week or month (default: last 30 days, daily)
   * @request GET:/api/v1/riders/insights/earnings/series
   * @secure
   * @response `200` `GetEarningsSeriesData`
   */
  export namespace GetEarningsSeries {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Comma-separated start and end date (e.g., 2023-09-01,2023-09-30)
       * @pattern DATE_RANGE_PATTERN
       */
      dateRange?: string;
      /** @default "day" */
      bucket?: "day" | "week" | "month";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetEarningsSeriesData;
  }

  /**
   * No description
   * @tags riders/insights
   * @name GetRiderReviews
   * @summary Customers' reviews of the rider, newest first, with the rating distribution
   * @request GET:/api/v1/riders/insights/reviews
   * @secure
   * @response `200` `GetRiderReviewsData`
   */
  export namespace GetRiderReviews {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @default 1 */
      page?: number;
      /** @default 20 */
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetRiderReviewsData;
  }

  /**
   * No description
   * @tags riders/insights
   * @name GetDemand
   * @summary Peak hours and pickup hot zones within 20 km of the rider (all riders, aggregated)
   * @request GET:/api/v1/riders/insights/demand
   * @secure
   * @response `200` `GetDemandData`
   */
  export namespace GetDemand {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Comma-separated start and end date (e.g., 2023-09-01,2023-09-30)
       * @pattern DATE_RANGE_PATTERN
       */
      dateRange?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetDemandData;
  }

  /**
   * No description
   * @tags riders/insights
   * @name GetMyMap
   * @summary The rider's own completed pickup/drop-off points
   * @request GET:/api/v1/riders/insights/my-map
   * @secure
   * @response `200` `GetMyMapData`
   */
  export namespace GetMyMap {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Comma-separated start and end date (e.g., 2023-09-01,2023-09-30)
       * @pattern DATE_RANGE_PATTERN
       */
      dateRange?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetMyMapData;
  }

  /**
   * No description
   * @tags riders/insights
   * @name GetInsightsLeaderboard
   * @summary Top riders by completed deliveries in the rider's state (or country), plus own rank
   * @request GET:/api/v1/riders/insights/leaderboard
   * @secure
   * @response `200` `GetInsightsLeaderboardData`
   */
  export namespace GetInsightsLeaderboard {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Comma-separated start and end date (e.g., 2023-09-01,2023-09-30)
       * @pattern DATE_RANGE_PATTERN
       */
      dateRange?: string;
      /** @default "state" */
      scope?: "state" | "country";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetInsightsLeaderboardData;
  }

  /**
   * No description
   * @tags riders/insights
   * @name GetAchievements
   * @summary Milestones with progress; unlocks are stamped on first sight
   * @request GET:/api/v1/riders/insights/achievements
   * @secure
   * @response `200` `GetAchievementsData`
   */
  export namespace GetAchievements {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetAchievementsData;
  }

  /**
   * No description
   * @tags riders/insights
   * @name AcknowledgeAchievement
   * @summary Mark an unlocked achievement as seen so the celebration is not shown again
   * @request PATCH:/api/v1/riders/insights/achievements/{key}/ack
   * @secure
   * @response `200` `AcknowledgeAchievementData`
   */
  export namespace AcknowledgeAchievement {
    export type RequestParams = {
      /** Achievement key, e.g. DELIVERIES_10 */
      key: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AcknowledgeAchievementData;
  }

  /**
   * No description
   * @tags admins/riders/insights
   * @name AdminGetRiderInsightsOverview
   * @summary A rider's earnings, performance, activity and goal for the window (default: last 7 days), plus how many order requests they accepted and passed on
   * @request GET:/api/v1/admins/riders/{riderId}/insights/overview
   * @secure
   * @response `200` `AdminGetRiderInsightsOverviewData`
   */
  export namespace AdminGetRiderInsightsOverview {
    export type RequestParams = {
      riderId: string;
    };
    export type RequestQuery = {
      /**
       * Comma-separated start and end date (e.g., 2023-09-01,2023-09-30)
       * @pattern DATE_RANGE_PATTERN
       */
      dateRange?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminGetRiderInsightsOverviewData;
  }

  /**
   * No description
   * @tags admins/riders/insights
   * @name AdminGetRiderEarningsSeries
   * @summary A rider's net/gross earnings per day, week or month, with the split by order type
   * @request GET:/api/v1/admins/riders/{riderId}/insights/earnings/series
   * @secure
   * @response `200` `AdminGetRiderEarningsSeriesData`
   */
  export namespace AdminGetRiderEarningsSeries {
    export type RequestParams = {
      riderId: string;
    };
    export type RequestQuery = {
      /**
       * Comma-separated start and end date (e.g., 2023-09-01,2023-09-30)
       * @pattern DATE_RANGE_PATTERN
       */
      dateRange?: string;
      /** @default "day" */
      bucket?: "day" | "week" | "month";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminGetRiderEarningsSeriesData;
  }

  /**
   * No description
   * @tags admins/riders/insights
   * @name AdminGetRiderDeliveryMap
   * @summary A rider's completed pickup and drop-off points
   * @request GET:/api/v1/admins/riders/{riderId}/insights/map
   * @secure
   * @response `200` `AdminGetRiderDeliveryMapData`
   */
  export namespace AdminGetRiderDeliveryMap {
    export type RequestParams = {
      riderId: string;
    };
    export type RequestQuery = {
      /**
       * Comma-separated start and end date (e.g., 2023-09-01,2023-09-30)
       * @pattern DATE_RANGE_PATTERN
       */
      dateRange?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminGetRiderDeliveryMapData;
  }

  /**
   * No description
   * @tags admins/riders/insights
   * @name AdminGetRiderRank
   * @summary Where the rider ranks by completed deliveries in their state (or country)
   * @request GET:/api/v1/admins/riders/{riderId}/insights/rank
   * @secure
   * @response `200` `AdminGetRiderRankData`
   */
  export namespace AdminGetRiderRank {
    export type RequestParams = {
      riderId: string;
    };
    export type RequestQuery = {
      /**
       * Comma-separated start and end date (e.g., 2023-09-01,2023-09-30)
       * @pattern DATE_RANGE_PATTERN
       */
      dateRange?: string;
      /** @default "state" */
      scope?: "state" | "country";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminGetRiderRankData;
  }

  /**
   * No description
   * @tags admins/riders/insights
   * @name AdminGetRiderAchievements
   * @summary A rider's milestones and progress (read-only: never records an unlock)
   * @request GET:/api/v1/admins/riders/{riderId}/insights/achievements
   * @secure
   * @response `200` `AdminGetRiderAchievementsData`
   */
  export namespace AdminGetRiderAchievements {
    export type RequestParams = {
      riderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminGetRiderAchievementsData;
  }

  /**
   * No description
   * @tags admins/riders/insights
   * @name AdminGetRiderInsightsProfile
   * @summary Admin-only: working hours, cancellations and reasons, location-change answers, withdrawals, lifetime
   * @request GET:/api/v1/admins/riders/{riderId}/insights/profile
   * @secure
   * @response `200` `AdminGetRiderInsightsProfileData`
   */
  export namespace AdminGetRiderInsightsProfile {
    export type RequestParams = {
      riderId: string;
    };
    export type RequestQuery = {
      /**
       * Comma-separated start and end date (e.g., 2023-09-01,2023-09-30)
       * @pattern DATE_RANGE_PATTERN
       */
      dateRange?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminGetRiderInsightsProfileData;
  }

  /**
   * No description
   * @tags users/insights
   * @name GetCustomerInsightsOverview
   * @summary Deliveries, spend, timing, streak and top places for the range (default: this month)
   * @request GET:/api/v1/users/me/insights/overview
   * @secure
   * @response `200` `GetCustomerInsightsOverviewData`
   */
  export namespace GetCustomerInsightsOverview {
    export type RequestParams = {};
    export type RequestQuery = {
      range?: InsightsRangePreset;
      /**
       * Explicit window, overrides `range`: YYYY-MM-DD,YYYY-MM-DD or a single start
       * @pattern DATE_RANGE_PATTERN
       */
      dateRange?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCustomerInsightsOverviewData;
  }

  /**
   * No description
   * @tags users/insights
   * @name GetCustomerInsightsSeries
   * @summary Deliveries and spend per day/week/month across the range
   * @request GET:/api/v1/users/me/insights/series
   * @secure
   * @response `200` `GetCustomerInsightsSeriesData`
   */
  export namespace GetCustomerInsightsSeries {
    export type RequestParams = {};
    export type RequestQuery = {
      range?: InsightsRangePreset;
      /**
       * Explicit window, overrides `range`: YYYY-MM-DD,YYYY-MM-DD or a single start
       * @pattern DATE_RANGE_PATTERN
       */
      dateRange?: string;
      /** Defaults to a bucket that suits the range */
      bucket?: "day" | "week" | "month";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCustomerInsightsSeriesData;
  }

  /**
   * No description
   * @tags users/insights
   * @name GetCustomerInsightsPlaces
   * @summary Most-used pickup and drop-off addresses, lifetime — feeds "Send again"
   * @request GET:/api/v1/users/me/insights/places
   * @secure
   * @response `200` `GetCustomerInsightsPlacesData`
   */
  export namespace GetCustomerInsightsPlaces {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @max 20
       * @default 5
       */
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCustomerInsightsPlacesData;
  }

  /**
   * No description
   * @tags users/insights
   * @name GetCustomerInsightsRecap
   * @summary Monthly wrap-up: the overview for one calendar month plus highlights
   * @request GET:/api/v1/users/me/insights/recap/{month}
   * @secure
   * @response `200` `GetCustomerInsightsRecapData`
   */
  export namespace GetCustomerInsightsRecap {
    export type RequestParams = {
      /**
       * Calendar month, YYYY-MM
       * @pattern MONTH_PATTERN
       * @example "2026-09"
       */
      month: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCustomerInsightsRecapData;
  }

  /**
   * No description
   * @tags users/achievements
   * @name GetCustomerAchievements
   * @summary All badges with progress; unlocks anything newly earned and issues its coupon
   * @request GET:/api/v1/users/me/achievements
   * @secure
   * @response `200` `GetCustomerAchievementsData`
   */
  export namespace GetCustomerAchievements {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCustomerAchievementsData;
  }

  /**
   * No description
   * @tags users/achievements
   * @name AcknowledgeCustomerAchievement
   * @summary Mark a badge celebration as seen
   * @request PATCH:/api/v1/users/me/achievements/{key}/ack
   * @secure
   * @response `200` `AcknowledgeCustomerAchievementData`
   */
  export namespace AcknowledgeCustomerAchievement {
    export type RequestParams = {
      /** @example "ORDERS_5" */
      key: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AcknowledgeCustomerAchievementData;
  }

  /**
   * No description
   * @tags admins/achievements
   * @name Catalogue
   * @summary Badge catalogue with unlock and reward rollups per badge
   * @request GET:/api/v1/admins/achievements
   * @secure
   * @response `200` `CatalogueData`
   */
  export namespace Catalogue {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CatalogueData;
  }

  /**
   * No description
   * @tags admins/achievements
   * @name AchievementsSummary
   * @summary Programme totals: customers with badges, unlocks, rewards issued/redeemed, discount spend
   * @request GET:/api/v1/admins/achievements/summary
   * @secure
   * @response `200` `AchievementsSummaryData`
   */
  export namespace AchievementsSummary {
    export type RequestParams = {};
    export type RequestQuery = {
      /** ISO date or YYYY-MM-DD (Lagos day); default 30 days ago */
      from?: string;
      /** ISO date or YYYY-MM-DD (Lagos day, inclusive); default now */
      to?: string;
      /** 1 = everything on record */
      all?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AchievementsSummaryData;
  }

  /**
   * No description
   * @tags admins/achievements
   * @name Unlocks
   * @summary Who unlocked what, when, and whether the reward was used
   * @request GET:/api/v1/admins/achievements/unlocks
   * @secure
   * @response `200` `UnlocksData`
   */
  export namespace Unlocks {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Badge key, e.g. ORDERS_5 */
      key?: string;
      /**
       * Customer name, email or phone
       * @maxLength 100
       */
      search?: string;
      /** Reward coupon state */
      reward?: "issued" | "redeemed" | "unredeemed" | "expired";
      /** @format date-time */
      from?: string;
      /** @format date-time */
      to?: string;
      /** @default 1 */
      page?: number;
      /** @default 20 */
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UnlocksData;
  }

  /**
   * No description
   * @tags admins/achievements
   * @name ForUser
   * @summary One customer’s badges and progress (read-only, never unlocks)
   * @request GET:/api/v1/admins/achievements/users/{userId}
   * @secure
   * @response `200` `ForUserData`
   */
  export namespace ForUser {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ForUserData;
  }

  /**
   * No description
   * @tags admins/achievements
   * @name Grant
   * @summary Unlock a badge for a customer and issue its reward coupon
   * @request POST:/api/v1/admins/achievements/users/{userId}/grant
   * @secure
   * @response `200` `GrantData`
   * @response `201` `AdminCustomerAchievementsResponseDto`
   */
  export namespace Grant {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = GrantAchievementRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = GrantData;
  }

  /**
   * No description
   * @tags admins/achievements
   * @name Revoke
   * @summary Remove a badge; its unredeemed reward coupon is deactivated
   * @request DELETE:/api/v1/admins/achievements/users/{userId}/{key}
   * @secure
   * @response `200` `RevokeData`
   */
  export namespace Revoke {
    export type RequestParams = {
      userId: string;
      key: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = RevokeData;
  }

  /**
   * No description
   * @tags auth
   * @name LoginAdmins
   * @request POST:/api/v1/auth/admins/login
   * @response `201` `LoginAdminsData`
   */
  export namespace LoginAdmins {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LoginRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = LoginAdminsData;
  }

  /**
   * No description
   * @tags auth
   * @name Login
   * @request POST:/api/v1/auth/users/login
   * @response `201` `LoginData`
   */
  export namespace Login {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LoginRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = LoginData;
  }

  /**
   * No description
   * @tags auth
   * @name LoginBusiness
   * @request POST:/api/v1/auth/businesses/login
   * @response `201` `LoginBusinessData`
   */
  export namespace LoginBusiness {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LoginRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = LoginBusinessData;
  }

  /**
   * No description
   * @tags auth
   * @name VerifyPhone
   * @request POST:/api/v1/auth/verify/phone
   * @response `201` `VerifyPhoneData`
   */
  export namespace VerifyPhone {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = VerifyPhoneRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = VerifyPhoneData;
  }

  /**
   * No description
   * @tags auth
   * @name VerifyEmail
   * @request POST:/api/v1/auth/verify/email
   * @response `201` `VerifyEmailData`
   */
  export namespace VerifyEmail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = VerifyEmailRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = VerifyEmailData;
  }

  /**
   * No description
   * @tags auth
   * @name PasswordResetRequest
   * @request POST:/api/v1/auth/password-reset-request
   * @response `201` `PasswordResetRequestData`
   */
  export namespace PasswordResetRequest {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TokenRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = PasswordResetRequestData;
  }

  /**
   * No description
   * @tags auth
   * @name PasswordReset
   * @request POST:/api/v1/auth/password-reset
   * @response `201` `PasswordResetData`
   */
  export namespace PasswordReset {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ResetPasswordRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = PasswordResetData;
  }

  /**
   * No description
   * @tags auth
   * @name ResendToken
   * @request POST:/api/v1/auth/resend-token
   * @response `201` `ResendTokenData`
   */
  export namespace ResendToken {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TokenRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = ResendTokenData;
  }

  /**
   * No description
   * @tags auth
   * @name CheckTokenValidity
   * @request POST:/api/v1/auth/check-token
   * @response `201` `CheckTokenValidityData`
   */
  export namespace CheckTokenValidity {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = VerifyPhoneRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = CheckTokenValidityData;
  }

  /**
   * No description
   * @tags auth
   * @name GoogleSignIn
   * @request POST:/api/v1/auth/google
   * @response `201` `GoogleSignInData`
   */
  export namespace GoogleSignIn {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GoogleSignInRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = GoogleSignInData;
  }

  /**
   * No description
   * @tags users
   * @name CreateUser
   * @request POST:/api/v1/users
   * @response `201` `CreateUserData`
   */
  export namespace CreateUser {
    export type RequestParams = {};
    export type RequestQuery = {
      referralCode?: any;
    };
    export type RequestBody = CreateUserRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = CreateUserData;
  }

  /**
   * No description
   * @tags users
   * @name GetUserProfile
   * @request GET:/api/v1/users/me
   * @secure
   * @response `200` `GetUserProfileData`
   */
  export namespace GetUserProfile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserProfileData;
  }

  /**
   * No description
   * @tags users
   * @name UpdateUserProfile
   * @request PATCH:/api/v1/users/me/update-profile
   * @secure
   * @response `200` `UpdateUserProfileData`
   */
  export namespace UpdateUserProfile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateProfileRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateUserProfileData;
  }

  /**
   * No description
   * @tags users
   * @name AcknowledgeWalletTerms
   * @request PATCH:/api/v1/users/me/acknowledge-wallet-terms
   * @secure
   * @response `200` `AcknowledgeWalletTermsData`
   */
  export namespace AcknowledgeWalletTerms {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AcknowledgeWalletTermsData;
  }

  /**
   * No description
   * @tags users
   * @name UpdateUserLocation
   * @request PATCH:/api/v1/users/me/update-location
   * @secure
   * @response `200` `UpdateUserLocationData`
   */
  export namespace UpdateUserLocation {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateLocationRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateUserLocationData;
  }

  /**
   * No description
   * @tags users
   * @name UpdateProfilePhoto
   * @request PATCH:/api/v1/users/me/update-profile-photo
   * @secure
   * @response `200` `UpdateProfilePhotoData`
   */
  export namespace UpdateProfilePhoto {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdatePhotoRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateProfilePhotoData;
  }

  /**
   * No description
   * @tags users
   * @name UpdateUserAddresses
   * @request PATCH:/api/v1/users/me/update-addresses
   * @secure
   * @response `200` `UpdateUserAddressesData`
   */
  export namespace UpdateUserAddresses {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateAddressesRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateUserAddressesData;
  }

  /**
   * No description
   * @tags users
   * @name UserKycVerification
   * @request PUT:/api/v1/users/me/kyc
   * @secure
   * @response `200` `UserKycVerificationData`
   */
  export namespace UserKycVerification {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UserKYCDetailDto;
    export type RequestHeaders = {};
    export type ResponseBody = UserKycVerificationData;
  }

  /**
   * No description
   * @tags users
   * @name ChangeUserPassword
   * @request PATCH:/api/v1/users/me/password-change
   * @secure
   * @response `200` `ChangeUserPasswordData`
   */
  export namespace ChangeUserPassword {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ChangePasswordRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = ChangeUserPasswordData;
  }

  /**
   * No description
   * @tags users
   * @name GetUserWallets
   * @request GET:/api/v1/users/me/wallets
   * @secure
   * @response `200` `GetUserWalletsData`
   */
  export namespace GetUserWallets {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserWalletsData;
  }

  /**
   * No description
   * @tags users
   * @name GetUserWallet
   * @request GET:/api/v1/users/me/wallets/{walletId}
   * @secure
   * @response `200` `GetUserWalletData`
   */
  export namespace GetUserWallet {
    export type RequestParams = {
      walletId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserWalletData;
  }

  /**
   * No description
   * @tags users
   * @name InitializeFundWallet
   * @request POST:/api/v1/users/me/wallets/{walletId}/initialize-funding
   * @secure
   * @response `201` `InitializeFundWalletData`
   */
  export namespace InitializeFundWallet {
    export type RequestParams = {
      walletId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = FundWalletRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = InitializeFundWalletData;
  }

  /**
   * No description
   * @tags users
   * @name CancelFundWallet
   * @request POST:/api/v1/users/me/wallets/{walletId}/cancel-funding
   * @secure
   * @response `201` `CancelFundWalletData`
   */
  export namespace CancelFundWallet {
    export type RequestParams = {
      walletId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CancelFundWalletRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = CancelFundWalletData;
  }

  /**
   * No description
   * @tags users
   * @name UpdateSettlementAccount
   * @request PATCH:/api/v1/users/me/wallets/{walletId}/settlement-account
   * @secure
   * @response `200` `UpdateSettlementAccountData`
   */
  export namespace UpdateSettlementAccount {
    export type RequestParams = {
      walletId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateSettlementAccountRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateSettlementAccountData;
  }

  /**
   * No description
   * @tags users
   * @name InitiateWithdrawal
   * @request PATCH:/api/v1/users/me/wallets/{walletId}/withdrawal-request
   * @secure
   * @response `200` `InitiateWithdrawalData`
   */
  export namespace InitiateWithdrawal {
    export type RequestParams = {
      walletId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = InitiateWithdrawalRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = InitiateWithdrawalData;
  }

  /**
   * No description
   * @tags users
   * @name GetActiveCoupons
   * @request GET:/api/v1/users/me/coupons
   * @secure
   * @response `200` `GetActiveCouponsData`
   */
  export namespace GetActiveCoupons {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetActiveCouponsData;
  }

  /**
   * No description
   * @tags users
   * @name GetAllReferrals
   * @request GET:/api/v1/users/me/referrals
   * @secure
   * @response `200` `GetAllReferralsData`
   */
  export namespace GetAllReferrals {
    export type RequestParams = {};
    export type RequestQuery = {
      /** the records sorting order */
      order?: "ASC" | "DESC";
      page?: number;
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetAllReferralsData;
  }

  /**
   * No description
   * @tags users
   * @name GetUserTransactions
   * @request GET:/api/v1/users/me/transactions
   * @secure
   * @response `200` `GetUserTransactionsData`
   */
  export namespace GetUserTransactions {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Comma-separated start and end date filter (e.g., 2023-09-01,2023-09-30) */
      dateRange?: string;
      /** transaction type filter. commap separated list of TransactionType */
      type?: string;
      /** transaction category filter. commap separated list of TransactionCategory */
      category?: string;
      /** transaction status filter. comma separated list of TransactionStatus */
      status?: string;
      order?: "ASC" | "DESC";
      page?: number;
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserTransactionsData;
  }

  /**
   * No description
   * @tags users
   * @name GetUserTransactionsSummary
   * @request GET:/api/v1/users/me/transactions/summary
   * @secure
   * @response `200` `GetUserTransactionsSummaryData`
   */
  export namespace GetUserTransactionsSummary {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Comma-separated start and end date filter (e.g., 2023-09-01,2023-09-30) */
      dateRange?: string;
      /** transaction type filter. comma separated list of TransactionType */
      type?: string;
      /** transaction category filter. comma separated list of TransactionCategory */
      category?: string;
      /** transaction status filter. comma separated list of TransactionStatus */
      status?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserTransactionsSummaryData;
  }

  /**
   * No description
   * @tags users
   * @name GetUserTransaction
   * @request GET:/api/v1/users/me/transactions/{transactionId}
   * @secure
   * @response `200` `GetUserTransactionData`
   */
  export namespace GetUserTransaction {
    export type RequestParams = {
      transactionId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserTransactionData;
  }

  /**
   * No description
   * @tags users
   * @name DeleteUserAccount
   * @request DELETE:/api/v1/users/me/delete-account
   * @secure
   * @response `200` `DeleteUserAccountData`
   */
  export namespace DeleteUserAccount {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteUserAccountData;
  }

  /**
   * No description
   * @tags users
   * @name UpdatePhoneNumber
   * @request PATCH:/api/v1/users/me/phone
   * @secure
   * @response `200` `UpdatePhoneNumberData`
   */
  export namespace UpdatePhoneNumber {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdatePhoneRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdatePhoneNumberData;
  }

  /**
   * No description
   * @tags users
   * @name UpdateEmail
   * @request PATCH:/api/v1/users/me/email
   * @secure
   * @response `200` `UpdateEmailData`
   */
  export namespace UpdateEmail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateEmailRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateEmailData;
  }

  /**
   * No description
   * @tags users
   * @name UpdateUserPreferences
   * @request PATCH:/api/v1/users/me/preferences
   * @secure
   * @response `200` `UpdateUserPreferencesData`
   */
  export namespace UpdateUserPreferences {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdatePreferencesRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateUserPreferencesData;
  }

  /**
   * No description
   * @tags users
   * @name ToggleOnlinePresence
   * @request PATCH:/api/v1/users/me/toggle-presence
   * @secure
   * @response `200` `ToggleOnlinePresenceData`
   */
  export namespace ToggleOnlinePresence {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ToggleOnlinePresenceData;
  }

  /**
   * No description
   * @tags users
   * @name GetRiderOrder
   * @request GET:/api/v1/users/me/orders/{orderId}
   * @secure
   * @response `200` `GetRiderOrderData`
   */
  export namespace GetRiderOrder {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetRiderOrderData;
  }

  /**
   * No description
   * @tags users
   * @name VerifyDriversLicense
   * @request PATCH:/api/v1/users/me/documents/drivers-license/verify
   * @secure
   * @response `200` `VerifyDriversLicenseData`
   */
  export namespace VerifyDriversLicense {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SubmitDriversLicenseRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = VerifyDriversLicenseData;
  }

  /**
   * No description
   * @tags users
   * @name SubmitDriversLicense
   * @request PATCH:/api/v1/users/me/documents/drivers-license
   * @secure
   * @response `200` `SubmitDriversLicenseData`
   */
  export namespace SubmitDriversLicense {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SubmitDriversLicenseRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = SubmitDriversLicenseData;
  }

  /**
   * No description
   * @tags users
   * @name GetUserVehicle
   * @request GET:/api/v1/users/me/vehicle
   * @secure
   * @response `200` `GetUserVehicleData`
   */
  export namespace GetUserVehicle {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserVehicleData;
  }

  /**
   * No description
   * @tags admins/users
   * @name AdminCreateUser
   * @request POST:/api/v1/admins/users
   * @response `201` `AdminCreateUserData`
   */
  export namespace AdminCreateUser {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateUserRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminCreateUserData;
  }

  /**
   * No description
   * @tags admins/users
   * @name GetUsers
   * @request GET:/api/v1/admins/users
   * @secure
   * @response `200` `GetUsersData`
   */
  export namespace GetUsers {
    export type RequestParams = {};
    export type RequestQuery = {
      /** true = accounts an admin paused withdrawals on, false = accounts that can withdraw */
      withdrawalRestricted?: "0" | "1" | "false" | "true";
      /** For the rider list (isRider=true), sort by this field. completedDeliveries and totalEarned are lifetime rider metrics returned on each row. Combine with order=DESC for a leaderboard. */
      sortBy?: "createdAt" | "lastLoginDate" | "completedDeliveries" | "totalEarned";
      /** Filter riders by licence KYC status. APPROVE = licence-approved (verified) riders. */
      driversLicenseVerified?: "APPROVE" | "DISAPPROVE" | "SUSPENDED" | "SUBMITTED" | "PENDING";
      /** Search by user email, phone, firstname, lastname, middlename, or nin. This query is case insensitive. */
      userSearch?: string;
      /** Filter by setting either of the enum values ['0', '1', 'false', 'true'] */
      phoneVerified?: "0" | "1" | "false" | "true";
      /** Filter by setting either of the enum values ['0', '1', 'false', 'true'] */
      emailVerified?: "0" | "1" | "false" | "true";
      /** Riders only: true = riders an admin stopped ringing, false = riders still receiving requests */
      dispatchPaused?: "0" | "1" | "false" | "true";
      /** Riders only: filter by whether the rider app is currently online */
      isOnline?: "0" | "1" | "false" | "true";
      /** Filter by setting either of the enum values ['0', '1', 'false', 'true'] */
      isRider?: "0" | "1" | "false" | "true";
      /** Filter by setting either of the enum values ['0', '1', 'false', 'true'] */
      bvnVerified?: "0" | "1" | "false" | "true";
      /** comma-seprarated list of user roles */
      role?: string;
      /** comma-seprarated list of user statuses */
      status?: string;
      /** order by default is ASC, select either from the the enum ['ASC', 'DESC'] */
      order?: "ASC" | "DESC";
      page?: number;
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUsersData;
  }

  /**
   * No description
   * @tags admins/users
   * @name AdminGetMyProfile
   * @request GET:/api/v1/admins/users/me
   * @secure
   * @response `200` `AdminGetMyProfileData`
   */
  export namespace AdminGetMyProfile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminGetMyProfileData;
  }

  /**
   * No description
   * @tags admins/users
   * @name AdminUpdateMyPhoto
   * @request PATCH:/api/v1/admins/users/me/update-profile-photo
   * @secure
   * @response `200` `AdminUpdateMyPhotoData`
   */
  export namespace AdminUpdateMyPhoto {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdatePhotoRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminUpdateMyPhotoData;
  }

  /**
   * No description
   * @tags admins/users
   * @name AdminUpdateMyAddresses
   * @request PATCH:/api/v1/admins/users/me/update-addresses
   * @secure
   * @response `200` `AdminUpdateMyAddressesData`
   */
  export namespace AdminUpdateMyAddresses {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateAddressesRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminUpdateMyAddressesData;
  }

  /**
   * No description
   * @tags admins/users
   * @name AdminChangeMyPassword
   * @request PATCH:/api/v1/admins/users/me/password-change
   * @secure
   * @response `200` `AdminChangeMyPasswordData`
   */
  export namespace AdminChangeMyPassword {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ChangePasswordRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminChangeMyPasswordData;
  }

  /**
   * No description
   * @tags admins/users
   * @name GetAdminPreferences
   * @request GET:/api/v1/admins/users/me/preferences
   * @secure
   * @response `200` `GetAdminPreferencesData`
   */
  export namespace GetAdminPreferences {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetAdminPreferencesData;
  }

  /**
   * No description
   * @tags admins/users
   * @name UpdateAdminPreferences
   * @request PATCH:/api/v1/admins/users/me/preferences
   * @secure
   * @response `200` `UpdateAdminPreferencesData`
   */
  export namespace UpdateAdminPreferences {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateAdminPreferencesRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateAdminPreferencesData;
  }

  /**
   * No description
   * @tags admins/users
   * @name UpdateUserPhone
   * @request PATCH:/api/v1/admins/users/{userId}/phone
   * @secure
   * @response `200` `UpdateUserPhoneData`
   */
  export namespace UpdateUserPhone {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateUserPhoneRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateUserPhoneData;
  }

  /**
   * No description
   * @tags admins/users
   * @name AdminRemoveUserPhoto
   * @summary Remove a user's profile photo so the app asks them to upload a new one
   * @request PATCH:/api/v1/admins/users/{userId}/photo/remove
   * @secure
   * @response `200` `AdminRemoveUserPhotoData`
   */
  export namespace AdminRemoveUserPhoto {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminRemoveUserPhotoData;
  }

  /**
   * No description
   * @tags admins/users
   * @name SetDispatchPaused
   * @request PATCH:/api/v1/admins/users/{userId}/dispatch
   * @secure
   * @response `200` `SetDispatchPausedData`
   */
  export namespace SetDispatchPaused {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateDispatchPauseRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = SetDispatchPausedData;
  }

  /**
   * No description
   * @tags admins/users
   * @name AdminSetWithdrawalRestriction
   * @summary Pause or resume wallet withdrawals for a user. reason is required when restricted is true.
   * @request PATCH:/api/v1/admins/users/{userId}/withdrawal-restriction
   * @secure
   * @response `200` `AdminSetWithdrawalRestrictionData`
   */
  export namespace AdminSetWithdrawalRestriction {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateWithdrawalRestrictionRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminSetWithdrawalRestrictionData;
  }

  /**
   * No description
   * @tags admins/users
   * @name GetUser
   * @request GET:/api/v1/admins/users/{userId}
   * @secure
   * @response `200` `GetUserData`
   */
  export namespace GetUser {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserData;
  }

  /**
   * No description
   * @tags admins/users
   * @name AdminGetUserWallets
   * @request GET:/api/v1/admins/users/{userId}/wallets
   * @secure
   * @response `200` `AdminGetUserWalletsData`
   */
  export namespace AdminGetUserWallets {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminGetUserWalletsData;
  }

  /**
   * No description
   * @tags admins/users
   * @name UpdateUserStatus
   * @request PATCH:/api/v1/admins/users/{userId}/status
   * @secure
   * @response `200` `UpdateUserStatusData`
   */
  export namespace UpdateUserStatus {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateUserStatusRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateUserStatusData;
  }

  /**
   * No description
   * @tags admins/users
   * @name AdjustUserWallet
   * @request POST:/api/v1/admins/users/{userId}/wallets/adjust
   * @secure
   * @response `201` `AdjustUserWalletData`
   */
  export namespace AdjustUserWallet {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AdjustWalletRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdjustUserWalletData;
  }

  /**
   * No description
   * @tags admins/users
   * @name RefundableOrders
   * @summary Paid orders for a customer with what has already been refunded and what still can be
   * @request GET:/api/v1/admins/users/{userId}/refundable-orders
   * @secure
   * @response `200` `RefundableOrdersData`
   */
  export namespace RefundableOrders {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {
      limit?: number;
      /** Order number */
      search?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = RefundableOrdersData;
  }

  /**
   * No description
   * @tags admins/users
   * @name RefundCustomerOrder
   * @request POST:/api/v1/admins/users/{userId}/refund
   * @response `201` `RefundCustomerOrderData`
   */
  export namespace RefundCustomerOrder {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RefundOrderRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = RefundCustomerOrderData;
  }

  /**
   * No description
   * @tags admins/users
   * @name AdminVerifyDriversLicense
   * @request PATCH:/api/v1/admins/users/{userId}/drivers-license/verify
   * @secure
   * @response `200` `AdminVerifyDriversLicenseData`
   */
  export namespace AdminVerifyDriversLicense {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = SubmitDriversLicenseRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminVerifyDriversLicenseData;
  }

  /**
   * No description
   * @tags admins/users
   * @name ApproveDriversLicenseSubmission
   * @request PATCH:/api/v1/admins/users/{userId}/drivers-license/approve
   * @secure
   * @response `200` `ApproveDriversLicenseSubmissionData`
   */
  export namespace ApproveDriversLicenseSubmission {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ApproveDriversLicenseSubmissionData;
  }

  /**
   * No description
   * @tags admins/users
   * @name UpdateDriversLicense
   * @request PATCH:/api/v1/admins/users/{userId}/drivers-license/update
   * @secure
   * @response `200` `UpdateDriversLicenseData`
   */
  export namespace UpdateDriversLicense {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateDriverLicenseRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateDriversLicenseData;
  }

  /**
   * No description
   * @tags admins/users
   * @name AdminUpdateSettlementAccount
   * @request PATCH:/api/v1/admins/users/{userId}/wallets/{walletId}/settlement-account
   * @secure
   * @response `200` `AdminUpdateSettlementAccountData`
   */
  export namespace AdminUpdateSettlementAccount {
    export type RequestParams = {
      userId: string;
      walletId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateSettlementAccountRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminUpdateSettlementAccountData;
  }

  /**
   * No description
   * @tags wallets
   * @name CreateWallet
   * @request POST:/api/v1/wallets
   * @secure
   * @response `201` `CreateWalletData`
   */
  export namespace CreateWallet {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = WalletCreateRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = CreateWalletData;
  }

  /**
   * No description
   * @tags wallets
   * @name CreditPlatformWallet
   * @request POST:/api/v1/wallets/credit-platform
   * @secure
   * @response `201` `CreditPlatformWalletData`
   */
  export namespace CreditPlatformWallet {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CreditPlatformWalletData;
  }

  /**
   * No description
   * @tags admins/wallets
   * @name GetPlatformWallet
   * @request GET:/api/v1/admins/wallets/platform-wallet
   * @secure
   * @response `200` `GetPlatformWalletData`
   */
  export namespace GetPlatformWallet {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetPlatformWalletData;
  }

  /**
   * No description
   * @tags admins/coupons
   * @name ListCoupons
   * @summary All coupons with lifecycle, redemptions, discount given and groups
   * @request GET:/api/v1/admins/coupons
   * @secure
   * @response `200` `ListCouponsData`
   */
  export namespace ListCoupons {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Code or name
       * @maxLength 100
       */
      search?: string;
      lifecycle?: CouponLifecycle;
      type?: CouponType;
      /** "true" for general (everyone), "false" for targeted (groups) */
      isGeneral?: string;
      /** "true" to list only badge reward coupons (BADGE-…) */
      rewards?: string;
      sortBy?: "createdAt" | "expirationDate" | "usageCount" | "code" | "value";
      order?: "ASC" | "DESC";
      /** @default 1 */
      page?: number;
      /** @default 20 */
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListCouponsData;
  }

  /**
   * No description
   * @tags admins/coupons
   * @name CreateCoupon
   * @request POST:/api/v1/admins/coupons
   * @secure
   * @response `201` `CreateCouponData`
   */
  export namespace CreateCoupon {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateCouponRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = CreateCouponData;
  }

  /**
   * No description
   * @tags admins/coupons
   * @name CouponsSummary
   * @summary Coupon programme health: active count, redemptions, discount spend, top coupons
   * @request GET:/api/v1/admins/coupons/summary
   * @secure
   * @response `200` `CouponsSummaryData`
   */
  export namespace CouponsSummary {
    export type RequestParams = {};
    export type RequestQuery = {
      /** ISO date or YYYY-MM-DD (Lagos day); default 30 days ago */
      from?: string;
      /** ISO date or YYYY-MM-DD (Lagos day, inclusive); default now */
      to?: string;
      /** 1 = everything on record */
      all?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CouponsSummaryData;
  }

  /**
   * No description
   * @tags admins/coupons
   * @name ListGroups
   * @summary Customer groups targeted coupons are attached to
   * @request GET:/api/v1/admins/coupons/groups
   * @secure
   * @response `200` `ListGroupsData`
   */
  export namespace ListGroups {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Group name */
      search?: string;
      /** "true" to include the per-badge reward groups (badge:…) */
      includeRewardGroups?: string;
      /** @default 1 */
      page?: number;
      /** @default 20 */
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListGroupsData;
  }

  /**
   * No description
   * @tags admins/coupons
   * @name CreateGroup
   * @request POST:/api/v1/admins/coupons/groups
   * @secure
   * @response `201` `CreateGroupData`
   */
  export namespace CreateGroup {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateGroupRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = CreateGroupData;
  }

  /**
   * No description
   * @tags admins/coupons
   * @name GetGroup
   * @summary One group with its members and coupons
   * @request GET:/api/v1/admins/coupons/groups/{groupId}
   * @secure
   * @response `200` `GetGroupData`
   */
  export namespace GetGroup {
    export type RequestParams = {
      groupId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetGroupData;
  }

  /**
   * No description
   * @tags admins/coupons
   * @name UpdateGroup
   * @summary Rename a group or replace the coupons attached to it
   * @request PATCH:/api/v1/admins/coupons/groups/{groupId}
   * @secure
   * @response `200` `UpdateGroupData`
   */
  export namespace UpdateGroup {
    export type RequestParams = {
      groupId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateGroupRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateGroupData;
  }

  /**
   * No description
   * @tags admins/coupons
   * @name GetCoupon
   * @summary One coupon with its redemption rollups
   * @request GET:/api/v1/admins/coupons/{couponId}
   * @secure
   * @response `200` `GetCouponData`
   */
  export namespace GetCoupon {
    export type RequestParams = {
      couponId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCouponData;
  }

  /**
   * No description
   * @tags admins/coupons
   * @name UpdateCoupon
   * @summary Edit name, description, expiry, limit, cap, targeting; pause or resume
   * @request PATCH:/api/v1/admins/coupons/{couponId}
   * @secure
   * @response `200` `UpdateCouponData`
   */
  export namespace UpdateCoupon {
    export type RequestParams = {
      couponId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateCouponRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateCouponData;
  }

  /**
   * No description
   * @tags admins/coupons
   * @name Usages
   * @summary Who redeemed a coupon, on which order, for how much
   * @request GET:/api/v1/admins/coupons/{couponId}/usages
   * @secure
   * @response `200` `UsagesData`
   */
  export namespace Usages {
    export type RequestParams = {
      couponId: string;
    };
    export type RequestQuery = {
      /** @default 1 */
      page?: number;
      /** @default 20 */
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UsagesData;
  }

  /**
   * No description
   * @tags admins/coupons
   * @name AddGroupUsers
   * @request PATCH:/api/v1/admins/coupons/groups/{groupId}/add
   * @secure
   * @response `200` `AddGroupUsersData`
   */
  export namespace AddGroupUsers {
    export type RequestParams = {
      groupId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateGroupUsersRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AddGroupUsersData;
  }

  /**
   * No description
   * @tags admins/coupons
   * @name RemoveGroupUsers
   * @request PATCH:/api/v1/admins/coupons/groups/{groupId}/remove
   * @secure
   * @response `200` `RemoveGroupUsersData`
   */
  export namespace RemoveGroupUsers {
    export type RequestParams = {
      groupId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateGroupUsersRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = RemoveGroupUsersData;
  }

  /**
   * No description
   * @tags admins/coupons
   * @name DeactivateCoupon
   * @request PATCH:/api/v1/admins/coupons/{couponCode}/deactivate
   * @secure
   * @response `200` `DeactivateCouponData`
   */
  export namespace DeactivateCoupon {
    export type RequestParams = {
      couponCode: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeactivateCouponData;
  }

  /**
   * @description Look up the holder's name for a Nigerian (NUBAN) account before saving it, so the user can confirm it is theirs. Not audited on purpose: audit logs would keep the full account number and name.
   * @tags payments
   * @name ResolveBankAccount
   * @request GET:/api/v1/payments/banks/resolve
   * @secure
   * @response `200` `ResolveBankAccountData`
   * @response `400` `any` Validation failed (BAD_REQUEST), no such account (ACCOUNT_NOT_FOUND), or unknown bank code (INVALID_BANK).
   * @response `429` `any` RATE_LIMITED: more than 20 lookups a minute or 200 a day.
   * @response `503` `any` PROVIDER_UNAVAILABLE: the bank lookup is busy. Retryable.
   */
  export namespace ResolveBankAccount {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * 10-digit NUBAN account number.
       * @pattern /^\d{10}$/
       * @example "0123456789"
       */
      accountNumber: string;
      /**
       * Bank code from GET /payments/{provider}/banks (2-10 letters or digits).
       * @pattern /^[0-9A-Za-z]{2,10}$/
       * @example "058"
       */
      bankCode: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ResolveBankAccountData;
  }

  /**
   * No description
   * @tags payments
   * @name GetBanks
   * @request GET:/api/v1/payments/{provider}/banks
   * @secure
   * @response `200` `GetBanksData`
   */
  export namespace GetBanks {
    export type RequestParams = {
      provider: "PAYSTACK" | "FLUTTERWAVE";
    };
    export type RequestQuery = {
      /** A cursor key to fetch the previous page of the list after an intial next request */
      previous?: any;
      /** A cursor that indicates your place in the list. It can be used to fetch the next page of the list */
      next?: any;
      /** The number of objects to return per page. Defaults to 50, and limited to 100 records per page. */
      perPage?: any;
      /** Acceptable values are: ghana, kenya, nigeria, and south africa. */
      country?: any;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetBanksData;
  }

  /**
   * No description
   * @tags payments
   * @name CreateDedicatedVirtualAccount
   * @request POST:/api/v1/payments/dedicated-account/create
   * @secure
   * @response `201` `CreateDedicatedVirtualAccountData`
   */
  export namespace CreateDedicatedVirtualAccount {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateVirtualAccountRequestDto;
    export type RequestHeaders = {
      provider: string;
    };
    export type ResponseBody = CreateDedicatedVirtualAccountData;
  }

  /**
   * No description
   * @tags admins/wallets
   * @name GetPlatformBanks
   * @request GET:/api/v1/admins/wallets/banks
   * @secure
   * @response `200` `GetPlatformBanksData`
   */
  export namespace GetPlatformBanks {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetPlatformBanksData;
  }

  /**
   * No description
   * @tags admins/wallets
   * @name GetFinanceStatus
   * @request GET:/api/v1/admins/wallets/finance-status
   * @secure
   * @response `200` `GetFinanceStatusData`
   */
  export namespace GetFinanceStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetFinanceStatusData;
  }

  /**
   * No description
   * @tags admins/wallets
   * @name UpdateSettlement
   * @request POST:/api/v1/admins/wallets/platform-wallet/settlement
   * @secure
   * @response `201` `UpdateSettlementData`
   */
  export namespace UpdateSettlement {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdatePlatformSettlementDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateSettlementData;
  }

  /**
   * No description
   * @tags admins/wallets
   * @name SetPin
   * @request POST:/api/v1/admins/wallets/pin
   * @secure
   * @response `201` `SetPinData`
   */
  export namespace SetPin {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SetWithdrawalPinDto;
    export type RequestHeaders = {};
    export type ResponseBody = SetPinData;
  }

  /**
   * No description
   * @tags admins/wallets
   * @name InitiatePayout
   * @request POST:/api/v1/admins/wallets/platform-wallet/payout
   * @secure
   * @response `201` `InitiatePayoutData`
   */
  export namespace InitiatePayout {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = InitiatePayoutDto;
    export type RequestHeaders = {};
    export type ResponseBody = InitiatePayoutData;
  }

  /**
   * No description
   * @tags admins/wallets
   * @name TransferToUser
   * @request POST:/api/v1/admins/wallets/platform-wallet/transfer
   * @secure
   * @response `201` `TransferToUserData`
   */
  export namespace TransferToUser {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TransferToWalletDto;
    export type RequestHeaders = {};
    export type ResponseBody = TransferToUserData;
  }

  /**
   * No description
   * @tags datalogs
   * @name GetLogs
   * @request GET:/api/v1/datalogs
   * @secure
   * @response `200` `GetLogsData`
   */
  export namespace GetLogs {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Matches inside the logged payload */
      search?: string;
      /** start,end (YYYY-MM-DD) */
      dateRange?: string;
      /** Comma separated DataLogType values */
      logType?: string;
      /** Comma separated DataLogLevel values */
      level?: string;
      order?: "ASC" | "DESC";
      page?: number;
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetLogsData;
  }

  /**
   * No description
   * @tags notifications
   * @name GetNotifications
   * @request GET:/api/v1/notifications
   * @secure
   * @response `200` `GetNotificationsData`
   */
  export namespace GetNotifications {
    export type RequestParams = {};
    export type RequestQuery = {
      order?: "ASC" | "DESC";
      isRead?: any;
      page?: number;
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetNotificationsData;
  }

  /**
   * No description
   * @tags notifications
   * @name GetUserNotification
   * @request GET:/api/v1/notifications/{notificationId}
   * @secure
   * @response `200` `GetUserNotificationData`
   */
  export namespace GetUserNotification {
    export type RequestParams = {
      notificationId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserNotificationData;
  }

  /**
   * No description
   * @tags notifications
   * @name BulkMarkNotificationsAsRead
   * @request PATCH:/api/v1/notifications/mark-as-read
   * @secure
   * @response `200` `BulkMarkNotificationsAsReadData`
   */
  export namespace BulkMarkNotificationsAsRead {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateNotificationsRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = BulkMarkNotificationsAsReadData;
  }

  /**
   * No description
   * @tags admins/notifications
   * @name CreateTemplate
   * @request POST:/api/v1/admins/notifications/templates
   * @secure
   * @response `201` `CreateTemplateData`
   */
  export namespace CreateTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateTemplateRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = CreateTemplateData;
  }

  /**
   * No description
   * @tags admins/notifications
   * @name TriggerNotification
   * @request POST:/api/v1/admins/notifications/trigger
   * @secure
   * @response `201` `TriggerNotificationData`
   */
  export namespace TriggerNotification {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TriggerNotificationRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = TriggerNotificationData;
  }

  /**
   * No description
   * @tags admins/notifications
   * @name EstimateBroadcast
   * @request POST:/api/v1/admins/notifications/broadcasts/estimate
   * @secure
   * @response `201` `EstimateBroadcastData`
   */
  export namespace EstimateBroadcast {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BroadcastEstimateRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = EstimateBroadcastData;
  }

  /**
   * No description
   * @tags admins/notifications
   * @name CreateBroadcast
   * @request POST:/api/v1/admins/notifications/broadcasts
   * @secure
   * @response `201` `CreateBroadcastData`
   */
  export namespace CreateBroadcast {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BroadcastRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = CreateBroadcastData;
  }

  /**
   * No description
   * @tags admins/notifications
   * @name ListBroadcasts
   * @request GET:/api/v1/admins/notifications/broadcasts
   * @secure
   * @response `200` `ListBroadcastsData`
   */
  export namespace ListBroadcasts {
    export type RequestParams = {};
    export type RequestQuery = {
      limit?: any;
      page?: any;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListBroadcastsData;
  }

  /**
   * No description
   * @tags admins/notifications
   * @name GetBroadcast
   * @request GET:/api/v1/admins/notifications/broadcasts/{broadcastId}
   * @secure
   * @response `200` `GetBroadcastData`
   */
  export namespace GetBroadcast {
    export type RequestParams = {
      broadcastId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetBroadcastData;
  }

  /**
   * @description Every notification recorded, filterable by broadcast, user, status, type.
   * @tags admins/notifications
   * @name Log
   * @request GET:/api/v1/admins/notifications/log
   * @secure
   * @response `200` `LogData`
   */
  export namespace Log {
    export type RequestParams = {};
    export type RequestQuery = {
      category?: any;
      /** Comma separated NotificationType */
      type?: any;
      /** Comma separated NotificationStatus */
      status?: any;
      entityId?: any;
      broadcastId?: any;
      limit?: any;
      page?: any;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = LogData;
  }

  /**
   * No description
   * @tags businesses
   * @name CreateBusiness
   * @request POST:/api/v1/businesses
   * @response `201` `CreateBusinessData`
   */
  export namespace CreateBusiness {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateBusinessRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = CreateBusinessData;
  }

  /**
   * No description
   * @tags businesses
   * @name CreateBusinessUser
   * @request POST:/api/v1/businesses/users
   * @secure
   * @response `201` `CreateBusinessUserData`
   */
  export namespace CreateBusinessUser {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateBusinessUserRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = CreateBusinessUserData;
  }

  /**
   * No description
   * @tags businesses
   * @name GetBusinessUser
   * @request GET:/api/v1/businesses/{businessId}/users/{userId}
   * @secure
   * @response `200` `GetBusinessUserData`
   */
  export namespace GetBusinessUser {
    export type RequestParams = {
      businessId: string;
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetBusinessUserData;
  }

  /**
   * No description
   * @tags businesses
   * @name UpdateBusinessUser
   * @request PATCH:/api/v1/businesses/{businessId}/users/{userId}
   * @secure
   * @response `200` `UpdateBusinessUserData`
   */
  export namespace UpdateBusinessUser {
    export type RequestParams = {
      businessId: string;
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateProfileRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateBusinessUserData;
  }

  /**
   * No description
   * @tags businesses
   * @name RemoveUserFromBusiness
   * @request DELETE:/api/v1/businesses/{businessId}/users/{userId}
   * @secure
   * @response `200` `RemoveUserFromBusinessData`
   */
  export namespace RemoveUserFromBusiness {
    export type RequestParams = {
      businessId: string;
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = RemoveUserFromBusinessData;
  }

  /**
   * No description
   * @tags businesses
   * @name GetBusinessUsers
   * @request GET:/api/v1/businesses/{businessId}/users
   * @secure
   * @response `200` `GetBusinessUsersData`
   */
  export namespace GetBusinessUsers {
    export type RequestParams = {
      businessId: string;
    };
    export type RequestQuery = {
      /** Filter by setting either of the enum values ['0', '1', 'false', 'true'] */
      phoneVerified?: "0" | "1" | "false" | "true";
      /** Filter by setting either of the enum values ['0', '1', 'false', 'true'] */
      emailVerified?: "0" | "1" | "false" | "true";
      /** Filter by setting either of the enum values ['0', '1', 'false', 'true'] */
      bvnVerified?: "0" | "1" | "false" | "true";
      /** Allowed statuses separated by comma : ACTIVE,INACTIVE,SUSPENDED,BANNED */
      status?: string;
      /** Allowed roles separated by comma : USER, ADMIN, SUPER_ADMIN, PLATFORM_ADMIN, PLATFORM_RIDER, PLATFORM_OPERATION, PLATFORM_FINANCE, PLATFORM_BUSINESS, PLATFORM_MANAGER, DEVELOPER, BUSINESS_ADMIN, BUSINESS_USER, BUSINESS_RIDER */
      role?: string;
      /** Order by default is ASC, select either from the the enum ['ASC', 'DESC'] */
      order?: "ASC" | "DESC";
      page?: number;
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetBusinessUsersData;
  }

  /**
   * No description
   * @tags businesses
   * @name AddVehicles
   * @request POST:/api/v1/businesses/vehicles
   * @secure
   * @response `201` `AddVehiclesData`
   */
  export namespace AddVehicles {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AddVehiclesDto;
    export type RequestHeaders = {};
    export type ResponseBody = AddVehiclesData;
  }

  /**
   * No description
   * @tags businesses
   * @name AssignUserVehicle
   * @request PATCH:/api/v1/businesses/vehicles/{vehicleId}/assign
   * @secure
   * @response `200` `AssignUserVehicleData`
   */
  export namespace AssignUserVehicle {
    export type RequestParams = {
      vehicleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AssignVehicleDto;
    export type RequestHeaders = {};
    export type ResponseBody = AssignUserVehicleData;
  }

  /**
   * No description
   * @tags businesses
   * @name AddKycDetails
   * @request PATCH:/api/v1/businesses/{businessId}/kyc
   * @secure
   * @response `200` `AddKycDetailsData`
   */
  export namespace AddKycDetails {
    export type RequestParams = {
      businessId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = KYCDetailsDto;
    export type RequestHeaders = {};
    export type ResponseBody = AddKycDetailsData;
  }

  /**
   * No description
   * @tags businesses
   * @name GetUserReviews
   * @request GET:/api/v1/businesses/users/{userId}/reviews
   * @secure
   * @response `200` `GetUserReviewsData`
   */
  export namespace GetUserReviews {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserReviewsData;
  }

  /**
   * No description
   * @tags businesses
   * @name GetBusinessTransactions
   * @request GET:/api/v1/businesses/{businessId}/transactions
   * @secure
   * @response `200` `GetBusinessTransactionsData`
   */
  export namespace GetBusinessTransactions {
    export type RequestParams = {
      businessId: string;
    };
    export type RequestQuery = {
      /** filter by riderId */
      riderId?: string;
      /** Comma-separated start and end date filter (e.g., 2023-09-01,2023-09-30) */
      dateRange?: string;
      /** Allowed order types separated by comma : CREDIT,DEBIT */
      type?: string;
      /** Allowed categories separated by comma : FEE,DEPOSIT,WITHDRAWAL,REVERSAL,CHARGE */
      category?: string;
      /** Allowed statuses separated by comma : PROCESSING,FAILED,SUCCESS,CANCELLED */
      status?: string;
      /** Order by default is ASC, select either from the the enum ['ASC', 'DESC'] */
      order?: "ASC" | "DESC";
      page?: number;
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetBusinessTransactionsData;
  }

  /**
   * No description
   * @tags businesses
   * @name GetBusinessTransaction
   * @request GET:/api/v1/businesses/{businessId}/transactions/{transactionId}
   * @secure
   * @response `200` `GetBusinessTransactionData`
   */
  export namespace GetBusinessTransaction {
    export type RequestParams = {
      businessId: string;
      transactionId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetBusinessTransactionData;
  }

  /**
   * No description
   * @tags businesses
   * @name GetBusinessOrders
   * @request GET:/api/v1/businesses/{businessId}/orders
   * @secure
   * @response `200` `GetBusinessOrdersData`
   */
  export namespace GetBusinessOrders {
    export type RequestParams = {
      businessId: string;
    };
    export type RequestQuery = {
      /** Comma separated start and end date filter for scheduled orders */
      scheduledFor?: string;
      /** Select this to filter scheduled orders */
      isScheduled?: string;
      /** filter by rider Id */
      riderId?: any;
      /** filter by vehicle Id */
      vehicleId?: any;
      /** Comma-separated start and end date filter (e.g., 2023-09-01,2023-09-30) */
      dateRange?: string;
      /** Allowed order types separated by comma : SINGLE,BATCH,BULK */
      type?: string;
      /** Allowed statuses separated by comma : INITIATED,ACCEPTED,ON_GOING,COMPLETED,CANCELLED */
      status?: string;
      /** Search by order number */
      orderNumber?: any;
      /** Order by default is ASC, select either from the the enum ['ASC', 'DESC'] */
      order?: "ASC" | "DESC";
      page?: number;
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetBusinessOrdersData;
  }

  /**
   * No description
   * @tags businesses
   * @name GetBusinessOrder
   * @request GET:/api/v1/businesses/{businessId}/orders/{orderId}
   * @secure
   * @response `200` `GetBusinessOrderData`
   */
  export namespace GetBusinessOrder {
    export type RequestParams = {
      businessId: string;
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetBusinessOrderData;
  }

  /**
   * No description
   * @tags businesses
   * @name GetBusinessWallets
   * @request GET:/api/v1/businesses/{businessId}/wallets
   * @secure
   * @response `200` `GetBusinessWalletsData`
   */
  export namespace GetBusinessWallets {
    export type RequestParams = {
      businessId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetBusinessWalletsData;
  }

  /**
   * No description
   * @tags businesses
   * @name GetBusinessWallet
   * @request GET:/api/v1/businesses/{businessId}/wallets/{walletId}
   * @secure
   * @response `200` `GetBusinessWalletData`
   */
  export namespace GetBusinessWallet {
    export type RequestParams = {
      walletId: string;
      businessId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetBusinessWalletData;
  }

  /**
   * No description
   * @tags businesses
   * @name GetBusinessOrderStatistics
   * @request GET:/api/v1/businesses/{businessId}/order-statistics
   * @secure
   * @response `200` `GetBusinessOrderStatisticsData`
   */
  export namespace GetBusinessOrderStatistics {
    export type RequestParams = {
      businessId: string;
    };
    export type RequestQuery = {
      /** filter by riderId */
      riderId?: string;
      /** Comma-separated start and end date filter (e.g., 2023-09-01,2023-09-30) */
      dateRange?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetBusinessOrderStatisticsData;
  }

  /**
   * No description
   * @tags businesses
   * @name GetBusinessOrderStatusChart
   * @request GET:/api/v1/businesses/{businessId}/order-status-chart
   * @secure
   * @response `200` `GetBusinessOrderStatusChartData`
   */
  export namespace GetBusinessOrderStatusChart {
    export type RequestParams = {
      businessId: string;
    };
    export type RequestQuery = {
      /** filter by riderId */
      riderId?: string;
      /** Comma-separated start and end date filter (e.g., 2023-09-01,2023-09-30) */
      dateRange?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetBusinessOrderStatusChartData;
  }

  /**
   * No description
   * @tags businesses
   * @name GetBusinessOrderTypeChart
   * @request GET:/api/v1/businesses/{businessId}/order-type-chart
   * @secure
   * @response `200` `GetBusinessOrderTypeChartData`
   */
  export namespace GetBusinessOrderTypeChart {
    export type RequestParams = {
      businessId: string;
    };
    export type RequestQuery = {
      /** filter by riderId */
      riderId?: string;
      /** Comma-separated start and end date filter (e.g., 2023-09-01,2023-09-30) */
      dateRange?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetBusinessOrderTypeChartData;
  }

  /**
   * No description
   * @tags businesses
   * @name GetBusiness
   * @request GET:/api/v1/businesses/{businessId}
   * @secure
   * @response `200` `GetBusinessData`
   */
  export namespace GetBusiness {
    export type RequestParams = {
      businessId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetBusinessData;
  }

  /**
   * No description
   * @tags businesses
   * @name GetBusinessVehicles
   * @request GET:/api/v1/businesses/{businessId}/vehicles
   * @secure
   * @response `200` `GetBusinessVehiclesData`
   */
  export namespace GetBusinessVehicles {
    export type RequestParams = {
      businessId: string;
    };
    export type RequestQuery = {
      /** Select this to filter by assigned/non-assigned vehicles */
      isAssigned?: boolean;
      /** comma-seprarated list of vehicle statuses */
      status?: string;
      /** filter by vehicle Id */
      vehicleId?: any;
      /** Order by default is ASC, select either from the the enum ['ASC', 'DESC'] */
      order?: "ASC" | "DESC";
      page?: number;
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetBusinessVehiclesData;
  }

  /**
   * No description
   * @tags businesses
   * @name UpdateBusinessPreferences
   * @request PATCH:/api/v1/businesses/{businessId}/preferences
   * @secure
   * @response `200` `UpdateBusinessPreferencesData`
   */
  export namespace UpdateBusinessPreferences {
    export type RequestParams = {
      businessId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdatePreferencesRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateBusinessPreferencesData;
  }

  /**
   * No description
   * @tags businesses
   * @name SuspendBusinessUser
   * @request PATCH:/api/v1/businesses/{businessId}/users/{userId}/suspend
   * @secure
   * @response `200` `SuspendBusinessUserData`
   */
  export namespace SuspendBusinessUser {
    export type RequestParams = {
      businessId: string;
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SuspendBusinessUserData;
  }

  /**
   * No description
   * @tags businesses
   * @name UnsuspendBusinessUser
   * @request PATCH:/api/v1/businesses/{businessId}/users/{userId}/unsuspend
   * @secure
   * @response `200` `UnsuspendBusinessUserData`
   */
  export namespace UnsuspendBusinessUser {
    export type RequestParams = {
      businessId: string;
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UnsuspendBusinessUserData;
  }

  /**
   * No description
   * @tags businesses
   * @name UpdateBusinessVehicle
   * @request PATCH:/api/v1/businesses/{businessId}/vehicles/{vehicleId}
   * @secure
   * @response `200` `UpdateBusinessVehicleData`
   */
  export namespace UpdateBusinessVehicle {
    export type RequestParams = {
      businessId: string;
      vehicleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateVehicleRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateBusinessVehicleData;
  }

  /**
   * No description
   * @tags reviews
   * @name GetReviews
   * @request GET:/api/v1/reviews
   * @secure
   * @response `200` `GetReviewsData`
   */
  export namespace GetReviews {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 1 = include the customer and the order on each row */
      expand?: any;
      /** Only reviews left by this customer */
      userId?: any;
      /** Only reviews left for this rider */
      riderId?: any;
      order?: "ASC" | "DESC";
      page?: number;
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetReviewsData;
  }

  /**
   * No description
   * @tags reviews
   * @name RateRider
   * @request POST:/api/v1/reviews/rate-rider
   * @secure
   * @response `201` `RateRiderData`
   */
  export namespace RateRider {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RateRiderRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = RateRiderData;
  }

  /**
   * No description
   * @tags vehicles
   * @name UpdateUserVehicle
   * @request POST:/api/v1/vehicles
   * @secure
   * @response `201` `UpdateUserVehicleData`
   */
  export namespace UpdateUserVehicle {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateVehicleRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateUserVehicleData;
  }

  /**
   * No description
   * @tags vehicles
   * @name GetVehicle
   * @request GET:/api/v1/vehicles/{vehicleId}
   * @secure
   * @response `200` `GetVehicleData`
   */
  export namespace GetVehicle {
    export type RequestParams = {
      vehicleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetVehicleData;
  }

  /**
   * No description
   * @tags vehicles
   * @name DeleteUserVehicle
   * @request DELETE:/api/v1/vehicles/{vehicleId}
   * @secure
   * @response `200` `DeleteUserVehicleData`
   */
  export namespace DeleteUserVehicle {
    export type RequestParams = {
      vehicleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteUserVehicleData;
  }

  /**
   * No description
   * @tags admins/vehicles
   * @name GetVehicles
   * @request GET:/api/v1/admins/vehicles
   * @secure
   * @response `200` `GetVehiclesData`
   */
  export namespace GetVehicles {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Search by vehicle name, plate number, model, make, engine number, or chassis number. Also search by courier email, phone, firstname, lastname, middlename, or nin. This query is case insensitive. */
      vehicleSearch?: string;
      /** Filter by setting either of the enum values ['0', '1', 'false', 'true']. Select this to filter by assigned/non-assigned vehicles */
      isAssigned?: "0" | "1" | "false" | "true";
      /** comma-seprarated list of vehicle models */
      model?: string;
      /** comma-seprarated list of vehicle makes */
      make?: string;
      /** Filter by setting either of the enum values ['0', '1', 'false', 'true'] */
      isDeleted?: "0" | "1" | "false" | "true";
      /** comma-seprarated list of vehicle statuses */
      status?: string;
      /** order by default is ASC, select either from the the enum ['ASC', 'DESC'] */
      order?: "ASC" | "DESC";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetVehiclesData;
  }

  /**
   * No description
   * @tags admins/vehicles
   * @name AdminUpdateUserVehicle
   * @request POST:/api/v1/admins/vehicles/{userId}/create
   * @secure
   * @response `201` `AdminUpdateUserVehicleData`
   */
  export namespace AdminUpdateUserVehicle {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateVehicleRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminUpdateUserVehicleData;
  }

  /**
   * No description
   * @tags admins/vehicles
   * @name VerifyVehicle
   * @request PATCH:/api/v1/admins/vehicles/{vehicleId}/users/{userId}/verify
   * @secure
   * @response `200` `VerifyVehicleData`
   */
  export namespace VerifyVehicle {
    export type RequestParams = {
      vehicleId: string;
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VerifyVehicleData;
  }

  /**
   * No description
   * @tags admins/vehicles
   * @name RejectVehicle
   * @request PATCH:/api/v1/admins/vehicles/{vehicleId}/users/{userId}/reject
   * @secure
   * @response `200` `RejectVehicleData`
   */
  export namespace RejectVehicle {
    export type RequestParams = {
      vehicleId: string;
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateVehicleStatusRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = RejectVehicleData;
  }

  /**
   * No description
   * @tags admins/vehicles
   * @name SuspendVehicle
   * @request PATCH:/api/v1/admins/vehicles/{vehicleId}/users/{userId}/suspend
   * @secure
   * @response `200` `SuspendVehicleData`
   */
  export namespace SuspendVehicle {
    export type RequestParams = {
      vehicleId: string;
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateVehicleStatusRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = SuspendVehicleData;
  }

  /**
   * No description
   * @tags admins/vehicles
   * @name AdminGetVehicle
   * @request GET:/api/v1/admins/vehicles/{vehicleId}
   * @secure
   * @response `200` `AdminGetVehicleData`
   */
  export namespace AdminGetVehicle {
    export type RequestParams = {
      vehicleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminGetVehicleData;
  }

  /**
   * No description
   * @tags admins/vehicles
   * @name DeleteVehicle
   * @request DELETE:/api/v1/admins/vehicles/{vehicleId}
   * @secure
   * @response `200` `DeleteVehicleData`
   */
  export namespace DeleteVehicle {
    export type RequestParams = {
      vehicleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteVehicleData;
  }

  /**
   * No description
   * @tags orders
   * @name CreateSingleOrder
   * @request POST:/api/v1/orders/single
   * @secure
   * @response `201` `CreateSingleOrderData`
   */
  export namespace CreateSingleOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateSingleOrderDto;
    export type RequestHeaders = {
      "x-country-code": string;
      "x-state-code": string;
    };
    export type ResponseBody = CreateSingleOrderData;
  }

  /**
   * No description
   * @tags orders
   * @name CreateBulkOrder
   * @request POST:/api/v1/orders/bulk
   * @secure
   * @response `201` `CreateBulkOrderData`
   */
  export namespace CreateBulkOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateBulkOrderDto;
    export type RequestHeaders = {
      "x-country-code": string;
      "x-state-code": string;
    };
    export type ResponseBody = CreateBulkOrderData;
  }

  /**
   * No description
   * @tags orders
   * @name QuoteOrder
   * @request POST:/api/v1/orders/quote
   * @secure
   * @response `200` `QuoteOrderData`
   * @response `201` `QuoteOrderResponseDto`
   */
  export namespace QuoteOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = QuoteOrderRequestDto;
    export type RequestHeaders = {
      "x-country-code": string;
      "x-state-code": string;
    };
    export type ResponseBody = QuoteOrderData;
  }

  /**
   * No description
   * @tags orders
   * @name QuoteBatchOrder
   * @request POST:/api/v1/orders/quote-batch
   * @response `200` `QuoteBatchOrderData`
   * @response `201` `QuoteBatchOrderResponseDto`
   */
  export namespace QuoteBatchOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = QuoteBatchOrderRequestDto;
    export type RequestHeaders = {
      "x-country-code": string;
      "x-state-code": string;
    };
    export type ResponseBody = QuoteBatchOrderData;
  }

  /**
   * No description
   * @tags orders
   * @name QuoteBulkOrder
   * @request POST:/api/v1/orders/quote-bulk
   * @secure
   * @response `200` `QuoteBulkOrderData`
   * @response `201` `QuoteBulkOrderResponseDto`
   */
  export namespace QuoteBulkOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = QuoteBulkOrderRequestDto;
    export type RequestHeaders = {
      "x-country-code": string;
      "x-state-code": string;
    };
    export type ResponseBody = QuoteBulkOrderData;
  }

  /**
   * No description
   * @tags orders
   * @name CreateBatchOrder
   * @request POST:/api/v1/orders/batch
   * @secure
   * @response `201` `CreateBatchOrderData`
   */
  export namespace CreateBatchOrder {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateBatchOrderDto;
    export type RequestHeaders = {
      "x-country-code": string;
      "x-state-code": string;
    };
    export type ResponseBody = CreateBatchOrderData;
  }

  /**
   * No description
   * @tags orders
   * @name RequestOrderRiders
   * @request POST:/api/v1/orders/{orderId}/request-riders
   * @secure
   * @response `201` `RequestOrderRidersData`
   */
  export namespace RequestOrderRiders {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RidersRequestDto;
    export type RequestHeaders = {
      "x-country-code": string;
      "x-state-code": string;
    };
    export type ResponseBody = RequestOrderRidersData;
  }

  /**
   * No description
   * @tags orders
   * @name ReDispatch
   * @request POST:/api/v1/orders/{orderId}/re-dispatch
   * @secure
   * @response `201` `ReDispatchData`
   */
  export namespace ReDispatch {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ReDispatchRequestDto;
    export type RequestHeaders = {
      "x-country-code": string;
      "x-state-code": string;
    };
    export type ResponseBody = ReDispatchData;
  }

  /**
   * No description
   * @tags orders
   * @name PayRiderTrip
   * @summary Pay the rider half the agreed price for a trip to the store on a called-off storefront delivery
   * @request POST:/api/v1/orders/{orderId}/trip-pay
   * @secure
   * @response `201` `PayRiderTripData`
   */
  export namespace PayRiderTrip {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = PayRiderTripRequestDto;
    export type RequestHeaders = {
      "x-country-code": string;
      "x-state-code": string;
    };
    export type ResponseBody = PayRiderTripData;
  }

  /**
   * No description
   * @tags orders
   * @name ReleaseOrderRider
   * @summary Take the accepted rider off an order before pickup and ring the other eligible riders
   * @request POST:/api/v1/orders/{orderId}/release-rider
   * @secure
   * @response `200` `ReleaseOrderRiderData`
   * @response `201` `ReleaseRiderResponseDto`
   */
  export namespace ReleaseOrderRider {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ReleaseRiderRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = ReleaseOrderRiderData;
  }

  /**
   * No description
   * @tags orders
   * @name RiderReleaseOrder
   * @summary Rider: "Can't make it". Give an accepted order back before pickup. Free for 2 minutes after accepting, then it counts as a cancellation (3 counted per Lagos day; the 4th is refused with RELEASE_LIMIT_REACHED)
   * @request POST:/api/v1/orders/{orderId}/rider-release
   * @secure
   * @response `200` `RiderReleaseOrderData`
   * @response `201` `RiderReleaseResponseDto`
   */
  export namespace RiderReleaseOrder {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RiderReleaseRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = RiderReleaseOrderData;
  }

  /**
   * No description
   * @tags orders
   * @name ReassignRider
   * @request POST:/api/v1/orders/{orderId}/reassign
   * @secure
   * @response `201` `ReassignRiderData`
   */
  export namespace ReassignRider {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ReassignRiderRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = ReassignRiderData;
  }

  /**
   * No description
   * @tags orders
   * @name ForceAssignRider
   * @summary Hand the order straight to a chosen rider without ringing them (rider must be online and free)
   * @request POST:/api/v1/orders/{orderId}/force-assign
   * @secure
   * @response `200` `ForceAssignRiderData`
   * @response `201` `ForceAssignRiderResponseDto`
   */
  export namespace ForceAssignRider {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ForceAssignRiderDto;
    export type RequestHeaders = {};
    export type ResponseBody = ForceAssignRiderData;
  }

  /**
   * No description
   * @tags orders
   * @name GetNearbyRidersCount
   * @summary How many eligible riders would be rung for an order placed from this point right now
   * @request GET:/api/v1/orders/riders/nearby-count
   * @secure
   * @response `200` `GetNearbyRidersCountData`
   */
  export namespace GetNearbyRidersCount {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @example 6.5244 */
      latitude: number;
      /** @example 3.3792 */
      longitude: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      "x-country-code": string;
      "x-state-code": string;
    };
    export type ResponseBody = GetNearbyRidersCountData;
  }

  /**
   * No description
   * @tags orders
   * @name RiderOrderCapacity
   * @summary The signed-in rider's active orders against their region's cap. While busy, bids are refused with RIDER_BUSY
   * @request GET:/api/v1/orders/riders/capacity
   * @secure
   * @response `200` `RiderOrderCapacityData`
   */
  export namespace RiderOrderCapacity {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      "x-country-code": string;
      "x-state-code": string;
    };
    export type ResponseBody = RiderOrderCapacityData;
  }

  /**
   * No description
   * @tags orders
   * @name GetArrivalCheck
   * @summary The arrival check for the signed-in rider: whether it is on, and how close they must be
   * @request GET:/api/v1/orders/riders/arrival-check
   * @secure
   * @response `200` `GetArrivalCheckData`
   */
  export namespace GetArrivalCheck {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetArrivalCheckData;
  }

  /**
   * No description
   * @tags orders
   * @name GetRidersLeaderboard
   * @request GET:/api/v1/orders/riders/leaderboard
   * @secure
   * @response `200` `GetRidersLeaderboardData`
   */
  export namespace GetRidersLeaderboard {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetRidersLeaderboardData;
  }

  /**
   * No description
   * @tags orders
   * @name LookupRiderForStore
   * @summary Storefront service only: find a rider by phone or id, as a minimal card (no contact details)
   * @request GET:/api/v1/orders/riders/lookup
   * @secure
   * @response `200` `LookupRiderForStoreData`
   */
  export namespace LookupRiderForStore {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * The number the store typed in
       * @maxLength 20
       * @pattern /^\+?[0-9 ()-]{7,20}$/
       * @example "08031234567"
       */
      phone?: string;
      /** A rider id saved from an earlier lookup */
      riderId?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** The shared dispatch secret */
      "x-dispatch-secret": string;
    };
    export type ResponseBody = LookupRiderForStoreData;
  }

  /**
   * No description
   * @tags orders
   * @name SendRiderLinkCode
   * @summary Storefront service only: deliver a store's rider consent code to the rider's Pickriders app
   * @request POST:/api/v1/orders/riders/link-code
   * @secure
   * @response `200` `SendRiderLinkCodeData`
   */
  export namespace SendRiderLinkCode {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RiderLinkCodeRequestDto;
    export type RequestHeaders = {
      /** The shared dispatch secret */
      "x-dispatch-secret": string;
    };
    export type ResponseBody = SendRiderLinkCodeData;
  }

  /**
   * No description
   * @tags orders
   * @name ListAllRiders
   * @summary Deprecated alias — use GET /orders/riders/leaderboard
   * @request GET:/api/v1/orders/riders/list
   * @deprecated
   * @secure
   * @response `200` `ListAllRidersData`
   */
  export namespace ListAllRiders {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListAllRidersData;
  }

  /**
   * No description
   * @tags orders
   * @name GetRiderLocations
   * @request POST:/api/v1/orders/riders/locations
   * @secure
   * @response `201` `GetRiderLocationsData`
   */
  export namespace GetRiderLocations {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RiderLocationsRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = GetRiderLocationsData;
  }

  /**
   * No description
   * @tags orders
   * @name CancelOrderLocation
   * @request PATCH:/api/v1/orders/{orderId}/locations/{locationId}/cancel
   * @secure
   * @response `200` `CancelOrderLocationData`
   */
  export namespace CancelOrderLocation {
    export type RequestParams = {
      orderId: string;
      locationId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CancelLocationRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = CancelOrderLocationData;
  }

  /**
   * No description
   * @tags orders
   * @name RescheduleOrder
   * @request PATCH:/api/v1/orders/{orderId}/schedule
   * @secure
   * @response `200` `RescheduleOrderData`
   */
  export namespace RescheduleOrder {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RescheduleOrderRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = RescheduleOrderData;
  }

  /**
   * No description
   * @tags orders
   * @name CancelOrder
   * @request PATCH:/api/v1/orders/{orderId}/cancel
   * @secure
   * @response `200` `CancelOrderData`
   */
  export namespace CancelOrder {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CancelOrderRequestDto;
    export type RequestHeaders = {
      "x-country-code": string;
      "x-state-code": string;
    };
    export type ResponseBody = CancelOrderData;
  }

  /**
   * No description
   * @tags orders
   * @name MakeOrderOffer
   * @request POST:/api/v1/orders/{orderId}/offers
   * @secure
   * @response `201` `MakeOrderOfferData`
   */
  export namespace MakeOrderOffer {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = MakeOfferRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = MakeOrderOfferData;
  }

  /**
   * No description
   * @tags orders
   * @name InitiateOrderPayment
   * @request PATCH:/api/v1/orders/{orderId}/wallets/{walletId}/pay
   * @secure
   * @response `200` `InitiateOrderPaymentData`
   */
  export namespace InitiateOrderPayment {
    export type RequestParams = {
      orderId: string;
      walletId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = PayOrderRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = InitiateOrderPaymentData;
  }

  /**
   * No description
   * @tags orders
   * @name CreateOrderPaymentLink
   * @request POST:/api/v1/orders/{orderId}/payment-link
   * @secure
   * @response `200` `CreateOrderPaymentLinkData`
   * @response `201` `OrderPaymentLinkResponseDto`
   */
  export namespace CreateOrderPaymentLink {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = PayOrderRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = CreateOrderPaymentLinkData;
  }

  /**
   * No description
   * @tags orders
   * @name VerifyOrderPayment
   * @request GET:/api/v1/orders/{orderId}/payment-status
   * @secure
   * @response `200` `VerifyOrderPaymentData`
   */
  export namespace VerifyOrderPayment {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VerifyOrderPaymentData;
  }

  /**
   * No description
   * @tags orders
   * @name GetOrderPaymentInfo
   * @request GET:/api/v1/orders/pay/{token}
   * @response `200` `GetOrderPaymentInfoData`
   */
  export namespace GetOrderPaymentInfo {
    export type RequestParams = {
      token: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetOrderPaymentInfoData;
  }

  /**
   * No description
   * @tags orders
   * @name ConfirmExternalPaymentByReference
   * @request GET:/api/v1/orders/payment/confirm
   * @response `200` `ConfirmExternalPaymentByReferenceData`
   */
  export namespace ConfirmExternalPaymentByReference {
    export type RequestParams = {};
    export type RequestQuery = {
      reference: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ConfirmExternalPaymentByReferenceData;
  }

  /**
   * No description
   * @tags orders
   * @name InitializeExternalOrderPayment
   * @request POST:/api/v1/orders/pay/{token}/initialize
   * @response `201` `InitializeExternalOrderPaymentData`
   */
  export namespace InitializeExternalOrderPayment {
    export type RequestParams = {
      token: string;
    };
    export type RequestQuery = {};
    export type RequestBody = InitializeOrderPaymentRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = InitializeExternalOrderPaymentData;
  }

  /**
   * No description
   * @tags orders
   * @name AcceptOrRejectOrderOffer
   * @request PATCH:/api/v1/orders/{orderId}/offers/{offerId}
   * @secure
   * @response `200` `AcceptOrRejectOrderOfferData`
   */
  export namespace AcceptOrRejectOrderOffer {
    export type RequestParams = {
      orderId: string;
      offerId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AcceptRejectOfferRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AcceptOrRejectOrderOfferData;
  }

  /**
   * No description
   * @tags orders
   * @name StartOrder
   * @request PATCH:/api/v1/orders/{orderId}/start
   * @secure
   * @response `200` `StartOrderData`
   */
  export namespace StartOrder {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = StartOrderData;
  }

  /**
   * No description
   * @tags orders
   * @name StartOrderLocation
   * @request PATCH:/api/v1/orders/{orderId}/locations/{locationId}/start
   * @secure
   * @response `200` `StartOrderLocationData`
   */
  export namespace StartOrderLocation {
    export type RequestParams = {
      orderId: string;
      locationId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = StartOrderLocationData;
  }

  /**
   * No description
   * @tags orders
   * @name UpdateOrderLocationStatus
   * @request PATCH:/api/v1/orders/{orderId}/locations/{locationId}/status
   * @secure
   * @response `200` `UpdateOrderLocationStatusData`
   */
  export namespace UpdateOrderLocationStatus {
    export type RequestParams = {
      orderId: string;
      locationId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateLocationStatusRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateOrderLocationStatusData;
  }

  /**
   * No description
   * @tags orders
   * @name GetOrderEta
   * @request GET:/api/v1/orders/{orderId}/eta
   * @secure
   * @response `200` `GetOrderEtaData`
   */
  export namespace GetOrderEta {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetOrderEtaData;
  }

  /**
   * No description
   * @tags orders
   * @name QuoteOrderLocation
   * @request POST:/api/v1/orders/{orderId}/locations/{locationId}/quote
   * @secure
   * @response `200` `QuoteOrderLocationData`
   * @response `201` `QuoteOrderLocationResponseDto`
   */
  export namespace QuoteOrderLocation {
    export type RequestParams = {
      orderId: string;
      locationId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateOrderLocationDto;
    export type RequestHeaders = {
      "x-country-code": string;
      "x-state-code": string;
    };
    export type ResponseBody = QuoteOrderLocationData;
  }

  /**
   * No description
   * @tags orders
   * @name UpdateOrderLocation
   * @request PATCH:/api/v1/orders/{orderId}/locations/{locationId}
   * @secure
   * @response `200` `UpdateOrderLocationData`
   */
  export namespace UpdateOrderLocation {
    export type RequestParams = {
      orderId: string;
      locationId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateOrderLocationDto;
    export type RequestHeaders = {
      "x-country-code": string;
      "x-state-code": string;
    };
    export type ResponseBody = UpdateOrderLocationData;
  }

  /**
   * No description
   * @tags orders
   * @name CancelLocationUpdate
   * @request PATCH:/api/v1/orders/{orderId}/locations/{locationId}/updates/{updateId}/cancel
   * @secure
   * @response `200` `CancelLocationUpdateData`
   */
  export namespace CancelLocationUpdate {
    export type RequestParams = {
      orderId: string;
      locationId: string;
      updateId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CancelLocationUpdateData;
  }

  /**
   * No description
   * @tags orders
   * @name RespondToLocationUpdate
   * @request PATCH:/api/v1/orders/{orderId}/locations/{locationId}/updates/{updateId}
   * @secure
   * @response `200` `RespondToLocationUpdateData`
   */
  export namespace RespondToLocationUpdate {
    export type RequestParams = {
      orderId: string;
      locationId: string;
      updateId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AcceptRejectLocationUpdateRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = RespondToLocationUpdateData;
  }

  /**
   * No description
   * @tags orders
   * @name ApplyOrderCoupon
   * @request PATCH:/api/v1/orders/{orderId}/coupons/{couponCode}/apply
   * @secure
   * @response `200` `ApplyOrderCouponData`
   */
  export namespace ApplyOrderCoupon {
    export type RequestParams = {
      orderId: string;
      couponCode: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ApplyOrderCouponData;
  }

  /**
   * No description
   * @tags orders
   * @name RemoveOrderCoupon
   * @request PATCH:/api/v1/orders/{orderId}/coupons/{couponCode}/remove
   * @secure
   * @response `200` `RemoveOrderCouponData`
   */
  export namespace RemoveOrderCoupon {
    export type RequestParams = {
      orderId: string;
      couponCode: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = RemoveOrderCouponData;
  }

  /**
   * No description
   * @tags orders
   * @name CompleteOrderLocation
   * @request PATCH:/api/v1/orders/{orderId}/locations/{locationId}/complete
   * @secure
   * @response `200` `CompleteOrderLocationData`
   */
  export namespace CompleteOrderLocation {
    export type RequestParams = {
      orderId: string;
      locationId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CompleteLocationRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = CompleteOrderLocationData;
  }

  /**
   * No description
   * @tags orders
   * @name CompleteOrder
   * @request PATCH:/api/v1/orders/{orderId}/complete
   * @secure
   * @response `200` `CompleteOrderData`
   */
  export namespace CompleteOrder {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      "x-country-code": string;
      "x-state-code": string;
    };
    export type ResponseBody = CompleteOrderData;
  }

  /**
   * No description
   * @tags orders
   * @name QueueOrder
   * @request PATCH:/api/v1/orders/{orderId}/queue
   * @secure
   * @response `200` `QueueOrderData`
   */
  export namespace QueueOrder {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = QueueOrderData;
  }

  /**
   * No description
   * @tags orders
   * @name GetQueuedOrders
   * @summary Open orders listed to the signed-in rider. A rider at their active-order cap sees `stack` on each order that stacks for them (order stacking: ON_THE_WAY or NEXT_NEARBY)
   * @request GET:/api/v1/orders/queued-orders
   * @secure
   * @response `200` `GetQueuedOrdersData`
   */
  export namespace GetQueuedOrders {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      "x-country-code": string;
      "x-state-code": string;
    };
    export type ResponseBody = GetQueuedOrdersData;
  }

  /**
   * No description
   * @tags orders
   * @name GetActiveOffers
   * @request GET:/api/v1/orders/{orderId}/active-offers
   * @secure
   * @response `200` `GetActiveOffersData`
   */
  export namespace GetActiveOffers {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetActiveOffersData;
  }

  /**
   * No description
   * @tags orders
   * @name GetUserOrders
   * @request GET:/api/v1/orders
   * @secure
   * @response `200` `GetUserOrdersData`
   */
  export namespace GetUserOrders {
    export type RequestParams = {};
    export type RequestQuery = {
      /** date filter for scheduled orders - provide this if filtering for scheduled orders */
      scheduledFor?: any;
      /** filter for scheduled orders */
      isScheduled?: any;
      /** Comma-separated start and end date filter (e.g., 2023-09-01,2023-09-30) */
      dateRange?: any;
      /** order type filter. Comma seprarated list of OrderType */
      type?: string;
      /** order status filter. Comma seprarated list of OrderStatus */
      status?: string;
      /** search by order number */
      orderNumber?: any;
      /** the records sorting order */
      order?: "ASC" | "DESC";
      page?: number;
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserOrdersData;
  }

  /**
   * No description
   * @tags orders
   * @name GetRiderOrders
   * @request GET:/api/v1/orders/riders
   * @secure
   * @response `200` `GetRiderOrdersData`
   */
  export namespace GetRiderOrders {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Comma-separated start and end date filter (e.g., 2023-09-01,2023-09-30) */
      dateRange?: any;
      /** order type filter. Comma seprarated list of OrderType */
      type?: string;
      /** order status filter. Comma seprarated list of OrderStatus */
      status?: string;
      /** search by order number */
      orderNumber?: any;
      /** the records sorting order */
      order?: "ASC" | "DESC";
      page?: number;
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetRiderOrdersData;
  }

  /**
   * No description
   * @tags orders
   * @name GetPendingLocationUpdate
   * @request GET:/api/v1/orders/location-updates/pending
   * @secure
   * @response `200` `GetPendingLocationUpdateData`
   */
  export namespace GetPendingLocationUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetPendingLocationUpdateData;
  }

  /**
   * No description
   * @tags orders
   * @name GetLatestLocationUpdateForCustomer
   * @request GET:/api/v1/orders/{orderId}/location-updates/latest
   * @secure
   * @response `200` `GetLatestLocationUpdateForCustomerData`
   */
  export namespace GetLatestLocationUpdateForCustomer {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetLatestLocationUpdateForCustomerData;
  }

  /**
   * No description
   * @tags orders
   * @name GetUserOrder
   * @request GET:/api/v1/orders/{orderId}
   * @secure
   * @response `200` `GetUserOrderData`
   */
  export namespace GetUserOrder {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserOrderData;
  }

  /**
   * No description
   * @tags orders
   * @name GetRiderOrderStatistics
   * @request GET:/api/v1/orders/riders/order-statistics
   * @secure
   * @response `200` `GetRiderOrderStatisticsData`
   */
  export namespace GetRiderOrderStatistics {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Comma-separated start and end date filter (e.g., 2023-09-01,2023-09-30) */
      dateRange?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      "x-state-code"?: string;
      "x-country-code"?: string;
    };
    export type ResponseBody = GetRiderOrderStatisticsData;
  }

  /**
   * No description
   * @tags orders
   * @name GetOrderStatusChart
   * @request GET:/api/v1/orders/riders/status-chart
   * @secure
   * @response `200` `GetOrderStatusChartData`
   */
  export namespace GetOrderStatusChart {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Comma-separated start and end date filter (e.g., 2023-09-01,2023-09-30) */
      dateRange?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetOrderStatusChartData;
  }

  /**
   * No description
   * @tags orders
   * @name GetOrderTypeChart
   * @request GET:/api/v1/orders/riders/type-chart
   * @secure
   * @response `200` `GetOrderTypeChartData`
   */
  export namespace GetOrderTypeChart {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Comma-separated start and end date filter (e.g., 2023-09-01,2023-09-30) */
      dateRange?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetOrderTypeChartData;
  }

  /**
   * No description
   * @tags orders
   * @name RiderNearbyHandoffs
   * @summary Open handoffs near you that you can take now, nearest first
   * @request GET:/api/v1/orders/handoffs/nearby
   * @secure
   * @response `200` `RiderNearbyHandoffsData`
   */
  export namespace RiderNearbyHandoffs {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = RiderNearbyHandoffsData;
  }

  /**
   * No description
   * @tags orders
   * @name RiderMyHandoffs
   * @summary TO: handoffs you accepted that aren't swapped yet (the order isn't yours until the code swap, so it isn't in your active orders)
   * @request GET:/api/v1/orders/handoffs/mine
   * @secure
   * @response `200` `RiderMyHandoffsData`
   */
  export namespace RiderMyHandoffs {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = RiderMyHandoffsData;
  }

  /**
   * No description
   * @tags orders
   * @name RiderRequestHandoff
   * @summary FROM: hand a picked-up order to another rider. Rings riders near you (ACCIDENT waits for support). HANDOFF_NOT_ALLOWED when not picked up, not yours, turned off, or the per-order limit is reached
   * @request POST:/api/v1/orders/{orderId}/handoff
   * @secure
   * @response `200` `RiderRequestHandoffData`
   * @response `201` `HandoffViewDto`
   */
  export namespace RiderRequestHandoff {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RiderRequestHandoffRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = RiderRequestHandoffData;
  }

  /**
   * No description
   * @tags orders
   * @name RiderGetHandoff
   * @summary The handoff on this order as you see it (FROM, TO, or a rider rung for it)
   * @request GET:/api/v1/orders/{orderId}/handoff
   * @secure
   * @response `200` `RiderGetHandoffData`
   */
  export namespace RiderGetHandoff {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = RiderGetHandoffData;
  }

  /**
   * No description
   * @tags orders
   * @name RiderStartHandoffSearch
   * @summary FROM, after an ACCIDENT: I'm safe, find a rider
   * @request POST:/api/v1/orders/{orderId}/handoff/search
   * @secure
   * @response `200` `RiderStartHandoffSearchData`
   * @response `201` `HandoffViewDto`
   */
  export namespace RiderStartHandoffSearch {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RiderStartHandoffSearchRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = RiderStartHandoffSearchData;
  }

  /**
   * No description
   * @tags orders
   * @name RiderCancelHandoff
   * @summary FROM: call the handoff off and keep the order (a rider who accepted is compensated)
   * @request POST:/api/v1/orders/{orderId}/handoff/cancel
   * @secure
   * @response `200` `RiderCancelHandoffData`
   * @response `201` `HandoffViewDto`
   */
  export namespace RiderCancelHandoff {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RiderCancelHandoffRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = RiderCancelHandoffData;
  }

  /**
   * No description
   * @tags orders
   * @name RiderAcceptHandoff
   * @summary TO: take the handoff. First accept wins; later ones get 409 HANDOFF_TAKEN
   * @request POST:/api/v1/orders/{orderId}/handoff/accept
   * @secure
   * @response `200` `RiderAcceptHandoffData`
   * @response `201` `HandoffViewDto`
   */
  export namespace RiderAcceptHandoff {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RiderAcceptHandoffRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = RiderAcceptHandoffData;
  }

  /**
   * No description
   * @tags orders
   * @name RiderDeclineHandoff
   * @summary TO: pass on the handoff; you are not rung for it again
   * @request POST:/api/v1/orders/{orderId}/handoff/decline
   * @secure
   * @response `200` `RiderDeclineHandoffData`
   * @response `201` `RiderDeclineHandoffResponseDto`
   */
  export namespace RiderDeclineHandoff {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RiderDeclineHandoffRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = RiderDeclineHandoffData;
  }

  /**
   * No description
   * @tags orders
   * @name RiderConfirmHandoff
   * @summary TO: enter FROM's 4-digit code where you stand; the order becomes yours. HANDOFF_CODE_INVALID (details.attemptsLeft) on a wrong code, 429 HANDOFF_LOCKED (details.lockedUntil) after 5
   * @request POST:/api/v1/orders/{orderId}/handoff/confirm
   * @secure
   * @response `200` `RiderConfirmHandoffData`
   * @response `201` `HandoffViewDto`
   */
  export namespace RiderConfirmHandoff {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RiderConfirmHandoffRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = RiderConfirmHandoffData;
  }

  /**
   * No description
   * @tags orders
   * @name RiderPassOrder
   * @summary Rider: "Not now" on an order request. Ends your ring at once (the search moves on to the next rider) and hides the order from you unless its price goes up. No penalty. A repeat pass changes nothing. NOT_ALLOWED when you already have the order (release it instead) or it is no longer looking for a rider
   * @request POST:/api/v1/orders/{orderId}/pass
   * @secure
   * @response `200` `RiderPassOrderData`
   */
  export namespace RiderPassOrder {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RiderPassOrderRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = RiderPassOrderData;
  }

  /**
   * No description
   * @tags admins/orders
   * @name GetOrders
   * @request GET:/api/v1/admins/orders
   * @secure
   * @response `200` `GetOrdersData`
   */
  export namespace GetOrders {
    export type RequestParams = {};
    export type RequestQuery = {
      /** true: only orders a rider was released from at least once (riderReleaseCount > 0) */
      releasedOnly?: boolean;
      /** date filter for scheduled orders - provide this if filtering for scheduled orders */
      scheduledFor?: any;
      /** filter for orders by user id */
      byUserId?: any;
      /** filter for scheduled orders */
      isScheduled?: any;
      /** Comma-separated start and end date filter (e.g., 2023-09-01,2023-09-30) */
      dateRange?: any;
      /** order type filter. Comma seprarated list of OrderType */
      type?: string;
      /** order status filter. Comma seprarated list of OrderStatus */
      status?: string;
      /** search by order number */
      orderNumber?: any;
      /** the records sorting order */
      order?: "ASC" | "DESC";
      sortBy?: "createdAt" | "scheduledFor" | "updatedAt";
      /** Order number, or customer / rider name, phone or email */
      search?: string;
      page?: number;
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetOrdersData;
  }

  /**
   * No description
   * @tags admins/orders
   * @name GetOrder
   * @request GET:/api/v1/admins/orders/{orderId}
   * @secure
   * @response `200` `GetOrderData`
   */
  export namespace GetOrder {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetOrderData;
  }

  /**
   * No description
   * @tags admins/orders
   * @name GetOrderOffers
   * @request GET:/api/v1/admins/orders/{orderId}/offers
   * @secure
   * @response `200` `GetOrderOffersData`
   */
  export namespace GetOrderOffers {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetOrderOffersData;
  }

  /**
   * No description
   * @tags admins/orders
   * @name AdminOrderRiderHistory
   * @summary Every rider who held the order, oldest first: who accepted when, who released and why, and where it is now
   * @request GET:/api/v1/admins/orders/{orderId}/rider-history
   * @secure
   * @response `200` `AdminOrderRiderHistoryData`
   */
  export namespace AdminOrderRiderHistory {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminOrderRiderHistoryData;
  }

  /**
   * No description
   * @tags admins/orders
   * @name AdminListOrderHandoffs
   * @summary Every rider handoff on the order, oldest first
   * @request GET:/api/v1/admins/orders/{orderId}/handoffs
   * @secure
   * @response `200` `AdminListOrderHandoffsData`
   */
  export namespace AdminListOrderHandoffs {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminListOrderHandoffsData;
  }

  /**
   * No description
   * @tags admins/orders
   * @name RingRiders
   * @request POST:/api/v1/admins/orders/{orderId}/ring-riders
   * @secure
   * @response `201` `RingRidersData`
   */
  export namespace RingRiders {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = RingRidersData;
  }

  /**
   * No description
   * @tags admins/orders
   * @name AdminCancelOrder
   * @request POST:/api/v1/admins/orders/{orderId}/cancel
   * @secure
   * @response `201` `AdminCancelOrderData`
   */
  export namespace AdminCancelOrder {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AdminCancelOrderRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminCancelOrderData;
  }

  /**
   * No description
   * @tags admins/orders
   * @name UpdateOrderStatus
   * @request PATCH:/api/v1/admins/orders/{orderId}/status
   * @secure
   * @response `200` `UpdateOrderStatusData`
   */
  export namespace UpdateOrderStatus {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AdminUpdateOrderStatusRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateOrderStatusData;
  }

  /**
   * No description
   * @tags admins/riders
   * @name AdminListRiderReleases
   * @summary A rider's released trips (newest first) with counts for today (Lagos), 7 days and 30 days
   * @request GET:/api/v1/admins/riders/{riderId}/releases
   * @secure
   * @response `200` `AdminListRiderReleasesData`
   */
  export namespace AdminListRiderReleases {
    export type RequestParams = {
      riderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminListRiderReleasesData;
  }

  /**
   * No description
   * @tags admins/handoffs
   * @name AdminListHandoffs
   * @summary Rider handoffs, newest first, with both riders, the split, bonus and review state
   * @request GET:/api/v1/admins/handoffs
   * @secure
   * @response `200` `AdminListHandoffsData`
   */
  export namespace AdminListHandoffs {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Comma-separated HandoffStatus values
       * @example "SEARCHING,ACCEPTED"
       */
      status?: string;
      /** true: only handoffs with review flags */
      flagged?: "true" | "false";
      /** pending: waiting for a count decision or holding a bonus */
      review?: "pending";
      /** Either rider (handing over or taking) */
      riderId?: string;
      /**
       * Created on or after (ISO date)
       * @example "2026-11-01"
       */
      from?: string;
      /**
       * Created on or before (ISO date)
       * @example "2026-11-30"
       */
      to?: string;
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 200
       * @default 50
       */
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminListHandoffsData;
  }

  /**
   * No description
   * @tags admins/handoffs
   * @name AdminHandoffsSummary
   * @summary Live searches, accidents awaiting support, reviews pending, swaps today
   * @request GET:/api/v1/admins/handoffs/summary
   * @secure
   * @response `200` `AdminHandoffsSummaryData`
   */
  export namespace AdminHandoffsSummary {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminHandoffsSummaryData;
  }

  /**
   * No description
   * @tags admins/handoffs
   * @name AdminStartHandoff
   * @summary Start a handoff for an order's rider (meeting point: the rider's last known position)
   * @request POST:/api/v1/admins/handoffs/start
   * @secure
   * @response `200` `AdminStartHandoffData`
   * @response `201` `AdminHandoffDto`
   */
  export namespace AdminStartHandoff {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AdminStartHandoffRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminStartHandoffData;
  }

  /**
   * No description
   * @tags admins/handoffs
   * @name AdminBulkReviewHandoffs
   * @summary Apply one review decision (and bonus action) to up to 100 completed handoffs
   * @request POST:/api/v1/admins/handoffs/review/bulk
   * @secure
   * @response `200` `AdminBulkReviewHandoffsData`
   * @response `201` `AdminBulkReviewHandoffsResponseDto`
   */
  export namespace AdminBulkReviewHandoffs {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AdminBulkReviewHandoffsRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminBulkReviewHandoffsData;
  }

  /**
   * No description
   * @tags admins/handoffs
   * @name AdminGetHandoff
   * @request GET:/api/v1/admins/handoffs/{handoffId}
   * @secure
   * @response `200` `AdminGetHandoffData`
   */
  export namespace AdminGetHandoff {
    export type RequestParams = {
      handoffId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminGetHandoffData;
  }

  /**
   * No description
   * @tags admins/handoffs
   * @name AdminStartHandoffSearch
   * @summary Start ringing riders for a handoff waiting for support (ACCIDENT)
   * @request POST:/api/v1/admins/handoffs/{handoffId}/search
   * @secure
   * @response `200` `AdminStartHandoffSearchData`
   * @response `201` `AdminHandoffDto`
   */
  export namespace AdminStartHandoffSearch {
    export type RequestParams = {
      handoffId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AdminStartHandoffSearchRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminStartHandoffSearchData;
  }

  /**
   * No description
   * @tags admins/handoffs
   * @name AdminAssignHandoffRider
   * @summary Give the handoff straight to a chosen rider (the code swap still applies)
   * @request POST:/api/v1/admins/handoffs/{handoffId}/assign
   * @secure
   * @response `200` `AdminAssignHandoffRiderData`
   * @response `201` `AdminHandoffDto`
   */
  export namespace AdminAssignHandoffRider {
    export type RequestParams = {
      handoffId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AdminAssignHandoffRiderRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminAssignHandoffRiderData;
  }

  /**
   * No description
   * @tags admins/handoffs
   * @name AdminCancelHandoff
   * @summary Call a live handoff off; a rider who accepted is compensated
   * @request POST:/api/v1/admins/handoffs/{handoffId}/cancel
   * @secure
   * @response `200` `AdminCancelHandoffData`
   * @response `201` `AdminHandoffDto`
   */
  export namespace AdminCancelHandoff {
    export type RequestParams = {
      handoffId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AdminCancelHandoffRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminCancelHandoffData;
  }

  /**
   * No description
   * @tags admins/handoffs
   * @name AdminDropHandoffRider
   * @summary The accepted rider is a no-show: search again without them
   * @request POST:/api/v1/admins/handoffs/{handoffId}/drop-rider
   * @secure
   * @response `200` `AdminDropHandoffRiderData`
   * @response `201` `AdminHandoffDto`
   */
  export namespace AdminDropHandoffRider {
    export type RequestParams = {
      handoffId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AdminDropHandoffRiderRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminDropHandoffRiderData;
  }

  /**
   * No description
   * @tags admins/handoffs
   * @name AdminRaiseHandoffBonus
   * @summary Raise a live handoff's bonus (sub-units)
   * @request POST:/api/v1/admins/handoffs/{handoffId}/bonus
   * @secure
   * @response `200` `AdminRaiseHandoffBonusData`
   * @response `201` `AdminHandoffDto`
   */
  export namespace AdminRaiseHandoffBonus {
    export type RequestParams = {
      handoffId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AdminRaiseHandoffBonusRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminRaiseHandoffBonusData;
  }

  /**
   * No description
   * @tags admins/handoffs
   * @name AdminReviewHandoff
   * @summary COUNT or WAIVE a completed handoff, and RELEASE or FORFEIT a held bonus
   * @request POST:/api/v1/admins/handoffs/{handoffId}/review
   * @secure
   * @response `200` `AdminReviewHandoffData`
   * @response `201` `AdminHandoffDto`
   */
  export namespace AdminReviewHandoff {
    export type RequestParams = {
      handoffId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AdminReviewHandoffRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminReviewHandoffData;
  }

  /**
   * No description
   * @tags admins/alerts
   * @name AdminListAlerts
   * @summary Admin alerts, newest first. Default: the live ones (OPEN and CLAIMED)
   * @request GET:/api/v1/admins/alerts
   * @secure
   * @response `200` `AdminListAlertsData`
   */
  export namespace AdminListAlerts {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Comma-separated statuses (OPEN, CLAIMED, RESOLVED). Default: OPEN,CLAIMED
       * @example "OPEN,CLAIMED"
       */
      status?: string;
      /**
       * Alert type, e.g. HANDOFF_ACCIDENT
       * @maxLength 64
       * @example "HANDOFF_NO_RIDER"
       */
      type?: string;
      /** true: only alerts I claimed */
      mine?: "true" | "false";
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 200
       * @default 50
       */
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminListAlertsData;
  }

  /**
   * No description
   * @tags admins/alerts
   * @name AdminAlertsSummary
   * @summary Live alert counts: open, claimed, by severity and by type
   * @request GET:/api/v1/admins/alerts/summary
   * @secure
   * @response `200` `AdminAlertsSummaryData`
   */
  export namespace AdminAlertsSummary {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminAlertsSummaryData;
  }

  /**
   * No description
   * @tags admins/alerts
   * @name AdminClaimAlert
   * @summary Take an OPEN alert (stops its WhatsApp escalation)
   * @request POST:/api/v1/admins/alerts/{alertId}/claim
   * @secure
   * @response `200` `AdminClaimAlertData`
   * @response `201` `AdminAlertDto`
   */
  export namespace AdminClaimAlert {
    export type RequestParams = {
      alertId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminClaimAlertData;
  }

  /**
   * No description
   * @tags admins/alerts
   * @name AdminResolveAlert
   * @summary Close a live alert, with an optional note
   * @request POST:/api/v1/admins/alerts/{alertId}/resolve
   * @secure
   * @response `200` `AdminResolveAlertData`
   * @response `201` `AdminAlertDto`
   */
  export namespace AdminResolveAlert {
    export type RequestParams = {
      alertId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AdminResolveAlertRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminResolveAlertData;
  }

  /**
   * No description
   * @tags orders
   * @name GetOrderChat
   * @summary The order chat as you see it: who you chat with, whether you can send, unread count, read markers and quick replies. closedReason NOT_ELIGIBLE when the order has no chat
   * @request GET:/api/v1/orders/{orderId}/chat
   * @secure
   * @response `200` `GetOrderChatData`
   */
  export namespace GetOrderChat {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetOrderChatData;
  }

  /**
   * No description
   * @tags orders
   * @name ListOrderMessages
   * @summary Messages, ascending by seq. No cursor: the latest page. before=seq: the older page. after=seq: everything newer (catch up on reconnect, foreground and screen open). limit 1 to 100, default 50
   * @request GET:/api/v1/orders/{orderId}/messages
   * @secure
   * @response `200` `ListOrderMessagesData`
   */
  export namespace ListOrderMessages {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {
      /**
       * Messages after this seq (catch-up)
       * @min 0
       */
      after?: number;
      /**
       * Messages before this seq (older page)
       * @min 1
       */
      before?: number;
      /**
       * @min 1
       * @max 100
       * @default 50
       */
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListOrderMessagesData;
  }

  /**
   * No description
   * @tags orders
   * @name SendOrderMessage
   * @summary Send a message. Idempotent: a retry with the same clientId returns the stored message. CHAT_RATE_LIMITED (429, details.retryAfterMs) when sending too fast
   * @request POST:/api/v1/orders/{orderId}/messages
   * @secure
   * @response `200` `SendOrderMessageData`
   */
  export namespace SendOrderMessage {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = SendOrderMessageRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = SendOrderMessageData;
  }

  /**
   * No description
   * @tags orders
   * @name MarkOrderMessagesRead
   * @summary Mark messages read up to a seq. The marker never moves back
   * @request POST:/api/v1/orders/{orderId}/messages/read
   * @secure
   * @response `200` `MarkOrderMessagesReadData`
   */
  export namespace MarkOrderMessagesRead {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = MarkOrderMessagesReadRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = MarkOrderMessagesReadData;
  }

  /**
   * No description
   * @tags admins/orders
   * @name AdminListOrderMessages
   * @summary An order's chat for support: thread summary, everyone who was in it, and its messages ascending
   * @request GET:/api/v1/admins/orders/{orderId}/messages
   * @secure
   * @response `200` `AdminListOrderMessagesData`
   */
  export namespace AdminListOrderMessages {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminListOrderMessagesData;
  }

  /**
   * No description
   * @tags audit-logs
   * @name FindAll
   * @request GET:/api/v1/audit-logs
   * @secure
   * @response `200` `FindAllData`
   */
  export namespace FindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      order?: "ASC" | "DESC";
      page?: number;
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FindAllData;
  }

  /**
   * No description
   * @tags issues
   * @name CreateIssue
   * @summary Report an issue about an order, a transaction, or the app
   * @request POST:/api/v1/issues
   * @secure
   * @response `200` `CreateIssueData`
   * @response `201` `IssueReport`
   */
  export namespace CreateIssue {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateIssueRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = CreateIssueData;
  }

  /**
   * No description
   * @tags issues
   * @name ListMyIssues
   * @summary The caller's own issue reports, newest first
   * @request GET:/api/v1/issues/me
   * @secure
   * @response `200` `ListMyIssuesData`
   */
  export namespace ListMyIssues {
    export type RequestParams = {};
    export type RequestQuery = {
      /** One status, or several comma-separated (e.g. OPEN,IN_REVIEW) */
      status?: IssueStatus;
      category?: IssueCategory;
      priority?: IssuePriority;
      subjectType?: IssueSubjectType;
      /** Admin user id; "unassigned" for reports nobody has picked up */
      assignedTo?: string;
      /**
       * Reference (ISS-…), customer name, email or phone
       * @maxLength 100
       */
      search?: string;
      /** @format date-time */
      from?: string;
      /** @format date-time */
      to?: string;
      sortBy?: "createdAt" | "updatedAt" | "priority" | "status";
      order?: "ASC" | "DESC";
      /** @default 1 */
      page?: number;
      /** @default 20 */
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListMyIssuesData;
  }

  /**
   * No description
   * @tags issues
   * @name GetMyIssue
   * @summary One of the caller’s issue reports
   * @request GET:/api/v1/issues/me/{issueId}
   * @secure
   * @response `200` `GetMyIssueData`
   */
  export namespace GetMyIssue {
    export type RequestParams = {
      issueId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetMyIssueData;
  }

  /**
   * No description
   * @tags admins/issues
   * @name ListIssues
   * @summary Issue reports across all customers, filterable and searchable
   * @request GET:/api/v1/admins/issues
   * @secure
   * @response `200` `ListIssuesData`
   */
  export namespace ListIssues {
    export type RequestParams = {};
    export type RequestQuery = {
      /** One status, or several comma-separated (e.g. OPEN,IN_REVIEW) */
      status?: IssueStatus;
      category?: IssueCategory;
      priority?: IssuePriority;
      subjectType?: IssueSubjectType;
      /** Admin user id; "unassigned" for reports nobody has picked up */
      assignedTo?: string;
      /**
       * Reference (ISS-…), customer name, email or phone
       * @maxLength 100
       */
      search?: string;
      /** @format date-time */
      from?: string;
      /** @format date-time */
      to?: string;
      sortBy?: "createdAt" | "updatedAt" | "priority" | "status";
      order?: "ASC" | "DESC";
      /** @default 1 */
      page?: number;
      /** @default 20 */
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListIssuesData;
  }

  /**
   * No description
   * @tags admins/issues
   * @name IssuesSummary
   * @summary Support queue health: open counts, backlog, response and resolution times
   * @request GET:/api/v1/admins/issues/summary
   * @secure
   * @response `200` `IssuesSummaryData`
   */
  export namespace IssuesSummary {
    export type RequestParams = {};
    export type RequestQuery = {
      /** ISO date or YYYY-MM-DD (Lagos day); default 30 days ago */
      from?: string;
      /** ISO date or YYYY-MM-DD (Lagos day, inclusive); default now */
      to?: string;
      /** 1 = everything on record */
      all?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = IssuesSummaryData;
  }

  /**
   * No description
   * @tags admins/issues
   * @name ListUserIssues
   * @summary Every report one customer has filed
   * @request GET:/api/v1/admins/issues/users/{userId}
   * @secure
   * @response `200` `ListUserIssuesData`
   */
  export namespace ListUserIssues {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {
      /** One status, or several comma-separated (e.g. OPEN,IN_REVIEW) */
      status?: IssueStatus;
      category?: IssueCategory;
      priority?: IssuePriority;
      subjectType?: IssueSubjectType;
      /** Admin user id; "unassigned" for reports nobody has picked up */
      assignedTo?: string;
      /**
       * Reference (ISS-…), customer name, email or phone
       * @maxLength 100
       */
      search?: string;
      /** @format date-time */
      from?: string;
      /** @format date-time */
      to?: string;
      sortBy?: "createdAt" | "updatedAt" | "priority" | "status";
      order?: "ASC" | "DESC";
      /** @default 1 */
      page?: number;
      /** @default 20 */
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListUserIssuesData;
  }

  /**
   * No description
   * @tags admins/issues
   * @name GetIssue
   * @summary One issue report with the customer, subject, assignee and internal notes
   * @request GET:/api/v1/admins/issues/{issueId}
   * @secure
   * @response `200` `GetIssueData`
   */
  export namespace GetIssue {
    export type RequestParams = {
      issueId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetIssueData;
  }

  /**
   * No description
   * @tags admins/issues
   * @name UpdateStatus
   * @summary Move a report through OPEN → IN_REVIEW → RESOLVED / CLOSED (pushes the customer)
   * @request PATCH:/api/v1/admins/issues/{issueId}/status
   * @secure
   * @response `200` `UpdateStatusData`
   */
  export namespace UpdateStatus {
    export type RequestParams = {
      issueId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateIssueStatusRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateStatusData;
  }

  /**
   * No description
   * @tags admins/issues
   * @name Assign
   * @summary Assign the report to a support agent (or unassign). Picking up an OPEN report moves it to IN_REVIEW.
   * @request PATCH:/api/v1/admins/issues/{issueId}/assign
   * @secure
   * @response `200` `AssignData`
   */
  export namespace Assign {
    export type RequestParams = {
      issueId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AssignIssueRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AssignData;
  }

  /**
   * No description
   * @tags admins/issues
   * @name UpdatePriority
   * @summary Re-prioritise a report
   * @request PATCH:/api/v1/admins/issues/{issueId}/priority
   * @secure
   * @response `200` `UpdatePriorityData`
   */
  export namespace UpdatePriority {
    export type RequestParams = {
      issueId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateIssuePriorityRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdatePriorityData;
  }

  /**
   * No description
   * @tags admins/issues
   * @name AddNote
   * @summary Add an internal note (never shown to the customer)
   * @request POST:/api/v1/admins/issues/{issueId}/notes
   * @secure
   * @response `200` `AddNoteData`
   * @response `201` `IssueReport`
   */
  export namespace AddNote {
    export type RequestParams = {
      issueId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AddIssueNoteRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AddNoteData;
  }

  /**
   * No description
   * @tags announcements
   * @name ListPendingAnnouncements
   * @summary Live announcements for this app that the person has not closed for good
   * @request GET:/api/v1/announcements/pending
   * @secure
   * @response `200` `ListPendingAnnouncementsData`
   */
  export namespace ListPendingAnnouncements {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Which app is asking: the customer app sends CUSTOMERS, the rider app RIDERS */
      audience: AnnouncementAudience;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListPendingAnnouncementsData;
  }

  /**
   * No description
   * @tags announcements
   * @name TrackAnnouncementSeen
   * @summary The popup was shown (counts reach and impressions)
   * @request POST:/api/v1/announcements/{announcementId}/seen
   * @secure
   * @response `201` `TrackAnnouncementSeenData`
   */
  export namespace TrackAnnouncementSeen {
    export type RequestParams = {
      announcementId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TrackAnnouncementSeenData;
  }

  /**
   * No description
   * @tags announcements
   * @name TrackAnnouncementLater
   * @summary "Show me later" was tapped; it pops again on a later launch
   * @request POST:/api/v1/announcements/{announcementId}/later
   * @secure
   * @response `201` `TrackAnnouncementLaterData`
   */
  export namespace TrackAnnouncementLater {
    export type RequestParams = {
      announcementId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TrackAnnouncementLaterData;
  }

  /**
   * No description
   * @tags announcements
   * @name AcknowledgeAnnouncement
   * @summary Close it for good: CONFIRMED (got it) or ACTED (took the action). Never pops again.
   * @request POST:/api/v1/announcements/{announcementId}/acknowledge
   * @secure
   * @response `201` `AcknowledgeAnnouncementData`
   */
  export namespace AcknowledgeAnnouncement {
    export type RequestParams = {
      announcementId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AcknowledgeAnnouncementRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AcknowledgeAnnouncementData;
  }

  /**
   * No description
   * @tags admins/announcements
   * @name AdminListAnnouncements
   * @summary Every announcement, filterable by status and app
   * @request GET:/api/v1/admins/announcements
   * @secure
   * @response `200` `AdminListAnnouncementsData`
   */
  export namespace AdminListAnnouncements {
    export type RequestParams = {};
    export type RequestQuery = {
      status?: AnnouncementStatus;
      audience?: AnnouncementAudience;
      /**
       * Title or body text
       * @maxLength 100
       */
      search?: string;
      /** @default 1 */
      page?: number;
      /** @default 20 */
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminListAnnouncementsData;
  }

  /**
   * No description
   * @tags admins/announcements
   * @name AdminCreateAnnouncement
   * @summary Write a new announcement (DRAFT unless status is ACTIVE)
   * @request POST:/api/v1/admins/announcements
   * @secure
   * @response `200` `AdminCreateAnnouncementData`
   * @response `201` `Announcement`
   */
  export namespace AdminCreateAnnouncement {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateAnnouncementRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminCreateAnnouncementData;
  }

  /**
   * No description
   * @tags admins/announcements
   * @name AdminAnnouncementsSummary
   * @summary How many are live, and how people are responding
   * @request GET:/api/v1/admins/announcements/summary
   * @secure
   * @response `200` `AdminAnnouncementsSummaryData`
   */
  export namespace AdminAnnouncementsSummary {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminAnnouncementsSummaryData;
  }

  /**
   * No description
   * @tags admins/announcements
   * @name AdminListAnnouncementScreens
   * @summary Screens an INTERNAL action may open, per app
   * @request GET:/api/v1/admins/announcements/screens
   * @secure
   * @response `200` `AdminListAnnouncementScreensData`
   */
  export namespace AdminListAnnouncementScreens {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminListAnnouncementScreensData;
  }

  /**
   * No description
   * @tags admins/announcements
   * @name AdminGetAnnouncement
   * @summary One announcement with its running totals
   * @request GET:/api/v1/admins/announcements/{announcementId}
   * @secure
   * @response `200` `AdminGetAnnouncementData`
   */
  export namespace AdminGetAnnouncement {
    export type RequestParams = {
      announcementId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminGetAnnouncementData;
  }

  /**
   * No description
   * @tags admins/announcements
   * @name AdminUpdateAnnouncement
   * @summary Edit the copy, action, audience or window. Resets the announcement: receipts are deleted and counters zeroed, so it pops again for everyone.
   * @request PATCH:/api/v1/admins/announcements/{announcementId}
   * @secure
   * @response `200` `AdminUpdateAnnouncementData`
   */
  export namespace AdminUpdateAnnouncement {
    export type RequestParams = {
      announcementId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateAnnouncementRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminUpdateAnnouncementData;
  }

  /**
   * No description
   * @tags admins/announcements
   * @name AdminDeleteAnnouncement
   * @summary Delete a draft
   * @request DELETE:/api/v1/admins/announcements/{announcementId}
   * @secure
   * @response `200` `AdminDeleteAnnouncementData`
   */
  export namespace AdminDeleteAnnouncement {
    export type RequestParams = {
      announcementId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminDeleteAnnouncementData;
  }

  /**
   * No description
   * @tags admins/announcements
   * @name AdminListAnnouncementReceipts
   * @summary Who has seen it and what they did
   * @request GET:/api/v1/admins/announcements/{announcementId}/receipts
   * @secure
   * @response `200` `AdminListAnnouncementReceiptsData`
   */
  export namespace AdminListAnnouncementReceipts {
    export type RequestParams = {
      announcementId: string;
    };
    export type RequestQuery = {
      /** acknowledged: closed for good; pending: shown but still popping */
      state?: "acknowledged" | "pending";
      outcome?: AnnouncementOutcome;
      /** @default 1 */
      page?: number;
      /** @default 20 */
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminListAnnouncementReceiptsData;
  }

  /**
   * No description
   * @tags admins/announcements
   * @name AdminUpdateAnnouncementStatus
   * @summary Publish (ACTIVE), pause (DRAFT) or archive
   * @request PATCH:/api/v1/admins/announcements/{announcementId}/status
   * @secure
   * @response `200` `AdminUpdateAnnouncementStatusData`
   */
  export namespace AdminUpdateAnnouncementStatus {
    export type RequestParams = {
      announcementId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateAnnouncementStatusRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminUpdateAnnouncementStatusData;
  }

  /**
   * No description
   * @tags webhooks
   * @name HandleWebhookEvents
   * @request POST:/api/v1/webhooks/public/{provider}/events
   * @response `200` `HandleWebhookEventsData`
   */
  export namespace HandleWebhookEvents {
    export type RequestParams = {
      provider: "PAYSTACK" | "FLUTTERWAVE";
    };
    export type RequestQuery = {};
    export type RequestBody = Object;
    export type RequestHeaders = {};
    export type ResponseBody = HandleWebhookEventsData;
  }

  /**
   * No description
   * @tags teams
   * @name CreateTeam
   * @request POST:/api/v1/teams
   * @response `201` `CreateTeamData`
   */
  export namespace CreateTeam {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateTeamRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = CreateTeamData;
  }

  /**
   * No description
   * @tags teams
   * @name GetUserTeam
   * @request GET:/api/v1/teams/{teamId}
   * @secure
   * @response `200` `GetUserTeamData`
   */
  export namespace GetUserTeam {
    export type RequestParams = {
      teamId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserTeamData;
  }

  /**
   * No description
   * @tags admins/teams
   * @name AdminCreateTeam
   * @request POST:/api/v1/admins/teams
   * @secure
   * @response `201` `AdminCreateTeamData`
   */
  export namespace AdminCreateTeam {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateTeamRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminCreateTeamData;
  }

  /**
   * No description
   * @tags admins/teams
   * @name AdminListTeams
   * @request GET:/api/v1/admins/teams
   * @secure
   * @response `200` `AdminListTeamsData`
   */
  export namespace AdminListTeams {
    export type RequestParams = {};
    export type RequestQuery = {
      order?: "ASC" | "DESC";
      limit?: any;
      page?: any;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminListTeamsData;
  }

  /**
   * No description
   * @tags crons
   * @name Run
   * @request GET:/api/v1/crons/run
   * @secure
   * @response `200` `RunData`
   */
  export namespace Run {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = RunData;
  }

  /**
   * No description
   * @tags delivery-price
   * @name Quote
   * @request POST:/api/v1/delivery-price/quote
   * @response `201` `QuoteData`
   */
  export namespace Quote {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = QuoteDto;
    export type RequestHeaders = {};
    export type ResponseBody = QuoteData;
  }

  /**
   * No description
   * @tags delivery-price
   * @name PublicConfig
   * @request GET:/api/v1/delivery-price/config
   * @response `200` `PublicConfigData`
   */
  export namespace PublicConfig {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PublicConfigData;
  }

  /**
   * No description
   * @tags delivery-price
   * @name GetQuote
   * @request GET:/api/v1/delivery-price/quote/{shortId}
   * @response `200` `GetQuoteData`
   */
  export namespace GetQuote {
    export type RequestParams = {
      shortId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetQuoteData;
  }

  /**
   * No description
   * @tags delivery-price
   * @name Feedback
   * @request POST:/api/v1/delivery-price/feedback
   * @response `201` `FeedbackData`
   */
  export namespace Feedback {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FeedbackDto;
    export type RequestHeaders = {};
    export type ResponseBody = FeedbackData;
  }

  /**
   * No description
   * @tags delivery-price
   * @name Event
   * @request POST:/api/v1/delivery-price/event
   * @response `201` `EventData`
   */
  export namespace Event {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DeliveryPriceEventDto;
    export type RequestHeaders = {};
    export type ResponseBody = EventData;
  }

  /**
   * No description
   * @tags delivery-price
   * @name Analytics
   * @request GET:/api/v1/delivery-price/admin/analytics
   * @secure
   * @response `200` `AnalyticsData`
   */
  export namespace Analytics {
    export type RequestParams = {};
    export type RequestQuery = {
      from?: string;
      to?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AnalyticsData;
  }

  /**
   * No description
   * @tags delivery-price
   * @name AdminConfig
   * @request GET:/api/v1/delivery-price/admin/config
   * @secure
   * @response `200` `AdminConfigData`
   */
  export namespace AdminConfig {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminConfigData;
  }

  /**
   * No description
   * @tags delivery-price
   * @name UpdateConfig
   * @request PATCH:/api/v1/delivery-price/admin/config
   * @secure
   * @response `200` `UpdateConfigData`
   */
  export namespace UpdateConfig {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateDeliveryCalculatorConfigDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateConfigData;
  }

  /**
   * No description
   * @tags web-orders
   * @name Create
   * @request POST:/api/v1/web-orders/create
   * @response `201` `CreateData`
   */
  export namespace Create {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateWebOrderDto;
    export type RequestHeaders = {};
    export type ResponseBody = CreateData;
  }

  /**
   * No description
   * @tags web-orders
   * @name Track
   * @request GET:/api/v1/web-orders/{token}
   * @response `200` `TrackData`
   */
  export namespace Track {
    export type RequestParams = {
      token: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TrackData;
  }

  /**
   * No description
   * @tags web-orders
   * @name Search
   * @request POST:/api/v1/web-orders/{token}/search
   * @response `201` `SearchData`
   */
  export namespace Search {
    export type RequestParams = {
      token: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SearchData;
  }

  /**
   * No description
   * @tags web-orders
   * @name Offers
   * @request GET:/api/v1/web-orders/{token}/offers
   * @response `200` `OffersData`
   */
  export namespace Offers {
    export type RequestParams = {
      token: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = OffersData;
  }

  /**
   * No description
   * @tags web-orders
   * @name AcceptOffer
   * @request PATCH:/api/v1/web-orders/{token}/offers/{offerId}
   * @response `200` `AcceptOfferData`
   */
  export namespace AcceptOffer {
    export type RequestParams = {
      token: string;
      offerId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AcceptOfferData;
  }

  /**
   * No description
   * @tags web-orders
   * @name Pay
   * @request POST:/api/v1/web-orders/{token}/pay
   * @response `201` `PayData`
   */
  export namespace Pay {
    export type RequestParams = {
      token: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PayData;
  }

  /**
   * No description
   * @tags web-orders
   * @name Cancel
   * @request PATCH:/api/v1/web-orders/{token}/cancel
   * @response `200` `CancelData`
   */
  export namespace Cancel {
    export type RequestParams = {
      token: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CancelData;
  }

  /**
   * No description
   * @tags support
   * @name GetUnreadCount
   * @summary Unread support messages for the caller — drives the Contact Us badge
   * @request GET:/api/v1/support/unread
   * @secure
   * @response `200` `GetUnreadCountData`
   */
  export namespace GetUnreadCount {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUnreadCountData;
  }

  /**
   * No description
   * @tags support
   * @name MarkAsRead
   * @summary Clear the support unread badge. Idempotent.
   * @request POST:/api/v1/support/read
   * @secure
   * @response `200` `MarkAsReadData`
   * @response `201` `SupportUnreadResponseDto`
   */
  export namespace MarkAsRead {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = MarkAsReadData;
  }

  /**
   * @description Every developer team. `liveStatus=PENDING` is the review queue, oldest request first.
   * @tags admins/developers
   * @name AdminListDevelopers
   * @request GET:/api/v1/admins/developers
   * @secure
   * @response `200` `AdminListDevelopersData`
   */
  export namespace AdminListDevelopers {
    export type RequestParams = {};
    export type RequestQuery = {
      /** PENDING lists the review queue, oldest request first. */
      liveStatus?: "NOT_REQUESTED" | "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
      /**
       * Team name, handle, company or contact email.
       * @maxLength 100
       */
      search?: string;
      /** @example "1" */
      page?: string;
      /** @example "50" */
      limit?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminListDevelopersData;
  }

  /**
   * @description The profile, owner verification and live-access history an admin decides on.
   * @tags admins/developers
   * @name AdminGetDeveloper
   * @request GET:/api/v1/admins/developers/{teamId}
   * @secure
   * @response `200` `AdminGetDeveloperData`
   */
  export namespace AdminGetDeveloper {
    export type RequestParams = {
      teamId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminGetDeveloperData;
  }

  /**
   * @description PENDING → APPROVED. The team can then use live mode.
   * @tags admins/developers
   * @name AdminApproveDeveloperLive
   * @request POST:/api/v1/admins/developers/{teamId}/approve
   * @secure
   * @response `200` `AdminApproveDeveloperLiveData`
   */
  export namespace AdminApproveDeveloperLive {
    export type RequestParams = {
      teamId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminApproveDeveloperLiveData;
  }

  /**
   * @description PENDING → REJECTED. The developer sees the reason and can fix their profile and ask again.
   * @tags admins/developers
   * @name AdminRejectDeveloperLive
   * @request POST:/api/v1/admins/developers/{teamId}/reject
   * @secure
   * @response `200` `AdminRejectDeveloperLiveData`
   */
  export namespace AdminRejectDeveloperLive {
    export type RequestParams = {
      teamId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = DeveloperLiveDecisionRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminRejectDeveloperLiveData;
  }

  /**
   * @description APPROVED → SUSPENDED. Live mode stops at once; test mode keeps working.
   * @tags admins/developers
   * @name AdminSuspendDeveloperLive
   * @request POST:/api/v1/admins/developers/{teamId}/suspend
   * @secure
   * @response `200` `AdminSuspendDeveloperLiveData`
   */
  export namespace AdminSuspendDeveloperLive {
    export type RequestParams = {
      teamId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = DeveloperLiveDecisionRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = AdminSuspendDeveloperLiveData;
  }

  /**
   * @description SUSPENDED → APPROVED.
   * @tags admins/developers
   * @name AdminUnsuspendDeveloperLive
   * @request POST:/api/v1/admins/developers/{teamId}/unsuspend
   * @secure
   * @response `200` `AdminUnsuspendDeveloperLiveData`
   */
  export namespace AdminUnsuspendDeveloperLive {
    export type RequestParams = {
      teamId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AdminUnsuspendDeveloperLiveData;
  }
}
