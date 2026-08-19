"use client";

import {
<<<<<<< HEAD
=======
  GraduationCap,
>>>>>>> source/main
  Pencil,
} from "lucide-react";

import {
<<<<<<< HEAD
  useStudentProfileEdit,
} from "@/features/students/components/profile/student-profile-edit-provider";

import {
=======
>>>>>>> source/main
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

<<<<<<< HEAD
=======
import {
  useStudentProfileEdit,
} from "@/features/students/components/profile/student-profile-edit-provider";

>>>>>>> source/main
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
<<<<<<< HEAD
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
=======
  const {
    isEditing,
    startEditing,
  } =
    useStudentProfileEdit();

  return (
    <section className="rounded-[20px] border border-[#E1E8ED] bg-white p-5 sm:p-6 lg:p-7">
      <div className="flex items-center gap-4 sm:gap-5">
        <Avatar className="size-[72px] shrink-0 border border-[#DCE7EE] bg-[#F3F7F9] sm:size-20 lg:size-24">
          {avatarUrl ? (
            <AvatarImage
              src={avatarUrl}
              alt={`Foto profil ${name}`}
              className="object-cover"
            />
          ) : null}

          <AvatarFallback className="bg-arctic-blue text-xl font-bold text-navy-steel sm:text-2xl">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#74818A]">
            Profil siswa
          </p>

          <h1 className="mt-1 truncate font-heading text-[25px] font-bold leading-tight tracking-[-0.02em] text-navy-steel sm:text-[30px]">
            {name}
          </h1>

          <div className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-[#5F6D76]">
            <GraduationCap className="size-4" />

            <span className="truncate">
              {className}
            </span>
          </div>
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={startEditing}
            aria-label="Edit profil"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#CFD9DF] bg-white px-3.5 text-sm font-semibold text-navy-steel transition-colors hover:bg-[#F4F8FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-steel focus-visible:ring-offset-2"
          >
            <Pencil className="size-4" />

            <span className="hidden sm:inline">
              Edit Profil
            </span>

            <span className="sm:hidden">
              Edit
            </span>
          </button>
        ) : null}
>>>>>>> source/main
      </div>
    </section>
  );
}
