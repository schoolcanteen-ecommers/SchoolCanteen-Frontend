"use client";

import {
  ChevronDown,
  Search,
} from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import type {
  FormEvent,
  ReactNode,
} from "react";

import type {
  AdminProductionMerchantOption,
  AdminProductionPickupSlotOption,
  AdminProductionStatus,
} from "@/lib/api/admin-canteen-production";

interface AdminProductionFiltersProps {
  search: string;
  merchantId: string;
  pickupSlotId: string;
  status: AdminProductionStatus | "";
  merchants: AdminProductionMerchantOption[];
  pickupSlots: AdminProductionPickupSlotOption[];
}

export function AdminProductionFilters({
  search,
  merchantId,
  pickupSlotId,
  status,
  merchants,
  pickupSlots,
}: AdminProductionFiltersProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  function navigateWith(
    updates: Record<string, string>,
  ) {
    const params = new URLSearchParams(
      searchParams.toString(),
    );

    for (const [key, value] of Object.entries(
      updates,
    )) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }

    params.delete("page");

    const query = params.toString();

    router.push(
      query ? `${pathname}?${query}` : pathname,
    );
  }

  function handleSearch(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const value = String(
      data.get("search") ?? "",
    ).trim();

    navigateWith({ search: value });
  }

  const filteredPickupSlots = merchantId
    ? pickupSlots.filter(
        (slot) =>
          slot.merchantId === merchantId,
      )
    : pickupSlots;

  return (
    <section className="space-y-3 md:rounded-t-[18px] md:border md:border-b-0 md:border-[#E0E3E5] md:bg-white md:p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <form
          onSubmit={handleSearch}
          className="relative w-full md:max-w-[320px]"
        >
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#74777D]" />
          <input
            key={search}
            name="search"
            defaultValue={search}
            placeholder="Search production..."
            className="h-12 w-full rounded-xl border border-[#CBD5E1] bg-white pl-12 pr-4 text-base text-navy-steel outline-none transition focus:border-navy-steel focus:ring-2 focus:ring-arctic-blue md:h-10 md:text-sm"
          />
        </form>

        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:overflow-visible md:px-0 md:pb-0">
          <button
            type="button"
            onClick={() =>
              navigateWith({
                merchant: "",
                pickup: "",
                status: "",
              })
            }
            className={`h-10 shrink-0 rounded-full px-4 text-xs font-bold md:hidden ${
              !merchantId && !pickupSlotId && !status
                ? "bg-navy-steel text-white"
                : "border border-[#CBD5E1] bg-white text-[#536069]"
            }`}
          >
            All
          </button>

          <FilterSelect
            label="Merchant"
            value={merchantId}
            active={Boolean(merchantId)}
            onChange={(value) =>
              navigateWith({
                merchant: value,
                pickup: "",
              })
            }
          >
            <option value="">All Merchants</option>
            {merchants.map((merchant) => (
              <option
                key={merchant.id}
                value={merchant.id}
              >
                {merchant.name}
                {!merchant.isActive
                  ? " (Inactive)"
                  : ""}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            label="Pickup Slot"
            value={pickupSlotId}
            active={Boolean(pickupSlotId)}
            onChange={(value) =>
              navigateWith({ pickup: value })
            }
          >
            <option value="">All Pickup Slots</option>
            {filteredPickupSlots.map((slot) => (
              <option
                key={slot.id}
                value={slot.id}
              >
                {slot.merchantName} · {formatTimeRange(
                  slot.startAt,
                  slot.endAt,
                )}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            label="Status"
            value={status}
            active={Boolean(status)}
            onChange={(value) =>
              navigateWith({ status: value })
            }
          >
            <option value="">All Status</option>
            <option value="CONFIRMED">
              Confirmed
            </option>
            <option value="PREPARING">
              Preparing
            </option>
            <option value="READY">Ready</option>
          </FilterSelect>
        </div>
      </div>
    </section>
  );
}

interface FilterSelectProps {
  label: string;
  value: string;
  active: boolean;
  onChange: (value: string) => void;
  children: ReactNode;
}

function FilterSelect({
  label,
  value,
  active,
  onChange,
  children,
}: FilterSelectProps) {
  return (
    <label
      className={`relative h-10 shrink-0 rounded-full border md:rounded-xl ${
        active
          ? "border-[#D4E2EC] bg-arctic-blue"
          : "border-[#CBD5E1] bg-white"
      }`}
    >
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-navy-steel md:hidden">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        aria-label={label}
        className="h-full min-w-[130px] appearance-none rounded-full border-0 bg-transparent pl-4 pr-9 text-xs font-bold text-transparent outline-none ring-0 md:min-w-[150px] md:rounded-xl md:text-sm md:font-normal md:text-navy-steel"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-navy-steel" />
    </label>
  );
}

function formatTimeRange(
  startAt: string,
  endAt: string,
): string {
  return `${formatTime(startAt)}–${formatTime(endAt)}`;
}

function formatTime(value: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  })
    .format(new Date(value))
    .replace(".", ":");
}
