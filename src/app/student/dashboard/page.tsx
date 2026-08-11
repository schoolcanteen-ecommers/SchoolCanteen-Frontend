export default function StudentDashboardPage() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <section>
        <p className="text-sm text-muted-foreground">
          Selamat datang,
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight lg:text-3xl">
          Andi Pratama
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          XI RPL 1
        </p>
      </section>

      {}
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-background p-6">
          <p className="text-sm text-muted-foreground">
            Kantin Digital
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            Pesan makanan tanpa antre
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Lihat menu kantin dan lakukan pre-order sebelum jam istirahat.
          </p>
        </div>

        <div className="rounded-2xl border bg-background p-6">
          <p className="text-sm text-muted-foreground">
            Koperasi Sekolah
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            Semua kebutuhan sekolah
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Cari alat tulis dan perlengkapan sekolah langsung dari koperasi.
          </p>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border bg-background p-6">
          <h2 className="font-semibold">
            Pesanan Aktif
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Pesanan yang sedang kamu lakukan akan tampil di sini.
          </p>
        </div>

        <div className="rounded-2xl border bg-background p-6">
          <h2 className="font-semibold">
            Wallet
          </h2>

          <p className="mt-2 text-2xl font-semibold">
            Rp75.000
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Saldo SchoolCanteen
          </p>
        </div>
      </section>
    </div>
  );
}