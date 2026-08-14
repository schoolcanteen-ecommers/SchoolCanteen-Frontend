"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

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

  const [showPassword, setShowPassword] =
    useState(false);

  const [authError, setAuthError] =
    useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(
    values: LoginFormValues,
  ) {
    setAuthError(null);

    const supabase = createClient();

        const {
      data,
      error,
    } =
      await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

    if (
      error ||
      !data.session
    ) {
      setAuthError(
        "Email atau password tidak valid.",
      );

      return;
    }

        const accessToken =
      data.session.access_token;

    try {
            const profile =
        await getCurrentProfile(
          accessToken,
        );

            const targetRoute =
        getRedirectForRole(
          profile.role,
          redirectTo,
        );

      router.replace(targetRoute);
      router.refresh();
    } catch {
            await supabase.auth.signOut();

      setAuthError(
        "Login berhasil, tetapi profil akun tidak dapat dimuat.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium"
        >
          Email
        </label>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="nama@sekolah.id"
            className="h-11 pl-10"
            {...register("email")}
          />
        </div>

        {errors.email && (
          <p className="text-xs text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <label
            htmlFor="password"
            className="text-sm font-medium"
          >
            Password
          </label>

          <button
            type="button"
            className="text-xs font-medium text-primary hover:underline"
          >
            Lupa password?
          </button>
        </div>

        <div className="relative">
          <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            id="password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            autoComplete="current-password"
            placeholder="Masukkan password"
            className="h-11 px-10"
            {...register("password")}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                (current) =>
                  !current,
              )
            }
            aria-label={
              showPassword
                ? "Sembunyikan password"
                : "Tampilkan password"
            }
            className="absolute right-3 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="text-xs text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Authentication Error */}
      {authError && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3"
        >
          <p className="text-sm text-destructive">
            {authError}
          </p>
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Memproses..."
          : "Masuk"}
      </Button>

      {/* Register */}
      <p className="text-center text-sm text-muted-foreground">
        Belum punya akun?{" "}
        <Link
          href={`/register?redirect=${encodeURIComponent(
            redirectTo,
          )}`}
          className="font-semibold text-primary hover:underline"
        >
          Daftar sekarang
        </Link>
      </p>
    </form>
  );
}