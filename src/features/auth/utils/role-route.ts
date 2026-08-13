import type {
  UserRole,
} from "@/types/profile";

const ROLE_HOME_ROUTES: Record<
  UserRole,
  string
> = {
  student: "/student/dashboard",
  merchant: "/merchant/dashboard",
  admin: "/admin/dashboard",
};

const ROLE_ROUTE_PREFIXES: Record<
  UserRole,
  string
> = {
  student: "/student",
  merchant: "/merchant",
  admin: "/admin",
};

export function getRoleHomeRoute(
  role: UserRole,
): string {
  return ROLE_HOME_ROUTES[role];
}

export function getRedirectForRole(
  role: UserRole,
  requestedRedirect?: string,
): string {
  const fallback =
    getRoleHomeRoute(role);

  if (!requestedRedirect) {
    return fallback;
  }

  const isSafeInternalRoute =
    requestedRedirect.startsWith("/") &&
    !requestedRedirect.startsWith("//");

  if (!isSafeInternalRoute) {
    return fallback;
  }

  const allowedPrefix =
    ROLE_ROUTE_PREFIXES[role];

  if (
    requestedRedirect.startsWith(
      allowedPrefix,
    )
  ) {
    return requestedRedirect;
  }

  return fallback;
}