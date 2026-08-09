import type { ReactNode } from "react";

import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { GlobalHeader } from "@/components/layout/global-header";

import { requireRole } from "@/features/auth/server/require-role";

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  const profile =
    await requireRole("admin");

  return (
    <div className="min-h-screen bg-[#F5F7FB]">
      <GlobalHeader
        userName={profile.name}
        userRole="School Admin"
      />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <AdminSidebar />

        <main className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}