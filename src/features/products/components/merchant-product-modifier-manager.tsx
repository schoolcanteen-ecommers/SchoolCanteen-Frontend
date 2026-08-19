"use client";

import {
  Check,
  ChevronDown,
  Loader2,
  Pencil,
  Plus,
  Power,
  SlidersHorizontal,
  Trash2,
  X,
} from "lucide-react";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  createMerchantModifierGroup,
  createMerchantModifierOption,
  deleteMerchantModifierGroup,
  deleteMerchantModifierOption,
  getMerchantProductModifiers,
  updateMerchantModifierGroup,
  updateMerchantModifierGroupStatus,
  updateMerchantModifierOption,
  updateMerchantModifierOptionStatus,
} from "@/lib/api/merchant-product-modifiers-client";

import type {
  MerchantModifierGroup,
  MerchantModifierOption,
  MerchantModifierSelectionType,
} from "@/lib/api/merchant-product-modifiers-client";

import {
  formatCurrency,
} from "@/lib/utils";

import type {
  Product,
} from "@/types/product";

interface MerchantProductModifierManagerProps {
  product: Product;
  onClose: () => void;
}

interface GroupDraft {
  name: string;

  selectionType:
    MerchantModifierSelectionType;

  isRequired: boolean;

  minSelect: string;
  maxSelect: string;
}

interface OptionDraft {
  name: string;
  priceDelta: string;
}

const EMPTY_GROUP: GroupDraft = {
  name:
    "",

  selectionType:
    "single",

  isRequired:
    true,

  minSelect:
    "1",

  maxSelect:
    "1",
};

const EMPTY_OPTION: OptionDraft = {
  name:
    "",

  priceDelta:
    "0",
};

function selectionDescription(
  group: MerchantModifierGroup,
) {
  if (
    group.selectionType ===
    "single"
  ) {
    return "Pilih 1";
  }

  if (
    group.isRequired
  ) {
    if (
      group.minSelect ===
      group.maxSelect
    ) {
      return `Pilih ${group.maxSelect}`;
    }

    return `Pilih ${group.minSelect}–${group.maxSelect}`;
  }

  return `Maksimal ${group.maxSelect}`;
}

