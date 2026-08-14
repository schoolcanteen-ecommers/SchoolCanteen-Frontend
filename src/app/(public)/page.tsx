import Link from "next/link";

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  QrCode,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Store,
  UtensilsCrossed,
  WalletCards,
} from "lucide-react";

import { ProductCard } from "@/components/commerce/product-card";
import { Button } from "@/components/ui/button";

import { getCanteenCatalog, getCooperativeCatalog } from "@/lib/api/catalog";

const benefits = [
  {
    title: "Pesan Tanpa Antre",
    description:
      "Pesan makanan sebelum waktu istirahat dan ambil ketika sudah siap.",
    icon: Clock3,
  },
  {
    title: "Pickup Lebih Aman",
    description:
      "Setiap pesanan memiliki kode pickup untuk membantu proses pengambilan.",
    icon: QrCode,
  },
  {
    title: "Satu Ekosistem",
    description:
      "Kantin dan kebutuhan koperasi sekolah tersedia dalam satu platform.",
    icon: Store,
  },
  {
    title: "Pembayaran Praktis",
    description:
      "Pembayaran nantinya dapat dilakukan menggunakan saldo digital siswa.",
    icon: WalletCards,
  },
];

const steps = [
  {
    number: "01",
    title: "Pilih kebutuhanmu",
    description:
      "Jelajahi makanan dari kantin atau produk kebutuhan sekolah dari koperasi.",
  },
  {
    number: "02",
    title: "Masukkan ke keranjang",
    description:
      "Kamu bisa berbelanja sebagai guest tanpa harus langsung membuat akun.",
  },
  {
    number: "03",
    title: "Login saat checkout",
    description:
      "Login hanya dibutuhkan ketika kamu sudah siap melanjutkan pesanan.",
  },
  {
    number: "04",
    title: "Ambil pesanan",
    description:
      "Pantau pesanan dan lakukan pickup ketika merchant sudah menyiapkannya.",
  },
];

