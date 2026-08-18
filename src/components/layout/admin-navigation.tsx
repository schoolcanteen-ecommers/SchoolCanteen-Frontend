"use client";

import {
  useState,
} from "react";
import Link from "next/link";
import {
  usePathname,
} from "next/navigation";
import {
  ChevronDown,
} from "lucide-react";

import {
  adminNavigation,
} from "@/lib/navigation";
import {
  cn,
} from "@/lib/utils";
import type {
  NavigationItem,
} from "@/types/navigation";

interface AdminNavigationProps {
  onNavigate?: () => void;
}

export function AdminNavigation({
  onNavigate,
}: AdminNavigationProps) {
  const pathname =
    usePathname();

  return (
    <nav className="space-y-7">
      {adminNavigation.map(
        (group) => (
          <section key={group.label}>
            <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[#59666F]">
              {group.label}
            </p>

            <div className="space-y-1">
              {group.items.map(
                (item) => (
                  <AdminNavigationItem
                    key={item.title}
                    item={item}
                    pathname={pathname}
                    onNavigate={onNavigate}
                  />
                ),
              )}
            </div>
          </section>
        ),
      )}
    </nav>
  );
}

interface AdminNavigationItemProps {
  item: NavigationItem;
  pathname: string;
  onNavigate?: () => void;
}

function AdminNavigationItem({
  item,
  pathname,
  onNavigate,
}: AdminNavigationItemProps) {
  const Icon = item.icon;

  const childIsActive =
    item.children?.some(
      (child) =>
        child.href
          ? pathname === child.href ||
            pathname.startsWith(
              `${child.href}/`,
            )
          : false,
    ) ?? false;

  const itemIsActive = item.href
    ? pathname === item.href ||
      pathname.startsWith(
        `${item.href}/`,
      )
    : false;

  const isActive =
    itemIsActive ||
    childIsActive;

  const [open, setOpen] =
    useState(childIsActive);

  if (item.children?.length) {
    return (
      <div>
        <button
          type="button"
          onClick={() =>
            setOpen(
              (current) =>
                !current,
            )
          }
          className={cn(
            "flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
            isActive
              ? "bg-arctic-blue font-semibold text-navy-steel"
              : "text-[#536069] hover:bg-[#F2F4F6] hover:text-navy-steel",
          )}
        >
          {Icon ? (
            <Icon className="size-[18px] shrink-0" />
          ) : null}

          <span className="flex-1">
            {item.title}
          </span>

          <ChevronDown
            className={cn(
              "size-4 transition-transform",
              open && "rotate-180",
            )}
          />
        </button>

        {open ? (
          <div className="ml-[21px] mt-1 space-y-1 border-l border-[#DCE2E7] pl-3">
            {item.children.map(
              (child) => {
                const ChildIcon =
                  child.icon;

                const active =
                  child.href
                    ? pathname ===
                        child.href ||
                      pathname.startsWith(
                        `${child.href}/`,
                      )
                    : false;

                return (
                  <Link
                    key={child.title}
                    href={
                      child.href ?? "#"
                    }
                    onClick={onNavigate}
                    className={cn(
                      "flex min-h-10 items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition-colors",
                      active
                        ? "bg-[#F2F8FC] font-semibold text-navy-steel"
                        : "text-[#66737C] hover:bg-[#F2F4F6] hover:text-navy-steel",
                    )}
                  >
                    {ChildIcon ? (
                      <ChildIcon className="size-3.5 shrink-0" />
                    ) : null}

                    <span>
                      {child.title}
                    </span>
                  </Link>
                );
              },
            )}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <Link
      href={item.href ?? "#"}
      onClick={onNavigate}
      className={cn(
        "flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
        isActive
          ? "bg-arctic-blue font-semibold text-navy-steel"
          : "text-[#536069] hover:bg-[#F2F4F6] hover:text-navy-steel",
      )}
    >
      {Icon ? (
        <Icon className="size-[18px] shrink-0" />
      ) : null}

      <span>{item.title}</span>
    </Link>
  );
}
