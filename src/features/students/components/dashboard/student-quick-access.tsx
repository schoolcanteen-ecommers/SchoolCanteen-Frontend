import Link from "next/link";
<<<<<<< HEAD
import {
  Package,
  Store,
  UtensilsCrossed,
  WalletCards,
=======

import {
  ArrowRight,
  Store,
  UtensilsCrossed,
>>>>>>> source/main
} from "lucide-react";

import {
  cn,
} from "@/lib/utils";

interface StudentQuickAccessProps {
  className?: string;
}

<<<<<<< HEAD
const quickAccessItems = [
  {
    href: "/kantin",
    label: "Kantin",
    icon: UtensilsCrossed,
  },
  {
    href: "/koperasi",
    label: "Koperasi",
    icon: Store,
  },
  {
    href: "/student/orders",
    label: "Pesanan",
    icon: Package,
  },
  {
    href: "/student/wallet",
    label: "Wallet",
    icon: WalletCards,
=======
const services = [
  {
    href:
      "/student/kantin",

    label:
      "Kantin",

    description:
      "Makanan & minuman",

    icon:
      UtensilsCrossed,
  },

  {
    href:
      "/student/koperasi",

    label:
      "Koperasi",

    description:
      "Kebutuhan sekolah",

    icon:
      Store,
>>>>>>> source/main
  },
] as const;

export function StudentQuickAccess({
  className,
}: StudentQuickAccessProps) {
  return (
    <section
      className={cn(
<<<<<<< HEAD
        "flex flex-col gap-4",
        className,
      )}
    >
      <h2 className="font-sans text-lg font-semibold text-[#191C1E] lg:text-xl">
        Akses Cepat
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {quickAccessItems.map(
          ({
            href,
            label,
            icon: Icon,
          }) => (
            <Link
              key={href}
              href={href}
              className="flex min-h-[94px] flex-col items-center justify-center gap-2 rounded-[18px] border border-arctic-blue bg-white p-4 text-navy-steel transition-colors hover:bg-arctic-blue lg:min-h-[88px]"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-arctic-blue lg:bg-transparent">
                <Icon className="size-5" />
              </div>

              <span className="text-sm font-semibold">
                {label}
              </span>
=======
        "min-w-0",
        className,
      )}
    >
      <div>
        <h2 className="font-heading text-[22px] font-bold leading-tight text-navy-steel lg:text-2xl">
          Mau beli apa hari ini?
        </h2>

        <p className="mt-1 text-[13px] leading-5 text-[#68757E] sm:text-sm">
          Pilih layanan yang kamu butuhkan.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {services.map(
          ({
            href,
            label,
            description,
            icon:
              Icon,
          }) => (
            <Link
              key={
                href
              }
              href={
                href
              }
              prefetch={
                false
              }
              className="group flex min-h-[132px] flex-col rounded-[20px] border border-[#D8E7F0] bg-white p-4 text-navy-steel shadow-[0_4px_18px_rgba(13,27,42,0.035)] transition-[transform,box-shadow] duration-200 active:scale-[0.98] sm:min-h-[142px] sm:p-5"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-arctic-blue">
                <Icon className="size-5" />
              </div>

              <div className="mt-auto">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-[15px] font-bold sm:text-base">
                    {
                      label
                    }
                  </h3>

                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>

                <p className="mt-1 text-[11px] leading-4 text-[#68757E] sm:text-xs">
                  {
                    description
                  }
                </p>
              </div>
>>>>>>> source/main
            </Link>
          ),
        )}
      </div>
    </section>
  );
}
