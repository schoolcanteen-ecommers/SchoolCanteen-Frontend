import {
  ArrowDown,
  ArrowUp,
  ImageIcon,
  MapPin,
  Package,
  Tag,
  Clock3,
} from "lucide-react";

import type {
  AdminCooperativeInventoryMetadata,
} from "@/mocks/admin-cooperative-inventory";
import type {
  Product,
} from "@/types/product";

interface AdminCooperativeInventoryDetailProps {
  product: Product;
  categoryName: string;
  metadata: AdminCooperativeInventoryMetadata;
}

export function AdminCooperativeInventoryDetail({
  product,
  categoryName,
  metadata,
}: AdminCooperativeInventoryDetailProps) {
  const stockStatus =
    getStockStatus(product.stock);

  return (
    <div className="space-y-6 pb-8">
      <section className="space-y-4">
        <div className="relative h-[240px] overflow-hidden rounded-[18px] border border-[#E2E8F0] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.02)] sm:h-[360px]">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-[#F2F4F6]">
              <ImageIcon className="size-12 text-[#98A2AA]" />
            </div>
          )}

          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-sm">
            <Tag className="size-4 text-navy-steel" />
            <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-navy-steel">
              {categoryName}
            </span>
          </div>
        </div>

        <h2 className="font-heading text-[30px] font-bold leading-tight text-navy-steel sm:text-[34px]">
          {product.name}
        </h2>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="flex min-h-32 flex-col justify-between overflow-hidden rounded-[18px] border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#536069]">
            Current Stock
          </p>
          <p className="mt-6 flex items-baseline gap-2 font-heading text-[30px] font-bold text-navy-steel">
            {product.stock}
            <span className="font-sans text-base font-medium text-[#536069]">
              Units
            </span>
          </p>
        </div>

        <div className="flex min-h-32 flex-col justify-between rounded-[18px] border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#536069]">
            Status
          </p>
          <div className="mt-6">
            <StockStatusBadge
              status={stockStatus}
            />
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[18px] border border-[#E2E8F0] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
        <InventoryInfoRow
          icon={Clock3}
          label="Last Updated"
          value={metadata.lastUpdated}
        />
        <InventoryInfoRow
          icon={MapPin}
          label="Storage Location"
          value={metadata.storageLocation}
          last
        />
      </section>

      <section>
        <h3 className="mb-4 font-heading text-[26px] font-semibold text-navy-steel">
          Inventory History
        </h3>

        <div className="overflow-hidden rounded-[18px] border border-[#E2E8F0] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
          {metadata.history.map(
            (entry, index) => (
              <InventoryHistoryRow
                key={`${entry.type}-${entry.date}-${entry.quantity}-${index}`}
                entry={entry}
                last={
                  index ===
                  metadata.history.length - 1
                }
              />
            ),
          )}
        </div>
      </section>

    </div>
  );
}

function InventoryInfoRow({
  icon: Icon,
  label,
  value,
  last = false,
}: {
  icon: typeof Clock3;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 px-5 py-5 ${
        last
          ? ""
          : "border-b border-[#E7EBEE]"
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F2F4F6] text-[#66737C]">
          <Icon className="size-5" />
        </div>
        <span className="text-sm text-[#536069] sm:text-base">
          {label}
        </span>
      </div>
      <span className="max-w-[52%] text-right text-sm font-bold text-navy-steel sm:text-base">
        {value}
      </span>
    </div>
  );
}

function InventoryHistoryRow({
  entry,
  last,
}: {
  entry: AdminCooperativeInventoryMetadata["history"][number];
  last: boolean;
}) {
  const isStockIn =
    entry.type === "IN";
  const Icon = isStockIn
    ? ArrowDown
    : ArrowUp;

  return (
    <div
      className={`flex items-start gap-4 px-5 py-5 ${
        last
          ? ""
          : "border-b border-[#E7EBEE]"
      }`}
    >
      <div
        className={`flex size-11 shrink-0 items-center justify-center rounded-full ${
          isStockIn
            ? "bg-[#ECFDF5] text-[#065F46]"
            : "bg-[#FEF2F2] text-[#991B1B]"
        }`}
      >
        <Icon className="size-5" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="text-base font-bold text-navy-steel sm:text-lg">
            {isStockIn
              ? "Stock In"
              : "Stock Out"}
          </p>
          <p
            className={`text-base font-bold sm:text-lg ${
              isStockIn
                ? "text-[#065F46]"
                : "text-[#991B1B]"
            }`}
          >
            {isStockIn ? "+" : "−"}
            {entry.quantity} units
          </p>
        </div>
        <p className="mt-1 text-sm text-[#66737C]">
          {entry.date}
        </p>
      </div>
    </div>
  );
}

function StockStatusBadge({
  status,
}: {
  status: ReturnType<
    typeof getStockStatus
  >;
}) {
  const styles = {
    AVAILABLE:
      "border-[#A7E8CF] bg-[#ECFDF5] text-[#065F46]",
    LOW_STOCK:
      "border-[#F4D68D] bg-[#FEF9C3] text-[#854D0E]",
    OUT_OF_STOCK:
      "border-[#F5C2C2] bg-[#FEF2F2] text-[#991B1B]",
  }[status];

  const label = {
    AVAILABLE: "Available",
    LOW_STOCK: "Low Stock",
    OUT_OF_STOCK: "Out of Stock",
  }[status];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${styles}`}
    >
      <Package className="size-4" />
      {label}
    </span>
  );
}

function getStockStatus(
  stock: number,
) {
  if (stock <= 0) {
    return "OUT_OF_STOCK" as const;
  }

  if (stock <= 10) {
    return "LOW_STOCK" as const;
  }

  return "AVAILABLE" as const;
}
