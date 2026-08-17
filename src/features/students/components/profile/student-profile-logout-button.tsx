"use client";

import {
  LogOut,
} from "lucide-react";
import {
  useRouter,
} from "next/navigation";
import {
  useState,
} from "react";

import {
  createClient,
} from "@/lib/supabase/client";

export function StudentProfileLogoutButton() {
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
      className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-navy-steel px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-navy-steel transition-colors hover:bg-navy-steel hover:text-white disabled:cursor-not-allowed disabled:opacity-60 lg:w-auto lg:border lg:normal-case lg:tracking-normal"
    >
      <LogOut className="size-5" />
      {isSigningOut
        ? "Keluar..."
        : "Keluar"}
    </button>
  );
}
