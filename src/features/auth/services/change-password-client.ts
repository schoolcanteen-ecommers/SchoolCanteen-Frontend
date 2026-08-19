import {
  createClient,
} from "@/lib/supabase/client";

interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export async function changeCurrentUserPassword({
  currentPassword,
  newPassword,
}: ChangePasswordPayload): Promise<void> {
  const supabase =
    createClient();

  const {
    data: userData,
    error: userError,
  } =
    await supabase.auth.getUser();

  const email =
    userData.user?.email;

  if (
    userError ||
    !email
  ) {
    throw new Error(
      "SESSION_UNAVAILABLE",
    );
  }

  /*
   * Verifikasi password lama.
   * Sekaligus membuat sesi menjadi recent.
   */
  const {
    error: signInError,
  } =
    await supabase.auth
      .signInWithPassword({
        email,
        password:
          currentPassword,
      });

  if (signInError) {
    throw new Error(
      "CURRENT_PASSWORD_INVALID",
    );
  }

  const {
    error: updateError,
  } =
    await supabase.auth.updateUser({
      password:
        newPassword,
    });

  if (updateError) {
    if (
      updateError.code ===
      "reauthentication_needed"
    ) {
      throw new Error(
        "REAUTHENTICATION_NEEDED",
      );
    }

    throw updateError;
  }
}
