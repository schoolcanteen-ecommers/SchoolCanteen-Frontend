"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  LockKeyholeOpen,
  User,
  BadgeInfo,
  ArrowRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  registerSchema,
  type RegisterFormValues,
} from "@/features/auth/schemas/auth-schema";

import { createClient } from "@/lib/supabase/client";

interface RegisterFormProps {
  redirectTo?: string;
}

export function RegisterForm({
  redirectTo = "/student/dashboard",
}: RegisterFormProps) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    setAuthError(null);

    const supabase = createClient();

    const safeRedirectTo =
      redirectTo.startsWith("/") && !redirectTo.startsWith("//")
        ? redirectTo
        : "/student/dashboard";

    const confirmationUrl =
      `${window.location.origin}` +
      `/auth/confirm?next=${encodeURIComponent(safeRedirectTo)}`;

    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: confirmationUrl,
        data: {
          full_name: values.name,
          registration_source: "student_self_registration",
        },
      },
    });

    if (error) {
      setAuthError("Pendaftaran gagal. Periksa kembali data yang kamu masukkan.");
      return;
    }

    if (data.session) {
      router.replace(safeRedirectTo);
      router.refresh();
      return;
    }

    setEmailSent(true);
  }

 
  if (emailSent) {
    return (
      <div className="rounded-[24px] border border-[#E6F4FF] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-[#E6F4FF] mb-6">
          <CheckCircle2 className="size-8 text-[#0D1B2A]" />
        </div>

        <h2 className="font-heading text-2xl font-bold text-[#0D1B2A] mb-3">
          Cek email kamu
        </h2>

        <p className="font-sans text-sm leading-relaxed text-[#536069] mb-6">
          Kami sudah mengirim link konfirmasi ke email yang kamu daftarkan. Setelah dikonfirmasi, kamu bisa masuk.
        </p>

        <Button
          nativeButton={false}
<<<<<<< HEAD
          className="h-[52px] w-full rounded-[14px] border-[#E6F4FF] text-[#0D1B2A] font-bold font-sans hover:bg-[#F8FAFC]"
=======
          className="h-12 w-full rounded-xl border-[#E6F4FF] text-[#0D1B2A] font-bold font-sans hover:bg-[#F8FAFC]"
>>>>>>> source/main
          variant="outline"
          render={
            <Link
              href={`/login?redirect=${encodeURIComponent(redirectTo)}`}
            />
          }
        >
          Kembali ke Login
        </Button>
      </div>
    );
  }

 
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-4">
      
      
      <div className="space-y-1.5">
        <label htmlFor="name" className="sr-only">Nama lengkap</label>
        <div className="relative group">
          <User className="absolute z-10 left-4 top-1/2 size-5 -translate-y-1/2 text-[#536069]/60 transition-colors group-focus-within:text-[#0D1B2A]" />
          <Input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Masukkan nama lengkap"
<<<<<<< HEAD
            className="h-[52px] w-full rounded-[14px] border-[#E6F4FF] bg-[#F8FAFC] pl-12 pr-4 font-sans text-[#0D1B2A] transition-all placeholder:text-[#536069]/60 hover:bg-[#E6F4FF]/30 focus-visible:border-[#0D1B2A] focus-visible:ring-1 focus-visible:ring-[#0D1B2A]"
=======
            className="h-12 w-full rounded-xl border-[#E6F4FF] bg-[#F8FAFC] pl-12 pr-4 font-sans text-[#0D1B2A] transition-all placeholder:text-[#536069]/60 hover:bg-[#E6F4FF]/30 focus-visible:border-[#0D1B2A] focus-visible:ring-1 focus-visible:ring-[#0D1B2A]"
>>>>>>> source/main
            {...register("name")}
          />
        </div>
        {errors.name && <p className="text-xs font-medium text-destructive px-1">{errors.name.message}</p>}
      </div>

      
      <div className="space-y-1.5">
        <label htmlFor="email" className="sr-only">Email / Username</label>
        <div className="relative group">
          <BadgeInfo className="absolute z-10 left-4 top-1/2 size-5 -translate-y-1/2 text-[#536069]/60 transition-colors group-focus-within:text-[#0D1B2A]" />
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Masukkan email atau username"
<<<<<<< HEAD
            className="h-[52px] w-full rounded-[14px] border-[#E6F4FF] bg-[#F8FAFC] pl-12 pr-4 font-sans text-[#0D1B2A] transition-all placeholder:text-[#536069]/60 hover:bg-[#E6F4FF]/30 focus-visible:border-[#0D1B2A] focus-visible:ring-1 focus-visible:ring-[#0D1B2A]"
