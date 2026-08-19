<<<<<<< HEAD
import { CommerceProductBrowser } from "@/components/commerce/commerce-product-browser";
import { getCooperativeCatalog } from "@/lib/api/catalog";

export default async function CooperativePage() {
  const { merchants, products, categories } = await getCooperativeCatalog();

  return (
    <div className="flex flex-col min-h-screen bg-neutral-surface">
      
      
      <section className="md:hidden mt-6 mb-2 px-4">
        <span className="mb-2 block font-sans text-[10px] font-bold uppercase tracking-widest text-navy-steel opacity-80">
          Koperasi Sekolah
        </span>
        <h2 className="mb-2 font-heading text-[28px] font-bold leading-tight text-navy-steel">
          Kebutuhan sekolah, lebih mudah dicari.
        </h2>
        <p className="font-sans text-base text-muted-foreground">
          Temukan kebutuhan sekolah dari koperasi dalam satu tempat.
        </p>
      </section>

      
      <section className="hidden w-full max-w-[1200px] px-6 pt-12 pb-8 mx-auto md:flex">
        <div className="flex w-full flex-col items-center justify-between gap-8 rounded-[32px] border border-white bg-arctic-blue p-8 shadow-sm md:flex-row md:p-12">
          <div className="w-full space-y-6 md:w-1/2">
            <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-navy-steel lg:text-[48px]">
              Semua kebutuhan sekolah, ada di sini.
            </h1>
            <p className="max-w-md font-sans text-lg text-on-surface-variant">
              Dari buku tulis premium hingga peralatan ujian, temukan semuanya dalam satu platform yang praktis dan rapi.
            </p>
          </div>
          <div className="flex w-full justify-end md:w-1/2">
            <div className="relative aspect-[16/9] w-full max-w-md overflow-hidden rounded-2xl border border-white/50 shadow-sm">
              <img
                className="size-full object-cover"
                alt="Premium School Supplies"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0N0QItiJhXEzhU2GbfMRSv7jsAXX5F0inx1DTHdatiQkH52igBjH11atp-oHoK11Af7UTXWTcaNBTpxysI5lq57qE6YR9UgApSBRxhK12sy2qRBMFYIY0acqPbNKgcXleNt3M6jpN8dip_5yheLRG3sXZkE-pG-1IkOPRKZVEcU4A7OioNSL9B51KlK3xmYMKmhvIi0qNuA2nXPhmBgYwGs8IhloIgjDuKEDwj6TR4y4VghPKBCo"
              />
            </div>
          </div>
        </div>
      </section>

      
      <section className="w-full flex-1">
        <CommerceProductBrowser
          merchants={merchants}
          products={products}
          categories={categories}
          searchPlaceholder="Cari kebutuhan sekolah..."
          emptyTitle="Produk tidak ditemukan"
          emptyDescription="Coba gunakan kata kunci atau kategori produk yang berbeda."
          
          hideMerchants={false}
          merchantTitle="Pilih Koperasi"
          title="Produk Koperasi"
          subtitle="Cari yang kamu butuhkan."
        />
      </section>
      
=======
"use client";

import {
  CommerceProductBrowser,
} from "@/components/commerce/commerce-product-browser";

import {
  PublicCatalogIntro,
} from "@/features/public-catalog/components/public-catalog-intro";

import {
  PublicCatalogPageError,
  PublicCatalogPageSkeleton,
} from "@/features/public-catalog/components/public-catalog-page-state";

import {
  useCooperativeCatalogQuery,
} from "@/features/public-catalog/hooks/use-public-catalog";

export default function CooperativePage() {
  const {
    data,
    isPending,
    isError,
    refetch,
  } = useCooperativeCatalogQuery();

  if (isPending) {
    return (
      <PublicCatalogPageSkeleton />
    );
  }

  if (
    isError ||
    !data
  ) {
    return (
      <PublicCatalogPageError
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  const {
    merchants,
    products,
    categories,
  } = data;

  return (
    <div className="bg-neutral-surface">
      <PublicCatalogIntro
        title="Cari kebutuhan sekolah"
        description="Temukan alat tulis dan kebutuhan harian dari koperasi sekolah dalam satu tempat."
      />

      <CommerceProductBrowser
        source="koperasi"
        merchants={merchants}
        products={products}
        categories={categories}
        searchPlaceholder="Cari alat tulis, buku, atau produk..."
        merchantTitle="Pilih koperasi"
        title="Semua produk"
        subtitle="Kebutuhan sekolah yang tersedia sekarang."
        emptyTitle="Produk tidak ditemukan"
        emptyDescription="Coba kata kunci, kategori, atau koperasi yang berbeda."
      />
>>>>>>> source/main
    </div>
  );
}
