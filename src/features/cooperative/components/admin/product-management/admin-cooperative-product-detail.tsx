import {
  Edit3,
  Hash,
  ImageIcon,
  Package,
  ReceiptText,
  ShoppingCart,
  Truck,
  Update,
} from "lucide-react";

import {
  formatCurrency,
} from "@/lib/utils";
import type {
  Product,
} from "@/types/product";

interface AdminCooperativeProductDetailProps {
  product: Product;
  categoryName: string;
}

export function AdminCooperativeProductDetail({
  product,
  categoryName,
}: AdminCooperativeProductDetailProps) {
  const status =
    getProductStatus(product);

  return (
    <div className="space-y-6 pb-20">
      <section className="relative aspect-square overflow-hidden rounded-[18px] border border-[#E2E8F0] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.02)] sm:aspect-[16/10]">
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

        <div className="absolute right-4 top-4">
          <StatusBadge status={status} />
        </div>
      </section>

      <section className="rounded-[18px] border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#5C6871]">
          {categoryName}
        </p>
        <h2 className="mt-2 font-heading text-[30px] font-bold leading-tight text-navy-steel">
          {product.name}
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[#E7EBEE] pt-5">
          <div>
            <p className="text-xs font-bold text-[#5C6871]">
              Retail Price
            </p>
            <p className="mt-2 font-heading text-[26px] font-semibold text-navy-steel">
              {formatCurrency(
                product.price,
              )}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-[#5C6871]">
              Current Stock
            </p>
            <p className="mt-2 flex items-center justify-end gap-2 text-lg font-bold text-navy-steel">
              <Package className="size-5 text-[#66737C]" />
              {product.stock} Units
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <UnavailableStat
          icon={ShoppingCart}
          label="Total Sold"
        />
        <UnavailableStat
          icon={ReceiptText}
          label="Total Orders"
        />
      </section>

      <section className="overflow-hidden rounded-[18px] border border-[#E2E8F0] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
        <h3 className="border-b border-[#E7EBEE] px-5 py-5 text-lg font-bold text-navy-steel">
          Inventory Details
        </h3>

        <div className="px-5">
          <InventoryRow
            icon={Hash}
            label="SKU"
            description="Product Identifier"
            value="Belum tersedia"
          />
          <InventoryRow
            icon={Truck}
            label="Supplier"
            description="Primary Vendor"
            value="Belum tersedia"
          />
          <InventoryRow
            icon={Update}
            label="Last Updated"
            description="Stock revision"
            value="Belum tersedia"
            last
          />
        </div>
      </section>

      <button
        type="button"
        disabled
        title="Menunggu dukungan Admin Product API"
        aria-label="Edit produk belum tersedia"
        className="fixed bottom-6 right-6 z-30 flex size-14 items-center justify-center rounded-2xl bg-navy-steel text-white opacity-45 shadow-xl md:absolute"
      >
        <Edit3 className="size-5" />
      </button>
    </div>
  );
}

function UnavailableStat({
  icon: Icon,
  label,
}: {
  icon: typeof ShoppingCart;
  label: string;
}) {
  return (
    <div className="relative min-h-32 overflow-hidden rounded-[18px] border border-[#E2E8F0] bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
      <div className="absolute -right-4 -top-4 size-20 rounded-full bg-arctic-blue/50" />
      <Icon className="relative size-6 text-[#66737C]" />
      <div className="relative mt-6">
        <p className="font-heading text-[28px] font-bold leading-none text-navy-steel">
          —
        </p>
        <p className="mt-2 text-xs font-bold text-[#536069]">
          {label}
        </p>
        <p className="mt-1 text-[11px] text-[#8A949C]">
          Belum tersedia
        </p>
      </div>
    </div>
  );
}

function InventoryRow({
  icon: Icon,
  label,
  description,
  value,
  last = false,
}: {
  icon: typeof Hash;
  label: string;
  description: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 py-4 ${
        last
          ? ""
          : "border-b border-[#E7EBEE]"
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F2F4F6] text-[#66737C]">
          <Icon className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="text-base font-medium text-navy-steel">
            {label}
          </p>
          <p className="mt-0.5 text-xs text-[#66737C]">
            {description}
          </p>
        </div>
      </div>
      <p className="max-w-[45%] text-right text-sm font-medium text-[#66737C]">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: ReturnType<
    typeof getProductStatus
  >;
}) {
  const styles = {
    ACTIVE:
      "border-[#A7E8CF] bg-[#ECFDF5] text-[#065F46]",
    LOW_STOCK:
      "border-[#F1C999] bg-[#FFE4C1] text-[#7A4A14]",
    OUT_OF_STOCK:
      "border-[#F5C2C2] bg-[#FEF2F2] text-[#991B1B]",
  }[status];

  const label = {
    ACTIVE: "Active",
    LOW_STOCK: "Low Stock",
    OUT_OF_STOCK: "Out of Stock",
  }[status];

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.04em] ${styles}`}
    >
      {label}
    </span>
  );
}

function getProductStatus(
  product: Product,
) {
  if (product.stock <= 0) {
    return "OUT_OF_STOCK" as const;
  }

  if (product.stock <= 10) {
    return "LOW_STOCK" as const;
  }

  return "ACTIVE" as const;
}
