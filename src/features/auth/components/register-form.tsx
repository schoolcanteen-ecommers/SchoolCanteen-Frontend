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
  Mail,
  UserRound,
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

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [authError, setAuthError] =
    useState<string | null>(null);

  const [emailSent, setEmailSent] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(
      registerSchema,
    ),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(
    values: RegisterFormValues,
  ) {
    setAuthError(null);

    const supabase = createClient();

    const safeRedirectTo =
      redirectTo.startsWith("/") &&
      !redirectTo.startsWith("//")
        ? redirectTo
        : "/student/dashboard";

    const confirmationUrl =
      `${window.location.origin}` +
      `/auth/confirm?next=${encodeURIComponent(
        safeRedirectTo,
      )}`;

    const {
      data,
      error,
    } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,

      options: {
        emailRedirectTo:
          confirmationUrl,

        data: {
          full_name: values.name,
        },
      },
    });

    if (error) {
      setAuthError(
        "Pendaftaran gagal. Periksa kembali data yang kamu masukkan.",
      );

      return;
    }

    
    if (data.session) {
      router.replace(
        safeRedirectTo,
      );

      router.refresh();

      return;
    }

    
    setEmailSent(true);
  }

  if (emailSent) {
    return (
      <div className="rounded-2xl border bg-background p-6 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10">
          <CheckCircle2 className="size-6 text-primary" />
        </div>

        <h2 className="mt-5 text-xl font-semibold">
          Cek email kamu
        </h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Kami sudah mengirim link
          konfirmasi ke email yang
          kamu daftarkan.
        </p>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Setelah email dikonfirmasi,
          kamu akan diarahkan kembali
          ke aplikasi.
        </p>

        <Button
          nativeButton={false}
          variant="outline"
          className="mt-6 w-full"
          render={
            <Link
              href={`/login?redirect=${encodeURIComponent(
                redirectTo,
              )}`}
            />
          }
        >
          Kembali ke Login
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >

      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-sm font-medium"
        >
          Nama lengkap
        </label>

        <div className="relative">
          <UserRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Masukkan nama lengkap"
            className="h-11 pl-10"
            {...register("name")}
          />
        </div>

        {errors.name && (
          <p className="text-xs text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

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
        <label
          htmlFor="password"
          className="text-sm font-medium"
        >
          Password
        </label>

        <div className="relative">
          <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            id="password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            autoComplete="new-password"
            placeholder="Minimal 6 karakter"
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
      <div className="space-y-2">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium"
        >
          Konfirmasi password
        </label>

        <div className="relative">
          <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            id="confirmPassword"
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            autoComplete="new-password"
            placeholder="Ulangi password"
            className="h-11 px-10"
            {...register(
              "confirmPassword",
            )}
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                (current) =>
                  !current,
              )
            }
            aria-label={
              showConfirmPassword
                ? "Sembunyikan konfirmasi password"
                : "Tampilkan konfirmasi password"
            }
            className="absolute right-3 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            {showConfirmPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="text-xs text-destructive">
            {
              errors.confirmPassword
                .message
            }
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

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Mendaftarkan..."
          : "Buat Akun"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Sudah punya akun?{" "}
        <Link
          href={`/login?redirect=${encodeURIComponent(
            redirectTo,
          )}`}
          className="font-semibold text-primary hover:underline"
        >
          Masuk
        </Link>
      </p>
    </form>
  );
}