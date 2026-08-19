"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap } from "lucide-react";

import { MerchantLogoutButton } from "@/features/auth/components/merchant-logout-button";
import { merchantNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function MerchantSidebar() {
  const pathname = usePathname();

  return (
<<<<<<< HEAD
    <aside
      className={cn(
        "relative hidden shrink-0 border-r bg-[#061A3A] text-white transition-[width] duration-300 lg:flex lg:flex-col",
        collapsed ? "w-[76px]" : "w-[252px]"
      )}
    >
      
      <button
        type="button"
        onClick={() => setCollapsed((prev) => !prev)}
        className="absolute -right-3 top-5 z-20 flex size-6 items-center justify-center rounded-full border border-white/10 bg-[#061A3A] text-white shadow-sm transition hover:bg-[#0B2A59]"
        aria-label={collapsed ? "Buka sidebar" : "Tutup sidebar"}
=======
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[280px] flex-col border-r border-[#E2E8F0] bg-white shadow-[0_4px_20px_rgba(13,27,42,0.04)] lg:flex">
      <Link
        href="/merchant/dashboard"
        className="flex h-[88px] items-center gap-3 px-6"
>>>>>>> source/main
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-navy-steel text-white">
          <GraduationCap className="size-5" />
        </span>
        <span className="min-w-0">
          <span className="block truncate font-heading text-xl font-bold leading-tight text-navy-steel">
            SchoolCanteen
          </span>
          <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#536069]">
            Merchant Console
          </span>
        </span>
      </Link>

<<<<<<< HEAD
      
      <nav className="flex-1 overflow-y-auto px-3 py-5">
=======
      <nav className="flex-1 overflow-y-auto px-4 pb-6 pt-2">
>>>>>>> source/main
        <div className="space-y-6">
          {merchantNavigation.map((group) => (
            <section key={group.label}>
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#74777D]">
                {group.label}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const href = item.href ?? "#";
                  const isActive =
                    Boolean(item.href) &&
                    (pathname === item.href ||
                      pathname.startsWith(`${item.href}/`));

                  return (
                    <Link
                      key={item.title}
                      href={href}
                      className={cn(
                        "relative flex min-h-11 items-center gap-3 rounded-[10px] px-4 py-3 text-sm font-semibold transition-colors",
                        isActive
                          ? "bg-arctic-blue text-navy-steel"
                          : "text-[#536069] hover:bg-[#F2F4F6] hover:text-navy-steel",
                      )}
                    >
                      {isActive ? (
                        <span className="absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-navy-steel" />
                      ) : null}

                      {Icon ? <Icon className="size-[18px] shrink-0" /> : null}
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </nav>

      <div className="border-t border-[#E2E8F0] p-4">
        <MerchantLogoutButton />
      </div>
    </aside>
  );
}
