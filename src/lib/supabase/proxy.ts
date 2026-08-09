import { createServerClient } from "@supabase/ssr";

import {
  NextResponse,
  type NextRequest,
} from "next/server";

export async function updateSession(
  request: NextRequest,
) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env
      .NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(
            ({ name, value }) => {
              request.cookies.set(
                name,
                value,
              );
            },
          );

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(
            ({
              name,
              value,
              options,
            }) => {
              response.cookies.set(
                name,
                value,
                options,
              );
            },
          );
        },
      },
    },
  );

  /*
   * Verifikasi identity sekaligus
   * membantu refresh cookie session.
   */
  const {
    data,
    error,
  } =
    await supabase.auth.getClaims();

  const isAuthenticated =
    !error &&
    Boolean(data?.claims);

  const pathname =
    request.nextUrl.pathname;

  /*
   * Area yang wajib login.
   */
  const isProtectedRoute =
    pathname.startsWith("/student") ||
    pathname.startsWith("/merchant") ||
    pathname.startsWith("/admin");

  /*
   * Guest membuka protected route.
   */
  if (
    isProtectedRoute &&
    !isAuthenticated
  ) {
    const loginUrl =
      request.nextUrl.clone();

    loginUrl.pathname = "/login";

    const redirectTarget =
      `${pathname}${request.nextUrl.search}`;

    loginUrl.searchParams.set(
      "redirect",
      redirectTarget,
    );

    return NextResponse.redirect(
      loginUrl,
    );
  }

  return response;
}