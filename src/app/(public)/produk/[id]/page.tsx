import Link from "next/link";
<<<<<<< HEAD
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Store,
  ShoppingBag,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

import { ProductCard } from "@/components/commerce/product-card";
import { formatCurrency } from "@/lib/utils";
import { getProductDetail } from "@/lib/api/catalog";
import { ProductDetailActions } from "@/features/products/components/product-detail-actions";
=======

import {
  notFound,
} from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ImageIcon,
  PackageCheck,
  ShoppingBag,
  Store,
  XCircle,
} from "lucide-react";

import {
  ProductCard,
} from "@/components/commerce/product-card";

import {
  ProductDetailActions,
} from "@/features/products/components/product-detail-actions";

import {
  getProductDetail,
} from "@/lib/api/catalog";
>>>>>>> source/main

import {
  getOptimizedCloudinaryImageUrl,
} from "@/lib/cloudinary-image";

import {
  formatCurrency,
} from "@/lib/utils";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;

  searchParams: Promise<{
    source?: string;
  }>;
}

export default async function ProductDetailPage({
  params,
  searchParams,
}: ProductDetailPageProps) {
  const {
    id,
  } = await params;

  const query =
    await searchParams;

  let detail;
  try {
<<<<<<< HEAD
    detail = await getProductDetail(id);
=======
    detail =
      await getProductDetail(
        id,
      );
>>>>>>> source/main
  } catch {
    notFound();
  }

  const { product, merchant, category, relatedProducts } = detail;

<<<<<<< HEAD
  const isAvailable = product.isActive && product.stock > 0;
  const isCooperative = merchant?.type === "COOPERATIVE";
  const backHref = isCooperative ? "/koperasi" : "/kantin";
  const merchantLabel = isCooperative ? "Koperasi" : "Kantin";
  const MerchantIcon = isCooperative ? ShoppingBag : Store;

  return (
    <div className="flex flex-col min-h-screen bg-neutral-surface md:bg-white pb-6">
      
      
      <section className="mx-auto max-w-[1200px] w-full px-4 pt-6 pb-4 sm:px-6 lg:px-10 md:pt-8 md:pb-6">
        <nav aria-label="Breadcrumb" className="flex text-navy-steel font-heading text-sm font-bold">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link href={backHref} className="hover:text-primary transition-colors text-muted-foreground font-medium">
                {merchantLabel}
              </Link>
            </li>
            {category && (
              <li>
                <div className="flex items-center">
                  <ChevronRight className="size-4 mx-1 text-muted-foreground" />
                  <span className="text-muted-foreground font-medium">{category.name}</span>
                </div>
              </li>
            )}
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="size-4 mx-1 text-muted-foreground" />
                <span>{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>
      </section>

      
      <section className="mx-auto max-w-[1200px] w-full px-4 pb-8 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
          
          
          <div className="md:col-span-7">
            <div className="w-full aspect-[4/3] rounded-[24px] md:rounded-[32px] overflow-hidden bg-arctic-blue/30 border border-arctic-blue shadow-sm md:shadow-none flex items-center justify-center">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
=======
  const isAvailable =
    product.isActive &&
    product.stock > 0;

  const isCooperative =
    merchant?.type ===
    "COOPERATIVE";

  /*
   * Query source dari halaman sebelumnya
   * diprioritaskan supaya back navigation
   * tetap sesuai konteks.
   */
  const source =
    query.source === "koperasi" ||
    query.source === "kantin"
      ? query.source
      : isCooperative
        ? "koperasi"
        : "kantin";

  const backHref =
    source === "koperasi"
      ? "/koperasi"
      : "/kantin";

  const merchantLabel =
    source === "koperasi"
      ? "Koperasi"
      : "Kantin";

  const MerchantIcon =
    source === "koperasi"
      ? ShoppingBag
      : Store;

  return (
    <div className="bg-neutral-surface">
      {/* Back navigation */}
      <div className="border-b border-[#E2EDF4] bg-white">
        <div className="mx-auto max-w-[1120px] px-4 py-3 sm:px-6 md:px-8">
          <Link
            href={backHref}
            prefetch={false}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg text-[13px] font-semibold text-navy-steel transition-opacity hover:opacity-70 sm:text-sm"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-4"
            />

            Kembali ke {merchantLabel}
          </Link>
        </div>
      </div>

      {/* Main product */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1120px] px-4 pb-7 pt-4 sm:px-6 sm:pb-9 sm:pt-6 md:px-8 lg:grid lg:grid-cols-12 lg:gap-10 lg:pb-12 lg:pt-8">
          {/* Product image */}
          <div className="lg:col-span-7">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-[22px] border border-[#DCEAF3] bg-[#F4F9FC] sm:rounded-[26px]">
              {product.imageUrl ? (
                <img
                  src={getOptimizedCloudinaryImageUrl(
                    product.imageUrl,
                    {
                      width: 900,
                      height: 675,
                    },
                  )}
>>>>>>> source/main
                  alt={product.name}
                  width={900}
                  height={675}
                  decoding="async"
                  className="size-full object-cover"
                />
              ) : (
<<<<<<< HEAD
                <div className="flex flex-col items-center justify-center gap-3">
                  <ShoppingBag className="size-10 text-muted-foreground/40" />
                  <p className="text-sm font-sans text-muted-foreground">Gambar belum tersedia</p>
=======
                <div className="flex size-full flex-col items-center justify-center gap-3 text-muted-foreground">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-white">
                    <ImageIcon className="size-6 opacity-45" />
                  </div>

                  <p className="text-[13px]">
                    Gambar belum tersedia
                  </p>
>>>>>>> source/main
                </div>
              )}
            </div>
          </div>

<<<<<<< HEAD
          
          <div className="md:col-span-5 flex flex-col justify-center">
            
            
            <div className="flex items-center gap-2 mb-3 mt-4 md:mt-0">
              <span className="bg-arctic-blue text-navy-steel text-[10px] font-bold font-sans px-2.5 py-1 rounded-md uppercase tracking-wider">
                {merchantLabel}
              </span>
              {merchant && (
                <span className="flex items-center gap-1.5 text-on-surface-variant font-sans text-xs font-medium">
                  <MerchantIcon className="size-4" />
=======
          {/* Product summary */}
          <div className="mt-5 lg:col-span-5 lg:mt-0 lg:flex lg:flex-col lg:justify-center">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex min-h-7 items-center rounded-full bg-[#EEF7FD] px-3 text-[10px] font-bold uppercase tracking-[0.08em] text-navy-steel">
                {merchantLabel}
              </span>

              {merchant && (
                <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground sm:text-[13px]">
                  <MerchantIcon className="size-3.5" />

>>>>>>> source/main
                  {merchant.name}
                </span>
              )}
            </div>

<<<<<<< HEAD
            
            <h1 className="font-heading text-[32px] md:text-[42px] font-bold text-navy-steel leading-tight mb-2">
              {product.name}
            </h1>
            
            
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="text-2xl md:text-3xl font-bold text-navy-steel font-heading">
                {formatCurrency(product.price)}
              </div>
              <div className="text-xs md:text-sm font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-emerald-100">
                <CheckCircle2 className="size-4" />
                {isAvailable ? "Tersedia" : "Habis"}
              </div>
            </div>

            
            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed mb-6 md:mb-8">
              {product.description || "Produk demo SchoolCanteen."}
            </p>

            
            <div className="mb-2">
              <ProductDetailActions 
                productId={product.id} 
                stock={product.stock} 
                isAvailable={isAvailable} 
=======
            <h1 className="mt-3 font-heading text-[30px] font-bold leading-[1.08] tracking-tight text-navy-steel sm:text-[36px] lg:text-[42px]">
              {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="font-heading text-[24px] font-bold text-navy-steel sm:text-[28px]">
                {formatCurrency(
                  product.price,
                )}
              </p>

              <span
                className={
                  isAvailable
                    ? "inline-flex min-h-8 items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 text-[11px] font-bold text-emerald-700"
                    : "inline-flex min-h-8 items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-3 text-[11px] font-bold text-red-700"
                }
              >
                {isAvailable ? (
                  <CheckCircle2 className="size-3.5" />
                ) : (
                  <XCircle className="size-3.5" />
                )}

                {isAvailable
                  ? "Tersedia"
                  : "Habis"}
              </span>
            </div>

            {product.description && (
              <p className="mt-4 text-[13px] leading-6 text-muted-foreground sm:text-[15px]">
                {product.description}
              </p>
            )}

            {/* Useful product facts */}
            <div className="mt-5 grid grid-cols-2 gap-3 border-y border-[#E4EDF3] py-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                  Kategori
                </p>

                <p className="mt-1 truncate text-[13px] font-semibold text-navy-steel sm:text-sm">
                  {category?.name ??
                    "Umum"}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                  Stok
                </p>

                <p className="mt-1 inline-flex items-center gap-1.5 text-[13px] font-semibold text-navy-steel sm:text-sm">
                  <PackageCheck className="size-4 text-muted-foreground" />

                  {product.stock > 0
                    ? `${product.stock} tersedia`
                    : "Stok habis"}
                </p>
              </div>
            </div>

            {/* Existing cart logic */}
            <div className="mt-5">
              <ProductDetailActions
                productId={product.id}
                stock={product.stock}
                isAvailable={isAvailable}
                hasModifiers={
                  Boolean(
                    product.hasModifiers,
                  )
                }
                requiresCustomization={
                  Boolean(
                    product.requiresCustomization,
                  )
                }
>>>>>>> source/main
              />
            </div>
          </div>
        </div>
      </section>

<<<<<<< HEAD
      
      <section className="mx-auto max-w-[1200px] w-full px-4 py-8 sm:px-6 lg:px-10 border-t border-arctic-blue bg-neutral-surface md:bg-white">
        <h3 className="font-heading text-lg md:text-xl font-bold text-navy-steel mb-6">Detail Produk</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="flex flex-col justify-start">
            <h4 className="font-sans text-xs font-bold text-secondary uppercase tracking-wider mb-1 md:mb-2">Kategori</h4>
            <p className="font-sans text-sm text-navy-steel font-medium text-left">{category?.name || "Umum"}</p>
          </div>
          <div className="flex flex-col justify-start">
            <h4 className="font-sans text-xs font-bold text-secondary uppercase tracking-wider mb-1 md:mb-2">Penjual</h4>
            <p className="font-sans text-sm text-navy-steel font-medium text-left">{merchant?.name || "Kantin Sekolah"}</p>
          </div>
          <div className="flex flex-col justify-start">
            <h4 className="font-sans text-xs font-bold text-secondary uppercase tracking-wider mb-1 md:mb-2">Komposisi</h4>
            <p className="font-sans text-sm text-navy-steel font-medium text-left line-clamp-3 md:line-clamp-none">{product.description || "-"}</p>
          </div>
          <div className="flex flex-col justify-start">
            <h4 className="font-sans text-xs font-bold text-secondary uppercase tracking-wider mb-1 md:mb-2">Ketersediaan</h4>
            <p className="font-sans text-sm text-navy-steel font-medium text-left flex items-center justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Sisa {product.stock} porsi/item
            </p>
          </div>
        </div>
      </section>

      
      {relatedProducts.length > 0 && (
        <section className="mx-auto max-w-[1200px] w-full px-4 py-8 sm:px-6 lg:px-10 mb-8 border-t border-arctic-blue md:border-none">
          <div className="flex justify-between items-end mb-6">
            <h2 className="font-heading text-xl md:text-2xl font-bold text-navy-steel">
              Mungkin kamu juga suka
            </h2>
            <Link href={backHref} className="flex items-center gap-1 font-sans text-sm font-medium text-navy-steel hover:opacity-70 transition-opacity">
              Lihat semua <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                merchantName={merchant?.name}
              />
            ))}
          </div>
        </section>
      )}

=======
      {/* Related products */}
      {relatedProducts.length >
        0 && (
        <section className="border-t border-[#E1EDF5] bg-[#EEF7FD]/55 py-7 sm:py-9 lg:py-11">
          <div className="mx-auto max-w-[1120px] px-4 sm:px-6 md:px-8">
            <header className="mb-4 flex items-end justify-between gap-4 sm:mb-6">
              <div>
                <h2 className="font-heading text-[21px] font-bold tracking-tight text-navy-steel sm:text-[25px]">
                  Mungkin kamu suka
                </h2>

                <p className="mt-1 text-[12px] text-muted-foreground sm:text-sm">
                  Pilihan lain dari {merchantLabel.toLowerCase()} sekolah.
                </p>
              </div>

              <Link
                href={backHref}
                prefetch={false}
                className="flex shrink-0 items-center gap-1 text-[12px] font-bold text-navy-steel transition-opacity hover:opacity-70 sm:text-sm"
              >
                Lihat semua

                <ArrowRight className="size-4" />
              </Link>
            </header>

            <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
              {relatedProducts.map(
                (
                  relatedProduct,
                ) => (
                  <div
                    key={
                      relatedProduct.id
                    }
                    className="w-[62vw] min-w-[190px] max-w-[232px] shrink-0 snap-start sm:w-auto sm:min-w-0 sm:max-w-none"
                  >
                    <ProductCard
                      product={
                        relatedProduct
                      }
                      merchantName={
                        merchant?.name
                      }
                      source={
                        source
                      }
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      )}
>>>>>>> source/main
    </div>
  );
}
