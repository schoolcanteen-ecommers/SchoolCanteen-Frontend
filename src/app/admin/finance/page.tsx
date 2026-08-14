import { PageHeader } from "@/components/shared/page-header";

import { AdminFinanceOverview } from "@/features/finance/components/admin-finance-overview";

import {
  getMerchantWithdrawalPreview,
} from "@/mocks/finance";

import {
  merchantOrders,
  studentOrders,
} from "@/mocks/orders";

import {
  studentUserProfile,
} from "@/mocks/profile";

export default function AdminFinancePage() {
    const transactions = [
    ...merchantOrders.map(
      ({
        order,
        customerName,
      }) => ({
        order,
        customerName,
      }),
    ),

    ...studentOrders.map(
      ({ order }) => ({
        order,

        customerName:
          studentUserProfile.name,
      }),
    ),
  ];

    const merchantNames =
    Object.fromEntries(
      studentOrders.map(
        ({
          order,
          merchantName,
        }) => [
          order.merchantId,
          merchantName,
        ],
      ),
    );

    const previewMerchantId =
    merchantOrders[0]?.order
      .merchantId ??
    studentOrders[0]?.order
      .merchantId;

  const withdrawals =
    previewMerchantId
      ? getMerchantWithdrawalPreview(
          previewMerchantId,
        )
      : [];

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <PageHeader
        title="Finance"
        description="Pantau arus dana, escrow, refund, dan pencairan merchant pada SchoolCanteen."
      />

      <AdminFinanceOverview
        transactions={transactions}
        withdrawals={withdrawals}
        merchantNames={
          merchantNames
        }
      />
    </div>
  );
}