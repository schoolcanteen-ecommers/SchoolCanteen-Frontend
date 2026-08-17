"use client";

import {
  Pencil,
} from "lucide-react";

import {
  useStudentProfileEdit,
} from "@/features/students/components/profile/student-profile-edit-provider";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface StudentProfileHeroProps {
  name: string;
  className: string;
  avatarUrl: string | null;
  initials: string;
}

export function StudentProfileHero({
  name,
  className,
  avatarUrl,
  initials,
}: StudentProfileHeroProps) {
  const { startEditing } =
    useStudentProfileEdit();

  function handleEditProfile() {
    startEditing();

    window.requestAnimationFrame(() => {
      document
        .getElementById(
          "student-profile-information",
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    });
  }

  return (
    <section className="relative -mx-4 overflow-hidden bg-gradient-to-b from-white to-[#E6F4FF]/35 px-4 pb-10 pt-6 sm:-mx-6 sm:px-6 lg:mx-0 lg:rounded-[24px] lg:border lg:border-[#0D1B2A]/[0.08] lg:bg-white lg:p-10 lg:shadow-[0_12px_32px_rgba(13,27,42,0.08)]">
      <div className="flex flex-col items-center text-center lg:flex-row lg:gap-10 lg:text-left">
        <div className="relative shrink-0">
          <Avatar className="size-28 border-4 border-white shadow-[0_12px_32px_rgba(13,27,42,0.10)] lg:size-28">
            {avatarUrl ? (
              <AvatarImage
                src={avatarUrl}
                alt={`Foto profil ${name}`}
              />
            ) : null}

            <AvatarFallback className="bg-[#E6F4FF] text-xl font-semibold text-navy-steel">
              {initials}
            </AvatarFallback>
          </Avatar>

          <button
            type="button"
            disabled
            title="Edit foto profil belum tersedia"
            aria-label="Edit foto profil belum tersedia"
            className="absolute bottom-0 right-0 flex size-10 cursor-not-allowed items-center justify-center rounded-full border border-[#0D1B2A]/10 bg-[#E6F4FF] text-navy-steel shadow-md lg:hidden"
          >
            <Pencil className="size-4" />
          </button>
        </div>

        <div className="mt-6 min-w-0 lg:mt-0">
          <h2 className="font-heading text-[36px] font-bold leading-tight text-navy-steel lg:text-3xl">
            {name}
          </h2>

          <p className="mt-2 text-lg text-[#44474C] lg:hidden">
            {className}
            <span className="mx-2">•</span>
            Student
          </p>

          <p className="mt-2 hidden text-base text-[#44474C] lg:block">
            Siswa
            <span className="mx-2 text-[#C4C6CC]">•</span>
            {className}
          </p>

          <button
            type="button"
            onClick={handleEditProfile}
            className="mt-5 rounded-xl border border-navy-steel px-6 py-2.5 text-sm font-medium text-navy-steel transition-colors hover:bg-[#E6F4FF] lg:hidden"
          >
            Edit Profil
          </button>
        </div>
      </div>
    </section>
  );
}
