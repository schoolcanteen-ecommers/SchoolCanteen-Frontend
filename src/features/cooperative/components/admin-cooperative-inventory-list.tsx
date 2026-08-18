"use client";

import Link from "next/link";
import {
  AlertTriangle,
  Archive,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Package,
  PackageX,
  Search,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  EmptyState,
} from "@/components/shared/empty-state";
import {
  ADMIN_COOPERATIVE_INVENTORY_WEEKLY_CHANGE,
  getAdminCooperativeInventoryMetadata,
} from "@/mocks/admin-cooperative-inventory";
import type {
  Category,
  Product,
} from "@/types/product";

interface AdminCooperativeInventoryListProps {
  products: Product[];
  categories: Category[];
  totalStock: number;
  lowStockProducts: number;
  outOfStockProducts: number;
}

type StockStatusFilter =
  | "all"
  | "available"
  | "low-stock"
  | "out-of-stock";

const DESKTOP_PAGE_SIZE = 8;
const MOBILE_PAGE_SIZE = 4;

export function AdminCooperativeInventoryList({
  products,
  categories,
  totalStock,
  lowStockProducts,
  outOfStockProducts,
}: AdminCooperativeInventoryListProps) {
  const [search, setSearch] =
    useState("");
  const [categoryId, setCategoryId] =
    useState("");
  const [stockStatus, setStockStatus] =
    useState<StockStatusFilter>("all");
  const [page, setPage] =
    useState(1);
  const [mobileVisible, setMobileVisible] =
    useState(MOBILE_PAGE_SIZE);
  const [openMenuId, setOpenMenuId] =
    useState<string | null>(null);

  const categoryMap = useMemo(
    () =>
      new Map(
        categories.map((category) => [
          category.id,
          category.name,
        ]),
      ),
    [categories],
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return products.filter((product) => {
      const categoryName =
        categoryMap.get(
          product.categoryId,
        ) ?? "Tanpa kategori";

      const matchesSearch =
        !normalizedSearch ||
        product.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        categoryName
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesCategory =
        !categoryId ||
        product.categoryId === categoryId;

      const matchesStatus =
        matchesStockStatus(
          product.stock,
          stockStatus,
        );

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [
    categoryId,
    categoryMap,
    products,
    search,
    stockStatus,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProducts.length /
        DESKTOP_PAGE_SIZE,
    ),
  );

  const normalizedPage = Math.min(
    page,
    totalPages,
  );

  const desktopProducts =
    filteredProducts.slice(
      (normalizedPage - 1) *
        DESKTOP_PAGE_SIZE,
      normalizedPage *
        DESKTOP_PAGE_SIZE,
    );

  const mobileProducts =
    filteredProducts.slice(
      0,
      mobileVisible,
    );

  useEffect(() => {
    setPage(1);
    setMobileVisible(MOBILE_PAGE_SIZE);
    setOpenMenuId(null);
  }, [search, categoryId, stockStatus]);

  if (products.length === 0) {
    return (
      <EmptyState
        icon={Archive}
        title="Belum ada inventory"
        description="Stok produk koperasi akan tampil di sini."
      />
    );
  }

  const from =
    filteredProducts.length === 0
      ? 0
      : (normalizedPage - 1) *
          DESKTOP_PAGE_SIZE +
        1;
  const to = Math.min(
    normalizedPage * DESKTOP_PAGE_SIZE,
    filteredProducts.length,
  );

  return (
    <div className="space-y-7">
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-6">
        <div className="col-span-2 overflow-hidden rounded-[18px] border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.02)] lg:col-span-1">
          <div className="flex items-start justify-between gap-4 lg:items-center lg:justify-start lg:gap-5">
            <div className="order-2 flex size-12 items-center justify-center rounded-full bg-arctic-blue text-navy-steel lg:order-1">
              <Archive className="size-5" />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#536069]">
                Total Stock
              </p>
              <p className="mt-5 font-heading text-[30px] font-bold leading-none text-navy-steel lg:mt-1 lg:text-[28px]">
                {formatNumber(totalStock)}
              </p>
              <p className="mt-2 text-[11px] font-medium text-[#66737C] lg:hidden">
                +{ADMIN_COOPERATIVE_INVENTORY_WEEKLY_CHANGE} this week
              </p>
            </div>
          </div>
        </div>

        <SummaryCard
          icon={AlertTriangle}
          label="Low Stock"
          value={lowStockProducts}
          iconClassName="bg-[#FEF9C3] text-[#854D0E]"
        />

        <SummaryCard
          icon={PackageX}
          label="Out of Stock"
          value={outOfStockProducts}
          iconClassName="bg-[#FEF2F2] text-[#991B1B]"
        />
      </section>

      <section className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#6B747C]" />
          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search inventory..."
            className="h-12 w-full rounded-xl border border-[#CBD5E1] bg-white pl-12 pr-4 text-sm text-navy-steel outline-none transition focus:border-navy-steel focus:ring-2 focus:ring-arctic-blue lg:max-w-[380px]"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden">
          <button
            type="button"
            onClick={() => {
              setCategoryId("");
              setStockStatus("all");
            }}
            className="h-10 shrink-0 rounded-full bg-navy-steel px-4 text-xs font-bold text-white"
          >
            All Items
          </button>
          <FilterSelect
            ariaLabel="Filter kategori inventory"
            value={categoryId}
            onChange={setCategoryId}
            options={[
              ["", "Category"],
              ...categories.map(
                (category) => [
                  category.id,
                  category.name,
                ] as const,
              ),
            ]}
          />
          <FilterSelect
            ariaLabel="Filter status stok"
            value={stockStatus}
            onChange={(value) =>
              setStockStatus(
                value as StockStatusFilter,
              )
            }
            options={[
              ["all", "Stock Status"],
              ["available", "Available"],
              ["low-stock", "Low Stock"],
              ["out-of-stock", "Out of Stock"],
            ]}
          />
        </div>
      </section>

      <section className="hidden overflow-hidden rounded-[18px] border border-[#E2E8F0] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.02)] lg:block">
        <div className="flex items-center justify-between gap-4 border-b border-[#E2E8F0] p-5">
          <div className="flex items-center gap-3">
            <DesktopFilterSelect
              label="Category"
              value={categoryId}
              onChange={setCategoryId}
              options={[
                ["", "All Categories"],
                ...categories.map(
                  (category) => [
                    category.id,
                    category.name,
                  ] as const,
                ),
              ]}
            />
            <DesktopFilterSelect
              label="Stock Status"
              value={stockStatus}
              onChange={(value) =>
                setStockStatus(
                  value as StockStatusFilter,
                )
              }
              options={[
                ["all", "All Stock Status"],
                ["available", "Available"],
                ["low-stock", "Low Stock"],
                ["out-of-stock", "Out of Stock"],
              ]}
            />
          </div>
        </div>

        {desktopProducts.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead>
                  <tr className="border-b border-[#E2E8F0] bg-[#FAFBFC] text-[11px] font-bold uppercase tracking-[0.07em] text-[#536069]">
                    <th className="px-5 py-4">
                      Product
                    </th>
                    <th className="px-5 py-4">
                      Category
                    </th>
                    <th className="px-5 py-4 text-right">
                      Current Stock
                    </th>
                    <th className="px-5 py-4">
                      Stock Status
                    </th>
                    <th className="px-5 py-4">
                      Last Updated
                    </th>
                    <th className="px-5 py-4 text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7EBEE]">
                  {desktopProducts.map(
                    (product) => {
                      const categoryName =
                        categoryMap.get(
                          product.categoryId,
                        ) ?? "Tanpa kategori";
                      const status =
                        getStockStatus(
                          product.stock,
                        );
                      const metadata =
                        getAdminCooperativeInventoryMetadata(
                          product,
                        );

                      return (
                        <tr
                          key={product.id}
                          className="text-sm text-navy-steel transition hover:bg-[#FAFBFC]"
                        >
                          <td className="px-5 py-4 font-semibold">
                            {product.name}
                          </td>
                          <td className="px-5 py-4 text-[#66737C]">
                            {categoryName}
                          </td>
                          <td
                            className={`px-5 py-4 text-right font-semibold ${stockValueClassName(
                              status,
                            )}`}
                          >
                            {product.stock}
                          </td>
                          <td className="px-5 py-4">
                            <StockStatusBadge
                              status={status}
                            />
                          </td>
                          <td className="px-5 py-4 text-[#66737C]">
                            {metadata.lastUpdated}
                          </td>
                          <td className="relative px-5 py-4 text-center">
                            <button
                              type="button"
                              aria-label={`Action ${product.name}`}
                              onClick={() =>
                                setOpenMenuId(
                                  openMenuId ===
                                    product.id
                                    ? null
                                    : product.id,
                                )
                              }
                              className="inline-flex size-8 items-center justify-center rounded-full text-[#66737C] transition hover:bg-[#F2F4F6] hover:text-navy-steel"
                            >
                              <MoreVertical className="size-4" />
                            </button>

                            {openMenuId ===
                              product.id && (
                              <div className="absolute right-7 top-12 z-20 w-36 rounded-xl border border-[#E2E8F0] bg-white p-1.5 text-left shadow-lg">
                                <Link
                                  href={`/admin/cooperative/inventory/${product.id}`}
                                  className="block rounded-lg px-3 py-2 text-sm font-medium text-navy-steel hover:bg-arctic-blue"
                                >
                                  View Detail
                                </Link>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-[#E2E8F0] px-5 py-4">
              <p className="text-sm text-[#66737C]">
                Showing {from} to {to} of {filteredProducts.length} entries
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={normalizedPage <= 1}
                  onClick={() =>
                    setPage((current) =>
                      Math.max(1, current - 1),
                    )
                  }
                  className="flex size-9 items-center justify-center rounded-lg border border-[#D5DCE1] text-[#66737C] disabled:opacity-35"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <span className="flex size-9 items-center justify-center rounded-lg bg-navy-steel text-sm font-bold text-white">
                  {normalizedPage}
                </span>
                <span className="text-xs text-[#66737C]">
                  / {totalPages}
                </span>
                <button
                  type="button"
                  disabled={
                    normalizedPage >= totalPages
                  }
                  onClick={() =>
                    setPage((current) =>
                      Math.min(
                        totalPages,
                        current + 1,
                      ),
                    )
                  }
                  className="flex size-9 items-center justify-center rounded-lg border border-[#D5DCE1] text-[#66737C] disabled:opacity-35"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <NoResults />
        )}
      </section>

      <section className="-mx-5 rounded-t-[28px] bg-arctic-blue/35 px-5 py-5 lg:hidden">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-navy-steel">
            Inventory Items
          </h2>
          <p className="text-[11px] font-medium text-[#66737C]">
            Showing {Math.min(
              mobileProducts.length,
              filteredProducts.length,
            )} of {filteredProducts.length}
          </p>
        </div>

        {mobileProducts.length > 0 ? (
          <div className="space-y-4">
            {mobileProducts.map(
              (product) => {
                const categoryName =
                  categoryMap.get(
                    product.categoryId,
                  ) ?? "Tanpa kategori";
                const status =
                  getStockStatus(
                    product.stock,
                  );
                const metadata =
                  getAdminCooperativeInventoryMetadata(
                    product,
                  );

                return (
                  <article
                    key={product.id}
                    className={`overflow-hidden rounded-[18px] border bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.03)] ${
                      status ===
                      "OUT_OF_STOCK"
                        ? "border-[#F5C2C2]"
                        : "border-[#E2E8F0]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <span className="inline-flex rounded-md bg-[#F2F4F6] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.07em] text-[#66737C]">
                          {categoryName}
                        </span>
                        <h3
                          className={`mt-2 truncate text-lg font-bold ${
                            status ===
                            "OUT_OF_STOCK"
                              ? "text-[#66737C]"
                              : "text-navy-steel"
                          }`}
                        >
                          {product.name}
                        </h3>
                      </div>
                      <StockStatusBadge
                        status={status}
                      />
                    </div>

                    <div className="mt-5 flex items-end justify-between gap-3 border-t border-[#E7EBEE] pt-4">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#66737C]">
                          Stock
                        </p>
                        <p
                          className={`mt-1 text-base font-bold ${stockValueClassName(
                            status,
                          )}`}
                        >
                          {product.stock} Units
                        </p>
                        <p className="mt-1 text-[11px] font-medium text-[#A0AAB2]">
                          Updated {metadata.lastUpdated}
                        </p>
                      </div>

                      <Link
                        href={`/admin/cooperative/inventory/${product.id}`}
                        className="flex h-11 shrink-0 items-center gap-1 rounded-xl bg-arctic-blue px-4 text-xs font-bold text-navy-steel transition hover:bg-[#D6E4F9]"
                      >
                        View Detail
                        <ChevronRight className="size-4" />
                      </Link>
                    </div>
                  </article>
                );
              },
            )}

            {mobileVisible <
            filteredProducts.length ? (
              <button
                type="button"
                onClick={() =>
                  setMobileVisible(
                    (current) =>
                      current +
                      MOBILE_PAGE_SIZE,
                  )
                }
                className="h-11 w-full rounded-xl border border-[#CBD5E1] bg-white text-xs font-bold text-navy-steel"
              >
                Load More
              </button>
            ) : (
              <div className="py-5 text-center">
                <Package className="mx-auto size-8 text-[#AEB7BE]" />
                <p className="mt-2 text-xs text-[#66737C]">
                  End of list
                </p>
              </div>
            )}
          </div>
        ) : (
          <NoResults />
        )}
      </section>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  iconClassName,
}: {
  icon: typeof AlertTriangle;
  label: string;
  value: number;
  iconClassName: string;
}) {
  return (
    <div className="rounded-[18px] border border-[#E2E8F0] bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.02)] lg:flex lg:items-center lg:gap-5 lg:p-5">
      <div
        className={`flex size-9 items-center justify-center rounded-full lg:size-12 ${iconClassName}`}
      >
        <Icon className="size-4 lg:size-5" />
      </div>
      <div className="mt-6 flex flex-col lg:mt-0">
        <p className="order-1 font-heading text-[26px] font-bold leading-none text-navy-steel lg:order-2 lg:mt-1">
          {value}
        </p>
        <p className="order-2 mt-2 text-[11px] font-bold uppercase tracking-[0.07em] text-[#536069] lg:order-1 lg:mt-0">
          {label}
        </p>
      </div>
    </div>
  );
}

function FilterSelect({
  ariaLabel,
  value,
  onChange,
  options,
}: {
  ariaLabel: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly (readonly [
    string,
    string,
  ])[];
}) {
  return (
    <select
      aria-label={ariaLabel}
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
      className="h-10 shrink-0 appearance-none rounded-full border border-[#D5DCE1] bg-white px-4 text-xs font-bold text-[#536069] outline-none"
    >
      {options.map(([optionValue, label]) => (
        <option
          key={`${ariaLabel}-${optionValue}`}
          value={optionValue}
        >
          {label}
        </option>
      ))}
    </select>
  );
}

function DesktopFilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly (readonly [
    string,
    string,
  ])[];
}) {
  return (
    <label className="relative">
      <span className="sr-only">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-10 min-w-36 rounded-lg border border-[#CBD5E1] bg-white px-4 pr-9 text-sm text-[#536069] outline-none focus:border-navy-steel"
      >
        {options.map(
          ([optionValue, optionLabel]) => (
            <option
              key={`${label}-${optionValue}`}
              value={optionValue}
            >
              {optionLabel}
            </option>
          ),
        )}
      </select>
    </label>
  );
}

function StockStatusBadge({
  status,
}: {
  status: ReturnType<
    typeof getStockStatus
  >;
}) {
  const styles = {
    AVAILABLE:
      "border-[#A7E8CF] bg-[#ECFDF5] text-[#065F46]",
    LOW_STOCK:
      "border-[#F4D68D] bg-[#FEF9C3] text-[#854D0E]",
    OUT_OF_STOCK:
      "border-[#F5C2C2] bg-[#FEF2F2] text-[#991B1B]",
  }[status];

  const label = {
    AVAILABLE: "Available",
    LOW_STOCK: "Low Stock",
    OUT_OF_STOCK: "Out of Stock",
  }[status];

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-[10px] font-bold sm:text-[11px] ${styles}`}
    >
      {label}
    </span>
  );
}

function NoResults() {
  return (
    <div className="p-8 text-center">
      <Package className="mx-auto size-8 text-[#AEB7BE]" />
      <p className="mt-3 text-sm font-semibold text-navy-steel">
        Inventory tidak ditemukan
      </p>
      <p className="mt-1 text-xs text-[#66737C]">
        Coba ubah pencarian atau filter yang digunakan.
      </p>
    </div>
  );
}

function matchesStockStatus(
  stock: number,
  filter: StockStatusFilter,
) {
  if (filter === "available") {
    return stock > 10;
  }

  if (filter === "low-stock") {
    return stock > 0 && stock <= 10;
  }

  if (filter === "out-of-stock") {
    return stock <= 0;
  }

  return true;
}

function getStockStatus(
  stock: number,
) {
  if (stock <= 0) {
    return "OUT_OF_STOCK" as const;
  }

  if (stock <= 10) {
    return "LOW_STOCK" as const;
  }

  return "AVAILABLE" as const;
}

function stockValueClassName(
  status: ReturnType<
    typeof getStockStatus
  >,
) {
  if (status === "OUT_OF_STOCK") {
    return "text-[#B42318]";
  }

  if (status === "LOW_STOCK") {
    return "text-[#A16207]";
  }

  return "text-navy-steel";
}

function formatNumber(
  value: number,
) {
  return new Intl.NumberFormat(
    "en-US",
  ).format(value);
}
