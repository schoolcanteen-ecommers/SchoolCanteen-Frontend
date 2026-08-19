import type {
  NextRequest,
} from "next/server";

import {
  updateSession,
} from "@/lib/supabase/proxy";

export async function proxy(
  request: NextRequest,
) {
  return updateSession(
    request,
  );
}

export const config = {
  matcher: [
    "/",

    "/login",
    "/register",

    "/kantin/:path*",
    "/koperasi/:path*",
    "/produk/:path*",

    "/student/:path*",
    "/merchant/:path*",
    "/admin/:path*",
  ],
};
