"use client";

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { account, auth, invitations, keys, type LogFilters, logs, type OrderFilters, orders, webhooks } from "./api";
import { type ApiError, toApiError } from "./errors";
import type {
  CreateDeveloperApiKeyRequestDto,
  DashboardCreateWebhookEndpointRequestDto,
  UpdateWebhookEndpointRequestDto,
  RollDeveloperApiKeyRequestDto,
  TeamInvitationPreviewDto,
  UpdateDeveloperAccountRequestDto,
} from "@/services/apiService";

type Mode = "test" | "live";

/** The signed-in developer and their teams. `retry: false`: a 401 means signed out, not flaky. */
export const useMe = (options: { enabled?: boolean } = {}) =>
  useQuery({ queryKey: ["me"], queryFn: () => auth.me(), retry: false, ...options });

export const useInvitationPreview = (token: string | null) =>
  useQuery<TeamInvitationPreviewDto, ApiError>({
    queryKey: ["invitation", token],
    queryFn: () => invitations.preview(token as string).catch((e) => Promise.reject(toApiError(e))),
    enabled: Boolean(token),
    retry: false,
  });

/** A mutation whose error is already an ApiError, for forms to place under a field or in an alert. */
export const useApiMutation = <TArgs, TResult>(fn: (args: TArgs) => Promise<TResult>) =>
  useMutation<TResult, ApiError, TArgs>({
    mutationFn: (args) => fn(args).catch((e) => Promise.reject(toApiError(e))),
  });

/**
 * Team data. Keys start with the team id (and, from 11.4, the mode), so switching team never shows
 * the other team's numbers, even for a moment.
 */
export const teamKeys = {
  account: (teamId: string) => ["team", teamId, "account"] as const,
  onboarding: (teamId: string) => ["team", teamId, "onboarding"] as const,
  keys: (teamId: string, mode: Mode) => ["team", teamId, mode, "keys"] as const,
  webhooks: (teamId: string, mode: Mode) => ["team", teamId, mode, "webhooks"] as const,
  /** One endpoint and its deliveries: the id is mode-specific already. */
  webhook: (teamId: string, id: string) => ["team", teamId, "webhook", id] as const,
  deliveries: (teamId: string, id: string) => ["team", teamId, "webhook", id, "deliveries"] as const,
  logs: (teamId: string, mode: Mode, filters: LogFilters) => ["team", teamId, mode, "logs", filters] as const,
  log: (teamId: string, id: string) => ["team", teamId, "log", id] as const,
  orders: (teamId: string, mode: Mode, filters?: OrderFilters) =>
    filters ? (["team", teamId, mode, "orders", filters] as const) : (["team", teamId, mode, "orders"] as const),
  order: (teamId: string, mode: Mode, id: string) => ["team", teamId, mode, "order", id] as const,
};

export const useAccount = (teamId: string) =>
  useQuery({ queryKey: teamKeys.account(teamId), queryFn: () => account.get() });

export const useOnboarding = (teamId: string) =>
  useQuery({ queryKey: teamKeys.onboarding(teamId), queryFn: () => account.onboarding() });

/**
 * Asks for live access, first saving any profile changes the reviewer will read. Refreshes the
 * account and `me` (each team's liveStatus) once it's in.
 */
export const useRequestLiveAccess = (teamId: string) => {
  const queryClient = useQueryClient();
  return useApiMutation(async (changes: UpdateDeveloperAccountRequestDto | null) => {
    if (changes && Object.keys(changes).length) await account.update(changes);
    const result = await account.requestLiveAccess();
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: teamKeys.account(teamId) }),
      queryClient.invalidateQueries({ queryKey: ["me"] }),
    ]);
    return result;
  });
};

export const useApiKeys = (teamId: string, mode: Mode) =>
  useQuery({ queryKey: teamKeys.keys(teamId, mode), queryFn: () => keys.list(mode) });

/**
 * Key changes. Each refreshes the list (and the checklist's "test key" step). The results carry
 * the secret, shown once: `gcTime: 0` drops it from React Query as soon as the dialog lets go, and
 * the dialogs call `reset()` when they close (CLAUDE.md §2).
 */
