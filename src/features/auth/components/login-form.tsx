"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LockKeyhole, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/auth-schema";

import { getCurrentProfile } from "@/features/auth/services/profile-service";
import { getRedirectForRole } from "@/features/auth/utils/role-route";
import { createClient } from "@/lib/supabase/client";

interface LoginFormProps {
  redirectTo?: string;
}

export function LoginForm({
  redirectTo = "/student/dashboard",
}: LoginFormProps) {
  const router = useRouter();
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
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error || !data.session) {
      setAuthError("Email atau password tidak valid.");
      return;
    }

    const accessToken = data.session.access_token;

    try {
      const profile = await getCurrentProfile(accessToken);
      const targetRoute = getRedirectForRole(profile.role, redirectTo);

      router.replace(targetRoute);
      router.refresh();
    } catch {
      await supabase.auth.signOut();
      setAuthError("Login berhasil, tetapi profil akun tidak dapat dimuat.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-5">
      
      
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
            className="h-[52px] w-full rounded-[14px] border-[#E6F4FF] bg-[#F8FAFC] pl-12 pr-4 font-sans text-[#0D1B2A] transition-all placeholder:text-[#536069]/60 hover:bg-[#E6F4FF]/30 focus-visible:border-[#0D1B2A] focus-visible:ring-1 focus-visible:ring-[#0D1B2A]"
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
            className="h-[52px] w-full rounded-[14px] border-[#E6F4FF] bg-[#F8FAFC] pl-12 pr-12 font-sans text-[#0D1B2A] transition-all hover:bg-[#E6F4FF]/30 focus-visible:border-[#0D1B2A] focus-visible:ring-1 focus-visible:ring-[#0D1B2A]"
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
            href="#"
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
          className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] bg-[#0D1B2A] font-sans text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#0D1B2A]/90 active:translate-y-0"
        >
          {isSubmitting ? "Memproses..." : "Masuk"}
        </Button>
        
      </div>
    </form>
  );
}