=======
            className="h-12 w-full rounded-xl border-[#E6F4FF] bg-[#F8FAFC] pl-12 pr-4 font-sans text-[#0D1B2A] transition-all placeholder:text-[#536069]/60 hover:bg-[#E6F4FF]/30 focus-visible:border-[#0D1B2A] focus-visible:ring-1 focus-visible:ring-[#0D1B2A]"
>>>>>>> source/main
            {...register("email")}
          />
        </div>
        {errors.email && <p className="text-xs font-medium text-destructive px-1">{errors.email.message}</p>}
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        <div className="space-y-1.5">
          <label htmlFor="password" className="sr-only">Password</label>
          <div className="relative group">
            <LockKeyhole className="absolute z-10 left-4 top-1/2 size-5 -translate-y-1/2 text-[#536069]/60 transition-colors group-focus-within:text-[#0D1B2A]"/>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Buat password"
<<<<<<< HEAD
              className="h-[52px] w-full rounded-[14px] border-[#E6F4FF] bg-[#F8FAFC] pl-12 pr-10 font-sans text-[#0D1B2A] transition-all placeholder:text-[#536069]/60 hover:bg-[#E6F4FF]/30 focus-visible:border-[#0D1B2A] focus-visible:ring-1 focus-visible:ring-[#0D1B2A]"
=======
              className="h-12 w-full rounded-xl border-[#E6F4FF] bg-[#F8FAFC] pl-12 pr-10 font-sans text-[#0D1B2A] transition-all placeholder:text-[#536069]/60 hover:bg-[#E6F4FF]/30 focus-visible:border-[#0D1B2A] focus-visible:ring-1 focus-visible:ring-[#0D1B2A]"
>>>>>>> source/main
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              className="absolute z-10 right-3 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center text-[#536069]/60 transition-colors hover:text-[#0D1B2A] focus:outline-none"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs font-medium text-destructive px-1">{errors.password.message}</p>}
        </div>

        
        <div className="space-y-1.5">
          <label htmlFor="confirmPassword" className="sr-only">Konfirmasi password</label>
          <div className="relative group">
            <LockKeyholeOpen className="absolute z-10 left-4 top-1/2 size-5 -translate-y-1/2 text-[#536069]/60 transition-colors group-focus-within:text-[#0D1B2A]"/>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Ulangi password"
<<<<<<< HEAD
              className="h-[52px] w-full rounded-[14px] border-[#E6F4FF] bg-[#F8FAFC] pl-12 pr-10 font-sans text-[#0D1B2A] transition-all placeholder:text-[#536069]/60 hover:bg-[#E6F4FF]/30 focus-visible:border-[#0D1B2A] focus-visible:ring-1 focus-visible:ring-[#0D1B2A]"
=======
              className="h-12 w-full rounded-xl border-[#E6F4FF] bg-[#F8FAFC] pl-12 pr-10 font-sans text-[#0D1B2A] transition-all placeholder:text-[#536069]/60 hover:bg-[#E6F4FF]/30 focus-visible:border-[#0D1B2A] focus-visible:ring-1 focus-visible:ring-[#0D1B2A]"
>>>>>>> source/main
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((current) => !current)}
              aria-label={showConfirmPassword ? "Sembunyikan konfirmasi password" : "Tampilkan konfirmasi password"}
              className="absolute z-10 right-3 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center text-[#536069]/60 transition-colors hover:text-[#0D1B2A] focus:outline-none"
            >
              {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs font-medium text-destructive px-1">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      
      {authError && (
        <div role="alert" className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 mt-4">
          <p className="text-sm font-medium text-destructive">{authError}</p>
        </div>
      )}

      
      <div className="pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
<<<<<<< HEAD
          className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] bg-[#0D1B2A] font-sans text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#0D1B2A]/90 active:translate-y-0"
=======
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0D1B2A] font-sans text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#0D1B2A]/90 active:translate-y-0"
>>>>>>> source/main
        >
          {isSubmitting ? "Mendaftarkan..." : "Daftar Akun"}
          {!isSubmitting && <ArrowRight className="size-5" />}
        </Button>
      </div>
    </form>
  );
}