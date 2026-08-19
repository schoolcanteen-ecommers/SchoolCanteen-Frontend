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

export default function StudentWalletLoading() {
  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:py-12">
      <Skeleton className="h-8 w-40 rounded-lg" />
      <Skeleton className="mt-3 h-4 w-64 rounded" />

      <Skeleton className="mt-7 h-48 rounded-[22px]" />

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-52 rounded-[20px]" />
        <Skeleton className="h-52 rounded-[20px]" />
      </div>

      <Skeleton className="mt-5 h-80 rounded-[20px]" />
    </div>
  );
}
