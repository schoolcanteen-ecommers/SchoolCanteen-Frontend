import Link from "next/link";

import {
  ArrowRight,
} from "lucide-react";

import {
  ProductCard,
} from "@/components/commerce/product-card";

import {
  cn,
} from "@/lib/utils";

import type {
  Product,
} from "@/types/product";

interface PublicHomeProductSectionProps {
  title: string;
  description: string;
  href: string;
  source: "kantin" | "koperasi";
  products: Product[];
  merchantNameById: ReadonlyMap<
    string,
    string
  >;
  variant?: "blue" | "white";
}

export function PublicHomeProductSection({
  title,
  description,
  href,
  source,
  products,
  merchantNameById,
  variant = "white",
}: PublicHomeProductSectionProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section
      className={cn(
        "py-7 sm:py-9 lg:py-11",
        variant === "blue"
          ? "bg-[#EEF7FD]/70"
          : "bg-white",
      )}
    >
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6 md:px-8">
        <header className="mb-4 flex items-end justify-between gap-4 sm:mb-6">
          <div className="min-w-0">
            <h2 className="font-heading text-[21px] font-bold tracking-tight text-navy-steel sm:text-[26px]">
              {title}
            </h2>

            <p className="mt-1 text-[12px] leading-5 text-muted-foreground sm:text-sm">
              {description}
            </p>
          </div>

          <Link
            href={href}
            prefetch={false}
            className="flex shrink-0 items-center gap-1 text-[12px] font-bold text-navy-steel transition-opacity hover:opacity-70 sm:text-sm"
          >
            Lihat semua

            <ArrowRight className="size-4" />
          </Link>
        </header>

        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {products.map(
            (product) => (
              <div
                key={product.id}
                className="w-[62vw] min-w-[190px] max-w-[232px] shrink-0 snap-start sm:w-auto sm:min-w-0 sm:max-w-none"
              >
                <ProductCard
                  product={product}
                  merchantName={
                    merchantNameById.get(
                      product.merchantId,
                    )
                  }
                  source={source}
                />
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
