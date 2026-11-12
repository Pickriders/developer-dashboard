"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { account, auth, invitations } from "./api";
import { type ApiError, toApiError } from "./errors";
import type { TeamInvitationPreviewDto, UpdateDeveloperAccountRequestDto } from "@/services/apiService";

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
