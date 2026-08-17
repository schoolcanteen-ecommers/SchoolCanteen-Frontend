import {
  StudentProfileEditProvider,
} from "@/features/students/components/profile/student-profile-edit-provider";
import {
  StudentProfileHero,
} from "@/features/students/components/profile/student-profile-hero";
import {
  StudentProfileInformation,
} from "@/features/students/components/profile/student-profile-information";
import {
  StudentProfileLogoutButton,
} from "@/features/students/components/profile/student-profile-logout-button";
import {
  StudentProfileSettings,
} from "@/features/students/components/profile/student-profile-settings";
import {
  StudentProfileWallet,
} from "@/features/students/components/profile/student-profile-wallet";

import {
  getStudentProfile,
} from "@/lib/api/student-profile";
import {
  getStudentWallet,
} from "@/lib/api/student-wallet";
import {
  createClient,
} from "@/lib/supabase/server";

export default async function StudentProfilePage() {
  const supabase =
    await createClient();

  const [
    profile,
    wallet,
    authResult,
  ] = await Promise.all([
    getStudentProfile(),
    getStudentWallet(),
    supabase.auth.getUser(),
  ]);

  const email =
    authResult.data.user?.email ??
    null;

  const initials =
    profile.name
      .split(" ")
      .filter(Boolean)
      .map((word) =>
        word.charAt(0),
      )
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const className =
    profile.studentProfile
      ?.className ?? null;

  const classDisplay =
    className ?? "Belum tersedia";

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pb-28 pt-4 sm:px-6 lg:px-10 lg:pb-16 lg:pt-14">
      <StudentProfileEditProvider>
        <header className="hidden lg:block">
        <h1 className="font-heading text-5xl font-bold leading-[1.1] tracking-[-0.02em] text-navy-steel">
          Profil Saya
        </h1>

        <p className="mt-3 text-lg text-[#536069]">
          Kelola informasi akun dan pengaturan profil kamu.
        </p>
        </header>

        <div className="lg:mt-16">
        <StudentProfileHero
          name={profile.name}
          className={classDisplay}
          avatarUrl={profile.avatarUrl}
          initials={initials}
        />
        </div>

        <div className="mt-6 grid items-start gap-6 lg:mt-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <StudentProfileInformation
            name={profile.name}
            nis={
              profile.studentProfile
                ?.nis ?? null
            }
            className={className}
            email={email}
            phone={profile.phone}
          />
        </div>

        <div className="lg:col-span-4 lg:col-start-9 lg:row-start-1">
          <StudentProfileWallet
            balance={wallet.balance}
          />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-8 lg:row-start-2">
          <StudentProfileSettings />

          <div className="border-t border-[#E0E3E5] pt-6 lg:pt-10">
            <StudentProfileLogoutButton />
          </div>
        </div>
      </div>
      </StudentProfileEditProvider>
    </div>
  );
}
