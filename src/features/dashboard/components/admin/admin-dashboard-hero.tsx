interface AdminDashboardHeroProps {
  adminName: string;
}

const HERO_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA8YSHXZCx30FGtKChkGNYNRbI9qxQzDm02JTD4vFNy4D2ojbU17Ql-tAcIDZs43fcny_gKWFmahz-SaPX_LszqVXubNT6D4m_cnp1dUHgWLcLrxflNLYFMNx3Viu_FDAWGvOl_ebZ7yV9xj7B_Er6Q-4q2rpPAPOFftsIjlKnwi6ZB5LPm5Ffe4AtnWK_9Rc6w7gAdu06T9Awfvv3SCo72AZ9rWk-M3U1ImZOUy05dbcmeqv44oos";

export function AdminDashboardHero({
  adminName,
}: AdminDashboardHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[24px] border border-[#DCE8F0] bg-gradient-to-r from-arctic-blue to-white px-6 py-7 shadow-[0_12px_32px_rgba(13,27,42,0.025)] sm:px-8 sm:py-8">
      <div className="relative z-10 max-w-[620px]">
        <h2 className="font-heading text-[28px] font-bold leading-[1.2] text-navy-steel sm:text-[32px]">
          Selamat datang kembali, {adminName} 👋
        </h2>
        <p className="mt-2 text-base text-[#59666F] sm:text-lg">
          Pantau aktivitas SchoolCanteen dalam satu dashboard.
        </p>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 hidden w-[34%] bg-cover bg-left bg-no-repeat opacity-85 xl:block"
        style={{
          backgroundImage:
            `url('${HERO_IMAGE_URL}')`,
        }}
      />
    </section>
  );
}
