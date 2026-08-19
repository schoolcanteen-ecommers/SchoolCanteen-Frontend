import {
  GraduationCap,
} from "lucide-react";

import {
  ResetPasswordForm,
} from "@/features/auth/components/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F9FB] px-4 py-10">
      <div className="w-full max-w-[430px]">
        <div className="mb-6 flex items-center justify-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-navy-steel text-white">
            <GraduationCap className="size-5" />
          </div>

          <span className="font-heading text-lg font-bold text-navy-steel">
            SchoolCanteen
          </span>
        </div>

        <section className="rounded-[22px] border border-[#DDE7ED] bg-white p-6 shadow-[0_12px_32px_rgba(13,27,42,0.05)] sm:p-7">
          <ResetPasswordForm />
        </section>
      </div>
    </main>
  );
}
