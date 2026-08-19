interface PublicCatalogIntroProps {
  title: string;
  description: string;
}

export function PublicCatalogIntro({
  title,
  description,
}: PublicCatalogIntroProps) {
  return (
    <section className="border-b border-[#E1EDF5] bg-white">
      <div className="mx-auto max-w-[1120px] px-4 pb-5 pt-5 sm:px-6 sm:pb-7 sm:pt-8 md:px-8 lg:pb-8 lg:pt-9">
        <h1 className="max-w-2xl font-heading text-[28px] font-bold leading-[1.08] tracking-tight text-navy-steel sm:text-[34px] lg:text-[40px]">
          {title}
        </h1>

        <p className="mt-2 max-w-2xl text-[13px] leading-5 text-muted-foreground sm:text-[15px] sm:leading-6">
          {description}
        </p>
      </div>
    </section>
  );
}
