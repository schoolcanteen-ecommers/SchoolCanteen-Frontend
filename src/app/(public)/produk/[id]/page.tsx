interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;

  return (
    <main className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          Detail Produk
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Product ID: {id}
        </p>
      </div>
    </main>
  );
}