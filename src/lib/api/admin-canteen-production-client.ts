"use client";

import {
  getAdminCanteenProductionData,
} from "@/lib/api/admin-canteen-production";
import type {
  AdminCanteenProductionFilters,
  AdminProductionPagination,
  AdminProductionRow,
} from "@/lib/api/admin-canteen-production";

export async function getAdminCanteenProductionClientPage(
  filters: AdminCanteenProductionFilters,
  page: number,
): Promise<{
  rows: AdminProductionRow[];
  pagination: AdminProductionPagination;
}> {
  const data =
    await getAdminCanteenProductionData({
      ...filters,
      page,
    });

  return {
    rows: data.rows,
    pagination: data.pagination,
  };
}
