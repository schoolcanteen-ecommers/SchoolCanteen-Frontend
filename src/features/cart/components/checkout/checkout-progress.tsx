import { CheckCircle2 } from "lucide-react";

export function CheckoutProgress() {
  return (
    <div className="hidden items-center gap-3 text-xs font-medium text-[#536069] md:flex">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="size-[18px]" />
        <span>Cart</span>
      </div>

      <div className="h-px w-8 bg-[#C4C6CC]" />

      <div className="flex items-center gap-2 rounded-full bg-arctic-blue px-3 py-1.5 font-bold text-navy-steel">
        <span className="flex size-5 items-center justify-center rounded-full bg-navy-steel text-[10px] text-white">
          2
        </span>
        <span>Checkout</span>
      </div>

      <div className="h-px w-8 bg-[#C4C6CC]" />

      <div className="flex items-center gap-2 text-[#74777D]">
        <span className="flex size-5 items-center justify-center rounded-full border border-[#74777D] text-[10px]">
          3
        </span>
        <span>Selesai</span>
      </div>
    </div>
  );
}
