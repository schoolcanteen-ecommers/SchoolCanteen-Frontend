"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { LogOut } from "lucide-react";

import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { createClient } from "@/lib/supabase/client";

export function LogoutMenuItem() {
  const router = useRouter();

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
    <DropdownMenuItem
      variant="destructive"
      disabled={isSigningOut}
      onClick={handleSignOut}
    >
      <LogOut className="size-4" />

      {isSigningOut
        ? "Keluar..."
        : "Keluar"}
    </DropdownMenuItem>
  );
}