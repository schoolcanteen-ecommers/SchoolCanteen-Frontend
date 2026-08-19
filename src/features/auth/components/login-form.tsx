"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LockKeyhole, User } from "lucide-react";

import { Button } from "@/components/ui/button";

import { getCurrentProfile } from "@/features/auth/services/profile-service";
import { Input } from "@/components/ui/input";

import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/auth-schema";

<<<<<<< HEAD
import { getCurrentProfile } from "@/features/auth/services/profile-service";
=======
>>>>>>> source/main
import { getRedirectForRole } from "@/features/auth/utils/role-route";
import { createClient } from "@/lib/supabase/client";

interface LoginFormProps {
  redirectTo?: string;
}

export function LoginForm({
  redirectTo = "/student/dashboard",
}: LoginFormProps) {
<<<<<<< HEAD
  const router = useRouter();
=======
>>>>>>> source/main
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setAuthError(null);
<<<<<<< HEAD
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
=======

    const supabase =
      createClient();

    const {
      data,
      error,
    } =
      await supabase.auth
        .signInWithPassword({
          email:
            values.email,

          password:
            values.password,
        });

    if (
      error ||
      !data.session
    ) {
      setAuthError(
        "Email atau password tidak valid.",
      );
>>>>>>> source/main

    if (error || !data.session) {
      setAuthError("Email atau password tidak valid.");
      return;
    }

<<<<<<< HEAD
    const accessToken = data.session.access_token;

    try {
      const profile = await getCurrentProfile(accessToken);
      const targetRoute = getRedirectForRole(profile.role, redirectTo);

      router.replace(targetRoute);
      router.refresh();
=======
    const accessToken =
      data.session.access_token;

    try {
      /*
       * Untuk sekarang prioritaskan correctness:
       * backend menentukan role aktual pengguna.
       */
      const profile =
        await getCurrentProfile(
          accessToken,
        );

      const targetRoute =
        getRedirectForRole(
          profile.role,
          redirectTo,
        );

      /*
       * Hard navigation sengaja digunakan setelah
       * login agar cookie Supabase pasti ikut ke
       * request protected berikutnya.
       */
      window.location.replace(
        targetRoute,
      );
>>>>>>> source/main
    } catch {
      await supabase.auth.signOut();
      setAuthError("Login berhasil, tetapi profil akun tidak dapat dimuat.");
    }

  }

  return (
<<<<<<< HEAD
    <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-5">
=======
    <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-4">
>>>>>>> source/main
      
      
      <div className="space-y-2">
        <label htmlFor="email" className="sr-only">
          Email / Username
        </label>
        <div className="relative group">
          <User className="absolute z-10 left-4 top-1/2 size-5 -translate-y-1/2 text-[#536069]/60 transition-colors group-focus-within:text-[#0D1B2A]" />
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Masukkan email atau username"
<<<<<<< HEAD
            className="h-[52px] w-full rounded-[14px] border-[#E6F4FF] bg-[#F8FAFC] pl-12 pr-4 font-sans text-[#0D1B2A] transition-all placeholder:text-[#536069]/60 hover:bg-[#E6F4FF]/30 focus-visible:border-[#0D1B2A] focus-visible:ring-1 focus-visible:ring-[#0D1B2A]"
=======
            className="h-12 w-full rounded-xl border-[#DCEAF3] bg-[#F8FAFC] pl-11 pr-4 text-[14px] text-navy-steel shadow-none transition-all placeholder:text-muted-foreground/70 hover:bg-[#F4F8FB] focus-visible:border-navy-steel/30 focus-visible:ring-4 focus-visible:ring-arctic-blue/60"
>>>>>>> source/main
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="text-xs font-medium text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      
      <div className="space-y-2">
        <div className="flex items-center justify-end">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
        </div>
        <div className="relative group">
          <LockKeyhole className="absolute z-10 left-4 top-1/2 size-5 -translate-y-1/2 text-[#536069]/60 transition-colors group-focus-within:text-[#0D1B2A]" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Masukkan password"
<<<<<<< HEAD
            className="h-[52px] w-full rounded-[14px] border-[#E6F4FF] bg-[#F8FAFC] pl-12 pr-12 font-sans text-[#0D1B2A] transition-all hover:bg-[#E6F4FF]/30 focus-visible:border-[#0D1B2A] focus-visible:ring-1 focus-visible:ring-[#0D1B2A]"
=======
            className="h-12 w-full rounded-xl border-[#DCEAF3] bg-[#F8FAFC] pl-11 pr-11 text-[14px] text-navy-steel shadow-none transition-all placeholder:text-muted-foreground/70 hover:bg-[#F4F8FB] focus-visible:border-navy-steel/30 focus-visible:ring-4 focus-visible:ring-arctic-blue/60"
>>>>>>> source/main
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            className="absolute z-10 right-4 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center text-[#536069] transition-colors hover:text-[#0D1B2A] focus:outline-none"
          >
            {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        </div>
        
        {errors.password && (
          <p className="text-xs font-medium text-destructive">
            {errors.password.message}
          </p>
        )}
        
        
        <div className="flex w-full justify-end pt-1">
          <Link
<<<<<<< HEAD
            href="#"
=======
            href="/forgot-password"
>>>>>>> source/main
            className="font-sans text-xs font-bold text-[#536069] underline-offset-4 hover:text-[#0D1B2A] hover:underline"
          >
            Lupa Password?
          </Link>
        </div>
      </div>

      
      {authError && (
        <div role="alert" className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3">
          <p className="text-sm font-medium text-destructive">{authError}</p>
        </div>
      )}

      
      <div className="pt-2 space-y-4">
        <Button
          type="submit"
          disabled={isSubmitting}
<<<<<<< HEAD
          className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] bg-[#0D1B2A] font-sans text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#0D1B2A]/90 active:translate-y-0"
=======
          className="flex h-12 w-full items-center justify-center rounded-xl bg-navy-steel text-sm font-bold text-white shadow-[0_5px_14px_rgba(8,28,46,0.14)] transition-all hover:bg-navy-steel/92 active:scale-[0.99]"
>>>>>>> source/main
        >
          {isSubmitting ? "Memproses..." : "Masuk"}
        </Button>
        
      </div>
    </form>
  );
}