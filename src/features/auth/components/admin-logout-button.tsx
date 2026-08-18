"use client";

import {
  useState,
} from "react";
import {
  useRouter,
} from "next/navigation";
import {
  LogOut,
} from "lucide-react";

import {
  createClient,
} from "@/lib/supabase/client";
import {
  cn,
} from "@/lib/utils";

interface AdminLogoutButtonProps {
  compact?: boolean;
  className?: string;
}

export function AdminLogoutButton({
  compact = false,
  className,
}: AdminLogoutButtonProps) {
  const router =
    useRouter();

  const [
    isSigningOut,
    setIsSigningOut,
  ] = useState(false);

  async function handleSignOut() {
    if (isSigningOut) {
      return;
    }

    setIsSigningOut(true);

    const supabase =
      createClient();

    const { error } =
      await supabase.auth.signOut();

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
        "flex w-full items-center rounded-xl text-sm font-semibold text-[#BA1A1A] transition-colors hover:bg-[#FFEEE9] disabled:cursor-not-allowed disabled:opacity-60",
        compact
          ? "justify-center p-3"
          : "gap-3 px-4 py-3",
        className,
      )}
    >
      <LogOut className="size-[18px] shrink-0" />

      {!compact ? (
        <span>
          {isSigningOut
            ? "Keluar..."
            : "Keluar"}
        </span>
      ) : null}
    </button>
  );
}
