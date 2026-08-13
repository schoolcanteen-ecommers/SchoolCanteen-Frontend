import type {
  ReactNode,
} from "react";

import { GlobalHeader } from "@/components/layout/global-header";
import { MerchantSidebar } from "@/components/layout/merchant-sidebar";

import { requireRole } from "@/features/auth/server/require-role";

interface MerchantLayoutProps {
  children: ReactNode;
}

export default async function MerchantLayout({
  children,
}: MerchantLayoutProps) {
  const profile =
    await requireRole("merchant");

  return (
    <div className="min-h-screen bg-[#F5F7FB]">
      <GlobalHeader
        userName={profile.name}
        userRole="Merchant"
        brandHref="/merchant/dashboard"
      />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <MerchantSidebar />

        <main className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}