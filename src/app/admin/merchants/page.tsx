import {
  AdminMerchantFilters,
  AdminMerchantMobileSearch,
} from "@/features/merchants/components/admin/merchant-management/admin-merchant-filters";
import {
  AdminMerchantManagementList,
} from "@/features/merchants/components/admin/merchant-management/admin-merchant-management-list";
import {
  AdminMerchantOverview,
} from "@/features/merchants/components/admin/merchant-management/admin-merchant-overview";

import {
  getAdminMerchantManagementData,
} from "@/lib/api/admin-merchant-monitoring";

interface AdminMerchantsPageProps {
  searchParams: Promise<{
    page?: string | string[];
    search?: string | string[];
    type?: string | string[];
    status?: string | string[];
  }>;
}

export default async function AdminMerchantsPage({
  searchParams,
}: AdminMerchantsPageProps) {
  const params =
    await searchParams;

  const page = parsePage(
    getSingleValue(params.page),
  );
  const search =
    getSingleValue(params.search);
  const type = normalizeType(
    getSingleValue(params.type),
  );
  const status = normalizeStatus(
    getSingleValue(params.status),
  );

  const {
    stats,
    merchantPage,
  } =
    await getAdminMerchantManagementData({
      page,
      search,
      type,
      status,
    });

  return (
    <div className="mx-auto w-full max-w-[1320px] space-y-6 px-4 py-6 sm:px-6 md:space-y-8 lg:px-8 lg:py-8">
      <section>
        <h1 className="font-heading text-[30px] font-bold leading-tight text-navy-steel md:text-[32px]">
          <span className="md:hidden">
            Merchants
          </span>
          <span className="hidden md:inline">
            Merchants Management
          </span>
        </h1>

        <p className="mt-1.5 text-sm text-[#536069] md:mt-2 md:text-base">
          <span className="md:hidden">
            Monitor merchant SchoolCanteen.
          </span>
          <span className="hidden md:inline">
            Kelola dan pantau aktivitas merchant Kantin dan Koperasi.
          </span>
        </p>
      </section>

      <AdminMerchantMobileSearch
        search={search}
      />

      <AdminMerchantOverview
        stats={stats}
      />

      <AdminMerchantFilters
        search={search}
        type={type}
        status={status}
      />

      <AdminMerchantManagementList
        merchantPage={merchantPage}
        search={search}
        type={type}
        status={status}
      />
    </div>
  );
}

function getSingleValue(
  value: string | string[] | undefined,
): string {
  if (Array.isArray(value)) {
    return value[0]?.trim() ?? "";
  }

  return value?.trim() ?? "";
}

function parsePage(
  value: string,
): number {
  const parsed = Number.parseInt(
    value,
    10,
  );

  if (
    Number.isNaN(parsed) ||
    parsed < 1
  ) {
    return 1;
  }

  return parsed;
}

function normalizeType(
  value: string,
): "" | "canteen" | "cooperative" {
  if (
    value === "canteen" ||
    value === "cooperative"
  ) {
    return value;
  }

  return "";
}

function normalizeStatus(
  value: string,
): "" | "active" | "inactive" {
  if (
    value === "active" ||
    value === "inactive"
  ) {
    return value;
  }

  return "";
}
