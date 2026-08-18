import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminPickupDetail } from "@/features/canteen/components/admin/pickup-monitoring/admin-pickup-detail";
import { getAdminPickupMonitoringEntry } from "@/mocks/admin-pickup-monitoring";

interface AdminPickupDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminPickupDetailPage({
  params,
}: AdminPickupDetailPageProps) {
  const { id } = await params;
  const entry = getAdminPickupMonitoringEntry(id);

  if (!entry) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-6 sm:px-6 lg:py-8">
      <div className="mb-6 flex items-center gap-4">
        <Link
          href="/admin/canteen/pickup"
          aria-label="Kembali ke Pickup Monitoring"
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-navy-steel transition hover:bg-[#F2F4F6]"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="font-heading text-[26px] font-bold text-navy-steel md:text-[30px]">
          Order Detail
        </h1>
      </div>

      <AdminPickupDetail entry={entry} />
    </div>
  );
}
