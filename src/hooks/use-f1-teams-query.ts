"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchF1TeamSections } from "@/lib/api/f1-teams";

export const f1TeamSectionsQueryKey = ["public-f1-team-sections"] as const;

export function useF1TeamSectionsQuery(params?: {
  organiser_id?: number;
  year?: number;
}) {
  return useQuery({
    queryKey: [...f1TeamSectionsQueryKey, params ?? {}],
    queryFn: () => fetchF1TeamSections(params),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });
}
