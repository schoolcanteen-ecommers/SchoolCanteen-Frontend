import {
  Filter,
  Search,
} from "lucide-react";

import type {
  AdminTransactionStatus,
  AdminTransactionType,
} from "@/lib/api/admin-transaction-shared";

interface AdminTransactionFiltersProps {
  search: string;
  datePreset: string;
  type: AdminTransactionType | undefined;
  status: AdminTransactionStatus | undefined;
}

export function AdminTransactionFilters({
  search,
  datePreset,
  type,
  status,
}: AdminTransactionFiltersProps) {
  const hasFilters = Boolean(
    search ||
      datePreset ||
      type ||
      status,
  );

  return (
    <section>
      <form
        action="/admin/transactions"
        method="get"
        className="hidden rounded-[20px] border border-[#E5E9EC] bg-white p-6 shadow-[0_12px_32px_rgba(13,27,42,0.04)] lg:flex lg:items-center lg:justify-between lg:gap-4"
      >
        <SearchInput
          search={search}
          className="max-w-[390px]"
        />

        <div className="flex items-center gap-3">
          <FilterSelect
            name="date"
            ariaLabel="Filter tanggal"
            defaultValue={datePreset}
            options={[
              ["", "Date: All Time"],
              ["today", "Today"],
              ["7days", "Last 7 Days"],
            ]}
          />

          <FilterSelect
            name="type"
            ariaLabel="Filter jenis transaksi"
            defaultValue={type ?? ""}
            options={[
              ["", "Type: All"],
              ["PAYMENT", "Payment"],
              ["TOP_UP", "Top Up"],
              ["ADJUSTMENT", "Adjustment"],
            ]}
          />

          <FilterSelect
            name="status"
            ariaLabel="Filter status transaksi"
            defaultValue={status ?? ""}
            options={[
              ["", "Status: All"],
              ["COMPLETED", "Completed"],
              ["PENDING", "Pending"],
              ["FAILED", "Failed"],
            ]}
          />

          <button
            type="submit"
            className="inline-flex size-11 items-center justify-center rounded-xl bg-navy-steel text-white transition hover:opacity-90"
            aria-label="Terapkan filter"
          >
            <Filter className="size-4" />
          </button>

          {hasFilters ? (
            <a
              href="/admin/transactions"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-[#D6DCE1] px-4 text-sm font-medium text-[#536069] transition hover:bg-[#F2F4F6] hover:text-navy-steel"
            >
              Reset
            </a>
          ) : null}
        </div>
      </form>

      <form
        action="/admin/transactions"
        method="get"
        className="space-y-4 lg:hidden"
      >
        <div className="flex gap-2">
          <SearchInput
            search={search}
            className="min-w-0 flex-1"
            placeholder="Search student..."
          />

          <button
            type="submit"
            className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl border border-[#D6DCE1] bg-white text-navy-steel shadow-[0_8px_24px_rgba(13,27,42,0.03)]"
            aria-label="Terapkan pencarian dan filter"
          >
            <Filter className="size-5" />
          </button>
        </div>

        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6">
          <a
            href="/admin/transactions"
            className={`inline-flex h-10 shrink-0 items-center rounded-full px-4 text-sm font-bold transition ${
              hasFilters
                ? "border border-[#D6DCE1] bg-white text-[#536069]"
                : "bg-arctic-blue text-navy-steel"
            }`}
          >
            All
          </a>

          <MobileSelect
            name="date"
            ariaLabel="Filter tanggal"
            defaultValue={datePreset}
            label="Date"
            options={[
              ["", "All Time"],
              ["today", "Today"],
              ["7days", "Last 7 Days"],
            ]}
          />

          <MobileSelect
            name="type"
            ariaLabel="Filter jenis transaksi"
            defaultValue={type ?? ""}
            label="Type"
            options={[
              ["", "All Types"],
              ["PAYMENT", "Payment"],
              ["TOP_UP", "Top Up"],
              ["ADJUSTMENT", "Adjustment"],
            ]}
          />

          <MobileSelect
            name="status"
            ariaLabel="Filter status transaksi"
            defaultValue={status ?? ""}
            label="Status"
            options={[
              ["", "All Status"],
              ["COMPLETED", "Completed"],
              ["PENDING", "Pending"],
              ["FAILED", "Failed"],
            ]}
          />
        </div>
      </form>
    </section>
  );
}

function SearchInput({
  search,
  className,
  placeholder = "Search transaction by student...",
}: {
  search: string;
  className?: string;
  placeholder?: string;
}) {
  return (
    <div
      className={`relative w-full ${className ?? ""}`}
    >
      <Search className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-[#74777D]" />
      <input
        type="search"
        name="search"
        defaultValue={search}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-[#D6DCE1] bg-white pl-11 pr-4 text-sm text-navy-steel outline-none transition placeholder:text-[#74777D] focus:border-navy-steel focus:ring-2 focus:ring-navy-steel/10"
      />
    </div>
  );
}

function FilterSelect({
  name,
  ariaLabel,
  defaultValue,
  options,
}: {
  name: string;
  ariaLabel: string;
  defaultValue: string;
  options: Array<[string, string]>;
}) {
  return (
    <select
      name={name}
      aria-label={ariaLabel}
      defaultValue={defaultValue}
      className="h-11 rounded-xl border border-[#D6DCE1] bg-white px-3 text-sm text-[#536069] outline-none transition focus:border-navy-steel focus:ring-2 focus:ring-navy-steel/10"
    >
      {options.map(
        ([value, label]) => (
          <option
            key={value || "all"}
            value={value}
          >
            {label}
          </option>
        ),
      )}
    </select>
  );
}

function MobileSelect({
  name,
  ariaLabel,
  defaultValue,
  label,
  options,
}: {
  name: string;
  ariaLabel: string;
  defaultValue: string;
  label: string;
  options: Array<[string, string]>;
}) {
  return (
    <label className="relative shrink-0">
      <span className="sr-only">
        {ariaLabel}
      </span>
      <select
        name={name}
        aria-label={ariaLabel}
        defaultValue={defaultValue}
        className="h-10 max-w-[150px] appearance-none rounded-full border border-[#D6DCE1] bg-white py-0 pl-4 pr-8 text-sm font-medium text-[#536069] outline-none"
      >
        {options.map(
          ([value, optionLabel]) => (
            <option
              key={value || "all"}
              value={value}
            >
              {value
                ? optionLabel
                : label}
            </option>
          ),
        )}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#536069]">
        ▾
      </span>
    </label>
  );
}
