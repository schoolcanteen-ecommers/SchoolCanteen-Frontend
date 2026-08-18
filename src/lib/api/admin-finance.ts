import { authenticatedServerApiRequest } from "@/lib/api/authenticated-server";
import { getAdminDashboard } from "@/lib/api/admin-dashboard";

import type { WithdrawalMethod, WithdrawalStatus } from "@/types/withdrawal";

const API_PAGE_SIZE = 20;
const UI_PAGE_SIZE = 10;

export type AdminWithdrawalStatusFilter =
  | "waiting"
  | "approved"
  | "processed"
  | "completed"
  | "rejected";

interface ApiAdminMerchant {
  id: string;
  name: string;
  type: "canteen" | "cooperative";
  description: string | null;
  logo_url: string | null;
  is_active: boolean;
  is_open: boolean;
  owner: { id: string; name: string; phone: string | null } | null;
  wallet: {
    pending_balance: number;
    available_balance: number;
    total_balance: number;
    is_active: boolean;
  } | null;
  orders_count: number;
  products_count: number;
  created_at: string | null;
  updated_at: string | null;
}

interface ApiPaymentAccount {
  id: string;
  type: string;
  provider: string;
  account_number: string;
  account_name: string;
}

interface ApiAdminWithdrawal {
  id: string;
  merchant: { id: string; name: string; type: "canteen" | "cooperative" };
  payment_account: ApiPaymentAccount | null;
  amount: number;
  method: string;
  status: string;
  notes: string | null;
  approved_by: { id: string; name: string } | null;
  timeline: {
    created_at: string | null;
    approved_at: string | null;
    processed_at: string | null;
    completed_at: string | null;
    rejected_at: string | null;
  };
  updated_at: string | null;
}

export interface AdminFinanceMerchantOption {
  id: string;
  name: string;
  type: "CANTEEN" | "COOPERATIVE";
}

export interface AdminFinanceMerchantDetail extends AdminFinanceMerchantOption {
  ownerName: string | null;
  ownerPhone: string | null;
  wallet: {
    pendingBalance: number;
    availableBalance: number;
    totalBalance: number;
    isActive: boolean;
  } | null;
}

export interface AdminWithdrawalData {
  id: string;
  merchantId: string;
  merchantName: string;
  merchantType: "CANTEEN" | "COOPERATIVE";
  amount: number;
  method: WithdrawalMethod;
  status: WithdrawalStatus;
  notes: string | null;
  paymentAccount: {
    id: string;
    type: string;
    provider: string;
    accountNumber: string;
    accountName: string;
  } | null;
  approvedBy: { id: string; name: string } | null;
  timeline: {
    createdAt: string | null;
    approvedAt: string | null;
    processedAt: string | null;
    completedAt: string | null;
    rejectedAt: string | null;
  };
  updatedAt: string | null;
}

export interface AdminFinanceSummary {
  transactionValue: number;
  escrowHeld: number;
  merchantAvailable: number;
  merchantPending: number;
  pendingWithdrawalAmount: number;
  pendingWithdrawalCount: number;
  successfulTopups: number;
}

