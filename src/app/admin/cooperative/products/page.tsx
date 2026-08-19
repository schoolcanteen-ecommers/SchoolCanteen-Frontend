import {
  AdminCooperativeProductList,
} from "@/features/cooperative/components/admin-cooperative-product-list";
import {
  getCooperativeCatalog,
} from "@/lib/api/catalog";

export default async function AdminCooperativeProductsPage() {
  const catalog =
    await getCooperativeCatalog();

  const totalProducts =
    catalog.merchants.reduce(
      (total, merchant) =>
<<<<<<< HEAD
        total + merchant.productsCount,
=======
        total + (merchant.productsCount ?? 0),
>>>>>>> source/main
      0,
    );

  const activeProducts =
    catalog.products.length;

  const lowStockProducts =
    catalog.products.filter(
      (product) =>
        product.stock > 0 &&
        product.stock <= 10,
    ).length;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
      <div className="mb-7">
        <h1 className="font-heading text-[30px] font-bold tracking-[-0.02em] text-navy-steel sm:text-[32px]">
          Cooperative Products
        </h1>
        <p className="mt-2 text-sm text-[#536069] sm:text-base">
          Monitor katalog produk koperasi SchoolCanteen.
        </p>
      </div>

      <AdminCooperativeProductList
        products={catalog.products}
        categories={catalog.categories}
        totalProducts={totalProducts}
        activeProducts={activeProducts}
        lowStockProducts={lowStockProducts}
      />
    </div>
  );
}
