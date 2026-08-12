"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { merchantNavigation } from "@/lib/navigation";

export function MerchantSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "relative hidden shrink-0 border-r bg-[#061A3A] text-white transition-[width] duration-300 lg:flex lg:flex-col",
        collapsed ? "w-[76px]" : "w-[252px]"
      )}
    >
      {}
      <button
        type="button"
        onClick={() => setCollapsed((prev) => !prev)}
        className="absolute -right-3 top-5 z-20 flex size-6 items-center justify-center rounded-full border border-white/10 bg-[#061A3A] text-white shadow-sm transition hover:bg-[#0B2A59]"
        aria-label={collapsed ? "Buka sidebar" : "Tutup sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="size-3.5" />
        ) : (
          <ChevronLeft className="size-3.5" />
        )}
      </button>

      {}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <div className="space-y-6">
          {merchantNavigation.map((group) => (
            <div key={group.label}>
              {!collapsed && (
                <p className="mb-2 px-3 text-[10px] font-semibold tracking-[0.18em] text-white/35">
                  {group.label}
                </p>
              )}

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  const isActive = item.href
                    ? pathname === item.href ||
                      pathname.startsWith(`${item.href}/`)
                    : false;

                  return (
                    <Link
                      key={item.title}
                      href={item.href ?? "#"}
                      title={collapsed ? item.title : undefined}
                      className={cn(
                        "relative flex h-10 items-center rounded-lg text-sm font-medium transition",
                        collapsed
                          ? "justify-center px-0"
                          : "gap-3 px-3",
                        isActive
                          ? "bg-[#0878E8] text-white shadow-[0_8px_20px_rgba(8,120,232,0.22)]"
                          : "text-white/55 hover:bg-white/[0.05] hover:text-white"
                      )}
                    >
                      {Icon && (
                        <Icon className="size-[18px] shrink-0" />
                      )}

                      {!collapsed && (
                        <span>{item.title}</span>
                      )}

                      {isActive && (
                        <span className="absolute left-0 h-5 w-[3px] rounded-r-full bg-white" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}