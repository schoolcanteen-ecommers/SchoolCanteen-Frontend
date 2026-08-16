import { CommerceProductBrowser } from "@/components/commerce/commerce-product-browser";
import { getCanteenCatalog } from "@/lib/api/catalog";

export default async function CanteenPage() {
  const { merchants, products, categories } = await getCanteenCatalog();

  return (
    <div className="flex flex-col min-h-screen bg-neutral-surface">
      
      <section className="px-4 pt-8 pb-4 sm:px-6 md:px-10 md:pt-12 md:pb-8">
        <div className="mx-auto max-w-[1200px]">
          <h1 className="mb-2 font-heading text-[28px] font-bold text-navy-steel md:mb-4 md:text-[48px]">
            Mau makan apa hari ini?
          </h1>
          <p className="max-w-2xl font-sans text-base text-muted-foreground md:text-lg">
            Temukan makanan favoritmu dari berbagai pilihan kantin sehat di sekolah. Pesan sekarang, ambil saat istirahat tanpa antre panjang.
          </p>
        </div>
      </section>

      
      <section className="w-full flex-1">
        <CommerceProductBrowser
          merchants={merchants}
          products={products}
          categories={categories}
          searchPlaceholder="Cari Nasi Goreng, Es Teh, atau nama kantin..."
          emptyTitle="Menu tidak ditemukan"
          emptyDescription="Coba gunakan kata kunci atau kategori makanan yang berbeda."
        />
      </section>
    </div>
  );
}