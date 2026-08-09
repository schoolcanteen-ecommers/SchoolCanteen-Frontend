import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import { GlobalHeader } from "@/components/layout/global-header";
import { StudentBottomNav } from "@/components/layout/student-bottom-nav";
import { TopNavigation } from "@/components/layout/top-navigation";

import { getCurrentUser } from "@/features/auth/server/get-current-user";

import { studentNavigation } from "@/lib/navigation";

interface StudentLayoutProps {
  children: ReactNode;
}

export default async function StudentLayout({
  children,
}: StudentLayoutProps) {
  const currentUser =
    await getCurrentUser();

  /*
   * Proxy seharusnya sudah menangani guest.
   * Ini fallback tambahan jika tidak ada
   * authenticated user.
   */
  if (!currentUser) {
    redirect(
      "/login?redirect=/student/dashboard",
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <GlobalHeader
        userName={currentUser.displayName}
        userRole={
          currentUser.email ??
          "Akun terautentikasi"
        }
        brandHref="/student/dashboard"
        profileHref="/student/profile"
        navigation={
          <TopNavigation source="student" />
        }
        showCart
      />

      <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-[1440px] pb-20 lg:pb-10">
        {children}
      </main>

      <StudentBottomNav />
    </div>
  );
}