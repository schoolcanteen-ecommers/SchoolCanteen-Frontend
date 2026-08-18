"use client";

import Link from "next/link";
import {
  GraduationCap,
  Settings,
} from "lucide-react";

import {
  AdminNavigation,
} from "@/components/layout/admin-navigation";
import {
  AdminLogoutButton,
} from "@/features/auth/components/admin-logout-button";

export function AdminSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 flex-col border-r border-[#E3E8EC] bg-white lg:flex">
      <Link
        href="/admin/dashboard"
        className="flex h-[88px] items-center gap-3 px-6 transition-opacity hover:opacity-80"
      >
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy-steel text-white">
          <GraduationCap className="size-5" />
        </div>

        <div className="min-w-0">
          <p className="font-heading truncate text-[21px] font-bold leading-none text-navy-steel">
            SchoolCanteen
          </p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#536069]">
            Admin Console
          </p>
        </div>
      </Link>

      <div className="flex-1 overflow-y-auto px-4 pb-6 pt-2">
        <AdminNavigation />
      </div>

      <div className="border-t border-[#E8ECEF] p-4">
        <Link
          href="/admin/settings"
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#536069] transition-colors hover:bg-[#F2F4F6] hover:text-navy-steel"
        >
          <Settings className="size-[18px]" />
          <span>Settings</span>
        </Link>

        <AdminLogoutButton />
      </div>
    </aside>
  );
}
