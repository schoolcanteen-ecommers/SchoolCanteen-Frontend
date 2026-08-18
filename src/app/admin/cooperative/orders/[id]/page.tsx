import { notFound } from "next/navigation";

import { AdminCooperativeOrderDetail } from "@/features/cooperative/components/admin/order-management/admin-cooperative-order-detail";
import { getAdminCooperativeOrderById } from "@/mocks/admin-cooperative-orders";

interface AdminCooperativeOrderDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminCooperativeOrderDetailPage({
  params,
}: AdminCooperativeOrderDetailPageProps) {
  const { id } = await params;
  const order = getAdminCooperativeOrderById(decodeURIComponent(id));

  if (!order) {
    notFound();
  }

  return <AdminCooperativeOrderDetail order={order} />;
}
