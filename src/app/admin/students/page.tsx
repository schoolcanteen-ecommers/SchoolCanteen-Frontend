import {
  GraduationCap,
  Phone,
  Users,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader } from "@/components/shared/page-header";

import { AdminStudentList } from "@/features/students/components/admin-student-list";

import { adminStudentPreviews } from "@/mocks/students";

export default function AdminStudentsPage() {
  const totalStudents =
    adminStudentPreviews.length;

  const totalClasses =
    new Set(
      adminStudentPreviews.map(
        ({ student }) =>
          student.className,
      ),
    ).size;

  const studentsWithPhone =
    adminStudentPreviews.filter(
      ({ user }) =>
        Boolean(user.phone),
    ).length;

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <PageHeader
        title="Student Monitoring"
        description="Pantau data siswa yang menggunakan layanan SchoolCanteen."
      />

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Siswa Terdata"
          value={totalStudents}
          description="Data siswa yang tersedia"
          icon={Users}
        />

        <StatCard
          title="Kelas Terdata"
          value={totalClasses}
          description="Kelas dalam data monitoring"
          icon={GraduationCap}
        />

        <StatCard
          title="Kontak Tersedia"
          value={studentsWithPhone}
          description="Siswa dengan nomor telepon"
          icon={Phone}
        />
      </section>

      <AdminStudentList
        students={
          adminStudentPreviews
        }
      />
    </div>
  );
}