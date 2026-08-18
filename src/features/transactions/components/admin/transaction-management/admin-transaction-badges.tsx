import type {
  AdminTransactionStatus,
  AdminTransactionType,
} from "@/lib/api/admin-transaction-shared";

export function AdminTransactionStatusBadge({
  status,
}: {
  status: AdminTransactionStatus;
}) {
  const className =
    status === "COMPLETED"
      ? "bg-arctic-blue text-navy-steel"
      : status === "PENDING"
        ? "bg-[#ECEEF0] text-[#536069]"
        : "bg-[#FFDFDC] text-[#A73535]";

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.06em] ${className}`}
    >
      {adminTransactionStatusLabel(
        status,
      )}
    </span>
  );
}

export function AdminTransactionTypeBadge({
  type,
  compact = false,
}: {
  type: AdminTransactionType;
  compact?: boolean;
}) {
  const className =
    type === "TOP_UP"
      ? "bg-arctic-blue text-navy-steel"
      : type === "ADJUSTMENT"
        ? "bg-[#F2F4F6] text-[#536069]"
        : "bg-[#E6E8EA] text-[#44474C]";

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full font-bold uppercase tracking-[0.05em] ${className} ${
        compact
          ? "px-2 py-0.5 text-[9px]"
          : "px-2.5 py-1 text-[10px]"
      }`}
    >
      {adminTransactionTypeLabel(
        type,
      )}
    </span>
  );
}

export function adminTransactionTypeLabel(
  type: AdminTransactionType,
) {
  switch (type) {
    case "PAYMENT":
      return "Payment";
    case "TOP_UP":
      return "Top Up";
    case "ADJUSTMENT":
      return "Adjustment";
  }
}

export function adminTransactionStatusLabel(
  status: AdminTransactionStatus,
) {
  switch (status) {
    case "COMPLETED":
      return "Completed";
    case "PENDING":
      return "Pending";
    case "FAILED":
      return "Failed";
  }
}
