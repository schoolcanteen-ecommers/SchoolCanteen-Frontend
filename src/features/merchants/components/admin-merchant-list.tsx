"use client";

import {
  ImageIcon,
  Package,
  ShoppingBasket,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import { useMemo, useState } from "react";

import { EmptyState } from "@/components/shared/empty-state";

import { cn } from "@/lib/utils";

import type {
  Merchant,
  MerchantType,
} from "@/types/merchant";
import type { Product } from "@/types/product";

interface AdminMerchantListProps {
  merchants: Merchant[];
  products: Product[];
}

type MerchantFilter =
  | "ALL"
  | MerchantType;

const MERCHANT_TYPE_LABEL: Record<
  MerchantType,
  string
> = {
  CANTEEN: "Kantin",
  COOPERATIVE: "Koperasi",
};

export function AdminMerchantList({
  merchants,
  products,
}: AdminMerchantListProps) {
  const [filter, setFilter] =
    useState<MerchantFilter>("ALL");

  const productCountMap = useMemo(() => {
    const map = new Map<string, number>();

    for (const product of products) {
      map.set(
        product.merchantId,
        (map.get(product.merchantId) ?? 0) +
          1,
      );
    }

    return map;
  }, [products]);

  const filteredMerchants =
    useMemo(() => {
      if (filter === "ALL") {
        return merchants;
      }

      return merchants.filter(
        (merchant) =>
          merchant.type === filter,
      );
    }, [filter, merchants]);

  return (
    <section className="mt-8">
      {/* Header + Filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Daftar Merchant
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Pantau merchant kantin dan
            koperasi yang tersedia di
            SchoolCanteen.
          </p>
        </div>

        <div className="flex w-fit rounded-xl border bg-background p-1">
          <FilterButton
            active={filter === "ALL"}
            onClick={() =>
              setFilter("ALL")
            }
          >
            Semua
          </FilterButton>

          <FilterButton
            active={
              filter === "CANTEEN"
            }
            onClick={() =>
              setFilter("CANTEEN")
            }
          >
            Kantin
          </FilterButton>

          <FilterButton
            active={
              filter === "COOPERATIVE"
            }
            onClick={() =>
              setFilter("COOPERATIVE")
            }
          >
            Koperasi
          </FilterButton>
        </div>
      </div>

      {/* Merchant List */}
      {filteredMerchants.length > 0 ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredMerchants.map(
            (merchant) => {
              const productCount =
                productCountMap.get(
                  merchant.id,
                ) ?? 0;

              const TypeIcon =
                merchant.type ===
                "CANTEEN"
                  ? UtensilsCrossed
                  : ShoppingBasket;

              return (
                <article
                  key={merchant.id}
                  className="overflow-hidden rounded-2xl border bg-background"
                >
                  {/* Merchant Image */}
                  <div className="relative aspect-[16/7] overflow-hidden bg-muted">
                    {merchant.imageUrl ? (
                     
                      <img
                        src={
                          merchant.imageUrl
                        }
                        alt={merchant.name}
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center">
                        <ImageIcon className="size-10 text-muted-foreground/40" />
                      </div>
                    )}

                    <div className="absolute left-3 top-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-background/95 px-2.5 py-1 text-[11px] font-medium shadow-sm backdrop-blur">
                        <TypeIcon className="size-3.5" />

                        {
                          MERCHANT_TYPE_LABEL[
                            merchant.type
                          ]
                        }
                      </span>
                    </div>

                    <div className="absolute right-3 top-3">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium shadow-sm backdrop-blur",
                          merchant.status ===
                            "ACTIVE"
                            ? "bg-emerald-50/95 text-emerald-700"
                            : "bg-slate-100/95 text-slate-700",
                        )}
                      >
                        {merchant.status ===
                        "ACTIVE"
                          ? "Aktif"
                          : "Nonaktif"}
                      </span>
                    </div>
                  </div>

                  {/* Merchant Content */}
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <Store className="size-5 text-primary" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate font-semibold">
                          {merchant.name}
                        </h3>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {
                            MERCHANT_TYPE_LABEL[
                              merchant.type
                            ]
                          }
                        </p>
                      </div>
                    </div>

                    {merchant.description ? (
                      <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
                        {
                          merchant.description
                        }
                      </p>
                    ) : (
                      <p className="mt-4 min-h-10 text-sm leading-5 text-muted-foreground">
                        Belum ada deskripsi
                        merchant.
                      </p>
                    )}

                    <div className="mt-5 border-t pt-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Produk tampil
                          </p>

                          <p className="mt-1 text-lg font-semibold">
                            {productCount}
                          </p>
                        </div>

                        <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                          <Package className="size-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            },
          )}
        </div>
      ) : (
        <div className="mt-4">
          <EmptyState
            icon={Store}
            title="Merchant tidak ditemukan"
            description="Tidak ada merchant yang sesuai dengan filter yang dipilih."
          />
        </div>
      )}
    </section>
  );
}

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function FilterButton({
  active,
  onClick,
  children,
}: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg px-3 py-1.5 text-sm font-medium transition",
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}