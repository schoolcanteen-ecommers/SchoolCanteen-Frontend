"use client";

import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  MoreVertical,
  Package,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import type {
  ReactNode,
} from "react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  EmptyState,
} from "@/components/shared/empty-state";
import {
  formatCurrency,
} from "@/lib/utils";
import type {
  Category,
  Product,
} from "@/types/product";

interface AdminCooperativeProductListProps {
  products: Product[];
  categories: Category[];
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
}

type AvailabilityFilter =
  | "all"
  | "in-stock"
  | "low-stock"
  | "out-of-stock";

const DESKTOP_PAGE_SIZE = 8;
const MOBILE_PAGE_SIZE = 6;

export function AdminCooperativeProductList({
  products,
  categories,
  totalProducts,
  activeProducts,
  lowStockProducts,
}: AdminCooperativeProductListProps) {
  const [search, setSearch] =
    useState("");
  const [categoryId, setCategoryId] =
    useState("");
  const [availability, setAvailability] =
    useState<AvailabilityFilter>("all");
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

      const matchesAvailability =
        matchesAvailabilityFilter(
          product,
          availability,
        );

      return (
        matchesSearch &&
        matchesCategory &&
        matchesAvailability
      );
    });
  }, [
    availability,
    categoryId,
    categoryMap,
    products,
    search,
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
  }, [search, categoryId, availability]);

  if (products.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="Belum ada produk koperasi"
        description="Produk koperasi yang tersedia akan tampil di sini."
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
        <div className="col-span-2 overflow-hidden rounded-[18px] border border-navy-steel bg-navy-steel p-5 text-white shadow-[0_10px_28px_rgba(13,27,42,0.12)] lg:col-span-1 lg:border-[#E2E8F0] lg:bg-white lg:text-navy-steel lg:shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between lg:justify-start lg:gap-5">
            <div className="order-2 flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/10 lg:order-1 lg:size-14 lg:border-0 lg:bg-arctic-blue">
              <Package className="size-5 lg:size-6" />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#BAC8DC] lg:text-[#536069]">
                Total Products
              </p>
              <p className="mt-1 font-heading text-[30px] font-bold leading-none lg:text-[28px]">
                {totalProducts}
              </p>
            </div>
          </div>
        </div>

        <SummaryCard
          icon={CheckCircle2}
          label="Active Products"
          value={activeProducts}
          iconClassName="bg-[#ECFDF5] text-[#065F46]"
          valueClassName="text-[#065F46]"
        />

        <SummaryCard
          icon={AlertTriangle}
          label="Low Stock"
          value={lowStockProducts}
          iconClassName="bg-[#FEF3C7] text-[#92400E]"
          valueClassName="text-[#6E4B27]"
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
            placeholder="Search product..."
            className="h-12 w-full rounded-xl border border-[#CBD5E1] bg-white pl-12 pr-4 text-sm text-navy-steel outline-none transition focus:border-navy-steel focus:ring-2 focus:ring-arctic-blue lg:max-w-[340px]"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden">
          <span className="flex h-10 shrink-0 items-center gap-2 rounded-full bg-navy-steel px-4 text-xs font-bold text-white">
            <SlidersHorizontal className="size-4" />
            All Filters
          </span>
          <FilterSelect
            ariaLabel="Filter kategori"
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
            ariaLabel="Filter ketersediaan"
            value={availability}
            onChange={(value) =>
              setAvailability(
                value as AvailabilityFilter,
              )
            }
            options={[
              ["all", "Availability"],
              ["in-stock", "In Stock"],
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
              label="Availability"
              value={availability}
              onChange={(value) =>
                setAvailability(
                  value as AvailabilityFilter,
                )
              }
              options={[
                ["all", "All Availability"],
                ["in-stock", "In Stock"],
                ["low-stock", "Low Stock"],
                ["out-of-stock", "Out of Stock"],
              ]}
            />
          </div>

          <button
            type="button"
            disabled
            title="Menunggu dukungan Admin Product API"
            className="flex h-10 items-center gap-2 rounded-lg bg-navy-steel px-5 text-xs font-bold text-white opacity-45"
          >
            <Plus className="size-4" />
            Add Product
          </button>
        </div>

        {desktopProducts.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#DCE3E8] bg-arctic-blue/70">
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead align="right">
                      Action
                    </TableHead>
                  </tr>
                </thead>
                <tbody>
                  {desktopProducts.map(
                    (product) => {
                      const status =
                        getProductStatus(
                          product,
                        );

                      return (
                        <tr
                          key={product.id}
                          className="border-b border-[#EEF1F3] last:border-b-0 hover:bg-[#FAFBFC]"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <ProductThumb
                                product={product}
                                compact
                              />
                              <span className="font-semibold text-navy-steel">
                                {product.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-[#536069]">
                            {categoryMap.get(
                              product.categoryId,
                            ) ?? "Tanpa kategori"}
                          </td>
                          <td className="px-6 py-4 text-sm text-navy-steel">
                            {formatCurrency(
                              product.price,
                            )}
                          </td>
                          <td
                            className={`px-6 py-4 text-sm font-medium ${
                              product.stock <= 0
                                ? "text-[#991B1B]"
                                : "text-navy-steel"
                            }`}
                          >
                            {product.stock}
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge
                              status={status}
                            />
                          </td>
                          <td className="px-6 py-4 text-sm text-[#536069]">
                            Belum tersedia
                          </td>
                          <td className="relative px-6 py-4 text-right">
                            <button
                              type="button"
                              aria-label={`Aksi ${product.name}`}
                              onClick={() =>
                                setOpenMenuId(
                                  openMenuId ===
                                    product.id
                                    ? null
                                    : product.id,
                                )
                              }
                              className="rounded-full p-2 text-[#66737C] transition hover:bg-[#F2F4F6] hover:text-navy-steel"
                            >
                              <MoreVertical className="size-5" />
                            </button>
                            {openMenuId ===
                              product.id && (
                              <div className="absolute right-6 top-12 z-20 w-36 overflow-hidden rounded-xl border border-[#E2E8F0] bg-white p-1 text-left shadow-[0_12px_30px_rgba(13,27,42,0.12)]">
                                <Link
                                  href={`/admin/cooperative/products/${product.id}`}
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
                Showing {from} to {to} of {filteredProducts.length} products
              </p>
              <div className="flex items-center gap-2">
                <PaginationButton
                  disabled={normalizedPage <= 1}
                  onClick={() =>
                    setPage((current) =>
                      Math.max(1, current - 1),
                    )
                  }
                  ariaLabel="Halaman sebelumnya"
                >
                  <ChevronLeft className="size-4" />
                </PaginationButton>

                {buildPageNumbers(
                  normalizedPage,
                  totalPages,
                ).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() =>
                      setPage(pageNumber)
                    }
                    className={`size-9 rounded-lg text-sm font-bold transition ${
                      pageNumber ===
                      normalizedPage
                        ? "bg-navy-steel text-white"
                        : "border border-[#D7DEE3] bg-white text-[#66737C] hover:border-navy-steel hover:text-navy-steel"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}

                <PaginationButton
                  disabled={
                    normalizedPage >=
                    totalPages
                  }
                  onClick={() =>
                    setPage((current) =>
                      Math.min(
                        totalPages,
                        current + 1,
                      ),
                    )
                  }
                  ariaLabel="Halaman berikutnya"
                >
                  <ChevronRight className="size-4" />
                </PaginationButton>
              </div>
            </div>
          </>
        ) : (
          <div className="p-8">
            <NoProductsFound />
          </div>
        )}
      </section>

      <section className="space-y-4 lg:hidden">
        {mobileProducts.length > 0 ? (
          <>
            {mobileProducts.map(
              (product) => {
                const status =
                  getProductStatus(product);
                const lowStock =
                  status === "LOW_STOCK";

                return (
                  <article
                    key={product.id}
                    className="flex gap-4 rounded-[18px] border border-[#E2E8F0] bg-white p-3 shadow-[0_4px_12px_rgba(0,0,0,0.02)]"
                  >
                    <ProductThumb
                      product={product}
                    />

                    <div className="min-w-0 flex-1 py-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2 className="truncate font-heading text-[20px] font-bold leading-tight text-navy-steel">
                            {product.name}
                          </h2>
                          <p className="mt-1 truncate text-[11px] font-semibold uppercase tracking-[0.06em] text-[#66737C]">
                            {categoryMap.get(
                              product.categoryId,
                            ) ?? "Tanpa kategori"}
                          </p>
                        </div>
                        <StatusBadge
                          status={status}
                        />
                      </div>

                      <div className="mt-4 flex items-end justify-between gap-3">
                        <div>
                          <p
                            className={`text-xs ${
                              lowStock ||
                              status ===
                                "OUT_OF_STOCK"
                                ? "font-bold text-[#991B1B]"
                                : "text-[#66737C]"
                            }`}
                          >
                            Stock {product.stock}
                          </p>
                          <p className="mt-1 text-base font-bold text-navy-steel">
                            {formatCurrency(
                              product.price,
                            )}
                          </p>
                        </div>
                        <Link
                          href={`/admin/cooperative/products/${product.id}`}
                          className="flex min-h-11 min-w-[116px] items-center justify-center rounded-xl border border-[#D6E4F9] bg-[#EAF2FF] px-4 text-center text-xs font-bold text-navy-steel"
                        >
                          View Detail
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              },
            )}

            {mobileVisible <
              filteredProducts.length && (
              <button
                type="button"
                onClick={() =>
                  setMobileVisible(
                    (current) =>
                      current + MOBILE_PAGE_SIZE,
                  )
                }
                className="h-12 w-full rounded-xl border border-[#CBD5E1] bg-white text-sm font-bold text-navy-steel transition hover:bg-[#F8FAFC]"
              >
                Load More
              </button>
            )}

            <div className="flex justify-center py-2">
              <div className="h-1 w-12 rounded-full bg-[#E0E3E5]" />
            </div>
          </>
        ) : (
          <NoProductsFound />
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
  valueClassName,
}: {
  icon: typeof Package;
  label: string;
  value: number;
  iconClassName: string;
  valueClassName: string;
}) {
  return (
    <div className="rounded-[18px] border border-[#E2E8F0] bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.02)] lg:flex lg:items-center lg:gap-5 lg:p-5">
      <div
        className={`flex size-9 items-center justify-center rounded-full lg:size-14 ${iconClassName}`}
      >
        <Icon className="size-4 lg:size-6" />
      </div>
      <div className="mt-5 lg:mt-0">
        <p
          className={`font-heading text-[26px] font-bold leading-none lg:text-[28px] ${valueClassName}`}
        >
          {value}
        </p>
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#536069] lg:mt-1">
          {label}
        </p>
      </div>
    </div>
  );
}

function ProductThumb({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden bg-[#F2F4F6] ${
        compact
          ? "size-10 rounded-lg border border-[#DDE3E7]"
          : "size-24 rounded-xl"
      }`}
    >
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="size-full object-cover"
        />
      ) : (
        <ImageIcon className="size-5 text-[#8A949C]" />
      )}
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: ReturnType<
    typeof getProductStatus
  >;
}) {
  const styles = {
    ACTIVE:
      "border-[#A7E8CF] bg-[#ECFDF5] text-[#065F46]",
    LOW_STOCK:
      "border-[#F1C999] bg-[#FFE4C1] text-[#7A4A14]",
    OUT_OF_STOCK:
      "border-[#F5C2C2] bg-[#FEF2F2] text-[#991B1B]",
  }[status];

  const label = {
    ACTIVE: "Active",
    LOW_STOCK: "Low Stock",
    OUT_OF_STOCK: "Out of Stock",
  }[status];

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-[10px] font-bold leading-none ${styles}`}
    >
      {label}
    </span>
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
  options: readonly (readonly [string, string])[];
}) {
  return (
    <select
      aria-label={ariaLabel}
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
      className="h-10 shrink-0 appearance-none rounded-full border border-[#D2D8DD] bg-white px-4 text-xs font-semibold text-[#536069] outline-none focus:border-navy-steel"
    >
      {options.map(([optionValue, label]) => (
        <option
          key={optionValue}
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
  options: readonly (readonly [string, string])[];
}) {
  return (
    <label className="flex items-center gap-2 rounded-lg border border-[#CBD5E1] bg-white px-3 text-sm text-[#536069]">
      <SlidersHorizontal className="size-4" />
      <span className="sr-only">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-10 border-0 bg-transparent pr-7 text-sm outline-none focus:ring-0"
      >
        {options.map(
          ([optionValue, optionLabel]) => (
            <option
              key={optionValue}
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

function TableHead({
  children,
  align = "left",
}: {
  children: ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-6 py-4 text-xs font-bold uppercase tracking-[0.06em] text-navy-steel ${
        align === "right"
          ? "text-right"
          : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function PaginationButton({
  disabled,
  onClick,
  ariaLabel,
  children,
}: {
  disabled: boolean;
  onClick: () => void;
  ariaLabel: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className="flex size-9 items-center justify-center rounded-lg border border-[#D7DEE3] bg-white text-[#66737C] transition hover:border-navy-steel hover:text-navy-steel disabled:cursor-not-allowed disabled:opacity-35"
    >
      {children}
    </button>
  );
}

function NoProductsFound() {
  return (
    <EmptyState
      icon={Package}
      title="Produk tidak ditemukan"
      description="Tidak ada produk yang sesuai dengan pencarian atau filter saat ini."
    />
  );
}

function matchesAvailabilityFilter(
  product: Product,
  availability: AvailabilityFilter,
) {
  if (availability === "all") {
    return true;
  }

  if (availability === "out-of-stock") {
    return product.stock <= 0;
  }

  if (availability === "low-stock") {
    return (
      product.stock > 0 &&
      product.stock <= 10
    );
  }

  return product.stock > 10;
}

function getProductStatus(
  product: Product,
) {
  if (product.stock <= 0) {
    return "OUT_OF_STOCK" as const;
  }

  if (product.stock <= 10) {
    return "LOW_STOCK" as const;
  }

  return "ACTIVE" as const;
}

function buildPageNumbers(
  currentPage: number,
  totalPages: number,
) {
  const candidates = [
    1,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    totalPages,
  ];

  return Array.from(
    new Set(
      candidates.filter(
        (pageNumber) =>
          pageNumber >= 1 &&
          pageNumber <= totalPages,
      ),
    ),
  ).sort((a, b) => a - b);
}
