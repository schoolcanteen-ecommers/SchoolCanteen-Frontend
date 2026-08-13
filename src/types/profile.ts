export type UserRole =
  | "student"
  | "merchant"
  | "admin";

export interface UserProfile {
  id: string;
  name: string;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
}