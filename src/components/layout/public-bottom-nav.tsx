"use client";

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