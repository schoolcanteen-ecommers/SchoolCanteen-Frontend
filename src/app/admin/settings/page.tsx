import {
  requireRole,
} from "@/features/auth/server/require-role";

import {
  AdminSettingsOverview,
} from "@/features/settings/components/admin/admin-settings-overview";

import {
  createClient,
} from "@/lib/supabase/server";

import packageJson from "../../../../package.json";

export default async function AdminSettingsPage() {
  const profile =
    await requireRole("admin");

  const supabase =
    await createClient();

  const {
    data: sessionData,
  } =
    await supabase.auth.getSession();

  const email =
    sessionData.session?.user.email ??
    null;

  return (
    <AdminSettingsOverview
      profile={profile}
      email={email}
      version={packageJson.version}
    />
  );
}
