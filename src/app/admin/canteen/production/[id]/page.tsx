import {
  notFound,
} from "next/navigation";

import {
  AdminProductionDetail,
} from "@/features/canteen/components/admin/production-summary/admin-production-detail";

import {
  getAdminCanteenProductionDetail,
} from "@/lib/api/admin-canteen-production";

interface AdminProductionDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminProductionDetailPage({
  params,
}: AdminProductionDetailPageProps) {
  const { id } = await params;
  const detail =
    await getAdminCanteenProductionDetail(id);

  if (!detail) {
    notFound();
  }

  return (
    <AdminProductionDetail
      detail={detail}
    />
  );
}