export default async function HomePage() {
  const [canteenCatalog, cooperativeCatalog] = await Promise.all([
    getCanteenCatalog(),
    getCooperativeCatalog(),
  ]);

  const canteenMerchants = canteenCatalog.merchants;

  const cooperativeMerchants = cooperativeCatalog.merchants;

  const allMerchants = [
    ...canteenCatalog.merchants,
    ...cooperativeCatalog.merchants,
  ];

  const allProducts = [
    ...canteenCatalog.products,
    ...cooperativeCatalog.products,
  ];

  const activeProducts = allProducts.filter(
    (product) => product.isActive && product.stock > 0,
  );

  const featuredProducts = activeProducts.slice(0, 4);

  const merchantMap = new Map(
    allMerchants.map((merchant) => [merchant.id, merchant]),
  );

  return (
    <div>
      {}
      <section className="relative overflow-hidden border-b bg-background">
        {}
        <div className="pointer-events-none absolute -right-28 -top-40 size-[420px] rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-44 -left-40 size-[420px] rounded-full bg-primary/5 blur-3xl" />

        <div className="relative mx-auto grid min-h-[620px] max-w-[1440px] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          {}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
              <Sparkles className="size-3.5 text-primary" />
              School Commerce Ecosystem
            </div>

            <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Belanja di sekolah
              <span className="block text-primary">tanpa ribet.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Pesan makanan dari kantin, beli kebutuhan sekolah dari koperasi,
              dan kelola semuanya dalam satu pengalaman digital yang lebih
              praktis.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                nativeButton={false}
                size="lg"
                render={<Link href="/kantin" />}
              >
                <UtensilsCrossed className="size-4" />
                Jelajahi Kantin
                <ArrowRight className="size-4" />
              </Button>

              <Button
                nativeButton={false}
                variant="outline"
                size="lg"
                render={<Link href="/koperasi" />}
              >
                <ShoppingBag className="size-4" />
                Lihat Koperasi
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                Bisa browsing tanpa login
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                Keranjang tersimpan
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                Mobile friendly
              </span>
            </div>
          </div>

          {}
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="rounded-[32px] border bg-muted/30 p-3 shadow-xl shadow-primary/5">
              <div className="overflow-hidden rounded-[26px] border bg-background">
                {}
                <div className="flex items-center justify-between border-b px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                      SS
                    </div>

                    <div>
                      <p className="text-sm font-semibold">School Commerce</p>

                      <p className="text-xs text-muted-foreground">Hari ini</p>
                    </div>
                  </div>

                  <div className="flex size-9 items-center justify-center rounded-xl bg-muted">
                    <ShoppingCart className="size-4" />
                  </div>
                </div>

                {}
                <div className="space-y-5 p-5">
                  <div className="rounded-2xl bg-primary p-5 text-primary-foreground">
                    <p className="text-xs font-medium text-primary-foreground/75">
                      Mau makan apa hari ini?
                    </p>

                    <p className="mt-2 text-xl font-semibold">
                      Pesan dulu, ambil nanti.
                    </p>

                    <div className="mt-5 h-9 rounded-xl bg-white/15" />
                  </div>

                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-semibold">Pilihan hari ini</p>

                      <span className="text-xs font-medium text-primary">
                        Lihat semua
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {activeProducts.slice(0, 4).map((product) => (
                        <div
                          key={product.id}
                          className="rounded-2xl border p-3"
                        >
                          <div className="aspect-[4/3] rounded-xl bg-muted" />

                          <p className="mt-3 truncate text-xs font-semibold">
                            {product.name}
                          </p>

                          <div className="mt-2 h-2 w-14 rounded-full bg-primary/20" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {}
            <div className="absolute -bottom-6 -left-3 hidden rounded-2xl border bg-background p-4 shadow-lg sm:block lg:-left-8">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                  <Clock3 className="size-5 text-primary" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Waktu antre</p>

                  <p className="text-sm font-semibold">Lebih efisien</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="border-b bg-background">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 divide-x px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div className="px-4 text-center">
            <p className="text-3xl font-semibold tracking-tight">
              {canteenMerchants.length}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">Kantin Aktif</p>
          </div>

          <div className="px-4 text-center">
            <p className="text-3xl font-semibold tracking-tight">
              {cooperativeMerchants.length}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">Koperasi</p>
          </div>

          <div className="border-t px-4 pt-6 text-center lg:border-t-0 lg:pt-0">
            <p className="text-3xl font-semibold tracking-tight">
              {activeProducts.length}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Produk Tersedia
            </p>
          </div>

          <div className="border-t px-4 pt-6 text-center lg:border-t-0 lg:pt-0">
            <p className="text-3xl font-semibold tracking-tight">1</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Ekosistem Sekolah
            </p>
          </div>
        </div>
      </section>

      {}
      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Belanja di sekolah</p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Semua kebutuhan dalam satu platform.
          </h2>

          <p className="mt-4 text-muted-foreground">
            Tidak hanya makanan. School commerce menghubungkan siswa dengan
            layanan jual-beli yang tersedia di lingkungan sekolah.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {}
          <Link
            href="/kantin"
            className="group relative min-h-[330px] overflow-hidden rounded-3xl border bg-background p-6 transition-all hover:-translate-y-1 hover:shadow-xl sm:p-8"
          >
            <div className="absolute -right-16 -top-16 size-52 rounded-full bg-primary/10 blur-2xl transition-transform duration-500 group-hover:scale-125" />

            <div className="relative flex h-full flex-col">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <UtensilsCrossed className="size-5" />
              </div>

              <div className="mt-auto pt-16">
                <p className="text-sm font-medium text-primary">
                  Kantin Digital
                </p>

                <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Pesan makanan sebelum bel istirahat berbunyi.
                </h3>

                <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                  Temukan menu dari berbagai kantin dan siapkan pesanan sebelum
                  waktu istirahat.
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold">
                  Jelajahi Kantin
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>

          {}
          <Link
            href="/koperasi"
            className="group relative min-h-[330px] overflow-hidden rounded-3xl border bg-background p-6 transition-all hover:-translate-y-1 hover:shadow-xl sm:p-8"
          >
            <div className="absolute -right-16 -top-16 size-52 rounded-full bg-primary/10 blur-2xl transition-transform duration-500 group-hover:scale-125" />

            <div className="relative flex h-full flex-col">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ShoppingBag className="size-5" />
              </div>

              <div className="mt-auto pt-16">
                <p className="text-sm font-medium text-primary">
                  Koperasi Digital
                </p>

                <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Kebutuhan sekolah tanpa harus antre.
                </h3>

                <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                  Buku, alat tulis, dan berbagai perlengkapan sekolah tersedia
                  dari koperasi.
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold">
                  Lihat Koperasi
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {}
      {featuredProducts.length > 0 && (
        <section className="border-y bg-muted/30">
          <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium text-primary">
                  Produk pilihan
                </p>

                <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Lagi tersedia hari ini.
                </h2>
              </div>

              <Link
                href="/kantin"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                Lihat semua
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredProducts.map((product) => {
                const merchant = merchantMap.get(product.merchantId);

                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    merchantName={merchant?.name}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      {}
      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-sm font-medium text-primary">Kenapa digital?</p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Dibuat untuk aktivitas sekolah yang lebih efisien.
            </h2>

            <p className="mt-4 max-w-lg leading-7 text-muted-foreground">
              Sistem commerce sekolah membantu mengurangi proses manual dalam
              pemesanan, pembayaran, hingga pengambilan barang.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl border bg-background p-5"
                >
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>

                  <h3 className="mt-5 font-semibold">{benefit.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {}
      <section className="border-y bg-background">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-primary">Cara kerja</p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Dari pilih sampai pickup, tetap sederhana.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative rounded-2xl border p-5"
              >
                <p className="text-sm font-semibold text-primary">
                  {step.number}
                </p>

                <h3 className="mt-8 text-lg font-semibold">{step.title}</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border bg-background p-6">
            <ShieldCheck className="size-6 text-primary" />

            <h3 className="mt-5 font-semibold">Transaksi Terstruktur</h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Status transaksi dirancang agar proses pembayaran dan pesanan
              dapat dipantau dengan jelas.
            </p>
          </div>

          <div className="rounded-2xl border bg-background p-6">
            <QrCode className="size-6 text-primary" />

            <h3 className="mt-5 font-semibold">Smart Pickup</h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Proses pengambilan dapat diverifikasi menggunakan kode pickup
              untuk mencegah pesanan diambil dua kali.
            </p>
          </div>

          <div className="rounded-2xl border bg-background p-6">
            <Store className="size-6 text-primary" />

            <h3 className="mt-5 font-semibold">Merchant Terpusat</h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Kantin dan koperasi dapat mengelola aktivitas perdagangan melalui
              sistem yang sama.
            </p>
          </div>
        </div>
      </section>

      {}
      <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[32px] bg-primary px-6 py-12 text-primary-foreground sm:px-10 lg:px-14 lg:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-primary-foreground/70">
                Mulai sekarang
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Tidak perlu tunggu antrean untuk mulai memilih.
              </h2>

              <p className="mt-4 leading-7 text-primary-foreground/75">
                Lihat menu kantin atau kebutuhan koperasi sekarang. Login baru
                diperlukan ketika kamu siap checkout.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Button
                nativeButton={false}
                size="lg"
                variant="secondary"
                render={<Link href="/kantin" />}
              >
                Lihat Kantin
                <ArrowRight className="size-4" />
              </Button>

              <Button
                nativeButton={false}
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                render={<Link href="/koperasi" />}
              >
                Koperasi
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
