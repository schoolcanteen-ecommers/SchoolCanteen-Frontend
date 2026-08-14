import { ApiError } from "@/lib/api/error";

import type {
  ApiErrorResponse,
  ApiResponse,
} from "@/types/api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is not configured.",
  );
}

interface ApiRequestOptions
  extends Omit<RequestInit, "body"> {
  body?: unknown;

    accessToken?: string;
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const {
    body,
    accessToken,
    headers,
    ...requestOptions
  } = options;

  const requestHeaders =
    new Headers(headers);

  requestHeaders.set(
    "Accept",
    "application/json",
  );

  if (body !== undefined) {
    requestHeaders.set(
      "Content-Type",
      "application/json",
    );
  }

  if (accessToken) {
    requestHeaders.set(
      "Authorization",
      `Bearer ${accessToken}`,
    );
  }

  const normalizedEndpoint =
    endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;

  const response = await fetch(
    `${API_BASE_URL}${normalizedEndpoint}`,
    {
      ...requestOptions,

      headers:
        requestHeaders,

      body:
        body !== undefined
          ? JSON.stringify(body)
          : undefined,
    },
  );

  let payload: unknown;

  try {
    payload =
      await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const errorPayload =
      payload as
        | ApiErrorResponse
        | null;

    throw new ApiError(
      errorPayload?.error?.message ??
        "Terjadi kesalahan saat menghubungi server.",
      response.status,
      errorPayload?.error?.code,
    );
  }

  const result =
    payload as ApiResponse<T>;

  return result.data;
}