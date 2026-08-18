import {
  CheckCircle2,
  Shapes,
  Store,
} from "lucide-react";

import type {
  AdminMerchantMonitoringStats,
} from "@/lib/api/admin-merchant-monitoring";

interface AdminMerchantOverviewProps {
  stats: AdminMerchantMonitoringStats;
}

export function AdminMerchantOverview({
  stats,
}: AdminMerchantOverviewProps) {
  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
      <article className="col-span-2 flex items-center justify-between rounded-[20px] border border-[#E5E9EC] bg-white p-5 shadow-[0_12px_32px_rgba(13,27,42,0.04)] md:col-span-1 md:justify-start md:gap-4 md:p-6">
        <div className="order-2 flex size-12 shrink-0 items-center justify-center rounded-2xl bg-arctic-blue text-navy-steel md:order-1 md:rounded-full">
          <Store className="size-5" />
        </div>

        <div className="order-1 md:order-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#74777D] md:text-sm md:font-medium md:normal-case md:tracking-normal md:text-[#536069]">
            Total Merchants
          </p>
          <p className="mt-1 font-heading text-[28px] font-bold leading-none text-navy-steel md:text-[26px]">
            {stats.totalMerchants.toLocaleString(
              "id-ID",
            )}
          </p>
        </div>
      </article>

      <article className="rounded-[20px] border border-[#E5E9EC] bg-white p-4 shadow-[0_12px_32px_rgba(13,27,42,0.04)] md:flex md:items-center md:gap-4 md:p-6">
        <div className="hidden size-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5E9] text-[#2E7D32] md:flex">
          <CheckCircle2 className="size-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#74777D] md:text-sm md:font-medium md:normal-case md:tracking-normal md:text-[#536069]">
            Active Merchants
          </p>

          <div className="mt-2 flex items-end justify-between md:mt-1">
            <p className="font-heading text-[24px] font-bold leading-none text-navy-steel md:text-[26px]">
              {stats.activeMerchants.toLocaleString(
                "id-ID",
              )}
            </p>
            <CheckCircle2 className="size-5 text-[#34A853] md:hidden" />
          </div>
        </div>
      </article>

      <article className="rounded-[20px] border border-[#E5E9EC] bg-white p-4 shadow-[0_12px_32px_rgba(13,27,42,0.04)] md:flex md:items-center md:gap-4 md:p-6">
        <div className="hidden size-12 shrink-0 items-center justify-center rounded-full bg-arctic-blue text-navy-steel md:flex">
          <Shapes className="size-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#74777D] md:text-sm md:font-medium md:normal-case md:tracking-normal md:text-[#536069]">
            Types
          </p>

          <div className="mt-2 flex items-end justify-between gap-2 md:mt-1">
            <p className="text-sm font-semibold leading-tight text-navy-steel md:text-[15px]">
              <span className="md:hidden">
                {stats.canteenMerchants} Can /{" "}
                {stats.cooperativeMerchants} Coop
              </span>
              <span className="hidden md:inline">
                {stats.canteenMerchants} Canteen /{" "}
                {stats.cooperativeMerchants} Cooperative
              </span>
            </p>
            <Shapes className="size-5 shrink-0 text-[#536069] md:hidden" />
          </div>
        </div>
      </article>
    </section>
  );
}
