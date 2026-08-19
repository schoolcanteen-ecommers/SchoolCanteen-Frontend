import Link from "next/link";

import {
  LoginForm,
} from "@/features/auth/components/login-form";

interface LoginPageProps {
  searchParams: Promise<{
    redirect?: string;
  }>;
}

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const params =
    await searchParams;

  const redirectTo =
    params.redirect ??
    "/student/dashboard";

  return (
    <div className="auth-route-screen">
      <div className="auth-route-inner">
        <section className="auth-card">
          <header className="auth-card-header">
            <h1 className="auth-card-title">
              Masuk
            </h1>

            <p className="auth-card-description">
              Gunakan akun SchoolCanteen kamu untuk melanjutkan.
            </p>
          </header>

          <LoginForm
            redirectTo={redirectTo}
          />

          <div className="auth-card-secondary">
            <p>
              Belum punya akun?{" "}
              <Link
                prefetch={false}
                href={`/register?redirect=${encodeURIComponent(
                  redirectTo,
                )}`}
                className="font-bold text-navy-steel transition-opacity hover:opacity-70"
              >
                Daftar sekarang
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
