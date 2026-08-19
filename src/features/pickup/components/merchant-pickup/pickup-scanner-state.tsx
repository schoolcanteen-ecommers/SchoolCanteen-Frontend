"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import { Camera, CheckCircle2, QrCode, ScanLine } from "lucide-react";
import QrScanner from "qr-scanner";

interface PickupScannerStateProps {
  pickupCode: string;
  onPickupCodeChange: (value: string) => void;
  onSubmit: () => void;
  onQrDecoded: (value: string) => void;
}

type CameraState = "starting" | "ready" | "denied" | "error";

function getCameraErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  const normalized = message.toLowerCase();

  if (
    normalized.includes("permission") ||
    normalized.includes("notallowed") ||
    normalized.includes("denied")
  ) {
    return "Akses kamera ditolak. Izinkan kamera pada browser atau gunakan kode pickup manual.";
  }

  if (
    normalized.includes("notfound") ||
    normalized.includes("no camera") ||
    normalized.includes("devicesnotfound")
  ) {
    return "Kamera tidak ditemukan pada perangkat ini. Gunakan kode pickup manual.";
  }

  return "Scanner kamera tidak dapat dijalankan. Gunakan kode pickup manual atau coba muat ulang halaman.";
}

export function PickupScannerState({
  pickupCode,
  onPickupCodeChange,
  onSubmit,
  onQrDecoded,
}: PickupScannerStateProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasDecodedRef = useRef(false);
  const [cameraState, setCameraState] = useState<CameraState>("starting");
  const [cameraMessage, setCameraMessage] = useState(
    "Meminta akses kamera...",
  );

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    let disposed = false;
    hasDecodedRef.current = false;

    const scanner = new QrScanner(
      video,
      (result) => {
        if (hasDecodedRef.current) {
          return;
        }

        const decoded = result.data.trim();

        if (!decoded) {
          return;
        }

        hasDecodedRef.current = true;
        scanner.stop();
        onQrDecoded(decoded);
      },
      {
        preferredCamera: "environment",
        maxScansPerSecond: 8,
        returnDetailedScanResult: true,
      },
    );

    async function startScanner() {
      try {
        await scanner.start();

        if (disposed) {
          return;
        }

        setCameraState("ready");
        setCameraMessage("Arahkan QR pickup siswa ke area scanner.");
      } catch (error) {
        if (disposed) {
          return;
        }

        const message = getCameraErrorMessage(error);
        setCameraMessage(message);
        setCameraState(
          message.startsWith("Akses kamera ditolak") ? "denied" : "error",
        );
      }
    }

    void startScanner();

    return () => {
      disposed = true;
      scanner.destroy();
    };
  }, [onQrDecoded]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  const isCameraReady = cameraState === "ready";

  return (
    <section className="mx-auto w-full max-w-[620px] overflow-hidden rounded-[18px] border border-[#E2E8F0] bg-white p-5 shadow-[0px_10px_30px_rgba(13,27,42,0.04)] sm:p-7 lg:p-8">
      <div className="text-center">
        <h2 className="font-heading text-[28px] font-bold leading-tight text-navy-steel sm:text-[32px]">
          Scan Pickup QR
        </h2>
        <p className="mt-2 text-sm text-[#536069] sm:text-base">
          Scan QR siswa atau masukkan kode pickup untuk menyelesaikan pengambilan.
        </p>
      </div>

      <div className="relative mx-auto mt-7 aspect-square w-full max-w-[400px] overflow-hidden rounded-[16px] border border-[#C4C6CC] bg-[#ECEEF0] sm:aspect-[4/3]">
        <video
          ref={videoRef}
          className={`absolute inset-0 size-full object-cover transition-opacity ${
            isCameraReady ? "opacity-100" : "opacity-0"
          }`}
          muted
          playsInline
        />

        <div className="pointer-events-none absolute left-5 top-5 size-10 border-l-[4px] border-t-[4px] border-navy-steel" />
        <div className="pointer-events-none absolute right-5 top-5 size-10 border-r-[4px] border-t-[4px] border-navy-steel" />
        <div className="pointer-events-none absolute bottom-5 left-5 size-10 border-b-[4px] border-l-[4px] border-navy-steel" />
        <div className="pointer-events-none absolute bottom-5 right-5 size-10 border-b-[4px] border-r-[4px] border-navy-steel" />

        {isCameraReady ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] animate-[pickup-scan_2s_linear_infinite] bg-[#8ED8FF] shadow-[0_0_10px_#8ED8FF]" />
        ) : null}

        <div
          className={`absolute inset-0 flex flex-col items-center justify-center px-8 text-center transition-opacity ${
            isCameraReady ? "bg-black/10 opacity-0" : "opacity-100"
          }`}
        >
          {cameraState === "starting" ? (
            <Camera className="size-10 animate-pulse text-[#74777D]" />
          ) : (
            <QrCode className="size-10 text-[#74777D]" />
          )}
          <p className="mt-3 text-sm font-semibold text-[#536069]">
            {cameraMessage}
          </p>
        </div>

        {isCameraReady ? (
          <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-[10px] bg-navy-steel/80 px-3 py-2 text-center text-xs font-semibold text-white backdrop-blur-sm">
            {cameraMessage}
          </div>
        ) : null}
      </div>

      <div className="my-7 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#C4C6CC]" />
        <span className="shrink-0 text-center text-[11px] font-bold uppercase tracking-[0.08em] text-[#536069] sm:text-xs">
          atau masukkan kode pickup
        </span>
        <div className="h-px flex-1 bg-[#C4C6CC]" />
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="merchant-pickup-code"
            className="mb-2 block text-sm font-bold text-navy-steel"
          >
            Pickup Code
          </label>
          <input
            id="merchant-pickup-code"
            type="text"
            value={pickupCode}
            onChange={(event) => onPickupCodeChange(event.target.value)}
            autoComplete="off"
            spellCheck={false}
            placeholder="Masukkan kode pickup"
            className="h-12 w-full rounded-[10px] border border-[#C4C6CC] bg-white px-4 text-center text-base font-semibold uppercase tracking-[0.16em] text-navy-steel outline-none transition placeholder:font-normal placeholder:normal-case placeholder:tracking-normal placeholder:text-[#74777D] focus:border-navy-steel focus:ring-4 focus:ring-[#E6F4FF]"
          />
        </div>

        <button
          type="submit"
          disabled={!pickupCode.trim()}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-navy-steel px-4 text-sm font-bold text-white shadow-[0px_4px_12px_rgba(13,27,42,0.15)] transition hover:bg-[#172A3F] disabled:cursor-not-allowed disabled:opacity-45"
        >
          <CheckCircle2 className="size-5" />
          Verifikasi
        </button>
      </form>

      <div className="mt-5 flex items-start gap-2 rounded-[12px] bg-[#F8FAFC] px-4 py-3 text-xs leading-5 text-[#536069]">
        <ScanLine className="mt-0.5 size-4 shrink-0 text-navy-steel" />
        <p>
          Kamera membutuhkan izin browser. Jika kamera tidak tersedia, verifikasi manual tetap dapat digunakan.
        </p>
      </div>

      <style jsx>{`
        @keyframes pickup-scan {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(390px);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
