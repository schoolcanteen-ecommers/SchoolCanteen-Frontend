interface PublicHomeCatalogSkeletonProps {
  variant?: "canteen" | "cooperative";
}

export function PublicHomeCatalogSkeleton({
  variant = "canteen",
}: PublicHomeCatalogSkeletonProps) {
  return (
    <section
      className={
        variant === "canteen"
          ? "bg-arctic-blue/30 py-12 lg:py-16"
          : "border-b border-arctic-blue bg-white py-12 lg:py-16"
      }
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10">
        <div className="mb-6 space-y-2 lg:mb-8">
          <div className="h-8 w-64 animate-pulse rounded-lg bg-arctic-blue" />
          <div className="h-4 w-48 animate-pulse rounded bg-arctic-blue/70" />
        </div>

        <div className="flex gap-4 overflow-hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <div
              key={index}
              className="min-w-[160px] overflow-hidden rounded-[16px] border border-arctic-blue bg-white"
            >
              <div className="h-40 animate-pulse bg-arctic-blue/70" />

              <div className="space-y-3 p-5">
                <div className="h-5 w-16 animate-pulse rounded bg-arctic-blue" />
                <div className="h-6 w-4/5 animate-pulse rounded bg-arctic-blue" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-arctic-blue" />

                <div className="flex items-center justify-between pt-4">
                  <div className="h-6 w-24 animate-pulse rounded bg-arctic-blue" />
                  <div className="size-10 animate-pulse rounded-full bg-arctic-blue" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
