<<<<<<< HEAD
import type {
  ReactNode,
=======
import {
  Suspense,
  type ReactNode,
>>>>>>> source/main
} from "react";

import {
  GlobalHeader,
} from "@/components/layout/global-header";

import {
  StudentBottomNav,
} from "@/components/layout/student-bottom-nav";

import {
  TopNavigation,
} from "@/components/layout/top-navigation";

import {
  requireRole,
} from "@/features/auth/server/require-role";

import {
  getStudentWallet,
} from "@/lib/api/student-wallet";

import {
  formatCurrency,
} from "@/lib/utils";

interface StudentLayoutProps {
  children: ReactNode;
}


/*
 * Header fallback sengaja memiliki struktur
 * yang sama dengan header final.
 *
 * Tidak ada skeleton besar / blank screen.
 * Identitas aktual akan menggantikan placeholder
 * setelah requireRole selesai.
 */
function StudentHeaderFallback() {
  return (
    <GlobalHeader
      userName="Student"
      userRole="Student"
      brandHref="/student/dashboard"
      profileHref="/student/profile"
      navigation={
        <TopNavigation
          source="student"
        />
      }
      showCart
    />
  );
}


/*
 * Authorization tetap dipertahankan.
 *
 * Yang berubah hanya posisi pekerjaan async:
 * requireRole tidak lagi memblokir seluruh
 * StudentLayout.
 */
async function StudentHeaderSession() {
  const profile =
    await requireRole(
      "student",
    );

  const wallet =
    await getStudentWallet();

  return (
<<<<<<< HEAD
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
=======
    <GlobalHeader
      userName={
        profile.name
      }
      userRole="Student"
      brandHref="/student/dashboard"
      profileHref="/student/profile"
      navigation={
        <TopNavigation
          source="student"
        />
      }
      showCart
    />
  );
}
>>>>>>> source/main


export default function StudentLayout({
  children,
}: StudentLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F7F9FB]">
      <Suspense
        fallback={
          <StudentHeaderFallback />
        }
      >
        <StudentHeaderSession />
      </Suspense>

      <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-[1440px] pb-24 lg:pb-10">
        {children}
      </main>

      <StudentBottomNav />
    </div>
  );
}
