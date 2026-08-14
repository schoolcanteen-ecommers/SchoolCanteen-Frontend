import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  CheckCircle2,
  ImageIcon,
  Package,
  ShoppingBag,
  Store,
} from "lucide-react";

import { ProductCard } from "@/components/commerce/product-card";
import { AddToCartButton } from "@/features/cart/components/add-to-cart-button";

import { formatCurrency } from "@/lib/utils";

import {
  getProductDetail,
} from "@/lib/api/catalog";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;

  let detail;

  try {
    detail =
      await getProductDetail(id);
  } catch {
    notFound();
  }

  const {
    product,
    merchant,
    category,
    relatedProducts,
  } = detail;

  const isAvailable =
    product.isActive &&
    product.stock > 0;

  const isCooperative =
    merchant?.type ===
    "COOPERATIVE";

  const backHref =
    isCooperative
      ? "/koperasi"
      : "/kantin";

  const merchantLabel =
    isCooperative
      ? "Koperasi"
      : "Kantin";

  const MerchantIcon =
    isCooperative
      ? ShoppingBag
      : Store;

  return (
    <div>
      {}
      <section className="border-b bg-background">
        <div className="mx-auto max-w-[1440px] px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />

            Kembali ke {merchantLabel}
          </Link>
        </div>
      </section>

      {}
      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {}
          <div className="overflow-hidden rounded-3xl border bg-muted">
            <div className="flex aspect-square items-center justify-center sm:aspect-[4/3] lg:aspect-square">
              {product.imageUrl ? (
               
                <img
                  src={
                    product.imageUrl
                  }
                  alt={product.name}
                  className="size-full object-cover"
                />
              ) : (
                <div className="flex size-full flex-col items-center justify-center gap-3">
                  <div className="flex size-16 items-center justify-center rounded-2xl bg-background">
                    <ImageIcon className="size-7 text-muted-foreground/40" />
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Gambar produk belum tersedia
                  </p>
                </div>
              )}
            </div>
          </div>

          {}
          <div className="flex flex-col">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {merchant && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                  <MerchantIcon className="size-3.5" />

                  {merchant.name}
                </span>
              )}

              {category && (
                <span className="rounded-full border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  {category.name}
                </span>
              )}
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            <p className="mt-4 text-2xl font-semibold text-primary sm:text-3xl">
              {formatCurrency(
                product.price,
              )}
            </p>

            {product.description && (
              <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                {
                  product.description
                }
              </p>
            )}

            {}
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl border bg-background p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <Package className="size-5 text-muted-foreground" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Stok tersedia
                  </p>

                  <p className="mt-0.5 text-sm font-semibold">
                    {product.stock} item
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border bg-background p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <CheckCircle2 className="size-5 text-muted-foreground" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Status
                  </p>

                  <p className="mt-0.5 text-sm font-semibold">
                    {isAvailable
                      ? "Tersedia"
                      : "Stok habis"}
                  </p>
                </div>
              </div>
            </div>

            {}
            <div className="mt-8 border-t pt-8">
              <AddToCartButton
                productId={
                  product.id
                }
                stock={
                  product.stock
                }
                disabled={
                  !isAvailable
                }
                className="w-full sm:w-auto"
              />

              <p className="mt-3 text-xs text-muted-foreground">
                Kamu belum perlu
                login untuk menambahkan
                produk ke keranjang.
              </p>
            </div>
          </div>
        </div>
      </section>

      {}
      {relatedProducts.length >
        0 && (
          <section className="border-t bg-background">
            <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
              <div className="mb-6">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Produk lainnya
                </p>

                <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                  Pilihan dari{" "}
                  {merchant?.name ??
                    "merchant ini"}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {relatedProducts.map(
                  (
                    relatedProduct,
                  ) => (
                    <ProductCard
                      key={
                        relatedProduct.id
                      }
                      product={
                        relatedProduct
                      }
                      merchantName={
                        merchant?.name
                      }
                    />
                  ),
                )}
              </div>
            </div>
          </section>
        )}
    </div>
  );
}