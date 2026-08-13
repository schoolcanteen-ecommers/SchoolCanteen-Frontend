import { apiRequest } from "@/lib/api/client";

import type {
  UserProfile,
} from "@/types/profile";

export async function getCurrentProfile(
  accessToken: string,
): Promise<UserProfile> {
  return apiRequest<UserProfile>(
    "/me",
    {
      method: "GET",
      accessToken,
      cache: "no-store",
    },
  );
}