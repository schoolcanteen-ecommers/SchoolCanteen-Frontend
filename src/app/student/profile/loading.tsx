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

export default function StudentProfileLoading() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pb-28 pt-5 sm:px-6 lg:px-10 lg:py-12">
      <div className="flex flex-col items-center">
        <Skeleton className="size-24 rounded-full" />
        <Skeleton className="mt-4 h-7 w-44 rounded-lg" />
        <Skeleton className="mt-2 h-4 w-28 rounded" />
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-12">
        <Skeleton className="h-80 rounded-[20px] lg:col-span-8" />
        <Skeleton className="h-48 rounded-[20px] lg:col-span-4" />
      </div>
    </div>
  );
}
