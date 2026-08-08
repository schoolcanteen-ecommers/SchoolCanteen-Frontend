"use client";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Terjadi kesalahan",
  description = "Data tidak dapat dimuat. Silakan coba kembali.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border bg-background px-6 py-10 text-center">
      <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-destructive/10">
        <AlertTriangle className="size-5 text-destructive" />
      </div>

      <h3 className="text-sm font-semibold">
        {title}
      </h3>

      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>

      {onRetry && (
        <Button
          type="button"
          variant="outline"
          className="mt-5"
          onClick={onRetry}
        >
          Coba Lagi
        </Button>
      )}
    </div>
  );
}