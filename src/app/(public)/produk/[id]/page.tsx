import Link from "next/link";
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
    detail = await getProductDetail(id);
  } catch {
    notFound();
  }

  const { product, merchant, category, relatedProducts } = detail;

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
                  alt={product.name}
                  className="size-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-3">
                  <ShoppingBag className="size-10 text-muted-foreground/40" />
                  <p className="text-sm font-sans text-muted-foreground">Gambar belum tersedia</p>
                </div>
              )}
            </div>
          </div>

          
          <div className="md:col-span-5 flex flex-col justify-center">
            
            
            <div className="flex items-center gap-2 mb-3 mt-4 md:mt-0">
              <span className="bg-arctic-blue text-navy-steel text-[10px] font-bold font-sans px-2.5 py-1 rounded-md uppercase tracking-wider">
                {merchantLabel}
              </span>
              {merchant && (
                <span className="flex items-center gap-1.5 text-on-surface-variant font-sans text-xs font-medium">
                  <MerchantIcon className="size-4" />
                  {merchant.name}
                </span>
              )}
            </div>

            
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
              />
            </div>
          </div>
        </div>
      </section>

      
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

    </div>
  );
}