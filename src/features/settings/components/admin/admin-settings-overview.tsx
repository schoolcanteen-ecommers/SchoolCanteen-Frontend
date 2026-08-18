import {
  Info,
  LockKeyhole,
  Pencil,
  UserRound,
} from "lucide-react";
import type {
  LucideIcon,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  AdminLogoutButton,
} from "@/features/auth/components/admin-logout-button";

import type {
  UserProfile,
} from "@/types/profile";

interface AdminSettingsOverviewProps {
  profile: UserProfile;
  email: string | null;
  version: string;
}

const UNSUPPORTED_ADMIN_ACTION =
  "Belum didukung untuk akun Admin";

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function DisplayValue({
  value,
}: {
  value?: string | null;
}) {
  return (
    <span className="text-right text-sm font-semibold text-navy-steel sm:text-base">
      {value?.trim() || "Belum tersedia"}
    </span>
  );
}

export function AdminSettingsOverview({
  profile,
  email,
  version,
}: AdminSettingsOverviewProps) {
  const initials =
    getInitials(profile.name) || "A";

  return (
    <div className="mx-auto w-full max-w-[1200px] px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
      <header>
        <h1 className="font-heading text-[30px] font-bold leading-[38px] tracking-[-0.02em] text-navy-steel max-sm:text-[26px] max-sm:leading-8">
          Settings
        </h1>

        <p className="mt-1.5 text-sm text-[#536069] sm:text-base">
          Kelola informasi akun admin dan pengaturan dasar SchoolCanteen.
        </p>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-stretch">
        <section className="flex min-h-full flex-col rounded-[18px] border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.02)] sm:p-6">
          <h2 className="hidden border-b border-[#E2E8F0] pb-3 text-lg font-semibold text-navy-steel lg:block">
            Admin Profile
          </h2>

          <div className="relative flex flex-col items-center pt-2 text-center lg:flex-row lg:items-center lg:gap-6 lg:pt-6 lg:text-left">
            <div className="relative">
              <Avatar className="size-20 border-4 border-white bg-[#F2F4F6] shadow-sm lg:size-24">
                {profile.avatar_url ? (
                  <AvatarImage
                    src={profile.avatar_url}
                    alt={`${profile.name} avatar`}
                  />
                ) : null}

                <AvatarFallback className="bg-[#F2F4F6] text-lg font-bold text-navy-steel">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <button
                type="button"
                disabled
                title={UNSUPPORTED_ADMIN_ACTION}
                aria-label="Edit foto profil belum tersedia"
                className="absolute bottom-0 right-0 flex size-7 cursor-not-allowed items-center justify-center rounded-full bg-navy-steel text-white shadow-md disabled:opacity-70 lg:hidden"
              >
                <Pencil className="size-3.5" />
              </button>
            </div>

            <div className="mt-4 lg:mt-0">
              <h3 className="font-heading text-2xl font-semibold text-navy-steel">
                {profile.name}
              </h3>

              <span className="mt-1.5 inline-flex rounded-full bg-[#E6F4FF] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-navy-steel">
                Admin
              </span>

              <p className="mt-3 text-sm text-[#536069] lg:hidden">
                {email ?? "Belum tersedia"}
              </p>

              <p className="mt-1 text-sm text-[#536069] lg:hidden">
                {profile.phone ?? "Belum tersedia"}
              </p>
            </div>
          </div>

          <div className="mt-8 hidden flex-1 space-y-4 lg:block">
            <ProfileRow
              label="Name"
              value={profile.name}
            />
            <ProfileRow
              label="Email"
              value={email}
            />
            <ProfileRow
              label="Phone"
              value={profile.phone}
            />
            <ProfileRow
              label="Role"
              value="Admin"
            />
          </div>

          <button
            type="button"
            disabled
            title={UNSUPPORTED_ADMIN_ACTION}
            className="mt-6 w-full cursor-not-allowed rounded-xl border border-navy-steel px-4 py-3 text-xs font-bold uppercase tracking-[0.05em] text-navy-steel disabled:opacity-60 lg:mt-auto lg:py-2.5 lg:text-sm lg:normal-case lg:tracking-normal"
          >
            Edit Profile
          </button>
        </section>

        <div className="flex flex-col gap-6">
          <section className="rounded-[18px] border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.02)] sm:p-6">
            <h2 className="border-b border-[#E2E8F0] pb-3 text-lg font-semibold text-navy-steel">
              Account Information
            </h2>

            <div className="mt-5 space-y-5">
              <AccountField
                icon={UserRound}
                label="Email"
                value={email ?? "Belum tersedia"}
              />

              <AccountField
                icon={LockKeyhole}
                label="Password"
                value="••••••••"
                isSecret
              />
            </div>

            <button
              type="button"
              disabled
              title={UNSUPPORTED_ADMIN_ACTION}
              className="mt-6 w-full cursor-not-allowed rounded-xl bg-[#E6F4FF] px-4 py-3 text-xs font-bold uppercase tracking-[0.05em] text-navy-steel disabled:opacity-60 lg:w-auto lg:py-2.5 lg:text-sm lg:normal-case lg:tracking-normal"
            >
              Change Password
            </button>
          </section>

          <section className="rounded-[18px] border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.02)] sm:p-6">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h2 className="text-lg font-semibold text-navy-steel">
                Application Information
              </h2>

              <Info className="size-5 text-[#74777D]" />
            </div>

            <div className="mt-2 divide-y divide-[#E2E8F0] lg:grid lg:grid-cols-3 lg:divide-y-0">
              <ApplicationRow
                label="Application Name"
                value="SchoolCanteen"
              />
              <ApplicationRow
                label="School Name"
                value="Belum tersedia"
              />
              <ApplicationRow
                label="Version"
                value={`v${version}`}
              />
            </div>
          </section>

          <section className="mt-auto rounded-[18px] border border-[#FDE2E2] bg-white p-5 text-center shadow-[0_4px_12px_rgba(0,0,0,0.02)] sm:p-6 lg:text-left">
            <div className="lg:flex lg:items-center lg:justify-between lg:gap-6">
              <div>
                <h2 className="text-lg font-semibold text-[#991B1B] lg:border-b-0">
                  Sign Out
                </h2>
                <p className="mt-1 text-sm text-[#536069]">
                  Keluar dengan aman dari sesi saat ini pada perangkat ini.
                </p>
              </div>

              <div className="mt-5 lg:mt-0 lg:w-[150px]">
                <AdminLogoutButton className="justify-center rounded-xl border border-[#FCA5A5] bg-[#FEF2F2] px-4 py-3 text-xs font-bold uppercase tracking-[0.05em] hover:bg-[#FEE2E2] lg:py-2.5 lg:text-sm lg:normal-case lg:tracking-normal" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function ProfileRow({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-[#F2F4F6] pb-3 last:border-0">
      <span className="text-sm text-[#536069]">
        {label}
      </span>

      <DisplayValue value={value} />
    </div>
  );
}

function AccountField({
  icon: Icon,
  label,
  value,
  isSecret = false,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  isSecret?: boolean;
}) {
  return (
    <div className="border-b border-[#E2E8F0] pb-4 last:border-0 last:pb-0 lg:border-0 lg:pb-0">
      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.05em] text-[#536069]">
        <Icon className="hidden size-4 lg:block" />
        {label}
      </label>

      <div
        className={`mt-2 text-base text-navy-steel lg:rounded-xl lg:border lg:border-[#C4C6CC] lg:bg-[#F2F4F6] lg:px-4 lg:py-2.5 lg:text-sm ${
          isSecret ? "tracking-[0.2em]" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function ApplicationRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 lg:block lg:px-3 lg:py-4 first:lg:pl-0 last:lg:pr-0">
      <span className="text-sm text-[#536069] lg:block lg:text-xs lg:font-bold lg:uppercase lg:tracking-[0.05em]">
        {label}
      </span>
      <span className="text-right text-sm font-semibold text-navy-steel lg:mt-2 lg:block lg:text-left">
        {value}
      </span>
    </div>
  );
}
