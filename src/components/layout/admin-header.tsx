"use client";

import {
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import {
  usePathname,
} from "next/navigation";
import {
  Bell,
  ChevronDown,
  CircleHelp,
  GraduationCap,
  Menu,
  Settings,
} from "lucide-react";

import {
  AdminNavigation,
} from "@/components/layout/admin-navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Button,
} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AdminLogoutButton,
} from "@/features/auth/components/admin-logout-button";
import {
  LogoutMenuItem,
} from "@/features/auth/components/logout-menu-item";
import {
  adminNavigation,
} from "@/lib/navigation";

interface AdminHeaderProps {
  userName: string;
  avatarUrl?: string | null;
}

export function AdminHeader({
  userName,
  avatarUrl,
}: AdminHeaderProps) {
  const pathname =
    usePathname();

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  const pageTitle =
    useMemo(
      () =>
        getAdminPageTitle(
          pathname,
        ),
      [pathname],
    );

  const initials =
    userName
      .split(" ")
      .map((word) =>
        word.charAt(0),
      )
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <>
      <header className="sticky top-0 z-40 hidden h-[72px] items-center justify-between border-b border-[#E6EAED] bg-white/90 px-8 backdrop-blur lg:flex">
        <div>
          <h1 className="font-heading text-[24px] font-bold leading-tight text-navy-steel">
            {pageTitle}
          </h1>

          {pathname ===
          "/admin/dashboard" ? (
            <p className="mt-0.5 text-sm text-[#66737C]">
              Overview aktivitas SchoolCanteen hari ini.
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Notifikasi"
            className="text-navy-steel hover:bg-arctic-blue"
          >
            <Bell className="size-5" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Bantuan"
            className="text-navy-steel hover:bg-arctic-blue"
          >
            <CircleHelp className="size-5" />
          </Button>

          <div className="mx-1 h-8 w-px bg-[#E1E6EA]" />

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  className="h-auto gap-3 px-2 py-1.5 hover:bg-arctic-blue/60"
                />
              }
            >
              <AdminAvatar
                userName={userName}
                avatarUrl={avatarUrl}
                initials={initials}
              />

              <div className="hidden text-left xl:block">
                <p className="max-w-44 truncate text-sm font-bold text-navy-steel">
                  {userName}
                </p>
                <p className="text-[11px] text-[#66737C]">
                  School Admin
                </p>
              </div>

              <ChevronDown className="size-4 text-[#66737C]" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 rounded-xl"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-bold text-navy-steel">
                      {userName}
                    </span>
                    <span className="text-xs font-normal text-muted-foreground">
                      School Admin
                    </span>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Link
                  href="/admin/settings"
                  className="flex w-full items-center gap-2"
                >
                  <Settings className="size-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <LogoutMenuItem />
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <header className="sticky top-0 z-40 flex h-[72px] items-center justify-between border-b border-[#E4E9ED] bg-gradient-to-b from-white to-arctic-blue/25 px-4 backdrop-blur lg:hidden">
        <Link
          href="/admin/dashboard"
          className="flex min-w-0 items-center gap-2.5"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-navy-steel text-white">
            <GraduationCap className="size-5" />
          </div>
          <span className="font-heading truncate text-xl font-bold text-navy-steel">
            SchoolCanteen
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Notifikasi"
            className="text-navy-steel hover:bg-arctic-blue"
          >
            <Bell className="size-5" />
          </Button>

          <AdminAvatar
            userName={userName}
            avatarUrl={avatarUrl}
            initials={initials}
          />

          <Sheet
            open={mobileOpen}
            onOpenChange={setMobileOpen}
          >
            <SheetTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Buka menu admin"
                  className="text-navy-steel hover:bg-arctic-blue"
                />
              }
            >
              <Menu className="size-6" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[88%] max-w-[340px] gap-0 bg-white p-0"
            >
              <SheetHeader className="border-b border-[#E7EBEE] px-5 py-5 text-left">
                <SheetTitle className="flex items-center gap-3 font-heading text-xl font-bold text-navy-steel">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-navy-steel text-white">
                    <GraduationCap className="size-5" />
                  </span>
                  SchoolCanteen
                </SheetTitle>
                <SheetDescription className="pl-12 text-xs">
                  Admin Console
                </SheetDescription>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto px-4 py-5">
                <AdminNavigation
                  onNavigate={() =>
                    setMobileOpen(
                      false,
                    )
                  }
                />
              </div>

              <div className="border-t border-[#E7EBEE] p-4">
                <Link
                  href="/admin/settings"
                  onClick={() =>
                    setMobileOpen(
                      false,
                    )
                  }
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#536069] transition-colors hover:bg-[#F2F4F6] hover:text-navy-steel"
                >
                  <Settings className="size-[18px]" />
                  Settings
                </Link>

                <AdminLogoutButton />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}

interface AdminAvatarProps {
  userName: string;
  avatarUrl?: string | null;
  initials: string;
}

function AdminAvatar({
  userName,
  avatarUrl,
  initials,
}: AdminAvatarProps) {
  return (
    <Avatar className="size-9 border border-arctic-blue bg-white">
      {avatarUrl ? (
        <AvatarImage
          src={avatarUrl}
          alt={`${userName} avatar`}
        />
      ) : null}

      <AvatarFallback className="bg-[#F2F4F6] text-xs font-bold text-navy-steel">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}

function getAdminPageTitle(
  pathname: string,
): string {
  if (
    pathname ===
    "/admin/settings"
  ) {
    return "Settings";
  }

  for (const group of adminNavigation) {
    for (const item of group.items) {
      if (
        item.href &&
        (pathname === item.href ||
          pathname.startsWith(
            `${item.href}/`,
          ))
      ) {
        return item.title;
      }

      for (
        const child of
        item.children ?? []
      ) {
        if (
          child.href &&
          (pathname === child.href ||
            pathname.startsWith(
              `${child.href}/`,
            ))
        ) {
          return child.title;
        }
      }
    }
  }

  return "Admin Console";
}
