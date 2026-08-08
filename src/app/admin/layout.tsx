import type { ReactNode } from "react";

import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { GlobalHeader } from "@/components/layout/global-header";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5F7FB]">
      <GlobalHeader
        userName="Administrator"
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