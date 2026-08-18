"use client";

import {
  ImageIcon,
  Package,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import {
  useState,
} from "react";

import {
  getCanteenMenuClientPage,
} from "@/lib/api/admin-canteen-menu-client";
import type {
  AdminCanteenAvailability,
  AdminCanteenProduct,
  AdminCanteenProductPageData,
} from "@/lib/api/admin-canteen-menu";
import {
  formatCurrency,
} from "@/lib/utils";

interface AdminCanteenMenuListProps {
  productPage: AdminCanteenProductPageData;
  search: string;
  merchantId: string;
  categoryId: string;
  availability: AdminCanteenAvailability;
}

export function AdminCanteenMenuList({
  productPage,
  search,
  merchantId,
  categoryId,
  availability,
}: AdminCanteenMenuListProps) {
  const [mobileProducts, setMobileProducts] =
    useState(productPage.products);
  const [mobilePage, setMobilePage] =
    useState(productPage.page);
  const [hasMore, setHasMore] =
    useState(productPage.hasNextPage);
  const [isLoading, setIsLoading] =
    useState(false);

  async function loadMore() {
    if (isLoading || !hasMore) {
      return;
    }

    setIsLoading(true);

    try {
      const nextPage = mobilePage + 1;
      const result =
        await getCanteenMenuClientPage(
          {
            search,
            merchantId,
            categoryId,
            availability,
          },
          nextPage,
        );

      setMobileProducts((current) => [
        ...current,
        ...result.products.filter(
          (product) =>
            !current.some(
              (item) =>
                item.id === product.id,
            ),
        ),
      ]);
      setMobilePage(nextPage);
      setHasMore(result.hasNextPage);
    } finally {
      setIsLoading(false);
    }
  }

  if (productPage.total === 0) {
    return (
      <section className="rounded-[18px] border border-[#E0E3E5] bg-white px-6 py-12 text-center shadow-[0_4px_6px_rgba(13,27,42,0.02)] lg:rounded-t-none">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-arctic-blue text-navy-steel">
          <Package className="size-5" />
        </div>
        <h2 className="mt-4 font-heading text-xl font-semibold text-navy-steel">
          Produk tidak ditemukan
        </h2>
        <p className="mt-1 text-sm text-[#536069]">
          Ubah pencarian atau filter untuk melihat produk kantin lainnya.
        </p>
      </section>
    );
  }

  return (
    <>
      <section className="hidden overflow-hidden rounded-b-[18px] border border-[#E0E3E5] bg-white shadow-[0_4px_6px_rgba(13,27,42,0.02)] lg:block">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#DDE5EA] bg-arctic-blue">
                <TableHeading>
                  Product
                </TableHeading>
                <TableHeading>
                  Merchant
                </TableHeading>
                <TableHeading>
                  Category
                </TableHeading>
                <TableHeading>
                  Price
                </TableHeading>
                <TableHeading>
                  Stock
                </TableHeading>
                <TableHeading>
                  Status
                </TableHeading>
              </tr>
            </thead>
            <tbody>
              {productPage.products.map(
                (product) => (
                  <DesktopProductRow
                    key={product.id}
                    product={product}
                  />
                ),
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-[#F1F5F9] px-4 py-4 text-sm text-[#536069]">
          <p>
            Showing {productPage.from} to{" "}
            {productPage.to} of{" "}
            {productPage.total} entries
          </p>

          <DesktopPagination
            productPage={productPage}
            search={search}
            merchantId={merchantId}
            categoryId={categoryId}
            availability={availability}
          />
        </div>
      </section>

      <section className="space-y-4 pb-6 lg:hidden">
        {mobileProducts.map((product) => (
          <MobileProductCard
            key={product.id}
            product={product}
          />
        ))}

        {hasMore ? (
          <button
            type="button"
            onClick={loadMore}
            disabled={isLoading}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#C4C6CC] bg-white text-xs font-bold tracking-wide text-navy-steel transition hover:bg-[#F2F4F6] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading
              ? "Loading..."
              : "Load More"}
            <RefreshCw
              className={`size-4 ${
                isLoading
                  ? "animate-spin"
                  : ""
              }`}
            />
          </button>
        ) : null}
      </section>
    </>
  );
}

function DesktopProductRow({
  product,
}: {
  product: AdminCanteenProduct;
}) {
  const outOfStock = product.stock <= 0;

  return (
    <tr className="border-b border-[#F1F5F9] transition last:border-b-0 hover:bg-arctic-blue/25">
      <td className="px-6 py-4">
        <div className="flex min-w-[220px] items-center gap-3">
          <ProductImage
            product={product}
            compact
          />
          <p className="font-semibold text-navy-steel">
            {product.name}
          </p>
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-[#536069]">
        {product.merchant.name}
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <span className="rounded-full bg-[#ECEEF0] px-2.5 py-1 text-[11px] font-medium text-[#536069]">
          {product.category?.name ??
            "Tanpa kategori"}
        </span>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-navy-steel">
        {formatCurrency(product.price)}
      </td>
      <td
        className={`whitespace-nowrap px-6 py-4 text-sm font-medium ${
          outOfStock
            ? "text-red-700"
            : "text-navy-steel"
        }`}
      >
        {product.stock}
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <ProductStatus
          outOfStock={outOfStock}
        />
      </td>
    </tr>
  );
}

function MobileProductCard({
  product,
}: {
  product: AdminCanteenProduct;
}) {
  const outOfStock = product.stock <= 0;

  return (
    <article
      className={`overflow-hidden rounded-[18px] border border-[#E0E3E5] bg-white shadow-[0_4px_6px_rgba(13,27,42,0.02)] ${
        outOfStock ? "opacity-80" : ""
      }`}
    >
      <div className="flex gap-4 border-b border-[#E0E3E5] p-5">
        <ProductImage product={product} />

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <h2 className="line-clamp-2 text-lg font-semibold leading-6 text-navy-steel">
              {product.name}
            </h2>
            <p className="mt-0.5 line-clamp-1 text-sm text-[#536069]">
              {product.merchant.name} •{" "}
              {product.category?.name ??
                "Tanpa kategori"}
            </p>
          </div>

          <div className="mt-2 flex items-end justify-between gap-2">
            <p className="text-lg font-semibold text-navy-steel">
              {formatCurrency(product.price)}
            </p>
            <ProductStatus
              outOfStock={outOfStock}
              compact
            />
          </div>
        </div>
      </div>

      <div className="flex min-h-14 items-center bg-[#F7F9FB] px-5 py-3">
        <div
          className={`flex items-center gap-1.5 text-sm ${
            outOfStock
              ? "text-red-700"
              : "text-[#536069]"
          }`}
        >
          <Package className="size-4" />
          <span>
            Stock:{" "}
            <strong
              className={
                outOfStock
                  ? "text-red-700"
                  : "text-navy-steel"
              }
            >
              {product.stock}
            </strong>
          </span>
        </div>
      </div>
    </article>
  );
}

function ProductImage({
  product,
  compact = false,
}: {
  product: AdminCanteenProduct;
  compact?: boolean;
}) {
  const sizeClass = compact
    ? "size-11 rounded-lg"
    : "size-20 rounded-xl";

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden bg-[#F2F4F6] text-[#74777D] ${sizeClass}`}
    >
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="size-full object-cover"
        />
      ) : (
        <ImageIcon
          className={
            compact
              ? "size-5"
              : "size-6"
          }
        />
      )}
    </div>
  );
}

function ProductStatus({
  outOfStock,
  compact = false,
}: {
  outOfStock: boolean;
  compact?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-bold uppercase ${
        compact
          ? "px-2 py-1 text-[10px]"
          : "px-3 py-1 text-[11px]"
      } ${
        outOfStock
          ? "bg-red-50 text-red-700"
          : "bg-emerald-50 text-emerald-700"
      }`}
    >
      {!compact ? (
        <span
          className={`size-1.5 rounded-full ${
            outOfStock
              ? "bg-red-600"
              : "bg-emerald-600"
          }`}
        />
      ) : null}
      {outOfStock
        ? "Out of Stock"
        : "Active"}
    </span>
  );
}

function TableHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th className="whitespace-nowrap px-6 py-3 text-xs font-bold tracking-wide text-navy-steel">
      {children}
    </th>
  );
}

function DesktopPagination({
  productPage,
  search,
  merchantId,
  categoryId,
  availability,
}: AdminCanteenMenuListProps) {
  const visiblePages = buildVisiblePages(
    productPage.page,
    productPage.totalPages,
  );

  return (
    <div className="flex items-center gap-2">
      <PaginationLink
        page={productPage.page - 1}
        disabled={!productPage.hasPreviousPage}
        label="‹"
        search={search}
        merchantId={merchantId}
        categoryId={categoryId}
        availability={availability}
      />

      {visiblePages.map((page) => (
        <PaginationLink
          key={page}
          page={page}
          active={page === productPage.page}
          label={String(page)}
          search={search}
          merchantId={merchantId}
          categoryId={categoryId}
          availability={availability}
        />
      ))}

      {productPage.totalPages > 4 &&
      visiblePages.at(-1) !==
        productPage.totalPages ? (
        <span className="px-1">...</span>
      ) : null}

      <PaginationLink
        page={productPage.page + 1}
        disabled={!productPage.hasNextPage}
        label="›"
        search={search}
        merchantId={merchantId}
        categoryId={categoryId}
        availability={availability}
      />
    </div>
  );
}

function PaginationLink({
  page,
  disabled = false,
  active = false,
  label,
  search,
  merchantId,
  categoryId,
  availability,
}: {
  page: number;
  disabled?: boolean;
  active?: boolean;
  label: string;
  search: string;
  merchantId: string;
  categoryId: string;
  availability: AdminCanteenAvailability;
}) {
  const className = `flex size-8 items-center justify-center rounded border text-sm transition ${
    active
      ? "border-navy-steel bg-navy-steel text-white"
      : disabled
        ? "cursor-not-allowed border-[#E0E3E5] text-[#C4C6CC]"
        : "border-[#CBD5E1] text-navy-steel hover:bg-[#F2F4F6]"
  }`;

  if (disabled) {
    return (
      <span className={className}>
        {label}
      </span>
    );
  }

  return (
    <Link
      href={buildMenuHref({
        page,
        search,
        merchantId,
        categoryId,
        availability,
      })}
      className={className}
    >
      {label}
    </Link>
  );
}

function buildVisiblePages(
  page: number,
  totalPages: number,
): number[] {
  if (totalPages <= 3) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1,
    );
  }

  const start = Math.max(
    1,
    Math.min(page - 1, totalPages - 2),
  );

  return [start, start + 1, start + 2];
}

function buildMenuHref({
  page,
  search,
  merchantId,
  categoryId,
  availability,
}: {
  page: number;
  search: string;
  merchantId: string;
  categoryId: string;
  availability: AdminCanteenAvailability;
}): string {
  const params = new URLSearchParams();

  if (page > 1) {
    params.set("page", String(page));
  }
  if (search) {
    params.set("search", search);
  }
  if (merchantId) {
    params.set("merchant", merchantId);
  }
  if (categoryId) {
    params.set("category", categoryId);
  }
  if (availability) {
    params.set(
      "availability",
      availability,
    );
  }

  const query = params.toString();

  return query
    ? `/admin/canteen/menu?${query}`
    : "/admin/canteen/menu";
}
