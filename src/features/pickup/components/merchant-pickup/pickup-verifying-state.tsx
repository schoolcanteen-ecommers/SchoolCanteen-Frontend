import { QrCode } from "lucide-react";

export function PickupVerifyingState() {
  return (
    <section className="mx-auto flex min-h-[430px] w-full max-w-[620px] flex-col items-center justify-center rounded-[18px] border border-[#E2E8F0] bg-white px-6 py-12 text-center shadow-[0px_10px_30px_rgba(13,27,42,0.04)]">
      <div className="relative flex size-20 items-center justify-center">
        <div className="absolute inset-0 animate-spin rounded-full border-[4px] border-[#E5E7EB] border-t-navy-steel" />
        <QrCode className="size-6 text-[#74777D]" />
      </div>

      <h2 className="mt-8 font-heading text-[30px] font-bold text-navy-steel">
        Memverifikasi
      </h2>
      <p className="mt-2 animate-pulse text-base text-[#536069]">
        Memverifikasi pesanan...
      </p>

      <div className="mt-8 w-full max-w-[320px] space-y-3 opacity-60">
        <div className="mx-auto h-3 w-3/4 rounded-full bg-[#ECEEF0]" />
        <div className="mx-auto h-3 w-1/2 rounded-full bg-[#ECEEF0]" />
      </div>
    </section>
  );
}
