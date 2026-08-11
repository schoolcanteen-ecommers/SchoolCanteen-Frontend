"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-sm font-medium text-muted-foreground">
          Terjadi kesalahan
        </p>

        <h1 className="mt-2 text-2xl font-semibold">
          Ada sesuatu yang bermasalah
        </h1>

        <p className="mt-3 text-sm text-muted-foreground">
          Sistem mengalami kendala saat memuat halaman. Silakan coba kembali.
        </p>

        <Button
          type="button"
          className="mt-6"
          onClick={() => reset()}
        >
          Coba Lagi
        </Button>
      </div>
    </main>
  );
}