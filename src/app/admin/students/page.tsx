import {
  AdminStudentList,
} from "@/features/students/components/admin-student-list";
import {
  AdminStudentMonitoringFilters,
} from "@/features/students/components/admin/student-monitoring/admin-student-monitoring-filters";
import {
  AdminStudentMonitoringOverview,
} from "@/features/students/components/admin/student-monitoring/admin-student-monitoring-overview";

import {
  getAdminDashboard,
} from "@/lib/api/admin-dashboard";
import {
  getAdminStudentMonitoringStats,
  getAdminStudentsPage,
} from "@/lib/api/admin-students";

interface AdminStudentsPageProps {
  searchParams: Promise<{
    page?: string | string[];
    search?: string | string[];
    class?: string | string[];
    major?: string | string[];
  }>;
}

export default async function AdminStudentsPage({
  searchParams,
}: AdminStudentsPageProps) {
  const params =
    await searchParams;

  const page = parsePage(
    getSingleValue(params.page),
  );
  const search =
    getSingleValue(params.search);
  const className =
    getSingleValue(params.class);
  const major =
    getSingleValue(params.major);

  const [
    dashboard,
    monitoringStats,
    studentPage,
  ] = await Promise.all([
    getAdminDashboard(),
    getAdminStudentMonitoringStats(),
    getAdminStudentsPage({
      page,
      search,
      className,
      major,
    }),
  ]);

  return (
    <div className="mx-auto w-full max-w-[1320px] space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <section>
        <h1 className="font-heading text-[32px] font-bold leading-tight text-navy-steel">
          Students
        </h1>
        <p className="mt-2 text-base text-[#536069]">
          Kelola dan monitor akun siswa SchoolCanteen.
        </p>
      </section>

      <AdminStudentMonitoringFilters
        search={search}
        className={className}
        major={major}
      />

      <AdminStudentMonitoringOverview
        totalStudents={
          dashboard.users.students
        }
        activeWallets={
          monitoringStats.activeWallets
        }
        totalOrders={
          dashboard.orders.total
        }
      />

      <AdminStudentList
        students={studentPage.students}
        page={studentPage.page}
        hasPreviousPage={
          studentPage.hasPreviousPage
        }
        hasNextPage={
          studentPage.hasNextPage
        }
        search={search}
        className={className}
        major={major}
      />
    </div>
  );
}

function getSingleValue(
  value: string | string[] | undefined,
): string {
  if (Array.isArray(value)) {
    return value[0]?.trim() ?? "";
  }

  return value?.trim() ?? "";
}

function parsePage(
  value: string,
): number {
  const parsed = Number.parseInt(
    value,
    10,
  );

  if (
    Number.isNaN(parsed) ||
    parsed < 1
  ) {
    return 1;
  }

  return parsed;
}
