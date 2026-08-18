import {
  authenticatedServerApiRequest,
} from "@/lib/api/authenticated-server";

interface ApiAdminStudent {
  id: string;

  name: string;
  phone: string | null;
  avatar_url: string | null;

  student_profile: {
    nis: string | null;
    class: string | null;
    major: string | null;
  } | null;

  wallet: {
    balance: number;
    is_active: boolean;
    updated_at: string | null;
  } | null;

  orders_count: number;

  created_at: string | null;
  updated_at: string | null;
}

export interface AdminStudentData {
  id: string;
  name: string;
  phone: string | null;
  avatarUrl: string | null;

  nis: string | null;
  className: string | null;
  major: string | null;

  walletBalance: number | null;
  walletIsActive: boolean | null;

  ordersCount: number;
  createdAt: string | null;
}

export interface AdminStudentFilters {
  page?: number;
  search?: string;
  className?: string;
  major?: string;
}

export interface AdminStudentsPageData {
  students: AdminStudentData[];
  page: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface AdminStudentMonitoringStats {
  activeWallets: number;
}

const ADMIN_STUDENT_PAGE_SIZE = 20;

function mapAdminStudent(
  student: ApiAdminStudent,
): AdminStudentData {
  return {
    id: student.id,
    name: student.name,
    phone: student.phone,
    avatarUrl: student.avatar_url,

    nis:
      student.student_profile?.nis ??
      null,
    className:
      student.student_profile?.class ??
      null,
    major:
      student.student_profile?.major ??
      null,

    walletBalance:
      student.wallet?.balance ?? null,
    walletIsActive:
      student.wallet?.is_active ?? null,

    ordersCount:
      student.orders_count,
    createdAt:
      student.created_at,
  };
}

function buildAdminStudentQuery({
  page = 1,
  search,
  className,
  major,
}: AdminStudentFilters): string {
  const params =
    new URLSearchParams();

  params.set(
    "page",
    String(Math.max(1, page)),
  );

  if (search?.trim()) {
    params.set(
      "search",
      search.trim(),
    );
  }

  if (className?.trim()) {
    params.set(
      "class",
      className.trim(),
    );
  }

  if (major?.trim()) {
    params.set(
      "major",
      major.trim(),
    );
  }

  return params.toString();
}

async function getAdminStudentApiPage(
  filters: AdminStudentFilters,
): Promise<ApiAdminStudent[]> {
  const query =
    buildAdminStudentQuery(
      filters,
    );

  return authenticatedServerApiRequest<ApiAdminStudent[]>(
    `/admin/students?${query}`,
  );
}

export async function getAdminStudentDetail(
  studentId: string,
): Promise<AdminStudentData> {
  const student =
    await authenticatedServerApiRequest<ApiAdminStudent>(
      `/admin/students/${studentId}`,
    );

  return mapAdminStudent(
    student,
  );
}

export async function getAdminStudentsPage(
  filters: AdminStudentFilters = {},
): Promise<AdminStudentsPageData> {
  const page = Math.max(
    1,
    filters.page ?? 1,
  );

  const apiStudents =
    await getAdminStudentApiPage({
      ...filters,
      page,
    });

  let hasNextPage = false;

  if (
    apiStudents.length ===
    ADMIN_STUDENT_PAGE_SIZE
  ) {
    const nextPage =
      await getAdminStudentApiPage({
        ...filters,
        page: page + 1,
      });

    hasNextPage =
      nextPage.length > 0;
  }

  return {
    students:
      apiStudents.map(
        mapAdminStudent,
      ),
    page,
    hasPreviousPage: page > 1,
    hasNextPage,
  };
}

export async function getAdminStudentMonitoringStats(): Promise<AdminStudentMonitoringStats> {
  let page = 1;
  let activeWallets = 0;

  for (;;) {
    const students =
      await getAdminStudentApiPage({
        page,
      });

    activeWallets +=
      students.filter(
        (student) =>
          student.wallet?.is_active ===
          true,
      ).length;

    if (
      students.length <
      ADMIN_STUDENT_PAGE_SIZE
    ) {
      break;
    }

    page += 1;
  }

  return {
    activeWallets,
  };
}