export function MerchantProductModifierManager({
  product,
  onClose,
}: MerchantProductModifierManagerProps) {
  const [
    groups,
    setGroups,
  ] =
    useState<
      MerchantModifierGroup[]
    >([]);

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    busyKey,
    setBusyKey,
  ] =
    useState<
      string | null
    >(null);

  const [
    error,
    setError,
  ] =
    useState<
      string | null
    >(null);

  const [
    groupFormOpen,
    setGroupFormOpen,
  ] =
    useState(false);

  const [
    editingGroup,
    setEditingGroup,
  ] =
    useState<
      MerchantModifierGroup | null
    >(null);

  const [
    groupDraft,
    setGroupDraft,
  ] =
    useState<GroupDraft>(
      EMPTY_GROUP,
    );

  const [
    optionGroup,
    setOptionGroup,
  ] =
    useState<
      MerchantModifierGroup | null
    >(null);

  const [
    editingOption,
    setEditingOption,
  ] =
    useState<
      MerchantModifierOption | null
    >(null);

  const [
    optionDraft,
    setOptionDraft,
  ] =
    useState<OptionDraft>(
      EMPTY_OPTION,
    );

  const loadGroups =
    useCallback(
      async () => {
        try {
          const data =
            await getMerchantProductModifiers(
              product.id,
            );

          setGroups(
            data,
          );

          setError(
            null,
          );
        } catch (
          caughtError
        ) {
          setError(
            caughtError
              instanceof Error
              ? caughtError.message
              : "Pilihan produk gagal dimuat.",
          );
        } finally {
          setLoading(
            false,
          );
        }
      },
      [
        product.id,
      ],
    );

  useEffect(() => {
    let cancelled = false;

    getMerchantProductModifiers(
      product.id,
    )
      .then((data) => {
        if (cancelled) {
          return;
        }

        setGroups(
          data,
        );

        setError(
          null,
        );
      })
      .catch(
        (caughtError) => {
          if (cancelled) {
            return;
          }

          setError(
            caughtError instanceof Error
              ? caughtError.message
              : "Pilihan produk gagal dimuat.",
          );
        },
      )
      .finally(() => {
        if (cancelled) {
          return;
        }

        setLoading(
          false,
        );
      });

    return () => {
      cancelled = true;
    };
  }, [product.id]);

  function openCreateGroup() {
    setEditingGroup(
      null,
    );

    setGroupDraft({
      ...EMPTY_GROUP,
    });

    setGroupFormOpen(
      true,
    );

    setError(
      null,
    );
  }

  function openEditGroup(
    group: MerchantModifierGroup,
  ) {
    setEditingGroup(
      group,
    );

    setGroupDraft({
      name:
        group.name,

      selectionType:
        group.selectionType,

      isRequired:
        group.isRequired,

      minSelect:
        String(
          Math.max(
            group.minSelect,
            1,
          ),
        ),

      maxSelect:
        String(
          Math.max(
            group.maxSelect,
            1,
          ),
        ),
    });

    setGroupFormOpen(
      true,
    );

    setError(
      null,
    );
  }

  function closeGroupForm() {
    if (busyKey) {
      return;
    }

    setGroupFormOpen(
      false,
    );

    setEditingGroup(
      null,
    );
  }

  async function saveGroup() {
    if (busyKey) {
      return;
    }

    const name =
      groupDraft.name.trim();

    if (!name) {
      setError(
        "Nama grup pilihan wajib diisi.",
      );

      return;
    }

    const isMultiple =
      groupDraft.selectionType ===
      "multiple";

    let minSelect:
      number | null =
      null;

    let maxSelect:
      number | null =
      null;

    if (isMultiple) {
      const parsedMin =
        Number(
          groupDraft.minSelect,
        );

      const parsedMax =
        Number(
          groupDraft.maxSelect,
        );

      if (
        groupDraft.isRequired &&
        (
          !Number.isInteger(
            parsedMin,
          ) ||
          parsedMin < 1
        )
      ) {
        setError(
          "Minimal pilihan wajib minimal 1.",
        );

        return;
      }

      if (
        !Number.isInteger(
          parsedMax,
        ) ||
        parsedMax < 1
      ) {
        setError(
          "Maksimal pilihan wajib minimal 1.",
        );

        return;
      }

      minSelect =
        groupDraft.isRequired
          ? parsedMin
          : 0;

      maxSelect =
        parsedMax;

      if (
        groupDraft.isRequired &&
        maxSelect <
          minSelect
      ) {
        setError(
          "Maksimal pilihan tidak boleh lebih kecil dari minimal pilihan.",
        );

        return;
      }
    }

    setError(
      null,
    );

    setBusyKey(
      editingGroup
        ? `group:${editingGroup.id}`
        : "group:create",
    );

    try {
      const payload = {
        name,

        selectionType:
          groupDraft.selectionType,

        isRequired:
          groupDraft.isRequired,

        minSelect,

        maxSelect,

        sortOrder:
          editingGroup
            ?.sortOrder ??
          groups.length,

        isActive:
          editingGroup
            ?.isActive ??
          true,
      };

      if (
        editingGroup
      ) {
        await updateMerchantModifierGroup(
          product.id,
          editingGroup.id,
          payload,
        );
      } else {
        await createMerchantModifierGroup(
          product.id,
          payload,
        );
      }

      setGroupFormOpen(
        false,
      );

      setEditingGroup(
        null,
      );

      await loadGroups();
    } catch (
      caughtError
    ) {
      setError(
        caughtError
          instanceof Error
          ? caughtError.message
          : "Grup pilihan gagal disimpan.",
      );
    } finally {
      setBusyKey(
        null,
      );
    }
  }

  async function toggleGroup(
    group: MerchantModifierGroup,
  ) {
    if (busyKey) {
      return;
    }

    setError(
      null,
    );

    setBusyKey(
      `group:${group.id}`,
    );

    try {
      await updateMerchantModifierGroupStatus(
        product.id,
        group.id,
        !group.isActive,
      );

      await loadGroups();
    } catch (
      caughtError
    ) {
      setError(
        caughtError
          instanceof Error
          ? caughtError.message
          : "Status grup gagal diperbarui.",
      );
    } finally {
      setBusyKey(
        null,
      );
    }
  }

  async function removeGroup(
    group: MerchantModifierGroup,
  ) {
    if (
      busyKey ||
      !window.confirm(
        `Hapus grup "${group.name}" beserta seluruh pilihannya?`,
      )
    ) {
      return;
    }

    setError(
      null,
    );

    setBusyKey(
      `group:${group.id}`,
    );

    try {
      await deleteMerchantModifierGroup(
        product.id,
        group.id,
      );

      await loadGroups();
    } catch (
      caughtError
    ) {
      setError(
        caughtError
          instanceof Error
          ? caughtError.message
          : "Grup pilihan gagal dihapus.",
      );
    } finally {
      setBusyKey(
        null,
      );
    }
  }

  function openCreateOption(
    group: MerchantModifierGroup,
  ) {
    setOptionGroup(
      group,
    );

    setEditingOption(
      null,
    );

    setOptionDraft({
      ...EMPTY_OPTION,
    });

    setError(
      null,
    );
  }

  function openEditOption(
    group: MerchantModifierGroup,
    option: MerchantModifierOption,
  ) {
    setOptionGroup(
      group,
    );

    setEditingOption(
      option,
    );

    setOptionDraft({
      name:
        option.name,

      priceDelta:
        String(
          option.priceDelta,
        ),
    });

    setError(
      null,
    );
  }

  function closeOptionForm() {
    if (busyKey) {
      return;
    }

    setOptionGroup(
      null,
    );

    setEditingOption(
      null,
    );
  }

  async function saveOption() {
    if (
      busyKey ||
      !optionGroup
    ) {
      return;
    }

    const name =
      optionDraft.name.trim();

    const priceDelta =
      Number(
        optionDraft.priceDelta,
      );

    if (!name) {
      setError(
        "Nama pilihan wajib diisi.",
      );

      return;
    }

    if (
      !Number.isInteger(
        priceDelta,
      ) ||
      priceDelta < 0
    ) {
      setError(
        "Tambahan harga tidak valid.",
      );

      return;
    }

    setError(
      null,
    );

    setBusyKey(
      editingOption
        ? `option:${editingOption.id}`
        : `option:create:${optionGroup.id}`,
    );

    try {
      const payload = {
        name,

        priceDelta,

        sortOrder:
          editingOption
            ?.sortOrder ??
          optionGroup
            .options
            .length,

        isActive:
          editingOption
            ?.isActive ??
          true,
      };

      if (
        editingOption
      ) {
        await updateMerchantModifierOption(
          product.id,
          optionGroup.id,
          editingOption.id,
          payload,
        );
      } else {
        await createMerchantModifierOption(
          product.id,
          optionGroup.id,
          payload,
        );
      }

      setOptionGroup(
        null,
      );

      setEditingOption(
        null,
      );

      await loadGroups();
    } catch (
      caughtError
    ) {
      setError(
        caughtError
          instanceof Error
          ? caughtError.message
          : "Pilihan gagal disimpan.",
      );
    } finally {
      setBusyKey(
        null,
      );
    }
  }

  async function toggleOption(
    group: MerchantModifierGroup,
    option: MerchantModifierOption,
  ) {
    if (busyKey) {
      return;
    }

    setError(
      null,
    );

    setBusyKey(
      `option:${option.id}`,
    );

    try {
      await updateMerchantModifierOptionStatus(
        product.id,
        group.id,
        option.id,
        !option.isActive,
      );

      await loadGroups();
    } catch (
      caughtError
    ) {
      setError(
        caughtError
          instanceof Error
          ? caughtError.message
          : "Status pilihan gagal diperbarui.",
      );
    } finally {
      setBusyKey(
        null,
      );
    }
  }

  async function removeOption(
    group: MerchantModifierGroup,
    option: MerchantModifierOption,
  ) {
    if (
      busyKey ||
      !window.confirm(
        `Hapus pilihan "${option.name}"?`,
      )
    ) {
      return;
    }

    setError(
      null,
    );

    setBusyKey(
      `option:${option.id}`,
    );

    try {
      await deleteMerchantModifierOption(
        product.id,
        group.id,
        option.id,
      );

      await loadGroups();
    } catch (
      caughtError
    ) {
      setError(
        caughtError
          instanceof Error
          ? caughtError.message
          : "Pilihan gagal dihapus.",
      );
    } finally {
      setBusyKey(
        null,
      );
    }
  }

  return (
    <div
      className="fixed inset-0 z-[95] bg-[#F7F9FB] lg:flex lg:items-center lg:justify-center lg:bg-[#0B1C30]/45 lg:p-6 lg:backdrop-blur-[3px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modifier-manager-title"
    >
      <div className="flex h-full w-full flex-col overflow-hidden bg-[#F7F9FB] lg:max-h-[90vh] lg:max-w-[760px] lg:rounded-[24px] lg:border lg:border-[#DDE5EB] lg:shadow-2xl">
        <header className="flex shrink-0 items-center gap-4 border-b border-[#DDE5EB] bg-white px-4 py-4 sm:px-6">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-arctic-blue text-navy-steel">
            <SlidersHorizontal className="size-5" />
          </div>

          <div className="min-w-0 flex-1">
            <h2
              id="modifier-manager-title"
              className="truncate font-heading text-xl font-bold text-navy-steel sm:text-2xl"
            >
              Varian & Pilihan
            </h2>

            <p className="mt-0.5 truncate text-sm text-[#536069]">
              {product.name}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={Boolean(busyKey)}
            aria-label="Tutup"
            className="flex size-10 shrink-0 items-center justify-center rounded-full text-[#536069] transition hover:bg-[#EFF4FF] hover:text-navy-steel disabled:opacity-40"
          >
            <X className="size-5" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[720px] space-y-5 px-4 py-5 sm:px-6 sm:py-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-heading text-lg font-bold text-navy-steel">
                  Pilihan Produk
                </h3>

                <p className="mt-1 max-w-lg text-sm leading-6 text-[#64748B]">
                  Atur tingkat pedas, ukuran, topping, atau pilihan lain yang akan ditampilkan kepada siswa.
                </p>
              </div>

              <button
                type="button"
                onClick={openCreateGroup}
                disabled={Boolean(busyKey)}
                className="hidden shrink-0 items-center gap-2 rounded-xl bg-navy-steel px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50 sm:flex"
              >
                <Plus className="size-4" />
                Tambah Grup
              </button>
            </div>

            {error && (
              <div className="rounded-xl border border-[#F3C7C3] bg-[#FFF3F1] px-4 py-3 text-sm text-[#991B1B]">
                {error}
              </div>
            )}

            {loading ? (
              <div className="flex min-h-52 items-center justify-center rounded-[18px] border border-[#E2E8F0] bg-white">
                <div className="text-center">
                  <Loader2 className="mx-auto size-6 animate-spin text-navy-steel" />
                  <p className="mt-3 text-sm text-[#64748B]">
                    Memuat pilihan produk...
                  </p>
                </div>
              </div>
            ) : groups.length === 0 ? (
              <div className="rounded-[18px] border border-dashed border-[#C8D4DE] bg-white p-8 text-center sm:p-10">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-arctic-blue text-navy-steel">
                  <SlidersHorizontal className="size-6" />
                </div>

                <h3 className="mt-4 font-heading text-lg font-bold text-navy-steel">
                  Belum ada pilihan
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#64748B]">
                  Contohnya Tingkat Pedas, Ukuran, atau Topping.
                </p>

                <button
                  type="button"
                  onClick={openCreateGroup}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-navy-steel px-5 py-3 text-sm font-bold text-white"
                >
                  <Plus className="size-4" />
                  Tambah Grup Pilihan
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {groups.map(
                  (
                    group,
                  ) => {
                    const groupBusy =
                      busyKey ===
                      `group:${group.id}`;

                    return (
                      <section
                        key={group.id}
                        className="overflow-hidden rounded-[18px] border border-[#DDE5EB] bg-white shadow-[0_4px_16px_rgba(13,27,42,0.04)]"
                      >
                        <div className="border-b border-[#EDF1F4] p-4 sm:p-5">
                          <div className="flex items-start gap-3">
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h4 className="font-heading text-base font-bold text-navy-steel sm:text-lg">
                                  {group.name}
                                </h4>

                                <span
                                  className={
                                    group.isRequired
                                      ? "rounded-full bg-[#FFF4E5] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#9A5500]"
                                      : "rounded-full bg-[#F1F5F9] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#536069]"
                                  }
                                >
                                  {group.isRequired
                                    ? "Wajib"
                                    : "Opsional"}
                                </span>

                                {!group.isActive && (
                                  <span className="rounded-full bg-[#FEECEC] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#991B1B]">
                                    Nonaktif
                                  </span>
                                )}
                              </div>

                              <p className="mt-1 text-xs text-[#64748B] sm:text-sm">
                                {group.selectionType ===
                                "single"
                                  ? "Satu pilihan"
                                  : "Beberapa pilihan"}
                                {" • "}
                                {selectionDescription(
                                  group,
                                )}
                              </p>
                            </div>

                            <div className="flex shrink-0 gap-1">
                              <button
                                type="button"
                                onClick={() =>
                                  openEditGroup(
                                    group,
                                  )
                                }
                                disabled={Boolean(busyKey)}
                                aria-label={`Edit ${group.name}`}
                                className="flex size-9 items-center justify-center rounded-lg text-[#536069] transition hover:bg-[#EFF4FF] hover:text-navy-steel disabled:opacity-40"
                              >
                                <Pencil className="size-4" />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  void toggleGroup(
                                    group,
                                  )
                                }
                                disabled={Boolean(busyKey)}
                                aria-label={
                                  group.isActive
                                    ? `Nonaktifkan ${group.name}`
                                    : `Aktifkan ${group.name}`
                                }
                                className="flex size-9 items-center justify-center rounded-lg text-[#536069] transition hover:bg-[#EFF4FF] hover:text-navy-steel disabled:opacity-40"
                              >
                                {groupBusy ? (
                                  <Loader2 className="size-4 animate-spin" />
                                ) : (
                                  <Power className="size-4" />
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  void removeGroup(
                                    group,
                                  )
                                }
                                disabled={Boolean(busyKey)}
                                aria-label={`Hapus ${group.name}`}
                                className="flex size-9 items-center justify-center rounded-lg text-[#991B1B] transition hover:bg-[#FFF0EF] disabled:opacity-40"
                              >
                                <Trash2 className="size-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 sm:p-5">
                          {group.options.length >
                          0 ? (
                            <div className="divide-y divide-[#EDF1F4]">
                              {group.options.map(
                                (
                                  option,
                                ) => {
                                  const optionBusy =
                                    busyKey ===
                                    `option:${option.id}`;

                                  return (
                                    <div
                                      key={option.id}
                                      className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                                    >
                                      <div
                                        className={
                                          option.isActive
                                            ? "flex size-8 shrink-0 items-center justify-center rounded-full bg-[#ECFDF5] text-[#047857]"
                                            : "flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F1F5F9] text-[#94A3B8]"
                                        }
                                      >
                                        <Check className="size-4" />
                                      </div>

                                      <div className="min-w-0 flex-1">
                                        <p
                                          className={
                                            option.isActive
                                              ? "truncate text-sm font-semibold text-navy-steel"
                                              : "truncate text-sm font-semibold text-[#94A3B8]"
                                          }
                                        >
                                          {option.name}
                                        </p>

                                        <p className="mt-0.5 text-xs text-[#64748B]">
                                          {option.priceDelta >
                                          0
                                            ? `+${formatCurrency(
                                                option.priceDelta,
                                              )}`
                                            : "Tanpa biaya tambahan"}
                                        </p>
                                      </div>

                                      {!option.isActive && (
                                        <span className="hidden text-[10px] font-bold uppercase text-[#991B1B] sm:inline">
                                          Nonaktif
                                        </span>
                                      )}

                                      <div className="flex shrink-0 gap-1">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            openEditOption(
                                              group,
                                              option,
                                            )
                                          }
                                          disabled={Boolean(busyKey)}
                                          aria-label={`Edit ${option.name}`}
                                          className="flex size-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#EFF4FF] hover:text-navy-steel disabled:opacity-40"
                                        >
                                          <Pencil className="size-3.5" />
                                        </button>

                                        <button
                                          type="button"
                                          onClick={() =>
                                            void toggleOption(
                                              group,
                                              option,
                                            )
                                          }
                                          disabled={Boolean(busyKey)}
                                          aria-label={
                                            option.isActive
                                              ? `Nonaktifkan ${option.name}`
                                              : `Aktifkan ${option.name}`
                                          }
                                          className="flex size-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#EFF4FF] hover:text-navy-steel disabled:opacity-40"
                                        >
                                          {optionBusy ? (
                                            <Loader2 className="size-3.5 animate-spin" />
                                          ) : (
                                            <Power className="size-3.5" />
                                          )}
                                        </button>

                                        <button
                                          type="button"
                                          onClick={() =>
                                            void removeOption(
                                              group,
                                              option,
                                            )
                                          }
                                          disabled={Boolean(busyKey)}
                                          aria-label={`Hapus ${option.name}`}
                                          className="flex size-8 items-center justify-center rounded-lg text-[#991B1B] hover:bg-[#FFF0EF] disabled:opacity-40"
                                        >
                                          <Trash2 className="size-3.5" />
                                        </button>
                                      </div>
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          ) : (
                            <p className="rounded-xl bg-[#F7F9FB] px-4 py-3 text-sm text-[#64748B]">
                              Belum ada pilihan di grup ini.
                            </p>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              openCreateOption(
                                group,
                              )
                            }
                            disabled={Boolean(busyKey)}
                            className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#B8C7D3] text-sm font-bold text-navy-steel transition hover:border-navy-steel hover:bg-[#F7F9FB] disabled:opacity-40"
                          >
                            <Plus className="size-4" />
                            Tambah Pilihan
                          </button>
                        </div>
                      </section>
                    );
                  },
                )}
              </div>
            )}
          </div>
        </div>

        <footer className="shrink-0 border-t border-[#DDE5EB] bg-white p-4 sm:hidden">
          <button
            type="button"
            onClick={openCreateGroup}
            disabled={Boolean(busyKey)}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-navy-steel text-sm font-bold text-white disabled:opacity-50"
          >
            <Plus className="size-4" />
            Tambah Grup
          </button>
        </footer>
      </div>

      {groupFormOpen && (
        <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/45 p-0 backdrop-blur-[2px] sm:items-center sm:p-4">
          <div className="max-h-[90vh] w-full overflow-y-auto rounded-t-[24px] bg-white p-5 shadow-2xl sm:max-w-lg sm:rounded-[20px] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-heading text-xl font-bold text-navy-steel">
                  {editingGroup
                    ? "Edit Grup Pilihan"
                    : "Tambah Grup Pilihan"}
                </h3>

                <p className="mt-1 text-sm text-[#64748B]">
                  Contoh: Tingkat Pedas, Ukuran, atau Topping.
                </p>
              </div>

              <button
                type="button"
                onClick={closeGroupForm}
                className="flex size-9 shrink-0 items-center justify-center rounded-full hover:bg-[#F1F5F9]"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-6 space-y-5">
              <label className="block">
                <span className="text-sm font-bold text-navy-steel">
                  Nama Grup
                </span>

                <input
                  type="text"
                  maxLength={100}
                  value={groupDraft.name}
                  onChange={(event) =>
                    setGroupDraft(
                      (
                        current,
                      ) => ({
                        ...current,

                        name:
                          event.target
                            .value,
                      }),
                    )
                  }
                  placeholder="Contoh: Tingkat Pedas"
                  className="mt-2 h-12 w-full rounded-xl border border-[#CBD5E1] px-4 text-sm outline-none focus:border-navy-steel focus:ring-2 focus:ring-navy-steel/10"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-navy-steel">
                  Cara Memilih
                </span>

                <div className="relative mt-2">
                  <select
                    value={
                      groupDraft.selectionType
                    }
                    onChange={(
                      event,
                    ) =>
                      setGroupDraft(
                        (
                          current,
                        ) => ({
                          ...current,

                          selectionType:
                            event.target
                              .value as MerchantModifierSelectionType,

                          minSelect:
                            "1",

                          maxSelect:
                            "1",
                        }),
                      )
                    }
                    className="h-12 w-full appearance-none rounded-xl border border-[#CBD5E1] bg-white px-4 pr-10 text-sm outline-none focus:border-navy-steel"
                  >
                    <option value="single">
                      Pilih satu
                    </option>

                    <option value="multiple">
                      Bisa pilih beberapa
                    </option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#64748B]" />
                </div>
              </label>

              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-[#DDE5EB] p-4">
                <div>
                  <p className="text-sm font-bold text-navy-steel">
                    Wajib dipilih
                  </p>

                  <p className="mt-1 text-xs text-[#64748B]">
                    Siswa harus memilih sebelum memasukkan produk ke keranjang.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={
                    groupDraft.isRequired
                  }
                  onChange={(
                    event,
                  ) =>
                    setGroupDraft(
                      (
                        current,
                      ) => ({
                        ...current,

                        isRequired:
                          event.target
                            .checked,
                      }),
                    )
                  }
                  className="size-5 accent-[#0D1B2A]"
                />
              </label>

              {groupDraft.selectionType ===
                "multiple" && (
                <div className="grid grid-cols-2 gap-3">
                  <label>
                    <span className="text-sm font-bold text-navy-steel">
                      Minimal
                    </span>

                    <input
                      type="number"
                      min={
                        groupDraft.isRequired
                          ? 1
                          : 0
                      }
                      max={100}
                      disabled={
                        !groupDraft.isRequired
                      }
                      value={
                        groupDraft.isRequired
                          ? groupDraft.minSelect
                          : "0"
                      }
                      onChange={(
                        event,
                      ) =>
                        setGroupDraft(
                          (
                            current,
                          ) => ({
                            ...current,

                            minSelect:
                              event.target
                                .value,
                          }),
                        )
                      }
                      className="mt-2 h-12 w-full rounded-xl border border-[#CBD5E1] px-4 text-sm outline-none disabled:bg-[#F1F5F9] disabled:text-[#94A3B8]"
                    />
                  </label>

                  <label>
                    <span className="text-sm font-bold text-navy-steel">
                      Maksimal
                    </span>

                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={
                        groupDraft.maxSelect
                      }
                      onChange={(
                        event,
                      ) =>
                        setGroupDraft(
                          (
                            current,
                          ) => ({
                            ...current,

                            maxSelect:
                              event.target
                                .value,
                          }),
                        )
                      }
                      className="mt-2 h-12 w-full rounded-xl border border-[#CBD5E1] px-4 text-sm outline-none"
                    />
                  </label>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeGroupForm}
                  disabled={Boolean(busyKey)}
                  className="h-12 flex-1 rounded-xl border border-[#CBD5E1] text-sm font-bold text-navy-steel disabled:opacity-50"
                >
                  Batal
                </button>

                <button
                  type="button"
                  onClick={() =>
                    void saveGroup()
                  }
                  disabled={Boolean(busyKey)}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-navy-steel text-sm font-bold text-white disabled:opacity-50"
                >
                  {busyKey?.startsWith(
                    "group:",
                  ) && (
                    <Loader2 className="size-4 animate-spin" />
                  )}

                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {optionGroup && (
        <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/45 p-0 backdrop-blur-[2px] sm:items-center sm:p-4">
          <div className="w-full rounded-t-[24px] bg-white p-5 shadow-2xl sm:max-w-lg sm:rounded-[20px] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-heading text-xl font-bold text-navy-steel">
                  {editingOption
                    ? "Edit Pilihan"
                    : "Tambah Pilihan"}
                </h3>

                <p className="mt-1 text-sm text-[#64748B]">
                  {optionGroup.name}
                </p>
              </div>

              <button
                type="button"
                onClick={closeOptionForm}
                className="flex size-9 shrink-0 items-center justify-center rounded-full hover:bg-[#F1F5F9]"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-6 space-y-5">
              <label className="block">
                <span className="text-sm font-bold text-navy-steel">
                  Nama Pilihan
                </span>

                <input
                  type="text"
                  maxLength={100}
                  value={
                    optionDraft.name
                  }
                  onChange={(
                    event,
                  ) =>
                    setOptionDraft(
                      (
                        current,
                      ) => ({
                        ...current,

                        name:
                          event.target
                            .value,
                      }),
                    )
                  }
                  placeholder="Contoh: Level 3"
                  className="mt-2 h-12 w-full rounded-xl border border-[#CBD5E1] px-4 text-sm outline-none focus:border-navy-steel"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-navy-steel">
                  Tambahan Harga
                </span>

                <div className="relative mt-2">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#64748B]">
                    Rp
                  </span>

                  <input
                    type="number"
                    min={0}
                    step={1}
                    inputMode="numeric"
                    value={
                      optionDraft.priceDelta
                    }
                    onChange={(
                      event,
                    ) =>
                      setOptionDraft(
                        (
                          current,
                        ) => ({
                          ...current,

                          priceDelta:
                            event.target
                              .value,
                        }),
                      )
                    }
                    className="h-12 w-full rounded-xl border border-[#CBD5E1] pl-12 pr-4 text-sm outline-none focus:border-navy-steel"
                  />
                </div>

                <p className="mt-2 text-xs text-[#64748B]">
                  Isi 0 jika tidak ada biaya tambahan.
                </p>
              </label>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeOptionForm}
                  disabled={Boolean(busyKey)}
                  className="h-12 flex-1 rounded-xl border border-[#CBD5E1] text-sm font-bold text-navy-steel disabled:opacity-50"
                >
                  Batal
                </button>

                <button
                  type="button"
                  onClick={() =>
                    void saveOption()
                  }
                  disabled={Boolean(busyKey)}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-navy-steel text-sm font-bold text-white disabled:opacity-50"
                >
                  {busyKey?.startsWith(
                    "option:",
                  ) && (
                    <Loader2 className="size-4 animate-spin" />
                  )}

                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
