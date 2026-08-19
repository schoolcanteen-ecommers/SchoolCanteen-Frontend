"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Check,
  Loader2,
  Plus,
  X,
} from "lucide-react";

import {
  useCart,
} from "@/features/cart/use-cart";

import {
  getProductCustomization,
} from "@/lib/api/catalog";

import {
  formatCurrency,
} from "@/lib/utils";

import type {
  CartModifierSelection,
} from "@/types/cart";

import type {
  Product,
  ProductModifierGroup,
} from "@/types/product";

interface ProductCustomizationSheetProps {
  productId: string;
  stock: number;

  quantity?: number;

  lineId?: string;

  initialSelections?:
    CartModifierSelection[];

  initialNote?: string;

  open: boolean;

  onOpenChange: (
    open: boolean,
  ) => void;

  onAdded?: () => void;
}

type SelectedOptions =
  Record<string, string[]>;

function createInitialSelectedOptions(
  selections:
    CartModifierSelection[] | undefined,
): SelectedOptions {
  const result:
    SelectedOptions = {};

  for (
    const selection
    of selections ?? []
  ) {
    result[
      selection.groupId
    ] = [
      ...selection.optionIds,
    ];
  }

  return result;
}

export function ProductCustomizationSheet({
  productId,
  stock,
  quantity = 1,
  lineId,
  initialSelections,
  initialNote,
  open,
  onOpenChange,
  onAdded,
}: ProductCustomizationSheetProps) {
  const {
    addItem,
    updateCustomization,
    getProductQuantity,
  } = useCart();

  const [
    product,
    setProduct,
  ] =
    useState<Product | null>(
      null,
    );

  const [
    loadedProductId,
    setLoadedProductId,
  ] =
    useState<string | null>(
      null,
    );

  const [
    loadError,
    setLoadError,
  ] =
    useState<string | null>(
      null,
    );

  const [
    selectedOptions,
    setSelectedOptions,
  ] =
    useState<SelectedOptions>(
      () =>
        createInitialSelectedOptions(
          initialSelections,
        ),
    );

  const [
    note,
    setNote,
  ] =
    useState(
      () =>
        initialNote ?? "",
    );

  /*
   * Detail modifier hanya di-fetch
   * saat customization benar-benar
   * dibutuhkan.
   */
  useEffect(() => {
    if (
      !open ||
      loadedProductId ===
        productId
    ) {
      return;
    }

    let cancelled = false;

    void getProductCustomization(
      productId,
    )
      .then((data) => {
        if (cancelled) {
          return;
        }

        setProduct(data);

        setLoadedProductId(
          productId,
        );

        if (!lineId) {
          setSelectedOptions(
            {},
          );

          setNote("");
        }

        setLoadError(null);
      })
      .catch((error) => {
        if (cancelled) {
          return;
        }

        setProduct(null);

        setLoadedProductId(
          productId,
        );

        setLoadError(
          error instanceof Error
            ? error.message
            : "Pilihan produk gagal dimuat.",
        );
      });

    return () => {
      cancelled = true;
    };
  }, [
    open,
    productId,
    loadedProductId,
    lineId,
  ]);

  const groups =
    useMemo(
      () =>
        product?.modifierGroups ??
        [],
      [
        product?.modifierGroups,
      ],
    );

  const currentProductQuantity =
    getProductQuantity(
      productId,
    );

  const remainingStock =
    Math.max(
      stock -
        currentProductQuantity,
      0,
    );

  const selectionValidation =
    useMemo(
      () =>
        groups.map(
          (group) => {
            const selected =
              selectedOptions[
                group.id
              ] ?? [];

            const minimum =
              group.isRequired
                ? Math.max(
                    1,
                    group.minSelect,
                  )
                : 0;

            const maximum =
              Math.max(
                group.maxSelect,
                1,
              );

            const configurationAvailable =
              !group.isRequired ||
              group.options.length >=
                minimum;

            const valid =
              configurationAvailable &&
              selected.length >=
                minimum &&
              selected.length <=
                maximum;

            return {
              group,
              selected,
              minimum,
              maximum,
              configurationAvailable,
              valid,
            };
          },
        ),
      [
        groups,
        selectedOptions,
      ],
    );

  const selectionsValid =
    selectionValidation.every(
      (item) =>
        item.valid,
    );

  const modifierDelta =
    useMemo(
      () =>
        groups.reduce(
          (
            groupTotal,
            group,
          ) => {
            const selectedIds =
              new Set(
                selectedOptions[
                  group.id
                ] ?? [],
              );

            return (
              groupTotal +
              group.options.reduce(
                (
                  optionTotal,
                  option,
                ) =>
                  selectedIds.has(
                    option.id,
                  )
                    ? optionTotal +
                      option.priceDelta
                    : optionTotal,
                0,
              )
            );
          },
          0,
        ),
      [
        groups,
        selectedOptions,
      ],
    );

  const finalUnitPrice =
    (product?.price ?? 0) +
    modifierDelta;

  const requestedQuantity =
    Math.max(
      1,
      Math.floor(quantity),
    );

  const stockAvailableForRequest =
    lineId
      ? Math.max(
          stock -
            (
              currentProductQuantity -
              requestedQuantity
            ),
          0,
        )
      : remainingStock;

  const canConfirm =
    Boolean(product) &&
    groups.length > 0 &&
    selectionsValid &&
    stockAvailableForRequest >=
      requestedQuantity;

  function resetAndClose() {
    setSelectedOptions(
      {},
    );

    setNote("");

    onOpenChange(false);
  }

  function toggleOption(
    group:
      ProductModifierGroup,
    optionId: string,
  ) {
    setSelectedOptions(
      (current) => {
        const currentIds =
          current[group.id] ??
          [];

        if (
          group.selectionType ===
          "single"
        ) {
          /*
           * Required single selalu
           * mempunyai satu pilihan.
           *
           * Optional single boleh
           * dikosongkan kembali.
           */
          if (
            !group.isRequired &&
            currentIds.includes(
              optionId,
            )
          ) {
            return {
              ...current,
              [group.id]: [],
            };
          }

          return {
            ...current,
            [group.id]: [
              optionId,
            ],
          };
        }

        const alreadySelected =
          currentIds.includes(
            optionId,
          );

        if (alreadySelected) {
          return {
            ...current,

            [group.id]:
              currentIds.filter(
                (id) =>
                  id !== optionId,
              ),
          };
        }

        if (
          currentIds.length >=
          group.maxSelect
        ) {
          return current;
        }

        return {
          ...current,

          [group.id]: [
            ...currentIds,
            optionId,
          ],
        };
      },
    );
  }

  function handleConfirm() {
    if (
      !canConfirm ||
      !product
    ) {
      return;
    }

    const selections =
      Object.entries(
        selectedOptions,
      )
        .filter(
          (
            [, optionIds],
          ) =>
            optionIds.length > 0,
        )
        .map(
          ([
            groupId,
            optionIds,
          ]) => ({
            groupId,
            optionIds,
          }),
        );

    if (lineId) {
      updateCustomization(
        lineId,
        {
          selections,
          note,
        },
      );
    } else {
      addItem(
        productId,
        requestedQuantity,
        {
          selections,
          note,
        },
      );
    }

    onAdded?.();

    resetAndClose();
  }

  if (!open) {
    return null;
  }

  const isLoading =
    loadedProductId !==
      productId ||
    (
      !product &&
      !loadError
    );

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-black/35 md:items-center md:p-6"
      role="presentation"
      onMouseDown={(
        event,
      ) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          resetAndClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Pilih variasi produk"
        className="max-h-[88svh] w-full overflow-hidden rounded-t-[24px] bg-white shadow-2xl md:max-w-[520px] md:rounded-[24px]"
      >
        <header className="flex items-start justify-between gap-4 border-b border-[#E2E8F0] px-5 py-4 md:px-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.06em] text-[#66737C]">
              Pilihan Produk
            </p>

            <h2 className="mt-1 font-heading text-xl font-bold text-navy-steel">
              {product?.name ??
                "Atur pesanan"}
            </h2>
          </div>

          <button
            type="button"
            aria-label="Tutup"
            onClick={
              resetAndClose
            }
            className="flex size-10 shrink-0 items-center justify-center rounded-full text-[#536069] transition hover:bg-[#F1F5F9]"
          >
            <X className="size-5" />
          </button>
        </header>

        <div className="max-h-[calc(88svh-170px)] overflow-y-auto px-5 py-5 md:px-6">
          {isLoading && (
            <div className="flex min-h-52 items-center justify-center">
              <Loader2 className="size-6 animate-spin text-navy-steel" />
            </div>
          )}

          {!isLoading &&
            loadError && (
              <div className="rounded-[16px] border border-red-200 bg-red-50 p-4">
                <p className="text-sm font-semibold text-red-700">
                  Pilihan gagal dimuat
                </p>

                <p className="mt-1 text-sm leading-6 text-red-600">
                  {loadError}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setLoadedProductId(
                      null,
                    );

                    setLoadError(
                      null,
                    );
                  }}
                  className="mt-4 text-sm font-bold text-navy-steel"
                >
                  Coba lagi
                </button>
              </div>
            )}

          {!isLoading &&
            !loadError &&
            product && (
              <div className="space-y-6">
                {selectionValidation.map(
                  ({
                    group,
                    selected,
                    minimum,
                    maximum,
                    configurationAvailable,
                  }) => (
                    <fieldset
                      key={
                        group.id
                      }
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <legend className="font-heading text-base font-bold text-navy-steel">
                            {
                              group.name
                            }
                          </legend>

                          <p className="mt-1 text-xs text-[#66737C]">
                            {group.isRequired
                              ? "Wajib dipilih"
                              : "Opsional"}

                            {group.selectionType ===
                            "multiple"
                              ? ` · pilih ${minimum}-${maximum}`
                              : ""}
                          </p>
                        </div>

                        {group.isRequired && (
                          <span className="rounded-full bg-[#EEF7FD] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.05em] text-navy-steel">
                            Wajib
                          </span>
                        )}
                      </div>

                      {!configurationAvailable ? (
                        <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                          Pilihan wajib sedang tidak tersedia.
                        </div>
                      ) : (
                        <div className="mt-3 space-y-2">
                          {group.options.map(
                            (
                              option,
                            ) => {
                              const active =
                                selected.includes(
                                  option.id,
                                );

                              return (
                                <button
                                  key={
                                    option.id
                                  }
                                  type="button"
                                  onClick={() =>
                                    toggleOption(
                                      group,
                                      option.id,
                                    )
                                  }
                                  className={`flex min-h-12 w-full items-center justify-between gap-3 rounded-[13px] border px-4 py-3 text-left transition ${
                                    active
                                      ? "border-navy-steel bg-[#EEF7FD]"
                                      : "border-[#DCE8F0] bg-white hover:bg-[#F8FAFC]"
                                  }`}
                                >
                                  <span className="flex min-w-0 items-center gap-3">
                                    <span
                                      className={`flex size-5 shrink-0 items-center justify-center border ${
                                        group.selectionType ===
                                        "single"
                                          ? "rounded-full"
                                          : "rounded-md"
                                      } ${
                                        active
                                          ? "border-navy-steel bg-navy-steel text-white"
                                          : "border-[#AAB6BE] bg-white"
                                      }`}
                                    >
                                      {active && (
                                        <Check className="size-3.5" />
                                      )}
                                    </span>

                                    <span className="truncate text-sm font-semibold text-navy-steel">
                                      {
                                        option.name
                                      }
                                    </span>
                                  </span>

                                  <span className="shrink-0 text-xs font-semibold text-[#536069]">
                                    {option.priceDelta >
                                    0
                                      ? `+${formatCurrency(
                                          option.priceDelta,
                                        )}`
                                      : "Gratis"}
                                  </span>
                                </button>
                              );
                            },
                          )}
                        </div>
                      )}
                    </fieldset>
                  ),
                )}

                <div>
                  <label
                    htmlFor={`product-note-${productId}`}
                    className="font-heading text-base font-bold text-navy-steel"
                  >
                    Catatan
                  </label>

                  <p className="mt-1 text-xs text-[#66737C]">
                    Opsional, maksimal 120 karakter.
                  </p>

                  <textarea
                    id={`product-note-${productId}`}
                    value={note}
                    maxLength={120}
                    rows={3}
                    onChange={(
                      event,
                    ) =>
                      setNote(
                        event.target.value,
                      )
                    }
                    placeholder="Contoh: tanpa bawang"
                    className="mt-3 w-full resize-none rounded-[13px] border border-[#DCE8F0] bg-white px-4 py-3 text-sm text-navy-steel outline-none transition focus:border-navy-steel"
                  />

                  <p className="mt-1 text-right text-[11px] text-[#7A8790]">
                    {note.length}/120
                  </p>
                </div>

                <div className="rounded-[14px] bg-[#F8FAFC] px-4 py-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#66737C]">
                      Harga per item
                    </span>

                    <strong className="font-heading text-navy-steel">
                      {formatCurrency(
                        finalUnitPrice,
                      )}
                    </strong>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-[#66737C]">
                      Jumlah
                    </span>

                    <strong className="text-navy-steel">
                      {requestedQuantity}
                    </strong>
                  </div>
                </div>
              </div>
            )}
        </div>

        <footer className="border-t border-[#E2E8F0] bg-white px-5 py-4 md:px-6">
          <button
            type="button"
            disabled={
              !canConfirm
            }
            onClick={
              handleConfirm
            }
            className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-[14px] bg-navy-steel px-5 text-sm font-bold text-white transition hover:bg-navy-steel/90 disabled:cursor-not-allowed disabled:opacity-45"
          >
            {stockAvailableForRequest <
            requestedQuantity
              ? "Stok tidak mencukupi"
              : lineId
                ? "Simpan Perubahan"
                : "Tambah ke Keranjang"}

            {canConfirm && (
              <Plus className="size-[18px]" />
            )}
          </button>
        </footer>
      </section>
    </div>
  );
}
