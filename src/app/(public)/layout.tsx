<<<<<<< HEAD
import type { ReactNode } from "react";
import Link from "next/link";
import { GlobalHeader } from "@/components/layout/global-header";
import { TopNavigation } from "@/components/layout/top-navigation";
import { PublicBottomNav } from "@/components/layout/public-bottom-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { apiRequest } from "@/lib/api/client";
import { createClient } from "@/lib/supabase/server";

type UserRole = "student" | "merchant" | "admin";
=======
import type {
  ReactNode,
} from "react";

import {
  Suspense,
} from "react";

import {
  PublicHeaderFallback,
  PublicHeaderSession,
} from "@/components/layout/public-auth-chrome";

import {
  PublicBottomNav,
} from "@/components/layout/public-bottom-nav";
>>>>>>> source/main

import {
  PublicSiteFooter,
} from "@/components/layout/public-site-footer";

interface PublicLayoutProps {
  children: ReactNode;
}

<<<<<<< HEAD
function getRoleLabel(role: UserRole): string {
  switch (role) {
    case "student":
      return "Student";
    case "merchant":
      return "Merchant";
    case "admin":
      return "Administrator";
  }
}

function getHomeByRole(role: UserRole): string {
  switch (role) {
    case "student":
      return "/student/dashboard";
    case "merchant":
      return "/merchant/dashboard";
    case "admin":
      return "/admin/dashboard";
  }
}

export default async function PublicLayout({ children }: PublicLayoutProps) {
  const supabase = await createClient();

  let currentUser: CurrentUser | null = null;

  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();

  const isAuthenticated = !claimsError && Boolean(claimsData?.claims);

  if (isAuthenticated) {
    const { data: sessionData } = await supabase.auth.getSession();
    const accessToken = sessionData.session?.access_token;

    if (accessToken) {
      try {
        currentUser = await apiRequest<CurrentUser>("/me", {
          method: "GET",
          accessToken,
          cache: "no-store",
        });
      } catch {
        currentUser = null;
      }
    }
  }

  const isLoggedIn = currentUser !== null;
  const navigationSource: "public" | "student" = currentUser?.role === "student" ? "student" : "public";
  const brandHref = currentUser ? getHomeByRole(currentUser.role) : "/";
  const profileHref = currentUser?.role === "student" ? "/student/profile" : "#";

  return (
    <div className="flex min-h-screen flex-col bg-neutral-surface">
      <GlobalHeader
        brandHref={brandHref}
        navigation={<TopNavigation source={navigationSource} />}
        showCart
        showAuthActions={!isLoggedIn}
        showUserActions={isLoggedIn}
        userName={currentUser?.name}
        userRole={currentUser ? getRoleLabel(currentUser.role) : undefined}
        profileHref={profileHref}
      />

      <main className="flex-1 pb-24 md:pb-0">
        {children}
      </main>

      <SiteFooter />
      <PublicBottomNav isLoggedIn={isLoggedIn} profileHref={profileHref} />

=======
export default function PublicLayout({
  children,
}: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-surface">
      <Suspense
        fallback={
          <PublicHeaderFallback />
        }
      >
        <PublicHeaderSession />
      </Suspense>

      <main className="public-route-main flex-1">
        {children}
      </main>

      <PublicSiteFooter />

      <PublicBottomNav />
>>>>>>> source/main
    </div>
  );
}
