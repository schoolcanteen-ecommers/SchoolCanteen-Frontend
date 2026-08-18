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
} from "react";

import type {
  AdminCanteenAvailability,
  AdminCanteenCategoryOption,
  AdminCanteenMerchantOption,
} from "@/lib/api/admin-canteen-menu";

interface AdminCanteenMenuFiltersProps {
  search: string;
  merchantId: string;
  categoryId: string;
  availability: AdminCanteenAvailability;
  merchants: AdminCanteenMerchantOption[];
  categories: AdminCanteenCategoryOption[];
}

export function AdminCanteenMenuFilters({
  search,
  merchantId,
  categoryId,
  availability,
  merchants,
  categories,
}: AdminCanteenMenuFiltersProps) {
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

    const formData = new FormData(
      event.currentTarget,
    );
    const value = String(
      formData.get("search") ?? "",
    ).trim();

    navigateWith({ search: value });
  }

  return (
    <section className="space-y-4 lg:rounded-t-[18px] lg:border lg:border-b-0 lg:border-[#E0E3E5] lg:bg-white lg:p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <form
          onSubmit={handleSearch}
          className="relative w-full lg:max-w-[320px]"
        >
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#536069] lg:left-3" />
          <input
            key={search}
            name="search"
            defaultValue={search}
            placeholder="Search product..."
            className="h-12 w-full rounded-xl border border-[#CBD5E1] bg-white pl-12 pr-4 text-base text-navy-steel outline-none transition focus:border-navy-steel focus:ring-2 focus:ring-arctic-blue lg:h-10 lg:rounded-lg lg:pl-10 lg:text-sm"
          />
        </form>

        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0">
          <FilterSelect
            label="Merchant"
            value={merchantId}
            active={Boolean(merchantId)}
            onChange={(value) =>
              navigateWith({
                merchant: value,
              })
            }
          >
            <option value="">
              All Merchants
            </option>
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
            label="Category"
            value={categoryId}
            active={Boolean(categoryId)}
            onChange={(value) =>
              navigateWith({
                category: value,
              })
            }
          >
            <option value="">
              All Categories
            </option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            label="Availability"
            value={availability}
            active={Boolean(availability)}
            onChange={(value) =>
              navigateWith({
                availability: value,
              })
            }
          >
            <option value="">
              All Availability
            </option>
            <option value="in_stock">
              In Stock
            </option>
            <option value="out_of_stock">
              Out of Stock
            </option>
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
  children: React.ReactNode;
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
      className={`relative shrink-0 rounded-full border lg:rounded-lg ${
        active
          ? "border-[#D4E2EC] bg-arctic-blue"
          : "border-[#CBD5E1] bg-white"
      }`}
    >
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold tracking-wide text-navy-steel lg:hidden">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        aria-label={label}
        className="h-10 min-w-[122px] appearance-none rounded-full border-0 bg-transparent pl-4 pr-9 text-xs font-bold text-transparent outline-none ring-0 lg:min-w-[130px] lg:rounded-lg lg:text-sm lg:font-normal lg:text-navy-steel"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-navy-steel" />
    </label>
  );
}
