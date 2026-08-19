"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface MerchantLogoutButtonProps {
  className?: string;
}

export function MerchantLogoutButton({
  className,
}: MerchantLogoutButtonProps) {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    if (isSigningOut) {
      return;
    }

    setIsSigningOut(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      setIsSigningOut(false);
      return;
    }

    router.replace("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      disabled={isSigningOut}
      onClick={handleSignOut}
      className={cn(
        "flex w-full items-center gap-3 rounded-[10px] px-4 py-3 text-sm font-semibold text-[#991B1B] transition-colors hover:bg-[#FEF2F2] disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    >
      <LogOut className="size-[18px] shrink-0" />
      <span>{isSigningOut ? "Keluar..." : "Logout"}</span>
    </button>
  );
}
