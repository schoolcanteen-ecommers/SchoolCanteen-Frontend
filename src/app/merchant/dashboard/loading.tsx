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

export default function MerchantDashboardLoading() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
      <div>
        <Skeleton className="h-9 w-56 rounded-lg" />

        <Skeleton className="mt-3 h-4 w-72 max-w-full rounded" />
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({
          length: 4,
        }).map(
          (_, index) => (
            <Skeleton
              key={index}
              className="h-[118px] rounded-[18px]"
            />
          ),
        )}
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-12">
        <Skeleton className="h-[360px] rounded-[20px] xl:col-span-8" />

        <Skeleton className="h-[360px] rounded-[20px] xl:col-span-4" />
      </div>
    </div>
  );
}
