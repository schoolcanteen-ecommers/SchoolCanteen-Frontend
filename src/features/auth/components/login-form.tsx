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

import { createClient } from "@/lib/supabase/client";
import { apiRequest } from "@/lib/api/client";

interface LoginFormProps {
  redirectTo?: string;
}

type UserRole =
  | "student"
  | "merchant"
  | "admin";

interface CurrentUser {
  id: string;
  name: string;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
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

    /*
     * Step 1:
     * Login ke Supabase Auth.
     */
    const {
      data,
      error,
    } =
      await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

    if (error) {
      setAuthError(
        "Email atau password tidak valid.",
      );

      return;
    }

    const accessToken =
      data.session?.access_token;

    if (!accessToken) {
      setAuthError(
        "Session login tidak tersedia.",
      );

      return;
    }

    try {
      
      const user =
        await apiRequest<CurrentUser>(
          "/me",
          {
            method: "GET",
            accessToken,
          },
        );

      
      const safeRedirectTo =
        redirectTo.startsWith("/") &&
          !redirectTo.startsWith("//")
          ? redirectTo
          : null;

      
      if (
        safeRedirectTo &&
        safeRedirectTo.startsWith(
          `/${user.role}/`,
        )
      ) {
        router.replace(
          safeRedirectTo,
        );

        router.refresh();

        return;
      }

      
      switch (user.role) {
        case "student":
          router.replace(
            "/student/dashboard",
          );
          break;

        case "merchant":
          router.replace(
            "/merchant/dashboard",
          );
          break;

        case "admin":
          router.replace(
            "/admin/dashboard",
          );
          break;

        default:
          setAuthError(
            "Role akun tidak dikenali.",
          );

          return;
      }

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
      {}
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

      {}
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

      {}
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

      {}
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

      {}
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