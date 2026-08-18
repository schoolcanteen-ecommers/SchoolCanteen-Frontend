import { cn } from "@/lib/utils";
import type { WithdrawalStatus } from "@/types/withdrawal";

export const ADMIN_WITHDRAWAL_STATUS_LABEL: Record<WithdrawalStatus, string> = {
  WAITING_APPROVAL: "WAITING_APPROVAL",
  APPROVED: "APPROVED",
  PROCESSED: "PROCESSED",
  COMPLETED: "COMPLETED",
  REJECTED: "REJECTED",
};

export function AdminWithdrawalStatusBadge({
  status,
  className,
}: {
  status: WithdrawalStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.04em] sm:text-[11px]",
        status === "WAITING_APPROVAL" && "bg-[#FFF3C9] text-[#72520A]",
        status === "APPROVED" && "bg-[#E6F0FF] text-[#2E5C9A]",
        status === "PROCESSED" && "bg-[#F0E7FF] text-[#6E43A6]",
        status === "COMPLETED" && "bg-[#E5F5EA] text-[#28613B]",
        status === "REJECTED" && "bg-[#FDE9E7] text-[#9A352E]",
        className,
      )}
    >
      {ADMIN_WITHDRAWAL_STATUS_LABEL[status]}
    </span>
  );
}
