import { cache } from "react";
import { redirect } from "next/navigation";

import { getCurrentProfile } from "@/features/auth/services/profile-service";
import { getRoleHomeRoute } from "@/features/auth/utils/role-route";

import { createClient } from "@/lib/supabase/server";

import type {
  UserProfile,
  UserRole,
} from "@/types/profile";

<<<<<<< HEAD
export async function requireRole(
=======
async function requireRoleInternal(
>>>>>>> source/main
  requiredRole: UserRole,
): Promise<UserProfile> {
  const supabase =
    await createClient();

    const {
    data: claimsData,
    error: claimsError,
  } =
    await supabase.auth.getClaims();

  if (
    claimsError ||
    !claimsData?.claims
  ) {
    const target =
      getRoleHomeRoute(
        requiredRole,
      );

    redirect(
      `/login?redirect=${encodeURIComponent(
        target,
      )}`,
    );
  }

    const {
    data: sessionData,
  } =
    await supabase.auth.getSession();

  const accessToken =
    sessionData.session
      ?.access_token;

  if (!accessToken) {
    const target =
      getRoleHomeRoute(
        requiredRole,
      );

    redirect(
      `/login?redirect=${encodeURIComponent(
        target,
      )}`,
    );
  }

    let profile: UserProfile;

  try {
    profile =
      await getCurrentProfile(
        accessToken,
      );
  } catch {
        throw new Error(
      "Profil pengguna tidak dapat diverifikasi oleh backend.",
    );
  }

    if (
    profile.role !== requiredRole
  ) {
    redirect(
      getRoleHomeRoute(
        profile.role,
      ),
    );
  }

  return profile;
<<<<<<< HEAD
}
=======
}

export const requireRole =
  cache(
    requireRoleInternal,
  );
>>>>>>> source/main
