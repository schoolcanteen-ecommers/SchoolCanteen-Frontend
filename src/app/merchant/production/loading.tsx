function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse bg-[#E8EDF2] ${className}`}
    />
  );
}

export default function MerchantProductionLoading() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <Skeleton className="h-10 w-64 rounded-lg" />
      <Skeleton className="mt-3 h-4 w-96 max-w-full rounded" />

      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3">
        {Array.from({
          length: 3,
        }).map(
          (_, index) => (
            <Skeleton
              key={index}
              className="h-28 rounded-[18px]"
            />
          ),
        )}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({
          length: 4,
        }).map(
          (_, index) => (
            <Skeleton
              key={index}
              className="h-[250px] rounded-[18px]"
            />
          ),
        )}
      </div>
    </div>
  );
}
