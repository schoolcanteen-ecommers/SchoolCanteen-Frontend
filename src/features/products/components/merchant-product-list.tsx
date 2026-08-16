"use client";

import {
  Boxes,
  ImageIcon,
  Package,
  PackageCheck,
  PackageX,
  Pencil,
  Plus,
  Power,
  Tags,
  Trash2,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { StatCard } from "@/components/dashboard/stat-card";

import { EmptyState } from "@/components/shared/empty-state";

import { Button } from "@/components/ui/button";

import { MerchantProductForm } from "@/features/products/components/merchant-product-form";

import {
  deleteMerchantProduct,
  updateMerchantProductStatus,
} from "@/lib/api/merchant-products-client";

import { cn, formatCurrency } from "@/lib/utils";

import type { Category, Product } from "@/types/product";

interface MerchantProductListProps {
  products: Product[];
  categories: Category[];
}

export function MerchantProductList({
  products,
  categories,
}: MerchantProductListProps) {
  const router = useRouter();

  const [formOpen, setFormOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [processingId, setProcessingId] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const activeProducts = products.filter((product) => product.isActive).length;

  const outOfStockProducts = products.filter(
    (product) => product.stock <= 0,
  ).length;

  const categoryMap = new Map(
    categories.map((category) => [category.id, category.name]),
  );

  function openCreate() {
    setEditingProduct(null);

    setFormOpen(true);
  }

  function openEdit(product: Product) {
    setEditingProduct(product);

    setFormOpen(true);
  }

  function handleSaved() {
    setFormOpen(false);

    setEditingProduct(null);

    router.refresh();
  }

  async function handleToggle(product: Product) {
    if (processingId) {
      return;
    }

    setError(null);

    setProcessingId(product.id);

    try {
      await updateMerchantProductStatus(product.id, !product.isActive);

      router.refresh();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Status produk gagal diperbarui.",
      );
    } finally {
      setProcessingId(null);
    }
  }

  async function handleDelete(product: Product) {
    const confirmed = window.confirm(
      `Hapus produk "${product.name}"? Produk akan dihapus dari merchant management dan katalog publik.`,
    );

    if (!confirmed) {
      return;
    }

    setError(null);

    setProcessingId(product.id);

    try {
      await deleteMerchantProduct(product.id);

      router.refresh();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Produk gagal dihapus.",
      );
    } finally {
      setProcessingId(null);
    }
  }

  return (
    <>
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Produk"
          value={products.length}
          description="Produk yang terdaftar"
          icon={Package}
        />

        <StatCard
          title="Produk Aktif"
          value={activeProducts}
          description="Produk yang sedang aktif"
          icon={PackageCheck}
        />

        <StatCard
          title="Stok Habis"
          value={outOfStockProducts}
          description="Produk yang perlu diperhatikan"
          icon={PackageX}
        />
      </section>

      <section className="mt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Daftar Produk</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Pantau produk, harga, stok, kategori, dan status produk merchant.
            </p>
          </div>

          <Button type="button" onClick={openCreate}>
            <Plus className="size-4" />
            Tambah Produk
          </Button>
        </div>

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {products.length > 0 ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => {
              const categoryName =
                categoryMap.get(product.categoryId) ?? "Tanpa kategori";

              const isAvailable = product.isActive && product.stock > 0;

              const processing = processingId === product.id;

              return (
                <article
                  key={product.id}
                  className="overflow-hidden rounded-2xl border bg-background"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center">
                        <ImageIcon className="size-10 text-muted-foreground/40" />
                      </div>
                    )}

                    <div className="absolute left-3 top-3">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium shadow-sm backdrop-blur",

                          product.isActive
                            ? "bg-emerald-50/95 text-emerald-700"
                            : "bg-slate-100/95 text-slate-700",
                        )}
                      >
                        {product.isActive ? "Aktif" : "Nonaktif"}
                      </span>
                    </div>

                    <div className="absolute right-3 top-3">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium shadow-sm backdrop-blur",

                          isAvailable
                            ? "bg-background/95 text-foreground"
                            : "bg-destructive text-destructive-foreground",
                        )}
                      >
                        {product.stock > 0
                          ? `Stok ${product.stock}`
                          : "Stok Habis"}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="line-clamp-2 font-semibold">
                          {product.name}
                        </h3>

                        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Tags className="size-3.5" />

                          <span className="truncate">{categoryName}</span>
                        </div>
                      </div>

                      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <Boxes className="size-4 text-primary" />
                      </div>
                    </div>

                    {product.description && (
                      <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
                        {product.description}
                      </p>
                    )}

                    <div className="mt-5 border-t pt-4">
                      <p className="text-xs text-muted-foreground">Harga</p>

                      <p className="mt-1 text-lg font-semibold">
                        {formatCurrency(product.price)}
                      </p>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-muted/40 p-3">
                        <p className="text-xs text-muted-foreground">Stok</p>

                        <p
                          className={cn(
                            "mt-1 font-semibold",

                            product.stock <= 0 && "text-destructive",
                          )}
                        >
                          {product.stock}
                        </p>
                      </div>

                      <div className="rounded-xl bg-muted/40 p-3">
                        <p className="text-xs text-muted-foreground">
                          Ketersediaan
                        </p>

                        <p
                          className={cn(
                            "mt-1 text-sm font-semibold",

                            isAvailable
                              ? "text-emerald-700"
                              : "text-muted-foreground",
                          )}
                        >
                          {isAvailable ? "Tersedia" : "Tidak tersedia"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2 border-t pt-4">
                      <button
                        type="button"
                        onClick={() => openEdit(product)}
                        disabled={processing}
                        className="flex h-9 items-center justify-center gap-1.5 rounded-lg border text-xs font-medium transition hover:bg-muted disabled:opacity-50"
                      >
                        <Pencil className="size-3.5" />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => void handleToggle(product)}
                        disabled={processing}
                        className="flex h-9 items-center justify-center gap-1.5 rounded-lg border text-xs font-medium transition hover:bg-muted disabled:opacity-50"
                      >
                        <Power className="size-3.5" />

                        {product.isActive ? "Nonaktif" : "Aktifkan"}
                      </button>

                      <button
                        type="button"
                        onClick={() => void handleDelete(product)}
                        disabled={processing}
                        className="flex h-9 items-center justify-center gap-1.5 rounded-lg border text-xs font-medium text-destructive transition hover:bg-destructive/5 disabled:opacity-50"
                      >
                        <Trash2 className="size-3.5" />
                        Hapus
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-4">
            <EmptyState
              icon={Package}
              title="Belum ada produk"
              description="Tambahkan produk pertama untuk mulai mengelola katalog merchant."
            />
          </div>
        )}
      </section>

      {formOpen && (
        <MerchantProductForm
          key={editingProduct?.id ?? "create"}
          product={editingProduct}
          categories={categories}
          onClose={() => {
            setFormOpen(false);

            setEditingProduct(null);
          }}
          onSaved={handleSaved}
        />
      )}
    </>
  );
}
