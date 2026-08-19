<<<<<<< HEAD
import {
  Clock3,
  Hash,
  Store,
} from "lucide-react";

=======
"use client";

import {
  CheckCircle2,
  Clock3,
  Hash,
  QrCode,
  Store,
} from "lucide-react";

import {
  QRCodeSVG,
} from "qrcode.react";

import type {
  OrderStatus,
} from "@/types/order";

>>>>>>> source/main
interface StudentOrderPickupCardProps {
  pickupTime: string | null;
  pickupEndTime: string | null;
  pickupCode: string | null;
<<<<<<< HEAD
=======
  orderStatus: OrderStatus;
>>>>>>> source/main
}

export function StudentOrderPickupCard({
  pickupTime,
  pickupEndTime,
  pickupCode,
<<<<<<< HEAD
=======
  orderStatus,
>>>>>>> source/main
}: StudentOrderPickupCardProps) {
  const pickupLabel =
    pickupTime
      ? pickupEndTime
        ? `${pickupTime} - ${pickupEndTime}`
        : pickupTime
      : "Belum tersedia";

<<<<<<< HEAD
  return (
    <section className="rounded-[18px] border border-arctic-blue bg-white p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-arctic-blue text-navy-steel sm:size-12">
          <Store className="size-5" />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-navy-steel">
            Pengambilan
          </h2>

          <div className="mt-3 space-y-2 text-sm text-[#536069] sm:text-base">
            <p>
              Lokasi:{" "}
              <span className="font-medium text-navy-steel">
                Belum tersedia
              </span>
            </p>

            <p className="flex items-center gap-2">
              <Clock3 className="size-4 shrink-0" />
              <span>
                Waktu:{" "}
                <span className="font-medium text-navy-steel">
                  {pickupLabel}
                </span>
              </span>
            </p>

            {pickupCode && (
              <p className="flex items-center gap-2">
                <Hash className="size-4 shrink-0" />
                <span>
                  Kode Pengambilan:{" "}
                  <span className="font-mono font-semibold tracking-wider text-navy-steel">
                    {pickupCode}
                  </span>
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
=======
  const isReady =
    orderStatus === "READY";

  const isPickedUp =
    orderStatus === "COMPLETED";

  const canShowQr =
    isReady &&
    Boolean(
      pickupCode,
    );

  return (
    <section className="overflow-hidden rounded-[20px] border border-arctic-blue bg-white">
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-arctic-blue text-navy-steel">
            <Store className="size-5" />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="font-heading text-xl font-bold text-navy-steel">
              Pengambilan Pesanan
            </h2>

            <p className="mt-1 text-sm leading-5 text-[#536069]">
              Ambil pesanan sesuai jadwal yang sudah dipilih.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[16px] bg-[#F7F9FB] p-4">
            <div className="flex items-center gap-2 text-xs font-medium text-[#68757E]">
              <Clock3 className="size-4" />
              Waktu Pickup
            </div>

            <p className="mt-2 font-semibold text-navy-steel">
              {pickupLabel}
            </p>
          </div>

          <div className="rounded-[16px] bg-[#F7F9FB] p-4">
            <div className="flex items-center gap-2 text-xs font-medium text-[#68757E]">
              <Hash className="size-4" />
              Kode Pickup
            </div>

            <p className="mt-2 font-mono text-lg font-bold tracking-[0.14em] text-navy-steel">
              {pickupCode ??
                "Belum tersedia"}
            </p>
          </div>
        </div>
      </div>

      {canShowQr ? (
        <div className="border-t border-arctic-blue bg-arctic-blue/35 px-5 py-6 sm:px-6">
          <div className="mx-auto max-w-[300px] text-center">
            <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-navy-steel text-white">
              <QrCode className="size-5" />
            </div>

            <h3 className="mt-3 text-base font-bold text-navy-steel">
              Pesanan siap diambil
            </h3>

            <p className="mt-1 text-xs leading-5 text-[#536069]">
              Tunjukkan QR ini kepada merchant saat mengambil pesanan.
            </p>

            <div className="mx-auto mt-5 w-fit rounded-[20px] border border-[#D9E7F0] bg-white p-4 shadow-[0_8px_24px_rgba(13,27,42,0.08)]">
              <QRCodeSVG
                value={
                  pickupCode!
                }
                size={176}
                level="M"
                marginSize={1}
                title="QR Pickup SchoolCanteen"
              />
            </div>

            <div className="mt-4">
              <p className="text-[11px] text-[#68757E]">
                Jika kamera bermasalah, gunakan kode
              </p>

              <p className="mt-1 font-mono text-xl font-bold tracking-[0.18em] text-navy-steel">
                {pickupCode}
              </p>
            </div>
          </div>
        </div>
      ) : isPickedUp ? (
        <div className="border-t border-emerald-100 bg-emerald-50 px-5 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="size-5" />
            </div>

            <div>
              <p className="text-sm font-bold text-emerald-800">
                Pesanan sudah diambil
              </p>

              <p className="mt-0.5 text-xs leading-5 text-emerald-700">
                QR pickup sudah tidak dapat digunakan kembali.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-t border-arctic-blue bg-[#F7F9FB] px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <QrCode className="size-5 shrink-0 text-[#87949D]" />

            <p className="text-xs leading-5 text-[#68757E]">
              QR pickup akan aktif setelah merchant menandai pesanan sebagai
              <strong className="ml-1 text-navy-steel">
                Siap Diambil
              </strong>.
            </p>
          </div>
        </div>
      )}
>>>>>>> source/main
    </section>
  );
}
