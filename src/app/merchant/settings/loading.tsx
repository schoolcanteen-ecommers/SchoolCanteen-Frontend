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

export default function MerchantSettingsLoading() {
  return (
    <div className="mx-auto w-full max-w-[1040px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <Skeleton className="h-10 w-44 rounded-xl" />
      <Skeleton className="mt-3 h-4 w-72 rounded" />

      <div className="mt-7 space-y-5">
        <Skeleton className="h-40 rounded-[18px]" />
        <Skeleton className="h-56 rounded-[18px]" />
        <Skeleton className="h-36 rounded-[18px]" />
      </div>
    </div>
  );
}
