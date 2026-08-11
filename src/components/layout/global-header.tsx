import type { ReactNode } from "react";
import Link from "next/link";
import {
  Bell,
  CircleHelp,
  LogOut,
  Settings,
  ShoppingCart,
  UserRound,
  WalletCards,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface GlobalHeaderProps {
  userName?: string;
  userRole?: string;

  navigation?: ReactNode;

  brandHref?: string;
  profileHref?: string;

  showWallet?: boolean;
  walletBalance?: string;

  showCart?: boolean;
}

export function GlobalHeader({
  userName = "Administrator",
  userRole = "School Admin",

  navigation,

  brandHref = "/",
  profileHref = "#",

  showWallet = false,
  walletBalance = "Rp0",

  showCart = false,
}: GlobalHeaderProps) {
  const initials = userName
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center gap-2 px-3 sm:gap-4 sm:px-6 lg:gap-6 lg:px-8">
        <Link
          href={brandHref}
          className="flex min-w-0 shrink-0 items-center gap-2.5"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground sm:size-10">
            <span className="text-xs font-bold sm:text-sm">SC</span>
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-tight">
              SchoolCanteen
            </p>

            <p className="hidden truncate text-xs text-muted-foreground sm:block">
              School Commerce Management
            </p>
          </div>
        </Link>

        {navigation && (
          <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
            {navigation}
          </div>
        )}

        {!navigation && <div className="flex-1" />}

        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
          {showWallet && (
            <Link
              href="/student/wallet"
              className="hidden items-center gap-2 rounded-lg border bg-background px-3 py-2 transition-colors hover:bg-muted md:flex"
            >
              <WalletCards className="size-4 text-primary" />

              <div className="hidden text-left xl:block">
                <p className="text-[10px] leading-none text-muted-foreground">
                  Saldo
                </p>

                <p className="mt-1 text-xs font-semibold">{walletBalance}</p>
              </div>
            </Link>
          )}

          {showCart && (
            <Link
              href="/keranjang"
              className="flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-muted"
              aria-label="Keranjang"
            >
              <ShoppingCart className="size-5" />
            </Link>
          )}

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Bantuan"
            className="hidden sm:inline-flex"
          >
            <CircleHelp className="size-5" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Notifikasi"
            className="relative"
          >
            <Bell className="size-5" />

            <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive ring-2 ring-background" />
          </Button>

          <div className="mx-1 hidden h-7 w-px bg-border sm:block" />

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  className="h-auto gap-3 px-2 py-1.5"
                />
              }
            >
              <div className="hidden text-right lg:block">
                <p className="max-w-40 truncate text-sm font-medium">
                  {userName}
                </p>

                <p className="text-xs text-muted-foreground">{userRole}</p>
              </div>

              <Avatar className="size-9">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{userName}</span>

                  <span className="text-xs font-normal text-muted-foreground">
                    {userRole}
                  </span>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Link
                  href={profileHref}
                  className="flex w-full items-center gap-2"
                >
                  <UserRound className="size-4" />
                  Profil
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Settings className="size-4" />
                Pengaturan
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem variant="destructive">
                <LogOut className="size-4" />
                Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
