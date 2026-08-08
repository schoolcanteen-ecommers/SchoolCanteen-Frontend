import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed bg-background px-6 py-10 text-center">
      {Icon && (
        <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-muted">
          <Icon className="size-5 text-muted-foreground" />
        </div>
      )}

      <h3 className="text-sm font-semibold">
        {title}
      </h3>

      {description && (
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-5">
          {action}
        </div>
      )}
    </div>
  );
}