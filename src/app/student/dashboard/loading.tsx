function SkeletonBlock({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse bg-[#E9EEF2] ${className}`}
    />
  );
}

export default function StudentDashboardLoading() {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 pb-10 pt-5 sm:px-6 sm:pt-7 lg:px-8 lg:pb-16 lg:pt-9">
      <header>
        <SkeletonBlock className="h-4 w-32 rounded-md" />

        <SkeletonBlock className="mt-3 h-9 w-52 rounded-lg" />

        <SkeletonBlock className="mt-3 h-4 w-64 max-w-full rounded-md" />
      </header>

      <div className="mt-5 grid gap-4 lg:grid-cols-12 lg:gap-5">
        <section className="h-[190px] animate-pulse rounded-[22px] bg-[#DCE5EB] lg:col-span-7" />

        <section className="h-[190px] rounded-[22px] border border-[#E1E7EC] bg-white p-5 lg:col-span-5">
          <SkeletonBlock className="h-5 w-32 rounded-md" />

          <div className="mt-5 flex items-center gap-3">
            <SkeletonBlock className="size-14 shrink-0 rounded-xl" />

            <div className="min-w-0 flex-1">
              <SkeletonBlock className="h-4 w-3/4 rounded-md" />
              <SkeletonBlock className="mt-2 h-3 w-1/2 rounded-md" />
              <SkeletonBlock className="mt-3 h-3 w-2/3 rounded-md" />
            </div>
          </div>
        </section>

        <section className="rounded-[20px] border border-[#E1E7EC] bg-white p-5 lg:col-span-12">
          <SkeletonBlock className="h-5 w-28 rounded-md" />

          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {Array.from({
              length: 4,
            }).map(
              (_, index) => (
                <SkeletonBlock
                  key={
                    index
                  }
                  className="h-20 rounded-2xl"
                />
              ),
            )}
          </div>
        </section>

        <section className="lg:col-span-8">
          <SkeletonBlock className="h-6 w-28 rounded-md" />

          <div className="mt-4 flex gap-3 overflow-hidden">
            {Array.from({
              length: 4,
            }).map(
              (_, index) => (
                <SkeletonBlock
                  key={
                    index
                  }
                  className="h-44 min-w-[145px] rounded-2xl lg:flex-1"
                />
              ),
            )}
          </div>
        </section>

        <section className="rounded-[20px] border border-[#E1E7EC] bg-white p-5 lg:col-span-4">
          <SkeletonBlock className="h-6 w-32 rounded-md" />

          {Array.from({
            length: 3,
          }).map(
            (_, index) => (
              <div
                key={
                  index
                }
                className="mt-4 flex items-center gap-3"
              >
                <SkeletonBlock className="size-10 shrink-0 rounded-full" />

                <div className="flex-1">
                  <SkeletonBlock className="h-4 w-3/4 rounded-md" />
                  <SkeletonBlock className="mt-2 h-3 w-1/2 rounded-md" />
                </div>
              </div>
            ),
          )}
        </section>
      </div>
    </div>
  );
}
