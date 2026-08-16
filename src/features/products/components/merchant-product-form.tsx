"use client";

import { useState } from "react";

import { ImagePlus, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  createMerchantProduct,
  updateMerchantProduct,
} from "@/lib/api/merchant-products-client";

import { formatCurrency } from "@/lib/utils";

import type { Category, Product } from "@/types/product";

interface MerchantProductFormProps {
  product?: Product | null;

  categories: Category[];

  onClose: () => void;

  onSaved: () => void;
}

export function MerchantProductForm({
  product,
  categories,
  onClose,
  onSaved,
}: MerchantProductFormProps) {
  const isEditing = Boolean(product);

  const [name, setName] = useState(product?.name ?? "");

  const [categoryId, setCategoryId] = useState(product?.categoryId ?? "");

  const [description, setDescription] = useState(product?.description ?? "");

  const [price, setPrice] = useState(product ? String(product.price) : "");

  const [stock, setStock] = useState(product ? String(product.stock) : "");

  const [isActive, setIsActive] = useState(product?.isActive ?? true);

  const [image, setImage] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setError(null);

    const parsedPrice = Number(price);

    const parsedStock = Number(stock);

    if (!name.trim()) {
      setError("Nama produk wajib diisi.");

      return;
    }

    if (!Number.isInteger(parsedPrice) || parsedPrice < 1) {
      setError("Harga produk minimal Rp1.");

      return;
    }

    if (!Number.isInteger(parsedStock) || parsedStock < 0) {
      setError("Stok produk tidak valid.");

      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: name.trim(),

        categoryId: categoryId || null,

        description: description.trim() || null,

        price: parsedPrice,

        stock: parsedStock,

        isActive,

        image,
      };

      if (product) {
        await updateMerchantProduct(product.id, payload);
      } else {
        await createMerchantProduct(payload);
      }

      onSaved();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Produk gagal disimpan.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border bg-background shadow-xl">
        <div className="flex items-start justify-between gap-4 border-b p-5">
          <div>
            <h2 className="text-lg font-semibold">
              {isEditing ? "Edit Produk" : "Tambah Produk"}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {isEditing
                ? "Perbarui informasi produk merchant."
                : "Tambahkan produk baru ke SchoolCanteen."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          <div>
            <label htmlFor="product-name" className="text-sm font-medium">
              Nama Produk
            </label>

            <input
              id="product-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={255}
              className="mt-2 h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div>
            <label htmlFor="product-category" className="text-sm font-medium">
              Kategori
            </label>

            <select
              id="product-category"
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
              className="mt-2 h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:border-primary"
            >
              <option value="">Tanpa kategori</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="product-description"
              className="text-sm font-medium"
            >
              Deskripsi
            </label>

            <textarea
              id="product-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              className="mt-2 w-full resize-none rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="product-price" className="text-sm font-medium">
                Harga
              </label>

              <input
                id="product-price"
                type="number"
                min={1}
                step={1}
                inputMode="numeric"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                className="mt-2 h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:border-primary"
              />

              {price && Number(price) > 0 && (
                <p className="mt-1.5 text-xs text-muted-foreground">
                  {formatCurrency(Number(price))}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="product-stock" className="text-sm font-medium">
                Stok
              </label>

              <input
                id="product-stock"
                type="number"
                min={0}
                step={1}
                inputMode="numeric"
                value={stock}
                onChange={(event) => setStock(event.target.value)}
                className="mt-2 h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label htmlFor="product-image" className="text-sm font-medium">
              Gambar Produk
            </label>

            <label
              htmlFor="product-image"
              className="mt-2 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed p-4 transition hover:bg-muted/40"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                <ImagePlus className="size-5 text-primary" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium">
                  {image
                    ? image.name
                    : product?.imageUrl
                      ? "Ganti gambar produk"
                      : "Pilih gambar produk"}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  JPG, JPEG, PNG, atau WEBP. Maksimal 5 MB.
                </p>
              </div>
            </label>

            <input
              id="product-image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => setImage(event.target.files?.[0] ?? null)}
              className="sr-only"
            />
          </div>

          <label className="flex items-center justify-between gap-4 rounded-xl bg-muted/40 p-4">
            <div>
              <p className="text-sm font-medium">Produk Aktif</p>

              <p className="mt-1 text-xs text-muted-foreground">
                Produk aktif dapat tampil di katalog publik.
              </p>
            </div>

            <input
              type="checkbox"
              checked={isActive}
              onChange={(event) => setIsActive(event.target.checked)}
              className="size-4"
            />
          </label>

          {error && (
            <div className="rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 border-t pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="h-10 rounded-xl border px-4 text-sm font-medium transition hover:bg-muted disabled:opacity-50"
            >
              Batal
            </button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Menyimpan..."
                : isEditing
                  ? "Simpan Perubahan"
                  : "Tambah Produk"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