const useKeyMutation = <TArgs, TResult>(teamId: string, mode: Mode, fn: (args: TArgs) => Promise<TResult>) => {
  const queryClient = useQueryClient();
  return useMutation<TResult, ApiError, TArgs>({
    mutationFn: (args) => fn(args).catch((e) => Promise.reject(toApiError(e))),
    gcTime: 0,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: teamKeys.keys(teamId, mode) }),
        queryClient.invalidateQueries({ queryKey: teamKeys.onboarding(teamId) }),
      ]),
  });
};

export const useCreateKey = (teamId: string, mode: Mode) =>
  useKeyMutation(teamId, mode, (body: Omit<CreateDeveloperApiKeyRequestDto, "livemode">) =>
    keys.create({ ...body, livemode: mode === "live" }),
  );

export const useRollKey = (teamId: string, mode: Mode) =>
  useKeyMutation(
    teamId,
    mode,
    ({ id, expiresIn }: { id: string; expiresIn: RollDeveloperApiKeyRequestDto["expiresIn"] }) =>
      keys.roll(id, expiresIn),
  );

export const useRevokeKey = (teamId: string, mode: Mode) =>
  useKeyMutation(teamId, mode, (id: string) => keys.revoke(id));

export const useWebhookEndpoints = (teamId: string, mode: Mode) =>
  useQuery({ queryKey: teamKeys.webhooks(teamId, mode), queryFn: () => webhooks.list(mode) });

export const useWebhookEndpoint = (teamId: string, id: string) =>
  useQuery<Awaited<ReturnType<typeof webhooks.get>>, ApiError>({
    queryKey: teamKeys.webhook(teamId, id),
    queryFn: () => webhooks.get(id).catch((e) => Promise.reject(toApiError(e))),
    retry: (count, error) => error.status !== 404 && count < 1,
  });

const PAGE = 20;

/** An endpoint's deliveries, newest first, 20 at a time. Polls while any is still on its way. */
export const useDeliveries = (teamId: string, id: string) =>
  useInfiniteQuery({
    queryKey: teamKeys.deliveries(teamId, id),
    queryFn: ({ pageParam }) => webhooks.deliveries(id, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (last) => (last.length === PAGE ? last[last.length - 1].id : undefined),
    refetchInterval: (query) =>
      query.state.data?.pages.some((page) => page.some((d) => d.status === "pending" || d.status === "delivering"))
        ? 4_000
        : false,
  });

/** An endpoint change: refreshes the list, the endpoint, its deliveries and the checklist. */
const useWebhookMutation = <TArgs, TResult>(
  teamId: string,
  mode: Mode,
  fn: (args: TArgs) => Promise<TResult>,
  { secret = false }: { secret?: boolean } = {},
) => {
  const queryClient = useQueryClient();
  return useMutation<TResult, ApiError, TArgs>({
    mutationFn: (args) => fn(args).catch((e) => Promise.reject(toApiError(e))),
    // A signing secret is in the result: drop it from React Query as soon as the dialog lets go.
    ...(secret && { gcTime: 0 }),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: teamKeys.webhooks(teamId, mode) }),
        queryClient.invalidateQueries({ queryKey: ["team", teamId, "webhook"] }),
        queryClient.invalidateQueries({ queryKey: teamKeys.onboarding(teamId) }),
      ]),
  });
};

export const useCreateEndpoint = (teamId: string, mode: Mode) =>
  useWebhookMutation(
    teamId,
    mode,
    (body: Omit<DashboardCreateWebhookEndpointRequestDto, "livemode">) =>
      webhooks.create({ ...body, livemode: mode === "live" }),
    { secret: true },
  );

export const useUpdateEndpoint = (teamId: string, mode: Mode, id: string) =>
  useWebhookMutation(teamId, mode, (body: UpdateWebhookEndpointRequestDto) => webhooks.update(id, body));

export const useDeleteEndpoint = (teamId: string, mode: Mode, id: string) =>
  useWebhookMutation(teamId, mode, () => webhooks.remove(id));

export const useRollWebhookSecret = (teamId: string, mode: Mode, id: string) =>
  useWebhookMutation(teamId, mode, () => webhooks.rollSecret(id), { secret: true });

export const useTestEndpoint = (teamId: string, mode: Mode, id: string) =>
  useWebhookMutation(teamId, mode, () => webhooks.test(id));

export const useResendEvent = (teamId: string, mode: Mode, id: string) =>
  useWebhookMutation(teamId, mode, (eventId: string) => webhooks.resend(id, eventId));

