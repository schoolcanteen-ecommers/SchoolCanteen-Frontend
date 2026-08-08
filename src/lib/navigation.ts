import {
  BarChart3,
  ClipboardList,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Store,
  Users,
  UtensilsCrossed,
  WalletCards,
  QrCode,
  Boxes,
  ClipboardCheck,
  DollarSign,
  ShoppingCart,
  Truck,
  Settings,
  Home,
  UserRound,
} from "lucide-react";

import type { NavigationGroup } from "@/types/navigation";

import type { NavigationItem } from "@/types/navigation";

export const adminNavigation: NavigationGroup[] = [
  {
    label: "MAIN",
    items: [
      {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    label: "SCHOOL COMMERCE",
    items: [
      {
        title: "Kantin Digital",
        icon: UtensilsCrossed,
        children: [
          {
            title: "Menu Management",
            href: "/admin/canteen/menu",
            icon: Package,
          },
          {
            title: "Production Summary",
            href: "/admin/canteen/production",
            icon: Boxes,
          },
          {
            title: "Pickup Verification",
            href: "/admin/canteen/pickup",
            icon: QrCode,
          },
        ],
      },

      {
        title: "Koperasi",
        icon: ShoppingBag,
        children: [
          {
            title: "Products",
            href: "/admin/cooperative/products",
            icon: Package,
          },
          {
            title: "Inventory",
            href: "/admin/cooperative/inventory",
            icon: Boxes,
          },
          {
            title: "Orders",
            href: "/admin/cooperative/orders",
            icon: ClipboardList,
          },
        ],
      },
    ],
  },

  {
    label: "MANAGEMENT",
    items: [
      {
        title: "Students",
        href: "/admin/students",
        icon: Users,
      },
      {
        title: "Merchants",
        href: "/admin/merchants",
        icon: Store,
      },
      {
        title: "Transactions",
        href: "/admin/transactions",
        icon: WalletCards,
      },
      {
        title: "Reports",
        href: "/admin/reports",
        icon: BarChart3,
      },
    ],
  },
];

export const merchantNavigation = [
  {
    label: "MAIN",
    items: [
      {
        title: "Dashboard",
        href: "/merchant/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    label: "OPERATIONS",
    items: [
      {
        title: "Orders",
        href: "/merchant/orders",
        icon: ShoppingCart,
      },
      {
        title: "Production",
        href: "/merchant/production",
        icon: Truck,
      },
      {
        title: "Pickup Verification",
        href: "/merchant/pickup",
        icon: ClipboardCheck,
      },
    ],
  },

  {
    label: "CATALOG",
    items: [
      {
        title: "Products",
        href: "/merchant/products",
        icon: Package,
      },
      {
        title: "Inventory",
        href: "/merchant/inventory",
        icon: Boxes,
      },
    ],
  },

  {
    label: "FINANCE",
    items: [
      {
        title: "Revenue",
        href: "/merchant/finance",
        icon: DollarSign,
      },
    ],
  },

  {
    label: "SYSTEM",
    items: [
      {
        title: "Settings",
        href: "/merchant/settings",
        icon: Settings,
      },
    ],
  },
];

export const studentNavigation: NavigationItem[] = [
  {
    title: "Beranda",
    href: "/student/dashboard",
    icon: Home,
    desktop: true,
    mobile: true,
  },
  {
    title: "Kantin",
    href: "/kantin",
    icon: Store,
    desktop: true,
    mobile: true,
  },
  {
    title: "Koperasi",
    href: "/koperasi",
    icon: ShoppingBag,
    desktop: true,
    mobile: false,
  },
  {
    title: "Pesanan",
    href: "/student/orders",
    icon: ClipboardList,
    desktop: true,
    mobile: true,
  },
  {
    title: "Wallet",
    href: "/student/wallet",
    icon: WalletCards,
    desktop: false,
    mobile: true,
  },
  {
    title: "Profil",
    href: "/student/profile",
    icon: UserRound,
    desktop: false,
    mobile: true,
  },
];