import {
  AdminDashboardHero,
} from "@/features/dashboard/components/admin/admin-dashboard-hero";
import {
  AdminDashboardOverview,
} from "@/features/dashboard/components/admin/admin-dashboard-overview";
import {
  AdminMerchantActivity,
} from "@/features/dashboard/components/admin/admin-merchant-activity";
import {
  AdminOrderStatus,
} from "@/features/dashboard/components/admin/admin-order-status";
import {
  AdminRecentOrders,
} from "@/features/dashboard/components/admin/admin-recent-orders";

import {
  requireRole,
} from "@/features/auth/server/require-role";

import {
  getAdminDashboard,
  getAdminTodayReport,
} from "@/lib/api/admin-dashboard";

export default async function AdminDashboardPage() {
  const profile =
    await requireRole("admin");

  const today =
    getJakartaDateString();

  const [dashboard, report] =
    await Promise.all([
      getAdminDashboard(),
      getAdminTodayReport(
        today,
      ),
    ]);

  const firstName =
    profile.name
      .trim()
      .split(/\s+/)[0] ||
    "Admin";

  return (
    <div className="mx-auto w-full max-w-[1320px] space-y-8 px-4 py-6 sm:px-6 lg:space-y-8 lg:px-8 lg:py-8">
      <AdminDashboardHero
        adminName={firstName}
      />

      <AdminDashboardOverview
        totalStudents={
          dashboard.users.students
        }
        activeMerchants={
          dashboard.users.activeMerchants
        }
        ordersToday={
          report.orders.total
        }
        transactionValue={
          report.orders.completedOrderValue
        }
      />

      <AdminOrderStatus
        waiting={
          report.orders.waiting
        }
        confirmed={
          report.orders.confirmed
        }
        preparing={
          report.orders.preparing
        }
        ready={
          report.orders.ready
        }
        completed={
          report.orders.completed
        }
        cancelled={
          report.orders.cancelled
        }
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <AdminRecentOrders
            orders={
              dashboard.recentOrders
            }
          />
        </div>

        <AdminMerchantActivity
          merchants={
            report.merchantPerformance.map(
              (merchant) => ({
                id: merchant.id,
                name: merchant.name,
                type: merchant.type,
                ordersCount:
                  merchant.ordersCount,
              }),
            )
          }
        />
      </div>
    </div>
  );
}

function getJakartaDateString(): string {
  return new Intl.DateTimeFormat(
    "en-CA",
    {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    },
  ).format(new Date());
}
