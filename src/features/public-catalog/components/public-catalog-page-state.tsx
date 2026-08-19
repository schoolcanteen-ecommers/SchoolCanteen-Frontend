interface PublicCatalogPageErrorProps {
  onRetry: () => void;
}

export function PublicCatalogPageSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 md:px-10">
        <div className="h-9 w-64 rounded-lg bg-arctic-blue" />

        <div className="mt-3 h-4 w-80 max-w-full rounded bg-arctic-blue/70" />

        <div className="mt-10 h-[52px] max-w-2xl rounded-xl bg-arctic-blue/70" />

        <div className="mt-6 flex gap-3 overflow-hidden">
          {Array.from({
            length: 5,
          }).map((_, index) => (
            <div
              key={index}
              className="h-9 w-24 shrink-0 rounded-full bg-arctic-blue"
            />
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {Array.from({
            length: 8,
          }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[16px] border border-arctic-blue bg-white"
            >
              <div className="h-40 bg-arctic-blue/70" />

              <div className="space-y-3 p-5">
                <div className="h-5 w-16 rounded bg-arctic-blue" />
                <div className="h-6 w-4/5 rounded bg-arctic-blue" />
                <div className="h-4 w-1/2 rounded bg-arctic-blue" />
                <div className="h-6 w-24 rounded bg-arctic-blue" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PublicCatalogPageError({
  onRetry,
}: PublicCatalogPageErrorProps) {
  return (
    <div className="mx-auto flex min-h-[55vh] max-w-[1200px] items-center justify-center px-4 sm:px-6 md:px-10">
      <div className="text-center">
        <h1 className="font-heading text-2xl font-bold text-navy-steel">
          Katalog belum dapat dimuat
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Periksa koneksi lalu coba lagi.
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-5 rounded-xl bg-navy-steel px-5 py-3 text-sm font-bold text-white"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
