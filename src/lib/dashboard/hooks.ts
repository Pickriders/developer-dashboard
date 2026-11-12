"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { auth, invitations } from "./api";
import { type ApiError, toApiError } from "./errors";
import type { TeamInvitationPreviewDto } from "@/services/apiService";

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
