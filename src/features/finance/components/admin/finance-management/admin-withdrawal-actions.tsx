"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { authenticatedApiRequest } from "@/lib/api/authenticated-client";
import type { WithdrawalStatus } from "@/types/withdrawal";

type WithdrawalAction = "approve" | "reject" | "process" | "complete";

interface ActionDefinition {
  action: WithdrawalAction;
  label: string;
  confirmMessage: string;
  variant: "primary" | "secondary";
}

export function AdminWithdrawalActions({
  withdrawalId,
  status,
}: {
  withdrawalId: string;
  status: WithdrawalStatus;
}) {
  const router = useRouter();
  const [pendingAction, setPendingAction] = useState<WithdrawalAction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const actions = getActions(status);

  if (actions.length === 0) return null;

  async function handleAction(definition: ActionDefinition) {
    if (!window.confirm(definition.confirmMessage)) return;

    setError(null);
    setPendingAction(definition.action);

    try {
      await authenticatedApiRequest<unknown>(
        `/admin/withdrawals/${encodeURIComponent(withdrawalId)}/${definition.action}`,
        { method: "PATCH" },
      );
      router.refresh();
    } catch (actionError) {
      setError(
        actionError instanceof Error
          ? actionError.message
          : "Aksi withdrawal gagal diproses.",
      );
    } finally {
      setPendingAction(null);
    }
  }

  return (
    <div className="border-t border-[#E2E7EB] bg-white/95 px-4 py-4 shadow-[0_-10px_30px_rgba(13,27,42,0.04)] backdrop-blur sm:px-6">
      <div className="mx-auto flex w-full max-w-[880px] gap-3 sm:justify-end">
        {actions.map((definition) => {
          const isPending = pendingAction === definition.action;
          return (
            <button
              key={definition.action}
              type="button"
              disabled={pendingAction !== null}
              onClick={() => void handleAction(definition)}
              className={
                definition.variant === "primary"
                  ? "h-12 min-w-0 flex-1 rounded-xl bg-navy-steel px-5 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(13,27,42,0.16)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:max-w-[220px]"
                  : "h-12 min-w-0 flex-1 rounded-xl border border-[#CBD3D9] bg-white px-5 text-sm font-semibold text-navy-steel transition hover:bg-[#F7F9FB] disabled:cursor-not-allowed disabled:opacity-60 sm:max-w-[220px]"
              }
            >
              {isPending ? "Memproses..." : definition.label}
            </button>
          );
        })}
      </div>
      {error ? <p className="mx-auto mt-3 max-w-[880px] text-sm text-red-600 sm:text-right">{error}</p> : null}
    </div>
  );
}

function getActions(status: WithdrawalStatus): ActionDefinition[] {
  switch (status) {
    case "WAITING_APPROVAL":
      return [
        {
          action: "reject",
          label: "Reject",
          confirmMessage: "Tolak withdrawal ini? Saldo yang di-hold akan dikembalikan oleh backend.",
          variant: "secondary",
        },
        {
          action: "approve",
          label: "Approve",
          confirmMessage: "Setujui withdrawal ini?",
          variant: "primary",
        },
      ];
    case "APPROVED":
      return [
        {
          action: "reject",
          label: "Reject",
          confirmMessage: "Tolak withdrawal yang sudah disetujui ini? Saldo akan dikembalikan oleh backend.",
          variant: "secondary",
        },
        {
          action: "process",
          label: "Process",
          confirmMessage: "Tandai withdrawal ini sedang diproses?",
          variant: "primary",
        },
      ];
    case "PROCESSED":
      return [
        {
          action: "complete",
          label: "Complete",
          confirmMessage: "Selesaikan withdrawal ini? Pastikan pencairan dana sudah benar-benar selesai.",
          variant: "primary",
        },
      ];
    case "COMPLETED":
    case "REJECTED":
      return [];
  }
}
