"use client";

import {
  Loader2,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

import {
  useState,
} from "react";

import {
  authenticatedApiRequest,
} from "@/lib/api/authenticated-client";

import type {
  OrderStatus,
} from "@/types/order";

interface MerchantOrderDetailActionProps {
  orderId: string;
  status: OrderStatus;
}

const NEXT_STATUS:
  Partial<
    Record<
      OrderStatus,
      OrderStatus
    >
  > = {
    WAITING:
      "CONFIRMED",

    CONFIRMED:
      "PREPARING",

    PREPARING:
      "READY",
  };

const ACTION_LABEL:
  Partial<
    Record<
      OrderStatus,
      string
    >
  > = {
    WAITING:
      "Konfirmasi Pesanan",

    CONFIRMED:
      "Mulai Siapkan",

    PREPARING:
      "Tandai Siap Diambil",
  };

export function MerchantOrderDetailAction({
  orderId,
  status,
}: MerchantOrderDetailActionProps) {
  const router =
    useRouter();

  const [
    processing,
    setProcessing,
  ] =
    useState(false);

  const [
    error,
    setError,
  ] =
    useState<
      string | null
    >(null);

  if (
    status === "COMPLETED" ||
    status === "CANCELLED"
  ) {
    return null;
  }

  if (
    status === "READY"
  ) {
    return (
      <div className="rounded-xl bg-emerald-50 px-4 py-3 text-center text-sm font-bold text-emerald-700">
        Menunggu siswa melakukan pickup
      </div>
    );
  }

  const nextStatus =
    NEXT_STATUS[
      status
    ];

  const label =
    ACTION_LABEL[
      status
    ];

  if (
    !nextStatus ||
    !label
  ) {
    return null;
  }

  const targetStatus =
    nextStatus;

  async function handleClick() {
    if (processing) {
      return;
    }

    setProcessing(
      true,
    );

    setError(
      null,
    );

    try {
      await authenticatedApiRequest(
        `/merchant/orders/${encodeURIComponent(
          orderId,
        )}/status`,
        {
          method:
            "PATCH",

          body: {
            status:
              targetStatus
                .toLowerCase(),
          },
        },
      );

      router.refresh();
    } catch (
      caughtError
    ) {
      setError(
        caughtError
          instanceof Error
          ? caughtError.message
          : "Status pesanan gagal diperbarui.",
      );
    } finally {
      setProcessing(
        false,
      );
    }
  }

  return (
    <div>
      {error ? (
        <div className="mb-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <button
        type="button"
        disabled={
          processing
        }
        onClick={() =>
          void handleClick()
        }
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-navy-steel px-5 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-55"
      >
        {processing ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Memproses...
          </>
        ) : (
          label
        )}
      </button>
    </div>
  );
}
