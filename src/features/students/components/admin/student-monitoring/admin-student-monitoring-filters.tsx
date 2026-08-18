import {
  Filter,
  Search,
} from "lucide-react";

interface AdminStudentMonitoringFiltersProps {
  search: string;
  className: string;
  major: string;
}

export function AdminStudentMonitoringFilters({
  search,
  className,
  major,
}: AdminStudentMonitoringFiltersProps) {
  const hasFilters = Boolean(
    search || className || major,
  );

  return (
    <form
      action="/admin/students"
      method="get"
      className="rounded-[20px] border border-[#E5E9EC] bg-white p-4 shadow-[0_12px_32px_rgba(13,27,42,0.04)] md:flex md:items-center md:gap-3 md:p-6"
    >
      <div className="relative min-w-0 flex-1">
        <Search className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-[#74777D]" />
        <input
          type="search"
          name="search"
          defaultValue={search}
          placeholder="Search student..."
          className="h-12 w-full rounded-xl border border-[#D6DCE1] bg-[#F9FAFB] pl-11 pr-4 text-sm text-navy-steel outline-none transition focus:border-navy-steel focus:ring-2 focus:ring-navy-steel/10"
        />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 md:mt-0 md:w-[360px]">
        <input
          type="text"
          name="class"
          defaultValue={className}
          placeholder="Kelas"
          aria-label="Filter kelas"
          className="h-11 min-w-0 rounded-xl border border-[#D6DCE1] bg-[#F9FAFB] px-3 text-sm text-navy-steel outline-none transition placeholder:text-[#74777D] focus:border-navy-steel focus:ring-2 focus:ring-navy-steel/10"
        />

        <input
          type="text"
          name="major"
          defaultValue={major}
          placeholder="Jurusan"
          aria-label="Filter jurusan"
          className="h-11 min-w-0 rounded-xl border border-[#D6DCE1] bg-[#F9FAFB] px-3 text-sm text-navy-steel outline-none transition placeholder:text-[#74777D] focus:border-navy-steel focus:ring-2 focus:ring-navy-steel/10"
        />
      </div>

      <div className="mt-3 flex gap-2 md:mt-0">
        <button
          type="submit"
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-navy-steel px-4 text-sm font-bold text-white transition hover:opacity-90 md:flex-none"
        >
          <Filter className="size-4" />
          Terapkan
        </button>

        {hasFilters ? (
          <a
            href="/admin/students"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-[#D6DCE1] px-4 text-sm font-medium text-[#536069] transition hover:bg-[#F2F4F6] hover:text-navy-steel"
          >
            Reset
          </a>
        ) : null}
      </div>
    </form>
  );
}
