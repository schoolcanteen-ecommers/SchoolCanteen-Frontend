export type UserRole =
  | "STUDENT"
  | "MERCHANT"
  | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string | null;
}

export interface StudentProfile {
  id: string;
  userId: string;
  nis: string;
  className: string;
  major?: string | null;
}