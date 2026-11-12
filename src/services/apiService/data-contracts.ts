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

export interface CountryConfigSchemaDto {
  exchangeRate: number;
  minimumOfferPercentage: number;
  /** @default 40 */
  maxRiderSurgePercentage?: number;
  userWithdrawalLimits: {
    /** @default 0 */
    minimumAmount?: number;
    maximumAmount?: number;
  };
  businessWithdrawalLimits: {
    /** @default 0 */
    minimumAmount?: number;
    maximumAmount?: number;
  };
  /** @default false */
  referAndEarn?: boolean;
  /** @default 0 */
  referralEarnAmount?: number;
  /** @default 1 */
  ordersRequiredBeforeEarn?: number;
}

export interface Country {
  name: string;
  code: string;
  currencyName: string;
  currencyCode: string;
  config: CountryConfigSchemaDto;
  _id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface ListCountryResponseDto {
  nextPage?: number | null;
  previousPage?: number | null;
  currentPage: number;
  results: Country[];
  perPageLimit: number;
  totalRecords: number;
  totalPages: number;
}

export interface AddCountryDto {
  name: string;
  /**
   * @minLength 2
   * @maxLength 3
   */
  code: string;
  /**
   * @minLength 3
   * @maxLength 3
   */
  currencyCode: string;
  currencyName: string;
}

export interface WithdrawalLimitsDto {
  minimumAmount: number;
  maximumAmount: number;
}

export interface CountryConfigDto {
  /** Exchange rate for the country */
  exchangeRate?: number;
  /**
   * Minimum Percentage value
   * @min 0
   * @max 100
   */
  minimumOfferPercentage?: number;
  /**
   * Max percentage above quote a rider counter-offer may go
   * @min 0
   * @max 100
   */
  maxRiderSurgePercentage?: number;
  /** user withdrawal limits */
  userWithdrawalLimits?: WithdrawalLimitsDto;
  /** business withdrawal limits */
  businessWithdrawalLimits?: WithdrawalLimitsDto;
  /** Whether refer-and-earn is enabled; when true referees earn when conditions are met */
  referAndEarn?: boolean;
  /**
   * Amount to credit referee when referral condition is met (smallest currency unit)
   * @min 0
   */
  referralEarnAmount?: number;
  /**
   * Completed orders required before referee earns. 0 = earn on referred user signup
   * @min 0
   */
  ordersRequiredBeforeEarn?: number;
}

export interface UpdateCountryDto {
  /**
   * Name of the country
   * @example "Nigeria"
   */
  name: string;
  /** Configuration for the country */
  config?: CountryConfigDto;
}

export interface StateDto {
  name: string;
  /**
   * @minLength 2
   * @maxLength 3
   */
  code: string;
}

export interface State {
  countryId: string;
  name: string;
  code: string;
  config: {
    basePricePerKm?: number;
    baseFuelPrice?: number;
    currentFuelPrice?: number;
    /** @default 0 */
    serviceCharge?: number;
    /** @default 0 */
    percentageCharge?: number;
    /** @default 2000000 */
    minimumOrderPrice?: number;
    /** @default 300000 */
    distanceTaperThreshold?: number;
    /** @default 18000 */
    distanceTaperBeyondRate?: number;
    /** @default 5 */
    maxRidersPerQuery?: number;
    /** @default 1 */
    maxActiveOrders?: number;
    /** @default 20 */
    maxDistanceRadius?: number;
    /** @default false */
    queueOrderByDefault?: boolean;
    /** @default false */
    locationUpdateEnabled?: boolean;
    /** @default 500 */
    locationUpdateFreeRadiusMeters?: number;
    /** @default 1 */
    locationUpdateMaxPerLocation?: number;
    /** @default 2 */
    locationUpdateMaxDeclinesPerLocation?: number;
    /** @default 240 */
    locationUpdateRiderAcceptTimeoutSec?: number;
    /** @default false */
    arrivalGateEnabled?: boolean;
    /** @default 40 */
    arrivalRadiusMeters?: number;
    /** @default true */
    etaEnabled?: boolean;
    /** @default 25 */
    etaAverageSpeedKmh?: number;
  };
  _id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface ListStateResponseDto {
  nextPage?: number | null;
  previousPage?: number | null;
  currentPage: number;
  results: State[];
  perPageLimit: number;
  totalRecords: number;
  totalPages: number;
}

export interface StateConfigDto {
  /** Price per KM as a number */
  basePricePerKm: number;
  /** Base fuel price */
  baseFuelPrice: number;
  /** Current fuel price as a number */
  currentFuelPrice: number;
  /**
   * Percentage charge as a number
   * @default 0
   */
  percentageCharge: number;
  /**
   * Service charge for orders
   * @default 0
   */
  serviceCharge: number;
  /**
   * Minimum order orice
   * @default 200000
   */
  minimumOrderPrice: number;
  /**
   * Distance taper: raw price (sub-units) up to which the full per-km rate applies
   * @default 300000
   */
  distanceTaperThreshold?: number;
  /**
   * Distance taper: flat per-km rate (sub-units) charged beyond the threshold
   * @default 18000
   */
  distanceTaperBeyondRate?: number;
  /**
   * Maximum riders per query
   * @default 5
   */
  maxRidersPerQuery: number;
  /**
   * Maximum active rider orders
   * @default 1
   */
  maxActiveOrders: number;
  /**
   * Maximum distance radius in kilometers
   * @default 20
   */
  maxDistanceRadius: number;
  /**
   * Field to queue orders by default
   * @default false
   */
  queueOrderByDefault: boolean;
  /**
   * Master toggle for mid-order location updates
   * @default false
   */
  locationUpdateEnabled?: boolean;
  /**
   * Free route-distance delta (metres) for a location edit
   * @default 500
   */
  locationUpdateFreeRadiusMeters?: number;
  /**
   * Max accepted location updates per stop
   * @default 1
   */
  locationUpdateMaxPerLocation?: number;
  /**
   * Max rider-declined location updates before further requests are blocked for a stop
   * @default 2
   */
  locationUpdateMaxDeclinesPerLocation?: number;
  /**
   * Seconds a rider has to accept a location change
   * @default 240
   */
  locationUpdateRiderAcceptTimeoutSec?: number;
  /**
   * Master toggle for the ARRIVED proximity gate + ETA
   * @default false
   */
  arrivalGateEnabled?: boolean;
  /**
   * Radius (metres) to mark a location ARRIVED
   * @default 40
   */
  arrivalRadiusMeters?: number;
  /**
   * Whether to surface estimated pickup/dropoff times
   * @default true
   */
  etaEnabled?: boolean;
  /**
   * Average speed (km/h) for the ETA estimate
   * @default 25
   */
  etaAverageSpeedKmh?: number;
}

export interface UpdateStateDto {
  /**
   * Name of the state
   * @example "California"
   */
  name: string;
  /** Configuration for the state */
  config?: StateConfigDto;
}

export interface RangeDto {
  /** @format date-time */
  from: string;
  /** @format date-time */
  to: string;
}

export interface OrderWindowDto {
  orders: number;
  completed: number;
  cancelled: number;
  ongoing: number;
  volume: number;
  riderFees: number;
  serviceCharge: number;
  discounts: number;
  completedVolume: number;
  averageOrderValue: number;
  completionRate: number;
  cancellationRate: number;
  customers: number;
  riders: number;
  byStatus: object;
  byType: object;
  byPaymentStatus: object;
}

export interface OverviewResponseDto {
  range: RangeDto;
  current: OrderWindowDto;
  previous: OrderWindowDto;
  users: object;
  vehicles: object;
  wallets: object;
  transactions: object;
  live: object;
}

export interface SeriesPointDto {
  bucket: string;
  orders: number;
  completed: number;
  cancelled: number;
  volume: number;
  serviceCharge: number;
  riderFees: number;
  single: number;
  batch: number;
  bulk: number;
  newCustomers: number;
  newRiders: number;
  moneyIn: number;
  moneyOut: number;
}

export interface SeriesResponseDto {
  range: RangeDto;
  bucket: string;
  points: SeriesPointDto[];
}

export interface TopRiderDto {
  riderId: string;
  rider: object;
  deliveries: number;
  cancelled: number;
  riderFees: number;
  volume: number;
  rating: number | null;
  reviews: number;
}

export interface PeakCellDto {
  day: number;
  hour: number;
  count: number;
  volume: number;
}

export interface PeakHoursResponseDto {
  range: RangeDto;
  cells: PeakCellDto[];
}

export interface ChargeWindowDto {
  /** Commission taken from rider earnings */
  riderCommission: number;
  riderCommissionCount: number;
  /** Service charge paid by customers */
  serviceCharge: number;
  serviceChargeCount: number;
  /** riderCommission + serviceCharge */
  total: number;
  /** Rider earning rows (trips paid out) in the window */
  trips: number;
  /** Trips where a commission was actually taken */
  tripsCharged: number;
  ridersCharged: number;
  /** Average commission per charged trip */
  averageCommission: number;
}

export interface ChargesResponseDto {
  range: RangeDto;
  current: ChargeWindowDto;
  previous: ChargeWindowDto;
}

export interface PageableType {
  nextPage?: number;
  previousPage?: number;
  currentPage: number;
  results: any[][];
  perPageLimit: number;
  totalRecords: number;
  totalPages: number;
}

export interface ProviderFeeTotalsDto {
  /** All Paystack fees in the window (the category FEE rows) */
  fees: number;
  /** Fee rows in the window */
  feeCount: number;
  /** Everything that went through Paystack, in and out */
  gross: number;
  /** Successful payments, transfers and refunds */
  count: number;
  /** fees / gross as a percent, 2 decimals */
  effectiveRate: number;
  /** Card and bank payments received: wallet deposits and order payments */
  moneyIn: number;
  /** Paystack fees on the money received */
  moneyInFees: number;
  /** moneyIn minus moneyInFees: what the platform kept of it */
  kept: number;
  /** Withdrawals, platform payouts and card refunds sent out */
  moneyOut: number;
  /** Paystack fees on the money sent out */
  moneyOutFees: number;
}

export enum ProviderFeeFlow {
  WALLET_DEPOSIT = "WALLET_DEPOSIT",
  ORDER_CARD_PAYMENT = "ORDER_CARD_PAYMENT",
  WEB_ORDER_PAYMENT = "WEB_ORDER_PAYMENT",
  WITHDRAWAL = "WITHDRAWAL",
  PLATFORM_PAYOUT = "PLATFORM_PAYOUT",
  REFUND = "REFUND",
}

export interface ProviderFeeFlowDto {
  flow: ProviderFeeFlow;
  /** Successful payments or transfers in this flow */
  count: number;
  /** Money that went through Paystack in this flow */
  gross: number;
  /** Paystack fees booked for this flow */
  fees: number;
  /** Fee rows booked for this flow */
  feeCount: number;
  /** fees / gross as a percent, 2 decimals (0 when nothing went through) */
  effectiveRate: number;
  /** False when Paystack does not report a fee for this flow (refunds), so fees stay 0 by design */
  feesReported: boolean;
}

export interface ProviderFeeWindowDto {
  totals: ProviderFeeTotalsDto;
  /** Every flow, always in the same order */
  flows: ProviderFeeFlowDto[];
}

export interface ProviderFeeSeriesPointDto {
  /** Bucket start (Lagos time) as an ISO string */
  bucket: string;
  fees: number;
  /** Money that went through Paystack in the bucket */
  gross: number;
  /** Fee rows in the bucket */
  feeCount: number;
  /** Fees per ProviderFeeFlow in the bucket */
  byFlow: object;
}

export interface ProviderFeesResponseDto {
  range: RangeDto;
  bucket: "day" | "week" | "month";
  current: ProviderFeeWindowDto;
  /** The same length of time just before the window */
  previous: ProviderFeeWindowDto;
  series: ProviderFeeSeriesPointDto[];
}

export enum TransactionOwnerKind {
  CUSTOMER = "CUSTOMER",
  RIDER = "RIDER",
  BUSINESS = "BUSINESS",
  PLATFORM = "PLATFORM",
  TEAM = "TEAM",
}

export interface TransactionOwnerDto {
  kind: TransactionOwnerKind;
  /** User, business or team id (the transaction entityId) */
  id: string;
  /** Display name. "Pickriders platform" for platform wallet rows. */
  name: string;
  phone?: string;
  email?: string;
  photo?: string;
  /** UserStatus for people, ACTIVE or INACTIVE for businesses */
  status?: string;
  /** Riders only: whether the rider app is online right now */
  isOnline?: boolean;
  /** true when the account no longer exists (deleted or never resolved) */
  missing?: boolean;
}

export interface ProviderFeeRowDto {
  /** The FEE transaction id */
  _id: string;
  /** The Paystack reference the fee was charged on */
  reference: string;
  flow: ProviderFeeFlow;
  /** PROVIDER_DEPOSIT_FEE, PROVIDER_WITHDRAWAL_FEE or PROVIDER_PAYOUT_FEE */
  purpose:
    | "ORDER_EARNING"
    | "WALLET_FUNDING"
    | "WALLET_WITHDRAWAL"
    | "REFERRAL_BONUS"
    | "ORDER_PAYMENT"
    | "ORDER_EXTERNAL_FUNDING"
    | "ORDER_PAYMENT_REFUND"
    | "ORDER_EARNING_SPLIT"
    | "ORDER_DISCOUNT"
    | "PROVIDER_DEPOSIT_FEE"
    | "PROVIDER_WITHDRAWAL_FEE"
    | "PROVIDER_PAYOUT_FEE"
    | "ORDER_SERVICE_CHARGE"
    | "PLATFORM_TRANSFER"
    | "TEST_FUNDING";
  /** What Paystack took */
  fee: number;
  /** The payment or transfer amount; null if not found */
  gross: number | null;
  /** fee / gross as a percent, 2 decimals */
  effectiveRate: number | null;
  currency: string;
  /** @format date-time */
  createdAt: string;
  orderId?: string | null;
  /** The payment or transfer transaction id */
  sourceTransactionId?: string | null;
  /** Whose money it was: the wallet owner on the payment or transfer */
  owner: TransactionOwnerDto | null;
}

export interface ListProviderFeeRowsResponseDto {
  nextPage?: number | null;
  previousPage?: number | null;
  currentPage: number;
  results: ProviderFeeRowDto[];
  perPageLimit: number;
  totalRecords: number;
  totalPages: number;
}

export interface AttentionResponseDto {
  licencesAwaitingReview: number;
  vehiclesPendingVerification: number;
  ordersAwaitingRider: number;
  ordersAwaitingRiderStale: number;
  withdrawalsProcessing: number;
  withdrawalsProcessingAmount: number;
  failedTransactions24h: number;
  failedNotifications24h: number;
  suspendedRiders: number;
  ridersPausedFromDispatch: number;
  /** Issue reports still OPEN or IN_REVIEW */
  issuesOpen: number;
  /** Open reports nobody has picked up */
  issuesUnassigned: number;
}

export interface CustomerWindowDto {
  /** Customers who signed up in the window */
  newCustomers: number;
  /** Customers who placed at least one order in the window */
  active: number;
  /** Active customers who had ordered before the window too */
  returning: number;
  /** Active customers whose first ever order fell in the window */
  firstTimers: number;
  /** Customers who opened the app in the window */
  signedIn: number;
  orders: number;
  completed: number;
  cancelled: number;
  /** Orders the customer cancelled themselves */
  cancelledByCustomer: number;
  /** What customers were charged on completed orders */
  spent: number;
  /** Orders per active customer */
  ordersPerActive: number;
  /** Spend per active customer */
  spendPerActive: number;
}

export interface CustomerSeriesPointDto {
  bucket: string;
  newCustomers: number;
  activeCustomers: number;
  orders: number;
  cancelled: number;
}

export interface CustomerLeaderDto {
  userId: string;
  user: object;
  orders: number;
  completed: number;
  cancelled: number;
  /** Cancelled by the customer themselves */
  cancelledByCustomer: number;
  spent: number;
  /** @format date-time */
  lastOrderAt: string;
}

export interface CustomersOverviewResponseDto {
  range: RangeDto;
  /** Series bucket unit */
  bucket: string;
  current: CustomerWindowDto;
  previous: CustomerWindowDto;
  /** Lifetime headcounts: total, byStatus, phoneVerified, everOrdered */
  base: object;
  /** Active customers by how many orders they placed in the window: one, twoToThree, fourToNine, tenPlus */
  frequency: object;
  /** Per bucket across the window, dense */
  series: CustomerSeriesPointDto[];
  /** Biggest spenders in the window */
  topSpenders: CustomerLeaderDto[];
  /** Most orders in the window */
  mostOrders: CustomerLeaderDto[];
  /** Most cancellations in the window */
  mostCancelled: CustomerLeaderDto[];
}

/** Required when restricted is true. */
export enum WithdrawalRestrictionReason {
  KYC_REVIEW = "KYC_REVIEW",
  DISPUTE = "DISPUTE",
  UNDER_INVESTIGATION = "UNDER_INVESTIGATION",
  OTHER = "OTHER",
}

export interface AdminWithdrawalRestrictionViewDto {
  /** true while withdrawals are paused on this account. */
  active: boolean;
  /** Required when restricted is true. */
  reason?: WithdrawalRestrictionReason | null;
  /** Friendly sentence for the reason, ready to display. */
  message?: string | null;
  /** Optional note from the admin, shown under the message. */
  note?: string | null;
  /** @format date-time */
  restrictedAt?: string | null;
  /** Admin user id */
  restrictedBy?: string | null;
  /** @format date-time */
  liftedAt?: string | null;
  /** Admin user id */
  liftedBy?: string | null;
}

export interface UserOverviewResponseDto {
  range: RangeDto;
  user: object;
  wallet: object | null;
  asCustomer: object;
  asRider: object;
  transactions: object;
  reviews: object;
  vehicles: object[];
  business: object | null;
  /** Same as user.withdrawalRestriction */
  withdrawalRestriction: AdminWithdrawalRestrictionViewDto;
}

export enum EntityType {
  TEAM = "TEAM",
  USER = "USER",
  BUSINESS = "BUSINESS",
}

export interface Transaction {
  entityId: string;
  walletId?: string;
  entityType: EntityType;
  currency: string;
  amount: number;
  /** @default 0 */
  charge?: number;
  reference: string;
  description?: string;
  /** @default 0 */
  balanceBefore: number;
  balanceAfter: number;
  type: "CREDIT" | "DEBIT";
  category: "FEE" | "DEPOSIT" | "WITHDRAWAL" | "REVERSAL" | "CHARGE";
  purpose:
    | "ORDER_EARNING"
    | "WALLET_FUNDING"
    | "WALLET_WITHDRAWAL"
    | "REFERRAL_BONUS"
    | "ORDER_PAYMENT"
    | "ORDER_EXTERNAL_FUNDING"
    | "ORDER_PAYMENT_REFUND"
    | "ORDER_EARNING_SPLIT"
    | "ORDER_DISCOUNT"
    | "PROVIDER_DEPOSIT_FEE"
    | "PROVIDER_WITHDRAWAL_FEE"
    | "PROVIDER_PAYOUT_FEE"
    | "ORDER_SERVICE_CHARGE"
    | "PLATFORM_TRANSFER"
    | "TEST_FUNDING";
  status: "PROCESSING" | "FAILED" | "SUCCESS" | "CANCELLED";
  /** @default {} */
  metadata?: object;
  teamId?: string;
  /** @default true */
  livemode?: boolean;
  _id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface ListTransactionResponseDto {
  nextPage?: number | null;
  previousPage?: number | null;
  currentPage: number;
  results: Transaction[];
  perPageLimit: number;
  totalRecords: number;
  totalPages: number;
}

export interface AdminTransactionResponseDto {
  entityId: string;
  walletId?: string;
  entityType: EntityType;
  currency: string;
  amount: number;
  /** @default 0 */
  charge?: number;
  reference: string;
  description?: string;
  /** @default 0 */
  balanceBefore: number;
  balanceAfter: number;
  type: "CREDIT" | "DEBIT";
  category: "FEE" | "DEPOSIT" | "WITHDRAWAL" | "REVERSAL" | "CHARGE";
  purpose:
    | "ORDER_EARNING"
    | "WALLET_FUNDING"
    | "WALLET_WITHDRAWAL"
    | "REFERRAL_BONUS"
    | "ORDER_PAYMENT"
    | "ORDER_EXTERNAL_FUNDING"
    | "ORDER_PAYMENT_REFUND"
    | "ORDER_EARNING_SPLIT"
    | "ORDER_DISCOUNT"
    | "PROVIDER_DEPOSIT_FEE"
    | "PROVIDER_WITHDRAWAL_FEE"
    | "PROVIDER_PAYOUT_FEE"
    | "ORDER_SERVICE_CHARGE"
    | "PLATFORM_TRANSFER"
    | "TEST_FUNDING";
  status: "PROCESSING" | "FAILED" | "SUCCESS" | "CANCELLED";
  /** @default {} */
  metadata?: object;
  teamId?: string;
  /** @default true */
  livemode?: boolean;
  _id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  owner: TransactionOwnerDto;
  /** The rider behind a business rider earning, only when the row carries metadata.riderId */
  rider?: TransactionOwnerDto;
}

export interface ListAdminTransactionResponseDto {
  nextPage?: number | null;
  previousPage?: number | null;
  currentPage: number;
  results: AdminTransactionResponseDto[];
  perPageLimit: number;
  totalRecords: number;
  totalPages: number;
}

export interface ExternalPaymentMetricsResponseDto {
  /** Number of orders paid via a share link. */
  count: number;
  /** Gross amount paid through link payments. */
  totalFunded: number;
  /** Paystack processing fees on those payments. */
  totalFees: number;
  /** Cash actually received after fees (totalFunded - totalFees). */
  netReceived: number;
  /** Distinct customers who used the feature. */
  uniqueCustomers: number;
}

export interface TransactionMetricsSummaryResponseDto {
  /** Total value of successful transactions (sub-units). */
  totalVolume: number;
  /** Number of successful transactions. */
  count: number;
  /** Total credited (money in), sub-units. */
  inflow: number;
  /** Total debited (money out), sub-units. */
  outflow: number;
  /** Total deposits, sub-units. */
  deposits: number;
  /** Total withdrawals, sub-units. */
  withdrawals: number;
  /** Total fees, sub-units. */
  fees: number;
  /** Total refunds/reversals, sub-units. */
  refunds: number;
  /** Total charges, sub-units. */
  charges: number;
  /** Distinct wallets/entities involved. */
  uniqueEntities: number;
}

export interface InsightsRangeDto {
  /** @format date-time */
  from: string;
  /** @format date-time */
  to: string;
}

export interface EarningsSummaryDto {
  /** Order earnings after commission, sub-units */
  net: number;
  /** Order earnings before commission, sub-units */
  gross: number;
  /** Platform commission taken on those earnings, sub-units */
  charges: number;
  /** Referral bonuses credited in the window, sub-units */
  referralBonus: number;
  /** Paid deliveries in the window */
  deliveries: number;
  /** net / deliveries, sub-units */
  avgPerDelivery: number;
  /** net for the previous window of the same length */
  previousNet: number;
  /** % change of net vs the previous window, one decimal */
  deltaPct: number;
}

export interface RatingSummaryDto {
  average: number;
  count: number;
  /** Counts for 1★..5★ */
  distribution: number[];
}

export interface BidStatsDto {
  total: number;
  won: number;
  /** % of bids accepted, one decimal */
  winRate: number;
}

export interface PerformanceSummaryDto {
  orders: number;
  completed: number;
  cancelled: number;
  /** % of orders completed, one decimal */
  completionRate: number;
  rating: RatingSummaryDto;
  /** Average minutes from starting a pickup leg to arriving */
  avgPickupMins: number;
  /** Average minutes from starting an order to completing it */
  avgDeliveryMins: number;
  /** Sum of completed legs, km (one decimal) */
  distanceKm: number;
  bids: BidStatsDto;
}

export interface ActivitySummaryDto {
  /** Mon..Sun of the current Lagos week; true = ≥1 completed delivery */
  activeDays: boolean[];
  /** Consecutive days (ending today or yesterday) with ≥1 completed delivery */
  streakDays: number;
}

export interface GoalSummaryDto {
  /** Rider-set weekly net target, sub-units */
  weeklyTarget?: number;
  /** Net earned since Monday, sub-units */
  weekNet: number;
  /** 0-100, capped */
  progressPct: number;
}

export interface InsightsOverviewResponseDto {
  range: InsightsRangeDto;
  earnings: EarningsSummaryDto;
  performance: PerformanceSummaryDto;
  activity: ActivitySummaryDto;
  goal: GoalSummaryDto;
}

export interface EarningsByTypeDto {
  single: number;
  batch: number;
  bulk: number;
}

export interface EarningsSeriesPointDto {
  /** ISO start of the bucket (Lagos time) */
  bucket: string;
  net: number;
  gross: number;
  deliveries: number;
  /** Gross rider fee by order type */
  byType: EarningsByTypeDto;
}

export interface EarningsSeriesResponseDto {
  range: InsightsRangeDto;
  bucket: "day" | "week" | "month";
  points: EarningsSeriesPointDto[];
  /** Gross rider fee by order type over the whole window */
  byType: EarningsByTypeDto;
}

export interface RiderReviewDto {
  _id: string;
  rating: number;
  comment: string;
  orderNumber?: string;
  /** Customer first name only */
  customerName?: string;
  /** @format date-time */
  createdAt: string;
}

export interface RiderReviewsResponseDto {
  results: RiderReviewDto[];
  totalRecords: number;
  page: number;
  limit: number;
  summary: RatingSummaryDto;
}

export interface PeakHourCellDto {
  /** 0 = Sunday … 6 = Saturday (Lagos time) */
  day: number;
  /** 0-23 (Lagos time) */
  hour: number;
  count: number;
}

export interface HotZoneDto {
  latitude: number;
  longitude: number;
  /** Pickups created in the window at this ~100 m cell */
  weight: number;
}

export interface DemandResponseDto {
  range: InsightsRangeDto;
  /** Radius around the rider the data covers, km */
  radiusKm: number;
  /** False when the rider has no known location yet */
  hasLocation: boolean;
  peakHours: PeakHourCellDto[];
  hotZones: HotZoneDto[];
}

export interface MapPointDto {
  latitude: number;
  longitude: number;
  type: "PICKUP" | "DROPOFF";
}

export interface MyMapResponseDto {
  range: InsightsRangeDto;
  points: MapPointDto[];
}

export interface LeaderboardEntryDto {
  riderId: string;
  /** "Chidi O." — first name and last initial */
  name: string;
  photo?: string;
  deliveries: number;
  rating: number;
  rank: number;
  isMe: boolean;
}

export interface LeaderboardMeDto {
  /** 0 when the rider has no completed delivery in the window */
  rank: number;
  deliveries: number;
  /** Riders ranked in this scope and window */
  totalRanked: number;
}

export interface LeaderboardResponseDto {
  range: InsightsRangeDto;
  scope: "state" | "country";
  results: LeaderboardEntryDto[];
  me: LeaderboardMeDto;
}

export interface AchievementDto {
  key: string;
  title: string;
  description: string;
  /** Icon name the client maps to an asset */
  icon: string;
  target: number;
  /** Current value towards target (capped at target once unlocked) */
  progress: number;
  /** @format date-time */
  unlockedAt?: string;
  /** Unlocked and not yet acknowledged — show the celebration */
  isNew: boolean;
}

export interface AchievementsResponseDto {
  results: AchievementDto[];
  unlockedCount: number;
}

export interface CancellationReasonDto {
  reason: string;
  count: number;
}

export interface RiderCancellationsDto {
  /** Cancelled orders assigned to the rider in the window */
  total: number;
  /** Of those, cancelled by the rider */
  byRider: number;
  /** Of those, cancelled by the customer */
  byCustomer: number;
  /** Of those, cancelled by staff */
  byAdmin: number;
  /** Most common reasons the rider gave, top 5 */
  riderReasons: CancellationReasonDto[];
}

export interface RiderLocationChangesDto {
  /** Customer location-change requests on the rider’s orders in the window */
  total: number;
  accepted: number;
  declined: number;
  /** Left to lapse without an answer */
  expired: number;
  /** Withdrawn by the customer before the rider answered */
  cancelled: number;
}

export interface RiderWithdrawalsDto {
  count: number;
  /** Successful withdrawals in the window, sub-units */
  total: number;
  /** Still processing, sub-units */
  processing: number;
  failed: number;
}

export interface RiderLifetimeDto {
  completed: number;
  /** @format date-time */
  firstDeliveryAt?: string;
  /** @format date-time */
  lastDeliveryAt?: string;
  /** Distinct days with at least one completed delivery, ever */
  activeDays: number;
}

export interface RiderAdminInsightsResponseDto {
  range: InsightsRangeDto;
  /** When this rider completes deliveries (Lagos time) */
  workingHours: PeakHourCellDto[];
  cancellations: RiderCancellationsDto;
  locationChanges: RiderLocationChangesDto;
  withdrawals: RiderWithdrawalsDto;
  lifetime: RiderLifetimeDto;
}

export enum InsightsRangePreset {
  Today = "today",
  Week = "week",
  Month = "month",
  LastMonth = "last_month",
  Year = "year",
  All = "all",
}

export interface InsightsWindowDto {
  /** @format date-time */
  from: string;
  /** @format date-time */
  to: string;
}

export interface DeliveriesByTypeDto {
  single: number;
  batch: number;
  bulk: number;
}

export interface DeliveriesSummaryDto {
  /** Completed deliveries in the window */
  completed: number;
  /** Orders cancelled in the window (by anyone) */
  cancelled: number;
  /** Orders still in progress right now (not range-bound) */
  active: number;
  byType: DeliveriesByTypeDto;
  /** Completed deliveries in the previous window of the same length */
  previousCompleted: number;
  /** Percent change vs the previous window, one decimal */
  deltaPct: number;
}

export interface SpendSummaryDto {
  /** What the customer paid (sum of totalAmountPayable on paid orders) */
  total: number;
  /** Delivery fees portion (negotiated with riders) */
  deliveryFees: number;
  /** Platform service charges portion */
  serviceCharges: number;
  /** Saved through coupons/discounts */
  saved: number;
  /** Refunded back to the wallet in the window */
  refunded: number;
  /** Average paid per delivery */
  avgPerDelivery: number;
  previousTotal: number;
  deltaPct: number;
  /** @example "NGN" */
  currency: string;
}

export interface TimingSummaryDto {
  /** Average minutes from order creation to a rider accepting */
  avgAcceptMins: number;
  /** Average minutes from ride start to completion */
  avgDeliveryMins: number;
  /** Kilometres covered on completed deliveries */
  distanceKm: number;
}

export interface ActivityStreakDto {
  /** Consecutive calendar months (Lagos time) with at least one completed delivery, ending this month */
  months: number;
  /** @format date-time */
  lastDeliveryAt: string | null;
  /**
   * Account creation date
   * @format date-time
   */
  memberSince: string | null;
  /** Lifetime completed deliveries */
  lifetimeDeliveries: number;
}

export interface PlaceDto {
  type: "PICKUP" | "DROPOFF";
  address: string;
  latitude: number;
  longitude: number;
  /** Times this address was used */
  count: number;
  /** @format date-time */
  lastUsedAt: string;
}

export interface CustomerInsightsOverviewResponseDto {
  range: InsightsWindowDto;
  deliveries: DeliveriesSummaryDto;
  spend: SpendSummaryDto;
  timing: TimingSummaryDto;
  activity: ActivityStreakDto;
  /** Top three places in the window */
  topPlaces: PlaceDto[];
}

export interface InsightsSeriesPointDto {
  /** Bucket start, ISO */
  bucket: string;
  deliveries: number;
  /** Sub-units */
  spend: number;
}

export interface CustomerInsightsSeriesResponseDto {
  range: InsightsWindowDto;
  bucket: "day" | "week" | "month";
  points: InsightsSeriesPointDto[];
  /** @example "NGN" */
  currency: string;
}

export interface CustomerInsightsPlacesResponseDto {
  pickups: PlaceDto[];
  dropoffs: PlaceDto[];
}

export interface RecapHighlightDto {
  /** Stable key the app maps to an icon/copy, e.g. BUSIEST_DAY */
  key: string;
  title: string;
  value: string;
}

export interface CustomerInsightsRecapResponseDto {
  range: InsightsWindowDto;
  deliveries: DeliveriesSummaryDto;
  spend: SpendSummaryDto;
  timing: TimingSummaryDto;
  activity: ActivityStreakDto;
  /** Top three places in the window */
  topPlaces: PlaceDto[];
  /** @example "2026-09" */
  month: string;
  highlights: RecapHighlightDto[];
  /** True when the month has no activity at all */
  empty?: boolean;
}

export enum AchievementCategory {
  SINGLE = "SINGLE",
  BATCH = "BATCH",
  BULK = "BULK",
  WALLET = "WALLET",
  REFERRAL = "REFERRAL",
  SPECIAL = "SPECIAL",
}

export interface AchievementRewardDto {
  /** Percentage off the next delivery */
  percent: number;
  /** Cap in sub-units */
  maxDiscount: number;
  validityDays: number;
  /** Coupon code once issued */
  couponCode?: string;
  /** @format date-time */
  expiresAt?: string;
}

export interface CustomerAchievementDto {
  key: string;
  category: AchievementCategory;
  title: string;
  description: string;
  icon: string;
  target: number;
  /** Progress towards target, clamped */
  progress: number;
  /** Unit for the progress line, e.g. "single orders" */
  unit: string;
  status: "COMPLETED" | "IN_PROGRESS" | "PENDING";
  /** @format date-time */
  unlockedAt?: string;
  /** Unlocked but the celebration has not been shown yet */
  isNew: boolean;
  reward: AchievementRewardDto;
}

export interface CustomerAchievementsResponseDto {
  results: CustomerAchievementDto[];
  unlockedCount: number;
  /** Keys unlocked on this request — drive the celebration modal */
  newlyUnlocked: string[];
}

export interface AcknowledgeAchievementResponseDto {
  acknowledged: boolean;
}

export interface AdminAchievementDefinitionDto {
  key: string;
  category: AchievementCategory;
  title: string;
  description: string;
  icon: string;
  target: number;
  unit: string;
  tier: number;
  /** Reward percentage for this tier */
  rewardPercent: number;
  /** Customers who have unlocked it */
  unlockedCount: number;
  /** Unlocks in the last 30 days */
  unlocked30d: number;
  /** Reward coupons issued */
  rewardsIssued: number;
  /** Reward coupons redeemed */
  rewardsRedeemed: number;
  /** Discount granted through this badge, in sub-units */
  discountTotal: number;
}

export interface AchievementWindowDto {
  unlocks: number;
  rewardsIssued: number;
  rewardsRedeemed: number;
  /** Discount granted through rewards unlocked in the window, in sub-units */
  discount: number;
}

export interface AchievementBadgeRollupDto {
  key: string;
  title: string;
  category: string;
  tier: number;
  icon: string;
  /** Unlocks inside the window */
  unlocks: number;
  /** Unlocks in the window before */
  previousUnlocks: number;
  /** Unlocks, all time */
  lifetime: number;
  /** Rewards from window unlocks that were redeemed */
  rewardsRedeemed: number;
}

export interface AchievementsSummaryResponseDto {
  badges: number;
  /** Customers with at least one badge */
  customersWithBadges: number;
  /** Badges unlocked, all time */
  unlocksTotal: number;
  /** Badges unlocked in the last 30 days */
  unlocks30d: number;
  rewardsIssued: number;
  rewardsRedeemed: number;
  /** Issued, not redeemed, still valid */
  rewardsOutstanding: number;
  /** Discount granted through badge rewards, in sub-units */
  discountTotal: number;
  /** Reward percentages by tier */
  rewardPercentByTier: object;
  /** Cap on a reward discount, in sub-units */
  rewardMaxDiscount: number;
  rewardValidityDays: number;
  /** Unlocks per day, last 30 days: {date, count} */
  daily: object[];
  /** The window these figures cover: from, to, days, all */
  window: object;
  /** Unlocks, rewards and discount inside the window */
  current: AchievementWindowDto;
  /** The same figures for the window before, for trends */
  previous: AchievementWindowDto;
  /** Every badge with its unlocks in the window, most unlocked first */
  byBadge: AchievementBadgeRollupDto[];
}

export interface AdminAchievementUnlockDto {
  userId: string;
  key: string;
  title: string;
  category: AchievementCategory;
  /** @format date-time */
  unlockedAt: string;
  /** @format date-time */
  acknowledgedAt?: string;
  couponCode?: string;
  /** @format date-time */
  couponExpiresAt?: string;
  rewardState?: "REDEEMED" | "ACTIVE" | "EXPIRED" | "NONE";
  /** Discount the reward gave, in sub-units, once redeemed */
  discountAmount?: number;
  user?: object;
}

export interface ListAchievementUnlocksResponseDto {
  nextPage?: number;
  previousPage?: number;
  currentPage: number;
  results: AdminAchievementUnlockDto[];
  perPageLimit: number;
  totalRecords: number;
  totalPages: number;
}

export interface AdminCustomerAchievementsResponseDto {
  results: CustomerAchievementDto[];
  unlockedCount: number;
  /** The lifetime stats every badge is judged on */
  stats: object;
}

export interface GrantAchievementRequestDto {
  /** Badge key from the catalogue */
  key: string;
  /**
   * Why it was granted by hand (audit trail)
   * @maxLength 500
   */
  reason?: string;
}

/** Required for customer/rider/business logins. Optional for the admin console: any platform staff role signs in. */
export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
  PLATFORM_ADMIN = "PLATFORM_ADMIN",
  PLATFORM_RIDER = "PLATFORM_RIDER",
  PLATFORM_OPERATION = "PLATFORM_OPERATION",
  PLATFORM_FINANCE = "PLATFORM_FINANCE",
  PLATFORM_BUSINESS = "PLATFORM_BUSINESS",
  PLATFORM_MANAGER = "PLATFORM_MANAGER",
  DEVELOPER = "DEVELOPER",
  BUSINESS_ADMIN = "BUSINESS_ADMIN",
  BUSINESS_USER = "BUSINESS_USER",
  BUSINESS_RIDER = "BUSINESS_RIDER",
}

export interface LoginRequestDto {
  identifier: string;
  /** @minLength 8 */
  password: string;
  /** Required for customer/rider/business logins. Optional for the admin console: any platform staff role signs in. */
  role?: Role;
  /** @default "USER" */
  accessType?: string;
}

export interface AuthTokenResponseDto {
  accessToken: string;
  /**
   * Seconds until accessToken expires.
   * @example 2592000
   */
  expiryDurationSeconds: number;
  refreshToken: string;
}

export interface VerifyPhoneRequestDto {
  phone: string;
  /** @minLength 4 */
  code: string;
  /** @minLength 2 */
  countryCode?: string;
}

export interface VerifyEmailRequestDto {
  email: string;
  /** @minLength 4 */
  code: string;
  /** @minLength 2 */
  countryCode?: string;
}

export interface TokenRequestDto {
  identifier: string;
  /** @minLength 2 */
  countryCode?: string;
}

export interface MessageResponseDto {
  message: string;
}

export interface ResetPasswordRequestDto {
  identifier: string;
  /** @minLength 4 */
  code: string;
  /** @minLength 8 */
  password: string;
  /** @minLength 2 */
  countryCode?: string;
}

export interface CheckTokenResponseDto {
  status: boolean;
}

export interface GoogleSignInRequestDto {
  idToken: string;
}

export interface CountryDto {
  name: string;
  /**
   * @minLength 2
   * @maxLength 3
   */
  code: string;
  /**
   * @minLength 3
   * @maxLength 3
   */
  currency: string;
}

export enum UserSignUpRoles {
  USER = "USER",
  PLATFORM_RIDER = "PLATFORM_RIDER",
  DEVELOPER = "DEVELOPER",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export interface CreateUserRequestDto {
  /** @minLength 3 */
  firstname: string;
  /** @minLength 3 */
  lastname: string;
  email: string;
  phone: string;
  /** @minLength 3 */
  password: string;
  country: CountryDto;
  /** @minLength 3 */
  role: UserSignUpRoles;
  photo?: string;
  businessId?: string;
  gender?: Gender;
  referralCode?: string;
  /** @default false */
  isVendor?: boolean;
  businessName?: string;
}

export interface AddressDetailDto {
  country: string;
  state: string;
  lga: string;
  name: string;
  latitude: number;
  longitude: number;
  branchName?: string;
  landmark?: string;
}

export interface AddressesDetailDto {
  home?: AddressDetailDto;
  work?: AddressDetailDto;
}

export interface PreferenceDetailsDto {
  onboarding: {
    /** @default true */
    priceSuggestion?: boolean;
    /** @default 0 */
    minus?: number;
    /** @default 0 */
    plus?: number;
  };
  notification: {
    /** @default true */
    email?: boolean;
    /** @default true */
    push?: boolean;
    /** @default true */
    sms?: boolean;
  };
  bidding: {
    /** @default true */
    priceSuggestion?: boolean;
    /** @default 0 */
    minus?: number;
    /** @default 0 */
    plus?: number;
  };
  orderRequestNotification: {
    /** @default true */
    vibration?: boolean;
    /** @default true */
    sound?: boolean;
  };
  goals: {
    weeklyEarningsTarget?: number;
  };
}

export interface BusinessDetailsSchemaDto {
  /** @format date-time */
  registeredDate: string;
  registeredAddress: string;
  registrationNumber: string;
  proofOfBusinessAddress: string;
}

export interface CountrySchemaDto {
  name: string;
  code: string;
  currency: string;
}

export interface UserDetailsSchemaDto {
  firstname: string;
  middlename: string;
  lastname: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  bvn: string;
  nin: string;
  address: string;
  nationality: CountrySchemaDto;
  idCardType: string;
  idNumber: string;
  idCardDoc: string;
  /** @format date-time */
  idExpiryDate: string;
  /** @format date-time */
  idIssuedDate: string;
}

export interface KYCDetailsSchemaDto {
  businessDetails: BusinessDetailsSchemaDto;
  managerDetails: UserDetailsSchemaDto;
  /** @default "PENDING" */
  status: "APPROVE" | "DISAPPROVE" | "SUSPENDED" | "SUBMITTED" | "PENDING";
  statusComment: string;
}

export interface WithdrawalRestriction {
  active: boolean;
  /** Required when restricted is true. */
  reason?: WithdrawalRestrictionReason;
  /** @maxLength 280 */
  note?: string;
  /** @format date-time */
  restrictedAt?: string;
  /** Admin who restricted. Never sent to the rider. */
  restrictedBy?: string;
  /** @format date-time */
  liftedAt?: string;
  /** Admin who lifted. Never sent to the rider. */
  liftedBy?: string;
}

export interface ReviewDetailsDto {
  average?: number;
  count?: number;
}

export interface User {
  /**
   * @minLength 3
   * @maxLength 256
   */
  firstname: string;
  /**
   * @minLength 3
   * @maxLength 256
   */
  lastname: string;
  /**
   * @minLength 3
   * @maxLength 256
   */
  middlename?: string;
  email: string;
  phone: string;
  googleId?: string;
  businessId?: string;
  addresses?: AddressesDetailDto;
  /** @default false */
  phoneVerified: boolean;
  pendingPhone?: string;
  /** @default false */
  emailVerified: boolean;
  gender?: string;
  dob?: string;
  nin?: string;
  /** @default false */
  ninVerified: boolean;
  voterCard?: string;
  /** @default false */
  voterCardVerified: boolean;
  driversLicense?: string;
  driversLicenseDoc?: string;
  /** @default "PENDING" */
  driversLicenseVerified: "APPROVE" | "DISAPPROVE" | "SUSPENDED" | "SUBMITTED" | "PENDING";
  driversLicenseVerifiedComment?: string;
  /** @default "USER" */
  accessType: "USER" | "ADMIN";
  proofOfAddress?: string;
  /** @default false */
  proofOfAddressVerified: boolean;
  /** @default false */
  isOnline: boolean;
  /** @default "ACTIVE" */
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "BANNED";
  roles: (
    | "USER"
    | "ADMIN"
    | "SUPER_ADMIN"
    | "PLATFORM_ADMIN"
    | "PLATFORM_RIDER"
    | "PLATFORM_OPERATION"
    | "PLATFORM_FINANCE"
    | "PLATFORM_BUSINESS"
    | "PLATFORM_MANAGER"
    | "DEVELOPER"
    | "BUSINESS_ADMIN"
    | "BUSINESS_USER"
    | "BUSINESS_RIDER"
  )[];
  referredBy?: string;
  referralCode?: string;
  preferences?: PreferenceDetailsDto;
  achievements?: object;
  /** @default false */
  dispatchPaused?: boolean;
  /** @format date-time */
  dispatchPausedAt?: string;
  dispatchPausedReason?: string;
  /** @default false */
  isTestRider?: boolean;
  withdrawalRestriction?: WithdrawalRestriction;
  adminPreferences?: object;
  photo?: string;
  country: {
    name?: string;
    code?: string;
    currency?: string;
  };
  state: {
    name?: string;
    code?: string;
  };
  city: {
    name?: string;
    code?: string;
  };
  location: {
    /** @default "Point" */
    type?: string;
    coordinates?: number[];
  };
  /** @format date-time */
  locationUpdatedAt?: string;
  locationHeading?: number;
  pushToken?: string;
  /** @default 0 */
  supportUnreadCount: number;
  /** @default false */
  isDeleted: boolean;
  /** @default false */
  isRider: boolean;
  /** @default false */
  isVendor: boolean;
  /** @format date-time */
  lastLoginDate?: string;
  recipientCode?: string;
  /** @format date-time */
  emailVerifiedAt?: string;
  /** @format date-time */
  phoneVerifiedAt?: string;
  /** @format date-time */
  passwordUpdatedAt?: string;
  business?: Business;
  reviews?: ReviewDetailsDto;
  _id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt?: string;
  /** @format date-time */
  walletTermsAcknowledgedAt?: string;
}

export interface Vehicle {
  name: string;
  plateNumber: string;
  color?: string;
  model: string;
  make: string;
  engineNumber: string;
  chasisNumber: string;
  businessId?: string;
  userId?: string;
  photos?: string[];
  /** @default "PENDING" */
  status: "PENDING" | "VERIFIED" | "REJECTED" | "SUSPENDED";
  statusComment?: string;
  /** @format date-time */
  verifiedAt?: string;
  /** @default false */
  isDeleted: boolean;
  /** @format date-time */
  deletedAt?: string;
  business?: Business;
  user?: User;
  _id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface Business {
  name: string;
  userId: string;
  branchName?: string;
  photo?: string;
  phone: string;
  businessHandle?: string;
  email: string;
  pushToken?: string;
  /** @default true */
  isActive: boolean;
  address: {
    country?: string;
    state?: string;
    lga?: string;
    name?: string;
    latitude?: number;
    longitude?: number;
    branchName?: string;
    landmark?: string;
  };
  website?: string;
  webhook?: string;
  kycDetails?: KYCDetailsSchemaDto;
  location: {
    /** @default "Point" */
    type?: string;
    coordinates?: number[];
  };
  users?: string[];
  vehicles: Vehicle[];
  aboutMe?: string;
  country: {
    name?: string;
    code?: string;
    currency?: string;
  };
  state: {
    name?: string;
    code?: string;
  };
  city: {
    name?: string;
    code?: string;
  };
  /** @default "PARTNER" */
  type: "BANKING" | "CLIENT" | "PARTNER" | "SUPPLIER" | "MERCHANT" | "AGENCY_BANKING" | "PICKRIDERS_AGENT";
  /** @default false */
  isDeleted: boolean;
  /** @format date-time */
  deletedAt?: string;
  /** @default "ON_REQUEST" */
  businessType: "AUTO_PILOT" | "ON_REQUEST";
  preferences?: PreferenceDetailsDto;
  profileUser?: object;
  _id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface WithdrawalRestrictionViewDto {
  /** true while withdrawals are paused on this account. */
  active: boolean;
  /** Required when restricted is true. */
  reason?: WithdrawalRestrictionReason | null;
  /** Friendly sentence for the reason, ready to display. */
  message?: string | null;
  /** Optional note from the admin, shown under the message. */
  note?: string | null;
  /** @format date-time */
  restrictedAt?: string | null;
}

export interface UserProfileResponseDto {
  /**
   * @minLength 3
   * @maxLength 256
   */
  firstname: string;
  /**
   * @minLength 3
   * @maxLength 256
   */
  lastname: string;
  /**
   * @minLength 3
   * @maxLength 256
   */
  middlename?: string;
  email: string;
  phone: string;
  googleId?: string;
  businessId?: string;
  addresses?: AddressesDetailDto;
  /** @default false */
  phoneVerified: boolean;
  pendingPhone?: string;
  /** @default false */
  emailVerified: boolean;
  gender?: string;
  dob?: string;
  nin?: string;
  /** @default false */
  ninVerified: boolean;
  voterCard?: string;
  /** @default false */
  voterCardVerified: boolean;
  driversLicense?: string;
  driversLicenseDoc?: string;
  /** @default "PENDING" */
  driversLicenseVerified: "APPROVE" | "DISAPPROVE" | "SUSPENDED" | "SUBMITTED" | "PENDING";
  driversLicenseVerifiedComment?: string;
  /** @default "USER" */
  accessType: "USER" | "ADMIN";
  proofOfAddress?: string;
  /** @default false */
  proofOfAddressVerified: boolean;
  /** @default false */
  isOnline: boolean;
  /** @default "ACTIVE" */
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "BANNED";
  roles: (
    | "USER"
    | "ADMIN"
    | "SUPER_ADMIN"
    | "PLATFORM_ADMIN"
    | "PLATFORM_RIDER"
    | "PLATFORM_OPERATION"
    | "PLATFORM_FINANCE"
    | "PLATFORM_BUSINESS"
    | "PLATFORM_MANAGER"
    | "DEVELOPER"
    | "BUSINESS_ADMIN"
    | "BUSINESS_USER"
    | "BUSINESS_RIDER"
  )[];
  referredBy?: string;
  referralCode?: string;
  preferences?: PreferenceDetailsDto;
  achievements?: object;
  /** @default false */
  dispatchPaused?: boolean;
  /** @format date-time */
  dispatchPausedAt?: string;
  dispatchPausedReason?: string;
  /** @default false */
  isTestRider?: boolean;
  adminPreferences?: object;
  photo?: string;
  country: {
    name?: string;
    code?: string;
    currency?: string;
  };
  state: {
    name?: string;
    code?: string;
  };
  city: {
    name?: string;
    code?: string;
  };
  location: {
    /** @default "Point" */
    type?: string;
    coordinates?: number[];
  };
  /** @format date-time */
  locationUpdatedAt?: string;
  locationHeading?: number;
  pushToken?: string;
  /** @default 0 */
  supportUnreadCount: number;
  /** @default false */
  isDeleted: boolean;
  /** @default false */
  isRider: boolean;
  /** @default false */
  isVendor: boolean;
  /** @format date-time */
  lastLoginDate?: string;
  recipientCode?: string;
  /** @format date-time */
  emailVerifiedAt?: string;
  /** @format date-time */
  phoneVerifiedAt?: string;
  /** @format date-time */
  passwordUpdatedAt?: string;
  business?: Business;
  reviews?: ReviewDetailsDto;
  _id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt?: string;
  /** @format date-time */
  walletTermsAcknowledgedAt?: string;
  withdrawalRestriction?: WithdrawalRestrictionViewDto;
}

export interface UpdateProfileRequestDto {
  firstname?: string;
  lastname?: string;
  pushToken?: string;
  /** Referral code of another user (e.g. for Google sign-in users who skipped registration). Same logic as registration. */
  referralCode?: string;
  /** Whether the user is a vendor */
  isVendor?: boolean;
}

export interface UpdateLocationRequestDto {
  longitude: number;
  latitude: number;
  state?: string;
  stateCode?: string;
  /**
   * Heading in degrees, 0 = north (riders, for live tracking).
   * @min 0
   * @max 360
   */
  heading?: number;
}

export interface UpdatePhotoRequestDto {
  photo: string;
}

export interface UpdatedPhotoResponseDto {
  photo: string;
}

export interface AddressDto {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  state?: string;
  lga?: string;
  branchName?: string;
  landmark?: string;
}

export interface UpdateAddressesRequestDto {
  home?: AddressDto | null;
  work?: AddressDto | null;
}

export interface UserKYCDetailDto {
  firstname: string;
  lastname: string;
  bankName: string;
  accountNumber: string;
}

export interface ChangePasswordRequestDto {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface Wallet {
  entityId: string;
  name: string;
  entityType: EntityType;
  currency: string;
  countryCode: string;
  status: "ACTIVE" | "SUSPENDED" | "DISABLED";
  /** @default 0 */
  balance: number;
  /** @default false */
  isDefault: boolean;
  /** @default 0 */
  held: number;
  /** @default true */
  livemode?: boolean;
  settlement: {
    bankName?: string;
    bankCode?: string;
    accountName?: string;
    accountNumber?: string;
    recipientCode?: string;
    /** @default "nuban" */
    recipientType?: "nuban" | "ghipss" | "mobile_money";
    /** @default false */
    isVerified?: boolean;
  };
  _id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface WalletListResponseDto {
  nextPage?: number | null;
  previousPage?: number | null;
  currentPage: number;
  results: Wallet[];
  perPageLimit: number;
  totalRecords: number;
  totalPages: number;
}

export enum PaymentProvider {
  PAYSTACK = "PAYSTACK",
  FLUTTERWAVE = "FLUTTERWAVE",
}

export interface FundWalletRequestDto {
  /** @min 100 */
  amount: number;
  provider: PaymentProvider;
}

export interface FundWalletResponseDto {
  /**
   * Field to determine if the process failed or was successful
   * @example true
   */
  success: boolean;
  /**
   * The payment link generated from the payment gateway provider
   * @example "https://example.com"
   */
  payment_url: string;
  /**
   * The unique string bind to this transaction from the payment gateway provider
   * @example "0abcde12345"
   */
  reference?: string;
}

export interface CancelFundWalletRequestDto {
  /**
   * The reference returned when the wallet funding was initialized
   * @example "0abcde12345"
   */
  reference: string;
}

export interface CancelFundWalletResponseDto {
  /**
   * True when the pending deposit was cancelled; false when the payment had actually gone through
   * @example true
   */
  success: boolean;
  /**
   * Outcome of the cancel: 'cancelled' (deposit voided) or 'paid' (payment completed, left for the webhook)
   * @example "cancelled"
   */
  status: string;
}

export interface UpdateSettlementAccountRequestDto {
  bankName: string;
  bankCode: string;
  /**
   * @minLength 10
   * @maxLength 15
   */
  accountNumber: string;
}

export interface InitiateWithdrawalRequestDto {
  /** @min 10000 */
  amount: number;
}

export interface Coupon {
  code: string;
  name?: string;
  description?: string;
  currency: string;
  type: string;
  value: number;
  /** Cap on a PERCENTAGE discount, in sub-units */
  maxDiscount?: number;
  /** @format date-time */
  expirationDate: string;
  isActive?: boolean;
  usageCount?: number;
  limit: number;
  isOneTime?: boolean;
  isGeneral?: boolean;
  _id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface ReferralReferredUserDto {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  photo?: string;
  /**
   * When the referred user joined (registered)
   * @format date-time
   */
  dateJoined: string;
}

export interface ReferralItemResponseDto {
  referredUser: ReferralReferredUserDto;
  /** Number of completed orders by the referred user */
  completedOrders: number;
  /** PENDING = not yet earned, EARNED = referee was credited */
  status: "PENDING" | "EARNED";
  /** Amount (in smallest currency unit) for this referral */
  value: number;
  /**
   * When the referee was credited (only when status is EARNED)
   * @format date-time
   */
  earnedAt?: string;
}

export interface ListReferralsResponseDto {
  nextPage?: number | null;
  previousPage?: number | null;
  currentPage: number;
  /** Paginated list of referrals */
  results: ReferralItemResponseDto[];
  perPageLimit: number;
  totalRecords: number;
  totalPages: number;
  /** Total amount (smallest currency unit) the user has earned from referrals */
  totalEarnedFromReferrals: number;
}

export interface TransactionSummaryResponseDto {
  total: number;
}

export interface UpdatePhoneRequestDto {
  phone: string;
}

export interface UpdateEmailRequestDto {
  email: string;
}

export interface NotificationDto {
  email?: boolean;
  pushNotification?: boolean;
  sms?: boolean;
}

export interface BiddingDto {
  priceSuggestion?: boolean;
  minus?: number;
  plus?: number;
}

export interface OrderRequestNotificationDto {
  vibration?: boolean;
  sound?: boolean;
}

export interface GoalsDto {
  /**
   * Weekly net earnings target, sub-units
   * @min 0
   */
  weeklyEarningsTarget?: number;
}

export interface UpdatePreferencesRequestDto {
  notification?: NotificationDto;
  bidding?: BiddingDto;
  orderRequestNotification?: OrderRequestNotificationDto;
  onboarding?: object;
  goals?: GoalsDto;
}

export interface OrderRecipient {
  name: string;
  phone: string;
  confirmationCode: string;
  /** @default "PENDING" */
  status: "PENDING" | "IN_TRANSIT" | "COMPLETED" | "CANCELLED" | "ARRIVED";
  /** @format date-time */
  completedAt?: string;
  _id?: string;
}

export interface OrderLocation {
  orderId?: string;
  type: "PICKUP" | "DROPOFF";
  /** @default "PENDING" */
  status: "PENDING" | "IN_TRANSIT" | "COMPLETED" | "CANCELLED" | "ARRIVED";
  cancelledBy?: "USER" | "RIDER" | "ADMIN";
  address: string;
  position: {
    /** @default "Point" */
    type?: string;
    coordinates?: number[];
  };
  packageName?: string;
  description?: string;
  livemode?: boolean;
  packageValue?: number;
  category?: string;
  receiverName?: string;
  receiverPhone?: string;
  senderName?: string;
  senderPhone?: string;
  senderPhoto?: string;
  amountTo: number;
  distanceTo: number;
  currency: string;
  confirmationCode?: string;
  recipients?: OrderRecipient[];
  /** @format date-time */
  startedAt?: string;
  /** @format date-time */
  arrivedAt?: string;
  /** @format date-time */
  completedAt?: string;
  completedPosition?: object;
  /** @format date-time */
  cancelledAt?: string;
  cancellationReason?: string;
  nextId?: string;
  previousId?: string;
  /** @default false */
  isOrigin: boolean;
  /** @default false */
  isDestination: boolean;
  locationChangeLocked?: boolean;
  _id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface OrderLocationUpdate {
  orderId: string;
  locationId: string;
  requestedBy: string;
  /** @default "PENDING" */
  status: "PENDING" | "ACCEPTED" | "DECLINED" | "EXPIRED" | "CANCELLED";
  oldAddress: string;
  oldPosition: object;
  oldAmountTo: number;
  oldDistanceTo: number;
  newAddress: string;
  newPosition: object;
  newAmountTo: number;
  newDistanceTo: number;
  /** @default 0 */
  deltaAmount: number;
  /** @default false */
  detailsOnly: boolean;
  /** @format date-time */
  expiresAt?: string;
  currency: string;
  chargeTransactionId?: string;
  refundTransactionId?: string;
  /** @format date-time */
  respondedAt?: string;
  order?: Order;
  location?: OrderLocation;
  _id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface Review {
  userId: string;
  riderId: string;
  orderId: string;
  comment?: string;
  /**
   * @min 1
   * @max 5
   */
  rating: number;
  _id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface OrderLastRiderRelease {
  riderId: string;
  initiatedBy: "RIDER" | "OWNER" | "ADMIN";
  reason: string;
  note?: string;
  /** True when it counted as the rider's cancellation */
  counted: boolean;
  /** True when the rider released it after arriving at the pickup (always counted) */
  arrivedAtPickup?: boolean;
  /** @format date-time */
  at: string;
}

export interface Order {
  userId?: string;
  riderId?: string;
  eligibleRiderIds?: string[];
  vehicleId?: string;
  couponId?: string;
  businessId?: string;
  teamId?: string;
  /** @default true */
  livemode?: boolean;
  reference?: string;
  metadata?: object;
  quoteId?: string;
  developerDispatch?: "auto" | "manual";
  /** @format date-time */
  developerDispatchedAt?: string;
  testOptions?: object;
  developerBidding?: object;
  transactionIds?: string[];
  type: "SINGLE" | "BATCH" | "BULK";
  /** @default "INITIATED" */
  status: "INITIATED" | "ACCEPTED" | "ON_GOING" | "COMPLETED" | "CANCELLED";
  /** @default "PENDING" */
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  cancelledBy?: "USER" | "RIDER" | "ADMIN";
  /** @default 0 */
  totalAmount?: number;
  /** @default 0 */
  discount?: number;
  /** @default 0 */
  discountAmount?: number;
  /** @default "PERCENTAGE" */
  discountType?: "FIXED" | "PERCENTAGE";
  /** @default 0 */
  serviceCharge?: number;
  /** @default 0 */
  totalAmountPayable?: number;
  totalLocations: number;
  /** @default 0 */
  confirmedLocations?: number;
  /** @default 0 */
  cancelledLocations?: number;
  /** @default 0 */
  ongoingLocations?: number;
  /** @format date-time */
  startedAt?: string;
  /** @format date-time */
  paidDate?: string;
  /** @format date-time */
  acceptedAt?: string;
  /** @format date-time */
  completedAt?: string;
  /** @format date-time */
  cancelledAt?: string;
  cancellationReason?: string;
  locations?: OrderLocation[];
  orderNumber: string;
  /** @default false */
  isScheduled: boolean;
  /** @default false */
  autoAcceptOffer: boolean;
  /** @default 0 */
  minimumOfferPercentage: number;
  /** @default 40 */
  maxRiderSurgePercentage: number;
  negotiatedAmount: number;
  offers: Offer[];
  locationUpdates?: OrderLocationUpdate[];
  currency: string;
  /** @format date-time */
  scheduledFor?: string;
  countryCode?: string;
  stateCode?: string;
  /** @format date-time */
  scheduleDispatchedAt?: string;
  /** @format date-time */
  scheduleLastRungAt?: string;
  scheduleRingCount?: number;
  scheduleRemindersSent?: string[];
  color?: string;
  title?: string;
  isQueued?: boolean;
  /** @format date-time */
  queuedAt?: string;
  business?: Business;
  user?: User;
  vehicle?: Vehicle;
  rider?: User;
  coupon?: Coupon;
  transactions?: Transaction[];
  review?: Review;
  channel?: string;
  storefrontVendorId?: string;
  /** @default 0 */
  foodValue?: number;
  /** @default 0 */
  vendorCommissionRate?: number;
  callbackUrl?: string;
  dispatchState?: object;
  /** @format date-time */
  tripPaidAt?: string;
  tripPayRiderId?: string;
  tripPayAmount?: number;
  riderReleaseCount?: number;
  lastRiderRelease?: OrderLastRiderRelease;
  /** Rider view: the order is accepted and the pickup is not done, so the rider may release it */
  canRelease?: boolean;
  /**
   * Rider view: until when a release is free (2 minutes after accepting); null once it counts, including as soon as the rider has arrived at the pickup
   * @format date-time
   */
  releaseFreeUntil?: string | null;
  /** Rider view: counted releases the rider has left today */
  releasesLeftToday?: number;
  paymentToken?: string;
  externalPaymentReference?: string;
  externalPaymentUrl?: string;
  _id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface Offer {
  orderId: string;
  riderId: string;
  /** @default "PENDING" */
  status: "PENDING" | "REJECTED" | "ACCEPTED";
  amount: number;
  /** @format date-time */
  expiresAt?: string;
  /** @format date-time */
  expiredAt?: string;
  order?: Order;
  rider?: User;
  _id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface SubmitDriversLicenseRequestDto {
  licenseNumber: string;
  licenseDocument?: string;
  businessId?: string;
}

export interface ListUserResponseDto {
  nextPage?: number | null;
  previousPage?: number | null;
  currentPage: number;
  results: User[];
  perPageLimit: number;
  totalRecords: number;
  totalPages: number;
}

export interface UpdateAdminPreferencesRequestDto {
  theme?: "light" | "dark" | "system";
  /**
   * Font id from the admin font list.
   * @maxLength 80
   */
  font?: string;
  /** Attention signals this admin has just looked at, keyed by signal, value an ISO time. Known keys: messagingFailures, transactionFailures. */
  seen?: object;
}

export interface UpdateUserPhoneRequestDto {
  /**
   * New phone number in E.164 (+234...) or local (0803...) form.
   * @pattern /^\+?\d{10,15}$/
   */
  phone: string;
  /** Why the number was changed (audited). */
  reason?: string;
}

export interface UpdateDispatchPauseRequestDto {
  /** true stops every order from ringing this rider; false resumes. */
  paused: boolean;
  /** Why (audited, shown on the rider record). */
  reason?: string;
}

export interface UpdateWithdrawalRestrictionRequestDto {
  /** true pauses withdrawals on this account; false lifts the restriction. */
  restricted: boolean;
  /** Required when restricted is true. */
  reason?: WithdrawalRestrictionReason;
  /**
   * Optional note shown to the rider in the app. Audited.
   * @maxLength 280
   */
  note?: string;
}

export interface AdminUserProfileResponseDto {
  /**
   * @minLength 3
   * @maxLength 256
   */
  firstname: string;
  /**
   * @minLength 3
   * @maxLength 256
   */
  lastname: string;
  /**
   * @minLength 3
   * @maxLength 256
   */
  middlename?: string;
  email: string;
  phone: string;
  googleId?: string;
  businessId?: string;
  addresses?: AddressesDetailDto;
  /** @default false */
  phoneVerified: boolean;
  pendingPhone?: string;
  /** @default false */
  emailVerified: boolean;
  gender?: string;
  dob?: string;
  nin?: string;
  /** @default false */
  ninVerified: boolean;
  voterCard?: string;
  /** @default false */
  voterCardVerified: boolean;
  driversLicense?: string;
  driversLicenseDoc?: string;
  /** @default "PENDING" */
  driversLicenseVerified: "APPROVE" | "DISAPPROVE" | "SUSPENDED" | "SUBMITTED" | "PENDING";
  driversLicenseVerifiedComment?: string;
  /** @default "USER" */
  accessType: "USER" | "ADMIN";
  proofOfAddress?: string;
  /** @default false */
  proofOfAddressVerified: boolean;
  /** @default false */
  isOnline: boolean;
  /** @default "ACTIVE" */
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "BANNED";
  roles: (
    | "USER"
    | "ADMIN"
    | "SUPER_ADMIN"
    | "PLATFORM_ADMIN"
    | "PLATFORM_RIDER"
    | "PLATFORM_OPERATION"
    | "PLATFORM_FINANCE"
    | "PLATFORM_BUSINESS"
    | "PLATFORM_MANAGER"
    | "DEVELOPER"
    | "BUSINESS_ADMIN"
    | "BUSINESS_USER"
    | "BUSINESS_RIDER"
  )[];
  referredBy?: string;
  referralCode?: string;
  preferences?: PreferenceDetailsDto;
  achievements?: object;
  /** @default false */
  dispatchPaused?: boolean;
  /** @format date-time */
  dispatchPausedAt?: string;
  dispatchPausedReason?: string;
  /** @default false */
  isTestRider?: boolean;
  adminPreferences?: object;
  photo?: string;
  country: {
    name?: string;
    code?: string;
    currency?: string;
  };
  state: {
    name?: string;
    code?: string;
  };
  city: {
    name?: string;
    code?: string;
  };
  location: {
    /** @default "Point" */
    type?: string;
    coordinates?: number[];
  };
  /** @format date-time */
  locationUpdatedAt?: string;
  locationHeading?: number;
  pushToken?: string;
  /** @default 0 */
  supportUnreadCount: number;
  /** @default false */
  isDeleted: boolean;
  /** @default false */
  isRider: boolean;
  /** @default false */
  isVendor: boolean;
  /** @format date-time */
  lastLoginDate?: string;
  recipientCode?: string;
  /** @format date-time */
  emailVerifiedAt?: string;
  /** @format date-time */
  phoneVerifiedAt?: string;
  /** @format date-time */
  passwordUpdatedAt?: string;
  business?: Business;
  reviews?: ReviewDetailsDto;
  _id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt?: string;
  /** @format date-time */
  walletTermsAcknowledgedAt?: string;
  withdrawalRestriction?: AdminWithdrawalRestrictionViewDto;
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
  BANNED = "BANNED",
}

export interface UpdateUserStatusRequestDto {
  status: UserStatus;
  /** Optional note explaining the status change (audited). */
  reason?: string;
}

/** CREDIT tops up, DEBIT deducts. */
export enum TransactionType {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}

export interface AdjustWalletRequestDto {
  /**
   * Amount in sub-units (e.g. 10000 = ₦1).
   * @min 1
   */
  amount: number;
  /** CREDIT tops up, DEBIT deducts. */
  type: TransactionType;
  /** Reason for the manual adjustment (audited). */
  reason: string;
}

export interface RefundOrderRequestDto {
  /** Id of the order being refunded. */
  orderId: string;
  /**
   * Amount in sub-units. Defaults to the full order value.
   * @min 1
   */
  amount?: number;
  /** Reason for the refund (audited). */
  reason: string;
}

/** @default "ACCEPTED" */
export enum Status {
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  ACCEPTED = "ACCEPTED",
}

export interface UpdateDriverLicenseRequestDto {
  status: Status;
  comment?: string;
}

export interface WalletCreateRequestDto {
  currency: string;
  /**
   * @minLength 2
   * @maxLength 2
   */
  countryCode: string;
  entityId: string;
  entityType: EntityType;
}

export enum CouponLifecycle {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  EXHAUSTED = "EXHAUSTED",
  INACTIVE = "INACTIVE",
}

export enum CouponType {
  FIXED = "FIXED",
  PERCENTAGE = "PERCENTAGE",
}

export interface AdminCouponDto {
  code: string;
  name?: string;
  description?: string;
  currency: string;
  type: string;
  value: number;
  /** Cap on a PERCENTAGE discount, in sub-units */
  maxDiscount?: number;
  /** @format date-time */
  expirationDate: string;
  isActive?: boolean;
  usageCount?: number;
  limit: number;
  isOneTime?: boolean;
  isGeneral?: boolean;
  _id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  lifecycle: CouponLifecycle;
  /** Sum of discounts granted on orders that used this coupon, in sub-units */
  discountTotal: number;
  /** Distinct customers who redeemed it */
  uniqueUsers: number;
  /** @format date-time */
  lastUsedAt?: string;
  /** Groups the coupon is attached to */
  groupNames: string[];
  /** Issued automatically as a badge reward */
  isReward: boolean;
}

export interface ListCouponsResponseDto {
  nextPage?: number;
  previousPage?: number;
  currentPage: number;
  results: AdminCouponDto[];
  perPageLimit: number;
  totalRecords: number;
  totalPages: number;
}

export interface CouponsWindowDto {
  redemptions: number;
  /** Discount granted, in sub-units */
  discount: number;
  /** Coupons created */
  newCoupons: number;
}

export interface CouponsSummaryResponseDto {
  total: number;
  active: number;
  /** Active coupons expiring within 7 days */
  expiring7d: number;
  /** Redemptions in the last 30 days */
  redemptions30d: number;
  /** Redemptions, all time */
  redemptionsTotal: number;
  /** Discount granted in the last 30 days, in sub-units */
  discount30d: number;
  /** Discount granted, all time, in sub-units */
  discountTotal: number;
  /** Badge reward coupons issued */
  rewardCoupons: number;
  /** Badge reward coupons redeemed */
  rewardCouponsRedeemed: number;
  /** The window daily, topCoupons, current and previous cover: from, to, days, all */
  window: object;
  /** Redemptions, discount and coupons created inside the window */
  current: CouponsWindowDto;
  /** The same figures for the window before, for trends */
  previous: CouponsWindowDto;
  /** Redemptions per day across the window: {date, count, discount} */
  daily: object[];
  /** Top coupons by redemptions in the window */
  topCoupons: object[];
}

export interface AdminCouponGroupDto {
  name: string;
  userIds?: string[];
  couponIds?: string[];
  users: User[];
  coupons: Coupon[];
  userCount: number;
  couponCount: number;
}

export interface ListCouponGroupsResponseDto {
  nextPage?: number;
  previousPage?: number;
  currentPage: number;
  results: AdminCouponGroupDto[];
  perPageLimit: number;
  totalRecords: number;
  totalPages: number;
}

export interface AdminCouponUsageDto {
  couponId: string;
  userId: string;
  orderId: string;
  coupon?: Coupon;
  user?: User;
  order?: Coupon;
  /** Discount applied on the order, in sub-units */
  discountAmount?: number;
}

export interface ListCouponUsagesResponseDto {
  nextPage?: number;
  previousPage?: number;
  currentPage: number;
  results: AdminCouponUsageDto[];
  perPageLimit: number;
  totalRecords: number;
  totalPages: number;
}

export interface UpdateCouponRequestDto {
  /**
   * @minLength 4
   * @maxLength 80
   */
  name?: string;
  /** @maxLength 500 */
  description?: string;
  /** @format date-time */
  expirationDate?: string;
  /**
   * Total redemptions allowed
   * @min 1
   */
  limit?: number;
  /**
   * Cap on a PERCENTAGE discount, in sub-units
   * @min 1
   */
  maxDiscount?: number;
  /** Pause (false) or resume (true) redemptions */
  isActive?: boolean;
  isGeneral?: boolean;
  isOneTime?: boolean;
}

export interface UpdateGroupRequestDto {
  /** @minLength 6 */
  name?: string;
  /** Replaces the coupons attached to this group */
  couponCodes?: string[];
}

export interface CreateCouponRequestDto {
  code: string;
  name?: string;
  description?: string;
  /** @default "NGN" */
  currency: string;
  type: CouponType;
  /** @default 10 */
  value: number;
  /** Cap on a PERCENTAGE discount, in sub-units */
  maxDiscount?: number;
  /** @format date-time */
  expirationDate: string;
  isActive?: boolean;
  /** @default 100 */
  limit: number;
  isOneTime?: boolean;
  /** @default false */
  isGeneral?: boolean;
}

export interface CreateGroupRequestDto {
  name: string;
  userIds?: string[];
  couponCodes: string[];
}

export interface UpdateGroupUsersRequestDto {
  userIds: string[];
}

export interface ResolveBankAccountResponseDto {
  /**
   * Account holder name exactly as the bank returns it.
   * @example "ADA OBI"
   */
  accountName: string;
  /** @example "0123456789" */
  accountNumber: string;
  /** @example "058" */
  bankCode: string;
  /**
   * Bank display name, included when the bank list is cached. Absent otherwise.
   * @example "Guaranty Trust Bank"
   */
  bankName?: string;
}

export interface BankResponseDto {
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string;
  pay_with_bank: boolean;
  active: boolean;
  is_deleted: boolean;
  country: string;
  currency: string;
  type: string;
  id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface BankResponseMetaDto {
  next: string;
  previous: string;
  perPage: number;
}

export interface GetBanksResponseDto {
  status: boolean;
  message: string;
  data: BankResponseDto[];
  meta: BankResponseMetaDto;
}

export interface CreateVirtualAccountRequestDto {
  /** @minLength 3 */
  firstname: string;
  /** @minLength 3 */
  lastname: string;
  email: string;
  phone: string;
  bvn: string;
  /**
   * @minLength 2
   * @maxLength 2
   * @default "NG"
   */
  country?: string;
  bank?: string;
}

export interface UpdatePlatformSettlementDto {
  /** Bank account number. */
  accountNumber: string;
  /** Paystack bank code. */
  bankCode: string;
}

export interface SetWithdrawalPinDto {
  /**
   * 4-digit withdrawal PIN.
   * @minLength 4
   * @maxLength 4
   */
  pin: string;
}

export interface InitiatePayoutDto {
  /**
   * Amount in sub-units (10000 = ₦1).
   * @min 1
   */
  amount: number;
  /**
   * 4-digit withdrawal PIN.
   * @minLength 4
   * @maxLength 4
   */
  pin: string;
  /** Optional note for the payout. */
  reason?: string;
}

export interface TransferToWalletDto {
  /** The user (customer or rider) whose wallet receives the money. */
  userId: string;
  /**
   * Amount in sub-units (10000 = ₦1).
   * @min 1
   */
  amount: number;
  /**
   * 4-digit platform withdrawal PIN.
   * @minLength 4
   * @maxLength 4
   */
  pin: string;
  /** Why the money is being sent (audited, shown on both ledgers). */
  reason: string;
}

export type SchemaMixed = object;

export interface DataLog {
  data?: SchemaMixed;
  /** @default "ERROR" */
  level?: "LOG" | "INFO" | "DEBUG" | "ERROR";
  /** @default "USER" */
  logType?: "SYSTEM" | "USER";
  _id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface DataLogsResponseDto {
  nextPage?: number | null;
  previousPage?: number | null;
  currentPage: number;
  results: any[][];
  perPageLimit: number;
  totalRecords: number;
  totalPages: number;
  count: number;
  records: DataLog[];
}

export interface Notification {
  entityId?: string;
  entityType?: EntityType;
  broadcastId?: string;
  content: string;
  subject: string;
  type: "IN_APP" | "PUSH" | "SMS" | "EMAIL";
  /** @format date-time */
  readAt?: string;
  category?: "SINGLE" | "BROADCAST" | "SCHEDULED_BROADCAST";
  /** @default false */
  isRead: boolean;
  /** @default false */
  isExternalRecipient: boolean;
  /** @default "SUCCESS" */
  status: "FAILED" | "SUCCESS";
  failureReason?: string;
  /** What the notification is about, so a tap can open it: { type, orderId?, transactionId?, url? } */
  data?: object;
  _id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface ListNotificationResponseDto {
  nextPage?: number | null;
  previousPage?: number | null;
  currentPage: number;
  results: Notification[];
  perPageLimit: number;
  totalRecords: number;
  totalPages: number;
}

export interface UpdateNotificationsRequestDto {
  notificationIds: string[];
}

export interface CreateTemplateRequestDto {
  /**
   * @minLength 3
   * @maxLength 50
   * @pattern /^[a-zA-Z0-9_-]*$/
   */
  name: string;
  subject: string;
  html: string;
  text?: string;
  description?: string;
  sender?: string;
  title?: string;
  /** @default true */
  isActive?: boolean;
}

/** @default "EMAIL" */
export enum NotificationType {
  IN_APP = "IN_APP",
  PUSH = "PUSH",
  SMS = "SMS",
  EMAIL = "EMAIL",
}

/** @default "SINGLE" */
export enum NotificationCategory {
  SINGLE = "SINGLE",
  BROADCAST = "BROADCAST",
  SCHEDULED_BROADCAST = "SCHEDULED_BROADCAST",
}

export interface NotificationAction {
  action?: string;
  title?: string;
  url?: string;
}

export interface TemplateRequestDto {
  /**
   * Template variables with dynamic key-value pairs
   * @example {"key":"value","anotherKey":"anotherValue"}
   */
  variables?: object;
  /**
   * Name of the template
   * @example "template_name"
   */
  name: string;
}

export interface TriggerNotificationRequestDto {
  types: NotificationType[];
  entityType?: EntityType;
  category?: NotificationCategory;
  /** @minLength 5 */
  subject?: string;
  /** The entityId field is required if externalRecipient field is not provided */
  entityId?: string;
  /** The externalRecipient field is required if entityId is not provided */
  externalRecipient?: string;
  /** SMS only: deliver to this number instead of the entity's saved phone (e.g. a phone-change code) */
  phoneOverride?: string;
  /** Notification actions */
  actions?: NotificationAction[];
  sound?: string;
  channelId?: string;
  /** Stable Android notification tag; same-tag pushes collapse instead of stacking */
  tag?: string;
  /** Arbitrary key-value data forwarded in the push payload (e.g. { type }) */
  data?: object;
  template?: TemplateRequestDto;
}

export enum BroadcastAudience {
  CUSTOMERS = "CUSTOMERS",
  RIDERS = "RIDERS",
  BUSINESSES = "BUSINESSES",
  USERS = "USERS",
}

export interface BroadcastFiltersDto {
  status?: ("ACTIVE" | "INACTIVE" | "SUSPENDED" | "BANNED")[];
  /** Riders only: restrict to riders currently online */
  onlineOnly?: boolean;
  /** Riders only: restrict to riders with an approved licence */
  licenceApprovedOnly?: boolean;
  /** Country code, e.g. NG */
  country?: string;
}

export interface BroadcastEstimateRequestDto {
  audience: BroadcastAudience;
  userIds?: string[];
  filters?: BroadcastFiltersDto;
}

export interface BroadcastRequestDto {
  audience: BroadcastAudience;
  /** Required when audience is USERS */
  userIds?: string[];
  filters?: BroadcastFiltersDto;
  /** PUSH and/or EMAIL. Every recipient also gets an in-app copy. */
  channels: ("IN_APP" | "PUSH" | "SMS" | "EMAIL")[];
  /**
   * Push title and email subject
   * @minLength 3
   * @maxLength 120
   */
  subject: string;
  /**
   * Plain text; line breaks are kept
   * @minLength 5
   * @maxLength 2000
   */
  message: string;
}

export interface CityDto {
  name: string;
  /**
   * @minLength 2
   * @maxLength 3
   */
  code: string;
}

export interface CreateBusinessRequestDto {
  businessName: string;
  firstname: string;
  lastname: string;
  middlename?: string;
  phone: string;
  password: string;
  email: string;
  country: CountryDto;
  state?: StateDto;
  city?: CityDto;
  address?: AddressDto;
  photo?: string;
}

export interface CreateBusinessUserRequestDto {
  /** @minLength 3 */
  firstname: string;
  /** @minLength 3 */
  lastname: string;
  email: string;
  phone: string;
  /** @minLength 3 */
  password: string;
  country: CountryDto;
  photo?: string;
  businessId?: string;
  gender?: Gender;
  referralCode?: string;
  /** @default false */
  isVendor?: boolean;
  businessName?: string;
  middlename?: string;
  vehicleId?: string;
  address?: AddressDto;
}

export interface UpdateVehicleRequestDto {
  name: string;
  /** @minLength 4 */
  plateNumber: string;
  /** @minLength 4 */
  make: string;
  /** @minLength 4 */
  model: string;
  /**
   * @minLength 15
   * @maxLength 20
   */
  chasisNumber: string;
  engineNumber: string;
  photos: string[];
  color?: string;
}

export interface AddVehiclesDto {
  vehicles: UpdateVehicleRequestDto[];
}

export interface AssignVehicleDto {
  vehicleId: string;
  userId: string;
}

export interface BusinessDetailDto {
  registeredDate: string;
  registeredAddress: string;
  registrationNumber: string;
  proofOfBusinessAddress: string;
}

export interface UserDetailDto {
  firstname: string;
  middlename?: string;
  lastname: string;
  dob: string;
  /** Gender of the user */
  gender: "MALE" | "FEMALE";
  email: string;
  phone: string;
  bvn?: string;
  nin?: string;
  address?: string;
  nationality?: CountryDto;
  idCardType?: "VOTER_CARD" | "NATIONAL_ID";
  idNumber?: string;
  idCardDoc?: string;
  /** @format date-time */
  idExpiryDate?: string;
  /** @format date-time */
  idIssuedDate?: string;
}

export interface KYCInfo {
  businessDetails: BusinessDetailDto;
  managerDetails: UserDetailDto;
}

export interface KYCDetailsDto {
  kycDetails: KYCInfo;
  userId: string;
}

export interface ListReviewResponseDto {
  nextPage?: number | null;
  previousPage?: number | null;
  currentPage: number;
  results: Review[];
  perPageLimit: number;
  totalRecords: number;
  totalPages: number;
}

export interface OrderListItemResponseDto {
  userId?: string;
  riderId?: string;
  eligibleRiderIds?: string[];
  vehicleId?: string;
  couponId?: string;
  businessId?: string;
  teamId?: string;
  /** @default true */
  livemode?: boolean;
  reference?: string;
  metadata?: object;
  quoteId?: string;
  developerDispatch?: "auto" | "manual";
  /** @format date-time */
  developerDispatchedAt?: string;
  testOptions?: object;
  developerBidding?: object;
  transactionIds?: string[];
  type: "SINGLE" | "BATCH" | "BULK";
  /** @default "INITIATED" */
  status: "INITIATED" | "ACCEPTED" | "ON_GOING" | "COMPLETED" | "CANCELLED";
  /** @default "PENDING" */
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  cancelledBy?: "USER" | "RIDER" | "ADMIN";
  /** @default 0 */
  totalAmount?: number;
  /** @default 0 */
  discount?: number;
  /** @default 0 */
  discountAmount?: number;
  /** @default "PERCENTAGE" */
  discountType?: "FIXED" | "PERCENTAGE";
  /** @default 0 */
  serviceCharge?: number;
  /** @default 0 */
  totalAmountPayable?: number;
  totalLocations: number;
  /** @default 0 */
  confirmedLocations?: number;
  /** @default 0 */
  cancelledLocations?: number;
  /** @default 0 */
  ongoingLocations?: number;
  /** @format date-time */
  startedAt?: string;
  /** @format date-time */
  paidDate?: string;
  /** @format date-time */
  acceptedAt?: string;
  /** @format date-time */
  completedAt?: string;
  /** @format date-time */
  cancelledAt?: string;
  cancellationReason?: string;
  locations?: OrderLocation[];
  orderNumber: string;
  /** @default false */
  isScheduled: boolean;
  /** @default false */
  autoAcceptOffer: boolean;
  /** @default 0 */
  minimumOfferPercentage: number;
  /** @default 40 */
  maxRiderSurgePercentage: number;
  negotiatedAmount: number;
  offers: Offer[];
  locationUpdates?: OrderLocationUpdate[];
  currency: string;
  /** @format date-time */
  scheduledFor?: string;
  countryCode?: string;
  stateCode?: string;
  /** @format date-time */
  scheduleDispatchedAt?: string;
  /** @format date-time */
  scheduleLastRungAt?: string;
  scheduleRingCount?: number;
  scheduleRemindersSent?: string[];
  color?: string;
  title?: string;
  isQueued?: boolean;
  /** @format date-time */
  queuedAt?: string;
  business?: Business;
  user?: User;
  vehicle?: Vehicle;
  rider?: User;
  coupon?: Coupon;
  transactions?: Transaction[];
  review?: Review;
  channel?: string;
  storefrontVendorId?: string;
  /** @default 0 */
  foodValue?: number;
  /** @default 0 */
  vendorCommissionRate?: number;
  callbackUrl?: string;
  dispatchState?: object;
  /** @format date-time */
  tripPaidAt?: string;
  tripPayRiderId?: string;
  tripPayAmount?: number;
  /** How many times an accepted rider was taken off the order before pickup. Absent or 0: never */
  riderReleaseCount?: number;
  lastRiderRelease?: OrderLastRiderRelease;
  /** Rider view: the order is accepted and the pickup is not done, so the rider may release it */
  canRelease?: boolean;
  /**
   * Rider view: until when a release is free (2 minutes after accepting); null once it counts, including as soon as the rider has arrived at the pickup
   * @format date-time
   */
  releaseFreeUntil?: string | null;
  /** Rider view: counted releases the rider has left today */
  releasesLeftToday?: number;
  paymentToken?: string;
  externalPaymentReference?: string;
  externalPaymentUrl?: string;
  _id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** How many rider offers (bids) the order has received, any status */
  offersCount: number;
}

export interface ListOrderItemsResponseDto {
  nextPage?: number | null;
  previousPage?: number | null;
  currentPage: number;
  results: OrderListItemResponseDto[];
  perPageLimit: number;
  totalRecords: number;
  totalPages: number;
}

export interface GetOrderStatisticsResponseDto {
  completed: number;
  cancelled: number;
  batch: number;
  bulk: number;
  single: number;
  total: number;
}

export interface GetOrderStatusChartResponseDto {
  date: string;
  completed: number;
  cancelled: number;
  accepted: number;
}

export interface GetOrderTypeChartResponseDto {
  date: string;
  batch: number;
  bulk: number;
  single: number;
}

export interface UpdatePasswordRequestDto {
  password: string;
}

export interface VehicleListResponseDto {
  nextPage?: number | null;
  previousPage?: number | null;
  currentPage: number;
  results: Vehicle[];
  perPageLimit: number;
  totalRecords: number;
  totalPages: number;
}

export interface RateRiderRequestDto {
  riderId: string;
  orderId: string;
  /**
   * @min 1
   * @max 5
   */
  rating: number;
  comment?: string;
}

export interface UpdateVehicleStatusRequestDto {
  /** @minLength 15 */
  reason: string;
}

export interface CreateSinglePickupLocationDto {
  address: string;
  category: string;
  longitude: number;
  latitude: number;
  senderName?: string;
  senderPhone?: string;
  senderPhoto?: string;
  description?: string;
  type: "PICKUP" | "DROPOFF";
}

export interface CreateSingleDropoffLocationDto {
  address: string;
  longitude: number;
  latitude: number;
  receiverName: string;
  receiverPhone: string;
  description?: string;
  type: "PICKUP" | "DROPOFF";
}

export interface CreateSingleOrderDto {
  isScheduled?: boolean;
  /**
   * Provide a date if it is a scheduled order
   * @format date-time
   */
  scheduledFor?: string;
  /** Provide a title if it is a scheduled order */
  title?: string;
  /** Provide a color to differentiate orders */
  color?: string;
  /** Order channel (e.g. VENDOR_STOREFRONT) */
  channel?: string;
  /** Storefront vendor ID */
  vendorId?: string;
  /** Food value in kobo for storefront orders */
  foodValue?: number;
  /** Vendor commission rate (e.g. 5 for 5%) */
  vendorCommissionRate?: number;
  /** Whether order is already paid (storefront pre-payment) */
  isPaid?: boolean;
  /** Minimum delivery fee floor in kobo (storefront orders override the core minimumOrderPrice) */
  minimumDeliveryFee?: number;
  pickupLocation: CreateSinglePickupLocationDto;
  dropoffLocation: CreateSingleDropoffLocationDto;
  type: "SINGLE" | "BATCH" | "BULK";
  userId?: string;
}

export interface CreateBulkPickupLocationDto {
  address: string;
  category: string;
  longitude: number;
  latitude: number;
  packageName?: string;
  description?: string;
  senderName?: string;
  senderPhone?: string;
  senderPhoto?: string;
  type: "PICKUP" | "DROPOFF";
}

export interface CreateBulkOrderDto {
  isScheduled?: boolean;
  /**
   * Provide a date if it is a scheduled order
   * @format date-time
   */
  scheduledFor?: string;
  /** Provide a title if it is a scheduled order */
  title?: string;
  /** Provide a color to differentiate orders */
  color?: string;
  /** Order channel (e.g. VENDOR_STOREFRONT) */
  channel?: string;
  /** Storefront vendor ID */
  vendorId?: string;
  /** Food value in kobo for storefront orders */
  foodValue?: number;
  /** Vendor commission rate (e.g. 5 for 5%) */
  vendorCommissionRate?: number;
  /** Whether order is already paid (storefront pre-payment) */
  isPaid?: boolean;
  /** Minimum delivery fee floor in kobo (storefront orders override the core minimumOrderPrice) */
  minimumDeliveryFee?: number;
  pickupLocations: CreateBulkPickupLocationDto[];
  dropoffLocation: CreateSingleDropoffLocationDto;
  type: "SINGLE" | "BATCH" | "BULK";
  userId?: string;
}

export interface QuoteLocationDto {
  longitude: number;
  latitude: number;
  address?: string;
}

export interface QuoteOrderRequestDto {
  /** Order channel (e.g. VENDOR_STOREFRONT) */
  channel?: string;
  /** Minimum delivery fee floor in kobo (storefront override) */
  minimumDeliveryFee?: number;
  pickupLocation: QuoteLocationDto;
  dropoffLocation: QuoteLocationDto;
}

export interface QuoteOrderResponseDto {
  /** Delivery fee before service charge, in sub-units */
  totalAmount: number;
  /** Platform service charge, in sub-units */
  serviceCharge: number;
  /** What the customer pays: totalAmount + serviceCharge */
  totalAmountPayable: number;
  /** Pickup-to-dropoff distance in kilometres */
  distanceKm: number;
  /** Lowest percentage of the fee a rider may offer */
  minimumOfferPercentage: number;
  /** Highest percentage above the fee a rider may bid */
  maxRiderSurgePercentage: number;
  /** @example "NGN" */
  currency: string;
}

export interface QuoteBatchOrderRequestDto {
  /** Order channel (e.g. VENDOR_STOREFRONT) */
  channel?: string;
  /** Minimum delivery fee floor in kobo (storefront override) */
  minimumDeliveryFee?: number;
  /** Percent discount applied to the batch delivery total (storefront) */
  batchDiscountPercent?: number;
  pickupLocation: QuoteLocationDto;
  dropoffLocations: QuoteLocationDto[];
}

export interface QuoteOrderLegDto {
  latitude?: number;
  longitude?: number;
  /** This leg's marginal cost, in sub-units */
  amount: number;
}

export interface QuoteBatchOrderResponseDto {
  totalAmount: number;
  serviceCharge: number;
  totalAmountPayable: number;
  /** Whole route distance in kilometres, leg by leg */
  distanceKm: number;
  minimumOfferPercentage: number;
  maxRiderSurgePercentage: number;
  /** @example "NGN" */
  currency: string;
  /** Per-leg breakdown so callers can show how the run total was built */
  legs: QuoteOrderLegDto[];
  /** Sum of the legs before any discount */
  rawTotal: number;
  /** Raw total after the batch discount */
  discountedTotal: number;
  /** Run-level price floor for the state */
  minimumOrderPrice: number;
  /** True when the floor raised the total */
  minimumApplied: boolean;
}

export interface QuoteBulkOrderRequestDto {
  /** Order channel (e.g. VENDOR_STOREFRONT) */
  channel?: string;
  /** Minimum delivery fee floor in kobo (storefront override) */
  minimumDeliveryFee?: number;
  pickupLocations: QuoteLocationDto[];
  dropoffLocation: QuoteLocationDto;
}

export interface QuoteBulkOrderResponseDto {
  totalAmount: number;
  serviceCharge: number;
  totalAmountPayable: number;
  /** Whole route distance in kilometres, leg by leg */
  distanceKm: number;
  minimumOfferPercentage: number;
  maxRiderSurgePercentage: number;
  /** @example "NGN" */
  currency: string;
}

export interface CreateBatchPickupLocationDto {
  address: string;
  longitude: number;
  latitude: number;
  description?: string;
  senderName?: string;
  senderPhone?: string;
  senderPhoto?: string;
  type: "PICKUP" | "DROPOFF";
}

export interface CreateRecipientDto {
  name: string;
  phone: string;
}

export interface CreateBatchDropoffLocationDto {
  address: string;
  longitude: number;
  latitude: number;
  packageName: string;
  description?: string;
  receiverName: string;
  receiverPhone: string;
  recipients?: CreateRecipientDto[];
  type: "PICKUP" | "DROPOFF";
}

export interface CreateBatchOrderDto {
  isScheduled?: boolean;
  /**
   * Provide a date if it is a scheduled order
   * @format date-time
   */
  scheduledFor?: string;
  /** Provide a title if it is a scheduled order */
  title?: string;
  /** Provide a color to differentiate orders */
  color?: string;
  /** Order channel (e.g. VENDOR_STOREFRONT) */
  channel?: string;
  /** Storefront vendor ID */
  vendorId?: string;
  /** Food value in kobo for storefront orders */
  foodValue?: number;
  /** Vendor commission rate (e.g. 5 for 5%) */
  vendorCommissionRate?: number;
  /** Whether order is already paid (storefront pre-payment) */
  isPaid?: boolean;
  /** Minimum delivery fee floor in kobo (storefront orders override the core minimumOrderPrice) */
  minimumDeliveryFee?: number;
  /** Percent discount applied to the batch delivery total (storefront) */
  batchDiscountPercent?: number;
  pickupLocation: CreateBatchPickupLocationDto;
  dropoffLocations: CreateBatchDropoffLocationDto[];
  type: "SINGLE" | "BATCH" | "BULK";
  userId?: string;
}

export enum DispatchTierType {
  ELIGIBLE = "ELIGIBLE",
  NEARBY = "NEARBY",
}

/** Echoed back on the dispatch callbacks so the caller can show which tier is ringing */
export enum DispatchTierLabel {
  STORE = "STORE",
  BACKUP = "BACKUP",
  NEARBY = "NEARBY",
}

export interface DispatchTierDto {
  type: DispatchTierType;
  /** Echoed back on the dispatch callbacks so the caller can show which tier is ringing */
  label?: DispatchTierLabel;
  /** ELIGIBLE: the riders to ring, best first */
  riderIds?: string[];
  /**
   * NEARBY: how far from the pickup to look, in km (default 6)
   * @min 0.5
   * @max 30
   */
  radiusKm?: number;
  /**
   * NEARBY: ring at most this many riders (default 8)
   * @min 1
   * @max 20
   */
  max?: number;
  /** How this tier orders its riders. ELIGIBLE defaults to PRIORITY (as listed), NEARBY to nearest first */
  sortingStrategy?: "BANDS" | "SCORING" | "FAIR" | "PRIORITY";
}

export interface RidersRequestDto {
  /** @default false */
  autoAcceptOffer?: boolean;
  /** @default 0 */
  offerAmount?: number;
  /** Specific rider IDs to target (skips geo-query) */
  riderIds?: string[];
  /** Enable sequential rider dispatch (ring one rider at a time with 30s timeout) */
  sequentialDispatch?: boolean;
  /**
   * Ignored: the destination comes from STOREFRONT_DISPATCH_CALLBACK_URL, never the request.
   * @deprecated
   */
  callbackUrl?: string;
  /** Rider sorting strategy for sequential dispatch */
  sortingStrategy?: "BANDS" | "SCORING" | "FAIR" | "PRIORITY";
  /** Tiered sequential dispatch: ring each tier in turn (for example the store riders, then backup riders, then riders nearby). Needs sequentialDispatch; when set, riderIds and sortingStrategy are ignored. */
  tiers?: DispatchTierDto[];
  /**
   * Tiered dispatch: seconds each rider has to answer (default 15)
   * @min 10
   * @max 60
   */
  ringTimeoutSeconds?: number;
}

export interface ReDispatchRequestDto {
  /** Specific rider IDs to target */
  riderIds?: string[];
  /**
   * Ignored: the destination comes from STOREFRONT_DISPATCH_CALLBACK_URL, never the request.
   * @deprecated
   */
  callbackUrl?: string;
  /** Rider sorting strategy */
  sortingStrategy?: "BANDS" | "SCORING" | "FAIR" | "PRIORITY";
  /** Tiered search, as on request-riders: the search starts again from the first tier. When set, riderIds and sortingStrategy are ignored. */
  tiers?: DispatchTierDto[];
  /**
   * Tiered dispatch: seconds each rider has to answer (default 15)
   * @min 10
   * @max 60
   */
  ringTimeoutSeconds?: number;
}

export interface PayRiderTripRequestDto {
  /** The Pickriders user ID of the rider who went out for this order */
  riderId: string;
  /**
   * Why the trip is being paid, kept for the record
   * @maxLength 300
   */
  reason?: string;
}

export interface ReleaseRiderRequestDto {
  /** Why the rider is being released, kept for the record */
  reason: "RIDER_CANT_GO" | "RIDER_NOT_RESPONDING" | "RIDER_TOO_FAR" | "OTHER";
  /**
   * Free-text note from whoever released the rider
   * @maxLength 300
   */
  note?: string;
}

export interface ReleaseRiderResponseDto {
  /** The rider who was taken off the order */
  releasedRiderId: string;
  /** How many other riders are being rung now (0 means nobody else was available) */
  ringing: number;
}

/** Why the rider is releasing the trip */
export enum RiderSelfReleaseReason {
  BIKE_PROBLEM = "BIKE_PROBLEM",
  EMERGENCY = "EMERGENCY",
  TOO_FAR = "TOO_FAR",
  STORE_ISSUE = "STORE_ISSUE",
  OTHER = "OTHER",
}

export interface RiderReleaseRequestDto {
  /** Why the rider is releasing the trip */
  reason: RiderSelfReleaseReason;
  /**
   * Optional note from the rider
   * @maxLength 300
   */
  note?: string;
}

export interface RiderReleaseResponseDto {
  /** The order the rider released */
  orderId: string;
  /** True when the release counted as a cancellation: it came after the free 2 minutes, or after arriving at the pickup */
  counted: boolean;
  /** True when the rider had already arrived at the pickup (always counted) */
  arrivedAtPickup: boolean;
  /** Counted releases the rider has left today (Lagos day) */
  releasesLeftToday: number;
  /** A short line to show the rider */
  message: string;
}

export interface ReassignRiderRequestDto {
  /** The Pickriders user ID of the rider to ring */
  riderId: string;
  /** Callback URL for dispatch status updates */
  callbackUrl: string;
  /** Reason for reassigning the rider */
  reason?: string;
  /** Ring only this rider. By default, if they miss the 60-second ring, the normal search restarts across the order's eligible riders. */
  onlyThisRider?: boolean;
}

export interface ForceAssignRiderDto {
  /** The Pickriders user ID of the rider who gets the order */
  riderId: string;
  /**
   * Why the rider was assigned by hand, kept for the record
   * @maxLength 300
   */
  reason?: string;
  /** Accepted for parity with /reassign and ignored: dispatch callbacks always go to the storefront endpoint configured on this server (STOREFRONT_DISPATCH_CALLBACK_URL), never to a caller-chosen URL. */
  callbackUrl?: string;
}

export interface AssignedRiderResponseDto {
  _id: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  photo?: string;
}

export interface ForceAssignRiderResponseDto {
  userId?: string;
  riderId?: string;
  eligibleRiderIds?: string[];
  vehicleId?: string;
  couponId?: string;
  businessId?: string;
  teamId?: string;
  /** @default true */
  livemode?: boolean;
  reference?: string;
  metadata?: object;
  quoteId?: string;
  developerDispatch?: "auto" | "manual";
  /** @format date-time */
  developerDispatchedAt?: string;
  testOptions?: object;
  developerBidding?: object;
  transactionIds?: string[];
  type: "SINGLE" | "BATCH" | "BULK";
  /** @default "INITIATED" */
  status: "INITIATED" | "ACCEPTED" | "ON_GOING" | "COMPLETED" | "CANCELLED";
  /** @default "PENDING" */
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  cancelledBy?: "USER" | "RIDER" | "ADMIN";
  /** @default 0 */
  totalAmount?: number;
  /** @default 0 */
  discount?: number;
  /** @default 0 */
  discountAmount?: number;
  /** @default "PERCENTAGE" */
  discountType?: "FIXED" | "PERCENTAGE";
  /** @default 0 */
  serviceCharge?: number;
  /** @default 0 */
  totalAmountPayable?: number;
  totalLocations: number;
  /** @default 0 */
  confirmedLocations?: number;
  /** @default 0 */
  cancelledLocations?: number;
  /** @default 0 */
  ongoingLocations?: number;
  /** @format date-time */
  startedAt?: string;
  /** @format date-time */
  paidDate?: string;
  /** @format date-time */
  acceptedAt?: string;
  /** @format date-time */
  completedAt?: string;
  /** @format date-time */
  cancelledAt?: string;
  cancellationReason?: string;
  locations?: OrderLocation[];
  orderNumber: string;
  /** @default false */
  isScheduled: boolean;
  /** @default false */
  autoAcceptOffer: boolean;
  /** @default 0 */
  minimumOfferPercentage: number;
  /** @default 40 */
  maxRiderSurgePercentage: number;
  negotiatedAmount: number;
  offers: Offer[];
  locationUpdates?: OrderLocationUpdate[];
  currency: string;
  /** @format date-time */
  scheduledFor?: string;
  countryCode?: string;
  stateCode?: string;
  /** @format date-time */
  scheduleDispatchedAt?: string;
  /** @format date-time */
  scheduleLastRungAt?: string;
  scheduleRingCount?: number;
  scheduleRemindersSent?: string[];
  color?: string;
  title?: string;
  isQueued?: boolean;
  /** @format date-time */
  queuedAt?: string;
  business?: Business;
  user?: User;
  vehicle?: Vehicle;
  rider?: User;
  coupon?: Coupon;
  transactions?: Transaction[];
  review?: Review;
  channel?: string;
  storefrontVendorId?: string;
  /** @default 0 */
  foodValue?: number;
  /** @default 0 */
  vendorCommissionRate?: number;
  callbackUrl?: string;
  dispatchState?: object;
  /** @format date-time */
  tripPaidAt?: string;
  tripPayRiderId?: string;
  tripPayAmount?: number;
  riderReleaseCount?: number;
  lastRiderRelease?: OrderLastRiderRelease;
  /** Rider view: the order is accepted and the pickup is not done, so the rider may release it */
  canRelease?: boolean;
  /**
   * Rider view: until when a release is free (2 minutes after accepting); null once it counts, including as soon as the rider has arrived at the pickup
   * @format date-time
   */
  releaseFreeUntil?: string | null;
  /** Rider view: counted releases the rider has left today */
  releasesLeftToday?: number;
  paymentToken?: string;
  externalPaymentReference?: string;
  externalPaymentUrl?: string;
  _id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** The rider the order was assigned to */
  assignedRider: AssignedRiderResponseDto;
}

export interface NearbyRidersCountResponseDto {
  /** Riders who would receive an order placed from this point right now */
  count: number;
  /** Search radius in km (the state’s dispatch radius) */
  radiusKm: number;
  /** Distance to the nearest of them in km; null when there are none */
  nearestKm: number | null;
  /** True when served from the 60 s cache */
  cached: boolean;
}

export interface ArrivalCheckResponseDto {
  /** When true, a rider can only mark a stop as arrived within radiusMeters of it (admin setting) */
  enabled: boolean;
  /** How close, in metres, the rider must be when the check is on (the state's setting) */
  radiusMeters: number;
}

export interface RiderListItemResponseDto {
  _id: string;
  firstname?: string;
  lastname?: string;
  photo?: string;
  phone?: string;
  /** The rider has the app online */
  isOnline: boolean;
  /** The rider is on an order right now (accepted or on the way) */
  isBusy: boolean;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "BANNED";
  /** Average review rating, 0 when unrated */
  rating: number;
  /** Completed deliveries, all time */
  totalDeliveries: number;
}

export enum RiderApprovalGap {
  ACCOUNT_NOT_ACTIVE = "ACCOUNT_NOT_ACTIVE",
  LICENCE_NOT_APPROVED = "LICENCE_NOT_APPROVED",
  VEHICLE_NOT_VERIFIED = "VEHICLE_NOT_VERIFIED",
}

export interface RiderLookupCardDto {
  id: string;
  firstName: string;
  /** First letter of the last name, or an empty string */
  lastInitial: string;
  photo?: string;
  /** Active, licence approved and vehicle verified: can take orders */
  approved: boolean;
  pending: RiderApprovalGap[];
}

export interface RiderLookupResponseDto {
  found: boolean;
  rider?: RiderLookupCardDto;
}

export interface RiderLinkCodeRequestDto {
  /** The rider, from GET /orders/riders/lookup */
  riderId: string;
  /**
   * @maxLength 60
   * @example "Mama Joy's Kitchen"
   */
  storeName: string;
  /**
   * Six digits
   * @pattern /^\d{6}$/
   * @example "123456"
   */
  code: string;
}

export interface RiderLinkCodeResponseDto {
  /** The code went to the rider's Pickriders app */
  delivered: boolean;
  /** SENT, or why not: no app signed in (NO_APP), not a rider account, or the push failed */
  status: "SENT" | "NO_APP" | "NOT_A_RIDER" | "FAILED";
}

export interface RiderLocationsRequestDto {
  /** Array of rider user IDs to get locations for */
  riderIds: string[];
  /** Reference longitude (e.g. store location) for distance calculation */
  longitude: number;
  /** Reference latitude (e.g. store location) for distance calculation */
  latitude: number;
}

export interface CancelLocationRequestDto {
  reason: string;
}

export interface RescheduleOrderRequestDto {
  /**
   * The new pickup time: at least 1 hour away and at most 30 days ahead.
   * @example "2026-11-12T09:30:00Z"
   */
  scheduled_for: string;
}

/** @default "USER" */
export enum CancelledBy {
  USER = "USER",
  RIDER = "RIDER",
  ADMIN = "ADMIN",
}

export interface CancelOrderRequestDto {
  /**
   * @maxLength 500
   * @example "The customer cancelled"
   */
  reason?: string;
}

export interface MakeOfferRequestDto {
  offerAmount: number;
}

export interface PayOrderRequestDto {
  /**
   * The total (sub-units) the app showed the customer. When sent and it differs from what the backend works out, the payment is refused with PRICE_CHANGED so the customer never pays a figure they did not see.
   * @min 0
   */
  expectedAmount?: number;
}

export interface OrderPaymentLinkResponseDto {
  /** Provider payment reference */
  reference: string;
  /** Hosted checkout URL */
  url: string;
  /** Amount payable, in sub-units */
  amount: number;
  /** @example "NGN" */
  currency: string;
}

export interface InitializeOrderPaymentRequestDto {
  /**
   * The total (sub-units) the app showed the customer. When sent and it differs from what the backend works out, the payment is refused with PRICE_CHANGED so the customer never pays a figure they did not see.
   * @min 0
   */
  expectedAmount?: number;
  /** Email of the person paying for the order (receives the Paystack receipt). */
  email: string;
}

export interface AcceptRejectOfferRequestDto {
  status: Status;
}

export enum OrderLocationStatus {
  PENDING = "PENDING",
  IN_TRANSIT = "IN_TRANSIT",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  ARRIVED = "ARRIVED",
}

export interface UpdateLocationStatusRequestDto {
  status: OrderLocationStatus;
  /** Rider's current longitude, sent to verify proximity when marking ARRIVED */
  longitude?: number;
  /** Rider's current latitude, sent to verify proximity when marking ARRIVED */
  latitude?: number;
}

export interface UpdateOrderLocationDto {
  senderName?: string;
  senderPhone?: string;
  receiverName?: string;
  receiverPhone?: string;
  description?: string;
  packageName?: string;
  address?: string;
  longitude?: number;
  latitude?: number;
}

export interface QuoteOrderLocationResponseDto {
  /** True when only contact details changed — no re-pricing */
  detailsOnly: boolean;
  /** Raw price difference the change introduces, in sub-units */
  deltaAmount: number;
  /** What the customer is actually charged, in sub-units */
  chargeable: number;
  /** True when the change costs the customer nothing */
  free: boolean;
  /** @example "NGN" */
  currency: string;
  /** True when the free-change allowance is exhausted */
  capReached: boolean;
}

/** @default "ACCEPTED" */
export enum LocationUpdateStatus {
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
}

export interface AcceptRejectLocationUpdateRequestDto {
  status: LocationUpdateStatus;
}

export interface CompleteLocationRequestDto {
  /** @minLength 4 */
  confirmationCode?: string;
  recipientId?: string;
  recipientPhone?: string;
}

export interface ListOrderResponseDto {
  nextPage?: number | null;
  previousPage?: number | null;
  currentPage: number;
  results: Order[];
  perPageLimit: number;
  totalRecords: number;
  totalPages: number;
}

/** Manual admin status override (audited). */
export enum OrderStatus {
  INITIATED = "INITIATED",
  ACCEPTED = "ACCEPTED",
  ON_GOING = "ON_GOING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface OrderRiderHistoryRiderDto {
  _id: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  photo?: string;
}

export enum RiderStintOutcome {
  RELEASED = "RELEASED",
  ACTIVE = "ACTIVE",
  PICKED_UP = "PICKED_UP",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export enum RiderReleaseInitiator {
  RIDER = "RIDER",
  OWNER = "OWNER",
  ADMIN = "ADMIN",
}

export interface OrderRiderStintReleaseDto {
  initiatedBy: RiderReleaseInitiator;
  /** Rider releases: BIKE_PROBLEM, EMERGENCY, TOO_FAR, STORE_ISSUE, OTHER. Owner releases: RIDER_CANT_GO, RIDER_NOT_RESPONDING, RIDER_TOO_FAR, OTHER */
  reason: string;
  note?: string;
  /** True when it counted as the rider's cancellation */
  counted: boolean;
  /** True when the rider released it after arriving at the pickup */
  arrivedAtPickup: boolean;
}

export interface OrderRiderStintDto {
  /** Null when the rider account no longer exists */
  rider: OrderRiderHistoryRiderDto | null;
  /**
   * When this rider accepted. Null for releases recorded before the accept time was stored
   * @format date-time
   */
  acceptedAt: string | null;
  /**
   * When the stint ended: the release, the delivery or the cancellation. Null while the rider holds it
   * @format date-time
   */
  endedAt: string | null;
  outcome: RiderStintOutcome;
  /**
   * Current stint only: when the rider completed the pickup stop
   * @format date-time
   */
  pickedUpAt?: string | null;
  /** Released stints only */
  release?: OrderRiderStintReleaseDto;
}

export interface AdminOrderRiderHistoryResponseDto {
  orderId: string;
  orderNumber?: string;
  /** Manual admin status override (audited). */
  status: OrderStatus;
  /** How many times a rider was taken off the order before pickup */
  releaseCount: number;
  /** Oldest first. Ends with the current rider when there is one; when the last event was a release and nobody has taken the order since, there is no current stint */
  stints: OrderRiderStintDto[];
}

export interface AdminCancelOrderRequestDto {
  /** Reason for cancelling the order (audited, refunds the customer). */
  reason: string;
}

export interface AdminUpdateOrderStatusRequestDto {
  /** Manual admin status override (audited). */
  status: OrderStatus;
}

export interface RiderReleaseCountsDto {
  /** Releases since Lagos midnight */
  today: number;
  /** Releases in the last 7 days */
  last7Days: number;
  /** Releases in the last 30 days */
  last30Days: number;
  /** Counted releases since Lagos midnight */
  countedToday: number;
  /** Counted releases in the last 7 days */
  countedLast7Days: number;
  /** Counted releases in the last 30 days */
  countedLast30Days: number;
  /** Releases in the last 30 days made after arriving at the pickup */
  arrivedAtPickupLast30Days: number;
}

export interface RiderReleaseItemDto {
  _id: string;
  orderId: string;
  orderNumber?: string;
  initiatedBy: RiderReleaseInitiator;
  /** Rider releases: BIKE_PROBLEM, EMERGENCY, TOO_FAR, STORE_ISSUE, OTHER. Owner releases: RIDER_CANT_GO, RIDER_NOT_RESPONDING, RIDER_TOO_FAR, OTHER */
  reason: string;
  note?: string;
  /** True when it counted as the rider's cancellation */
  counted: boolean;
  /** True when the rider released it after arriving at the pickup */
  arrivedAtPickup: boolean;
  /** The order's channel (VENDOR_STOREFRONT, CUSTOMER_WEB, or none for the app) */
  channel?: string;
  /** @format date-time */
  createdAt: string;
}

export interface AdminRiderReleasesResponseDto {
  counts: RiderReleaseCountsDto;
  /** Counted releases the rider has left today */
  releasesLeftToday: number;
  /** Newest first, at most 100 */
  releases: RiderReleaseItemDto[];
}

export interface AuditLog {
  actionBy?: string;
  actionType: "ADMIN" | "BUSINESS" | "DEVELOPER" | "SYSTEM" | "TEAM" | "USER";
  business?: Business[];
  /** @default "UNKNOWN" */
  action?: string;
  actionSuccessful?: boolean;
  requestUrl?: string;
  requestMethod?: string;
  ipAddress?: string;
  requestData?: string;
  responseData?: string;
  teamId?: string;
  event?: string;
  actorId?: string;
  target?: object;
  before?: object;
  after?: object;
  _id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface ListAuditLogResponseDto {
  nextPage?: number | null;
  previousPage?: number | null;
  currentPage: number;
  results: AuditLog[];
  perPageLimit: number;
  totalRecords: number;
  totalPages: number;
}

export enum IssueCategory {
  ORDER = "ORDER",
  DELIVERY = "DELIVERY",
  RIDER_BEHAVIOUR = "RIDER_BEHAVIOUR",
  APP_TECHNICAL = "APP_TECHNICAL",
  PAYMENT_REFUND = "PAYMENT_REFUND",
  SAFETY_SECURITY = "SAFETY_SECURITY",
  OTHER = "OTHER",
}

export enum IssuePriority {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export interface CreateIssueRequestDto {
  category: IssueCategory;
  priority?: IssuePriority;
  /**
   * What happened, in the customer’s words
   * @minLength 10
   * @maxLength 2000
   */
  description: string;
  /** Order the issue is about (must belong to the caller) */
  orderId?: string;
  /** Transaction the issue is about (must belong to the caller) */
  transactionId?: string;
  /** Up to 3 images/videos as base64 data URIs (or already-hosted https URLs) */
  attachments?: string[];
}

export enum IssueSubjectType {
  ORDER = "ORDER",
  TRANSACTION = "TRANSACTION",
  GENERAL = "GENERAL",
}

export enum IssueStatus {
  OPEN = "OPEN",
  IN_REVIEW = "IN_REVIEW",
  RESOLVED = "RESOLVED",
  CLOSED = "CLOSED",
}

export interface IssueNote {
  _id: string;
  adminId: string;
  note: string;
  /** @format date-time */
  createdAt: string;
}

export interface IssueReport {
  _id: string;
  /** Short human-readable reference, e.g. ISS-7K3M2Q */
  reference: string;
  userId: string;
  subjectType: IssueSubjectType;
  orderId?: string;
  transactionId?: string;
  category: IssueCategory;
  priority: IssuePriority;
  description: string;
  /** Cloud URLs of uploaded images/videos */
  attachments: string[];
  status: IssueStatus;
  /** Support note shown to the customer once resolved/closed */
  resolution?: string;
  /** @format date-time */
  resolvedAt?: string;
  resolvedBy?: string;
  assignedTo?: string;
  notes?: IssueNote[];
  /** @format date-time */
  firstResponseAt?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface ListIssuesResponseDto {
  nextPage?: number | null;
  previousPage?: number | null;
  currentPage: number;
  results: IssueReport[];
  perPageLimit: number;
  totalRecords: number;
  totalPages: number;
}

export interface IssuesCountByKeyDto {
  key: string;
  count: number;
}

export interface IssuesWindowDto {
  opened: number;
  resolved: number;
  avgResolutionHours: number | null;
  avgFirstResponseHours: number | null;
}

export interface IssuesSummaryResponseDto {
  /** OPEN reports */
  open: number;
  /** IN_REVIEW reports */
  inReview: number;
  /** OPEN or IN_REVIEW with nobody assigned */
  unassigned: number;
  /** Open/in-review reports at HIGH priority */
  highPriorityOpen: number;
  /** Resolved or closed in the last 7 days */
  resolved7d: number;
  /** New reports in the last 7 days */
  new7d: number;
  /** Average hours from report to resolution, last 30 days */
  avgResolutionHours: number | null;
  /** Average hours until first status change, last 30 days */
  avgFirstResponseHours: number | null;
  /** Open/in-review reports older than 48 hours */
  overdue: number;
  /** Open/in-review reports per category */
  byCategory: IssuesCountByKeyDto[];
  /** Open/in-review reports per priority */
  byPriority: IssuesCountByKeyDto[];
  /** The window the figures below cover: from, to, days, all */
  window: object;
  /** Opened, resolved and response times inside the window */
  current: IssuesWindowDto;
  /** The same figures for the window before, for trends */
  previous: IssuesWindowDto;
  /** Reports opened and resolved per Lagos day across the window */
  daily: object[];
}

export interface UpdateIssueStatusRequestDto {
  status: IssueStatus;
  /**
   * Note shown to the customer; expected when resolving or closing
   * @maxLength 2000
   */
  resolution?: string;
}

export interface AssignIssueRequestDto {
  /** Admin user id to assign to; omit or null to unassign */
  adminId?: string | null;
}

export interface UpdateIssuePriorityRequestDto {
  priority: IssuePriority;
}

export interface AddIssueNoteRequestDto {
  /**
   * Internal note; the customer never sees it
   * @maxLength 2000
   */
  note: string;
}

export enum AnnouncementAudience {
  CUSTOMERS = "CUSTOMERS",
  RIDERS = "RIDERS",
}

export enum AnnouncementActionType {
  INTERNAL = "INTERNAL",
  EXTERNAL = "EXTERNAL",
}

export interface AnnouncementAction {
  type: AnnouncementActionType;
  /** Button label, e.g. "Try the price calculator" */
  label: string;
  /** Screen path (INTERNAL) or https URL (EXTERNAL) */
  target: string;
}

export enum AnnouncementStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
}

export interface AnnouncementStats {
  /** Distinct people the popup has been shown to */
  reached: number;
  /** Every time the popup was shown, repeats included */
  impressions: number;
  /** Taps on "Show me later" */
  later: number;
  /** People who closed it for good without taking the action */
  confirmed: number;
  /** People who tapped the action */
  acted: number;
}

export interface Announcement {
  _id: string;
  title: string;
  /** Plain text; line breaks are kept */
  body: string;
  /** A single emoji shown large above the title */
  emoji?: string;
  /** Optional illustration shown above the title */
  imageUrl?: string;
  audience: AnnouncementAudience;
  action?: AnnouncementAction;
  status: AnnouncementStatus;
  /**
   * Do not show before this moment
   * @format date-time
   */
  startsAt?: string;
  /**
   * Stop showing after this moment
   * @format date-time
   */
  endsAt?: string;
  /**
   * When it first went ACTIVE
   * @format date-time
   */
  publishedAt?: string;
  stats: AnnouncementStats;
  createdBy: string;
  updatedBy?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

/** Set when results is empty: why nothing came back (the apps log it in development) */
export enum PendingAnnouncementsReason {
  NOT_A_RIDER = "NOT_A_RIDER",
  NONE_LIVE = "NONE_LIVE",
  ALL_ACKNOWLEDGED = "ALL_ACKNOWLEDGED",
}

export interface PendingAnnouncementsResponseDto {
  /** Oldest published first, so a backlog reads in order */
  results: Announcement[];
  /** Set when results is empty: why nothing came back (the apps log it in development) */
  reason?: PendingAnnouncementsReason;
}

export enum AnnouncementOutcome {
  CONFIRMED = "CONFIRMED",
  ACTED = "ACTED",
}

export interface AcknowledgeAnnouncementRequestDto {
  outcome: AnnouncementOutcome;
}

export interface ListAnnouncementsResponseDto {
  nextPage?: number | null;
  previousPage?: number | null;
  currentPage: number;
  results: Announcement[];
  perPageLimit: number;
  totalRecords: number;
  totalPages: number;
}

export interface AnnouncementsSummaryResponseDto {
  /** Announcements currently popping in an app */
  active: number;
  drafts: number;
  archived: number;
  /** Distinct people reached across active announcements */
  reached: number;
  /** People who tapped an action across active announcements */
  acted: number;
  /** People who closed one for good without acting */
  confirmed: number;
  /** acted / (acted + confirmed), 0-100 */
  actionRate: number;
}

export interface AppScreenDto {
  /** Route path, e.g. /distance-calculator */
  path: string;
  label: string;
  description: string;
}

export interface AppScreensResponseDto {
  CUSTOMERS: AppScreenDto[];
  RIDERS: AppScreenDto[];
}

export interface AnnouncementReceiptUserDto {
  _id: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  photo?: string;
}

export interface AnnouncementReceiptRowDto {
  _id: string;
  announcementId: string;
  userId: string;
  impressions: number;
  later: number;
  /** @format date-time */
  lastSeenAt?: string;
  /**
   * Set once; the announcement never pops for this person again
   * @format date-time
   */
  acknowledgedAt?: string;
  outcome?: AnnouncementOutcome;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  user?: AnnouncementReceiptUserDto;
}

export interface ListAnnouncementReceiptsResponseDto {
  nextPage?: number | null;
  previousPage?: number | null;
  currentPage: number;
  results: AnnouncementReceiptRowDto[];
  perPageLimit: number;
  totalRecords: number;
  totalPages: number;
}

export interface AnnouncementActionDto {
  type: AnnouncementActionType;
  /**
   * Button label
   * @minLength 2
   * @maxLength 40
   */
  label: string;
  /**
   * INTERNAL: a screen path from GET admins/announcements/screens (e.g. /distance-calculator). EXTERNAL: an https URL.
   * @maxLength 500
   */
  target: string;
}

export interface CreateAnnouncementRequestDto {
  /**
   * @minLength 3
   * @maxLength 80
   */
  title: string;
  /**
   * Plain text; line breaks are kept
   * @minLength 5
   * @maxLength 500
   */
  body: string;
  /**
   * One emoji shown large above the title
   * @maxLength 8
   */
  emoji?: string;
  /** https URL of an illustration */
  imageUrl?: string;
  audience: AnnouncementAudience;
  action?: AnnouncementActionDto;
  /** DRAFT (default) keeps it hidden; ACTIVE publishes it right away */
  status?: "DRAFT" | "ACTIVE";
  /**
   * Do not show before this moment
   * @format date-time
   */
  startsAt?: string;
  /**
   * Stop showing after this moment
   * @format date-time
   */
  endsAt?: string;
}

export interface UpdateAnnouncementRequestDto {
  /**
   * @minLength 3
   * @maxLength 80
   */
  title?: string;
  /**
   * @minLength 5
   * @maxLength 500
   */
  body?: string;
  /** @maxLength 8 */
  emoji?: string | null;
  imageUrl?: string | null;
  audience?: AnnouncementAudience;
  action?: AnnouncementActionDto | null;
  /** @format date-time */
  startsAt?: string | null;
  /** @format date-time */
  endsAt?: string | null;
}

export interface UpdateAnnouncementStatusRequestDto {
  status: AnnouncementStatus;
}

export type Object = object;

export interface CreateTeamRequestDto {
  /** Whether this team is tied to a Business or a Developer (User) */
  entityType: "BUSINESS" | "DEVELOPER";
  /** Required when entityType is BUSINESS (Business._id). For DEVELOPER, omit to use the registered user. */
  entityId?: string;
  /**
   * Display name of the team / org
   * @minLength 2
   */
  name: string;
  /** User email — must be unique across users */
  email: string;
  /** User phone number */
  phone: string;
  /** Team contact email */
  contactPersonEmail?: string;
  /** Team contact phone number */
  contactPersonPhone?: string;
  /** Base64-encoded image or an existing HTTPS URL */
  logo?: string;
  /** URL-safe handle / slug — auto-generated from email if omitted */
  handle?: string;
  website?: string;
  description?: string;
  firstname: string;
  lastname: string;
  middlename?: string;
  /** @minLength 8 */
  password: string;
  /** Base64-encoded profile photo or HTTPS URL */
  photo?: string;
  country: CountryDto;
  state?: StateDto;
  city?: CityDto;
  address?: AddressDto;
}

export interface ApiKeyDto {
  label: string;
  keyHash: string;
  keyPrefix: string;
  /** @default true */
  isActive?: boolean;
  /** @format date-time */
  lastUsedAt?: string;
  /** @format date-time */
  createdAt?: string;
  createdBy?: string;
}

export interface Team {
  entityType: "BUSINESS" | "DEVELOPER";
  /** Business._id or Developer User._id; no ref (polymorphic) */
  entityId: string;
  name: string;
  contactPersonEmail: string;
  contactPersonPhone: string;
  country: {
    name?: string;
    code?: string;
    currency?: string;
  };
  state: {
    name?: string;
    code?: string;
  };
  city: {
    name?: string;
    code?: string;
  };
  logo: string;
  handle: string;
  website: string;
  description: string;
  /** Developer teams: the company behind the integration, if there's one. */
  companyName: string;
  /** Developer teams: where Pickriders support reaches the team. */
  supportEmail: string;
  supportPhone: string;
  /** Developer teams: what they are building, for the live-access review. */
  useCase: string;
  lowBalanceThreshold?: number | null;
  /** @format date-time */
  lowBalanceAlertedAt?: string;
  expectedMonthlyVolume: "UP_TO_100" | "UP_TO_1000" | "UP_TO_10000" | "OVER_10000";
  userId: string;
  /**
   * Unused: see the ApiKey collection.
   * @deprecated
   */
  apiKeys: ApiKeyDto[];
  config: {
    /** @default "" */
    webhookUrl?: string;
    /** @default "" */
    callbackUrl?: string;
    allowedIPs?: string[];
    /** @default false */
    testMode?: boolean;
    metadata?: SchemaMixed;
  };
  /** @default "ACTIVE" */
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  /** @default "NOT_REQUESTED" */
  liveStatus: "NOT_REQUESTED" | "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
  /**
   * When the team last asked for live access.
   * @format date-time
   */
  liveRequestedAt: string;
  /**
   * When a Pickriders admin last approved, rejected, suspended or restored it.
   * @format date-time
   */
  liveReviewedAt: string;
  /** The admin who made that decision. */
  liveReviewedBy: string;
  /** Why live access was rejected. The developer sees it. */
  liveRejectionReason: string;
  /** Why live access was suspended. The developer sees it. */
  liveSuspensionReason: string;
  allowedRoles: ("TEAM_OWNER" | "TEAM_MEMBER" | "TEAM_ADMIN" | "TEAM_VIEWER" | "TEAM_DEVELOPER" | "TEAM_FINANCE")[];
  address: {
    country?: string;
    state?: string;
    lga?: string;
    name?: string;
    latitude?: number;
    longitude?: number;
    branchName?: string;
    landmark?: string;
  };
  /** @default false */
  isDeleted: boolean;
  /** @format date-time */
  deletedAt: string;
  _id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface ListTeamsResponseDto {
  nextPage?: number | null;
  previousPage?: number | null;
  currentPage: number;
  results: Team[];
  perPageLimit: number;
  totalRecords: number;
  totalPages: number;
}

export interface PointDto {
  lat: number;
  lng: number;
  label?: string;
}

export interface QuoteDto {
  pickup: PointDto;
  dropoff: PointDto;
  stops?: PointDto[];
  countryCode?: string;
  stateCode?: string;
  batchDiscountPercent?: number;
}

export interface FeedbackDto {
  quoteShortId: string;
  verdict: object;
  suggestedPrice?: number;
  segment?: object;
}

export interface DeliveryPriceEventDto {
  quoteShortId?: string;
  type?: "share" | "copy" | "book";
}

export interface UpdateDeliveryCalculatorConfigDto {
  /**
   * Extra stops a quote may include beyond the first drop-off
   * @min 0
   * @max 20
   */
  maxExtraStops?: number;
  /**
   * Days after which a saved quote is treated as stale
   * @min 1
   * @max 365
   */
  staleDays?: number;
  /**
   * Percentage off for batch (multi-stop) quotes, 0-100
   * @min 0
   * @max 100
   */
  batchDiscountPercent?: number;
}

export interface WebPointDto {
  lat: number;
  lng: number;
  label?: string;
}

export interface WebContactDto {
  name: string;
  phone: string;
}

export interface CreateWebOrderDto {
  category: string;
  pickup: WebPointDto;
  dropoff: WebPointDto;
  sender: WebContactDto;
  receiver: WebContactDto;
  note?: string;
  countryCode?: string;
  stateCode?: string;
}

export interface SupportUnreadResponseDto {
  /**
   * Unread support messages for the caller
   * @example 3
   */
  count: number;
}

export interface PingResponseDto {
  /**
   * Always "ping".
   * @example "ping"
   */
  object: string;
  /**
   * True when the Developer API is reachable.
   * @example true
   */
  ok: boolean;
}

export interface PublicAccountDto {
  /**
   * Always "account".
   * @example "account"
   */
  object: string;
  /** @example "team_6560f0c2a1b2c3d4e5f60718" */
  id: string;
  /** @example "Acme Logistics" */
  name: string;
  company_name: string | null;
  website: string | null;
  support_email: string | null;
  support_phone: string | null;
  /** Whether the account owner's email is verified. */
  email_verified: boolean;
  /** Whether the account owner's phone is verified. */
  phone_verified: boolean;
  /** Live mode works only while this is approved. Test mode always works. */
  live_status: "not_requested" | "pending" | "approved" | "rejected" | "suspended";
  /** true when this request used a live key. */
  livemode: boolean;
  /** @example "2026-11-09T10:15:00.000Z" */
  created: string;
}

export interface PublicWalletDto {
  /**
   * Always "wallet".
   * @example "wallet"
   */
  object: string;
  /** @example "NGN" */
  currency: string;
  /**
   * What the team can spend now: balance minus held. Kobo.
   * @example 100000000
   */
  available: number;
  /**
   * Reserved for orders in progress. Kobo.
   * @example 0
   */
  held: number;
  /** false for the test-mode wallet (play money). */
  livemode: boolean;
}

export interface CreateFundingSessionRequestDto {
  /**
   * Kobo to add to the live wallet (₦50,000 here).
   * @example 5000000
   */
  amount: number;
  /**
   * Where the payer lands after paying.
   * @example "https://acme.com/billing/funded"
   */
  success_url: string;
  /**
   * Where the payer lands on cancel.
   * @example "https://acme.com/billing"
   */
  cancel_url?: string;
}

export interface FundingSessionDto {
  /** @example "funding_session" */
  object: string;
  /** The payment reference; the wallet transaction carries it too. */
  reference: string;
  /** Send the payer here to pay by card. */
  url: string;
  /** Kobo. */
  amount: number;
  /** @example "NGN" */
  currency: string;
  /** @example true */
  livemode: boolean;
  created: string;
}

export interface PublicWalletTransactionDto {
  /** @example "transaction" */
  object: string;
  /** @example "txn_6560f0c2a1b2c3d4e5f60718" */
  id: string;
  type: "credit" | "debit";
  /**
   * wallet_funding, test_funding, order_payment, …
   * @example "order_payment"
   */
  purpose: string;
  status: "processing" | "success" | "failed" | "cancelled";
  /** @example 250000 */
  amount: number;
  /** @example "NGN" */
  currency: string;
  /** The balance once this transaction landed. */
  balance_after: number | null;
  description: string | null;
  /** @example "ord_6560f0c2a1b2c3d4e5f60718" */
  order: string | null;
  livemode: boolean;
  created: string;
}

export interface PublicFundingAccountDto {
  /** @example "funding_account" */
  object: string;
  /** pending while Paystack checks the BVN. */
  status: "pending" | "active" | "failed";
  /** @example "Wema Bank" */
  bank_name: string | null;
  /** @example "9930000000" */
  account_number: string | null;
  account_name: string | null;
  /**
   * The last four digits of the BVN it was set up with.
   * @example "5678"
   */
  bvn_last4: string;
  /** Why Paystack could not issue it, when it failed. */
  failure_reason: string | null;
}

export interface FundTestWalletRequestDto {
  /**
   * Kobo to add to the test wallet (₦500,000 here).
   * @min 1
   * @max 1000000000
   * @example 50000000
   */
  amount: number;
}

export interface PublicServiceAreaDto {
  /** @example "service_area" */
  object: string;
  /**
   * Send this as service_area when you quote or order.
   * @example "NG-LA"
   */
  id: string;
  /** @example "NG" */
  country_code: string;
  /** @example "Nigeria" */
  country_name: string;
  /** @example "LA" */
  state_code: string;
  /** @example "Lagos" */
  state_name: string;
  /** @example "NGN" */
  currency: string;
  /**
   * The lowest price of a delivery here, in minor units.
   * @example 2000000
   */
  minimum_price: number;
  /**
   * How far from a pickup riders are looked for.
   * @example 20
   */
  rider_search_radius_km: number;
}

export interface ServiceAreaListDto {
  /** @example "list" */
  object: string;
  data: PublicServiceAreaDto[];
}

export interface StopContactDto {
  /**
   * @minLength 1
   * @maxLength 80
   * @example "Bola Ade"
   */
  name: string;
  /**
   * The person the rider calls at this stop.
   * @minLength 7
   * @maxLength 20
   * @example "+2348031234567"
   */
  phone: string;
}

export interface StopPackageDto {
  /**
   * @minLength 1
   * @maxLength 200
   * @example "Two pairs of shoes"
   */
  description: string;
  /**
   * What it is worth, in minor units.
   * @min 0
   * @example 2500000
   */
  value?: number;
}

export interface StopInputDto {
  /**
   * @min -90
   * @max 90
   * @example 6.4281
   */
  lat: number;
  /**
   * @min -180
   * @max 180
   * @example 3.4216
   */
  lng: number;
  /**
   * @minLength 3
   * @maxLength 300
   * @example "1 Admiralty Way, Lekki, Lagos"
   */
  address: string;
  contact: StopContactDto;
  /**
   * @maxLength 500
   * @example "Gate 3, ask for Bola"
   */
  instructions?: string;
  package?: StopPackageDto;
}

export interface CreateQuoteRequestDto {
  /** single: [pickup, drop-off]. batch: [pickup, drop-off, drop-off…] (up to 20). bulk: [pickup, pickup…, drop-off] (up to 20 pickups). */
  type: "single" | "batch" | "bulk";
  /**
   * Where the delivery is, from GET /service-areas.
   * @example "NG-LA"
   */
  service_area: string;
  /** In the order the rider visits them. */
  stops: StopInputDto[];
  /**
   * For a scheduled delivery.
   * @example "2026-11-12T09:30:00Z"
   */
  scheduled_for?: string;
}

export interface QuoteBreakdownDto {
  /** What the rider is paid for the route. */
  delivery_fee: number;
  /** Pickriders' service charge. */
  service_charge: number;
}

export interface QuoteStopDto {
  role: "pickup" | "dropoff";
  /**
   * The normalized address.
   * @example "1 Admiralty Way, Lekki, Lagos, Nigeria"
   */
  address: string;
  lat: number;
  lng: number;
  /** @example {"name":"Bola Ade","phone":"+2348031234567"} */
  contact: object;
  instructions: string | null;
  /** @example {"description":"Shoes","value":2500000} */
  package: object | null;
}

export interface PublicQuoteDto {
  /** @example "quote" */
  object: string;
  /**
   * Send it as quote_id when you create the order.
   * @example "quo_6560f0c2a1b2c3d4e5f60718"
   */
  id: string;
  type: "single" | "batch" | "bulk";
  /** @example "NG-LA" */
  service_area: string;
  /** @example "NGN" */
  currency: string;
  /**
   * What a fixed-price order costs.
   * @example 350000
   */
  recommended_price: number;
  /**
   * The lowest a rider may offer, when you let riders bid.
   * @example 280000
   */
  min_price: number;
  /**
   * The highest a rider may bid (the surge cap).
   * @example 420000
   */
  max_price: number;
  breakdown: QuoteBreakdownDto;
  /**
   * Road distance of the whole route, in metres.
   * @example 8400
   */
  distance_m: number;
  /**
   * Estimated time from pickup to the last drop-off, in seconds.
   * @example 1870
   */
  duration_s: number;
  stops: QuoteStopDto[];
  scheduled_for?: string | null;
  /** The price holds until then. */
  expires_at: string;
  /** false once an order has used it, or it has expired. */
  usable: boolean;
  livemode: boolean;
  created: string;
}

export interface RiderAvailabilityDto {
  /** @example "rider_availability" */
  object: string;
  /** @example "NG-LA" */
  service_area: string;
  /**
   * Riders an order from this point would reach now.
   * @example 4
   */
  nearby_count: number;
  /** True when the count hit the area's search cap: there may be more. */
  at_least: boolean;
  /**
   * Rough time to pickup, in seconds.
   * @example 420
   */
  estimated_pickup_s: number | null;
  /** @example 20 */
  radius_km: number;
}

export interface OrderPricingRequestDto {
  /**
   * fixed: the quote's price; the first rider to accept it takes the order. bidding: riders send offers (GET /orders/{id}/offers) and you accept one.
   * @default "fixed"
   */
  mode: "fixed" | "bidding";
  /**
   * Bidding only, and required for it: the most you pay in all (the rider's fee plus the service charge), in kobo. At least the quote's price. Your wallet holds it until you accept an offer.
   * @min 1
   * @example 450000
   */
  max_amount?: number;
  /**
   * Bidding only: riders can't offer less than this percentage of the quoted delivery fee. Defaults to the service area's floor.
   * @min 1
   * @max 100
   * @example 80
   */
  min_offer_percentage?: number;
  /**
   * Bidding only: this many seconds after riders are first rung, the lowest standing offer is accepted for you. With no offer by then, the order goes out at the quoted price, as a fixed-price order. Without it, offers wait for you.
   * @min 15
   * @max 3600
   * @example 120
   */
  auto_accept_after_s?: number;
}

export interface TestOptionsDto {
  /** Move the order along by itself, one step about every 15 seconds, until it is delivered. */
  auto_advance?: boolean;
  /** Act out a failure as the order is advanced. no_riders: no rider accepts and Pickriders cancels it (failed). rider_cancels: the first rider drops out before pickup and the search starts again. delivery_fails: the rider reaches the first drop-off and the delivery fails (failed, with the trip so far charged). */
  scenario?: "no_riders" | "rider_cancels" | "delivery_fails";
}

export interface CreateOrderRequestDto {
  /**
   * A quote from POST /quotes that has not expired or been used. Its stops and price are used.
   * @example "quo_6560f0c2a1b2c3d4e5f60718"
   */
  quote_id?: string;
  /** Required without quote_id. With one, it must match the quote. */
  type?: "single" | "batch" | "bulk";
  /**
   * Required without quote_id.
   * @example "NG-LA"
   */
  service_area?: string;
  /** Required without quote_id, in the order the rider visits them (see POST /quotes). */
  stops?: StopInputDto[];
  /**
   * Without quote_id, for a scheduled delivery.
   * @example "2026-11-12T09:30:00Z"
   */
  scheduled_for?: string;
  /**
   * Your own id for the order, unique per mode. Find the order by it with GET /orders?reference=.
   * @minLength 1
   * @maxLength 100
   * @example "cart-981"
   */
  reference?: string;
  /**
   * Up to 20 keys of your own (keys up to 40 characters, string values up to 500), returned with the order.
   * @example {"cart_id":"c_981"}
   */
  metadata?: object;
  /**
   * auto rings riders now (or at the scheduled time). manual waits for POST /orders/{id}/dispatch.
   * @default "auto"
   */
  dispatch?: "auto" | "manual";
  /** Fixed price unless you choose bidding. */
  pricing?: OrderPricingRequestDto;
  /** Test keys only. */
  test_options?: TestOptionsDto;
}

export interface OrderPricingDto {
  /** fixed: the quote's price. bidding: riders send offers and you accept one (GET /orders/{id}/offers). A bidding order whose auto-accept found no offer becomes fixed: it goes out at the quoted price. */
  mode: "fixed" | "bidding";
  /** @example "NGN" */
  currency: string;
  /**
   * What the order costs you: the delivery fee plus the service charge. For bidding, the quoted price until you accept an offer, then the offer plus the service charge.
   * @example 350000
   */
  amount: number;
  /**
   * What the rider is paid.
   * @example 300000
   */
  delivery_fee: number;
  /** @example 50000 */
  service_charge: number;
  /**
   * Bidding only: the most you pay in all, held in your wallet until you accept an offer.
   * @example 450000
   */
  max_amount: number | null;
  /**
   * Bidding only: riders can't offer less than this percentage of the quoted delivery fee.
   * @example 80
   */
  min_offer_percentage: number | null;
  /**
   * Bidding only: seconds after riders are first rung when the lowest offer is accepted for you.
   * @example 120
   */
  auto_accept_after_s: number | null;
}

export interface OrderStopContactDto {
  /** @example "Bola Ade" */
  name: string;
  /** @example "+2348031234567" */
  phone: string;
}

export interface OrderStopPackageDto {
  /** @example "Two pairs of shoes" */
  description: string;
  /**
   * In minor units.
   * @example 2500000
   */
  value: number | null;
}

export interface OrderStopProofLocationDto {
  lat: number;
  lng: number;
}

export interface OrderStopProofDto {
  /** confirmation_code: the recipient gave the rider the drop-off's code. rider_confirmed: the rider confirmed a pickup. */
  method: "confirmation_code" | "rider_confirmed";
  completed_at: string;
  /** Where the rider was, from the rider app's last reported position. */
  location: OrderStopProofLocationDto | null;
  /** Who handed over or received the package. */
  recipient_name: string | null;
}

export interface OrderStopPendingChangeDto {
  /** @example "3 Bourdillon Road, Ikoyi, Lagos" */
  address: string;
  lat: number;
  lng: number;
  /**
   * What the move adds to the price, held until the rider answers.
   * @example 50000
   */
  extra_amount: number;
  /** If the rider has not answered by then, the move is dropped. */
  expires_at: string | null;
}

export interface OrderStopDto {
  /** @example "stop_6560f0c2a1b2c3d4e5f60718" */
  id: string;
  role: "pickup" | "dropoff";
  status: "pending" | "en_route" | "arrived" | "completed" | "cancelled";
  /** @example "1 Admiralty Way, Lekki, Lagos" */
  address: string;
  lat: number;
  lng: number;
  contact: OrderStopContactDto;
  instructions: string | null;
  package: OrderStopPackageDto | null;
  /**
   * Drop-offs only: the code the recipient gives the rider on delivery. Share it with the recipient.
   * @example "4821"
   */
  confirmation_code: string | null;
  arrived_at: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
  /** Once the stop is completed. */
  proof: OrderStopProofDto | null;
  /** A move waiting for the rider to accept (PATCH /orders/{id}/stops/{stop_id}). */
  pending_change: OrderStopPendingChangeDto | null;
  /** Drop-offs only: a tracking page for this stop's recipient. It shows no other stop's address. */
  tracking_url: string | null;
}

export interface OrderRiderVehicleDto {
  /** @example "Honda" */
  make: string | null;
  /** @example "Ace 125" */
  model: string | null;
  /** @example "Red" */
  color: string | null;
  /** @example "LND-123-XY" */
  plate_number: string | null;
}

export interface OrderRiderDto {
  /**
   * First name and last initial.
   * @example "Tunde A."
   */
  name: string;
  /** @example "+2348031234567" */
  phone: string | null;
  photo_url: string | null;
  /** @example 4.8 */
  rating: number | null;
  vehicle: OrderRiderVehicleDto | null;
}

export interface OrderCancellationDto {
  cancelled_by: "developer" | "pickriders";
  reason: string | null;
  cancelled_at: string;
  /**
   * What the cancellation cost you, from what was held: the service charge and the rider share once a rider is on the way.
   * @example 50000
   */
  charged_amount: number | null;
  /**
   * What went back to your available balance.
   * @example 300000
   */
  refunded_amount: number | null;
}

export interface PublicOrderDto {
  /** @example "order" */
  object: string;
  /** @example "ord_6560f0c2a1b2c3d4e5f60718" */
  id: string;
  type: "single" | "batch" | "bulk";
  status:
    | "scheduled"
    | "awaiting_dispatch"
    | "searching"
    | "rider_assigned"
    | "picking_up"
    | "in_transit"
    | "delivered"
    | "cancelled"
    | "failed";
  /**
   * Our order number, shown to riders and support.
   * @example "PR-1042"
   */
  number: string;
  /** Your own id for the order, unique per mode. */
  reference: string | null;
  /** @example {"cart_id":"c_981"} */
  metadata: object;
  /** @example "quo_6560f0c2a1b2c3d4e5f60718" */
  quote_id: string | null;
  /** @example "NG-LA" */
  service_area: string;
  pricing: OrderPricingDto;
  /** Pickups first, then drop-offs, in route order. */
  stops: OrderStopDto[];
  /** Set once a rider accepts. */
  rider: OrderRiderDto | null;
  /** A tracking page for the whole order, without addresses or phones. Each drop-off has its own link too. */
  tracking_url: string;
  dispatch: "auto" | "manual";
  scheduled_for?: string | null;
  cancellation: OrderCancellationDto | null;
  delivered_at: string | null;
  livemode: boolean;
  created: string;
  updated: string;
}

export interface UpdateStopContactDto {
  /**
   * @minLength 1
   * @maxLength 80
   * @example "Bola Ade"
   */
  name?: string;
  /**
   * @minLength 7
   * @maxLength 20
   * @example "+2348031234567"
   */
  phone?: string;
}

export interface UpdateStopPackageDto {
  /**
   * @minLength 1
   * @maxLength 200
   * @example "Two pairs of shoes"
   */
  description?: string;
  /**
   * In minor units.
   * @min 0
   * @example 2500000
   */
  value?: number;
}

export interface UpdateStopRequestDto {
  /**
   * @min -90
   * @max 90
   * @example 6.4281
   */
  lat?: number;
  /**
   * @min -180
   * @max 180
   * @example 3.4216
   */
  lng?: number;
  /**
   * @minLength 3
   * @maxLength 300
   * @example "1 Admiralty Way, Lekki, Lagos"
   */
  address?: string;
  contact?: UpdateStopContactDto;
  /** @maxLength 500 */
  instructions?: string;
  package?: UpdateStopPackageDto;
}

export interface OfferRiderDto {
  /** @example "Tunde" */
  first_name: string;
  /**
   * Average rating out of 5; null before any.
   * @example 4.8
   */
  rating: number | null;
  /**
   * Deliveries the rider has completed on Pickriders.
   * @example 312
   */
  completed_trips: number;
}

export interface PublicOfferDto {
  /** @example "offer" */
  object: string;
  /** @example "off_6560f0c2a1b2c3d4e5f60718" */
  id: string;
  /** @example "ord_6560f0c2a1b2c3d4e5f60718" */
  order: string;
  /** pending: you can accept it until expires_at. declined: you declined it, or accepted another. expired: it lapsed unanswered. */
  status: "pending" | "accepted" | "declined" | "expired";
  /** @example "NGN" */
  currency: string;
  /**
   * What you pay if you accept: the delivery fee plus the service charge.
   * @example 330000
   */
  amount: number;
  /**
   * What the rider asks to be paid.
   * @example 280000
   */
  delivery_fee: number;
  rider: OfferRiderDto;
  /**
   * Roughly how long the rider would take to reach the pickup, from where they last were. Null when that isn't known.
   * @example 420
   */
  eta_to_pickup_seconds: number | null;
  /** @example "2026-11-12T09:35:00.000Z" */
  expires_at: string | null;
  /** @example "2026-11-12T09:30:00.000Z" */
  created: string;
}

export interface TrackingLocationDto {
  lat: number;
  lng: number;
  /** Degrees, 0 = north, when the rider app reports it. */
  heading: number | null;
  /** When the rider app last reported this position. */
  updated_at: string | null;
}

export interface TrackingRiderDto {
  /** @example "Tunde A." */
  name: string;
  photo_url: string | null;
  vehicle: OrderRiderVehicleDto | null;
  location: TrackingLocationDto | null;
}

export interface TrackingStopDto {
  /** @example "stop_6560f0c2a1b2c3d4e5f60719" */
  id: string;
  role: "pickup" | "dropoff";
  status: "pending" | "en_route" | "arrived" | "completed" | "cancelled";
  address: string;
  /**
   * Seconds until the rider reaches it; null once it is done or while no rider position is known.
   * @example 540
   */
  eta_s: number | null;
  completed_at: string | null;
}

export interface OrderTrackingDto {
  /** @example "order_tracking" */
  object: string;
  /** @example "ord_6560f0c2a1b2c3d4e5f60718" */
  order_id: string;
  status:
    | "scheduled"
    | "awaiting_dispatch"
    | "searching"
    | "rider_assigned"
    | "picking_up"
    | "in_transit"
    | "delivered"
    | "cancelled"
    | "failed";
  /** While a rider has the order and it is not done. */
  rider: TrackingRiderDto | null;
  stops: TrackingStopDto[];
  /** The page your customer can open, without an API key. */
  tracking_url: string;
}

export interface PublicTrackingDto {
  /** @example "tracking" */
  object: string;
  /** @example "PR-1042" */
  number: string;
  status:
    | "scheduled"
    | "awaiting_dispatch"
    | "searching"
    | "rider_assigned"
    | "picking_up"
    | "in_transit"
    | "delivered"
    | "cancelled"
    | "failed";
  rider: TrackingRiderDto | null;
  /** The link's drop-off; null for the order's own link, which shows no addresses. */
  stop: TrackingStopDto | null;
  /** Seconds until the rider reaches the link's drop-off, or the next stop for the order's link. */
  eta_s: number | null;
}

export interface AdvanceOrderRequestDto {
  /** Keep going until the order reaches this status. Without it, the order takes one step. */
  to?: "rider_assigned" | "picking_up" | "in_transit" | "delivered";
}

export interface CreateWebhookEndpointRequestDto {
  /**
   * An https URL on the public internet.
   * @minLength 1
   * @example "https://api.acme.test/pickriders/webhooks"
   */
  url: string;
  /**
   * The events to send, or ["*"] for all of them, including events added later.
   * @example ["order.delivered","order.failed"]
   */
  enabled_events: (
    | "*"
    | "order.created"
    | "order.searching"
    | "order.offer.created"
    | "order.offer.expired"
    | "order.rider_assigned"
    | "order.rider_changed"
    | "order.picked_up"
    | "order.stop.arrived"
    | "order.stop.completed"
    | "order.delivered"
    | "order.cancelled"
    | "order.failed"
    | "wallet.funded"
    | "wallet.balance_low"
    | "account.updated"
  )[];
  /**
   * @minLength 0
   * @example "Production order updates"
   */
  description?: string;
}

export interface PublicWebhookEndpointWithSecretDto {
  /** @example "webhook_endpoint" */
  object: string;
  /** @example "we_6560f0c2a1b2c3d4e5f60718" */
  id: string;
  /** @example "https://api.acme.test/pickriders/webhooks" */
  url: string;
  description: string | null;
  /** @example ["order.delivered"] */
  enabled_events: string[];
  status: "enabled" | "disabled";
  /** Why it is disabled: manual (you turned it off) or failing (every delivery failed for 3 days). */
  disabled_reason: "manual" | "failing" | null;
  /** Since when every delivery has failed. At 3 days the endpoint is turned off. */
  failing_since: string | null;
  livemode: boolean;
  /** After a secret roll, events are signed with the old secret too until this time. */
  previous_secret_expires_at: string | null;
  /** @example "2026-11-11T09:30:00.000Z" */
  created: string;
  /**
   * Check each event’s Pickriders-Signature with it. Shown only now; store it safely.
   * @example "whsec_Vd3XKqmWw0q9oD1yQm6m0pN5yJ0bX6v2a5r8cT4uHkE"
   */
  secret: string;
}

export interface PublicWebhookEndpointDto {
  /** @example "webhook_endpoint" */
  object: string;
  /** @example "we_6560f0c2a1b2c3d4e5f60718" */
  id: string;
  /** @example "https://api.acme.test/pickriders/webhooks" */
  url: string;
  description: string | null;
  /** @example ["order.delivered"] */
  enabled_events: string[];
  status: "enabled" | "disabled";
  /** Why it is disabled: manual (you turned it off) or failing (every delivery failed for 3 days). */
  disabled_reason: "manual" | "failing" | null;
  /** Since when every delivery has failed. At 3 days the endpoint is turned off. */
  failing_since: string | null;
  livemode: boolean;
  /** After a secret roll, events are signed with the old secret too until this time. */
  previous_secret_expires_at: string | null;
  /** @example "2026-11-11T09:30:00.000Z" */
  created: string;
}

export interface UpdateWebhookEndpointRequestDto {
  /**
   * @minLength 1
   * @example "https://api.acme.test/pickriders/webhooks"
   */
  url?: string;
  enabled_events?: (
    | "*"
    | "order.created"
    | "order.searching"
    | "order.offer.created"
    | "order.offer.expired"
    | "order.rider_assigned"
    | "order.rider_changed"
    | "order.picked_up"
    | "order.stop.arrived"
    | "order.stop.completed"
    | "order.delivered"
    | "order.cancelled"
    | "order.failed"
    | "wallet.funded"
    | "wallet.balance_low"
    | "account.updated"
  )[];
  /**
   * An empty string clears it.
   * @minLength 0
   */
  description?: string;
  /** true stops sending events to the endpoint; false starts again. */
  disabled?: boolean;
}

export interface WebhookDeliveryAttemptDto {
  /** @example "2026-11-11T09:30:01.000Z" */
  at: string;
  /** Null when no response came back. */
  status_code: number | null;
  /** @example 182 */
  duration_ms: number;
  /** The first 2 KB of the response. */
  response_body: string | null;
  /** @example "The endpoint answered 500." */
  error: string | null;
}

export interface WebhookDeliveryDto {
  /** @example "webhook_delivery" */
  object: string;
  /** @example "whd_6560f0c2a1b2c3d4e5f60718" */
  id: string;
  /** @example "we_6560f0c2a1b2c3d4e5f60718" */
  endpoint_id: string;
  /** @example "evt_6560f0c2a1b2c3d4e5f60718" */
  event_id: string;
  /** @example "order.delivered" */
  event_type: string;
  /** pending: waiting for its first try or a retry. failed: retries are over. */
  status: "pending" | "delivering" | "succeeded" | "failed";
  attempt_count: number;
  /** When it is tried next, while pending. */
  next_attempt_at: string | null;
  delivered_at: string | null;
  created: string;
  /** The JSON body sent; null once the event is gone. */
  request_body: string | null;
  attempts: WebhookDeliveryAttemptDto[];
}

export interface PublicEventDataDto {
  /** The object the event is about, as it was when the event happened: an order (order.*), a wallet (wallet.*) or your account (account.updated). */
  object: Record<string, any>;
  /**
   * For order.stop.arrived, order.stop.completed and order.picked_up: the stop.
   * @example "stop_6560f0c2a1b2c3d4e5f60719"
   */
  stop_id?: string;
  /** For order.offer.created and order.offer.expired: the offer. */
  offer?: PublicOfferDto;
  /** For wallet.funded: the credit that funded the wallet. data.object is the wallet after it. */
  transaction?: PublicWalletTransactionDto;
  /**
   * For wallet.balance_low: the threshold the available balance dropped below, in kobo.
   * @example 500000
   */
  threshold?: number;
}

export interface PublicEventDto {
  /** @example "event" */
  object: string;
  /** @example "evt_6560f0c2a1b2c3d4e5f60718" */
  id: string;
  /** @example "order.delivered" */
  type: string;
  /** @example "2026-11-11T09:30:00.000Z" */
  created: string;
  livemode: boolean;
  data: PublicEventDataDto;
}

export interface ResendEventRequestDto {
  /**
   * Send only to this endpoint. Without it, every enabled endpoint that receives this event type.
   * @example "we_6560f0c2a1b2c3d4e5f60718"
   */
  webhook_endpoint?: string;
}

export interface ResentDeliveryDto {
  /** @example "whd_6560f0c2a1b2c3d4e5f60718" */
  id: string;
  /** @example "we_6560f0c2a1b2c3d4e5f60718" */
  webhook_endpoint: string;
}

export interface ResendEventResponseDto {
  /** @example "event_resend" */
  object: string;
  /** @example "evt_6560f0c2a1b2c3d4e5f60718" */
  event_id: string;
  /** One new delivery per endpoint, sent at once and retried on failure. */
  deliveries: ResentDeliveryDto[];
}

export interface DeveloperSignupRequestDto {
  /**
   * @maxLength 80
   * @example "Ada"
   */
  firstname: string;
  /**
   * @maxLength 80
   * @example "Obi"
   */
  lastname: string;
  /**
   * @maxLength 254
   * @example "ada@acme.com"
   */
  email: string;
  /**
   * Verified by SMS before live access. Local or international format.
   * @example "08031234567"
   */
  phone: string;
  /**
   * @minLength 8
   * @maxLength 128
   */
  password: string;
  /**
   * The first team's name. Defaults to "<firstname>'s team".
   * @minLength 2
   * @maxLength 80
   * @example "Acme Logistics"
   */
  teamName?: string;
  /**
   * ISO 3166-1 alpha-2. Sets the currency.
   * @default "NG"
   * @pattern /^[A-Z]{2}$/
   * @example "NG"
   */
  countryCode?: string;
  /**
   * From an invitation link: join that team instead of creating one. The email must be the invited one, and it counts as verified.
   * @minLength 20
   * @maxLength 200
   */
  invitationToken?: string;
}

export interface DeveloperUserDto {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  phoneVerified: boolean;
}

export interface DeveloperTeamSummaryDto {
  /** Send this as X-Team-Id on dashboard calls. */
  id: string;
  name: string;
  handle: string;
  /** The signed-in user's role in this team. */
  role: "TEAM_OWNER" | "TEAM_MEMBER" | "TEAM_ADMIN" | "TEAM_VIEWER" | "TEAM_DEVELOPER" | "TEAM_FINANCE";
  /** True when the signed-in user owns the team. */
  isOwner: boolean;
  /** True once the team owner has verified both email and phone. Live access can then be requested; it still needs a Pickriders admin's approval. */
  canRequestLive: boolean;
  /** Where the team is with live access. Test mode works in every status. */
  liveStatus: "NOT_REQUESTED" | "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
  /** What the signed-in user's role allows in this team. Show or hide controls with it. */
  permissions: (
    | "team.read"
    | "team.manage"
    | "team.transfer"
    | "live.request"
    | "keys.read"
    | "keys.write"
    | "webhooks.read"
    | "webhooks.write"
    | "orders.read"
    | "orders.write"
    | "wallet.read"
    | "wallet.fund"
    | "billing.read"
    | "logs.read"
  )[];
}

export interface DeveloperSessionResponseDto {
  user: DeveloperUserDto;
  /** The user's active teams, oldest first. */
  teams: DeveloperTeamSummaryDto[];
  /** Bearer token for dashboard calls. */
  accessToken: string;
  /** Seconds until accessToken expires. */
  expiresIn: number;
}

export interface DeveloperLoginRequestDto {
  /** @example "ada@acme.com" */
  email: string;
  /** @maxLength 128 */
  password: string;
  /**
   * From an invitation link: accept it while signing in. Lets an existing customer account become a developer account.
   * @minLength 20
   * @maxLength 200
   */
  invitationToken?: string;
}

export interface DeveloperMeResponseDto {
  user: DeveloperUserDto;
  /** The user's active teams, oldest first. */
  teams: DeveloperTeamSummaryDto[];
}

export interface DeveloperSendEmailCodeRequestDto {
  /**
   * Corrects the address first. Only while the current one is unverified.
   * @maxLength 254
   * @example "ada@acme.com"
   */
  email?: string;
}

export interface DeveloperCodeSentResponseDto {
  /** Where the code went: the email address or phone number. */
  sentTo: string;
  /** Seconds until the code stops working. */
  expiresIn: number;
  /** Seconds until another code can be sent. */
  resendAfter: number;
}

export interface DeveloperVerifyCodeRequestDto {
  /**
   * The code from the email or SMS.
   * @pattern /^\d{4,8}$/
   * @example "4821"
   */
  code: string;
}

export interface DeveloperSendPhoneCodeRequestDto {
  /**
   * Corrects the number first. Only while the current one is unverified.
   * @example "08031234567"
   */
  phone?: string;
}

export interface DeveloperForgotPasswordRequestDto {
  /**
   * @maxLength 254
   * @example "ada@acme.com"
   */
  email: string;
}

export interface DeveloperResetPasswordRequestDto {
  /**
   * @maxLength 254
   * @example "ada@acme.com"
   */
  email: string;
  /**
   * The code from the reset email.
   * @pattern /^\d{4,8}$/
   * @example "4821"
   */
  code: string;
  /**
   * @minLength 8
   * @maxLength 128
   */
  password: string;
}

export interface CreateDeveloperTeamRequestDto {
  /**
   * @minLength 2
   * @maxLength 80
   * @example "Acme staging"
   */
  name: string;
}

export interface TeamInvitationInviterDto {
  id: string;
  name: string;
}

export interface TeamInvitationDto {
  id: string;
  email: string;
  role: "TEAM_OWNER" | "TEAM_MEMBER" | "TEAM_ADMIN" | "TEAM_VIEWER" | "TEAM_DEVELOPER" | "TEAM_FINANCE";
  status: "PENDING" | "ACCEPTED" | "DECLINED" | "REVOKED";
  /** A PENDING invitation past expiresAt. Resend it to send a fresh link. */
  expired: boolean;
  /** @format date-time */
  expiresAt: string;
  invitedBy: TeamInvitationInviterDto;
  /** @format date-time */
  lastSentAt: string;
  sendCount: number;
  /** @format date-time */
  createdAt: string;
}

export interface CreateTeamInvitationRequestDto {
  /** @example "bo@acme.com" */
  email: string;
  /** Ownership is transferred, never invited. */
  role: "TEAM_ADMIN" | "TEAM_DEVELOPER" | "TEAM_FINANCE" | "TEAM_VIEWER";
}

export interface TeamInvitationTokenRequestDto {
  /**
   * @minLength 20
   * @maxLength 200
   */
  token: string;
}

export interface TeamInvitationPreviewDto {
  teamName: string;
  /** The invited address. Sign up or sign in with this one. */
  email: string;
  role: "TEAM_OWNER" | "TEAM_MEMBER" | "TEAM_ADMIN" | "TEAM_VIEWER" | "TEAM_DEVELOPER" | "TEAM_FINANCE";
  invitedByName: string;
  /** @format date-time */
  expiresAt: string;
  /** Whether to show sign-in (true) or sign-up (false) to accept. */
  accountExists: boolean;
}

export interface AcceptTeamInvitationResponseDto {
  /** The team just joined. */
  team: DeveloperTeamSummaryDto;
}

export interface TeamMemberDto {
  /** The member's user id. Use it in member routes. */
  userId: string;
  name: string;
  email: string;
  role: "TEAM_OWNER" | "TEAM_MEMBER" | "TEAM_ADMIN" | "TEAM_VIEWER" | "TEAM_DEVELOPER" | "TEAM_FINANCE";
  isOwner: boolean;
  /** True for the signed-in user. */
  isYou: boolean;
  /** @format date-time */
  joinedAt?: string | null;
  /** @format date-time */
  lastLoginAt?: string | null;
}

export interface UpdateTeamMemberRoleRequestDto {
  /** Ownership moves with transfer-ownership instead. */
  role: "TEAM_ADMIN" | "TEAM_DEVELOPER" | "TEAM_FINANCE" | "TEAM_VIEWER";
}

export interface TransferTeamOwnershipRequestDto {
  /** An active member who becomes the owner. You become an admin. */
  userId: string;
}

export interface TeamAuditActorDto {
  id: string;
  name: string;
  email: string;
}

export interface TeamAuditTargetDto {
  /** @example "member" */
  type: string;
  id?: string;
  /** A readable name for it, e.g. an email. */
  label?: string;
}

export interface TeamAuditLogDto {
  id: string;
  /** @example "member.role_changed" */
  event: string;
  actor: TeamAuditActorDto | null;
  target: TeamAuditTargetDto | null;
  before: object | null;
  after: object | null;
  /** @format date-time */
  createdAt: string;
}

export interface TeamAuditLogListDto {
  object: "list";
  data: TeamAuditLogDto[];
  has_more: boolean;
  url: string;
}

export interface DeveloperAccountDto {
  /** The team id (X-Team-Id). */
  id: string;
  /** The display name. */
  name: string;
  companyName: string | null;
  website: string | null;
  supportEmail: string | null;
  supportPhone: string | null;
  useCase: string | null;
  expectedMonthlyVolume: "UP_TO_100" | "UP_TO_1000" | "UP_TO_10000" | "OVER_10000" | null;
  /** Whether the team owner's email is verified. */
  emailVerified: boolean;
  /** Whether the team owner's phone is verified. */
  phoneVerified: boolean;
  /** True once both are verified: live access can then be requested. */
  canRequestLive: boolean;
  liveStatus: "NOT_REQUESTED" | "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
  /** @format date-time */
  liveRequestedAt: string | null;
  /**
   * When Pickriders last decided on live access.
   * @format date-time
   */
  liveReviewedAt: string | null;
  /** Set while live access is REJECTED: why, and what to fix. */
  liveRejectionReason: string | null;
  /** Set while live access is SUSPENDED: why. */
  liveSuspensionReason: string | null;
}

export interface UpdateDeveloperAccountRequestDto {
  /**
   * The display name.
   * @minLength 2
   * @maxLength 80
   * @example "Acme Logistics"
   */
  name?: string;
  /**
   * @maxLength 120
   * @example "Acme Logistics Ltd"
   */
  companyName?: string | null;
  /**
   * @maxLength 200
   * @example "https://acme.com"
   */
  website?: string | null;
  /**
   * @maxLength 254
   * @example "support@acme.com"
   */
  supportEmail?: string | null;
  /**
   * @pattern /^\+?[0-9][0-9 ()-]{6,19}$/
   * @example "+2348031234567"
   */
  supportPhone?: string | null;
  /**
   * What you are building. Pickriders reads it when you ask for live access.
   * @maxLength 1000
   * @example "Same-day deliveries for our online store in Lagos."
   */
  useCase?: string | null;
  expectedMonthlyVolume?: "UP_TO_100" | "UP_TO_1000" | "UP_TO_10000" | "OVER_10000" | null;
}

export interface DeveloperApiKeyCreatorDto {
  id: string;
  name: string;
}

export interface DeveloperApiKeyDto {
  id: string;
  label: string;
  /**
   * The start of the key, to tell keys apart.
   * @example "sk_live_4fQ9"
   */
  prefix: string;
  livemode: boolean;
  /** Empty means full access. */
  scopes: string[];
  status: "ACTIVE" | "EXPIRING" | "EXPIRED" | "REVOKED";
  createdBy: DeveloperApiKeyCreatorDto | null;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  lastUsedAt: string | null;
  lastUsedIp: string | null;
  /**
   * Set on a rolled key: when it stops working.
   * @format date-time
   */
  expiresAt: string | null;
  /** @format date-time */
  revokedAt: string | null;
}

export interface CreateDeveloperApiKeyRequestDto {
  /**
   * @minLength 1
   * @maxLength 60
   * @example "Production server"
   */
  label: string;
  /** true for an sk_live_ key (needs approved live access), false for sk_test_. */
  livemode: boolean;
  /** Restrict the key to these scopes. Leave out (or empty) for full access. A :write scope includes :read. */
  scopes?: (
    | "account:read"
    | "account:write"
    | "wallet:read"
    | "wallet:write"
    | "orders:read"
    | "orders:write"
    | "webhooks:read"
    | "webhooks:write"
    | "events:read"
  )[];
}

export interface DeveloperApiKeySecretDto {
  id: string;
  label: string;
  /**
   * The start of the key, to tell keys apart.
   * @example "sk_live_4fQ9"
   */
  prefix: string;
  livemode: boolean;
  /** Empty means full access. */
  scopes: string[];
  status: "ACTIVE" | "EXPIRING" | "EXPIRED" | "REVOKED";
  createdBy: DeveloperApiKeyCreatorDto | null;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  lastUsedAt: string | null;
  lastUsedIp: string | null;
  /**
   * Set on a rolled key: when it stops working.
   * @format date-time
   */
  expiresAt: string | null;
  /** @format date-time */
  revokedAt: string | null;
  /**
   * Shown once. Store it now: Pickriders keeps only a hash.
   * @example "sk_test_…"
   */
  secret: string;
}

export interface RollDeveloperApiKeyRequestDto {
  /** How long the old key keeps working: "now" stops it at once. */
  expiresIn: "now" | "1h" | "24h" | "7d";
}

export interface IpAllowlistDto {
  /**
   * Addresses or CIDR ranges (IPv4 or IPv6) API keys may be used from. Empty allows any IP.
   * @example ["203.0.113.9","192.0.2.0/24"]
   */
  allowedIps: string[];
}

export interface UpdateIpAllowlistRequestDto {
  /**
   * The whole list; it replaces the current one. Send [] to allow any IP.
   * @maxItems 50
   * @example ["203.0.113.9","192.0.2.0/24"]
   */
  allowedIps: string[];
}

export interface LowBalanceAlertDto {
  /**
   * Kobo. Owners and finance get an email when the live wallet's available money drops below it; null turns it off.
   * @min 1
   * @max 100000000000
   * @example 5000000
   */
  threshold: number | null;
}

export interface SetUpFundingAccountRequestDto {
  /**
   * The Bank Verification Number: 11 digits.
   * @pattern /^\d{11}$/
   * @example "22212345678"
   */
  bvn: string;
  /**
   * A bank account (NUBAN) in the same name.
   * @pattern /^\d{10}$/
   * @example "0123456789"
   */
  account_number: string;
  /**
   * That account's bank code (from GET /payments/banks).
   * @pattern /^\d{3,6}$/
   * @example "058"
   */
  bank_code: string;
  /**
   * @minLength 1
   * @maxLength 60
   * @example "Ada"
   */
  first_name: string;
  /**
   * @minLength 1
   * @maxLength 60
   * @example "Obi"
   */
  last_name: string;
}

export interface AutoTopUpCardDto {
  /** @example "visa" */
  brand: string | null;
  /** @example "4081" */
  last4: string;
  exp_month: string | null;
  exp_year: string | null;
  bank: string | null;
}

export interface AutoTopUpDto {
  enabled: boolean;
  threshold: number | null;
  amount: number | null;
  card: AutoTopUpCardDto | null;
  last_charge_at: string | null;
  consecutive_failures: number;
  last_failure_reason: string | null;
  /** Why it turned itself off, if it did. */
  disabled_reason: string | null;
}

export interface ConfigureAutoTopUpRequestDto {
  /** Turning it on needs a saved card. */
  enabled: boolean;
  /**
   * Kobo: top up when the live wallet's available money drops below this.
   * @min 1
   * @max 100000000000
   * @example 2000000
   */
  threshold: number;
  /**
   * Kobo charged to the saved card each time.
   * @example 10000000
   */
  amount: number;
}

export interface DashboardCreateWebhookEndpointRequestDto {
  /**
   * An https URL on the public internet.
   * @minLength 1
   * @example "https://api.acme.test/pickriders/webhooks"
   */
  url: string;
  /**
   * The events to send, or ["*"] for all of them, including events added later.
   * @example ["order.delivered","order.failed"]
   */
  enabled_events: (
    | "*"
    | "order.created"
    | "order.searching"
    | "order.offer.created"
    | "order.offer.expired"
    | "order.rider_assigned"
    | "order.rider_changed"
    | "order.picked_up"
    | "order.stop.arrived"
    | "order.stop.completed"
    | "order.delivered"
    | "order.cancelled"
    | "order.failed"
    | "wallet.funded"
    | "wallet.balance_low"
    | "account.updated"
  )[];
  /**
   * @minLength 0
   * @example "Production order updates"
   */
  description?: string;
  /** true for a live endpoint (needs approved live access), false for test. */
  livemode: boolean;
}

export interface DashboardResendEventRequestDto {
  /** @example "evt_6560f0c2a1b2c3d4e5f60718" */
  event_id: string;
}

export interface AdminDeveloperOwnerDto {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
}

export interface AdminDeveloperRowDto {
  /** The team id. */
  id: string;
  name: string;
  handle: string;
  companyName: string | null;
  /** The whole team. SUSPENDED pauses test mode too. */
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  liveStatus: "NOT_REQUESTED" | "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
  /** @format date-time */
  liveRequestedAt: string | null;
  /** @format date-time */
  liveReviewedAt: string | null;
  owner: AdminDeveloperOwnerDto | null;
  /** @format date-time */
  createdAt: string;
}

export interface ListAdminDevelopersResponseDto {
  nextPage?: number;
  previousPage?: number;
  currentPage: number;
  results: AdminDeveloperRowDto[];
  perPageLimit: number;
  totalRecords: number;
  totalPages: number;
}

export interface AdminDeveloperReviewerDto {
  id: string;
  name: string;
}

export interface AdminDeveloperDetailDto {
  /** The team id. */
  id: string;
  name: string;
  handle: string;
  companyName: string | null;
  /** The whole team. SUSPENDED pauses test mode too. */
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  liveStatus: "NOT_REQUESTED" | "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
  /** @format date-time */
  liveRequestedAt: string | null;
  /** @format date-time */
  liveReviewedAt: string | null;
  owner: AdminDeveloperOwnerDto | null;
  /** @format date-time */
  createdAt: string;
  website: string | null;
  supportEmail: string | null;
  supportPhone: string | null;
  useCase: string | null;
  expectedMonthlyVolume: "UP_TO_100" | "UP_TO_1000" | "UP_TO_10000" | "OVER_10000" | null;
  liveRejectionReason: string | null;
  liveSuspensionReason: string | null;
  /** Who made the last decision. */
  liveReviewedBy: AdminDeveloperReviewerDto | null;
  /** Active members, the owner included. */
  memberCount: number;
}

export interface DeveloperLiveDecisionRequestDto {
  /**
   * @minLength 5
   * @maxLength 500
   * @example "Add your company website and describe what you deliver."
   */
  reason: string;
}

export type GetHeartbeatData = any;

export type GetDeliveryPricingData = object;

export interface GetCountriesParams {
  order?: "ASC" | "DESC";
  page?: number;
  limit?: number;
}

export type GetCountriesData = ListCountryResponseDto;

export type AddCountryData = Country;

export type UpdateCountryData = Country;

export type GetCountryByIdData = Country;

export type AddCountryStatesPayload = StateDto[];

export type AddCountryStatesData = StateDto[];

export type GetCountryStatesData = ListStateResponseDto;

export type GetCountryStateByIdData = State;

export type UpdateCountryStateData = State;

export interface OverviewParams {
  /** ISO date or YYYY-MM-DD (Lagos day) */
  from?: string;
  /** ISO date or YYYY-MM-DD (Lagos day, inclusive) */
  to?: string;
  /** 1 = everything since the first order */
  all?: string;
}

export type OverviewData = OverviewResponseDto;

export interface SeriesParams {
  /** ISO date or YYYY-MM-DD (Lagos day) */
  from?: string;
  /** ISO date or YYYY-MM-DD (Lagos day, inclusive) */
  to?: string;
  /** 1 = everything since the first order */
  all?: string;
  bucket?: "day" | "week" | "month";
  riderId?: string;
  userId?: string;
}

export type SeriesData = SeriesResponseDto;

export interface TopRidersParams {
  /** ISO date or YYYY-MM-DD (Lagos day) */
  from?: string;
  /** ISO date or YYYY-MM-DD (Lagos day, inclusive) */
  to?: string;
  /** 1 = everything since the first order */
  all?: string;
  limit?: string;
}

export type TopRidersData = TopRiderDto[];

export interface PeakHoursParams {
  /** ISO date or YYYY-MM-DD (Lagos day) */
  from?: string;
  /** ISO date or YYYY-MM-DD (Lagos day, inclusive) */
  to?: string;
  /** 1 = everything since the first order */
  all?: string;
}

export type PeakHoursData = PeakHoursResponseDto;

export interface ChargesParams {
  /** ISO date or YYYY-MM-DD (Lagos day) */
  from?: string;
  /** ISO date or YYYY-MM-DD (Lagos day, inclusive) */
  to?: string;
  /** 1 = everything since the first order */
  all?: string;
}

export type ChargesData = ChargesResponseDto;

export interface ChargesByRiderParams {
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
}

export type ChargesByRiderData = PageableType;

export interface ProviderFeesParams {
  /** ISO date or YYYY-MM-DD (Lagos day) */
  from?: string;
  /** ISO date or YYYY-MM-DD (Lagos day, inclusive) */
  to?: string;
  /** 1 = everything since the first order */
  all?: string;
  bucket?: "day" | "week" | "month";
}

export type ProviderFeesData = ProviderFeesResponseDto;

export interface ProviderFeeRowsParams {
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
}

export type ProviderFeeRowsData = ListProviderFeeRowsResponseDto;

export type AttentionData = AttentionResponseDto;

export interface CustomersOverviewParams {
  /** ISO date or YYYY-MM-DD (Lagos day) */
  from?: string;
  /** ISO date or YYYY-MM-DD (Lagos day, inclusive) */
  to?: string;
  /** 1 = everything since the first order */
  all?: string;
  bucket?: "day" | "week" | "month";
}

export type CustomersOverviewData = CustomersOverviewResponseDto;

export interface CustomersParams {
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
}

export type CustomersData = PageableType;

export interface BusinessesParams {
  search?: any;
  isActive?: any;
  sortBy?: "joined" | "name";
  order?: "ASC" | "DESC";
  limit?: any;
  page?: any;
}

export type BusinessesData = PageableType;

export interface UserOverviewParams {
  /** ISO date or YYYY-MM-DD (Lagos day) */
  from?: string;
  /** ISO date or YYYY-MM-DD (Lagos day, inclusive) */
  to?: string;
  /** 1 = everything since the first order */
  all?: string;
  userId: string;
}

export type UserOverviewData = UserOverviewResponseDto;

export interface GetTransactionsParams {
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
}

export type GetTransactionsData = ListTransactionResponseDto;

export interface AdminGetTransactionsParams {
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
}

export type AdminGetTransactionsData = ListAdminTransactionResponseDto;

export interface GetExternalPaymentMetricsParams {
  /** provide a user (entity) id to scope metrics to a single customer */
  entityId?: string;
  /** Comma-separated start and end date filter (e.g., 2023-09-01,2023-09-30) */
  dateRange?: string;
}

export type GetExternalPaymentMetricsData = ExternalPaymentMetricsResponseDto;

export interface GetTransactionSummaryParams {
  /** Comma-separated start and end date filter (e.g., 2023-09-01,2023-09-30) */
  dateRange?: string;
}

export type GetTransactionSummaryData = TransactionMetricsSummaryResponseDto;

export type GetTransactionData = AdminTransactionResponseDto;

export interface GetInsightsOverviewParams {
  /**
   * Comma-separated start and end date (e.g., 2023-09-01,2023-09-30)
   * @pattern DATE_RANGE_PATTERN
   */
  dateRange?: string;
}

export type GetInsightsOverviewData = InsightsOverviewResponseDto;

export interface GetEarningsSeriesParams {
  /**
   * Comma-separated start and end date (e.g., 2023-09-01,2023-09-30)
   * @pattern DATE_RANGE_PATTERN
   */
  dateRange?: string;
  /** @default "day" */
  bucket?: "day" | "week" | "month";
}

export type GetEarningsSeriesData = EarningsSeriesResponseDto;

export interface GetRiderReviewsParams {
  /** @default 1 */
  page?: number;
  /** @default 20 */
  limit?: number;
}

export type GetRiderReviewsData = RiderReviewsResponseDto;

export interface GetDemandParams {
  /**
   * Comma-separated start and end date (e.g., 2023-09-01,2023-09-30)
   * @pattern DATE_RANGE_PATTERN
   */
  dateRange?: string;
}

export type GetDemandData = DemandResponseDto;

export interface GetMyMapParams {
  /**
   * Comma-separated start and end date (e.g., 2023-09-01,2023-09-30)
   * @pattern DATE_RANGE_PATTERN
   */
  dateRange?: string;
}

export type GetMyMapData = MyMapResponseDto;

export interface GetInsightsLeaderboardParams {
  /**
   * Comma-separated start and end date (e.g., 2023-09-01,2023-09-30)
   * @pattern DATE_RANGE_PATTERN
   */
  dateRange?: string;
  /** @default "state" */
  scope?: "state" | "country";
}

export type GetInsightsLeaderboardData = LeaderboardResponseDto;

export type GetAchievementsData = AchievementsResponseDto;

export type AcknowledgeAchievementData = any;

export interface AdminGetRiderInsightsOverviewParams {
  /**
   * Comma-separated start and end date (e.g., 2023-09-01,2023-09-30)
   * @pattern DATE_RANGE_PATTERN
   */
  dateRange?: string;
  riderId: string;
}

export type AdminGetRiderInsightsOverviewData = InsightsOverviewResponseDto;

export interface AdminGetRiderEarningsSeriesParams {
  /**
   * Comma-separated start and end date (e.g., 2023-09-01,2023-09-30)
   * @pattern DATE_RANGE_PATTERN
   */
  dateRange?: string;
  /** @default "day" */
  bucket?: "day" | "week" | "month";
  riderId: string;
}

export type AdminGetRiderEarningsSeriesData = EarningsSeriesResponseDto;

export interface AdminGetRiderDeliveryMapParams {
  /**
   * Comma-separated start and end date (e.g., 2023-09-01,2023-09-30)
   * @pattern DATE_RANGE_PATTERN
   */
  dateRange?: string;
  riderId: string;
}

export type AdminGetRiderDeliveryMapData = MyMapResponseDto;

export interface AdminGetRiderRankParams {
  /**
   * Comma-separated start and end date (e.g., 2023-09-01,2023-09-30)
   * @pattern DATE_RANGE_PATTERN
   */
  dateRange?: string;
  /** @default "state" */
  scope?: "state" | "country";
  riderId: string;
}

export type AdminGetRiderRankData = LeaderboardResponseDto;

export type AdminGetRiderAchievementsData = AchievementsResponseDto;

export interface AdminGetRiderInsightsProfileParams {
  /**
   * Comma-separated start and end date (e.g., 2023-09-01,2023-09-30)
   * @pattern DATE_RANGE_PATTERN
   */
  dateRange?: string;
  riderId: string;
}

export type AdminGetRiderInsightsProfileData = RiderAdminInsightsResponseDto;

export interface GetCustomerInsightsOverviewParams {
  range?: InsightsRangePreset;
  /**
   * Explicit window, overrides `range`: YYYY-MM-DD,YYYY-MM-DD or a single start
   * @pattern DATE_RANGE_PATTERN
   */
  dateRange?: string;
}

export type GetCustomerInsightsOverviewData = CustomerInsightsOverviewResponseDto;

export interface GetCustomerInsightsSeriesParams {
  range?: InsightsRangePreset;
  /**
   * Explicit window, overrides `range`: YYYY-MM-DD,YYYY-MM-DD or a single start
   * @pattern DATE_RANGE_PATTERN
   */
  dateRange?: string;
  /** Defaults to a bucket that suits the range */
  bucket?: "day" | "week" | "month";
}

export type GetCustomerInsightsSeriesData = CustomerInsightsSeriesResponseDto;

export interface GetCustomerInsightsPlacesParams {
  /**
   * @min 1
   * @max 20
   * @default 5
   */
  limit?: number;
}

export type GetCustomerInsightsPlacesData = CustomerInsightsPlacesResponseDto;

export type GetCustomerInsightsRecapData = CustomerInsightsRecapResponseDto;

export type GetCustomerAchievementsData = CustomerAchievementsResponseDto;

export type AcknowledgeCustomerAchievementData = AcknowledgeAchievementResponseDto;

export type CatalogueData = AdminAchievementDefinitionDto[];

export interface AchievementsSummaryParams {
  /** ISO date or YYYY-MM-DD (Lagos day); default 30 days ago */
  from?: string;
  /** ISO date or YYYY-MM-DD (Lagos day, inclusive); default now */
  to?: string;
  /** 1 = everything on record */
  all?: string;
}

export type AchievementsSummaryData = AchievementsSummaryResponseDto;

export interface UnlocksParams {
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
}

export type UnlocksData = ListAchievementUnlocksResponseDto;

export type ForUserData = AdminCustomerAchievementsResponseDto;

export type GrantData = AdminCustomerAchievementsResponseDto;

export type RevokeData = AdminCustomerAchievementsResponseDto;

export type LoginAdminsData = AuthTokenResponseDto;

export type LoginData = AuthTokenResponseDto;

export type LoginBusinessData = AuthTokenResponseDto;

export type VerifyPhoneData = AuthTokenResponseDto;

export type VerifyEmailData = AuthTokenResponseDto;

export type PasswordResetRequestData = MessageResponseDto;

export type PasswordResetData = AuthTokenResponseDto;

export type ResendTokenData = MessageResponseDto;

export type CheckTokenValidityData = CheckTokenResponseDto;

export type GoogleSignInData = AuthTokenResponseDto;

export interface CreateUserParams {
  referralCode?: any;
}

export type CreateUserData = CreateUserRequestDto;

export type GetUserProfileData = UserProfileResponseDto;

export type UpdateUserProfileData = User;

export type AcknowledgeWalletTermsData = User;

export type UpdateUserLocationData = User;

export type UpdateProfilePhotoData = UpdatedPhotoResponseDto;

export type UpdateUserAddressesData = MessageResponseDto;

export type UserKycVerificationData = MessageResponseDto;

export type ChangeUserPasswordData = MessageResponseDto;

export type GetUserWalletsData = WalletListResponseDto;

export type GetUserWalletData = Wallet;

export type InitializeFundWalletData = FundWalletResponseDto;

export type CancelFundWalletData = CancelFundWalletResponseDto;

export type UpdateSettlementAccountData = Wallet;

export type InitiateWithdrawalData = Wallet;

export type GetActiveCouponsData = Coupon[];

export interface GetAllReferralsParams {
  /** the records sorting order */
  order?: "ASC" | "DESC";
  page?: number;
  limit?: number;
}

export type GetAllReferralsData = ListReferralsResponseDto;

export interface GetUserTransactionsParams {
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
}

export type GetUserTransactionsData = ListTransactionResponseDto;

export interface GetUserTransactionsSummaryParams {
  /** Comma-separated start and end date filter (e.g., 2023-09-01,2023-09-30) */
  dateRange?: string;
  /** transaction type filter. comma separated list of TransactionType */
  type?: string;
  /** transaction category filter. comma separated list of TransactionCategory */
  category?: string;
  /** transaction status filter. comma separated list of TransactionStatus */
  status?: string;
}

export type GetUserTransactionsSummaryData = TransactionSummaryResponseDto;

export type GetUserTransactionData = Transaction;

export type DeleteUserAccountData = MessageResponseDto;

export type UpdatePhoneNumberData = MessageResponseDto;

export type UpdateEmailData = MessageResponseDto;

export type UpdateUserPreferencesData = User;

export type ToggleOnlinePresenceData = User;

export type GetRiderOrderData = Order;

export type VerifyDriversLicenseData = User;

export type SubmitDriversLicenseData = object;

export type GetUserVehicleData = Vehicle;

export type AdminCreateUserData = CreateUserRequestDto;

export interface GetUsersParams {
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
}

export type GetUsersData = ListUserResponseDto;

export type AdminGetMyProfileData = UserProfileResponseDto;

export type AdminUpdateMyPhotoData = UpdatedPhotoResponseDto;

export type AdminUpdateMyAddressesData = MessageResponseDto;

export type AdminChangeMyPasswordData = MessageResponseDto;

export type GetAdminPreferencesData = object;

export type UpdateAdminPreferencesData = object;

export type UpdateUserPhoneData = object;

export type AdminRemoveUserPhotoData = object;

export type SetDispatchPausedData = object;

export type AdminSetWithdrawalRestrictionData = AdminUserProfileResponseDto;

export type GetUserData = AdminUserProfileResponseDto;

export type AdminGetUserWalletsData = WalletListResponseDto;

export type UpdateUserStatusData = object;

export type AdjustUserWalletData = any;

export interface RefundableOrdersParams {
  limit?: number;
  /** Order number */
  search?: string;
  userId: string;
}

export type RefundableOrdersData = any;

export type RefundCustomerOrderData = object;

export type AdminVerifyDriversLicenseData = User;

export type ApproveDriversLicenseSubmissionData = object;

export type UpdateDriversLicenseData = User;

export type AdminUpdateSettlementAccountData = Wallet;

export type CreateWalletData = Wallet;

export type CreditPlatformWalletData = any;

export type GetPlatformWalletData = Wallet;

export interface ListCouponsParams {
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
}

export type ListCouponsData = ListCouponsResponseDto;

export type CreateCouponData = object;

export interface CouponsSummaryParams {
  /** ISO date or YYYY-MM-DD (Lagos day); default 30 days ago */
  from?: string;
  /** ISO date or YYYY-MM-DD (Lagos day, inclusive); default now */
  to?: string;
  /** 1 = everything on record */
  all?: string;
}

export type CouponsSummaryData = CouponsSummaryResponseDto;

export interface ListGroupsParams {
  /** Group name */
  search?: string;
  /** "true" to include the per-badge reward groups (badge:…) */
  includeRewardGroups?: string;
  /** @default 1 */
  page?: number;
  /** @default 20 */
  limit?: number;
}

export type ListGroupsData = ListCouponGroupsResponseDto;

export type CreateGroupData = object;

export type GetGroupData = AdminCouponGroupDto;

export type UpdateGroupData = AdminCouponGroupDto;

export type GetCouponData = AdminCouponDto;

export type UpdateCouponData = AdminCouponDto;

export interface UsagesParams {
  /** @default 1 */
  page?: number;
  /** @default 20 */
  limit?: number;
  couponId: string;
}

export type UsagesData = ListCouponUsagesResponseDto;

export type AddGroupUsersData = object;

export type RemoveGroupUsersData = object;

export type DeactivateCouponData = any;

export interface ResolveBankAccountParams {
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
}

export type ResolveBankAccountData = ResolveBankAccountResponseDto;

export interface GetBanksParams {
  /** A cursor key to fetch the previous page of the list after an intial next request */
  previous?: any;
  /** A cursor that indicates your place in the list. It can be used to fetch the next page of the list */
  next?: any;
  /** The number of objects to return per page. Defaults to 50, and limited to 100 records per page. */
  perPage?: any;
  /** Acceptable values are: ghana, kenya, nigeria, and south africa. */
  country?: any;
  provider: "PAYSTACK" | "FLUTTERWAVE";
}

export type GetBanksData = GetBanksResponseDto;

export type CreateDedicatedVirtualAccountData = object;

export type GetPlatformBanksData = GetBanksResponseDto;

export type GetFinanceStatusData = any;

export type UpdateSettlementData = any;

export type SetPinData = any;

export type InitiatePayoutData = any;

export type TransferToUserData = any;

export interface GetLogsParams {
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
}

export type GetLogsData = DataLogsResponseDto;

export interface GetNotificationsParams {
  order?: "ASC" | "DESC";
  isRead?: any;
  page?: number;
  limit?: number;
}

export type GetNotificationsData = ListNotificationResponseDto;

export type GetUserNotificationData = Notification;

export type BulkMarkNotificationsAsReadData = MessageResponseDto;

export type CreateTemplateData = object;

export type TriggerNotificationData = any;

export type EstimateBroadcastData = any;

export type CreateBroadcastData = object;

export interface ListBroadcastsParams {
  limit?: any;
  page?: any;
}

export type ListBroadcastsData = any;

export type GetBroadcastData = object;

export interface LogParams {
  category?: any;
  /** Comma separated NotificationType */
  type?: any;
  /** Comma separated NotificationStatus */
  status?: any;
  entityId?: any;
  broadcastId?: any;
  limit?: any;
  page?: any;
}

export type LogData = any;

export type CreateBusinessData = CreateBusinessRequestDto;

export type CreateBusinessUserData = CreateBusinessUserRequestDto;

export type GetBusinessUserData = User;

export type UpdateBusinessUserData = User;

export type RemoveUserFromBusinessData = MessageResponseDto;

export interface GetBusinessUsersParams {
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
  businessId: string;
}

export type GetBusinessUsersData = ListUserResponseDto;

export type AddVehiclesData = MessageResponseDto;

export type AssignUserVehicleData = MessageResponseDto;

export type AddKycDetailsData = MessageResponseDto;

export type GetUserReviewsData = ListReviewResponseDto;

export interface GetBusinessTransactionsParams {
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
  businessId: string;
}

export type GetBusinessTransactionsData = ListTransactionResponseDto;

export type GetBusinessTransactionData = Transaction;

export interface GetBusinessOrdersParams {
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
  businessId: string;
}

export type GetBusinessOrdersData = ListOrderItemsResponseDto;

export type GetBusinessOrderData = Order;

export type GetBusinessWalletsData = WalletListResponseDto;

export type GetBusinessWalletData = Wallet;

export interface GetBusinessOrderStatisticsParams {
  /** filter by riderId */
  riderId?: string;
  /** Comma-separated start and end date filter (e.g., 2023-09-01,2023-09-30) */
  dateRange?: string;
  businessId: string;
}

export type GetBusinessOrderStatisticsData = GetOrderStatisticsResponseDto;

export interface GetBusinessOrderStatusChartParams {
  /** filter by riderId */
  riderId?: string;
  /** Comma-separated start and end date filter (e.g., 2023-09-01,2023-09-30) */
  dateRange?: string;
  businessId: string;
}

export type GetBusinessOrderStatusChartData = GetOrderStatusChartResponseDto[];

export interface GetBusinessOrderTypeChartParams {
  /** filter by riderId */
  riderId?: string;
  /** Comma-separated start and end date filter (e.g., 2023-09-01,2023-09-30) */
  dateRange?: string;
  businessId: string;
}

export type GetBusinessOrderTypeChartData = GetOrderTypeChartResponseDto[];

export type GetBusinessData = Business;

export interface GetBusinessVehiclesParams {
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
  businessId: string;
}

export type GetBusinessVehiclesData = VehicleListResponseDto;

export type UpdateBusinessPreferencesData = Business;

export type SuspendBusinessUserData = User;

export type UnsuspendBusinessUserData = User;

export type UpdateBusinessVehicleData = Vehicle;

export interface GetReviewsParams {
  /** 1 = include the customer and the order on each row */
  expand?: any;
  /** Only reviews left by this customer */
  userId?: any;
  /** Only reviews left for this rider */
  riderId?: any;
  order?: "ASC" | "DESC";
  page?: number;
  limit?: number;
}

export type GetReviewsData = ListReviewResponseDto;

export type RateRiderData = Review;

export type UpdateUserVehicleData = Vehicle;

export type GetVehicleData = Vehicle;

export type DeleteUserVehicleData = MessageResponseDto;

export interface GetVehiclesParams {
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
}

export type GetVehiclesData = VehicleListResponseDto;

export type AdminUpdateUserVehicleData = Vehicle;

export type VerifyVehicleData = Vehicle;

export type RejectVehicleData = Vehicle;

export type SuspendVehicleData = Vehicle;

export type AdminGetVehicleData = Vehicle;

export type DeleteVehicleData = MessageResponseDto;

export type CreateSingleOrderData = Order;

export type CreateBulkOrderData = Order;

export type QuoteOrderData = QuoteOrderResponseDto;

export type QuoteBatchOrderData = QuoteBatchOrderResponseDto;

export type QuoteBulkOrderData = QuoteBulkOrderResponseDto;

export type CreateBatchOrderData = Order;

export type RequestOrderRidersData = User[];

export type ReDispatchData = object;

export type PayRiderTripData = any;

export type ReleaseOrderRiderData = ReleaseRiderResponseDto;

export type RiderReleaseOrderData = RiderReleaseResponseDto;

export type ReassignRiderData = Order;

export type ForceAssignRiderData = ForceAssignRiderResponseDto;

export interface GetNearbyRidersCountParams {
  /** @example 6.5244 */
  latitude: number;
  /** @example 3.3792 */
  longitude: number;
}

export type GetNearbyRidersCountData = NearbyRidersCountResponseDto;

export type GetArrivalCheckData = ArrivalCheckResponseDto;

export type GetRidersLeaderboardData = RiderListItemResponseDto[];

export interface LookupRiderForStoreParams {
  /**
   * The number the store typed in
   * @maxLength 20
   * @pattern /^\+?[0-9 ()-]{7,20}$/
   * @example "08031234567"
   */
  phone?: string;
  /** A rider id saved from an earlier lookup */
  riderId?: string;
}

export type LookupRiderForStoreData = RiderLookupResponseDto;

export type SendRiderLinkCodeData = RiderLinkCodeResponseDto;

export type ListAllRidersData = RiderListItemResponseDto[];

export type GetRiderLocationsData = any;

export type CancelOrderLocationData = OrderLocation;

export type RescheduleOrderData = Order;

export type CancelOrderData = Order;

export type MakeOrderOfferData = Order;

export type InitiateOrderPaymentData = Order;

export type CreateOrderPaymentLinkData = OrderPaymentLinkResponseDto;

export type VerifyOrderPaymentData = Order;

export type GetOrderPaymentInfoData = any;

export interface ConfirmExternalPaymentByReferenceParams {
  reference: string;
}

export type ConfirmExternalPaymentByReferenceData = any;

export type InitializeExternalOrderPaymentData = any;

export type AcceptOrRejectOrderOfferData = Offer;

export type StartOrderData = Order;

export type StartOrderLocationData = OrderLocation;

export type UpdateOrderLocationStatusData = OrderLocation;

export type GetOrderEtaData = any;

export type QuoteOrderLocationData = QuoteOrderLocationResponseDto;

export type UpdateOrderLocationData = OrderLocationUpdate;

export type CancelLocationUpdateData = OrderLocationUpdate;

export type RespondToLocationUpdateData = OrderLocationUpdate;

export type ApplyOrderCouponData = Order;

export type RemoveOrderCouponData = Order;

export type CompleteOrderLocationData = OrderLocation;

export type CompleteOrderData = Order;

export type QueueOrderData = Order;

export type GetQueuedOrdersData = Order[];

export type GetActiveOffersData = Offer[];

export interface GetUserOrdersParams {
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
}

export type GetUserOrdersData = ListOrderItemsResponseDto;

export interface GetRiderOrdersParams {
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
}

export type GetRiderOrdersData = ListOrderResponseDto;

export type GetPendingLocationUpdateData = OrderLocationUpdate;

export type GetLatestLocationUpdateForCustomerData = OrderLocationUpdate;

export type GetUserOrderData = Order;

export interface GetRiderOrderStatisticsParams {
  /** Comma-separated start and end date filter (e.g., 2023-09-01,2023-09-30) */
  dateRange?: string;
}

export type GetRiderOrderStatisticsData = GetOrderStatisticsResponseDto;

export interface GetOrderStatusChartParams {
  /** Comma-separated start and end date filter (e.g., 2023-09-01,2023-09-30) */
  dateRange?: string;
}

export type GetOrderStatusChartData = GetOrderStatusChartResponseDto[];

export interface GetOrderTypeChartParams {
  /** Comma-separated start and end date filter (e.g., 2023-09-01,2023-09-30) */
  dateRange?: string;
}

export type GetOrderTypeChartData = GetOrderTypeChartResponseDto[];

export interface GetOrdersParams {
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
}

export type GetOrdersData = ListOrderItemsResponseDto;

export type GetOrderData = Order;

export type GetOrderOffersData = any;

export type AdminOrderRiderHistoryData = AdminOrderRiderHistoryResponseDto;

export type RingRidersData = any;

export type AdminCancelOrderData = Order;

export type UpdateOrderStatusData = Order;

export type AdminListRiderReleasesData = AdminRiderReleasesResponseDto;

export interface FindAllParams {
  order?: "ASC" | "DESC";
  page?: number;
  limit?: number;
}

export type FindAllData = ListAuditLogResponseDto;

export type CreateIssueData = IssueReport;

export interface ListMyIssuesParams {
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
}

export type ListMyIssuesData = ListIssuesResponseDto;

export type GetMyIssueData = IssueReport;

export interface ListIssuesParams {
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
}

export type ListIssuesData = ListIssuesResponseDto;

export interface IssuesSummaryParams {
  /** ISO date or YYYY-MM-DD (Lagos day); default 30 days ago */
  from?: string;
  /** ISO date or YYYY-MM-DD (Lagos day, inclusive); default now */
  to?: string;
  /** 1 = everything on record */
  all?: string;
}

export type IssuesSummaryData = IssuesSummaryResponseDto;

export interface ListUserIssuesParams {
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
  userId: string;
}

export type ListUserIssuesData = ListIssuesResponseDto;

export type GetIssueData = IssueReport;

export type UpdateStatusData = IssueReport;

export type AssignData = IssueReport;

export type UpdatePriorityData = IssueReport;

export type AddNoteData = IssueReport;

export interface ListPendingAnnouncementsParams {
  /** Which app is asking: the customer app sends CUSTOMERS, the rider app RIDERS */
  audience: AnnouncementAudience;
}

export type ListPendingAnnouncementsData = PendingAnnouncementsResponseDto;

export type TrackAnnouncementSeenData = any;

export type TrackAnnouncementLaterData = any;

export type AcknowledgeAnnouncementData = any;

export interface AdminListAnnouncementsParams {
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
}

export type AdminListAnnouncementsData = ListAnnouncementsResponseDto;

export type AdminCreateAnnouncementData = Announcement;

export type AdminAnnouncementsSummaryData = AnnouncementsSummaryResponseDto;

export type AdminListAnnouncementScreensData = AppScreensResponseDto;

export type AdminGetAnnouncementData = Announcement;

export type AdminUpdateAnnouncementData = Announcement;

export type AdminDeleteAnnouncementData = any;

export interface AdminListAnnouncementReceiptsParams {
  /** acknowledged: closed for good; pending: shown but still popping */
  state?: "acknowledged" | "pending";
  outcome?: AnnouncementOutcome;
  /** @default 1 */
  page?: number;
  /** @default 20 */
  limit?: number;
  announcementId: string;
}

export type AdminListAnnouncementReceiptsData = ListAnnouncementReceiptsResponseDto;

export type AdminUpdateAnnouncementStatusData = Announcement;

export type HandleWebhookEventsData = object;

export type CreateTeamData = object;

export type GetUserTeamData = object;

export type AdminCreateTeamData = object;

export interface AdminListTeamsParams {
  order?: "ASC" | "DESC";
  limit?: any;
  page?: any;
}

export type AdminListTeamsData = ListTeamsResponseDto;

export type RunData = any;

export type QuoteData = any;

export type PublicConfigData = any;

export type GetQuoteData = any;

export type FeedbackData = any;

export type EventData = any;

export interface AnalyticsParams {
  from?: string;
  to?: string;
}

export type AnalyticsData = any;

export type AdminConfigData = any;

export type UpdateConfigData = object;

export type CreateData = any;

export type TrackData = any;

export type SearchData = any;

export type OffersData = any;

export type AcceptOfferData = any;

export type PayData = any;

export type CancelData = any;

export type GetUnreadCountData = SupportUnreadResponseDto;

export type MarkAsReadData = SupportUnreadResponseDto;

export type DeveloperSignupData = DeveloperSessionResponseDto;

export type DeveloperLoginData = DeveloperSessionResponseDto;

export type DeveloperMeData = DeveloperMeResponseDto;

export type DeveloperSendEmailCodeData = DeveloperCodeSentResponseDto;

export type DeveloperVerifyEmailData = DeveloperMeResponseDto;

export type DeveloperSendPhoneCodeData = DeveloperCodeSentResponseDto;

export type DeveloperVerifyPhoneData = DeveloperMeResponseDto;

export type DeveloperForgotPasswordData = DeveloperCodeSentResponseDto;

export type DeveloperResetPasswordData = DeveloperSessionResponseDto;

export type DeveloperListTeamsData = DeveloperTeamSummaryDto[];

export type DeveloperCreateTeamData = DeveloperTeamSummaryDto;

export type DeveloperCurrentTeamData = DeveloperTeamSummaryDto;

export type DeveloperListInvitationsData = TeamInvitationDto[];

export type DeveloperCreateInvitationData = TeamInvitationDto;

export type DeveloperResendInvitationData = TeamInvitationDto;

export type DeveloperRevokeInvitationData = TeamInvitationDto;

export type DeveloperPreviewInvitationData = TeamInvitationPreviewDto;

export type DeveloperAcceptInvitationData = AcceptTeamInvitationResponseDto;

export type DeveloperDeclineInvitationData = any;

export type DeveloperListMembersData = TeamMemberDto[];

export type DeveloperUpdateMemberRoleData = TeamMemberDto;

export type DeveloperRemoveMemberData = any;

export type DeveloperLeaveTeamData = any;

export type DeveloperTransferOwnershipData = TeamMemberDto[];

export interface DeveloperListAuditLogsParams {
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
}

export type DeveloperListAuditLogsData = TeamAuditLogListDto;

export type DeveloperGetAccountData = DeveloperAccountDto;

export type DeveloperUpdateAccountData = DeveloperAccountDto;

export type DeveloperRequestLiveAccessData = DeveloperAccountDto;

export interface DeveloperListApiKeysParams {
  /** Only live or only test keys. */
  livemode?: "true" | "false";
}

export type DeveloperListApiKeysData = DeveloperApiKeyDto[];

export type DeveloperCreateApiKeyData = DeveloperApiKeySecretDto;

export type DeveloperRollApiKeyData = DeveloperApiKeySecretDto;

export type DeveloperRevokeApiKeyData = DeveloperApiKeyDto;

export type DeveloperGetIpAllowlistData = IpAllowlistDto;

export type DeveloperUpdateIpAllowlistData = IpAllowlistDto;

export interface DeveloperGetWalletParams {
  livemode?: "true" | "false";
}

export type DeveloperGetWalletData = PublicWalletDto;

export type DeveloperDashboardCreateFundingSessionData = FundingSessionDto;

export interface DeveloperDashboardListWalletTransactionsParams {
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
}

export type DeveloperDashboardListWalletTransactionsData = PublicWalletTransactionDto[];

export type DeveloperGetLowBalanceAlertData = LowBalanceAlertDto;

export type DeveloperSetLowBalanceAlertData = LowBalanceAlertDto;

export type DeveloperGetFundingAccountData = PublicFundingAccountDto;

export type DeveloperSetUpFundingAccountData = PublicFundingAccountDto;

export type DeveloperGetAutoTopUpData = AutoTopUpDto;

export type DeveloperConfigureAutoTopUpData = AutoTopUpDto;

export type DeveloperSaveAutoTopUpCardData = FundingSessionDto;

export type DeveloperRemoveAutoTopUpCardData = AutoTopUpDto;

export interface DashboardListWebhookEndpointsParams {
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
}

export type DashboardListWebhookEndpointsData = PublicWebhookEndpointDto[];

export type DashboardCreateWebhookEndpointData = PublicWebhookEndpointWithSecretDto;

export type DashboardRetrieveWebhookEndpointData = PublicWebhookEndpointDto;

export type DashboardUpdateWebhookEndpointData = PublicWebhookEndpointDto;

export type DashboardDeleteWebhookEndpointData = any;

export type DashboardRollWebhookSecretData = PublicWebhookEndpointWithSecretDto;

export interface DashboardListWebhookDeliveriesParams {
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
  /** @example "we_6560f0c2a1b2c3d4e5f60718" */
  endpointId: string;
}

export type DashboardListWebhookDeliveriesData = WebhookDeliveryDto[];

export type DashboardTestWebhookEndpointData = WebhookDeliveryDto;

export type DashboardResendWebhookEventData = ResendEventResponseDto;

export interface AdminListDevelopersParams {
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
}

export type AdminListDevelopersData = ListAdminDevelopersResponseDto;

export type AdminGetDeveloperData = AdminDeveloperDetailDto;

export type AdminApproveDeveloperLiveData = AdminDeveloperDetailDto;

export type AdminRejectDeveloperLiveData = AdminDeveloperDetailDto;

export type AdminSuspendDeveloperLiveData = AdminDeveloperDetailDto;

export type AdminUnsuspendDeveloperLiveData = AdminDeveloperDetailDto;
