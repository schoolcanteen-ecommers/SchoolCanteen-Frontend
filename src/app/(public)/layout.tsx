import type { ReactNode } from "react";

import { GlobalHeader } from "@/components/layout/global-header";
import { TopNavigation } from "@/components/layout/top-navigation";

import { apiRequest } from "@/lib/api/client";
import { createClient } from "@/lib/supabase/server";

type UserRole =
  | "student"
  | "merchant"
  | "admin";

interface CurrentUser {
  id: string;
  name: string;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
}

interface PublicLayoutProps {
  children: ReactNode;
}

function getRoleLabel(
  role: UserRole,
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

function getHomeByRole(
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

export default async function PublicLayout({
  children,
}: PublicLayoutProps) {
  const supabase =
    await createClient();

  let currentUser:
    | CurrentUser
    | null = null;

  /*
   * Cek apakah ada user
   * yang sedang login.
   */
  const {
    data: claimsData,
    error: claimsError,
  } =
    await supabase.auth.getClaims();

  const isAuthenticated =
    !claimsError &&
    Boolean(claimsData?.claims);

  if (isAuthenticated) {
    const {
      data: sessionData,
    } =
      await supabase.auth.getSession();

    const accessToken =
      sessionData.session
        ?.access_token;

    if (accessToken) {
      try {
        currentUser =
          await apiRequest<CurrentUser>(
            "/me",
            {
              method: "GET",
              accessToken,
              cache: "no-store",
            },
          );
      } catch {
        currentUser = null;
      }
    }
  }

  const isLoggedIn =
    currentUser !== null;

  /*
   * Public catalog dipakai guest
   * dan student.
   *
   * Kalau student login,
   * gunakan navigation student
   * walaupun sedang berada
   * di route public /kantin.
   */
  const navigationSource:
    | "public"
    | "student" =
    currentUser?.role === "student"
      ? "student"
      : "public";

  /*
   * Logo / brand juga harus kembali
   * ke dashboard milik user jika login.
   */
  const brandHref =
    currentUser
      ? getHomeByRole(
          currentUser.role,
        )
      : "/";

  const profileHref =
    currentUser?.role === "student"
      ? "/student/profile"
      : "#";

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <GlobalHeader
        brandHref={brandHref}

        navigation={
          <TopNavigation
            source={
              navigationSource
            }
          />
        }

        showCart

        showAuthActions={
          !isLoggedIn
        }

        showUserActions={
          isLoggedIn
        }

        userName={
          currentUser?.name
        }

        userRole={
          currentUser
            ? getRoleLabel(
                currentUser.role,
              )
            : undefined
        }

        profileHref={
          profileHref
        }
      />

      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>
    </div>
  );
}