import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-sm font-medium text-muted-foreground">
          404
        </p>

        <h1 className="mt-2 text-3xl font-semibold">
          Halaman tidak ditemukan
        </h1>

        <p className="mt-3 text-sm text-muted-foreground">
          Halaman yang kamu cari tidak tersedia atau mungkin sudah dipindahkan.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}