import Link from "next/link";

import {
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  CookingPot,
  Package,
  PackageCheck,
  QrCode,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";

import { ROUTES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

import { merchantDashboard } from "@/mocks/dashboard";

export default function MerchantDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {/* Header */}
      <PageHeader
        title="Dashboard Merchant"
        description="Pantau pesanan, produksi, pickup, dan aktivitas merchant hari ini."
      />

      {/* Statistics */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Pesanan Baru"
          value={merchantDashboard.newOrders}
          description="Pesanan yang menunggu diproses"
          icon={ClipboardList}
        />

        <StatCard
          title="Sedang Diproses"
          value={merchantDashboard.preparingOrders}
          description="Pesanan dalam tahap produksi"
          icon={CookingPot}
        />

        <StatCard
          title="Siap Diambil"
          value={merchantDashboard.readyOrders}
          description="Pesanan menunggu pickup"
          icon={PackageCheck}
        />

        <StatCard
          title="Penjualan Hari Ini"
          value={formatCurrency(
            merchantDashboard.todaySales,
          )}
          description="Total transaksi hari ini"
          icon={CircleDollarSign}
        />
      </section>

      {/* Quick Access */}
      <section className="mt-8">
        <div>
          <h2 className="text-lg font-semibold">
            Akses Cepat
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Kelola operasional merchant dari satu tempat.
          </p>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {/* Orders */}
          <div className="rounded-2xl border bg-background p-6">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
              <ClipboardList className="size-5 text-primary" />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              Kelola Pesanan
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Pantau pesanan masuk dan proses pesanan pelanggan
              sesuai statusnya.
            </p>

            <Button
              nativeButton={false}
              variant="outline"
              className="mt-5"
              render={
                <Link href={ROUTES.MERCHANT.ORDERS} />
              }
            >
              Buka Pesanan
            </Button>
          </div>

          {/* Production */}
          <div className="rounded-2xl border bg-background p-6">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
              <CookingPot className="size-5 text-primary" />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              Production Summary
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Lihat ringkasan jumlah produk yang perlu
              disiapkan berdasarkan pesanan aktif.
            </p>

            <Button
              nativeButton={false}
              variant="outline"
              className="mt-5"
              render={
                <Link href={ROUTES.MERCHANT.PRODUCTION} />
              }
            >
              Lihat Produksi
            </Button>
          </div>

          {/* Pickup */}
          <div className="rounded-2xl border bg-background p-6">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
              <QrCode className="size-5 text-primary" />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              Smart Pickup
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Verifikasi pengambilan pesanan dan pantau pesanan
              yang sudah siap diserahkan.
            </p>

            <Button
              nativeButton={false}
              variant="outline"
              className="mt-5"
              render={
                <Link href={ROUTES.MERCHANT.PICKUP} />
              }
            >
              Buka Pickup
            </Button>
          </div>

          {/* Products */}
          <div className="rounded-2xl border bg-background p-6">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
              <Package className="size-5 text-primary" />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              Kelola Produk
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Pantau daftar produk yang dijual oleh merchant
              dan kelola ketersediaannya.
            </p>

            <Button
              nativeButton={false}
              variant="outline"
              className="mt-5"
              render={
                <Link href={ROUTES.MERCHANT.PRODUCTS} />
              }
            >
              Lihat Produk
            </Button>
          </div>
        </div>
      </section>

      {/* Today Operational Summary */}
      <section className="mt-8 rounded-2xl border bg-background">
        <div className="border-b px-5 py-4 sm:px-6">
          <h2 className="font-semibold">
            Ringkasan Operasional Hari Ini
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Gambaran singkat aktivitas pesanan merchant.
          </p>
        </div>

        <div className="grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {/* Total Orders */}
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock3 className="size-4" />

              Total Pesanan
            </div>

            <p className="mt-3 text-2xl font-semibold">
              {merchantDashboard.todayOrders}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Pesanan masuk hari ini
            </p>
          </div>

          {/* Completed */}
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="size-4" />

              Pesanan Selesai
            </div>

            <p className="mt-3 text-2xl font-semibold">
              {merchantDashboard.completedOrders}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Pesanan telah diselesaikan
            </p>
          </div>

          {/* Active */}
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CookingPot className="size-4" />

              Pesanan Aktif
            </div>

            <p className="mt-3 text-2xl font-semibold">
              {merchantDashboard.newOrders +
                merchantDashboard.preparingOrders +
                merchantDashboard.readyOrders}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Masih dalam proses operasional
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}