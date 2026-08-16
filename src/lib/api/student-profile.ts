import {
  authenticatedServerApiRequest,
} from "@/lib/api/authenticated-server";

interface ApiStudentProfile {
  id: string;

  name: string;
  phone: string | null;
  avatar_url: string | null;

  role: "student";

  student_profile: {
    nis: string;
    class: string;
    major: string | null;
  } | null;
}

export interface StudentProfileData {
  id: string;

  name: string;
  phone: string | null;
  avatarUrl: string | null;

  role: "student";

  studentProfile: {
    nis: string;
    className: string;
    major: string | null;
  } | null;
}

export async function getStudentProfile(): Promise<StudentProfileData> {
  const profile =
    await authenticatedServerApiRequest<ApiStudentProfile>(
      "/student/profile",
    );

  return {
    id:
      profile.id,

    name:
      profile.name,

    phone:
      profile.phone,

    avatarUrl:
      profile.avatar_url,

    role:
      profile.role,

    studentProfile:
      profile.student_profile
        ? {
            nis:
              profile.student_profile.nis,

            className:
              profile.student_profile.class,

            major:
              profile.student_profile.major,
          }
        : null,
  };
}
