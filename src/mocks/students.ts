import type {
  UserProfile,
} from "@/types/profile";

import type {
  StudentProfile,
} from "@/types/user";

export const adminStudentPreviews = [
  {
    user: {
      id: "preview-student-001",
      name: "Andi Pratama",
      phone: "081234567890",
      avatar_url: null,
      role: "student",
    },

    student: {
      id: "preview-student-profile-001",
      userId: "preview-student-001",
      nis: "12345678",
      className: "XI RPL 1",
      major: "Rekayasa Perangkat Lunak",
    },
  },

  {
    user: {
      id: "preview-student-002",
      name: "Bima Pratama",
      phone: "081298765432",
      avatar_url: null,
      role: "student",
    },

    student: {
      id: "preview-student-profile-002",
      userId: "preview-student-002",
      nis: "12345679",
      className: "XI RPL 1",
      major: "Rekayasa Perangkat Lunak",
    },
  },

  {
    user: {
      id: "preview-student-003",
      name: "Citra Lestari",
      phone: "081377788899",
      avatar_url: null,
      role: "student",
    },

    student: {
      id: "preview-student-profile-003",
      userId: "preview-student-003",
      nis: "12345680",
      className: "XI TKJ 1",
      major: "Teknik Komputer dan Jaringan",
    },
  },

  {
    user: {
      id: "preview-student-004",
      name: "Dimas Akbar",
      phone: null,
      avatar_url: null,
      role: "student",
    },

    student: {
      id: "preview-student-profile-004",
      userId: "preview-student-004",
      nis: "12345681",
      className: "XII RPL 1",
      major: "Rekayasa Perangkat Lunak",
    },
  },

  {
    user: {
      id: "preview-student-005",
      name: "Fajar Nugraha",
      phone: "082112223333",
      avatar_url: null,
      role: "student",
    },

    student: {
      id: "preview-student-profile-005",
      userId: "preview-student-005",
      nis: "12345682",
      className: "X AKL 1",
      major: "Akuntansi dan Keuangan Lembaga",
    },
  },
] satisfies Array<{
  user: UserProfile;
  student: StudentProfile;
}>;