/** The request log, newest first, 25 a page. While `live`, the newest page refreshes every 10 s. */
export const useRequestLogs = (teamId: string, mode: Mode, filters: LogFilters, { live = false } = {}) =>
  useInfiniteQuery({
    queryKey: teamKeys.logs(teamId, mode, filters),
    queryFn: ({ pageParam }) => logs.list(mode, filters, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (last) => (last.has_more ? last.data[last.data.length - 1]?.id : undefined),
    refetchInterval: live ? 10_000 : false,
    placeholderData: (previous) => previous,
  });

export const useRequestLog = (teamId: string, id: string | null) =>
  useQuery({ queryKey: teamKeys.log(teamId, id ?? ""), queryFn: () => logs.get(id as string), enabled: !!id });

/** Statuses an order no longer leaves: no need to keep asking about it. */
export const DONE_STATUSES = ["delivered", "cancelled", "failed"] as const;
const moving = (status?: string) => !!status && !(DONE_STATUSES as readonly string[]).includes(status);

/** Orders, newest first, 20 a page. Refreshes every 10 s so statuses move without a reload. */
export const useOrders = (teamId: string, mode: Mode, filters: OrderFilters) =>
  useInfiniteQuery({
    queryKey: teamKeys.orders(teamId, mode, filters),
    queryFn: ({ pageParam }) => orders.list(mode, filters, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (last) => (last.has_more ? last.data[last.data.length - 1]?.id : undefined),
    refetchInterval: 10_000,
    placeholderData: (previous) => previous,
  });

/** One order, every 5 s while it is still moving. */
export const useOrder = (teamId: string, mode: Mode, id: string) =>
  useQuery<Awaited<ReturnType<typeof orders.get>>, ApiError>({
    queryKey: teamKeys.order(teamId, mode, id),
    queryFn: () => orders.get(mode, id).catch((e) => Promise.reject(toApiError(e))),
    refetchInterval: (query) => (moving(query.state.data?.status) ? 5_000 : false),
    retry: (count, error) => error.status !== 404 && count < 1,
  });

/** Where the rider is, every 5 s while the order is moving. */
export const useOrderTracking = (teamId: string, mode: Mode, id: string, status?: string) =>
  useQuery({
    queryKey: [...teamKeys.order(teamId, mode, id), "tracking"],
    queryFn: () => orders.tracking(mode, id),
    refetchInterval: moving(status) ? 5_000 : false,
    enabled: !!status,
  });

export const useServiceAreas = () =>
  useQuery({ queryKey: ["service-areas"], queryFn: () => orders.serviceAreas(), staleTime: 60 * 60_000 });

/** An order change: refreshes the order, the list and the checklist (a first test order ticks it). */
const useOrderMutation = <TArgs, TResult>(teamId: string, mode: Mode, fn: (args: TArgs) => Promise<TResult>) => {
  const queryClient = useQueryClient();
  return useMutation<TResult, ApiError, TArgs>({
    mutationFn: (args) => fn(args).catch((e) => Promise.reject(toApiError(e))),
    onSuccess: (result) => {
      const order = result as { object?: string; id?: string };
      if (order?.object === "order" && order.id)
        queryClient.setQueryData(teamKeys.order(teamId, mode, order.id), result);
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: teamKeys.orders(teamId, mode) }),
        queryClient.invalidateQueries({ queryKey: teamKeys.onboarding(teamId) }),
        order?.id
          ? queryClient.invalidateQueries({ queryKey: [...teamKeys.order(teamId, mode, order.id), "tracking"] })
          : null,
      ]);
    },
  });
};

export const useQuoteOrder = (mode: Mode) =>
  useApiMutation((body: Parameters<typeof orders.quote>[1]) => orders.quote(mode, body));

export const useCreateOrder = (teamId: string, mode: Mode) =>
  useOrderMutation(teamId, mode, (body: Parameters<typeof orders.create>[1]) => orders.create(mode, body));

export const useCancelOrder = (teamId: string, mode: Mode, id: string) =>
  useOrderMutation(teamId, mode, (reason?: string) => orders.cancel(mode, id, reason));

export const useAdvanceOrder = (teamId: string, id: string) =>
  useOrderMutation(teamId, "test", (to?: Parameters<typeof orders.advance>[1]) => orders.advance(id, to));
