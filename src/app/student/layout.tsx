import type {
  ReactNode,
} from "react";

import { GlobalHeader } from "@/components/layout/global-header";
import { StudentBottomNav } from "@/components/layout/student-bottom-nav";
import { TopNavigation } from "@/components/layout/top-navigation";

import { requireRole } from "@/features/auth/server/require-role";

import {
  getStudentWallet,
} from "@/lib/api/student-wallet";

import {
  formatCurrency,
} from "@/lib/utils";

interface StudentLayoutProps {
  children: ReactNode;
}

export default async function StudentLayout({
  children,
}: StudentLayoutProps) {
  const profile =
    await requireRole("student");

  const wallet =
    await getStudentWallet();

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <GlobalHeader
        userName={profile.name}
        userRole="Student"
        brandHref="/student/dashboard"
        profileHref="/student/profile"
        navigation={
          <TopNavigation source="student" />
        }
        showWallet
        walletBalance={
          formatCurrency(
            wallet.balance,
          )
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