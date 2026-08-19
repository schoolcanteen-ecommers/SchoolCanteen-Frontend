import { Check, CheckCircle2 } from "lucide-react";

interface PickupSuccessStateProps {
  orderCode: string;
  studentName: string;
  totalItems: number | null;
  onFinish: () => void;
}

export function PickupSuccessState({
  orderCode,
  studentName,
  totalItems,
  onFinish,
}: PickupSuccessStateProps) {
  return (
    <section className="mx-auto flex w-full max-w-[620px] flex-col items-center rounded-[18px] border border-[#E2E8F0] bg-white px-5 py-10 text-center shadow-[0px_10px_30px_rgba(13,27,42,0.04)] sm:px-8 sm:py-12">
      <div className="flex size-24 items-center justify-center rounded-full bg-[#DCFCE7] shadow-[0_0_40px_rgba(22,163,74,0.12)]">
        <CheckCircle2 className="size-12 text-[#15803D]" />
      </div>

      <h2 className="mt-7 font-heading text-[30px] font-bold text-navy-steel sm:text-[32px]">
        Pesanan Berhasil
      </h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-[#536069] sm:text-base">
        Pesanan telah berhasil diverifikasi dan diserahkan kepada siswa.
      </p>

      <div className="mt-7 w-full max-w-[420px] rounded-[16px] border border-[#D7DCE2] bg-[#F2F4F6] p-5 text-left">
        <div className="flex items-center justify-between gap-4 border-b border-dashed border-[#C4C6CC] py-3 first:pt-0">
          <span className="text-sm text-[#536069]">Order</span>
          <span className="text-sm font-bold text-navy-steel">{orderCode}</span>
        </div>
        <div className="flex items-center justify-between gap-4 border-b border-dashed border-[#C4C6CC] py-3">
          <span className="text-sm text-[#536069]">Student</span>
          <span className="text-right text-sm font-bold text-navy-steel">
            {studentName}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4 border-b border-dashed border-[#C4C6CC] py-3">
          <span className="text-sm text-[#536069]">Items</span>
          <span className="text-sm font-bold text-navy-steel">
            {totalItems === null ? "—" : `${totalItems} item`}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4 pt-3">
          <span className="text-sm text-[#536069]">Status</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-bold text-[#166534]">
            <Check className="size-3.5" />
            Pickup Berhasil
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onFinish}
        className="mt-7 h-12 w-full max-w-[420px] rounded-[10px] bg-navy-steel px-4 text-sm font-bold text-white shadow-[0px_4px_12px_rgba(13,27,42,0.15)] transition hover:bg-[#172A3F]"
      >
        Selesai
      </button>
    </section>
  );
}
