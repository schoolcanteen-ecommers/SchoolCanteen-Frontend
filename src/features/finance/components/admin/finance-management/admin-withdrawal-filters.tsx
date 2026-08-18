"use client";

import { Filter, Store } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type {
  AdminFinanceMerchantOption,
  AdminWithdrawalStatusFilter,
} from "@/lib/api/admin-finance";

interface Props {
  merchants: AdminFinanceMerchantOption[];
  merchantId: string;
  status: AdminWithdrawalStatusFilter | "";
}

export function AdminWithdrawalFilters({ merchants, merchantId, status }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateFilter(key: "merchant" | "status", value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <div className="grid grid-cols-2 gap-2 pb-4 xl:grid-cols-[minmax(220px,1fr)_200px] xl:border-b xl:border-[#E2E7EB] xl:bg-white xl:p-5">
      <label className="relative block">
        <Store className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#67747D]" />
        <select
          aria-label="Filter merchant withdrawal"
          value={merchantId}
          onChange={(event) => updateFilter("merchant", event.target.value)}
          className="h-11 w-full appearance-none rounded-xl border border-[#DDE3E7] bg-white pl-9 pr-7 text-xs text-navy-steel shadow-[0_6px_18px_rgba(13,27,42,0.025)] outline-none transition focus:border-navy-steel focus:ring-2 focus:ring-navy-steel/10 sm:text-sm"
        >
          <option value="">Semua merchant</option>
          {merchants.map((merchant) => (
            <option key={merchant.id} value={merchant.id}>
              {merchant.name}
            </option>
          ))}
        </select>
      </label>

      <label className="relative block">
        <Filter className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#67747D]" />
        <select
          aria-label="Filter status withdrawal"
          value={status}
          onChange={(event) => updateFilter("status", event.target.value)}
          className="h-11 w-full appearance-none rounded-xl border border-[#DDE3E7] bg-white pl-9 pr-7 text-xs text-navy-steel shadow-[0_6px_18px_rgba(13,27,42,0.025)] outline-none transition focus:border-navy-steel focus:ring-2 focus:ring-navy-steel/10 sm:text-sm"
        >
          <option value="">Semua status</option>
          <option value="waiting">Waiting Approval</option>
          <option value="approved">Approved</option>
          <option value="processed">Processed</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
        </select>
      </label>
    </div>
  );
}
