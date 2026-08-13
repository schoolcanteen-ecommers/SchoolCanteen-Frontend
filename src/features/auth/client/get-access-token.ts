import { createClient } from "@/lib/supabase/client";

export async function getAccessToken(): Promise<string> {
  const supabase = createClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session?.access_token) {
    throw new Error(
      "Session pengguna tidak tersedia.",
    );
  }

  return session.access_token;
}