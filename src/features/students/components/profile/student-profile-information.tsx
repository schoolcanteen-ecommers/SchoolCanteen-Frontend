"use client";

<<<<<<< HEAD
import {
  Pencil,
=======
import type {
  LucideIcon,
} from "lucide-react";

import {
  GraduationCap,
  IdCard,
  Mail,
  Phone,
  UserRound,
>>>>>>> source/main
  X,
} from "lucide-react";

import {
  StudentProfileEditForm,
} from "@/features/students/components/profile/student-profile-edit-form";
<<<<<<< HEAD
=======

>>>>>>> source/main
import {
  useStudentProfileEdit,
} from "@/features/students/components/profile/student-profile-edit-provider";

interface StudentProfileInformationProps {
  name: string;
  nis: string | null;
  className: string | null;
  email: string | null;
  phone: string | null;
}

<<<<<<< HEAD
interface InformationRowProps {
  label: string;
  value: string | null;
  desktopOnly?: boolean;
}

function InformationRow({
  label,
  value,
  desktopOnly = false,
}: InformationRowProps) {
  return (
    <div
      className={`py-5 first:pt-0 last:pb-0 md:flex md:items-center md:justify-between md:gap-6 ${
        desktopOnly
          ? "hidden md:flex"
          : ""
      }`}
    >
      <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#536069] md:text-sm md:font-normal md:normal-case md:tracking-normal">
        {label}
      </span>

      <p className="mt-2 break-words text-base font-medium text-navy-steel md:mt-0 md:text-right">
        {value ?? "Belum tersedia"}
      </p>
=======
interface InformationItemProps {
  label: string;
  value: string | null;
  icon: LucideIcon;
}

function InformationItem({
  label,
  value,
  icon: Icon,
}: InformationItemProps) {
  return (
    <div className="flex min-h-[72px] items-start gap-3 py-4 first:pt-0 last:pb-0">
      <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#F1F6F9] text-navy-steel">
        <Icon className="size-[18px]" />
      </div>

      <div className="min-w-0">
        <dt className="text-[11px] font-semibold uppercase tracking-[0.07em] text-[#74818A]">
          {label}
        </dt>

        <dd className="mt-1 break-words text-[15px] font-semibold leading-5 text-navy-steel">
          {value?.trim() ||
            "Belum tersedia"}
        </dd>
      </div>
>>>>>>> source/main
    </div>
  );
}

export function StudentProfileInformation({
  name,
  nis,
  className,
  email,
  phone,
}: StudentProfileInformationProps) {
  const {
    isEditing,
<<<<<<< HEAD
    startEditing,
    stopEditing,
  } = useStudentProfileEdit();
=======
    stopEditing,
  } =
    useStudentProfileEdit();
>>>>>>> source/main

  return (
    <section
      id="student-profile-information"
<<<<<<< HEAD
      className="scroll-mt-28 rounded-[24px] border border-white/50 bg-white p-6 shadow-[0_12px_32px_rgba(13,27,42,0.04)] lg:rounded-[18px] lg:border-[#0D1B2A]/[0.08] lg:shadow-none"
    >
      <div className="mb-6 flex items-center justify-between border-b border-[#E0E3E5] pb-5">
        <h2 className="font-heading text-2xl font-semibold text-navy-steel lg:font-sans lg:text-base lg:font-semibold">
          {isEditing
            ? "Edit Informasi Siswa"
            : "Informasi Siswa"}
        </h2>
=======
      className="scroll-mt-28 rounded-[20px] border border-[#E1E8ED] bg-white p-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-navy-steel">
            {isEditing
              ? "Edit Profil"
              : "Informasi Akun"}
          </h2>

          <p className="mt-1 text-[13px] leading-5 text-[#68757E]">
            {isEditing
              ? "Perbarui informasi yang dapat kamu kelola."
              : "Data pribadi dan informasi siswa kamu."}
          </p>
        </div>
>>>>>>> source/main

        {isEditing ? (
          <button
            type="button"
            onClick={stopEditing}
<<<<<<< HEAD
            aria-label="Batalkan edit profil"
            className="hidden items-center gap-2 rounded-xl border border-[#C4C6CC] px-4 py-2 text-sm font-semibold text-navy-steel transition-colors hover:border-navy-steel hover:bg-[#F7F9FB] lg:flex"
          >
            <X className="size-4" />
            Batal
          </button>
        ) : (
          <button
            type="button"
            onClick={startEditing}
            className="hidden items-center gap-2 rounded-xl border border-navy-steel px-4 py-2 text-sm font-semibold text-navy-steel transition-colors hover:bg-[#E6F4FF] lg:flex"
          >
            <Pencil className="size-4" />
            Edit Profil
          </button>
        )}
      </div>

      {isEditing ? (
        <StudentProfileEditForm
          name={name}
          nis={nis}
          className={className}
          phone={phone}
          onCancel={stopEditing}
        />
      ) : (
        <div className="divide-y divide-[#E0E3E5]/70">
          <InformationRow
            label="Nama Lengkap"
            value={name}
          />
          <InformationRow
            label="NIS"
            value={nis}
          />
          <InformationRow
            label="Kelas"
            value={className}
          />
          <InformationRow
            label="Email"
            value={email}
          />
          <InformationRow
            label="No. Telepon"
            value={phone}
            desktopOnly
          />
        </div>
      )}
=======
            aria-label="Tutup edit profil"
            className="flex size-11 shrink-0 items-center justify-center rounded-xl text-[#5F6D76] transition-colors hover:bg-[#F2F5F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-steel"
          >
            <X className="size-5" />
          </button>
        ) : null}
      </div>

      <div className="mt-5 border-t border-[#E6EBEE] pt-5">
        {isEditing ? (
          <StudentProfileEditForm
            name={name}
            nis={nis}
            className={
              className
            }
            phone={phone}
            onCancel={
              stopEditing
            }
          />
        ) : (
          <dl className="divide-y divide-[#E8EDF0] md:grid md:grid-cols-2 md:gap-x-8 md:divide-y-0">
            <InformationItem
              label="Nama Lengkap"
              value={name}
              icon={UserRound}
            />

            <InformationItem
              label="NIS"
              value={nis}
              icon={IdCard}
            />

            <InformationItem
              label="Kelas"
              value={
                className
              }
              icon={
                GraduationCap
              }
            />

            <InformationItem
              label="Email"
              value={email}
              icon={Mail}
            />

            <InformationItem
              label="No. Telepon"
              value={phone}
              icon={Phone}
            />
          </dl>
        )}
      </div>
>>>>>>> source/main
    </section>
  );
}
