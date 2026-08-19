import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./liquid-nav.css";
import { CartProvider } from "@/features/cart/cart-provider";
import { QueryProvider } from "@/providers/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SchoolCanteen",
    template: "%s | SchoolCanteen",
  },

  description:
    "School Commerce Management",

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/icons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/icons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icons/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],

    apple: [
      {
        url: "/icons/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  manifest: "/manifest.webmanifest",

  other: {
    "msapplication-config":
      "/icons/browserconfig.xml",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full flex flex-col`}>
        <QueryProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
