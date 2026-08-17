import { Clock3, MapPin } from "lucide-react";

export function CheckoutPickupSection() {
  return (
    <section className="rounded-2xl border border-arctic-blue bg-white p-4 lg:p-8">
      <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold text-navy-steel lg:mb-6 lg:text-2xl">
        <Clock3 className="size-5 lg:size-6" />
        Pengambilan Pesanan
      </h2>

      <div className="grid grid-cols-2 gap-3 lg:gap-4">
        <div className="rounded-xl border-2 border-navy-steel bg-arctic-blue p-3 lg:flex lg:items-start lg:gap-3 lg:p-4">
          <MapPin className="size-5 shrink-0 text-navy-steel lg:mt-0.5" />

          <div className="mt-1 min-w-0 lg:mt-0">
            <h3 className="font-sans text-xs font-semibold text-navy-steel lg:text-sm">
              Lokasi
            </h3>
            <p className="mt-1 truncate font-sans text-sm font-medium text-navy-steel lg:text-base">
              Belum tersedia
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-[#C4C6CC] bg-white p-3 lg:flex lg:items-start lg:gap-3 lg:p-4">
          <Clock3 className="size-5 shrink-0 text-[#536069] lg:mt-0.5" />

          <div className="mt-1 min-w-0 lg:mt-0">
            <h3 className="font-sans text-xs font-semibold text-[#536069] lg:text-sm">
              Waktu Ambil
            </h3>
            <p className="mt-1 truncate font-sans text-sm font-medium text-[#191C1E] lg:text-base">
              Belum tersedia
            </p>
          </div>
        </div>
      </div>

      <p className="mt-3 font-sans text-xs leading-5 text-[#536069]">
        Lokasi dan waktu pengambilan belum tersedia karena pickup slot belum
        terintegrasi pada checkout.
      </p>
    </section>
  );
}
