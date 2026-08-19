"use client";

import {
  GraduationCap,
} from "lucide-react";

import Link from "next/link";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface MerchantHeaderProps {
  userName: string;
  avatarUrl?: string | null;
}

export function MerchantHeader({
  userName,
  avatarUrl,
}: MerchantHeaderProps) {
  const initials =
    userName
      .split(/\s+/)
      .filter(Boolean)
      .map(
        (part) =>
          part.charAt(0),
      )
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b border-[#E2E8F0] bg-white/95 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <Link
          href="/merchant/dashboard"
          className="flex min-w-0 items-center gap-3 lg:hidden"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy-steel text-white shadow-sm">
            <GraduationCap className="size-5" />
          </span>

          <span className="min-w-0">
            <span className="block truncate font-heading text-lg font-bold leading-tight text-navy-steel">
              SchoolCanteen
            </span>

            <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#64748B]">
              Merchant
            </span>
          </span>
        </Link>

        <div className="hidden lg:block" />

        <Link
          href="/merchant/settings"
          aria-label="Buka pengaturan merchant"
          className="ml-auto flex min-h-11 items-center gap-3 rounded-xl px-1.5 transition hover:bg-[#F1F5F9]"
        >
          <div className="hidden text-right lg:block">
            <p className="max-w-48 truncate text-sm font-bold text-navy-steel">
              {
                userName
              }
            </p>

            <p className="text-[11px] font-medium text-[#64748B]">
              Merchant
            </p>
          </div>

          <Avatar className="size-10 border border-[#D8E2EA] bg-white">
            {avatarUrl ? (
              <AvatarImage
                src={
                  avatarUrl
                }
                alt={
                  userName
                }
              />
            ) : null}

            <AvatarFallback className="bg-[#EAF5FF] text-xs font-bold text-navy-steel">
              {
                initials
              }
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
