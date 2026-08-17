"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  CircleDollarSign,
  CreditCard,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  createStudentTopUp,
  waitForTopUpSettlement,
} from "@/lib/api/student-topup";

import {
  formatCurrency,
} from "@/lib/utils";

interface SnapPayOptions {
  onSuccess?: (
    result: Record<
      string,
      unknown
    >,
  ) => void;

  onPending?: (
    result: Record<
      string,
      unknown
    >,
  ) => void;

  onError?: (
    result: Record<
      string,
      unknown
    >,
  ) => void;

  onClose?: () => void;
}

interface SnapInstance {
  pay: (
    token: string,
    options?: SnapPayOptions,
  ) => void;
}

declare global {
  interface Window {
    snap?: SnapInstance;
  }
}

interface StudentTopUpCardProps {
  walletIsActive: boolean;
}

const MIDTRANS_CLIENT_KEY =
  process.env
    .NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ??
  "";

const MIDTRANS_IS_PRODUCTION =
  process.env
    .NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION ===
  "true";

const MIDTRANS_SNAP_URL =
  MIDTRANS_IS_PRODUCTION
    ? "https://app.midtrans.com/snap/snap.js"
    : "https://app.sandbox.midtrans.com/snap/snap.js";

export function StudentTopUpCard({
  walletIsActive,
}: StudentTopUpCardProps) {
  const router =
    useRouter();

  const [
    amount,
    setAmount,
  ] =
    useState("");

  const [
    snapReady,
    setSnapReady,
  ] =
    useState(false);

  const [
    isCreating,
    setIsCreating,
  ] =
    useState(false);

  const [
    isSynchronizing,
    setIsSynchronizing,
  ] =
    useState(false);

  const [
    message,
    setMessage,
  ] =
    useState<string | null>(
      null,
    );

  const [
    error,
    setError,
  ] =
    useState<string | null>(
      null,
    );

  useEffect(() => {
    if (
      !MIDTRANS_CLIENT_KEY
    ) {
      return;
    }

    if (window.snap) {
      const timeoutId =
        window.setTimeout(() => {
          setSnapReady(
            true,
          );
        }, 0);

      return () => {
        window.clearTimeout(
          timeoutId,
        );
      };
    }

    const existingScript =
      document.getElementById(
        "midtrans-snap-script",
      ) as HTMLScriptElement | null;

    if (existingScript) {
      const handleLoad =
        () => {
          setSnapReady(
            Boolean(
              window.snap,
            ),
          );
        };

      existingScript.addEventListener(
        "load",
        handleLoad,
      );

      return () => {
        existingScript.removeEventListener(
          "load",
          handleLoad,
        );
      };
    }

    const script =
      document.createElement(
        "script",
      );

    script.id =
      "midtrans-snap-script";

    script.src =
      MIDTRANS_SNAP_URL;

    script.async =
      true;

    script.setAttribute(
      "data-client-key",
      MIDTRANS_CLIENT_KEY,
    );

    const handleLoad =
      () => {
        setSnapReady(
          Boolean(
            window.snap,
          ),
        );
      };

    script.addEventListener(
      "load",
      handleLoad,
    );

    document.body.appendChild(
      script,
    );

    return () => {
      script.removeEventListener(
        "load",
        handleLoad,
      );
    };
  }, []);

  async function synchronizeTopUp(
    paymentTransactionId: string,
  ) {
    setIsSynchronizing(
      true,
    );

    setMessage(
      "Pembayaran diterima. Menunggu konfirmasi saldo dari server...",
    );

    try {
      const status =
        await waitForTopUpSettlement(
          paymentTransactionId,
        );

      if (
        status ===
        "COMPLETED"
      ) {
        setMessage(
          "Top up berhasil. Saldo wallet sudah diperbarui.",
        );

        setAmount(
          "",
        );

        router.refresh();

        return;
      }

      if (
        status === "FAILED"
      ) {
        setError(
          "Pembayaran gagal diproses.",
        );

        router.refresh();

        return;
      }

      setMessage(
        "Pembayaran masih menunggu konfirmasi Midtrans. Saldo akan berubah setelah pembayaran divalidasi.",
      );

      router.refresh();
    } catch {
      setMessage(
        "Pembayaran sudah diproses. Silakan perbarui halaman untuk melihat status terbaru.",
      );

      router.refresh();
    } finally {
      setIsSynchronizing(
        false,
      );
    }
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (
      isCreating ||
      isSynchronizing
    ) {
      return;
    }

    setError(
      null,
    );

    setMessage(
      null,
    );

    const parsedAmount =
      Number(amount);

    if (
      !Number.isInteger(
        parsedAmount,
      ) ||
      parsedAmount <= 0
    ) {
      setError(
        "Nominal top up harus lebih dari 0.",
      );

      return;
    }

    setIsCreating(
      true,
    );

    try {
      const topUp =
        await createStudentTopUp(
          parsedAmount,
        );

      
      if (
        topUp.snapToken &&
        snapReady &&
        window.snap
      ) {
        window.snap.pay(
          topUp.snapToken,
          {
            onSuccess:
              () => {
                void synchronizeTopUp(
                  topUp.id,
                );
              },

            onPending:
              () => {
                setMessage(
                  "Pembayaran masih menunggu penyelesaian di Midtrans.",
                );

                router.refresh();
              },

            onError:
              () => {
                setError(
                  "Pembayaran Midtrans gagal.",
                );

                router.refresh();
              },

            onClose:
              () => {
                setMessage(
                  "Jendela pembayaran ditutup. Transaksi tetap dapat diselesaikan selama belum kedaluwarsa.",
                );

                router.refresh();
              },
          },
        );

        return;
      }

      
      if (
        topUp.redirectUrl
      ) {
        window.location.assign(
          topUp.redirectUrl,
        );

        return;
      }

      throw new Error(
        "Midtrans tidak memberikan Snap token atau redirect URL.",
      );
    } catch (
      caughtError
    ) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Gagal membuat transaksi top up.",
      );
    } finally {
      setIsCreating(
        false,
      );
    }
  }

  const disabled =
    !walletIsActive ||
    isCreating ||
    isSynchronizing;

  return (
    <section className="overflow-hidden rounded-[18px] border border-[#DCE5ED] bg-white shadow-[0_12px_32px_rgba(13,27,42,0.04)]">
      <div className="p-5 sm:p-6 md:p-7">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#E6F4FF] text-[#0D1B2A]">
            <CircleDollarSign className="size-5" />
          </div>

          <div>
            <h2 className="font-sans text-lg font-semibold text-[#191C1E]">
              Top Up Saldo
            </h2>

            <p className="mt-1 text-sm text-[#536069]">
              Tambahkan saldo wallet menggunakan pembayaran Midtrans.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5">
          <label
            htmlFor="topup-amount"
            className="text-sm font-semibold text-[#191C1E]"
          >
            Nominal Top Up
          </label>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#536069]">
                Rp
              </span>

              <input
                id="topup-amount"
                type="number"
                min={1}
                step={1}
                inputMode="numeric"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="50000"
                disabled={disabled}
                className="h-12 w-full rounded-xl border border-[#C4C6CC] bg-white pl-11 pr-4 text-sm text-[#191C1E] outline-none transition placeholder:text-[#74777D] focus:border-[#0D1B2A] focus:ring-2 focus:ring-[#0D1B2A]/10 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <Button
              type="submit"
              disabled={disabled}
              className="h-12 rounded-xl bg-[#0D1B2A] px-6 text-white hover:bg-[#162A3D] sm:min-w-52"
            >
              <CreditCard className="size-4" />

              {isCreating
                ? "Membuat Transaksi..."
                : isSynchronizing
                  ? "Memperbarui Saldo..."
                  : "Bayar dengan Midtrans"}
            </Button>
          </div>

          {amount && Number(amount) > 0 && (
            <p className="mt-2 text-xs text-[#536069]">
              Nominal pembayaran:{" "}
              <span className="font-semibold text-[#191C1E]">
                {formatCurrency(Number(amount))}
              </span>
            </p>
          )}

          {!walletIsActive && (
            <div className="mt-4 rounded-xl bg-red-50 px-3 py-2.5 text-xs font-medium text-red-700">
              Wallet sedang tidak aktif sehingga top up tidak dapat dilakukan.
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 px-3 py-2.5 text-xs font-medium text-red-700">
              {error}
            </div>
          )}

          {message && (
            <div className="mt-4 rounded-xl bg-[#F2F4F6] px-3 py-2.5 text-xs font-medium text-[#536069]">
              {message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}