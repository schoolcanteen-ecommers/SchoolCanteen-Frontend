import {
  authenticatedServerApiRequest,
} from "@/lib/api/authenticated-server";

import type {
  StudentWalletData,
} from "@/lib/api/student-wallet";

interface ApiStudentDashboard {
  active_orders: number;
  completed_orders: number;

  wallet: {
    id: string;

    balance: number;
    is_active: boolean;

    updated_at: string | null;
  };
}

export interface StudentDashboardData {
  activeOrders: number;
  completedOrders: number;

  wallet: StudentWalletData;
}

export async function getStudentDashboard(): Promise<StudentDashboardData> {
  const dashboard =
    await authenticatedServerApiRequest<ApiStudentDashboard>(
      "/student/dashboard",
    );

  return {
    activeOrders:
      dashboard.active_orders,

    completedOrders:
      dashboard.completed_orders,

    wallet: {
      id:
        dashboard.wallet.id,

      balance:
        dashboard.wallet.balance,

      isActive:
        dashboard.wallet.is_active,

      updatedAt:
        dashboard.wallet.updated_at,
    },
  };
}
