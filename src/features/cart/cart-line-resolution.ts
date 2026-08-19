import type {
  CartModifierSelection,
} from "@/types/cart";

import type {
  Product,
} from "@/types/product";

export interface CartModifierSummary {
  groupId: string;
  groupName: string;

  optionNames: string[];

  priceDelta: number;
}

export interface CartCustomizationResolution {
  valid: boolean;
  issue: string | null;

  modifierDelta: number;

  modifierOptionIds: string[];

  summaries: CartModifierSummary[];
}

export function resolveCartCustomization(
  product: Product,
  selections: CartModifierSelection[],
): CartCustomizationResolution {
  const groups =
    product.modifierGroups ?? [];

  const selectedByGroup =
    new Map<string, string[]>(
      selections.map(
        (selection) => [
          selection.groupId,
          Array.from(
            new Set(
              selection.optionIds,
            ),
          ),
        ],
      ),
    );

  if (
    product.requiresCustomization &&
    groups.length === 0
  ) {
    return invalid(
      "Pilihan wajib produk belum dapat diverifikasi.",
    );
  }

  const knownGroupIds =
    new Set(
      groups.map(
        (group) =>
          group.id,
      ),
    );

  for (
    const selection
    of selections
  ) {
    if (
      selection.optionIds.length > 0 &&
      !knownGroupIds.has(
        selection.groupId,
      )
    ) {
      return invalid(
        "Pilihan produk sudah berubah. Atur ulang pilihan.",
      );
    }
  }

  let modifierDelta = 0;

  const modifierOptionIds:
    string[] = [];

  const summaries:
    CartModifierSummary[] = [];

  for (const group of groups) {
    const selectedIds =
      selectedByGroup.get(
        group.id,
      ) ?? [];

    const optionsById =
      new Map(
        group.options.map(
          (option) => [
            option.id,
            option,
          ],
        ),
      );

    for (
      const optionId
      of selectedIds
    ) {
      if (
        !optionsById.has(
          optionId,
        )
      ) {
        return invalid(
          `Pilihan ${group.name} sudah tidak tersedia.`,
        );
      }
    }

    const minimum =
      group.isRequired
        ? Math.max(
            1,
            group.minSelect,
          )
        : 0;

    const maximum =
      group.selectionType ===
      "single"
        ? 1
        : Math.max(
            1,
            group.maxSelect,
          );

    if (
      group.isRequired &&
      group.options.length <
        minimum
    ) {
      return invalid(
        `Pilihan wajib ${group.name} sedang tidak tersedia.`,
      );
    }

    if (
      selectedIds.length <
      minimum
    ) {
      return invalid(
        `${group.name} wajib dipilih.`,
      );
    }

    if (
      selectedIds.length >
      maximum
    ) {
      return invalid(
        `Pilihan ${group.name} melebihi batas.`,
      );
    }

    if (
      selectedIds.length === 0
    ) {
      continue;
    }

    const selectedOptions =
      selectedIds.map(
        (id) =>
          optionsById.get(id)!,
      );

    const groupDelta =
      selectedOptions.reduce(
        (
          total,
          option,
        ) =>
          total +
          option.priceDelta,
        0,
      );

    modifierDelta +=
      groupDelta;

    modifierOptionIds.push(
      ...selectedOptions.map(
        (option) =>
          option.id,
      ),
    );

    summaries.push({
      groupId:
        group.id,

      groupName:
        group.name,

      optionNames:
        selectedOptions.map(
          (option) =>
            option.name,
        ),

      priceDelta:
        groupDelta,
    });
  }

  return {
    valid: true,
    issue: null,

    modifierDelta,

    modifierOptionIds,

    summaries,
  };
}

function invalid(
  issue: string,
): CartCustomizationResolution {
  return {
    valid: false,
    issue,

    modifierDelta: 0,

    modifierOptionIds: [],

    summaries: [],
  };
}
