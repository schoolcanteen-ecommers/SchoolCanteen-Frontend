"use client";

<<<<<<< HEAD
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Home, Store, UserRound, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

interface PublicBottomNavProps {
  isLoggedIn: boolean;
  profileHref: string;
}

export function PublicBottomNav({ isLoggedIn, profileHref }: PublicBottomNavProps) {
  const pathname = usePathname() || "";
  const searchParams = useSearchParams();
  const source = searchParams.get("source");

  const navItems = [
    { name: "Beranda", href: "/", icon: Home, matchSource: undefined },
    { name: "Kantin", href: "/kantin", icon: UtensilsCrossed, matchSource: "kantin" },
    { name: "Koperasi", href: "/koperasi", icon: Store, matchSource: "koperasi" },
    { name: "Profil", href: isLoggedIn ? profileHref : "/login", icon: UserRound, matchSource: undefined },
  ];

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 flex h-[68px] items-end justify-between rounded-[24px] bg-navy-steel px-2 pb-2 shadow-lg md:hidden">
      {navItems.map((item) => {
        let isActive = false;
        
        if (item.href === "/") {
          isActive = pathname === "/";
        } else if (pathname.startsWith("/produk")) {
         
          isActive = source === item.matchSource;
        } else {
          isActive = pathname.startsWith(item.href);
        }

        const Icon = item.icon;

        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "group relative flex h-full w-16 flex-col items-center justify-end transition-colors",
              isActive ? "text-white" : "text-white/60 hover:text-white"
            )}
          >
            {isActive ? (
              <>
                <div className="absolute -top-6 left-1/2 flex size-14 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-md transition-transform group-active:scale-95">
                  <Icon className="size-6 text-navy-steel fill-current" />
                </div>
                <span className="mt-auto font-sans text-[10px] font-bold text-white">
                  {item.name}
                </span>
              </>
            ) : (
              <>
                <Icon className="mb-1 size-6" />
                <span className="font-sans text-[10px] font-medium">
                  {item.name}
                </span>
              </>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
=======
import type {
  CSSProperties,
} from "react";

import Link from "next/link";

import {
  ClipboardList,
  Home,
  Store,
  UserRound,
  UtensilsCrossed,
} from "lucide-react";

import {
  usePathname,
  useSearchParams,
} from "next/navigation";

import {
  cn,
} from "@/lib/utils";

interface NavigationItem {
  name: string;
  href: string;
  icon:
    typeof Home;
  source?: string;
}

const navigationItems: NavigationItem[] = [
  {
    name: "Beranda",
    href: "/",
    icon: Home,
  },
  {
    name: "Kantin",
    href: "/kantin",
    icon: UtensilsCrossed,
    source: "kantin",
  },
  {
    name: "Koperasi",
    href: "/koperasi",
    icon: Store,
    source: "koperasi",
  },
  {
    name: "Pesanan",
    href: "/student/orders",
    icon: ClipboardList,
  },
  {
    name: "Profil",
    href: "/student/profile",
    icon: UserRound,
  },
];

export function PublicBottomNav() {
  const pathname =
    usePathname() || "";

  const searchParams =
    useSearchParams();

  const productSource =
    searchParams.get("source");

  const redirectTarget =
    searchParams.get("redirect") ??
    "";

  function isActive(
    item: NavigationItem,
  ): boolean {
    if (
      pathname.startsWith(
        "/login",
      ) ||
      pathname.startsWith(
        "/register",
      )
    ) {
      if (
        item.name ===
        "Pesanan"
      ) {
        return redirectTarget.startsWith(
          "/student/orders",
        );
      }

      if (
        item.name ===
        "Profil"
      ) {
        return !redirectTarget.startsWith(
          "/student/orders",
        );
      }

      return false;
    }

    if (
      pathname.startsWith(
        "/produk",
      )
    ) {
      return (
        item.source !==
          undefined &&
        item.source ===
          productSource
      );
    }

    if (
      item.name ===
      "Beranda"
    ) {
      return pathname === "/";
    }

    return pathname.startsWith(
      item.href,
    );
  }

  const activeIndex =
    navigationItems.findIndex(
      isActive,
    );

  const safeIndex =
    Math.max(
      activeIndex,
      0,
    );

  /*
   * Lima destination:
   *
   * 0 → 10%
   * 1 → 30%
   * 2 → 50%
   * 3 → 70%
   * 4 → 90%
   */
  const style = {
    "--liquid-index":
      safeIndex,

    "--liquid-center":
      `${
        10 +
        safeIndex * 20
      }%`,
  } as CSSProperties;

  return (
    <nav
      aria-label="Navigasi utama"
      style={style}
      className="public-liquid-nav fixed left-3 right-3 z-50 md:hidden"
    >
      <div className="relative grid h-full grid-cols-5">
        <div
          aria-hidden="true"
          className={cn(
            "liquid-nav-indicator",
            activeIndex < 0 &&
              "opacity-0",
          )}
        >
          <div className="liquid-nav-bubble" />
        </div>

        {navigationItems.map(
          (item) => {
            const active =
              isActive(item);

            const Icon =
              item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                prefetch={false}
                aria-current={
                  active
                    ? "page"
                    : undefined
                }
                className={cn(
                  "liquid-nav-item",
                  active &&
                    "liquid-nav-item-active",
                )}
              >
                <span
                  className={cn(
                    "liquid-nav-icon",
                    active &&
                      "liquid-nav-icon-active",
                  )}
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={
                      active
                        ? 2.4
                        : 2
                    }
                  />
                </span>

                <span
                  className={cn(
                    "liquid-nav-label",
                    active &&
                      "liquid-nav-label-active",
                  )}
                >
                  {item.name}
                </span>
              </Link>
            );
          },
        )}
      </div>
    </nav>
  );
}
>>>>>>> source/main
