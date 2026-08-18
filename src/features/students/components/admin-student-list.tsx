import type {
  ReactNode,
} from "react";
import Link from "next/link";
import {
  CircleSlash2,
  WalletCards,
} from "lucide-react";

import {
  EmptyState,
} from "@/components/shared/empty-state";

import type {
  AdminStudentData,
} from "@/lib/api/admin-students";

interface AdminStudentListProps {
  students: AdminStudentData[];
  page: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  search: string;
  className: string;
  major: string;
}

export function AdminStudentList({
  students,
  page,
  hasPreviousPage,
  hasNextPage,
  search,
  className,
  major,
}: AdminStudentListProps) {
  if (students.length === 0) {
    return (
      <EmptyState
        icon={CircleSlash2}
        title="Siswa tidak ditemukan"
        description="Tidak ada siswa yang sesuai dengan pencarian atau filter saat ini."
      />
    );
  }

  return (
    <section className="space-y-4">
      <div className="hidden overflow-hidden rounded-[20px] border border-[#E5E9EC] bg-white shadow-[0_12px_32px_rgba(13,27,42,0.04)] lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#E4E9ED] bg-arctic-blue/50">
                <TableHead>Student</TableHead>
                <TableHead>NIS</TableHead>
                <TableHead>Class</TableHead>
                <TableHead align="right">
                  Wallet Balance
                </TableHead>
                <TableHead align="center">
                  Total Orders
                </TableHead>
                <TableHead align="center">
                  Wallet Status
                </TableHead>
                <TableHead>Joined</TableHead>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#EDF0F2]">
              {students.map(
                (student) => (
                  <tr
                    key={student.id}
                    className="transition hover:bg-arctic-blue/20"
                  >
                    <td className="px-6 py-4">
                      <StudentIdentity
                        student={student}
                      />
                    </td>

                    <td className="px-6 py-4 text-sm text-[#536069]">
                      {student.nis ??
                        "Belum diisi"}
                    </td>

                    <td className="px-6 py-4 text-sm text-navy-steel">
                      {student.className ??
                        "Belum diisi"}
                    </td>

                    <td className="px-6 py-4 text-right text-sm font-medium text-navy-steel">
                      {formatWalletBalance(
                        student.walletBalance,
                      )}
                    </td>

                    <td className="px-6 py-4 text-center text-sm text-navy-steel">
                      {student.ordersCount.toLocaleString(
                        "id-ID",
                      )}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <WalletStatusBadge
                        status={
                          student.walletIsActive
                        }
                      />
                    </td>

                    <td className="px-6 py-4 text-sm text-[#536069]">
                      {formatJoinedDate(
                        student.createdAt,
                      )}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4 lg:hidden">
        {students.map(
          (student) => (
            <article
              key={student.id}
              className="rounded-[24px] border border-[#E7EBEE] bg-white p-4 shadow-[0_12px_32px_rgba(13,27,42,0.04)]"
            >
              <div className="flex items-start gap-3">
                <StudentAvatar
                  student={student}
                  size="large"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-navy-steel">
                        {student.name}
                      </p>
                      <p className="mt-1 text-[11px] text-[#74777D]">
                        NIS: {student.nis ?? "Belum diisi"}
                        <span className="px-1.5">•</span>
                        {student.className ??
                          "Kelas belum diisi"}
                      </p>
                    </div>

                    <WalletStatusBadge
                      status={
                        student.walletIsActive
                      }
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#74777D]">
                        Wallet Balance
                      </p>
                      <p className="mt-1 text-sm font-bold text-navy-steel">
                        {formatWalletBalance(
                          student.walletBalance,
                        )}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#74777D]">
                        Orders
                      </p>
                      <p className="mt-1 text-sm font-bold text-navy-steel">
                        {student.ordersCount.toLocaleString(
                          "id-ID",
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-[#EDF0F2] pt-3">
                    <p className="text-xs text-[#536069]">
                      <span className="font-medium text-navy-steel">
                        Jurusan:
                      </span>{" "}
                      {student.major ??
                        "Belum diisi"}
                    </p>
                    <p className="mt-1 text-xs text-[#536069]">
                      Bergabung {formatJoinedDate(student.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ),
        )}
      </div>

      <StudentPagination
        page={page}
        hasPreviousPage={
          hasPreviousPage
        }
        hasNextPage={hasNextPage}
        search={search}
        className={className}
        major={major}
      />
    </section>
  );
}

interface TableHeadProps {
  children: ReactNode;
  align?: "left" | "center" | "right";
}

function TableHead({
  children,
  align = "left",
}: TableHeadProps) {
  const alignClass =
    align === "right"
      ? "text-right"
      : align === "center"
        ? "text-center"
        : "text-left";

  return (
    <th
      className={`whitespace-nowrap px-6 py-4 text-sm font-medium text-navy-steel ${alignClass}`}
    >
      {children}
    </th>
  );
}

function StudentIdentity({
  student,
}: {
  student: AdminStudentData;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <StudentAvatar
        student={student}
      />

      <div className="min-w-0">
        <p className="max-w-[180px] truncate text-sm font-medium text-navy-steel">
          {student.name}
        </p>
        <p className="mt-0.5 max-w-[180px] truncate text-xs text-[#74777D]">
          {student.major ??
            "Jurusan belum diisi"}
        </p>
      </div>
    </div>
  );
}

function StudentAvatar({
  student,
  size = "default",
}: {
  student: AdminStudentData;
  size?: "default" | "large";
}) {
  const initials =
    student.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

  const sizeClass =
    size === "large"
      ? "size-14"
      : "size-10";

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#E0E5E9] bg-arctic-blue text-sm font-bold text-navy-steel ${sizeClass}`}
    >
      {student.avatarUrl ? (
        <img
          src={student.avatarUrl}
          alt={`${student.name} avatar`}
          className="size-full object-cover"
        />
      ) : (
        initials || "S"
      )}
    </div>
  );
}

function WalletStatusBadge({
  status,
}: {
  status: boolean | null;
}) {
  if (status === null) {
    return (
      <span className="inline-flex whitespace-nowrap rounded-full bg-[#F2F4F6] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#66737C]">
        Belum tersedia
      </span>
    );
  }

  if (status) {
    return (
      <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-[#E6F4EA] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#137333]">
        <span className="size-1.5 rounded-full bg-[#137333]" />
        Aktif
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-[#ECEEF0] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#66737C]">
      <span className="size-1.5 rounded-full bg-[#74777D]" />
      Nonaktif
    </span>
  );
}

interface StudentPaginationProps {
  page: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  search: string;
  className: string;
  major: string;
}

function StudentPagination({
  page,
  hasPreviousPage,
  hasNextPage,
  search,
  className,
  major,
}: StudentPaginationProps) {
  return (
    <div className="flex items-center justify-between rounded-[18px] border border-[#E5E9EC] bg-white p-3 shadow-[0_8px_24px_rgba(13,27,42,0.03)] lg:rounded-none lg:border-x-0 lg:border-b-0 lg:bg-transparent lg:p-4 lg:shadow-none">
      {hasPreviousPage ? (
        <Link
          href={buildPageHref({
            page: page - 1,
            search,
            className,
            major,
          })}
          className="rounded-xl border border-[#D6DCE1] px-4 py-2 text-sm font-bold text-navy-steel transition hover:bg-[#F2F4F6]"
        >
          Previous
        </Link>
      ) : (
        <span className="cursor-not-allowed rounded-xl border border-[#E5E9EC] px-4 py-2 text-sm font-bold text-[#B3BAC0]">
          Previous
        </span>
      )}

      <span className="text-sm font-medium text-[#536069]">
        Halaman {page}
      </span>

      {hasNextPage ? (
        <Link
          href={buildPageHref({
            page: page + 1,
            search,
            className,
            major,
          })}
          className="rounded-xl border border-[#D6DCE1] px-4 py-2 text-sm font-bold text-navy-steel transition hover:bg-[#F2F4F6]"
        >
          Next
        </Link>
      ) : (
        <span className="cursor-not-allowed rounded-xl border border-[#E5E9EC] px-4 py-2 text-sm font-bold text-[#B3BAC0]">
          Next
        </span>
      )}
    </div>
  );
}

function buildPageHref({
  page,
  search,
  className,
  major,
}: {
  page: number;
  search: string;
  className: string;
  major: string;
}): string {
  const params =
    new URLSearchParams();

  if (page > 1) {
    params.set("page", String(page));
  }

  if (search) {
    params.set("search", search);
  }

  if (className) {
    params.set("class", className);
  }

  if (major) {
    params.set("major", major);
  }

  const query =
    params.toString();

  return query
    ? `/admin/students?${query}`
    : "/admin/students";
}

function formatWalletBalance(
  balance: number | null,
): string {
  if (balance === null) {
    return "Belum tersedia";
  }

  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    },
  ).format(balance);
}

function formatJoinedDate(
  value: string | null,
): string {
  if (!value) {
    return "Belum tersedia";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Belum tersedia";
  }

  return new Intl.DateTimeFormat(
    "id-ID",
    {
      month: "long",
      year: "numeric",
    },
  ).format(date);
}
