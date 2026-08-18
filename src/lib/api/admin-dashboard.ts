import {
  authenticatedServerApiRequest,
} from "@/lib/api/authenticated-server";

export type AdminOrderStatus =
  | "WAITING"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "COMPLETED"
  | "CANCELLED";

export type AdminMerchantType =
  | "CANTEEN"
  | "COOPERATIVE";

interface ApiAdminDashboard {
  users: {
    students: number;
    merchants: number;
    active_merchants: number;
  };

  orders: {
    total: number;
    waiting: number;
    confirmed: number;
    preparing: number;
    ready: number;
    completed: number;
    cancelled: number;
  };

  finance: {
    completed_order_value: number;
    successful_topups: number;
    escrow_held: number;
    pending_withdrawals: number;
    pending_withdrawal_amount: number;
  };

  recent_orders: ApiAdminRecentOrder[];
}

interface ApiAdminRecentOrder {
  id: string;
  order_code: string;

  student: {
    id: string | null;
    name: string | null;
  } | null;

  merchant: {
    id: string | null;
    name: string | null;
    type: string | null;
  } | null;

  status: string;
  total_amount: number;
  created_at: string | null;
}

interface ApiAdminReportSummary {
  period: {
    date_from: string | null;
    date_to: string | null;
    basis: string;
  };

  orders: {
    total: number;
    waiting: number;
    confirmed: number;
    preparing: number;
    ready: number;
    completed: number;
    cancelled: number;
    placed_order_value: number;
    completed_order_value: number;
  };

  merchant_performance: ApiAdminMerchantPerformance[];
}

interface ApiAdminMerchantPerformance {
  id: string;
  name: string;
  type: string;
  orders_count: number;
  completed_orders: number;
  completed_order_value: number;
}

export interface AdminRecentOrder {
  id: string;
  orderCode: string;
  studentName: string;
  merchantName: string;
  merchantType: AdminMerchantType | null;
  status: AdminOrderStatus;
  totalAmount: number;
  createdAt: string | null;
}

export interface AdminDashboardData {
  users: {
    students: number;
    merchants: number;
    activeMerchants: number;
  };

  orders: {
    total: number;
    waiting: number;
    confirmed: number;
    preparing: number;
    ready: number;
    completed: number;
    cancelled: number;
  };

  finance: {
    completedOrderValue: number;
    successfulTopups: number;
    escrowHeld: number;
    pendingWithdrawals: number;
    pendingWithdrawalAmount: number;
  };

  recentOrders: AdminRecentOrder[];
}

export interface AdminTodayReportData {
  orders: {
    total: number;
    waiting: number;
    confirmed: number;
    preparing: number;
    ready: number;
    completed: number;
    cancelled: number;
    placedOrderValue: number;
    completedOrderValue: number;
  };

  merchantPerformance: Array<{
    id: string;
    name: string;
    type: AdminMerchantType;
    ordersCount: number;
    completedOrders: number;
    completedOrderValue: number;
  }>;
}

export interface AdminReportSummaryData
  extends AdminTodayReportData {
  period: {
    dateFrom: string | null;
    dateTo: string | null;
    basis: string;
  };
}

function mapOrderStatus(
  status: string,
): AdminOrderStatus {
  switch (
    status
      .trim()
      .toLowerCase()
  ) {
    case "waiting":
      return "WAITING";

    case "confirmed":
      return "CONFIRMED";

    case "preparing":
      return "PREPARING";

    case "ready":
      return "READY";

    case "completed":
      return "COMPLETED";

    case "cancelled":
    case "canceled":
      return "CANCELLED";

    default:
      throw new Error(
        `Status order admin tidak dikenali: ${status}`,
      );
  }
}

function mapMerchantType(
  type: string,
): AdminMerchantType {
  switch (
    type
      .trim()
      .toLowerCase()
  ) {
    case "canteen":
      return "CANTEEN";

    case "cooperative":
      return "COOPERATIVE";

    default:
      throw new Error(
        `Tipe merchant admin tidak dikenali: ${type}`,
      );
  }
}

export async function getAdminDashboard(): Promise<AdminDashboardData> {
  const data =
    await authenticatedServerApiRequest<ApiAdminDashboard>(
      "/admin/dashboard",
    );

  return {
    users: {
      students: data.users.students,
      merchants: data.users.merchants,
      activeMerchants:
        data.users.active_merchants,
    },

    orders: {
      total: data.orders.total,
      waiting: data.orders.waiting,
      confirmed: data.orders.confirmed,
      preparing: data.orders.preparing,
      ready: data.orders.ready,
      completed: data.orders.completed,
      cancelled: data.orders.cancelled,
    },

    finance: {
      completedOrderValue:
        data.finance.completed_order_value,
      successfulTopups:
        data.finance.successful_topups,
      escrowHeld:
        data.finance.escrow_held,
      pendingWithdrawals:
        data.finance.pending_withdrawals,
      pendingWithdrawalAmount:
        data.finance.pending_withdrawal_amount,
    },

    recentOrders:
      data.recent_orders.map(
        (order) => ({
          id: order.id,
          orderCode:
            order.order_code,
          studentName:
            order.student?.name ??
            "Siswa",
          merchantName:
            order.merchant?.name ??
            "Merchant",
          merchantType:
            order.merchant?.type
              ? mapMerchantType(
                  order.merchant.type,
                )
              : null,
          status:
            mapOrderStatus(
              order.status,
            ),
          totalAmount:
            order.total_amount,
          createdAt:
            order.created_at,
        }),
      ),
  };
}

export async function getAdminReportSummary(
  dateFrom: string,
  dateTo: string,
): Promise<AdminReportSummaryData> {
  const params =
    new URLSearchParams({
      date_from: dateFrom,
      date_to: dateTo,
    });

  const data =
    await authenticatedServerApiRequest<ApiAdminReportSummary>(
      `/admin/reports/summary?${params.toString()}`,
    );

  return {
    period: {
      dateFrom: data.period.date_from,
      dateTo: data.period.date_to,
      basis: data.period.basis,
    },

    orders: {
      total: data.orders.total,
      waiting: data.orders.waiting,
      confirmed: data.orders.confirmed,
      preparing: data.orders.preparing,
      ready: data.orders.ready,
      completed: data.orders.completed,
      cancelled: data.orders.cancelled,
      placedOrderValue:
        data.orders.placed_order_value,
      completedOrderValue:
        data.orders.completed_order_value,
    },

    merchantPerformance:
      data.merchant_performance.map(
        (merchant) => ({
          id: merchant.id,
          name: merchant.name,
          type:
            mapMerchantType(
              merchant.type,
            ),
          ordersCount:
            merchant.orders_count,
          completedOrders:
            merchant.completed_orders,
          completedOrderValue:
            merchant.completed_order_value,
        }),
      ),
  };
}

export async function getAdminTodayReport(
  date: string,
): Promise<AdminTodayReportData> {
  const report =
    await getAdminReportSummary(
      date,
      date,
    );

  return {
    orders: report.orders,
    merchantPerformance:
      report.merchantPerformance,
  };
}
