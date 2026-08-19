<<<<<<< HEAD
import { requireRole } from "@/features/auth/server/require-role";
import { StudentWalletMonthlySummary } from "@/features/wallet/components/student-wallet/student-wallet-monthly-summary";
import { StudentWalletOverview } from "@/features/wallet/components/student-wallet/student-wallet-overview";
import { StudentWalletTransactions } from "@/features/wallet/components/student-wallet/student-wallet-transactions";
import { getStudentWalletOverview } from "@/lib/api/student-wallet";

function getJakartaMonthKey(value: string | Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
  }).format(new Date(value));
}
=======
import {
  requireRole,
} from "@/features/auth/server/require-role";

import {
  StudentWalletMonthlySummary,
} from "@/features/wallet/components/student-wallet/student-wallet-monthly-summary";
import {
  StudentWalletOverview,
} from "@/features/wallet/components/student-wallet/student-wallet-overview";
import {
  StudentWalletTransactions,
} from "@/features/wallet/components/student-wallet/student-wallet-transactions";

import {
  getStudentWalletOverview,
} from "@/lib/api/student-wallet";
>>>>>>> source/main

export default async function StudentWalletPage() {
  await requireRole("student");

<<<<<<< HEAD
  const { wallet, transactions } = await getStudentWalletOverview();
  const currentMonthKey = getJakartaMonthKey(new Date());

  const successfulTransactionsThisMonth = transactions.filter(
    (transaction) =>
      transaction.status === "SUCCESS" &&
      getJakartaMonthKey(transaction.createdAt) === currentMonthKey,
  );

  const totalTopUp = successfulTransactionsThisMonth
    .filter((transaction) => transaction.type === "TOP_UP")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalOutflow = successfulTransactionsThisMonth
    .filter((transaction) => transaction.direction === "DEBIT")
    .reduce((total, transaction) => total + transaction.amount, 0);
=======
  const {
    wallet,
    transactions,
    monthlySummary,
  } =
    await getStudentWalletOverview();
>>>>>>> source/main

  return (
    <div className="mx-auto w-full max-w-[1160px] px-5 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-16">
      <header>
        <h1 className="font-sans text-[40px] font-bold leading-none tracking-[-0.03em] text-[#191C1E] md:text-5xl">
          Wallet
        </h1>
<<<<<<< HEAD
        <p className="mt-3 text-base text-[#536069] md:text-lg">
          <span className="md:hidden">Kelola saldo dan transaksi kamu.</span>
=======

        <p className="mt-3 text-base text-[#536069] md:text-lg">
          <span className="md:hidden">
            Kelola saldo dan transaksi kamu.
          </span>

>>>>>>> source/main
          <span className="hidden md:inline">
            Kelola saldo dan lihat riwayat transaksi kamu.
          </span>
        </p>
      </header>

      <div className="mt-10 space-y-6 md:mt-12 md:space-y-8">
        <StudentWalletOverview
          balance={wallet.balance}
<<<<<<< HEAD
          walletIsActive={wallet.isActive}
        />

        <StudentWalletMonthlySummary
          totalTopUp={totalTopUp}
          totalOutflow={totalOutflow}
        />

        <StudentWalletTransactions transactions={transactions} />
=======
          walletIsActive={
            wallet.isActive
          }
        />

        <StudentWalletMonthlySummary
          totalTopUp={
            monthlySummary.totalTopUp
          }
          totalOutflow={
            monthlySummary.totalOutflow
          }
        />

        <StudentWalletTransactions
          transactions={transactions}
        />
>>>>>>> source/main
      </div>
    </div>
  );
}
