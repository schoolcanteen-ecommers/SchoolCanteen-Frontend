import { authenticatedServerApiRequest } from "@/lib/api/authenticated-server";

import type { UserProfile } from "@/types/profile";

import type { StudentProfile } from "@/types/user";

interface ApiAdminStudent {
  id: string;

  name: string;
  phone: string | null;
  avatar_url: string | null;

  student_profile: {
    nis: string;
    class: string;
    major: string | null;
  } | null;

  wallet: {
    balance: number;
    is_active: boolean;
    updated_at: string | null;
  } | null;

  orders_count: number;

  created_at: string | null;
  updated_at: string | null;
}

export interface AdminStudentData {
  user: UserProfile;
  student: StudentProfile;
}

function mapAdminStudent(student: ApiAdminStudent): AdminStudentData | null {
  if (!student.student_profile) {
    return null;
  }

  return {
    user: {
      id: student.id,

      name: student.name,

      phone: student.phone,

      avatar_url: student.avatar_url,

      role: "student",
    },

    student: {
      id: student.id,

      userId: student.id,

      nis: student.student_profile.nis,

      className: student.student_profile.class,

      major: student.student_profile.major,
    },
  };
}

export async function getAdminStudents(): Promise<AdminStudentData[]> {
  const students: AdminStudentData[] = [];

  const pageSize = 20;

  for (let page = 1; ; page += 1) {
    const apiStudents = await authenticatedServerApiRequest<ApiAdminStudent[]>(
      `/admin/students?page=${page}`,
    );

    students.push(
      ...apiStudents
        .map(mapAdminStudent)
        .filter((student): student is AdminStudentData => student !== null),
    );

    if (apiStudents.length < pageSize) {
      break;
    }
  }

  return students;
}
