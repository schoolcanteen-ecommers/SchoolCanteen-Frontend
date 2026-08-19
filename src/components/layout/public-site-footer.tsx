"use client";

import {
  usePathname,
} from "next/navigation";

import {
  SiteFooter,
} from "@/components/layout/site-footer";

export function PublicSiteFooter() {
  const pathname =
    usePathname();

  if (
    pathname === "/login" ||
    pathname.startsWith("/login/") ||
    pathname === "/register" ||
    pathname.startsWith("/register/")
  ) {
    return null;
  }

  return <SiteFooter />;
}
