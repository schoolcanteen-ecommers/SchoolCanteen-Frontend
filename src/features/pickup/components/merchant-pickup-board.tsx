"use client";

<<<<<<< HEAD
import {
  useRouter,
} from "next/navigation";

import {
  useState,
} from "react";

import {
  CheckCircle2,
  Clock3,
  Hash,
  Package,
  PackageCheck,
  QrCode,
  UserRound,
} from "lucide-react";

import {
  StatCard,
} from "@/components/dashboard/stat-card";

import {
  StatusBadge,
} from "@/components/dashboard/status-badge";

import {
  EmptyState,
} from "@/components/shared/empty-state";

import {
  Button,
} from "@/components/ui/button";

import {
  authenticatedApiRequest,
} from "@/lib/api/authenticated-client";

import type {
  MerchantOrderData,
} from "@/lib/api/merchant-orders";

import {
  formatCurrency,
} from "@/lib/utils";
=======
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { CheckCircle2, Clock3, PackageCheck } from "lucide-react";

import { PickupErrorState } from "@/features/pickup/components/merchant-pickup/pickup-error-state";
import { PickupScannerState } from "@/features/pickup/components/merchant-pickup/pickup-scanner-state";
import { PickupSuccessState } from "@/features/pickup/components/merchant-pickup/pickup-success-state";
import { PickupVerifyingState } from "@/features/pickup/components/merchant-pickup/pickup-verifying-state";
import { authenticatedApiRequest } from "@/lib/api/authenticated-client";

import type { MerchantOrderData } from "@/lib/api/merchant-orders";
>>>>>>> source/main

interface MerchantPickupBoardProps {
  orders: MerchantOrderData[];
}

interface VerifyPickupResult {
  order_id: string;
  order_code: string;
<<<<<<< HEAD

  order_status: string;
  pickup_status: string;

  verified_at: string | null;

  escrow: {
    status: string;
    amount: number;

    released_at: string | null;
  };

=======
  order_status: string;
  pickup_status: string;
  verified_at: string | null;
  escrow: {
    status: string;
    amount: number;
    released_at: string | null;
  };
>>>>>>> source/main
  merchant_wallet: {
    pending_balance: number;
    available_balance: number;
  };
}

<<<<<<< HEAD
interface VerificationError {
  orderId: string;
  message: string;
}

