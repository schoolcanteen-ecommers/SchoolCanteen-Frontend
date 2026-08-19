import {
  ForgotPasswordForm,
} from "@/features/auth/components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="auth-route-screen">
      <div className="auth-route-inner">
        <section className="auth-card">
          <ForgotPasswordForm />
        </section>
      </div>
    </div>
  );
}
