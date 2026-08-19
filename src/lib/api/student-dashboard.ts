import {
<<<<<<< HEAD
  authenticatedServerApiRequest,
} from "@/lib/api/authenticated-server";

import type {
  StudentWalletData,
} from "@/lib/api/student-wallet";

interface ApiStudentDashboard {
=======
  cache,
} from "react";

import {
  authenticatedServerApiRequest,
} from "@/lib/api/authenticated-server";

import {
  mapStudentOrder,
  type ApiStudentOrderDetail,
  type StudentOrderData,
} from "@/lib/api/student-orders";

import {
  mapWalletTransaction,
  type ApiWalletTransaction,
  type StudentWalletData,
} from "@/lib/api/student-wallet";

import type {
  WalletTransaction,
} from "@/types/wallet";

interface ApiStudentDashboard {
  profile: {
    id: string;

    name: string;
    phone: string | null;
    avatar_url: string | null;

    role: "student";
  };

>>>>>>> source/main
  active_orders: number;
  completed_orders: number;

  wallet: {
    id: string;

    balance: number;
    is_active: boolean;

    updated_at: string | null;
  };
<<<<<<< HEAD
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
=======

  orders:
    ApiStudentOrderDetail[];

  recent_wallet_transactions:
    ApiWalletTransaction[];
}

export interface StudentDashboardData {
  profile: {
    id: string;

    name: string;
    phone: string | null;
    avatarUrl: string | null;
  };

  activeOrders: number;
  completedOrders: number;

  wallet:
    StudentWalletData;

  orders:
    StudentOrderData[];

  recentWalletTransactions:
    WalletTransaction[];
}

/*
 * React cache() menduplikasi request
 * dashboard ketika StudentLayout dan
 * StudentDashboardPage meminta data
 * yang sama pada server render yang sama.
 */
export const getStudentDashboard =
  cache(
    async (): Promise<StudentDashboardData> => {
      const dashboard =
        await authenticatedServerApiRequest<ApiStudentDashboard>(
          "/student/dashboard",
          {
            cache: "no-store",
          },
        );

      return {
        profile: {
          id:
            dashboard.profile.id,

          name:
            dashboard.profile.name,

          phone:
            dashboard.profile.phone,

          avatarUrl:
            dashboard.profile.avatar_url,
        },

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

        orders:
          dashboard.orders.map(
            (order) =>
              mapStudentOrder(
                order,
                dashboard.profile.id,
              ),
          ),

        recentWalletTransactions:
          dashboard
            .recent_wallet_transactions
            .map(
              (transaction) =>
                mapWalletTransaction(
                  transaction,
                  dashboard.wallet.id,
                ),
            ),
      };
    },
  );
>>>>>>> source/main
