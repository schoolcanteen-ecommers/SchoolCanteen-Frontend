import Link from "next/link";

import {
  CheckCircle2,
  Clock3,
  ShoppingBag,
  Store,
  WalletCards,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";

import { studentDashboard } from "@/mocks/dashboard";
import { studentWallet } from "@/mocks/wallet";

import { formatCurrency } from "@/lib/utils";

export default function StudentDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {}
      <PageHeader
        title="Dashboard Siswa"
        description="Akses kantin, koperasi, pesanan, dan wallet kamu dari satu tempat."
      />

      {}
      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Pesanan Aktif"
          value={studentDashboard.activeOrders}
          description="Pesanan yang sedang berjalan"
          icon={Clock3}
        />

        <StatCard
          title="Pesanan Selesai"
          value={studentDashboard.completedOrders}
          description="Total pesanan yang telah selesai"
          icon={CheckCircle2}
        />

        <StatCard
          title="Saldo Wallet"
          value={formatCurrency(
            studentWallet.balance,
          )}
          description="Saldo yang tersedia"
          icon={WalletCards}
        />
      </section>

      {}
      <section className="mt-8">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            Layanan Sekolah
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Pilih layanan yang ingin kamu gunakan.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {}
          <div className="rounded-2xl border bg-background p-6">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
              <Store className="size-5 text-primary" />
            </div>

            <p className="mt-5 text-sm font-medium text-primary">
              Kantin Digital
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              Pesan makanan tanpa antre
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Pilih makanan atau minuman dari kantin
              sekolah dan pesan sebelum waktu
              istirahat.
            </p>

            <Button
              nativeButton={false}
              className="mt-5"
              render={<Link href="/kantin" />}
            >
              Lihat Kantin
            </Button>
          </div>

          {}
          <div className="rounded-2xl border bg-background p-6">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
              <ShoppingBag className="size-5 text-primary" />
            </div>

            <p className="mt-5 text-sm font-medium text-primary">
              Koperasi Sekolah
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              Kebutuhan sekolah lebih mudah
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Temukan alat tulis, buku, dan
              perlengkapan sekolah langsung dari
              koperasi.
            </p>

            <Button
              nativeButton={false}
              variant="outline"
              className="mt-5"
              render={<Link href="/koperasi" />}
            >
              Lihat Koperasi
            </Button>
          </div>
        </div>
      </section>

      {}
      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        {}
        <div className="flex flex-col justify-between rounded-2xl border bg-background p-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-muted-foreground">
              Pesanan
            </p>

            <h2 className="mt-1 text-lg font-semibold">
              Pantau pesanan kamu
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Lihat pesanan yang sedang diproses,
              siap diambil, maupun yang sudah
              selesai.
            </p>
          </div>

          <Button
            nativeButton={false}
            variant="outline"
            className="mt-5 sm:mt-0"
            render={
              <Link href="/student/orders" />
            }
          >
            Lihat Pesanan
          </Button>
        </div>

        {}
        <div className="flex flex-col justify-between rounded-2xl border bg-background p-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-muted-foreground">
              Wallet
            </p>

            <p className="mt-1 text-2xl font-semibold">
              {formatCurrency(
                studentWallet.balance,
              )}
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Saldo sementara untuk transaksi
              SchoolCanteen.
            </p>
          </div>

          <Button
            nativeButton={false}
            variant="outline"
            className="mt-5 sm:mt-0"
            render={
              <Link href="/student/wallet" />
            }
          >
            Buka Wallet
          </Button>
        </div>
      </section>
    </div>
  );
}