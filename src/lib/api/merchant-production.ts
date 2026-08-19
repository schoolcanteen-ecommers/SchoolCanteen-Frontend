import {
  authenticatedServerApiRequest,
} from "@/lib/api/authenticated-server";

export interface MerchantProductionModifierOption {
  optionName: string;

  quantity: number;
}

export interface MerchantProductionModifierGroup {
  groupName: string;

  options:
    MerchantProductionModifierOption[];
}

export interface MerchantProductionProduct {
  productId:
    string | null;

  productName:
    string;

  totalQuantity:
    number;

  orderCount:
    number;

  modifierBreakdown:
    MerchantProductionModifierGroup[];
}

export interface MerchantProductionSummaryData {
  activeOrderCount:
    number;

  totalItemCount:
    number;

  products:
    MerchantProductionProduct[];
}

interface ApiMerchantProductionSummary {
  statuses:
    string[];

  active_order_count:
    number;

  total_item_count:
    number;

  products: Array<{
    product_id:
      string | null;

    product_name:
      string;

    total_quantity:
      number;

    order_count:
      number;

    modifier_breakdown?: Array<{
      group_name:
        string;

      options?: Array<{
        option_name:
          string;

        quantity:
          number;
      }>;
    }>;
  }>;
}

export async function getMerchantProductionSummary(): Promise<
  MerchantProductionSummaryData
> {
  const data =
    await authenticatedServerApiRequest<ApiMerchantProductionSummary>(
      "/merchant/production-summary",
      {
        cache:
          "no-store",
      },
    );

  return {
    activeOrderCount:
      data.active_order_count,

    totalItemCount:
      data.total_item_count,

    products:
      data.products.map(
        (
          product,
        ) => ({
          productId:
            product.product_id,

          productName:
            product.product_name,

          totalQuantity:
            product.total_quantity,

          orderCount:
            product.order_count,

          modifierBreakdown:
            (
              product
                .modifier_breakdown ??
              []
            ).map(
              (
                group,
              ) => ({
                groupName:
                  group.group_name,

                options:
                  (
                    group.options ??
                    []
                  ).map(
                    (
                      option,
                    ) => ({
                      optionName:
                        option.option_name,

                      quantity:
                        option.quantity,
                    }),
                  ),
              }),
            ),
        }),
      ),
  };
}