export function MerchantPickupBoard({
  orders,
}: MerchantPickupBoardProps) {
  const router =
    useRouter();

  const [
    verifyingOrderId,
    setVerifyingOrderId,
  ] =
    useState<string | null>(
      null,
    );

  const [
    verificationError,
    setVerificationError,
  ] =
    useState<VerificationError | null>(
      null,
    );

  const pickupEntries =
    orders.flatMap(
      (orderData) => {
        if (!orderData.pickup) {
          return [];
        }

        return [
          {
            ...orderData,

            pickup:
              orderData.pickup,
          },
        ];
      },
    );

  const waitingPickups =
    pickupEntries.filter(
      ({
        pickup,
        order,
      }) =>
        pickup.status ===
          "WAITING" &&
        order.status ===
          "READY",
    );

  const verifiedPickups =
    pickupEntries.filter(
      ({
        pickup,
      }) =>
        pickup.status ===
        "VERIFIED",
    );

  const nearestPickupTime =
    waitingPickups
      .map(
        ({
          order,
        }) =>
          order.pickupTime,
      )
      .filter(
        (
          pickupTime,
        ): pickupTime is string =>
          Boolean(
            pickupTime,
          ),
      )
      .sort(
        (a, b) =>
          a.localeCompare(
            b,
          ),
      )[0] ?? "-";

  async function verifyPickup(
    orderId: string,
    pickupCode: string,
  ) {
    if (
      verifyingOrderId !==
      null
    ) {
      return;
    }

    setVerificationError(
      null,
    );

    setVerifyingOrderId(
      orderId,
    );

    try {
      await authenticatedApiRequest<VerifyPickupResult>(
        "/merchant/pickups/verify",
        {
          method: "POST",

          body: {
            pickup_code:
              pickupCode,
=======
type VerificationView = "idle" | "verifying" | "success" | "error";

function formatVerifiedAt(value: string | null) {
  if (!value) {
    return "Waktu tidak tersedia";
  }

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(new Date(value));
}

function PickupStatCard({
  label,
  value,
  description,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  description: string;
  icon: typeof PackageCheck;
}) {
  return (
    <div className="rounded-[18px] border border-[#E2E8F0] bg-white p-5 shadow-[0px_4px_20px_rgba(13,27,42,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#536069]">
            {label}
          </p>
          <p className="mt-3 font-heading text-[32px] font-bold leading-none text-navy-steel">
            {value}
          </p>
        </div>
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-arctic-blue text-navy-steel">
          <Icon className="size-5" />
        </div>
      </div>
      <p className="mt-3 text-xs text-[#74777D]">{description}</p>
    </div>
  );
}

export function MerchantPickupBoard({ orders }: MerchantPickupBoardProps) {
  const router = useRouter();
  const [view, setView] = useState<VerificationView>("idle");
  const [pickupCode, setPickupCode] = useState("");
  const [verificationResult, setVerificationResult] =
    useState<VerifyPickupResult | null>(null);
  const [verificationError, setVerificationError] = useState("");

  const pickupEntries = useMemo(
    () =>
      orders.flatMap((orderData) =>
        orderData.pickup
          ? [
              {
                ...orderData,
                pickup: orderData.pickup,
              },
            ]
          : [],
      ),
    [orders],
  );

  const waitingPickups = useMemo(
    () =>
      pickupEntries.filter(
        ({ pickup, order }) =>
          pickup.status === "WAITING" &&
          order.status === "READY",
      ),
    [pickupEntries],
  );

  const verifiedPickups = useMemo(
    () =>
      pickupEntries
        .filter(({ pickup }) => pickup.status === "VERIFIED")
        .sort((a, b) => {
          const timeA = a.pickup.pickedAt
            ? new Date(a.pickup.pickedAt).getTime()
            : 0;
          const timeB = b.pickup.pickedAt
            ? new Date(b.pickup.pickedAt).getTime()
            : 0;

          return timeB - timeA;
        }),
    [pickupEntries],
  );

  const nearestPickupTime = useMemo(
    () =>
      waitingPickups
        .map(({ order }) => order.pickupTime)
        .filter((time): time is string => Boolean(time))
        .sort((a, b) => a.localeCompare(b))[0] ?? "—",
    [waitingPickups],
  );

  const verifyPickup = useCallback(async (code: string) => {
    const normalizedCode = code.trim();

    if (!normalizedCode) {
      return;
    }

    setVerificationError("");
    setVerificationResult(null);
    setView("verifying");

    try {
      const result = await authenticatedApiRequest<VerifyPickupResult>(
        "/merchant/pickups/verify",
        {
          method: "POST",
          body: {
            pickup_code: normalizedCode,
>>>>>>> source/main
          },
        },
      );

<<<<<<< HEAD
      router.refresh();
    } catch (error) {
      setVerificationError({
        orderId,

        message:
          error instanceof Error
            ? error.message
            : "Pickup gagal diverifikasi.",
      });
    } finally {
      setVerifyingOrderId(
        null,
      );
    }
=======
      setVerificationResult(result);
      setView("success");
    } catch (error) {
      setVerificationError(
        error instanceof Error
          ? error.message
          : "Pickup gagal diverifikasi. Periksa kode dan status pesanan.",
      );
      setView("error");
    }
  }, []);

  const handleQrDecoded = useCallback(
    (payload: string) => {
      const decoded = payload.trim();

      const matchingPickup = waitingPickups.find(
        ({ pickup }) =>
          pickup.pickupCode === decoded || pickup.qrToken === decoded,
      );

      if (!matchingPickup) {
        setPickupCode("");
        setVerificationError(
          "QR tidak dikenali pada pickup aktif merchant. Gunakan kode pickup manual jika QR siswa memakai format yang berbeda.",
        );
        setView("error");
        return;
      }

      const code = matchingPickup.pickup.pickupCode;
      setPickupCode(code);
      void verifyPickup(code);
    },
    [verifyPickup, waitingPickups],
  );

  const successfulOrder = verificationResult
    ? orders.find(({ order }) => order.id === verificationResult.order_id) ?? null
    : null;

  const successfulItemCount = successfulOrder
    ? successfulOrder.items.reduce((total, item) => total + item.quantity, 0)
    : null;

  function finishVerification() {
    setView("idle");
    setPickupCode("");
    setVerificationError("");
    setVerificationResult(null);
    router.refresh();
  }

  function retryVerification() {
    setVerificationError("");
    setView("idle");
  }

  function backToScanner() {
    setPickupCode("");
    setVerificationError("");
    setView("idle");
>>>>>>> source/main
  }

  return (
    <>
<<<<<<< HEAD
      
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Menunggu Pickup"
          value={
            waitingPickups.length
          }
          description="Pesanan siap diserahkan"
          icon={PackageCheck}
        />

        <StatCard
          title="Sudah Diverifikasi"
          value={
            verifiedPickups.length
          }
          description="Pickup yang telah diverifikasi"
          icon={CheckCircle2}
        />

        <StatCard
          title="Pickup Terdekat"
          value={
            nearestPickupTime
          }
          description="Waktu pengambilan terdekat"
=======
      <section>
        <h1 className="font-heading text-[30px] font-bold leading-tight tracking-[-0.02em] text-navy-steel lg:text-[32px]">
          Verifikasi Pengambilan
        </h1>
        <p className="mt-2 text-sm text-[#536069] sm:text-base">
          Verifikasi pengambilan pesanan siswa melalui QR atau kode pickup.
        </p>
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-3 lg:gap-4">
        <PickupStatCard
          label="Menunggu Pickup"
          value={waitingPickups.length}
          description="Pickup WAITING pada pesanan Preparing atau Ready"
          icon={PackageCheck}
        />
        <PickupStatCard
          label="Sudah Diambil"
          value={verifiedPickups.length}
          description="Pickup yang sudah berhasil diverifikasi"
          icon={CheckCircle2}
        />
        <PickupStatCard
          label="Pickup Terdekat"
          value={nearestPickupTime}
          description="Waktu pengambilan terdekat dari antrean pickup"
>>>>>>> source/main
          icon={Clock3}
        />
      </section>

<<<<<<< HEAD
      
      <section className="mt-8">
        <div>
          <h2 className="text-lg font-semibold">
            Menunggu Pengambilan
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Pesanan yang sudah siap dan
            menunggu diverifikasi saat
            siswa mengambil pesanan.
          </p>
        </div>

        {waitingPickups.length >
        0 ? (
          <div className="mt-4 space-y-4">
            {waitingPickups.map(
              ({
                pickup,
                order,
                customerName,
                items,
              }) => {
                const totalItems =
                  items.reduce(
                    (
                      total,
                      item,
                    ) =>
                      total +
                      item.quantity,
                    0,
                  );

                const isVerifying =
                  verifyingOrderId ===
                  order.id;

                const currentError =
                  verificationError?.orderId ===
                  order.id
                    ? verificationError.message
                    : null;

                return (
                  <article
                    key={
                      order.id
                    }
                    className="overflow-hidden rounded-2xl border bg-background"
                  >
                    
                    <div className="flex flex-col gap-4 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold">
                            {
                              order.orderCode
                            }
                          </h3>

                          <StatusBadge
                            status={
                              order.status
                            }
                          />
                        </div>

                        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                          <UserRound className="size-4" />

                          <span>
                            {
                              customerName
                            }
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock3 className="size-4 text-primary" />

                        <span className="text-muted-foreground">
                          Pickup
                        </span>

                        <span className="font-semibold">
                          {order.pickupTime ??
                            "-"}
                        </span>
                      </div>
                    </div>

                    
                    <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_280px]">
                      
                      <div>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Package className="size-4 text-primary" />

                          Detail Pesanan
                        </div>

                        <div className="mt-4 space-y-3">
                          {items.map(
                            (
                              item,
                            ) => (
                              <div
                                key={
                                  item.id
                                }
                                className="flex items-start justify-between gap-4"
                              >
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-medium">
                                    {
                                      item.productName
                                    }
                                  </p>

                                  <p className="mt-1 text-xs text-muted-foreground">
                                    {
                                      item.quantity
                                    }{" "}
                                    ×{" "}
                                    {formatCurrency(
                                      item.price,
                                    )}
                                  </p>
                                </div>

                                <p className="shrink-0 text-sm font-medium">
                                  {formatCurrency(
                                    item.subtotal,
                                  )}
                                </p>
                              </div>
                            ),
                          )}
                        </div>

                        <div className="mt-5 flex items-end justify-between gap-4 border-t pt-4">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Total
                              Item
                            </p>

                            <p className="mt-1 font-semibold">
                              {
                                totalItems
                              }{" "}
                              item
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">
                              Total
                              Pesanan
                            </p>

                            <p className="mt-1 text-lg font-semibold">
                              {formatCurrency(
                                order.totalPrice,
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      
                      <div className="rounded-2xl border bg-muted/20 p-5">
                        <div className="flex items-center gap-2">
                          <QrCode className="size-5 text-primary" />

                          <h4 className="font-semibold">
                            Verifikasi
                            Pickup
                          </h4>
                        </div>

                        <p className="mt-2 text-xs leading-5 text-muted-foreground">
                          Cocokkan kode
                          pickup yang
                          ditunjukkan siswa
                          sebelum menyerahkan
                          pesanan.
                        </p>

                        <div className="mt-5 rounded-xl border border-dashed bg-background p-4 text-center">
                          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                            <Hash className="size-3.5" />

                            Kode Pickup
                          </div>

                          <p className="mt-2 font-mono text-2xl font-semibold tracking-[0.2em]">
                            {
                              pickup.pickupCode
                            }
                          </p>
                        </div>

                        <div className="mt-4 rounded-xl bg-amber-50 px-3 py-2.5 text-xs font-medium text-amber-700">
                          Menunggu
                          verifikasi
                          pengambilan
                        </div>

                        {currentError && (
                          <div className="mt-3 rounded-xl bg-red-50 px-3 py-2.5 text-xs font-medium text-red-700">
                            {
                              currentError
                            }
                          </div>
                        )}

                        <Button
                          type="button"
                          className="mt-4 w-full"
                          disabled={
                            verifyingOrderId !==
                            null
                          }
                          onClick={() =>
                            verifyPickup(
                              order.id,
                              pickup.pickupCode,
                            )
                          }
                        >
                          {isVerifying
                            ? "Memverifikasi..."
                            : "Verifikasi Pengambilan"}
                        </Button>

                        <p className="mt-3 text-xs leading-5 text-muted-foreground">
                          Setelah
                          diverifikasi,
                          pesanan akan
                          diselesaikan dan
                          dana merchant akan
                          diteruskan oleh
                          sistem.
                        </p>
                      </div>
                    </div>
                  </article>
                );
              },
            )}
          </div>
        ) : (
          <div className="mt-4">
            <EmptyState
              icon={PackageCheck}
              title="Tidak ada pesanan menunggu pickup"
              description="Pesanan yang sudah siap diambil akan tampil di sini."
            />
          </div>
        )}
      </section>

      
      {verifiedPickups.length >
        0 && (
        <section className="mt-8">
          <div>
            <h2 className="text-lg font-semibold">
              Sudah Diverifikasi
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Pengambilan pesanan
              yang sudah berhasil
              diverifikasi.
            </p>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border bg-background">
            <div className="divide-y">
              {verifiedPickups.map(
                ({
                  pickup,
                  order,
                  customerName,
                }) => {
                  const pickedAt =
                    pickup.pickedAt
                      ? new Intl.DateTimeFormat(
                          "id-ID",
                          {
                            dateStyle:
                              "medium",

                            timeStyle:
                              "short",
                          },
                        ).format(
                          new Date(
                            pickup.pickedAt,
                          ),
                        )
                      : "-";

                  return (
                    <div
                      key={
                        order.id
                      }
                      className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                          <CheckCircle2 className="size-5 text-emerald-700" />
                        </div>

                        <div>
                          <p className="font-semibold">
                            {
                              order.orderCode
                            }
                          </p>

                          <p className="mt-1 text-sm text-muted-foreground">
                            {
                              customerName
                            }
                          </p>
                        </div>
                      </div>

                      <div className="sm:text-right">
                        <p className="text-sm font-medium text-emerald-700">
                          Terverifikasi
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {
                            pickedAt
                          }
                        </p>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
=======
      <div className="mt-7 lg:mt-8">
        {view === "idle" ? (
          <PickupScannerState
            pickupCode={pickupCode}
            onPickupCodeChange={setPickupCode}
            onSubmit={() => void verifyPickup(pickupCode)}
            onQrDecoded={handleQrDecoded}
          />
        ) : null}

        {view === "verifying" ? <PickupVerifyingState /> : null}

        {view === "success" && verificationResult ? (
          <PickupSuccessState
            orderCode={verificationResult.order_code}
            studentName={successfulOrder?.customerName ?? "—"}
            totalItems={successfulItemCount}
            onFinish={finishVerification}
          />
        ) : null}

        {view === "error" ? (
          <PickupErrorState
            message={verificationError || "Pickup gagal diverifikasi."}
            onRetry={retryVerification}
            onBackToScanner={backToScanner}
          />
        ) : null}
      </div>

      <section className="mt-8 pb-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl font-bold text-navy-steel">
              Sudah Diambil
            </h2>
            <p className="mt-1 text-sm text-[#536069]">
              Riwayat pickup yang berhasil diverifikasi pada data merchant saat ini.
            </p>
          </div>
          <span className="hidden rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-bold text-[#166534] sm:inline-flex">
            {verifiedPickups.length} pickup
          </span>
        </div>

        {verifiedPickups.length > 0 ? (
          <div className="mt-4 overflow-hidden rounded-[18px] border border-[#E2E8F0] bg-white shadow-[0px_4px_20px_rgba(13,27,42,0.04)]">
            <div className="divide-y divide-[#E2E8F0]">
              {verifiedPickups.map(({ pickup, order, customerName }) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#DCFCE7]">
                      <CheckCircle2 className="size-5 text-[#15803D]" />
                    </div>
                    <div>
                      <p className="font-bold text-navy-steel">{order.orderCode}</p>
                      <p className="mt-1 text-sm text-[#536069]">{customerName}</p>
                    </div>
                  </div>
                  <div className="pl-[52px] sm:pl-0 sm:text-right">
                    <p className="text-sm font-bold text-[#15803D]">Terverifikasi</p>
                    <p className="mt-1 text-xs text-[#74777D]">
                      {formatVerifiedAt(pickup.pickedAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-[18px] border border-dashed border-[#C4C6CC] bg-white px-6 py-10 text-center">
            <CheckCircle2 className="mx-auto size-8 text-[#A0A4AA]" />
            <p className="mt-3 font-bold text-navy-steel">Belum ada pickup terverifikasi</p>
            <p className="mt-1 text-sm text-[#74777D]">
              Pickup yang berhasil akan muncul di bagian ini.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
>>>>>>> source/main
