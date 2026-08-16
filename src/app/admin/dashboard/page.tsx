import Link from "next/link";

import {
  CircleDollarSign,
  ClipboardList,
  ReceiptText,
  ShoppingCart,
  Store,
  Users,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";

import { ROUTES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

import { adminDashboard } from "@/mocks/dashboard";

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      
      <PageHeader
        title="Dashboard Admin"
        description="Pantau aktivitas siswa, merchant, pesanan, dan transaksi SchoolCanteen."
      />

      
      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Siswa"
          value={adminDashboard.totalStudents}
          description="Siswa yang terdaftar"
          icon={Users}
        />

        <StatCard
          title="Total Merchant"
          value={adminDashboard.totalMerchants}
          description={`${adminDashboard.activeMerchants} merchant aktif`}
          icon={Store}
        />

        <StatCard
          title="Pesanan Hari Ini"
          value={adminDashboard.todayOrders}
          description="Total pesanan hari ini"
          icon={ShoppingCart}
        />

        <StatCard
          title="Transaksi Hari Ini"
          value={formatCurrency(
            adminDashboard.todayTransactionValue,
          )}
          description="Nilai transaksi hari ini"
          icon={CircleDollarSign}
        />
      </section>

      
      <section className="mt-8">
        <div>
          <h2 className="text-lg font-semibold">
            Akses Cepat
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Akses area monitoring dan pengelolaan utama administrator.
          </p>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          
          <div className="rounded-2xl border bg-background p-6">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
              <Store className="size-5 text-primary" />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              Merchant Management
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Pantau merchant kantin dan koperasi yang terdaftar
              dalam sistem.
            </p>

            <Button
              nativeButton={false}
              variant="outline"
              className="mt-5"
              render={
                <Link href={ROUTES.ADMIN.MERCHANTS} />
              }
            >
              Kelola Merchant
            </Button>
          </div>

          
          <div className="rounded-2xl border bg-background p-6">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
              <Users className="size-5 text-primary" />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              Student Monitoring
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Pantau siswa yang menggunakan layanan dan aktivitas
              transaksi sekolah.
            </p>

            <Button
              nativeButton={false}
              variant="outline"
              className="mt-5"
              render={
                <Link href={ROUTES.ADMIN.STUDENTS} />
              }
            >
              Lihat Siswa
            </Button>
          </div>

          
          <div className="rounded-2xl border bg-background p-6">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
              <ReceiptText className="size-5 text-primary" />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              Transaction Monitoring
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Pantau transaksi, pembayaran, dan status dana
              yang berjalan di SchoolCanteen.
            </p>

            <Button
              nativeButton={false}
              variant="outline"
              className="mt-5"
              render={
                <Link href={ROUTES.ADMIN.TRANSACTIONS} />
              }
            >
              Lihat Transaksi
            </Button>
          </div>

          
          <div className="rounded-2xl border bg-background p-6">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
              <CircleDollarSign className="size-5 text-primary" />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              Finance
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Pantau aliran dana dan aktivitas keuangan
              ekosistem SchoolCanteen.
            </p>

            <Button
              nativeButton={false}
              variant="outline"
              className="mt-5"
              render={
                <Link href={ROUTES.ADMIN.FINANCE} />
              }
            >
              Buka Finance
            </Button>
          </div>
        </div>
      </section>

      
      <section className="mt-8 rounded-2xl border bg-background">
        <div className="border-b px-5 py-4 sm:px-6">
          <h2 className="font-semibold">
            Ringkasan Operasional Hari Ini
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Gambaran singkat aktivitas SchoolCanteen hari ini.
          </p>
        </div>

        <div className="grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ClipboardList className="size-4" />

              Pesanan Aktif
            </div>

            <p className="mt-3 text-2xl font-semibold">
              {adminDashboard.activeOrders}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Pesanan masih dalam proses
            </p>
          </div>

          
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShoppingCart className="size-4" />

              Pesanan Selesai
            </div>

            <p className="mt-3 text-2xl font-semibold">
              {adminDashboard.completedOrders}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Pesanan selesai hari ini
            </p>
          </div>

          
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Store className="size-4" />

              Merchant Aktif
            </div>

            <p className="mt-3 text-2xl font-semibold">
              {adminDashboard.activeMerchants}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Merchant aktif di sistem
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}