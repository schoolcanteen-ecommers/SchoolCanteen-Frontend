import type {
  ReactNode,
} from "react";

import {
  AdminHeader,
} from "@/components/layout/admin-header";
import {
  AdminSidebar,
} from "@/components/layout/admin-sidebar";

import {
  requireRole,
} from "@/features/auth/server/require-role";

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  const profile =
    await requireRole("admin");

  return (
    <div className="min-h-screen bg-[#F7F9FB] lg:flex">
      <AdminSidebar />

      <div className="min-w-0 flex-1">
        <AdminHeader
          userName={profile.name}
          avatarUrl={
            profile.avatar_url
          }
        />

        <main className="min-h-[calc(100vh-72px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
