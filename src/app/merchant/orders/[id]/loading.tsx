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

export default function MerchantOrderDetailLoading() {
  return (
    <div className="mx-auto w-full max-w-[1120px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
      <Skeleton className="h-10 w-40 rounded-xl" />

      <Skeleton className="mt-5 h-10 w-72 rounded-xl" />
      <Skeleton className="mt-3 h-4 w-96 max-w-full rounded" />

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Skeleton className="h-[520px] rounded-[20px]" />

        <div className="space-y-5">
          <Skeleton className="h-[260px] rounded-[20px]" />
          <Skeleton className="h-[210px] rounded-[20px]" />
        </div>
      </div>
    </div>
  );
}
