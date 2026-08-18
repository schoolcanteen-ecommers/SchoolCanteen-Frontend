import { AdminCanteenPickupList } from "@/features/canteen/components/admin-canteen-pickup-list";

import { adminPickupMonitoringEntries } from "@/mocks/admin-pickup-monitoring";

export default function AdminCanteenPickupPage() {
  return (
    <div className="mx-auto w-full max-w-[1320px] space-y-6 px-5 py-6 sm:px-6 md:space-y-8 lg:px-8 lg:py-8">
      <section>
        <h1 className="font-heading text-[30px] font-bold leading-tight text-navy-steel md:text-[32px]">
          Pickup Monitoring
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[#536069] md:mt-2 md:text-base">
          Monitor status pengambilan pesanan kantin SchoolCanteen.
        </p>
      </section>

      <AdminCanteenPickupList
        entries={adminPickupMonitoringEntries}
      />
    </div>
  );
}
