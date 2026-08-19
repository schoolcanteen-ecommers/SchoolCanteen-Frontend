import {
  cn,
} from "@/lib/utils";

interface CategoryChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function CategoryChip({
  label,
  active = false,
  onClick,
}: CategoryChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "min-h-10 shrink-0 rounded-full border px-4 text-[13px] font-medium transition-colors sm:text-sm",
        active
          ? "border-navy-steel bg-navy-steel text-white"
          : "border-[#DCEAF3] bg-white text-muted-foreground hover:border-navy-steel/25 hover:text-navy-steel",
      )}
    >
      {label}
    </button>
  );
}
