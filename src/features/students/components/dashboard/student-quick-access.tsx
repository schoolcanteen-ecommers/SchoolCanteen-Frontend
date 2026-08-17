import Link from "next/link";
import {
  Package,
  Store,
  UtensilsCrossed,
  WalletCards,
} from "lucide-react";

import {
  cn,
} from "@/lib/utils";

interface StudentQuickAccessProps {
  className?: string;
}

const quickAccessItems = [
  {
    href: "/kantin",
    label: "Kantin",
    icon: UtensilsCrossed,
  },
  {
    href: "/koperasi",
    label: "Koperasi",
    icon: Store,
  },
  {
    href: "/student/orders",
    label: "Pesanan",
    icon: Package,
  },
  {
    href: "/student/wallet",
    label: "Wallet",
    icon: WalletCards,
  },
] as const;

export function StudentQuickAccess({
  className,
}: StudentQuickAccessProps) {
  return (
    <section
      className={cn(
        "flex flex-col gap-4",
        className,
      )}
    >
      <h2 className="font-sans text-lg font-semibold text-[#191C1E] lg:text-xl">
        Akses Cepat
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {quickAccessItems.map(
          ({
            href,
            label,
            icon: Icon,
          }) => (
            <Link
              key={href}
              href={href}
              className="flex min-h-[94px] flex-col items-center justify-center gap-2 rounded-[18px] border border-arctic-blue bg-white p-4 text-navy-steel transition-colors hover:bg-arctic-blue lg:min-h-[88px]"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-arctic-blue lg:bg-transparent">
                <Icon className="size-5" />
              </div>

              <span className="text-sm font-semibold">
                {label}
              </span>
            </Link>
          ),
        )}
      </div>
    </section>
  );
}
