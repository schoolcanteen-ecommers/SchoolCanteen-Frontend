import { createClient } from "@/lib/supabase/server";

import type { AuthUser } from "@/types/auth";

export async function getCurrentUser(): Promise<AuthUser | null> {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  const metadataName =
    typeof user.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name.trim()
      : "";

  const emailName =
    user.email?.split("@")[0] ?? "";

  const displayName =
    metadataName ||
    emailName ||
    "Pengguna";

  return {
    id: user.id,
    email: user.email ?? null,
    displayName,
  };
}