function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse bg-[#E7EDF1] ${className}`}
    />
  );
}

export default function StudentOrdersLoading() {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-5 pb-28 pt-6 sm:px-6 lg:px-16 lg:py-12">
      <Skeleton className="h-9 w-48 rounded-lg" />
      <Skeleton className="mt-3 h-4 w-64 rounded" />

      <div className="mt-6 flex gap-2 overflow-hidden">
        {Array.from({
          length: 4,
        }).map(
          (_, index) => (
            <Skeleton
              key={index}
              className="h-9 min-w-24 rounded-full"
            />
          ),
        )}
      </div>

      <div className="mt-6 space-y-3">
        {Array.from({
          length: 4,
        }).map(
          (_, index) => (
            <article
              key={index}
              className="rounded-[18px] border border-[#E2E8EC] bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 shrink-0 rounded-xl" />

                <div className="flex-1">
                  <Skeleton className="h-4 w-36 rounded" />
                  <Skeleton className="mt-2 h-3 w-28 rounded" />
                </div>

                <Skeleton className="h-6 w-20 rounded-full" />
              </div>

              <div className="mt-4 flex gap-3 border-t border-[#EDF1F3] pt-4">
                <Skeleton className="size-14 shrink-0 rounded-xl" />

                <div className="flex-1">
                  <Skeleton className="h-4 w-2/3 rounded" />
                  <Skeleton className="mt-2 h-3 w-1/2 rounded" />
                </div>
              </div>
            </article>
          ),
        )}
      </div>
    </div>
  );
}
