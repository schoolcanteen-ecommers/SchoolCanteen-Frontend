"use client";

import {
  Boxes,
  ChevronRight,
  ClipboardList,
  CookingPot,
  Grid2X2,
  Home,
  Package,
  QrCode,
  Settings,
  WalletCards,
  X,
} from "lucide-react";

import Link from "next/link";

import {
  usePathname,
} from "next/navigation";

import {
  useState,
} from "react";

import {
  cn,
} from "@/lib/utils";

const PRIMARY_ITEMS = [
  {
    label: "Beranda",
    href: "/merchant/dashboard",
    icon: Home,
  },
  {
    label: "Pesanan",
    href: "/merchant/orders",
    icon: ClipboardList,
  },
  {
    label: "Produksi",
    href: "/merchant/production",
    icon: CookingPot,
  },
  {
    label: "Pickup",
    href: "/merchant/pickup",
    icon: QrCode,
  },
] as const;

const MORE_ITEMS = [
  {
    label: "Menu",
    description:
      "Kelola makanan dan pilihan menu",
    href: "/merchant/products",
    icon: Package,
  },
  {
    label: "Stok",
    description:
      "Atur jumlah stok yang tersedia",
    href: "/merchant/inventory",
    icon: Boxes,
  },
  {
    label: "Keuangan",
    description:
      "Saldo, transaksi, dan pencairan",
    href: "/merchant/finance",
    icon: WalletCards,
  },
  {
    label: "Pengaturan",
    description:
      "Akun dan informasi merchant",
    href: "/merchant/settings",
    icon: Settings,
  },
] as const;

function isActivePath(
  pathname: string,
  href: string,
) {
  return (
    pathname === href ||
    pathname.startsWith(
      `${href}/`,
    )
  );
}

export function MerchantBottomNav() {
  const pathname =
    usePathname();

  const [
    moreOpen,
    setMoreOpen,
  ] =
    useState(false);

  const moreActive =
    MORE_ITEMS.some(
      (item) =>
        isActivePath(
          pathname,
          item.href,
        ),
    );

  return (
    <>
      <nav
        aria-label="Navigasi merchant"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-[#DDE5EB] bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_28px_rgba(13,27,42,0.08)] backdrop-blur-xl lg:hidden"
      >
        <div className="mx-auto grid h-[68px] max-w-xl grid-cols-5 px-1">
          {PRIMARY_ITEMS.map(
            (item) => {
              const Icon =
                item.icon;

              const active =
                isActivePath(
                  pathname,
                  item.href,
                );

              return (
                <Link
                  key={
                    item.href
                  }
                  href={
                    item.href
                  }
                  className="relative flex min-w-0 flex-col items-center justify-center gap-1"
                >
                  <span
                    className={cn(
                      "flex h-8 min-w-10 items-center justify-center rounded-full px-3 transition-colors",
                      active
                        ? "bg-[#DCEEFF] text-navy-steel"
                        : "text-[#70808D]",
                    )}
                  >
                    <Icon
                      className="size-[20px]"
                      strokeWidth={
                        active
                          ? 2.4
                          : 1.9
                      }
                    />
                  </span>

                  <span
                    className={cn(
                      "truncate text-[10px] font-semibold",
                      active
                        ? "text-navy-steel"
                        : "text-[#70808D]",
                    )}
                  >
                    {
                      item.label
                    }
                  </span>
                </Link>
              );
            },
          )}

          <button
            type="button"
            aria-label="Buka menu lainnya"
            aria-expanded={
              moreOpen
            }
            onClick={() =>
              setMoreOpen(
                true,
              )
            }
            className="relative flex min-w-0 flex-col items-center justify-center gap-1"
          >
            <span
              className={cn(
                "flex h-8 min-w-10 items-center justify-center rounded-full px-3 transition-colors",
                moreActive
                  ? "bg-[#DCEEFF] text-navy-steel"
                  : "text-[#70808D]",
              )}
            >
              <Grid2X2
                className="size-[20px]"
                strokeWidth={
                  moreActive
                    ? 2.4
                    : 1.9
                }
              />
            </span>

            <span
              className={cn(
                "text-[10px] font-semibold",
                moreActive
                  ? "text-navy-steel"
                  : "text-[#70808D]",
              )}
            >
              Lainnya
            </span>
          </button>
        </div>
      </nav>

      {moreOpen ? (
        <>
          <button
            type="button"
            aria-label="Tutup menu lainnya"
            onClick={() =>
              setMoreOpen(
                false,
              )
            }
            className="fixed inset-0 z-[70] bg-[#0D1B2A]/40 backdrop-blur-[2px] lg:hidden"
          />

          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="merchant-more-title"
            className="fixed inset-x-0 bottom-0 z-[80] rounded-t-[28px] bg-white px-5 pb-[calc(24px+env(safe-area-inset-bottom))] pt-3 shadow-[0_-20px_50px_rgba(13,27,42,0.16)] lg:hidden"
          >
            <div className="mx-auto mb-4 h-1.5 w-11 rounded-full bg-[#D6DEE5]" />

            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="merchant-more-title"
                  className="font-heading text-2xl font-bold text-navy-steel"
                >
                  Lainnya
                </h2>

                <p className="mt-1 text-sm text-[#64748B]">
                  Kelola kebutuhan kantin lainnya.
                </p>
              </div>

              <button
                type="button"
                aria-label="Tutup"
                onClick={() =>
                  setMoreOpen(
                    false,
                  )
                }
                className="flex size-11 items-center justify-center rounded-full bg-[#F1F5F9] text-navy-steel"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-5 overflow-hidden rounded-[20px] border border-[#E2E8F0] bg-white">
              {MORE_ITEMS.map(
                (
                  item,
                  index,
                ) => {
                  const Icon =
                    item.icon;

                  const active =
                    isActivePath(
                      pathname,
                      item.href,
                    );

                  return (
                    <Link
                      key={
                        item.href
                      }
                      href={
                        item.href
                      }
                      onClick={() =>
                        setMoreOpen(
                          false,
                        )
                      }
                      className={cn(
                        "flex min-h-[72px] items-center gap-4 px-4 py-3 transition",
                        index <
                          MORE_ITEMS.length -
                            1 &&
                          "border-b border-[#EDF1F4]",
                        active &&
                          "bg-[#F0F7FF]",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-11 shrink-0 items-center justify-center rounded-xl",
                          active
                            ? "bg-navy-steel text-white"
                            : "bg-[#F1F5F9] text-navy-steel",
                        )}
                      >
                        <Icon className="size-5" />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold text-navy-steel">
                          {
                            item.label
                          }
                        </span>

                        <span className="mt-0.5 block text-xs leading-5 text-[#64748B]">
                          {
                            item.description
                          }
                        </span>
                      </span>

                      <ChevronRight className="size-5 shrink-0 text-[#94A3B8]" />
                    </Link>
                  );
                },
              )}
            </div>
          </section>
        </>
      ) : null}
    </>
  );
}
