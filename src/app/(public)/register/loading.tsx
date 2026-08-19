export default function LoginLoading() {
  return (
    <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 gap-7 px-4 pb-10 pt-6 sm:px-6 sm:pt-8 lg:grid-cols-[1fr_460px] lg:gap-8 lg:px-8 lg:py-12">
      <div className="hidden min-h-[580px] animate-pulse rounded-[28px] bg-arctic-blue/65 lg:block" />

      <div className="rounded-[24px] border border-arctic-blue bg-white p-5 sm:p-8 lg:p-9">
        <div className="h-3 w-24 animate-pulse rounded bg-arctic-blue" />

        <div className="mt-4 h-9 w-64 max-w-full animate-pulse rounded-lg bg-arctic-blue" />

        <div className="mt-3 h-4 w-52 animate-pulse rounded bg-arctic-blue/60" />

        <div className="mt-8 space-y-5">
          <div className="h-[52px] animate-pulse rounded-[14px] bg-arctic-blue/55" />

          <div className="h-[52px] animate-pulse rounded-[14px] bg-arctic-blue/55" />

          <div className="ml-auto h-4 w-28 animate-pulse rounded bg-arctic-blue/55" />

          <div className="h-[52px] animate-pulse rounded-[14px] bg-navy-steel/20" />
        </div>

        <div className="mx-auto mt-6 h-4 w-48 animate-pulse rounded bg-arctic-blue/55" />
      </div>
    </div>
  );
}
