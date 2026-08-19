import {
  GlobalHeader,
} from "@/components/layout/global-header";

import {
  PublicBottomNav,
} from "@/components/layout/public-bottom-nav";

import {
  TopNavigation,
} from "@/components/layout/top-navigation";

import {
  getPublicCurrentUser,
  getPublicRoleHome,
  getPublicRoleLabel,
} from "@/features/auth/server/public-user";

export function PublicHeaderFallback() {
  return (
    <GlobalHeader
      brandHref="/"
      navigation={
        <TopNavigation
          source="public"
        />
      }
      showCart
      showAuthActions={
        false
      }
      showUserActions={
        false
      }
    />
  );
}

export async function PublicHeaderSession() {
  const currentUser =
    await getPublicCurrentUser();

  const isLoggedIn =
    currentUser !== null;

  const navigationSource:
    | "public"
    | "student" =
      currentUser?.role ===
      "student"
        ? "student"
        : "public";

  const brandHref =
    currentUser
      ? getPublicRoleHome(
          currentUser.role,
        )
      : "/";

  const profileHref =
    currentUser?.role ===
    "student"
      ? "/student/profile"
      : "#";

  return (
    <GlobalHeader
      brandHref={
        brandHref
      }
      navigation={
        <TopNavigation
          source={
            navigationSource
          }
        />
      }
      showCart
      showAuthActions={
        !isLoggedIn
      }
      showUserActions={
        isLoggedIn
      }
      userName={
        currentUser?.name
      }
      userRole={
        currentUser
          ? getPublicRoleLabel(
              currentUser.role,
            )
          : undefined
      }
      profileHref={
        profileHref
      }
    />
  );
}

export function PublicBottomNavFallback() {
  return (
    <PublicBottomNav />
  );
}

export async function PublicBottomNavSession() {
  const currentUser =
    await getPublicCurrentUser();

  return (
    <PublicBottomNav />
  );
}
