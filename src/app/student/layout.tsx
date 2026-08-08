import type { ReactNode } from "react";

import { GlobalHeader } from "@/components/layout/global-header";
import { StudentBottomNav } from "@/components/layout/student-bottom-nav";
import { TopNavigation } from "@/components/layout/top-navigation";

interface StudentLayoutProps {
  children: ReactNode;
}

export default function StudentLayout({
  children,
}: StudentLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <GlobalHeader
        userName="Andi Pratama"
        userRole="XI RPL 1"
        brandHref="/student/dashboard"
        profileHref="/student/profile"
        navigation={
          <TopNavigation source="student" />
        }
        showWallet
        walletBalance="Rp75.000"
        showCart
      />

      <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-[1440px] pb-20 lg:pb-10">
        {children}
      </main>

      <StudentBottomNav />
    </div>
  );
}