"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Save } from "lucide-react";

import { updateMerchantProductStock } from "@/lib/api/merchant-products-client";

interface MerchantStockEditorProps {
  productId: string;
  currentStock: number;
}

export function MerchantStockEditor({
  productId,
  currentStock,
}: MerchantStockEditorProps) {
  const router = useRouter();

  const [stock, setStock] = useState(String(currentStock));

  const [isSaving, setIsSaving] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    if (isSaving) {
      return;
    }

    const parsedStock = Number(stock);

    if (!Number.isInteger(parsedStock) || parsedStock < 0) {
      setError("Stok tidak valid.");

      return;
    }

    setError(null);

    setIsSaving(true);

    try {
      await updateMerchantProductStock(productId, parsedStock);

      router.refresh();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Stok gagal diperbarui.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="number"
          min={0}
          step={1}
          inputMode="numeric"
          value={stock}
          onChange={(event) => setStock(event.target.value)}
          className="h-9 min-w-0 flex-1 rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
        />

        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={isSaving}
          className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg border px-3 text-xs font-medium transition hover:bg-muted disabled:opacity-50"
        >
          <Save className="size-3.5" />

          {isSaving ? "Menyimpan..." : "Simpan Stok"}
        </button>
      </div>

      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
