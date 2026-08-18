import Link from "next/link";
import {
  ArrowLeft,
} from "lucide-react";
import {
  notFound,
} from "next/navigation";

import {
  AdminCooperativeProductDetail,
} from "@/features/cooperative/components/admin/product-management/admin-cooperative-product-detail";
import {
  getCooperativeCatalog,
} from "@/lib/api/catalog";

interface AdminCooperativeProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminCooperativeProductDetailPage({
  params,
}: AdminCooperativeProductDetailPageProps) {
  const { id } = await params;
  const catalog =
    await getCooperativeCatalog();

  const product =
    catalog.products.find(
      (candidate) =>
        candidate.id === id,
    );

  if (!product) {
    notFound();
  }

  const categoryName =
    catalog.categories.find(
      (category) =>
        category.id ===
        product.categoryId,
    )?.name ?? "Tanpa kategori";

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-6 sm:px-6 lg:py-8">
      <div className="mb-6 flex items-center gap-4">
        <Link
          href="/admin/cooperative/products"
          aria-label="Kembali ke Cooperative Products"
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-navy-steel transition hover:bg-[#F2F4F6]"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="min-w-0 truncate font-heading text-[26px] font-bold text-navy-steel md:text-[30px]">
          {product.name}
        </h1>
      </div>

      <AdminCooperativeProductDetail
        product={product}
        categoryName={categoryName}
      />
    </div>
  );
}
