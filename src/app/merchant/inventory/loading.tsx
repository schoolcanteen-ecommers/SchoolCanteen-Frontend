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

export default function MerchantInventoryLoading() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-6 lg:py-10">
      <Skeleton className="h-10 w-56 rounded-xl" />
      <Skeleton className="mt-3 h-4 w-80 max-w-full rounded" />

      <div className="mt-7 grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-28 rounded-[18px]"
          />
        ))}
      </div>

      <Skeleton className="mt-6 h-14 rounded-[18px]" />
      <Skeleton className="mt-4 h-[360px] rounded-[18px]" />
    </div>
  );
}
