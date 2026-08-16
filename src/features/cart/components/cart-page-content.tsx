"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ImageIcon,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Store,
  Trash2,
  ArrowRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/features/cart/use-cart";
import { formatCurrency } from "@/lib/utils";
import { getCartProduct } from "@/lib/api/catalog";
import type { Product } from "@/types/product";

interface ResolvedCartItem {
  productId: string;
  quantity: number;
  product: Product;
  merchantName: string;
}

interface MerchantCartGroup {
  merchantId: string;
  merchantName: string;
  items: ResolvedCartItem[];
}

export function CartPageContent() {
  const { items, isHydrated, removeItem, updateQuantity, clearCart } = useCart();
  const [resolvedItems, setResolvedItems] = useState<ResolvedCartItem[]>([]);
  const [isResolving, setIsResolving] = useState(true);

 
  useEffect(() => {
    if (!isHydrated) return;

    let cancelled = false;

    async function resolveCartItems() {
      if (items.length === 0) {
        setResolvedItems([]);
        setIsResolving(false);
        return;
      }

      const results = await Promise.allSettled(
        items.map(async (item) => {
          const data = await getCartProduct(item.productId);
          return {
            ...item,
            product: data.product,
            merchantName: data.merchant.name,
          };
        }),
      );

      if (cancelled) return;

      const validItems: ResolvedCartItem[] = [];

      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          validItems.push(result.value);
          return;
        }
        const invalidItem = items[index];
        if (invalidItem) {
          removeItem(invalidItem.productId);
        }
      });

      setResolvedItems(validItems);
      setIsResolving(false);
    }

    void resolveCartItems();
    return () => {
      cancelled = true;
    };
  }, [items, isHydrated, removeItem]);

 
  if (!isHydrated || isResolving) {
    return (
      <div className="mx-auto max-w-[1320px] px-4 md:px-10 py-8 lg:py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-48 rounded-lg bg-surface-variant" />
          <div className="h-4 w-72 rounded bg-surface-variant" />
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-8">
              <div className="h-48 rounded-[16px] bg-surface-variant" />
              <div className="h-48 rounded-[16px] bg-surface-variant" />
            </div>
            <div className="h-64 rounded-2xl bg-surface-variant lg:col-span-4" />
          </div>
        </div>
      </div>
    );
  }

 
  const groups = resolvedItems.reduce<MerchantCartGroup[]>(
    (currentGroups, item) => {
      const merchantId = item.product.merchantId;
      const existingGroup = currentGroups.find(
        (group) => group.merchantId === merchantId,
      );

      if (existingGroup) {
        existingGroup.items.push(item);
        return currentGroups;
      }

      currentGroups.push({
        merchantId,
        merchantName: item.merchantName,
        items: [item],
      });
      return currentGroups;
    },
    [],
  );

  const subtotal = resolvedItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  
 
  const serviceFee = 2000; 
  const totalPembayaran = subtotal + serviceFee;

  const totalQuantity = resolvedItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

 
  if (resolvedItems.length === 0) {
    return (
      <div className="mx-auto max-w-[1320px] px-4 md:px-10 py-12 lg:py-20 flex-grow flex items-center justify-center">
        <div className="flex max-w-lg flex-col items-center text-center">
          <div className="flex size-20 items-center justify-center rounded-3xl bg-arctic-blue text-navy-steel shadow-sm">
            <ShoppingCart className="size-10" />
          </div>
          <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight text-navy-steel sm:text-4xl">
            Keranjang masih kosong
          </h1>
          <p className="mt-3 font-sans text-base leading-relaxed text-on-surface-variant">
            Tambahkan makanan dari kantin atau kebutuhan sekolah dari koperasi terlebih dahulu.
          </p>
          <div className="mt-8 flex flex-col w-full sm:w-auto sm:flex-row gap-4">
            <Button nativeButton={false} className="bg-navy-steel text-white h-[52px] px-8 rounded-xl font-bold font-sans" render={<Link href="/kantin" />}>
              Jelajahi Kantin
            </Button>
            <Button
              nativeButton={false}
              variant="outline"
              className="h-[52px] px-8 rounded-xl border-arctic-blue text-navy-steel font-bold font-sans hover:bg-neutral-surface"
              render={<Link href="/koperasi" />}
            >
              Lihat Koperasi
            </Button>
          </div>
        </div>
      </div>
    );
  }

 
  return (
    <div className="flex-grow w-full bg-neutral-surface pb-[100px] md:pb-0">
      <div className="mx-auto max-w-[1320px] px-4 md:px-10 py-8 lg:py-12">
        
        
        <div className="flex flex-col gap-2 mb-8 md:mb-12">
          <div className="flex items-center justify-between">
            <h1 className="font-heading text-[32px] md:text-[48px] font-bold text-navy-steel leading-tight">
              Keranjang
            </h1>
            <button
              type="button"
              className="flex md:hidden items-center gap-1.5 text-xs font-bold text-error/80 hover:text-error transition-colors px-3 py-1.5 rounded-lg bg-error/5"
              onClick={clearCart}
            >
              <Trash2 className="size-3.5" />
              Kosongkan
            </button>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-sans text-sm md:text-lg text-on-surface-variant">
              Periksa kembali pesananmu sebelum melanjutkan.
            </p>
            <button
              type="button"
              className="hidden md:flex items-center gap-2 text-sm font-bold text-error/80 hover:text-error transition-colors px-4 py-2 rounded-xl hover:bg-error/5"
              onClick={clearCart}
            >
              <Trash2 className="size-4" />
              Kosongkan Keranjang
            </button>
          </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          
          <div className="lg:col-span-8 flex flex-col gap-8 md:gap-12">
            {groups.map((group) => (
              <div key={group.merchantId} className="flex flex-col gap-4 md:gap-6">
                
                
                <div className="flex items-center gap-2 md:gap-3 border-b border-arctic-blue pb-3 md:pb-4">
                  <Store className="size-5 md:size-6 text-navy-steel opacity-80" />
                  <h2 className="font-heading text-xl md:text-2xl font-bold text-navy-steel">
                    {group.merchantName}
                  </h2>
                </div>

                
                <div className="flex flex-col gap-4">
                  {group.items.map(({ product, quantity }) => {
                    const canDecrease = quantity > 1;
                    const canIncrease = quantity < product.stock;

                    return (
                      <div 
                        key={product.id} 
                        className="bg-white rounded-[16px] border border-arctic-blue p-4 md:p-5 flex flex-col sm:flex-row gap-4 md:gap-6 items-start sm:items-center shadow-[0_4px_20px_rgba(13,27,42,0.02)] hover:shadow-[0_8px_24px_rgba(13,27,42,0.04)] transition-shadow"
                      >
                        
                        <div className="w-full sm:w-24 md:w-32 aspect-video sm:aspect-square rounded-xl overflow-hidden bg-neutral-surface flex-shrink-0 border border-arctic-blue/50 flex items-center justify-center">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="size-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="size-8 text-muted-foreground/40" />
                          )}
                        </div>

                        
                        <div className="flex-grow flex flex-col gap-1 md:gap-2 w-full">
                          <div className="flex justify-between items-start gap-4">
                            <Link href={`/produk/${product.id}`} className="hover:underline">
                              <h3 className="font-heading text-lg md:text-xl font-bold text-navy-steel line-clamp-2">
                                {product.name}
                              </h3>
                            </Link>
                            
                            <button
                              type="button"
                              onClick={() => removeItem(product.id)}
                              className="hidden sm:flex text-error/70 hover:text-error text-xs font-bold items-center gap-1 transition-colors bg-error/5 hover:bg-error/10 px-2 py-1 rounded"
                            >
                              <Trash2 className="size-3.5" /> Hapus
                            </button>
                          </div>
                          
                          <p className="font-sans text-sm text-secondary hidden sm:block">
                            {formatCurrency(product.price)} / item
                          </p>
                          
                          <p className="font-sans text-base md:text-lg text-navy-steel font-bold mt-1 md:mt-2">
                            {formatCurrency(product.price * quantity)}
                          </p>

                          
                          <div className="flex items-center justify-between mt-3 sm:mt-0 w-full sm:w-auto">
                            
                            <button
                              type="button"
                              onClick={() => removeItem(product.id)}
                              className="sm:hidden text-error/80 text-xs font-bold flex items-center gap-1 transition-colors"
                            >
                              <Trash2 className="size-3.5" /> Hapus
                            </button>

                            
                            <div className="flex items-center gap-3 bg-neutral-surface rounded-full border border-arctic-blue px-1.5 py-1 sm:ml-auto">
                              <button
                                type="button"
                                disabled={!canDecrease}
                                onClick={() => updateQuantity(product.id, quantity - 1)}
                                className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-navy-steel hover:bg-white rounded-full transition-colors disabled:opacity-50"
                              >
                                <Minus className="size-3.5 md:size-4" />
                              </button>
                              <span className="font-sans text-xs md:text-sm font-bold text-navy-steel w-4 md:w-6 text-center">
                                {quantity}
                              </span>
                              <button
                                type="button"
                                disabled={!canIncrease}
                                onClick={() => updateQuantity(product.id, quantity + 1)}
                                className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-navy-steel hover:bg-white rounded-full transition-colors disabled:opacity-50"
                              >
                                <Plus className="size-3.5 md:size-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          
          <div className="lg:col-span-4 lg:sticky lg:top-[100px] w-full">
            <div className="bg-white rounded-[24px] border border-arctic-blue p-6 md:p-8 flex flex-col gap-6 shadow-[0_12px_32px_rgba(13,27,42,0.06)]">
              <h2 className="font-heading text-xl md:text-[22px] font-bold text-navy-steel pb-4 border-b border-arctic-blue">
                Ringkasan Pesanan
              </h2>
              
              <div className="flex flex-col gap-4 py-2 border-b border-arctic-blue pb-6">
                <div className="flex justify-between items-center font-sans text-sm md:text-base text-secondary">
                  <span>Subtotal ({totalQuantity} item)</span>
                  <span className="font-medium text-navy-steel">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center font-sans text-sm md:text-base text-secondary">
                  <span>Biaya Layanan</span>
                  <span className="font-medium text-navy-steel">{formatCurrency(serviceFee)}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="font-sans text-base md:text-lg font-bold text-navy-steel">Total Pembayaran</span>
                <span className="font-heading text-2xl md:text-[28px] font-bold text-navy-steel">
                  {formatCurrency(totalPembayaran)}
                </span>
              </div>
              
              
              <Button
                nativeButton={false}
                className="w-full bg-navy-steel text-white h-[56px] rounded-xl font-sans font-bold text-base hover:opacity-90 transition-opacity mt-4 flex items-center justify-center gap-2 shadow-md"
                render={<Link href="/student/checkout" />}
              >
                Lanjut ke Checkout <ArrowRight className="size-5" />
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}