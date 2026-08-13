import type {
  UserProfile,
} from "@/types/profile";

import type {
  StudentProfile,
} from "@/types/user";

export const studentUserProfile = {
  id: "preview-student",
  name: "Andi Pratama",
  phone: "081234567890",
  avatar_url: null,
  role: "student",
} satisfies UserProfile;

export const studentProfile = {
  id: "preview-student-profile",
  userId: studentUserProfile.id,

  nis: "12345678",
  className: "XI RPL 1",
  major: "Rekayasa Perangkat Lunak",
} satisfies StudentProfile;