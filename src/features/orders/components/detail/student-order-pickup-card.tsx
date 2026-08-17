import {
  Clock3,
  Hash,
  Store,
} from "lucide-react";

interface StudentOrderPickupCardProps {
  pickupTime: string | null;
  pickupEndTime: string | null;
  pickupCode: string | null;
}

export function StudentOrderPickupCard({
  pickupTime,
  pickupEndTime,
  pickupCode,
}: StudentOrderPickupCardProps) {
  const pickupLabel =
    pickupTime
      ? pickupEndTime
        ? `${pickupTime} - ${pickupEndTime}`
        : pickupTime
      : "Belum tersedia";

  return (
    <section className="rounded-[18px] border border-arctic-blue bg-white p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-arctic-blue text-navy-steel sm:size-12">
          <Store className="size-5" />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-navy-steel">
            Pengambilan
          </h2>

          <div className="mt-3 space-y-2 text-sm text-[#536069] sm:text-base">
            <p>
              Lokasi:{" "}
              <span className="font-medium text-navy-steel">
                Belum tersedia
              </span>
            </p>

            <p className="flex items-center gap-2">
              <Clock3 className="size-4 shrink-0" />
              <span>
                Waktu:{" "}
                <span className="font-medium text-navy-steel">
                  {pickupLabel}
                </span>
              </span>
            </p>

            {pickupCode && (
              <p className="flex items-center gap-2">
                <Hash className="size-4 shrink-0" />
                <span>
                  Kode Pengambilan:{" "}
                  <span className="font-mono font-semibold tracking-wider text-navy-steel">
                    {pickupCode}
                  </span>
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
