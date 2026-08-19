import Link from "next/link";

import {
  ArrowLeft,
  ClipboardList,
  LockKeyhole,
} from "lucide-react";

import type { MerchantProductionItem } from "@/features/production/lib/merchant-production";

interface MerchantProductionDetailProps {
  item: MerchantProductionItem | null;
  productName: string | null;
}

function sortRelatedOrders(item: MerchantProductionItem) {
  return [...item.orders].sort((a, b) => {
    if (a.pickupTime && b.pickupTime) {
      const pickupCompare = a.pickupTime.localeCompare(b.pickupTime);

      if (pickupCompare !== 0) {
        return pickupCompare;
      }
    } else if (a.pickupTime) {
      return -1;
    } else if (b.pickupTime) {
      return 1;
    }

    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
}

export function MerchantProductionDetail({
  item,
  productName,
}: MerchantProductionDetailProps) {
  if (!item) {
    return (
      <div className="mx-auto w-full max-w-[900px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <Link
          href="/merchant/production"
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy-steel hover:underline"
        >
          <ArrowLeft className="size-4" />
          Kembali ke Production Summary
        </Link>

        <section className="mt-6 rounded-[18px] border border-[#E2E8F0] bg-white p-6 shadow-[0_10px_30px_rgba(13,27,42,0.04)] sm:p-8">
          <h1 className="font-heading text-3xl font-bold text-navy-steel">
            {productName ?? "Kebutuhan Produksi"}
          </h1>
          <p className="mt-3 text-[#64748B]">
            Kebutuhan produksi ini sudah tidak aktif.
          </p>
          <Link
            href="/merchant/production"
            className="mt-6 inline-flex rounded-xl bg-navy-steel px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Kembali ke Production Summary
          </Link>
        </section>
      </div>
    );
  }

  const relatedOrders = sortRelatedOrders(item);

  return (
    <div className="mx-auto w-full max-w-[900px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <Link
        href="/merchant/production"
        className="inline-flex items-center gap-2 text-sm font-semibold text-navy-steel hover:underline"
      >
        <ArrowLeft className="size-4" />
        Kembali
      </Link>

      <h1 className="mt-6 font-heading text-3xl font-bold text-navy-steel sm:text-4xl">
        Detail Produksi
      </h1>

      <section className="mt-6 rounded-[18px] border border-[#E2E8F0] bg-white p-6 shadow-[0_10px_30px_rgba(13,27,42,0.04)] sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold text-navy-steel">
              {item.productName}
            </h2>
            <p className="mt-2 text-[#64748B]">Kebutuhan dari pesanan aktif</p>
          </div>
          <span className="inline-flex w-fit items-center rounded-full bg-[#E6F4FF] px-3 py-1 text-sm font-semibold text-navy-steel">
            Aktif
          </span>
        </div>

        <div className="mt-10 flex items-baseline gap-3">
          <span className="font-heading text-6xl font-bold leading-none text-navy-steel">
            {item.totalQuantity}
          </span>
          <span className="text-sm font-bold uppercase tracking-[0.05em] text-[#64748B]">
            item
          </span>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-[#E2E8F0] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-[#64748B]">
            <ClipboardList className="size-4" />
            <span>Dari {item.orderCount} pesanan aktif</span>
          </div>

          <div className="sm:text-right">
            <button
              type="button"
              disabled
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl bg-[#E2E8F0] px-5 py-3 text-sm font-bold text-[#64748B]"
            >
              <LockKeyhole className="size-4" />
              Selesai Masak
            </button>
            <p className="mt-2 text-xs text-[#94A3B8]">
              Action belum tersedia pada sistem.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-3xl font-bold text-navy-steel">
          Daftar Pesanan
        </h2>

        <div className="mt-5 overflow-hidden rounded-[18px] border border-[#E2E8F0] bg-white shadow-[0_10px_30px_rgba(13,27,42,0.04)]">
          {relatedOrders.map((orderEntry, index) => (
            <article
              key={orderEntry.orderId}
              className={`flex min-h-20 items-center justify-between gap-5 px-5 py-4 sm:px-6 ${
                index < relatedOrders.length - 1 ? "border-b border-[#E2E8F0]" : ""
              }`}
            >
              <div className="min-w-0">
                <p className="font-bold text-navy-steel">#{orderEntry.orderCode}</p>
                <p className="mt-1 truncate text-[#64748B]">
                  {orderEntry.customerName}
                </p>
              </div>

              <div className="flex shrink-0 items-baseline gap-2">
                <span className="font-heading text-2xl font-bold text-navy-steel">
                  {orderEntry.quantity}
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.05em] text-[#64748B]">
                  item
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
