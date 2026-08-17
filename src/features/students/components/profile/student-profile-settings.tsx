import {
  ChevronRight,
  LockKeyhole,
} from "lucide-react";

export function StudentProfileSettings() {
  return (
    <section className="rounded-[24px] border border-white/50 bg-white p-2 shadow-[0_12px_32px_rgba(13,27,42,0.04)] lg:rounded-[18px] lg:border-[#0D1B2A]/[0.08] lg:p-6 lg:shadow-none">
      <h2 className="px-4 pb-3 pt-4 font-heading text-2xl font-semibold text-navy-steel lg:border-b lg:border-[#E0E3E5] lg:px-0 lg:pb-5 lg:pt-0 lg:font-sans lg:text-base lg:font-semibold">
        <span className="lg:hidden">
          Pengaturan
        </span>
        <span className="hidden lg:inline">
          Pengaturan Akun
        </span>
      </h2>

      <button
        type="button"
        disabled
        title="Ubah password belum tersedia"
        className="flex w-full cursor-not-allowed items-center justify-between rounded-xl p-4 text-left lg:mt-4 lg:p-3"
      >
        <span className="flex items-center gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#F2F4F6] text-navy-steel lg:bg-[#E6F4FF]">
            <LockKeyhole className="size-5" />
          </span>

          <span>
            <span className="block text-base font-medium text-navy-steel">
              Ubah Password
            </span>
            <span className="mt-1 hidden text-xs text-[#536069] lg:block">
              Kelola keamanan dan kata sandi akun.
            </span>
          </span>
        </span>

        <ChevronRight className="size-5 text-[#536069]" />
      </button>
    </section>
  );
}
