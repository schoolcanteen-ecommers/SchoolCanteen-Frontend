import { redirect } from "next/navigation";

import { getCurrentProfile } from "@/features/auth/services/profile-service";
import { getRoleHomeRoute } from "@/features/auth/utils/role-route";

import { createClient } from "@/lib/supabase/server";

import type {
  UserProfile,
  UserRole,
} from "@/types/profile";

export async function requireRole(
  requiredRole: UserRole,
): Promise<UserProfile> {
  const supabase =
    await createClient();

  /*
   * STEP 1
   *
   * Verifikasi bahwa user memang
   * memiliki session Supabase valid.
   */
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

  /*
   * STEP 2
   *
   * Ambil access token untuk
   * dikirim ke Laravel.
   *
   * Claims di atas sudah dipakai
   * untuk verifikasi auth.
   */
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

  /*
   * STEP 3
   *
   * Laravel adalah source of truth
   * untuk profile dan role.
   */
  let profile: UserProfile;

  try {
    profile =
      await getCurrentProfile(
        accessToken,
      );
  } catch {
    /*
     * Session Supabase valid,
     * tetapi Laravel gagal
     * memverifikasi profile.
     *
     * Jangan redirect seolah-olah
     * user logout.
     */
    throw new Error(
      "Profil pengguna tidak dapat diverifikasi oleh backend.",
    );
  }

  /*
   * STEP 4
   *
   * Authorization berdasarkan
   * role dari Laravel.
   */
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
}