"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  getPublicCatalog,
} from "@/lib/api/catalog";

export const publicCatalogQueryKeys = {
  canteen: [
    "public-catalog",
    "canteen",
  ] as const,

  cooperative: [
    "public-catalog",
    "cooperative",
  ] as const,
};

export function useCanteenCatalogQuery() {
  return useQuery({
    queryKey:
      publicCatalogQueryKeys.canteen,

    queryFn:
      () =>
        getPublicCatalog(
          "canteen",
        ),

    staleTime:
      120_000,
  });
}

export function useCooperativeCatalogQuery() {
  return useQuery({
    queryKey:
      publicCatalogQueryKeys.cooperative,

    queryFn:
      () =>
        getPublicCatalog(
          "cooperative",
        ),

    staleTime:
      120_000,
  });
}
