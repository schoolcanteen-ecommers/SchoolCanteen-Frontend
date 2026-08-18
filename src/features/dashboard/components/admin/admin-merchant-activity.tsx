import {
  ShoppingBag,
  UtensilsCrossed,
} from "lucide-react";

import type {
  AdminMerchantType,
} from "@/lib/api/admin-dashboard";

interface AdminMerchantActivityProps {
  merchants: Array<{
    id: string;
    name: string;
    type: AdminMerchantType;
    ordersCount: number;
  }>;
}

export function AdminMerchantActivity({
  merchants,
}: AdminMerchantActivityProps) {
  const sortedMerchants = [
    ...merchants,
  ].sort(
    (a, b) =>
      b.ordersCount -
      a.ordersCount,
  );

  const desktopMerchants =
    sortedMerchants.slice(0, 3);

  const mobileMerchants =
    sortedMerchants.slice(0, 2);

  return (
    <section>
      <h2 className="mb-4 font-heading text-[24px] font-semibold text-navy-steel">
        Merchant Activity
      </h2>

      {sortedMerchants.length ? (
        <>
          <div className="hidden space-y-2 rounded-[24px] border border-[#E6EAED] bg-white p-4 shadow-[0_12px_32px_rgba(13,27,42,0.025)] lg:block">
            {desktopMerchants.map(
              (merchant) => (
                <MerchantActivityItem
                  key={merchant.id}
                  merchant={merchant}
                  desktop
                />
              ),
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 lg:hidden">
            {mobileMerchants.map(
              (merchant) => (
                <MerchantActivityItem
                  key={merchant.id}
                  merchant={merchant}
                />
              ),
            )}
          </div>
        </>
      ) : (
        <div className="rounded-[24px] border border-[#E6EAED] bg-white p-6 text-sm text-[#59666F]">
          Belum ada aktivitas merchant hari ini.
        </div>
      )}
    </section>
  );
}

interface MerchantActivityItemProps {
  merchant: {
    id: string;
    name: string;
    type: AdminMerchantType;
    ordersCount: number;
  };
  desktop?: boolean;
}

function MerchantActivityItem({
  merchant,
  desktop = false,
}: MerchantActivityItemProps) {
  const isCanteen =
    merchant.type === "CANTEEN";

  const Icon = isCanteen
    ? UtensilsCrossed
    : ShoppingBag;

  return (
    <article
      className={`flex items-center gap-3 rounded-2xl ${
        desktop
          ? "justify-between p-3"
          : "min-w-0 bg-white p-3 shadow-[0_2px_8px_rgba(13,27,42,0.03)]"
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
            isCanteen
              ? "bg-arctic-blue text-navy-steel"
              : "bg-[#ECEEF0] text-[#59666F]"
          }`}
        >
          <Icon className="size-4" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-navy-steel">
            {merchant.name}
          </p>
          <p className="mt-0.5 text-xs text-[#59666F]">
            {isCanteen
              ? "Kantin"
              : "Koperasi"}
          </p>
          {!desktop ? (
            <p className="mt-0.5 text-xs text-[#59666F]">
              {merchant.ordersCount} orders today
            </p>
          ) : null}
        </div>
      </div>

      {desktop ? (
        <div className="shrink-0 text-right">
          <p className="text-sm font-bold text-navy-steel">
            {merchant.ordersCount}
          </p>
          <p className="text-[10px] text-[#59666F]">
            Orders
          </p>
        </div>
      ) : null}
    </article>
  );
}
