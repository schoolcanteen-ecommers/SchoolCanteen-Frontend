import {
  notFound,
} from "next/navigation";

import {
  AdminTransactionDetail,
} from "@/features/transactions/components/admin/transaction-management/admin-transaction-detail";

import {
  ApiError,
} from "@/lib/api/error";
import {
  getAdminStudentDetail,
} from "@/lib/api/admin-students";
import {
  getAdminTransactionDetail,
} from "@/lib/api/admin-transactions";

interface AdminTransactionDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminTransactionDetailPage({
  params,
}: AdminTransactionDetailPageProps) {
  const { id } = await params;

  try {
    const transaction =
      await getAdminTransactionDetail(
        id,
      );

    const student =
      await getAdminStudentDetail(
        transaction.student.id,
      );

    return (
      <AdminTransactionDetail
        transaction={transaction}
        student={student}
      />
    );
  } catch (error) {
    if (
      error instanceof ApiError &&
      error.status === 404
    ) {
      notFound();
    }

    throw error;
  }
}
