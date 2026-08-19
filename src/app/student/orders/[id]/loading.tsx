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

export default function StudentOrderDetailLoading() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-5 pb-28 pt-6 sm:px-6 lg:px-10 lg:py-12">
      <Skeleton className="h-5 w-28 rounded" />
      <Skeleton className="mt-4 h-9 w-56 rounded-lg" />
      <Skeleton className="mt-2 h-4 w-36 rounded" />

      <div className="mt-7 grid gap-5 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-7">
          <Skeleton className="h-56 rounded-[20px]" />
          <Skeleton className="h-64 rounded-[20px]" />
          <Skeleton className="h-48 rounded-[20px]" />
        </div>

        <div className="space-y-5 lg:col-span-5">
          <Skeleton className="h-72 rounded-[20px]" />
          <Skeleton className="h-44 rounded-[20px]" />
        </div>
      </div>
    </div>
  );
}
