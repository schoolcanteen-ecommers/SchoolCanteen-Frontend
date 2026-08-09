import { redirect } from "next/navigation";

import { apiRequest } from "@/lib/api/client";
import { createClient } from "@/lib/supabase/server";

export type UserRole =
  | "student"
  | "merchant"
  | "admin";

export interface CurrentProfile {
  id: string;
  name: string;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
}

function getDashboardByRole(
  role: UserRole,
): string {
  switch (role) {
    case "student":
      return "/student/dashboard";

    case "merchant":
      return "/merchant/dashboard";

    case "admin":
      return "/admin/dashboard";
  }
}

export async function requireRole(
  requiredRole: UserRole,
): Promise<CurrentProfile> {
  const supabase =
    await createClient();

  /*
   * STEP 1
   * Pastikan session Supabase valid.
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
      getDashboardByRole(
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
   * Ambil access token.
   *
   * Token hanya digunakan untuk
   * dikirim ke Laravel.
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
      getDashboardByRole(
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
   * Laravel menjadi sumber profile
   * dan role sebenarnya.
   */
  let profile:
    | CurrentProfile
    | null = null;

  try {
    profile =
      await apiRequest<CurrentProfile>(
        "/me",
        {
          method: "GET",
          accessToken,
          cache: "no-store",
        },
      );
  } catch {
    /*
     * Session Supabase masih valid,
     * jadi jangan berpura-pura user
     * logout hanya karena Laravel gagal.
     *
     * Fail closed melalui error page.
     */
    throw new Error(
      "Profil pengguna tidak dapat diverifikasi oleh backend.",
    );
  }

  /*
   * STEP 4
   * Role authorization.
   */
  if (
    profile.role !== requiredRole
  ) {
    redirect(
      getDashboardByRole(
        profile.role,
      ),
    );
  }

  return profile;
}