import {
  createServerClient,
} from "@supabase/ssr";

import {
  NextResponse,
  type NextRequest,
} from "next/server";

import {
  getCurrentProfile,
} from "@/features/auth/services/profile-service";

import {
  getRoleHomeRoute,
} from "@/features/auth/utils/role-route";

import type {
  UserRole,
} from "@/types/profile";


function isProtectedRoute(
  pathname: string,
) {
  return (
    pathname.startsWith(
      "/student",
    ) ||
    pathname.startsWith(
      "/merchant",
    ) ||
    pathname.startsWith(
      "/admin",
    )
  );
}


function isGuestOnlyRoute(
  pathname: string,
) {
  return (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith(
      "/kantin",
    ) ||
    pathname.startsWith(
      "/koperasi",
    ) ||
    pathname.startsWith(
      "/produk",
    )
  );
}


function getStudentPublicRedirect(
  pathname: string,
) {
  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/register"
  ) {
    return "/student/dashboard";
  }

  if (
    pathname.startsWith(
      "/kantin",
    )
  ) {
    return pathname.replace(
      /^\/kantin/,
      "/student/kantin",
    );
  }

  if (
    pathname.startsWith(
      "/koperasi",
    )
  ) {
    return pathname.replace(
      /^\/koperasi/,
      "/student/koperasi",
    );
  }

  if (
    pathname.startsWith(
      "/produk",
    )
  ) {
    return `/student${pathname}`;
  }

  return "/student/dashboard";
}


function getAuthenticatedRedirect(
  role: UserRole,
  pathname: string,
) {
  if (
    role === "student"
  ) {
    return getStudentPublicRedirect(
      pathname,
    );
  }

  return getRoleHomeRoute(
    role,
  );
}


export async function updateSession(
  request: NextRequest,
) {
  let response =
    NextResponse.next({
      request,
    });

  const supabase =
    createServerClient(
      process.env
        .NEXT_PUBLIC_SUPABASE_URL!,

      process.env
        .NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,

      {
        cookies: {
          getAll() {
            return request
              .cookies
              .getAll();
          },

          setAll(
            cookiesToSet,
          ) {
            cookiesToSet.forEach(
              ({
                name,
                value,
              }) => {
                request.cookies.set(
                  name,
                  value,
                );
              },
            );

            response =
              NextResponse.next({
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
<<<<<<< HEAD
    },
  );

    const {
    data,
    error,
  } =
    await supabase.auth.getClaims();

  const isAuthenticated =
    !error &&
    Boolean(data?.claims);
=======
    );
>>>>>>> source/main

  const pathname =
    request.nextUrl.pathname;

<<<<<<< HEAD
    const isProtectedRoute =
    pathname.startsWith("/student") ||
    pathname.startsWith("/merchant") ||
    pathname.startsWith("/admin");

    if (
    isProtectedRoute &&
=======
  const protectedRoute =
    isProtectedRoute(
      pathname,
    );

  const guestOnlyRoute =
    isGuestOnlyRoute(
      pathname,
    );

  const {
    data:
      claimsData,

    error:
      claimsError,
  } =
    await supabase.auth
      .getClaims();

  const isAuthenticated =
    !claimsError &&
    Boolean(
      claimsData?.claims,
    );


  /*
   * Guest mencoba membuka protected route.
   */
  if (
    protectedRoute &&
>>>>>>> source/main
    !isAuthenticated
  ) {
    const loginUrl =
      request.nextUrl.clone();

    loginUrl.pathname =
      "/login";

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


  /*
   * Guest membuka Public.
   *
   * Tidak perlu /me.
   */
  if (
    !isAuthenticated
  ) {
    return response;
  }


  /*
   * Authenticated user sudah berada
   * pada route role.
   *
   * Biarkan layout requireRole()
   * melakukan authorization.
   *
   * Ini penting supaya /me tidak
   * diduplikasi Proxy untuk semua
   * Student page.
   */
  if (
    !guestOnlyRoute
  ) {
    return response;
  }


  /*
   * Sampai sini:
   *
   * user authenticated
   * +
   * mencoba membuka guest-only Public.
   *
   * Baru kita perlu mengetahui role.
   */
  const {
    data:
      sessionData,
  } =
    await supabase.auth
      .getSession();

  const accessToken =
    sessionData
      .session
      ?.access_token;

  if (
    !accessToken
  ) {
    return response;
  }

  try {
    const profile =
      await getCurrentProfile(
        accessToken,
      );

    const targetPath =
      getAuthenticatedRedirect(
        profile.role,
        pathname,
      );

    const redirectUrl =
      request.nextUrl.clone();

    redirectUrl.pathname =
      targetPath;

    /*
     * Product detail membutuhkan
     * ?source=kantin/koperasi.
     *
     * Untuk login/register/root,
     * query redirect lama dibuang.
     */
    if (
      pathname === "/" ||
      pathname === "/login" ||
      pathname === "/register"
    ) {
      redirectUrl.search =
        "";
    }

    return NextResponse.redirect(
      redirectUrl,
    );
  } catch {
    /*
     * Jangan membuat redirect loop
     * bila backend /me sedang gagal.
     */
    return response;
  }
}
