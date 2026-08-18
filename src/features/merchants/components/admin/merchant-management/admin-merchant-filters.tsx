"use client";

import {
  Search,
} from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  useState,
} from "react";
import type {
  FormEvent,
} from "react";

interface MerchantFilterValues {
  search: string;
  type: string;
  status: string;
}

export function AdminMerchantMobileSearch({
  search,
}: Pick<MerchantFilterValues, "search">) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] =
    useState(search);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const params =
      new URLSearchParams(
        searchParams.toString(),
      );

    const normalized = value.trim();

    if (normalized) {
      params.set("search", normalized);
    } else {
      params.delete("search");
    }

    params.delete("page");
    navigate(
      router,
      pathname,
      params,
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative md:hidden"
    >
      <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#66737C]" />
      <input
        type="search"
        value={value}
        onChange={(event) =>
          setValue(event.target.value)
        }
        placeholder="Search merchant..."
        className="h-[54px] w-full rounded-[28px] border border-[#E4E8EB] bg-white pl-12 pr-5 text-sm text-navy-steel shadow-[0_8px_24px_rgba(13,27,42,0.035)] outline-none transition placeholder:text-[#66737C] focus:border-navy-steel focus:ring-2 focus:ring-navy-steel/10"
      />
    </form>
  );
}

export function AdminMerchantFilters({
  search,
  type,
  status,
}: MerchantFilterValues) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] =
    useState(search);

  function updateFilter(
    key: "type" | "status",
    value: string,
  ) {
    const params =
      new URLSearchParams(
        searchParams.toString(),
      );

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.delete("page");
    navigate(
      router,
      pathname,
      params,
    );
  }

  function submitDesktopSearch(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const params =
      new URLSearchParams(
        searchParams.toString(),
      );
    const normalized =
      searchValue.trim();

    if (normalized) {
      params.set("search", normalized);
    } else {
      params.delete("search");
    }

    params.delete("page");
    navigate(
      router,
      pathname,
      params,
    );
  }

  return (
    <section>
      <div className="hidden items-center justify-between gap-5 md:flex">
        <form
          onSubmit={submitDesktopSearch}
          className="relative w-full max-w-[480px]"
        >
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#66737C]" />
          <input
            type="search"
            value={searchValue}
            onChange={(event) =>
              setSearchValue(
                event.target.value,
              )
            }
            placeholder="Search merchant..."
            className="h-12 w-full rounded-xl border border-[#D6DCE1] bg-white pl-12 pr-4 text-sm text-navy-steel shadow-[0_6px_18px_rgba(13,27,42,0.025)] outline-none transition placeholder:text-[#66737C] focus:border-navy-steel focus:ring-2 focus:ring-navy-steel/10"
          />
        </form>

        <div className="flex shrink-0 items-center gap-3">
          <select
            value={type}
            onChange={(event) =>
              updateFilter(
                "type",
                event.target.value,
              )
            }
            aria-label="Filter merchant type"
            className="h-12 min-w-[150px] rounded-xl border border-[#D6DCE1] bg-white px-4 text-sm font-medium text-navy-steel shadow-[0_6px_18px_rgba(13,27,42,0.025)] outline-none transition focus:border-navy-steel focus:ring-2 focus:ring-navy-steel/10"
          >
            <option value="">
              All Types
            </option>
            <option value="canteen">
              Canteen
            </option>
            <option value="cooperative">
              Cooperative
            </option>
          </select>

          <select
            value={status}
            onChange={(event) =>
              updateFilter(
                "status",
                event.target.value,
              )
            }
            aria-label="Filter merchant status"
            className="h-12 min-w-[150px] rounded-xl border border-[#D6DCE1] bg-white px-4 text-sm font-medium text-navy-steel shadow-[0_6px_18px_rgba(13,27,42,0.025)] outline-none transition focus:border-navy-steel focus:ring-2 focus:ring-navy-steel/10"
          >
            <option value="">
              All Status
            </option>
            <option value="active">
              Active
            </option>
            <option value="inactive">
              Inactive
            </option>
          </select>
        </div>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 pb-1 md:hidden">
        <div className="flex min-w-max items-center gap-2">
          <FilterChip
            label="All Types"
            active={!type}
            onClick={() =>
              updateFilter("type", "")
            }
          />
          <FilterChip
            label="Canteen"
            active={type === "canteen"}
            onClick={() =>
              updateFilter(
                "type",
                "canteen",
              )
            }
          />
          <FilterChip
            label="Cooperative"
            active={
              type === "cooperative"
            }
            onClick={() =>
              updateFilter(
                "type",
                "cooperative",
              )
            }
          />

          <span className="mx-1 h-7 w-px bg-[#E1E5E8]" />

          <FilterChip
            label="All Status"
            active={!status}
            onClick={() =>
              updateFilter(
                "status",
                "",
              )
            }
          />
          <FilterChip
            label="Active"
            active={status === "active"}
            onClick={() =>
              updateFilter(
                "status",
                "active",
              )
            }
          />
          <FilterChip
            label="Inactive"
            active={
              status === "inactive"
            }
            onClick={() =>
              updateFilter(
                "status",
                "inactive",
              )
            }
          />
        </div>
      </div>
    </section>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-10 rounded-full border px-5 text-xs font-bold transition ${
        active
          ? "border-navy-steel bg-navy-steel text-white"
          : "border-[#E1E5E8] bg-white text-[#66737C] hover:border-navy-steel hover:text-navy-steel"
      }`}
    >
      {label}
    </button>
  );
}

function navigate(
  router: ReturnType<typeof useRouter>,
  pathname: string,
  params: URLSearchParams,
) {
  const query = params.toString();

  router.push(
    query
      ? `${pathname}?${query}`
      : pathname,
  );
}