export interface AdminWithdrawalPage {
  items: AdminWithdrawalData[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  from: number;
  to: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface AdminFinanceFilters {
  page?: number;
  merchantId?: string;
  status?: AdminWithdrawalStatusFilter | "";
}

function mapMerchantType(type: "canteen" | "cooperative") {
  return type === "canteen" ? ("CANTEEN" as const) : ("COOPERATIVE" as const);
}

function mapWithdrawalMethod(method: string): WithdrawalMethod {
  switch (method.trim().toLowerCase()) {
    case "cash":
      return "CASH_ADMIN";
    case "bank":
    case "bank_transfer":
      return "BANK_TRANSFER";
    case "e_wallet":
      return "E_WALLET";
    default:
      throw new Error(`Metode withdrawal admin tidak dikenali: ${method}`);
  }
}

function mapWithdrawalStatus(status: string): WithdrawalStatus {
  switch (status.trim().toLowerCase()) {
    case "waiting":
      return "WAITING_APPROVAL";
    case "approved":
      return "APPROVED";
    case "processed":
      return "PROCESSED";
    case "completed":
      return "COMPLETED";
    case "rejected":
      return "REJECTED";
    default:
      throw new Error(`Status withdrawal admin tidak dikenali: ${status}`);
  }
}

function mapWithdrawal(withdrawal: ApiAdminWithdrawal): AdminWithdrawalData {
  return {
    id: withdrawal.id,
    merchantId: withdrawal.merchant.id,
    merchantName: withdrawal.merchant.name,
    merchantType: mapMerchantType(withdrawal.merchant.type),
    amount: withdrawal.amount,
    method: mapWithdrawalMethod(withdrawal.method),
    status: mapWithdrawalStatus(withdrawal.status),
    notes: withdrawal.notes,
    paymentAccount: withdrawal.payment_account
      ? {
          id: withdrawal.payment_account.id,
          type: withdrawal.payment_account.type,
          provider: withdrawal.payment_account.provider,
          accountNumber: withdrawal.payment_account.account_number,
          accountName: withdrawal.payment_account.account_name,
        }
      : null,
    approvedBy: withdrawal.approved_by
      ? { id: withdrawal.approved_by.id, name: withdrawal.approved_by.name }
      : null,
    timeline: {
      createdAt: withdrawal.timeline.created_at,
      approvedAt: withdrawal.timeline.approved_at,
      processedAt: withdrawal.timeline.processed_at,
      completedAt: withdrawal.timeline.completed_at,
      rejectedAt: withdrawal.timeline.rejected_at,
    },
    updatedAt: withdrawal.updated_at,
  };
}

function mapMerchantDetail(merchant: ApiAdminMerchant): AdminFinanceMerchantDetail {
  return {
    id: merchant.id,
    name: merchant.name,
    type: mapMerchantType(merchant.type),
    ownerName: merchant.owner?.name ?? null,
    ownerPhone: merchant.owner?.phone ?? null,
    wallet: merchant.wallet
      ? {
          pendingBalance: merchant.wallet.pending_balance,
          availableBalance: merchant.wallet.available_balance,
          totalBalance: merchant.wallet.total_balance,
          isActive: merchant.wallet.is_active,
        }
      : null,
  };
}

async function getAllAdminMerchants(): Promise<ApiAdminMerchant[]> {
  const merchants: ApiAdminMerchant[] = [];

  for (let page = 1; ; page += 1) {
    const currentPage = await authenticatedServerApiRequest<ApiAdminMerchant[]>(
      `/admin/merchants?page=${page}`,
    );
    merchants.push(...currentPage);
    if (currentPage.length < API_PAGE_SIZE) break;
  }

  return merchants;
}

async function getAllAdminWithdrawals({
  merchantId,
  status,
}: Pick<AdminFinanceFilters, "merchantId" | "status">): Promise<AdminWithdrawalData[]> {
  const withdrawals: AdminWithdrawalData[] = [];

  for (let page = 1; ; page += 1) {
    const params = new URLSearchParams({ page: String(page) });
    if (merchantId) params.set("merchant_id", merchantId);
    if (status) params.set("status", status);

    const currentPage = await authenticatedServerApiRequest<ApiAdminWithdrawal[]>(
      `/admin/withdrawals?${params.toString()}`,
    );
    withdrawals.push(...currentPage.map(mapWithdrawal));
    if (currentPage.length < API_PAGE_SIZE) break;
  }

  return withdrawals;
}

export async function getAdminFinanceData({
  page = 1,
  merchantId = "",
  status = "",
}: AdminFinanceFilters = {}) {
  const [dashboard, rawMerchants, withdrawals] = await Promise.all([
    getAdminDashboard(),
    getAllAdminMerchants(),
    getAllAdminWithdrawals({ merchantId, status }),
  ]);

  const merchantAvailable = rawMerchants.reduce(
    (total, merchant) => total + (merchant.wallet?.available_balance ?? 0),
    0,
  );
  const merchantPending = rawMerchants.reduce(
    (total, merchant) => total + (merchant.wallet?.pending_balance ?? 0),
    0,
  );

  const total = withdrawals.length;
  const totalPages = Math.max(Math.ceil(total / UI_PAGE_SIZE), 1);
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * UI_PAGE_SIZE;
  const items = withdrawals.slice(start, start + UI_PAGE_SIZE);

  const summary: AdminFinanceSummary = {
    transactionValue: dashboard.finance.completedOrderValue,
    escrowHeld: dashboard.finance.escrowHeld,
    merchantAvailable,
    merchantPending,
    pendingWithdrawalAmount: dashboard.finance.pendingWithdrawalAmount,
    pendingWithdrawalCount: dashboard.finance.pendingWithdrawals,
    successfulTopups: dashboard.finance.successfulTopups,
  };

  const pageData: AdminWithdrawalPage = {
    items,
    page: safePage,
    pageSize: UI_PAGE_SIZE,
    total,
    totalPages,
    from: total === 0 ? 0 : start + 1,
    to: total === 0 ? 0 : start + items.length,
    hasPreviousPage: safePage > 1,
    hasNextPage: safePage < totalPages,
  };

  const merchants: AdminFinanceMerchantOption[] = rawMerchants
    .map((merchant) => ({
      id: merchant.id,
      name: merchant.name,
      type: mapMerchantType(merchant.type),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "id-ID"));

  return { summary, merchants, withdrawals: pageData };
}

export async function getAdminWithdrawalDetail(withdrawalId: string) {
  const rawWithdrawal = await authenticatedServerApiRequest<ApiAdminWithdrawal>(
    `/admin/withdrawals/${encodeURIComponent(withdrawalId)}`,
  );
  const withdrawal = mapWithdrawal(rawWithdrawal);
  const rawMerchant = await authenticatedServerApiRequest<ApiAdminMerchant>(
    `/admin/merchants/${encodeURIComponent(withdrawal.merchantId)}`,
  );

  return { withdrawal, merchant: mapMerchantDetail(rawMerchant) };
}
