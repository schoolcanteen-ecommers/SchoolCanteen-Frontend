"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { studentNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function StudentDesktopNav() {
  const pathname = usePathname();

  const navigation = studentNavigation.filter(
    (item) => item.desktop
  );

  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {navigation.map((item) => {
        if (!item.href) {
          return null;
        }

        const isActive =
          pathname === item.href ||
          pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}