import Link from "next/link";

import {
  RegisterForm,
} from "@/features/auth/components/register-form";

interface RegisterPageProps {
  searchParams: Promise<{
    redirect?: string;
  }>;
}

export default async function RegisterPage({
  searchParams,
}: RegisterPageProps) {
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
              Buat akun
            </h1>

            <p className="auth-card-description">
              Daftar sebagai siswa untuk mulai menggunakan SchoolCanteen.
            </p>
          </header>

          <RegisterForm
            redirectTo={redirectTo}
          />

          <div className="auth-card-secondary">
            <p>
              Sudah punya akun?{" "}
              <Link
                prefetch={false}
                href={`/login?redirect=${encodeURIComponent(
                  redirectTo,
                )}`}
                className="font-bold text-navy-steel transition-opacity hover:opacity-70"
              >
                Masuk
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
