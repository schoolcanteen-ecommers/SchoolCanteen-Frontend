import { notFound } from "next/navigation";

import { AdminWithdrawalDetail } from "@/features/finance/components/admin/finance-management/admin-withdrawal-detail";
import { getAdminWithdrawalDetail } from "@/lib/api/admin-finance";
import { ApiError } from "@/lib/api/error";

interface AdminWithdrawalDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminWithdrawalDetailPage({ params }: AdminWithdrawalDetailPageProps) {
  const { id } = await params;

  try {
    const { withdrawal, merchant } = await getAdminWithdrawalDetail(id);
    return <AdminWithdrawalDetail withdrawal={withdrawal} merchant={merchant} />;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }
}
