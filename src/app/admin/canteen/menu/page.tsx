import {
  AdminCanteenMenuFilters,
} from "@/features/canteen/components/admin/menu-management/admin-canteen-menu-filters";
import {
  AdminCanteenMenuOverview,
} from "@/features/canteen/components/admin/menu-management/admin-canteen-menu-overview";
import {
  AdminCanteenMenuList,
} from "@/features/canteen/components/admin-canteen-menu-list";

import {
  getAdminCanteenMenuData,
} from "@/lib/api/admin-canteen-menu";
import type {
  AdminCanteenAvailability,
} from "@/lib/api/admin-canteen-menu";

interface AdminCanteenMenuPageProps {
  searchParams: Promise<{
    page?: string | string[];
    search?: string | string[];
    merchant?: string | string[];
    category?: string | string[];
    availability?: string | string[];
  }>;
}

export default async function AdminCanteenMenuPage({
  searchParams,
}: AdminCanteenMenuPageProps) {
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
  const categoryId = getSingleValue(
    params.category,
  );
  const availability =
    normalizeAvailability(
      getSingleValue(
        params.availability,
      ),
    );

  const {
    stats,
    merchants,
    categories,
    productPage,
  } = await getAdminCanteenMenuData({
    page,
    search,
    merchantId,
    categoryId,
    availability,
  });

  const listKey = [
    search,
    merchantId,
    categoryId,
    availability,
    productPage.page,
  ].join(":");

  return (
    <div className="mx-auto w-full max-w-[1320px] space-y-6 px-5 py-6 lg:px-8 lg:py-8">
      <section className="lg:hidden">
        <h1 className="font-heading text-[26px] font-bold leading-8 text-navy-steel">
          Canteen Menu Management
        </h1>
        <p className="mt-1 text-base leading-6 text-[#536069]">
          Monitor katalog produk kantin SchoolCanteen.
        </p>
      </section>

      <AdminCanteenMenuOverview
        stats={stats}
      />

      <div className="space-y-0">
        <AdminCanteenMenuFilters
          search={search}
          merchantId={merchantId}
          categoryId={categoryId}
          availability={availability}
          merchants={merchants}
          categories={categories}
        />

        <AdminCanteenMenuList
          key={listKey}
          productPage={productPage}
          search={search}
          merchantId={merchantId}
          categoryId={categoryId}
          availability={availability}
        />
      </div>
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

function normalizeAvailability(
  value: string,
): AdminCanteenAvailability {
  if (
    value === "in_stock" ||
    value === "out_of_stock"
  ) {
    return value;
  }

  return "";
}
