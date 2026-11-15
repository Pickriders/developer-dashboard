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
  AchievementsSummaryParams,
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
  AdminGetRiderDeliveryMapParams,
  AdminGetRiderEarningsSeriesData,
  AdminGetRiderEarningsSeriesParams,
  AdminGetRiderInsightsOverviewData,
  AdminGetRiderInsightsOverviewParams,
  AdminGetRiderInsightsProfileData,
  AdminGetRiderInsightsProfileParams,
  AdminGetRiderRankData,
  AdminGetRiderRankParams,
  AdminGetTransactionsData,
  AdminGetTransactionsParams,
  AdminGetUserWalletsData,
  AdminGetVehicleData,
  AdminHandoffsSummaryData,
  AdminListAlertsData,
  AdminListAlertsParams,
  AdminListAnnouncementReceiptsData,
  AdminListAnnouncementReceiptsParams,
  AdminListAnnouncementScreensData,
  AdminListAnnouncementsData,
  AdminListAnnouncementsParams,
  AdminListDevelopersData,
  AdminListDevelopersParams,
  AdminListHandoffsData,
  AdminListHandoffsParams,
  AdminListOrderHandoffsData,
  AdminListOrderMessagesData,
  AdminListRiderReleasesData,
  AdminListTeamsData,
  AdminListTeamsParams,
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
  AnalyticsParams,
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
  BusinessesParams,
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
  ChargesByRiderParams,
  ChargesData,
  ChargesParams,
  CheckTokenValidityData,
  CompleteLocationRequestDto,
  CompleteOrderData,
  CompleteOrderLocationData,
  ConfirmExternalPaymentByReferenceData,
  ConfirmExternalPaymentByReferenceParams,
  CouponsSummaryData,
  CouponsSummaryParams,
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
  CreateUserParams,
  CreateUserRequestDto,
  CreateVirtualAccountRequestDto,
  CreateWalletData,
  CreateWebOrderDto,
  CreditPlatformWalletData,
  CustomersData,
  CustomersOverviewData,
  CustomersOverviewParams,
  CustomersParams,
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
  FindAllParams,
  ForUserData,
  ForceAssignRiderData,
  ForceAssignRiderDto,
  FundWalletRequestDto,
  GetAchievementsData,
  GetActiveCouponsData,
  GetActiveOffersData,
  GetAdminPreferencesData,
  GetAllReferralsData,
  GetAllReferralsParams,
  GetArrivalCheckData,
  GetBanksData,
  GetBanksParams,
  GetBroadcastData,
  GetBusinessData,
  GetBusinessOrderData,
  GetBusinessOrderStatisticsData,
  GetBusinessOrderStatisticsParams,
  GetBusinessOrderStatusChartData,
  GetBusinessOrderStatusChartParams,
  GetBusinessOrderTypeChartData,
  GetBusinessOrderTypeChartParams,
  GetBusinessOrdersData,
  GetBusinessOrdersParams,
  GetBusinessTransactionData,
  GetBusinessTransactionsData,
  GetBusinessTransactionsParams,
  GetBusinessUserData,
  GetBusinessUsersData,
  GetBusinessUsersParams,
  GetBusinessVehiclesData,
  GetBusinessVehiclesParams,
  GetBusinessWalletData,
  GetBusinessWalletsData,
  GetCountriesData,
  GetCountriesParams,
  GetCountryByIdData,
  GetCountryStateByIdData,
  GetCountryStatesData,
  GetCouponData,
  GetCustomerAchievementsData,
  GetCustomerInsightsOverviewData,
  GetCustomerInsightsOverviewParams,
  GetCustomerInsightsPlacesData,
  GetCustomerInsightsPlacesParams,
  GetCustomerInsightsRecapData,
  GetCustomerInsightsSeriesData,
  GetCustomerInsightsSeriesParams,
  GetDeliveryPricingData,
  GetDemandData,
  GetDemandParams,
  GetEarningsSeriesData,
  GetEarningsSeriesParams,
  GetExternalPaymentMetricsData,
  GetExternalPaymentMetricsParams,
  GetFinanceStatusData,
  GetGroupData,
  GetHeartbeatData,
  GetInsightsLeaderboardData,
  GetInsightsLeaderboardParams,
  GetInsightsOverviewData,
  GetInsightsOverviewParams,
  GetIssueData,
  GetLatestLocationUpdateForCustomerData,
  GetLogsData,
  GetLogsParams,
  GetMyIssueData,
  GetMyMapData,
  GetMyMapParams,
  GetNearbyRidersCountData,
  GetNearbyRidersCountParams,
  GetNotificationsData,
  GetNotificationsParams,
  GetOrderChatData,
  GetOrderData,
  GetOrderEtaData,
  GetOrderOffersData,
  GetOrderPaymentInfoData,
  GetOrderStatusChartData,
  GetOrderStatusChartParams,
  GetOrderTypeChartData,
  GetOrderTypeChartParams,
  GetOrdersData,
  GetOrdersParams,
  GetPendingLocationUpdateData,
  GetPlatformBanksData,
  GetPlatformWalletData,
  GetQueuedOrdersData,
  GetQuoteData,
  GetReviewsData,
  GetReviewsParams,
  GetRiderLocationsData,
  GetRiderOrderData,
  GetRiderOrderStatisticsData,
  GetRiderOrderStatisticsParams,
  GetRiderOrdersData,
  GetRiderOrdersParams,
  GetRiderReviewsData,
  GetRiderReviewsParams,
  GetRidersLeaderboardData,
  GetTransactionData,
  GetTransactionSummaryData,
  GetTransactionSummaryParams,
  GetTransactionsData,
  GetTransactionsParams,
  GetUnreadCountData,
  GetUserData,
  GetUserNotificationData,
  GetUserOrderData,
  GetUserOrdersData,
  GetUserOrdersParams,
  GetUserProfileData,
  GetUserReviewsData,
  GetUserTeamData,
  GetUserTransactionData,
  GetUserTransactionsData,
  GetUserTransactionsParams,
  GetUserTransactionsSummaryData,
  GetUserTransactionsSummaryParams,
  GetUserVehicleData,
  GetUserWalletData,
  GetUserWalletsData,
  GetUsersData,
  GetUsersParams,
  GetVehicleData,
  GetVehiclesData,
  GetVehiclesParams,
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
  IssuesSummaryData,
  IssuesSummaryParams,
  KYCDetailsDto,
  ListAllRidersData,
  ListBroadcastsData,
  ListBroadcastsParams,
  ListCouponsData,
  ListCouponsParams,
  ListGroupsData,
  ListGroupsParams,
  ListIssuesData,
  ListIssuesParams,
  ListMyIssuesData,
  ListMyIssuesParams,
  ListOrderMessagesData,
  ListOrderMessagesParams,
  ListPendingAnnouncementsData,
  ListPendingAnnouncementsParams,
  ListUserIssuesData,
  ListUserIssuesParams,
  LogData,
  LogParams,
  LoginAdminsData,
  LoginBusinessData,
  LoginData,
  LoginRequestDto,
  LookupRiderForStoreData,
  LookupRiderForStoreParams,
  MakeOfferRequestDto,
  MakeOrderOfferData,
  MarkAsReadData,
  MarkOrderMessagesReadData,
  MarkOrderMessagesReadRequestDto,
  Object,
  OffersData,
  OverviewData,
  OverviewParams,
  PasswordResetData,
  PasswordResetRequestData,
  PayData,
  PayOrderRequestDto,
  PayRiderTripData,
  PayRiderTripRequestDto,
  PeakHoursData,
  PeakHoursParams,
  ProviderFeeRowsData,
  ProviderFeeRowsParams,
  ProviderFeesData,
  ProviderFeesParams,
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
  RefundableOrdersParams,
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
  ResolveBankAccountParams,
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
  SeriesParams,
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
  TopRidersParams,
  TrackAnnouncementLaterData,
  TrackAnnouncementSeenData,
  TrackData,
  TransferToUserData,
  TransferToWalletDto,
  TriggerNotificationData,
  TriggerNotificationRequestDto,
  UnlocksData,
  UnlocksParams,
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
  UsagesParams,
  UserKYCDetailDto,
  UserKycVerificationData,
  UserOverviewData,
  UserOverviewParams,
  VerifyDriversLicenseData,
  VerifyEmailData,
  VerifyEmailRequestDto,
  VerifyOrderPaymentData,
  VerifyPhoneData,
  VerifyPhoneRequestDto,
  VerifyVehicleData,
  WalletCreateRequestDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name GetHeartbeat
   * @request GET:/api/v1/ping
   * @response `200` `GetHeartbeatData`
   */
  getHeartbeat = (params: RequestParams = {}) =>
    this.request<GetHeartbeatData, any>({
      path: `/api/v1/ping`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-configs
   * @name GetDeliveryPricing
   * @request GET:/api/v1/admin-configs/delivery-pricing
   * @response `200` `GetDeliveryPricingData`
   */
  getDeliveryPricing = (params: RequestParams = {}) =>
    this.request<GetDeliveryPricingData, any>({
      path: `/api/v1/admin-configs/delivery-pricing`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-configs
   * @name GetCountries
   * @request GET:/api/v1/admin-configs/countries
   * @secure
   * @response `200` `GetCountriesData`
   */
  getCountries = (query: GetCountriesParams, params: RequestParams = {}) =>
    this.request<GetCountriesData, any>({
      path: `/api/v1/admin-configs/countries`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-configs
   * @name AddCountry
   * @request POST:/api/v1/admin-configs/countries
   * @secure
   * @response `201` `AddCountryData`
   */
  addCountry = (data: AddCountryDto, params: RequestParams = {}) =>
    this.request<AddCountryData, any>({
      path: `/api/v1/admin-configs/countries`,
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
   * @tags admin-configs
   * @name UpdateCountry
   * @request PATCH:/api/v1/admin-configs/countries/{countryId}
   * @secure
   * @response `200` `UpdateCountryData`
   */
  updateCountry = (countryId: string, data: UpdateCountryDto, params: RequestParams = {}) =>
    this.request<UpdateCountryData, any>({
      path: `/api/v1/admin-configs/countries/${countryId}`,
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
   * @tags admin-configs
   * @name GetCountryById
   * @request GET:/api/v1/admin-configs/countries/{countryId}
   * @secure
   * @response `200` `GetCountryByIdData`
   */
  getCountryById = (countryId: string, params: RequestParams = {}) =>
    this.request<GetCountryByIdData, any>({
      path: `/api/v1/admin-configs/countries/${countryId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-configs
   * @name AddCountryStates
   * @request POST:/api/v1/admin-configs/countries/{countryId}/states
   * @secure
   * @response `201` `AddCountryStatesData`
   */
  addCountryStates = (countryId: string, data: AddCountryStatesPayload, params: RequestParams = {}) =>
    this.request<AddCountryStatesData, any>({
      path: `/api/v1/admin-configs/countries/${countryId}/states`,
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
   * @tags admin-configs
   * @name GetCountryStates
   * @request GET:/api/v1/admin-configs/countries/{countryId}/states
   * @secure
   * @response `200` `GetCountryStatesData`
   */
  getCountryStates = (countryId: string, params: RequestParams = {}) =>
    this.request<GetCountryStatesData, any>({
      path: `/api/v1/admin-configs/countries/${countryId}/states`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-configs
   * @name GetCountryStateById
   * @request GET:/api/v1/admin-configs/countries/{countryId}/states/{stateId}
   * @secure
   * @response `200` `GetCountryStateByIdData`
   */
  getCountryStateById = (countryId: string, stateId: string, params: RequestParams = {}) =>
    this.request<GetCountryStateByIdData, any>({
      path: `/api/v1/admin-configs/countries/${countryId}/states/${stateId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-configs
   * @name UpdateCountryState
   * @request PATCH:/api/v1/admin-configs/countries/{countryId}/states/{stateId}
   * @secure
   * @response `200` `UpdateCountryStateData`
   */
  updateCountryState = (countryId: string, stateId: string, data: UpdateStateDto, params: RequestParams = {}) =>
    this.request<UpdateCountryStateData, any>({
      path: `/api/v1/admin-configs/countries/${countryId}/states/${stateId}`,
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
   * @tags admins/stats
   * @name Overview
   * @request GET:/api/v1/admins/stats/overview
   * @secure
   * @response `200` `OverviewData`
   */
  overview = (query: OverviewParams, params: RequestParams = {}) =>
    this.request<OverviewData, any>({
      path: `/api/v1/admins/stats/overview`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/stats
   * @name Series
   * @request GET:/api/v1/admins/stats/series
   * @secure
   * @response `200` `SeriesData`
   */
  series = (query: SeriesParams, params: RequestParams = {}) =>
    this.request<SeriesData, any>({
      path: `/api/v1/admins/stats/series`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/stats
   * @name TopRiders
   * @request GET:/api/v1/admins/stats/top-riders
   * @secure
   * @response `200` `TopRidersData`
   */
  topRiders = (query: TopRidersParams, params: RequestParams = {}) =>
    this.request<TopRidersData, any>({
      path: `/api/v1/admins/stats/top-riders`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/stats
   * @name PeakHours
   * @request GET:/api/v1/admins/stats/peak-hours
   * @secure
   * @response `200` `PeakHoursData`
   */
  peakHours = (query: PeakHoursParams, params: RequestParams = {}) =>
    this.request<PeakHoursData, any>({
      path: `/api/v1/admins/stats/peak-hours`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/stats
   * @name Charges
   * @request GET:/api/v1/admins/stats/charges
   * @secure
   * @response `200` `ChargesData`
   */
  charges = (query: ChargesParams, params: RequestParams = {}) =>
    this.request<ChargesData, any>({
      path: `/api/v1/admins/stats/charges`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/stats
   * @name ChargesByRider
   * @request GET:/api/v1/admins/stats/charges/riders
   * @secure
   * @response `200` `ChargesByRiderData`
   */
  chargesByRider = (query: ChargesByRiderParams, params: RequestParams = {}) =>
    this.request<ChargesByRiderData, any>({
      path: `/api/v1/admins/stats/charges/riders`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description What Paystack took in the window, per money flow, against the window before, with a trend.
   *
   * @tags admins/stats
   * @name ProviderFees
   * @request GET:/api/v1/admins/stats/provider-fees
   * @secure
   * @response `200` `ProviderFeesData`
   */
  providerFees = (query: ProviderFeesParams, params: RequestParams = {}) =>
    this.request<ProviderFeesData, any>({
      path: `/api/v1/admins/stats/provider-fees`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Every Paystack fee in the window, newest first, with what it was charged on and whose money it was.
   *
   * @tags admins/stats
   * @name ProviderFeeRows
   * @request GET:/api/v1/admins/stats/provider-fees/rows
   * @secure
   * @response `200` `ProviderFeeRowsData`
   */
  providerFeeRows = (query: ProviderFeeRowsParams, params: RequestParams = {}) =>
    this.request<ProviderFeeRowsData, any>({
      path: `/api/v1/admins/stats/provider-fees/rows`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/stats
   * @name Attention
   * @request GET:/api/v1/admins/stats/attention
   * @secure
   * @response `200` `AttentionData`
   */
  attention = (params: RequestParams = {}) =>
    this.request<AttentionData, any>({
      path: `/api/v1/admins/stats/attention`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/stats
   * @name CustomersOverview
   * @request GET:/api/v1/admins/stats/customers/overview
   * @secure
   * @response `200` `CustomersOverviewData`
   */
  customersOverview = (query: CustomersOverviewParams, params: RequestParams = {}) =>
    this.request<CustomersOverviewData, any>({
      path: `/api/v1/admins/stats/customers/overview`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/stats
   * @name Customers
   * @request GET:/api/v1/admins/stats/customers
   * @secure
   * @response `200` `CustomersData`
   */
  customers = (query: CustomersParams, params: RequestParams = {}) =>
    this.request<CustomersData, any>({
      path: `/api/v1/admins/stats/customers`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/stats
   * @name Businesses
   * @request GET:/api/v1/admins/stats/businesses
   * @secure
   * @response `200` `BusinessesData`
   */
  businesses = (query: BusinessesParams, params: RequestParams = {}) =>
    this.request<BusinessesData, any>({
      path: `/api/v1/admins/stats/businesses`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/stats
   * @name UserOverview
   * @request GET:/api/v1/admins/stats/users/{userId}/overview
   * @secure
   * @response `200` `UserOverviewData`
   */
  userOverview = ({ userId, ...query }: UserOverviewParams, params: RequestParams = {}) =>
    this.request<UserOverviewData, any>({
      path: `/api/v1/admins/stats/users/${userId}/overview`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags transactions
   * @name GetTransactions
   * @request GET:/api/v1/transactions
   * @secure
   * @response `200` `GetTransactionsData`
   */
  getTransactions = (query: GetTransactionsParams, params: RequestParams = {}) =>
    this.request<GetTransactionsData, any>({
      path: `/api/v1/transactions`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/transactions
   * @name AdminGetTransactions
   * @request GET:/api/v1/admins/transactions
   * @secure
   * @response `200` `AdminGetTransactionsData`
   */
  adminGetTransactions = (query: AdminGetTransactionsParams, params: RequestParams = {}) =>
    this.request<AdminGetTransactionsData, any>({
      path: `/api/v1/admins/transactions`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/transactions
   * @name GetExternalPaymentMetrics
   * @request GET:/api/v1/admins/transactions/metrics/external-payments
   * @secure
   * @response `200` `GetExternalPaymentMetricsData`
   */
  getExternalPaymentMetrics = (query: GetExternalPaymentMetricsParams, params: RequestParams = {}) =>
    this.request<GetExternalPaymentMetricsData, any>({
      path: `/api/v1/admins/transactions/metrics/external-payments`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/transactions
   * @name GetTransactionSummary
   * @request GET:/api/v1/admins/transactions/metrics/summary
   * @secure
   * @response `200` `GetTransactionSummaryData`
   */
  getTransactionSummary = (query: GetTransactionSummaryParams, params: RequestParams = {}) =>
    this.request<GetTransactionSummaryData, any>({
      path: `/api/v1/admins/transactions/metrics/summary`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/transactions
   * @name GetTransaction
   * @request GET:/api/v1/admins/transactions/{transactionId}
   * @secure
   * @response `200` `GetTransactionData`
   */
  getTransaction = (transactionId: string, params: RequestParams = {}) =>
    this.request<GetTransactionData, any>({
      path: `/api/v1/admins/transactions/${transactionId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags riders/insights
   * @name GetInsightsOverview
   * @summary Earnings, performance, activity and goal for the window (default: last 7 days)
   * @request GET:/api/v1/riders/insights/overview
   * @secure
   * @response `200` `GetInsightsOverviewData`
   */
  getInsightsOverview = (query: GetInsightsOverviewParams, params: RequestParams = {}) =>
    this.request<GetInsightsOverviewData, any>({
      path: `/api/v1/riders/insights/overview`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags riders/insights
   * @name GetEarningsSeries
   * @summary Net/gross earnings per day, week or month (default: last 30 days, daily)
   * @request GET:/api/v1/riders/insights/earnings/series
   * @secure
   * @response `200` `GetEarningsSeriesData`
   */
  getEarningsSeries = (query: GetEarningsSeriesParams, params: RequestParams = {}) =>
    this.request<GetEarningsSeriesData, any>({
      path: `/api/v1/riders/insights/earnings/series`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags riders/insights
   * @name GetRiderReviews
   * @summary Customers' reviews of the rider, newest first, with the rating distribution
   * @request GET:/api/v1/riders/insights/reviews
   * @secure
   * @response `200` `GetRiderReviewsData`
   */
  getRiderReviews = (query: GetRiderReviewsParams, params: RequestParams = {}) =>
    this.request<GetRiderReviewsData, any>({
      path: `/api/v1/riders/insights/reviews`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags riders/insights
   * @name GetDemand
   * @summary Peak hours and pickup hot zones within 20 km of the rider (all riders, aggregated)
   * @request GET:/api/v1/riders/insights/demand
   * @secure
   * @response `200` `GetDemandData`
   */
  getDemand = (query: GetDemandParams, params: RequestParams = {}) =>
    this.request<GetDemandData, any>({
      path: `/api/v1/riders/insights/demand`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags riders/insights
   * @name GetMyMap
   * @summary The rider's own completed pickup/drop-off points
   * @request GET:/api/v1/riders/insights/my-map
   * @secure
   * @response `200` `GetMyMapData`
   */
  getMyMap = (query: GetMyMapParams, params: RequestParams = {}) =>
    this.request<GetMyMapData, any>({
      path: `/api/v1/riders/insights/my-map`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags riders/insights
   * @name GetInsightsLeaderboard
   * @summary Top riders by completed deliveries in the rider's state (or country), plus own rank
   * @request GET:/api/v1/riders/insights/leaderboard
   * @secure
   * @response `200` `GetInsightsLeaderboardData`
   */
  getInsightsLeaderboard = (query: GetInsightsLeaderboardParams, params: RequestParams = {}) =>
    this.request<GetInsightsLeaderboardData, any>({
      path: `/api/v1/riders/insights/leaderboard`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags riders/insights
   * @name GetAchievements
   * @summary Milestones with progress; unlocks are stamped on first sight
   * @request GET:/api/v1/riders/insights/achievements
   * @secure
   * @response `200` `GetAchievementsData`
   */
  getAchievements = (params: RequestParams = {}) =>
    this.request<GetAchievementsData, any>({
      path: `/api/v1/riders/insights/achievements`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags riders/insights
   * @name AcknowledgeAchievement
   * @summary Mark an unlocked achievement as seen so the celebration is not shown again
   * @request PATCH:/api/v1/riders/insights/achievements/{key}/ack
   * @secure
   * @response `200` `AcknowledgeAchievementData`
   */
  acknowledgeAchievement = (key: string, params: RequestParams = {}) =>
    this.request<AcknowledgeAchievementData, any>({
      path: `/api/v1/riders/insights/achievements/${key}/ack`,
      method: "PATCH",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/riders/insights
   * @name AdminGetRiderInsightsOverview
   * @summary A rider's earnings, performance, activity and goal for the window (default: last 7 days), plus how many order requests they accepted and passed on
   * @request GET:/api/v1/admins/riders/{riderId}/insights/overview
   * @secure
   * @response `200` `AdminGetRiderInsightsOverviewData`
   */
  adminGetRiderInsightsOverview = (
    { riderId, ...query }: AdminGetRiderInsightsOverviewParams,
    params: RequestParams = {},
  ) =>
    this.request<AdminGetRiderInsightsOverviewData, any>({
      path: `/api/v1/admins/riders/${riderId}/insights/overview`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/riders/insights
   * @name AdminGetRiderEarningsSeries
   * @summary A rider's net/gross earnings per day, week or month, with the split by order type
   * @request GET:/api/v1/admins/riders/{riderId}/insights/earnings/series
   * @secure
   * @response `200` `AdminGetRiderEarningsSeriesData`
   */
  adminGetRiderEarningsSeries = (
    { riderId, ...query }: AdminGetRiderEarningsSeriesParams,
    params: RequestParams = {},
  ) =>
    this.request<AdminGetRiderEarningsSeriesData, any>({
      path: `/api/v1/admins/riders/${riderId}/insights/earnings/series`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/riders/insights
   * @name AdminGetRiderDeliveryMap
   * @summary A rider's completed pickup and drop-off points
   * @request GET:/api/v1/admins/riders/{riderId}/insights/map
   * @secure
   * @response `200` `AdminGetRiderDeliveryMapData`
   */
  adminGetRiderDeliveryMap = ({ riderId, ...query }: AdminGetRiderDeliveryMapParams, params: RequestParams = {}) =>
    this.request<AdminGetRiderDeliveryMapData, any>({
      path: `/api/v1/admins/riders/${riderId}/insights/map`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/riders/insights
   * @name AdminGetRiderRank
   * @summary Where the rider ranks by completed deliveries in their state (or country)
   * @request GET:/api/v1/admins/riders/{riderId}/insights/rank
   * @secure
   * @response `200` `AdminGetRiderRankData`
   */
  adminGetRiderRank = ({ riderId, ...query }: AdminGetRiderRankParams, params: RequestParams = {}) =>
    this.request<AdminGetRiderRankData, any>({
      path: `/api/v1/admins/riders/${riderId}/insights/rank`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/riders/insights
   * @name AdminGetRiderAchievements
   * @summary A rider's milestones and progress (read-only: never records an unlock)
   * @request GET:/api/v1/admins/riders/{riderId}/insights/achievements
   * @secure
   * @response `200` `AdminGetRiderAchievementsData`
   */
  adminGetRiderAchievements = (riderId: string, params: RequestParams = {}) =>
    this.request<AdminGetRiderAchievementsData, any>({
      path: `/api/v1/admins/riders/${riderId}/insights/achievements`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/riders/insights
   * @name AdminGetRiderInsightsProfile
   * @summary Admin-only: working hours, cancellations and reasons, location-change answers, withdrawals, lifetime
   * @request GET:/api/v1/admins/riders/{riderId}/insights/profile
   * @secure
   * @response `200` `AdminGetRiderInsightsProfileData`
   */
  adminGetRiderInsightsProfile = (
    { riderId, ...query }: AdminGetRiderInsightsProfileParams,
    params: RequestParams = {},
  ) =>
    this.request<AdminGetRiderInsightsProfileData, any>({
      path: `/api/v1/admins/riders/${riderId}/insights/profile`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags users/insights
   * @name GetCustomerInsightsOverview
   * @summary Deliveries, spend, timing, streak and top places for the range (default: this month)
   * @request GET:/api/v1/users/me/insights/overview
   * @secure
   * @response `200` `GetCustomerInsightsOverviewData`
   */
  getCustomerInsightsOverview = (query: GetCustomerInsightsOverviewParams, params: RequestParams = {}) =>
    this.request<GetCustomerInsightsOverviewData, any>({
      path: `/api/v1/users/me/insights/overview`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags users/insights
   * @name GetCustomerInsightsSeries
   * @summary Deliveries and spend per day/week/month across the range
   * @request GET:/api/v1/users/me/insights/series
   * @secure
   * @response `200` `GetCustomerInsightsSeriesData`
   */
  getCustomerInsightsSeries = (query: GetCustomerInsightsSeriesParams, params: RequestParams = {}) =>
    this.request<GetCustomerInsightsSeriesData, any>({
      path: `/api/v1/users/me/insights/series`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags users/insights
   * @name GetCustomerInsightsPlaces
   * @summary Most-used pickup and drop-off addresses, lifetime — feeds "Send again"
   * @request GET:/api/v1/users/me/insights/places
   * @secure
   * @response `200` `GetCustomerInsightsPlacesData`
   */
  getCustomerInsightsPlaces = (query: GetCustomerInsightsPlacesParams, params: RequestParams = {}) =>
    this.request<GetCustomerInsightsPlacesData, any>({
      path: `/api/v1/users/me/insights/places`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags users/insights
   * @name GetCustomerInsightsRecap
   * @summary Monthly wrap-up: the overview for one calendar month plus highlights
   * @request GET:/api/v1/users/me/insights/recap/{month}
   * @secure
   * @response `200` `GetCustomerInsightsRecapData`
   */
  getCustomerInsightsRecap = (month: string, params: RequestParams = {}) =>
    this.request<GetCustomerInsightsRecapData, any>({
      path: `/api/v1/users/me/insights/recap/${month}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags users/achievements
   * @name GetCustomerAchievements
   * @summary All badges with progress; unlocks anything newly earned and issues its coupon
   * @request GET:/api/v1/users/me/achievements
   * @secure
   * @response `200` `GetCustomerAchievementsData`
   */
  getCustomerAchievements = (params: RequestParams = {}) =>
    this.request<GetCustomerAchievementsData, any>({
      path: `/api/v1/users/me/achievements`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags users/achievements
   * @name AcknowledgeCustomerAchievement
   * @summary Mark a badge celebration as seen
   * @request PATCH:/api/v1/users/me/achievements/{key}/ack
   * @secure
   * @response `200` `AcknowledgeCustomerAchievementData`
   */
  acknowledgeCustomerAchievement = (key: string, params: RequestParams = {}) =>
    this.request<AcknowledgeCustomerAchievementData, any>({
      path: `/api/v1/users/me/achievements/${key}/ack`,
      method: "PATCH",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/achievements
   * @name Catalogue
   * @summary Badge catalogue with unlock and reward rollups per badge
   * @request GET:/api/v1/admins/achievements
   * @secure
   * @response `200` `CatalogueData`
   */
  catalogue = (params: RequestParams = {}) =>
    this.request<CatalogueData, any>({
      path: `/api/v1/admins/achievements`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/achievements
   * @name AchievementsSummary
   * @summary Programme totals: customers with badges, unlocks, rewards issued/redeemed, discount spend
   * @request GET:/api/v1/admins/achievements/summary
   * @secure
   * @response `200` `AchievementsSummaryData`
   */
  achievementsSummary = (query: AchievementsSummaryParams, params: RequestParams = {}) =>
    this.request<AchievementsSummaryData, any>({
      path: `/api/v1/admins/achievements/summary`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/achievements
   * @name Unlocks
   * @summary Who unlocked what, when, and whether the reward was used
   * @request GET:/api/v1/admins/achievements/unlocks
   * @secure
   * @response `200` `UnlocksData`
   */
  unlocks = (query: UnlocksParams, params: RequestParams = {}) =>
    this.request<UnlocksData, any>({
      path: `/api/v1/admins/achievements/unlocks`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/achievements
   * @name ForUser
   * @summary One customer’s badges and progress (read-only, never unlocks)
   * @request GET:/api/v1/admins/achievements/users/{userId}
   * @secure
   * @response `200` `ForUserData`
   */
  forUser = (userId: string, params: RequestParams = {}) =>
    this.request<ForUserData, any>({
      path: `/api/v1/admins/achievements/users/${userId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/achievements
   * @name Grant
   * @summary Unlock a badge for a customer and issue its reward coupon
   * @request POST:/api/v1/admins/achievements/users/{userId}/grant
   * @secure
   * @response `200` `GrantData`
   * @response `201` `AdminCustomerAchievementsResponseDto`
   */
  grant = (userId: string, data: GrantAchievementRequestDto, params: RequestParams = {}) =>
    this.request<GrantData, any>({
      path: `/api/v1/admins/achievements/users/${userId}/grant`,
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
   * @tags admins/achievements
   * @name Revoke
   * @summary Remove a badge; its unredeemed reward coupon is deactivated
   * @request DELETE:/api/v1/admins/achievements/users/{userId}/{key}
   * @secure
   * @response `200` `RevokeData`
   */
  revoke = (userId: string, key: string, params: RequestParams = {}) =>
    this.request<RevokeData, any>({
      path: `/api/v1/admins/achievements/users/${userId}/${key}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name LoginAdmins
   * @request POST:/api/v1/auth/admins/login
   * @response `201` `LoginAdminsData`
   */
  loginAdmins = (data: LoginRequestDto, params: RequestParams = {}) =>
    this.request<LoginAdminsData, any>({
      path: `/api/v1/auth/admins/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name Login
   * @request POST:/api/v1/auth/users/login
   * @response `201` `LoginData`
   */
  login = (data: LoginRequestDto, params: RequestParams = {}) =>
    this.request<LoginData, any>({
      path: `/api/v1/auth/users/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name LoginBusiness
   * @request POST:/api/v1/auth/businesses/login
   * @response `201` `LoginBusinessData`
   */
  loginBusiness = (data: LoginRequestDto, params: RequestParams = {}) =>
    this.request<LoginBusinessData, any>({
      path: `/api/v1/auth/businesses/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name VerifyPhone
   * @request POST:/api/v1/auth/verify/phone
   * @response `201` `VerifyPhoneData`
   */
  verifyPhone = (data: VerifyPhoneRequestDto, params: RequestParams = {}) =>
    this.request<VerifyPhoneData, any>({
      path: `/api/v1/auth/verify/phone`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name VerifyEmail
   * @request POST:/api/v1/auth/verify/email
   * @response `201` `VerifyEmailData`
   */
  verifyEmail = (data: VerifyEmailRequestDto, params: RequestParams = {}) =>
    this.request<VerifyEmailData, any>({
      path: `/api/v1/auth/verify/email`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name PasswordResetRequest
   * @request POST:/api/v1/auth/password-reset-request
   * @response `201` `PasswordResetRequestData`
   */
  passwordResetRequest = (data: TokenRequestDto, params: RequestParams = {}) =>
    this.request<PasswordResetRequestData, any>({
      path: `/api/v1/auth/password-reset-request`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name PasswordReset
   * @request POST:/api/v1/auth/password-reset
   * @response `201` `PasswordResetData`
   */
  passwordReset = (data: ResetPasswordRequestDto, params: RequestParams = {}) =>
    this.request<PasswordResetData, any>({
      path: `/api/v1/auth/password-reset`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name ResendToken
   * @request POST:/api/v1/auth/resend-token
   * @response `201` `ResendTokenData`
   */
  resendToken = (data: TokenRequestDto, params: RequestParams = {}) =>
    this.request<ResendTokenData, any>({
      path: `/api/v1/auth/resend-token`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name CheckTokenValidity
   * @request POST:/api/v1/auth/check-token
   * @response `201` `CheckTokenValidityData`
   */
  checkTokenValidity = (data: VerifyPhoneRequestDto, params: RequestParams = {}) =>
    this.request<CheckTokenValidityData, any>({
      path: `/api/v1/auth/check-token`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name GoogleSignIn
   * @request POST:/api/v1/auth/google
   * @response `201` `GoogleSignInData`
   */
  googleSignIn = (data: GoogleSignInRequestDto, params: RequestParams = {}) =>
    this.request<GoogleSignInData, any>({
      path: `/api/v1/auth/google`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name CreateUser
   * @request POST:/api/v1/users
   * @response `201` `CreateUserData`
   */
  createUser = (query: CreateUserParams, data: CreateUserRequestDto, params: RequestParams = {}) =>
    this.request<CreateUserData, any>({
      path: `/api/v1/users`,
      method: "POST",
      query: query,
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name GetUserProfile
   * @request GET:/api/v1/users/me
   * @secure
   * @response `200` `GetUserProfileData`
   */
  getUserProfile = (params: RequestParams = {}) =>
    this.request<GetUserProfileData, any>({
      path: `/api/v1/users/me`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name UpdateUserProfile
   * @request PATCH:/api/v1/users/me/update-profile
   * @secure
   * @response `200` `UpdateUserProfileData`
   */
  updateUserProfile = (data: UpdateProfileRequestDto, params: RequestParams = {}) =>
    this.request<UpdateUserProfileData, any>({
      path: `/api/v1/users/me/update-profile`,
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
   * @tags users
   * @name AcknowledgeWalletTerms
   * @request PATCH:/api/v1/users/me/acknowledge-wallet-terms
   * @secure
   * @response `200` `AcknowledgeWalletTermsData`
   */
  acknowledgeWalletTerms = (params: RequestParams = {}) =>
    this.request<AcknowledgeWalletTermsData, any>({
      path: `/api/v1/users/me/acknowledge-wallet-terms`,
      method: "PATCH",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name UpdateUserLocation
   * @request PATCH:/api/v1/users/me/update-location
   * @secure
   * @response `200` `UpdateUserLocationData`
   */
  updateUserLocation = (data: UpdateLocationRequestDto, params: RequestParams = {}) =>
    this.request<UpdateUserLocationData, any>({
      path: `/api/v1/users/me/update-location`,
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
   * @tags users
   * @name UpdateProfilePhoto
   * @request PATCH:/api/v1/users/me/update-profile-photo
   * @secure
   * @response `200` `UpdateProfilePhotoData`
   */
  updateProfilePhoto = (data: UpdatePhotoRequestDto, params: RequestParams = {}) =>
    this.request<UpdateProfilePhotoData, any>({
      path: `/api/v1/users/me/update-profile-photo`,
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
   * @tags users
   * @name UpdateUserAddresses
   * @request PATCH:/api/v1/users/me/update-addresses
   * @secure
   * @response `200` `UpdateUserAddressesData`
   */
  updateUserAddresses = (data: UpdateAddressesRequestDto, params: RequestParams = {}) =>
    this.request<UpdateUserAddressesData, any>({
      path: `/api/v1/users/me/update-addresses`,
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
   * @tags users
   * @name UserKycVerification
   * @request PUT:/api/v1/users/me/kyc
   * @secure
   * @response `200` `UserKycVerificationData`
   */
  userKycVerification = (data: UserKYCDetailDto, params: RequestParams = {}) =>
    this.request<UserKycVerificationData, any>({
      path: `/api/v1/users/me/kyc`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name ChangeUserPassword
   * @request PATCH:/api/v1/users/me/password-change
   * @secure
   * @response `200` `ChangeUserPasswordData`
   */
  changeUserPassword = (data: ChangePasswordRequestDto, params: RequestParams = {}) =>
    this.request<ChangeUserPasswordData, any>({
      path: `/api/v1/users/me/password-change`,
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
   * @tags users
   * @name GetUserWallets
   * @request GET:/api/v1/users/me/wallets
   * @secure
   * @response `200` `GetUserWalletsData`
   */
  getUserWallets = (params: RequestParams = {}) =>
    this.request<GetUserWalletsData, any>({
      path: `/api/v1/users/me/wallets`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name GetUserWallet
   * @request GET:/api/v1/users/me/wallets/{walletId}
   * @secure
   * @response `200` `GetUserWalletData`
   */
  getUserWallet = (walletId: string, params: RequestParams = {}) =>
    this.request<GetUserWalletData, any>({
      path: `/api/v1/users/me/wallets/${walletId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name InitializeFundWallet
   * @request POST:/api/v1/users/me/wallets/{walletId}/initialize-funding
   * @secure
   * @response `201` `InitializeFundWalletData`
   */
  initializeFundWallet = (walletId: string, data: FundWalletRequestDto, params: RequestParams = {}) =>
    this.request<InitializeFundWalletData, any>({
      path: `/api/v1/users/me/wallets/${walletId}/initialize-funding`,
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
   * @tags users
   * @name CancelFundWallet
   * @request POST:/api/v1/users/me/wallets/{walletId}/cancel-funding
   * @secure
   * @response `201` `CancelFundWalletData`
   */
  cancelFundWallet = (walletId: string, data: CancelFundWalletRequestDto, params: RequestParams = {}) =>
    this.request<CancelFundWalletData, any>({
      path: `/api/v1/users/me/wallets/${walletId}/cancel-funding`,
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
   * @tags users
   * @name UpdateSettlementAccount
   * @request PATCH:/api/v1/users/me/wallets/{walletId}/settlement-account
   * @secure
   * @response `200` `UpdateSettlementAccountData`
   */
  updateSettlementAccount = (walletId: string, data: UpdateSettlementAccountRequestDto, params: RequestParams = {}) =>
    this.request<UpdateSettlementAccountData, any>({
      path: `/api/v1/users/me/wallets/${walletId}/settlement-account`,
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
   * @tags users
   * @name InitiateWithdrawal
   * @request PATCH:/api/v1/users/me/wallets/{walletId}/withdrawal-request
   * @secure
   * @response `200` `InitiateWithdrawalData`
   */
  initiateWithdrawal = (walletId: string, data: InitiateWithdrawalRequestDto, params: RequestParams = {}) =>
    this.request<InitiateWithdrawalData, any>({
      path: `/api/v1/users/me/wallets/${walletId}/withdrawal-request`,
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
   * @tags users
   * @name GetActiveCoupons
   * @request GET:/api/v1/users/me/coupons
   * @secure
   * @response `200` `GetActiveCouponsData`
   */
  getActiveCoupons = (params: RequestParams = {}) =>
    this.request<GetActiveCouponsData, any>({
      path: `/api/v1/users/me/coupons`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name GetAllReferrals
   * @request GET:/api/v1/users/me/referrals
   * @secure
   * @response `200` `GetAllReferralsData`
   */
  getAllReferrals = (query: GetAllReferralsParams, params: RequestParams = {}) =>
    this.request<GetAllReferralsData, any>({
      path: `/api/v1/users/me/referrals`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name GetUserTransactions
   * @request GET:/api/v1/users/me/transactions
   * @secure
   * @response `200` `GetUserTransactionsData`
   */
  getUserTransactions = (query: GetUserTransactionsParams, params: RequestParams = {}) =>
    this.request<GetUserTransactionsData, any>({
      path: `/api/v1/users/me/transactions`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name GetUserTransactionsSummary
   * @request GET:/api/v1/users/me/transactions/summary
   * @secure
   * @response `200` `GetUserTransactionsSummaryData`
   */
  getUserTransactionsSummary = (query: GetUserTransactionsSummaryParams, params: RequestParams = {}) =>
    this.request<GetUserTransactionsSummaryData, any>({
      path: `/api/v1/users/me/transactions/summary`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name GetUserTransaction
   * @request GET:/api/v1/users/me/transactions/{transactionId}
   * @secure
   * @response `200` `GetUserTransactionData`
   */
  getUserTransaction = (transactionId: string, params: RequestParams = {}) =>
    this.request<GetUserTransactionData, any>({
      path: `/api/v1/users/me/transactions/${transactionId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name DeleteUserAccount
   * @request DELETE:/api/v1/users/me/delete-account
   * @secure
   * @response `200` `DeleteUserAccountData`
   */
  deleteUserAccount = (params: RequestParams = {}) =>
    this.request<DeleteUserAccountData, any>({
      path: `/api/v1/users/me/delete-account`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name UpdatePhoneNumber
   * @request PATCH:/api/v1/users/me/phone
   * @secure
   * @response `200` `UpdatePhoneNumberData`
   */
  updatePhoneNumber = (data: UpdatePhoneRequestDto, params: RequestParams = {}) =>
    this.request<UpdatePhoneNumberData, any>({
      path: `/api/v1/users/me/phone`,
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
   * @tags users
   * @name UpdateEmail
   * @request PATCH:/api/v1/users/me/email
   * @secure
   * @response `200` `UpdateEmailData`
   */
  updateEmail = (data: UpdateEmailRequestDto, params: RequestParams = {}) =>
    this.request<UpdateEmailData, any>({
      path: `/api/v1/users/me/email`,
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
   * @tags users
   * @name UpdateUserPreferences
   * @request PATCH:/api/v1/users/me/preferences
   * @secure
   * @response `200` `UpdateUserPreferencesData`
   */
  updateUserPreferences = (data: UpdatePreferencesRequestDto, params: RequestParams = {}) =>
    this.request<UpdateUserPreferencesData, any>({
      path: `/api/v1/users/me/preferences`,
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
   * @tags users
   * @name ToggleOnlinePresence
   * @request PATCH:/api/v1/users/me/toggle-presence
   * @secure
   * @response `200` `ToggleOnlinePresenceData`
   */
  toggleOnlinePresence = (params: RequestParams = {}) =>
    this.request<ToggleOnlinePresenceData, any>({
      path: `/api/v1/users/me/toggle-presence`,
      method: "PATCH",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name GetRiderOrder
   * @request GET:/api/v1/users/me/orders/{orderId}
   * @secure
   * @response `200` `GetRiderOrderData`
   */
  getRiderOrder = (orderId: string, params: RequestParams = {}) =>
    this.request<GetRiderOrderData, any>({
      path: `/api/v1/users/me/orders/${orderId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name VerifyDriversLicense
   * @request PATCH:/api/v1/users/me/documents/drivers-license/verify
   * @secure
   * @response `200` `VerifyDriversLicenseData`
   */
  verifyDriversLicense = (data: SubmitDriversLicenseRequestDto, params: RequestParams = {}) =>
    this.request<VerifyDriversLicenseData, any>({
      path: `/api/v1/users/me/documents/drivers-license/verify`,
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
   * @tags users
   * @name SubmitDriversLicense
   * @request PATCH:/api/v1/users/me/documents/drivers-license
   * @secure
   * @response `200` `SubmitDriversLicenseData`
   */
  submitDriversLicense = (data: SubmitDriversLicenseRequestDto, params: RequestParams = {}) =>
    this.request<SubmitDriversLicenseData, any>({
      path: `/api/v1/users/me/documents/drivers-license`,
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
   * @tags users
   * @name GetUserVehicle
   * @request GET:/api/v1/users/me/vehicle
   * @secure
   * @response `200` `GetUserVehicleData`
   */
  getUserVehicle = (params: RequestParams = {}) =>
    this.request<GetUserVehicleData, any>({
      path: `/api/v1/users/me/vehicle`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/users
   * @name AdminCreateUser
   * @request POST:/api/v1/admins/users
   * @response `201` `AdminCreateUserData`
   */
  adminCreateUser = (data: CreateUserRequestDto, params: RequestParams = {}) =>
    this.request<AdminCreateUserData, any>({
      path: `/api/v1/admins/users`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/users
   * @name GetUsers
   * @request GET:/api/v1/admins/users
   * @secure
   * @response `200` `GetUsersData`
   */
  getUsers = (query: GetUsersParams, params: RequestParams = {}) =>
    this.request<GetUsersData, any>({
      path: `/api/v1/admins/users`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/users
   * @name AdminGetMyProfile
   * @request GET:/api/v1/admins/users/me
   * @secure
   * @response `200` `AdminGetMyProfileData`
   */
  adminGetMyProfile = (params: RequestParams = {}) =>
    this.request<AdminGetMyProfileData, any>({
      path: `/api/v1/admins/users/me`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/users
   * @name AdminUpdateMyPhoto
   * @request PATCH:/api/v1/admins/users/me/update-profile-photo
   * @secure
   * @response `200` `AdminUpdateMyPhotoData`
   */
  adminUpdateMyPhoto = (data: UpdatePhotoRequestDto, params: RequestParams = {}) =>
    this.request<AdminUpdateMyPhotoData, any>({
      path: `/api/v1/admins/users/me/update-profile-photo`,
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
   * @tags admins/users
   * @name AdminUpdateMyAddresses
   * @request PATCH:/api/v1/admins/users/me/update-addresses
   * @secure
   * @response `200` `AdminUpdateMyAddressesData`
   */
  adminUpdateMyAddresses = (data: UpdateAddressesRequestDto, params: RequestParams = {}) =>
    this.request<AdminUpdateMyAddressesData, any>({
      path: `/api/v1/admins/users/me/update-addresses`,
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
   * @tags admins/users
   * @name AdminChangeMyPassword
   * @request PATCH:/api/v1/admins/users/me/password-change
   * @secure
   * @response `200` `AdminChangeMyPasswordData`
   */
  adminChangeMyPassword = (data: ChangePasswordRequestDto, params: RequestParams = {}) =>
    this.request<AdminChangeMyPasswordData, any>({
      path: `/api/v1/admins/users/me/password-change`,
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
   * @tags admins/users
   * @name GetAdminPreferences
   * @request GET:/api/v1/admins/users/me/preferences
   * @secure
   * @response `200` `GetAdminPreferencesData`
   */
  getAdminPreferences = (params: RequestParams = {}) =>
    this.request<GetAdminPreferencesData, any>({
      path: `/api/v1/admins/users/me/preferences`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/users
   * @name UpdateAdminPreferences
   * @request PATCH:/api/v1/admins/users/me/preferences
   * @secure
   * @response `200` `UpdateAdminPreferencesData`
   */
  updateAdminPreferences = (data: UpdateAdminPreferencesRequestDto, params: RequestParams = {}) =>
    this.request<UpdateAdminPreferencesData, any>({
      path: `/api/v1/admins/users/me/preferences`,
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
   * @tags admins/users
   * @name UpdateUserPhone
   * @request PATCH:/api/v1/admins/users/{userId}/phone
   * @secure
   * @response `200` `UpdateUserPhoneData`
   */
  updateUserPhone = (userId: string, data: UpdateUserPhoneRequestDto, params: RequestParams = {}) =>
    this.request<UpdateUserPhoneData, any>({
      path: `/api/v1/admins/users/${userId}/phone`,
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
   * @tags admins/users
   * @name AdminRemoveUserPhoto
   * @summary Remove a user's profile photo so the app asks them to upload a new one
   * @request PATCH:/api/v1/admins/users/{userId}/photo/remove
   * @secure
   * @response `200` `AdminRemoveUserPhotoData`
   */
  adminRemoveUserPhoto = (userId: string, params: RequestParams = {}) =>
    this.request<AdminRemoveUserPhotoData, any>({
      path: `/api/v1/admins/users/${userId}/photo/remove`,
      method: "PATCH",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/users
   * @name SetDispatchPaused
   * @request PATCH:/api/v1/admins/users/{userId}/dispatch
   * @secure
   * @response `200` `SetDispatchPausedData`
   */
  setDispatchPaused = (userId: string, data: UpdateDispatchPauseRequestDto, params: RequestParams = {}) =>
    this.request<SetDispatchPausedData, any>({
      path: `/api/v1/admins/users/${userId}/dispatch`,
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
   * @tags admins/users
   * @name AdminSetWithdrawalRestriction
   * @summary Pause or resume wallet withdrawals for a user. reason is required when restricted is true.
   * @request PATCH:/api/v1/admins/users/{userId}/withdrawal-restriction
   * @secure
   * @response `200` `AdminSetWithdrawalRestrictionData`
   */
  adminSetWithdrawalRestriction = (
    userId: string,
    data: UpdateWithdrawalRestrictionRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<AdminSetWithdrawalRestrictionData, any>({
      path: `/api/v1/admins/users/${userId}/withdrawal-restriction`,
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
   * @tags admins/users
   * @name GetUser
   * @request GET:/api/v1/admins/users/{userId}
   * @secure
   * @response `200` `GetUserData`
   */
  getUser = (userId: string, params: RequestParams = {}) =>
    this.request<GetUserData, any>({
      path: `/api/v1/admins/users/${userId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/users
   * @name AdminGetUserWallets
   * @request GET:/api/v1/admins/users/{userId}/wallets
   * @secure
   * @response `200` `AdminGetUserWalletsData`
   */
  adminGetUserWallets = (userId: string, params: RequestParams = {}) =>
    this.request<AdminGetUserWalletsData, any>({
      path: `/api/v1/admins/users/${userId}/wallets`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/users
   * @name UpdateUserStatus
   * @request PATCH:/api/v1/admins/users/{userId}/status
   * @secure
   * @response `200` `UpdateUserStatusData`
   */
  updateUserStatus = (userId: string, data: UpdateUserStatusRequestDto, params: RequestParams = {}) =>
    this.request<UpdateUserStatusData, any>({
      path: `/api/v1/admins/users/${userId}/status`,
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
   * @tags admins/users
   * @name AdjustUserWallet
   * @request POST:/api/v1/admins/users/{userId}/wallets/adjust
   * @secure
   * @response `201` `AdjustUserWalletData`
   */
  adjustUserWallet = (userId: string, data: AdjustWalletRequestDto, params: RequestParams = {}) =>
    this.request<AdjustUserWalletData, any>({
      path: `/api/v1/admins/users/${userId}/wallets/adjust`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/users
   * @name RefundableOrders
   * @summary Paid orders for a customer with what has already been refunded and what still can be
   * @request GET:/api/v1/admins/users/{userId}/refundable-orders
   * @secure
   * @response `200` `RefundableOrdersData`
   */
  refundableOrders = ({ userId, ...query }: RefundableOrdersParams, params: RequestParams = {}) =>
    this.request<RefundableOrdersData, any>({
      path: `/api/v1/admins/users/${userId}/refundable-orders`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/users
   * @name RefundCustomerOrder
   * @request POST:/api/v1/admins/users/{userId}/refund
   * @response `201` `RefundCustomerOrderData`
   */
  refundCustomerOrder = (userId: string, data: RefundOrderRequestDto, params: RequestParams = {}) =>
    this.request<RefundCustomerOrderData, any>({
      path: `/api/v1/admins/users/${userId}/refund`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/users
   * @name AdminVerifyDriversLicense
   * @request PATCH:/api/v1/admins/users/{userId}/drivers-license/verify
   * @secure
   * @response `200` `AdminVerifyDriversLicenseData`
   */
  adminVerifyDriversLicense = (userId: string, data: SubmitDriversLicenseRequestDto, params: RequestParams = {}) =>
    this.request<AdminVerifyDriversLicenseData, any>({
      path: `/api/v1/admins/users/${userId}/drivers-license/verify`,
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
   * @tags admins/users
   * @name ApproveDriversLicenseSubmission
   * @request PATCH:/api/v1/admins/users/{userId}/drivers-license/approve
   * @secure
   * @response `200` `ApproveDriversLicenseSubmissionData`
   */
  approveDriversLicenseSubmission = (userId: string, params: RequestParams = {}) =>
    this.request<ApproveDriversLicenseSubmissionData, any>({
      path: `/api/v1/admins/users/${userId}/drivers-license/approve`,
      method: "PATCH",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/users
   * @name UpdateDriversLicense
   * @request PATCH:/api/v1/admins/users/{userId}/drivers-license/update
   * @secure
   * @response `200` `UpdateDriversLicenseData`
   */
  updateDriversLicense = (userId: string, data: UpdateDriverLicenseRequestDto, params: RequestParams = {}) =>
    this.request<UpdateDriversLicenseData, any>({
      path: `/api/v1/admins/users/${userId}/drivers-license/update`,
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
   * @tags admins/users
   * @name AdminUpdateSettlementAccount
   * @request PATCH:/api/v1/admins/users/{userId}/wallets/{walletId}/settlement-account
   * @secure
   * @response `200` `AdminUpdateSettlementAccountData`
   */
  adminUpdateSettlementAccount = (
    userId: string,
    walletId: string,
    data: UpdateSettlementAccountRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<AdminUpdateSettlementAccountData, any>({
      path: `/api/v1/admins/users/${userId}/wallets/${walletId}/settlement-account`,
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
   * @tags wallets
   * @name CreateWallet
   * @request POST:/api/v1/wallets
   * @secure
   * @response `201` `CreateWalletData`
   */
  createWallet = (data: WalletCreateRequestDto, params: RequestParams = {}) =>
    this.request<CreateWalletData, any>({
      path: `/api/v1/wallets`,
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
   * @tags wallets
   * @name CreditPlatformWallet
   * @request POST:/api/v1/wallets/credit-platform
   * @secure
   * @response `201` `CreditPlatformWalletData`
   */
  creditPlatformWallet = (params: RequestParams = {}) =>
    this.request<CreditPlatformWalletData, any>({
      path: `/api/v1/wallets/credit-platform`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/wallets
   * @name GetPlatformWallet
   * @request GET:/api/v1/admins/wallets/platform-wallet
   * @secure
   * @response `200` `GetPlatformWalletData`
   */
  getPlatformWallet = (params: RequestParams = {}) =>
    this.request<GetPlatformWalletData, any>({
      path: `/api/v1/admins/wallets/platform-wallet`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/coupons
   * @name ListCoupons
   * @summary All coupons with lifecycle, redemptions, discount given and groups
   * @request GET:/api/v1/admins/coupons
   * @secure
   * @response `200` `ListCouponsData`
   */
  listCoupons = (query: ListCouponsParams, params: RequestParams = {}) =>
    this.request<ListCouponsData, any>({
      path: `/api/v1/admins/coupons`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/coupons
   * @name CreateCoupon
   * @request POST:/api/v1/admins/coupons
   * @secure
   * @response `201` `CreateCouponData`
   */
  createCoupon = (data: CreateCouponRequestDto, params: RequestParams = {}) =>
    this.request<CreateCouponData, any>({
      path: `/api/v1/admins/coupons`,
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
   * @tags admins/coupons
   * @name CouponsSummary
   * @summary Coupon programme health: active count, redemptions, discount spend, top coupons
   * @request GET:/api/v1/admins/coupons/summary
   * @secure
   * @response `200` `CouponsSummaryData`
   */
  couponsSummary = (query: CouponsSummaryParams, params: RequestParams = {}) =>
    this.request<CouponsSummaryData, any>({
      path: `/api/v1/admins/coupons/summary`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/coupons
   * @name ListGroups
   * @summary Customer groups targeted coupons are attached to
   * @request GET:/api/v1/admins/coupons/groups
   * @secure
   * @response `200` `ListGroupsData`
   */
  listGroups = (query: ListGroupsParams, params: RequestParams = {}) =>
    this.request<ListGroupsData, any>({
      path: `/api/v1/admins/coupons/groups`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/coupons
   * @name CreateGroup
   * @request POST:/api/v1/admins/coupons/groups
   * @secure
   * @response `201` `CreateGroupData`
   */
  createGroup = (data: CreateGroupRequestDto, params: RequestParams = {}) =>
    this.request<CreateGroupData, any>({
      path: `/api/v1/admins/coupons/groups`,
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
   * @tags admins/coupons
   * @name GetGroup
   * @summary One group with its members and coupons
   * @request GET:/api/v1/admins/coupons/groups/{groupId}
   * @secure
   * @response `200` `GetGroupData`
   */
  getGroup = (groupId: string, params: RequestParams = {}) =>
    this.request<GetGroupData, any>({
      path: `/api/v1/admins/coupons/groups/${groupId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/coupons
   * @name UpdateGroup
   * @summary Rename a group or replace the coupons attached to it
   * @request PATCH:/api/v1/admins/coupons/groups/{groupId}
   * @secure
   * @response `200` `UpdateGroupData`
   */
  updateGroup = (groupId: string, data: UpdateGroupRequestDto, params: RequestParams = {}) =>
    this.request<UpdateGroupData, any>({
      path: `/api/v1/admins/coupons/groups/${groupId}`,
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
   * @tags admins/coupons
   * @name GetCoupon
   * @summary One coupon with its redemption rollups
   * @request GET:/api/v1/admins/coupons/{couponId}
   * @secure
   * @response `200` `GetCouponData`
   */
  getCoupon = (couponId: string, params: RequestParams = {}) =>
    this.request<GetCouponData, any>({
      path: `/api/v1/admins/coupons/${couponId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/coupons
   * @name UpdateCoupon
   * @summary Edit name, description, expiry, limit, cap, targeting; pause or resume
   * @request PATCH:/api/v1/admins/coupons/{couponId}
   * @secure
   * @response `200` `UpdateCouponData`
   */
  updateCoupon = (couponId: string, data: UpdateCouponRequestDto, params: RequestParams = {}) =>
    this.request<UpdateCouponData, any>({
      path: `/api/v1/admins/coupons/${couponId}`,
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
   * @tags admins/coupons
   * @name Usages
   * @summary Who redeemed a coupon, on which order, for how much
   * @request GET:/api/v1/admins/coupons/{couponId}/usages
   * @secure
   * @response `200` `UsagesData`
   */
  usages = ({ couponId, ...query }: UsagesParams, params: RequestParams = {}) =>
    this.request<UsagesData, any>({
      path: `/api/v1/admins/coupons/${couponId}/usages`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/coupons
   * @name AddGroupUsers
   * @request PATCH:/api/v1/admins/coupons/groups/{groupId}/add
   * @secure
   * @response `200` `AddGroupUsersData`
   */
  addGroupUsers = (groupId: string, data: UpdateGroupUsersRequestDto, params: RequestParams = {}) =>
    this.request<AddGroupUsersData, any>({
      path: `/api/v1/admins/coupons/groups/${groupId}/add`,
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
   * @tags admins/coupons
   * @name RemoveGroupUsers
   * @request PATCH:/api/v1/admins/coupons/groups/{groupId}/remove
   * @secure
   * @response `200` `RemoveGroupUsersData`
   */
  removeGroupUsers = (groupId: string, data: UpdateGroupUsersRequestDto, params: RequestParams = {}) =>
    this.request<RemoveGroupUsersData, any>({
      path: `/api/v1/admins/coupons/groups/${groupId}/remove`,
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
   * @tags admins/coupons
   * @name DeactivateCoupon
   * @request PATCH:/api/v1/admins/coupons/{couponCode}/deactivate
   * @secure
   * @response `200` `DeactivateCouponData`
   */
  deactivateCoupon = (couponCode: string, params: RequestParams = {}) =>
    this.request<DeactivateCouponData, any>({
      path: `/api/v1/admins/coupons/${couponCode}/deactivate`,
      method: "PATCH",
      secure: true,
      ...params,
    });
  /**
   * @description Look up the holder's name for a Nigerian (NUBAN) account before saving it, so the user can confirm it is theirs. Not audited on purpose: audit logs would keep the full account number and name.
   *
   * @tags payments
   * @name ResolveBankAccount
   * @request GET:/api/v1/payments/banks/resolve
   * @secure
   * @response `200` `ResolveBankAccountData`
   * @response `400` `any` Validation failed (BAD_REQUEST), no such account (ACCOUNT_NOT_FOUND), or unknown bank code (INVALID_BANK).
   * @response `429` `any` RATE_LIMITED: more than 20 lookups a minute or 200 a day.
   * @response `503` `any` PROVIDER_UNAVAILABLE: the bank lookup is busy. Retryable.
   */
  resolveBankAccount = (query: ResolveBankAccountParams, params: RequestParams = {}) =>
    this.request<ResolveBankAccountData, any>({
      path: `/api/v1/payments/banks/resolve`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags payments
   * @name GetBanks
   * @request GET:/api/v1/payments/{provider}/banks
   * @secure
   * @response `200` `GetBanksData`
   */
  getBanks = ({ provider, ...query }: GetBanksParams, params: RequestParams = {}) =>
    this.request<GetBanksData, any>({
      path: `/api/v1/payments/${provider}/banks`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags payments
   * @name CreateDedicatedVirtualAccount
   * @request POST:/api/v1/payments/dedicated-account/create
   * @secure
   * @response `201` `CreateDedicatedVirtualAccountData`
   */
  createDedicatedVirtualAccount = (data: CreateVirtualAccountRequestDto, params: RequestParams = {}) =>
    this.request<CreateDedicatedVirtualAccountData, any>({
      path: `/api/v1/payments/dedicated-account/create`,
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
   * @tags admins/wallets
   * @name GetPlatformBanks
   * @request GET:/api/v1/admins/wallets/banks
   * @secure
   * @response `200` `GetPlatformBanksData`
   */
  getPlatformBanks = (params: RequestParams = {}) =>
    this.request<GetPlatformBanksData, any>({
      path: `/api/v1/admins/wallets/banks`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/wallets
   * @name GetFinanceStatus
   * @request GET:/api/v1/admins/wallets/finance-status
   * @secure
   * @response `200` `GetFinanceStatusData`
   */
  getFinanceStatus = (params: RequestParams = {}) =>
    this.request<GetFinanceStatusData, any>({
      path: `/api/v1/admins/wallets/finance-status`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/wallets
   * @name UpdateSettlement
   * @request POST:/api/v1/admins/wallets/platform-wallet/settlement
   * @secure
   * @response `201` `UpdateSettlementData`
   */
  updateSettlement = (data: UpdatePlatformSettlementDto, params: RequestParams = {}) =>
    this.request<UpdateSettlementData, any>({
      path: `/api/v1/admins/wallets/platform-wallet/settlement`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/wallets
   * @name SetPin
   * @request POST:/api/v1/admins/wallets/pin
   * @secure
   * @response `201` `SetPinData`
   */
  setPin = (data: SetWithdrawalPinDto, params: RequestParams = {}) =>
    this.request<SetPinData, any>({
      path: `/api/v1/admins/wallets/pin`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/wallets
   * @name InitiatePayout
   * @request POST:/api/v1/admins/wallets/platform-wallet/payout
   * @secure
   * @response `201` `InitiatePayoutData`
   */
  initiatePayout = (data: InitiatePayoutDto, params: RequestParams = {}) =>
    this.request<InitiatePayoutData, any>({
      path: `/api/v1/admins/wallets/platform-wallet/payout`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/wallets
   * @name TransferToUser
   * @request POST:/api/v1/admins/wallets/platform-wallet/transfer
   * @secure
   * @response `201` `TransferToUserData`
   */
  transferToUser = (data: TransferToWalletDto, params: RequestParams = {}) =>
    this.request<TransferToUserData, any>({
      path: `/api/v1/admins/wallets/platform-wallet/transfer`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags datalogs
   * @name GetLogs
   * @request GET:/api/v1/datalogs
   * @secure
   * @response `200` `GetLogsData`
   */
  getLogs = (query: GetLogsParams, params: RequestParams = {}) =>
    this.request<GetLogsData, any>({
      path: `/api/v1/datalogs`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags notifications
   * @name GetNotifications
   * @request GET:/api/v1/notifications
   * @secure
   * @response `200` `GetNotificationsData`
   */
  getNotifications = (query: GetNotificationsParams, params: RequestParams = {}) =>
    this.request<GetNotificationsData, any>({
      path: `/api/v1/notifications`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags notifications
   * @name GetUserNotification
   * @request GET:/api/v1/notifications/{notificationId}
   * @secure
   * @response `200` `GetUserNotificationData`
   */
  getUserNotification = (notificationId: string, params: RequestParams = {}) =>
    this.request<GetUserNotificationData, any>({
      path: `/api/v1/notifications/${notificationId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags notifications
   * @name BulkMarkNotificationsAsRead
   * @request PATCH:/api/v1/notifications/mark-as-read
   * @secure
   * @response `200` `BulkMarkNotificationsAsReadData`
   */
  bulkMarkNotificationsAsRead = (data: UpdateNotificationsRequestDto, params: RequestParams = {}) =>
    this.request<BulkMarkNotificationsAsReadData, any>({
      path: `/api/v1/notifications/mark-as-read`,
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
   * @tags admins/notifications
   * @name CreateTemplate
   * @request POST:/api/v1/admins/notifications/templates
   * @secure
   * @response `201` `CreateTemplateData`
   */
  createTemplate = (data: CreateTemplateRequestDto, params: RequestParams = {}) =>
    this.request<CreateTemplateData, any>({
      path: `/api/v1/admins/notifications/templates`,
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
   * @tags admins/notifications
   * @name TriggerNotification
   * @request POST:/api/v1/admins/notifications/trigger
   * @secure
   * @response `201` `TriggerNotificationData`
   */
  triggerNotification = (data: TriggerNotificationRequestDto, params: RequestParams = {}) =>
    this.request<TriggerNotificationData, any>({
      path: `/api/v1/admins/notifications/trigger`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/notifications
   * @name EstimateBroadcast
   * @request POST:/api/v1/admins/notifications/broadcasts/estimate
   * @secure
   * @response `201` `EstimateBroadcastData`
   */
  estimateBroadcast = (data: BroadcastEstimateRequestDto, params: RequestParams = {}) =>
    this.request<EstimateBroadcastData, any>({
      path: `/api/v1/admins/notifications/broadcasts/estimate`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/notifications
   * @name CreateBroadcast
   * @request POST:/api/v1/admins/notifications/broadcasts
   * @secure
   * @response `201` `CreateBroadcastData`
   */
  createBroadcast = (data: BroadcastRequestDto, params: RequestParams = {}) =>
    this.request<CreateBroadcastData, any>({
      path: `/api/v1/admins/notifications/broadcasts`,
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
   * @tags admins/notifications
   * @name ListBroadcasts
   * @request GET:/api/v1/admins/notifications/broadcasts
   * @secure
   * @response `200` `ListBroadcastsData`
   */
  listBroadcasts = (query: ListBroadcastsParams, params: RequestParams = {}) =>
    this.request<ListBroadcastsData, any>({
      path: `/api/v1/admins/notifications/broadcasts`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/notifications
   * @name GetBroadcast
   * @request GET:/api/v1/admins/notifications/broadcasts/{broadcastId}
   * @secure
   * @response `200` `GetBroadcastData`
   */
  getBroadcast = (broadcastId: string, params: RequestParams = {}) =>
    this.request<GetBroadcastData, any>({
      path: `/api/v1/admins/notifications/broadcasts/${broadcastId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Every notification recorded, filterable by broadcast, user, status, type.
   *
   * @tags admins/notifications
   * @name Log
   * @request GET:/api/v1/admins/notifications/log
   * @secure
   * @response `200` `LogData`
   */
  log = (query: LogParams, params: RequestParams = {}) =>
    this.request<LogData, any>({
      path: `/api/v1/admins/notifications/log`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags businesses
   * @name CreateBusiness
   * @request POST:/api/v1/businesses
   * @response `201` `CreateBusinessData`
   */
  createBusiness = (data: CreateBusinessRequestDto, params: RequestParams = {}) =>
    this.request<CreateBusinessData, any>({
      path: `/api/v1/businesses`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags businesses
   * @name CreateBusinessUser
   * @request POST:/api/v1/businesses/users
   * @secure
   * @response `201` `CreateBusinessUserData`
   */
  createBusinessUser = (data: CreateBusinessUserRequestDto, params: RequestParams = {}) =>
    this.request<CreateBusinessUserData, any>({
      path: `/api/v1/businesses/users`,
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
   * @tags businesses
   * @name GetBusinessUser
   * @request GET:/api/v1/businesses/{businessId}/users/{userId}
   * @secure
   * @response `200` `GetBusinessUserData`
   */
  getBusinessUser = (businessId: string, userId: string, params: RequestParams = {}) =>
    this.request<GetBusinessUserData, any>({
      path: `/api/v1/businesses/${businessId}/users/${userId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags businesses
   * @name UpdateBusinessUser
   * @request PATCH:/api/v1/businesses/{businessId}/users/{userId}
   * @secure
   * @response `200` `UpdateBusinessUserData`
   */
  updateBusinessUser = (
    businessId: string,
    userId: string,
    data: UpdateProfileRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<UpdateBusinessUserData, any>({
      path: `/api/v1/businesses/${businessId}/users/${userId}`,
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
   * @tags businesses
   * @name RemoveUserFromBusiness
   * @request DELETE:/api/v1/businesses/{businessId}/users/{userId}
   * @secure
   * @response `200` `RemoveUserFromBusinessData`
   */
  removeUserFromBusiness = (businessId: string, userId: string, params: RequestParams = {}) =>
    this.request<RemoveUserFromBusinessData, any>({
      path: `/api/v1/businesses/${businessId}/users/${userId}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags businesses
   * @name GetBusinessUsers
   * @request GET:/api/v1/businesses/{businessId}/users
   * @secure
   * @response `200` `GetBusinessUsersData`
   */
  getBusinessUsers = ({ businessId, ...query }: GetBusinessUsersParams, params: RequestParams = {}) =>
    this.request<GetBusinessUsersData, any>({
      path: `/api/v1/businesses/${businessId}/users`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags businesses
   * @name AddVehicles
   * @request POST:/api/v1/businesses/vehicles
   * @secure
   * @response `201` `AddVehiclesData`
   */
  addVehicles = (data: AddVehiclesDto, params: RequestParams = {}) =>
    this.request<AddVehiclesData, any>({
      path: `/api/v1/businesses/vehicles`,
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
   * @tags businesses
   * @name AssignUserVehicle
   * @request PATCH:/api/v1/businesses/vehicles/{vehicleId}/assign
   * @secure
   * @response `200` `AssignUserVehicleData`
   */
  assignUserVehicle = (vehicleId: string, data: AssignVehicleDto, params: RequestParams = {}) =>
    this.request<AssignUserVehicleData, any>({
      path: `/api/v1/businesses/vehicles/${vehicleId}/assign`,
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
   * @tags businesses
   * @name AddKycDetails
   * @request PATCH:/api/v1/businesses/{businessId}/kyc
   * @secure
   * @response `200` `AddKycDetailsData`
   */
  addKycDetails = (businessId: string, data: KYCDetailsDto, params: RequestParams = {}) =>
    this.request<AddKycDetailsData, any>({
      path: `/api/v1/businesses/${businessId}/kyc`,
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
   * @tags businesses
   * @name GetUserReviews
   * @request GET:/api/v1/businesses/users/{userId}/reviews
   * @secure
   * @response `200` `GetUserReviewsData`
   */
  getUserReviews = (userId: string, params: RequestParams = {}) =>
    this.request<GetUserReviewsData, any>({
      path: `/api/v1/businesses/users/${userId}/reviews`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags businesses
   * @name GetBusinessTransactions
   * @request GET:/api/v1/businesses/{businessId}/transactions
   * @secure
   * @response `200` `GetBusinessTransactionsData`
   */
  getBusinessTransactions = ({ businessId, ...query }: GetBusinessTransactionsParams, params: RequestParams = {}) =>
    this.request<GetBusinessTransactionsData, any>({
      path: `/api/v1/businesses/${businessId}/transactions`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags businesses
   * @name GetBusinessTransaction
   * @request GET:/api/v1/businesses/{businessId}/transactions/{transactionId}
   * @secure
   * @response `200` `GetBusinessTransactionData`
   */
  getBusinessTransaction = (businessId: string, transactionId: string, params: RequestParams = {}) =>
    this.request<GetBusinessTransactionData, any>({
      path: `/api/v1/businesses/${businessId}/transactions/${transactionId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags businesses
   * @name GetBusinessOrders
   * @request GET:/api/v1/businesses/{businessId}/orders
   * @secure
   * @response `200` `GetBusinessOrdersData`
   */
  getBusinessOrders = ({ businessId, ...query }: GetBusinessOrdersParams, params: RequestParams = {}) =>
    this.request<GetBusinessOrdersData, any>({
      path: `/api/v1/businesses/${businessId}/orders`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags businesses
   * @name GetBusinessOrder
   * @request GET:/api/v1/businesses/{businessId}/orders/{orderId}
   * @secure
   * @response `200` `GetBusinessOrderData`
   */
  getBusinessOrder = (businessId: string, orderId: string, params: RequestParams = {}) =>
    this.request<GetBusinessOrderData, any>({
      path: `/api/v1/businesses/${businessId}/orders/${orderId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags businesses
   * @name GetBusinessWallets
   * @request GET:/api/v1/businesses/{businessId}/wallets
   * @secure
   * @response `200` `GetBusinessWalletsData`
   */
  getBusinessWallets = (businessId: string, params: RequestParams = {}) =>
    this.request<GetBusinessWalletsData, any>({
      path: `/api/v1/businesses/${businessId}/wallets`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags businesses
   * @name GetBusinessWallet
   * @request GET:/api/v1/businesses/{businessId}/wallets/{walletId}
   * @secure
   * @response `200` `GetBusinessWalletData`
   */
  getBusinessWallet = (walletId: string, businessId: string, params: RequestParams = {}) =>
    this.request<GetBusinessWalletData, any>({
      path: `/api/v1/businesses/${businessId}/wallets/${walletId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags businesses
   * @name GetBusinessOrderStatistics
   * @request GET:/api/v1/businesses/{businessId}/order-statistics
   * @secure
   * @response `200` `GetBusinessOrderStatisticsData`
   */
  getBusinessOrderStatistics = (
    { businessId, ...query }: GetBusinessOrderStatisticsParams,
    params: RequestParams = {},
  ) =>
    this.request<GetBusinessOrderStatisticsData, any>({
      path: `/api/v1/businesses/${businessId}/order-statistics`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags businesses
   * @name GetBusinessOrderStatusChart
   * @request GET:/api/v1/businesses/{businessId}/order-status-chart
   * @secure
   * @response `200` `GetBusinessOrderStatusChartData`
   */
  getBusinessOrderStatusChart = (
    { businessId, ...query }: GetBusinessOrderStatusChartParams,
    params: RequestParams = {},
  ) =>
    this.request<GetBusinessOrderStatusChartData, any>({
      path: `/api/v1/businesses/${businessId}/order-status-chart`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags businesses
   * @name GetBusinessOrderTypeChart
   * @request GET:/api/v1/businesses/{businessId}/order-type-chart
   * @secure
   * @response `200` `GetBusinessOrderTypeChartData`
   */
  getBusinessOrderTypeChart = ({ businessId, ...query }: GetBusinessOrderTypeChartParams, params: RequestParams = {}) =>
    this.request<GetBusinessOrderTypeChartData, any>({
      path: `/api/v1/businesses/${businessId}/order-type-chart`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags businesses
   * @name GetBusiness
   * @request GET:/api/v1/businesses/{businessId}
   * @secure
   * @response `200` `GetBusinessData`
   */
  getBusiness = (businessId: string, params: RequestParams = {}) =>
    this.request<GetBusinessData, any>({
      path: `/api/v1/businesses/${businessId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags businesses
   * @name GetBusinessVehicles
   * @request GET:/api/v1/businesses/{businessId}/vehicles
   * @secure
   * @response `200` `GetBusinessVehiclesData`
   */
  getBusinessVehicles = ({ businessId, ...query }: GetBusinessVehiclesParams, params: RequestParams = {}) =>
    this.request<GetBusinessVehiclesData, any>({
      path: `/api/v1/businesses/${businessId}/vehicles`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags businesses
   * @name UpdateBusinessPreferences
   * @request PATCH:/api/v1/businesses/{businessId}/preferences
   * @secure
   * @response `200` `UpdateBusinessPreferencesData`
   */
  updateBusinessPreferences = (businessId: string, data: UpdatePreferencesRequestDto, params: RequestParams = {}) =>
    this.request<UpdateBusinessPreferencesData, any>({
      path: `/api/v1/businesses/${businessId}/preferences`,
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
   * @tags businesses
   * @name SuspendBusinessUser
   * @request PATCH:/api/v1/businesses/{businessId}/users/{userId}/suspend
   * @secure
   * @response `200` `SuspendBusinessUserData`
   */
  suspendBusinessUser = (businessId: string, userId: string, params: RequestParams = {}) =>
    this.request<SuspendBusinessUserData, any>({
      path: `/api/v1/businesses/${businessId}/users/${userId}/suspend`,
      method: "PATCH",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags businesses
   * @name UnsuspendBusinessUser
   * @request PATCH:/api/v1/businesses/{businessId}/users/{userId}/unsuspend
   * @secure
   * @response `200` `UnsuspendBusinessUserData`
   */
  unsuspendBusinessUser = (businessId: string, userId: string, params: RequestParams = {}) =>
    this.request<UnsuspendBusinessUserData, any>({
      path: `/api/v1/businesses/${businessId}/users/${userId}/unsuspend`,
      method: "PATCH",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags businesses
   * @name UpdateBusinessVehicle
   * @request PATCH:/api/v1/businesses/{businessId}/vehicles/{vehicleId}
   * @secure
   * @response `200` `UpdateBusinessVehicleData`
   */
  updateBusinessVehicle = (
    businessId: string,
    vehicleId: string,
    data: UpdateVehicleRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<UpdateBusinessVehicleData, any>({
      path: `/api/v1/businesses/${businessId}/vehicles/${vehicleId}`,
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
   * @tags reviews
   * @name GetReviews
   * @request GET:/api/v1/reviews
   * @secure
   * @response `200` `GetReviewsData`
   */
  getReviews = (query: GetReviewsParams, params: RequestParams = {}) =>
    this.request<GetReviewsData, any>({
      path: `/api/v1/reviews`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags reviews
   * @name RateRider
   * @request POST:/api/v1/reviews/rate-rider
   * @secure
   * @response `201` `RateRiderData`
   */
  rateRider = (data: RateRiderRequestDto, params: RequestParams = {}) =>
    this.request<RateRiderData, any>({
      path: `/api/v1/reviews/rate-rider`,
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
   * @tags vehicles
   * @name UpdateUserVehicle
   * @request POST:/api/v1/vehicles
   * @secure
   * @response `201` `UpdateUserVehicleData`
   */
  updateUserVehicle = (data: UpdateVehicleRequestDto, params: RequestParams = {}) =>
    this.request<UpdateUserVehicleData, any>({
      path: `/api/v1/vehicles`,
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
   * @tags vehicles
   * @name GetVehicle
   * @request GET:/api/v1/vehicles/{vehicleId}
   * @secure
   * @response `200` `GetVehicleData`
   */
  getVehicle = (vehicleId: string, params: RequestParams = {}) =>
    this.request<GetVehicleData, any>({
      path: `/api/v1/vehicles/${vehicleId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags vehicles
   * @name DeleteUserVehicle
   * @request DELETE:/api/v1/vehicles/{vehicleId}
   * @secure
   * @response `200` `DeleteUserVehicleData`
   */
  deleteUserVehicle = (vehicleId: string, params: RequestParams = {}) =>
    this.request<DeleteUserVehicleData, any>({
      path: `/api/v1/vehicles/${vehicleId}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/vehicles
   * @name GetVehicles
   * @request GET:/api/v1/admins/vehicles
   * @secure
   * @response `200` `GetVehiclesData`
   */
  getVehicles = (query: GetVehiclesParams, params: RequestParams = {}) =>
    this.request<GetVehiclesData, any>({
      path: `/api/v1/admins/vehicles`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/vehicles
   * @name AdminUpdateUserVehicle
   * @request POST:/api/v1/admins/vehicles/{userId}/create
   * @secure
   * @response `201` `AdminUpdateUserVehicleData`
   */
  adminUpdateUserVehicle = (userId: string, data: UpdateVehicleRequestDto, params: RequestParams = {}) =>
    this.request<AdminUpdateUserVehicleData, any>({
      path: `/api/v1/admins/vehicles/${userId}/create`,
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
   * @tags admins/vehicles
   * @name VerifyVehicle
   * @request PATCH:/api/v1/admins/vehicles/{vehicleId}/users/{userId}/verify
   * @secure
   * @response `200` `VerifyVehicleData`
   */
  verifyVehicle = (vehicleId: string, userId: string, params: RequestParams = {}) =>
    this.request<VerifyVehicleData, any>({
      path: `/api/v1/admins/vehicles/${vehicleId}/users/${userId}/verify`,
      method: "PATCH",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/vehicles
   * @name RejectVehicle
   * @request PATCH:/api/v1/admins/vehicles/{vehicleId}/users/{userId}/reject
   * @secure
   * @response `200` `RejectVehicleData`
   */
  rejectVehicle = (
    vehicleId: string,
    userId: string,
    data: UpdateVehicleStatusRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<RejectVehicleData, any>({
      path: `/api/v1/admins/vehicles/${vehicleId}/users/${userId}/reject`,
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
   * @tags admins/vehicles
   * @name SuspendVehicle
   * @request PATCH:/api/v1/admins/vehicles/{vehicleId}/users/{userId}/suspend
   * @secure
   * @response `200` `SuspendVehicleData`
   */
  suspendVehicle = (
    vehicleId: string,
    userId: string,
    data: UpdateVehicleStatusRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<SuspendVehicleData, any>({
      path: `/api/v1/admins/vehicles/${vehicleId}/users/${userId}/suspend`,
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
   * @tags admins/vehicles
   * @name AdminGetVehicle
   * @request GET:/api/v1/admins/vehicles/{vehicleId}
   * @secure
   * @response `200` `AdminGetVehicleData`
   */
  adminGetVehicle = (vehicleId: string, params: RequestParams = {}) =>
    this.request<AdminGetVehicleData, any>({
      path: `/api/v1/admins/vehicles/${vehicleId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/vehicles
   * @name DeleteVehicle
   * @request DELETE:/api/v1/admins/vehicles/{vehicleId}
   * @secure
   * @response `200` `DeleteVehicleData`
   */
  deleteVehicle = (vehicleId: string, params: RequestParams = {}) =>
    this.request<DeleteVehicleData, any>({
      path: `/api/v1/admins/vehicles/${vehicleId}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name CreateSingleOrder
   * @request POST:/api/v1/orders/single
   * @secure
   * @response `201` `CreateSingleOrderData`
   */
  createSingleOrder = (data: CreateSingleOrderDto, params: RequestParams = {}) =>
    this.request<CreateSingleOrderData, any>({
      path: `/api/v1/orders/single`,
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
   * @tags orders
   * @name CreateBulkOrder
   * @request POST:/api/v1/orders/bulk
   * @secure
   * @response `201` `CreateBulkOrderData`
   */
  createBulkOrder = (data: CreateBulkOrderDto, params: RequestParams = {}) =>
    this.request<CreateBulkOrderData, any>({
      path: `/api/v1/orders/bulk`,
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
   * @tags orders
   * @name QuoteOrder
   * @request POST:/api/v1/orders/quote
   * @secure
   * @response `200` `QuoteOrderData`
   * @response `201` `QuoteOrderResponseDto`
   */
  quoteOrder = (data: QuoteOrderRequestDto, params: RequestParams = {}) =>
    this.request<QuoteOrderData, any>({
      path: `/api/v1/orders/quote`,
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
   * @tags orders
   * @name QuoteBatchOrder
   * @request POST:/api/v1/orders/quote-batch
   * @response `200` `QuoteBatchOrderData`
   * @response `201` `QuoteBatchOrderResponseDto`
   */
  quoteBatchOrder = (data: QuoteBatchOrderRequestDto, params: RequestParams = {}) =>
    this.request<QuoteBatchOrderData, any>({
      path: `/api/v1/orders/quote-batch`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name QuoteBulkOrder
   * @request POST:/api/v1/orders/quote-bulk
   * @secure
   * @response `200` `QuoteBulkOrderData`
   * @response `201` `QuoteBulkOrderResponseDto`
   */
  quoteBulkOrder = (data: QuoteBulkOrderRequestDto, params: RequestParams = {}) =>
    this.request<QuoteBulkOrderData, any>({
      path: `/api/v1/orders/quote-bulk`,
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
   * @tags orders
   * @name CreateBatchOrder
   * @request POST:/api/v1/orders/batch
   * @secure
   * @response `201` `CreateBatchOrderData`
   */
  createBatchOrder = (data: CreateBatchOrderDto, params: RequestParams = {}) =>
    this.request<CreateBatchOrderData, any>({
      path: `/api/v1/orders/batch`,
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
   * @tags orders
   * @name RequestOrderRiders
   * @request POST:/api/v1/orders/{orderId}/request-riders
   * @secure
   * @response `201` `RequestOrderRidersData`
   */
  requestOrderRiders = (orderId: string, data: RidersRequestDto, params: RequestParams = {}) =>
    this.request<RequestOrderRidersData, any>({
      path: `/api/v1/orders/${orderId}/request-riders`,
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
   * @tags orders
   * @name ReDispatch
   * @request POST:/api/v1/orders/{orderId}/re-dispatch
   * @secure
   * @response `201` `ReDispatchData`
   */
  reDispatch = (orderId: string, data: ReDispatchRequestDto, params: RequestParams = {}) =>
    this.request<ReDispatchData, any>({
      path: `/api/v1/orders/${orderId}/re-dispatch`,
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
   * @tags orders
   * @name PayRiderTrip
   * @summary Pay the rider half the agreed price for a trip to the store on a called-off storefront delivery
   * @request POST:/api/v1/orders/{orderId}/trip-pay
   * @secure
   * @response `201` `PayRiderTripData`
   */
  payRiderTrip = (orderId: string, data: PayRiderTripRequestDto, params: RequestParams = {}) =>
    this.request<PayRiderTripData, any>({
      path: `/api/v1/orders/${orderId}/trip-pay`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name ReleaseOrderRider
   * @summary Take the accepted rider off an order before pickup and ring the other eligible riders
   * @request POST:/api/v1/orders/{orderId}/release-rider
   * @secure
   * @response `200` `ReleaseOrderRiderData`
   * @response `201` `ReleaseRiderResponseDto`
   */
  releaseOrderRider = (orderId: string, data: ReleaseRiderRequestDto, params: RequestParams = {}) =>
    this.request<ReleaseOrderRiderData, any>({
      path: `/api/v1/orders/${orderId}/release-rider`,
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
   * @tags orders
   * @name RiderReleaseOrder
   * @summary Rider: "Can't make it". Give an accepted order back before pickup. Free for 2 minutes after accepting, then it counts as a cancellation (3 counted per Lagos day; the 4th is refused with RELEASE_LIMIT_REACHED)
   * @request POST:/api/v1/orders/{orderId}/rider-release
   * @secure
   * @response `200` `RiderReleaseOrderData`
   * @response `201` `RiderReleaseResponseDto`
   */
  riderReleaseOrder = (orderId: string, data: RiderReleaseRequestDto, params: RequestParams = {}) =>
    this.request<RiderReleaseOrderData, any>({
      path: `/api/v1/orders/${orderId}/rider-release`,
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
   * @tags orders
   * @name ReassignRider
   * @request POST:/api/v1/orders/{orderId}/reassign
   * @secure
   * @response `201` `ReassignRiderData`
   */
  reassignRider = (orderId: string, data: ReassignRiderRequestDto, params: RequestParams = {}) =>
    this.request<ReassignRiderData, any>({
      path: `/api/v1/orders/${orderId}/reassign`,
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
   * @tags orders
   * @name ForceAssignRider
   * @summary Hand the order straight to a chosen rider without ringing them (rider must be online and free)
   * @request POST:/api/v1/orders/{orderId}/force-assign
   * @secure
   * @response `200` `ForceAssignRiderData`
   * @response `201` `ForceAssignRiderResponseDto`
   */
  forceAssignRider = (orderId: string, data: ForceAssignRiderDto, params: RequestParams = {}) =>
    this.request<ForceAssignRiderData, any>({
      path: `/api/v1/orders/${orderId}/force-assign`,
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
   * @tags orders
   * @name GetNearbyRidersCount
   * @summary How many eligible riders would be rung for an order placed from this point right now
   * @request GET:/api/v1/orders/riders/nearby-count
   * @secure
   * @response `200` `GetNearbyRidersCountData`
   */
  getNearbyRidersCount = (query: GetNearbyRidersCountParams, params: RequestParams = {}) =>
    this.request<GetNearbyRidersCountData, any>({
      path: `/api/v1/orders/riders/nearby-count`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name RiderOrderCapacity
   * @summary The signed-in rider's active orders against their region's cap. While busy, bids are refused with RIDER_BUSY
   * @request GET:/api/v1/orders/riders/capacity
   * @secure
   * @response `200` `RiderOrderCapacityData`
   */
  riderOrderCapacity = (params: RequestParams = {}) =>
    this.request<RiderOrderCapacityData, any>({
      path: `/api/v1/orders/riders/capacity`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name GetArrivalCheck
   * @summary The arrival check for the signed-in rider: whether it is on, and how close they must be
   * @request GET:/api/v1/orders/riders/arrival-check
   * @secure
   * @response `200` `GetArrivalCheckData`
   */
  getArrivalCheck = (params: RequestParams = {}) =>
    this.request<GetArrivalCheckData, any>({
      path: `/api/v1/orders/riders/arrival-check`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name GetRidersLeaderboard
   * @request GET:/api/v1/orders/riders/leaderboard
   * @secure
   * @response `200` `GetRidersLeaderboardData`
   */
  getRidersLeaderboard = (params: RequestParams = {}) =>
    this.request<GetRidersLeaderboardData, any>({
      path: `/api/v1/orders/riders/leaderboard`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name LookupRiderForStore
   * @summary Storefront service only: find a rider by phone or id, as a minimal card (no contact details)
   * @request GET:/api/v1/orders/riders/lookup
   * @secure
   * @response `200` `LookupRiderForStoreData`
   */
  lookupRiderForStore = (query: LookupRiderForStoreParams, params: RequestParams = {}) =>
    this.request<LookupRiderForStoreData, any>({
      path: `/api/v1/orders/riders/lookup`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name SendRiderLinkCode
   * @summary Storefront service only: deliver a store's rider consent code to the rider's Pickriders app
   * @request POST:/api/v1/orders/riders/link-code
   * @secure
   * @response `200` `SendRiderLinkCodeData`
   */
  sendRiderLinkCode = (data: RiderLinkCodeRequestDto, params: RequestParams = {}) =>
    this.request<SendRiderLinkCodeData, any>({
      path: `/api/v1/orders/riders/link-code`,
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
   * @tags orders
   * @name ListAllRiders
   * @summary Deprecated alias — use GET /orders/riders/leaderboard
   * @request GET:/api/v1/orders/riders/list
   * @deprecated
   * @secure
   * @response `200` `ListAllRidersData`
   */
  listAllRiders = (params: RequestParams = {}) =>
    this.request<ListAllRidersData, any>({
      path: `/api/v1/orders/riders/list`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name GetRiderLocations
   * @request POST:/api/v1/orders/riders/locations
   * @secure
   * @response `201` `GetRiderLocationsData`
   */
  getRiderLocations = (data: RiderLocationsRequestDto, params: RequestParams = {}) =>
    this.request<GetRiderLocationsData, any>({
      path: `/api/v1/orders/riders/locations`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name CancelOrderLocation
   * @request PATCH:/api/v1/orders/{orderId}/locations/{locationId}/cancel
   * @secure
   * @response `200` `CancelOrderLocationData`
   */
  cancelOrderLocation = (
    orderId: string,
    locationId: string,
    data: CancelLocationRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<CancelOrderLocationData, any>({
      path: `/api/v1/orders/${orderId}/locations/${locationId}/cancel`,
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
   * @tags orders
   * @name RescheduleOrder
   * @request PATCH:/api/v1/orders/{orderId}/schedule
   * @secure
   * @response `200` `RescheduleOrderData`
   */
  rescheduleOrder = (orderId: string, data: RescheduleOrderRequestDto, params: RequestParams = {}) =>
    this.request<RescheduleOrderData, any>({
      path: `/api/v1/orders/${orderId}/schedule`,
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
   * @tags orders
   * @name CancelOrder
   * @request PATCH:/api/v1/orders/{orderId}/cancel
   * @secure
   * @response `200` `CancelOrderData`
   */
  cancelOrder = (orderId: string, data: CancelOrderRequestDto, params: RequestParams = {}) =>
    this.request<CancelOrderData, any>({
      path: `/api/v1/orders/${orderId}/cancel`,
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
   * @tags orders
   * @name MakeOrderOffer
   * @request POST:/api/v1/orders/{orderId}/offers
   * @secure
   * @response `201` `MakeOrderOfferData`
   */
  makeOrderOffer = (orderId: string, data: MakeOfferRequestDto, params: RequestParams = {}) =>
    this.request<MakeOrderOfferData, any>({
      path: `/api/v1/orders/${orderId}/offers`,
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
   * @tags orders
   * @name InitiateOrderPayment
   * @request PATCH:/api/v1/orders/{orderId}/wallets/{walletId}/pay
   * @secure
   * @response `200` `InitiateOrderPaymentData`
   */
  initiateOrderPayment = (orderId: string, walletId: string, data: PayOrderRequestDto, params: RequestParams = {}) =>
    this.request<InitiateOrderPaymentData, any>({
      path: `/api/v1/orders/${orderId}/wallets/${walletId}/pay`,
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
   * @tags orders
   * @name CreateOrderPaymentLink
   * @request POST:/api/v1/orders/{orderId}/payment-link
   * @secure
   * @response `200` `CreateOrderPaymentLinkData`
   * @response `201` `OrderPaymentLinkResponseDto`
   */
  createOrderPaymentLink = (orderId: string, data: PayOrderRequestDto, params: RequestParams = {}) =>
    this.request<CreateOrderPaymentLinkData, any>({
      path: `/api/v1/orders/${orderId}/payment-link`,
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
   * @tags orders
   * @name VerifyOrderPayment
   * @request GET:/api/v1/orders/{orderId}/payment-status
   * @secure
   * @response `200` `VerifyOrderPaymentData`
   */
  verifyOrderPayment = (orderId: string, params: RequestParams = {}) =>
    this.request<VerifyOrderPaymentData, any>({
      path: `/api/v1/orders/${orderId}/payment-status`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name GetOrderPaymentInfo
   * @request GET:/api/v1/orders/pay/{token}
   * @response `200` `GetOrderPaymentInfoData`
   */
  getOrderPaymentInfo = (token: string, params: RequestParams = {}) =>
    this.request<GetOrderPaymentInfoData, any>({
      path: `/api/v1/orders/pay/${token}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name ConfirmExternalPaymentByReference
   * @request GET:/api/v1/orders/payment/confirm
   * @response `200` `ConfirmExternalPaymentByReferenceData`
   */
  confirmExternalPaymentByReference = (query: ConfirmExternalPaymentByReferenceParams, params: RequestParams = {}) =>
    this.request<ConfirmExternalPaymentByReferenceData, any>({
      path: `/api/v1/orders/payment/confirm`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name InitializeExternalOrderPayment
   * @request POST:/api/v1/orders/pay/{token}/initialize
   * @response `201` `InitializeExternalOrderPaymentData`
   */
  initializeExternalOrderPayment = (
    token: string,
    data: InitializeOrderPaymentRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<InitializeExternalOrderPaymentData, any>({
      path: `/api/v1/orders/pay/${token}/initialize`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name AcceptOrRejectOrderOffer
   * @request PATCH:/api/v1/orders/{orderId}/offers/{offerId}
   * @secure
   * @response `200` `AcceptOrRejectOrderOfferData`
   */
  acceptOrRejectOrderOffer = (
    orderId: string,
    offerId: string,
    data: AcceptRejectOfferRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<AcceptOrRejectOrderOfferData, any>({
      path: `/api/v1/orders/${orderId}/offers/${offerId}`,
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
   * @tags orders
   * @name StartOrder
   * @request PATCH:/api/v1/orders/{orderId}/start
   * @secure
   * @response `200` `StartOrderData`
   */
  startOrder = (orderId: string, params: RequestParams = {}) =>
    this.request<StartOrderData, any>({
      path: `/api/v1/orders/${orderId}/start`,
      method: "PATCH",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name StartOrderLocation
   * @request PATCH:/api/v1/orders/{orderId}/locations/{locationId}/start
   * @secure
   * @response `200` `StartOrderLocationData`
   */
  startOrderLocation = (orderId: string, locationId: string, params: RequestParams = {}) =>
    this.request<StartOrderLocationData, any>({
      path: `/api/v1/orders/${orderId}/locations/${locationId}/start`,
      method: "PATCH",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name UpdateOrderLocationStatus
   * @request PATCH:/api/v1/orders/{orderId}/locations/{locationId}/status
   * @secure
   * @response `200` `UpdateOrderLocationStatusData`
   */
  updateOrderLocationStatus = (
    orderId: string,
    locationId: string,
    data: UpdateLocationStatusRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<UpdateOrderLocationStatusData, any>({
      path: `/api/v1/orders/${orderId}/locations/${locationId}/status`,
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
   * @tags orders
   * @name GetOrderEta
   * @request GET:/api/v1/orders/{orderId}/eta
   * @secure
   * @response `200` `GetOrderEtaData`
   */
  getOrderEta = (orderId: string, params: RequestParams = {}) =>
    this.request<GetOrderEtaData, any>({
      path: `/api/v1/orders/${orderId}/eta`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name QuoteOrderLocation
   * @request POST:/api/v1/orders/{orderId}/locations/{locationId}/quote
   * @secure
   * @response `200` `QuoteOrderLocationData`
   * @response `201` `QuoteOrderLocationResponseDto`
   */
  quoteOrderLocation = (
    orderId: string,
    locationId: string,
    data: UpdateOrderLocationDto,
    params: RequestParams = {},
  ) =>
    this.request<QuoteOrderLocationData, any>({
      path: `/api/v1/orders/${orderId}/locations/${locationId}/quote`,
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
   * @tags orders
   * @name UpdateOrderLocation
   * @request PATCH:/api/v1/orders/{orderId}/locations/{locationId}
   * @secure
   * @response `200` `UpdateOrderLocationData`
   */
  updateOrderLocation = (
    orderId: string,
    locationId: string,
    data: UpdateOrderLocationDto,
    params: RequestParams = {},
  ) =>
    this.request<UpdateOrderLocationData, any>({
      path: `/api/v1/orders/${orderId}/locations/${locationId}`,
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
   * @tags orders
   * @name CancelLocationUpdate
   * @request PATCH:/api/v1/orders/{orderId}/locations/{locationId}/updates/{updateId}/cancel
   * @secure
   * @response `200` `CancelLocationUpdateData`
   */
  cancelLocationUpdate = (orderId: string, locationId: string, updateId: string, params: RequestParams = {}) =>
    this.request<CancelLocationUpdateData, any>({
      path: `/api/v1/orders/${orderId}/locations/${locationId}/updates/${updateId}/cancel`,
      method: "PATCH",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name RespondToLocationUpdate
   * @request PATCH:/api/v1/orders/{orderId}/locations/{locationId}/updates/{updateId}
   * @secure
   * @response `200` `RespondToLocationUpdateData`
   */
  respondToLocationUpdate = (
    orderId: string,
    locationId: string,
    updateId: string,
    data: AcceptRejectLocationUpdateRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<RespondToLocationUpdateData, any>({
      path: `/api/v1/orders/${orderId}/locations/${locationId}/updates/${updateId}`,
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
   * @tags orders
   * @name ApplyOrderCoupon
   * @request PATCH:/api/v1/orders/{orderId}/coupons/{couponCode}/apply
   * @secure
   * @response `200` `ApplyOrderCouponData`
   */
  applyOrderCoupon = (orderId: string, couponCode: string, params: RequestParams = {}) =>
    this.request<ApplyOrderCouponData, any>({
      path: `/api/v1/orders/${orderId}/coupons/${couponCode}/apply`,
      method: "PATCH",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name RemoveOrderCoupon
   * @request PATCH:/api/v1/orders/{orderId}/coupons/{couponCode}/remove
   * @secure
   * @response `200` `RemoveOrderCouponData`
   */
  removeOrderCoupon = (orderId: string, couponCode: string, params: RequestParams = {}) =>
    this.request<RemoveOrderCouponData, any>({
      path: `/api/v1/orders/${orderId}/coupons/${couponCode}/remove`,
      method: "PATCH",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name CompleteOrderLocation
   * @request PATCH:/api/v1/orders/{orderId}/locations/{locationId}/complete
   * @secure
   * @response `200` `CompleteOrderLocationData`
   */
  completeOrderLocation = (
    orderId: string,
    locationId: string,
    data: CompleteLocationRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<CompleteOrderLocationData, any>({
      path: `/api/v1/orders/${orderId}/locations/${locationId}/complete`,
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
   * @tags orders
   * @name CompleteOrder
   * @request PATCH:/api/v1/orders/{orderId}/complete
   * @secure
   * @response `200` `CompleteOrderData`
   */
  completeOrder = (orderId: string, params: RequestParams = {}) =>
    this.request<CompleteOrderData, any>({
      path: `/api/v1/orders/${orderId}/complete`,
      method: "PATCH",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name QueueOrder
   * @request PATCH:/api/v1/orders/{orderId}/queue
   * @secure
   * @response `200` `QueueOrderData`
   */
  queueOrder = (orderId: string, params: RequestParams = {}) =>
    this.request<QueueOrderData, any>({
      path: `/api/v1/orders/${orderId}/queue`,
      method: "PATCH",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name GetQueuedOrders
   * @summary Open orders listed to the signed-in rider. A rider at their active-order cap sees `stack` on each order that stacks for them (order stacking: ON_THE_WAY or NEXT_NEARBY)
   * @request GET:/api/v1/orders/queued-orders
   * @secure
   * @response `200` `GetQueuedOrdersData`
   */
  getQueuedOrders = (params: RequestParams = {}) =>
    this.request<GetQueuedOrdersData, any>({
      path: `/api/v1/orders/queued-orders`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name GetActiveOffers
   * @request GET:/api/v1/orders/{orderId}/active-offers
   * @secure
   * @response `200` `GetActiveOffersData`
   */
  getActiveOffers = (orderId: string, params: RequestParams = {}) =>
    this.request<GetActiveOffersData, any>({
      path: `/api/v1/orders/${orderId}/active-offers`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name GetUserOrders
   * @request GET:/api/v1/orders
   * @secure
   * @response `200` `GetUserOrdersData`
   */
  getUserOrders = (query: GetUserOrdersParams, params: RequestParams = {}) =>
    this.request<GetUserOrdersData, any>({
      path: `/api/v1/orders`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name GetRiderOrders
   * @request GET:/api/v1/orders/riders
   * @secure
   * @response `200` `GetRiderOrdersData`
   */
  getRiderOrders = (query: GetRiderOrdersParams, params: RequestParams = {}) =>
    this.request<GetRiderOrdersData, any>({
      path: `/api/v1/orders/riders`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name GetPendingLocationUpdate
   * @request GET:/api/v1/orders/location-updates/pending
   * @secure
   * @response `200` `GetPendingLocationUpdateData`
   */
  getPendingLocationUpdate = (params: RequestParams = {}) =>
    this.request<GetPendingLocationUpdateData, any>({
      path: `/api/v1/orders/location-updates/pending`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name GetLatestLocationUpdateForCustomer
   * @request GET:/api/v1/orders/{orderId}/location-updates/latest
   * @secure
   * @response `200` `GetLatestLocationUpdateForCustomerData`
   */
  getLatestLocationUpdateForCustomer = (orderId: string, params: RequestParams = {}) =>
    this.request<GetLatestLocationUpdateForCustomerData, any>({
      path: `/api/v1/orders/${orderId}/location-updates/latest`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name GetUserOrder
   * @request GET:/api/v1/orders/{orderId}
   * @secure
   * @response `200` `GetUserOrderData`
   */
  getUserOrder = (orderId: string, params: RequestParams = {}) =>
    this.request<GetUserOrderData, any>({
      path: `/api/v1/orders/${orderId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name GetRiderOrderStatistics
   * @request GET:/api/v1/orders/riders/order-statistics
   * @secure
   * @response `200` `GetRiderOrderStatisticsData`
   */
  getRiderOrderStatistics = (query: GetRiderOrderStatisticsParams, params: RequestParams = {}) =>
    this.request<GetRiderOrderStatisticsData, any>({
      path: `/api/v1/orders/riders/order-statistics`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name GetOrderStatusChart
   * @request GET:/api/v1/orders/riders/status-chart
   * @secure
   * @response `200` `GetOrderStatusChartData`
   */
  getOrderStatusChart = (query: GetOrderStatusChartParams, params: RequestParams = {}) =>
    this.request<GetOrderStatusChartData, any>({
      path: `/api/v1/orders/riders/status-chart`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name GetOrderTypeChart
   * @request GET:/api/v1/orders/riders/type-chart
   * @secure
   * @response `200` `GetOrderTypeChartData`
   */
  getOrderTypeChart = (query: GetOrderTypeChartParams, params: RequestParams = {}) =>
    this.request<GetOrderTypeChartData, any>({
      path: `/api/v1/orders/riders/type-chart`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name RiderNearbyHandoffs
   * @summary Open handoffs near you that you can take now, nearest first
   * @request GET:/api/v1/orders/handoffs/nearby
   * @secure
   * @response `200` `RiderNearbyHandoffsData`
   */
  riderNearbyHandoffs = (params: RequestParams = {}) =>
    this.request<RiderNearbyHandoffsData, any>({
      path: `/api/v1/orders/handoffs/nearby`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name RiderMyHandoffs
   * @summary TO: handoffs you accepted that aren't swapped yet (the order isn't yours until the code swap, so it isn't in your active orders)
   * @request GET:/api/v1/orders/handoffs/mine
   * @secure
   * @response `200` `RiderMyHandoffsData`
   */
  riderMyHandoffs = (params: RequestParams = {}) =>
    this.request<RiderMyHandoffsData, any>({
      path: `/api/v1/orders/handoffs/mine`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name RiderRequestHandoff
   * @summary FROM: hand a picked-up order to another rider. Rings riders near you (ACCIDENT waits for support). HANDOFF_NOT_ALLOWED when not picked up, not yours, turned off, or the per-order limit is reached
   * @request POST:/api/v1/orders/{orderId}/handoff
   * @secure
   * @response `200` `RiderRequestHandoffData`
   * @response `201` `HandoffViewDto`
   */
  riderRequestHandoff = (orderId: string, data: RiderRequestHandoffRequestDto, params: RequestParams = {}) =>
    this.request<RiderRequestHandoffData, any>({
      path: `/api/v1/orders/${orderId}/handoff`,
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
   * @tags orders
   * @name RiderGetHandoff
   * @summary The handoff on this order as you see it (FROM, TO, or a rider rung for it)
   * @request GET:/api/v1/orders/{orderId}/handoff
   * @secure
   * @response `200` `RiderGetHandoffData`
   */
  riderGetHandoff = (orderId: string, params: RequestParams = {}) =>
    this.request<RiderGetHandoffData, any>({
      path: `/api/v1/orders/${orderId}/handoff`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name RiderStartHandoffSearch
   * @summary FROM, after an ACCIDENT: I'm safe, find a rider
   * @request POST:/api/v1/orders/{orderId}/handoff/search
   * @secure
   * @response `200` `RiderStartHandoffSearchData`
   * @response `201` `HandoffViewDto`
   */
  riderStartHandoffSearch = (orderId: string, data: RiderStartHandoffSearchRequestDto, params: RequestParams = {}) =>
    this.request<RiderStartHandoffSearchData, any>({
      path: `/api/v1/orders/${orderId}/handoff/search`,
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
   * @tags orders
   * @name RiderCancelHandoff
   * @summary FROM: call the handoff off and keep the order (a rider who accepted is compensated)
   * @request POST:/api/v1/orders/{orderId}/handoff/cancel
   * @secure
   * @response `200` `RiderCancelHandoffData`
   * @response `201` `HandoffViewDto`
   */
  riderCancelHandoff = (orderId: string, data: RiderCancelHandoffRequestDto, params: RequestParams = {}) =>
    this.request<RiderCancelHandoffData, any>({
      path: `/api/v1/orders/${orderId}/handoff/cancel`,
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
   * @tags orders
   * @name RiderAcceptHandoff
   * @summary TO: take the handoff. First accept wins; later ones get 409 HANDOFF_TAKEN
   * @request POST:/api/v1/orders/{orderId}/handoff/accept
   * @secure
   * @response `200` `RiderAcceptHandoffData`
   * @response `201` `HandoffViewDto`
   */
  riderAcceptHandoff = (orderId: string, data: RiderAcceptHandoffRequestDto, params: RequestParams = {}) =>
    this.request<RiderAcceptHandoffData, any>({
      path: `/api/v1/orders/${orderId}/handoff/accept`,
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
   * @tags orders
   * @name RiderDeclineHandoff
   * @summary TO: pass on the handoff; you are not rung for it again
   * @request POST:/api/v1/orders/{orderId}/handoff/decline
   * @secure
   * @response `200` `RiderDeclineHandoffData`
   * @response `201` `RiderDeclineHandoffResponseDto`
   */
  riderDeclineHandoff = (orderId: string, data: RiderDeclineHandoffRequestDto, params: RequestParams = {}) =>
    this.request<RiderDeclineHandoffData, any>({
      path: `/api/v1/orders/${orderId}/handoff/decline`,
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
   * @tags orders
   * @name RiderConfirmHandoff
   * @summary TO: enter FROM's 4-digit code where you stand; the order becomes yours. HANDOFF_CODE_INVALID (details.attemptsLeft) on a wrong code, 429 HANDOFF_LOCKED (details.lockedUntil) after 5
   * @request POST:/api/v1/orders/{orderId}/handoff/confirm
   * @secure
   * @response `200` `RiderConfirmHandoffData`
   * @response `201` `HandoffViewDto`
   */
  riderConfirmHandoff = (orderId: string, data: RiderConfirmHandoffRequestDto, params: RequestParams = {}) =>
    this.request<RiderConfirmHandoffData, any>({
      path: `/api/v1/orders/${orderId}/handoff/confirm`,
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
   * @tags orders
   * @name RiderPassOrder
   * @summary Rider: "Not now" on an order request. Ends your ring at once (the search moves on to the next rider) and hides the order from you unless its price goes up. No penalty. A repeat pass changes nothing. NOT_ALLOWED when you already have the order (release it instead) or it is no longer looking for a rider
   * @request POST:/api/v1/orders/{orderId}/pass
   * @secure
   * @response `200` `RiderPassOrderData`
   */
  riderPassOrder = (orderId: string, data: RiderPassOrderRequestDto, params: RequestParams = {}) =>
    this.request<RiderPassOrderData, any>({
      path: `/api/v1/orders/${orderId}/pass`,
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
   * @tags admins/orders
   * @name GetOrders
   * @request GET:/api/v1/admins/orders
   * @secure
   * @response `200` `GetOrdersData`
   */
  getOrders = (query: GetOrdersParams, params: RequestParams = {}) =>
    this.request<GetOrdersData, any>({
      path: `/api/v1/admins/orders`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/orders
   * @name GetOrder
   * @request GET:/api/v1/admins/orders/{orderId}
   * @secure
   * @response `200` `GetOrderData`
   */
  getOrder = (orderId: string, params: RequestParams = {}) =>
    this.request<GetOrderData, any>({
      path: `/api/v1/admins/orders/${orderId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/orders
   * @name GetOrderOffers
   * @request GET:/api/v1/admins/orders/{orderId}/offers
   * @secure
   * @response `200` `GetOrderOffersData`
   */
  getOrderOffers = (orderId: string, params: RequestParams = {}) =>
    this.request<GetOrderOffersData, any>({
      path: `/api/v1/admins/orders/${orderId}/offers`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/orders
   * @name AdminOrderRiderHistory
   * @summary Every rider who held the order, oldest first: who accepted when, who released and why, and where it is now
   * @request GET:/api/v1/admins/orders/{orderId}/rider-history
   * @secure
   * @response `200` `AdminOrderRiderHistoryData`
   */
  adminOrderRiderHistory = (orderId: string, params: RequestParams = {}) =>
    this.request<AdminOrderRiderHistoryData, any>({
      path: `/api/v1/admins/orders/${orderId}/rider-history`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/orders
   * @name AdminListOrderHandoffs
   * @summary Every rider handoff on the order, oldest first
   * @request GET:/api/v1/admins/orders/{orderId}/handoffs
   * @secure
   * @response `200` `AdminListOrderHandoffsData`
   */
  adminListOrderHandoffs = (orderId: string, params: RequestParams = {}) =>
    this.request<AdminListOrderHandoffsData, any>({
      path: `/api/v1/admins/orders/${orderId}/handoffs`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/orders
   * @name RingRiders
   * @request POST:/api/v1/admins/orders/{orderId}/ring-riders
   * @secure
   * @response `201` `RingRidersData`
   */
  ringRiders = (orderId: string, params: RequestParams = {}) =>
    this.request<RingRidersData, any>({
      path: `/api/v1/admins/orders/${orderId}/ring-riders`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/orders
   * @name AdminCancelOrder
   * @request POST:/api/v1/admins/orders/{orderId}/cancel
   * @secure
   * @response `201` `AdminCancelOrderData`
   */
  adminCancelOrder = (orderId: string, data: AdminCancelOrderRequestDto, params: RequestParams = {}) =>
    this.request<AdminCancelOrderData, any>({
      path: `/api/v1/admins/orders/${orderId}/cancel`,
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
   * @tags admins/orders
   * @name UpdateOrderStatus
   * @request PATCH:/api/v1/admins/orders/{orderId}/status
   * @secure
   * @response `200` `UpdateOrderStatusData`
   */
  updateOrderStatus = (orderId: string, data: AdminUpdateOrderStatusRequestDto, params: RequestParams = {}) =>
    this.request<UpdateOrderStatusData, any>({
      path: `/api/v1/admins/orders/${orderId}/status`,
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
   * @tags admins/riders
   * @name AdminListRiderReleases
   * @summary A rider's released trips (newest first) with counts for today (Lagos), 7 days and 30 days
   * @request GET:/api/v1/admins/riders/{riderId}/releases
   * @secure
   * @response `200` `AdminListRiderReleasesData`
   */
  adminListRiderReleases = (riderId: string, params: RequestParams = {}) =>
    this.request<AdminListRiderReleasesData, any>({
      path: `/api/v1/admins/riders/${riderId}/releases`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/handoffs
   * @name AdminListHandoffs
   * @summary Rider handoffs, newest first, with both riders, the split, bonus and review state
   * @request GET:/api/v1/admins/handoffs
   * @secure
   * @response `200` `AdminListHandoffsData`
   */
  adminListHandoffs = (query: AdminListHandoffsParams, params: RequestParams = {}) =>
    this.request<AdminListHandoffsData, any>({
      path: `/api/v1/admins/handoffs`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/handoffs
   * @name AdminHandoffsSummary
   * @summary Live searches, accidents awaiting support, reviews pending, swaps today
   * @request GET:/api/v1/admins/handoffs/summary
   * @secure
   * @response `200` `AdminHandoffsSummaryData`
   */
  adminHandoffsSummary = (params: RequestParams = {}) =>
    this.request<AdminHandoffsSummaryData, any>({
      path: `/api/v1/admins/handoffs/summary`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/handoffs
   * @name AdminStartHandoff
   * @summary Start a handoff for an order's rider (meeting point: the rider's last known position)
   * @request POST:/api/v1/admins/handoffs/start
   * @secure
   * @response `200` `AdminStartHandoffData`
   * @response `201` `AdminHandoffDto`
   */
  adminStartHandoff = (data: AdminStartHandoffRequestDto, params: RequestParams = {}) =>
    this.request<AdminStartHandoffData, any>({
      path: `/api/v1/admins/handoffs/start`,
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
   * @tags admins/handoffs
   * @name AdminBulkReviewHandoffs
   * @summary Apply one review decision (and bonus action) to up to 100 completed handoffs
   * @request POST:/api/v1/admins/handoffs/review/bulk
   * @secure
   * @response `200` `AdminBulkReviewHandoffsData`
   * @response `201` `AdminBulkReviewHandoffsResponseDto`
   */
  adminBulkReviewHandoffs = (data: AdminBulkReviewHandoffsRequestDto, params: RequestParams = {}) =>
    this.request<AdminBulkReviewHandoffsData, any>({
      path: `/api/v1/admins/handoffs/review/bulk`,
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
   * @tags admins/handoffs
   * @name AdminGetHandoff
   * @request GET:/api/v1/admins/handoffs/{handoffId}
   * @secure
   * @response `200` `AdminGetHandoffData`
   */
  adminGetHandoff = (handoffId: string, params: RequestParams = {}) =>
    this.request<AdminGetHandoffData, any>({
      path: `/api/v1/admins/handoffs/${handoffId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/handoffs
   * @name AdminStartHandoffSearch
   * @summary Start ringing riders for a handoff waiting for support (ACCIDENT)
   * @request POST:/api/v1/admins/handoffs/{handoffId}/search
   * @secure
   * @response `200` `AdminStartHandoffSearchData`
   * @response `201` `AdminHandoffDto`
   */
  adminStartHandoffSearch = (handoffId: string, data: AdminStartHandoffSearchRequestDto, params: RequestParams = {}) =>
    this.request<AdminStartHandoffSearchData, any>({
      path: `/api/v1/admins/handoffs/${handoffId}/search`,
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
   * @tags admins/handoffs
   * @name AdminAssignHandoffRider
   * @summary Give the handoff straight to a chosen rider (the code swap still applies)
   * @request POST:/api/v1/admins/handoffs/{handoffId}/assign
   * @secure
   * @response `200` `AdminAssignHandoffRiderData`
   * @response `201` `AdminHandoffDto`
   */
  adminAssignHandoffRider = (handoffId: string, data: AdminAssignHandoffRiderRequestDto, params: RequestParams = {}) =>
    this.request<AdminAssignHandoffRiderData, any>({
      path: `/api/v1/admins/handoffs/${handoffId}/assign`,
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
   * @tags admins/handoffs
   * @name AdminCancelHandoff
   * @summary Call a live handoff off; a rider who accepted is compensated
   * @request POST:/api/v1/admins/handoffs/{handoffId}/cancel
   * @secure
   * @response `200` `AdminCancelHandoffData`
   * @response `201` `AdminHandoffDto`
   */
  adminCancelHandoff = (handoffId: string, data: AdminCancelHandoffRequestDto, params: RequestParams = {}) =>
    this.request<AdminCancelHandoffData, any>({
      path: `/api/v1/admins/handoffs/${handoffId}/cancel`,
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
   * @tags admins/handoffs
   * @name AdminDropHandoffRider
   * @summary The accepted rider is a no-show: search again without them
   * @request POST:/api/v1/admins/handoffs/{handoffId}/drop-rider
   * @secure
   * @response `200` `AdminDropHandoffRiderData`
   * @response `201` `AdminHandoffDto`
   */
  adminDropHandoffRider = (handoffId: string, data: AdminDropHandoffRiderRequestDto, params: RequestParams = {}) =>
    this.request<AdminDropHandoffRiderData, any>({
      path: `/api/v1/admins/handoffs/${handoffId}/drop-rider`,
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
   * @tags admins/handoffs
   * @name AdminRaiseHandoffBonus
   * @summary Raise a live handoff's bonus (sub-units)
   * @request POST:/api/v1/admins/handoffs/{handoffId}/bonus
   * @secure
   * @response `200` `AdminRaiseHandoffBonusData`
   * @response `201` `AdminHandoffDto`
   */
  adminRaiseHandoffBonus = (handoffId: string, data: AdminRaiseHandoffBonusRequestDto, params: RequestParams = {}) =>
    this.request<AdminRaiseHandoffBonusData, any>({
      path: `/api/v1/admins/handoffs/${handoffId}/bonus`,
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
   * @tags admins/handoffs
   * @name AdminReviewHandoff
   * @summary COUNT or WAIVE a completed handoff, and RELEASE or FORFEIT a held bonus
   * @request POST:/api/v1/admins/handoffs/{handoffId}/review
   * @secure
   * @response `200` `AdminReviewHandoffData`
   * @response `201` `AdminHandoffDto`
   */
  adminReviewHandoff = (handoffId: string, data: AdminReviewHandoffRequestDto, params: RequestParams = {}) =>
    this.request<AdminReviewHandoffData, any>({
      path: `/api/v1/admins/handoffs/${handoffId}/review`,
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
   * @tags admins/alerts
   * @name AdminListAlerts
   * @summary Admin alerts, newest first. Default: the live ones (OPEN and CLAIMED)
   * @request GET:/api/v1/admins/alerts
   * @secure
   * @response `200` `AdminListAlertsData`
   */
  adminListAlerts = (query: AdminListAlertsParams, params: RequestParams = {}) =>
    this.request<AdminListAlertsData, any>({
      path: `/api/v1/admins/alerts`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/alerts
   * @name AdminAlertsSummary
   * @summary Live alert counts: open, claimed, by severity and by type
   * @request GET:/api/v1/admins/alerts/summary
   * @secure
   * @response `200` `AdminAlertsSummaryData`
   */
  adminAlertsSummary = (params: RequestParams = {}) =>
    this.request<AdminAlertsSummaryData, any>({
      path: `/api/v1/admins/alerts/summary`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/alerts
   * @name AdminClaimAlert
   * @summary Take an OPEN alert (stops its WhatsApp escalation)
   * @request POST:/api/v1/admins/alerts/{alertId}/claim
   * @secure
   * @response `200` `AdminClaimAlertData`
   * @response `201` `AdminAlertDto`
   */
  adminClaimAlert = (alertId: string, params: RequestParams = {}) =>
    this.request<AdminClaimAlertData, any>({
      path: `/api/v1/admins/alerts/${alertId}/claim`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/alerts
   * @name AdminResolveAlert
   * @summary Close a live alert, with an optional note
   * @request POST:/api/v1/admins/alerts/{alertId}/resolve
   * @secure
   * @response `200` `AdminResolveAlertData`
   * @response `201` `AdminAlertDto`
   */
  adminResolveAlert = (alertId: string, data: AdminResolveAlertRequestDto, params: RequestParams = {}) =>
    this.request<AdminResolveAlertData, any>({
      path: `/api/v1/admins/alerts/${alertId}/resolve`,
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
   * @tags orders
   * @name GetOrderChat
   * @summary The order chat as you see it: who you chat with, whether you can send, unread count, read markers and quick replies. closedReason NOT_ELIGIBLE when the order has no chat
   * @request GET:/api/v1/orders/{orderId}/chat
   * @secure
   * @response `200` `GetOrderChatData`
   */
  getOrderChat = (orderId: string, params: RequestParams = {}) =>
    this.request<GetOrderChatData, any>({
      path: `/api/v1/orders/${orderId}/chat`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name ListOrderMessages
   * @summary Messages, ascending by seq. No cursor: the latest page. before=seq: the older page. after=seq: everything newer (catch up on reconnect, foreground and screen open). limit 1 to 100, default 50
   * @request GET:/api/v1/orders/{orderId}/messages
   * @secure
   * @response `200` `ListOrderMessagesData`
   */
  listOrderMessages = ({ orderId, ...query }: ListOrderMessagesParams, params: RequestParams = {}) =>
    this.request<ListOrderMessagesData, any>({
      path: `/api/v1/orders/${orderId}/messages`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name SendOrderMessage
   * @summary Send a message. Idempotent: a retry with the same clientId returns the stored message. CHAT_RATE_LIMITED (429, details.retryAfterMs) when sending too fast
   * @request POST:/api/v1/orders/{orderId}/messages
   * @secure
   * @response `200` `SendOrderMessageData`
   */
  sendOrderMessage = (orderId: string, data: SendOrderMessageRequestDto, params: RequestParams = {}) =>
    this.request<SendOrderMessageData, any>({
      path: `/api/v1/orders/${orderId}/messages`,
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
   * @tags orders
   * @name MarkOrderMessagesRead
   * @summary Mark messages read up to a seq. The marker never moves back
   * @request POST:/api/v1/orders/{orderId}/messages/read
   * @secure
   * @response `200` `MarkOrderMessagesReadData`
   */
  markOrderMessagesRead = (orderId: string, data: MarkOrderMessagesReadRequestDto, params: RequestParams = {}) =>
    this.request<MarkOrderMessagesReadData, any>({
      path: `/api/v1/orders/${orderId}/messages/read`,
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
   * @tags admins/orders
   * @name AdminListOrderMessages
   * @summary An order's chat for support: thread summary, everyone who was in it, and its messages ascending
   * @request GET:/api/v1/admins/orders/{orderId}/messages
   * @secure
   * @response `200` `AdminListOrderMessagesData`
   */
  adminListOrderMessages = (orderId: string, params: RequestParams = {}) =>
    this.request<AdminListOrderMessagesData, any>({
      path: `/api/v1/admins/orders/${orderId}/messages`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags audit-logs
   * @name FindAll
   * @request GET:/api/v1/audit-logs
   * @secure
   * @response `200` `FindAllData`
   */
  findAll = (query: FindAllParams, params: RequestParams = {}) =>
    this.request<FindAllData, any>({
      path: `/api/v1/audit-logs`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags issues
   * @name CreateIssue
   * @summary Report an issue about an order, a transaction, or the app
   * @request POST:/api/v1/issues
   * @secure
   * @response `200` `CreateIssueData`
   * @response `201` `IssueReport`
   */
  createIssue = (data: CreateIssueRequestDto, params: RequestParams = {}) =>
    this.request<CreateIssueData, any>({
      path: `/api/v1/issues`,
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
   * @tags issues
   * @name ListMyIssues
   * @summary The caller's own issue reports, newest first
   * @request GET:/api/v1/issues/me
   * @secure
   * @response `200` `ListMyIssuesData`
   */
  listMyIssues = (query: ListMyIssuesParams, params: RequestParams = {}) =>
    this.request<ListMyIssuesData, any>({
      path: `/api/v1/issues/me`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags issues
   * @name GetMyIssue
   * @summary One of the caller’s issue reports
   * @request GET:/api/v1/issues/me/{issueId}
   * @secure
   * @response `200` `GetMyIssueData`
   */
  getMyIssue = (issueId: string, params: RequestParams = {}) =>
    this.request<GetMyIssueData, any>({
      path: `/api/v1/issues/me/${issueId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/issues
   * @name ListIssues
   * @summary Issue reports across all customers, filterable and searchable
   * @request GET:/api/v1/admins/issues
   * @secure
   * @response `200` `ListIssuesData`
   */
  listIssues = (query: ListIssuesParams, params: RequestParams = {}) =>
    this.request<ListIssuesData, any>({
      path: `/api/v1/admins/issues`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/issues
   * @name IssuesSummary
   * @summary Support queue health: open counts, backlog, response and resolution times
   * @request GET:/api/v1/admins/issues/summary
   * @secure
   * @response `200` `IssuesSummaryData`
   */
  issuesSummary = (query: IssuesSummaryParams, params: RequestParams = {}) =>
    this.request<IssuesSummaryData, any>({
      path: `/api/v1/admins/issues/summary`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/issues
   * @name ListUserIssues
   * @summary Every report one customer has filed
   * @request GET:/api/v1/admins/issues/users/{userId}
   * @secure
   * @response `200` `ListUserIssuesData`
   */
  listUserIssues = ({ userId, ...query }: ListUserIssuesParams, params: RequestParams = {}) =>
    this.request<ListUserIssuesData, any>({
      path: `/api/v1/admins/issues/users/${userId}`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/issues
   * @name GetIssue
   * @summary One issue report with the customer, subject, assignee and internal notes
   * @request GET:/api/v1/admins/issues/{issueId}
   * @secure
   * @response `200` `GetIssueData`
   */
  getIssue = (issueId: string, params: RequestParams = {}) =>
    this.request<GetIssueData, any>({
      path: `/api/v1/admins/issues/${issueId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/issues
   * @name UpdateStatus
   * @summary Move a report through OPEN → IN_REVIEW → RESOLVED / CLOSED (pushes the customer)
   * @request PATCH:/api/v1/admins/issues/{issueId}/status
   * @secure
   * @response `200` `UpdateStatusData`
   */
  updateStatus = (issueId: string, data: UpdateIssueStatusRequestDto, params: RequestParams = {}) =>
    this.request<UpdateStatusData, any>({
      path: `/api/v1/admins/issues/${issueId}/status`,
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
   * @tags admins/issues
   * @name Assign
   * @summary Assign the report to a support agent (or unassign). Picking up an OPEN report moves it to IN_REVIEW.
   * @request PATCH:/api/v1/admins/issues/{issueId}/assign
   * @secure
   * @response `200` `AssignData`
   */
  assign = (issueId: string, data: AssignIssueRequestDto, params: RequestParams = {}) =>
    this.request<AssignData, any>({
      path: `/api/v1/admins/issues/${issueId}/assign`,
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
   * @tags admins/issues
   * @name UpdatePriority
   * @summary Re-prioritise a report
   * @request PATCH:/api/v1/admins/issues/{issueId}/priority
   * @secure
   * @response `200` `UpdatePriorityData`
   */
  updatePriority = (issueId: string, data: UpdateIssuePriorityRequestDto, params: RequestParams = {}) =>
    this.request<UpdatePriorityData, any>({
      path: `/api/v1/admins/issues/${issueId}/priority`,
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
   * @tags admins/issues
   * @name AddNote
   * @summary Add an internal note (never shown to the customer)
   * @request POST:/api/v1/admins/issues/{issueId}/notes
   * @secure
   * @response `200` `AddNoteData`
   * @response `201` `IssueReport`
   */
  addNote = (issueId: string, data: AddIssueNoteRequestDto, params: RequestParams = {}) =>
    this.request<AddNoteData, any>({
      path: `/api/v1/admins/issues/${issueId}/notes`,
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
   * @tags announcements
   * @name ListPendingAnnouncements
   * @summary Live announcements for this app that the person has not closed for good
   * @request GET:/api/v1/announcements/pending
   * @secure
   * @response `200` `ListPendingAnnouncementsData`
   */
  listPendingAnnouncements = (query: ListPendingAnnouncementsParams, params: RequestParams = {}) =>
    this.request<ListPendingAnnouncementsData, any>({
      path: `/api/v1/announcements/pending`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags announcements
   * @name TrackAnnouncementSeen
   * @summary The popup was shown (counts reach and impressions)
   * @request POST:/api/v1/announcements/{announcementId}/seen
   * @secure
   * @response `201` `TrackAnnouncementSeenData`
   */
  trackAnnouncementSeen = (announcementId: string, params: RequestParams = {}) =>
    this.request<TrackAnnouncementSeenData, any>({
      path: `/api/v1/announcements/${announcementId}/seen`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags announcements
   * @name TrackAnnouncementLater
   * @summary "Show me later" was tapped; it pops again on a later launch
   * @request POST:/api/v1/announcements/{announcementId}/later
   * @secure
   * @response `201` `TrackAnnouncementLaterData`
   */
  trackAnnouncementLater = (announcementId: string, params: RequestParams = {}) =>
    this.request<TrackAnnouncementLaterData, any>({
      path: `/api/v1/announcements/${announcementId}/later`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags announcements
   * @name AcknowledgeAnnouncement
   * @summary Close it for good: CONFIRMED (got it) or ACTED (took the action). Never pops again.
   * @request POST:/api/v1/announcements/{announcementId}/acknowledge
   * @secure
   * @response `201` `AcknowledgeAnnouncementData`
   */
  acknowledgeAnnouncement = (
    announcementId: string,
    data: AcknowledgeAnnouncementRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<AcknowledgeAnnouncementData, any>({
      path: `/api/v1/announcements/${announcementId}/acknowledge`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/announcements
   * @name AdminListAnnouncements
   * @summary Every announcement, filterable by status and app
   * @request GET:/api/v1/admins/announcements
   * @secure
   * @response `200` `AdminListAnnouncementsData`
   */
  adminListAnnouncements = (query: AdminListAnnouncementsParams, params: RequestParams = {}) =>
    this.request<AdminListAnnouncementsData, any>({
      path: `/api/v1/admins/announcements`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/announcements
   * @name AdminCreateAnnouncement
   * @summary Write a new announcement (DRAFT unless status is ACTIVE)
   * @request POST:/api/v1/admins/announcements
   * @secure
   * @response `200` `AdminCreateAnnouncementData`
   * @response `201` `Announcement`
   */
  adminCreateAnnouncement = (data: CreateAnnouncementRequestDto, params: RequestParams = {}) =>
    this.request<AdminCreateAnnouncementData, any>({
      path: `/api/v1/admins/announcements`,
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
   * @tags admins/announcements
   * @name AdminAnnouncementsSummary
   * @summary How many are live, and how people are responding
   * @request GET:/api/v1/admins/announcements/summary
   * @secure
   * @response `200` `AdminAnnouncementsSummaryData`
   */
  adminAnnouncementsSummary = (params: RequestParams = {}) =>
    this.request<AdminAnnouncementsSummaryData, any>({
      path: `/api/v1/admins/announcements/summary`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/announcements
   * @name AdminListAnnouncementScreens
   * @summary Screens an INTERNAL action may open, per app
   * @request GET:/api/v1/admins/announcements/screens
   * @secure
   * @response `200` `AdminListAnnouncementScreensData`
   */
  adminListAnnouncementScreens = (params: RequestParams = {}) =>
    this.request<AdminListAnnouncementScreensData, any>({
      path: `/api/v1/admins/announcements/screens`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/announcements
   * @name AdminGetAnnouncement
   * @summary One announcement with its running totals
   * @request GET:/api/v1/admins/announcements/{announcementId}
   * @secure
   * @response `200` `AdminGetAnnouncementData`
   */
  adminGetAnnouncement = (announcementId: string, params: RequestParams = {}) =>
    this.request<AdminGetAnnouncementData, any>({
      path: `/api/v1/admins/announcements/${announcementId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/announcements
   * @name AdminUpdateAnnouncement
   * @summary Edit the copy, action, audience or window. Resets the announcement: receipts are deleted and counters zeroed, so it pops again for everyone.
   * @request PATCH:/api/v1/admins/announcements/{announcementId}
   * @secure
   * @response `200` `AdminUpdateAnnouncementData`
   */
  adminUpdateAnnouncement = (announcementId: string, data: UpdateAnnouncementRequestDto, params: RequestParams = {}) =>
    this.request<AdminUpdateAnnouncementData, any>({
      path: `/api/v1/admins/announcements/${announcementId}`,
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
   * @tags admins/announcements
   * @name AdminDeleteAnnouncement
   * @summary Delete a draft
   * @request DELETE:/api/v1/admins/announcements/{announcementId}
   * @secure
   * @response `200` `AdminDeleteAnnouncementData`
   */
  adminDeleteAnnouncement = (announcementId: string, params: RequestParams = {}) =>
    this.request<AdminDeleteAnnouncementData, any>({
      path: `/api/v1/admins/announcements/${announcementId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/announcements
   * @name AdminListAnnouncementReceipts
   * @summary Who has seen it and what they did
   * @request GET:/api/v1/admins/announcements/{announcementId}/receipts
   * @secure
   * @response `200` `AdminListAnnouncementReceiptsData`
   */
  adminListAnnouncementReceipts = (
    { announcementId, ...query }: AdminListAnnouncementReceiptsParams,
    params: RequestParams = {},
  ) =>
    this.request<AdminListAnnouncementReceiptsData, any>({
      path: `/api/v1/admins/announcements/${announcementId}/receipts`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/announcements
   * @name AdminUpdateAnnouncementStatus
   * @summary Publish (ACTIVE), pause (DRAFT) or archive
   * @request PATCH:/api/v1/admins/announcements/{announcementId}/status
   * @secure
   * @response `200` `AdminUpdateAnnouncementStatusData`
   */
  adminUpdateAnnouncementStatus = (
    announcementId: string,
    data: UpdateAnnouncementStatusRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<AdminUpdateAnnouncementStatusData, any>({
      path: `/api/v1/admins/announcements/${announcementId}/status`,
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
   * @tags webhooks
   * @name HandleWebhookEvents
   * @request POST:/api/v1/webhooks/public/{provider}/events
   * @response `200` `HandleWebhookEventsData`
   */
  handleWebhookEvents = (provider: "PAYSTACK" | "FLUTTERWAVE", data: Object, params: RequestParams = {}) =>
    this.request<HandleWebhookEventsData, any>({
      path: `/api/v1/webhooks/public/${provider}/events`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags teams
   * @name CreateTeam
   * @request POST:/api/v1/teams
   * @response `201` `CreateTeamData`
   */
  createTeam = (data: CreateTeamRequestDto, params: RequestParams = {}) =>
    this.request<CreateTeamData, any>({
      path: `/api/v1/teams`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags teams
   * @name GetUserTeam
   * @request GET:/api/v1/teams/{teamId}
   * @secure
   * @response `200` `GetUserTeamData`
   */
  getUserTeam = (teamId: string, params: RequestParams = {}) =>
    this.request<GetUserTeamData, any>({
      path: `/api/v1/teams/${teamId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admins/teams
   * @name AdminCreateTeam
   * @request POST:/api/v1/admins/teams
   * @secure
   * @response `201` `AdminCreateTeamData`
   */
  adminCreateTeam = (data: CreateTeamRequestDto, params: RequestParams = {}) =>
    this.request<AdminCreateTeamData, any>({
      path: `/api/v1/admins/teams`,
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
   * @tags admins/teams
   * @name AdminListTeams
   * @request GET:/api/v1/admins/teams
   * @secure
   * @response `200` `AdminListTeamsData`
   */
  adminListTeams = (query: AdminListTeamsParams, params: RequestParams = {}) =>
    this.request<AdminListTeamsData, any>({
      path: `/api/v1/admins/teams`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags crons
   * @name Run
   * @request GET:/api/v1/crons/run
   * @secure
   * @response `200` `RunData`
   */
  run = (params: RequestParams = {}) =>
    this.request<RunData, any>({
      path: `/api/v1/crons/run`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags delivery-price
   * @name Quote
   * @request POST:/api/v1/delivery-price/quote
   * @response `201` `QuoteData`
   */
  quote = (data: QuoteDto, params: RequestParams = {}) =>
    this.request<QuoteData, any>({
      path: `/api/v1/delivery-price/quote`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags delivery-price
   * @name PublicConfig
   * @request GET:/api/v1/delivery-price/config
   * @response `200` `PublicConfigData`
   */
  publicConfig = (params: RequestParams = {}) =>
    this.request<PublicConfigData, any>({
      path: `/api/v1/delivery-price/config`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags delivery-price
   * @name GetQuote
   * @request GET:/api/v1/delivery-price/quote/{shortId}
   * @response `200` `GetQuoteData`
   */
  getQuote = (shortId: string, params: RequestParams = {}) =>
    this.request<GetQuoteData, any>({
      path: `/api/v1/delivery-price/quote/${shortId}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags delivery-price
   * @name Feedback
   * @request POST:/api/v1/delivery-price/feedback
   * @response `201` `FeedbackData`
   */
  feedback = (data: FeedbackDto, params: RequestParams = {}) =>
    this.request<FeedbackData, any>({
      path: `/api/v1/delivery-price/feedback`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags delivery-price
   * @name Event
   * @request POST:/api/v1/delivery-price/event
   * @response `201` `EventData`
   */
  event = (data: DeliveryPriceEventDto, params: RequestParams = {}) =>
    this.request<EventData, any>({
      path: `/api/v1/delivery-price/event`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags delivery-price
   * @name Analytics
   * @request GET:/api/v1/delivery-price/admin/analytics
   * @secure
   * @response `200` `AnalyticsData`
   */
  analytics = (query: AnalyticsParams, params: RequestParams = {}) =>
    this.request<AnalyticsData, any>({
      path: `/api/v1/delivery-price/admin/analytics`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags delivery-price
   * @name AdminConfig
   * @request GET:/api/v1/delivery-price/admin/config
   * @secure
   * @response `200` `AdminConfigData`
   */
  adminConfig = (params: RequestParams = {}) =>
    this.request<AdminConfigData, any>({
      path: `/api/v1/delivery-price/admin/config`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags delivery-price
   * @name UpdateConfig
   * @request PATCH:/api/v1/delivery-price/admin/config
   * @secure
   * @response `200` `UpdateConfigData`
   */
  updateConfig = (data: UpdateDeliveryCalculatorConfigDto, params: RequestParams = {}) =>
    this.request<UpdateConfigData, any>({
      path: `/api/v1/delivery-price/admin/config`,
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
   * @tags web-orders
   * @name Create
   * @request POST:/api/v1/web-orders/create
   * @response `201` `CreateData`
   */
  create = (data: CreateWebOrderDto, params: RequestParams = {}) =>
    this.request<CreateData, any>({
      path: `/api/v1/web-orders/create`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags web-orders
   * @name Track
   * @request GET:/api/v1/web-orders/{token}
   * @response `200` `TrackData`
   */
  track = (token: string, params: RequestParams = {}) =>
    this.request<TrackData, any>({
      path: `/api/v1/web-orders/${token}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags web-orders
   * @name Search
   * @request POST:/api/v1/web-orders/{token}/search
   * @response `201` `SearchData`
   */
  search = (token: string, params: RequestParams = {}) =>
    this.request<SearchData, any>({
      path: `/api/v1/web-orders/${token}/search`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags web-orders
   * @name Offers
   * @request GET:/api/v1/web-orders/{token}/offers
   * @response `200` `OffersData`
   */
  offers = (token: string, params: RequestParams = {}) =>
    this.request<OffersData, any>({
      path: `/api/v1/web-orders/${token}/offers`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags web-orders
   * @name AcceptOffer
   * @request PATCH:/api/v1/web-orders/{token}/offers/{offerId}
   * @response `200` `AcceptOfferData`
   */
  acceptOffer = (token: string, offerId: string, params: RequestParams = {}) =>
    this.request<AcceptOfferData, any>({
      path: `/api/v1/web-orders/${token}/offers/${offerId}`,
      method: "PATCH",
      ...params,
    });
  /**
   * No description
   *
   * @tags web-orders
   * @name Pay
   * @request POST:/api/v1/web-orders/{token}/pay
   * @response `201` `PayData`
   */
  pay = (token: string, params: RequestParams = {}) =>
    this.request<PayData, any>({
      path: `/api/v1/web-orders/${token}/pay`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags web-orders
   * @name Cancel
   * @request PATCH:/api/v1/web-orders/{token}/cancel
   * @response `200` `CancelData`
   */
  cancel = (token: string, params: RequestParams = {}) =>
    this.request<CancelData, any>({
      path: `/api/v1/web-orders/${token}/cancel`,
      method: "PATCH",
      ...params,
    });
  /**
   * No description
   *
   * @tags support
   * @name GetUnreadCount
   * @summary Unread support messages for the caller — drives the Contact Us badge
   * @request GET:/api/v1/support/unread
   * @secure
   * @response `200` `GetUnreadCountData`
   */
  getUnreadCount = (params: RequestParams = {}) =>
    this.request<GetUnreadCountData, any>({
      path: `/api/v1/support/unread`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags support
   * @name MarkAsRead
   * @summary Clear the support unread badge. Idempotent.
   * @request POST:/api/v1/support/read
   * @secure
   * @response `200` `MarkAsReadData`
   * @response `201` `SupportUnreadResponseDto`
   */
  markAsRead = (params: RequestParams = {}) =>
    this.request<MarkAsReadData, any>({
      path: `/api/v1/support/read`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Every developer team. `liveStatus=PENDING` is the review queue, oldest request first.
   *
   * @tags admins/developers
   * @name AdminListDevelopers
   * @request GET:/api/v1/admins/developers
   * @secure
   * @response `200` `AdminListDevelopersData`
   */
  adminListDevelopers = (query: AdminListDevelopersParams, params: RequestParams = {}) =>
    this.request<AdminListDevelopersData, any>({
      path: `/api/v1/admins/developers`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description The profile, owner verification and live-access history an admin decides on.
   *
   * @tags admins/developers
   * @name AdminGetDeveloper
   * @request GET:/api/v1/admins/developers/{teamId}
   * @secure
   * @response `200` `AdminGetDeveloperData`
   */
  adminGetDeveloper = (teamId: string, params: RequestParams = {}) =>
    this.request<AdminGetDeveloperData, any>({
      path: `/api/v1/admins/developers/${teamId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description PENDING → APPROVED. The team can then use live mode.
   *
   * @tags admins/developers
   * @name AdminApproveDeveloperLive
   * @request POST:/api/v1/admins/developers/{teamId}/approve
   * @secure
   * @response `200` `AdminApproveDeveloperLiveData`
   */
  adminApproveDeveloperLive = (teamId: string, params: RequestParams = {}) =>
    this.request<AdminApproveDeveloperLiveData, any>({
      path: `/api/v1/admins/developers/${teamId}/approve`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description PENDING → REJECTED. The developer sees the reason and can fix their profile and ask again.
   *
   * @tags admins/developers
   * @name AdminRejectDeveloperLive
   * @request POST:/api/v1/admins/developers/{teamId}/reject
   * @secure
   * @response `200` `AdminRejectDeveloperLiveData`
   */
  adminRejectDeveloperLive = (teamId: string, data: DeveloperLiveDecisionRequestDto, params: RequestParams = {}) =>
    this.request<AdminRejectDeveloperLiveData, any>({
      path: `/api/v1/admins/developers/${teamId}/reject`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description APPROVED → SUSPENDED. Live mode stops at once; test mode keeps working.
   *
   * @tags admins/developers
   * @name AdminSuspendDeveloperLive
   * @request POST:/api/v1/admins/developers/{teamId}/suspend
   * @secure
   * @response `200` `AdminSuspendDeveloperLiveData`
   */
  adminSuspendDeveloperLive = (teamId: string, data: DeveloperLiveDecisionRequestDto, params: RequestParams = {}) =>
    this.request<AdminSuspendDeveloperLiveData, any>({
      path: `/api/v1/admins/developers/${teamId}/suspend`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description SUSPENDED → APPROVED.
   *
   * @tags admins/developers
   * @name AdminUnsuspendDeveloperLive
   * @request POST:/api/v1/admins/developers/{teamId}/unsuspend
   * @secure
   * @response `200` `AdminUnsuspendDeveloperLiveData`
   */
  adminUnsuspendDeveloperLive = (teamId: string, params: RequestParams = {}) =>
    this.request<AdminUnsuspendDeveloperLiveData, any>({
      path: `/api/v1/admins/developers/${teamId}/unsuspend`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    });
}
