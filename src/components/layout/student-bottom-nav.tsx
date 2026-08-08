"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { studentNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function StudentBottomNav() {
  const pathname = usePathname();

  const navigation = studentNavigation.filter(
    (item) => item.mobile
  );

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur lg:hidden">
      <div
        className="mx-auto grid h-16 max-w-md px-2"
        style={{
          gridTemplateColumns: `repeat(${navigation.length}, minmax(0, 1fr))`,
        }}
      >
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
                "relative flex flex-col items-center justify-center gap-1 text-[10px] transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <span className="absolute top-0 h-[3px] w-8 rounded-b-full bg-primary" />
              )}

              <Icon
                className={cn(
                  "size-5",
                  isActive && "stroke-[2.4]"
                )}
              />

              <span className="font-medium">
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}