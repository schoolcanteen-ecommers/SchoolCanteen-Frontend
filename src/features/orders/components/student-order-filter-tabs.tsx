import {
  cn,
} from "@/lib/utils";

export type StudentOrderFilter =
  | "ALL"
  | "PROCESSING"
  | "READY"
  | "COMPLETED"
  | "CANCELLED";

interface StudentOrderFilterTabsProps {
  value: StudentOrderFilter;
  onChange: (
    value: StudentOrderFilter,
  ) => void;
}

const filters: Array<{
  value: StudentOrderFilter;
  label: string;
}> = [
  {
    value: "ALL",
    label: "Semua",
  },
  {
    value: "PROCESSING",
    label: "Diproses",
  },
  {
    value: "READY",
    label: "Siap Diambil",
  },
  {
    value: "COMPLETED",
    label: "Selesai",
  },
  {
    value: "CANCELLED",
    label: "Dibatalkan",
  },
];

export function StudentOrderFilterTabs({
  value,
  onChange,
}: StudentOrderFilterTabsProps) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
      <div className="flex min-w-max items-center gap-2.5 lg:gap-3">
        {filters.map((filter) => {
          const isActive =
            value === filter.value;

          return (
            <button
              key={filter.value}
              type="button"
              onClick={() =>
                onChange(filter.value)
              }
              className={cn(
                "min-h-10 whitespace-nowrap rounded-full border px-5 py-2 text-sm font-semibold transition-all lg:min-w-[112px] lg:px-6",
                isActive
                  ? "border-navy-steel bg-navy-steel text-white shadow-[0_4px_12px_rgba(13,27,42,0.14)]"
                  : "border-transparent bg-arctic-blue text-navy-steel hover:border-[#C4C6CC] lg:border-[#C4C6CC] lg:bg-white",
              )}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
