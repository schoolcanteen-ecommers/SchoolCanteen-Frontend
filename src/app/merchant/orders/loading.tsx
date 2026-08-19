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

export default function MerchantOrdersLoading() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
      <Skeleton className="h-9 w-44 rounded-lg" />

      <Skeleton className="mt-3 h-4 w-72 rounded" />

      <div className="mt-6 flex gap-2 overflow-hidden">
        {Array.from({
          length: 5,
        }).map(
          (_, index) => (
            <Skeleton
              key={index}
              className="h-9 min-w-24 rounded-full"
            />
          ),
        )}
      </div>

      <div className="mt-6 space-y-3 lg:hidden">
        {Array.from({
          length: 4,
        }).map(
          (_, index) => (
            <Skeleton
              key={index}
              className="h-[230px] rounded-[18px]"
            />
          ),
        )}
      </div>

      <div className="mt-6 hidden rounded-[18px] border border-[#E2E8F0] bg-white p-5 lg:block">
        <Skeleton className="h-10 w-full rounded-lg" />

        {Array.from({
          length: 6,
        }).map(
          (_, index) => (
            <Skeleton
              key={index}
              className="mt-3 h-16 w-full rounded-lg"
            />
          ),
        )}
      </div>
    </div>
  );
}
