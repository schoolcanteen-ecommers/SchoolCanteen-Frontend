import {
  UtensilsCrossed,
} from "lucide-react";

import { CommerceProductBrowser } from "@/components/commerce/commerce-product-browser";

import {
  getCanteenCatalog,
} from "@/lib/api/catalog";

export default async function CanteenPage() {
  const {
    merchants,
    products,
    categories,
  } = await getCanteenCatalog();

  return (
    <div>
      {/* Page Header */}
      <section className="border-b bg-background">
        <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
                <UtensilsCrossed className="size-4" />
                Kantin Digital
              </div>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Mau makan apa hari ini?
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                Pesan makanan dari kantin
                sekolah lebih awal dan ambil
                saat pesanan sudah siap tanpa
                antre panjang.
              </p>
            </div>

            <div className="flex gap-6 text-sm">
              <div>
                <p className="text-2xl font-semibold">
                  {merchants.length}
                </p>

                <p className="text-muted-foreground">
                  Kantin aktif
                </p>
              </div>

              <div className="border-l pl-6">
                <p className="text-2xl font-semibold">
                  {products.length}
                </p>

                <p className="text-muted-foreground">
                  Menu tersedia
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Browser */}
      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <CommerceProductBrowser
          merchants={merchants}
          products={products}
          categories={categories}
          searchPlaceholder="Cari makanan, minuman, atau kantin..."
          emptyTitle="Menu tidak ditemukan"
          emptyDescription="Coba gunakan kata kunci atau kategori makanan yang berbeda."
        />
      </section>
    </div>
  );
}