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

export default function StudentCatalogLoading() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pb-28 pt-6 sm:px-6 lg:px-8">
      <div>
        <Skeleton className="h-4 w-28 rounded-md" />

        <Skeleton className="mt-3 h-9 w-64 max-w-[80%] rounded-lg" />

        <Skeleton className="mt-3 h-4 w-72 max-w-full rounded-md" />
      </div>

      <Skeleton className="mt-8 h-12 w-full rounded-2xl" />

      <div className="mt-4 flex gap-2">
        <Skeleton className="h-10 w-24 rounded-full" />
        <Skeleton className="h-10 w-28 rounded-full" />
        <Skeleton className="h-10 w-20 rounded-full" />
      </div>

      <Skeleton className="mt-8 h-7 w-36 rounded-lg" />

      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({
          length: 4,
        }).map(
          (_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[18px] border border-[#E3E9ED] bg-white"
            >
              <Skeleton className="aspect-[4/3] w-full" />

              <div className="p-3">
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="mt-2 h-3 w-1/2 rounded" />
                <Skeleton className="mt-4 h-4 w-20 rounded" />
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
