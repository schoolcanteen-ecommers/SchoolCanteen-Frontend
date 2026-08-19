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
  MerchantBottomNav,
} from "@/components/layout/merchant-bottom-nav";

import {
  MerchantHeader,
} from "@/components/layout/merchant-header";

import {
  MerchantSidebar,
} from "@/components/layout/merchant-sidebar";

import {
  requireRole,
} from "@/features/auth/server/require-role";

interface MerchantLayoutProps {
  children: ReactNode;
}

function MerchantHeaderFallback() {
  return (
    <MerchantHeader
      userName="Merchant"
      avatarUrl={null}
    />
  );
}

async function MerchantHeaderSession() {
  const profile =
    await requireRole(
      "merchant",
    );

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-[#F5F7FB]">
      <GlobalHeader
        userName={profile.name}
        userRole="Merchant"
        brandHref="/merchant/dashboard"
      />
=======
    <MerchantHeader
      userName={
        profile.name
      }
      avatarUrl={
        profile.avatar_url
      }
    />
  );
}
>>>>>>> source/main

export default function MerchantLayout({
  children,
}: MerchantLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F6F8FB]">
      <MerchantSidebar />

<<<<<<< HEAD
        <main className="min-w-0 flex-1">
          {children}
=======
      <div className="min-h-screen lg:pl-[280px]">
        <Suspense
          fallback={
            <MerchantHeaderFallback />
          }
        >
          <MerchantHeaderSession />
        </Suspense>

        <main className="min-h-[calc(100vh-64px)] pb-[88px] lg:min-h-[calc(100vh-72px)] lg:pb-0">
          {
            children
          }
>>>>>>> source/main
        </main>
      </div>

      <MerchantBottomNav />
    </div>
  );
}
