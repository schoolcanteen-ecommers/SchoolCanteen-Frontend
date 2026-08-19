import {
  apiRequest,
} from "@/lib/api/client";

import {
  createClient,
} from "@/lib/supabase/client";

export interface UpdateStudentProfilePayload {
  name: string;
  phone: string | null;
}

export async function updateStudentProfile(
  payload:
    UpdateStudentProfilePayload,
) {
  const supabase =
    createClient();

  const {
    data: sessionData,
  } =
    await supabase.auth
      .getSession();

  const accessToken =
    sessionData.session
      ?.access_token;

  if (!accessToken) {
    throw new Error(
      "Session tidak tersedia.",
    );
  }

  return apiRequest(
    "/student/profile",
    {
      method: "PATCH",

      accessToken,

      body: payload,
    },
  );
}
