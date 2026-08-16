import type { ReactNode } from "react";
import Link from "next/link";
import { GraduationCap, Home, Store, UserRound, UtensilsCrossed } from "lucide-react";

import { GlobalHeader } from "@/components/layout/global-header";
import { TopNavigation } from "@/components/layout/top-navigation";
import { PublicBottomNav } from "@/components/layout/public-bottom-nav";

import { apiRequest } from "@/lib/api/client";
import { createClient } from "@/lib/supabase/server";

type UserRole = "student" | "merchant" | "admin";

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

      
      <footer className="w-full bg-navy-steel py-12 pb-32 md:pb-12 mt-auto">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
            
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-2 text-white">
                <GraduationCap className="size-8" />
                <span className="font-heading text-2xl font-bold tracking-tight">
                  SchoolCanteen
                </span>
              </div>
              <p className="max-w-md font-sans text-sm leading-relaxed text-[#8FA0B2]">
                Belanja kebutuhan sekolah jadi lebih praktis. Temukan makanan di kantin dan kebutuhan sekolah dalam satu platform.
              </p>
            </div>

            
            <div className="space-y-4">
              <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#B8C4D1]">
                Jelajahi
              </h4>
              <ul className="space-y-3">
                <li><Link href="/" className="font-sans text-sm text-[#8FA0B2] transition-colors hover:text-white">Beranda</Link></li>
                <li><Link href="/kantin" className="font-sans text-sm text-[#8FA0B2] transition-colors hover:text-white">Kantin</Link></li>
                <li><Link href="/koperasi" className="font-sans text-sm text-[#8FA0B2] transition-colors hover:text-white">Koperasi</Link></li>
              </ul>
            </div>

            
            <div className="space-y-4">
              <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#B8C4D1]">
                Akses
              </h4>
              <ul className="space-y-3">
                <li><Link href="/login" className="font-sans text-sm text-[#8FA0B2] transition-colors hover:text-white">Masuk</Link></li>
                <li><Link href="/register" className="font-sans text-sm text-[#8FA0B2] transition-colors hover:text-white">Daftar</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
            <p className="font-sans text-xs text-[#536069]">© 2026 SchoolCanteen</p>
            <p className="font-sans text-xs text-[#536069]">Kantin & koperasi sekolah dalam satu tempat.</p>
          </div>
        </div>
      </footer>

      <PublicBottomNav isLoggedIn={isLoggedIn} profileHref={profileHref} />

    </div>
  );
}