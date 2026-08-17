import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CheckoutMobilePaymentBarProps {
  canSubmit: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export function CheckoutMobilePaymentBar({
  canSubmit,
  isSubmitting,
  onSubmit,
}: CheckoutMobilePaymentBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-20 z-40 px-5 lg:hidden">
      <div className="mx-auto max-w-md">
        <Button
          type="button"
          className="h-[52px] w-full rounded-[14px] bg-navy-steel font-sans text-sm font-semibold text-white shadow-[0_12px_32px_rgba(13,27,42,0.20)] hover:bg-navy-steel/90"
          disabled={!canSubmit}
          onClick={onSubmit}
        >
          {isSubmitting ? "Memproses Pesanan..." : "Bayar Sekarang"}
          {!isSubmitting ? <ArrowRight className="size-[18px]" /> : null}
        </Button>
      </div>
    </div>
  );
}
