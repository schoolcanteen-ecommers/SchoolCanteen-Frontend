"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings,
} from "lucide-react";

import { adminNavigation } from "@/lib/navigation";
import type { NavigationItem } from "@/types/navigation";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "relative hidden shrink-0 border-r bg-[#061A3A] text-white transition-[width] duration-300 lg:flex lg:flex-col",
        collapsed ? "w-[76px]" : "w-[252px]"
      )}
    >
      <button
        type="button"
        onClick={() => setCollapsed((current) => !current)}
        className="absolute -right-3 top-5 z-20 flex size-6 items-center justify-center rounded-full border border-white/10 bg-[#061A3A] text-white shadow-sm transition hover:bg-[#0B2A59]"
        aria-label={collapsed ? "Buka sidebar" : "Tutup sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="size-3.5" />
        ) : (
          <ChevronLeft className="size-3.5" />
        )}
      </button>

      {!collapsed && (
        <div className="mx-3 mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-white/40">
            TODAY&apos;S ACTIVITY
          </p>

          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/55">Pesanan Aktif</span>
              <span className="font-semibold text-white">24</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-white/55">Merchant Aktif</span>
              <span className="font-semibold text-white">5</span>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <div className="space-y-6">
          {adminNavigation.map((group) => (
            <div key={group.label}>
              {!collapsed && (
                <p className="mb-2 px-3 text-[10px] font-semibold tracking-[0.18em] text-white/35">
                  {group.label}
                </p>
              )}

              <div className="space-y-1">
                {group.items.map((item) => (
                  <SidebarItem
                    key={item.title}
                    item={item}
                    pathname={pathname}
                    collapsed={collapsed}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>

      <div className="border-t border-white/10 p-3">
        <Link
          href="/admin/settings"
          className={cn(
            "flex h-10 items-center rounded-lg text-sm text-white/60 transition hover:bg-white/[0.06] hover:text-white",
            collapsed ? "justify-center px-0" : "gap-3 px-3"
          )}
        >
          <Settings className="size-4 shrink-0" />

          {!collapsed && <span>Settings</span>}
        </Link>

        <button
          type="button"
          className={cn(
            "mt-1 flex h-10 w-full items-center rounded-lg text-sm text-white/60 transition hover:bg-red-500/10 hover:text-red-300",
            collapsed ? "justify-center px-0" : "gap-3 px-3"
          )}
        >
          <LogOut className="size-4 shrink-0" />

          {!collapsed && <span>Keluar</span>}
        </button>
      </div>
    </aside>
  );
}

interface SidebarItemProps {
  item: NavigationItem;
  pathname: string;
  collapsed: boolean;
}

function SidebarItem({
  item,
  pathname,
  collapsed,
}: SidebarItemProps) {
  const Icon = item.icon;

  const hasChildren = Boolean(item.children?.length);

  const childIsActive =
    item.children?.some((child) =>
      child.href ? pathname.startsWith(child.href) : false
    ) ?? false;

  const itemIsActive = item.href
    ? pathname === item.href || pathname.startsWith(`${item.href}/`)
    : false;

  const isActive = itemIsActive || childIsActive;

  const [open, setOpen] = useState(childIsActive);

  if (hasChildren) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className={cn(
            "flex h-10 w-full items-center rounded-lg text-sm transition",
            collapsed ? "justify-center px-0" : "gap-3 px-3",
            isActive
              ? "bg-white/[0.07] text-white"
              : "text-white/60 hover:bg-white/[0.05] hover:text-white"
          )}
        >
          {Icon && <Icon className="size-[18px] shrink-0" />}

          {!collapsed && (
            <>
              <span className="flex-1 text-left">
                {item.title}
              </span>

              <ChevronDown
                className={cn(
                  "size-4 transition-transform",
                  open && "rotate-180"
                )}
              />
            </>
          )}
        </button>

        {!collapsed && open && (
          <div className="ml-[21px] mt-1 border-l border-white/10 pl-3">
            <div className="space-y-1">
              {item.children?.map((child) => {
                const ChildIcon = child.icon;

                const active = child.href
                  ? pathname === child.href ||
                    pathname.startsWith(`${child.href}/`)
                  : false;

                return (
                  <Link
                    key={child.title}
                    href={child.href ?? "#"}
                    className={cn(
                      "flex min-h-9 items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition",
                      active
                        ? "bg-blue-500/15 text-blue-300"
                        : "text-white/45 hover:bg-white/[0.04] hover:text-white/80"
                    )}
                  >
                    {ChildIcon && (
                      <ChildIcon className="size-3.5 shrink-0" />
                    )}

                    <span>{child.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href ?? "#"}
      className={cn(
        "relative flex h-10 items-center rounded-lg text-sm font-medium transition",
        collapsed ? "justify-center px-0" : "gap-3 px-3",
        isActive
          ? "bg-[#0878E8] text-white shadow-[0_8px_20px_rgba(8,120,232,0.22)]"
          : "text-white/55 hover:bg-white/[0.05] hover:text-white"
      )}
      title={collapsed ? item.title : undefined}
    >
      {Icon && <Icon className="size-[18px] shrink-0" />}

      {!collapsed && <span>{item.title}</span>}

      {isActive && (
        <span className="absolute left-0 h-5 w-[3px] rounded-r-full bg-white" />
      )}
    </Link>
  );
}