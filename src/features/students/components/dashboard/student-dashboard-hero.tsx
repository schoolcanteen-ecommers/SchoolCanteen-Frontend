interface StudentDashboardHeroProps {
  name: string;
}

<<<<<<< HEAD
const DASHBOARD_HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCVtp0XX_todDua5dEj2WhGvt_hTex7OH9JiulFjtu0i10-ko9gtQKf-tv-XWM64b9-qWdHfFNILqAoa8qwEcVAJiEA9X5CxxOgxs0bhrHOiHDX3chIqdecl--wMh1WupzZUzhYCRt2iKLawpH6PcidEHRxsinQmHWgCuUKzet9EJNE3AKJ4XYUIhxaqQsj0vsik9VHznTRLpYYvrQ3qj4F74p_4h2D16dTzmw8Eenq4SAbpr8K4sU";
=======
function getFirstName(
  name: string,
) {
  return (
    name
      .trim()
      .split(/\s+/)[0] ||
    name
  );
}
>>>>>>> source/main

export function StudentDashboardHero({
  name,
}: StudentDashboardHeroProps) {
<<<<<<< HEAD
  return (
    <section className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-16">
      <div className="max-w-[590px]">
        <h1 className="font-heading text-[34px] font-bold leading-[1.12] text-navy-steel sm:text-4xl lg:text-[52px]">
          Halo, {name} 👋
        </h1>

        <p className="mt-2 font-heading text-[22px] font-semibold leading-[1.25] text-[#191C1E] md:font-sans md:text-2xl lg:mt-3 lg:text-[28px] lg:leading-[1.3]">
          Siap memenuhi kebutuhan sekolah hari ini?
        </p>

        <p className="mt-2 max-w-lg text-base leading-6 text-[#536069] lg:mt-4 lg:text-lg lg:leading-7">
          Pesan makanan kantin dan kebutuhan sekolah dengan lebih mudah.
        </p>
      </div>

      <div
        className="hidden aspect-square w-full max-w-[440px] justify-self-end rounded-[24px] bg-arctic-blue bg-cover bg-center lg:block"
        style={{
          backgroundImage: `url(${DASHBOARD_HERO_IMAGE})`,
        }}
        role="img"
        aria-label="Ilustrasi siswa menggunakan SchoolCanteen"
      />
    </section>
=======
  const firstName =
    getFirstName(
      name,
    );

  return (
    <header className="px-0.5">
      <p className="text-[13px] font-medium text-[#68757E]">
        Selamat datang kembali
      </p>

      <h1 className="mt-1 font-heading text-[30px] font-bold leading-[1.1] tracking-[-0.025em] text-navy-steel sm:text-[36px] lg:text-[42px]">
        Halo, {firstName} 👋
      </h1>

      <p className="mt-2 max-w-xl text-[14px] leading-5 text-[#536069] sm:text-[15px]">
        Mau jajan atau cek pesanan hari ini?
      </p>
    </header>
>>>>>>> source/main
  );
}
