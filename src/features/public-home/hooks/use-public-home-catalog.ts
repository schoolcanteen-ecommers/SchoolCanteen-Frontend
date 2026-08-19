"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  getPublicHomeCatalog,
} from "@/lib/api/catalog";

export const publicHomeCatalogQueryKey = [
  "public-home",
] as const;

export function usePublicHomeCatalog() {
  return useQuery({
    queryKey:
      publicHomeCatalogQueryKey,

    queryFn:
      getPublicHomeCatalog,

    staleTime:
      120_000,
  });
}
