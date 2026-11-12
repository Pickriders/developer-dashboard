"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { account, auth, invitations, keys } from "./api";
import { type ApiError, toApiError } from "./errors";
import type {
  CreateDeveloperApiKeyRequestDto,
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
