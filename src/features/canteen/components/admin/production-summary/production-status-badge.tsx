import type {
  AdminProductionStatus,
} from "@/lib/api/admin-canteen-production";

export function ProductionStatusBadge({
  status,
}: {
  status: AdminProductionStatus;
}) {
  const style =
    status === "READY"
      ? "bg-emerald-50 text-emerald-700"
      : status === "PREPARING"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-arctic-blue text-navy-steel";

  const label =
    status === "READY"
      ? "Ready"
      : status === "PREPARING"
        ? "Preparing"
        : "Confirmed";

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-[11px] font-bold ${style}`}
    >
      {label}
    </span>
  );
}
