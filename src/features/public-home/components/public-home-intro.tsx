import Link from "next/link";

import {
  ArrowRight,
  Search,
  Store,
  UtensilsCrossed,
} from "lucide-react";

export function PublicHomeIntro() {
  return (
    <section className="border-b border-[#E1EDF5] bg-white">
      <div className="mx-auto max-w-[1120px] px-4 pb-5 pt-5 sm:px-6 sm:pb-7 sm:pt-8 md:px-8 lg:pb-9 lg:pt-10">
        <div className="max-w-2xl">
          <h1 className="font-heading text-[28px] font-bold leading-[1.08] tracking-tight text-navy-steel sm:text-4xl lg:text-[42px]">
            Mau jajan apa hari ini?
          </h1>

          <p className="mt-2 max-w-xl text-[13px] leading-5 text-muted-foreground sm:text-[15px] sm:leading-6">
            Cari makanan, minuman, atau kebutuhan sekolah tanpa antre panjang.
          </p>
        </div>

        <Link
          href="/kantin"
          prefetch={false}
          className="group mt-5 flex h-[50px] w-full max-w-2xl items-center gap-3 rounded-[15px] border border-[#D9E8F2] bg-[#F8FBFD] px-4 text-left shadow-[0_2px_8px_rgba(12,33,51,0.035)] transition-colors hover:bg-white sm:mt-6 sm:h-[54px]"
        >
          <Search
            aria-hidden="true"
            className="size-5 shrink-0 text-muted-foreground"
          />

          <span className="min-w-0 flex-1 truncate text-[13px] text-muted-foreground sm:text-[15px]">
            Cari makanan, minuman, atau kantin...
          </span>

          <ArrowRight
            aria-hidden="true"
            className="size-4 shrink-0 text-navy-steel transition-transform group-hover:translate-x-0.5"
          />
        </Link>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-5 sm:max-w-2xl">
          <Link
            href="/kantin"
            prefetch={false}
            className="group flex min-h-[88px] items-center gap-3 rounded-[18px] border border-[#DCEAF3] bg-[#EEF7FD] p-3.5 transition-all hover:border-navy-steel/15 hover:bg-[#E7F4FC] sm:min-h-[96px] sm:p-4"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-[13px] bg-white text-navy-steel shadow-sm sm:size-11">
              <UtensilsCrossed className="size-5" />
            </span>

            <span className="min-w-0">
              <span className="block font-heading text-[15px] font-bold text-navy-steel sm:text-[17px]">
                Kantin
              </span>

              <span className="mt-0.5 block text-[10px] leading-4 text-muted-foreground sm:text-xs">
                Makanan & minuman
              </span>
            </span>
          </Link>

          <Link
            href="/koperasi"
            prefetch={false}
            className="group flex min-h-[88px] items-center gap-3 rounded-[18px] border border-[#DCEAF3] bg-white p-3.5 transition-all hover:border-navy-steel/15 hover:bg-[#F8FBFD] sm:min-h-[96px] sm:p-4"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-[13px] bg-[#EEF7FD] text-navy-steel sm:size-11">
              <Store className="size-5" />
            </span>

            <span className="min-w-0">
              <span className="block font-heading text-[15px] font-bold text-navy-steel sm:text-[17px]">
                Koperasi
              </span>

              <span className="mt-0.5 block text-[10px] leading-4 text-muted-foreground sm:text-xs">
                Kebutuhan sekolah
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
