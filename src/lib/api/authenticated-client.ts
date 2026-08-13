import { getAccessToken } from "@/features/auth/client/get-access-token";

import { apiRequest } from "@/lib/api/client";

interface AuthenticatedApiRequestOptions
  extends Omit<RequestInit, "body"> {
  body?: unknown;
}

export async function authenticatedApiRequest<T>(
  endpoint: string,
  options: AuthenticatedApiRequestOptions = {},
): Promise<T> {
  const accessToken =
    await getAccessToken();

  return apiRequest<T>(
    endpoint,
    {
      ...options,
      accessToken,
    },
  );
}