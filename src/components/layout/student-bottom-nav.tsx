"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { studentNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function StudentBottomNav() {
  const pathname = usePathname() || "";

  const navigation = studentNavigation.filter(
    (item) => item.mobile
  );

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 flex h-[68px] items-end justify-between rounded-[24px] bg-navy-steel px-2 pb-2 shadow-lg lg:hidden">
      {navigation.map((item) => {
        if (!item.href || !item.icon) {
          return null;
        }

        const Icon = item.icon;

        const isActive =
          pathname === item.href ||
          pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              "group relative flex h-full flex-1 flex-col items-center justify-end transition-colors",
              isActive
                ? "text-white"
                : "text-white/60 hover:text-white"
            )}
          >
            {isActive ? (
              <>
                <div className="absolute -top-6 left-1/2 flex size-14 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-md transition-transform group-active:scale-95">
                  <Icon className="size-6 text-navy-steel" />
                </div>

                <span className="mt-auto font-sans text-[10px] font-bold text-white">
                  {item.title}
                </span>
              </>
            ) : (
              <>
                <Icon className="mb-1 size-6" />

                <span className="font-sans text-[10px] font-medium">
                  {item.title}
                </span>
              </>
            )}
          </Link>
        );
      })}
    </nav>
  );
}