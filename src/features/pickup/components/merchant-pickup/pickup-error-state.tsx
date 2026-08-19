import { RefreshCw, ScanLine, XCircle } from "lucide-react";

interface PickupErrorStateProps {
  message: string;
  onRetry: () => void;
  onBackToScanner: () => void;
}

export function PickupErrorState({
  message,
  onRetry,
  onBackToScanner,
}: PickupErrorStateProps) {
  return (
    <section className="mx-auto flex w-full max-w-[620px] flex-col items-center rounded-[18px] border border-[#E2E8F0] bg-white px-5 py-10 text-center shadow-[0px_10px_30px_rgba(13,27,42,0.04)] sm:px-8 sm:py-12">
      <div className="flex size-24 items-center justify-center rounded-full bg-[#FEE2E2] ring-8 ring-[#FEF2F2]">
        <XCircle className="size-12 text-[#B91C1C]" />
      </div>

      <span className="mt-7 rounded-full border border-[#FCA5A5] bg-[#FEE2E2] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#991B1B]">
        Gagal
      </span>

      <h2 className="mt-4 font-heading text-[30px] font-bold text-navy-steel sm:text-[32px]">
        Kode Tidak Valid
      </h2>
      <p className="mt-3 max-w-sm text-sm leading-6 text-[#536069] sm:text-base">
        {message}
      </p>

      <div className="mt-8 grid w-full max-w-[420px] gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="flex h-12 items-center justify-center gap-2 rounded-[10px] bg-navy-steel px-4 text-sm font-bold text-white transition hover:bg-[#172A3F]"
        >
          <RefreshCw className="size-4" />
          Coba Lagi
        </button>
        <button
          type="button"
          onClick={onBackToScanner}
          className="flex h-12 items-center justify-center gap-2 rounded-[10px] border border-[#C4C6CC] bg-white px-4 text-sm font-bold text-navy-steel transition hover:bg-[#F2F4F6]"
        >
          <ScanLine className="size-4" />
          Kembali ke Scanner
        </button>
      </div>
    </section>
  );
}
