import type { ReactNode } from "react";
import Link from "next/link";

import {
  Bell,
  CircleHelp,
  GraduationCap,
  Settings,
  UserRound,
  WalletCards,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LogoutMenuItem } from "@/features/auth/components/logout-menu-item";
import { CartHeaderButton } from "@/features/cart/components/cart-header-button";

interface GlobalHeaderProps {
  userName?: string;
  userRole?: string;
  navigation?: ReactNode;
  brandHref?: string;
  profileHref?: string;
  showWallet?: boolean;
  walletBalance?: string;
  showCart?: boolean;
  showUserActions?: boolean;
  showAuthActions?: boolean;
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
  showUserActions = true,
  showAuthActions = false,
}: GlobalHeaderProps) {
  const initials = userName
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-navy-steel/10 bg-gradient-to-b from-white via-[#F7FBFF] to-arctic-blue shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-[72px] w-full max-w-[1200px] items-center gap-2 px-4 sm:gap-4 md:px-10">
        
        
        <Link
          href={brandHref}
          className="flex min-w-0 shrink-0 items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <div className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-xl bg-navy-steel text-white">
            <GraduationCap className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="font-heading truncate text-lg sm:text-xl font-bold tracking-tight text-navy-steel">
              SchoolCanteen
            </p>
          </div>
        </Link>

        
        {navigation ? (
          <div className="hidden min-w-0 flex-1 items-center justify-center md:flex">
            {navigation}
          </div>
        ) : (
          <div className="flex-1" />
        )}

        
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-4">
          
          {showWallet && (
            <Link
              href="/student/wallet"
              className="hidden items-center gap-2 rounded-lg border border-arctic-blue bg-white px-3 py-2 transition-colors hover:bg-neutral-surface md:flex"
            >
              <WalletCards className="size-4 text-navy-steel" />
              <div className="hidden text-left xl:block">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Saldo
                </p>
                <p className="text-xs font-bold text-navy-steel">
                  {walletBalance}
                </p>
              </div>
            </Link>
          )}

          {showCart && <CartHeaderButton />}

          
          {showAuthActions && (
            <div className="flex items-center gap-1 sm:gap-3">
              <Button
                nativeButton={false}
                variant="ghost"
                className="hidden font-sans text-sm font-bold text-navy-steel hover:bg-arctic-blue/50 sm:inline-flex"
                render={<Link href="/login" />}
              >
                Masuk
              </Button>

              <Button
                nativeButton={false}
                className="hidden rounded-xl bg-navy-steel px-6 font-sans text-sm font-bold text-white hover:opacity-90 sm:inline-flex"
                render={<Link href="/register" />}
              >
                Daftar
              </Button>

              
              <Link
                href="/login"
                className="inline-flex h-9 items-center justify-center rounded-lg px-3 text-xs font-bold text-navy-steel transition-colors hover:bg-arctic-blue sm:hidden"
              >
                Masuk
              </Link>
            </div>
          )}

          
          {showUserActions && (
            <>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Bantuan"
                className="hidden text-navy-steel hover:bg-arctic-blue/50 sm:inline-flex"
              >
                <CircleHelp className="size-5" />
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Notifikasi"
                className="relative text-navy-steel hover:bg-arctic-blue/50"
              >
                <Bell className="size-5" />
                <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive ring-2 ring-white" />
              </Button>

              <div className="mx-1 hidden h-7 w-px bg-arctic-blue sm:block" />

              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-auto gap-3 px-2 py-1.5 hover:bg-arctic-blue/50"
                    />
                  }
                >
                  <div className="hidden text-right lg:block">
                    <p className="max-w-40 truncate text-sm font-bold text-navy-steel">
                      {userName}
                    </p>
                    <p className="text-xs font-medium text-muted-foreground">
                      {userRole}
                    </p>
                  </div>
                  <Avatar className="size-9 border border-arctic-blue">
                    <AvatarFallback className="bg-neutral-surface text-navy-steel font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56 rounded-xl border-arctic-blue">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span className="font-bold text-navy-steel">{userName}</span>
                        <span className="text-xs font-normal text-muted-foreground">
                          {userRole}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-arctic-blue" />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link href={profileHref} className="flex w-full items-center gap-2">
                        <UserRound className="size-4 text-navy-steel" />
                        <span className="font-medium">Profil</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="size-4 text-navy-steel" />
                      <span className="font-medium">Pengaturan</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-arctic-blue" />
                  <DropdownMenuGroup>
                    <LogoutMenuItem />
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </header>
  );
}