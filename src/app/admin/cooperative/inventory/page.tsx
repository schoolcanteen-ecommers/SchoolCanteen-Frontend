import {
  AdminCooperativeInventoryList,
} from "@/features/cooperative/components/admin-cooperative-inventory-list";
import {
  getCooperativeCatalog,
} from "@/lib/api/catalog";

const LOW_STOCK_THRESHOLD = 10;

export default async function AdminCooperativeInventoryPage() {
  const catalog =
    await getCooperativeCatalog();

  const totalStock =
    catalog.products.reduce(
      (total, product) =>
        total + product.stock,
      0,
    );

  const lowStockProducts =
    catalog.products.filter(
      (product) =>
        product.stock > 0 &&
        product.stock <=
          LOW_STOCK_THRESHOLD,
    ).length;

  const outOfStockProducts =
    catalog.products.filter(
      (product) =>
        product.stock <= 0,
    ).length;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
      <div className="mb-7">
        <h1 className="font-heading text-[30px] font-bold tracking-[-0.02em] text-navy-steel sm:text-[32px]">
          Cooperative Inventory
        </h1>
        <p className="mt-2 text-sm text-[#536069] sm:text-base">
          Monitor stok produk koperasi SchoolCanteen.
        </p>
      </div>

      <AdminCooperativeInventoryList
        products={catalog.products}
        categories={catalog.categories}
        totalStock={totalStock}
        lowStockProducts={lowStockProducts}
        outOfStockProducts={outOfStockProducts}
      />
    </div>
  );
}
