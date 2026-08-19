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

export default function MerchantPickupLoading() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
      <Skeleton className="h-9 w-56 rounded-lg" />
      <Skeleton className="mt-3 h-4 w-80 max-w-full rounded" />

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
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

      <div className="mt-6 grid gap-5 xl:grid-cols-12">
        <Skeleton className="h-[420px] rounded-[20px] xl:col-span-7" />

        <Skeleton className="h-[420px] rounded-[20px] xl:col-span-5" />
      </div>
    </div>
  );
}
