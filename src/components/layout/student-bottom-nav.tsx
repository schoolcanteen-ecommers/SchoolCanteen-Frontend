"use client";

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
} from "next/navigation";

import {
  cn,
} from "@/lib/utils";

interface NavigationItem {
  name: string;
  href: string;
  icon: typeof Home;
}

const navigationItems:
  NavigationItem[] = [
    {
      name: "Beranda",
      href:
        "/student/dashboard",
      icon: Home,
    },
    {
      name: "Kantin",
      href:
        "/student/kantin",
      icon:
        UtensilsCrossed,
    },
    {
      name: "Koperasi",
      href:
        "/student/koperasi",
      icon: Store,
    },
    {
      name: "Pesanan",
      href:
        "/student/orders",
      icon:
        ClipboardList,
    },
    {
      name: "Profil",
      href:
        "/student/profile",
      icon:
        UserRound,
    },
  ];

export function StudentBottomNav() {
<<<<<<< HEAD
  const pathname = usePathname() || "";
=======
  const pathname =
    usePathname() || "";
>>>>>>> source/main

  function isActive(
    item: NavigationItem,
  ) {
    /*
     * Wallet sekarang merupakan
     * bagian dari area Profil.
     */
    if (
      item.name ===
        "Profil" &&
      pathname.startsWith(
        "/student/wallet",
      )
    ) {
      return true;
    }

    if (
      item.name ===
      "Beranda"
    ) {
      return (
        pathname ===
        "/student/dashboard"
      );
    }

    return (
      pathname ===
        item.href ||
      pathname.startsWith(
        `${item.href}/`,
      )
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
   * Sama seperti Public:
   *
   * 0 -> 10%
   * 1 -> 30%
   * 2 -> 50%
   * 3 -> 70%
   * 4 -> 90%
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
<<<<<<< HEAD
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
=======
    <nav
      aria-label="Navigasi siswa"
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
              isActive(
                item,
              );

            const Icon =
              item.icon;

            return (
              <Link
                key={
                  item.name
                }
                href={
                  item.href
                }
                prefetch={
                  false
                }
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
                  {
                    item.name
                  }
                </span>
              </Link>
            );
          },
        )}
      </div>
>>>>>>> source/main
    </nav>
  );
}
