import {
  AdminProductionFilters,
} from "@/features/canteen/components/admin/production-summary/admin-production-filters";
import {
  AdminProductionList,
} from "@/features/canteen/components/admin/production-summary/admin-production-list";
import {
  AdminProductionOverview,
} from "@/features/canteen/components/admin/production-summary/admin-production-overview";

import {
  getAdminCanteenProductionData,
} from "@/lib/api/admin-canteen-production";
import type {
  AdminProductionStatus,
} from "@/lib/api/admin-canteen-production";

interface AdminCanteenProductionPageProps {
  searchParams: Promise<{
    page?: string | string[];
    search?: string | string[];
    merchant?: string | string[];
    pickup?: string | string[];
    status?: string | string[];
  }>;
}

export default async function AdminCanteenProductionPage({
  searchParams,
}: AdminCanteenProductionPageProps) {
  const params = await searchParams;

  const page = parsePage(
    getSingleValue(params.page),
  );
  const search = getSingleValue(
    params.search,
  );
  const merchantId = getSingleValue(
    params.merchant,
  );
  const pickupSlotId = getSingleValue(
    params.pickup,
  );
  const status = normalizeStatus(
    getSingleValue(params.status),
  );

  const data =
    await getAdminCanteenProductionData({
      page,
      search,
      merchantId,
      pickupSlotId,
      status,
    });

  return (
    <div className="mx-auto w-full max-w-[1320px] space-y-6 px-5 py-6 sm:px-6 md:space-y-8 lg:px-8 lg:py-8">
      <section>
        <h1 className="font-heading text-[30px] font-bold leading-tight text-navy-steel md:text-[32px]">
          Production Summary
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[#536069] md:mt-2 md:text-base">
          Monitor kebutuhan produksi kantin berdasarkan pesanan siswa.
        </p>
      </section>

      <AdminProductionOverview
        stats={data.stats}
      />

      <div>
        <AdminProductionFilters
          search={search}
          merchantId={merchantId}
          pickupSlotId={pickupSlotId}
          status={status}
          merchants={data.merchants}
          pickupSlots={data.pickupSlots}
        />

        <AdminProductionList
          initialRows={data.rows}
          pagination={data.pagination}
          filters={{
            search,
            merchantId,
            pickupSlotId,
            status,
          }}
        />
      </div>
    </div>
  );
}

function getSingleValue(
  value: string | string[] | undefined,
): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

function parsePage(value: string): number {
  const parsed = Number.parseInt(value, 10);

  return Number.isFinite(parsed) && parsed > 0
    ? parsed
    : 1;
}

function normalizeStatus(
  value: string,
): AdminProductionStatus | "" {
  const normalized = value.toUpperCase();

  if (
    normalized === "CONFIRMED" ||
    normalized === "PREPARING" ||
    normalized === "READY"
  ) {
    return normalized;
  }

  return "";
}
