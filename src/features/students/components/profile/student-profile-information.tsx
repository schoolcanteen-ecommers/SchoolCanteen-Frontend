"use client";

import {
  Pencil,
  X,
} from "lucide-react";

import {
  StudentProfileEditForm,
} from "@/features/students/components/profile/student-profile-edit-form";
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
    startEditing,
    stopEditing,
  } = useStudentProfileEdit();

  return (
    <section
      id="student-profile-information"
      className="scroll-mt-28 rounded-[24px] border border-white/50 bg-white p-6 shadow-[0_12px_32px_rgba(13,27,42,0.04)] lg:rounded-[18px] lg:border-[#0D1B2A]/[0.08] lg:shadow-none"
    >
      <div className="mb-6 flex items-center justify-between border-b border-[#E0E3E5] pb-5">
        <h2 className="font-heading text-2xl font-semibold text-navy-steel lg:font-sans lg:text-base lg:font-semibold">
          {isEditing
            ? "Edit Informasi Siswa"
            : "Informasi Siswa"}
        </h2>

        {isEditing ? (
          <button
            type="button"
            onClick={stopEditing}
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
    </section>
  );
}
