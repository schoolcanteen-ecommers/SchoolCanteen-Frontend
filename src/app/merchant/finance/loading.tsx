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

export default function MerchantFinanceLoading() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
      <Skeleton className="h-10 w-48 rounded-xl" />
      <Skeleton className="mt-3 h-4 w-80 max-w-full rounded" />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-28 rounded-[18px]"
          />
        ))}
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Skeleton className="h-[420px] rounded-[18px]" />
        <Skeleton className="h-[420px] rounded-[18px]" />
      </div>
    </div>
  );
}
