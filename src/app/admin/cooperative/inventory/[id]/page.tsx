import Link from "next/link";
import {
  ArrowLeft,
} from "lucide-react";
import {
  notFound,
} from "next/navigation";

import {
  AdminCooperativeInventoryDetail,
} from "@/features/cooperative/components/admin/inventory-management/admin-cooperative-inventory-detail";
import {
  getCooperativeCatalog,
} from "@/lib/api/catalog";
import {
  getAdminCooperativeInventoryMetadata,
} from "@/mocks/admin-cooperative-inventory";

interface AdminCooperativeInventoryDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminCooperativeInventoryDetailPage({
  params,
}: AdminCooperativeInventoryDetailPageProps) {
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

  const metadata =
    getAdminCooperativeInventoryMetadata(
      product,
    );

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-6 sm:px-6 lg:py-8">
      <div className="mb-6 flex items-center gap-4">
        <Link
          href="/admin/cooperative/inventory"
          aria-label="Kembali ke Cooperative Inventory"
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-navy-steel transition hover:bg-[#F2F4F6]"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="font-heading text-[26px] font-bold text-navy-steel md:text-[30px]">
          Inventory Detail
        </h1>
      </div>

      <AdminCooperativeInventoryDetail
        product={product}
        categoryName={categoryName}
        metadata={metadata}
      />
    </div>
  );
}
