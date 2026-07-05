import TransactionsTable from "@/components/dashboard/admin/TransactionTable";
import { GetTransactions } from "@/lib/api/booking";

export const metadata = { title: "Transactions — GymVortex" };
export const dynamic = "force-dynamic";

export default async function TransactionsPage({ searchParams }) {
  const params = await searchParams;
  const currentPage = parseInt(params?.page) || 1;

  const data = await GetTransactions(currentPage);
  const transactions = data?.data || [];
  const pagination = data?.pagination || {};
  const stats = data?.stats || {};

  return (
    <div className="p-4 md:p-6 min-h-screen bg-[#0a0a0a] text-[#e5e2e1]">
      <TransactionsTable
        transactions={transactions}
        pagination={pagination}
        stats={stats}
        currentPage={currentPage}
      />
    </div>
  );
}
