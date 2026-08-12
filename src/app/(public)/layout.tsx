import type { ReactNode } from "react";

import { GlobalHeader } from "@/components/layout/global-header";
import { TopNavigation } from "@/components/layout/top-navigation";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({
  children,
}: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <GlobalHeader
        brandHref="/"
        navigation={
          <TopNavigation source="public" />
        }
        showCart
        showAuthActions
        showUserActions={false}
      />

      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>
    </div>
  );
}