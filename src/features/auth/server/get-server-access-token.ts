import { createClient } from "@/lib/supabase/server";

export async function getServerAccessToken(): Promise<
  string | null
> {
  const supabase =
    await createClient();

  const {
    data: { session },
    error,
  } =
    await supabase.auth.getSession();

  if (
    error ||
    !session?.access_token
  ) {
    return null;
  }

  return session.access_token;
}