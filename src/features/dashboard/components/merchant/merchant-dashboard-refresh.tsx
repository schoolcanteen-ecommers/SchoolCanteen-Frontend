"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

import { cn } from "@/lib/utils";

export function MerchantDashboardRefresh() {
  const router = useRouter();
  const [isRefreshing, startRefresh] = useTransition();

  return (
    <button
      type="button"
      aria-label="Perbarui dashboard"
      disabled={isRefreshing}
      onClick={() => {
        startRefresh(() => {
          router.refresh();
        });
      }}
      className="flex size-8 items-center justify-center rounded-full text-[#536069] transition-colors hover:bg-white hover:text-navy-steel disabled:cursor-not-allowed disabled:opacity-60"
    >
      <RefreshCw className={cn("size-4", isRefreshing && "animate-spin")} />
    </button>
  );
}
