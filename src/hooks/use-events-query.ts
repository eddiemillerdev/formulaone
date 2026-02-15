"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchEvents } from "@/lib/api/events";

export const eventsQueryKey = ["public-events"] as const;

export function useEventsQuery() {
  return useQuery({
    queryKey: eventsQueryKey,
    queryFn: () => fetchEvents(),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });
}
