function ProductSkeleton() {
  return (
    <div className="w-[62vw] min-w-[190px] max-w-[232px] shrink-0 overflow-hidden rounded-[16px] border border-[#DCEAF3] bg-white sm:w-auto sm:min-w-0 sm:max-w-none">
      <div className="h-[132px] animate-pulse bg-[#EAF4FA] sm:h-40" />

      <div className="space-y-3 p-3.5">
        <div className="h-4 w-14 animate-pulse rounded bg-[#EAF4FA]" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-[#EAF4FA]" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-[#EEF4F7]" />

        <div className="flex items-center justify-between pt-2">
          <div className="h-4 w-20 animate-pulse rounded bg-[#EAF4FA]" />
          <div className="size-9 animate-pulse rounded-full bg-[#DCEAF3]" />
        </div>
      </div>
    </div>
  );
}

function SectionSkeleton() {
  return (
    <section className="py-7 sm:py-9">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6 md:px-8">
        <div className="mb-4 space-y-2">
          <div className="h-6 w-40 animate-pulse rounded bg-[#DCEAF3]" />
          <div className="h-3 w-56 animate-pulse rounded bg-[#E7F0F5]" />
        </div>

        <div className="no-scrollbar -mx-4 flex gap-3 overflow-hidden px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({
            length: 4,
          }).map(
            (_, index) => (
              <ProductSkeleton
                key={index}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}

export function PublicHomeFeedSkeleton() {
  return (
    <div aria-hidden="true">
      <SectionSkeleton />
      <SectionSkeleton />
    </div>
  );
}
