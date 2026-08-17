import {
  StatusBadge,
} from "@/components/dashboard/status-badge";

import type {
  OrderStatus,
} from "@/types/order";

interface StudentOrderDetailHeaderProps {
  orderCode: string;
  merchantName: string;
  status: OrderStatus;
}

export function StudentOrderDetailHeader({
  orderCode,
  merchantName,
  status,
}: StudentOrderDetailHeaderProps) {
  const displayOrderCode =
    orderCode.startsWith("#")
      ? orderCode
      : `#${orderCode}`;

  return (
    <div className="mb-8 lg:mb-12">
      <h1 className="font-heading text-[32px] font-bold leading-[40px] tracking-[-0.01em] text-navy-steel sm:text-[40px] sm:leading-[48px] lg:text-[48px] lg:leading-[56px]">
        Detail Pesanan
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-medium text-[#536069] sm:gap-3 sm:text-base">
        <span className="font-semibold text-navy-steel">
          {displayOrderCode}
        </span>

        <span
          aria-hidden="true"
          className="text-[#A7ADB3]"
        >
          •
        </span>

        <span>{merchantName}</span>

        <span
          aria-hidden="true"
          className="hidden text-[#A7ADB3] sm:inline"
        >
          •
        </span>

        <span className="basis-full sm:basis-auto">
          <StatusBadge status={status} />
        </span>
      </div>
    </div>
  );
}
