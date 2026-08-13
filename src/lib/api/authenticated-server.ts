import { getServerAccessToken } from "@/features/auth/server/get-server-access-token";

import { apiRequest } from "@/lib/api/client";

interface AuthenticatedServerRequestOptions
  extends Omit<RequestInit, "body"> {
  body?: unknown;
}

export async function authenticatedServerApiRequest<T>(
  endpoint: string,
  options: AuthenticatedServerRequestOptions = {},
): Promise<T> {
  const accessToken =
    await getServerAccessToken();

  if (!accessToken) {
    throw new Error(
      "Authenticated session tidak tersedia.",
    );
  }

  return apiRequest<T>(
    endpoint,
    {
      ...options,

      accessToken,

      /*
       * Data authenticated bersifat
       * user-specific.
       */
      cache:
        options.cache ??
        "no-store",
    },
  );
}