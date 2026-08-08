import { PageHeader } from "@/components/shared/page-header";

export default function AdminCanteenProductionPage() {
  return (
    <div className="p-6 lg:p-8">
      <PageHeader
        title="Production Summary"
        description="Pantau kebutuhan produksi berdasarkan pesanan kantin."
      />
    </div>
  );
}
