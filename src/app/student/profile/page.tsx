import {
  BookOpen,
  GraduationCap,
  IdCard,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  PageHeader,
} from "@/components/shared/page-header";

import {
  studentProfile,
  studentUserProfile,
} from "@/mocks/profile";

export default function StudentProfilePage() {
  const initials =
    studentUserProfile.name
      .split(" ")
      .map((word) =>
        word.charAt(0),
      )
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className="mx-auto w-full max-w-[1000px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {/* Header */}
      <PageHeader
        title="Profil Siswa"
        description="Informasi akun dan data siswa yang terdaftar di SchoolCanteen."
      />

      {/* Profile Identity */}
      <section className="mt-8 rounded-2xl border bg-background p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <Avatar className="size-20">
            <AvatarFallback className="text-xl font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <h1 className="truncate text-2xl font-semibold tracking-tight">
              {studentUserProfile.name}
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              {studentProfile.className}
            </p>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
              <ShieldCheck className="size-3.5" />

              Siswa
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Account Information */}
        <section className="rounded-2xl border bg-background">
          <div className="border-b px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <UserRound className="size-4 text-primary" />

              <h2 className="font-semibold">
                Informasi Akun
              </h2>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              Data dasar akun pengguna.
            </p>
          </div>

          <div className="divide-y">
            {/* Name */}
            <div className="px-5 py-4 sm:px-6">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Nama Lengkap
              </p>

              <p className="mt-1.5 text-sm font-medium">
                {studentUserProfile.name}
              </p>
            </div>

            {/* Phone */}
            <div className="px-5 py-4 sm:px-6">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <Phone className="size-3.5" />

                Nomor Telepon
              </div>

              <p className="mt-1.5 text-sm font-medium">
                {studentUserProfile.phone ??
                  "Belum tersedia"}
              </p>
            </div>

            {/* Role */}
            <div className="px-5 py-4 sm:px-6">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Role
              </p>

              <p className="mt-1.5 text-sm font-medium">
                Siswa
              </p>
            </div>
          </div>
        </section>

        {/* Student Information */}
        <section className="rounded-2xl border bg-background">
          <div className="border-b px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <GraduationCap className="size-4 text-primary" />

              <h2 className="font-semibold">
                Informasi Siswa
              </h2>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              Informasi akademik siswa.
            </p>
          </div>

          <div className="divide-y">
            {/* NIS */}
            <div className="px-5 py-4 sm:px-6">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <IdCard className="size-3.5" />

                NIS
              </div>

              <p className="mt-1.5 text-sm font-medium">
                {studentProfile.nis}
              </p>
            </div>

            {/* Class */}
            <div className="px-5 py-4 sm:px-6">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <GraduationCap className="size-3.5" />

                Kelas
              </div>

              <p className="mt-1.5 text-sm font-medium">
                {studentProfile.className}
              </p>
            </div>

            {/* Major */}
            <div className="px-5 py-4 sm:px-6">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <BookOpen className="size-3.5" />

                Jurusan
              </div>

              <p className="mt-1.5 text-sm font-medium">
                {studentProfile.major ??
                  "Belum tersedia"}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}