"use client";

import { GraduationCap, Phone, Search, UserRound } from "lucide-react";
import { useMemo, useState } from "react";

import { EmptyState } from "@/components/shared/empty-state";

import type { UserProfile } from "@/types/profile";

import type { StudentProfile } from "@/types/user";

interface AdminStudentListProps {
  students: Array<{
    user: UserProfile;
    student: StudentProfile;
  }>;
}

export function AdminStudentList({ students }: AdminStudentListProps) {
  const [search, setSearch] = useState("");

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return students;
    }

    return students.filter(
      ({ user, student }) =>
        user.name.toLowerCase().includes(query) ||
        student.nis.toLowerCase().includes(query) ||
        student.className.toLowerCase().includes(query) ||
        (student.major ?? "").toLowerCase().includes(query),
    );
  }, [search, students]);

  return (
    <section className="mt-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Daftar Siswa</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Pantau data siswa yang menggunakan SchoolCanteen.
          </p>
        </div>

        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cari siswa..."
            className="h-10 w-full rounded-xl border bg-background pl-9 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>
      </div>

      {filteredStudents.length > 0 ? (
        <div className="mt-4 overflow-hidden rounded-2xl border bg-background">
          {/* Desktop Header */}
          <div className="hidden grid-cols-[minmax(220px,1.5fr)_140px_170px_minmax(220px,1fr)_170px] gap-4 border-b bg-muted/30 px-5 py-3 text-xs font-medium text-muted-foreground lg:grid">
            <span>Siswa</span>
            <span>NIS</span>
            <span>Kelas</span>
            <span>Jurusan</span>
            <span>Kontak</span>
          </div>

          <div className="divide-y">
            {filteredStudents.map(({ user, student }) => {
              const initials = user.name
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part[0])
                .join("")
                .toUpperCase();

              return (
                <article key={user.id} className="p-5">
                  {/* Desktop */}
                  <div className="hidden grid-cols-[minmax(220px,1.5fr)_140px_170px_minmax(220px,1fr)_170px] items-center gap-4 lg:grid">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {user.avatar_url ? (
                         
                          <img
                            src={user.avatar_url}
                            alt={user.name}
                            className="size-full object-cover"
                          />
                        ) : (
                          initials
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-medium">{user.name}</p>

                        <p className="mt-0.5 text-xs text-muted-foreground">
                          Student
                        </p>
                      </div>
                    </div>

                    <p className="text-sm font-medium">{student.nis}</p>

                    <p className="text-sm">{student.className}</p>

                    <p className="truncate text-sm text-muted-foreground">
                      {student.major ?? "Belum tersedia"}
                    </p>

                    <p className="truncate text-sm text-muted-foreground">
                      {user.phone ?? "Belum tersedia"}
                    </p>
                  </div>

                  {/* Mobile / Tablet */}
                  <div className="lg:hidden">
                    <div className="flex items-start gap-3">
                      <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {user.avatar_url ? (
                         
                          <img
                            src={user.avatar_url}
                            alt={user.name}
                            className="size-full object-cover"
                          />
                        ) : (
                          initials
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{user.name}</p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          NIS {student.nis}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <StudentInfo
                        icon={GraduationCap}
                        label="Kelas"
                        value={student.className}
                      />

                      <StudentInfo
                        icon={UserRound}
                        label="Jurusan"
                        value={student.major ?? "Belum tersedia"}
                      />

                      <StudentInfo
                        icon={Phone}
                        label="Kontak"
                        value={user.phone ?? "Belum tersedia"}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <EmptyState
            icon={UserRound}
            title="Siswa tidak ditemukan"
            description="Tidak ada siswa yang sesuai dengan pencarian."
          />
        </div>
      )}
    </section>
  );
}

interface StudentInfoProps {
  icon: typeof UserRound;
  label: string;
  value: string;
}

function StudentInfo({ icon: Icon, label, value }: StudentInfoProps) {
  return (
    <div className="rounded-xl bg-muted/40 p-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="size-3.5" />

        {label}
      </div>

      <p className="mt-2 text-sm font-medium">{value}</p>
    </div>
  );
}
