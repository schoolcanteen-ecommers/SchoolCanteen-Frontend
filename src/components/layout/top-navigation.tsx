"use client";

import Link from "next/link";
import {
  usePathname,
  useSearchParams,
} from "next/navigation";

import {
  publicNavigation,
  studentNavigation,
} from "@/lib/navigation";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/types/navigation";

type NavigationSource = "public" | "student";

interface TopNavigationProps {
  source: NavigationSource;
}

const navigationMap: Record<
  NavigationSource,
  NavigationItem[]
> = {
  public: publicNavigation,
  student: studentNavigation,
};

export function TopNavigation({
  source,
}: TopNavigationProps) {
  const pathname =
    usePathname();

  const searchParams =
    useSearchParams();

  const productSource =
    searchParams.get("source");

  const items = navigationMap[source].filter(
    (item) => item.desktop !== false && item.href,
  );

  return (
    <nav className="flex items-center gap-1">
      {items.map((item) => {
        const href = item.href!;

        const isProductRoute =
          pathname.startsWith(
            "/produk",
          );

        const isActive =
          href === "/"
            ? pathname === "/"
            : isProductRoute
              ? (
                  href === "/kantin" &&
                  productSource === "kantin"
                ) ||
                (
                  href === "/koperasi" &&
                  productSource === "koperasi"
                )
              : pathname === href ||
                pathname.startsWith(
                  `${href}/`,
                );

        return (
          <Link
            key={href}
            href={href}
            prefetch={false}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}