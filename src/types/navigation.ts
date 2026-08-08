import type { LucideIcon } from "lucide-react";

export interface NavigationItem {
  title: string;
  href?: string;
  icon?: LucideIcon;

  desktop?: boolean;
  mobile?: boolean;

  children?: NavigationItem[];
}

export interface NavigationGroup {
  label: string;
  items: NavigationItem[];
}