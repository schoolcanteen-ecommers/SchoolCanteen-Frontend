import {
  cache,
} from "react";

import {
  apiRequest,
} from "@/lib/api/client";

import {
  createClient,
} from "@/lib/supabase/server";

export type PublicUserRole =
  | "student"
  | "merchant"
  | "admin";

export interface PublicCurrentUser {
  id: string;
  name: string;
  phone: string | null;
  avatar_url: string | null;
  role: PublicUserRole;
}

export const getPublicCurrentUser =
  cache(
    async (): Promise<
      PublicCurrentUser | null
    > => {
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
        return null;
      }

      const {
        data: sessionData,
        error: sessionError,
      } =
        await supabase.auth.getSession();

      const accessToken =
        sessionData.session
          ?.access_token;

      if (
        sessionError ||
        !accessToken
      ) {
        return null;
      }

      try {
        return await apiRequest<
          PublicCurrentUser
        >(
          "/me",
          {
            method: "GET",
            accessToken,
            cache: "no-store",
          },
        );
      } catch {
        return null;
      }
    },
  );

export function getPublicRoleLabel(
  role: PublicUserRole,
): string {
  switch (role) {
    case "student":
      return "Student";

    case "merchant":
      return "Merchant";

    case "admin":
      return "Administrator";
  }
}

export function getPublicRoleHome(
  role: PublicUserRole,
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
