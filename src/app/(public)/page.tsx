<<<<<<< HEAD
import Link from "next/link";
import {
  ArrowRight,
  Lock,
  Search,
  ShoppingBasket,
  Smartphone,
  Timer,
  User,
} from "lucide-react";

import { ProductCard } from "@/components/commerce/product-card";
import { getCanteenCatalog, getCooperativeCatalog } from "@/lib/api/catalog";

export default async function HomePage() {
  const [canteenCatalog, cooperativeCatalog] = await Promise.all([
    getCanteenCatalog(),
    getCooperativeCatalog(),
  ]);

  const allMerchants = [
    ...canteenCatalog.merchants,
    ...cooperativeCatalog.merchants,
  ];

  const merchantMap = new Map(
    allMerchants.map((merchant) => [merchant.id, merchant])
  );

 
  const activeCanteenProducts = canteenCatalog.products
    .filter((product) => product.isActive && product.stock > 0)
    .slice(0, 8);

  const activeCooperativeProducts = cooperativeCatalog.products
    .filter((product) => product.isActive && product.stock > 0)
    .slice(0, 8);

  const heroMockProducts = [
    activeCanteenProducts[0],
    activeCanteenProducts[1],
    activeCooperativeProducts[0],
  ].filter(Boolean);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-surface">
      
      <section className="relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 pt-8 pb-16 lg:pt-16 lg:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          
          <div className="space-y-4 z-10">
            <h1 className="font-heading text-[32px] sm:text-5xl lg:text-[64px] text-navy-steel font-bold tracking-tight leading-[1.1]">
              Belanja di sekolah, <span className="lg:bg-transparent bg-arctic-blue px-1 lg:px-0 rounded-sm">tanpa ribet.</span>
            </h1>
            <p className="font-sans text-base sm:text-lg lg:text-xl text-muted-foreground max-w-lg mt-4 mb-8">
              Platform digital premium yang menghubungkan siswa dengan fasilitas kantin dan koperasi sekolah secara efisien. Pesan, bayar, dan ambil dengan tenang.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link 
                href="/kantin"
                className="w-full sm:w-auto bg-navy-steel text-white font-sans font-medium text-base px-8 py-4 rounded-xl flex justify-between sm:justify-center items-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all"
              >
                Jelajahi Kantin
                <ArrowRight className="size-5 sm:hidden" />
              </Link>
              <Link 
                href="/koperasi"
                className="w-full sm:w-auto bg-transparent text-navy-steel border border-navy-steel/20 font-sans font-medium text-base px-8 py-4 rounded-xl flex justify-center items-center hover:bg-navy-steel/5 active:scale-[0.98] transition-all"
              >
                Lihat Koperasi
              </Link>
            </div>
          </div>

          
          <div className="hidden lg:flex relative h-[500px] bg-white rounded-[32px] border border-arctic-blue shadow-ambient-drift p-6 justify-center items-center">
            
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-arctic-blue rounded-full blur-3xl opacity-50 pointer-events-none" />
            
            
            <div className="relative w-[280px] h-[460px] bg-neutral-surface rounded-[24px] border-[4px] border-navy-steel/5 shadow-2xl flex flex-col overflow-hidden">
              <div className="bg-white p-4 border-b border-arctic-blue flex justify-between items-center z-10">
                <div className="w-8 h-8 rounded-full bg-arctic-blue flex items-center justify-center">
                  <User className="size-4 text-navy-steel" />
                </div>
                <div className="font-heading text-sm font-bold text-navy-steel">Kantin Utama</div>
                <Search className="size-4 text-muted-foreground" />
              </div>
              <div className="flex-1 p-4 space-y-4 bg-neutral-surface z-10">
                {heroMockProducts.map((product, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-xl border border-arctic-blue shadow-sm flex gap-3 items-center">
                    {product?.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover bg-muted shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-muted shrink-0 flex items-center justify-center">
                        <ShoppingBasket className="size-5 text-muted-foreground/40" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-sans font-bold text-navy-steel text-xs truncate">
                        {product?.name}
                      </h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {product?.price
                          ? new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                            }).format(product.price)
                          : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            
            <div className="absolute bottom-12 -right-8 bg-white px-5 py-3 rounded-xl shadow-ambient-drift border border-arctic-blue flex items-center gap-3 animate-bounce" style={{animationDuration: '3s'}}>
              <div className="w-8 h-8 rounded-full bg-arctic-blue flex items-center justify-center text-navy-steel">
                <Timer className="size-4" />
              </div>
              <div>
                <div className="font-sans text-xs font-bold tracking-wider uppercase text-muted-foreground">Waktu antre</div>
                <div className="font-sans text-sm font-bold text-navy-steel">Lebih efisien</div>
              </div>
=======
"use client";

import {
  PublicHomeFeedSkeleton,
} from "@/features/public-home/components/public-home-feed-skeleton";

import {
  PublicHomeIntro,
} from "@/features/public-home/components/public-home-intro";

import {
  PublicHomeProductSection,
} from "@/features/public-home/components/public-home-product-section";

import {
  usePublicHomeCatalog,
} from "@/features/public-home/hooks/use-public-home-catalog";

export default function HomePage() {
  const {
    data,
    isPending,
    isError,
    refetch,
  } = usePublicHomeCatalog();

  const canteenCatalog =
    data?.canteen ?? {
      merchants: [],
      products: [],
      categories: [],
    };

  const cooperativeCatalog =
    data?.cooperative ?? {
      merchants: [],
      products: [],
      categories: [],
    };

  const merchantNameById =
    new Map(
      [
        ...canteenCatalog.merchants,
        ...cooperativeCatalog.merchants,
      ].map(
        (merchant) => [
          merchant.id,
          merchant.name,
        ],
      ),
    );

  const activeCanteenProducts =
    canteenCatalog.products
      .filter(
        (product) =>
          product.isActive &&
          product.stock > 0,
      )
      .slice(
        0,
        8,
      );

  const activeCooperativeProducts =
    cooperativeCatalog.products
      .filter(
        (product) =>
          product.isActive &&
          product.stock > 0,
      )
      .slice(
        0,
        8,
      );

  const hasProducts =
    activeCanteenProducts.length >
      0 ||
    activeCooperativeProducts.length >
      0;

  return (
    <main className="bg-neutral-surface">
      <PublicHomeIntro />

      {isPending && (
        <PublicHomeFeedSkeleton />
      )}

      {isError && (
        <section className="bg-neutral-surface py-10">
          <div className="mx-auto max-w-[1120px] px-4 text-center sm:px-6 md:px-8">
            <div className="mx-auto max-w-md rounded-[20px] border border-[#DCEAF3] bg-white p-6 shadow-sm">
              <h2 className="font-heading text-lg font-bold text-navy-steel">
                Katalog belum dapat dimuat
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Periksa koneksi lalu coba muat ulang katalog SchoolCanteen.
              </p>

              <button
                type="button"
                onClick={() => {
                  void refetch();
                }}
                className="mt-5 h-11 rounded-xl bg-navy-steel px-5 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                Coba lagi
              </button>
>>>>>>> source/main
            </div>
          </div>

<<<<<<< HEAD
        </div>
      </section>

      
      <section className="w-full overflow-hidden py-6 border-y border-navy-steel/5 bg-white">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-8 sm:gap-12 px-4 sm:px-6">
            {[
              { icon: Lock, text: "Browsing Guest" },
              { icon: ShoppingBasket, text: "Keranjang Tersimpan" },
              { icon: Smartphone, text: "Mobile Friendly" },
             
              { icon: Lock, text: "Browsing Guest" },
              { icon: ShoppingBasket, text: "Keranjang Tersimpan" },
              { icon: Smartphone, text: "Mobile Friendly" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 sm:gap-3 text-navy-steel shrink-0 bg-neutral-surface sm:bg-transparent px-4 py-2 sm:p-0 rounded-full border border-arctic-blue sm:border-none">
                <item.icon className="size-4 sm:size-6" />
                <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {activeCanteenProducts.length > 0 && (
        <section className="bg-arctic-blue/30 py-12 lg:py-16">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
            <div className="flex justify-between items-end mb-6 lg:mb-8">
              <div>
                <h2 className="font-heading text-2xl lg:text-3xl font-bold text-navy-steel mb-1 lg:mb-2">
                  <span className="hidden lg:inline">Pilihan Favorit SakuSekolah</span>
                  <span className="lg:hidden">Mau makan apa hari ini?</span>
                </h2>
                <p className="font-sans text-sm lg:text-base text-muted-foreground">Pesan dulu, ambil nanti.</p>
              </div>
              <Link 
                href="/kantin"
                className="flex items-center gap-1 lg:gap-2 font-sans text-sm font-medium text-navy-steel lg:border-b lg:border-navy-steel lg:pb-1 hover:opacity-70 transition-opacity"
              >
                Lihat Semua <ArrowRight className="size-4 lg:hidden" />
              </Link>
            </div>

            
            <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 snap-x no-scrollbar">
              {activeCanteenProducts.map((product) => {
                const merchant = merchantMap.get(product.merchantId);
                return (
                  <div key={product.id} className="min-w-[160px] sm:min-w-0 w-[45vw] sm:w-auto shrink-0 snap-start">
                    <ProductCard
                      product={product}
                      merchantName={merchant?.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      
      {activeCooperativeProducts.length > 0 && (
        <section className="bg-white py-12 lg:py-16 border-b border-arctic-blue">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
            <div className="flex justify-between items-end mb-6 lg:mb-8">
              <div>
                <h2 className="font-heading text-2xl lg:text-3xl font-bold text-navy-steel mb-1 lg:mb-2">
                  Pilihan Favorit Koperasi
                </h2>
                <p className="font-sans text-sm lg:text-base text-muted-foreground">Kebutuhan sekolah terbaik pilihan siswa.</p>
              </div>
              <Link 
                href="/koperasi"
                className="flex items-center gap-1 lg:gap-2 font-sans text-sm font-medium text-navy-steel lg:border-b lg:border-navy-steel lg:pb-1 hover:opacity-70 transition-opacity"
              >
                Lihat Semua <ArrowRight className="size-4 lg:hidden" />
              </Link>
            </div>

            
            <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 snap-x no-scrollbar">
              {activeCooperativeProducts.map((product) => {
                const merchant = merchantMap.get(product.merchantId);
                return (
                  <div key={product.id} className="min-w-[160px] sm:min-w-0 w-[45vw] sm:w-auto shrink-0 snap-start">
                    <ProductCard
                      product={product}
                      merchantName={merchant?.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

    </div>
=======
      {!isPending &&
        !isError &&
        hasProducts && (
          <>
            <PublicHomeProductSection
              title="Populer di kantin"
              description="Pilihan makanan dan minuman yang bisa kamu pesan sekarang."
              href="/kantin"
              source="kantin"
              products={
                activeCanteenProducts
              }
              merchantNameById={
                merchantNameById
              }
              variant="blue"
            />

            <PublicHomeProductSection
              title="Kebutuhan sekolah"
              description="Alat tulis dan kebutuhan harian dari koperasi sekolah."
              href="/koperasi"
              source="koperasi"
              products={
                activeCooperativeProducts
              }
              merchantNameById={
                merchantNameById
              }
            />
          </>
        )}

      {!isPending &&
        !isError &&
        !hasProducts && (
          <section className="py-12">
            <div className="mx-auto max-w-[1120px] px-4 text-center sm:px-6 md:px-8">
              <h2 className="font-heading text-xl font-bold text-navy-steel">
                Belum ada produk tersedia
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Produk akan muncul di sini ketika kantin atau koperasi mulai menjual.
              </p>
            </div>
          </section>
        )}
    </main>
>>>>>>> source/main
  );
}
