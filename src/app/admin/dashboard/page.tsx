import {
  ShoppingCart,
  Store,
  Users,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader } from "@/components/shared/page-header";

export default function AdminDashboardPage() {
  return (
    <div className="p-6 lg:p-8">
      <PageHeader
        title="Selamat Datang, Administrator"
        description="Pantau seluruh aktivitas kantin dan koperasi sekolah secara real-time."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Total Siswa"
          value="1.250"
          icon={Users}
        />

        <StatCard
          title="Merchant Aktif"
          value="8"
          icon={Store}
        />

        <StatCard
          title="Pesanan Hari Ini"
          value="356"
          icon={ShoppingCart}
        />
      </div>
    </div>
  );
}